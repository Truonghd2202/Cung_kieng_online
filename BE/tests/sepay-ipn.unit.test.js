const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");

const ApiError = require("../src/utils/api-error");

const ORDER_ID = "DI" + "a".repeat(30);
const SECRET = "unit-test-only-sepay-secret-123456789";

function notification() {
  return {
    notification_type: "ORDER_PAID",
    order: {
      order_invoice_number: ORDER_ID,
      order_status: "CAPTURED",
      order_currency: "VND",
      order_amount: "9000.00",
    },
    transaction: {
      id: "test_transaction_001",
      transaction_status: "APPROVED",
      transaction_type: "PAYMENT",
      transaction_currency: "VND",
      transaction_amount: "9000.00",
    },
  };
}

function setup(options = {}) {
  const state = {
    order: {
      id: ORDER_ID,
      user_id: "00000000-0000-4000-8000-000000000001",
      item_code: "ROYAL_LANTERN",
      quantity: 1,
      amount: 9000,
      payment_provider: "SEPAY",
      payment_environment: "sandbox",
      status: "PENDING",
      transaction_no: null,
      expires_at: new Date(Date.now() - 60_000),
      ...options.order,
    },
    grants: 0,
    voids: 0,
  };

  function readOrder({ where }) {
    if (where.id) {
      return where.id === state.order.id
        ? { ...state.order }
        : null;
    }

    if (where.transaction_no) {
      return state.order.transaction_no === where.transaction_no
        ? { id: state.order.id }
        : null;
    }

    throw new Error("Truy vấn chưa được mock.");
  }

  const tx = {
    $queryRaw: async () => [{ locked: 1 }],

    payment_orders: {
      findUnique: async () => null,
    },

    digital_orders: {
      findUnique: async (args) => readOrder(args),

      updateMany: async ({ where, data }) => {
        if (
          state.order.id !== where.id ||
          state.order.status !== where.status ||
          state.order.payment_provider !== where.payment_provider ||
          state.order.payment_environment !== where.payment_environment
        ) {
          return { count: 0 };
        }

        Object.assign(state.order, data);
        return { count: 1 };
      },

      update: async ({ data }) => {
        Object.assign(state.order, data);
        return { ...state.order };
      },
    },
  };

  const prisma = {
    digital_orders: tx.digital_orders,
    payment_orders: tx.payment_orders,

    $transaction: async (callback) => {
      const before = {
        order: { ...state.order },
        grants: state.grants,
      };

      try {
        return await callback(tx);
      } catch (error) {
        state.order = before.order;
        state.grants = before.grants;
        throw error;
      }
    },
  };

  const dependencies = {
    "node:crypto": require("node:crypto"),

    "../config/env": {
      SEPAY_ENV: "sandbox",
      SEPAY_IPN_SECRET: SECRET,
    },

    "../config/prisma": prisma,
    "../utils/api-error": ApiError,

    "../utils/vnpay": {
      addMembershipMonths() {
        throw new Error("Test vật phẩm không được gia hạn hội viên.");
      },
    },

    "./digital-inventory.service": {
      async grantPurchasedItem() {
        if (options.grantFailure) {
          throw new Error("Giả lập lỗi cấp vật phẩm.");
        }

        state.grants += 1;

        return {
          duplicatePermanent: Boolean(options.duplicatePermanent),
        };
      },

      async grantYearlyGifts() {
        throw new Error("Test vật phẩm không được cấp quà hội viên.");
      },
    },

    "./payment-environment.service": {
      async assertPaymentEnvironment() {},
    },

    "./payment-alert.service": {
      async recordVoidNotification() {
        state.voids += 1;
        return { success: true, reviewRequired: true };
      },
    },
  };

  const filename = path.join(
    __dirname,
    "../src/services/sepay-ipn.service.js"
  );

  const moduleObject = { exports: {} };

  // Chạy service thật với dependency giả.
  // Không load config/env, Prisma hoặc SDK thanh toán thật.
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
    state,
    ...moduleObject.exports,
  };
}

