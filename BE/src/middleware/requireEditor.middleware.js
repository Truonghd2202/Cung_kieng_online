const ApiError = require("../utils/api-error");
const { ROLE } = require("../constants/role.constant");

function requireEditor(req, _res, next) {
  if (req.user?.role !== ROLE.EDITOR) return next(new ApiError(403, "Chỉ Biên tập viên được tạo hoặc sửa nội dung."));
  return next();
}

module.exports = requireEditor;
