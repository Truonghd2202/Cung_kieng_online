const { canTransitionEditorialStatus, nextEditorialStatus } = require("../../../shared/editorial-workflow.mjs");

function stateAfterReview(before, patch) {
  const status = before.editorial_status;
  if (patch.verified === false) return { revokeApprovalRequired: true };

  if (patch.verified === true) {
    if (patch.active === true) return { reviewAndPublishInOneStep: true };
    if (!canTransitionEditorialStatus(status, "approve")) return { reviewRequired: true };
    return { verified: true, active: false, editorial_status: nextEditorialStatus(status, "approve") };
  }

  if (patch.active === true) {
    if (!before.verified || !canTransitionEditorialStatus(status, "publish", true)) {
      return { approvalRequired: true };
    }
    return { verified: true, active: true, editorial_status: nextEditorialStatus(status, "publish") };
  }

  if (patch.active === false) {
    if (!canTransitionEditorialStatus(status, "hide")) return { invalidTransition: true };
    return { verified: before.verified, active: false, editorial_status: nextEditorialStatus(status, "hide") };
  }

  return { invalidTransition: true };
}

function stateAfterEdit(submitted) {
  const action = submitted ? "submit_review" : "edit_draft";
  return {
    editorial_status: nextEditorialStatus("DRAFT", action),
    verified: false,
    active: false,
  };
}

module.exports = { stateAfterReview, stateAfterEdit };