function hasStatus(expected) {
  return (error) => {
    assert.equal(error.statusCode, expected);
    return true;
  };
}

test("IPN chỉ chấp nhận đúng khóa xác thực", () => {
  const service = setup();

  assert.doesNotThrow(() =>
    service.authenticateSePayIpn(SECRET)
  );

  for (const key of [undefined, "", "wrong-secret"]) {
    assert.throws(
      () => service.authenticateSePayIpn(key),
      hasStatus(401)
    );
  }
});

test("Thanh toán hợp lệ cấp vật phẩm đúng một lần", async () => {
  const service = setup();

  const result = await service.processSePayIpn(notification());

  assert.equal(result.success, true);
  assert.equal(result.replayed, false);
  assert.equal(service.state.order.status, "PAID");
  assert.equal(service.state.grants, 1);
});

test("Gửi lại cùng IPN không cấp thêm vật phẩm", async () => {
  const service = setup();

  await service.processSePayIpn(notification());
  const result = await service.processSePayIpn(notification());

  assert.equal(result.replayed, true);
  assert.equal(service.state.grants, 1);
});

test("Sai số tiền không đổi trạng thái hoặc cấp vật phẩm", async () => {
  const service = setup();
  const body = notification();
  body.transaction.transaction_amount = "8000.00";

  await assert.rejects(
    service.processSePayIpn(body),
    hasStatus(422)
  );

  assert.equal(service.state.order.status, "PENDING");
  assert.equal(service.state.grants, 0);
});

test("Sai môi trường thanh toán bị từ chối", async () => {
  const service = setup({
    order: { payment_environment: "production" },
  });

  await assert.rejects(
    service.processSePayIpn(notification()),
    hasStatus(409)
  );

  assert.equal(service.state.grants, 0);
});

for (const status of ["CANCELLED", "EXPIRED"]) {
  test(`Thanh toán xác thực về muộn cho đơn ${status} vẫn được xử lý`, async () => {
    const service = setup({ order: { status } });

    await service.processSePayIpn(notification());
    await service.processSePayIpn(notification());

    assert.equal(service.state.order.status, "PAID");
    assert.equal(service.state.grants, 1);
  });
}

test("Đơn PAID nhận giao dịch khác không cấp lần hai", async () => {
  const service = setup();

  await service.processSePayIpn(notification());

  const other = notification();
  other.transaction.id = "test_transaction_002";

  await assert.rejects(
    service.processSePayIpn(other),
    hasStatus(409)
  );

  assert.equal(service.state.grants, 1);
});

test("Lỗi cấp vật phẩm rollback trạng thái đơn và cho phép thử lại", async () => {
  const options = { grantFailure: true };
  const service = setup(options);

  await assert.rejects(
    service.processSePayIpn(notification()),
    /Giả lập lỗi cấp vật phẩm/
  );

  assert.equal(service.state.order.status, "PENDING");
  assert.equal(service.state.order.transaction_no, null);
  assert.equal(service.state.grants, 0);

  options.grantFailure = false;

  await service.processSePayIpn(notification());

  assert.equal(service.state.order.status, "PAID");
  assert.equal(service.state.grants, 1);
});

test("Vật phẩm vĩnh viễn đã sở hữu được đánh dấu cần đối chiếu", async () => {
  const service = setup({
    duplicatePermanent: true,
    order: {
      item_code: "GOLDEN_LOTUS",
      amount: 29000,
    },
  });

  const body = notification();
  body.order.order_amount = "29000";
  body.transaction.transaction_amount = "29000";

  await service.processSePayIpn(body);

  assert.equal(service.state.order.status, "PAID");
  assert.equal(service.state.order.payment_review_status, "OPEN");
});

test("TRANSACTION_VOID chuyển sang bộ phận ghi cảnh báo", async () => {
  const service = setup();
  const body = notification();
  body.notification_type = "TRANSACTION_VOID";

  const result = await service.processSePayIpn(body);

  assert.equal(result.reviewRequired, true);
  assert.equal(service.state.voids, 1);
  assert.equal(service.state.grants, 0);
  assert.equal(service.state.order.status, "PENDING");
});
