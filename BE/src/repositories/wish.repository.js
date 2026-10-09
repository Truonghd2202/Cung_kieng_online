const prisma = require("../config/prisma");
const { encryptPrivateText, decryptPrivateText } = require("../utils/private-text");
const decoded = (row) => row ? { ...row, content: decryptPrivateText(row.content, row.user_id) } : row;

function listForUser(userId, limit = 100, client = prisma) {
  return client.wishes.findMany({ where: { user_id: userId }, orderBy: { created_at: "desc" }, take: limit }).then((rows) => rows.map(decoded));
}

function create(data, client = prisma) {
  return client.wishes.create({ data: { ...data, content: encryptPrivateText(data.content, data.user_id) } }).then(decoded);
}

function findForUser(id, userId, client = prisma) {
  return client.wishes.findFirst({ where: { id, user_id: userId } }).then(decoded);
}

function update(id, userId, data, client = prisma) {
  return client.wishes.updateMany({ where: { id, user_id: userId }, data: { ...data, ...(data.content !== undefined ? { content: encryptPrivateText(data.content, userId) } : {}) } });
}

function remove(id, userId, client = prisma) {
  return client.wishes.deleteMany({ where: { id, user_id: userId } });
}

module.exports = { listForUser, create, findForUser, update, remove };
