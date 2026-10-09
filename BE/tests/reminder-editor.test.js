const test = require("node:test");
const assert = require("node:assert/strict");
const { anniversaryMatches, threeDaysFromVietnamToday } = require("../src/utils/anniversary");
const { schemas } = require("../src/validators/content-editor.validator");
const { subscriptionSchema } = require("../src/validators/push.validator");
const { memorialSchema, memorialUpdateSchema } = require("../src/validators/memorial.validator");
test("memorial anniversaries distinguish solar/lunar dates and allow clearing optional fields", () => {
  const input = { fullName: "Người thân", anniversary: { calendar: "SOLAR", day: 31, month: 1 } };
  assert.equal(memorialSchema.safeParse(input).success, true);
  assert.equal(memorialSchema.safeParse({ ...input, anniversary: { calendar: "LUNAR", day: 31, month: 1 } }).success, false);
  assert.equal(memorialSchema.safeParse({ ...input, anniversary: { calendar: "SOLAR", day: 30, month: 2 } }).success, false);
  assert.equal(memorialSchema.safeParse({ ...input, anniversary: { calendar: "SOLAR", day: 1, month: 1, repeatYearly: false } }).success, false);
  assert.equal(memorialUpdateSchema.safeParse({ birthDate: null, deathDate: null, avatarUrl: null, anniversary: null }).success, true);
  assert.equal(memorialSchema.safeParse({ fullName: "Người thân", deathDate: "2026-02-30" }).success, false);
});
test("reminders use Vietnamese date across UTC midnight and year boundaries", () => {
  assert.equal(threeDaysFromVietnamToday(new Date("2026-12-31T18:00:00Z")).toISOString(), "2027-01-04T00:00:00.000Z");
  assert.equal(anniversaryMatches({ calendar: "LUNAR", day: 1, month: 1, repeat_yearly: true }, new Date("2024-02-10T00:00:00Z")), true);
  assert.equal(anniversaryMatches({ calendar: "LUNAR", day: 1, month: 2, repeat_yearly: true }, new Date("2023-03-22T00:00:00Z")), false);
  assert.equal(anniversaryMatches({ calendar: "SOLAR", day: 4, month: 1, year: 2026, repeat_yearly: false }, new Date("2027-01-04T00:00:00Z")), false);
});
test("editor rejects impossible calendar days and forged approval fields", () => {
  const draft = { title: "Lễ hội", description: "", category: "", calendar: "LUNAR", day: 30, month: 1, source: "https://example.org/source", region: "NATIONWIDE", reviewNote: "Bổ sung từ nguồn tham khảo" };
  assert.equal(schemas.calendar.safeParse(draft).success, true);
  assert.equal(schemas.calendar.safeParse({ ...draft, day: 31 }).success, false);
  assert.equal(schemas.calendar.safeParse({ ...draft, calendar: "SOLAR", month: 2, day: 30 }).success, false);
  assert.equal(schemas.calendar.safeParse({ ...draft, verified: true }).success, false);
});
test("push endpoints reject internal addresses and suffix lookalikes", () => {
  const keys = { p256dh: "a".repeat(87), auth: "b".repeat(22) };
  for (const endpoint of ["http://127.0.0.1/admin", "https://fcm.googleapis.com.attacker.test/path", "https://localhost/path", "https://fcm.googleapis.com:444/path"]) assert.equal(subscriptionSchema.safeParse({ endpoint, keys }).success, false);
  assert.equal(subscriptionSchema.safeParse({ endpoint: "https://fcm.googleapis.com/fcm/send/example", keys }).success, true);
});
