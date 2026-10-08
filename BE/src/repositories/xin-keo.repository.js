const prisma = require("../config/prisma");

function createSession(data, client = prisma) {
  return client.xin_keo_sessions.create({ data, include: { xin_keo_throws: { include: { proverbs: true } } } });
}

function findSession(id, userId, client = prisma) {
  return client.xin_keo_sessions.findFirst({ where: { id, user_id: userId }, include: { xin_keo_throws: { orderBy: { throw_number: "asc" }, include: { proverbs: true } } } });
}

function listSessions(userId, client = prisma) {
  return client.xin_keo_sessions.findMany({ where: { user_id: userId }, orderBy: { created_at: "desc" }, take: 50, include: { xin_keo_throws: { orderBy: { throw_number: "asc" }, include: { proverbs: true } } } });
}

function createThrowAndUpdateSession(session, throwData) {
  return prisma.$transaction(async (transaction) => {
    const created = await transaction.xin_keo_throws.create({ data: throwData, include: { proverbs: true } });
    await transaction.xin_keo_sessions.update({ where: { id: session.id }, data: { final_result: throwData.result } });
    return created;
  });
}

module.exports = { createSession, findSession, listSessions, createThrowAndUpdateSession };
