import React from "react";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  ChevronDown,
  Flower2,
  Waves,
  HelpCircle,
  Wind,
  Heart,
  Moon,
  Sparkles,
  PenLine,
} from "lucide-react";

import { MoodKey, MOODS_LIST } from "../data/demoSignals";
import { Button } from "@/src/components/ui/button";
import { Textarea } from "@/src/components/ui/textarea";

interface MoodCheckInScreenProps {
  selectedMood: MoodKey;
  onSelectMood: (mood: MoodKey) => void;
  journalText: string;
  onChangeJournal: (text: string) => void;
  onBackToToday: () => void;
  onSubmit: () => void;
}

const getMoodIcon = (iconType: string) => {
  const className = "w-5 h-5";

  switch (iconType) {
    case "lotus":
      return <Flower2 className={className} />;
    case "waves":
      return <Waves className={className} />;
    case "question":
      return <HelpCircle className={className} />;
    case "wind":
      return <Wind className={className} />;
    case "heart":
      return <Heart className={className} />;
    case "moon":
      return <Moon className={className} />;
    default:
      return <Sparkles className={className} />;
  }
};

const MOOD_SHORT_DESCRIPTIONS: Record<
  MoodKey,
  string
> = {
  "An yên": "Bình tĩnh, thấy ổn",
  "Chênh vênh": "Thấy mất cân bằng",
  "Băn khoăn": "Có điều chưa rõ",
  "Nôn nóng": "Muốn mọi việc nhanh hơn",
  "Biết ơn": "Trân trọng điều đang có",
  "Cần điểm tựa": "Muốn được lắng nghe",
};

export const MoodCheckInScreen: React.FC<
  MoodCheckInScreenProps
