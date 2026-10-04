import React, { useState, useEffect, useRef } from "react";
import {
  Heart,
  Sparkles,
  ArrowLeft,
  Flame,
  Trash2,
  CheckCircle2,
  BookOpen,
  Info,
  Sun,
  ShieldCheck,
  Flower2,
  Lock,
} from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { Badge } from "@/src/components/ui/badge";

interface GratitudeScreenProps {
  onBackToExperience: () => void;
  onBackToHome: () => void;
  onGoToCulture?: () => void;
  user?: { name: string; email: string } | null;
  onSaveGratitude?: (content: string) => boolean;
  onRequireLogin?: (content: string) => void;
}

export const GratitudeScreen: React.FC<GratitudeScreenProps> = ({
  onBackToExperience,
  onBackToHome,
  onGoToCulture,
  user,
  onSaveGratitude,
  onRequireLogin,
}) => {
  const [content, setContent] = useState("");
  const [sendMode, setSendMode] = useState<"ephemeral" | "save">("ephemeral");
  // Ban đầu hình ảnh chưa thắp nến theo đúng yêu cầu trải nghiệm
  const [isLampLit, setIsLampLit] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [releaseStatus, setReleaseStatus] = useState<"idle" | "releasing" | "released">("idle");
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [saveError, setSaveError] = useState("");

  const releaseTimerRef = useRef<
    ReturnType<typeof setTimeout> | null
  >(null);

  const resetTimerRef = useRef<
    ReturnType<typeof setTimeout> | null
  >(null);

  useEffect(() => {
    return () => {
      if (releaseTimerRef.current !== null) {
        clearTimeout(releaseTimerRef.current);
      }

      if (resetTimerRef.current !== null) {
        clearTimeout(resetTimerRef.current);
      }
    };
  }, []);

  const maxChars = 500;

  const handleClear = () => {
    setContent("");
    setSaveSuccess(false);
    setSaveError("");
    setReleaseStatus("idle");
  };

  const handleSendOrSave = () => {
    if (isSubmitting || releaseTimerRef.current !== null) {
      return;
    }

    setSaveError("");

    if (sendMode === "save") {
      if (saveSuccess) return;

      const cleanContent = content.trim();
      if (!cleanContent) return;

      const saved =
        onSaveGratitude?.(cleanContent) === true;

      if (saved) {
        setSaveSuccess(true);
      } else if (user) {
        setSaveError(
          "Chưa lưu được lời tri ân. Bạn hãy thử lại."
        );
      }

      return;
    }

    if (resetTimerRef.current !== null) {
      clearTimeout(resetTimerRef.current);
      resetTimerRef.current = null;
    }

    setSaveSuccess(false);
    setIsSubmitting(true);
    setReleaseStatus("releasing");

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    releaseTimerRef.current = setTimeout(() => {
      releaseTimerRef.current = null;
      setContent("");
      setIsSubmitting(false);
      setReleaseStatus("released");
      setIsLampLit(true);

      resetTimerRef.current = setTimeout(() => {
        resetTimerRef.current = null;
        setReleaseStatus("idle");
      }, 6000);
    }, reducedMotion ? 200 : 1200);
  };

  return (
    <div className="screen-shell">
      {/* Top Banner & Breadcrumb */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-6 sm:pt-8">
        <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-line">
          {/* Breadcrumbs */}
          <div className="flex items-center gap-2 text-sm text-muted">
            <button
              onClick={onBackToHome}
              className="hover:text-accent transition-colors cursor-pointer"
            >
              Hôm nay
            </button>
            <span>/</span>
            <button
              onClick={onBackToExperience}
              className="hover:text-accent transition-colors cursor-pointer"
            >
              Trải nghiệm
            </button>
            <span>/</span>
            <span className="text-accent font-semibold">Góc tri ân</span>
          </div>

          {/* Center Pill & Right Link */}
          <div className="flex items-center gap-4">
            <span className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-semibold tracking-wider bg-surface text-accent border border-line">
              <span className="w-1.5 h-1.5 rounded-full bg-action animate-pulse"></span>
              KHOẢNG LẶNG TRI ÂN • CHIÊM NGHIỆM TÂM THỨC
            </span>

            <button
              onClick={onBackToExperience}
              className="inline-flex items-center gap-1.5 text-sm font-medium text-muted hover:text-accent transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Về danh mục trải nghiệm</span>
            </button>
          </div>
        </div>

        {/* Page Title & Intro */}
        <div className="mt-8 mb-10">
          <h1 className="page-title mb-3">
            Một nén hương lòng
          </h1>
          <p className="text-base sm:text-lg text-ink max-w-3xl leading-relaxed">
            Dành một nhịp thở chậm giữa bộn bề đời thường để nhớ về cội nguồn, tri ân cha mẹ,
            tiền nhân và những người đã trao gửi ân tình trong đời bạn. Một khoảng lặng an hòa
            để soi tỏ lòng biết ơn.
          </p>
        </div>

        {/* Main 2-Column Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column (5 Cols): Artwork, Oil Lamp, Quote */}
          <div className="lg:col-span-5 space-y-6">
            {/* Visual Card: Thể hiện rõ trạng thái ban đầu chưa sáng, khi bấm CTA mới thắp sáng */}
            <div className="bg-surface rounded-card border border-line overflow-hidden shadow-xs">
              <div className="relative aspect-4/3 w-full overflow-hidden bg-surface-soft">
                <img
                  src="/images/ancestor_portrait.jpg"
                  alt="Chân dung người cao niên trong không gian truyền thống"
                  className={`w-full h-full object-cover transition-all duration-700 ease-out ${
                    isLampLit
                      ? "brightness-[1.08] saturate-[1.15] contrast-[1.05]"
                      : "brightness-[0.62] contrast-[0.9] saturate-[0.7]"
                  }`}
                />

                {/* Hiệu ứng hào quang ấm áp khi đèn thắp sáng */}
                {isLampLit && (
                  <div className="absolute inset-0 bg-radial from-amber-500/25 via-orange-400/10 to-transparent pointer-events-none animate-pulse" />
                )}

                {/* Lớp phủ chuyển sắc thông tin dưới chân ảnh */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20 pointer-events-none" />

                {/* Overlaid tags */}
                <div className="absolute bottom-3 left-4 right-4 flex flex-wrap gap-2 items-center justify-between text-xs text-white/95 font-medium">
                  <span
                    className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full border transition-all ${
                      isLampLit
                        ? "bg-amber-950/70 border-gold/40 text-amber-200"
                        : "bg-black/50 border-white/20 text-stone-300"
                    }`}
                  >
                    <Flame
                      className={`w-3.5 h-3.5 ${
                        isLampLit ? "text-amber-400 animate-pulse" : "text-stone-400"
                      }`}
                    />
                    <span>{isLampLit ? "Ngọn đèn đang sáng rạng" : "Chưa thắp nến • Khoảng lặng"}</span>
                  </span>

                  <span className="bg-black/50 px-2.5 py-1 rounded-full border border-white/20 text-stone-200">
                    Tĩnh tại nội tâm
                  </span>
                </div>
              </div>

              {/* Lamp Interaction Block */}
              <div className="p-6">
                <div className="flex items-start gap-3.5 mb-4">
                  <div className="w-10 h-10 rounded-panel bg-surface border border-line flex items-center justify-center text-accent shrink-0">
                    <Flower2 className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-lg text-ink">
                      Không gian tưởng niệm an lành
                    </h3>
                    <p className="text-sm text-muted leading-relaxed mt-1">
                      Khoảnh khắc tĩnh tại để lắng nghe lòng mình, thắp một ngọn đèn lành cho sự bình an nội tại.
                      Không ràng buộc nghi thức, chỉ hướng về lòng thành.
                    </p>
                  </div>
                </div>

                {/* Light Lamp Action Button */}
                <button
                  type="button"
                  aria-pressed={isLampLit}
                  onClick={() => setIsLampLit((prev) => !prev)}
                  className={`w-full py-3.5 px-4 rounded-panel border font-medium text-sm transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-xs ${
                    isLampLit
                      ? "bg-surface border-line text-accent shadow-card ring-2 ring-gold/30"
                      : "bg-surface hover:bg-surface border-line text-gold"
                  }`}
                >
                  <Flame
                    className={`w-4 h-4 transition-transform duration-300 ${
                      isLampLit ? "text-accent scale-125 animate-pulse" : "text-accent"
                    }`}
                  />
                  <span>
                    {isLampLit
                      ? "Ngọn đèn đã được thắp sáng • Tâm thành tỏa rạng"
                      : "Chạm để thắp sáng lời tri ân"}
                  </span>
                </button>
              </div>
            </div>

            {/* Classical Quote Card */}
            <div className="p-5 rounded-panel bg-surface border border-line flex items-start gap-3.5">
              <div className="w-8 h-8 rounded-full bg-surface text-accent flex items-center justify-center shrink-0 mt-0.5">
                <Sparkles className="w-4 h-4" />
              </div>
              <div className="text-sm">
                <p className="italic text-ink font-display leading-relaxed">
                  “Cây có gốc mới nở cành xanh ngọn, nước có nguồn mới biển rộng sông sâu.”
                </p>
                <p className="text-sm text-muted mt-1.5 font-medium">
                  — Lời nhắc nhở về cội nguồn và lòng biết ơn.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column (7 Cols): Express & Send Gratitude Form */}
          <div className="lg:col-span-7">
            <div className="bg-surface rounded-card border border-line p-6 sm:p-8 shadow-xs">
              {/* Form Header */}
              <div className="mb-5">
                <span className="text-xs font-bold tracking-widest text-muted uppercase">
                  BÀY TỎ & GỬI GẮM
                </span>
                <h2 className="section-title text-2xl mt-1">
                  Hôm nay bạn muốn gửi lời tri ân nào?
                </h2>
              </div>

              {/* Text Area */}
              <div className="relative">
                <textarea
                  rows={6}
                  value={content}
                  maxLength={maxChars}
                  disabled={isSubmitting}
                  aria-label="Lời tri ân của bạn"
                  onChange={(event) => {
                    setContent(event.target.value);
                    setSaveSuccess(false);
                    setSaveError("");
                    setReleaseStatus("idle");
                  }}
                  placeholder="Viết đôi dòng nhắn gửi lòng biết ơn đến gia đình, người thương, hoặc tiền nhân đã nâng đỡ bước chân bạn... (Nếu chọn buông xuống, bạn có thể để trống ô này)"
                  className="w-full p-4 rounded-panel border border-line focus:border-accent focus:ring-2 focus:ring-accent/10 outline-none text-ink placeholder:text-subtle text-base leading-relaxed resize-none transition-all bg-surface"
                />

                {/* Counter & Clear Button */}
                <div className="flex items-center justify-between text-xs text-muted mt-2 px-1">
                  <button
                    type="button"
                    onClick={handleClear}
                    disabled={isSubmitting || !content}
                    className="inline-flex items-center gap-1 hover:text-accent disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Xóa nội dung</span>
                  </button>
                  <span className="font-medium">
                    {content.length} / {maxChars} ký tự
                  </span>
                </div>
              </div>

              {/* Send Mode Selection */}
              <div className="mt-6 pt-5 border-t border-line">
                <h4 className="text-sm font-bold text-ink mb-3">
                  Chọn hình thức gửi gắm:
                </h4>

                <div className="space-y-3">
                  {/* Option 1: Ephemeral Release */}
                  <label
                    onClick={() => setSendMode("ephemeral")}
                    className={`block p-4 rounded-panel border cursor-pointer transition-all ${
                      sendMode === "ephemeral"
                        ? "bg-accent-soft border-accent"
                        : "bg-surface hover:bg-surface border-line"
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className="pt-0.5">
                        <div
                          className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                            sendMode === "ephemeral"
                              ? "border-accent bg-surface"
                              : "border-line bg-surface"
                          }`}
                        >
                          {sendMode === "ephemeral" && (
                            <div className="w-2 h-2 rounded-full bg-action"></div>
                          )}
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-1.5 font-bold text-sm text-ink">
                          <span>Gửi biểu tượng rồi buông xuống</span>
                          <span className="text-accent">●</span>
                        </div>
                        <p className="text-sm text-muted leading-relaxed mt-1">
                          Lời tri ân sẽ hóa thành làn hương thơm hoặc cánh sen thả trôi vô vi trong tâm tưởng.
                          Hệ thống hoàn toàn không lưu giữ lời viết của bạn.
                        </p>
                        <p className="text-sm text-muted mt-1.5 font-medium italic">
                          ✦ Bạn có thể để trống ô viết nếu chỉ muốn gửi đi một nén tâm hương thuần khiết vào hư không.
                        </p>
                      </div>
                    </div>
                  </label>

                  {/* Option 2: Save to Account */}
                  <label
                    onClick={() => setSendMode("save")}
                    className={`block p-4 rounded-panel border cursor-pointer transition-all ${
                      sendMode === "save"
                        ? "bg-accent-soft border-accent"
                        : "bg-surface hover:bg-surface border-line"
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className="pt-0.5">
                        <div
                          className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                            sendMode === "save"
                              ? "border-accent bg-surface"
                              : "border-line bg-surface"
                          }`}
                        >
                          {sendMode === "save" && (
                            <div className="w-2 h-2 rounded-full bg-action"></div>
                          )}
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center flex-wrap gap-2 font-bold text-sm text-ink">
                          <span>Lưu riêng để đọc lại</span>
                          <span className="px-2 py-0.5 rounded-full text-xs font-normal bg-surface text-accent border border-line">
                            {user ? `Đang ở phiên ${user.name}` : "Cần đăng nhập"}
                          </span>
                        </div>
                        <p className="text-sm text-muted leading-relaxed mt-1">
                          Nội dung sẽ được lưu kín đáo trong mục <strong>“Điều ước & Lời tri ân”</strong> tại Góc của tôi để bạn có thể xem lại khi cần một điểm tựa an lành.
                        </p>
                      </div>
                    </div>
                  </label>
                </div>
              </div>

              {/* Status Message (Releasing or Saved) */}
              {releaseStatus === "released" && (
                <div className="mt-5 p-4 rounded-panel bg-surface border border-line text-success text-sm flex items-start gap-3 animate-fadeIn">
                  <CheckCircle2 className="w-5 h-5 shrink-0 mt-0.5 text-success" />
                  <div>
                    <p className="font-bold">Nén hương lòng đã được gửi đi an hòa</p>
                    <p className="text-sm text-success mt-0.5 leading-relaxed">
                      {content.trim()
                        ? "Lời tri ân chân thành đã hòa vào khói hương vô vi. Chúc tâm bạn luôn an lành và vững vàng."
                        : "Một nén tâm hương vô vi thuần khiết đã được thắp sáng trong tâm tưởng. Nguyện cầu vạn sự lành đến bạn và người thân."}
                    </p>
                  </div>
                </div>
              )}

              {saveSuccess && (
                <div className="mt-5 p-4 rounded-panel bg-surface border border-line text-success text-sm flex items-start gap-3 animate-fadeIn">
                  <CheckCircle2 className="w-5 h-5 shrink-0 mt-0.5 text-success" />
                  <div>
                    <p className="font-bold">Đã lưu vào Góc của tôi</p>
                    <p className="text-sm text-success mt-0.5 leading-relaxed">
                      Bạn có thể xem lại tại tab <strong>“Điều ước & Lời tri ân”</strong> bất cứ lúc nào.
                    </p>
                  </div>
                </div>
              )}

              {/* Primary Action Button */}
              <div className="mt-6">
                {saveError && (
                  <p role="alert" className="mt-4 text-sm text-danger">
                    {saveError}
                  </p>
                )}
                <Button
                  onClick={handleSendOrSave}
                  disabled={
                    isSubmitting ||
                    (
                      sendMode === "save" &&
                      (!content.trim() || saveSuccess)
                    )
                  }
                  className="w-full py-4 text-base font-semibold rounded-panel bg-action hover:bg-action text-white shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>
                    {isSubmitting
                      ? "Đang thả trôi..."
                      : sendMode === "ephemeral"
                        ? "Thả trôi — không lưu"
                        : saveSuccess
                          ? "Đã lưu lời tri ân"
                          : user
                            ? "Lưu vào Góc của tôi"
                            : "Đăng nhập để lưu"}
                  </span>
                </Button>
              </div>

              {/* Bottom culture link */}
              {onGoToCulture && (
                <div className="mt-5 text-center">
                  <button
                    onClick={onGoToCulture}
                    className="inline-flex items-center gap-1.5 text-xs text-muted hover:text-accent transition-colors cursor-pointer group"
                  >
                    <BookOpen className="w-3.5 h-3.5 text-accent" />
                    <span>Tìm hiểu phong tục tưởng nhớ gia tiên và đạo hiếu trong văn hóa Việt</span>
                    <span className="group-hover:translate-x-0.5 transition-transform">→</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Disclaimer / Transparency Box */}
        <div className="mt-10 p-5 rounded-panel bg-surface/80 border border-line flex items-start gap-3.5 text-xs text-muted leading-relaxed">
          <Info className="w-4 h-4 text-accent shrink-0 mt-0.5" />
          <div>
            Đây là thực hành mang tính biểu tượng.
            Nếu chọn lưu, nội dung được giữ trên trình duyệt này;
            nếu chọn thả trôi, nội dung không được ghi vào nhật ký.
          </div>
        </div>

        {/* Closing Calm Banner */}
        <div className="mt-16 text-center">
          <span className="text-xs uppercase tracking-widest text-muted font-semibold">
            LỜI NHẮC AN YÊN MỖI SỚM MAI
          </span>
        </div>
      </div>
    </div>
  );
};
