const test = require("node:test");
const assert = require("node:assert/strict");
process.env.DATABASE_URL = "postgresql://test:test@127.0.0.1:1/test";
process.env.JWT_ACCESS_SECRET = "test-only-not-a-production-secret";
process.env.VNPAY_TMN_CODE = "TESTCODE";
process.env.VNPAY_HASH_SECRET = "test-only-vnpay-secret";
process.env.VNPAY_RETURN_URL = "https://example.test/membership";
const { signature, verifyCallback, encodedParams, addMembershipMonth } = require("../src/utils/vnpay");
const { processIpn } = require("../src/services/payment.service");
function callback(patch = {}) {
  const query = { vnp_TmnCode: "TESTCODE", vnp_TxnRef: "order1", vnp_Amount: "2900000", vnp_TransactionNo: "123456", vnp_ResponseCode: "00", vnp_TransactionStatus: "00", ...patch };
  return { ...query, vnp_SecureHash: signature(query, process.env.VNPAY_HASH_SECRET) };
}
function fakeDatabase() {
  const state = { status: "PENDING", grants: 0 };
  const order = { id: "order1", user_id: "user1", plan_id: "plan1", amount: 29000 };
  const tx = {
    $queryRaw: async () => [],
    payment_orders: { updateMany: async ({ where, data }) => { if (where.status !== state.status) return { count: 0 }; state.status = data.status; return { count: 1 }; } },
    subscriptions: { findFirst: async () => null, create: async ({ data }) => { state.grants++; assert.equal(data.user_id, "user1"); assert.equal(data.plan_id, "plan1"); return data; } },
  };
  return { state, payment_orders: { findUnique: async () => order }, $transaction: async (action) => action(tx) };
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
