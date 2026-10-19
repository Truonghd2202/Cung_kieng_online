import registryData from "../data/verifiedImageRegistry.json";

interface ImageRecord {
  filePath?: string;
  publicPath?: string;
  context?: string;
  description?: string;
  location?: string;
  artist?: string;
  license?: string;
  sourceUrl?: string;

  reviewStatus?: "PENDING" | "APPROVED";
  reviewedBy?: string;
  reviewedAt?: string;
}

function exactImageAddress(value: string): string | null {
  try {
    if (value.startsWith("/") && !value.startsWith("//")) {
      const url = new URL(value, "https://local-image.invalid");

      if (url.origin !== "https://local-image.invalid") {
        return null;
      }

      return url.pathname;
    }

    const url = new URL(value);

    if (
      url.protocol !== "https:" ||
      url.username ||
      url.password
    ) {
      return null;
    }

    // Ảnh ngoài: giữ cả domain và query.
    url.hash = "";
    return url.href;
  } catch {
    return null;
  }
}

function hasSpecificSource(value: string | undefined) {
  if (!value) return false;

  try {
    const url = new URL(value);

    return (
      url.protocol === "https:" &&
      !url.username &&
      !url.password &&
      url.pathname !== "/"
    );
  } catch {
    return false;
  }
}

export function findApprovedImage(
  src: string
): ImageRecord | null {
  const address = exactImageAddress(src);
  if (!address) return null;

  const records = registryData as ImageRecord[];

  const matches = records.filter((record) => {
    const paths = [record.filePath, record.publicPath];

    return paths.some(
      (path) =>
        typeof path === "string" &&
        exactImageAddress(path) === address
    );
  });

  // Trùng hồ sơ cũng cần được rà lại.
  if (matches.length !== 1) return null;

  const record = matches[0];

  if (
    record.reviewStatus !== "APPROVED" ||
    !record.reviewedBy?.trim() ||
    !record.reviewedAt ||
    Number.isNaN(Date.parse(record.reviewedAt)) ||
    !record.artist?.trim() ||
    !record.license?.trim() ||
    !hasSpecificSource(record.sourceUrl)
  ) {
    return null;
  }

  return record;
}
