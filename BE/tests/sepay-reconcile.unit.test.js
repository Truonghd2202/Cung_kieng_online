const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");

const ApiError = require("../src/utils/api-error");

const ORDER_ID = "DI" + "a".repeat(30);
const USER_ID = "00000000-0000-4000-8000-000000000001";

function approved(id = "transaction_001") {
  return {
    id,
    transaction_type: "PAYMENT",
    transaction_status: "APPROVED",
    transaction_currency: "VND",
    transaction_amount: "9000",
  };
}

function setup(options = {}) {
  const state = {
    requests: [],
    confirmations: [],
    alerts: [],
    order: {
      id: ORDER_ID,
      amount: 9000,
      status: "PENDING",
      payment_provider: "SEPAY",
      payment_environment: "sandbox",
      ...options.order,
    },
  };

  const remote = {
    order_invoice_number: ORDER_ID,
    order_status: "CAPTURED",
    order_currency: "VND",
    order_amount: "9000",
    transactions: [approved()],
    ...options.remote,
  };

  async function getOrder(userId, id) {
    if (userId !== USER_ID || id !== ORDER_ID) {
      throw new ApiError(404, "Không tìm thấy đơn.");
    }

    return { ...state.order };
  }

  const dependencies = {
    "../config/env": {
      SEPAY_ENV: "sandbox",
      SEPAY_MERCHANT_ID: "test-merchant",
      SEPAY_SECRET_KEY: "test-secret",
    },

    // Không cho test vô tình gọi database thật.
    "../config/prisma": {},

    "../utils/api-error": ApiError,

    "../config/sepay": {
      isSePayConfigured: () => true,
    },

    "./payment-environment.service": {
      async assertPaymentEnvironment() {},
    },

    "./digital-shop.service": { getOrder },
    "./payment.service": { getOrder },

    "./sepay-ipn.service": {
      async processSePayIpn(body) {
        state.confirmations.push(body);
        state.order.status = "PAID";
        return { success: true };
      },
    },

    "./payment-alert.service": {
      async recordMultipleApprovedPayments(id, transactions) {
        state.alerts.push({ id, transactions });
      },
    },
  };

  const filename = path.join(
    __dirname,
    "../src/services/sepay-reconcile.service.js"
  );
  const moduleObject = { exports: {} };

  vm.runInNewContext(
    fs.readFileSync(filename, "utf8"),
    {
      module: moduleObject,
      exports: moduleObject.exports,
      Buffer,
      URL,
      URLSearchParams,
      AbortSignal,

      async fetch(url, init) {
        const address = new URL(String(url));
        state.requests.push({ address, init });

        if (options.providerFailure) {
          throw new Error("Giả lập lỗi kết nối.");
        }

        if (address.pathname === "/v1/order") {
          return {
            ok: true,
            async json() {
              return {
                data: options.notFound
                  ? []
                  : [{
                      order_id: "provider-order-001",
                      order_invoice_number: ORDER_ID,
                    }],
                meta: { has_more: false },
              };
            },
          };
        }

        if (
          address.pathname ===
          "/v1/order/detail/provider-order-001"
        ) {
          return {
            ok: true,
            async json() {
              return { data: remote };
            },
          };
        }

        throw new Error("Endpoint ngoài dự kiến.");
      },

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

test("Không gọi SePay khi người dùng không sở hữu đơn", async () => {
  const service = setup();

  await assert.rejects(
    service.reconcileSePayOrder("another-user", ORDER_ID),
    hasStatus(404)
  );

  assert.equal(service.state.requests.length, 0);
  assert.equal(service.state.confirmations.length, 0);
});

test("Đơn PAID không cấp quyền lại qua đối soát", async () => {
  const service = setup({ order: { status: "PAID" } });

  const result = await service.reconcileSePayOrder(
    USER_ID,
    ORDER_ID
  );

  assert.equal(result.status, "PAID");
  assert.equal(service.state.requests.length, 0);
  assert.equal(service.state.confirmations.length, 0);
});

test("Chưa tìm thấy đơn trên SePay không bị kết luận thất bại", async () => {
  const service = setup({ notFound: true });

  const result = await service.reconcileSePayOrder(
    USER_ID,
    ORDER_ID
  );

  assert.equal(result.status, "PENDING");
  assert.equal(
    result.reconciliation,
    "NOT_FOUND_ON_PROVIDER"
  );
  assert.equal(service.state.confirmations.length, 0);
});

test("Một giao dịch hợp lệ được chuyển sang service xác nhận", async () => {
  const service = setup();

  const result = await service.reconcileSePayOrder(
    USER_ID,
    ORDER_ID
  );

  assert.equal(result.status, "PAID");
  assert.equal(result.reconciliation, "CONFIRMED");
  assert.equal(service.state.confirmations.length, 1);

  const body = service.state.confirmations[0];
  assert.equal(body.notification_type, "ORDER_PAID");
  assert.equal(body.order.order_invoice_number, ORDER_ID);
  assert.equal(body.transaction.id, "transaction_001");

  for (const request of service.state.requests) {
    assert.equal(
      request.address.origin,
      "https://pgapi-sandbox.sepay.vn"
    );
    assert.equal(request.init.method, "GET");
    assert.equal(request.init.redirect, "error");
    assert.equal(
      request.init.headers.Authorization,
      `Basic ${Buffer.from(
        "test-merchant:test-secret"
      ).toString("base64")}`
    );
  }
});

test("Nhiều giao dịch thành công lưu cảnh báo, không cấp quyền", async () => {
  const service = setup({
    remote: {
      transactions: [
        approved("transaction_001"),
        approved("transaction_002"),
      ],
    },
  });

  await assert.rejects(
    service.reconcileSePayOrder(USER_ID, ORDER_ID),
    hasStatus(409)
  );

  assert.equal(service.state.alerts.length, 1);
  assert.equal(service.state.alerts[0].id, ORDER_ID);
  assert.equal(
    service.state.alerts[0].transactions.length,
    2
  );
  assert.equal(service.state.confirmations.length, 0);
  assert.equal(service.state.order.status, "PENDING");
});

test("Chi tiết trả về mã đơn khác không được xác nhận", async () => {
  const service = setup({
    remote: {
      order_invoice_number: "DI" + "b".repeat(30),
    },
  });

  await assert.rejects(
    service.reconcileSePayOrder(USER_ID, ORDER_ID),
    hasStatus(409)
  );

  assert.equal(service.state.confirmations.length, 0);
});

test("Lỗi kết nối SePay không đổi trạng thái đơn", async () => {
  const service = setup({ providerFailure: true });

  await assert.rejects(
    service.reconcileSePayOrder(USER_ID, ORDER_ID),
    hasStatus(503)
  );

  assert.equal(service.state.order.status, "PENDING");
  assert.equal(service.state.confirmations.length, 0);
});

test("Thanh toán về muộn cho đơn EXPIRED vẫn được đối soát", async () => {
  const service = setup({
    order: { status: "EXPIRED" },
  });

  const result = await service.reconcileSePayOrder(
    USER_ID,
    ORDER_ID
  );

  assert.equal(result.status, "PAID");
  assert.equal(service.state.confirmations.length, 1);
});
