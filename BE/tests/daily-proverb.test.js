const test = require("node:test");
const assert = require("node:assert/strict");
const { dailyProverbIndex, vietnamDateKey } = require("../src/services/content.service");

test("daily proverb sequence has no duplicate during a 365-day cycle", () => {
  const indexes = [];
  for (let offset = 0; offset < 365; offset += 1) {
    const date = new Date(Date.UTC(2026, 0, 1 + offset)).toISOString().slice(0, 10);
    indexes.push(dailyProverbIndex(date, 365));
  }

  assert.equal(new Set(indexes).size, 365);
  assert.equal(dailyProverbIndex("2027-01-01", 365), indexes[0]);
});

test("daily proverb date follows Vietnam time", () => {
  assert.equal(vietnamDateKey(new Date("2026-10-07T17:30:00.000Z")), "2026-10-08");
});
