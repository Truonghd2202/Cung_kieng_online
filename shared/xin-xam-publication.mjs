export function normalizeXamPoemLines(value) {
  const lines = Array.isArray(value)
    ? value
    : typeof value === "string"
      ? value.split(/\r\n|\r|\n/)
      : [];

  return lines
    .filter((line) => typeof line === "string")
    .map((line) => line.trim())
    .filter(Boolean);
}

export function hasCompleteXamPoem(value) {
  return normalizeXamPoemLines(value).length === 4;
}

function hasCompleteXamInterpretation(value) {
  const fields = Array.isArray(value) ? value : [value];
  return fields.length > 0 && fields.every((field) => typeof field === "string" && field.trim());
}

function isHttpsSource(value) {
  if (typeof value !== "string" || !value.trim()) return false;
  try {
    return new URL(value).protocol === "https:";
  } catch {
    return false;
  }
}

export function hasCompleteXamContent({ poem, interpretations, source }) {
  return Boolean(
    isHttpsSource(source) &&
    hasCompleteXamPoem(poem) &&
    hasCompleteXamInterpretation(interpretations)
  );
}

export function isPublishableXamCard(card) {
  return (
    card?.active === true &&
    card?.verified === true &&
    card?.editorial_status === "PUBLISHED" &&
    !String(card?.xam_type || "").startsWith("PREVIEW:") &&
    hasCompleteXamContent(card)
  );
}
