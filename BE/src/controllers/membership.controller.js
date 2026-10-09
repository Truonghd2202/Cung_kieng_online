const service = require("../services/membership.service");
const { sendSuccess } = require("../utils/response");

async function registerInterest(req, res) {
  const interest = await service.registerInterest(req.body.email);
  return sendSuccess(res, { statusCode: 201, message: "Membership interest registered", data: interest });
}

async function removeInterest(req, res) {
  await service.removeInterest(req.user.id, req.body.email);
  return sendSuccess(res, { message: "Membership interest removed" });
}

module.exports = { registerInterest, removeInterest };
