
const { z } = require("zod");

const checkInCatalog = require("../../../shared/checkin-catalog.json");
const moodValues = checkInCatalog.moods.map(({ label }) => label);
const contextValues = checkInCatalog.contexts.map(({ key }) => key);
const contextSchema = z.enum(contextValues);

const moodSchema = z.enum(moodValues);

const checkInSchema = z.object({
  mood: moodSchema,
  contextKey: contextSchema.default("general"),
  note: z.string().trim().max(2000).optional(),
  intensity: z.coerce.number().int().min(1).max(5).optional(),
  signalId: z.string().trim().min(1).optional(),
  excludeSignalId: z.string().trim().min(1).optional(),
  actionDone: z.boolean().optional(),
  idempotencyKey: z.string().uuid().optional(),
});

const analyzeSignalSchema = checkInSchema.pick({ mood: true, contextKey: true }).extend({
  excludeSignalId: z.string().trim().min(1).optional(),
  note: z.string().trim().max(2000).optional(),
});

const checkInQuerySchema = z.object({
  limit: z.coerce.number().int().min(1).max(100).default(30),
  mood: moodSchema.optional(),
});

const moodHistoryQuerySchema = z.object({
  period: z.enum(["week", "month"]).default("week"),
  anchor: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
  mood: moodSchema.optional(),
  page: z.coerce.number().int().min(1).default(1),
  pageSize: z.coerce.number().int().min(1).max(50).default(20),
});

const savedSignalSchema = z.object({
  checkInId: z.string().uuid().optional(),
  mood: moodSchema.optional(),
  contextKey: contextSchema.default("general"),
  // Không cho client gửi nguyên nội dung để làm kết quả có thẩm quyền.
  signalSnapshot: z.never().optional(),

  // Mã xác nhận kết quả do server ký.
  resultToken: z.string().min(1).max(100000).optional(),
  note: z.string().trim().max(2000).optional(),
  actionDone: z.boolean().optional(),
  idempotencyKey: z.string().uuid().optional(),
});

const savedSignalUpdateSchema = z.object({
  starred: z.boolean(),
});

const signalQuerySchema = z.object({
  mood: moodSchema.optional(),
  limit: z.coerce.number().int().min(1).max(100).default(20),
  contextKey: contextSchema.default("general"),
});

module.exports = {
  moodValues,
  contextValues,
  checkInSchema,
  analyzeSignalSchema,
  checkInQuerySchema,
  moodHistoryQuerySchema,
  savedSignalSchema,
  savedSignalUpdateSchema,
  signalQuerySchema,
};
