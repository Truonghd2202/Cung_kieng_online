const service = require("../services/admin.service");
const { sendSuccess } = require("../utils/response");

async function overview(_req, res) { return sendSuccess(res, { data: await service.getOverview() }); }
async function articles(req, res) { return sendSuccess(res, { data: await service.listArticles(req.query) }); }
async function calendar(req, res) { return sendSuccess(res, { data: await service.listCalendarEvents(req.query) }); }
async function xam(req, res) { return sendSuccess(res, { data: await service.listXamLots(req.query) }); }
async function rituals(req, res) { return sendSuccess(res, { data: await service.listRituals(req.query) }); }
async function prayers(req, res) { return sendSuccess(res, { data: await service.listPrayers(req.query) }); }
async function interests(req, res) { return sendSuccess(res, { data: await service.listMembershipInterests(req.query) }); }
async function auditLogs(req, res) { return sendSuccess(res, { data: await service.listAuditLogs(req.query) }); }
async function updateArticle(req, res) { return sendSuccess(res, { data: await service.updateArticleReview(req.params.id, req.user.id, req.body) }); }
async function updateCalendar(req, res) { return sendSuccess(res, { data: await service.updateCalendarReview(req.params.id, req.user.id, req.body) }); }
async function updateXam(req, res) { return sendSuccess(res, { data: await service.updateXamReview(req.params.id, req.user.id, req.body) }); }
async function updateRitual(req, res) { return sendSuccess(res, { data: await service.updateRitualReview(req.params.id, req.user.id, req.body) }); }
async function updatePrayer(req, res) { return sendSuccess(res, { data: await service.updatePrayerReview(req.params.id, req.user.id, req.body) }); }

module.exports = { overview, articles, calendar, xam, rituals, prayers, interests, auditLogs, updateArticle, updateCalendar, updateXam, updateRitual, updatePrayer };
