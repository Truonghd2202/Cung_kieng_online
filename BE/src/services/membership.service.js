const repository = require("../repositories/membership.repository");
const users = require("../repositories/user.repository");
const ApiError = require("../utils/api-error");

async function registerInterest(email) {
  const record = await repository.registerInterest(email.trim().toLowerCase());
  return { email: record.email, registeredAt: record.created_at };
}

async function removeInterest(userId, email) {
  const user = await users.findPublicById(userId);
  if (!user || user.email.toLowerCase() !== email.trim().toLowerCase()) {
    throw new ApiError(403, "Chỉ có thể hủy đăng ký của email tài khoản đang đăng nhập.");
  }
  await repository.removeInterest(user.email.toLowerCase());
}

module.exports = { registerInterest, removeInterest };
