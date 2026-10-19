const { createHash } = require("node:crypto");

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

function cultureContentHash({ content, imageUrl }) {
  const { review: _review, ...reviewableContent } = content || {};
  return createHash("sha256")
    .update(JSON.stringify({ content: reviewableContent, imageUrl: imageUrl || null }))
    .digest("hex");
}

function isCultureArticlePublished(row, { membersOnly = false } = {}) {
  const review = row?.content?.review;
  return Boolean(
    row
      && row.active === true
      && row.verified === true
      && row.editorial_status === "PUBLISHED"
      && row.members_only === membersOnly
      && hasPublishableCultureContent({ content: row.content, imageUrl: row.image_url })
      && review
      && typeof review.reviewerName === "string" && review.reviewerName.trim()
      && typeof review.reviewedOn === "string" && !Number.isNaN(Date.parse(review.reviewedOn))
      && typeof review.note === "string" && review.note.trim().length >= 8
      && review.rightsConfirmed === true
      && ["confirmed", "public-domain"].includes(review.usageRights)
      && review.versionHash === cultureContentHash({ content: row.content, imageUrl: row.image_url }),
  );
}

module.exports = { hasPublishableCultureContent, cultureContentHash, isCultureArticlePublished };
