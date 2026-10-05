import { useState } from "react";
import { Button } from "./ui/button";
import {
  deleteTraditionalXam,
  isSafeSourceUrl,
  useSavedTraditionalXam,
} from "../data/savedTraditionalXam";

interface SavedTraditionalXamListProps {
  email?: string;
}

export function SavedTraditionalXamList({
  email,
}: SavedTraditionalXamListProps) {
  const { items, readError } =
    useSavedTraditionalXam(email);

  const [error, setError] = useState("");

  return (
    <section
      aria-labelledby="saved-traditional-xam-title"
      className="mb-8 rounded-card border border-line bg-surface p-5 sm:p-6"
    >
      <h2
        id="saved-traditional-xam-title"
        className="font-display text-xl font-semibold text-ink"
      >
        Thẻ xăm truyền thống đã lưu
      </h2>

      <p className="mt-2 text-sm leading-relaxed text-muted">
        Nguyên văn, bản dịch và lời gợi mở được giữ
        theo phiên bản tại thời điểm lưu.
        Dữ liệu chỉ nằm trên trình duyệt này.
      </p>

      {readError ? (
        <p role="alert" className="mt-4 text-sm text-danger">
          Chưa đọc được kho thẻ. Dữ liệu gốc chưa bị thay đổi.
        </p>
      ) : items.length === 0 ? (
        <p className="mt-4 text-sm text-muted">
          Chưa có thẻ truyền thống đã lưu.
        </p>
      ) : (
        <ul className="mt-5 space-y-4">
          {items.map((item) => (
            <li
              key={item.id}
              className="rounded-panel border border-line p-4"
            >
              <h3 className="font-semibold text-ink">
                {item.collectionTitle} — Thẻ số{" "}
                {item.stickNumber}
              </h3>

              <p className="mt-2 text-sm text-muted">
                {item.topic} · Lưu ngày{" "}
                {new Date(item.savedAt).toLocaleDateString(
                  "vi-VN"
                )}
              </p>

              <details className="mt-3">
                <summary className="min-h-11 cursor-pointer py-3 font-semibold text-accent">
                  Đọc lại thẻ đã lưu
                </summary>

                <div className="space-y-5 py-3">
                  <p className="text-sm text-muted">
                    Bản tư liệu: {item.editionLabel}
                  </p>

                  <section>
                    <h4 className="mb-2 font-semibold text-ink">
                      Nguyên văn
                    </h4>
                    <div
                      lang="zh-Hant"
                      className="space-y-2 text-xl text-ink"
                    >
                      {item.originalLines.map((line, index) => (
                        <p key={index}>{line}</p>
                      ))}
                    </div>
                  </section>

                  <section>
                    <h4 className="mb-2 font-semibold text-ink">
                      Bản dịch
                    </h4>
                    <div className="space-y-2 text-ink">
                      {item.translationLines.map(
                        (line, index) => (
                          <p key={index}>{line}</p>
                        )
                      )}
                    </div>
                    <p className="mt-3 text-sm text-muted">
                      {item.translationAttribution}
                    </p>
                  </section>

                  {item.culturalContext && (
                    <section>
                      <h4 className="mb-2 font-semibold text-ink">
                        {item.culturalContext.title}
                      </h4>

                      <p className="whitespace-pre-line leading-relaxed text-ink">
                        {item.culturalContext.description}
                      </p>

                      <p className="mt-3 text-xs leading-relaxed text-muted">
                        Vị trí đối chiếu: {item.culturalContext.sourceLocator}
                      </p>

                      <p className="mt-2 text-xs text-muted">
                        Bối cảnh được giữ tại thời điểm lưu thẻ.
                      </p>
                    </section>
                  )}

                  <section>
                    <h4 className="mb-2 font-semibold text-ink">
                      Lời gợi mở đã lưu
                    </h4>
                    <p className="leading-relaxed text-ink">
                      {item.reflection}
                    </p>
                  </section>

                  {(
                    (item.sourceReferences?.length ?? 0) > 0 ||
                    item.sourceTitles.length > 0
                  ) && (
                    <section>
                      <h4 className="mb-2 font-semibold text-ink">
                        Tài liệu nguồn đã lưu
                      </h4>

                      <ul className="list-disc space-y-3 pl-5 text-sm text-muted">
                        {item.sourceReferences?.length ? (
                          item.sourceReferences.map((source, index) => (
                            <li key={index}>
                              {isSafeSourceUrl(source.url) ? (
                                <a
                                  href={source.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="font-semibold text-accent underline underline-offset-4"
                                >
                                  {source.title}
                                  <span className="sr-only"> — mở tab mới</span>
                                </a>
                              ) : (
                                <span>{source.title}</span>
                              )}

                              {source.locator && (
                                <p className="mt-1 leading-relaxed">
                                  Vị trí đối chiếu: {source.locator}
                                </p>
                              )}

                              {source.bibliographicReference && (
                                <p className="mt-1 leading-relaxed">
                                  {source.bibliographicReference}
                                </p>
                              )}
                            </li>
                          ))
                        ) : (
                          item.sourceTitles.map((title, index) => (
                            <li key={index}>{title}</li>
                          ))
                        )}
                      </ul>
                    </section>
                  )}
                </div>
              </details>

              <Button
                type="button"
                size="sm"
                variant="outline"
                className="mt-3"
                aria-label={`Xóa thẻ ${item.stickNumber}, chủ đề ${item.topic}`}
                onClick={() => {
                  setError("");

                  if (
                    !email ||
                    !deleteTraditionalXam(email, item.id)
                  ) {
                    setError(
                      "Chưa xóa được thẻ. Bạn hãy thử lại."
                    );
                  }
                }}
              >
                Xóa khỏi danh sách
              </Button>
            </li>
          ))}
        </ul>
      )}

      {error && (
        <p role="alert" className="mt-3 text-sm text-danger">
          {error}
        </p>
      )}
    </section>
  );
}
