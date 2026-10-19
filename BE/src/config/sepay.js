const env = require("./env");

let clientPromise;

function isSePayConfigured() {
  return Boolean(
    env.SEPAY_MERCHANT_ID?.trim() &&
    env.SEPAY_SECRET_KEY?.trim() &&
    env.SEPAY_IPN_SECRET &&
    env.SEPAY_IPN_SECRET.length >= 32
  );
}

async function getSePayClient() {
  if (!isSePayConfigured()) {
    throw new Error("Chưa cấu hình cổng thanh toán SePay.");
  }

  if (!clientPromise) {
    clientPromise = import("sepay-pg-node")
      .then(({ SePayPgClient }) => {
        return new SePayPgClient({
          env: env.SEPAY_ENV,
          merchant_id: env.SEPAY_MERCHANT_ID,
          secret_key: env.SEPAY_SECRET_KEY,
        });
      })
      .catch((error) => {
        clientPromise = undefined;
        throw error;
      });
  }

  return clientPromise;
}

module.exports = {
  isSePayConfigured,
  getSePayClient,
};
