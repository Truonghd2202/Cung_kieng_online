const { z } = require("zod");

const listSchema = z.object({
  q: z.string().trim().max(120).optional(),
  page: z.coerce.number().int().min(1).max(10000).default(1),
});
const idParamsSchema = z.object({ id: z.string().uuid() });
const reviewSchema = z.object({
  active: z.boolean().optional(),
  verified: z.boolean().optional(),
  rightsConfirmed: z.boolean().optional(),
  source: z.string().trim().url().refine((value) => /^https:\/\//i.test(value), "Source must use HTTPS").optional(),
  sourceLocator: z.string().trim().max(500).optional(),
  usageRights: z.enum(["confirmed", "public-domain", "permission-required", "unknown"]).optional(),
  reviewNote: z.string().trim().min(8).max(500),
}).strict().refine((value) => value.active !== undefined || value.verified !== undefined, {
  message: "Choose at least one status to update",
});

module.exports = { listSchema, idParamsSchema, reviewSchema };
