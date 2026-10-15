const test = require("node:test");
const assert = require("node:assert/strict");
const { stateAfterEdit, stateAfterReview } = require("../src/services/editorial-workflow");

test("approval, hide, show preserves approval and maps display state independently", () => {
  let state = stateAfterReview({ verified: false, active: false, editorial_status: "IN_REVIEW" }, { verified: true });
  assert.deepEqual(state, { verified: true, active: false, editorial_status: "APPROVED" });
  state = stateAfterReview(state, { active: true });
  assert.equal(state.editorial_status, "PUBLISHED");
  state = stateAfterReview(state, { active: false });
  assert.deepEqual(state, { verified: true, active: false, editorial_status: "HIDDEN" });
  state = stateAfterReview(state, { active: true });
  assert.deepEqual(state, { verified: true, active: true, editorial_status: "PUBLISHED" });
});

test("revocation blocks republishing and editing an approved item clears approval", () => {
  const revoked = stateAfterReview({ verified: true, active: true, editorial_status: "PUBLISHED" }, { verified: false });
  assert.deepEqual(revoked, { verified: false, active: false, editorial_status: "REVOKED" });
  assert.equal(stateAfterReview(revoked, { active: true }).approvalRequired, true);
  assert.deepEqual(stateAfterEdit(false), { editorial_status: "DRAFT", verified: false, active: false });
  assert.deepEqual(stateAfterEdit(true), { editorial_status: "IN_REVIEW", verified: false, active: false });
});
