function asLines(value) {
  if (Array.isArray(value)) return value;
  if (typeof value === "string") return value.split(/\r?\n/);
  return [];
}

function hasCompleteXamPoem(value) {
  const lines = asLines(value);
  return lines.length === 4 && lines.every((line) => typeof line === "string" && line.trim());
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
    !String(card?.xam_type || "").startsWith("PREVIEW:") &&
    hasCompleteXamContent(card)
  );
}
