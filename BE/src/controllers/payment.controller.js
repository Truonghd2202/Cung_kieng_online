const service = require("../services/payment.service");
const horoscopeService = require("../services/horoscope.service");
const { sendSuccess } = require("../utils/response");

async function checkout(req, res) {
  return sendSuccess(res, {
    statusCode: 201,
    data: await service.checkout(
      req.user.id,
      req.ip,
      req.body.term,
      req.body.requestId
    ),
  });
}
async function membership(req, res) {
  const data = await service.getMembership(req.user?.id);
  data.aiUsage = await horoscopeService.getYearlyUsage(req.user?.id);
  return sendSuccess(res, { data });
}
async function order(req, res) { return sendSuccess(res, { data: await service.getOrder(req.user.id, req.params.id) }); }
async function ipn(req, res) {
  try { return res.json(await service.processIpn(req.query)); }
  catch { return res.json({ RspCode: "99", Message: "Please retry" }); }
}
module.exports = { checkout, membership, order, ipn };
