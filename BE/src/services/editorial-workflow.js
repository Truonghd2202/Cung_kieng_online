function stateAfterReview(before, patch) {
  if (patch.active === true && patch.verified !== true && before.verified !== true) {
    return { approvalRequired: true };
  }
  if (patch.verified === true && patch.active === true) {
    return { reviewAndPublishInOneStep: true };
  }
  const state = { verified: before.verified, active: before.active, editorial_status: before.editorial_status };
  if (patch.verified === false) {
    state.verified = false;
    state.active = false;
    state.editorial_status = "REVOKED";
  } else if (patch.verified === true) {
    if (!["IN_REVIEW", "REVOKED"].includes(before.editorial_status)) return { reviewRequired: true };
    state.verified = true;
    state.active = false;
    state.editorial_status = "APPROVED";
  } else if (patch.active !== undefined) {
    if (patch.active === true && !["APPROVED", "PUBLISHED", "HIDDEN"].includes(before.editorial_status)) {
      return { approvalRequired: true };
    }
    state.active = patch.active;
    if (patch.active) state.editorial_status = "PUBLISHED";
    else if (before.active || ["PUBLISHED", "HIDDEN"].includes(before.editorial_status)) state.editorial_status = "HIDDEN";
    else if (before.verified) state.editorial_status = "APPROVED";
  }
  return state;
}

function stateAfterEdit(submitted) {
  return { editorial_status: submitted ? "IN_REVIEW" : "DRAFT", verified: false, active: false };
}

module.exports = { stateAfterReview, stateAfterEdit };
