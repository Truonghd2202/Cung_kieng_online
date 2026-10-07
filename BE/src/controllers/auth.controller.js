const authService = require("../services/auth.service");
const env = require("../config/env");
const { durationToMilliseconds } = require("../utils/token");
const { sendSuccess } = require("../utils/response");

function refreshCookieOptions() {
  return {
    httpOnly: true,
    secure: env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/api/auth",
    maxAge: durationToMilliseconds(env.JWT_REFRESH_EXPIRES_IN),
  };
}

function setRefreshCookie(res, token) {
  res.cookie("refreshToken", token, refreshCookieOptions());
}

function clearRefreshCookie(res) {
  const { maxAge, ...options } = refreshCookieOptions();
  res.clearCookie("refreshToken", options);
}

async function register(req, res) {
  const result = await authService.register(req.body);
  setRefreshCookie(res, result.refreshToken);
  return sendSuccess(res, {
    statusCode: 201,
    message: "Registered successfully",
    data: { user: result.user, accessToken: result.accessToken },
  });
}

async function login(req, res) {
  const result = await authService.login(req.body);
  setRefreshCookie(res, result.refreshToken);
  return sendSuccess(res, {
    message: "Logged in successfully",
    data: { user: result.user, accessToken: result.accessToken },
  });
}

async function refresh(req, res) {
  const result = await authService.refresh(req.cookies?.refreshToken);
  setRefreshCookie(res, result.refreshToken);
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

module.exports = { register, login, refresh, logout, logoutAll, me, changePassword, refreshCookieOptions };
