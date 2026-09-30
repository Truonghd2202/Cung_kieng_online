import React, { useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Sparkles,
  Lock,
  Flame,
  Check,
  CheckCircle2,
  Trash2,
  Lightbulb,
  ShieldCheck,
  ExternalLink,
  RotateCcw,
  Flower2,
  Home,
  Waves,
  Feather,
} from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { Badge } from "@/src/components/ui/badge";
import { Card } from "@/src/components/ui/card";

export type WishTopic = "Bình an" | "Gia đình" | "Học tập" | "Công việc" | "Khác";
export type WishMode = "journal" | "ephemeral";

interface WishScreenProps {
  onBackToExperience: () => void;
  onGoToDiary: () => void;
  onGoToHome: () => void;
  onGoToExplore: () => void;
  onSaveJournal?: (text: string, topic: WishTopic) => boolean | void;
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
  const [isGentleAnimation, setIsGentleAnimation] = useState(true);
  const [hasActuallySaved, setHasActuallySaved] = useState(false);

  const TOPICS: WishTopic[] = ["Bình an", "Gia đình", "Học tập", "Công việc", "Khác"];

  const handleApplySample = () => {
    setContent(SAMPLE_WISHES[topic] || SAMPLE_WISHES["Bình an"]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;

    if (mode === "journal") {
      let saved = false;
      if (onSaveJournal) {
        saved = onSaveJournal(content.trim(), topic) === true;
      }
      setHasActuallySaved(saved);
      if (saved) {
        setViewState("variantA");
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    } else {
      // Ephemeral mode: thả trôi xong gọi setContent("");
      setContent("");
      setHasActuallySaved(false);
      setViewState("variantB");
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
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
            <div className="text-center max-w-2xl mx-auto mb-10">
              <h1 className="page-title mb-3">
                Có điều gì bạn muốn gửi gắm hôm nay?
              </h1>
              <p className="text-sm sm:text-base text-ink leading-relaxed">
                Đây là không gian tĩnh tại để bạn viết ra những nỗi niềm, ước nguyện hay tâm
                sự đang chất chứa trong lòng. Như một bước tự lắng đọng và buông bớt âu lo –
                không phải nghi thức bùa chú hay lời bảo đảm điều ước sẽ tự biến thành hiện
                thực.
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
                      <div className="flex items-center gap-2 font-bold text-base text-ink">
                        <span>✏</span>
                        <span>Điều bạn muốn viết</span>
                      </div>

                      <button
                        type="button"
                        onClick={handleApplySample}
                        className="text-xs text-accent hover:underline flex items-center gap-1 font-semibold cursor-pointer"
                      >
                        <Lightbulb className="w-3.5 h-3.5" />
                        <span>Gợi ý mẫu</span>
                      </button>
                    </div>

                    <p className="text-sm text-muted mb-3 leading-relaxed">
                      Viết thật lòng với cảm xúc hiện tại. Không cần điền họ tên thật, địa chỉ
                      hay bất kỳ thông tin cá nhân nhạy cảm nào.
                    </p>

                    <div className="relative mb-2">
                      <textarea
                        rows={5}
                        required
                        maxLength={1000}
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder="Hãy viết ra điều đang trăn trở hoặc ước mong trong lòng bạn..."
                        className="w-full p-4 rounded-panel bg-surface/70 border border-line text-sm text-ink placeholder:text-subtle focus:outline-none focus:ring-1 focus:ring-accent leading-relaxed resize-none"
                      />
                    </div>

                    {/* Counter & Clear Button */}
                    <div className="flex items-center justify-between text-xs text-muted mb-5">
                      <span>
                        ⏱ {content.length} / 1000 ký tự{" "}
                        <span className="italic">(Giới hạn vừa đủ cho một lần trải lòng)</span>
                      </span>

                      <button
                        type="button"
                        onClick={() => setContent("")}
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

                  {/* Card 2: Cách thức lưu giữ hay buông bỏ */}
                  <div className="space-y-3">
                    <h3 className="font-display font-bold text-lg text-ink">
                      Cách thức lưu giữ hay buông bỏ
                    </h3>
                    <p className="text-sm text-muted">
                      Lựa chọn hành vi dữ liệu phù hợp với cảm xúc và ý định của bạn:
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Option 1: Lưu riêng vào nhật ký */}
                      <Card
                        onClick={() => setMode("journal")}
                        className={`p-5 rounded-card cursor-pointer transition-all duration-300 relative flex flex-col justify-between ${
                          mode === "journal"
                            ? "bg-accent-soft border-accent ring-1 ring-accent/20"
                            : "bg-surface border-line hover:border-line"
                        }`}
                      >
                        <div>
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-2">
                              <span className="text-lg">📜</span>
                              <h4 className="font-bold text-sm sm:text-base text-ink">
                                Lưu riêng vào nhật ký
                              </h4>
                            </div>
                            <div
                              className={`w-5 h-5 rounded-full flex items-center justify-center ${
                                mode === "journal"
                                  ? "bg-action text-white"
                                  : "border-2 border-line bg-surface text-transparent"
                              }`}
                            >
                              <Check className="w-3 h-3 stroke-[3]" />
                            </div>
                          </div>

                          <p className="text-sm text-ink leading-relaxed mb-4">
                            Giữ trọn vẹn câu chữ của bạn trong Góc của tôi để bạn có thể tự
                            mình đọc lại bất cứ lúc nào. Hoàn toàn riêng tư, chỉ một mình bạn
                            thấy.
                          </p>
                        </div>

                        <div className="p-2.5 rounded-xl bg-surface border border-line text-xs text-muted leading-relaxed">
                          ⓘ {isLoggedIn ? "Đã vào demo: Nội dung bản demo được lưu trên trình duyệt này." : "Dành cho khách: Bạn sẽ được lưu tạm và có thể liên kết vào tài khoản demo."}
                        </div>
                      </Card>

                      {/* Option 2: Gửi đi dưới dạng biểu tượng */}
                      <Card
                        onClick={() => setMode("ephemeral")}
                        className={`p-5 rounded-card cursor-pointer transition-all duration-300 relative flex flex-col justify-between ${
                          mode === "ephemeral"
                            ? "bg-accent-soft border-accent ring-1 ring-accent/20"
                            : "bg-surface border-line hover:border-line"
                        }`}
                      >
                        <div>
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-2">
                              <span className="text-lg">🏮</span>
                              <h4 className="font-bold text-sm sm:text-base text-ink">
                                Gửi đi dưới dạng biểu tượng
                              </h4>
                            </div>
                            <div
                              className={`w-5 h-5 rounded-full flex items-center justify-center ${
                                mode === "ephemeral"
                                  ? "bg-action text-white"
                                  : "border-2 border-line bg-surface text-transparent"
                              }`}
                            >
                              <Check className="w-3 h-3 stroke-[3]" />
                            </div>
                          </div>

                          <p className="text-sm text-ink leading-relaxed mb-4">
                            Tượng trưng cho sự buông bỏ ưu tư vào dòng nước. Hệ thống chỉ kích
                            hoạt hiệu ứng hoa đăng số nhẹ nhàng; toàn bộ câu chữ bạn vừa viết
                            sẽ KHÔNG được lưu trữ trong nhật ký và tuyệt đối KHÔNG công khai.
                          </p>
                        </div>

                        <div className="p-2.5 rounded-xl bg-surface border border-line text-xs text-accent leading-relaxed">
                          🔒 Cam kết: Không lưu trữ nội dung văn bản sau khi gửi. Dữ liệu xóa
                          ngay khi hoa đăng trôi xa.
                        </div>
                      </Card>
                    </div>
                  </div>

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
                          ? "Lưu riêng điều ước"
                          : "Thả hoa đăng buông bỏ"}
                      </span>
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </div>
                </form>

                {/* Assurance Callout */}
                <div className="p-4 rounded-panel bg-surface border border-line flex items-start gap-3 text-xs text-ink leading-relaxed">
                  <ShieldCheck className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-accent block mb-0.5">
                      KHÔNG GIAN AN TỊNH THUẦN KHIẾT
                    </strong>
                    Tại Tin Lắm Tâm Linh, tuyệt đối không có bảng điều ước công khai, không nút
                    chia sẻ câu tương tác, không thương mại hóa nỗi buồn hay hứa hẹn phép màu
                    tức thì.
                  </div>
                </div>
              </div>

              {/* Right Column: Cultural Companion (5 columns) */}
              <div className="lg:col-span-5 space-y-5 lg:sticky lg:top-24 self-start">
                {/* Visual Card: Viết để tháo gỡ, không phải để níu giữ */}
                <Card className="rounded-card overflow-hidden bg-surface border border-line shadow-xs">
                  <div className="relative h-48 overflow-hidden bg-surface">
                    <img
                      src="/images/relic_box.jpg"
                      alt="Gửi gắm điều ước"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                    <div className="absolute top-3 left-3 px-2 py-0.5 rounded-full bg-surface/95 text-xs font-semibold text-accent">
                      Góc nhìn
                    </div>
                    <div className="absolute top-3 right-3 text-xs font-serif italic text-white/90">
                      Hồn Việt Tĩnh Tại
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="font-display font-bold text-lg text-ink mb-2 leading-snug">
                      Viết để tháo gỡ, không phải để níu giữ
                    </h3>
                    <p className="text-sm text-ink leading-relaxed">
                      Tổ tiên người Việt coi trọng việc thuận lẽ tự nhiên. Gửi gắm một ý nghĩ
                      không phải để nài ép tương lai phải diễn ra như ý, mà là để tâm trí được
                      nhẹ lòng đón nhận mọi sự bằng một thái độ an nhiên.
                    </p>
                  </div>
                </Card>

                {/* Card 2: Nhịp thở tâm trí hôm nay */}
                <Card className="py-5 border-0 border-t border-line bg-transparent rounded-none">
                  <div className="flex items-center justify-between mb-3 text-xs">
                    <span className="font-bold uppercase tracking-wider text-ink flex items-center gap-1.5">
                      <span>〰</span>
                      <span>Nhịp thở tâm trí hôm nay</span>
                    </span>
                    <Badge variant="terracotta" className="text-xs py-0 px-2">
                      An định
                    </Badge>
                  </div>

                  {/* Soft wave curve representation */}
                  <div className="py-2 mb-2">
                    <svg
                      className="w-full h-10 text-accent"
                      viewBox="0 0 200 40"
                      fill="none"
                    >
                      <path
                        d="M0 25 C40 10, 60 10, 100 25 C140 40, 160 10, 200 25"
                        stroke="currentColor"
                        strokeWidth="2"
                        className="opacity-70"
                      />
                      <circle cx="100" cy="25" r="4" fill="#9e3b2e" />
                    </svg>
                    <div className="flex items-center justify-between text-xs text-muted px-1">
                      <span>Bồn chồn ban sáng</span>
                      <span>Tĩnh lặng lúc này</span>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-line text-xs text-muted italic text-center">
                    “Nước đọng lại thì trong, tâm dừng lại thì tỏ.”
                  </div>
                </Card>

                {/* Card 3: Biểu tượng Hoa đăng số */}
                <Card className="p-5 rounded-card bg-surface/70 border border-line shadow-xs">
                  <div className="text-xs font-bold uppercase tracking-wider text-accent mb-1.5 flex items-center gap-1.5">
                    <span>🏮</span>
                    <span>Biểu tượng Hoa đăng số</span>
                  </div>
                  <p className="text-sm text-ink leading-relaxed">
                    Ngọn nến trên đóa sen trôi theo con nước vốn là cử chỉ nguyện cầu an bình
                    cổ truyền. Thay vì thả xốp nến thật gây ô nhiễm môi trường sông ngòi, hoa
                    đăng số gói ghém lời chúc của bạn thành năng lượng tích cực lan tỏa vô hình.
                  </p>
                </Card>
              </div>
            </div>

            {/* Bottom Privacy Banner */}
            <div className="p-6 rounded-card bg-surface border border-line flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xs">
              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-panel bg-surface flex items-center justify-center text-accent flex-shrink-0">
                  <Lock className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-ink mb-0.5">
                    Cam kết bảo mật & tôn trọng tâm trí
                  </h4>
                  <p className="text-sm text-muted leading-relaxed max-w-2xl">
                    Nội dung tâm sự là tài sản tinh thần vô giá của riêng bạn. Chúng tôi cam
                    kết không dùng văn bản để huấn luyện mô hình thương mại, không đọc trộm,
                    và trao toàn quyền xóa vĩnh viễn cho bạn bất kỳ lúc nào.
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => alert("Chính sách bảo mật: Toàn bộ dữ liệu nhật ký chỉ lưu trên thiết bị của bạn (Local Storage) hoặc tài khoản cá nhân đã mã hóa.")}
                className="px-4 py-2 rounded-full border border-line text-xs font-semibold text-muted hover:text-accent flex-shrink-0 hover:bg-surface transition-colors cursor-pointer"
              >
                Đọc chính sách bảo mật
              </button>
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
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setViewState("form")}
                  className="hover:text-accent cursor-pointer"
                >
                  Trải nghiệm
                </button>
                <span>/</span>
                <span className="hover:text-accent cursor-pointer" onClick={() => setViewState("form")}>
                  Gửi gắm điều ước
                </span>
                <span>/</span>
                <span className="text-accent font-semibold">Xác nhận lưu giữ</span>
              </div>

