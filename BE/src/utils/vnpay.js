const { createHmac, timingSafeEqual } = require("node:crypto");

function encodedParams(params) {
  return Object.keys(params).filter((key) => key.startsWith("vnp_") && !["vnp_SecureHash", "vnp_SecureHashType"].includes(key))
    .sort().map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(params[key]).replace(/%20/g, "+")}`).join("&");
}
function signature(params, secret) {
  return createHmac("sha512", secret).update(encodedParams(params)).digest("hex");
}
function verifyCallback(params, secret) {
  if (!secret || Object.values(params).some((value) => typeof value !== "string")) return false;
  if (!/^[a-f0-9]{128}$/i.test(params.vnp_SecureHash || "")) return false;
  return timingSafeEqual(Buffer.from(signature(params, secret), "hex"), Buffer.from(params.vnp_SecureHash, "hex"));
}
function vietnamTimestamp(date) {
  return new Date(date.getTime() + 7 * 3600000).toISOString().replace(/[-:T]/g, "").slice(0, 14);
}
function addMembershipMonths(start, months) {
  if (!Number.isInteger(months) || months < 1) {
    throw new Error("Invalid membership duration");
  }

  const result = new Date(start);
  const day = result.getUTCDate();

  result.setUTCDate(1);
  result.setUTCMonth(result.getUTCMonth() + months);

  const monthEnd = new Date(result);
  monthEnd.setUTCMonth(monthEnd.getUTCMonth() + 1, 0);

  result.setUTCDate(
    Math.min(day, monthEnd.getUTCDate())
  );

  return result;
}

function addMembershipMonth(start) {
  return addMembershipMonths(start, 1);
}

module.exports = {
  encodedParams,
  signature,
  verifyCallback,
  vietnamTimestamp,
  addMembershipMonth,
  addMembershipMonths,
};
