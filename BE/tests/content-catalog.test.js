const test = require("node:test");
const assert = require("node:assert/strict");
const inventory = require("../prisma/seed/data/dsvh-national-inventory.json");
const calendarEvents = require("../prisma/seed/data/verified-calendar-events.json");
const guanyinLots = require("../prisma/seed/data/ctc-guanyin-100.json");
const { listQuerySchema } = require("../src/validators/content.validator");

test("official heritage inventory provides more than 200 uniquely addressable seed entries", () => {
  assert.ok(inventory.length > 200);
  assert.equal(new Set(inventory.map((item) => item.sourceRow)).size, inventory.length);
  assert.ok(inventory.every((item) => item.title && item.decision));
});

test("verified calendar entries have source URLs and valid Vietnamese lunar dates", () => {
  assert.ok(calendarEvents.length >= 10);
  assert.ok(calendarEvents.every((event) =>
    event.source.startsWith("https://") &&
    event.day >= 1 && event.day <= 30 &&
    event.month >= 1 && event.month <= 12
  ));
});

test("the cited Guanyin source supplies every lot number from 1 through 100", () => {
  const numbers = guanyinLots.map((lot) => lot.stickNumber).sort((a, b) => a - b);
  assert.equal(guanyinLots.length, 100);
  assert.deepEqual(numbers, Array.from({ length: 100 }, (_, index) => index + 1));
  assert.ok(guanyinLots.every((lot) => lot.storyTitle && lot.sourceUrl.startsWith("https://")));
});

test("culture catalogue pagination permits traversal beyond the first API page", () => {
  assert.deepEqual(listQuerySchema.parse({ limit: "100", offset: "400" }), {
    limit: 100,
    offset: 400,
  });
  assert.equal(listQuerySchema.safeParse({ offset: "5001" }).success, false);
});
