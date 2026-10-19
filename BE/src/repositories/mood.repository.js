
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

async function historyForUser(userId, { start, end, mood, skip, take } = {}, client = prisma) {
  const where = { user_id: userId, created_at: { gte: start, lt: end } };
  const itemWhere = { ...where, ...(mood ? { mood } : {}) };
  const [total, items, grouped, daily] = await Promise.all([
    client.mood_checkins.count({ where: itemWhere }),
    client.mood_checkins.findMany({ where: itemWhere, orderBy: { created_at: "desc" }, skip, take, include: signalInclude }),
    client.mood_checkins.groupBy({ by: ["mood"], where, _count: { _all: true } }),
    client.$queryRaw`SELECT (created_at AT TIME ZONE 'Asia/Ho_Chi_Minh')::date::text AS day, COUNT(*)::int AS count
      FROM mood_checkins
      WHERE user_id = ${userId}::uuid AND created_at >= ${start} AND created_at < ${end}
      GROUP BY day ORDER BY day`,
  ]);
  return {
    total,
    items: items.map(decoded),
    byMood: grouped,
    byDay: daily,
  };
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

module.exports = { create, findByIdForUser, findByIdempotencyKey, findLatestForUser, listForUser, historyForUser, update, remove };