              <div className="flex items-center gap-3">
                <span className="px-3 py-1 rounded-full bg-action text-white font-semibold text-xs">
                  ● Lưu vào nhật ký cá nhân
                </span>
                <span className="text-xs text-muted">Chuyển động: Êm ái</span>
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
                Điều bạn viết đã được lưu riêng
              </h1>
              <p className="text-sm text-muted max-w-xl mx-auto leading-relaxed">
                Khoảng lặng này đã được cất giữ an toàn. Chỉ một mình bạn có thể mở lại khi
                lòng cần một nhịp dừng chân.
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
                    Nội dung bản demo được lưu trên trình duyệt này và chỉ xuất hiện trong mục <strong>Góc của tôi</strong>.
                    Chưa kết nối máy chủ hay lưu trữ đám mây.
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
                    Thời khắc gửi gắm
                  </div>
                  <div className="font-semibold text-xs text-ink">
                    Hôm nay, một chiều tĩnh lặng
                  </div>
                </div>

                <div className="p-3.5 rounded-panel bg-surface border border-line">
                  <div className="text-xs text-muted uppercase mb-0.5">
                    Trạng thái
                  </div>
                  <div className="font-semibold text-xs text-ink">
                    {content.length} ký tự đã niêm phong
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
                onClick={() => {
                  setContent("");
                  setHasActuallySaved(false);
                  setViewState("form");
                }}
                className="text-xs text-muted hover:text-accent"
              >
                Viết điều khác nếu cần
              </Button>
            </div>

