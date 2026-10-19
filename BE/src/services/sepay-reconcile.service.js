const env = require("../config/env");
const prisma = require("../config/prisma");
const ApiError = require("../utils/api-error");
const { isSePayConfigured } = require("../config/sepay");
const { processSePayIpn } = require("./sepay-ipn.service");
const {
  assertPaymentEnvironment,
} = require("./payment-environment.service");
const {
  recordMultipleApprovedPayments,
} = require("./payment-alert.service");

function apiBase() {
  return env.SEPAY_ENV === "sandbox"
    ? "https://pgapi-sandbox.sepay.vn/v1/"
    : "https://pgapi.sepay.vn/v1/";
}

async function sepayGet(path) {
  const authorization = Buffer.from(
    `${env.SEPAY_MERCHANT_ID}:${env.SEPAY_SECRET_KEY}`
  ).toString("base64");

  try {
    const response = await fetch(
      new URL(path, apiBase()),
      {
        method: "GET",
        headers: {
          Authorization: `Basic ${authorization}`,
          Accept: "application/json",
        },
        signal: AbortSignal.timeout(8000),
        redirect: "error",
      }
    );

    if (!response.ok) {
      throw new Error("Provider request failed");
    }

    return await response.json();
  } catch {
    // Không đưa lỗi nhà cung cấp hoặc thông tin xác thực ra FE.
    throw new ApiError(
      503,
      "Chưa đối soát được với SePay. Vui lòng kiểm tra lại sau."
    );
  }
}

async function readLocalOrder(userId, id) {
  if (
    typeof id !== "string" ||
    !/^(?:[a-f0-9]{32}|DI[a-f0-9]{30})$/i.test(id)
  ) {
    throw new ApiError(404, "Không tìm thấy đơn.");
  }

  const digital = id.startsWith("DI");
  const service = digital
    ? require("./digital-shop.service")
    : require("./payment.service");

  return service.getOrder(userId, id);
}

async function reconcileSePayOrder(userId, id) {
  // Kiểm tra quyền sở hữu trước khi gọi nhà cung cấp.
  const local = await readLocalOrder(userId, id);

  if (
    !["PENDING", "CANCELLED", "EXPIRED"].includes(local.status) ||
    local.payment_provider !== "SEPAY"
  ) {
    return local;
  }

  if (local.payment_environment !== env.SEPAY_ENV) {
    throw new ApiError(
      409,
      "Đơn thuộc môi trường thanh toán khác."
    );
  }

  await assertPaymentEnvironment();

  if (!isSePayConfigured()) {
    throw new ApiError(503, "Chưa cấu hình đối soát SePay.");
  }

  const query = new URLSearchParams({
    q: id,
    per_page: "50",
    page: "1",
  });

  const result = await sepayGet(`order?${query}`);

  if (!Array.isArray(result?.data)) {
    throw new ApiError(
      503,
      "Dữ liệu đối soát chưa đúng định dạng."
    );
  }

  const matches = result.data.filter(
    (row) => row.order_invoice_number === id
  );

  if (matches.length > 1) {
    throw new ApiError(
      409,
      "Có nhiều đơn trên cổng trùng mã hóa đơn. Cần quản trị viên kiểm tra."
    );
  }

  if (!matches.length) {
    if (result.meta?.has_more === true) {
      throw new ApiError(
        503,
        "Chưa xác định được đơn trên cổng. Cần kiểm tra lại."
      );
    }

    // Có thể BE đã tạo đơn nhưng người dùng chưa gửi form.
    // Không tự kết luận thất bại hoặc tạo đơn khác.
    return {
      ...(await readLocalOrder(userId, id)),
      reconciliation: "NOT_FOUND_ON_PROVIDER",
    };
  }

  const providerOrderId = matches[0].order_id;

  if (
    typeof providerOrderId !== "string" ||
    !providerOrderId
  ) {
    throw new ApiError(503, "Thiếu mã đơn của SePay.");
  }

  const detail = await sepayGet(
    `order/detail/${encodeURIComponent(providerOrderId)}`
  );

  const remote = detail?.data;

  if (
    !remote ||
    remote.order_invoice_number !== id
  ) {
    throw new ApiError(
      409,
      "Mã đơn đối soát không khớp."
    );
  }

  if (remote.order_status === "CANCELLED") {
    const amountText = String(remote.order_amount ?? "");

    if (
      remote.order_currency !== "VND" ||
      !/^\d+(?:\.0{1,2})?$/.test(amountText) ||
      Number(amountText) !== local.amount
    ) {
      throw new ApiError(
        409,
        "Thông tin đơn hủy không khớp. Cần kiểm tra riêng."
      );
    }

    // Không kết luận hủy nếu dữ liệu có giao dịch đã thu tiền.
    if (!Array.isArray(remote.transactions)) {
      throw new ApiError(
        503,
        "Chưa đủ dữ liệu để xác nhận hủy đơn."
      );
    }

    const hasApprovedPayment = remote.transactions.some(
      (transaction) =>
        transaction.transaction_type === "PAYMENT" &&
        transaction.transaction_status === "APPROVED"
    );

    if (hasApprovedPayment) {
      throw new ApiError(
        409,
        "Đơn báo hủy nhưng có giao dịch được duyệt. Cần quản trị viên kiểm tra."
      );
    }

    const model = id.startsWith("DI")
      ? "digital_orders"
      : "payment_orders";

    await prisma.$transaction(async (tx) => {
      await tx.$queryRaw`
        SELECT id FROM users
        WHERE id = ${userId}::uuid
        FOR UPDATE
      `;

      await tx[model].updateMany({
        where: {
          id,
          user_id: userId,
          status: "PENDING",
          payment_provider: "SEPAY",
          payment_environment: env.SEPAY_ENV,
        },
        data: {
          status: "CANCELLED",
        },
      });
    });

    // IPN có thể đã xác nhận PAID trước khi lấy được khóa.
    // Luôn đọc lại trạng thái thật sau transaction.
    const updated = await readLocalOrder(userId, id);

    return {
      ...updated,
      reconciliation:
        updated.status === "PAID"
          ? "CONFIRMED"
          : "PROVIDER_CANCELLED",
    };
  }

  if (remote.order_status !== "CAPTURED") {
    return {
      ...(await readLocalOrder(userId, id)),
      reconciliation: "AWAITING_PAYMENT",
    };
  }

  if (!Array.isArray(remote.transactions)) {
    throw new ApiError(
      503,
      "Chưa lấy được giao dịch thanh toán."
    );
  }

  const approved = remote.transactions.filter(
    (transaction) =>
      transaction.transaction_type === "PAYMENT" &&
      transaction.transaction_status === "APPROVED"
  );

  if (approved.length > 1) {
    await recordMultipleApprovedPayments(id, approved);

    throw new ApiError(
      409,
      "SePay trả về nhiều giao dịch thành công cho đơn này. Đã ghi nhận cảnh báo để quản trị viên đối chiếu."
    );
  }

  if (approved.length === 0) {
    throw new ApiError(
      409,
      "Chưa tìm thấy giao dịch thành công để xác nhận thanh toán."
    );
  }

  // Dữ liệu này đến từ API đã xác thực của SePay,
  // không lấy trạng thái hay số tiền từ trình duyệt.
  // Dùng chung logic đối chiếu và cấp quyền với IPN.
  await processSePayIpn({
    notification_type: "ORDER_PAID",
    order: remote,
    transaction: approved[0],
  });

  return {
    ...(await readLocalOrder(userId, id)),
    reconciliation: "CONFIRMED",
  };
}

module.exports = { reconcileSePayOrder };
