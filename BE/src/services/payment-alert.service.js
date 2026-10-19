const { createHash } = require("node:crypto");
const prisma = require("../config/prisma");
const env = require("../config/env");
const ApiError = require("../utils/api-error");
const {
  assertPaymentEnvironment,
} = require("./payment-environment.service");

async function recordVoidNotification(body) {
  await assertPaymentEnvironment();

  const orderId = body.order?.order_invoice_number;
  const transactionId = body.transaction?.id;

  if (
    typeof orderId !== "string" ||
    !/^(?:[a-f0-9]{32}|DI[a-f0-9]{30})$/i.test(orderId) ||
    typeof transactionId !== "string" ||
    !/^[a-zA-Z0-9_-]{1,80}$/.test(transactionId)
  ) {
    throw new ApiError(422, "Thông báo hủy không hợp lệ.");
  }

  const model = orderId.startsWith("DI")
    ? "digital_orders"
    : "payment_orders";

  const order = await prisma[model].findUnique({
    where: { id: orderId },
    select: {
      user_id: true,
      payment_provider: true,
      payment_environment: true,
    },
  });

  if (!order) {
    throw new ApiError(404, "Không tìm thấy đơn.");
  }

  if (
    order.payment_provider !== "SEPAY" ||
    order.payment_environment !== env.SEPAY_ENV
  ) {
    throw new ApiError(409, "Môi trường hoặc cổng không khớp.");
  }

  const id = createHash("sha256")
    .update(JSON.stringify([
      env.SEPAY_ENV,
      "TRANSACTION_VOID",
      orderId,
      transactionId,
    ]))
    .digest("hex");

  await prisma.payment_alerts.upsert({
    where: { id },
    create: {
      id,
      order_id: orderId,
      user_id: order.user_id,
      environment: env.SEPAY_ENV,
      event_type: "TRANSACTION_VOID",
      transaction_id: transactionId,
    },
    // Thông báo lặp không mở lại cảnh báo đã xử lý.
    update: {},
  });

  return {
    success: true,
    reviewRequired: true,
  };
}

async function recordMultipleApprovedPayments(orderId, transactions) {
  await assertPaymentEnvironment();

  if (
    typeof orderId !== "string" ||
    !/^(?:[a-f0-9]{32}|DI[a-f0-9]{30})$/.test(orderId)
  ) {
    throw new ApiError(422, "Mã đơn không hợp lệ.");
  }

  if (
    !Array.isArray(transactions) ||
    transactions.length < 2
  ) {
    throw new ApiError(422, "Thiếu dữ liệu giao dịch cần đối chiếu.");
  }

  const transactionIds = transactions.map((transaction) => {
    const id = transaction?.id;

    if (
      typeof id !== "string" ||
      !/^[a-zA-Z0-9_-]{1,80}$/.test(id)
    ) {
      throw new ApiError(422, "Mã giao dịch không hợp lệ.");
    }

    return id;
  });

  const uniqueIds = [...new Set(transactionIds)].sort();

  // Cùng một giao dịch bị lặp trong response chưa phải
  // bằng chứng có hai khoản thanh toán riêng biệt.
  if (uniqueIds.length < 2) {
    throw new ApiError(
      409,
      "Dữ liệu giao dịch bị lặp. Cần kiểm tra lại với SePay."
    );
  }

  const model = orderId.startsWith("DI")
    ? "digital_orders"
    : "payment_orders";

  const order = await prisma[model].findUnique({
    where: { id: orderId },
    select: {
      user_id: true,
      payment_provider: true,
      payment_environment: true,
    },
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

  // Một cảnh báo cho từng giao dịch để giữ mã tham chiếu.
  // Gửi lại cùng dữ liệu không tạo bản ghi trùng.
  await prisma.$transaction(
    uniqueIds.map((transactionId) => {
      const id = createHash("sha256")
        .update(
          JSON.stringify([
            env.SEPAY_ENV,
            "MULTIPLE_APPROVED_PAYMENTS",
            orderId,
            transactionId,
          ])
        )
        .digest("hex");

      return prisma.payment_alerts.upsert({
        where: { id },
        create: {
          id,
          order_id: orderId,
          user_id: order.user_id,
          environment: env.SEPAY_ENV,
          event_type: "MULTIPLE_APPROVED_PAYMENTS",
          transaction_id: transactionId,
          status: "OPEN",
        },
        // Không mở lại cảnh báo đã được admin xử lý.
        update: {},
      });
    })
  );
}

module.exports = {
  recordVoidNotification,
  recordMultipleApprovedPayments,
};

