// Dry-run by default. Back up the database and encryption key before --apply.
const prisma = require("../src/config/prisma");
const { encryptPrivateText } = require("../src/utils/private-text");
async function main() {
  const apply = process.argv.includes("--apply");
  if (apply) encryptPrivateText("key-validation", "backfill");
  for (const [model, field] of [["wishes", "content"], ["mood_checkins", "note"]]) {
    let cursor, candidates = 0, changed = 0;
    for (;;) {
      const rows = await prisma[model].findMany({
        take: 100, orderBy: { id: "asc" }, ...(cursor ? { cursor: { id: cursor }, skip: 1 } : {}),
        select: { id: true, user_id: true, [field]: true },
      });
      for (const row of rows) {
        const value = row[field];
        if (!value || value.startsWith("enc:v1:")) continue;
        candidates += 1;
        if (apply) {
          const result = await prisma[model].updateMany({
            // Do not overwrite a concurrent edit or recreate a deleted record.
            where: { id: row.id, user_id: row.user_id, [field]: value },
            data: { [field]: encryptPrivateText(value, row.user_id) },
          });
          changed += result.count;
        }
      }
      if (rows.length < 100) break;
      cursor = rows.at(-1).id;
    }
    console.log(JSON.stringify({ model, mode: apply ? "apply" : "dry-run", candidates, changed }));
  }
}
main().catch(() => { console.error("Backfill failed. Check database access and PRIVATE_DATA_KEY; no private content is logged."); process.exitCode = 1; })
  .finally(() => prisma.$disconnect());
