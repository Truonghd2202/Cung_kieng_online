const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");

const ApiError = require("../src/utils/api-error");

const DIGITAL_ID = "DI" + "a".repeat(30);
const MEMBERSHIP_ID = "b".repeat(32);

function notification(orderId = DIGITAL_ID) {
  return {
    notification_type: "TRANSACTION_VOID",
    order: {
      order_invoice_number: orderId,
    },
    transaction: {
      id: "void_transaction_001",
    },
  };
}

function setup(options = {}) {
  const alerts = new Map();

  const order = {
    id: options.orderId ?? DIGITAL_ID,
    user_id: "00000000-0000-4000-8000-000000000001",
    payment_provider: "SEPAY",
    payment_environment: "sandbox",
    ...options.order,
  };

  async function findOrder({ where }) {
    if (options.missing || where.id !== order.id) {
      return null;
    }

    return { ...order };
  }

  const prisma = {
    async $transaction(operations) {
      return Promise.all(operations);
    },

    digital_orders: {
      findUnique: findOrder,
    },
    payment_orders: {
      findUnique: findOrder,
    },
    payment_alerts: {
      async upsert({ where, create, update }) {
        const existing = alerts.get(where.id);

        if (existing) {
          Object.assign(existing, update);
          return { ...existing };
        }

        const row = {
          status: "OPEN",
          resolution_note: null,
          resolved_at: null,
          ...create,
        };

        alerts.set(where.id, row);
        return { ...row };
      },
    },
  };

  const dependencies = {
    "node:crypto": require("node:crypto"),
    "../config/prisma": prisma,
    "../config/env": {
      SEPAY_ENV: "sandbox",
    },
    "../utils/api-error": ApiError,
    "./payment-environment.service": {
      async assertPaymentEnvironment() {
        if (options.environmentFailure) {
          throw new ApiError(503, "Môi trường chưa sẵn sàng.");
        }
      },
    },
  };

  const filename = path.join(
    __dirname,
    "../src/services/payment-alert.service.js"
  );

  const moduleObject = { exports: {} };

  vm.runInNewContext(
    fs.readFileSync(filename, "utf8"),
    {
      module: moduleObject,
      exports: moduleObject.exports,
      Buffer,
      require(name) {
        if (!Object.hasOwn(dependencies, name)) {
          throw new Error(`Dependency chưa được mock: ${name}`);
        }

        return dependencies[name];
      },
    },
    { filename }
  );

  return {
    alerts,
    ...moduleObject.exports,
  };
}

function hasStatus(expected) {
  return (error) => {
    assert.equal(error.statusCode, expected);
    return true;
  };
}

test("Lưu cảnh báo cho đơn vật phẩm đúng tài khoản và môi trường", async () => {
  const service = setup();

  const result = await service.recordVoidNotification(
    notification()
  );

  assert.equal(result.success, true);
  assert.equal(result.reviewRequired, true);
  assert.equal(service.alerts.size, 1);

  const row = [...service.alerts.values()][0];

  assert.match(row.id, /^[a-f0-9]{64}$/);
  assert.equal(row.order_id, DIGITAL_ID);
  assert.equal(
    row.user_id,
    "00000000-0000-4000-8000-000000000001"
  );
  assert.equal(row.environment, "sandbox");
  assert.equal(row.event_type, "TRANSACTION_VOID");
  assert.equal(row.transaction_id, "void_transaction_001");
  assert.equal(row.status, "OPEN");
});

test("Hỗ trợ cảnh báo cho đơn hội viên", async () => {
  const service = setup({ orderId: MEMBERSHIP_ID });

  await service.recordVoidNotification(
    notification(MEMBERSHIP_ID)
  );

  assert.equal(service.alerts.size, 1);
  assert.equal(
    [...service.alerts.values()][0].order_id,
    MEMBERSHIP_ID
  );
});

test("Thông báo gửi lại không tạo cảnh báo trùng", async () => {
  const service = setup();

  await service.recordVoidNotification(notification());
  await service.recordVoidNotification(notification());

  assert.equal(service.alerts.size, 1);
});

test("Thông báo gửi lại không mở lại cảnh báo đã xử lý", async () => {
  const service = setup();

  await service.recordVoidNotification(notification());

  const row = [...service.alerts.values()][0];
  row.status = "RESOLVED";
  row.resolution_note = "Đã đối chiếu và ghi nhận kết quả xử lý.";
  row.resolved_at = new Date("2026-10-17T12:00:00Z");

  await service.recordVoidNotification(notification());

  assert.equal(service.alerts.size, 1);
  assert.equal(row.status, "RESOLVED");
  assert.equal(
    row.resolution_note,
    "Đã đối chiếu và ghi nhận kết quả xử lý."
  );
  assert.equal(
    row.resolved_at.toISOString(),
    "2026-10-17T12:00:00.000Z"
  );
});

test("Hai giao dịch khác nhau trên một đơn có hai cảnh báo riêng", async () => {
  const service = setup();

  await service.recordVoidNotification(notification());

  const second = notification();
  second.transaction.id = "void_transaction_002";

  await service.recordVoidNotification(second);

  assert.equal(service.alerts.size, 2);
});

test("Không tìm thấy đơn thì không tạo cảnh báo", async () => {
  const service = setup({ missing: true });

  await assert.rejects(
    service.recordVoidNotification(notification()),
    hasStatus(404)
  );

  assert.equal(service.alerts.size, 0);
});

