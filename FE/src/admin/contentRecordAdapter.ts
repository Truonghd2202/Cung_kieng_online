type JsonRecord = Record<string, unknown>;

function asRecord(value: unknown): JsonRecord {
  return value && typeof value === "object" && !Array.isArray(value) ? value as JsonRecord : {};
}

function asText(...values: unknown[]): string {
  for (const value of values) if (typeof value === "string" && value.trim()) return value.trim();
  return "";
}

export function normalizeContentRecord(record: JsonRecord) {
  const content = asRecord(record.content);
  const provenance = asRecord(content.provenance || record.content_provenance || record.editorial_metadata || record.provenance);
  const review = asRecord(content.review || record.review);
  const rawRegion = asText(record.region);
  return {
    sourceTitle: asText(provenance.sourceTitle, provenance.sourceDoc, record.sourceTitle, record.source_book),
    sourceLocator: asText(provenance.sourceLocator, record.source_locator),
    sourceAuthor: asText(provenance.sourceAuthor, provenance.authorOrOrganization, record.author),
    bibliography: asText(provenance.bibliography),
    rightsBasis: asText(provenance.contentRightsBasis, record.usage_rights),
    reviewerName: asText(review.reviewerName, record.reviewerName, record.reviewer_name, record.reviewed_by),
    reviewNote: asText(review.note, record.reviewNote, record.review_note),
    rightsConfirmed: review.rightsConfirmed === true || record.rightsConfirmed === true || record.rights_confirmed === true,
    region: rawRegion === "ALL" ? "NATIONWIDE" : rawRegion,
  };
}
