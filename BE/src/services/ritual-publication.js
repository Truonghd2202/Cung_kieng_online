function hasUsableChecklist(checklists) {
  return Array.isArray(checklists)
    && checklists.some((item) => typeof item?.id === "string" && item.id.trim()
      && typeof item?.label === "string" && item.label.trim());
}

function hasGroupAuthoredRitualProvenance(provenance) {
  return provenance?.contentType === "GROUP_AUTHORED"
    && typeof provenance.authorOrOrganization === "string" && provenance.authorOrOrganization.trim().length > 1
    && typeof provenance.scope === "string" && provenance.scope.trim().length > 1
    && typeof provenance.contentRightsBasis === "string" && provenance.contentRightsBasis.trim().length > 1;
}

function isGroupAuthoredRitual(provenance) {
  return provenance?.contentType === "GROUP_AUTHORED";
}

function ritualImageProfileIssues(record) {
  if (!record?.image_url) return [];
  const provenance = record.content_provenance || {};
  const issues = [];
  if (typeof provenance.imageCaption !== "string" || provenance.imageCaption.trim().length < 1) issues.push("imageCaptionRequired");
  if (typeof provenance.imageCredit !== "string" || provenance.imageCredit.trim().length < 1) issues.push("imageCreditRequired");
  if (typeof provenance.imageSource !== "string" || !/^https:\/\/[^\s]+$/i.test(provenance.imageSource.trim())) issues.push("imageSourceRequired");
  if (typeof provenance.imageRightsBasis !== "string" || provenance.imageRightsBasis.trim().length < 1) issues.push("imageRightsBasisRequired");
  return issues;
}

function hasCompleteRitualImageProfile(record) {
  return ritualImageProfileIssues(record).length === 0;
}

function isRitualImagePubliclyApproved(record, { reviewMetadata, approvedContentHash, currentContentHash } = {}) {
  return Boolean(
    record?.image_url
    && reviewMetadata?.imageRightsConfirmed === true
    && hasCompleteRitualImageProfile(record)
    && typeof approvedContentHash === "string"
    && approvedContentHash.length > 0
    && approvedContentHash === currentContentHash,
  );
}

function ritualApprovalIssue(record, { source, sourceLocator, usageRights, imageRightsConfirmed } = {}) {
  const provenance = record?.content_provenance || {};
  if (isGroupAuthoredRitual(provenance)) {
    if (!hasGroupAuthoredRitualProvenance(provenance)) return "groupAuthorshipRequired";
  } else {
    const effectiveSource = typeof source === "string" ? source.trim() : String(record?.source || "").trim();
    if (!/^https:\/\/[^\s]+$/i.test(effectiveSource)) return "sourceRequired";
    if (typeof sourceLocator !== "string" || sourceLocator.trim().length < 2 || !["confirmed", "public-domain"].includes(usageRights)) return "provenanceRequired";
  }

  const imageIssues = ritualImageProfileIssues(record);
  if (imageIssues.length) return imageIssues[0];
  if (record?.image_url && imageRightsConfirmed !== true) return "imageRightsConfirmationRequired";
  return null;
}

module.exports = {
  hasUsableChecklist,
  hasGroupAuthoredRitualProvenance,
  isGroupAuthoredRitual,
  ritualImageProfileIssues,
  hasCompleteRitualImageProfile,
  isRitualImagePubliclyApproved,
  ritualApprovalIssue,
};
