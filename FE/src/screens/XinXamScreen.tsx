import React, { useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Sparkles,
  Home,
  Compass,
  CheckCircle2,
  Check,
  RotateCcw,
  Flower2,
  Info,
  Scale,
  Download,
  Share2,
  ExternalLink,
  ShieldCheck,
  Waves,
  Sun,
  Flame,
} from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { Badge } from "@/src/components/ui/badge";
import { Card } from "@/src/components/ui/card";
import {
  RegionType,
  TopicType,
  getXinXamResult,
  XinXamResult,
} from "../data/xinXamData";

interface XinXamScreenProps {
  onBackToExperienceHome?: () => void;
  onGoToArticle?: (articleId: string) => void;
  onSaveToAccount?: (result: XinXamResult) => void;
  onGoToLogin?: () => void;
  onGoToExplore?: () => void;
  isLoggedIn?: boolean;
}

export const XinXamScreen: React.FC<XinXamScreenProps> = ({
  onBackToExperienceHome,
  onGoToArticle,
  onSaveToAccount,
  onGoToLogin,
  onGoToExplore,
  isLoggedIn = false,
}) => {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [selectedRegion, setSelectedRegion] = useState<RegionType>("Bắc Bộ");
  const [selectedTopic, setSelectedTopic] = useState<TopicType>("Bình an");

  // Step 2 Interactive States
  const [demoState, setDemoState] = useState<"A" | "B" | "C">("A");
  const [isShaking, setIsShaking] = useState(false);
  const [isGentleMotion, setIsGentleMotion] = useState(true);
  const [showGuideModal, setShowGuideModal] = useState(false);

  // Step 3 State
  const [isActionDone, setIsActionDone] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const currentResult: XinXamResult = getXinXamResult(selectedRegion, selectedTopic);

  const handleStartDraw = () => {
    setIsShaking(true);
    setDemoState("B");
    setTimeout(() => {
      setDemoState("C");
      setIsShaking(false);
      setTimeout(() => {
        setStep(3);
        window.scrollTo({ top: 0, behavior: "smooth" });
      }, 700);
    }, 1200);
  };

  const handleSaveResult = () => {
    setIsSaved(true);
    if (onSaveToAccount) {
      onSaveToAccount(currentResult);
    }
  };

  return (
    <div className="w-full min-h-screen bg-[#fcf8f2] text-[#2e2624] font-['Be_Vietnam_Pro',sans-serif]">
      <main className="max-w-5xl mx-auto px-4 sm:px-6 pt-6 pb-20">
        {/* =========================================================================
            BƯỚC 1: KHỞI TÂM NGUYỆN (IMAGE 1)
           ========================================================================= */}
        {step === 1 && (
          <div>
            {/* Top Breadcrumb & Step Badge */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4 text-xs text-[#8a7971]">
              <div className="flex items-center gap-2">
                <span className="hover:text-[#9e3b2e] cursor-pointer">Trải nghiệm</span>
                <span>/</span>
                <span className="text-[#9e3b2e] font-semibold">Xin xăm văn hóa</span>
              </div>

              <div className="flex items-center gap-1.5 uppercase font-semibold text-[11px] text-[#938279]">
                <span className="w-2 h-2 rounded-full bg-[#9e3b2e] inline-block"></span>
                <span>BƯỚC 1 / 3 • KHỞI TÂM NGUYỆN – CHIÊM NGHIỆM BA MIỀN</span>
              </div>
            </div>

            {/* Heading & Subtitle */}
            <div className="mb-10 text-left">
              <h1 className="font-['Noto_Serif',serif] font-bold text-3xl sm:text-4xl lg:text-[40px] text-[#2a2220] leading-tight mb-3">
                Chọn một điều bạn muốn chiêm nghiệm
              </h1>
              <p className="text-sm sm:text-base text-[#6f5e57] leading-relaxed max-w-3xl">
                Đây là trải nghiệm tìm hiểu văn hóa và suy ngẫm, gợi mở góc nhìn bình an
                cho tâm trí – hoàn toàn mang tinh thần lắng đọng nội tâm, không mang tính
                tiên tri hay dự đoán chắc chắn tương lai.
              </p>
            </div>

            {/* Section 1: Chọn không gian văn hóa gợi mở */}
            <section className="mb-10">
              <div className="flex items-center gap-2.5 mb-2">
                <span className="w-6 h-6 rounded-full bg-[#9e3b2e] text-white text-xs font-bold flex items-center justify-center">
                  1
                </span>
                <h3 className="font-['Noto_Serif',serif] font-bold text-xl sm:text-2xl text-[#2a2220]">
                  Chọn không gian văn hóa gợi mở
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-[#78665f] mb-6 pl-8">
                Khám phá phong thổ và chiều sâu tâm thức ba miền. Mỗi vùng đất mang một
                sắc thái riêng thuần hậu, không áp đặt một khuôn mẫu duy nhất:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pl-0 sm:pl-8">
                {/* Bắc Bộ */}
                <Card
                  onClick={() => setSelectedRegion("Bắc Bộ")}
                  className={`p-5 rounded-3xl cursor-pointer transition-all duration-300 relative flex flex-col justify-between ${
                    selectedRegion === "Bắc Bộ"
                      ? "bg-white border-[#9e3b2e] shadow-md ring-1 ring-[#9e3b2e]/30"
                      : "bg-[#fffdfa] border-[#ecdcd0] hover:border-[#dfc3af]"
                  }`}
                >
                  <div>
                    <div className="relative h-44 rounded-2xl overflow-hidden mb-4 bg-[#faede2]">
                      <img
                        src="/images/temple_bac_bo.jpg"
                        alt="Không gian Trầm mặc Xứ Bắc"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-full bg-black/60 text-[11px] font-semibold text-white">
                        BẮC BỘ
                      </div>
                      <div
                        className={`absolute top-2.5 right-2.5 w-6 h-6 rounded-full flex items-center justify-center transition-all ${
                          selectedRegion === "Bắc Bộ"
                            ? "bg-[#9e3b2e] text-white"
                            : "border-2 border-white/80 bg-black/30 text-transparent"
                        }`}
                      >
                        <Check className="w-3.5 h-3.5 stroke-[3]" />
                      </div>
                    </div>

                    <h4 className="font-['Noto_Serif',serif] font-bold text-lg text-[#2a2220] mb-1.5">
                      Không gian Trầm mặc Xứ Bắc
                    </h4>
                    <p className="text-xs text-[#705e57] leading-relaxed">
                      Gợi nhắc nét tôn nghiêm nơi sân đình, mái ngói rêu phong và ước vọng
                      thái bình ngàn đời của làng xã châu thổ sông Hồng.
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-[#f4e8dc] flex items-center justify-between text-xs text-[#8a7870]">
                    <span className="flex items-center gap-1.5 font-medium">
                      <span
                        className={`w-2 h-2 rounded-full ${
                          selectedRegion === "Bắc Bộ" ? "bg-[#9e3b2e]" : "bg-[#c7b6ab]"
                        }`}
                      />
                      <span>
                        {selectedRegion === "Bắc Bộ"
                          ? "Đang chọn không gian này"
                          : "Chọn không gian này"}
                      </span>
                    </span>
                    <Flower2 className="w-4 h-4 text-[#9e3b2e]" />
                  </div>
                </Card>

                {/* Trung Bộ */}
                <Card
                  onClick={() => setSelectedRegion("Trung Bộ")}
                  className={`p-5 rounded-3xl cursor-pointer transition-all duration-300 relative flex flex-col justify-between ${
                    selectedRegion === "Trung Bộ"
                      ? "bg-white border-[#9e3b2e] shadow-md ring-1 ring-[#9e3b2e]/30"
                      : "bg-[#fffdfa] border-[#ecdcd0] hover:border-[#dfc3af]"
                  }`}
                >
                  <div>
                    <div className="relative h-44 rounded-2xl overflow-hidden mb-4 bg-[#faede2]">
                      <img
                        src="/images/hue_trung_bo.jpg"
                        alt="Nét Giao thoa Xứ Huế & Miền Trung"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-full bg-black/60 text-[11px] font-semibold text-white">
                        TRUNG BỘ
                      </div>
                      <div
                        className={`absolute top-2.5 right-2.5 w-6 h-6 rounded-full flex items-center justify-center transition-all ${
                          selectedRegion === "Trung Bộ"
                            ? "bg-[#9e3b2e] text-white"
                            : "border-2 border-white/80 bg-black/30 text-transparent"
                        }`}
                      >
                        <Check className="w-3.5 h-3.5 stroke-[3]" />
                      </div>
                    </div>

                    <h4 className="font-['Noto_Serif',serif] font-bold text-lg text-[#2a2220] mb-1.5">
                      Nét Giao thoa Xứ Huế & Miền Trung
                    </h4>
                    <p className="text-xs text-[#705e57] leading-relaxed">
                      Hòa quyện giữa chất trầm tư kinh kỳ, sông nước Hương giang u tịch và
                      tín ngưỡng Mẫu thuần hậu chở che qua bao thăng trầm.
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-[#f4e8dc] flex items-center justify-between text-xs text-[#8a7870]">
                    <span className="flex items-center gap-1.5 font-medium">
                      <span
                        className={`w-2 h-2 rounded-full ${
                          selectedRegion === "Trung Bộ" ? "bg-[#9e3b2e]" : "bg-[#c7b6ab]"
                        }`}
                      />
                      <span>
                        {selectedRegion === "Trung Bộ"
                          ? "Đang chọn không gian này"
                          : "Chọn không gian này"}
                      </span>
                    </span>
                    <Waves className="w-4 h-4 text-[#9e3b2e]" />
                  </div>
                </Card>

                {/* Nam Bộ */}
                <Card
                  onClick={() => setSelectedRegion("Nam Bộ")}
                  className={`p-5 rounded-3xl cursor-pointer transition-all duration-300 relative flex flex-col justify-between ${
                    selectedRegion === "Nam Bộ"
                      ? "bg-white border-[#9e3b2e] shadow-md ring-1 ring-[#9e3b2e]/30"
                      : "bg-[#fffdfa] border-[#ecdcd0] hover:border-[#dfc3af]"
                  }`}
                >
                  <div>
                    <div className="relative h-44 rounded-2xl overflow-hidden mb-4 bg-[#faede2]">
                      <img
                        src="/images/mekong_nam_bo.jpg"
                        alt="Hồn Phù sa Khoáng đạt Phương Nam"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-full bg-black/60 text-[11px] font-semibold text-white">
                        NAM BỘ
                      </div>
                      <div
                        className={`absolute top-2.5 right-2.5 w-6 h-6 rounded-full flex items-center justify-center transition-all ${
                          selectedRegion === "Nam Bộ"
                            ? "bg-[#9e3b2e] text-white"
                            : "border-2 border-white/80 bg-black/30 text-transparent"
                        }`}
                      >
                        <Check className="w-3.5 h-3.5 stroke-[3]" />
                      </div>
                    </div>

                    <h4 className="font-['Noto_Serif',serif] font-bold text-lg text-[#2a2220] mb-1.5">
                      Hồn Phù sa Khoáng đạt Phương Nam
                    </h4>
                    <p className="text-xs text-[#705e57] leading-relaxed">
                      Không gian ấm áp ven dòng Cửu Long, gửi gắm tinh thần bao dung, hào
                      sảng, mộc mạc và chân thành của cư dân châu thổ.
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-[#f4e8dc] flex items-center justify-between text-xs text-[#8a7870]">
                    <span className="flex items-center gap-1.5 font-medium">
                      <span
                        className={`w-2 h-2 rounded-full ${
                          selectedRegion === "Nam Bộ" ? "bg-[#9e3b2e]" : "bg-[#c7b6ab]"
                        }`}
                      />
                      <span>
                        {selectedRegion === "Nam Bộ"
                          ? "Đang chọn không gian này"
                          : "Chọn không gian này"}
                      </span>
                    </span>
                    <Sun className="w-4 h-4 text-[#9e3b2e]" />
                  </div>
                </Card>
              </div>
            </section>

            {/* Section 2: Chọn chủ đề bạn đang lắng đọng */}
            <section className="mb-10">
              <div className="flex items-center gap-2.5 mb-2">
                <span className="w-6 h-6 rounded-full bg-[#9e3b2e] text-white text-xs font-bold flex items-center justify-center">
                  2
                </span>
                <h3 className="font-['Noto_Serif',serif] font-bold text-xl sm:text-2xl text-[#2a2220]">
                  Chọn chủ đề bạn đang lắng đọng
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-[#78665f] mb-6 pl-8">
                Chọn đúng một khía cạnh bạn muốn đón nhận lời gửi gắm hôm nay:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 pl-0 sm:pl-8">
                {/* 1. Học tập */}
                <Card
                  onClick={() => setSelectedTopic("Học tập")}
                  className={`p-5 rounded-3xl cursor-pointer transition-all duration-300 relative flex flex-col justify-between ${
                    selectedTopic === "Học tập"
                      ? "bg-white border-[#9e3b2e] shadow-md ring-1 ring-[#9e3b2e]/30"
                      : "bg-[#fffdfa] border-[#ecdcd0] hover:border-[#dfc3af]"
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className="w-9 h-9 rounded-xl bg-[#faede2] flex items-center justify-center text-[#9e3b2e]">
                        <BookOpen className="w-4 h-4" />
                      </div>
                      <div
                        className={`w-5 h-5 rounded-full flex items-center justify-center ${
                          selectedTopic === "Học tập"
                            ? "bg-[#9e3b2e] text-white"
                            : "border-2 border-[#eddcd0] bg-white text-transparent"
                        }`}
                      >
                        <Check className="w-3 h-3 stroke-[3]" />
                      </div>
                    </div>
                    <h4 className="font-['Noto_Serif',serif] font-bold text-lg text-[#2a2220] mb-1.5">
                      Học tập
                    </h4>
                    <p className="text-xs text-[#705e57] leading-relaxed mb-4">
                      Định tâm, mở mang trí tuệ & thông tuệ trước trang sách đời.
                    </p>
                  </div>
                  <div className="text-xs font-semibold text-[#9e3b2e] flex items-center gap-1">
                    <span>Khởi sáng tri thức</span>
                    <ArrowRight className="w-3 h-3" />
                  </div>
                </Card>

                {/* 2. Công việc */}
                <Card
                  onClick={() => setSelectedTopic("Công việc")}
                  className={`p-5 rounded-3xl cursor-pointer transition-all duration-300 relative flex flex-col justify-between ${
                    selectedTopic === "Công việc"
                      ? "bg-white border-[#9e3b2e] shadow-md ring-1 ring-[#9e3b2e]/30"
                      : "bg-[#fffdfa] border-[#ecdcd0] hover:border-[#dfc3af]"
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className="w-9 h-9 rounded-xl bg-[#faede2] flex items-center justify-center text-[#9e3b2e]">
                        <Compass className="w-4 h-4" />
                      </div>
                      <div
                        className={`w-5 h-5 rounded-full flex items-center justify-center ${
                          selectedTopic === "Công việc"
                            ? "bg-[#9e3b2e] text-white"
                            : "border-2 border-[#eddcd0] bg-white text-transparent"
                        }`}
                      >
                        <Check className="w-3 h-3 stroke-[3]" />
                      </div>
                    </div>
                    <h4 className="font-['Noto_Serif',serif] font-bold text-lg text-[#2a2220] mb-1.5">
                      Công việc
                    </h4>
                    <p className="text-xs text-[#705e57] leading-relaxed mb-4">
                      Kiên định, hanh thông trước mọi dự định và thử thách mới.
                    </p>
                  </div>
                  <div className="text-xs font-semibold text-[#9e3b2e] flex items-center gap-1">
                    <span>Thuận buồm xuôi gió</span>
                    <ArrowRight className="w-3 h-3" />
                  </div>
                </Card>

                {/* 3. Gia đình */}
                <Card
                  onClick={() => setSelectedTopic("Gia đình")}
                  className={`p-5 rounded-3xl cursor-pointer transition-all duration-300 relative flex flex-col justify-between ${
                    selectedTopic === "Gia đình"
                      ? "bg-white border-[#9e3b2e] shadow-md ring-1 ring-[#9e3b2e]/30"
                      : "bg-[#fffdfa] border-[#ecdcd0] hover:border-[#dfc3af]"
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className="w-9 h-9 rounded-xl bg-[#faede2] flex items-center justify-center text-[#9e3b2e]">
                        <Home className="w-4 h-4" />
                      </div>
                      <div
                        className={`w-5 h-5 rounded-full flex items-center justify-center ${
                          selectedTopic === "Gia đình"
                            ? "bg-[#9e3b2e] text-white"
                            : "border-2 border-[#eddcd0] bg-white text-transparent"
                        }`}
                      >
                        <Check className="w-3 h-3 stroke-[3]" />
                      </div>
                    </div>
                    <h4 className="font-['Noto_Serif',serif] font-bold text-lg text-[#2a2220] mb-1.5">
                      Gia đình
                    </h4>
                    <p className="text-xs text-[#705e57] leading-relaxed mb-4">
                      Gắn kết, thấu hiểu & giữ cho nếp nhà luôn ấm êm thuận hòa.
                    </p>
                  </div>
                  <div className="text-xs font-semibold text-[#9e3b2e] flex items-center gap-1">
                    <span>Mái ấm an hòa</span>
                    <ArrowRight className="w-3 h-3" />
                  </div>
                </Card>

                {/* 4. Bình an */}
                <Card
                  onClick={() => setSelectedTopic("Bình an")}
                  className={`p-5 rounded-3xl cursor-pointer transition-all duration-300 relative flex flex-col justify-between ${
                    selectedTopic === "Bình an"
                      ? "bg-white border-[#9e3b2e] shadow-md ring-1 ring-[#9e3b2e]/30"
                      : "bg-[#fffdfa] border-[#ecdcd0] hover:border-[#dfc3af]"
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className="w-9 h-9 rounded-xl bg-[#faede2] flex items-center justify-center text-[#9e3b2e]">
                        <Flower2 className="w-4 h-4" />
                      </div>
                      <div
                        className={`w-5 h-5 rounded-full flex items-center justify-center ${
                          selectedTopic === "Bình an"
                            ? "bg-[#9e3b2e] text-white"
                            : "border-2 border-[#eddcd0] bg-white text-transparent"
                        }`}
                      >
                        <Check className="w-3 h-3 stroke-[3]" />
                      </div>
                    </div>
                    <h4 className="font-['Noto_Serif',serif] font-bold text-lg text-[#2a2220] mb-1.5">
                      Bình an
                    </h4>
                    <p className="text-xs text-[#705e57] leading-relaxed mb-4">
                      Thanh lọc âu lo, nuôi dưỡng sự tĩnh tại và an yên trong lòng.
                    </p>
                  </div>
                  <div className="text-xs font-semibold text-[#9e3b2e] flex items-center gap-1">
                    <span>Tâm sáng an nhiên</span>
                    <ArrowRight className="w-3 h-3" />
                  </div>
                </Card>
              </div>
            </section>

            {/* Selection Summary Callout Box */}
            <Card className="p-6 rounded-3xl bg-[#fbece1]/80 border border-[#ecd5c4] flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-10 shadow-2xs">
              <div>
                <div className="text-[11px] font-bold uppercase tracking-wider text-[#9e3b2e] mb-1">
                  ◎ TÓM TẮT LỰA CHỌN CỦA BẠN
                </div>
                <div className="text-lg font-bold text-[#2a211e] mb-1 font-['Noto_Serif',serif]">
                  Bạn đã chọn:{" "}
                  <span className="text-[#9e3b2e]">
                    {selectedRegion} • {selectedTopic}
                  </span>
                </div>
                <div className="text-xs text-[#73635b] italic">
                  ✦ Gợi ý: Hãy giữ hơi thở nhẹ nhàng và tâm thế thả lỏng trước khi rút thẻ
                  xăm.
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
                {onBackToExperienceHome && (
                  <Button
                    variant="outline"
                    size="default"
                    onClick={onBackToExperienceHome}
                    className="w-full sm:w-auto text-xs border-[#e4ccba] text-[#73625b]"
                  >
                    <ArrowLeft className="w-3.5 h-3.5 mr-1" />
                    <span>Quay lại Trải nghiệm</span>
                  </Button>
                )}

                <Button
                  variant="default"
                  size="default"
                  onClick={() => {
                    setStep(2);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  className="w-full sm:w-auto font-semibold shadow-xs gap-2"
                >
                  <span>Tiếp tục rút thẻ</span>
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </Card>

            {/* Editorial Principle Disclaimer */}
            <div className="p-5 rounded-2xl bg-[#faf3ec] border border-[#eddcd0] flex items-start gap-3.5 text-xs text-[#73615a] leading-relaxed mb-12">
              <Info className="w-5 h-5 text-[#9e3b2e] flex-shrink-0 mt-0.5" />
              <div>
                <div className="font-bold text-[#8d2f23] uppercase tracking-wider mb-1">
                  GHI CHÚ VĂN HÓA & NGUYÊN TẮC TRẢI NGHIỆM
                </div>
                <p>
                  Tin Lắm Tâm Linh tiếp cận tập tục xin xăm dưới lăng kính nhân học và mỹ
                  học dân gian, như một khoảnh khắc dừng lại lắng nghe nội tâm giữa nhịp
                  sống hiện đại. Toàn bộ hình ảnh, câu chữ và tri thức văn hóa ba miền đều
                  đang được đối chiếu thận trọng cùng các nhà nghiên cứu di sản.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* =========================================================================
            BƯỚC 2: LẮNG ĐỘNG RÚT THẺ (IMAGE 2)
           ========================================================================= */}
        {step === 2 && (
          <div>
            {/* Top Breadcrumb & Step Badge */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4 text-xs text-[#8a7971]">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setStep(1)}
                  className="hover:text-[#9e3b2e] cursor-pointer"
                >
                  Trải nghiệm
                </button>
                <span>›</span>
                <span>Xin xăm văn hóa</span>
                <span>›</span>
                <span className="text-[#9e3b2e] font-semibold">Bước 2: Rút thẻ</span>
              </div>

              <div className="flex items-center gap-1.5 uppercase font-semibold text-[11px] text-[#938279]">
                <span className="w-2 h-2 rounded-full bg-[#9e3b2e] inline-block"></span>
                <span>
                  BƯỚC 2 / 3 • LẮNG ĐỘNG RÚT THẺ – {selectedRegion.toUpperCase()} &{" "}
                  {selectedTopic.toUpperCase()}
                </span>
              </div>
            </div>

            {/* Active Choice Context Bar */}
            <div className="mb-8 p-3 rounded-2xl bg-[#faf2ea] border border-[#ebd6c5] flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-[#715f57]">
              <div className="flex items-center gap-2">
                <Flower2 className="w-4 h-4 text-[#9e3b2e]" />
                <span>
                  Lựa chọn trước đó:{" "}
                  <strong className="text-[#9e3b2e]">{selectedRegion}</strong> (
                  {currentResult.regionSub}) • Ý niệm:{" "}
                  <strong className="text-[#9e3b2e]">{selectedTopic}</strong> (
                  {currentResult.topicTag})
                </span>
              </div>

              <button
                onClick={() => setStep(1)}
                className="text-xs text-[#9e3b2e] hover:underline font-semibold cursor-pointer self-end sm:self-auto"
              >
                ← Đổi lựa chọn
              </button>
            </div>

            {/* Big Serif Heading */}
            <div className="text-center max-w-2xl mx-auto mb-8">
              <h1 className="font-['Noto_Serif',serif] font-bold text-3xl sm:text-4xl text-[#2a2220] leading-tight mb-3">
                Lắng lòng và rút một thẻ xăm
              </h1>
              <p className="text-sm text-[#73635b] leading-relaxed">
                Giữ hơi thở chậm rãi, tĩnh tâm trong một khoảnh khắc ngắn. Thẻ xăm mở ra một
                góc nhìn suy ngẫm cổ truyền, gợi ý thái độ an nhiên trước đời sống thường
                nhật.
              </p>
            </div>

            {/* Interactive Preview State Pills */}
            <div className="flex flex-wrap items-center justify-center gap-2 mb-8 text-xs">
              <button
                onClick={() => setDemoState("A")}
                className={`px-3.5 py-1.5 rounded-full font-medium transition-all cursor-pointer ${
                  demoState === "A"
                    ? "bg-[#9e3b2e] text-white shadow-2xs font-semibold"
                    : "bg-[#fbf4ed] text-[#715f57] border border-[#ecd9cb]"
                }`}
              >
                ● A: Trước khi rút
              </button>
              <button
                onClick={() => setDemoState("B")}
                className={`px-3.5 py-1.5 rounded-full font-medium transition-all cursor-pointer ${
                  demoState === "B"
                    ? "bg-[#9e3b2e] text-white shadow-2xs font-semibold"
                    : "bg-[#fbf4ed] text-[#715f57] border border-[#ecd9cb]"
                }`}
              >
                B: Đang rút thẻ
              </button>
              <button
                onClick={() => setDemoState("C")}
                className={`px-3.5 py-1.5 rounded-full font-medium transition-all cursor-pointer ${
                  demoState === "C"
                    ? "bg-[#9e3b2e] text-white shadow-2xs font-semibold"
                    : "bg-[#fbf4ed] text-[#715f57] border border-[#ecd9cb]"
                }`}
              >
                C: Đã rút thẻ
              </button>

              <label className="ml-2 flex items-center gap-1.5 text-xs text-[#78665f] cursor-pointer">
                <input
                  type="checkbox"
                  checked={isGentleMotion}
                  onChange={(e) => setIsGentleMotion(e.target.checked)}
                  className="rounded border-[#cfbcaf] text-[#9e3b2e] focus:ring-[#9e3b2e]"
                />
                <span>Chuyển động nhẹ nhàng</span>
              </label>
            </div>

            {/* Center Altar: The Sacred Bamboo Tube Card */}
            <Card className="max-w-xl mx-auto rounded-3xl p-8 sm:p-12 bg-white border border-[#eddcd0] shadow-md text-center relative overflow-hidden mb-10">
              {/* Concentric Circle Aura Motif */}
              <div className="relative w-64 h-64 sm:w-72 sm:h-72 mx-auto mb-6 flex items-center justify-center">
                <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#faece1]/70 via-[#f9efe5]/80 to-[#faece1]/50 animate-pulse" />
                <div className="absolute inset-4 rounded-full border border-[#f0decf]" />
                <div className="absolute inset-10 rounded-full border border-[#ebdacb] border-dashed" />

                {/* Bamboo Stick Cylinder Container */}
                <div
                  className={`relative flex flex-col items-center justify-end z-10 transition-transform duration-300 ${
                    isShaking ? "animate-bounce" : ""
                  }`}
                >
                  {/* Rising Bamboo Stick during State B & C */}
                  <div
                    className={`transition-all duration-700 ease-out flex flex-col items-center ${
                      demoState === "B" || demoState === "C"
                        ? "-translate-y-8 opacity-100"
                        : "translate-y-4 opacity-75"
                    }`}
                  >
                    <div className="w-5 h-24 sm:h-28 rounded-t-lg bg-gradient-to-b from-[#e38576] to-[#cca78e] border border-[#b85b4d] shadow-md flex items-start justify-center pt-2">
                      <span className="text-[10px] font-mono font-bold text-white [writing-mode:vertical-rl]">
                        {demoState === "C" ? `SỐ ${currentResult.stickNumber}` : "THẺ TRE"}
                      </span>
                    </div>
                  </div>

                  {/* Bamboo Tube Cylinder */}
                  <div className="w-28 sm:w-32 h-36 sm:h-40 rounded-2xl bg-gradient-to-b from-[#f5e6d8] via-[#eed5c1] to-[#e4c2a7] border-2 border-[#cfab91] shadow-inner relative flex flex-col items-center justify-between p-3">
                    <div className="w-full flex justify-between px-1 text-[9px] text-[#8e6e59] font-bold">
                      <span>✤</span>
                      <span>✤</span>
                    </div>

                    <div className="text-center my-auto">
                      <div className="w-7 h-7 mx-auto rounded-full bg-[#fcf8f3] border border-[#dfc4b1] flex items-center justify-center mb-1 text-[#9e3b2e]">
                        <Flower2 className="w-4 h-4" />
                      </div>
                      <div className="text-[11px] font-bold tracking-widest text-[#7c4d38] uppercase">
                        {selectedRegion === "Bắc Bộ"
                          ? "XỨ BẮC"
                          : selectedRegion === "Trung Bộ"
                          ? "XỨ HUẾ"
                          : "PHƯƠNG NAM"}
                      </div>
                      <div className="text-[9px] font-serif tracking-widest text-[#946e59]">
                        AN NHIÊN MÔN
                      </div>
                    </div>

                    <div className="w-full h-1.5 rounded-full bg-[#caa58a]/60"></div>
                  </div>
                </div>
              </div>

              {/* Status and instruction */}
              <div className="space-y-3 mb-6">
                <div className="text-xs text-[#95837a] italic">
                  ✦ Chỉ cần chạm nhẹ một lần • Không cần thao tác thiết bị phức tạp
                </div>
                <h3 className="font-['Noto_Serif',serif] font-bold text-xl sm:text-2xl text-[#2a2220]">
                  {demoState === "C"
                    ? `Đã hiện diện Thẻ xăm số ${currentResult.stickNumber}`
                    : "Sẵn sàng khởi niệm bình an"}
                </h3>
                <p className="text-xs sm:text-sm text-[#73625b] max-w-md mx-auto leading-relaxed">
                  {demoState === "C"
                    ? "Thẻ xăm đã mở ra, hãy bấm nút bên dưới để bước vào luận giải chiêm nghiệm cho ngày hôm nay."
                    : "Hãy thở đều một nhịp êm, thả lỏng tâm trí và rút một thẻ tre lưu dấu chiêm nghiệm cho ngày hôm nay."}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <Button
                  variant="default"
                  size="lg"
                  onClick={demoState === "C" ? () => setStep(3) : handleStartDraw}
                  disabled={isShaking}
                  className="w-full sm:w-auto px-8 py-3.5 font-semibold shadow-md gap-2 text-sm sm:text-base cursor-pointer"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>
                    {demoState === "C"
                      ? "Xem chiêm nghiệm thẻ số " + currentResult.stickNumber
                      : isShaking
                      ? "Đang lắng đọng rút thẻ..."
                      : "Rút một thẻ xăm"}
                  </span>
                </Button>

                <Button
                  variant="ghost"
                  size="default"
                  onClick={() => setShowGuideModal(true)}
                  className="text-xs text-[#7d6d66] hover:text-[#9e3b2e]"
                >
                  <Info className="w-3.5 h-3.5 mr-1" />
                  <span>Xem hướng dẫn chiêm nghiệm</span>
                </Button>
              </div>

              {/* Footer info in tube card */}
              <div className="mt-8 pt-4 border-t border-[#f4e8dc] flex items-center justify-between text-xs text-[#918178]">
                <span className="flex items-center gap-1.5">
                  <span>⛩</span>
                  <span>Không gian văn hóa tín ngưỡng dân gian</span>
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#caa58a]"></span>
                  <span className="w-2 h-2 rounded-full bg-[#9e3b2e]"></span>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#caa58a]"></span>
                </span>
                <span>Bước 2 của 3</span>
              </div>
            </Card>

            {/* 3 State Explanation Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">
              <Card
                onClick={() => setDemoState("A")}
                className={`p-5 rounded-2xl cursor-pointer transition-all ${
                  demoState === "A"
                    ? "bg-white border-[#9e3b2e] shadow-xs"
                    : "bg-[#fffdfa] border-[#ecdcd0]"
                }`}
              >
                <div className="text-[11px] font-bold uppercase tracking-wider text-[#9e3b2e] mb-1">
                  TRẠNG THÁI 1
                </div>
                <h4 className="font-['Noto_Serif',serif] font-bold text-base text-[#2a2220] mb-1.5">
                  Trước khi rút (Khởi tâm)
                </h4>
                <p className="text-xs text-[#73635b] leading-relaxed mb-3">
                  Ống xăm gỗ tĩnh lặng với các thẻ tre resting tự nhiên. Hướng dẫn tâm
                  thế an hòa.
                </p>
                <div className="text-xs text-[#9e3b2e] font-semibold flex items-center gap-1">
                  <span>Chọn xem trạng thái này</span>
                  <ArrowRight className="w-3 h-3" />
                </div>
              </Card>

              <Card
                onClick={() => setDemoState("B")}
                className={`p-5 rounded-2xl cursor-pointer transition-all ${
                  demoState === "B"
                    ? "bg-white border-[#9e3b2e] shadow-xs"
                    : "bg-[#fffdfa] border-[#ecdcd0]"
                }`}
              >
                <div className="text-[11px] font-bold uppercase tracking-wider text-[#9e3b2e] mb-1">
                  TRẠNG THÁI 2
                </div>
                <h4 className="font-['Noto_Serif',serif] font-bold text-base text-[#2a2220] mb-1.5">
                  Đang rút (Lắng đọng)
                </h4>
                <p className="text-xs text-[#73635b] leading-relaxed mb-3">
                  Một thẻ tre nhô lên nhịp nhàng cùng hào quang ấm, thanh tiến trình và
                  câu châm ngôn sâu sắc.
                </p>
                <div className="text-xs text-[#9e3b2e] font-semibold flex items-center gap-1">
                  <span>Chọn xem trạng thái này</span>
                  <ArrowRight className="w-3 h-3" />
                </div>
              </Card>

              <Card
                onClick={() => setDemoState("C")}
                className={`p-5 rounded-2xl cursor-pointer transition-all ${
                  demoState === "C"
                    ? "bg-white border-[#9e3b2e] shadow-xs"
                    : "bg-[#fffdfa] border-[#ecdcd0]"
                }`}
              >
                <div className="text-[11px] font-bold uppercase tracking-wider text-[#9e3b2e] mb-1">
                  TRẠNG THÁI 3
                </div>
                <h4 className="font-['Noto_Serif',serif] font-bold text-base text-[#2a2220] mb-1.5">
                  Đã rút thẻ (Hé lộ số)
                </h4>
                <p className="text-xs text-[#73635b] leading-relaxed mb-3">
                  Hiển thị số thẻ và ấn triện phong thái cổ truyền, giữ trọn vẹn sự kín đáo
                  trước khi luận giải.
                </p>
                <div className="text-xs text-[#9e3b2e] font-semibold flex items-center gap-1">
                  <span>Chọn xem trạng thái này</span>
                  <ArrowRight className="w-3 h-3" />
                </div>
              </Card>
            </div>

            {/* Cultural & Legal Philosophy Banner */}
            <Card className="p-6 rounded-3xl bg-[#fbece1]/80 border border-[#ecd5c4] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 mb-12 shadow-2xs">
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-2xl bg-[#faede2] flex items-center justify-center text-[#9e3b2e] flex-shrink-0">
                  <Scale className="w-5 h-5 text-[#9e3b2e]" />
                </div>
                <div>
                  <h4 className="font-['Noto_Serif',serif] font-bold text-base text-[#2a2220] mb-1">
                    Chiêm nghiệm văn hóa — Không mê tín dị đoan
                  </h4>
                  <p className="text-xs text-[#73635b] leading-relaxed max-w-xl">
                    Trải nghiệm chiêm nghiệm văn hóa, không phải dự báo chắc chắn tương
                    lai. Tin Lắm Tâm Linh hướng tới việc tiếp nhận di sản tập tục dân
                    gian như một liệu pháp tinh thần tích cực, vun bồi sự bình an và trân
                    trọng khoảnh khắc hiện tại.
                  </p>
                </div>
              </div>

              <div className="space-y-1.5 text-xs text-[#78665e] flex-shrink-0">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#9e3b2e]" />
                  <span>100% Miễn phí & Phi lợi nhuận</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#9e3b2e]" />
                  <span>Không quảng cáo thương mại</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#9e3b2e]" />
                  <span>Tôn trọng tuyệt đối quyền riêng tư</span>
                </div>
              </div>
            </Card>
          </div>
        )}

        {/* =========================================================================
            BƯỚC 3: KẾT QUẢ CHIÊM NGHIỆM (IMAGE 3)
           ========================================================================= */}
        {step === 3 && (
          <div>
            {/* Top Breadcrumb & Step Badge */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4 text-xs text-[#8a7971]">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setStep(1)}
                  className="hover:text-[#9e3b2e] cursor-pointer"
                >
                  Trải nghiệm
                </button>
                <span>›</span>
                <span>Xin xăm văn hóa</span>
                <span>›</span>
                <span className="text-[#9e3b2e] font-semibold">Kết quả chiêm nghiệm</span>
              </div>

              <div className="flex items-center gap-1.5 uppercase font-semibold text-[11px] text-[#938279]">
                <span className="w-2 h-2 rounded-full bg-[#9e3b2e] inline-block"></span>
                <span>BƯỚC 3 / 3 • KẾT QUẢ CHIÊM NGHIỆM</span>
              </div>
            </div>

            {/* Top Context Subheader */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-[#8a7a72] mb-6 pb-3 border-b border-[#f1e5d8]">
              <div>
                Lựa chọn của bạn:{" "}
                <strong className="text-[#9e3b2e]">{selectedRegion}</strong> (
                {currentResult.regionSub}) •{" "}
                <strong className="text-[#9e3b2e]">{selectedTopic}</strong>
              </div>
              <div className="italic text-[#96867e]">✍ Nội dung biên soạn minh họa</div>
            </div>

            {/* Main Heading & Guiding Quote */}
            <div className="mb-10 text-left">
              <h1 className="font-['Noto_Serif',serif] font-bold text-3xl sm:text-4xl text-[#2a2220] leading-tight mb-2">
                Lời gửi gắm từ Thẻ xăm số {currentResult.stickNumber}
              </h1>
              <p className="font-['Noto_Serif',serif] italic text-base sm:text-lg text-[#9e3b2e] font-medium leading-relaxed">
                “{currentResult.quote}”
              </p>
            </div>

            {/* Two Column Layout: Stick Card & Structured Panels */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
              {/* Left Column (5 columns): Parchment Bamboo Slip Fortune Card */}
              <div className="lg:col-span-5 space-y-4">
                <div className="rounded-3xl p-6 sm:p-8 bg-[#fffdfa] border-2 border-[#ebd6c5] shadow-md relative overflow-hidden text-center flex flex-col justify-between min-h-[500px]">
                  {/* Watermark flower background */}
                  <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-[#fbece1]/50 pointer-events-none" />

                  {/* Card Header */}
                  <div>
                    <div className="flex items-center justify-between text-[11px] uppercase tracking-wider text-[#938279] font-semibold mb-4 border-b border-[#f5e9de] pb-3">
                      <span>XĂM VIỆT ĐƯƠNG ĐẠI</span>
                      <span className="flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#be8e5a]" />
                        <span className="w-1.5 h-1.5 rounded-full bg-[#9e3b2e]" />
                      </span>
                      <span>
                        {selectedRegion === "Bắc Bộ"
                          ? "BẮC TRẦM"
                          : selectedRegion === "Trung Bộ"
                          ? "HUẾ TỊCH"
                          : "NAM HÀO"}
                      </span>
                    </div>

                    <div className="text-xs font-bold uppercase tracking-widest text-[#9e3b2e] mb-1">
                      THẺ SỐ {currentResult.stickNumber} • {selectedRegion.toUpperCase()}
                    </div>

                    <h2 className="font-['Noto_Serif',serif] font-bold text-xl sm:text-2xl text-[#2b211f] leading-snug mb-8">
                      {currentResult.title}
                    </h2>

                    {/* 4-Line Poem in Center */}
                    <div className="p-6 rounded-2xl bg-[#faf3ec]/70 border border-[#eddcd0] mb-8">
                      <p className="font-['Noto_Serif',serif] italic font-semibold text-base sm:text-lg text-[#2a2220] leading-loose">
                        “{currentResult.poem.line1}
                        <br />
                        {currentResult.poem.line2}
                        <br />
                        {currentResult.poem.line3}
                        <br />
                        {currentResult.poem.line4}”
                      </p>
                    </div>
                  </div>

                  {/* Card Bottom: Seals & Meta */}
                  <div>
                    <div className="pt-4 border-t border-[#f1e5d8] flex items-center justify-between text-xs text-[#8a7a72]">
                      <div className="text-left">
                        <div className="text-[10px] uppercase text-[#9f8f87]">
                          Thấu xăm
                        </div>
                        <div className="font-medium text-[#2e2624]">Tự soi chiếu</div>
                      </div>

                      {/* Red Traditional Stamp */}
                      <div className="w-12 h-12 rounded-xl border-2 border-[#9e3b2e] text-[#9e3b2e] flex flex-col items-center justify-center font-bold text-[10px] leading-tight rotate-[-4deg] shadow-2xs">
                        <span>{currentResult.sealText.split(" ")[0]}</span>
                        <span>{currentResult.sealText.split(" ")[1] || "NIỆM"}</span>
                      </div>

                      <div className="text-right">
                        <div className="text-[10px] uppercase text-[#9f8f87]">Ngụ ý</div>
                        <div className="font-medium text-[#2e2624]">
                          {currentResult.insight}
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 pt-3 border-t border-[#f4e8dc] flex items-center justify-between text-[11px] text-[#95837a]">
                      <span className="italic">
                        Minh họa phỏng theo thẻ xăm chiêm nghiệm dân gian
                      </span>
                      <button
                        onClick={handleSaveResult}
                        className="text-[#9e3b2e] hover:underline font-semibold flex items-center gap-1 cursor-pointer"
                        title="Lưu lại thẻ xăm"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>{isSaved ? "Đã lưu" : "Lưu thẻ"}</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Micro Tip below card */}
                <div className="p-3.5 rounded-2xl bg-[#faf3ec] border border-[#ecd9cb] text-xs text-[#77665f] leading-relaxed flex items-start gap-2">
                  <span className="text-sm">💡</span>
                  <span>
                    Bạn có thể chụp màn hình thẻ xăm này hoặc nhấn <strong>Lưu thẻ</strong>{" "}
                    để giữ lại làm câu nhắc nhở an tâm trong ngày.
                  </span>
                </div>
              </div>

              {/* Right Column (7 columns): 4 Structured Panels */}
              <div className="lg:col-span-7 space-y-6">
                {/* PHẦN 1 • SOI THẤU BẢN THÂN: Lời chiêm nghiệm cho bạn */}
                <Card className="p-6 sm:p-7 rounded-3xl bg-white border border-[#eddcd0] shadow-xs">
                  <div className="text-xs font-bold uppercase tracking-wider text-[#9e3b2e] mb-1 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>PHẦN 1 • SOI THẤU BẢN THÂN</span>
                  </div>
                  <h3 className="font-['Noto_Serif',serif] font-bold text-xl text-[#2a2220] mb-3">
                    Lời chiêm nghiệm cho bạn
                  </h3>

                  <div className="space-y-3 text-sm sm:text-base text-[#52443f] leading-relaxed mb-5">
                    {currentResult.reflectionParagraphs.map((para, pIdx) => (
                      <p key={pIdx}>{para}</p>
                    ))}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    {currentResult.tips.map((tip, tIdx) => (
                      <div
                        key={tIdx}
                        className="p-4 rounded-2xl bg-[#faf4ed] border border-[#f0e2d5]"
                      >
                        <h5 className="font-semibold text-xs text-[#9e3b2e] mb-1 flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#9e3b2e]"></span>
                          <span>{tip.title}</span>
                        </h5>
                        <p className="text-xs text-[#705e57] leading-relaxed">
                          {tip.desc}
                        </p>
                      </div>
                    ))}
                  </div>
                </Card>

                {/* PHẦN 2 • TRI THỨC DÂN GIAN: Góc nhìn văn hóa */}
                <Card className="p-6 sm:p-7 rounded-3xl bg-white border border-[#eddcd0] shadow-xs">
                  <div className="text-xs font-bold uppercase tracking-wider text-[#9e3b2e] mb-1 flex items-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>PHẦN 2 • TRI THỨC DÂN GIAN</span>
                  </div>
                  <h3 className="font-['Noto_Serif',serif] font-bold text-xl text-[#2a2220] mb-3">
                    Góc nhìn văn hóa
                  </h3>

                  <p className="text-sm sm:text-base text-[#52443f] leading-relaxed mb-4">
                    {currentResult.culturalAspect}
                  </p>

                  <div className="p-3.5 rounded-2xl bg-[#faf4ed] border border-[#ecdacb] text-xs text-[#79675f] leading-relaxed mb-4">
                    <span className="font-semibold text-[#8b3327]">Ghi chú biên tập:</span>{" "}
                    Nguồn và nội dung đang được biên tập. Chúng tôi tiếp cận tập tục dân gian
                    dưới góc độ văn hóa học và mỹ học, không đại diện cho tài liệu sử học
                    tuyệt đối.
                  </div>

                  {/* Link to CultureDetail Article */}
                  <div className="p-4 rounded-2xl bg-[#fbece1]/70 border border-[#edd3c1] flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl overflow-hidden bg-[#faede2] flex-shrink-0">
                        <img
                          src="/images/temple_bac_bo.jpg"
                          alt="Đình làng Bắc Bộ"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <div className="text-[10px] font-bold uppercase tracking-wider text-[#9e3b2e]">
                          TÌM HIỂU KHÔNG GIAN
                        </div>
                        <div className="font-semibold text-xs sm:text-sm text-[#2a2220]">
                          {currentResult.relatedArticleTitle}
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() =>
                        onGoToArticle && onGoToArticle(currentResult.relatedArticleId)
                      }
                      className="text-xs font-semibold text-[#9e3b2e] hover:underline flex items-center gap-1 flex-shrink-0 cursor-pointer"
                    >
                      <span>Đọc để hiểu thêm bối cảnh</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </Card>

                {/* PHẦN 3 • THỰC HÀNH AN YÊN: Hành động nhỏ hôm nay */}
                <Card className="p-6 sm:p-7 rounded-3xl bg-white border border-[#eddcd0] shadow-xs">
                  <div className="flex items-center justify-between mb-1">
                    <div className="text-xs font-bold uppercase tracking-wider text-[#9e3b2e] flex items-center gap-1.5">
                      <Flower2 className="w-3.5 h-3.5" />
                      <span>PHẦN 3 • THỰC HÀNH AN YÊN</span>
                    </div>
                    <Badge variant="secondary" className="text-[11px] bg-[#fbf5ee]">
                      {currentResult.microAction.duration}
                    </Badge>
                  </div>

                  <h3 className="font-['Noto_Serif',serif] font-bold text-xl text-[#2a2220] mb-3">
                    Hành động nhỏ hôm nay
                  </h3>

                  <div className="p-5 rounded-2xl bg-[#faf3ec] border border-[#ecd9cb] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <h4 className="font-bold text-sm sm:text-base text-[#2c2220] mb-1">
                        {currentResult.microAction.title}
                      </h4>
                      <p className="text-xs sm:text-sm text-[#6c5c55] leading-relaxed">
                        {currentResult.microAction.desc}
                      </p>
                    </div>

                    <button
                      onClick={() => setIsActionDone(!isActionDone)}
                      className={`px-4 py-2.5 rounded-full text-xs font-semibold transition-all flex items-center gap-1.5 flex-shrink-0 cursor-pointer ${
                        isActionDone
                          ? "bg-[#2e5e33] text-white shadow-2xs"
                          : "bg-white border border-[#dfc3af] text-[#8e3629] hover:bg-[#faede2]"
                      }`}
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      <span>
                        {isActionDone ? "Đã thực hiện xong" : "Đánh dấu đã thực hiện"}
                      </span>
                    </button>
                  </div>
                </Card>

                {/* PHẦN 4 • BƯỚC KẾ TIẾP: Lưu giữ & Tiếp tục hành trình */}
                <Card className="p-6 sm:p-7 rounded-3xl bg-white border border-[#eddcd0] shadow-xs space-y-4">
                  <div>
                    <div className="text-xs font-bold uppercase tracking-wider text-[#9e3b2e] mb-1">
                      PHẦN 4 • BƯỚC KẾ TIẾP
                    </div>
                    <h3 className="font-['Noto_Serif',serif] font-bold text-xl text-[#2a2220]">
                      Lưu giữ & Tiếp tục hành trình
                    </h3>
                  </div>

                  <div className="p-4 rounded-2xl bg-[#faf4ed] border border-[#ecdacb] text-xs text-[#705e57] leading-relaxed">
                    <div className="font-bold text-[#8d2f23] mb-1">
                      {isLoggedIn ? "Lưu trữ tài khoản cá nhân" : "Lưu trữ cho khách"}
                    </div>
                    <p>
                      {isLoggedIn
                        ? "Thẻ xăm và hành động chiêm nghiệm này sẽ được lưu an toàn trong Góc của tôi để bạn có thể xem lại bất cứ lúc nào."
                        : "Nhấn 'Lưu vào Góc của tôi' sẽ đưa bạn đến trang Đăng nhập và tự động chuyển về đúng kết quả Thẻ số " +
                          currentResult.stickNumber +
                          " sau khi hoàn tất, giúp lưu giữ đầy đủ hành trình trải nghiệm của bạn."}
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
                    <Button
                      variant="default"
                      size="default"
                      onClick={isLoggedIn ? handleSaveResult : onGoToLogin || handleSaveResult}
                      className="w-full sm:w-auto font-semibold gap-2 shadow-xs"
                    >
                      <Download className="w-4 h-4" />
                      <span>
                        {isSaved
                          ? "Đã lưu vào Góc của tôi"
                          : "Lưu vào Góc của tôi"}
                      </span>
                    </Button>

                    <Button
                      variant="outline"
                      size="default"
                      onClick={() => {
                        setStep(1);
                        window.scrollTo({ top: 0, behavior: "smooth" });
                      }}
                      className="w-full sm:w-auto gap-2 border-[#dfc5b2] text-[#715f57]"
                    >
                      <RotateCcw className="w-4 h-4" />
                      <span>Rút một thẻ khác</span>
                    </Button>

                    {onGoToExplore && (
                      <button
                        onClick={onGoToExplore}
                        className="text-xs font-semibold text-[#9e3b2e] hover:underline flex items-center gap-1 ml-auto cursor-pointer"
                      >
                        <span>Khám phá văn hóa liên quan</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </Card>
              </div>
            </div>

            {/* Bottom Caution Banner */}
            <div className="p-5 rounded-2xl bg-[#fcf5ed] border border-[#f0decfe3] flex items-start gap-3.5 text-xs text-[#77665f] leading-relaxed mb-12">
              <ShieldCheck className="w-5 h-5 text-[#9e3b2e] flex-shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-[#8d2f23] uppercase tracking-wider block mb-0.5">
                  LƯU Ý Ý NGHĨA TRẢI NGHIỆM
                </span>
                <span>
                  Đây là nội dung chiêm nghiệm văn hóa và liệu pháp tinh thần tích cực, không
                  phải dự báo chắc chắn tương lai hay lời khuyên chuyên môn (y tế, pháp lý,
                  tài chính). Mọi quyết định và hướng đi cuộc sống đều thuộc về bạn.
                </span>
              </div>
            </div>
          </div>
        )}

        {/* =========================================================================
            MODAL HƯỚNG DẪN CHIÊM NGHIỆM (Step 2)
           ========================================================================= */}
        {showGuideModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
            <Card className="max-w-md w-full bg-white border border-[#eddcd0] rounded-3xl p-6 shadow-xl relative animate-in fade-in zoom-in-95 duration-200">
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-[#f1e5d8]">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#9e3b2e]">
                  <Sparkles className="w-4 h-4" />
                  <span>Hướng dẫn chiêm nghiệm</span>
                </div>
                <button
                  onClick={() => setShowGuideModal(false)}
                  className="text-xs text-[#8c7b74] hover:text-[#9e3b2e] cursor-pointer"
                >
                  ✕ Đóng
                </button>
              </div>

              <div className="space-y-3 text-xs sm:text-sm text-[#6d5b54] leading-relaxed mb-6">
                <p>
                  <strong>1. Khởi tâm an hòa:</strong> Hãy giữ cho lồng ngực thả lỏng, hít
                  vào một hơi sâu và thở ra chậm rãi.
                </p>
                <p>
                  <strong>2. Chạm vào ống xăm:</strong> Bấm vào nút "Rút một thẻ xăm" để ống
                  xăm tre chuyển động và trao gửi thông điệp hữu duyên.
                </p>
                <p>
                  <strong>3. Đón nhận câu chữ:</strong> Đọc 4 câu thơ và lời luận giải bằng
                  tâm thế cởi mở, xem như một lời nhắc nhở nhẹ nhàng cho tâm hồn.
                </p>
              </div>

              <Button
                variant="default"
                size="default"
                onClick={() => setShowGuideModal(false)}
                className="w-full font-semibold"
              >
                Tôi đã hiểu, tiếp tục rút thẻ
              </Button>
            </Card>
          </div>
        )}

        {/* Global Footer Motto */}
        <div className="text-center pt-10 border-t border-[#eddcd0]">
          <p className="font-['Noto_Serif',serif] italic font-semibold text-lg sm:text-xl text-[#9e3b2e] mb-1.5">
            “Tâm bình thế giới bình, lòng an vạn sự tỏ.”
          </p>
          <div className="text-xs uppercase tracking-widest text-[#938279] font-medium">
            Thông điệp của Tin Lắm Tâm Linh
          </div>
        </div>
      </main>
    </div>
  );
};
