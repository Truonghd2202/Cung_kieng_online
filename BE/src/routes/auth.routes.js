const express = require("express");
const controller = require("../controllers/auth.controller");
const authenticate = require("../middleware/auth.middleware");
const validate = require("../middleware/validation.middleware");
const { authRateLimit } = require("../middleware/rateLimit.middleware");
const { registerSchema, loginSchema, googleLoginSchema, changePasswordSchema, forgotPasswordSchema, verifyResetCodeSchema, resetPasswordSchema } = require("../validators/auth.validator");

const router = express.Router();

router.post("/register", authRateLimit, validate(registerSchema), controller.register);
router.post("/login", authRateLimit, validate(loginSchema), controller.login);
router.post("/google", authRateLimit, validate(googleLoginSchema), controller.googleLogin);
router.post("/forgot-password", authRateLimit, validate(forgotPasswordSchema), controller.forgotPassword);
router.post("/verify-reset-code", authRateLimit, validate(verifyResetCodeSchema), controller.verifyResetCode);
router.post("/reset-password", authRateLimit, validate(resetPasswordSchema), controller.resetPassword);
router.post("/refresh", controller.refresh);
router.post("/logout", controller.logout);
router.post("/logout-all", authenticate, controller.logoutAll);
router.get("/me", authenticate, controller.me);
router.patch("/change-password", authenticate, validate(changePasswordSchema), controller.changePassword);

module.exports = router;
