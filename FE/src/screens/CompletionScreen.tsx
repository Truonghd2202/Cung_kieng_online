import React from "react";
import {
  ArrowLeft,
  ArrowRight,
  Bookmark,
  Check,
  CheckCircle2,
  Flower2,
} from "lucide-react";

import type { SignalData } from "../data/demoSignals";
import { Button } from "@/src/components/ui/button";

interface CompletionScreenProps {
  signal: SignalData;
  isActionDone: boolean;
  isLoggedIn: boolean;
  isSaved: boolean;
  onGoToHome: () => void;
  onGoToAccount: () => void;
  onViewSignal: () => void;
  onSaveToAccount: () => void;
}

export const CompletionScreen: React.FC<
  CompletionScreenProps
> = ({
  signal,
  isActionDone,
  isLoggedIn,
  isSaved,
  onGoToHome,
  onGoToAccount,
  onViewSignal,
  onSaveToAccount,
}) => {
  return (
    <div className="screen-shell">
      <main className="page-container max-w-3xl">
        <header className="mb-7 sm:mb-9">
          <div
            aria-hidden="true"
            className="w-14 h-14 rounded-full bg-accent-soft text-accent flex items-center justify-center mb-5"
          >
            {isActionDone ? (
              <Check className="w-7 h-7" />
            ) : (
              <Flower2 className="w-7 h-7" />
            )}
          </div>

          <h1 className="page-title mb-3">
            {isActionDone
              ? "Bạn đã dành một chút thời gian cho mình"
              : "Lời chiêm nghiệm của bạn"}
          </h1>

          <p className="text-base text-muted leading-relaxed">
            {isActionDone
              ? "Hành động nhỏ hôm nay đã được đánh dấu hoàn thành. Bạn có thể giữ lại lời chiêm nghiệm hoặc tiếp tục ngày của mình."
              : "Bạn có thể đọc lại lời chiêm nghiệm, thử hành động nhỏ hoặc lưu nội dung để xem sau."}
          </p>
        </header>

        <section
          aria-labelledby="completion-summary-title"
          className="rounded-2xl border border-line bg-surface p-6 sm:p-8"
        >
          <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
            <h2
              id="completion-summary-title"
              className="text-sm font-semibold text-accent"
            >
              Lời chiêm nghiệm trong lượt này
            </h2>

            <span className="text-sm text-muted">
              {signal.mood}
            </span>
          </div>

          <blockquote className="font-display text-xl sm:text-2xl font-semibold text-ink leading-relaxed">
            <p>{signal.poem.line1}</p>
            <p>{signal.poem.line2}</p>
          </blockquote>

          <p className="mt-3 text-sm text-muted">
            {signal.poem.subtext}
          </p>

          <div className="mt-6 pt-5 border-t border-line">
            <div className="flex items-start gap-3">
              {isActionDone ? (
                <CheckCircle2
                  className="w-5 h-5 text-success shrink-0 mt-0.5"
                  aria-hidden="true"
                />
              ) : (
                <Flower2
                  className="w-5 h-5 text-accent shrink-0 mt-0.5"
                  aria-hidden="true"
                />
              )}

              <div>
                <p className="text-sm text-muted mb-1">
                  {isActionDone
                    ? "Hành động đã thực hiện"
                    : "Hành động gợi ý"}
                </p>

                <h3 className="text-base font-semibold text-ink">
                  {signal.action.title}
                </h3>

                <p className="mt-2 text-sm text-muted leading-relaxed">
                  {signal.action.description}
                </p>
              </div>
            </div>
          </div>

          <Button
            type="button"
            variant="ghost"
            onClick={onViewSignal}
            className="mt-4"
          >
            <ArrowLeft
              className="w-4 h-4"
              aria-hidden="true"
            />
            <span>Xem lại nội dung và hành động</span>
          </Button>
        </section>

        <section
          aria-labelledby="completion-save-title"
          className="mt-5 rounded-2xl border border-line bg-surface p-6 sm:p-8"
        >
          <div className="flex items-center gap-2 mb-3">
            {isSaved ? (
              <CheckCircle2
                className="w-5 h-5 text-success"
                aria-hidden="true"
              />
            ) : (
              <Bookmark
                className="w-5 h-5 text-accent"
                aria-hidden="true"
              />
            )}

            <h2
              id="completion-save-title"
              className="font-display text-xl font-semibold text-ink"
            >
              {isSaved
                ? "Đã lưu vào Góc của tôi"
                : "Bạn muốn giữ lại nội dung này?"}
            </h2>
          </div>

          <p className="text-base text-muted leading-relaxed">
            {isSaved
              ? "Bạn có thể mở lại lời chiêm nghiệm và ghi chép đã lưu trong Góc của tôi."
              : isLoggedIn
                ? "Lưu lời chiêm nghiệm cùng ghi chép trong lượt này để xem lại khi cần."
                : "Đăng nhập để lưu lời chiêm nghiệm và ghi chép. Bạn cũng có thể tiếp tục mà không cần lưu."}
          </p>

          <Button
            type="button"
            variant="outline"
            onClick={
              isSaved ? onGoToAccount : onSaveToAccount
            }
            className="mt-5 w-full sm:w-auto"
          >
            <Bookmark
              className="w-4 h-4"
              aria-hidden="true"
            />
            <span>
              {isSaved
                ? "Xem trong Góc của tôi"
                : isLoggedIn
                  ? "Lưu vào Góc của tôi"
                  : "Đăng nhập để lưu"}
            </span>
          </Button>

          <p className="mt-3 text-sm text-muted leading-relaxed">
            Bản thử nghiệm lưu dữ liệu trên trình duyệt này.
            Dữ liệu chưa được đồng bộ sang thiết bị khác.
          </p>
        </section>

        <div className="mt-7">
          <Button
            type="button"
            onClick={onGoToHome}
            className="w-full sm:w-auto"
          >
            <span>Trở về Hôm nay</span>
            <ArrowRight
              className="w-4 h-4"
              aria-hidden="true"
            />
          </Button>
        </div>
      </main>
    </div>
  );
};