> = ({
  selectedMood,
  onSelectMood,
  journalText,
  onChangeJournal,
  onBackToToday,
  onSubmit,
}) => {
  return (
    <div className="screen-shell">
      <main className="page-container max-w-3xl pb-40 sm:pb-12">
        <header className="mb-5 sm:mb-9">
          <div className="flex items-center gap-2 text-sm text-accent mb-3">
            <Flower2 className="w-4 h-4" aria-hidden="true" />
            <span>Một khoảng nghỉ cho bạn</span>
          </div>

          <h1 className="page-title mb-3">
            Hôm nay bạn cảm thấy thế nào?
          </h1>

          <p className="text-base text-muted leading-relaxed max-w-xl">
            Chọn cảm xúc gần nhất với bạn.
            Không cần phải thấy ổn mới bắt đầu.
          </p>
        </header>

        <section aria-labelledby="mood-selection-title">
          <h2
            id="mood-selection-title"
            className="text-sm font-semibold text-ink mb-3"
          >
            Cảm xúc của bạn lúc này
          </h2>

          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            {MOODS_LIST.map((mood) => {
              const isSelected = selectedMood === mood.key;

              return (
                <button
                  key={mood.key}
                  type="button"
                  aria-pressed={isSelected}
                  onClick={() => onSelectMood(mood.key)}
                  className={[
                    "min-h-28 rounded-xl border p-3",
                    "text-left transition-colors duration-200",
                    "sm:min-h-36 sm:p-5",
                    "focus-visible:outline-none",
                    "focus-visible:ring-2 focus-visible:ring-accent",
                    "focus-visible:ring-offset-2",
                    "focus-visible:ring-offset-canvas",
                    isSelected
                      ? "border-accent bg-accent-soft"
                      : "border-line bg-surface hover:border-accent",
                  ].join(" ")}
                >
                  <div className="mb-2 flex items-center justify-between gap-2">
                    <span
                      aria-hidden="true"
                      className={[
                        "inline-flex h-8 w-8 items-center",
                        "justify-center rounded-lg",
                        isSelected
                          ? "bg-action text-on-action"
                          : "bg-surface-soft text-accent",
                      ].join(" ")}
                    >
                      {getMoodIcon(mood.iconType)}
                    </span>

                    <span
                      aria-hidden="true"
                      className={[
                        "inline-flex h-5 w-5 shrink-0",
                        "items-center justify-center rounded-full",
                        isSelected
                          ? "bg-action text-on-action"
                          : "border border-line",
                      ].join(" ")}
                    >
                      {isSelected && (
                        <Check className="h-3 w-3" />
                      )}
                    </span>
                  </div>

                  <span className="mb-1 block font-display text-base font-semibold leading-snug text-ink sm:text-lg">
                    {mood.name}
                  </span>

                  <span className="block text-sm leading-snug text-muted">
                    {MOOD_SHORT_DESCRIPTIONS[mood.key]}
                  </span>
                </button>
              );
            })}
          </div>
        </section>

        <details className="group mt-6 rounded-xl border border-line bg-surface">
          <summary className="flex min-h-14 cursor-pointer list-none items-center gap-3 rounded-xl p-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent [&::-webkit-details-marker]:hidden">
            <PenLine
              className="w-5 h-5 text-accent shrink-0"
              aria-hidden="true"
            />

            <span className="flex-1">
              <span className="block text-sm font-semibold text-ink">
                Viết thêm vài dòng
              </span>
              <span className="block text-sm text-muted mt-0.5">
                {journalText.trim()
                  ? "Bạn đã có ghi chép trong lượt này"
                  : "Tùy chọn — bạn có thể bỏ qua"}
              </span>
            </span>

            <ChevronDown
              className="w-4 h-4 text-muted transition-transform group-open:rotate-180"
              aria-hidden="true"
            />
          </summary>

          <div className="px-4 pb-4">
            <label
              htmlFor="mood-journal"
              className="block text-sm font-medium text-ink mb-2"
            >
              Có điều gì bạn muốn ghi lại hôm nay?
            </label>

            <Textarea
              id="mood-journal"
              value={journalText}
              onChange={(event) =>
                onChangeJournal(event.target.value)
              }
              rows={4}
              maxLength={2000}
              placeholder="Một chuyện vừa xảy ra, một điều đang nghĩ đến..."
              aria-describedby="mood-journal-note"
              className="resize-y"
            />

            <p
              id="mood-journal-note"
              className="mt-3 text-sm text-muted leading-relaxed"
            >
              Đây là ghi chép của bạn, chưa được lưu. Bản demo chọn lời
              chiêm nghiệm theo tâm trạng bạn chọn, chưa phân tích đoạn
              ghi chép này. Bạn có thể lưu cả hai ở bước sau.
            </p>

            <p className="mt-2 text-xs text-muted text-right">
              {journalText.length}/2000 ký tự
            </p>
          </div>
        </details>

        <div
          className={[
            "fixed inset-x-0 bottom-0 z-30",
            "border-t border-line bg-canvas",
            "px-4 pt-3",
            "pb-[calc(0.75rem+env(safe-area-inset-bottom))]",
            "sm:static sm:mt-8 sm:border-0",
            "sm:bg-transparent sm:p-0",
          ].join(" ")}
        >
          <div className="mx-auto max-w-3xl">
            <p className="text-sm text-muted mb-2">
              Đang chọn:{" "}
              <strong className="font-semibold text-accent">
                {selectedMood}
              </strong>
            </p>

            <div className="flex items-center gap-3 sm:justify-between">
              <Button
                type="button"
                variant="outline"
                onClick={onBackToToday}
                className="shrink-0"
              >
                <ArrowLeft className="w-4 h-4" aria-hidden="true" />
                <span>Quay lại</span>
              </Button>

              <Button
                type="button"
                onClick={onSubmit}
                aria-label="Nhận lời chiêm nghiệm"
                className="min-h-11 flex-1 sm:flex-none sm:min-w-60"
              >
                <span className="sm:hidden" aria-hidden="true">
                  Nhận lời gợi ý
                </span>

                <span className="hidden sm:inline" aria-hidden="true">
                  Nhận lời chiêm nghiệm
                </span>

                <ArrowRight
                  className="h-4 w-4 shrink-0"
                  aria-hidden="true"
                />
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
