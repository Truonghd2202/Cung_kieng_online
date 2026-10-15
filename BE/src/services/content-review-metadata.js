function resolveReviewMetadata(logs, isVerified, { contentType, provenance } = {}) {
  if (!isVerified) return null;
  const groupAuthored = contentType === "GROUP_AUTHORED" || provenance?.contentType === "GROUP_AUTHORED";
  for (const log of logs) {
    const details = log.details || {};
    // Older releases wrote visibility changes to CONTENT_REVIEW_UPDATED.
    // Ignore those rows while retaining approval and revocation transitions.
    if (details.before?.verified === details.after?.verified
      && details.rightsConfirmed !== true) continue;
    if (details.after?.verified !== true) return null;
    const reviewedBy = typeof log.users?.full_name === "string" ? log.users.full_name.trim() : "";
    const reviewedAt = new Date(log.created_at);
    if (!reviewedBy || !Number.isFinite(reviewedAt.getTime())) return null;
    const complete = details.rightsConfirmed === true && (groupAuthored
      ? typeof provenance?.contentRightsBasis === "string" && provenance.contentRightsBasis.trim().length > 1
      : ["confirmed", "public-domain"].includes(details.usageRights)
        && typeof details.sourceLocator === "string"
        && details.sourceLocator.trim().length > 1);
    if (!complete) return null;
    return {
      reviewedBy,
      reviewedOn: reviewedAt.toISOString().slice(0, 10),
      reviewNote: details.reviewNote,
      ...(details.sourceLocator ? { sourceLocator: details.sourceLocator } : {}),
      ...(details.usageRights ? { usageRights: details.usageRights } : {}),
      rightsConfirmed: details.rightsConfirmed === true,
    };
  }
  return null;
}

function reviewAuditAction(patch) {
  return patch.verified === undefined ? "CONTENT_VISIBILITY_UPDATED" : "CONTENT_REVIEW_UPDATED";
}

module.exports = { resolveReviewMetadata, reviewAuditAction };
