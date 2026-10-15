
const prisma = require("../config/prisma");
const { encryptPrivateText, decryptPrivateText } = require("../utils/private-text");
const decoded = (row) => row ? { ...row, note: decryptPrivateText(row.note, row.user_id) } : row;
const signalInclude = { signals: { include: { reviewer: { select: { full_name: true } } } } };

function create(data, client = prisma) {
  return client.mood_checkins.create({
    data: { ...data, note: encryptPrivateText(data.note, data.user_id) },
    include: signalInclude,
  }).then(decoded);
}

function findByIdForUser(id, userId, client = prisma) {
  return client.mood_checkins.findFirst({
    where: { id, user_id: userId },
    include: signalInclude,
  }).then(decoded);
}

function findByIdempotencyKey(userId, idempotencyKey, client = prisma) {
  if (!idempotencyKey) return Promise.resolve(null);
  return client.mood_checkins.findFirst({
    where: { user_id: userId, idempotency_key: idempotencyKey },
    include: signalInclude,
  }).then(decoded);
}

function findLatestForUser(userId, client = prisma) {
  return client.mood_checkins.findFirst({
    where: { user_id: userId },
    orderBy: { created_at: "desc" },
    include: signalInclude,
  }).then(decoded);
}

function listForUser(userId, { limit, mood } = {}, client = prisma) {
  return client.mood_checkins.findMany({
    where: { user_id: userId, saved_at: { not: null }, ...(mood ? { mood } : {}) },
    orderBy: { created_at: "desc" },
    take: limit,
    include: signalInclude,
  }).then((rows) => rows.map(decoded));
}

function update(id, userId, data, client = prisma) {
  return client.mood_checkins.updateMany({
    where: { id, user_id: userId },
    data: { ...data, ...(data.note !== undefined ? { note: encryptPrivateText(data.note, userId) } : {}) },
  });
}

function remove(id, userId, client = prisma) {
  return client.mood_checkins.deleteMany({ where: { id, user_id: userId } });
}

module.exports = { create, findByIdForUser, findByIdempotencyKey, findLatestForUser, listForUser, update, remove };
