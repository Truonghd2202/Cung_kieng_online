const test = require("node:test");
const assert = require("node:assert/strict");

process.env.DATABASE_URL =
  "postgresql://test:test@127.0.0.1:1/test";
process.env.JWT_ACCESS_SECRET =
  "unit-test-only-not-a-production-secret";
process.env.VNPAY_TMN_CODE = "TESTCODE";
process.env.VNPAY_HASH_SECRET =
  "unit-test-only-vnpay-secret";
process.env.VNPAY_RETURN_URL =
  "https://example.test/membership";

const {
  signature,
} = require("../src/utils/vnpay");

const {
  processIpn,
} = require("../src/services/digital-shop.service");

const ORDER_ID = "DI" + "a".repeat(30);

function callback(patch = {}) {
  const query = {
    vnp_TmnCode: "TESTCODE",
    vnp_TxnRef: ORDER_ID,
    vnp_Amount: "900000",
    vnp_TransactionNo: "123456789",
    vnp_ResponseCode: "00",
    vnp_TransactionStatus: "00",
    ...patch,
  };

  return {
    ...query,
    vnp_SecureHash: signature(
      query,
      process.env.VNPAY_HASH_SECRET
    ),
  };
}

function fakeDatabase({
  initialQuantity = 0,
  orderQuantity = 1,
} = {}) {
  const state = {
    orderStatus: "PENDING",
    inventoryQuantity: initialQuantity,
    grants: 0,
  };

  const order = {
    id: ORDER_ID,
    user_id: "00000000-0000-4000-8000-000000000001",
    item_code: "ROYAL_LANTERN",
    quantity: orderQuantity,
    amount: 9000,
    payment_provider: "VNPAY",
  };

  const tx = {
    $queryRaw: async () => [],

    digital_orders: {
      updateMany: async ({ where, data }) => {
        assert.equal(where.id, ORDER_ID);

        if (state.orderStatus !== where.status) {
          return { count: 0 };
        }

        state.orderStatus = data.status;
        return { count: 1 };
      },
    },

    digital_inventory: {
      upsert: async ({ where, create, update }) => {
        assert.equal(
          where.user_id_item_code.user_id,
          order.user_id
        );

        assert.equal(
          where.user_id_item_code.item_code,
          "ROYAL_LANTERN"
        );

        assert.equal(
          create.quantity,
          orderQuantity
        );

        assert.equal(
          update.quantity.increment,
          orderQuantity
        );

        state.grants += 1;
        state.inventoryQuantity += orderQuantity;

        return {
          user_id: order.user_id,
          item_code: order.item_code,
          quantity: state.inventoryQuantity,
        };
      },
    },
  };

  return {
    state,
    digital_orders: {
      findUnique: async ({ where }) =>
        where.id === ORDER_ID ? order : null,
    },
    $transaction: async (action) => action(tx),
  };
}

test("successful digital payment grants inventory once", async () => {
  const db = fakeDatabase();

  const result = await processIpn(callback(), db);

  assert.equal(result.RspCode, "00");
  assert.equal(db.state.orderStatus, "PAID");
  assert.equal(db.state.inventoryQuantity, 1);
  assert.equal(db.state.grants, 1);
});

test("repeated IPN cannot grant a second time", async () => {
  const db = fakeDatabase({
    initialQuantity: 2,
  });

  const query = callback();

  assert.equal(
    (await processIpn(query, db)).RspCode,
    "00"
  );

  assert.equal(
    (await processIpn(query, db)).RspCode,
    "02"
  );

  assert.equal(db.state.inventoryQuantity, 3);
  assert.equal(db.state.grants, 1);
});

test("wrong amount never changes order or inventory", async () => {
  const db = fakeDatabase();

  const result = await processIpn(
    callback({ vnp_Amount: "100" }),
    db
  );

  assert.equal(result.RspCode, "04");
  assert.equal(db.state.orderStatus, "PENDING");
  assert.equal(db.state.inventoryQuantity, 0);
  assert.equal(db.state.grants, 0);
});

test("tampered callback never grants inventory", async () => {
  const db = fakeDatabase();

  const query = {
    ...callback(),
    vnp_TransactionNo: "999999999",
  };

  const result = await processIpn(query, db);

  assert.equal(result.RspCode, "97");
  assert.equal(db.state.grants, 0);
});

test("failed payment does not consume or grant inventory", async () => {
  const db = fakeDatabase({
    initialQuantity: 3,
  });

  const result = await processIpn(
    callback({
      vnp_ResponseCode: "24",
      vnp_TransactionStatus: "02",
    }),
    db
  );

  assert.equal(result.RspCode, "00");
  assert.equal(db.state.orderStatus, "FAILED");
  assert.equal(db.state.inventoryQuantity, 3);
  assert.equal(db.state.grants, 0);
});

test("an unknown order never grants inventory", async () => {
  const db = fakeDatabase();

  const result = await processIpn(
    callback({
      vnp_TxnRef: "DI" + "b".repeat(30),
    }),
    db
  );

  assert.equal(result.RspCode, "01");
  assert.equal(db.state.grants, 0);
});

test("an order belonging to another provider is rejected", async () => {
  const db = fakeDatabase();
  db.digital_orders.findUnique = async () => ({
    id: ORDER_ID,
    user_id: "00000000-0000-4000-8000-000000000001",
    item_code: "ROYAL_LANTERN",
    quantity: 1,
    amount: 9000,
    payment_provider: "SEPAY",
  });

  const result = await processIpn(callback(), db);
  assert.equal(result.RspCode, "01");
  assert.equal(result.Message, "Order belongs to another provider");
  assert.equal(db.state.grants, 0);
});
