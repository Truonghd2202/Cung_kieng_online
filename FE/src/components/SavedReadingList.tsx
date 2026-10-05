import { useState } from "react";
import {
  setReadingBookmark,
  useReadingBookmarks,
} from "../hooks/useReadingBookmarks";
import { Button } from "./ui/button";

interface SavedReadingListProps {
  email?: string;
}

export function SavedReadingList({
  email,
}: SavedReadingListProps) {
  const items = useReadingBookmarks(email);
  const [error, setError] = useState("");

  return (
    <section
      aria-label="Bài đã đánh dấu"
      className="mb-8 rounded-card border border-line bg-surface p-5 sm:p-6"
    >
      <h2 className="font-display text-xl font-bold text-ink">
        Bài đã đánh dấu
      </h2>

      <p className="mt-2 text-sm leading-relaxed text-muted">
        Mở lại bài văn hóa và hướng dẫn nghi lễ bạn đã đánh dấu.
        Dữ liệu chỉ lưu trên trình duyệt này.
      </p>

      {items.length === 0 ? (
        <p className="mt-4 text-sm text-muted">
          Chưa có bài được đánh dấu. Khi đọc bài, chọn
          “Đánh dấu bài” hoặc “Đánh dấu hướng dẫn”.
        </p>
      ) : (
        <ul className="mt-4 divide-y divide-line">
          {items.map((item) => {
            const href =
              item.kind === "culture"
                ? `/culture-detail?articleId=${encodeURIComponent(item.id)}`
                : `/ritual-detail?ritualId=${encodeURIComponent(item.id)}`;

            return (
              <li
                key={`${item.kind}:${item.id}`}
                className="flex flex-col gap-3 py-4 sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="min-w-0">
                  <p className="mb-1 text-xs text-muted">
                    {item.kind === "culture"
                      ? "Văn hóa"
                      : "Nghi lễ"}
                  </p>

                  <a
                    href={href}
                    className="font-semibold text-ink underline-offset-4 hover:underline focus-visible:underline"
                  >
                    {item.title}
                  </a>
                </div>

                <Button
                  type="button"
                  size="sm"
                  variant="outline"
                  className="shrink-0 self-start"
                  aria-label={`Bỏ đánh dấu: ${item.title}`}
                  onClick={() => {
                    setError("");

                    const succeeded = setReadingBookmark(
                      item.kind,
                      item.id,
                      false,
                      email
                    );

                    if (!succeeded) {
                      setError(
                        "Chưa bỏ được dấu lưu. Bạn hãy thử lại."
                      );
                    }
                  }}
                >
                  Bỏ đánh dấu
                </Button>
              </li>
            );
          })}
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
