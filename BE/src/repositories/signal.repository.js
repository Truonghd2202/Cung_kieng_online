
const prisma = require("../config/prisma");

function listActive({ mood, limit, contextKey = "general" } = {}, client = prisma) {
  return client.signals.findMany({
    where: { active: true, ...(mood ? { mood } : {}), context_key: contextKey === "general" ? null : contextKey },
    orderBy: { created_at: "asc" },
    take: limit,
  });
}

function findActiveByIdOrSource(id, client = prisma) {
  const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(id);
  return client.signals.findFirst({
    where: { active: true, ...(isUuid ? { OR: [{ id }, { source: id }] } : { source: id }) },
  });
}

function findFirstByMood(mood, client = prisma) {
  return client.signals.findFirst({
    where: { active: true, mood },
    orderBy: { created_at: "asc" },
  });
}

function findForMoodContext(mood, contextKey, client = prisma) {
  return client.signals.findFirst({
    where: { active: true, mood, context_key: contextKey === "general" ? null : contextKey },
    orderBy: { created_at: "asc" },
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
  findFavorites,
  addFavorite,
  removeFavorite,
  removeFavoriteForCheckIn,
};
