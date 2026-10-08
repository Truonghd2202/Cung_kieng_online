const prisma = require("../config/prisma");
const { DAILY_PROVERB_SOURCE } = require("../constants/content");

function listArticles({ region, category, limit }, client = prisma) { return client.culture_articles.findMany({ where: { active: true, ...(region ? { region } : {}), ...(category ? { category } : {}) }, orderBy: { created_at: "asc" }, take: limit }); }
function findArticle(slug, client = prisma) { return client.culture_articles.findFirst({ where: { slug, active: true } }); }
function listRituals({ region, category: occasion, limit }, client = prisma) { return client.rituals.findMany({ where: { active: true, ...(region ? { region } : {}), ...(occasion ? { occasion } : {}) }, orderBy: { created_at: "asc" }, take: limit, include: { ritual_steps: { orderBy: { step_number: "asc" } }, ritual_offerings: { include: { offerings: true } }, prayers: true } }); }
function findRitual(slug, client = prisma) { return client.rituals.findFirst({ where: { slug, active: true }, include: { ritual_steps: { orderBy: { step_number: "asc" } }, ritual_offerings: { include: { offerings: true } }, prayers: true } }); }
function listCalendarEvents({ month, category, limit }, client = prisma) { return client.calendar_events.findMany({ where: { active: true, ...(month ? { month } : {}), ...(category ? { category } : {}) }, orderBy: [{ month: "asc" }, { day: "asc" }], take: limit }); }
function findCalendarEvent(id, client = prisma) { return client.calendar_events.findUnique({ where: { id } }); }
const dailyProverbWhere = { active: true, verified: true, source: DAILY_PROVERB_SOURCE };
function countDailyProverbs(client = prisma) { return client.proverbs.count({ where: dailyProverbWhere }); }
function findDailyProverb(index, client = prisma) { return client.proverbs.findFirst({ where: dailyProverbWhere, orderBy: { content: "asc" }, skip: index }); }

module.exports = { listArticles, findArticle, listRituals, findRitual, listCalendarEvents, findCalendarEvent, countDailyProverbs, findDailyProverb };
