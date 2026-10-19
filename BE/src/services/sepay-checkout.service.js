const env = require("../config/env");
const ApiError = require("../utils/api-error");
const {
  getSePayClient,
  isSePayConfigured,
} = require("../config/sepay");

async function createSePayCheckout(order, description) {
  if (!isSePayConfigured()) {
    throw new ApiError(503, "Chưa cấu hình thanh toán SePay.");
  }

  if (
    order.payment_provider !== "SEPAY" ||
    order.payment_environment !== env.SEPAY_ENV
  ) {
    throw new ApiError(
      409,
      "Đơn hàng thuộc cổng thanh toán hoặc môi trường khác."
    );
  }

  if (
    order.status !== "PENDING" ||
    new Date(order.expires_at).getTime() <= Date.now()
  ) {
    throw new ApiError(
      409,
      "Đơn đã được xử lý hoặc hết thời hạn mở thanh toán."
    );
  }

  const client = await getSePayClient();

  // FE dùng mã này để hỏi BE về trạng thái đơn.
  // Tham số trên URL không phải bằng chứng đã thanh toán.
  const returnUrl = new URL("/membership", env.APP_BASE_URL);
  returnUrl.searchParams.set("orderId", order.id);

  const fields = client.checkout.initOneTimePaymentFields({
    operation: "PURCHASE",
    payment_method: "BANK_TRANSFER",
    order_invoice_number: order.id,
    order_amount: order.amount,
    currency: "VND",
    order_description: description,
    success_url: returnUrl.toString(),
    error_url: returnUrl.toString(),
    cancel_url: returnUrl.toString(),
  });

  return {
    orderId: order.id,
    provider: "SEPAY",
    environment: env.SEPAY_ENV,
    checkout: {
      method: "POST",
      action: client.checkout.initCheckoutUrl(),
      fields,
    },
  };
}

module.exports = { createSePayCheckout };
