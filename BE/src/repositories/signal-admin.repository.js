const prisma = require("../config/prisma");
const checkInCatalog = require("../../../shared/checkin-catalog.json");
const { isPublishable } = require("../services/signal-publication");

const STATUS_VALUES = ["DRAFT", "IN_REVIEW", "APPROVED", "PUBLISHED", "HIDDEN", "REVOKED"];
const TARGET = "signals";

function buildWhere({ q, status, mood, contextKey }) {
  const conditions = [];
  if (q) conditions.push({ OR: [
    { title: { contains: q, mode: "insensitive" } },
    { source: { contains: q, mode: "insensitive" } },
    { content: { contains: q, mode: "insensitive" } },
  ] });
  if (STATUS_VALUES.includes(status)) conditions.push({ editorial_status: status });
  if (mood) conditions.push({ mood });
  if (contextKey) conditions.push({ context_key: contextKey });
  return conditions.length ? { AND: conditions } : {};
}

function buildCoverage(rows) {
  const coverage = Object.fromEntries(checkInCatalog.moods.map((mood) => [mood.key, Object.fromEntries(checkInCatalog.contexts.map((context) => [context.key, 0]))]));
  for (const row of rows) {
    if (isPublishable(row) && coverage[row.mood]?.[row.context_key] !== undefined) {
      coverage[row.mood][row.context_key] += 1;
    }
  }
  return coverage;
}

async function list({ q, page, status, mood, contextKey }, client = prisma, actorId = null) {
  let where = buildWhere({ q, status, mood, contextKey });
  if (actorId) {
    const authored = await client.admin_audit_logs.findMany({
      where: { actor_id: actorId, target_type: TARGET, action: { in: ["CONTENT_CREATED", "CONTENT_EDITED"] } },
      distinct: ["target_id"], select: { target_id: true },
    });
    where = { AND: [where, { id: { in: authored.map((row) => row.target_id) } }] };
  }
  const [items, total, statuses, allSignals] = await Promise.all([
    client.signals.findMany({
      where,
      orderBy: [{ editorial_status: "asc" }, { updated_at: "desc" }],
      skip: (page - 1) * 25,
      take: 25,
      include: { reviewer: { select: { full_name: true } } },
    }),
    client.signals.count({ where }),
    client.signals.groupBy({ by: ["editorial_status"], where, _count: { _all: true } }),
    client.signals.findMany({ where: actorId ? { id: where.AND[1].id } : {}, select: {
      id: true, source: true, mood: true, context_key: true, title: true,
      category: true, advice: true, region: true, content: true, active: true,
      editorial_status: true, reviewed_by: true, reviewed_at: true,
      approved_content_hash: true,
    } }),
  ]);
  const statusCounts = Object.fromEntries(STATUS_VALUES.map((value) => [value, 0]));
  for (const row of statuses) statusCounts[row.editorial_status] = row._count._all;
  const edits = items.length ? await client.admin_audit_logs.findMany({
    where: { target_type: TARGET, target_id: { in: items.map((item) => item.id) }, action: { in: ["CONTENT_CREATED", "CONTENT_EDITED", "CONTENT_CHANGES_REQUESTED", "CONTENT_APPROVAL_REVOKED"] } },
    orderBy: { created_at: "desc" },
    select: { target_id: true, action: true, details: true, created_at: true, users: { select: { full_name: true } } },
  }) : [];
  const editors = new Map();
  const feedback = new Map();
  for (const edit of edits) {
    if (["CONTENT_CREATED", "CONTENT_EDITED"].includes(edit.action) && !editors.has(edit.target_id)) editors.set(edit.target_id, edit.users?.full_name || "Thành viên nhóm");
    if (["CONTENT_CHANGES_REQUESTED", "CONTENT_APPROVAL_REVOKED"].includes(edit.action) && !feedback.has(edit.target_id)) feedback.set(edit.target_id, {
      note: edit.details?.reviewNote || "",
      reviewerName: edit.users?.full_name || "Quản trị viên",
      createdAt: edit.created_at,
      feedbackKind: edit.action === "CONTENT_APPROVAL_REVOKED" ? "approval-revoked" : "changes-requested",
      isPreviousRound: edits.some((later) => later.target_id === edit.target_id && ["CONTENT_CREATED", "CONTENT_EDITED"].includes(later.action) && later.created_at > edit.created_at),
    });
  }
  return {
    items: items.map((item) => {
      const editorialFeedback = feedback.get(item.id) || null;
      return { ...item, submitted_by: editors.get(item.id) || null, editor_feedback: editorialFeedback?.note || null, editor_feedback_meta: editorialFeedback };
    }),
    pagination: { page, pageSize: 25, total, pageCount: Math.ceil(total / 25) },
    stats: { total: allSignals.length, statuses: statusCounts, coverage: buildCoverage(allSignals) },
  };
}

function findById(id, client = prisma) {
  return client.signals.findUnique({ where: { id }, include: { reviewer: { select: { full_name: true } } } });
}

function findBySource(source, client = prisma) {
  return client.signals.findFirst({ where: { source }, select: { id: true } });
}

function listAuditLogs(id, client = prisma) {
  return client.admin_audit_logs.findMany({
    where: { target_type: TARGET, target_id: id },
    orderBy: { created_at: "desc" },
    take: 100,
    select: { id: true, action: true, details: true, created_at: true, users: { select: { full_name: true } } },
  });
}

module.exports = { TARGET, STATUS_VALUES, buildWhere, buildCoverage, list, findById, findBySource, listAuditLogs };
