const prisma = require("../config/prisma");
const PAGE_SIZE = 25;

function pageResult(items, total, page) {
  return { items, pagination: { page, pageSize: PAGE_SIZE, total, pageCount: Math.ceil(total / PAGE_SIZE) } };
}

async function getOverview() {
  const [analytics, articleCount, unverifiedArticles, calendarCount, unverifiedCalendar, xamCount, unverifiedXam, memberInterestCount] = await Promise.all([
    require("./analytics.repository").getSummary(),
    prisma.culture_articles.count({ where: { active: true } }),
    prisma.culture_articles.count({ where: { active: true, verified: false } }),
    prisma.calendar_events.count({ where: { active: true } }),
    prisma.calendar_events.count({ where: { active: true, verified: false } }),
    prisma.xin_xam.count({ where: { active: true } }),
    prisma.xin_xam.count({ where: { active: true, verified: false } }),
    prisma.membership_interests.count(),
  ]);
  return { analytics, content: { activeArticles: articleCount, articlesAwaitingReview: unverifiedArticles, activeCalendarEvents: calendarCount, calendarEventsAwaitingReview: unverifiedCalendar, activeXamLots: xamCount, xamLotsAwaitingReview: unverifiedXam }, membershipInterestCount };
}

async function listArticles({ q, page }) {
  const where = q ? { OR: [{ title: { contains: q, mode: "insensitive" } }, { slug: { contains: q, mode: "insensitive" } }] } : {};
  const [items, total] = await Promise.all([
    prisma.culture_articles.findMany({ where, orderBy: [{ verified: "asc" }, { updated_at: "desc" }], skip: (page - 1) * PAGE_SIZE, take: PAGE_SIZE, select: { id: true, slug: true, title: true, category: true, region: true, source: true, verified: true, active: true, updated_at: true } }),
    prisma.culture_articles.count({ where }),
  ]);
  return pageResult(items, total, page);
}

async function listCalendarEvents({ q, page }) {
  const where = q ? { OR: [{ title: { contains: q, mode: "insensitive" } }, { category: { contains: q, mode: "insensitive" } }] } : {};
  const [items, total] = await Promise.all([
    prisma.calendar_events.findMany({ where, orderBy: [{ verified: "asc" }, { month: "asc" }, { day: "asc" }], skip: (page - 1) * PAGE_SIZE, take: PAGE_SIZE, select: { id: true, title: true, description: true, calendar: true, day: true, month: true, region: true, category: true, source: true, verified: true, active: true } }),
    prisma.calendar_events.count({ where }),
  ]);
  return pageResult(items, total, page);
}

async function listXamLots({ q, page }) {
  const where = q ? { OR: [{ name: { contains: q, mode: "insensitive" } }, { xam_type: { contains: q, mode: "insensitive" } }, { stick_number: Number.isInteger(Number(q)) ? Number(q) : -1 }] } : {};
  const [items, total] = await Promise.all([
    prisma.xin_xam.findMany({ where, orderBy: [{ verified: "asc" }, { xam_type: "asc" }, { stick_number: "asc" }], skip: (page - 1) * PAGE_SIZE, take: PAGE_SIZE, select: { id: true, stick_number: true, name: true, xam_type: true, region: true, category: true, fortune_level: true, source: true, verified: true, active: true } }),
    prisma.xin_xam.count({ where }),
  ]);
  return pageResult(items, total, page);
}

async function listMembershipInterests({ q, page }) {
  const where = q ? { email: { contains: q, mode: "insensitive" } } : {};
  const [items, total] = await Promise.all([
    prisma.membership_interests.findMany({ where, orderBy: { created_at: "desc" }, skip: (page - 1) * PAGE_SIZE, take: PAGE_SIZE, select: { id: true, email: true, created_at: true } }),
    prisma.membership_interests.count({ where }),
  ]);
  return pageResult(items, total, page);
}

async function listAuditLogs({ page }) {
  const [items, total] = await Promise.all([
    prisma.admin_audit_logs.findMany({ orderBy: { created_at: "desc" }, skip: (page - 1) * PAGE_SIZE, take: PAGE_SIZE, select: { id: true, action: true, target_type: true, target_id: true, details: true, created_at: true, users: { select: { full_name: true } } } }),
    prisma.admin_audit_logs.count(),
  ]);
  return pageResult(items, total, page);
}

async function updateReview({ model, id, actorId, patch, reviewNote }) {
  return prisma.$transaction(async (tx) => {
    const before = await tx[model].findUnique({ where: { id } });
    if (!before) return null;
    if (patch.verified === true && !/^https:\/\//i.test(before.source || "")) return { sourceRequired: true };
    const data = { ...patch };
    if (model === "culture_articles") {
      if (patch.verified === true && (before.content?.contentKind !== "article" || !before.image_url || !before.content?.sections?.some((section) => String(section.body || "").length >= 120))) return { contentRequired: true };
      if (patch.verified !== undefined) data.content = { ...before.content, review: patch.verified ? { reviewedBy: actorId, reviewedOn: new Date().toISOString().slice(0, 10), note: reviewNote } : null };
    }
    if (model === "culture_articles" || model === "xin_xam") data.updated_at = new Date();
    const updated = await tx[model].update({ where: { id }, data, select: { id: true, active: true, verified: true } });
    await tx.admin_audit_logs.create({ data: {
      actor_id: actorId,
      action: "CONTENT_REVIEW_UPDATED",
      target_type: model,
      target_id: id,
      details: { before: { active: before.active, verified: before.verified, source: before.source }, after: updated, reviewNote },
    } });
    return { updated };
  });
}

module.exports = { getOverview, listArticles, listCalendarEvents, listXamLots, listMembershipInterests, listAuditLogs, updateReview };
