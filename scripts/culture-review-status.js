const crypto = require("crypto");
const fs = require("fs");
const path = require("path");

const recordsPath = path.join(__dirname, "../editorial/culture-review-records.json");
const reviewRecords = fs.existsSync(recordsPath)
  ? JSON.parse(fs.readFileSync(recordsPath, "utf8"))
  : [];

function contentVersionHash(article) {
  return crypto.createHash("sha256").update(JSON.stringify(article)).digest("hex");
}

function hasHumanRecord(record, stage, versionHash) {
  const entry = record?.[stage];
  return Boolean(
    entry
      && typeof entry.reviewer === "string" && entry.reviewer.trim()
      && typeof entry.reviewedAt === "string" && !Number.isNaN(Date.parse(entry.reviewedAt))
      && typeof entry.evidence === "string" && entry.evidence.trim()
      && entry.versionHash === versionHash,
  );
}

function getCultureReviewStatus(article) {
  const versionHash = contentVersionHash(article);
  const record = reviewRecords.find((item) => item.slug === article.slug);
  const structureValid = Boolean(
    article && typeof article.slug === "string" && article.slug.trim()
      && typeof article.title === "string" && article.title.trim()
      && Array.isArray(article.sections) && article.sections.length > 0
      && article.sections.every((section) => typeof section.heading === "string"
        && section.heading.trim() && typeof section.body === "string" && section.body.trim()),
  );
  const sourceIdentified = Boolean(
    article.provenance?.sourceTitle?.trim()
      && article.provenance?.sourceLocator?.trim()
      && (article.provenance?.sourceUrl?.trim() || article.provenance?.bibliography?.trim()),
  );

  return {
    versionHash,
    structureValid,
    sourceIdentified,
    sourceChecked: hasHumanRecord(record, "sourceChecked", versionHash),
    contentReviewed: hasHumanRecord(record, "contentReviewed", versionHash),
    // Draft JSON has no authoritative database publication state.
    published: false,
  };
}

module.exports = { getCultureReviewStatus };
