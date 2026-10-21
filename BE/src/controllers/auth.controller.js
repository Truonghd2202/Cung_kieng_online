const authService = require("../services/auth.service");
const env = require("../config/env");
const { durationToMilliseconds } = require("../utils/token");
const { sendSuccess } = require("../utils/response");

function refreshCookieOptions(rememberMe = true) {
  const options = {
    httpOnly: true,
    secure: env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/api/v1/auth",
  };
  if (rememberMe) {
    options.maxAge = durationToMilliseconds(env.JWT_REFRESH_EXPIRES_IN);
  }
  return options;
}

function setRefreshCookie(res, token, rememberMe = true) {
  res.cookie("refreshToken", token, refreshCookieOptions(rememberMe));
  // Remove the old cookie scope during migration to the canonical API prefix.
  res.clearCookie("refreshToken", { ...refreshCookieOptions(rememberMe), path: "/api/auth" });
}

function clearRefreshCookie(res) {
  const options = refreshCookieOptions(false);
  res.clearCookie("refreshToken", options);
  res.clearCookie("refreshToken", { ...options, path: "/api/auth" });
}

async function register(req, res) {
  const result = await authService.register(req.body);
  return sendSuccess(res, {
    statusCode: 201,
    message: "Verification code sent",
    data: result,
  });
}

async function login(req, res) {
  const rememberMe = req.body?.rememberMe === true;
  const result = await authService.login(req.body);
  setRefreshCookie(res, result.refreshToken, rememberMe);
  return sendSuccess(res, {
    message: "Logged in successfully",
    data: { user: result.user, accessToken: result.accessToken },
  });
}

async function googleLogin(req, res) {
  const rememberMe = req.body?.rememberMe === true;
  const result = await authService.loginWithGoogle(req.body.credential);
  setRefreshCookie(res, result.refreshToken, rememberMe);
  return sendSuccess(res, {
    message: "Logged in with Google successfully",
    data: { user: result.user, accessToken: result.accessToken },
  });
}

async function refresh(req, res) {
  const rememberMe = req.headers["x-remember-me"] === "1" || req.body?.rememberMe === true;
  const result = await authService.refresh(req.cookies?.refreshToken);
  setRefreshCookie(res, result.refreshToken, rememberMe);
  return sendSuccess(res, {
    message: "Access token refreshed",
    data: { accessToken: result.accessToken },
  });
}

async function logout(req, res) {
  await authService.logout(req.cookies?.refreshToken);
  clearRefreshCookie(res);
  return sendSuccess(res, { message: "Logged out successfully" });
}

async function logoutAll(req, res) {
  await authService.logoutAll(req.user.id);
  clearRefreshCookie(res);
  return sendSuccess(res, { message: "Logged out from all devices successfully" });
}

async function me(req, res) {
  const user = await authService.getCurrentUser(req.user.id);
  return sendSuccess(res, { message: "Current user retrieved", data: user });
}

async function changePassword(req, res) {
  await authService.changePassword(req.user.id, req.body);
  clearRefreshCookie(res);
  return sendSuccess(res, { message: "Password changed successfully. Please login again." });
}

async function forgotPassword(req, res) {
  const result = await authService.requestPasswordReset(req.body.email);
  return sendSuccess(res, {
    message: "If the address belongs to an account, password reset instructions will be sent when email delivery is configured.",
    data: result,
  });
}

async function requestEmailVerification(req, res) {
  await authService.requestEmailVerification(req.body.email);
  return sendSuccess(res, {
    message: "If this address belongs to an unverified account, a verification code will be sent.",
    data: { requestReceived: true },
  });
}

async function verifyEmail(req, res) {
  const result = await authService.verifyEmail(req.body.email, req.body.code);
  return sendSuccess(res, { message: "Email verified successfully", data: result });
}

async function verifyResetCode(req, res) {
  await authService.verifyResetCode(req.body.email, req.body.code);
  return sendSuccess(res, { message: "Mã xác minh hợp lệ." });
}

async function resetPassword(req, res) {
  await authService.resetPassword(req.body.email, req.body.code, req.body.newPassword);
  return sendSuccess(res, { message: "Password reset successfully. Please log in again." });
}

module.exports = { register, login, googleLogin, refresh, logout, logoutAll, me, changePassword, forgotPassword, verifyResetCode, resetPassword, requestEmailVerification, verifyEmail, refreshCookieOptions };
