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
      <div className="flex flex-wrap items-center gap-2">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-gold/40 bg-gold/10 px-3 py-1 text-xs font-semibold text-gold tracking-wide shadow-2xs">
          <span className="w-1.5 h-1.5 rounded-full bg-gold" />
          {getEditorialLabel(metadata)}
        </span>

        <span className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold tracking-wide shadow-2xs ${
          metadata.quotationVerified
            ? "border-success/40 bg-success/10 text-success"
            : "border-line bg-canvas text-muted"
        }`}>
          <span className={`w-1.5 h-1.5 rounded-full ${metadata.quotationVerified ? "bg-success" : "bg-muted"}`} />
          {metadata.quotationVerified
            ? "Câu trích đã đối chiếu nguồn"
            : "Câu trích đang chờ đối chiếu"}
        </span>
      </div>

      <p className="text-xs text-muted">
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
                className="rounded-xl border border-accent/20 bg-surface-soft/60 p-4 shadow-2xs space-y-1.5"
              >
                {safeUrl ? (
                  <a
                    href={safeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-accent hover:text-accent/80 underline underline-offset-4 break-words focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent text-sm sm:text-base inline-block"
                  >
                    📖 {source.title}
                    <span className="sr-only">
                      {" "}
                      (mở trong tab mới)
                    </span>
                  </a>
                ) : (
                  <p className="font-semibold text-ink text-sm sm:text-base">
                    📖 {source.title}
                  </p>
                )}

                {source.authorOrOrganization && (
                  <p className="text-xs sm:text-sm text-ink/90">
                    <strong className="text-muted font-normal">Tác giả / Cơ quan:</strong> {source.authorOrOrganization}
                  </p>
                )}

                {source.bibliographicReference && (
                  <p className="text-xs text-muted">
                    <strong className="font-normal">Xuất bản:</strong> {source.bibliographicReference}
                  </p>
                )}

                {source.locator && (
                  <p className="text-xs text-accent/90 font-medium">
                    📍 Vị trí đối chiếu: {source.locator}
                  </p>
                )}

                {source.accessedOn && (
                  <p className="text-[11px] text-muted">
                    Ngày truy cập hồ sơ: {source.accessedOn}
                  </p>
                )}

                {source.url && !safeUrl && (
                  <p className="mt-1 text-muted text-xs">
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
          <p className="text-xs text-muted border-t border-line/60 pt-3">
            <strong className="text-ink font-medium">Hội đồng thẩm định:</strong> {metadata.reviewedBy}
            {metadata.reviewedOn
              ? ` • Ngày phê duyệt: ${metadata.reviewedOn}`
              : ""}
          </p>
        )}

      {metadata.editorialNote && (
        <p className="border-t border-line/60 pt-3 text-xs text-muted italic">
          {metadata.editorialNote}
        </p>
      )}
    </div>
  );
}
