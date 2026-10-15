const test = require("node:test");
const assert = require("node:assert/strict");
const { z } = require("zod");
const validate = require("../src/middleware/validation.middleware");

test("query validation stores coerced values separately from Express 5 req.query", () => {
  const req = {};
  Object.defineProperty(req, "query", {
    configurable: true,
    get: () => ({ limit: "10", offset: "0" }),
  });

  let nextCalled = false;
  const res = {
    status() { throw new Error("Unexpected validation failure"); },
    json() { throw new Error("Unexpected validation failure"); },
  };
  const middleware = validate(z.object({
    limit: z.coerce.number().int().default(50),
    offset: z.coerce.number().int().default(0),
  }), "query");

  middleware(req, res, () => { nextCalled = true; });

  assert.equal(nextCalled, true);
  assert.deepEqual(req.validated.query, { limit: 10, offset: 0 });
  assert.deepEqual(req.query, { limit: "10", offset: "0" });
});
