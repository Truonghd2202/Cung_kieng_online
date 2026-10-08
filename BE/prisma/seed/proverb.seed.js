const prisma = require("../../src/config/prisma");
const { DAILY_PROVERB_SOURCE } = require("../../src/constants/content");
const dailyProverbs = require("./data/daily-proverbs.json");

async function seedProverbs(client = prisma) {
  const existing = await client.proverbs.findMany({
    where: { source: DAILY_PROVERB_SOURCE },
    select: { id: true, content: true },
  });
  const existingByContent = new Map(existing.map((item) => [item.content, item.id]));

  await client.proverbs.updateMany({
    where: {
      source: DAILY_PROVERB_SOURCE,
      content: { notIn: dailyProverbs.map((item) => item.content) },
    },
    data: { active: false },
  });

  for (const proverb of dailyProverbs) {
    const data = {
      ...proverb,
      mood: null,
      region: "NATIONWIDE",
      source: DAILY_PROVERB_SOURCE,
      verified: true,
      active: true,
    };
    const id = existingByContent.get(proverb.content);
    if (id) await client.proverbs.update({ where: { id }, data });
    else await client.proverbs.create({ data });
  }

  console.log(`Seeded ${dailyProverbs.length} sourced daily proverbs.`);
}

module.exports = { seedProverbs };
