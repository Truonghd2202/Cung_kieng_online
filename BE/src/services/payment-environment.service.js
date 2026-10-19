const env = require("../config/env");
const prisma = require("../config/prisma");
const ApiError = require("../utils/api-error");

async function assertPaymentEnvironment(client = prisma) {
  const setting = await client.payment_runtime_config.findUnique({
    where: {
      key: "PAYMENT_ENVIRONMENT",
    },
  });

  if (!setting || setting.value !== env.SEPAY_ENV) {
    throw new ApiError(
      503,
      "Môi trường thanh toán không khớp database. Chưa thể xử lý giao dịch."
    );
  }

  if (
    env.NODE_ENV === "production" &&
    env.SEPAY_ENV !== "production"
  ) {
    throw new ApiError(
      503,
      "Máy chủ production chưa được cấu hình thanh toán thật."
    );
  }
}

module.exports = { assertPaymentEnvironment };
