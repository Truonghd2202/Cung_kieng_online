const { z } = require("zod");

const listSchema = z.object({
  q: z.string().trim().max(120).optional(),
  page: z.coerce.number().int().min(1).max(10000).default(1),
  status: z.enum(["DRAFT", "IN_REVIEW", "APPROVED", "PUBLISHED", "HIDDEN", "REVOKED", "needs_source", "active", "hidden"]).optional(),
});
const idParamsSchema = z.object({ id: z.string().uuid() });
const reviewSchema = z.object({
  active: z.boolean().optional(),
  verified: z.boolean().optional(),
  rightsConfirmed: z.boolean().optional(),
  source: z.string().trim().refine((value) => !value || /^https:\/\/[^\s]+$/i.test(value), "Source must use HTTPS when provided").optional(),
  sourceLocator: z.string().trim().max(500).optional(),
  usageRights: z.enum(["confirmed", "public-domain", "permission-required", "unknown"]).optional(),
  reviewNote: z.string().trim().min(8).max(500),
}).strict().refine((value) => value.active !== undefined || value.verified !== undefined, {
  message: "Choose at least one status to update",
});

module.exports = { listSchema, idParamsSchema, reviewSchema };
