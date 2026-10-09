const moodService = require("../services/mood.service");
const signalService = require("../services/signal.service");
const { sendSuccess } = require("../utils/response");

async function analyzeSignal(req, res) {
  const result = await moodService.analyzeSignal(req.body);
  return sendSuccess(res, { message: result.aiUsed ? "Contextual signal generated" : "Curated contextual signal retrieved", data: result });
}

async function saveSignal(req, res) {
  const { signalId, ...input } = req.body;
  const item = await signalService.saveSignal(req.user.id, signalId, input);
  return sendSuccess(res, { statusCode: 201, message: "Signal saved", data: item });
}

async function createCheckIn(req, res) {
  const result = await moodService.createCheckIn(req.user.id, req.body);
  return sendSuccess(res, { statusCode: 201, message: "Mood check-in created", data: result });
}

async function getToday(req, res) {
  const result = await moodService.getLatest(req.user.id);
  return sendSuccess(res, { message: "Latest mood check-in retrieved", data: result });
}

async function list(req, res) {
  const items = await moodService.list(req.user.id, req.query);
  return sendSuccess(res, { message: "Mood check-ins retrieved", data: { items } });
}

async function updateAction(req, res) {
  const checkIn = await moodService.updateAction(req.user.id, req.params.id, req.body.actionDone);
  return sendSuccess(res, { message: "Mood action updated", data: checkIn });
}

async function statistics(req, res) {
  const result = await moodService.statistics(req.user.id);
  return sendSuccess(res, { message: "Mood statistics retrieved", data: result });
}

module.exports = { analyzeSignal, saveSignal, createCheckIn, getToday, list, updateAction, statistics };
