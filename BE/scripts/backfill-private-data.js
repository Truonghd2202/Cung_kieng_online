const path = require("node:path");
const dotenv = require("dotenv");
dotenv.config({ path: path.resolve(__dirname, "../.env") });
const { encryptPrivateText } = require("../src/utils/private-text");

const PREFIX = "enc:v1:";
const BATCH_SIZE = 100;
const apply = process.argv.includes("--apply");
const key = process.env.PRIVATE_DATA_KEY;
if (apply && !/^[a-f0-9]{64}$/i.test(key || "")) {
  console.error("For --apply, PRIVATE_DATA_KEY must be configured as 64 hexadecimal characters.");
  process.exit(1);
}

const prisma = require("../src/config/prisma");
const conditions = {
  mood_checkins: { AND: [{ note: { not: null } }, { note: { not: "" } }, { NOT: { note: { startsWith: PREFIX } } }] },
  wishes: { AND: [{ content: { not: "" } }, { NOT: { content: { startsWith: PREFIX } } }] },
};

async function backfill(modelName, field) {
  const model = prisma[modelName];
  const where = conditions[modelName];
  const total = await model.count({ where });
  console.log(modelName + "." + field + ": " + total + " plaintext rows found" + (apply ? "; applying" : "; dry run"));
  if (!apply || total === 0) return;

  let cursor;
  let updated = 0;
  while (true) {
    const rows = await model.findMany({
      where: { ...where, ...(cursor ? { id: { gt: cursor } } : {}) },
      orderBy: { id: "asc" },
      take: BATCH_SIZE,
      select: { id: true, user_id: true, [field]: true },
    });
    if (rows.length === 0) break;
    await prisma.$transaction(async (tx) => {
      for (const row of rows) {
        const plaintext = row[field];
        if (typeof plaintext !== "string" || plaintext.startsWith(PREFIX)) continue;
        const result = await tx[modelName].updateMany({
          where: { id: row.id, user_id: row.user_id, [field]: plaintext },
          data: { [field]: encryptPrivateText(plaintext, row.user_id, key) },
        });
        updated += result.count;
      }
    });
    cursor = rows[rows.length - 1].id;
    console.log(modelName + ": encrypted " + updated + " rows so far");
  }
  console.log(modelName + ": encrypted " + updated + " rows total");
}

async function main() {
  if (!apply) console.log("Dry run only. Pass --apply after taking a database backup to write encrypted values.");
  await backfill("mood_checkins", "note");
  await backfill("wishes", "content");
}

main().catch((error) => {
  console.error("Private-data backfill failed:", error.message);
  process.exitCode = 1;
}).finally(async () => {
  await prisma.$disconnect();
});
