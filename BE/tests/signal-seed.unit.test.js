const test = require("node:test");
const assert = require("node:assert/strict");
const { createSignalIfMissing } = require("../prisma/seed/signal.seed");

test("signal seed is rerunnable and preserves an existing reviewed or edited row", async () => {
  const calls = [];
  const existing = { id: "existing", source: "mood-draft", active: false, content: "admin edit" };
  const client = {
    signals: {
      findFirst: async (args) => { calls.push(["findFirst", args]); return existing; },
      create: async (args) => { calls.push(["create", args]); throw new Error("must not create duplicate"); },
      update: async (args) => { calls.push(["update", args]); throw new Error("must not overwrite existing content"); },
    },
  };

  const result = await createSignalIfMissing("mood-draft", { active: true, content: "seed" }, client);

  assert.equal(result.created, false);
  assert.equal(result.row, existing);
  assert.deepEqual(calls.map(([operation]) => operation), ["findFirst"]);
});

test("signal seed creates one stable draft row when the source key is new", async () => {
  const calls = [];
  const created = { id: "new", source: "mood-new" };
  const client = {
    signals: {
      findFirst: async (args) => { calls.push(["findFirst", args]); return null; },
      create: async (args) => { calls.push(["create", args]); return created; },
    },
  };

  const result = await createSignalIfMissing("mood-new", { active: false, content: "draft" }, client);

  assert.equal(result.created, true);
  assert.equal(result.row, created);
  assert.deepEqual(calls.map(([operation]) => operation), ["findFirst", "create"]);
  assert.equal(calls[1][1].data.active, false);
});
