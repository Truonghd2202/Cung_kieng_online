const service = require("../services/content.service");
const { sendSuccess } = require("../utils/response");
async function listArticles(req, res) { return sendSuccess(res, { message: "Culture articles retrieved", data: { items: await service.listArticles(req.query) } }); }
async function getArticle(req, res) { return sendSuccess(res, { message: "Culture article retrieved", data: await service.getArticle(req.params.slug) }); }
async function listRituals(req, res) { return sendSuccess(res, { message: "Rituals retrieved", data: { items: await service.listRituals(req.query) } }); }
async function getRitual(req, res) { return sendSuccess(res, { message: "Ritual retrieved", data: await service.getRitual(req.params.slug, req.query.preview === "true") }); }
async function listCalendarEvents(req, res) { return sendSuccess(res, { message: "Calendar events retrieved", data: { items: await service.listCalendarEvents(req.query) } }); }
async function getCalendarEvent(req, res) { return sendSuccess(res, { message: "Calendar event retrieved", data: await service.getCalendarEvent(req.params.id) }); }
async function getDailyProverb(req, res) { return sendSuccess(res, { message: "Daily proverb retrieved", data: await service.getDailyProverb(req.query.date) }); }
async function getReflectionProverb(req, res) { return sendSuccess(res, { message: "Reflection proverb retrieved", data: await service.getReflectionProverb(req.query.context) }); }
module.exports = { listArticles, getArticle, listRituals, getRitual, listCalendarEvents, getCalendarEvent, getDailyProverb, getReflectionProverb };
