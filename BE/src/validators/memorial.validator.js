
const { z } = require("zod");

const dateSchema = z.string().regex(/^\d{4}-\d{2}-\d{2}$/).refine((value) => {
  const date = new Date(`${value}T00:00:00.000Z`);
  return !Number.isNaN(date.getTime()) && date.toISOString().slice(0, 10) === value;
}, "Invalid calendar date");

const anniversarySchema = z.object({
  calendar: z.enum(["SOLAR", "LUNAR"]).default("LUNAR"),
  day: z.coerce.number().int().min(1).max(31),
  month: z.coerce.number().int().min(1).max(12),
  year: z.coerce.number().int().min(1).max(9999).optional(),
  repeatYearly: z.boolean().default(true),
  note: z.string().trim().max(500).optional(),
}).refine((value) => value.calendar === "LUNAR" ? value.day <= 30 : value.day <= new Date(Date.UTC(value.year || 2000, value.month, 0)).getUTCDate(), "Invalid anniversary date")
  .refine((value) => value.repeatYearly || value.year !== undefined, "A non-repeating anniversary needs a year");

const memorialSchema = z.object({
  fullName: z.string().trim().min(1).max(255),
  relationship: z.string().trim().max(100).optional(),
  birthDate: dateSchema.nullable().optional(),
  deathDate: dateSchema.nullable().optional(),
  avatarUrl: z.string().url().max(2048).refine((value) => value.startsWith("https://"), "Use an HTTPS image URL").nullable().optional(),
  biography: z.string().trim().max(5000).optional(),
  note: z.string().trim().max(2000).optional(),
  anniversary: anniversarySchema.nullable().optional(),
});

const memorialUpdateSchema = memorialSchema.partial();
const incenseSchema = z.object({ message: z.string().trim().max(1000).optional(), incenseCount: z.coerce.number().int().min(1).max(3).default(1) });

module.exports = { memorialSchema, memorialUpdateSchema, incenseSchema };
