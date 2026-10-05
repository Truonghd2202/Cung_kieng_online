import type { ContentMetadata } from "./contentMetadata";

function isRealDate(value?: string): boolean {
  if (!value || !/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    return false;
  }

  const [year, month, day] = value.split("-").map(Number);

  if (year < 1900 || month < 1 || month > 12 || day < 1) {
    return false;
  }

  const date = new Date(year, month - 1, day);

  return (
    date.getFullYear() === year &&
    date.getMonth() + 1 === month &&
    date.getDate() === day
  );
}

function isSafeUrl(value: string): boolean {
  try {
    const url = new URL(value);

    return (
      (url.protocol === "https:" ||
        url.protocol === "http:") &&
      !url.username &&
      !url.password
    );
  } catch {
    return false;
  }
}

export function validateReadingMetadata(
  id: string,
  metadata: ContentMetadata
): string[] {
  const errors: string[] = [];
  const sourceIds = new Set<string>();

  for (const source of metadata.sources) {
    if (!source.id.trim() || sourceIds.has(source.id)) {
      errors.push(`${id}: ID nguồn trống hoặc trùng.`);
    }

    sourceIds.add(source.id);

    if (!source.title.trim()) {
      errors.push(`${id}: nguồn thiếu tiêu đề.`);
    }

    if (source.url && !isSafeUrl(source.url)) {
      errors.push(`${id}: URL nguồn không hợp lệ.`);
    }

    if (
      source.accessedOn &&
      !isRealDate(source.accessedOn)
    ) {
      errors.push(`${id}: ngày truy cập nguồn không hợp lệ.`);
    }
  }

  if (metadata.editorialStatus === "approved") {
    if (metadata.contentKind !== "editorial") {
      errors.push(
        `${id}: nội dung demo không được đánh dấu đã duyệt.`
      );
    }

    if (!metadata.reviewedBy?.trim()) {
      errors.push(`${id}: thiếu người duyệt.`);
    }

    if (!isRealDate(metadata.reviewedOn)) {
      errors.push(`${id}: thiếu hoặc sai ngày duyệt.`);
    }

    const hasTraceableSource = metadata.sources.some(
      (source) =>
        Boolean(
          source.url?.trim() ||
          source.bibliographicReference?.trim()
        )
    );

    if (!hasTraceableSource) {
      errors.push(
        `${id}: bài đã duyệt cần nguồn có URL hoặc thông tin xuất bản.`
      );
    }
  }

  if (
    metadata.quotationVerified &&
    !metadata.sources.some((source) => source.locator?.trim())
  ) {
    errors.push(
      `${id}: câu trích đã đối chiếu cần vị trí nguồn cụ thể.`
    );
  }

  return errors;
}
