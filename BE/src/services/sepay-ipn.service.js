const { timingSafeEqual } = require("node:crypto");
const env = require("../config/env");
const prisma = require("../config/prisma");
const ApiError = require("../utils/api-error");
const { addMembershipMonths } = require("../utils/vnpay");
const {
  grantYearlyGifts,
  grantPurchasedItem,
} = require("./digital-inventory.service");
const {
  assertPaymentEnvironment,
} = require("./payment-environment.service");
const {
  recordVoidNotification,
} = require("./payment-alert.service");

const PLAN_MONTHS = {
  TAM_AN_MONTHLY: 1,
  TAM_AN_YEARLY: 12,
};

function authenticateSePayIpn(receivedKey) {
  const expected = env.SEPAY_IPN_SECRET;

  if (!expected || expected.length < 32) {
    throw new ApiError(503, "Chưa cấu hình xác thực IPN.");
  }

  if (typeof receivedKey !== "string") {
    throw new ApiError(401, "IPN không được xác thực.");
  }

  const received = Buffer.from(receivedKey);
  const configured = Buffer.from(expected);

  if (
    received.length !== configured.length ||
    !timingSafeEqual(received, configured)
  ) {
    throw new ApiError(401, "IPN không được xác thực.");
  }
}

// Chỉ nhận số nguyên VND, hoặc dạng có phần thập phân bằng 0.
function readVnd(value) {
  if (typeof value !== "string" && typeof value !== "number") {
    return null;
  }

  const text = String(value);

  if (!/^\d+(?:\.0{1,2})?$/.test(text)) {
    return null;
  }

  const amount = Number(text);

  return Number.isSafeInteger(amount) ? amount : null;
}

