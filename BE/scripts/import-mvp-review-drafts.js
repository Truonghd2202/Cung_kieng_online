const prisma = require("../src/config/prisma");
const drafts = require("../../editorial/mvp-review-drafts");
const IMPORT_TRANSACTION_OPTIONS = { maxWait: 10_000, timeout: 60_000 };

function withOperation(operation, error) {
  const wrapped = new Error("MVP draft import operation failed");
  wrapped.name = "DraftImportOperationError";
  wrapped.importOperation = operation;
  wrapped.cause = error;
  return wrapped;
}

function safeIdentifier(value) {
  return typeof value === "string" && /^[A-Za-z0-9_.]+$/.test(value) ? value : undefined;
}

function describeImportError(error) {
  const cause = error?.cause || error;
  const code = typeof cause?.code === "string" && /^P\d{4}$/.test(cause.code) ? cause.code : "UNKNOWN";
  const meta = cause?.meta || {};
  const result = {
    operation: error?.importOperation || "transaction",
    code,
  };
  const model = safeIdentifier(meta.modelName);
  const column = safeIdentifier(meta.column || meta.field_name);
  if (model) result.model = model;
  if (column) result.column = column;
  if (Array.isArray(meta.target)) {
    const target = meta.target.map(safeIdentifier).filter(Boolean);
    if (target.length) result.target = target;
  }
  if (code === "P2021" || code === "P2022") {
    result.hint = "The target database schema may be missing a migration. Check migration status on the intended test/staging database; do not reset it.";
  } else if (code === "P2028") {
    result.hint = "The interactive transaction may have expired or closed. This importer now allows up to 60 seconds; if it persists, check database connectivity and transaction limits.";
  }
  return result;
}

async function importDrafts(client = prisma) {
  const summary = { culture: { created: 0, skipped: 0 }, rituals: { created: 0, skipped: 0 }, signals: { created: 0, skipped: 0 } };
  let operation = "transaction";

  try {
    await client.$transaction(async (tx) => {
    for (const item of drafts.culture) {
      operation = "culture_articles.findUnique";
      const existing = await tx.culture_articles.findUnique({ where: { slug: item.slug }, select: { id: true } });
      if (existing) { summary.culture.skipped += 1; continue; }
      const { sections, ...record } = item;
      operation = "culture_articles.create";
      await tx.culture_articles.create({ data: {
        ...record,
        image_url: null,
        source: null,
        content: { sections, contentKind: "article", provenance: { contentType: "GROUP_AUTHORED", sourceTitle: "", sourceAuthor: "", bibliography: "", sourceLocator: "", localCommunity: "", imageCaption: "", imageSource: "", imageRightsBasis: "" }, review: null },
        editorial_status: "DRAFT",
        verified: false,
        active: false,
      } });
      summary.culture.created += 1;
    }

    for (const item of drafts.rituals) {
      operation = "rituals.findUnique";
      const existing = await tx.rituals.findUnique({ where: { slug: item.slug }, select: { id: true } });
      if (existing) { summary.rituals.skipped += 1; continue; }
      const { steps, checklists, ...record } = item;
      operation = "rituals.create";
      await tx.rituals.create({ data: {
        ...record,
        source: null,
        checklists,
        editorial_status: "DRAFT",
        verified: false,
        active: false,
        ritual_steps: { create: steps.map((step, index) => ({ step_number: index + 1, ...step })) },
      } });
      summary.rituals.created += 1;
    }

    for (const item of drafts.signals) {
      operation = "signals.findFirst";
      const existing = await tx.signals.findFirst({ where: { source: item.source }, select: { id: true } });
      if (existing) { summary.signals.skipped += 1; continue; }
      const { content, ...record } = item;
      operation = "signals.create";
      await tx.signals.create({ data: {
        ...record,
        context_key: record.context_key || "general",
        editorial_status: "DRAFT",
        content: JSON.stringify(content),
        advice: content.action.description,
        active: false,
      } });
      summary.signals.created += 1;
    }
    }, IMPORT_TRANSACTION_OPTIONS);
  } catch (error) {
    throw withOperation(operation, error);
  }

  return summary;
}

if (require.main === module) {
  if (!process.argv.includes("--apply")) {
    console.log(JSON.stringify({
      mode: "dry-run",
      wouldImport: { culture: drafts.culture.length, rituals: drafts.rituals.length, signals: drafts.signals.length },
      existingRecords: "would be skipped by stable slug/source key",
      applyCommand: "node scripts/import-mvp-review-drafts.js --apply",
    }, null, 2));
    process.exitCode = 0;
  } else importDrafts()
    .then((summary) => { console.log(JSON.stringify(summary, null, 2)); })
    .catch((error) => {
      console.error("Draft import failed; transaction rolled back. Sanitized diagnostic:");
      console.error(JSON.stringify(describeImportError(error), null, 2));
      process.exitCode = 1;
    })
    .finally(async () => { await prisma.$disconnect(); });
}

module.exports = { importDrafts, describeImportError, IMPORT_TRANSACTION_OPTIONS };
