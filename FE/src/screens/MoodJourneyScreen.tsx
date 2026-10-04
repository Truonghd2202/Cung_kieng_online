import React from "react";
import {
  ArrowLeft,
  ArrowRight,
  Bookmark,
  Flower2,
} from "lucide-react";

import { Button } from "@/src/components/ui/button";
import type { SavedSignalItem } from "./AccountScreen";

interface MoodJourneyScreenProps {
  savedSignals: SavedSignalItem[];
  onBack: () => void;
  onGoToMood: () => void;
  onGoToSignalResult: (entryId: string) => void;
}

const parseSavedDate = (value: string): number => {
  const match = value.trim().match(
    /^(\d{1,2})\/(\d{1,2})\/(\d{4})$/
  );

  if (!match) return Number.NaN;

  const day = Number(match[1]);
  const month = Number(match[2]);
  const year = Number(match[3]);

  if (
    year < 1 ||
    month < 1 ||
    month > 12 ||
    day < 1 ||
    day > 31
  ) {
    return Number.NaN;
  }

  const date = new Date(0);
  date.setHours(0, 0, 0, 0);
  date.setFullYear(year, month - 1, day);

  if (
    date.getFullYear() !== year ||
    date.getMonth() !== month - 1 ||
    date.getDate() !== day
  ) {
    return Number.NaN;
  }

  return date.getTime();
};

export const MoodJourneyScreen: React.FC<
  MoodJourneyScreenProps
> = ({
  savedSignals,
  onBack,
  onGoToMood,
  onGoToSignalResult,
}) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  const sevenDaysAgo = new Date(today);
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 6);

  const monthStart = new Date(
    today.getFullYear(),
    today.getMonth(),
    1
  );

  const entries = savedSignals
    .map((item, index) => {
      const timestamp = parseSavedDate(item.date);

      const hasCreatedAt =
        typeof item.createdAt === "number" &&
        Number.isFinite(item.createdAt) &&
        item.createdAt > 0 &&
        Number.isFinite(new Date(item.createdAt).getTime());

      return {
        item,
        index,
        timestamp,
        sortTimestamp: hasCreatedAt
          ? item.createdAt!
          : timestamp,
      };
    })
    .sort((a, b) => {
      const firstValid = Number.isFinite(a.sortTimestamp);
      const secondValid = Number.isFinite(b.sortTimestamp);

      if (!firstValid && !secondValid) return a.index - b.index;
      if (!firstValid) return 1;
      if (!secondValid) return -1;

      return (
        b.sortTimestamp - a.sortTimestamp ||
        a.index - b.index
      );
    });

  const recentCount = entries.filter(
    ({ timestamp }) =>
      timestamp >= sevenDaysAgo.getTime() &&
      timestamp < tomorrow.getTime()
  ).length;

  const monthCount = entries.filter(
    ({ timestamp }) =>
      timestamp >= monthStart.getTime() &&
      timestamp < tomorrow.getTime()
  ).length;

  const recentSavedDaysCount = new Set(
    entries
      .filter(
        ({ timestamp }) =>
          timestamp >= sevenDaysAgo.getTime() &&
          timestamp < tomorrow.getTime()
      )
      .map(({ timestamp }) => timestamp)
  ).size;

  const statistics = [
    ["Tổng bản ghi đã lưu", savedSignals.length],
    ["Bản ghi trong 7 ngày", recentCount],
    ["Ngày có bản ghi trong 7 ngày", recentSavedDaysCount],
    ["Bản ghi tháng này đến hôm nay", monthCount],
  ] as const;

  return (
    <div className="screen-shell">
      <main className="page-container max-w-4xl">
        <Button
          type="button"
          variant="ghost"
          onClick={onBack}
          className="mb-5"
        >
          <ArrowLeft className="w-4 h-4" aria-hidden="true" />
          <span>Góc của tôi</span>
        </Button>

        <header className="mb-7">
          <h1 className="page-title mb-3">
            Nhìn lại lời chiêm nghiệm
          </h1>

          <p className="text-base text-muted leading-relaxed">
            Những lời chiêm nghiệm và ghi chép bạn đã chọn lưu.
            Danh sách này không bao gồm mọi lần check-in.
          </p>
        </header>

        {entries.length === 0 ? (
          <section className="rounded-2xl border border-line bg-surface p-6 sm:p-10">
            <Bookmark
              className="w-7 h-7 text-accent mb-4"
              aria-hidden="true"
            />

            <h2 className="font-display text-2xl font-semibold text-ink mb-3">
              Chưa có lời chiêm nghiệm đã lưu
            </h2>

            <p className="text-base text-muted leading-relaxed mb-6">
              Bắt đầu từ tâm trạng hôm nay. Nếu có lời chiêm
              nghiệm muốn giữ lại, bạn có thể chọn lưu ở màn kết quả.
            </p>

            <Button type="button" onClick={onGoToMood}>
              <span>Chọn tâm trạng hôm nay</span>
              <ArrowRight
                className="w-4 h-4"
                aria-hidden="true"
              />
            </Button>
          </section>
        ) : (
          <>
            <dl className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
              {statistics.map(([label, count]) => (
                <div
                  key={label}
                  className="rounded-xl border border-line bg-surface p-5"
                >
                  <dt className="text-sm text-muted">
                    {label}
                  </dt>
                  <dd className="font-display text-3xl font-semibold text-ink mt-2">
                    {count}
                  </dd>
                </div>
              ))}
            </dl>

            <section aria-labelledby="saved-timeline-title">
              <h2
                id="saved-timeline-title"
                className="font-display text-xl font-semibold text-ink mb-4"
              >
                Nội dung đã lưu
              </h2>

              <div className="space-y-4">
                {entries.map(({ item }) => (
                  <article
                    key={item.id}
                    className="rounded-xl border border-line bg-surface p-5 sm:p-6"
                  >
                    <div className="flex flex-wrap items-center gap-3 text-sm mb-4">
                      <span className="inline-flex items-center gap-1.5 text-accent">
                        <Flower2
                          className="w-4 h-4"
                          aria-hidden="true"
                        />
                        {item.mood}
                      </span>

                      <span className="text-muted">
                        {item.date}
                      </span>
                    </div>

                    <blockquote className="font-display text-lg sm:text-xl text-ink leading-relaxed [overflow-wrap:anywhere]">
                      <p>{item.poemLine1}</p>
                      <p>{item.poemLine2}</p>
                    </blockquote>

                    {item.journal?.trim() && (
                      <details className="mt-4 border-t border-line pt-3">
                        <summary className="min-h-11 cursor-pointer rounded-control py-3 text-sm font-semibold text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent">
                          Đọc ghi chép của bạn
                        </summary>

                        <p className="mt-2 whitespace-pre-wrap text-base text-muted leading-relaxed [overflow-wrap:anywhere]">
                          {item.journal}
                        </p>
                      </details>
                    )}

                    <Button
                      type="button"
                      variant="outline"
                      onClick={() =>
                        onGoToSignalResult(item.id)
                      }
                      className="mt-5"
                    >
                      <span>Xem bản đã lưu</span>
                      <ArrowRight
                        className="w-4 h-4"
                        aria-hidden="true"
                      />
                    </Button>
                  </article>
                ))}
              </div>
            </section>
          </>
        )}
      </main>
    </div>
  );
};