async function processSePayIpn(body) {
  if (!body || typeof body !== "object") {
    throw new ApiError(422, "Thông báo không hợp lệ.");
  }

  if (body.notification_type === "TRANSACTION_VOID") {
    return recordVoidNotification(body);
  }

  if (body.notification_type !== "ORDER_PAID") {
    throw new ApiError(422, "Loại thông báo chưa được hỗ trợ.");
  }

  const incomingOrder = body.order;
  const incomingTransaction = body.transaction;

  const id = incomingOrder?.order_invoice_number;

  if (
    typeof id !== "string" ||
    !/^(?:[a-f0-9]{32}|DI[a-f0-9]{30})$/i.test(id)
  ) {
    throw new ApiError(422, "Mã đơn không hợp lệ.");
  }

  if (
    incomingOrder.order_status !== "CAPTURED" ||
    incomingTransaction?.transaction_status !== "APPROVED" ||
    incomingTransaction.transaction_type !== "PAYMENT" ||
    incomingOrder.order_currency !== "VND" ||
    incomingTransaction.transaction_currency !== "VND"
  ) {
    throw new ApiError(422, "Chưa xác nhận thanh toán hợp lệ.");
  }

  const transactionId = incomingTransaction.id;

  if (
    typeof transactionId !== "string" ||
    !/^[a-zA-Z0-9_-]{1,80}$/.test(transactionId)
  ) {
    throw new ApiError(422, "Mã giao dịch không hợp lệ.");
  }

  const transactionNo =
    `SEPAY:${env.SEPAY_ENV}:${transactionId}`;

  const digital = id.startsWith("DI");
  const model = digital ? "digital_orders" : "payment_orders";

  const order = await prisma[model].findUnique({
    where: { id },
  });

  if (!order) {
    throw new ApiError(404, "Không tìm thấy đơn.");
  }

  if (
    order.payment_provider !== "SEPAY" ||
    order.payment_environment !== env.SEPAY_ENV
  ) {
    throw new ApiError(409, "Cổng hoặc môi trường không khớp.");
  }

  if (
    readVnd(incomingOrder.order_amount) !== order.amount ||
    readVnd(incomingTransaction.transaction_amount) !== order.amount
  ) {
    throw new ApiError(422, "Số tiền thanh toán không khớp.");
  }

  return prisma.$transaction(async (tx) => {
    await assertPaymentEnvironment(tx);

    await tx.$queryRaw`
      SELECT 1 AS locked
      FROM pg_advisory_xact_lock(
        hashtextextended(${transactionNo}, 0)
      )
    `;

    // Đồng bộ cả thanh toán vật phẩm và gia hạn của cùng tài khoản.
    await tx.$queryRaw`
      SELECT id FROM users
      WHERE id = ${order.user_id}::uuid
      FOR UPDATE
    `;

    const current = await tx[model].findUnique({
      where: { id },
    });

    if (
      current.payment_provider !== "SEPAY" ||
      current.payment_environment !== env.SEPAY_ENV
    ) {
      throw new ApiError(409, "Thông tin đơn đã thay đổi.");
    }

    if (current.status === "PAID") {
      if (current.transaction_no !== transactionNo) {
        throw new ApiError(
          409,
          "Đơn đã được xác nhận bằng giao dịch khác."
        );
      }

      return { success: true, replayed: true };
    }

    if (!["PENDING", "CANCELLED", "EXPIRED"].includes(current.status)) {
      throw new ApiError(409, "Đơn không còn chờ xác nhận.");
    }

    // Ngăn một giao dịch dùng cho hai loại đơn khác nhau.
    const [membershipDuplicate, digitalDuplicate] =
      await Promise.all([
        tx.payment_orders.findUnique({
          where: { transaction_no: transactionNo },
          select: { id: true },
        }),
        tx.digital_orders.findUnique({
          where: { transaction_no: transactionNo },
          select: { id: true },
        }),
      ]);

    if (membershipDuplicate || digitalDuplicate) {
      throw new ApiError(409, "Giao dịch đã được sử dụng.");
    }

    const now = new Date();

    const changed = await tx[model].updateMany({
      where: {
        id,
        status: current.status,
        payment_provider: "SEPAY",
        payment_environment: env.SEPAY_ENV,
      },
      data: {
        status: "PAID",
        transaction_no: transactionNo,
        paid_at: now,
      },
    });

    if (changed.count !== 1) {
      throw new ApiError(409, "Đơn đang được xử lý.");
    }

    if (digital) {
      const grant = await grantPurchasedItem(tx, current);

      if (grant.duplicatePermanent) {
        await tx.digital_orders.update({
          where: { id: current.id },
          data: {
            payment_review_status: "OPEN",
            payment_review_note:
              "Đã nhận thanh toán nhưng tài khoản đã sở hữu vật phẩm vĩnh viễn. Không cấp thêm bản sao. Cần đối chiếu và xử lý khoản thanh toán thừa.",
          },
        });
      }

      return {
        success: true,
        replayed: false,
      };
    }

    const plan = await tx.membership_plans.findUnique({
      where: { id: current.plan_id },
    });

    const months = plan && PLAN_MONTHS[plan.code];

    if (!months) {
      throw new ApiError(422, "Gói hội viên không được hỗ trợ.");
    }

    const existing = await tx.subscriptions.findFirst({
      where: {
        user_id: current.user_id,
        status: "ACTIVE",
        membership_plans: {
          code: { in: Object.keys(PLAN_MONTHS) },
        },
      },
      orderBy: { expires_at: "desc" },
    });

    const expiresAt = addMembershipMonths(
      existing?.expires_at > now ? existing.expires_at : now,
      months
    );

    const subscriptionData = {
      plan_id: current.plan_id,
      expires_at: expiresAt,
      provider:
        env.SEPAY_ENV === "sandbox"
          ? "SEPAY_SANDBOX"
          : "SEPAY",
      provider_subscription_id: current.id,
    };

    if (existing) {
      await tx.subscriptions.update({
        where: { id: existing.id },
        data: {
          ...subscriptionData,
          updated_at: now,
        },
      });
    } else {
      await tx.subscriptions.create({
        data: {
          ...subscriptionData,
          user_id: current.user_id,
        },
      });
    }

    if (plan.code === "TAM_AN_YEARLY") {
      await grantYearlyGifts(tx, current.user_id);
    }

    return { success: true, replayed: false };
  });
}

module.exports = {
  authenticateSePayIpn,
  processSePayIpn,
};
