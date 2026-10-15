import test from "node:test";
import assert from "node:assert/strict";
import checkInCatalog from "../../shared/checkin-catalog.json" with { type: "json" };
import { applyMoodTurnOutcome, isConfirmedActionUpdate, isSupportedMood, supportedMoodLabels } from "../src/data/moodCheckInState.ts";

test("saved mood validation restores every supported catalog mood", () => {
  assert.deepEqual(supportedMoodLabels, checkInCatalog.moods.map(({ label }) => label));
  for (const { label } of checkInCatalog.moods) assert.equal(isSupportedMood(label), true);
  assert.equal(isSupportedMood("not-a-mood"), false);
});

test("a failed new check-in leaves the previous action and check-in untouched", () => {
  const previous = {
    checkedIn: true,
    signalId: "old-signal",
    checkInId: "old-checkin",
    actionDone: true,
    mood: "An yên",
    contextKey: "general",
  };
  const next = applyMoodTurnOutcome(previous, {
    signal: null,
    checkInId: null,
    mood: "Cô đơn",
    contextKey: "family",
  }, true);
  assert.equal(next, previous);
  assert.equal(next.actionDone, true);
  assert.equal(next.checkInId, "old-checkin");
});

test("a confirmed new check-in resets action state against its own check-in ID", () => {
  const next = applyMoodTurnOutcome({
    checkedIn: true, signalId: "old", checkInId: "old-checkin", actionDone: true,
    mood: "An yên", contextKey: "general",
  }, {
    signal: { id: "new-signal" }, checkInId: "new-checkin", mood: "Cô đơn", contextKey: "family",
  }, true);
  assert.equal(next.actionDone, false);
  assert.equal(next.checkInId, "new-checkin");
  assert.equal(next.signalId, "new-signal");
});

test("action state accepts only a BE response matching the check-in ID and requested value", () => {
  assert.equal(isConfirmedActionUpdate("checkin-1", true, { id: "checkin-1", actionDone: true }), true);
  assert.equal(isConfirmedActionUpdate("checkin-1", true, { id: "checkin-2", actionDone: true }), false);
  assert.equal(isConfirmedActionUpdate("checkin-1", true, { id: "checkin-1", actionDone: false }), false);
});
