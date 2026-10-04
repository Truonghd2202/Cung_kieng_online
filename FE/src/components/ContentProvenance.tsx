import type { ContentMetadata } from "../data/contentMetadata";

interface ContentProvenanceProps {
  metadata: ContentMetadata;
}

function getSafeSourceUrl(value?: string): string | null {
  if (!value) return null;

  try {
    const url = new URL(value);

    return url.protocol === "https:" || url.protocol === "http:"
      ? url.href
      : null;
  } catch {
    return null;
  }
}

function getEditorialLabel(metadata: ContentMetadata): string {
  if (metadata.contentKind === "demo") {
    return "Nội dung mẫu";
  }

  switch (metadata.editorialStatus) {
    case "approved":
      return "Đã duyệt biên tập";
    case "in-review":
      return "Đang duyệt biên tập";
    default:
      return "Bản nháp";
  }
}

export function ContentProvenance({
  metadata,
}: ContentProvenanceProps) {
  return (
    <div className="space-y-4 text-sm leading-relaxed">
      <div className="flex flex-wrap gap-2">
        <span className="rounded-full border border-line bg-canvas px-3 py-1 text-xs font-medium text-ink">
          {getEditorialLabel(metadata)}
        </span>

        <span className="rounded-full border border-line bg-canvas px-3 py-1 text-xs font-medium text-muted">
          {metadata.quotationVerified
            ? "Câu trích đã đối chiếu nguồn"
            : "Câu trích chưa đối chiếu nguồn"}
        </span>
      </div>

      <p className="text-muted">
        Trạng thái đối chiếu áp dụng cho câu trích.
        Trạng thái biên tập áp dụng cho toàn bộ nội dung.
      </p>

      {metadata.sources.length > 0 ? (
        <ul className="space-y-3">
          {metadata.sources.map((source) => {
            const safeUrl = getSafeSourceUrl(source.url);

            return (
              <li
                key={source.id}
                className="rounded-control border border-line p-3"
              >
                {safeUrl ? (
                  <a
                    href={safeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-accent underline underline-offset-4 break-words focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                  >
                    {source.title}
                    <span className="sr-only">
                      {" "}
                      (mở trong tab mới)
                    </span>
                  </a>
                ) : (
                  <p className="font-semibold text-ink">
                    {source.title}
                  </p>
                )}

                {source.authorOrOrganization && (
                  <p className="mt-1 text-muted">
                    {source.authorOrOrganization}
                  </p>
                )}

                {source.bibliographicReference && (
                  <p className="mt-1 text-muted">
                    {source.bibliographicReference}
                  </p>
                )}

                {source.locator && (
                  <p className="mt-1 text-muted">
                    Vị trí đối chiếu: {source.locator}
                  </p>
                )}

                {source.accessedOn && (
                  <p className="mt-1 text-muted">
                    Ngày truy cập: {source.accessedOn}
                  </p>
                )}

                {source.url && !safeUrl && (
                  <p className="mt-1 text-muted">
                    Liên kết nguồn chưa hợp lệ.
                  </p>
                )}
              </li>
            );
          })}
        </ul>
      ) : (
        <p className="text-muted">
          Chưa bổ sung tài liệu nguồn cho nội dung này.
        </p>
      )}

      {metadata.editorialStatus === "approved" &&
        metadata.reviewedBy && (
          <p className="text-muted">
            Người duyệt: {metadata.reviewedBy}
            {metadata.reviewedOn
              ? ` • Ngày duyệt: ${metadata.reviewedOn}`
              : ""}
          </p>
        )}

      {metadata.editorialNote && (
        <p className="border-t border-line pt-3 text-muted">
          {metadata.editorialNote}
        </p>
      )}
    </div>
  );
}
