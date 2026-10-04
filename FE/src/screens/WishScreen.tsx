import React, { useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Lock,
  Trash2,
  Lightbulb,
  ExternalLink,
  Flower2,
} from "lucide-react";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Card } from "../components/ui/card";

export type WishTopic = "Bình an" | "Gia đình" | "Học tập" | "Công việc" | "Khác";
export type WishMode = "journal" | "ephemeral";

interface WishScreenProps {
  onBackToExperience: () => void;
  onGoToDiary: () => void;
  onGoToHome: () => void;
  onGoToExplore: () => void;
  onSaveJournal?: (text: string, topic: WishTopic) => boolean;
  isLoggedIn?: boolean;
}

const SAMPLE_WISHES: Record<WishTopic, string> = {
  "Bình an":
    "Mong cho những ngày sắp tới trong lòng bớt xao động, công việc dẫu còn bộn bề nhưng mỗi chiều về nhà vẫn tìm được một khoảng bình an bên mâm cơm ấm.",
  "Gia đình":
    "Cầu chúc cho cha mẹ luôn mạnh khỏe, các thành viên trong gia đình luôn thấu hiểu, sẻ chia và bao dung cho nhau trước mọi sóng gió cuộc đời.",
  "Học tập":
    "Mong cho tâm trí luôn sáng suốt, bền chí trước những kỳ thi và thu nhận được nhiều tri thức hữu ích để vững bước trên con đường tương lai.",
  "Công việc":
    "Nguyện cho những dự án sắp tới diễn ra thuận lợi, hanh thông; giữ vững chữ Tín và tìm thấy niềm vui trong từng việc mình cống hiến.",
  "Khác":
    "Gửi gắm một ước nguyện chân thành vào vũ trụ, buông bỏ muộn phiền cũ để đón nhận những duyên lành mới đang tới.",
};

