import test from "node:test";
import assert from "node:assert/strict";
import { getMoodContentUnavailableMessage } from "../src/data/moodAvailability.ts";

test("missing published check-in content is reported as unavailable, not as a network outage", () => {
  const message = getMoodContentUnavailableMessage({ status: 503, message: "No curated signal" });
  assert.match(message, /chưa có lời chiêm nghiệm được duyệt/i);
  assert.match(message, /chưa được lưu/i);
});

test("other failures keep the existing network error path", () => {
  assert.equal(getMoodContentUnavailableMessage({ status: 0, message: "offline" }), null);
  assert.equal(getMoodContentUnavailableMessage(new Error("unexpected")), null);
});
