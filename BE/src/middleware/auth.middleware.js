const { verifyAccessToken, credentialVersion } = require("../utils/jwt");
const userRepository = require("../repositories/user.repository");
const { ACCOUNT_STATUS } = require("../constants/role.constant");

async function authenticate(req, res, next) {
  const authorization = req.get("authorization") || "";
  const match = authorization.match(/^Bearer\s+([^\s]+)$/i);

  if (!match) {
    return res.status(401).json({ success: false, message: "Authentication required", errors: [] });
  }

  try {
    const payload = verifyAccessToken(match[1]);
    if (typeof payload !== "object" || !payload.sub) throw new Error("Invalid token payload");

    const user = await userRepository.findAuthStateById(payload.sub);
    if (!user) {
      return res.status(401).json({ success: false, message: "Invalid access token", errors: [] });
    }
    if (payload.ver !== credentialVersion(user.password_hash)) {
      return res.status(401).json({ success: false, message: "Session is no longer valid", errors: [] });
    }
    if (user.status !== ACCOUNT_STATUS.ACTIVE) {
      return res.status(403).json({ success: false, message: "Account is not active", errors: [] });
    }

    req.user = { id: user.id, role: user.role, status: user.status };
    return next();
  } catch (error) {
    if (error.name === "JsonWebTokenError" || error.name === "TokenExpiredError" || error.message === "Invalid token payload") {
      return res.status(401).json({ success: false, message: "Invalid or expired access token", errors: [] });
    }
    return next(error);
  }
}

module.exports = authenticate;
module.exports.authenticate = authenticate;
