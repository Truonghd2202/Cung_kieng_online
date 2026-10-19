const test = require("node:test");
const assert = require("node:assert/strict");
process.env.DATABASE_URL = "postgresql://test:test@127.0.0.1:1/test";
process.env.JWT_ACCESS_SECRET = "test-only-not-a-production-secret";
process.env.VNPAY_TMN_CODE = "TESTCODE";
process.env.VNPAY_HASH_SECRET = "test-only-vnpay-secret";
process.env.VNPAY_RETURN_URL = "https://example.test/membership";
const { signature, verifyCallback, encodedParams, addMembershipMonth } = require("../src/utils/vnpay");
const { processIpn, getMembership } = require("../src/services/payment.service");
const paymentService = require("../src/services/payment.service");
const horoscopeService = require("../src/services/horoscope.service");
const paymentController = require("../src/controllers/payment.controller");

test("membership status supplies server-owned Free/Premium benefits and current quota limits", async () => {
  const status = await getMembership();
  assert.equal(status.subscription, null);
  assert.deepEqual(status.aiLimits, { successfulReadingsPer24Hours: 3, providerAttemptsPer24Hours: 5 });
  assert.deepEqual(status.plans.map(({ term }) => term), ["monthly", "yearly"]);
  assert.ok(status.benefits.some((benefit) => benefit.name === "Thư viện xin xăm đã thẩm định" && benefit.availability.includes("Chờ nhóm xác nhận")));
  assert.equal(typeof status.salesEnabled, "boolean");
  assert.equal(typeof status.checkoutAvailable, "boolean");
});

test("membership status API response combines account plan and live quota data", async () => {
  const originalMembership = paymentService.getMembership;
  const originalUsage = horoscopeService.getYearlyUsage;
  paymentService.getMembership = async (userId) => ({ subscription: null, userId, salesEnabled: false });
  horoscopeService.getYearlyUsage = async (userId) => ({ attemptsUsed: 2, attemptsRemaining: 3, userId });
  let body;
  const response = { status() { return this; }, json(value) { body = value; return value; } };
  try {
    await paymentController.membership({ user: { id: "user-123" } }, response);
    assert.equal(body.success, true);
    assert.equal(body.data.userId, "user-123");
    assert.deepEqual(body.data.aiUsage, { attemptsUsed: 2, attemptsRemaining: 3, userId: "user-123" });
  } finally {
    paymentService.getMembership = originalMembership;
    horoscopeService.getYearlyUsage = originalUsage;
  }
});
function callback(patch = {}) {
  const query = { vnp_TmnCode: "TESTCODE", vnp_TxnRef: "order1", vnp_Amount: "2900000", vnp_TransactionNo: "123456", vnp_ResponseCode: "00", vnp_TransactionStatus: "00", ...patch };
  return { ...query, vnp_SecureHash: signature(query, process.env.VNPAY_HASH_SECRET) };
}
function fakeDatabase({
  term = "monthly",
  existingExpiresAt = null,
} = {}) {
  const yearly = term === "yearly";

  const state = {
    status: "PENDING",
    grants: 0,
    expiresAt: existingExpiresAt,
  };

  const order = {
    payment_provider: "VNPAY",
    payment_environment: "LEGACY",
    id: "order1",
    user_id: "user1",
    plan_id: yearly ? "yearly-plan" : "plan1",
    amount: yearly ? 199000 : 29000,
    membership_plans: {
      code: yearly
        ? "TAM_AN_YEARLY"
        : "TAM_AN_MONTHLY",
    },
  };

  const tx = {
    $queryRaw: async () => [],

    payment_orders: {
      updateMany: async ({ where, data }) => {
        if (where.status !== state.status) {
          return { count: 0 };
        }

        state.status = data.status;
        return { count: 1 };
      },
    },

    subscriptions: {
      findFirst: async ({ where }) => {
        assert.equal(where.user_id, "user1");

        assert.deepEqual(
          where.membership_plans.code.in,
          ["TAM_AN_MONTHLY", "TAM_AN_YEARLY"]
        );

        return existingExpiresAt
          ? {
              id: "existing-subscription",
              expires_at: existingExpiresAt,
            }
          : null;
      },

      create: async ({ data }) => {
        state.grants += 1;

        assert.equal(data.user_id, "user1");
        assert.equal(data.plan_id, order.plan_id);

        state.expiresAt = data.expires_at;
        return data;
      },

      update: async ({ where, data }) => {
        assert.equal(
          where.id,
          "existing-subscription"
        );

        assert.equal(data.plan_id, order.plan_id);

        state.grants += 1;
        state.expiresAt = data.expires_at;

        return data;
      },
    },

    digital_inventory: {
      upsert: async (args) => args.create,
    },
  };

  return {
    state,
    payment_orders: {
      findUnique: async () => order,
    },
    $transaction: async (action) => action(tx),
  };
}
test("VNPay canonical signing handles spaces, ignores hash and detects tampering", () => {
  assert.equal(encodedParams({ vnp_B: "a b", vnp_A: "x/y", vnp_SecureHash: "ignore" }), "vnp_A=x%2Fy&vnp_B=a+b");
  const query = callback();
  assert.equal(verifyCallback(query, process.env.VNPAY_HASH_SECRET), true);
  assert.equal(verifyCallback({ ...query, vnp_Amount: "100" }, process.env.VNPAY_HASH_SECRET), false);
  assert.equal(verifyCallback({ ...query, vnp_Amount: ["2900000", "100"] }, process.env.VNPAY_HASH_SECRET), false);
});
test("IPN grants once; replay cannot extend membership twice", async () => {
  const db = fakeDatabase();
  assert.equal((await processIpn(callback(), db)).RspCode, "00");
  assert.equal((await processIpn(callback(), db)).RspCode, "02");
  assert.equal(db.state.grants, 1);
});
test("signed wrong amount, merchant or failed transaction cannot grant membership", async () => {
  const db = fakeDatabase();
  assert.equal((await processIpn(callback({ vnp_Amount: "100" }), db)).RspCode, "04");
  assert.equal((await processIpn(callback({ vnp_TmnCode: "OTHER" }), db)).RspCode, "97");
  assert.equal((await processIpn(callback({ vnp_TransactionStatus: "02" }), db)).RspCode, "00");
  assert.equal(db.state.status, "FAILED");
  assert.equal(db.state.grants, 0);
});
test("monthly membership clamps end of month and preserves clock time", () => {
  assert.equal(addMembershipMonth(new Date("2027-01-31T15:30:00Z")).toISOString(), "2027-02-28T15:30:00.000Z");
  assert.equal(addMembershipMonth(new Date("2028-01-31T15:30:00Z")).toISOString(), "2028-02-29T15:30:00.000Z");
});
test("yearly membership clamps February 29", () => {
  const {
    addMembershipMonths,
  } = require("../src/utils/vnpay");

  assert.equal(
    addMembershipMonths(
      new Date("2028-02-29T15:30:00Z"),
      12
    ).toISOString(),
    "2029-02-28T15:30:00.000Z"
  );
});
test("yearly payment requires the yearly amount", async () => {
  const db = fakeDatabase({ term: "yearly" });

  // Callback có chữ ký hợp lệ nhưng trả số tiền gói tháng.
  const wrongAmount = await processIpn(
    callback({ vnp_Amount: "2900000" }),
    db
  );

  assert.equal(wrongAmount.RspCode, "04");
  assert.equal(db.state.grants, 0);
  assert.equal(db.state.status, "PENDING");
});

