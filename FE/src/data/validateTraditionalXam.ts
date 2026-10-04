import type { ContentMetadata } from "./contentMetadata";
import type {
  TraditionalXamCollection,
  TraditionalXamStick,
} from "./traditionalXamData";

function validateMetadata(
  label: string,
  metadata: ContentMetadata
): string[] {
  const errors: string[] = [];

  const hasLocatableSource = metadata.sources.some(
    (source) =>
      source.title.trim() &&
      (source.url?.trim() ||
        source.bibliographicReference?.trim()) &&
      source.locator?.trim()
  );

  if (metadata.quotationVerified && !hasLocatableSource) {
    errors.push(
      `${label}: đã đối chiếu nhưng thiếu nguồn có vị trí cụ thể.`
    );
  }

  if (metadata.editorialStatus === "approved") {
    if (metadata.contentKind === "demo") {
      errors.push(`${label}: nội dung mẫu không được ghi đã duyệt.`);
    }

    if (
      !metadata.reviewedBy?.trim() ||
      !metadata.reviewedOn?.trim()
    ) {
      errors.push(`${label}: thiếu người hoặc ngày duyệt.`);
    }

    if (!hasLocatableSource) {
      errors.push(`${label}: thiếu nguồn để duyệt nội dung.`);
    }
  }

  return errors;
}

export function validateTraditionalXam(
  collections: TraditionalXamCollection[],
  sticks: TraditionalXamStick[]
): string[] {
  const errors: string[] = [];
  const collectionIds = new Set<string>();
  const stickIds = new Set<string>();
  const stickNumbers = new Set<string>();

  for (const collection of collections) {
    errors.push(
      ...validateMetadata(
        `Bộ ${collection.id}`,
        collection.metadata
      )
    );

    if (collectionIds.has(collection.id)) {
      errors.push(`Trùng ID bộ xăm: ${collection.id}`);
    }

    collectionIds.add(collection.id);

    if (!collection.editionLabel.trim()) {
      errors.push(`${collection.id}: thiếu tên bản nguồn.`);
    }

    if (
      collection.totalSticks !== undefined &&
      (!Number.isInteger(collection.totalSticks) ||
        collection.totalSticks <= 0)
    ) {
      errors.push(`${collection.id}: tổng số thẻ không hợp lệ.`);
    }
  }

  for (const stick of sticks) {
    const prefix = `Thẻ ${stick.id}`;
    errors.push(
      ...validateMetadata(prefix, stick.metadata)
    );

    const collection = collections.find(
      (item) => item.id === stick.collectionId
    );

    if (stickIds.has(stick.id)) {
      errors.push(`${prefix}: trùng ID.`);
    }
    stickIds.add(stick.id);

    const number = Number(stick.stickNumber);

    if (!Number.isInteger(number) || number <= 0) {
      errors.push(`${prefix}: số thẻ không hợp lệ.`);
    }

    const numberKey = `${stick.collectionId}:${number}`;

    if (stickNumbers.has(numberKey)) {
      errors.push(`${prefix}: trùng số thẻ trong cùng bộ.`);
    }
    stickNumbers.add(numberKey);

    if (!collection) {
      errors.push(`${prefix}: bộ xăm không tồn tại.`);
    } else if (
      collection.totalSticks !== undefined &&
      number > collection.totalSticks
    ) {
      errors.push(`${prefix}: số thẻ vượt tổng số của bộ.`);
    }

    if (
      stick.originalLines.length !== 4 ||
      stick.originalLines.some((line) => !line.trim())
    ) {
      errors.push(`${prefix}: cần đủ 4 dòng nguyên văn.`);
    }

    if (stick.translation) {
      errors.push(
        ...validateMetadata(
          `${prefix} — bản dịch`,
          stick.translation.metadata
        )
      );

      if (
        stick.translation.lines.length !==
          stick.originalLines.length ||
        stick.translation.lines.some((line) => !line.trim())
      ) {
        errors.push(`${prefix}: bản dịch thiếu hoặc lệch số dòng.`);
      }

      if (!stick.translation.attribution.trim()) {
        errors.push(`${prefix}: thiếu thông tin người biên dịch.`);
      }
    }
  }

  return errors;
}
