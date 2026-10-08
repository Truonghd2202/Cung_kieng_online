const { z } = require("zod");

const xinXamDrawSchema = z.object({
  drawId: z.string().uuid().optional(),
  stickNumber: z.coerce.number().int().min(1).max(999),
  xamType: z.string().trim().min(1).max(100),
  region: z.string().trim().max(100).optional(),
  category: z.string().trim().max(100).optional(),
  fortuneType: z.string().trim().max(80).optional(),
  quote: z.string().trim().max(2000).optional(),
  question: z.string().trim().max(2000).optional(),
});

const xinXamRequestSchema = z.object({
  region: z.enum(["Bắc Bộ", "Trung Bộ", "Nam Bộ"]),
  topic: z.enum(["Bình an", "Gia đình", "Học tập", "Công việc"]),
  question: z.string().trim().max(2000).optional(),
});

const savedItemUpdateSchema = z.object({ starred: z.boolean() });

const wishSchema = z.object({
  content: z.string().trim().min(1).max(1000),
  category: z.string().trim().max(100).optional(),
});

const xinKeoSessionSchema = z.object({
  question: z.string().trim().min(1).max(2000),
});

const xinKeoThrowSchema = z.object({}).strict();

module.exports = { xinXamDrawSchema, xinXamRequestSchema, savedItemUpdateSchema, wishSchema, xinKeoSessionSchema, xinKeoThrowSchema };
