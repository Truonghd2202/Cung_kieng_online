const { z } = require("zod");

// Email được lấy từ tài khoản, không nhận từ trình duyệt.
const interestSchema = z.object({}).strict();

module.exports = { interestSchema };
