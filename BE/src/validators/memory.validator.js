const { z } = require("zod");

const memorialSchema = z.object({
  name: z.string().trim().min(1).max(100),
  relation: z.string().trim().min(1).max(80),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  note: z.string().trim().max(2000).optional(),
});

const calendarNoteSchema = z.object({
  title: z.string().trim().min(1).max(255),
  day: z.coerce.number().int().min(1).max(31),
  month: z.coerce.number().int().min(1).max(12),
  year: z.coerce.number().int().min(1).max(9999),
  note: z.string().trim().max(2000).optional(),
});

module.exports = { memorialSchema, calendarNoteSchema };
