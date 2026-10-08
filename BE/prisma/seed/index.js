const prisma = require("../../src/config/prisma");
const { seedSignals } = require("./signal.seed");
const { seedContent } = require("./content.seed");
const { seedProverbs } = require("./proverb.seed");

async function main() {
  await prisma.$queryRaw`SELECT 1`;
  await seedSignals();
  await seedContent();
  await seedProverbs();
  console.log("Database connection verified and MVP seed data loaded.");
}

main()
  .catch((error) => {
    console.error("Seed failed", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
