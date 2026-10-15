const prisma = require("../config/prisma");
const { hasCompleteXamContent } = require("../../../shared/xin-xam-publication.mjs");
const { hasUsableChecklist, isGroupAuthoredRitual, ritualApprovalIssue } = require("../services/ritual-publication");
const { reviewAuditAction } = require("../services/content-review-metadata");
const { stateAfterReview } = require("../services/editorial-workflow");
const { hasPublishableCultureContent } = require("../services/culture-publication");
const PAGE_SIZE = 25;

function pageResult(items, total, page, stats) {
  return { items, pagination: { page, pageSize: PAGE_SIZE, total, pageCount: Math.ceil(total / PAGE_SIZE) }, ...(stats ? { stats } : {}) };
}

const EDITORIAL_STATUSES = ["DRAFT", "IN_REVIEW", "APPROVED", "PUBLISHED", "HIDDEN", "REVOKED"];
function contentWhere(model, q, status) {
  const searches = {
    culture_articles: [{ title: { contains: q, mode: "insensitive" } }, { slug: { contains: q, mode: "insensitive" } }],
    calendar_events: [{ title: { contains: q, mode: "insensitive" } }, { category: { contains: q, mode: "insensitive" } }],
    xin_xam: [{ name: { contains: q, mode: "insensitive" } }, { xam_type: { contains: q, mode: "insensitive" } }, ...(Number.isInteger(Number(q)) ? [{ stick_number: Number(q) }] : [])],
    rituals: [{ title: { contains: q, mode: "insensitive" } }, { slug: { contains: q, mode: "insensitive" } }],
    prayers: [{ title: { contains: q, mode: "insensitive" } }, { source: { contains: q, mode: "insensitive" } }],
  }[model];
  const conditions = [];
  if (q) conditions.push({ OR: searches });
  if (EDITORIAL_STATUSES.includes(status)) conditions.push({ editorial_status: status });
  if (status === "needs_source") conditions.push({ OR: [{ source: null }, { source: "" }] });
  if (status === "active") conditions.push({ active: true });
  if (status === "hidden") conditions.push({ active: false });
  return conditions.length ? { AND: conditions } : {};
}

async function contentStats(model) {
  const [total, grouped, regions, missingSource, withSource] = await Promise.all([
    prisma[model].count(),
    prisma[model].groupBy({ by: ["editorial_status"], _count: { _all: true } }),
    prisma[model].groupBy({ by: ["region"], _count: { _all: true } }),
    prisma[model].count({ where: { OR: [{ source: null }, { source: "" }] } }),
    prisma[model].count({ where: { AND: [{ source: { not: null } }, { source: { not: "" } }] } }),
  ]);
  const statuses = Object.fromEntries(EDITORIAL_STATUSES.map((key) => [key, 0]));
  for (const row of grouped) statuses[row.editorial_status] = row._count._all;
  return { total, statuses, missingSource, withSource, regions: Object.fromEntries(regions.map((row) => [row.region || "UNKNOWN", row._count._all])) };
}

async function listContent(model, { q, page, status }, orderBy, select) {
  const where = contentWhere(model, q, status);
  const [items, total, stats] = await Promise.all([
    prisma[model].findMany({ where, orderBy, skip: (page - 1) * PAGE_SIZE, take: PAGE_SIZE, select }),
    prisma[model].count({ where }),
    contentStats(model),
  ]);
  return pageResult(items, total, page, stats);
}

async function getOverview() {
  const [analytics, articleCount, unverifiedArticles, calendarCount, unverifiedCalendar, xamCount, unverifiedXam, ritualCount, unverifiedRituals, prayerCount, unverifiedPrayers, membershipInterestCount] = await Promise.all([
    require("./analytics.repository").getSummary(),
    prisma.culture_articles.count({ where: { editorial_status: "PUBLISHED" } }),
    prisma.culture_articles.count({ where: { editorial_status: "IN_REVIEW" } }),
    prisma.calendar_events.count({ where: { editorial_status: "PUBLISHED" } }),
    prisma.calendar_events.count({ where: { editorial_status: "IN_REVIEW" } }),
    prisma.xin_xam.count({ where: { editorial_status: "PUBLISHED" } }),
    prisma.xin_xam.count({ where: { editorial_status: "IN_REVIEW" } }),
    prisma.rituals.count({ where: { editorial_status: "PUBLISHED" } }),
    prisma.rituals.count({ where: { editorial_status: "IN_REVIEW" } }),
    prisma.prayers.count({ where: { editorial_status: "PUBLISHED" } }),
    prisma.prayers.count({ where: { editorial_status: "IN_REVIEW" } }),
    prisma.membership_interests.count(),
  ]);
  return { analytics, content: { activeArticles: articleCount, articlesAwaitingReview: unverifiedArticles, activeCalendarEvents: calendarCount, calendarEventsAwaitingReview: unverifiedCalendar, activeXamLots: xamCount, xamLotsAwaitingReview: unverifiedXam, activeRituals: ritualCount, ritualsAwaitingReview: unverifiedRituals, activePrayers: prayerCount, prayersAwaitingReview: unverifiedPrayers }, membershipInterestCount };
}

function listArticles(params) { return listContent("culture_articles", params, [{ editorial_status: "asc" }, { updated_at: "desc" }], { id: true, slug: true, title: true, category: true, region: true, source: true, content: true, verified: true, active: true, editorial_status: true, updated_at: true }); }

