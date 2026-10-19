const path = require("node:path");

require("dotenv").config({
  path: path.resolve(__dirname, "../.env.test"),
  override: true,
});

const testUrl = process.env.TEST_DATABASE_URL;

if (!testUrl) {
  throw new Error("Thiếu TEST_DATABASE_URL.");
}

const parsed = new URL(testUrl);

if (
  parsed.protocol !== "postgresql:" ||
  parsed.hostname !== "127.0.0.1" ||
  parsed.port !== "55432" ||
  parsed.pathname !== "/tin_lam_test"
) {
  throw new Error(
    "Chỉ cho phép database test local 127.0.0.1:55432/tin_lam_test."
  );
}

// Phải thiết lập trước khi import config hoặc service.
process.env.NODE_ENV = "test";
process.env.DATABASE_URL = testUrl;
process.env.SEPAY_ENV = "sandbox";
process.env.MEMBERSHIP_SALES_ENABLED = "false";
process.env.DIGITAL_SALES_ENABLED = "false";
process.env.JWT_ACCESS_SECRET =
  "local-test-only-access-secret-123456789";

const test = require("node:test");
const assert = require("node:assert/strict");
const { randomUUID } = require("node:crypto");

const prisma = require("../src/config/prisma");
const {
  processSePayIpn,
} = require("../src/services/sepay-ipn.service");

function callback(orderId, transactionId) {
  return {
    notification_type: "ORDER_PAID",
    order: {
      order_invoice_number: orderId,
      order_status: "CAPTURED",
      order_currency: "VND",
      order_amount: "9000",
    },
    transaction: {
      id: transactionId,
      transaction_status: "APPROVED",
      transaction_type: "PAYMENT",
      transaction_currency: "VND",
      transaction_amount: "9000",
    },
  };
}

async function createOrder(userId) {
  const id = "DI" + randomUUID().replaceAll("-", "").slice(0, 30);

  await prisma.digital_orders.create({
    data: {
      id,
      user_id: userId,
      item_code: "ROYAL_LANTERN",
      quantity: 1,
      amount: 9000,
      status: "PENDING",
      payment_provider: "SEPAY",
      payment_environment: "sandbox",
      expires_at: new Date(Date.now() + 15 * 60_000),
    },
  });

  return id;
}

test(
  "SePay xử lý IPN đồng thời mà không cấp vật phẩm lặp",
  { timeout: 60_000 },
  async () => {
    const userId = randomUUID();

    try {
      // Không tự sửa marker để che lỗi cấu hình DB.
      const marker = await prisma.payment_runtime_config.findUnique({
        where: { key: "PAYMENT_ENVIRONMENT" },
      });

      assert.equal(
        marker?.value,
        "sandbox",
        "DB test phải được migrate đầy đủ và có marker sandbox."
      );

      await prisma.users.create({
        data: {
          id: userId,
          full_name: "SePay concurrency test",
          email: `sepay-concurrency-${userId}@example.test`,
          password_hash: "not-a-valid-login-password-hash",
        },
      });

      // Trường hợp 1:
      // Hai yêu cầu cùng đơn, cùng mã giao dịch.
      const firstOrderId = await createOrder(userId);
      const firstTransactionId = randomUUID();
      const body = callback(firstOrderId, firstTransactionId);

      const firstResults = await Promise.all([
        processSePayIpn(body),
        processSePayIpn(body),
      ]);

      assert.equal(
        firstResults.filter((result) => result.replayed === false).length,
        1,
        "Chỉ một yêu cầu được xử lý thanh toán lần đầu."
      );

      assert.equal(
        firstResults.filter((result) => result.replayed === true).length,
        1,
        "Yêu cầu còn lại phải được nhận diện là gửi lại."
      );

      const firstInventory =
        await prisma.digital_inventory.findUnique({
          where: {
            user_id_item_code: {
              user_id: userId,
              item_code: "ROYAL_LANTERN",
            },
          },
        });

      assert.equal(firstInventory?.quantity, 1);

      // Trường hợp 2:
      // Hai đơn khác nhau tranh cùng một mã giao dịch.
      const secondOrderId = await createOrder(userId);
      const thirdOrderId = await createOrder(userId);
      const sharedTransactionId = randomUUID();

      const competingResults = await Promise.allSettled([
        processSePayIpn(
          callback(secondOrderId, sharedTransactionId)
        ),
        processSePayIpn(
          callback(thirdOrderId, sharedTransactionId)
        ),
      ]);

      const fulfilled = competingResults.filter(
        (result) => result.status === "fulfilled"
      );
      const rejected = competingResults.filter(
        (result) => result.status === "rejected"
      );

      assert.equal(fulfilled.length, 1);
      assert.equal(rejected.length, 1);
      assert.equal(rejected[0].reason.statusCode, 409);

      const competingOrders = await prisma.digital_orders.findMany({
        where: {
          id: { in: [secondOrderId, thirdOrderId] },
          user_id: userId,
        },
      });

      assert.equal(
        competingOrders.filter((order) => order.status === "PAID").length,
        1
      );

      assert.equal(
        competingOrders.filter((order) => order.status === "PENDING").length,
        1
      );

      const finalInventory =
        await prisma.digital_inventory.findUnique({
          where: {
            user_id_item_code: {
              user_id: userId,
              item_code: "ROYAL_LANTERN",
            },
          },
        });

      // Một vật phẩm từ trường hợp 1,
      // một vật phẩm từ giao dịch thắng ở trường hợp 2.
      assert.equal(finalInventory?.quantity, 2);
    } finally {
      try {
        // Chỉ xóa dữ liệu mang UUID của chính bài test.
        // Các bảng liên quan có onDelete: Cascade.
        await prisma.users.deleteMany({
          where: { id: userId },
        });
      } finally {
        await prisma.$disconnect();
      }
    }
  }
);
