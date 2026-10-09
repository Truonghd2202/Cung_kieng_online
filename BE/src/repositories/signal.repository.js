
const prisma = require("../config/prisma");

function isPublishable(row) {
  if (!row || !row.active) return false;
  let content;
  try {
    content = typeof row.content === "string" ? JSON.parse(row.content) : row.content;
  } catch {
    return true;
  }

  const metadata = content?.metadata;
  if (metadata?.contentKind === "folk") {
    const poem = content?.poem;
    return Boolean(
      metadata?.editorialStatus === "published"
      && metadata?.quotationVerified === true
      && metadata?.rightsStatus === "cleared"
      && typeof metadata?.originCommunity === "string"
      && metadata.originCommunity.trim()
      && typeof metadata?.reviewedBy === "string"
      && metadata.reviewedBy.trim()
      && Array.isArray(metadata?.sources)
      && metadata.sources.length > 0
      && metadata.sources.every((source) =>
        typeof source?.title === "string"
        && source.title.trim()
        && typeof source?.locator === "string"
        && source.locator.trim()
        && typeof source?.url === "string"
        && /^https?:\/\//i.test(source.url),
      )
      && typeof poem?.line1 === "string"
      && poem.line1.trim()
      && typeof poem?.line2 === "string"
      && poem.line2.trim(),
    );
  }

  return true;
}

function listActive({ mood, limit, contextKey = "general" } = {}, client = prisma) {
  return client.signals.findMany({
    where: { active: true, ...(mood ? { mood } : {}), context_key: contextKey === "general" ? null : contextKey },
    orderBy: { created_at: "asc" },
  }).then((rows) => {
    const published = rows.filter(isPublishable);
    return limit ? published.slice(0, limit) : published;
  });
}

function findActiveByIdOrSource(id, client = prisma) {
  const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(id);
  return client.signals.findFirst({
    where: { active: true, ...(isUuid ? { OR: [{ id }, { source: id }] } : { source: id }) },
  }).then((row) => row && isPublishable(row) ? row : null);
}

function findFirstByMood(mood, client = prisma) {
  return client.signals.findMany({
    where: { active: true, mood },
    orderBy: { created_at: "asc" },
  }).then((rows) => rows.find(isPublishable) || null);
}

function findForMoodContext(mood, contextKey, client = prisma) {
  return client.signals.findMany({
    where: { active: true, mood, context_key: contextKey === "general" ? null : contextKey },
    orderBy: { created_at: "asc" },
  }).then((rows) => rows.find(isPublishable) || null);
}

function findNextForMoodContext(mood, contextKey, currentId, client = prisma) {
  return client.signals.findMany({
    where: { active: true, mood, context_key: contextKey === "general" ? null : contextKey },
    orderBy: { created_at: "asc" },
  }).then((rows) => {
    const published = rows.filter(isPublishable);
    if (!published.length) return null;
    const currentIndex = published.findIndex((row) => row.id === currentId || row.source === currentId);
    if (currentIndex >= 0 && published.length === 1) return null;
    return published[(currentIndex + 1 + published.length) % published.length];
  });
}

function findFavorites(userId, signalIds, client = prisma) {
  return client.favorites.findMany({
    where: { user_id: userId, target_type: "SIGNAL", target_id: { in: signalIds } },
    select: { target_id: true },
  });
}

function addFavorite(userId, signalId, client = prisma) {
  return client.favorites.upsert({
    where: {
      user_id_target_type_target_id: {
        user_id: userId,
        target_type: "SIGNAL",
        target_id: signalId,
      },
    },
    create: { user_id: userId, target_type: "SIGNAL", target_id: signalId },
    update: {},
  });
}

function removeFavorite(userId, signalId, client = prisma) {
  return client.favorites.deleteMany({
    where: { user_id: userId, target_type: "SIGNAL", target_id: signalId },
  });
}

function removeFavoriteForCheckIn(userId, signalId, client = prisma) {
  return removeFavorite(userId, signalId, client);
}

module.exports = {
  listActive,
  findActiveByIdOrSource,
  findFirstByMood,
  findForMoodContext,
  findNextForMoodContext,
  findFavorites,
  addFavorite,
  removeFavorite,
  removeFavoriteForCheckIn,
};
