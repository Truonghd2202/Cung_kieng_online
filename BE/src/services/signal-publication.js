const { createHash } = require("node:crypto");

function parseSignalContent(value) {
  if (value && typeof value === "object") return value;
  if (typeof value !== "string") return null;
  try {
    const parsed = JSON.parse(value);
    return parsed && typeof parsed === "object" && !Array.isArray(parsed) ? parsed : null;
  } catch {
    return null;
  }
}

function signalMetadata(row) {
  return parseSignalContent(row?.content)?.metadata || null;
}

function hasPublishableProvenance(row) {
  const metadata = signalMetadata(row);
  if (!metadata || !["editorial", "folk"].includes(metadata.contentKind)) return false;
  if (typeof metadata.contentAuthor !== "string" || !metadata.contentAuthor.trim()) return false;
  if (typeof metadata.contentRightsBasis !== "string" || !metadata.contentRightsBasis.trim()) return false;

  if (metadata.contentKind === "editorial") {
    return metadata.contentType === "GROUP_AUTHORED" && metadata.quotationVerified === false;
  }

  return metadata.contentType === "QUOTATION"
    && metadata.quotationVerified === true
    && typeof metadata.originCommunity === "string"
    && Boolean(metadata.originCommunity.trim())
    && Array.isArray(metadata.sources)
    && metadata.sources.length > 0
    && metadata.sources.every((source) =>
      typeof source?.title === "string" && Boolean(source.title.trim())
      && typeof source?.locator === "string" && Boolean(source.locator.trim())
      && typeof source?.url === "string" && /^https:\/\//i.test(source.url),
    );
}

function canonical(value) {
  if (Array.isArray(value)) return value.map(canonical);
  if (!value || typeof value !== "object") return value;
  return Object.fromEntries(Object.keys(value).sort().map((key) => [key, canonical(value[key])]));
}

function signalContentHash(row) {
  const version = {
    id: row.id,
    source: row.source,
    mood: row.mood,
    context_key: row.context_key,
    title: row.title,
    category: row.category,
    advice: row.advice,
    region: row.region,
    content: parseSignalContent(row.content),
  };
  return createHash("sha256").update(JSON.stringify(canonical(version))).digest("hex");
}

function isPublishable(row) {
  return Boolean(row
    && row.active === true
    && row.editorial_status === "PUBLISHED"
    && row.reviewed_by
    && row.reviewed_at
    && typeof row.approved_content_hash === "string"
    && row.approved_content_hash === signalContentHash(row)
    && hasPublishableProvenance(row));
}

function removeLegacyEditorialState(content) {
  const parsed = parseSignalContent(content);
  if (!parsed?.metadata || typeof parsed.metadata !== "object") return parsed || content;
  const metadata = { ...parsed.metadata };
  delete metadata.editorialStatus;
  delete metadata.reviewedBy;
  delete metadata.reviewedOn;
  return { ...parsed, metadata };
}

module.exports = {
  parseSignalContent,
  signalMetadata,
  hasPublishableProvenance,
  signalContentHash,
  isPublishable,
  removeLegacyEditorialState,
};