for (const order of [
  { payment_provider: "VNPAY" },
  { payment_environment: "production" },
]) {
  test(`Từ chối đơn sai cấu hình: ${JSON.stringify(order)}`, async () => {
    const service = setup({ order });

    await assert.rejects(
      service.recordVoidNotification(notification()),
      hasStatus(409)
    );

    assert.equal(service.alerts.size, 0);
  });
}

test("Mã đơn không hợp lệ không được lưu", async () => {
  const service = setup();

  await assert.rejects(
    service.recordVoidNotification(
      notification("invalid-order")
    ),
    hasStatus(422)
  );

  assert.equal(service.alerts.size, 0);
});

test("Mã giao dịch không hợp lệ không được lưu", async () => {
  const service = setup();
  const body = notification();
  body.transaction.id = "../invalid transaction";

  await assert.rejects(
    service.recordVoidNotification(body),
    hasStatus(422)
  );

  assert.equal(service.alerts.size, 0);
});

test("Môi trường chưa sẵn sàng thì không lưu cảnh báo", async () => {
  const service = setup({ environmentFailure: true });

  await assert.rejects(
    service.recordVoidNotification(notification()),
    hasStatus(503)
  );

  assert.equal(service.alerts.size, 0);
});

function approvedTransactions() {
  return [
    {
      id: "approved_transaction_001",
      transaction_type: "PAYMENT",
      transaction_status: "APPROVED",
    },
    {
      id: "approved_transaction_002",
      transaction_type: "PAYMENT",
      transaction_status: "APPROVED",
    },
  ];
}

test("Nhiều giao dịch tạo cảnh báo riêng cho từng mã tham chiếu", async () => {
  const service = setup();

  await service.recordMultipleApprovedPayments(
    DIGITAL_ID,
    approvedTransactions()
  );

  assert.equal(service.alerts.size, 2);

  for (const row of service.alerts.values()) {
    assert.equal(row.order_id, DIGITAL_ID);
    assert.equal(row.environment, "sandbox");
    assert.equal(row.event_type, "MULTIPLE_APPROVED_PAYMENTS");
    assert.equal(row.status, "OPEN");
  }
});

test("Đổi thứ tự hoặc gửi lại danh sách không tạo cảnh báo trùng", async () => {
  const service = setup();
  const transactions = approvedTransactions();

  await service.recordMultipleApprovedPayments(
    DIGITAL_ID,
    transactions
  );

  await service.recordMultipleApprovedPayments(
    DIGITAL_ID,
    [...transactions].reverse()
  );

  assert.equal(service.alerts.size, 2);
});

test("Không mở lại cảnh báo nhiều giao dịch đã xử lý", async () => {
  const service = setup();

  await service.recordMultipleApprovedPayments(
    DIGITAL_ID,
    approvedTransactions()
  );

  for (const row of service.alerts.values()) {
    row.status = "RESOLVED";
    row.resolution_note = "Đã đối chiếu và xử lý khoản thanh toán.";
  }

  await service.recordMultipleApprovedPayments(
    DIGITAL_ID,
    approvedTransactions()
  );

  assert.equal(service.alerts.size, 2);

  for (const row of service.alerts.values()) {
    assert.equal(row.status, "RESOLVED");
    assert.equal(
      row.resolution_note,
      "Đã đối chiếu và xử lý khoản thanh toán."
    );
  }
});

test("Một mã giao dịch lặp hai lần không bị coi là hai khoản thanh toán", async () => {
  const service = setup();
  const transaction = approvedTransactions()[0];

  await assert.rejects(
    service.recordMultipleApprovedPayments(
      DIGITAL_ID,
      [transaction, { ...transaction }]
    ),
    hasStatus(409)
  );

  assert.equal(service.alerts.size, 0);
});

test("Một mã giao dịch sai khiến cả danh sách bị từ chối trước khi lưu", async () => {
  const service = setup();
  const transactions = approvedTransactions();
  transactions[1].id = "../invalid transaction";

  await assert.rejects(
    service.recordMultipleApprovedPayments(
      DIGITAL_ID,
      transactions
    ),
    hasStatus(422)
  );

  assert.equal(service.alerts.size, 0);
});

test("Cảnh báo nhiều giao dịch từ chối đơn khác môi trường", async () => {
  const service = setup({
    order: { payment_environment: "production" },
  });

  await assert.rejects(
    service.recordMultipleApprovedPayments(
      DIGITAL_ID,
      approvedTransactions()
    ),
    hasStatus(409)
  );

  assert.equal(service.alerts.size, 0);
});

test("Hai loại cảnh báo cùng giao dịch không ghi đè nhau", async () => {
  const service = setup();

  await service.recordVoidNotification(notification());

  const transactions = approvedTransactions();
  transactions[0].id = "void_transaction_001";

  await service.recordMultipleApprovedPayments(
    DIGITAL_ID,
    transactions
  );

  assert.equal(service.alerts.size, 3);

  const eventTypes = new Set(
    [...service.alerts.values()].map((row) => row.event_type)
  );

  assert.equal(eventTypes.has("TRANSACTION_VOID"), true);
  assert.equal(
    eventTypes.has("MULTIPLE_APPROVED_PAYMENTS"),
    true
  );
});

