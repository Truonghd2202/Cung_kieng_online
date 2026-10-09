const { createCipheriv, createDecipheriv, randomBytes } = require("node:crypto");
const ApiError = require("./api-error");
const PREFIX = "enc:v1:";
function keyBytes(key) {
  if (!/^[a-f0-9]{64}$/i.test(key || "")) throw new ApiError(503, "Kho dữ liệu riêng tư chưa được cấu hình khóa mã hóa.");
  return Buffer.from(key, "hex");
}
function encryptPrivateText(value, userId, key = process.env.PRIVATE_DATA_KEY) {
  if (value === null || value === undefined || value === "") return value;
  const iv = randomBytes(12);
  const cipher = createCipheriv("aes-256-gcm", keyBytes(key), iv);
  cipher.setAAD(Buffer.from(userId));
  const encrypted = Buffer.concat([cipher.update(value, "utf8"), cipher.final()]);
  return PREFIX + Buffer.concat([iv, cipher.getAuthTag(), encrypted]).toString("base64");
}
function decryptPrivateText(value, userId, key = process.env.PRIVATE_DATA_KEY) {
  if (!value?.startsWith(PREFIX)) return value;
  const bytes = Buffer.from(value.slice(PREFIX.length), "base64");
  const decipher = createDecipheriv("aes-256-gcm", keyBytes(key), bytes.subarray(0, 12));
  decipher.setAAD(Buffer.from(userId));
  decipher.setAuthTag(bytes.subarray(12, 28));
  return Buffer.concat([decipher.update(bytes.subarray(28)), decipher.final()]).toString("utf8");
}
module.exports = { encryptPrivateText, decryptPrivateText };
