import React, { useEffect, useState } from "react";
import {
  ArrowRight,
  Bookmark,
  Check,
  ChevronDown,
  Clock3,
  Flower2,
  RotateCw,
  Share2,
} from "lucide-react";

import type { MoodKey, SignalData } from "../data/demoSignals";
import { Button } from "@/src/components/ui/button";

interface SignalResultScreenProps {
  mood?: MoodKey;
  signal: SignalData;
  isActionDone: boolean;
  onToggleAction: (completed: boolean) => void;
  onGoToCompletion?: () => void;
  isSaved?: boolean;
  onSaveToAccount: () => void;
  onRefreshSignal: () => void;
  onGoToDiary: () => void;
}

export const SignalResultScreen: React.FC<
  SignalResultScreenProps
> = ({
  signal,
  isActionDone,
  onToggleAction,
  onGoToCompletion,
  isSaved = false,
  onSaveToAccount,
  onRefreshSignal,
  onGoToDiary,
}) => {
  const [copyState, setCopyState] = useState<
    "idle" | "copying" | "success" | "error"
  >("idle");

  useEffect(() => {
    setCopyState("idle");
  }, [signal.id]);

  const shareUrl = new URL("/result", window.location.origin);
  shareUrl.searchParams.set("signalId", signal.id);

  const handleCopyLink = async () => {
    setCopyState("copying");

    try {
      if (!navigator.clipboard?.writeText) {
        throw new Error("Clipboard unavailable");
      }

      await navigator.clipboard.writeText(shareUrl.toString());
      setCopyState("success");
    } catch {
      setCopyState("error");
    }
  };

  return (
    <div className="screen-shell">
      <main className="page-container max-w-5xl">
        <header className="mb-6 sm:mb-8">
          <div className="flex items-center gap-2 text-sm text-accent mb-3">
            <Flower2 className="w-4 h-4" aria-hidden="true" />
            <span>Lời chiêm nghiệm hôm nay</span>
          </div>

          <h1 className="page-title mb-3">
            Một lời gợi mở dành cho bạn
          </h1>

          <p className="text-base text-muted leading-relaxed">
            Bạn đang cảm thấy{" "}
            <strong className="font-semibold text-ink">
              {signal.mood.toLowerCase()}
            </strong>
            . Hãy đọc chậm và giữ lại điều phù hợp với mình.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <section
            aria-labelledby="reflection-poem-title"
            className="lg:col-span-7 rounded-2xl border border-line bg-surface p-6 sm:p-8"
          >
            <h2
              id="reflection-poem-title"
              className="text-sm font-semibold text-accent mb-5"
            >
              Dừng lại một chút
            </h2>

            <blockquote className="font-display text-2xl sm:text-3xl font-semibold text-ink leading-relaxed">
              <p>{signal.poem.line1}</p>
              <p>{signal.poem.line2}</p>
            </blockquote>

            <p className="text-sm text-muted mt-4">
              {signal.poem.subtext}
            </p>

            <div className="mt-6 pt-5 border-t border-line">
              <p className="text-base text-ink leading-relaxed">
                {signal.reflection.advice}
              </p>
            </div>

            <div className="flex flex-wrap gap-2 mt-6">
              <Button
                type="button"
                variant="outline"
                onClick={onRefreshSignal}
              >
                <RotateCw className="w-4 h-4" aria-hidden="true" />
                <span>Nhận lời khác</span>
              </Button>

              <Button
                type="button"
                variant="ghost"
                onClick={handleCopyLink}
                disabled={copyState === "copying"}
              >
                <Share2 className="w-4 h-4" aria-hidden="true" />
                <span>
                  {copyState === "copying"
                    ? "Đang sao chép..."
                    : "Sao chép liên kết"}
                </span>
              </Button>
            </div>

            <div aria-live="polite" aria-atomic="true">
              {copyState === "success" && (
                <p className="mt-3 text-sm text-success">
                  Đã sao chép liên kết của lời chiêm nghiệm này.
                </p>
              )}

              {copyState === "error" && (
                <div className="mt-3">
                  <label
                    htmlFor="signal-share-link"
                    className="block text-sm text-muted mb-2"
                  >
                    Chưa sao chép được. Bạn có thể chọn và sao chép
                    liên kết bên dưới:
                  </label>

                  <input
                    id="signal-share-link"
                    type="text"
                    readOnly
                    value={shareUrl.toString()}
                    onFocus={(event) => event.currentTarget.select()}
                    className="w-full rounded-control border border-line bg-canvas px-3 py-2 text-base text-ink"
                  />
                </div>
              )}
            </div>
          </section>

          <section
            aria-labelledby="small-action-title"
            className="lg:col-span-5 rounded-2xl border border-line bg-surface p-6 sm:p-8"
          >
            <div className="flex items-center justify-between gap-3 mb-4">
              <h2
                id="small-action-title"
                className="text-sm font-semibold text-accent"
              >
                Một việc nhỏ bạn có thể làm
              </h2>

              <span className="inline-flex items-center gap-1.5 text-sm text-muted shrink-0">
                <Clock3 className="w-4 h-4" aria-hidden="true" />
                {signal.action.duration}
              </span>
            </div>

            <h3 className="font-display font-semibold text-xl text-ink mb-3">
              {signal.action.title}
            </h3>

            <p className="text-base text-muted leading-relaxed mb-6">
              {signal.action.description}
            </p>

            <Button
              type="button"
              variant={isActionDone ? "secondary" : "default"}
              onClick={() => onToggleAction(!isActionDone)}
              aria-pressed={isActionDone}
              className="w-full"
            >
              <Check className="w-4 h-4" aria-hidden="true" />
              <span>
                {isActionDone ? "Đã thực hiện" : "Tôi đã thực hiện"}
              </span>
            </Button>

            {isActionDone && onGoToCompletion && (
              <Button
                type="button"
                onClick={onGoToCompletion}
                className="w-full mt-3"
              >
                <span>Hoàn tất lượt chiêm nghiệm</span>
                <ArrowRight
                  className="w-4 h-4"
                  aria-hidden="true"
                />
              </Button>
            )}

            {isActionDone && (
              <p role="status" className="mt-3 text-sm text-muted">
                Đã ghi nhận hành động của bạn. Bạn có thể bấm
                “Đã thực hiện” lần nữa để bỏ đánh dấu.
              </p>
            )}

            <div className="mt-6 pt-5 border-t border-line">
              <Button
                type="button"
                variant="outline"
                onClick={isSaved ? onGoToDiary : onSaveToAccount}
                className="w-full"
              >
                <Bookmark
                  className="w-4 h-4"
                  aria-hidden="true"
                />
                <span>
                  {isSaved
                    ? "Đã lưu — xem trong Góc của tôi"
                    : "Lưu vào Góc của tôi"}
                </span>
              </Button>

              <p className="mt-3 text-sm text-muted leading-relaxed">
                Bạn có thể lưu lời chiêm nghiệm mà không cần
                đánh dấu đã thực hiện.
              </p>
            </div>
          </section>
        </div>

        <div className="mt-6 space-y-3">
          <details className="group rounded-xl border border-line bg-surface">
            <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-3 p-4 rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent [&::-webkit-details-marker]:hidden">
              <span className="font-semibold text-sm text-ink">
                Đọc thêm về lời chiêm nghiệm
              </span>
              <ChevronDown
                className="w-4 h-4 text-muted shrink-0 transition-transform group-open:rotate-180"
                aria-hidden="true"
              />
            </summary>

            <div className="px-4 pb-5 sm:px-5">
              <p className="text-base text-ink leading-relaxed">
                {signal.reflection.content}
              </p>

              <figure className="mt-5">
                <img
                  src={signal.artwork.image}
                  alt={signal.artwork.caption}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-48 sm:h-64 object-cover rounded-xl"
                />
                <figcaption className="mt-2 text-sm text-muted">
                  {signal.artwork.caption}
                </figcaption>
              </figure>
            </div>
          </details>

          <details className="group rounded-xl border border-line bg-surface">
            <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-3 p-4 rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent [&::-webkit-details-marker]:hidden">
              <span className="font-semibold text-sm text-ink">
                Nguồn và ghi chú nội dung
              </span>
              <ChevronDown
                className="w-4 h-4 text-muted shrink-0 transition-transform group-open:rotate-180"
                aria-hidden="true"
              />
            </summary>

            <div className="px-4 pb-5 sm:px-5 space-y-2 text-sm leading-relaxed">
              <p className="text-ink">
                <strong>Nguồn: </strong>
                {signal.research.source}
              </p>
              <p className="text-muted">
                {signal.research.region}
              </p>
              <p className="text-muted">
                {signal.research.note}
              </p>
            </div>
          </details>
        </div>

        <p className="mt-6 text-sm text-muted leading-relaxed">
          Nội dung dành cho chiêm nghiệm và khám phá văn hóa,
          không phải dự báo điều sẽ xảy ra với bạn.
        </p>
      </main>
    </div>
  );
};
