import React, { useState, useEffect } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Share2,
  Printer,
  Bookmark,
  ShieldCheck,
  AlertTriangle,
  Clock,
  Home,
  Sparkles,
  Flower2,
  Info,
  Flame,
  ChevronDown,
} from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { Badge } from "@/src/components/ui/badge";
import { Card } from "@/src/components/ui/card";
import { RITUAL_GUIDES, getRitualById } from "../data/ritualData";
import { DetailNotFound } from "../components/DetailNotFound";

interface RitualDetailScreenProps {
  ritualId?: string;
  currentUserEmail?: string;
  onBackToRitualList: () => void;
  onSelectRelatedRitual: (id: string) => void;
}

const RitualDetailContent: React.FC<
  RitualDetailScreenProps
> = ({
  ritualId = "chuan-bi-ngay-ram",
  currentUserEmail,
  onBackToRitualList,
  onSelectRelatedRitual,
}) => {
  const ritual = getRitualById(ritualId)!;
  const detail = ritual.detail!;

  const accountId =
    currentUserEmail?.trim().toLowerCase() ||
    "guest";

  const checklistStorageKey =
    `tltl-ritual-checklist-${accountId}-${ritual.id}`;

  const bookmarkStorageKey =
    `tltl-ritual-bookmark-${accountId}-${ritual.id}`;

  const validChecklistIds = new Set(
    detail.checklists.map((item) => item.id)
  );

  const readChecklist = (key: string): string[] => {
    try {
      const raw = localStorage.getItem(key);

      if (!raw) return [];

      const parsed: unknown = JSON.parse(raw);

      if (!Array.isArray(parsed)) return [];

      return parsed.filter(
        (value): value is string =>
          typeof value === "string"
      );
    } catch {
      return [];
    }
  };

  const readBookmark = (key: string): boolean => {
    try {
      return localStorage.getItem(key) === "true";
    } catch {
      return false;
    }
  };

  const [checkedIds, setCheckedIds] =
    useState<string[]>(() =>
      readChecklist(checklistStorageKey)
    );

  const [isBookmarked, setIsBookmarked] =
    useState<boolean>(() =>
      readBookmark(bookmarkStorageKey)
    );

  const [
    showShareNotification,
    setShowShareNotification,
  ] = useState(false);

  const [ritualSaveError, setRitualSaveError] =
    useState("");

  const completedChecklistCount =
    checkedIds.filter(
      (id) => validChecklistIds.has(id)
    ).length;

  // Nạp lại dữ liệu khi đổi nghi lễ hoặc hồ sơ.
  useEffect(() => {
    setCheckedIds(
      readChecklist(checklistStorageKey)
    );

    setIsBookmarked(
      readBookmark(bookmarkStorageKey)
    );

    setShowShareNotification(false);
    setRitualSaveError("");
  }, [
    checklistStorageKey,
    bookmarkStorageKey,
  ]);

  const toggleCheck = (id: string) => {
    if (!validChecklistIds.has(id)) return;

    setRitualSaveError("");

    const currentValidIds = checkedIds.filter(
      (checkedId) =>
        validChecklistIds.has(checkedId)
    );

    const updatedIds = currentValidIds.includes(id)
      ? currentValidIds.filter(
          (checkedId) => checkedId !== id
        )
      : [...currentValidIds, id];

    try {
      localStorage.setItem(
        checklistStorageKey,
        JSON.stringify(updatedIds)
      );
    } catch {
      setRitualSaveError(
        "Chưa lưu được checklist. Các đánh dấu trước đó vẫn được giữ nguyên; hãy thử lại."
      );
      return;
    }

    setCheckedIds(updatedIds);
  };

  const handleToggleBookmark = () => {
    setRitualSaveError("");

    const nextValue = !isBookmarked;

    try {
      localStorage.setItem(
        bookmarkStorageKey,
        String(nextValue)
      );
    } catch {
      setRitualSaveError(
        "Chưa cập nhật được dấu lưu bài. Bạn hãy thử lại."
      );
      return;
    }

    setIsBookmarked(nextValue);
  };

  const handleShare = async () => {
    setShowShareNotification(false);

    try {
      if (!navigator.clipboard?.writeText) {
        throw new Error("Clipboard unavailable");
      }

      await navigator.clipboard.writeText(
        window.location.href
      );

      setShowShareNotification(true);
    } catch {
      window.alert(
        "Chưa sao chép được. Bạn có thể sao chép địa chỉ bài từ thanh địa chỉ."
      );
    }
  };

  const relatedRituals = RITUAL_GUIDES.filter((item) => item.id !== ritual.id).slice(0, 3);

  return (
    <div className="screen-shell">
      <main className="page-container max-w-6xl">
        {ritualSaveError && (
          <p
            role="alert"
            className="mb-5 rounded-xl border border-danger/30 bg-danger-soft px-4 py-3 text-sm leading-relaxed text-danger"
          >
            {ritualSaveError}
          </p>
        )}
        {/* Top Breadcrumb & Tag */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4 text-xs text-muted">
          <div className="flex items-center gap-2 flex-wrap">
            <button
              type="button"
              onClick={onBackToRitualList}
              className="min-h-11 text-left hover:text-accent cursor-pointer transition-colors"
            >
              Khám phá
            </button>
            <span>/</span>
            <button
              type="button"
              onClick={onBackToRitualList}
              className="min-h-11 text-left hover:text-accent cursor-pointer transition-colors"
            >
              Cẩm nang nghi lễ
            </button>
            <span>/</span>
            <span className="text-accent font-semibold">{ritual.title}</span>
          </div>

          <div className="flex items-center gap-1.5 uppercase font-semibold text-xs text-muted">
            <span className="w-2 h-2 rounded-full bg-action inline-block"></span>
            <span>HƯỚNG DẪN NGHI LỄ THÍCH ỨNG</span>
          </div>
        </div>

        {/* Sub-badge & Title Section */}
        <div className="mb-6">
          <Badge
            variant="terracotta"
            className="mb-3 px-3 py-1 text-xs font-semibold uppercase tracking-wider bg-surface text-accent border-line"
          >
            Hướng dẫn tham khảo · Điều chỉnh theo nếp nhà
          </Badge>

          <h1 className="page-title mb-3">
            {detail.fullTitle}
          </h1>

          <p className="text-sm sm:text-base text-ink leading-relaxed max-w-3xl mb-4">
            {detail.subtitle}
          </p>

          <div className="flex flex-wrap gap-2 mb-5">
            <Button
              type="button"
              variant={isBookmarked ? "default" : "outline"}
              aria-pressed={isBookmarked}
              onClick={handleToggleBookmark}
              className="min-h-11 gap-2 text-sm"
            >
              <Bookmark
                aria-hidden="true"
                className={`h-4 w-4 ${isBookmarked ? "fill-current" : ""}`}
              />

              {isBookmarked ? "Đã đánh dấu" : "Đánh dấu hướng dẫn"}
            </Button>

            <Button
              type="button"
              variant="outline"
              onClick={onBackToRitualList}
              className="min-h-11 gap-2 text-sm"
            >
              <ArrowLeft aria-hidden="true" className="h-4 w-4" />
              Về danh sách
            </Button>
          </div>

          {/* 4 Metadata Pills */}
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <span className="px-3 py-1.5 rounded-full bg-surface border border-line text-ink font-medium flex items-center gap-1.5">
              <Check className="w-3.5 h-3.5 text-accent" />
              <span>{detail.steps.length} bước gợi ý</span>
            </span>
            <span className="px-3 py-1.5 rounded-full bg-surface border border-line text-ink font-medium flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-accent" />
              <span>{ritual.timeEstimate}</span>
            </span>
            <span className="px-3 py-1.5 rounded-full bg-surface border border-line text-ink font-medium flex items-center gap-1.5">
              <Home className="w-3.5 h-3.5 text-accent" />
              <span>{ritual.region}</span>
            </span>
            <span className="px-3 py-1.5 rounded-full bg-surface border border-line text-accent font-semibold flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Điểm an yên: Lắng đọng tâm</span>
            </span>
          </div>
        </div>

        {/* Hero Artwork Banner */}
        <div className="mb-6 sm:mb-8 rounded-card overflow-hidden border border-line bg-surface shadow-2xs">
          <div className="relative aspect-[16/9] sm:aspect-[21/9] w-full overflow-hidden bg-surface">
            <img
              src={detail.heroImage}
              alt={detail.fullTitle}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="p-3.5 bg-surface border-t border-line flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-muted">
            <span className="italic">{detail.heroCaption}</span>
            <span className="font-medium text-muted">{detail.heroArtCredit}</span>
          </div>
        </div>

        {/* Two Columns Layout: Left Content, Right Sticky Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
          {/* Main Left Content (8 cols) */}
          <div className="order-2 lg:order-1 lg:col-span-8 space-y-6 sm:space-y-8">
            {/* Ý nghĩa — phần đọc thêm */}
            <details className="group rounded-card border border-line bg-surface p-4 sm:p-5">
              <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-4 rounded-control text-base sm:text-lg font-display font-semibold text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent [&::-webkit-details-marker]:hidden">
                <span>{detail.meaningTitle}</span>

                <ChevronDown
                  aria-hidden="true"
                  className="h-5 w-5 shrink-0 text-muted transition-transform group-open:rotate-180 motion-reduce:transition-none"
                />
              </summary>

              <div className="mt-4 space-y-4 text-sm sm:text-base text-ink leading-relaxed">
                {detail.meaningParagraphs.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}

                <blockquote className="border-l-2 border-accent pl-4 font-display italic text-accent">
                  {detail.meaningQuote}
                </blockquote>
              </div>
            </details>

            {/* Section 2: Danh sách vật phẩm tinh gọn */}
            <section>
              <div className="flex items-center gap-2 mb-3">
                <span className="w-1.5 h-4 rounded-full bg-action"></span>
                <h2 className="section-title text-xl sm:text-2xl">
                  Danh sách vật phẩm tinh gọn có thể điều chỉnh theo gia đình
                </h2>
              </div>

              {/* Advice Alert Banner */}
              <div className="p-4 rounded-panel bg-surface border border-line mb-6 flex items-start gap-3">
                <Info className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                <p className="text-sm text-muted leading-relaxed">
                  {detail.offeringAdvice}
                </p>
              </div>

              {/* 5 Offering Items */}
              <div className="space-y-3">
                {detail.offerings.map((offering) => (
                  <div
                    key={offering.id}
                    className="py-4 border-b border-line flex items-start gap-3.5"
                  >
                    <div className="w-6 h-6 rounded-lg bg-surface text-accent flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-4 h-4 stroke-[2.5]" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 flex-wrap mb-1">
                        <strong className="text-sm sm:text-base text-ink font-bold">
                          {offering.name}
                        </strong>
                        {offering.subname && (
                          <span className="text-xs text-muted italic">
                            {offering.subname}
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-ink leading-relaxed">
                        {offering.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Section 3: Các bước thực hành gợi ý */}
            <section>
              <div className="flex items-center gap-2 mb-6">
                <span className="w-1.5 h-4 rounded-full bg-action"></span>
                <h2 className="section-title text-xl sm:text-2xl">
                  Các bước thực hành gợi ý
                </h2>
              </div>

              <div className="space-y-5">
                {detail.steps.map((st) => (
                  <div
                    key={st.stepNumber}
                    className="py-5 border-b border-line relative flex flex-col justify-between"
                  >
                    <div className="flex items-start justify-between gap-4 mb-3">
                      <div className="flex items-center gap-3">
                        <span className="w-8 h-8 rounded-full bg-action text-white font-bold font-serif text-sm flex items-center justify-center shrink-0">
                          {parseInt(st.stepNumber, 10)}
                        </span>
                        <h3 className="font-display font-bold text-base sm:text-lg text-ink">
                          {st.title}
                        </h3>
                      </div>
                      <span className="font-serif font-bold text-3xl sm:text-4xl text-subtle select-none">
                        {st.stepNumber}
                      </span>
                    </div>

                    <p className="text-sm text-ink leading-relaxed pl-11">
                      {st.desc}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* Section 4: Khác biệt phong tục 3 miền & An toàn khói lửa */}
            <section className="space-y-6">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-1.5 h-4 rounded-full bg-action"></span>
                <h2 className="section-title text-xl sm:text-2xl">
                  Nếp nhà, vùng miền & lưu ý an toàn
                </h2>
              </div>

              {/* Khác biệt vùng miền — phần đọc thêm */}
              <details className="group rounded-card border border-line bg-surface p-4 sm:p-5">
                <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-4 rounded-control text-base font-semibold text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent [&::-webkit-details-marker]:hidden">
                  <span>Tham khảo khác biệt giữa các vùng miền</span>

                  <ChevronDown
                    aria-hidden="true"
                    className="h-5 w-5 shrink-0 text-muted transition-transform group-open:rotate-180 motion-reduce:transition-none"
                  />
                </summary>

                <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                  {detail.regionalDetails.map((item) => (
                    <div
                      key={item.region}
                      className="rounded-panel border border-line p-4"
                    >
                      <h3 className="mb-2 text-sm font-semibold text-accent">
                        {item.region}
                      </h3>

                      <p className="text-sm text-ink leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </details>

              {/* PCCC Fire Safety Box */}
              <div className="p-5 rounded-panel bg-surface border border-line space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-accent">
                  <Flame className="w-4 h-4" />
                  <span>Nguyên tắc vàng an toàn PCCC tại chung cư & nhà phố</span>
                </div>
                <ul className="space-y-2 text-xs sm:text-sm text-ink pl-5 list-disc leading-relaxed">
                  {detail.fireSafetyRules.map((rule, idx) => (
                    <li key={idx}>{rule}</li>
                  ))}
                </ul>
              </div>

              {/* Classical Excerpt Quote */}
              <div className="p-4 rounded-panel bg-surface/70 border border-line text-center">
                <p className="font-display italic font-semibold text-sm sm:text-base text-accent">
                  {detail.closingQuote}
                </p>
              </div>

              {/* Bottom Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-line ">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={onBackToRitualList}
                  className="w-full sm:w-auto text-xs font-semibold gap-1.5"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Quay lại: Cẩm nang nghi lễ</span>
                </Button>

                <Button
                  variant={isBookmarked ? "default" : "outline"}
                  size="sm"
                  aria-pressed={isBookmarked}
                  onClick={handleToggleBookmark}
                  className="w-full sm:w-auto text-xs font-semibold gap-1.5"
                >
                  <Bookmark className={`w-4 h-4 ${isBookmarked ? "fill-current" : ""}`} />
                  <span>
                    {isBookmarked
                      ? "Đã đánh dấu trên trình duyệt này"
                      : "Đánh dấu hướng dẫn"}
                  </span>
                </Button>
              </div>
            </section>
          </div>

          {/* Right Sidebar: Sticky Checklist & Safety Controls (4 cols) */}
          <div className="order-1 lg:order-2 lg:col-span-4">
            <div className="lg:sticky lg:top-24 space-y-6">
              {/* Checklist Card */}
              <Card className="p-5 rounded-card bg-surface border-line shadow-xs">
                <div className="flex items-center justify-between mb-2">
                  <div className="font-display font-bold text-lg text-ink">
                    Tiến trình chuẩn bị
                  </div>
                  <Badge variant="outline" className="text-xs text-accent border-line">
                    Tự do
                  </Badge>
                </div>

                <p className="text-sm text-muted leading-relaxed mb-4">
                  Đánh dấu từng việc để kiểm tra không gian thờ an yên mà không áp lực.
                </p>

                {/* Counter */}
                <div className="p-3 rounded-panel bg-surface/70 border border-line text-xs font-semibold text-accent mb-4 flex items-center justify-between">
                  <span>Tiến độ thực hiện:</span>
                  <span className="font-sans tabular-nums text-sm">
                    {completedChecklistCount} / {detail.checklists.length} việc hoàn thành
                  </span>
                </div>

                {/* Checkboxes List */}
                <div className="space-y-2.5 mb-6">
                  {detail.checklists.map((chk) => {
                    const isDone = checkedIds.includes(chk.id);
                    return (
                      <label
                        key={chk.id}
                        className={[
                          "flex min-h-11 items-start gap-3 rounded-xl border p-3",
                          "cursor-pointer text-sm",
                          isDone
                            ? "bg-accent-soft border-accent/40"
                            : "bg-surface border-line",
                        ].join(" ")}
                      >
                        <input
                          type="checkbox"
                          checked={isDone}
                          onChange={() => toggleCheck(chk.id)}
                          className="mt-0.5 h-5 w-5 shrink-0 accent-[var(--color-action)]"
                        />

                        <span className={isDone ? "text-muted" : "text-ink"}>
                          {chk.label}
                        </span>
                      </label>
                    );
                  })}
                </div>

                {/* Safety Tip in sidebar */}
                <div className="p-3.5 rounded-panel bg-surface border border-line mb-5 text-xs text-muted space-y-1">
                  <div className="font-bold text-accent flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>Lưu ý an toàn lửa & chung cư</span>
                  </div>
                  <p className="leading-relaxed">{detail.safetyTip}</p>
                </div>

                {/* Print & Share actions */}
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => window.print()}
                    className="text-xs font-medium gap-1 text-ink"
                  >
                    <Printer className="w-3.5 h-3.5" />
                    <span>In lưu trữ</span>
                  </Button>

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleShare}
                    className="text-xs font-medium gap-1 text-ink"
                  >
                    <Share2 className="w-3.5 h-3.5" />
                    <span>Chia sẻ</span>
                  </Button>
                </div>

                {showShareNotification && (
                  <div className="mt-2 text-center text-xs text-accent font-medium">
                    ✓ Đã sao chép liên kết cẩm nang!
                  </div>
                )}
              </Card>
            </div>
          </div>
        </div>

        {/* Section: Cẩm nang nghi lễ liên quan */}
        <div className="pt-10 border-t border-line mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="section-title text-xl sm:text-2xl">
              Cẩm nang nghi lễ liên quan dành cho bạn
            </h2>
            <button
              onClick={onBackToRitualList}
              className="text-xs text-accent font-semibold hover:underline cursor-pointer"
            >
              Xem tất cả cẩm nang →
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedRituals.map((item) => (
              <Card
                key={item.id}
                onClick={() => onSelectRelatedRitual(item.id)}
                className="rounded-card overflow-hidden bg-surface border-line hover:border-line transition-all hover:shadow-card cursor-pointer flex flex-col justify-between"
              >
                <div>
                  <div className="relative h-44 w-full overflow-hidden bg-surface">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="px-2.5 py-1 rounded-full text-xs font-bold tracking-wide uppercase bg-black/60 text-white backdrop-blur-xs">
                        {item.occasion}
                      </span>
                    </div>
                  </div>

                  <div className="p-4">
                    <h3 className="font-display font-bold text-base text-ink leading-snug mb-1 hover:text-accent transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-sm text-ink line-clamp-2 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>

                <div className="p-4 pt-0 text-xs font-semibold text-accent flex items-center justify-end">
                  <span>Xem hướng dẫn →</span>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Footer Quote */}
        <div className="text-center pt-6 border-t border-line">
          <div className="text-xs uppercase tracking-widest text-muted font-medium">
            © {new Date().getFullYear()} Tin Lắm Tâm Linh • Chiêm nghiệm dân gian đương đại
          </div>
        </div>
      </main>
    </div>
  );
};

export const RitualDetailScreen: React.FC<
  RitualDetailScreenProps
> = (props) => {
  const ritualId = props.ritualId ?? "chuan-bi-ngay-ram";
  const ritual = getRitualById(ritualId);

  if (!ritual || !ritual.detail) {
    return (
      <DetailNotFound
        title={
          ritual
            ? "Hướng dẫn này chưa có nội dung chi tiết"
            : "Không tìm thấy hướng dẫn nghi lễ"
        }
        backLabel="Về Cẩm nang nghi lễ"
        onBack={props.onBackToRitualList}
      />
    );
  }

  return (
    <RitualDetailContent
      {...props}
      ritualId={ritualId}
      key={ritualId}
    />
  );
};
