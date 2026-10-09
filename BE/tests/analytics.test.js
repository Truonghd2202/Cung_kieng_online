const test = require("node:test");
const assert = require("node:assert/strict");
const { eventSchema } = require("../src/validators/analytics.validator");

const validEvent = {
  clientEventId: "a9cb40ac-466f-49b5-97bd-625b9444d09a",
  anonymousId: "ee354c7a-af92-4097-b9f7-a9c5197fa2bc",
  eventName: "mood_checkin_completed",
  campaignSource: "organic_social",
};

test("accepts allowlisted analytics events and attribution sources", () => {
  assert.equal(eventSchema.safeParse(validEvent).success, true);
});

test("rejects event properties that could contain sensitive user data", () => {
  assert.equal(eventSchema.safeParse({ ...validEvent, mood: "sad" }).success, false);
  assert.equal(eventSchema.safeParse({ ...validEvent, note: "private journal text" }).success, false);
  assert.equal(eventSchema.safeParse({ ...validEvent, campaignSource: "unknown-freeform-value" }).success, false);
  assert.equal(eventSchema.safeParse({ ...validEvent, eventName: "arbitrary_event" }).success, false);
});
