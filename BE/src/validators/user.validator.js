
const { z } = require("zod");

const profileSchema = z
  .object({
    fullName: z.string().trim().min(1, "Full name is required").max(120).optional(),
    dateOfBirth: z.iso.date().nullable().optional(),
    gender: z.string().trim().max(30).nullable().optional(),
    phone: z.string().trim().max(30).nullable().optional(),
    bio: z.string().trim().max(1000).nullable().optional(),
  })
  .refine((value) => Object.keys(value).length > 0, { message: "At least one profile field is required" });

const settingsSchema = z
  .object({
    locale: z.enum(["vi", "en"]).optional(),
    theme: z.enum(["light", "dark", "system"]).optional(),
    emailNotifications: z.boolean().optional(),
    pushNotifications: z.boolean().optional(),
  })
  .refine((value) => Object.keys(value).length > 0, { message: "At least one setting is required" });

const validTopics = ["cadao", "xinxam", "bamien", "nghile", "trian"];
const topicsSchema = z.object({
  topics: z
    .array(z.enum(validTopics))
    .max(validTopics.length)
    .transform((topics) => [...new Set(topics)]),
});

module.exports = { profileSchema, settingsSchema, topicsSchema, validTopics };
