const ApiError = require("../utils/api-error");
const { ROLE } = require("../constants/role.constant");

function requireAdmin(req, _res, next) {
  if (req.user?.role !== ROLE.ADMIN) return next(new ApiError(403, "Administrator access required"));
  return next();
}

module.exports = requireAdmin;