test("yearly payment grants once even when IPN repeats", async () => {
  const db = fakeDatabase({ term: "yearly" });

  const query = callback({
    vnp_Amount: "19900000",
  });

  assert.equal(
    (await processIpn(query, db)).RspCode,
    "00"
  );

  assert.equal(
    (await processIpn(query, db)).RspCode,
    "02"
  );

  assert.equal(db.state.grants, 1);
  assert.equal(db.state.status, "PAID");
});

test("yearly renewal preserves remaining membership time", async () => {
  const {
    addMembershipMonths,
  } = require("../src/utils/vnpay");

  const currentExpiry = new Date(
    Date.now() + 90 * 86400000
  );

  const db = fakeDatabase({
    term: "yearly",
    existingExpiresAt: currentExpiry,
  });

  const result = await processIpn(
    callback({ vnp_Amount: "19900000" }),
    db
  );

  assert.equal(result.RspCode, "00");
  assert.equal(db.state.grants, 1);

  assert.equal(
    db.state.expiresAt.toISOString(),
    addMembershipMonths(
      currentExpiry,
      12
    ).toISOString()
  );
});

test("monthly renewal also preserves a yearly member's remaining time", async () => {
  const {
    addMembershipMonths,
  } = require("../src/utils/vnpay");

  const currentExpiry = new Date(
    Date.now() + 300 * 86400000
  );

  const db = fakeDatabase({
    term: "monthly",
    existingExpiresAt: currentExpiry,
  });

  const result = await processIpn(callback(), db);

  assert.equal(result.RspCode, "00");

  assert.equal(
    db.state.expiresAt.toISOString(),
    addMembershipMonths(
      currentExpiry,
      1
    ).toISOString()
  );
});
