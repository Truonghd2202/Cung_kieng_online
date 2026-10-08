
const prisma = require("../config/prisma");

function create(data, client = prisma) {
  return client.mood_checkins.create({
    data,
    include: { signals: true },
  });
}

function findByIdForUser(id, userId, client = prisma) {
  return client.mood_checkins.findFirst({
    where: { id, user_id: userId },
    include: { signals: true },
  });
}

function findLatestForUser(userId, client = prisma) {
  return client.mood_checkins.findFirst({
    where: { user_id: userId },
    orderBy: { created_at: "desc" },
    include: { signals: true },
  });
}

function listForUser(userId, { limit, mood } = {}, client = prisma) {
  return client.mood_checkins.findMany({
    where: { user_id: userId, ...(mood ? { mood } : {}) },
    orderBy: { created_at: "desc" },
    take: limit,
    include: { signals: true },
  });
}

function update(id, userId, data, client = prisma) {
  return client.mood_checkins.updateMany({
    where: { id, user_id: userId },
    data,
  });
}

function remove(id, userId, client = prisma) {
  return client.mood_checkins.deleteMany({ where: { id, user_id: userId } });
}

module.exports = { create, findByIdForUser, findLatestForUser, listForUser, update, remove };
