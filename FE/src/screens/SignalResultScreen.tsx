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

import {
  MOOD_CONTEXTS,
  getSignalsByMood,
  type MoodContextKey,
  type MoodKey,
  type SignalData,
} from "../data/demoSignals";

import { getCultureArticleById } from
  "../data/cultureData";
import { Button } from "@/src/components/ui/button";
import { ContentProvenance } from "../components/ContentProvenance";

interface SignalResultScreenProps {
  journalText?: string;
  mood?: MoodKey;
  signal: SignalData;
  isActionDone: boolean;
  onToggleAction: (completed: boolean) => void;
  onGoToCompletion?: () => void;
  isSaved?: boolean;
  onSaveToAccount: () => void;
  onRefreshSignal: () => void;
  onGoToDiary: () => void;
  onChangeContext: (contextKey: MoodContextKey) => void;
  onOpenCultureArticle: (articleId: string) => void;
}

export const SignalResultScreen: React.FC<
  SignalResultScreenProps
> = ({
  journalText = "",
  signal,
  isActionDone,
  onToggleAction,
  onGoToCompletion,
  isSaved = false,
  onSaveToAccount,
  onRefreshSignal,
  onGoToDiary,
  onChangeContext,
  onOpenCultureArticle,
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

  const quotationLabel = signal.metadata.quotationVerified
    ? "Câu trích đã đối chiếu nguồn"
    : signal.metadata.contentKind === "demo"
      ? "Lời biên soạn minh họa"
      : "Câu trích đang chờ đối chiếu";

  const contextKey = signal.contextKey ?? "general";

  const contextLabel =
    MOOD_CONTEXTS.find(
      (context) => context.key === contextKey
    )?.label ?? "Chưa muốn chọn";

  const availableSignals = getSignalsByMood(
    signal.mood
  ).filter(
    (item) => item.contextKey === signal.contextKey
  );

  const canRefresh = availableSignals.length > 1;

  const suggestedReading: Record<
    MoodContextKey,
    {
      articleId: string;
      reason: string;
    }
  > = {
    general: {
      articleId: "dinh-lang-bac-bo",
      reason:
        "Một hướng tìm hiểu không gian sinh hoạt và ký ức cộng đồng.",
    },
    study: {
      articleId: "bai-choi-hoi-an",
      reason:
        "Tìm hiểu cách nghệ thuật dân gian được truyền dạy và tiếp nối.",
    },
    work: {
      articleId: "le-hoi-cau-ngu",
      reason:
        "Khám phá tín ngưỡng gắn với đời sống và nghề nghiệp của cộng đồng ven biển.",
    },
    family: {
      articleId: "dinh-lang-bac-bo",
      reason:
        "Tìm hiểu ký ức cộng đồng và sự kết nối giữa các thế hệ.",
    },
    relationship: {
      articleId: "tien-dung-chu-dong-tu",

      reason:
        "Đọc cách bản thử nghiệm giới thiệu truyện Tiên Dung – Chử Đồng Tử, rồi tự suy ngẫm về sự kết nối. Bài đọc không dùng để dự đoán chuyện tình cảm của bạn.",
    },
  };

  const readingSuggestion = suggestedReading[contextKey];

  const suggestedArticle = getCultureArticleById(
    readingSuggestion.articleId
  );

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

        <section
          aria-labelledby="result-context-title"
          className="mb-6 rounded-card border border-line bg-surface p-5"
        >
          <h2
            id="result-context-title"
            className="font-display text-lg font-semibold text-ink"
          >
            Hoàn cảnh bạn đang chọn
          </h2>

          <p className="mt-2 text-sm leading-relaxed text-muted">
            {contextKey === "general"
              ? "Bạn đang đọc lời gợi mở chung theo tâm trạng."
              : `Lời gợi mở hướng đến ${contextLabel.toLowerCase()}.`}
            {" "}
            Bạn có thể đổi lựa chọn bên dưới.
          </p>

          <fieldset className="mt-4">
            <legend className="sr-only">
              Đổi hoàn cảnh cho lời gợi mở
            </legend>

            <div className="grid gap-3 sm:grid-cols-2">
              {MOOD_CONTEXTS.map((context) => (
                <label
                  key={context.key}
                  className="flex min-h-12 cursor-pointer items-center gap-3 rounded-control border border-line p-3"
                >
                  <input
                    type="radio"
                    name="result-context"
                    value={context.key}
                    checked={contextKey === context.key}
                    onChange={() =>
                      onChangeContext(context.key)
                    }
                    className="h-4 w-4 accent-action"
                  />

                  <span className="text-sm font-semibold text-ink">
                    {context.label}
                  </span>
                </label>
              ))}
            </div>
          </fieldset>

          <p className="mt-3 text-xs leading-relaxed text-muted">
            Đổi hoàn cảnh sẽ mở một kết quả mới và giữ ghi chép
            của lượt này. Nội dung đã lưu trước đó không bị sửa.
          </p>
        </section>

        {journalText.trim() && (
          <details className="group mb-6 rounded-card border border-line bg-surface">
            <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-3 rounded-control p-4 text-sm font-semibold text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent [&::-webkit-details-marker]:hidden">
              <span>Đọc lại ghi chép của bạn trong lượt này</span>

              <ChevronDown
                aria-hidden="true"
                className="h-4 w-4 shrink-0 text-muted transition-transform group-open:rotate-180 motion-reduce:transition-none"
              />
            </summary>

            <div className="px-4 pb-5">
              <p className="whitespace-pre-wrap text-sm sm:text-base text-ink leading-relaxed [overflow-wrap:anywhere]">
                {journalText}
              </p>

              <p className="mt-4 text-sm text-muted leading-relaxed">
                Khi đọc lời chiêm nghiệm bên dưới, bạn có thể tự hỏi:
                điều nào phù hợp với chuyện mình vừa ghi lại?
              </p>

              <p className="mt-3 text-xs text-muted leading-relaxed">
                Lời chiêm nghiệm được chọn theo tâm trạng, chưa được
                tạo từ nội dung ghi chép. Ghi chép không được đưa vào
                liên kết chia sẻ.
              </p>
            </div>
          </details>
        )}

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

            <div className="mt-4 space-y-2">
              <p className="text-sm text-muted">
                {signal.poem.subtext}
              </p>

              <span className="inline-flex rounded-full border border-line bg-canvas px-3 py-1 text-xs font-medium text-muted">
                {quotationLabel}
              </span>
            </div>

            <div className="mt-6 pt-5 border-t border-line">
              <p className="text-base text-ink leading-relaxed">
                {signal.reflection.advice}
              </p>
            </div>

            <div className="flex flex-wrap gap-2 mt-6">
              <Button
                type="button"
                variant="outline"
                disabled={!canRefresh}
                onClick={onRefreshSignal}
              >
                <RotateCw className="w-4 h-4" aria-hidden="true" />
                <span>
                  {canRefresh
                    ? "Đọc lời gợi mở khác"
                    : "Hiện có một lời gợi mở"}
                </span>
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
              <div className="space-y-3">
                <p className="text-sm text-muted leading-relaxed">
                  Lời gợi mở do sản phẩm biên soạn. Bạn có thể giữ lại
                  điều phù hợp với trải nghiệm của mình.
                </p>

                <p className="text-base text-ink leading-relaxed">
                  {signal.reflection.content}
                </p>
              </div>

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

            <div className="px-4 pb-5 sm:px-5">
              <ContentProvenance metadata={signal.metadata} />

              <div className="mt-4 space-y-2 border-t border-line pt-4 text-sm leading-relaxed text-muted">
                <p>{signal.research.region}</p>
                <p>{signal.research.note}</p>
              </div>
            </div>
          </details>
        </div>

        {suggestedArticle && (
          <section
            aria-labelledby="result-reading-title"
            className="mt-8 rounded-card border border-line bg-surface p-5 sm:p-6"
          >
            <h2
              id="result-reading-title"
              className="font-display text-xl font-semibold text-ink"
            >
              Khám phá thêm một câu chuyện văn hóa
            </h2>

            <p className="mt-2 text-sm leading-relaxed text-muted">
              {readingSuggestion.reason}
            </p>

            <h3 className="mt-5 font-display text-lg font-semibold text-ink">
              {suggestedArticle.title}
            </h3>

            <p className="mt-2 text-sm leading-relaxed text-muted">
              {suggestedArticle.excerpt}
            </p>

            <Button
              type="button"
              variant="outline"
              className="mt-5 w-full sm:w-auto"
              onClick={() =>
                onOpenCultureArticle(suggestedArticle.id)
              }
            >
              Đọc bài văn hóa
              <ArrowRight
                className="h-4 w-4"
                aria-hidden="true"
              />
            </Button>
          </section>
        )}

        <p className="mt-6 text-sm text-muted leading-relaxed">
          Nội dung dành cho chiêm nghiệm và khám phá văn hóa,
          không phải dự báo điều sẽ xảy ra với bạn.
        </p>
      </main>
    </div>
  );
};
