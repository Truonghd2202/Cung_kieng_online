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

async function list({ q, page, status, mood, contextKey }, client = prisma) {
  const where = buildWhere({ q, status, mood, contextKey });
  const [items, total, statuses, allSignals] = await Promise.all([
    client.signals.findMany({
      where,
      orderBy: [{ editorial_status: "asc" }, { updated_at: "desc" }],
      skip: (page - 1) * 25,
      take: 25,
      include: { reviewer: { select: { full_name: true } } },
    }),
    client.signals.count({ where }),
    client.signals.groupBy({ by: ["editorial_status"], _count: { _all: true } }),
    client.signals.findMany({ select: {
      id: true, source: true, mood: true, context_key: true, title: true,
      category: true, advice: true, region: true, content: true, active: true,
      editorial_status: true, reviewed_by: true, reviewed_at: true,
      approved_content_hash: true,
    } }),
  ]);
  const statusCounts = Object.fromEntries(STATUS_VALUES.map((value) => [value, 0]));
  for (const row of statuses) statusCounts[row.editorial_status] = row._count._all;
  return {
    items,
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
