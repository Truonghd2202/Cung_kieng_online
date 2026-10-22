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

function canonicalize(value) {
  if (Array.isArray(value)) return value.map(canonicalize);
  if (!value || typeof value !== "object") return value;
  return Object.fromEntries(
    Object.keys(value).sort().map((key) => [key, canonicalize(value[key])]),
  );
}

function hashReviewableContent(content, imageUrl, { canonical = true, sourceUrlLast = false } = {}) {
  const { review: _review, ...reviewableContent } = content || {};
  if (sourceUrlLast && reviewableContent.provenance && Object.prototype.hasOwnProperty.call(reviewableContent.provenance, "sourceUrl")) {
    const { sourceUrl, ...provenance } = reviewableContent.provenance;
    reviewableContent.provenance = { ...provenance, sourceUrl };
  }
  const value = { content: reviewableContent, imageUrl: imageUrl || null };
  return createHash("sha256")
    .update(JSON.stringify(canonical ? canonicalize(value) : value))
    .digest("hex");
}

function cultureContentHash({ content, imageUrl }) {
  return hashReviewableContent(content, imageUrl);
}

function legacyCultureContentHash({ content, imageUrl }) {
  // Before canonical hashing, review inserted provenance.sourceUrl at the end of
  // the object. PostgreSQL JSONB reordered it on read, making an unchanged
  // approved article appear to have changed. Accept that exact legacy encoding.
  return hashReviewableContent(content, imageUrl, { canonical: false, sourceUrlLast: true });
}

function isCultureArticlePublished(row, { membersOnly = false } = {}) {
  const review = row?.content?.review;
  const provenance = row?.content?.provenance || {};
  const groupAuthored = provenance.contentType === "GROUP_AUTHORED";
  const contentRightsValid = groupAuthored
    ? review?.usageRights === "group-authored" && typeof provenance.contentRightsBasis === "string" && provenance.contentRightsBasis.trim().length > 1
    : ["confirmed", "public-domain"].includes(review?.usageRights);
  const imageRightsValid = !row?.image_url || review?.imageRightsConfirmed === true;
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
      && contentRightsValid
      && imageRightsValid
      && [
        cultureContentHash({ content: row.content, imageUrl: row.image_url }),
        legacyCultureContentHash({ content: row.content, imageUrl: row.image_url }),
      ].includes(review.versionHash),
  );
}

module.exports = { hasPublishableCultureContent, cultureContentHash, legacyCultureContentHash, isCultureArticlePublished };
