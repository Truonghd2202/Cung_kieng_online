const path = require("node:path");
const { z } = require("zod");

require("dotenv").config({ path: path.resolve(__dirname, "../../.env") });

const envSchema = z
  .object({
    NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
    PORT: z.coerce.number().int().positive().default(4000),
    DATABASE_URL: z.string().min(1, "DATABASE_URL is required"),
    JWT_ACCESS_SECRET: z.string().min(16, "JWT_ACCESS_SECRET must contain at least 16 characters"),
    JWT_ACCESS_EXPIRES_IN: z.string().default("15m"),
    JWT_REFRESH_EXPIRES_IN: z.string().default("30d"),
    CORS_ORIGINS: z.string().default("http://localhost:3000,http://localhost:5173"),
    LOG_LEVEL: z.enum(["debug", "info", "warn", "error"]).default("info"),
  })
  .superRefine((value, context) => {
    if (value.NODE_ENV === "production" && value.JWT_ACCESS_SECRET.length < 32) {
      context.addIssue({
        code: "custom",
        path: ["JWT_ACCESS_SECRET"],
        message: "JWT_ACCESS_SECRET must contain at least 32 characters in production",
      });
    }
  });

const result = envSchema.safeParse(process.env);

if (!result.success) {
  const details = result.error.issues
    .map((issue) => `${issue.path.join(".")}: ${issue.message}`)
    .join("; ");
  throw new Error(`Invalid environment configuration: ${details}`);
}

module.exports = Object.freeze(result.data);
