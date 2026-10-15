function stateAfterReview(before, patch) {
  if (patch.active === true && patch.verified !== true && before.verified !== true) {
    return { approvalRequired: true };
  }
  const state = { verified: before.verified, active: before.active, editorial_status: before.editorial_status };
  if (patch.verified === false) {
    state.verified = false;
    state.active = false;
    state.editorial_status = "REVOKED";
  } else if (patch.verified === true) {
    state.verified = true;
    if (patch.active !== undefined) state.active = patch.active;
    state.editorial_status = state.active ? "PUBLISHED" : "APPROVED";
  } else if (patch.active !== undefined) {
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