            {/* 3 Step Guidance Cards */}
            <div className="max-w-3xl mx-auto mb-10">
              <div className="text-center text-xs font-bold uppercase tracking-wider text-accent mb-1">
                TỪNG BƯỚC GÌN GIỮ
              </div>
              <h3 className="font-display font-bold text-xl text-ink text-center mb-6">
                Điều gì diễn ra tiếp theo với ước nguyện?
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <Card className="py-5 border-0 border-t border-line bg-transparent rounded-none">
                  <div className="w-6 h-6 rounded-full bg-surface text-accent text-xs font-bold flex items-center justify-center mb-3">
                    1
                  </div>
                  <h4 className="font-display font-bold text-sm text-ink mb-1">
                    Nằm yên trong sổ
                  </h4>
                  <p className="text-sm text-muted leading-relaxed">
                    Ước nguyện được bảo lưu nguyên vẹn theo dòng thời gian mà không bị đẩy
                    thông báo hay làm phiền nhịp sống.
                  </p>
                </Card>

                <Card className="py-5 border-0 border-t border-line bg-transparent rounded-none">
                  <div className="w-6 h-6 rounded-full bg-surface text-accent text-xs font-bold flex items-center justify-center mb-3">
                    2
                  </div>
                  <h4 className="font-display font-bold text-sm text-ink mb-1">
                    Chiêm nghiệm khi tròn tháng
                  </h4>
                  <p className="text-sm text-muted leading-relaxed">
                    Vào ngày rằm hoặc đầu tháng âm lịch, bạn có thể tự mở lại để nhìn nhận sự
                    chuyển hóa trong tâm thức.
                  </p>
                </Card>

