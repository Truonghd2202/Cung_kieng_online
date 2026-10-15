const test = require("node:test");
const assert = require("node:assert/strict");
const drafts = require("../../editorial/mvp-review-drafts");
const { importDrafts, describeImportError, IMPORT_TRANSACTION_OPTIONS } = require("../scripts/import-mvp-review-drafts");

function fakePrisma() {
  const records = { culture: new Map(), rituals: new Map(), signals: new Map() };
  const created = { culture: [], rituals: [], signals: [] };
  const firstCulture = drafts.culture[0];
  const firstRitual = drafts.rituals[0];
  const firstSignal = drafts.signals[0];
  records.culture.set(firstCulture.slug, { id: "admin-edited-existing" });
  records.rituals.set(firstRitual.slug, { id: "approved-existing" });
  records.signals.set(firstSignal.source, { id: "edited-existing" });

  const tx = {
    culture_articles: {
      findUnique: async ({ where }) => records.culture.get(where.slug) || null,
      create: async ({ data }) => { created.culture.push(data); records.culture.set(data.slug, { id: data.slug }); return data; },
    },
    rituals: {
      findUnique: async ({ where }) => records.rituals.get(where.slug) || null,
      create: async ({ data }) => { created.rituals.push(data); records.rituals.set(data.slug, { id: data.slug }); return data; },
    },
    signals: {
      findFirst: async ({ where }) => records.signals.get(where.source) || null,
      create: async ({ data }) => { created.signals.push(data); records.signals.set(data.source, { id: data.source }); return data; },
    },
  };

  const transactionOptions = [];
  return {
    records,
    created,
    transactionOptions,
    client: { $transaction: async (callback, options) => { transactionOptions.push(options); return callback(tx); } },
  };
}

test("MVP draft import is idempotent and never updates an existing record", async () => {
  const { client, created, transactionOptions } = fakePrisma();
  const first = await importDrafts(client);
  const second = await importDrafts(client);

  assert.deepEqual(first, {
    culture: { created: drafts.culture.length - 1, skipped: 1 },
    rituals: { created: drafts.rituals.length - 1, skipped: 1 },
    signals: { created: drafts.signals.length - 1, skipped: 1 },
  });
  assert.deepEqual(second, {
    culture: { created: 0, skipped: drafts.culture.length },
    rituals: { created: 0, skipped: drafts.rituals.length },
    signals: { created: 0, skipped: drafts.signals.length },
  });
  assert.ok(created.culture.every((row) => row.editorial_status === "DRAFT" && row.active === false && row.verified === false));
  assert.ok(created.rituals.every((row) => row.editorial_status === "DRAFT" && row.active === false && row.verified === false && row.checklists.length > 0));
  assert.ok(created.signals.every((row) => row.editorial_status === "DRAFT" && row.active === false && !Object.hasOwn(JSON.parse(row.content).metadata, "editorialStatus")));
  assert.deepEqual(transactionOptions, [IMPORT_TRANSACTION_OPTIONS, IMPORT_TRANSACTION_OPTIONS]);
});

test("failed imports report a sanitized operation and schema hint without raw database errors", async () => {
  const secret = "postgres://user:password@private-host/db";
  const { client } = fakePrisma();
  client.$transaction = async (callback) => callback({
    culture_articles: {
      findUnique: async () => null,
      create: async ({ data }) => data,
    },
    rituals: {
      findUnique: async () => null,
      create: async () => {
        const error = new Error(`database URL: ${secret}`);
        error.code = "P2022";
        error.meta = { modelName: "rituals", column: "checklists" };
        throw error;
      },
    },
    signals: { findFirst: async () => null, create: async ({ data }) => data },
  });

  await assert.rejects(importDrafts(client), (error) => {
    const diagnostic = describeImportError(error);
    assert.deepEqual(diagnostic, {
      operation: "rituals.create",
      code: "P2022",
      model: "rituals",
      column: "checklists",
      hint: "The target database schema may be missing a migration. Check migration status on the intended test/staging database; do not reset it.",
    });
    assert.equal(JSON.stringify(diagnostic).includes(secret), false);
    return true;
  });
});

test("P2028 diagnostics identify transaction expiry without exposing the error message", () => {
  const error = new Error("transaction closed at postgres://user:password@private-host/db");
  error.importOperation = "signals.create";
  error.cause = Object.assign(new Error("sensitive details"), { code: "P2028", meta: { modelName: "signals" } });
  const diagnostic = describeImportError(error);

  assert.deepEqual(diagnostic, {
    operation: "signals.create",
    code: "P2028",
    model: "signals",
    hint: "The interactive transaction may have expired or closed. This importer now allows up to 60 seconds; if it persists, check database connectivity and transaction limits.",
  });
  assert.equal(JSON.stringify(diagnostic).includes("private-host"), false);
});
