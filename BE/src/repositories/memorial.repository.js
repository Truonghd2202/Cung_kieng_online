
const prisma = require("../config/prisma");

function listForUser(userId, client = prisma) {
  return client.memorials.findMany({ where: { user_id: userId }, orderBy: { created_at: "asc" }, include: { memorial_anniversaries: true } });
}

function findByIdForUser(id, userId, client = prisma) {
  return client.memorials.findFirst({ where: { id, user_id: userId }, include: { memorial_anniversaries: true } });
}

function create(data, client = prisma) {
  return client.memorials.create({ data, include: { memorial_anniversaries: true } });
}

function update(id, userId, data, client = prisma) {
  return client.memorials.updateMany({ where: { id, user_id: userId }, data });
}

function remove(id, userId, client = prisma) {
  return client.memorials.deleteMany({ where: { id, user_id: userId } });
}

function createIncense(data, client = prisma) {
  return client.incense_sessions.create({ data });
}

module.exports = { listForUser, findByIdForUser, create, update, remove, createIncense };
