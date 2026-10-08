const prisma = require("../config/prisma");
const { DAILY_PROVERB_SOURCE } = require("../constants/content");

function listVerified({ categories = [], excludeIds = [] } = {}, client = prisma) {
  return client.proverbs.findMany({
    where: {
      active: true,
      verified: true,
      source: DAILY_PROVERB_SOURCE,
      ...(categories.length ? { category: { in: categories } } : {}),
      ...(excludeIds.length ? { id: { notIn: excludeIds } } : {}),
    },
    orderBy: { content: "asc" },
  });
}

module.exports = { listVerified };
