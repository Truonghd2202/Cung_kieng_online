const service = require("../services/admin.service");
const signalAdminService = require("../services/signal-admin.service");
const ApiError = require("../utils/api-error");
const { sendSuccess } = require("../utils/response");

async function overview(_req, res) { return sendSuccess(res, { data: await service.getOverview() }); }
async function articles(req, res) { return sendSuccess(res, { data: await service.listArticles(req.validated.query) }); }
async function calendar(req, res) { return sendSuccess(res, { data: await service.listCalendarEvents(req.validated.query) }); }
async function xam(req, res) { return sendSuccess(res, { data: await service.listXamLots(req.validated.query) }); }
async function rituals(req, res) { return sendSuccess(res, { data: await service.listRituals(req.validated.query) }); }
async function prayers(req, res) { return sendSuccess(res, { data: await service.listPrayers(req.validated.query) }); }
async function interests(req, res) { return sendSuccess(res, { data: await service.listMembershipInterests(req.validated.query) }); }
async function auditLogs(req, res) { return sendSuccess(res, { data: await service.listAuditLogs(req.validated.query) }); }
async function updateArticle(req, res) { return sendSuccess(res, { data: await service.updateArticleReview(req.params.id, req.user.id, req.body) }); }
async function updateCalendar(req, res) { return sendSuccess(res, { data: await service.updateCalendarReview(req.params.id, req.user.id, req.body) }); }
async function updateXam(req, res) { return sendSuccess(res, { data: await service.updateXamReview(req.params.id, req.user.id, req.body) }); }
async function updateRitual(req, res) { return sendSuccess(res, { data: await service.updateRitualReview(req.params.id, req.user.id, req.body) }); }
async function updatePrayer(req, res) { return sendSuccess(res, { data: await service.updatePrayerReview(req.params.id, req.user.id, req.body) }); }

async function signals(req, res) { return sendSuccess(res, { data: await signalAdminService.list(req.validated.query) }); }
async function signal(req, res) {
  const data = await signalAdminService.get(req.params.id);
  if (!data) throw new ApiError(404, "Signal not found");
  return sendSuccess(res, { data });
}
async function createSignal(req, res) { return sendSuccess(res, { statusCode: 201, data: await signalAdminService.save(null, req.user.id, req.body) }); }
async function updateSignal(req, res) {
  const data = await signalAdminService.save(req.params.id, req.user.id, req.body);
  if (!data) throw new ApiError(404, "Signal not found");
  return sendSuccess(res, { data });
}
async function reviewSignal(req, res) {
  const data = await signalAdminService.review(req.params.id, req.user.id, req.body);
  if (!data) throw new ApiError(404, "Signal not found");
  return sendSuccess(res, { data });
}
async function signalAuditLogs(req, res) { return sendSuccess(res, { data: await signalAdminService.logs(req.params.id) }); }

module.exports = { overview, articles, calendar, xam, rituals, prayers, interests, auditLogs, updateArticle, updateCalendar, updateXam, updateRitual, updatePrayer, signals, signal, createSignal, updateSignal, reviewSignal, signalAuditLogs };
