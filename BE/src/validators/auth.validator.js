const { z } = require("zod");

const password = z
  .string()
  .min(8, "Password must contain at least 8 characters")
  .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
  .regex(/[a-z]/, "Password must contain at least one lowercase letter")
  .regex(/[0-9]/, "Password must contain at least one number");

const registerSchema = z.object({
  fullName: z.string().trim().min(1, "Full name is required").max(120),
  email: z.string().trim().toLowerCase().email("Email is invalid").max(255),
  password,
});

const loginSchema = z.object({
  email: z.string().trim().toLowerCase().email("Email is invalid").max(255),
  password: z.string().min(1, "Password is required"),
});

const googleLoginSchema = z.object({
  credential: z.string().min(1, "Google credential is required").max(8192),
});

const changePasswordSchema = z
  .object({
    currentPassword: z.string().min(1, "Current password is required"),
    newPassword: password,
  })
  .refine((value) => value.currentPassword !== value.newPassword, {
    path: ["newPassword"],
    message: "New password must be different from current password",
  });

const forgotPasswordSchema = z.object({
  email: z.string().trim().toLowerCase().email("Email is invalid").max(255),
});

const verifyResetCodeSchema = z.object({
  email: z.string().trim().toLowerCase().email("Email is invalid").max(255),
  code: z.string().regex(/^\d{6}$/, "Verification code must contain 6 digits"),
});

const resetPasswordSchema = z.object({
  email: z.string().trim().toLowerCase().email("Email is invalid").max(255),
  code: z.string().regex(/^\d{6}$/, "Verification code must contain 6 digits"),
  newPassword: password,
});

module.exports = { registerSchema, loginSchema, googleLoginSchema, changePasswordSchema, forgotPasswordSchema, verifyResetCodeSchema, resetPasswordSchema, password };
