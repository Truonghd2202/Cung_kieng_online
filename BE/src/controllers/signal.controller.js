
const signalService = require("../services/signal.service");
const { sendSuccess } = require("../utils/response");

async function list(req, res) {
  const items = await signalService.listSignals(req.query);
  return sendSuccess(res, { message: "Signals retrieved", data: { items } });
}

async function get(req, res) {
  const signal = await signalService.getSignal(req.params.id);
  return sendSuccess(res, { message: "Signal retrieved", data: signal });
}

async function listSaved(req, res) {
  const items = await signalService.getSavedSignals(req.user.id);
  return sendSuccess(res, { message: "Saved signals retrieved", data: { items } });
}

async function save(req, res) {
  const item = await signalService.saveSignal(req.user.id, req.params.id, req.body);
  return sendSuccess(res, { statusCode: 201, message: "Signal saved", data: item });
}

async function updateSaved(req, res) {
  const item = await signalService.updateSavedSignal(req.user.id, req.params.id, req.body.starred);
  return sendSuccess(res, { message: "Saved signal updated", data: item });
}

async function removeSaved(req, res) {
  await signalService.deleteSavedSignal(req.user.id, req.params.id);
  return sendSuccess(res, { message: "Saved signal deleted" });
}

module.exports = { list, get, listSaved, save, updateSaved, removeSaved };
