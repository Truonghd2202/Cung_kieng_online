const prisma = require("../config/prisma");

function listForUser(userId, limit = 100, client = prisma) {
  return client.wishes.findMany({ where: { user_id: userId }, orderBy: { created_at: "desc" }, take: limit });
}

function create(data, client = prisma) {
  return client.wishes.create({ data });
}

function findForUser(id, userId, client = prisma) {
  return client.wishes.findFirst({ where: { id, user_id: userId } });
}

function update(id, userId, data, client = prisma) {
  return client.wishes.updateMany({ where: { id, user_id: userId }, data });
}

function remove(id, userId, client = prisma) {
  return client.wishes.deleteMany({ where: { id, user_id: userId } });
}

module.exports = { listForUser, create, findForUser, update, remove };
