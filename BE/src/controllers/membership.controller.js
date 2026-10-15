const service = require("../services/membership.service");
const repository = require("../repositories/membership.repository");
const users = require("../repositories/user.repository");
const ApiError = require("../utils/api-error");
const { sendSuccess } = require("../utils/response");

async function getAccountEmail(userId) {
  const user = await users.findPublicById(userId);

  if (!user) {
    throw new ApiError(404, "Không tìm thấy tài khoản.");
  }

  return user.email.trim().toLowerCase();
}

async function getInterest(req, res) {
  const email = await getAccountEmail(req.user.id);
  const record = await repository.findInterest(email);

  return sendSuccess(res, {
    message: "Đã kiểm tra đăng ký quan tâm",
    data: {
      registered: Boolean(record),
      email,
      registeredAt: record?.created_at || null,
    },
  });
}

async function registerInterest(req, res) {
  const email = await getAccountEmail(req.user.id);
  const interest = await service.registerInterest(email);

  return sendSuccess(res, {
    statusCode: 201,
    message: "Đã ghi nhận đăng ký quan tâm",
    data: interest,
  });
}

async function removeInterest(req, res) {
  const email = await getAccountEmail(req.user.id);

  await service.removeInterest(req.user.id, email);

  return sendSuccess(res, {
    message: "Đã hủy đăng ký quan tâm",
  });
}

module.exports = {
  getInterest,
  registerInterest,
  removeInterest,
};
