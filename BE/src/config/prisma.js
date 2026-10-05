const { PrismaClient } = require("@prisma/client");
const { PrismaPg } = require("@prisma/adapter-pg");
const env = require("./env");

const globalKey = "__tinLamTamLinhPrisma";

function createClient() {
  const adapter = new PrismaPg({ connectionString: env.DATABASE_URL });
  return new PrismaClient({ adapter });
}

const prisma = globalThis[globalKey] || createClient();

if (env.NODE_ENV !== "production") globalThis[globalKey] = prisma;

module.exports = prisma;
