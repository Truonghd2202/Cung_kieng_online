
const { z } = require("zod");

const moodValues = [
  "An yên",
  "Chênh vênh",
  "Băn khoăn",
  "Nôn nóng",
  "Biết ơn",
  "Cần điểm tựa",
];

const moodSchema = z.enum(moodValues);

const checkInSchema = z.object({
  mood: moodSchema,
  note: z.string().trim().max(2000).optional(),
  intensity: z.coerce.number().int().min(1).max(5).optional(),
  signalId: z.string().trim().min(1).optional(),
  actionDone: z.boolean().optional(),
});

const checkInQuerySchema = z.object({
  limit: z.coerce.number().int().min(1).max(100).default(30),
  mood: moodSchema.optional(),
});

const savedSignalSchema = z.object({
  checkInId: z.string().uuid().optional(),
  note: z.string().trim().max(2000).optional(),
  actionDone: z.boolean().optional(),
});

const savedSignalUpdateSchema = z.object({
  starred: z.boolean(),
});

const signalQuerySchema = z.object({
  mood: moodSchema.optional(),
  limit: z.coerce.number().int().min(1).max(100).default(20),
});

module.exports = {
  moodValues,
  checkInSchema,
  checkInQuerySchema,
  savedSignalSchema,
  savedSignalUpdateSchema,
  signalQuerySchema,
};