export const WishScreen: React.FC<WishScreenProps> = ({
  onBackToExperience,
  onGoToDiary,
  onGoToHome,
  onGoToExplore,
  onSaveJournal,
  isLoggedIn = false,
}) => {
  // Screen views: 'form' | 'variantA' (Lưu riêng) | 'variantB' (Biểu tượng tan biến)
  const [viewState, setViewState] = useState<"form" | "variantA" | "variantB">("form");

  // Form State - default to empty string so user never accidentally saves sample text
  const [content, setContent] = useState("");
  const [topic, setTopic] = useState<WishTopic>("Bình an");
  const [mode, setMode] = useState<WishMode>("journal");
  const [hasActuallySaved, setHasActuallySaved] = useState(false);
  const [saveError, setSaveError] = useState("");

  const TOPICS: WishTopic[] = ["Bình an", "Gia đình", "Học tập", "Công việc", "Khác"];

  const handleApplySample = () => {
    if (content.trim()) {
      setSaveError(
        "Ô viết đang có nội dung. Nếu muốn dùng mẫu, bạn hãy xóa nội dung trước."
      );
      return;
    }

    setContent(SAMPLE_WISHES[topic]);
    setSaveError("");
  };

  const handleWriteAnother = () => {
    setContent("");
    setHasActuallySaved(false);
    setSaveError("");
    setViewState("form");

    window.scrollTo({
      top: 0,
      behavior: "auto",
    });
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setSaveError("");

    const cleanContent = content.trim();
    if (!cleanContent) return;

    if (cleanContent.length > 1000) {
      setSaveError("Lời gửi gắm tối đa 1000 ký tự.");
      return;
    }

    if (mode === "journal") {
      if (!onSaveJournal) {
        setSaveError("Chức năng lưu chưa sẵn sàng trong phiên này.");
        return;
      }

      let saved = false;

      try {
        saved = onSaveJournal(cleanContent, topic) === true;
      } catch {
        setSaveError("Chưa lưu được lời gửi gắm. Bạn hãy thử lại.");
        return;
      }

      setHasActuallySaved(saved);

      if (!saved) {
        if (isLoggedIn) {
          setSaveError(
            "Chưa lưu được nội dung. Bạn hãy thử lại."
          );
        }

        // Với khách, App chuyển sang đăng nhập.
        return;
      }

      setViewState("variantA");
    } else {
      setContent("");
      setHasActuallySaved(false);
      setViewState("variantB");
    }

    window.scrollTo({
      top: 0,
      behavior: "auto",
    });
  };

  return (
    <div className="screen-shell">
      <main className="page-container max-w-5xl">
        {/* =========================================================================
            VIEW 1: FORM SOẠN ĐIỀU ƯỚC (IMAGE 1)
           ========================================================================= */}
        {viewState === "form" && (
          <div>
            {/* Top Breadcrumb & Step Badge */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4 text-xs text-muted">
              <div className="flex items-center gap-2">
                <button
                  onClick={onBackToExperience}
                  className="hover:text-accent cursor-pointer"
                >
                  ← Trải nghiệm
                </button>
                <span>/</span>
                <span className="text-accent font-semibold">Gửi gắm điều ước</span>
              </div>

              <div className="flex items-center gap-1.5 uppercase font-semibold text-xs text-muted">
                <span className="w-2 h-2 rounded-full bg-action inline-block"></span>
                <span>KHOẢNG LẶNG TỰ NHÌN LẠI • KHÔNG MANG TÍNH TIÊN TRI</span>
              </div>
            </div>

            {/* Main Header */}
            <div className="mx-auto mb-6 max-w-2xl text-center">
              <h1 className="page-title mb-3">Lời gửi gắm</h1>

              <p className="text-sm leading-relaxed text-muted sm:text-base">
                Viết điều bạn đang nghĩ. Bạn có thể lưu để đọc lại
                hoặc thả hoa đăng như một cách khép lại lần viết này.
              </p>
            </div>

            {/* Two Column Layout: Form and Cultural Sidebar */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
              {/* Left Column: Form & Options (7 columns) */}
              <div className="lg:col-span-7 space-y-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Card 1: Textarea Card */}
                  <Card className="p-6 rounded-card bg-surface border border-line shadow-xs">
                    <div className="flex items-center justify-between mb-2">
                      <label
                        htmlFor="wish-content"
                        className="text-base font-semibold text-ink"
                      >
                        Điều bạn muốn viết
                      </label>

                      <button
                        type="button"
                        onClick={handleApplySample}
                        className="text-xs text-accent hover:underline flex items-center gap-1 font-semibold cursor-pointer"
                      >
                        <Lightbulb className="w-3.5 h-3.5" />
                        <span>Gợi ý mẫu</span>
                      </button>
                    </div>

                    <p
                      id="wish-content-help"
                      className="mb-3 text-sm leading-relaxed text-muted"
                    >
                      Không cần viết thật hay. Tránh nhập thông tin cá nhân nhạy cảm.
                    </p>

                    <div className="relative mb-2">
                      <textarea
                        id="wish-content"
                        rows={6}
                        required
                        maxLength={1000}
                        value={content}
                        onChange={(event) => {
                          setContent(event.target.value);
                          setSaveError("");
                        }}
                        aria-describedby="wish-content-help wish-content-count"
                        placeholder="Hôm nay, mình muốn gửi gắm..."
                        className="w-full resize-y rounded-panel border border-line bg-surface/70 p-4 text-base leading-relaxed text-ink placeholder:text-subtle focus:outline-none focus:ring-2 focus:ring-accent"
                      />
                    </div>

                    {/* Counter & Clear Button */}
                    <div className="flex items-center justify-between text-xs text-muted mb-5">
                      <span id="wish-content-count" className="text-xs text-muted">
                        {content.length}/1000 ký tự
                      </span>

                      <button
                        type="button"
                        onClick={() => {
                          setContent("");
                          setSaveError("");
                        }}
                        className="text-muted hover:text-accent flex items-center gap-1 cursor-pointer transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Xóa nội dung</span>
                      </button>
                    </div>

                    {/* Category Tags */}
                    <div>
                      <div className="text-xs font-semibold text-ink mb-2">
                        Gắn chủ đề để dễ nhìn lại (tùy ý):
                      </div>
                      <div className="flex flex-wrap items-center gap-2">
                        {TOPICS.map((t) => {
                          const isActive = topic === t;
                          return (
                            <button
                              key={t}
                              type="button"
                              onClick={() => setTopic(t)}
                              className={`px-3 py-1 rounded-full text-xs font-medium transition-all cursor-pointer ${
                                isActive
                                  ? "bg-action text-white shadow-2xs font-semibold"
                                  : "bg-surface text-ink border border-line hover:border-line"
                              }`}
                            >
                              {isActive ? `● ${t}` : t}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </Card>

                  <fieldset className="space-y-3">
                    <legend className="text-base font-semibold text-ink">
                      Bạn muốn giữ lại lời viết này thế nào?
                    </legend>

                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                      {(
                        [
                          {
                            value: "journal",
                            title: "Lưu để đọc lại",
                            description: isLoggedIn
                              ? "Lưu vào Góc của tôi trên trình duyệt này."
                              : "Cần đăng nhập để lưu. Bản nháp chưa được giữ khi tải lại trang.",
                          },
                          {
                            value: "ephemeral",
                            title: "Thả hoa đăng",
                            description:
                              "Không lưu vào nhật ký. Nội dung được xóa khỏi ô viết khi bạn gửi.",
                          },
                        ] satisfies {
                          value: WishMode;
                          title: string;
                          description: string;
                        }[]
                      ).map((option) => (
                        <label
                          key={option.value}
                          className={`flex cursor-pointer items-start gap-3 rounded-card border p-4 transition-colors ${
                            mode === option.value
                              ? "border-accent bg-accent/5"
                              : "border-line bg-surface hover:border-accent/50"
                          }`}
                        >
                          <input
                            type="radio"
                            name="wish-mode"
                            value={option.value}
                            checked={mode === option.value}
                            onChange={() => {
                              setMode(option.value);
                              setSaveError("");
                            }}
                            className="mt-1 h-4 w-4 shrink-0 accent-accent"
                          />

                          <span>
                            <span className="block text-sm font-semibold text-ink">
                              {option.title}
                            </span>

                            <span className="mt-1 block text-sm leading-relaxed text-muted">
                              {option.description}
                            </span>
                          </span>
                        </label>
                      ))}
                    </div>

                    {mode === "journal" && (
                      <p className="text-xs leading-relaxed text-muted">
                        Bản thử nghiệm lưu dữ liệu trên thiết bị, chưa có đồng bộ
                        qua máy chủ hoặc mã hóa nội dung.
                      </p>
                    )}
                  </fieldset>

                  {saveError && (
                    <p role="alert" className="text-sm text-danger">
                      {saveError}
                    </p>
                  )}

                  {/* Action Buttons Row */}
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
                    <Button
                      type="button"
                      variant="outline"
                      size="default"
                      onClick={onBackToExperience}
                      className="w-full sm:w-auto text-xs border-line text-muted"
                    >
                      <ArrowLeft className="w-3.5 h-3.5 mr-1" />
                      <span>Quay lại Trải nghiệm</span>
                    </Button>

                    <Button
                      type="submit"
                      variant="default"
                      size="lg"
                      disabled={!content.trim()}
                      className={`w-full sm:w-auto font-semibold gap-2 shadow-xs px-8 transition-all ${
                        !content.trim()
                          ? "opacity-50 cursor-not-allowed"
                          : "cursor-pointer"
                      }`}
                    >
                      <span>
                        {mode === "journal"
                          ? isLoggedIn
                            ? "Lưu vào Góc của tôi"
                            : "Đăng nhập để lưu"
                          : "Thả hoa đăng — không lưu"}
                      </span>
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </div>
                </form>

                <p className="text-xs leading-relaxed text-muted">
                  Lời gửi gắm không được đăng lên bảng công khai trong trải nghiệm này.
                  Bạn quyết định lưu lại hoặc thả hoa đăng trước khi gửi.
                </p>
              </div>

              {/* Writing companion */}
              <aside className="self-start lg:col-span-5 lg:sticky lg:top-24">
                <Card className="overflow-hidden rounded-card border border-line bg-surface shadow-xs">
                  <img
                    src="/images/relic_box.jpg"
                    alt=""
                    loading="lazy"
                    className="h-40 w-full object-cover sm:h-48"
                  />

                  <div className="space-y-4 p-5">
                    <h2 className="text-lg font-semibold text-ink">
                      Một khoảng dừng cho bạn
                    </h2>

                    <p className="text-sm leading-relaxed text-muted">
                      Bạn có thể bắt đầu bằng một câu đơn giản:
                      “Điều mình đang cần lúc này là…”
                    </p>

                    <details className="border-t border-line pt-3">
                      <summary className="cursor-pointer py-2 text-sm font-medium text-ink">
                        Chưa biết viết gì?
                      </summary>

                      <ul className="mt-2 list-disc space-y-2 pl-5 text-sm leading-relaxed text-muted">
                        <li>Điều gì khiến mình bận lòng hôm nay?</li>
                        <li>Mình muốn nói điều gì với người thân?</li>
                        <li>Một việc nhỏ mình có thể làm sau khi viết là gì?</li>
                      </ul>
                    </details>

                    <p className="border-t border-line pt-3 text-xs leading-relaxed text-muted">
                      Hoa đăng trong màn này là hình ảnh tượng trưng.
                      Trải nghiệm không bảo đảm điều ước sẽ thành hiện thực.
                    </p>
                  </div>
                </Card>
              </aside>
            </div>

            {/* Bottom Privacy Banner */}
            <div className="p-6 rounded-card bg-surface border border-line flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xs">
              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-panel bg-surface flex items-center justify-center text-accent flex-shrink-0">
                  <Lock className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-ink mb-0.5">
                    Thông tin lưu trữ
                  </h4>
                  <p className="text-sm text-muted leading-relaxed max-w-2xl">
                    Chọn lưu để giữ nội dung trên trình duyệt này.
                    Chọn thả hoa đăng để kết thúc mà không ghi nội dung vào nhật ký.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* =========================================================================
            VIEW 2: VARIANT A - XÁC NHẬN LƯU GIỮ (IMAGE 2)
           ========================================================================= */}
        {viewState === "variantA" && (
          <div>
            {/* Top Bar with Variant Switchers */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4 text-xs text-muted">
              <nav
                aria-label="Đường dẫn"
                className="flex flex-wrap items-center gap-2"
              >
                <button
                  type="button"
                  onClick={onBackToExperience}
                  className="min-h-11 hover:text-accent"
                >
                  Trải nghiệm
                </button>

                <span aria-hidden="true">/</span>

                <button
                  type="button"
                  onClick={handleWriteAnother}
                  className="min-h-11 hover:text-accent"
                >
                  Lời gửi gắm
                </button>

                <span aria-hidden="true">/</span>

                <span aria-current="page" className="font-semibold text-accent">
                  Đã lưu
                </span>
              </nav>

              <div className="flex items-center gap-3">
                <span className="px-3 py-1 rounded-full bg-action text-white font-semibold text-xs">
                  ● Lưu vào nhật ký cá nhân
                </span>
              </div>
            </div>

            <div className="text-center mb-8">
              {hasActuallySaved && (
                <span className="inline-block text-xs uppercase font-bold tracking-wider text-muted bg-surface px-3.5 py-1 rounded-full border border-line mb-6">
                  ● KHOẢNG LẶNG TỰ NHÌN LẠI • ĐÃ LƯU TRÊN TRÌNH DUYỆT
                </span>
              )}

              {/* Big Red Book Seal Icon */}
              <div className="w-20 h-20 mx-auto rounded-card bg-surface border-2 border-line flex items-center justify-center text-accent shadow-md mb-4 relative">
                <BookOpen className="w-10 h-10" />
                <span className="absolute -top-2 -right-2 text-xs font-sans tabular-nums font-bold px-1.5 py-0.5 rounded-full bg-action text-white">
                  ✓
                </span>
              </div>

              <h1 className="page-title mb-3">
                Đã lưu vào Góc của tôi
              </h1>
              <p className="text-sm text-muted max-w-xl mx-auto leading-relaxed">
                Lời gửi gắm đã được lưu vào Góc của tôi trên trình duyệt này.
                Bạn có thể mở lại để đọc hoặc xóa khi muốn.
              </p>
            </div>

            {/* Central Privacy Card */}
            <Card className="max-w-2xl mx-auto rounded-card p-6 sm:p-8 bg-surface border border-line shadow-sm mb-8">
              <div className="flex items-start gap-3.5 mb-6 pb-6 border-b border-line">
                <div className="w-10 h-10 rounded-panel bg-surface flex items-center justify-center text-accent flex-shrink-0">
                  <Lock className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-base text-ink mb-1 flex items-center gap-1.5">
                    <span>Không gian lưu riêng trên trình duyệt</span>
                    <span className="text-xs text-accent">🛡</span>
                  </h4>
                  <p className="text-sm text-muted leading-relaxed">
                    Nội dung được lưu theo hồ sơ demo trên trình duyệt này.
                    Chưa có mã hóa nội dung hoặc đồng bộ qua máy chủ.
                    Nếu xóa dữ liệu trang web trong trình duyệt, nội dung đã lưu có thể mất.
                  </p>
                </div>
              </div>

              {/* 3 Status Meta Boxes */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
                <div className="p-3.5 rounded-panel bg-surface border border-line">
                  <div className="text-xs text-muted uppercase mb-0.5">
                    Chủ đề gắn kèm
                  </div>
                  <div className="font-bold text-sm text-accent">{topic}</div>
                </div>

                <div className="p-3.5 rounded-panel bg-surface border border-line">
                  <div className="text-xs text-muted uppercase mb-0.5">
                    Nơi lưu
                  </div>

                  <div className="font-semibold text-sm text-ink">
                    Góc của tôi
                  </div>
                </div>

                <div className="p-3.5 rounded-panel bg-surface border border-line">
                  <div className="text-xs text-muted uppercase mb-0.5">
                    Trạng thái
                  </div>
                  <div className="font-semibold text-xs text-ink">
                    {content.trim().length} ký tự đã lưu
                  </div>
                </div>
              </div>

              {/* Quote */}
              <div className="text-center py-2 text-xs text-muted italic border-t border-line">
                “Hít một hơi thật sâu, thả lỏng đôi vai. Bạn vừa trao cho chính mình một cơ
                hội được thấu hiểu.”
              </div>
            </Card>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
              <Button
                variant="default"
                size="lg"
                onClick={onGoToDiary}
                className="w-full sm:w-auto px-8 py-3.5 font-semibold shadow-md gap-2"
              >
                <span>📖 Xem trong Góc của tôi</span>
                <ArrowRight className="w-4 h-4" />
              </Button>

              <Button
                variant="ghost"
                size="default"
                onClick={onGoToHome}
                className="text-xs text-muted hover:text-accent"
              >
                Trở về Hôm nay
              </Button>

              <Button
                variant="ghost"
                size="default"
                onClick={handleWriteAnother}
                className="text-xs text-muted hover:text-accent"
              >
                Viết điều khác nếu cần
              </Button>
            </div>

            <div className="max-w-2xl mx-auto mb-8 rounded-card border border-line bg-surface p-5">
              <h2 className="mb-2 text-base font-semibold text-ink">
                Khi muốn đọc lại
              </h2>

              <p className="text-sm leading-relaxed text-muted">
                Mở Góc của tôi và chọn mục Điều ước & Lời tri ân.
                Bạn có thể xem nội dung, đánh dấu yêu thích hoặc xóa bản ghi.
              </p>
            </div>
          </div>
        )}

        {/* =========================================================================
            VIEW 3: VARIANT B - BUÔNG BỎ ƯU TƯ / HOA ĐĂNG (IMAGE 3)
           ========================================================================= */}
        {viewState === "variantB" && (
          <div>
            {/* Top Bar with Variant Switchers */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4 text-xs text-muted">
              <nav
                aria-label="Đường dẫn"
                className="flex flex-wrap items-center gap-2"
              >
                <button
                  type="button"
                  onClick={onBackToExperience}
                  className="min-h-11 hover:text-accent"
                >
                  Trải nghiệm
                </button>

                <span aria-hidden="true">/</span>

                <button
                  type="button"
                  onClick={handleWriteAnother}
                  className="min-h-11 hover:text-accent"
                >
                  Lời gửi gắm
                </button>

                <span aria-hidden="true">/</span>

                <span aria-current="page" className="font-semibold text-accent">
                  Đã thả hoa đăng
                </span>
              </nav>

              <div className="flex items-center gap-3">
                <span className="px-3 py-1 rounded-full bg-action text-white font-semibold text-xs">
                  ● Thả trôi an nhiên
                </span>
              </div>
            </div>

            <div className="text-center mb-8">
              <span className="inline-block text-xs uppercase font-bold tracking-wider text-muted bg-surface px-3.5 py-1 rounded-full border border-line mb-6">
                ● KHOẢNG LẶNG BUÔNG BỎ • KHÔNG LƯU TRỮ VĂN BẢN
              </span>

              {/* Floating Lantern Motif */}
              <div className="w-20 h-20 mx-auto rounded-card bg-surface-soft border-2 border-line flex items-center justify-center text-accent shadow-md mb-2 relative animate-pulse motion-reduce:animate-none">
                <span className="text-3xl">🏮</span>
              </div>

              <div className="text-xs uppercase font-serif tracking-widest text-muted mb-4">
                HOA ĐĂNG TƯỢNG TRƯNG
              </div>

              <h1 className="page-title mb-3">
                Bạn đã gửi gắm một khoảng lòng
              </h1>
              <p className="text-sm text-muted max-w-xl mx-auto leading-relaxed">
                Ưu tư hay ước vọng như cánh hoa đăng trôi theo dòng nước biếc. Nhẹ lòng buông
                xuống để tâm trí được thảnh thơi đón nhận ngày mới.
              </p>
            </div>

            {/* Central Ephemeral Box */}
            <Card className="max-w-2xl mx-auto rounded-card p-6 sm:p-8 bg-surface border border-line shadow-sm mb-8">
              <div className="flex items-start gap-3.5 mb-6">
                <div className="w-10 h-10 rounded-panel bg-surface flex items-center justify-center text-accent flex-shrink-0">
                  <Flower2 className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold uppercase tracking-wider text-accent">
                      LỜI NHẮC VỀ SỰ BUÔNG BỎ
                    </span>
                    <Badge variant="secondary" className="text-xs bg-surface">
                      Không lưu vào nhật ký
                    </Badge>
                  </div>

                  <h4 className="font-bold text-base text-ink mb-1.5">
                    Nội dung vừa viết không được lưu và không thể xem lại.
                  </h4>
                  <p className="text-sm text-muted leading-relaxed">
                    Nội dung đã được xóa khỏi ô viết và không được thêm vào nhật ký.
                    Bạn có thể bắt đầu một lời gửi gắm mới.
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t border-line text-center text-xs text-muted italic">
                “Cảm nhận sự nhẹ nhõm nơi lồng ngực. Mọi việc rồi sẽ an bài theo cách tự
                nhiên nhất.”
              </div>
            </Card>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
              <Button
                variant="default"
                size="lg"
                onClick={onGoToHome}
                className="w-full sm:w-auto px-8 py-3.5 font-semibold shadow-md gap-2"
              >
                <span>Trở về Hôm nay</span>
                <ArrowRight className="w-4 h-4" />
              </Button>

              <Button
                variant="outline"
                size="default"
                onClick={handleWriteAnother}
                className="text-xs text-muted border-line"
              >
                Viết điều khác
              </Button>

              {onGoToExplore && (
                <button
                  onClick={onGoToExplore}
                  className="text-xs font-semibold text-accent hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <span>Khám phá phong thổ văn hóa 3 miền</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            <div className="max-w-2xl mx-auto mb-8 rounded-card border border-line bg-surface p-5">
              <h2 className="mb-2 text-base font-semibold text-ink">
                Một khoảng dừng nhỏ
              </h2>

              <p className="text-sm leading-relaxed text-muted">
                Nếu muốn, bạn có thể dừng một lát, thả lỏng vai
                rồi quay lại việc đang làm. Không cần thực hiện thêm nghi thức.
              </p>
            </div>
          </div>
        )}

        {/* Global Footer Motto */}
        <div className="text-center pt-10 border-t border-line mt-16">
          <div className="text-xs uppercase tracking-widest text-muted font-medium">
            Nơi lưu giữ nét đẹp tín ngưỡng văn hóa dân gian Việt, chiêm nghiệm tinh tế và hướng tâm thiện lành giữa đời sống hiện đại.
          </div>
        </div>
      </main>
    </div>
  );
};
