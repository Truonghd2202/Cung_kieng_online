const prisma = require("../config/prisma");

function findCatalog(xamType, stickNumber, client = prisma) {
  return client.xin_xam.findUnique({ where: { xam_type_stick_number: { xam_type: xamType, stick_number: stickNumber } } });
}

function listCatalog(xamType, region, client = prisma) {
  return client.xin_xam.findMany({ where: { xam_type: xamType, region, active: true }, orderBy: { stick_number: "asc" } });
}

function upsertCatalog(data, client = prisma) {
  return client.xin_xam.upsert({
    where: { xam_type_stick_number: { xam_type: data.xam_type, stick_number: data.stick_number } },
    create: data,
    update: data,
  });
}

function createDraw(data, client = prisma) {
  return client.xin_xam_draws.create({ data, include: { xin_xam: true, proverbs: true } });
}

function listDraws(userId, limit = 100, client = prisma) {
  return client.xin_xam_draws.findMany({ where: { user_id: userId }, orderBy: { created_at: "desc" }, take: limit, include: { xin_xam: true, proverbs: true } });
}

function findDraw(id, userId, client = prisma) {
  return client.xin_xam_draws.findFirst({ where: { id, user_id: userId }, include: { xin_xam: true, proverbs: true } });
}

function updateStar(id, userId, starred, client = prisma) {
  return client.xin_xam_draws.updateMany({ where: { id, user_id: userId }, data: { starred } });
}

function remove(id, userId, client = prisma) {
  return client.xin_xam_draws.deleteMany({ where: { id, user_id: userId } });
}

module.exports = { findCatalog, listCatalog, upsertCatalog, createDraw, listDraws, findDraw, updateStar, remove };
