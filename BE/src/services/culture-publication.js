function hasPublishableCultureContent({ content, imageUrl }) {
  const provenance = content?.provenance || {};
  const sectionsValid = content?.contentKind === "article"
    && Array.isArray(content.sections)
    && content.sections.some((section) => String(section?.body || "").trim().length >= 120);
  const groupAuthored = provenance.contentType === "GROUP_AUTHORED";
  const sourceValid = groupAuthored
    || (Boolean(provenance.sourceTitle) && Boolean(provenance.bibliography || provenance.sourceUrl));
  const sourcePositionValid = groupAuthored || Boolean(String(provenance.sourceLocator || "").trim());
  const quotationValid = provenance.contentType !== "QUOTATION" || (sourceValid && sourcePositionValid);
  const imageRightsValid = !imageUrl
    || Boolean(provenance.imageCaption && provenance.imageSource && provenance.imageRightsBasis);
  return sectionsValid && sourceValid && sourcePositionValid && quotationValid && imageRightsValid;
}

module.exports = { hasPublishableCultureContent };
