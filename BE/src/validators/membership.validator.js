const { z } = require("zod");

const interestSchema = z.object({ email: z.string().trim().email().max(254) });

module.exports = { interestSchema };
