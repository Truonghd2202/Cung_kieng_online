const ApiError = require("../utils/api-error");
const { ROLE } = require("../constants/role.constant");

function requireContentTeam(req, _res, next) {
  if (![ROLE.ADMIN, ROLE.EDITOR].includes(req.user?.role)) {
    return next(new ApiError(403, "Editorial access required"));
  }
  return next();
}

module.exports = requireContentTeam;