                <Card className="py-5 border-0 border-t border-line bg-transparent rounded-none">
                  <div className="w-6 h-6 rounded-full bg-surface text-accent text-xs font-bold flex items-center justify-center mb-3">
                    3
                  </div>
                  <h4 className="font-display font-bold text-sm text-ink mb-1">
                    Tự do hóa giải & lưu giữ
                  </h4>
                  <p className="text-sm text-muted leading-relaxed">
                    Bạn có toàn quyền "hóa quẻ" (xóa vĩnh viễn) hoặc đóng dấu hoàn thành bất
                    cứ lúc nào trong trang cá nhân.
                  </p>
                </Card>
              </div>
            </div>

            {/* Bottom Assurance */}
            <div className="max-w-3xl mx-auto p-4 rounded-panel bg-surface border border-line flex items-center justify-between gap-3 text-xs text-muted">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-accent flex-shrink-0" />
                <span>
                  Cam kết bảo mật & tôn trọng tâm trí: Tin Lắm Tâm Linh không thương mại hóa
                  nỗi niềm riêng tư, không phân tích bán quảng cáo.
                </span>
              </div>
              <button
                onClick={() => alert("Toàn bộ dữ liệu được quản lý minh bạch.")}
                className="text-accent font-semibold hover:underline flex-shrink-0 cursor-pointer"
              >
                Tìm hiểu chuẩn mực đạo đức →
              </button>
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
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setViewState("form")}
                  className="hover:text-accent cursor-pointer"
                >
                  Trải nghiệm
                </button>
                <span>/</span>
                <span className="hover:text-accent cursor-pointer" onClick={() => setViewState("form")}>
                  Gửi gắm điều ước
                </span>
                <span>/</span>
                <span className="text-accent font-semibold">Buông bỏ ưu tư</span>
              </div>

              <div className="flex items-center gap-3">
                <span className="px-3 py-1 rounded-full bg-action text-white font-semibold text-xs">
                  ● Thả trôi an nhiên
                </span>
                <span className="text-xs text-muted">Chuyển động êm dịu: Bật</span>
              </div>
            </div>

            <div className="text-center mb-8">
              <span className="inline-block text-xs uppercase font-bold tracking-wider text-muted bg-surface px-3.5 py-1 rounded-full border border-line mb-6">
                ● KHOẢNG LẶNG BUÔNG BỎ • KHÔNG LƯU TRỮ VĂN BẢN
              </span>

              {/* Floating Lantern Motif */}
              <div className="w-20 h-20 mx-auto rounded-card bg-surface-soft border-2 border-line flex items-center justify-center text-accent shadow-md mb-2 relative animate-pulse">
                <span className="text-3xl">🏮</span>
              </div>

              <div className="text-xs uppercase font-serif tracking-widest text-muted mb-4">
                THỦY ĐĂNG SỐ HÓA • TIÊU DUNG AN NHIÊN
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
                      Không lưu trữ
                    </Badge>
                  </div>

                  <h4 className="font-bold text-base text-ink mb-1.5">
                    Nội dung vừa viết không được lưu và không thể xem lại.
                  </h4>
                  <p className="text-sm text-muted leading-relaxed">
                    Toàn bộ câu chữ đã được xóa hoàn toàn khỏi bộ nhớ tạm ngay khoảnh khắc
                    bạn gửi đi. Không có bản lưu nhật ký, không gửi tới bất kỳ ai, và không
                    hiển thị ở bất cứ nơi nào trong cõi mạng này.
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
                onClick={() => {
                  setContent("");
                  setViewState("form");
                }}
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

            {/* 3 Philosophy Guidance Cards */}
            <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">
              <Card className="py-5 border-0 border-t border-line bg-transparent rounded-none">
                <div className="text-xs font-bold text-accent mb-1.5 flex items-center gap-1.5">
                  <span>🏮</span>
                  <span>Vạn vật thuận tự nhiên</span>
                </div>
                <p className="text-sm text-muted leading-relaxed mb-3">
                  Biểu tượng hoa đăng số lấy cảm hứng từ tục thả đèn hoa trên sông Hương
                  (Huế) và sông Hoài (Hội An), biểu trưng cho sự tiễn đưa điều cũ để bừng
                  sáng tâm thức mới.
                </p>
                <button
                  onClick={onGoToExplore}
                  className="text-xs font-semibold text-accent hover:underline cursor-pointer"
                >
                  TẬP TỤC CỔ TRUYỀN ↗
                </button>
              </Card>

              <Card className="py-5 border-0 border-t border-line bg-transparent rounded-none">
                <div className="text-xs font-bold text-accent mb-1.5 flex items-center gap-1.5">
                  <span>🛡</span>
                  <span>Minh bạch lưu trữ bản demo</span>
                </div>
                <p className="text-sm text-muted leading-relaxed mb-3">
                  Nội dung bản demo được lưu trên trình duyệt này. Chế độ gửi đi thả trôi sẽ tiêu hủy ngay trên client, không gửi lên bất kỳ máy chủ nào.
                </p>
                <span className="text-xs font-semibold text-accent">
                  CAM KẾT MINH BẠCH ⓘ
                </span>
              </Card>

              <Card className="py-5 border-0 border-t border-line bg-transparent rounded-none">
                <div className="text-xs font-bold text-accent mb-1.5 flex items-center gap-1.5">
                  <span>🍵</span>
                  <span>Gợi ý tĩnh tại đêm nay</span>
                </div>
                <p className="text-sm text-muted leading-relaxed mb-3">
                  Uống một tách trà gừng ấm, ngắt các thông báo mạng xã hội khoảng 30 phút
                  trước giờ ngủ và hít thở nhịp nhàng 4 thì để giữ trọn sự nhẹ nhõm này.
                </p>
                <span className="text-xs font-semibold text-accent">
                  HÀNH THIỀN ĐƠN GIẢN ⓘ
                </span>
              </Card>
            </div>

            {/* Bottom Callout */}
            <div className="max-w-3xl mx-auto p-4 rounded-panel bg-surface border border-line text-center text-xs text-muted leading-relaxed">
              <strong className="text-accent block mb-0.5">
                Tin Lắm Tâm Linh • Không gian thanh tịnh thuần khiết
              </strong>
              Không bùa chú, không thương mại hóa nỗi buồn, không mê tín dị đoan. Chỉ có sự an
              ủi chân thành từ vẻ đẹp minh triết của văn hóa dân gian Việt Nam.
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
