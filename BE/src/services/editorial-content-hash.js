const { createHash } = require("node:crypto");

const WORKFLOW_FIELDS = new Set(["active", "verified", "editorial_status", "created_at", "updated_at"]);

function canonical(value) {
  if (value instanceof Date) return value.toISOString();
  if (Array.isArray(value)) return value.map(canonical);
  if (!value || typeof value !== "object") return value;
  return Object.fromEntries(Object.keys(value).sort().map((key) => [key, canonical(value[key])]));
}

function editorialContentHash(record) {
  const content = Object.fromEntries(
    Object.entries(record || {}).filter(([key]) => !WORKFLOW_FIELDS.has(key)),
  );
  return createHash("sha256").update(JSON.stringify(canonical(content))).digest("hex");
}

module.exports = { editorialContentHash };
