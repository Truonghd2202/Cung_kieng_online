const prisma = require("../config/prisma");
const { DAILY_PROVERB_SOURCE } = require("../constants/content");

function listArticles({ region, category, limit, offset = 0 }, client = prisma) { return client.culture_articles.findMany({ where: { active: true, ...(region ? { region } : {}), ...(category ? { category } : {}) }, orderBy: [{ created_at: "asc" }, { slug: "asc" }], skip: offset, take: limit }); }
function findArticle(slug, client = prisma) { return client.culture_articles.findFirst({ where: { slug, active: true } }); }
function listRituals(
  { region, category: occasion, limit, offset = 0, preview = false },
  client = prisma,
) {
  return client.rituals.findMany({
    where: {
      active: true,
      ...(preview ? {} : { verified: true }),
      ...(region ? { region } : {}),
      ...(occasion ? { occasion } : {}),
    },
    orderBy: [{ created_at: "asc" }, { slug: "asc" }],
    skip: offset,
    take: limit,
    include: {
      ritual_steps: { orderBy: { step_number: "asc" } },
      ritual_offerings: { include: { offerings: true } },
      prayers: {
        where: {
          active: true,
          ...(preview ? {} : { verified: true }),
        },
      },
    },
  });
}
function findRitual(slug, client = prisma, preview = false) { return client.rituals.findFirst({ where: { slug, active: true, ...(preview ? {} : { verified: true }) }, include: { ritual_steps: { orderBy: { step_number: "asc" } }, ritual_offerings: { include: { offerings: true } }, prayers: { where: { active: true, ...(preview ? {} : { verified: true }) } } } }); }
function findPrayerReviewLogs(ids, client = prisma) {
  return client.admin_audit_logs.findMany({ where: { target_type: "prayers", target_id: { in: ids }, action: "CONTENT_REVIEW_UPDATED" }, orderBy: { created_at: "desc" }, select: { target_id: true, details: true, created_at: true, users: { select: { full_name: true } } } });
}
function findRitualReviewLogs(ids, client = prisma) {
  return client.admin_audit_logs.findMany({ where: { target_type: "rituals", target_id: { in: ids }, action: "CONTENT_REVIEW_UPDATED" }, orderBy: { created_at: "desc" }, select: { target_id: true, details: true, created_at: true, users: { select: { full_name: true } } } });
}
function listCalendarEvents({ month, category, limit, offset = 0 }, client = prisma) { return client.calendar_events.findMany({ where: { active: true, ...(month ? { month } : {}), ...(category ? { category } : {}) }, orderBy: [{ month: "asc" }, { day: "asc" }, { title: "asc" }], skip: offset, take: limit }); }
function findCalendarEvent(id, client = prisma) { return client.calendar_events.findUnique({ where: { id } }); }
const dailyProverbWhere = { active: true, verified: true, source: DAILY_PROVERB_SOURCE };
function countDailyProverbs(client = prisma) { return client.proverbs.count({ where: dailyProverbWhere }); }
function findDailyProverb(index, client = prisma) { return client.proverbs.findFirst({ where: dailyProverbWhere, orderBy: { content: "asc" }, skip: index }); }

module.exports = { listArticles, findArticle, listRituals, findRitual, findPrayerReviewLogs, findRitualReviewLogs, listCalendarEvents, findCalendarEvent, countDailyProverbs, findDailyProverb };
