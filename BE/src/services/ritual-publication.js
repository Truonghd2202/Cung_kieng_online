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

function ritualApprovalIssue(record, { source, sourceLocator, usageRights }) {
  const provenance = record?.content_provenance || {};
  if (isGroupAuthoredRitual(provenance)) {
    return hasGroupAuthoredRitualProvenance(provenance) ? null : "groupAuthorshipRequired";
  }
  const effectiveSource = typeof source === "string" ? source.trim() : String(record?.source || "").trim();
  if (!/^https:\/\/[^\s]+$/i.test(effectiveSource)) return "sourceRequired";
  if (typeof sourceLocator !== "string" || sourceLocator.trim().length < 2 || !["confirmed", "public-domain"].includes(usageRights)) return "provenanceRequired";
  return null;
}

module.exports = { hasUsableChecklist, hasGroupAuthoredRitualProvenance, isGroupAuthoredRitual, ritualApprovalIssue };
