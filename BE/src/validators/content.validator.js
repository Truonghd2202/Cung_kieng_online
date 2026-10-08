const { z } = require("zod");

const listQuerySchema = z.object({
  region: z.enum(["NORTH", "CENTRAL", "SOUTH", "NATIONWIDE"]).optional(),
  category: z.string().trim().max(120).optional(),
  limit: z.coerce.number().int().min(1).max(100).default(50),
});

const calendarQuerySchema = z.object({
  month: z.coerce.number().int().min(1).max(12).optional(),
  category: z.string().trim().max(100).optional(),
  limit: z.coerce.number().int().min(1).max(100).default(50),
});

const dailyProverbQuerySchema = z.object({
  date: z.iso.date().optional(),
});

const reflectionProverbQuerySchema = z.object({
  context: z.enum(["XAM", "KEO"]),
});

module.exports = { listQuerySchema, calendarQuerySchema, dailyProverbQuerySchema, reflectionProverbQuerySchema };
