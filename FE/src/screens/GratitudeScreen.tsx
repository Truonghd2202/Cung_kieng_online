import React, { useState } from "react";
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
  const [isLampLit, setIsLampLit] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [releaseStatus, setReleaseStatus] = useState<"idle" | "releasing" | "released">("idle");
  const [saveSuccess, setSaveSuccess] = useState(false);

  const maxChars = 500;

  const handleClear = () => {
    setContent("");
    setSaveSuccess(false);
  };

  const handleSendOrSave = () => {
    if (!content.trim()) return;

    if (sendMode === "ephemeral") {
      setIsSubmitting(true);
      setReleaseStatus("releasing");
      setTimeout(() => {
        setIsSubmitting(false);
        setReleaseStatus("released");
        setContent("");
        // Tự động thắp đèn nếu chưa thắp
        if (!isLampLit) setIsLampLit(true);
        setTimeout(() => {
          setReleaseStatus("idle");
        }, 6000);
      }, 1200);
    } else {
      // Chế độ lưu riêng
      if (onSaveGratitude) {
        const success = onSaveGratitude(content);
        if (success) {
          setSaveSuccess(true);
          setTimeout(() => setSaveSuccess(false), 4000);
        }
      } else if (onRequireLogin && !user) {
        onRequireLogin(content);
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#fcf8f2] text-[#2a2220] pb-24 font-['Be_Vietnam_Pro',sans-serif]">
      {/* Top Banner & Breadcrumb */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-6 sm:pt-8">
        <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-[#f1e5d8]">
          {/* Breadcrumbs */}
          <div className="flex items-center gap-2 text-sm text-[#8a7a72]">
            <button
              onClick={onBackToHome}
              className="hover:text-[#9e3b2e] transition-colors cursor-pointer"
            >
              Hôm nay
            </button>
            <span>/</span>
            <button
              onClick={onBackToExperience}
              className="hover:text-[#9e3b2e] transition-colors cursor-pointer"
            >
              Trải nghiệm
            </button>
            <span>/</span>
            <span className="text-[#9e3b2e] font-semibold">Góc tri ân</span>
          </div>

          {/* Center Pill & Right Link */}
          <div className="flex items-center gap-4">
            <span className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-semibold tracking-wider bg-[#fef3e2] text-[#8a5a22] border border-[#f6d8a8]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#c97a2b] animate-pulse"></span>
              KHOẢNG LẶNG TRI ÂN • CHIÊM NGHIỆM TÂM THỨC
            </span>

            <button
              onClick={onBackToExperience}
              className="inline-flex items-center gap-1.5 text-sm font-medium text-[#7d6c64] hover:text-[#9e3b2e] transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Về danh mục trải nghiệm</span>
            </button>
          </div>
        </div>

        {/* Page Title & Intro */}
        <div className="mt-8 mb-10">
          <h1 className="font-['Noto_Serif',serif] font-bold text-3xl sm:text-4xl text-[#9e3b2e] tracking-tight mb-3">
            Một nén hương lòng
          </h1>
          <p className="text-base sm:text-lg text-[#63534b] max-w-3xl leading-relaxed">
            Dành một nhịp thở chậm giữa bộn bề đời thường để nhớ về cội nguồn, tri ân cha mẹ,
            tiền nhân và những người đã trao gửi ân tình trong đời bạn. Một khoảng lặng an hòa
            để soi tỏ lòng biết ơn.
          </p>
        </div>

        {/* Main 2-Column Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column (5 Cols): Artwork, Oil Lamp, Quote */}
          <div className="lg:col-span-5 space-y-6">
            {/* Visual Card */}
            <div className="bg-white rounded-3xl border border-[#eedcd0] overflow-hidden shadow-xs">
              <div className="relative aspect-4/3 w-full overflow-hidden bg-[#e8ded5]">
                <img
                  src="/images/tea_bowl.jpg"
                  alt="Không gian tưởng niệm và trà thiền an tĩnh"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/15 pointer-events-none"></div>

                {/* Overlaid tags */}
                <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-xs text-white/95 font-medium">
                  <span className="inline-flex items-center gap-1 bg-black/40 backdrop-blur-xs px-2.5 py-1 rounded-full border border-white/20">
                    <Sun className="w-3.5 h-3.5 text-[#f6d8a8]" />
                    {isLampLit ? "Ngọn đèn đang sáng rạng" : "Ngọn đèn an hòa"}
                  </span>
                  <span className="bg-black/40 backdrop-blur-xs px-2.5 py-1 rounded-full border border-white/20">
                    Tĩnh tại nội tâm
                  </span>
                </div>
              </div>

              {/* Lamp Interaction Block */}
              <div className="p-6">
                <div className="flex items-start gap-3.5 mb-4">
                  <div className="w-10 h-10 rounded-2xl bg-[#faede2] border border-[#ecd9cb] flex items-center justify-center text-[#9e3b2e] shrink-0">
                    <Flower2 className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-['Noto_Serif',serif] font-bold text-lg text-[#2a2220]">
                      Không gian tưởng niệm an lành
                    </h3>
                    <p className="text-xs sm:text-sm text-[#73635b] leading-relaxed mt-1">
                      Khoảnh khắc tĩnh tại để lắng nghe lòng mình, thắp một ngọn đèn lành cho sự bình an nội tại.
                      Không ràng buộc nghi thức, chỉ hướng về lòng thành.
                    </p>
                  </div>
                </div>

                {/* Light Lamp Action Button */}
                <button
                  type="button"
                  onClick={() => setIsLampLit((prev) => !prev)}
                  className={`w-full py-3.5 px-4 rounded-2xl border font-medium text-sm transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-xs ${
                    isLampLit
                      ? "bg-[#fff5e8] border-[#f4c688] text-[#935914] shadow-[#f8dfb8]/50"
                      : "bg-[#faece1] hover:bg-[#f6dfd0] border-[#edd2c0] text-[#7a483a]"
                  }`}
                >
                  <Flame
                    className={`w-4 h-4 transition-transform duration-300 ${
                      isLampLit ? "text-[#c97a2b] scale-125 animate-pulse" : "text-[#9e3b2e]"
                    }`}
                  />
                  <span>
                    {isLampLit
                      ? "Ngọn đèn đã được thắp sáng • Tâm an hòa"
                      : "Chạm để thắp sáng lời tri ân"}
                  </span>
                </button>
              </div>
            </div>

            {/* Classical Quote Card */}
            <div className="p-5 rounded-2xl bg-[#fbf5ec] border border-[#ecd9c7] flex items-start gap-3.5">
              <div className="w-8 h-8 rounded-full bg-[#f4e2ce] text-[#9e3b2e] flex items-center justify-center shrink-0 mt-0.5">
                <Sparkles className="w-4 h-4" />
              </div>
              <div className="text-sm">
                <p className="italic text-[#4a3b34] font-['Noto_Serif',serif] leading-relaxed">
                  “Cây có gốc mới nở cành xanh ngọn, nước có nguồn mới biển rộng sông sâu.”
                </p>
                <p className="text-xs text-[#8a776e] mt-1.5 font-medium">
                  — Lời nhắc nhở về cội nguồn và lòng biết ơn.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column (7 Cols): Express & Send Gratitude Form */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-3xl border border-[#eedcd0] p-6 sm:p-8 shadow-xs">
              {/* Form Header */}
              <div className="mb-5">
                <span className="text-xs font-bold tracking-widest text-[#a89085] uppercase">
                  BÀY TỎ & GỬI GẮM
                </span>
                <h2 className="font-['Noto_Serif',serif] font-bold text-2xl text-[#2a2220] mt-1">
                  Hôm nay bạn muốn gửi lời tri ân nào?
                </h2>
              </div>

              {/* Text Area */}
              <div className="relative">
                <textarea
                  rows={6}
                  value={content}
                  maxLength={maxChars}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Viết đôi dòng nhắn gửi lòng biết ơn đến gia đình, người thương, hoặc tiền nhân đã nâng đỡ bước chân bạn... Lời viết chân thành tự khắc soi sáng tâm tư."
                  className="w-full p-4 rounded-2xl border border-[#ebd8cb] focus:border-[#9e3b2e] focus:ring-2 focus:ring-[#9e3b2e]/10 outline-none text-[#2a2220] placeholder-[#aa9991] text-sm leading-relaxed resize-none transition-all bg-[#fffdfb]"
                />

                {/* Counter & Clear Button */}
                <div className="flex items-center justify-between text-xs text-[#8e7e76] mt-2 px-1">
                  <button
                    type="button"
                    onClick={handleClear}
                    disabled={!content}
                    className="inline-flex items-center gap-1 hover:text-[#9e3b2e] disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
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
              <div className="mt-6 pt-5 border-t border-[#f4e8dc]">
                <h4 className="text-sm font-bold text-[#2a2220] mb-3">
                  Chọn hình thức gửi gắm:
                </h4>

                <div className="space-y-3">
                  {/* Option 1: Ephemeral Release */}
                  <label
                    onClick={() => setSendMode("ephemeral")}
                    className={`block p-4 rounded-2xl border cursor-pointer transition-all ${
                      sendMode === "ephemeral"
                        ? "bg-[#fbf4eb] border-[#d8bca7] shadow-xs"
                        : "bg-white hover:bg-[#faf5ee] border-[#ebd8cb]"
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className="pt-0.5">
                        <div
                          className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                            sendMode === "ephemeral"
                              ? "border-[#9e3b2e] bg-white"
                              : "border-[#caa896] bg-white"
                          }`}
                        >
                          {sendMode === "ephemeral" && (
                            <div className="w-2 h-2 rounded-full bg-[#9e3b2e]"></div>
                          )}
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-1.5 font-bold text-sm text-[#2a2220]">
                          <span>Gửi biểu tượng rồi buông xuống</span>
                          <span className="text-[#9e3b2e]">●</span>
                        </div>
                        <p className="text-xs text-[#73635b] leading-relaxed mt-1">
                          Lời tri ân sẽ hóa thành một làn hương thơm hoặc cánh sen thả trôi vô vi trong tâm tưởng.
                          Hệ thống hoàn toàn không lưu giữ lời viết của bạn.
                        </p>
                      </div>
                    </div>
                  </label>

                  {/* Option 2: Save to Account */}
                  <label
                    onClick={() => setSendMode("save")}
                    className={`block p-4 rounded-2xl border cursor-pointer transition-all ${
                      sendMode === "save"
                        ? "bg-[#fbf4eb] border-[#d8bca7] shadow-xs"
                        : "bg-white hover:bg-[#faf5ee] border-[#ebd8cb]"
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className="pt-0.5">
                        <div
                          className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                            sendMode === "save"
                              ? "border-[#9e3b2e] bg-white"
                              : "border-[#caa896] bg-white"
                          }`}
                        >
                          {sendMode === "save" && (
                            <div className="w-2 h-2 rounded-full bg-[#9e3b2e]"></div>
                          )}
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center flex-wrap gap-2 font-bold text-sm text-[#2a2220]">
                          <span>Lưu riêng để đọc lại</span>
                          <span className="px-2 py-0.5 rounded-full text-[11px] font-normal bg-[#faede2] text-[#9e3b2e] border border-[#eed7c7]">
                            {user ? `Đang ở phiên ${user.name}` : "Cần đăng nhập"}
                          </span>
                        </div>
                        <p className="text-xs text-[#73635b] leading-relaxed mt-1">
                          Lời tri ân sẽ được lưu kín đáo trong "Góc của tôi" để bạn có thể xem lại khi cần một điểm tựa an lành.
                        </p>
                      </div>
                    </div>
                  </label>
                </div>
              </div>

              {/* Status Message (Releasing or Saved) */}
              {releaseStatus === "released" && (
                <div className="mt-5 p-4 rounded-2xl bg-[#f0f8f1] border border-[#c8e5cc] text-[#245e31] text-sm flex items-start gap-3 animate-fadeIn">
                  <CheckCircle2 className="w-5 h-5 shrink-0 mt-0.5 text-[#2e7d32]" />
                  <div>
                    <p className="font-bold">Nén hương lòng đã được gửi đi an hòa</p>
                    <p className="text-xs text-[#3a6b43] mt-0.5 leading-relaxed">
                      Lời tri ân chân thành đã hòa vào khói hương vô vi. Chúc tâm bạn luôn an lành và vững vàng.
                    </p>
                  </div>
                </div>
              )}

              {saveSuccess && (
                <div className="mt-5 p-4 rounded-2xl bg-[#f0f8f1] border border-[#c8e5cc] text-[#245e31] text-sm flex items-start gap-3 animate-fadeIn">
                  <CheckCircle2 className="w-5 h-5 shrink-0 mt-0.5 text-[#2e7d32]" />
                  <div>
                    <p className="font-bold">Đã lưu kín đáo vào Góc của tôi</p>
                    <p className="text-xs text-[#3a6b43] mt-0.5 leading-relaxed">
                      Bạn có thể xem lại trong mục chiêm nghiệm cá nhân bất cứ lúc nào.
                    </p>
                  </div>
                </div>
              )}

              {/* Primary Action Button */}
              <div className="mt-6">
                <Button
                  onClick={handleSendOrSave}
                  disabled={!content.trim() || isSubmitting}
                  className="w-full py-4 text-base font-semibold rounded-2xl bg-[#9e3b2e] hover:bg-[#852f24] text-white shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>
                    {isSubmitting
                      ? "Đang gửi tâm tình..."
                      : sendMode === "ephemeral"
                      ? "Gửi nén hương lòng & Buông xuống"
                      : "Lưu lời tri ân vào Góc của tôi"}
                  </span>
                </Button>
              </div>

              {/* Bottom culture link */}
              {onGoToCulture && (
                <div className="mt-5 text-center">
                  <button
                    onClick={onGoToCulture}
                    className="inline-flex items-center gap-1.5 text-xs text-[#7e6d64] hover:text-[#9e3b2e] transition-colors cursor-pointer group"
                  >
                    <BookOpen className="w-3.5 h-3.5 text-[#9e3b2e]" />
                    <span>Tìm hiểu phong tục tưởng nhớ gia tiên và đạo hiếu trong văn hóa Việt</span>
                    <span className="group-hover:translate-x-0.5 transition-transform">→</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Disclaimer / Transparency Box */}
        <div className="mt-10 p-5 rounded-2xl bg-[#faede2]/80 border border-[#ecd9cb] flex items-start gap-3.5 text-xs text-[#73635b] leading-relaxed">
          <Info className="w-4 h-4 text-[#9e3b2e] shrink-0 mt-0.5" />
          <div>
            <span className="font-bold text-[#382b26]">Lưu ý chân thành từ Tin Lắm Tâm Linh: </span>
            Đây là hoạt động chiêm nghiệm mang tính biểu tượng; nội dung bản demo được lưu trên trình duyệt nếu bạn chọn lưu riêng.
            Nền tảng hướng trọn vẹn đến sự lắng đọng và nuôi dưỡng tâm từ, không phục vụ mục đích thương mại hóa hay tín ngưỡng dị đoan.
          </div>
        </div>

        {/* Closing Calm Banner */}
        <div className="mt-16 text-center">
          <p className="font-['Noto_Serif',serif] italic font-semibold text-xl sm:text-2xl text-[#9e3b2e] mb-1">
            “Tâm bình thế giới bình, lòng an vạn sự tỏ”
          </p>
          <span className="text-xs uppercase tracking-widest text-[#95837b] font-semibold">
            LỜI NHẮC AN YÊN MỖI SỚM MAI
          </span>
        </div>
      </div>
    </div>
  );
};
