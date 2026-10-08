
const userService = require("../services/user.service");
const { sendSuccess } = require("../utils/response");

async function getProfile(req, res) {
  const profile = await userService.getProfile(req.user.id);
  return sendSuccess(res, { message: "Profile retrieved", data: profile });
}

async function updateProfile(req, res) {
  const profile = await userService.updateProfile(req.user.id, req.body);
  return sendSuccess(res, { message: "Profile updated", data: profile });
}

async function getSettings(req, res) {
  const settings = await userService.getSettings(req.user.id);
  return sendSuccess(res, { message: "Settings retrieved", data: settings });
}

async function updateSettings(req, res) {
  const settings = await userService.updateSettings(req.user.id, req.body);
  return sendSuccess(res, { message: "Settings updated", data: settings });
}

async function getTopics(req, res) {
  const topics = await userService.getTopics(req.user.id);
  return sendSuccess(res, { message: "Topics retrieved", data: { topics } });
}

async function replaceTopics(req, res) {
  const topics = await userService.replaceTopics(req.user.id, req.body.topics);
  return sendSuccess(res, { message: "Topics updated", data: { topics } });
}

module.exports = { getProfile, updateProfile, getSettings, updateSettings, getTopics, replaceTopics };