function listCalendarEvents(params) { return listContent("calendar_events", params, [{ editorial_status: "asc" }, { month: "asc" }, { day: "asc" }], { id: true, title: true, description: true, calendar: true, day: true, month: true, region: true, category: true, source: true, verified: true, active: true, editorial_status: true }); }

function listXamLots(params) { return listContent("xin_xam", params, [{ editorial_status: "asc" }, { xam_type: "asc" }, { stick_number: "asc" }], { id: true, stick_number: true, name: true, xam_type: true, region: true, category: true, fortune_level: true, source: true, verified: true, active: true, editorial_status: true }); }

function listRituals(params) { return listContent("rituals", params, [{ editorial_status: "asc" }, { updated_at: "desc" }], { id: true, slug: true, title: true, occasion: true, region: true, source: true, content_provenance: true, checklists: true, verified: true, active: true, editorial_status: true, updated_at: true }); }

function listPrayers(params) { return listContent("prayers", params, [{ editorial_status: "asc" }, { updated_at: "desc" }], { id: true, title: true, ritual_id: true, region: true, language_style: true, source: true, verified: true, active: true, editorial_status: true, updated_at: true }); }

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

async function updateReview({ model, id, actorId, patch, reviewNote, rightsConfirmed, source, sourceLocator, usageRights }) {
  return prisma.$transaction(async (tx) => {
    const before = await tx[model].findUnique({ where: { id } });
    if (!before) return null;
    const effectiveSource = typeof source === "string" ? source.trim() : before.source;
    if (source !== undefined && source.trim() && !/^https:\/\/[^\s]+$/i.test(source.trim())) return { sourceInvalid: true };
    const nextWorkflow = stateAfterReview(before, patch);
    if (nextWorkflow.approvalRequired) return { approvalRequired: true };
    const groupAuthoredRitual = model === "rituals" && isGroupAuthoredRitual(before.content_provenance);
    if (patch.verified === true && model !== "culture_articles" && !groupAuthoredRitual && !/^https:\/\//i.test(effectiveSource || "")) return { sourceRequired: true };
    if (model === "xin_xam" && patch.verified === true && rightsConfirmed !== true) return { rightsConfirmationRequired: true };
    if (["prayers", "rituals"].includes(model) && patch.verified === true && rightsConfirmed !== true) return { rightsConfirmationRequired: true };
    if (model === "rituals" && patch.verified === true) {
      const issue = ritualApprovalIssue(before, { source: effectiveSource, sourceLocator, usageRights });
      if (issue) return { [issue]: true };
    }
    if (model === "prayers" && patch.verified === true && (!inputSourceLocator(sourceLocator) || !["confirmed", "public-domain"].includes(usageRights))) return { provenanceRequired: true };
    const willPublishRitual = model === "rituals"
      && (patch.verified === true || (patch.active === true && patch.verified !== false));
    if (willPublishRitual && !hasUsableChecklist(before.checklists)) return { checklistRequired: true };
    if (model === "xin_xam" && patch.verified === true && !hasCompleteXamContent({
      source: before.source,
      poem: before.poem,
      interpretations: [before.meaning, before.advice],
    })) return { xamContentRequired: true };
    const data = { ...patch };
    // Revoking approval always removes the record from public delivery.
    if (patch.verified === false) data.active = false;
    if (source !== undefined) data.source = source.trim();
    Object.assign(data, nextWorkflow);
    if (model === "culture_articles") {
      if (patch.verified === true) {
        if (rightsConfirmed !== true || !["confirmed", "public-domain"].includes(usageRights)) return { rightsConfirmationRequired: true };
        const provenance = before.content?.provenance || {};
        const content = { ...before.content, provenance: { ...provenance, sourceUrl: effectiveSource } };
        if (!hasPublishableCultureContent({ content, imageUrl: before.image_url })) return { contentRequired: true };
      }
      if (patch.verified !== undefined) {
        const reviewer = patch.verified ? await tx.users.findUnique({ where: { id: actorId }, select: { full_name: true } }) : null;
        data.content = {
          ...before.content,
          review: patch.verified ? {
            reviewerName: reviewer?.full_name || "",
            reviewedOn: new Date().toISOString().slice(0, 10),
            note: reviewNote,
            quotationVerified: before.content?.provenance?.contentType === "QUOTATION",
            usageRights,
          } : null,
        };
      }
    }
    if (Object.prototype.hasOwnProperty.call(before, "updated_at")) {
      data.updated_at = new Date();
    }
    const updated = await tx[model].update({ where: { id }, data, select: { id: true, active: true, verified: true, editorial_status: true } });
    await tx.admin_audit_logs.create({ data: {
      actor_id: actorId,
      action: reviewAuditAction(patch),
      target_type: model,
      target_id: id,
      details: {
        before: { active: before.active, verified: before.verified, editorial_status: before.editorial_status, source: before.source },
        after: updated,
        reviewNote,
        ...(model === "xin_xam" && patch.verified === true ? { rightsConfirmed: true } : {}),
        ...(["prayers", "rituals"].includes(model) && patch.verified === true ? { rightsConfirmed: true, sourceLocator, usageRights } : {}),
      },
    } });
    return { updated };
  });
}

function inputSourceLocator(value) { return typeof value === "string" && value.trim().length >= 2; }
module.exports = { getOverview, listArticles, listCalendarEvents, listXamLots, listRituals, listPrayers, listMembershipInterests, listAuditLogs, updateReview };
