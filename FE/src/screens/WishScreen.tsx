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
  onSaveJournal?: (text: string, topic: WishTopic) => void;
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

  const TOPICS: WishTopic[] = ["Bình an", "Gia đình", "Học tập", "Công việc", "Khác"];

  const handleApplySample = () => {
    setContent(SAMPLE_WISHES[topic] || SAMPLE_WISHES["Bình an"]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;

    if (mode === "journal") {
      if (onSaveJournal) {
        onSaveJournal(content.trim(), topic);
      }
      setViewState("variantA");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      // Ephemeral mode: don't save text
      setViewState("variantB");
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <div className="w-full min-h-screen bg-[#fcf8f2] text-[#2e2624] font-['Be_Vietnam_Pro',sans-serif]">
      <main className="max-w-5xl mx-auto px-4 sm:px-6 pt-6 pb-20">
        {/* =========================================================================
            VIEW 1: FORM SOẠN ĐIỀU ƯỚC (IMAGE 1)
           ========================================================================= */}
        {viewState === "form" && (
          <div>
            {/* Top Breadcrumb & Step Badge */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4 text-xs text-[#8a7971]">
              <div className="flex items-center gap-2">
                <button
                  onClick={onBackToExperience}
                  className="hover:text-[#9e3b2e] cursor-pointer"
                >
                  ← Trải nghiệm
                </button>
                <span>/</span>
                <span className="text-[#9e3b2e] font-semibold">Gửi gắm điều ước</span>
              </div>

              <div className="flex items-center gap-1.5 uppercase font-semibold text-[11px] text-[#938279]">
                <span className="w-2 h-2 rounded-full bg-[#9e3b2e] inline-block"></span>
                <span>KHOẢNG LẶNG TỰ NHÌN LẠI • KHÔNG MANG TÍNH TIÊN TRI</span>
              </div>
            </div>

            {/* Main Header */}
            <div className="text-center max-w-2xl mx-auto mb-10">
              <h1 className="font-['Noto_Serif',serif] font-bold text-3xl sm:text-4xl lg:text-[40px] text-[#2a2220] leading-tight mb-3">
                Có điều gì bạn muốn gửi gắm hôm nay?
              </h1>
              <p className="text-sm sm:text-base text-[#6f5e57] leading-relaxed">
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
                  <Card className="p-6 rounded-3xl bg-white border border-[#eddcd0] shadow-xs">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2 font-bold text-base text-[#2a2220]">
                        <span>✏</span>
                        <span>Điều bạn muốn viết</span>
                      </div>

                      <button
                        type="button"
                        onClick={handleApplySample}
                        className="text-xs text-[#9e3b2e] hover:underline flex items-center gap-1 font-semibold cursor-pointer"
                      >
                        <Lightbulb className="w-3.5 h-3.5" />
                        <span>Gợi ý mẫu</span>
                      </button>
                    </div>

                    <p className="text-xs text-[#7d6c65] mb-3 leading-relaxed">
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
                        className="w-full p-4 rounded-2xl bg-[#faf3ec]/70 border border-[#eddcd0] text-sm text-[#2e2624] placeholder-[#a6968e] focus:outline-none focus:ring-1 focus:ring-[#9e3b2e] leading-relaxed resize-none"
                      />
                    </div>

                    {/* Counter & Clear Button */}
                    <div className="flex items-center justify-between text-xs text-[#8c7a72] mb-5">
                      <span>
                        ⏱ {content.length} / 1000 ký tự{" "}
                        <span className="italic">(Giới hạn vừa đủ cho một lần trải lòng)</span>
                      </span>

                      <button
                        type="button"
                        onClick={() => setContent("")}
                        className="text-[#99877f] hover:text-[#9e3b2e] flex items-center gap-1 cursor-pointer transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Xóa nội dung</span>
                      </button>
                    </div>

                    {/* Category Tags */}
                    <div>
                      <div className="text-xs font-semibold text-[#66544d] mb-2">
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
                                  ? "bg-[#9e3b2e] text-white shadow-2xs font-semibold"
                                  : "bg-[#faf3eb] text-[#715f57] border border-[#ebd6c5] hover:border-[#dfc3af]"
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
                    <h3 className="font-['Noto_Serif',serif] font-bold text-lg text-[#2a2220]">
                      Cách thức lưu giữ hay buông bỏ
                    </h3>
                    <p className="text-xs text-[#78665f]">
                      Lựa chọn hành vi dữ liệu phù hợp với cảm xúc và ý định của bạn:
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Option 1: Lưu riêng vào nhật ký */}
                      <Card
                        onClick={() => setMode("journal")}
                        className={`p-5 rounded-3xl cursor-pointer transition-all duration-300 relative flex flex-col justify-between ${
                          mode === "journal"
                            ? "bg-white border-[#9e3b2e] shadow-sm ring-1 ring-[#9e3b2e]/30"
                            : "bg-[#fffdfa] border-[#ecdcd0] hover:border-[#dfc3af]"
                        }`}
                      >
                        <div>
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-2">
                              <span className="text-lg">📜</span>
                              <h4 className="font-bold text-sm sm:text-base text-[#2a2220]">
                                Lưu riêng vào nhật ký
                              </h4>
                            </div>
                            <div
                              className={`w-5 h-5 rounded-full flex items-center justify-center ${
                                mode === "journal"
                                  ? "bg-[#9e3b2e] text-white"
                                  : "border-2 border-[#eddcd0] bg-white text-transparent"
                              }`}
                            >
                              <Check className="w-3 h-3 stroke-[3]" />
                            </div>
                          </div>

                          <p className="text-xs text-[#6e5d56] leading-relaxed mb-4">
                            Giữ trọn vẹn câu chữ của bạn trong Góc của tôi để bạn có thể tự
                            mình đọc lại bất cứ lúc nào. Hoàn toàn riêng tư, chỉ một mình bạn
                            thấy.
                          </p>
                        </div>

                        <div className="p-2.5 rounded-xl bg-[#faf3ec] border border-[#eddcd0] text-[11px] text-[#7d6c65] leading-relaxed">
                          ⓘ {isLoggedIn ? "Đã vào demo: Nội dung bản demo được lưu trên trình duyệt này." : "Dành cho khách: Bạn sẽ được lưu tạm và có thể liên kết vào tài khoản demo."}
                        </div>
                      </Card>

                      {/* Option 2: Gửi đi dưới dạng biểu tượng */}
                      <Card
                        onClick={() => setMode("ephemeral")}
                        className={`p-5 rounded-3xl cursor-pointer transition-all duration-300 relative flex flex-col justify-between ${
                          mode === "ephemeral"
                            ? "bg-white border-[#9e3b2e] shadow-sm ring-1 ring-[#9e3b2e]/30"
                            : "bg-[#fffdfa] border-[#ecdcd0] hover:border-[#dfc3af]"
                        }`}
                      >
                        <div>
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-2">
                              <span className="text-lg">🏮</span>
                              <h4 className="font-bold text-sm sm:text-base text-[#2a2220]">
                                Gửi đi dưới dạng biểu tượng
                              </h4>
                            </div>
                            <div
                              className={`w-5 h-5 rounded-full flex items-center justify-center ${
                                mode === "ephemeral"
                                  ? "bg-[#9e3b2e] text-white"
                                  : "border-2 border-[#eddcd0] bg-white text-transparent"
                              }`}
                            >
                              <Check className="w-3 h-3 stroke-[3]" />
                            </div>
                          </div>

                          <p className="text-xs text-[#6e5d56] leading-relaxed mb-4">
                            Tượng trưng cho sự buông bỏ ưu tư vào dòng nước. Hệ thống chỉ kích
                            hoạt hiệu ứng hoa đăng số nhẹ nhàng; toàn bộ câu chữ bạn vừa viết
                            sẽ KHÔNG được lưu trữ trong nhật ký và tuyệt đối KHÔNG công khai.
                          </p>
                        </div>

                        <div className="p-2.5 rounded-xl bg-[#fbece1] border border-[#edd5c4] text-[11px] text-[#843126] leading-relaxed">
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
                      className="w-full sm:w-auto text-xs border-[#e4ccba] text-[#73625b]"
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
                <div className="p-4 rounded-2xl bg-[#faf3eb] border border-[#eedecf] flex items-start gap-3 text-xs text-[#715f57] leading-relaxed">
                  <ShieldCheck className="w-5 h-5 text-[#9e3b2e] flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#882f23] block mb-0.5">
                      KHÔNG GIAN AN TỊNH THUẦN KHIẾT
                    </strong>
                    Tại Tin Lắm Tâm Linh, tuyệt đối không có bảng điều ước công khai, không nút
                    chia sẻ câu tương tác, không thương mại hóa nỗi buồn hay hứa hẹn phép màu
                    tức thì.
                  </div>
                </div>
              </div>

              {/* Right Column: Cultural Companion (5 columns) */}
              <div className="lg:col-span-5 space-y-5">
                {/* Visual Card: Viết để tháo gỡ, không phải để níu giữ */}
                <Card className="rounded-3xl overflow-hidden bg-white border border-[#eddcd0] shadow-xs">
                  <div className="relative h-48 overflow-hidden bg-[#faede2]">
                    <img
                      src="/images/tea_bowl.jpg"
                      alt="Gửi gắm điều ước"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                    <div className="absolute top-3 left-3 px-2 py-0.5 rounded-full bg-white/90 text-[10px] font-semibold text-[#863024]">
                      Góc nhìn
                    </div>
                    <div className="absolute top-3 right-3 text-[11px] font-serif italic text-white/90">
                      Hồn Việt Tĩnh Tại
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="font-['Noto_Serif',serif] font-bold text-lg text-[#2a2220] mb-2 leading-snug">
                      Viết để tháo gỡ, không phải để níu giữ
                    </h3>
                    <p className="text-xs sm:text-sm text-[#6c5a53] leading-relaxed">
                      Tổ tiên người Việt coi trọng việc thuận lẽ tự nhiên. Gửi gắm một ý nghĩ
                      không phải để nài ép tương lai phải diễn ra như ý, mà là để tâm trí được
                      nhẹ lòng đón nhận mọi sự bằng một thái độ an nhiên.
                    </p>
                  </div>
                </Card>

                {/* Card 2: Nhịp thở tâm trí hôm nay */}
                <Card className="p-5 rounded-3xl bg-white border border-[#eddcd0] shadow-xs">
                  <div className="flex items-center justify-between mb-3 text-xs">
                    <span className="font-bold uppercase tracking-wider text-[#695750] flex items-center gap-1.5">
                      <span>〰</span>
                      <span>Nhịp thở tâm trí hôm nay</span>
                    </span>
                    <Badge variant="terracotta" className="text-[10px] py-0 px-2">
                      An định
                    </Badge>
                  </div>

                  {/* Soft wave curve representation */}
                  <div className="py-2 mb-2">
                    <svg
                      className="w-full h-10 text-[#9e3b2e]"
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
                    <div className="flex items-center justify-between text-[11px] text-[#93827a] px-1">
                      <span>Bồn chồn ban sáng</span>
                      <span>Tĩnh lặng lúc này</span>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-[#f4e8dc] text-xs text-[#7a6861] italic text-center">
                    “Nước đọng lại thì trong, tâm dừng lại thì tỏ.”
                  </div>
                </Card>

                {/* Card 3: Biểu tượng Hoa đăng số */}
                <Card className="p-5 rounded-3xl bg-[#fbece1]/70 border border-[#ecd5c4] shadow-xs">
                  <div className="text-xs font-bold uppercase tracking-wider text-[#9e3b2e] mb-1.5 flex items-center gap-1.5">
                    <span>🏮</span>
                    <span>Biểu tượng Hoa đăng số</span>
                  </div>
                  <p className="text-xs text-[#715f57] leading-relaxed">
                    Ngọn nến trên đóa sen trôi theo con nước vốn là cử chỉ nguyện cầu an bình
                    cổ truyền. Thay vì thả xốp nến thật gây ô nhiễm môi trường sông ngòi, hoa
                    đăng số gói ghém lời chúc của bạn thành năng lượng tích cực lan tỏa vô hình.
                  </p>
                </Card>
              </div>
            </div>

            {/* Bottom Privacy Banner */}
            <div className="p-6 rounded-3xl bg-white border border-[#eddcd0] flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xs">
              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-2xl bg-[#faede2] flex items-center justify-center text-[#9e3b2e] flex-shrink-0">
                  <Lock className="w-5 h-5 text-[#9e3b2e]" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-[#2a2220] mb-0.5">
                    Cam kết bảo mật & tôn trọng tâm trí
                  </h4>
                  <p className="text-xs text-[#74625b] leading-relaxed max-w-2xl">
                    Nội dung tâm sự là tài sản tinh thần vô giá của riêng bạn. Chúng tôi cam
                    kết không dùng văn bản để huấn luyện mô hình thương mại, không đọc trộm,
                    và trao toàn quyền xóa vĩnh viễn cho bạn bất kỳ lúc nào.
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => alert("Chính sách bảo mật: Toàn bộ dữ liệu nhật ký chỉ lưu trên thiết bị của bạn (Local Storage) hoặc tài khoản cá nhân đã mã hóa.")}
                className="px-4 py-2 rounded-full border border-[#eddcd0] text-xs font-semibold text-[#7b6b64] hover:text-[#9e3b2e] flex-shrink-0 hover:bg-[#faf4ed] transition-colors cursor-pointer"
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
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4 text-xs text-[#8a7971]">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setViewState("form")}
                  className="hover:text-[#9e3b2e] cursor-pointer"
                >
                  Trải nghiệm
                </button>
                <span>/</span>
                <span className="hover:text-[#9e3b2e] cursor-pointer" onClick={() => setViewState("form")}>
                  Gửi gắm điều ước
                </span>
                <span>/</span>
                <span className="text-[#9e3b2e] font-semibold">Xác nhận lưu giữ</span>
              </div>

              <div className="flex items-center gap-3">
                <span className="px-3 py-1 rounded-full bg-[#9e3b2e] text-white font-semibold text-[11px]">
                  ● Variant A (Lưu nhật ký)
                </span>
                <button
                  onClick={() => setViewState("variantB")}
                  className="px-3 py-1 rounded-full bg-[#f7ede4] text-[#715f57] border border-[#ecd9cb] hover:border-[#9e3b2e] text-[11px] cursor-pointer"
                >
                  Xem Variant B (Biểu tượng)
                </button>
                <span className="text-[11px] text-[#8e7e77]">Chuyển động: Êm ái</span>
              </div>
            </div>

            <div className="text-center mb-8">
              <span className="inline-block text-[11px] uppercase font-bold tracking-wider text-[#938279] bg-[#fbf2ea] px-3.5 py-1 rounded-full border border-[#ebd6c5] mb-6">
                ● KHOẢNG LẶNG TỰ NHÌN LẠI • ĐÃ LƯU TRÊN TRÌNH DUYỆT
              </span>

              {/* Big Red Book Seal Icon */}
              <div className="w-20 h-20 mx-auto rounded-3xl bg-[#faede2] border-2 border-[#ebd4c2] flex items-center justify-center text-[#9e3b2e] shadow-md mb-4 relative">
                <BookOpen className="w-10 h-10" />
                <span className="absolute -top-2 -right-2 text-[10px] font-mono font-bold px-1.5 py-0.5 rounded-full bg-[#9e3b2e] text-white">
                  ✓
                </span>
              </div>

              <h1 className="font-['Noto_Serif',serif] font-bold text-3xl sm:text-4xl text-[#2a2220] leading-tight mb-3">
                Điều bạn viết đã được lưu riêng
              </h1>
              <p className="text-sm text-[#73635b] max-w-xl mx-auto leading-relaxed">
                Khoảng lặng này đã được cất giữ an toàn. Chỉ một mình bạn có thể mở lại khi
                lòng cần một nhịp dừng chân.
              </p>
            </div>

            {/* Central Privacy Card */}
            <Card className="max-w-2xl mx-auto rounded-3xl p-6 sm:p-8 bg-white border border-[#eddcd0] shadow-sm mb-8">
              <div className="flex items-start gap-3.5 mb-6 pb-6 border-b border-[#f4e8dc]">
                <div className="w-10 h-10 rounded-2xl bg-[#faede2] flex items-center justify-center text-[#9e3b2e] flex-shrink-0">
                  <Lock className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-base text-[#2a2220] mb-1 flex items-center gap-1.5">
                    <span>Không gian lưu riêng trên trình duyệt</span>
                    <span className="text-xs text-[#9e3b2e]">🛡</span>
                  </h4>
                  <p className="text-xs sm:text-sm text-[#73615a] leading-relaxed">
                    Nội dung bản demo được lưu trên trình duyệt này và chỉ xuất hiện trong mục <strong>Góc của tôi</strong>.
                    Chưa kết nối máy chủ hay lưu trữ đám mây.
                  </p>
                </div>
              </div>

              {/* 3 Status Meta Boxes */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
                <div className="p-3.5 rounded-2xl bg-[#faf3ec] border border-[#eddcd0]">
                  <div className="text-[10px] text-[#938279] uppercase mb-0.5">
                    Chủ đề gắn kèm
                  </div>
                  <div className="font-bold text-sm text-[#9e3b2e]">{topic}</div>
                </div>

                <div className="p-3.5 rounded-2xl bg-[#faf3ec] border border-[#eddcd0]">
                  <div className="text-[10px] text-[#938279] uppercase mb-0.5">
                    Thời khắc gửi gắm
                  </div>
                  <div className="font-semibold text-xs text-[#2a2220]">
                    Hôm nay, một chiều tĩnh lặng
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-[#faf3ec] border border-[#eddcd0]">
                  <div className="text-[10px] text-[#938279] uppercase mb-0.5">
                    Trạng thái
                  </div>
                  <div className="font-semibold text-xs text-[#2a2220]">
                    {content.length} ký tự đã niêm phong
                  </div>
                </div>
              </div>

              {/* Quote */}
              <div className="text-center py-2 text-xs text-[#7a6861] italic border-t border-[#f4e8dc]">
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
                className="text-xs text-[#73635b] hover:text-[#9e3b2e]"
              >
                Trở về Hôm nay
              </Button>

              <Button
                variant="ghost"
                size="default"
                onClick={() => setViewState("form")}
                className="text-xs text-[#73635b] hover:text-[#9e3b2e]"
              >
                Viết điều khác nếu cần
              </Button>
            </div>

            {/* 3 Step Guidance Cards */}
            <div className="max-w-3xl mx-auto mb-10">
              <div className="text-center text-xs font-bold uppercase tracking-wider text-[#9e3b2e] mb-1">
                TỪNG BƯỚC GÌN GIỮ
              </div>
              <h3 className="font-['Noto_Serif',serif] font-bold text-xl text-[#2a2220] text-center mb-6">
                Điều gì diễn ra tiếp theo với ước nguyện?
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <Card className="p-5 rounded-2xl bg-white border border-[#eddcd0]">
                  <div className="w-6 h-6 rounded-full bg-[#faede2] text-[#9e3b2e] text-xs font-bold flex items-center justify-center mb-3">
                    1
                  </div>
                  <h4 className="font-['Noto_Serif',serif] font-bold text-sm text-[#2a2220] mb-1">
                    Nằm yên trong sổ
                  </h4>
                  <p className="text-xs text-[#73635b] leading-relaxed">
                    Ước nguyện được bảo lưu nguyên vẹn theo dòng thời gian mà không bị đẩy
                    thông báo hay làm phiền nhịp sống.
                  </p>
                </Card>

                <Card className="p-5 rounded-2xl bg-white border border-[#eddcd0]">
                  <div className="w-6 h-6 rounded-full bg-[#faede2] text-[#9e3b2e] text-xs font-bold flex items-center justify-center mb-3">
                    2
                  </div>
                  <h4 className="font-['Noto_Serif',serif] font-bold text-sm text-[#2a2220] mb-1">
                    Chiêm nghiệm khi tròn tháng
                  </h4>
                  <p className="text-xs text-[#73635b] leading-relaxed">
                    Vào ngày rằm hoặc đầu tháng âm lịch, bạn có thể tự mở lại để nhìn nhận sự
                    chuyển hóa trong tâm thức.
                  </p>
                </Card>

                <Card className="p-5 rounded-2xl bg-white border border-[#eddcd0]">
                  <div className="w-6 h-6 rounded-full bg-[#faede2] text-[#9e3b2e] text-xs font-bold flex items-center justify-center mb-3">
                    3
                  </div>
                  <h4 className="font-['Noto_Serif',serif] font-bold text-sm text-[#2a2220] mb-1">
                    Tự do hóa giải & lưu giữ
                  </h4>
                  <p className="text-xs text-[#73635b] leading-relaxed">
                    Bạn có toàn quyền "hóa quẻ" (xóa vĩnh viễn) hoặc đóng dấu hoàn thành bất
                    cứ lúc nào trong trang cá nhân.
                  </p>
                </Card>
              </div>
            </div>

            {/* Bottom Assurance */}
            <div className="max-w-3xl mx-auto p-4 rounded-2xl bg-[#faf3eb] border border-[#eedecf] flex items-center justify-between gap-3 text-xs text-[#7a6861]">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#9e3b2e] flex-shrink-0" />
                <span>
                  Cam kết bảo mật & tôn trọng tâm trí: Tin Lắm Tâm Linh không thương mại hóa
                  nỗi niềm riêng tư, không phân tích bán quảng cáo.
                </span>
              </div>
              <button
                onClick={() => alert("Toàn bộ dữ liệu được quản lý minh bạch.")}
                className="text-[#9e3b2e] font-semibold hover:underline flex-shrink-0 cursor-pointer"
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
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4 text-xs text-[#8a7971]">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setViewState("form")}
                  className="hover:text-[#9e3b2e] cursor-pointer"
                >
                  Trải nghiệm
                </button>
                <span>/</span>
                <span className="hover:text-[#9e3b2e] cursor-pointer" onClick={() => setViewState("form")}>
                  Gửi gắm điều ước
                </span>
                <span>/</span>
                <span className="text-[#9e3b2e] font-semibold">Buông bỏ ưu tư</span>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => setViewState("variantA")}
                  className="px-3 py-1 rounded-full bg-[#f7ede4] text-[#715f57] border border-[#ecd9cb] hover:border-[#9e3b2e] text-[11px] cursor-pointer"
                >
                  Xem Variant A (Lưu vào nhật ký)
                </button>
                <span className="px-3 py-1 rounded-full bg-[#9e3b2e] text-white font-semibold text-[11px]">
                  ● Variant B (Biểu tượng tan biến)
                </span>
                <span className="text-[11px] text-[#8e7e77]">Chuyển động êm dịu: Bật</span>
              </div>
            </div>

            <div className="text-center mb-8">
              <span className="inline-block text-[11px] uppercase font-bold tracking-wider text-[#938279] bg-[#fbf2ea] px-3.5 py-1 rounded-full border border-[#ebd6c5] mb-6">
                ● KHOẢNG LẶNG BUÔNG BỎ • KHÔNG LƯU TRỮ VĂN BẢN
              </span>

              {/* Floating Lantern Motif */}
              <div className="w-20 h-20 mx-auto rounded-3xl bg-gradient-to-tr from-[#fbece1] to-[#faede2] border-2 border-[#edd3c1] flex items-center justify-center text-[#9e3b2e] shadow-md mb-2 relative animate-pulse">
                <span className="text-3xl">🏮</span>
              </div>

              <div className="text-xs uppercase font-serif tracking-widest text-[#938279] mb-4">
                THỦY ĐĂNG SỐ HÓA • TIÊU DUNG AN NHIÊN
              </div>

              <h1 className="font-['Noto_Serif',serif] font-bold text-3xl sm:text-4xl text-[#2a2220] leading-tight mb-3">
                Bạn đã gửi gắm một khoảng lòng
              </h1>
              <p className="text-sm text-[#73635b] max-w-xl mx-auto leading-relaxed">
                Ưu tư hay ước vọng như cánh hoa đăng trôi theo dòng nước biếc. Nhẹ lòng buông
                xuống để tâm trí được thảnh thơi đón nhận ngày mới.
              </p>
            </div>

            {/* Central Ephemeral Box */}
            <Card className="max-w-2xl mx-auto rounded-3xl p-6 sm:p-8 bg-white border border-[#eddcd0] shadow-sm mb-8">
              <div className="flex items-start gap-3.5 mb-6">
                <div className="w-10 h-10 rounded-2xl bg-[#faede2] flex items-center justify-center text-[#9e3b2e] flex-shrink-0">
                  <Flower2 className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#9e3b2e]">
                      LỜI NHẮC VỀ SỰ BUÔNG BỎ
                    </span>
                    <Badge variant="secondary" className="text-[10px] bg-[#fcf4ec]">
                      Không lưu trữ
                    </Badge>
                  </div>

                  <h4 className="font-bold text-base text-[#2a2220] mb-1.5">
                    Nội dung vừa viết không được lưu và không thể xem lại.
                  </h4>
                  <p className="text-xs sm:text-sm text-[#73615a] leading-relaxed">
                    Toàn bộ câu chữ đã được xóa hoàn toàn khỏi bộ nhớ tạm ngay khoảnh khắc
                    bạn gửi đi. Không có bản lưu nhật ký, không gửi tới bất kỳ ai, và không
                    hiển thị ở bất cứ nơi nào trong cõi mạng này.
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t border-[#f4e8dc] text-center text-xs text-[#7a6861] italic">
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
                onClick={() => setViewState("form")}
                className="text-xs text-[#73635b] border-[#e4ccba]"
              >
                Viết điều khác
              </Button>

              {onGoToExplore && (
                <button
                  onClick={onGoToExplore}
                  className="text-xs font-semibold text-[#9e3b2e] hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <span>Khám phá phong thổ văn hóa 3 miền</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* 3 Philosophy Guidance Cards */}
            <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">
              <Card className="p-5 rounded-2xl bg-white border border-[#eddcd0]">
                <div className="text-xs font-bold text-[#9e3b2e] mb-1.5 flex items-center gap-1.5">
                  <span>🏮</span>
                  <span>Vạn vật thuận tự nhiên</span>
                </div>
                <p className="text-xs text-[#73635b] leading-relaxed mb-3">
                  Biểu tượng hoa đăng số lấy cảm hứng từ tục thả đèn hoa trên sông Hương
                  (Huế) và sông Hoài (Hội An), biểu trưng cho sự tiễn đưa điều cũ để bừng
                  sáng tâm thức mới.
                </p>
                <button
                  onClick={onGoToExplore}
                  className="text-[11px] font-semibold text-[#9e3b2e] hover:underline cursor-pointer"
                >
                  TẬP TỤC CỔ TRUYỀN ↗
                </button>
              </Card>

              <Card className="p-5 rounded-2xl bg-white border border-[#eddcd0]">
                <div className="text-xs font-bold text-[#9e3b2e] mb-1.5 flex items-center gap-1.5">
                  <span>🛡</span>
                  <span>Minh bạch lưu trữ bản demo</span>
                </div>
                <p className="text-xs text-[#73635b] leading-relaxed mb-3">
                  Nội dung bản demo được lưu trên trình duyệt này. Chế độ gửi đi thả trôi sẽ tiêu hủy ngay trên client, không gửi lên bất kỳ máy chủ nào.
                </p>
                <span className="text-[11px] font-semibold text-[#9e3b2e]">
                  CAM KẾT MINH BẠCH ⓘ
                </span>
              </Card>

              <Card className="p-5 rounded-2xl bg-white border border-[#eddcd0]">
                <div className="text-xs font-bold text-[#9e3b2e] mb-1.5 flex items-center gap-1.5">
                  <span>🍵</span>
                  <span>Gợi ý tĩnh tại đêm nay</span>
                </div>
                <p className="text-xs text-[#73635b] leading-relaxed mb-3">
                  Uống một tách trà gừng ấm, ngắt các thông báo mạng xã hội khoảng 30 phút
                  trước giờ ngủ và hít thở nhịp nhàng 4 thì để giữ trọn sự nhẹ nhõm này.
                </p>
                <span className="text-[11px] font-semibold text-[#9e3b2e]">
                  HÀNH THIỀN ĐƠN GIẢN ⓘ
                </span>
              </Card>
            </div>

            {/* Bottom Callout */}
            <div className="max-w-3xl mx-auto p-4 rounded-2xl bg-[#faf3eb] border border-[#eedecf] text-center text-xs text-[#77665f] leading-relaxed">
              <strong className="text-[#882f23] block mb-0.5">
                Tin Lắm Tâm Linh • Không gian thanh tịnh thuần khiết
              </strong>
              Không bùa chú, không thương mại hóa nỗi buồn, không mê tín dị đoan. Chỉ có sự an
              ủi chân thành từ vẻ đẹp minh triết của văn hóa dân gian Việt Nam.
            </div>
          </div>
        )}

        {/* Global Footer Motto */}
        <div className="text-center pt-10 border-t border-[#eddcd0] mt-16">
          <p className="font-['Noto_Serif',serif] italic font-semibold text-lg sm:text-xl text-[#9e3b2e] mb-1.5">
            “Tâm bình thế giới bình, lòng an vạn sự tỏ.”
          </p>
          <div className="text-xs uppercase tracking-widest text-[#938279] font-medium">
            Nơi lưu giữ nét đẹp tín ngưỡng văn hóa dân gian Việt, chiêm nghiệm tinh tế và hướng tâm thiện lành giữa đời sống hiện đại.
          </div>
        </div>
      </main>
    </div>
  );
};
