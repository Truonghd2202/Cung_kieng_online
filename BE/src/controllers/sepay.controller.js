const {
  authenticateSePayIpn,
  processSePayIpn,
} = require("../services/sepay-ipn.service");

async function ipn(req, res, next) {
  try {
    authenticateSePayIpn(req.get("X-Secret-Key"));

    const result = await processSePayIpn(req.body);

    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
}

module.exports = { ipn };
