const test = require("node:test");
const assert = require("node:assert/strict");
const { stateAfterEdit, stateAfterReview } = require("../src/services/editorial-workflow");
const {
  EDITORIAL_STATUSES,
  allowedEditorialActions,
  canTransitionEditorialStatus,
  editorialStatusLabel,
} = require("../../shared/editorial-workflow.mjs");

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

test("approval revocation uses the dedicated flow and editing clears approval", () => {
  assert.deepEqual(
    stateAfterReview({ verified: true, active: true, editorial_status: "PUBLISHED" }, { verified: false }),
    { revokeApprovalRequired: true },
  );
  assert.deepEqual(stateAfterEdit(false), { editorial_status: "DRAFT", verified: false, active: false });
  assert.deepEqual(stateAfterEdit(true), { editorial_status: "IN_REVIEW", verified: false, active: false });
});

test("review requires IN_REVIEW and publication is a separate transition", () => {
  assert.deepEqual(
    stateAfterReview({ verified: false, active: false, editorial_status: "DRAFT" }, { verified: true }),
    { reviewRequired: true },
  );
  assert.deepEqual(
    stateAfterReview({ verified: false, active: false, editorial_status: "IN_REVIEW" }, { verified: true, active: true }),
    { reviewAndPublishInOneStep: true },
  );
  assert.deepEqual(
    stateAfterReview({ verified: false, active: false, editorial_status: "IN_REVIEW" }, { verified: true }),
    { verified: true, active: false, editorial_status: "APPROVED" },
  );
});

test("the shared workflow exposes only role and state appropriate actions", () => {
  assert.deepEqual(EDITORIAL_STATUSES, ["DRAFT", "IN_REVIEW", "APPROVED", "PUBLISHED", "HIDDEN", "REVOKED"]);
  assert.deepEqual(allowedEditorialActions({ role: "EDITOR", status: "DRAFT", ownsContent: true }), ["edit_draft", "submit_review"]);
  assert.deepEqual(allowedEditorialActions({ role: "EDITOR", status: "IN_REVIEW", ownsContent: true }), ["withdraw_review"]);
  assert.deepEqual(allowedEditorialActions({ role: "EDITOR", status: "PUBLISHED", ownsContent: true }), []);
  assert.deepEqual(allowedEditorialActions({ role: "EDITOR", status: "DRAFT", ownsContent: false }), []);
  assert.deepEqual(allowedEditorialActions({ role: "ADMIN", status: "IN_REVIEW" }), ["request_changes", "approve"]);
  assert.deepEqual(allowedEditorialActions({ role: "ADMIN", status: "APPROVED", approvalCurrent: true }), ["publish", "revoke_approval"]);
  assert.deepEqual(allowedEditorialActions({ role: "ADMIN", status: "HIDDEN", approvalCurrent: false }), []);
  assert.deepEqual(allowedEditorialActions({ role: "USER", status: "PUBLISHED", approvalCurrent: true }), []);
  assert.equal(canTransitionEditorialStatus("DRAFT", "publish"), false);
  assert.equal(canTransitionEditorialStatus("REVOKED", "request_changes"), true);
  assert.equal(canTransitionEditorialStatus("REVOKED", "approve"), false);
  assert.equal(editorialStatusLabel("APPROVED"), "Đã duyệt · chưa công khai");
});
