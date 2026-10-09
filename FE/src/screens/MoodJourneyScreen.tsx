import React from "react";
import {
  ArrowLeft,
  ArrowRight,
  Bookmark,
  Calendar,
  Flower2,
  Heart,
  ScrollText,
  Sparkles,
} from "lucide-react";

import type { SavedSignalItem } from "./AccountScreen";
import "../styles/MoodJourneyScreen.css";

interface MoodJourneyScreenProps {
  savedSignals: SavedSignalItem[];
  onBack: () => void;
  onGoToMood: () => void;
  onGoToSignalResult: (entryId: string) => void;
}

const parseSavedDate = (value: string): number => {
  const match = value.trim().match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);

  if (!match) return Number.NaN;

  const day = Number(match[1]);
  const month = Number(match[2]);
  const year = Number(match[3]);

  if (year < 1 || month < 1 || month > 12 || day < 1 || day > 31) {
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

export const MoodJourneyScreen: React.FC<MoodJourneyScreenProps> = ({
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

  const monthStart = new Date(today.getFullYear(), today.getMonth(), 1);

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
        sortTimestamp: hasCreatedAt ? item.createdAt! : timestamp,
      };
    })
    .sort((a, b) => {
      const firstValid = Number.isFinite(a.sortTimestamp);
      const secondValid = Number.isFinite(b.sortTimestamp);

      if (!firstValid && !secondValid) return a.index - b.index;
      if (!firstValid) return 1;
      if (!secondValid) return -1;

      return b.sortTimestamp - a.sortTimestamp || a.index - b.index;
    });

  const recentCount = entries.filter(
    ({ timestamp }) =>
      timestamp >= sevenDaysAgo.getTime() && timestamp < tomorrow.getTime()
  ).length;

  const monthCount = entries.filter(
    ({ timestamp }) =>
      timestamp >= monthStart.getTime() && timestamp < tomorrow.getTime()
  ).length;

  const recentSavedDaysCount = new Set(
    entries
      .filter(
        ({ timestamp }) =>
          timestamp >= sevenDaysAgo.getTime() && timestamp < tomorrow.getTime()
      )
      .map(({ timestamp }) => timestamp)
  ).size;

  const statistics = [
    {
      label: "Tổng bản ghi đã lưu",
      count: savedSignals.length,
      icon: ScrollText,
      unit: "lời gợi mở",
    },
    {
      label: "Bản ghi trong 7 ngày",
      count: recentCount,
      icon: Sparkles,
      unit: "lượt gần đây",
    },
    {
      label: "Ngày lưu trong 7 ngày",
      count: recentSavedDaysCount,
      icon: Calendar,
      unit: "ngày an yên",
    },
    {
      label: "Bản ghi tháng này",
      count: monthCount,
      icon: Flower2,
      unit: "lượt trong tháng",
    },
  ];

  return (
    <div className="screen-shell relative overflow-hidden">
      {/* Vầng sáng nền mang sắc ấm mỹ học truyền thống */}
      <div
        className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 w-[42rem] sm:w-[54rem] h-[26rem] rounded-full bg-gradient-to-b from-accent/10 via-gold/5 to-transparent blur-3xl"
        aria-hidden="true"
      />

      <main className="page-container max-w-4xl relative z-10 py-6 sm:py-10">
        {/* Nút quay lại kiểu thẻ ngọc */}
        <button
          type="button"
          onClick={onBack}
          className="journey-back-btn group"
          title="Quay lại Góc của tôi"
        >
          <ArrowLeft className="w-4 h-4 text-accent transition-transform group-hover:-translate-x-1" />
          <span>Quay lại Góc của tôi</span>
        </button>

        {/* ========================================================= */}
        {/* 1. HEADER KÝ ỨC TÂM AN & TRIỆN SON "KÝ" (記)              */}
        {/* ========================================================= */}
        <header className="mb-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-accent/8 border border-accent/20 text-accent font-medium text-xs sm:text-sm tracking-wide shadow-xs backdrop-blur-xs mb-3">
            <Bookmark className="w-4 h-4 text-accent" aria-hidden="true" />
            <span>Sổ tay tâm an · Lưu giữ chiêm nghiệm</span>
          </div>

          <h1
            tabIndex={-1}
            className="journey-page-title font-display text-3xl sm:text-4xl lg:text-5xl font-semibold text-ink leading-tight tracking-tight mb-3 outline-none focus:outline-none focus-visible:outline-none focus:ring-0 border-0"
          >
            <span className="journey-seal-badge" title="Dấu triện Ký (Ghi nhớ tâm sự)">
              記
            </span>
            <span>Nhìn lại hành trình chiêm nghiệm</span>
          </h1>

          <p className="text-base sm:text-lg text-muted leading-relaxed max-w-2xl">
            Tập hợp những lời gợi mở và dòng suy tư bạn đã trân quý lưu giữ,
            ghi dấu những khoảnh khắc dừng lại để vỗ về tâm hồn.
          </p>

          {/* Dải phân cách hoa văn cổ phong */}
          <div className="flex items-center gap-3 my-4" aria-hidden="true">
            <div className="h-px w-14 bg-gradient-to-r from-transparent to-accent/40" />
            <div className="w-1.5 h-1.5 rotate-45 bg-accent/70" />
            <div className="h-px w-28 bg-accent/30" />
            <div className="w-1.5 h-1.5 rotate-45 bg-accent/70" />
            <div className="h-px w-14 bg-gradient-to-l from-transparent to-accent/40" />
          </div>
        </header>

        {entries.length === 0 ? (
          /* ========================================================= */
          /* 2. TRẠNG THÁI RỖNG (EMPTY STATE 10/10)                    */
          /* ========================================================= */
          <section className="journey-empty-card">
            <div className="journey-empty-icon-wrap">
              <Flower2 className="w-8 h-8" aria-hidden="true" />
            </div>

            <h2 className="font-display text-2xl sm:text-3xl font-semibold text-ink mb-3">
              Trang sổ tay này còn đang chờ bạn
            </h2>

            <p className="text-base text-muted leading-relaxed max-w-md mx-auto mb-6">
              Bạn chưa lưu lời chiêm nghiệm nào. Hãy bắt đầu từ việc chọn tâm
              trạng hôm nay, đón nhận lời gợi mở và bấm lưu lại ở màn kết quả.
            </p>

            <button
              type="button"
              onClick={onGoToMood}
              className="journey-primary-btn group"
            >
              <span className="journey-btn-sheen" />
              <Sparkles className="w-4 h-4 text-amber-200" />
              <span>Khởi đầu với tâm trạng hôm nay</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
          </section>
        ) : (
          <>
            {/* ========================================================= */}
            {/* 3. BỐN PHIẾN THẠCH NGỌC THỐNG KÊ (JOURNEY STATS)          */}
            {/* ========================================================= */}
            <dl className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 mb-10">
              {statistics.map(({ label, count, icon: Icon, unit }) => (
                <div key={label} className="journey-stat-card">
                  <div className="flex items-center justify-between">
                    <div className="journey-stat-icon-box">
                      <Icon className="w-4 h-4" aria-hidden="true" />
                    </div>
                    <span className="text-[11px] font-medium text-muted bg-surface-soft px-2 py-0.5 rounded-md border border-line/50">
                      {unit}
                    </span>
                  </div>

                  <div>
                    <dd className="journey-stat-number">{count}</dd>
                    <dt className="journey-stat-label">{label}</dt>
                  </div>
                </div>
              ))}
            </dl>

            {/* ========================================================= */}
            {/* 4. DÒNG THỜI GIAN KÝ ỨC (TIMELINE ENTRIES)                */}
            {/* ========================================================= */}
            <section aria-labelledby="saved-timeline-title">
              <div className="flex items-center justify-between gap-4 mb-6">
                <h2
                  id="saved-timeline-title"
                  className="font-display text-xl sm:text-2xl font-semibold text-ink tracking-tight flex items-center gap-2"
                >
                  <ScrollText className="w-5 h-5 text-accent" />
                  <span>Những trang nhật ký chiêm nghiệm</span>
                </h2>
                <span className="text-xs text-muted">
                  Hiển thị theo thứ tự gần đây nhất
                </span>
              </div>

              <div className="journey-timeline">
                {entries.map(({ item }) => (
                  <div key={item.id} className="journey-timeline-item">
                    <div className="journey-timeline-dot" aria-hidden="true" />

                    <article className="journey-entry-card group">
                      <div className="journey-card-golden-rim" />
                      <CornerOrnament className="journey-card-corner journey-card-corner--tl" />
                      <CornerOrnament className="journey-card-corner journey-card-corner--br" />

                      {/* Header thẻ bài: Nhãn tâm trạng + Ngày lưu */}
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                        <div className="flex items-center gap-2">
                          <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-accent bg-accent/8 px-2.5 py-1 rounded-full border border-accent/15">
                            <Flower2 className="w-3.5 h-3.5" />
                            <span>Tâm trạng: {item.mood}</span>
                          </span>

                          {item.actionTitle && (
                            <span className="text-[11px] text-muted bg-surface-soft px-2 py-0.5 rounded-md hidden sm:inline-block">
                              Việc nhỏ: {item.actionTitle}
                            </span>
                          )}
                        </div>

                        <span className="text-xs font-medium text-muted flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5 text-accent/80" />
                          <span>{item.date}</span>
                        </span>
                      </div>

                      {/* Hai câu gợi mở đã lưu */}
                      <blockquote className="journey-entry-poem">
                        <p className="m-0">{item.poemLine1}</p>
                        <p className="m-0 mt-1">{item.poemLine2}</p>
                      </blockquote>

                      {/* Ghi chép tâm sự của người dùng nếu có */}
                      {item.journal?.trim() && (
                        <div className="journey-entry-journal">
                          <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-accent mb-1.5 not-italic">
                            <Heart className="w-3 h-3" />
                            <span>Dòng tâm sự gửi lại:</span>
                          </div>
                          <p className="m-0 [overflow-wrap:anywhere]">
                            “{item.journal}”
                          </p>
                        </div>
                      )}

                      {/* Nút mở lại chiêm nghiệm chi tiết */}
                      <button
                        type="button"
                        onClick={() => onGoToSignalResult(item.id)}
                        className="journey-view-btn group"
                        title="Mở lại toàn bộ bài chiêm nghiệm này"
                      >
                        <span>Mở lại lời gợi mở</span>
                        <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                      </button>
                    </article>
                  </div>
                ))}
              </div>
            </section>
          </>
        )}
      </main>
    </div>
  );
};

/** Hoa văn góc cổ phong đồng bộ toàn hệ thống */
const CornerOrnament: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M4 20V8a4 4 0 0 1 4-4h12" />
    <circle cx="8" cy="8" r="1.5" fill="currentColor" />
  </svg>
);
