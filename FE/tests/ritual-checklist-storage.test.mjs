import test from "node:test";
import assert from "node:assert/strict";
import { clearRitualChecklistProgress, getRitualChecklistStorageKey } from "../src/data/ritualChecklistStorage.ts";

test("ritual checklist progress keys are isolated by account and ritual", () => {
  assert.equal(getRitualChecklistStorageKey("family-guide", "User@Example.com"), "tltl-ritual-checklist-user@example.com-family-guide");
  assert.notEqual(getRitualChecklistStorageKey("family-guide", "user@example.com"), getRitualChecklistStorageKey("family-guide", undefined));
  assert.notEqual(getRitualChecklistStorageKey("family-guide", "user@example.com"), getRitualChecklistStorageKey("other-guide", "user@example.com"));
});

test("reset reports storage failure so the screen can preserve visible progress", () => {
  assert.equal(clearRitualChecklistProgress("key", { removeItem() {} }), true);
  assert.equal(clearRitualChecklistProgress("key", { removeItem() { throw new Error("blocked"); } }), false);
});
