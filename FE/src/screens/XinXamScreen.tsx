import React, { useState, useEffect, useRef } from "react";
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
  Share2,
  Bookmark,
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
  XIN_XAM_RESULTS,
} from "../data/xinXamData";

interface XinXamScreenProps {
  onBackToExperienceHome?: () => void;
  onGoToArticle?: (articleId: string) => void;
  onSaveToAccount?: (result: XinXamResult) => boolean | void;
  onGoToLogin?: () => void;
  onGoToExplore?: () => void;
  onGoToWish?: () => void;
  isLoggedIn?: boolean;
  savedXamList?: { stickNumber: string; category?: string; region?: string }[];
}

export const XinXamScreen: React.FC<XinXamScreenProps> = ({
  onBackToExperienceHome,
  onGoToArticle,
  onSaveToAccount,
  onGoToLogin,
  onGoToExplore,
  onGoToWish,
  isLoggedIn = false,
  savedXamList,
}) => {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [selectedRegion, setSelectedRegion] = useState<RegionType>("Bắc Bộ");
  const [selectedTopic, setSelectedTopic] = useState<TopicType>("Bình an");

  // Step 2 Interactive States
  const [drawPhase, setDrawPhase] = useState<"idle" | "shaking" | "dropped">("idle");
  const [isShaking, setIsShaking] = useState(false);
  const [isGentleMotion, setIsGentleMotion] = useState(true);
  const [showGuideModal, setShowGuideModal] = useState(false);

  // Step 3 State
  const [isActionDone, setIsActionDone] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [drawNotice, setDrawNotice] = useState("");

  const drawTimerRef = useRef<
    ReturnType<typeof setTimeout> | null
  >(null);

  const [currentResult, setCurrentResult] = useState<XinXamResult>(() =>
    getXinXamResult(selectedRegion, selectedTopic)
  );

  useEffect(() => {
    if (drawTimerRef.current !== null) {
      clearTimeout(drawTimerRef.current);
      drawTimerRef.current = null;
    }

    setCurrentResult(
      getXinXamResult(selectedRegion, selectedTopic)
    );
    setDrawPhase("idle");
    setIsShaking(false);
    setIsSaved(false);
    setIsActionDone(false);
    setDrawNotice("");
  }, [selectedRegion, selectedTopic]);

  // Hủy lượt đang chạy khi rời bước rút thẻ.
  useEffect(() => {
    if (step !== 2) {
      if (drawTimerRef.current !== null) {
        clearTimeout(drawTimerRef.current);
        drawTimerRef.current = null;
      }

      setIsShaking(false);
      setDrawPhase("idle");
    }
  }, [step]);

  // Không để timer tiếp tục khi đã rời màn xin xăm.
  useEffect(() => {
    return () => {
      if (drawTimerRef.current !== null) {
        clearTimeout(drawTimerRef.current);
      }
    };
  }, []);

  const handleStartDraw = () => {
    if (drawTimerRef.current !== null) return;

    const matchingResults = Object.values(
      XIN_XAM_RESULTS
    ).filter(
      (result) =>
        result.region === selectedRegion &&
        result.topic === selectedTopic
    );

    if (matchingResults.length === 0) {
      setDrawNotice(
        "Chưa có thẻ cho lựa chọn này. Bạn hãy chọn vùng hoặc chủ đề khác."
      );
      return;
    }

    const alternatives = matchingResults.filter(
      (result) =>
        result.stickNumber !== currentResult.stickNumber
    );

    const pool =
      alternatives.length > 0
        ? alternatives
        : matchingResults;

    const chosen =
      pool[Math.floor(Math.random() * pool.length)];

    setDrawNotice(
      matchingResults.length === 1
        ? "Bản thử nghiệm hiện có một thẻ cho vùng và chủ đề này. Rút lại có thể nhận cùng nội dung."
        : ""
    );

    setIsShaking(true);
    setIsSaved(false);
    setIsActionDone(false);
    setDrawPhase("shaking");

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (!reducedMotion) {
      try {
        navigator.vibrate?.([60, 40, 60]);
      } catch {
        // Một số thiết bị không hỗ trợ rung.
      }
    }

    drawTimerRef.current = setTimeout(() => {
      drawTimerRef.current = null;
      setCurrentResult(chosen);
      setIsShaking(false);
      setDrawPhase("dropped");
    }, reducedMotion ? 200 : 1800);
  };

  const isCardSaved =
    isLoggedIn &&
    (
      isSaved ||
      (savedXamList ?? []).some(
        (item) =>
          item.stickNumber === currentResult.stickNumber &&
          item.region === currentResult.region &&
          (
            item.category === currentResult.category ||
            item.category === currentResult.topic
          )
      )
    );

  const handleSaveResult = () => {
    if (isCardSaved) return;

    if (!onSaveToAccount) {
      setDrawNotice(
        "Chức năng lưu chưa sẵn sàng trong phiên này."
      );
      return;
    }

    const success = onSaveToAccount(currentResult);

    if (success === true) {
      setIsSaved(true);
    }
  };

  return (
    <div className="screen-shell">
      <main className="page-container max-w-5xl">
        {drawNotice && (
          <p
            role="status"
            className="mb-5 rounded-xl border border-line bg-surface px-4 py-3 text-sm text-muted leading-relaxed"
          >
            {drawNotice}
          </p>
        )}
        {/* =========================================================================
            BƯỚC 1: KHỞI TÂM NGUYỆN (IMAGE 1)
           ========================================================================= */}
        {step === 1 && (
          <div>
            {/* Top Breadcrumb & Step Badge */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 text-xs text-muted">
              <div className="flex items-center gap-2">
                <span
                  onClick={onBackToExperienceHome}
                  className="hover:text-accent cursor-pointer transition-colors"
                >
                  Trải nghiệm
                </span>
                <span>/</span>
                <span className="text-accent font-semibold">Xin xăm văn hóa</span>
              </div>

              <div className="flex items-center gap-2.5">
                {onGoToWish && (
                  <button
                    onClick={onGoToWish}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface border border-line text-xs font-medium text-accent hover:bg-surface transition-colors cursor-pointer"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Gửi gắm điều ước</span>
                  </button>
                )}
                <div className="flex items-center gap-1.5 uppercase font-semibold text-xs text-muted">
                  <span className="w-2 h-2 rounded-full bg-action inline-block"></span>
                  <span>BƯỚC 1 / 3 • KHỞI TÂM NGUYỆN</span>
                </div>
              </div>
            </div>

            {/* Heading & Subtitle */}
            <div className="mb-10 text-left">
              <h1 className="page-title mb-3">
                Chọn một điều bạn muốn chiêm nghiệm
              </h1>
              <p className="text-sm sm:text-base text-ink leading-relaxed max-w-3xl">
                Đây là trải nghiệm tìm hiểu văn hóa và suy ngẫm, gợi mở góc nhìn bình an
                cho tâm trí – hoàn toàn mang tinh thần lắng đọng nội tâm, không mang tính
                tiên tri hay dự đoán chắc chắn tương lai.
              </p>
            </div>

            {/* Section 1: Chọn không gian văn hóa gợi mở */}
            <section className="mb-10">
              <div className="flex items-center gap-2.5 mb-2">
                <span className="w-6 h-6 rounded-full bg-action text-white text-xs font-bold flex items-center justify-center">
                  1
                </span>
                <h3 className="font-display font-bold text-xl sm:text-2xl text-ink">
                  Chọn không gian văn hóa gợi mở
                </h3>
              </div>
              <p className="text-sm text-muted mb-6 pl-8">
                Khám phá phong thổ và chiều sâu tâm thức ba miền. Mỗi vùng đất mang một
                sắc thái riêng thuần hậu, không áp đặt một khuôn mẫu duy nhất:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Bắc Bộ */}
                <Card
                  onClick={() => setSelectedRegion("Bắc Bộ")}
                  className={`p-5 rounded-card cursor-pointer transition-all duration-300 relative flex flex-col justify-between ${
                    selectedRegion === "Bắc Bộ"
                      ? "bg-accent-soft border-accent ring-1 ring-accent/20"
                      : "bg-surface border-line hover:border-line"
                  }`}
                >
                  <div>
                    <div className="relative h-44 rounded-panel overflow-hidden mb-4 bg-surface">
                      <img
                        src="/images/temple_bac_bo.jpg"
                        alt="Không gian Trầm mặc Xứ Bắc"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-full bg-black/60 text-xs font-semibold text-white">
                        BẮC BỘ
                      </div>
                      <div
                        className={`absolute top-2.5 right-2.5 w-6 h-6 rounded-full flex items-center justify-center transition-all ${
                          selectedRegion === "Bắc Bộ"
                            ? "bg-action text-white"
                            : "border-2 border-white/80 bg-black/30 text-transparent"
                        }`}
                      >
                        <Check className="w-3.5 h-3.5 stroke-[3]" />
                      </div>
                    </div>

                    <h4 className="font-display font-bold text-lg text-ink mb-1.5">
                      Không gian Trầm mặc Xứ Bắc
                    </h4>
                    <p className="text-sm text-ink leading-relaxed">
                      Gợi nhắc nét tôn nghiêm nơi sân đình, mái ngói rêu phong và ước vọng
                      thái bình ngàn đời của làng xã châu thổ sông Hồng.
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-line flex items-center justify-between text-xs text-muted">
                    <span className="flex items-center gap-1.5 font-medium">
                      <span
                        className={`w-2 h-2 rounded-full ${
                          selectedRegion === "Bắc Bộ" ? "bg-action" : "bg-surface-soft"
                        }`}
                      />
                      <span>
                        {selectedRegion === "Bắc Bộ"
                          ? "Đang chọn không gian này"
                          : "Chọn không gian này"}
                      </span>
                    </span>
                    <Flower2 className="w-4 h-4 text-accent" />
                  </div>
                </Card>

                {/* Trung Bộ */}
                <Card
                  onClick={() => setSelectedRegion("Trung Bộ")}
                  className={`p-5 rounded-card cursor-pointer transition-all duration-300 relative flex flex-col justify-between ${
                    selectedRegion === "Trung Bộ"
                      ? "bg-accent-soft border-accent ring-1 ring-accent/20"
                      : "bg-surface border-line hover:border-line"
                  }`}
                >
                  <div>
                    <div className="relative h-44 rounded-panel overflow-hidden mb-4 bg-surface">
                      <img
                        src="/images/hue_trung_bo.jpg"
                        alt="Nét Giao thoa Xứ Huế & Miền Trung"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-full bg-black/60 text-xs font-semibold text-white">
                        TRUNG BỘ
                      </div>
                      <div
                        className={`absolute top-2.5 right-2.5 w-6 h-6 rounded-full flex items-center justify-center transition-all ${
                          selectedRegion === "Trung Bộ"
                            ? "bg-action text-white"
                            : "border-2 border-white/80 bg-black/30 text-transparent"
                        }`}
                      >
                        <Check className="w-3.5 h-3.5 stroke-[3]" />
                      </div>
                    </div>

                    <h4 className="font-display font-bold text-lg text-ink mb-1.5">
                      Nét Giao thoa Xứ Huế & Miền Trung
                    </h4>
                    <p className="text-sm text-ink leading-relaxed">
                      Hòa quyện giữa chất trầm tư kinh kỳ, sông nước Hương giang u tịch và
                      tín ngưỡng Mẫu thuần hậu chở che qua bao thăng trầm.
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-line flex items-center justify-between text-xs text-muted">
                    <span className="flex items-center gap-1.5 font-medium">
                      <span
                        className={`w-2 h-2 rounded-full ${
                          selectedRegion === "Trung Bộ" ? "bg-action" : "bg-surface-soft"
                        }`}
                      />
                      <span>
                        {selectedRegion === "Trung Bộ"
                          ? "Đang chọn không gian này"
                          : "Chọn không gian này"}
                      </span>
                    </span>
                    <Waves className="w-4 h-4 text-accent" />
                  </div>
                </Card>

                {/* Nam Bộ */}
                <Card
                  onClick={() => setSelectedRegion("Nam Bộ")}
                  className={`p-5 rounded-card cursor-pointer transition-all duration-300 relative flex flex-col justify-between ${
                    selectedRegion === "Nam Bộ"
                      ? "bg-accent-soft border-accent ring-1 ring-accent/20"
                      : "bg-surface border-line hover:border-line"
                  }`}
                >
                  <div>
                    <div className="relative h-44 rounded-panel overflow-hidden mb-4 bg-surface">
                      <img
                        src="/images/mekong_nam_bo.jpg"
                        alt="Hồn Phù sa Khoáng đạt Phương Nam"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-full bg-black/60 text-xs font-semibold text-white">
                        NAM BỘ
                      </div>
                      <div
                        className={`absolute top-2.5 right-2.5 w-6 h-6 rounded-full flex items-center justify-center transition-all ${
                          selectedRegion === "Nam Bộ"
                            ? "bg-action text-white"
                            : "border-2 border-white/80 bg-black/30 text-transparent"
                        }`}
                      >
                        <Check className="w-3.5 h-3.5 stroke-[3]" />
                      </div>
                    </div>

                    <h4 className="font-display font-bold text-lg text-ink mb-1.5">
                      Hồn Phù sa Khoáng đạt Phương Nam
                    </h4>
                    <p className="text-sm text-ink leading-relaxed">
                      Không gian ấm áp ven dòng Cửu Long, gửi gắm tinh thần bao dung, hào
                      sảng, mộc mạc và chân thành của cư dân châu thổ.
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-line flex items-center justify-between text-xs text-muted">
                    <span className="flex items-center gap-1.5 font-medium">
                      <span
                        className={`w-2 h-2 rounded-full ${
                          selectedRegion === "Nam Bộ" ? "bg-action" : "bg-surface-soft"
                        }`}
                      />
                      <span>
                        {selectedRegion === "Nam Bộ"
                          ? "Đang chọn không gian này"
                          : "Chọn không gian này"}
                      </span>
                    </span>
                    <Sun className="w-4 h-4 text-accent" />
                  </div>
                </Card>
              </div>
            </section>

            {/* Section 2: Chọn chủ đề bạn đang lắng đọng */}
            <section className="mb-10">
              <div className="flex items-center gap-2.5 mb-2">
                <span className="w-6 h-6 rounded-full bg-action text-white text-xs font-bold flex items-center justify-center">
                  2
                </span>
                <h3 className="font-display font-bold text-xl sm:text-2xl text-ink">
                  Chọn chủ đề bạn đang lắng đọng
                </h3>
              </div>
              <p className="text-sm text-muted mb-6 pl-8">
                Chọn đúng một khía cạnh bạn muốn đón nhận lời gửi gắm hôm nay:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {/* 1. Học tập */}
                <Card
                  onClick={() => setSelectedTopic("Học tập")}
                  className={`p-5 rounded-card cursor-pointer transition-all duration-300 relative flex flex-col justify-between ${
                    selectedTopic === "Học tập"
                      ? "bg-accent-soft border-accent ring-1 ring-accent/20"
                      : "bg-surface border-line hover:border-line"
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className="w-9 h-9 rounded-xl bg-surface flex items-center justify-center text-accent">
                        <BookOpen className="w-4 h-4" />
                      </div>
                      <div
                        className={`w-5 h-5 rounded-full flex items-center justify-center ${
                          selectedTopic === "Học tập"
                            ? "bg-action text-white"
                            : "border-2 border-line bg-surface text-transparent"
                        }`}
                      >
                        <Check className="w-3 h-3 stroke-[3]" />
                      </div>
                    </div>
                    <h4 className="font-display font-bold text-lg text-ink mb-1.5">
                      Học tập
                    </h4>
                    <p className="text-sm text-ink leading-relaxed mb-4">
                      Định tâm, mở mang trí tuệ & thông tuệ trước trang sách đời.
                    </p>
                  </div>
                  <div className="text-xs font-semibold text-accent flex items-center gap-1">
                    <span>Khởi sáng tri thức</span>
                    <ArrowRight className="w-3 h-3" />
                  </div>
                </Card>

                {/* 2. Công việc */}
                <Card
                  onClick={() => setSelectedTopic("Công việc")}
                  className={`p-5 rounded-card cursor-pointer transition-all duration-300 relative flex flex-col justify-between ${
                    selectedTopic === "Công việc"
                      ? "bg-accent-soft border-accent ring-1 ring-accent/20"
                      : "bg-surface border-line hover:border-line"
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className="w-9 h-9 rounded-xl bg-surface flex items-center justify-center text-accent">
                        <Compass className="w-4 h-4" />
                      </div>
                      <div
                        className={`w-5 h-5 rounded-full flex items-center justify-center ${
                          selectedTopic === "Công việc"
                            ? "bg-action text-white"
                            : "border-2 border-line bg-surface text-transparent"
                        }`}
                      >
                        <Check className="w-3 h-3 stroke-[3]" />
                      </div>
                    </div>
                    <h4 className="font-display font-bold text-lg text-ink mb-1.5">
                      Công việc
                    </h4>
                    <p className="text-sm text-ink leading-relaxed mb-4">
                      Kiên định, hanh thông trước mọi dự định và thử thách mới.
                    </p>
                  </div>
                  <div className="text-xs font-semibold text-accent flex items-center gap-1">
                    <span>Thuận buồm xuôi gió</span>
                    <ArrowRight className="w-3 h-3" />
                  </div>
                </Card>

                {/* 3. Gia đình */}
                <Card
                  onClick={() => setSelectedTopic("Gia đình")}
                  className={`p-5 rounded-card cursor-pointer transition-all duration-300 relative flex flex-col justify-between ${
                    selectedTopic === "Gia đình"
                      ? "bg-accent-soft border-accent ring-1 ring-accent/20"
                      : "bg-surface border-line hover:border-line"
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className="w-9 h-9 rounded-xl bg-surface flex items-center justify-center text-accent">
                        <Home className="w-4 h-4" />
                      </div>
                      <div
                        className={`w-5 h-5 rounded-full flex items-center justify-center ${
                          selectedTopic === "Gia đình"
                            ? "bg-action text-white"
                            : "border-2 border-line bg-surface text-transparent"
                        }`}
                      >
                        <Check className="w-3 h-3 stroke-[3]" />
                      </div>
                    </div>
                    <h4 className="font-display font-bold text-lg text-ink mb-1.5">
                      Gia đình
                    </h4>
                    <p className="text-sm text-ink leading-relaxed mb-4">
                      Gắn kết, thấu hiểu & giữ cho nếp nhà luôn ấm êm thuận hòa.
                    </p>
                  </div>
                  <div className="text-xs font-semibold text-accent flex items-center gap-1">
                    <span>Mái ấm an hòa</span>
                    <ArrowRight className="w-3 h-3" />
                  </div>
                </Card>

                {/* 4. Bình an */}
                <Card
                  onClick={() => setSelectedTopic("Bình an")}
                  className={`p-5 rounded-card cursor-pointer transition-all duration-300 relative flex flex-col justify-between ${
                    selectedTopic === "Bình an"
                      ? "bg-accent-soft border-accent ring-1 ring-accent/20"
                      : "bg-surface border-line hover:border-line"
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className="w-9 h-9 rounded-xl bg-surface flex items-center justify-center text-accent">
                        <Flower2 className="w-4 h-4" />
                      </div>
                      <div
                        className={`w-5 h-5 rounded-full flex items-center justify-center ${
                          selectedTopic === "Bình an"
                            ? "bg-action text-white"
                            : "border-2 border-line bg-surface text-transparent"
                        }`}
                      >
                        <Check className="w-3 h-3 stroke-[3]" />
                      </div>
                    </div>
                    <h4 className="font-display font-bold text-lg text-ink mb-1.5">
                      Bình an
                    </h4>
                    <p className="text-sm text-ink leading-relaxed mb-4">
                      Thanh lọc âu lo, nuôi dưỡng sự tĩnh tại và an yên trong lòng.
                    </p>
                  </div>
                  <div className="text-xs font-semibold text-accent flex items-center gap-1">
                    <span>Tâm sáng an nhiên</span>
                    <ArrowRight className="w-3 h-3" />
                  </div>
                </Card>
              </div>
            </section>

            {/* Selection Summary Callout Box */}
            <Card className="p-6 rounded-card bg-surface/80 border border-line flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-10 shadow-2xs">
              <div>
                <div className="text-xs font-bold uppercase tracking-wider text-accent mb-1">
                  ◎ TÓM TẮT LỰA CHỌN CỦA BẠN
                </div>
                <div className="text-lg font-bold text-ink mb-1 font-display">
                  Bạn đã chọn:{" "}
                  <span className="text-accent">
                    {selectedRegion} • {selectedTopic}
                  </span>
                </div>
                <div className="text-xs text-muted italic">
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
                    className="w-full sm:w-auto text-xs border-line text-muted"
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
            <div className="p-5 rounded-panel bg-surface border border-line flex items-start gap-3.5 text-xs text-muted leading-relaxed mb-12">
              <Info className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
              <div>
                <div className="font-bold text-accent uppercase tracking-wider mb-1">
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
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4 text-xs text-muted">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setStep(1)}
                  className="hover:text-accent cursor-pointer"
                >
                  Trải nghiệm
                </button>
                <span>›</span>
                <span>Xin xăm văn hóa</span>
                <span>›</span>
                <span className="text-accent font-semibold">Bước 2: Rút thẻ</span>
              </div>

              <div className="flex items-center gap-1.5 uppercase font-semibold text-xs text-muted">
                <span className="w-2 h-2 rounded-full bg-action inline-block"></span>
                <span>
                  BƯỚC 2 / 3 • LẮNG ĐỘNG RÚT THẺ – {selectedRegion.toUpperCase()} &{" "}
                  {selectedTopic.toUpperCase()}
                </span>
              </div>
            </div>

            {/* Active Choice Context Bar (Compact, understated) */}
            <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-muted pb-3 border-b border-line/60">
              <div className="flex items-center gap-2">
                <Flower2 className="w-3.5 h-3.5 text-accent" />
                <span>
                  Đang xin xăm cho tâm: <strong className="text-ink">{selectedTopic}</strong> • Vùng đất: <strong className="text-ink">{selectedRegion}</strong>
                </span>
              </div>

              <button
                onClick={() => setStep(1)}
                className="text-xs text-accent hover:underline font-semibold cursor-pointer self-start sm:self-auto"
              >
                ← Đổi lựa chọn
              </button>
            </div>

            {/* Big Serif Heading */}
            <div className="text-center max-w-xl mx-auto mb-8">
              <h1 className="page-title mb-2.5 text-2xl sm:text-3xl lg:text-4xl text-ink font-display">
                Lắng lòng và rút một thẻ xăm
              </h1>
              <p className="text-sm text-muted leading-relaxed">
                Giữ hơi thở chậm rãi, tĩnh tâm trong một khoảnh khắc ngắn. Thẻ tre mở ra một góc nhìn suy ngẫm cổ truyền, gợi ý thái độ an nhiên trước đời sống.
              </p>
            </div>

            {/* Center Altar: Open Sacred Space without Box Boundary */}
            <div className="max-w-xl mx-auto py-4 text-center relative mb-12">
              {/* Concentric Circle Aura Motif with Warm Ambient Glow */}
              <div className="relative w-72 h-80 sm:w-96 sm:h-96 mx-auto mb-6 flex items-center justify-center">
                {/* Golden/Warm Ambient Aura */}
                <div
                  className={`absolute inset-0 rounded-full transition-all duration-700 pointer-events-none blur-2xl ${
                    drawPhase === "dropped"
                      ? "bg-gradient-to-b from-amber-400/25 via-amber-500/15 to-transparent scale-110"
                      : isShaking
                      ? "bg-gradient-to-b from-amber-500/20 via-amber-500/10 to-transparent animate-pulse"
                      : "bg-gradient-to-b from-amber-500/10 via-amber-500/5 to-transparent"
                  }`}
                />
                <div className="absolute inset-4 rounded-full border border-line/50" />
                <div className="absolute inset-10 rounded-full border border-dashed border-line/40" />

                {/* Khu vực Bó Xăm & Thẻ Tre Rơi */}
                <div className="relative flex flex-col items-center justify-center z-10 w-full">
                  {/* Ống xăm thuần Việt & Bó xăm 13 que đầy đặn - Chỉ 1 que nhô cao, không rơi ra ngoài */}
                  <div
                    onClick={drawPhase !== "shaking" ? handleStartDraw : undefined}
                    className={`relative flex flex-col items-center select-none transition-transform duration-300 cursor-pointer ${
                      isShaking ? "anim-xam-up-down" : "hover:scale-105 active:scale-95"
                    }`}
                    title={
                      isShaking
                        ? "Đang lắc xăm lên xuống..."
                        : drawPhase === "dropped"
                        ? `Thẻ số ${currentResult.stickNumber} đã nhô lên`
                        : "Chạm để lắc ống xăm"
                    }
                  >
                    {/* 1. BÓ QUE XĂM: 13 que cắm san sát dày dặn trong miệng ống, nửa trên đỏ son, nửa dưới ngà kem có số */}
                    <div className="flex items-end justify-center -space-x-1 sm:-space-x-1.5 pointer-events-none relative z-10 px-2 overflow-visible">
                      {[
                        { num: "05", h: 84, rot: -7 },
                        { num: "18", h: 90, rot: -5 },
                        { num: "33", h: 86, rot: -4 },
                        { num: "12", h: 93, rot: -3 },
                        { num: "21", h: 88, rot: -2 },
                        { num: "07", h: 95, rot: -1 },
                        // QUE CHÍNH Ở GIỮA
                        { isMain: true, num: currentResult.stickNumber, h: 98, rot: 0 },
                        { num: "16", h: 95, rot: 1 },
                        { num: "28", h: 88, rot: 2 },
                        { num: "45", h: 93, rot: 3 },
                        { num: "68", h: 86, rot: 4 },
                        { num: "79", h: 90, rot: 5 },
                        { num: "88", h: 84, rot: 7 },
                      ].map((s, idx) => {
                        const isChosen = s.isMain;
                        return (
                          <div
                            key={idx}
                            style={{
                              height: `${s.h}px`,
                              transform:
                                isChosen && drawPhase === "dropped"
                                  ? `translateY(-48px) rotate(0deg)`
                                  : isChosen && isShaking
                                  ? `translateY(-28px) rotate(0deg)`
                                  : `rotate(${s.rot}deg)`,
                              transformOrigin: "bottom center",
                            }}
                            className={`w-3.5 sm:w-4 rounded-t-sm flex flex-col overflow-hidden border border-[#8a5525] shadow-xs transition-all duration-500 ${
                              isChosen && drawPhase === "dropped"
                                ? "z-40 ring-2 ring-amber-400 shadow-[0_0_20px_rgba(251,191,36,0.95)]"
                                : isChosen
                                ? "z-30"
                                : "z-10"
                            } ${
                              isShaking && !isChosen
                                ? idx % 2 === 0
                                ? "anim-stick-bounce"
                                : "anim-stick-bounce-alt"
                                : ""
                            }`}
                          >
                            {/* Nửa trên đỏ son chu sa */}
                            <div
                              className={`w-full h-1/2 flex items-center justify-center ${
                                isChosen
                                  ? "bg-gradient-to-b from-[#bd2626] to-[#871616]"
                                  : "bg-[#9e2424]"
                              }`}
                            >
                              {isChosen && drawPhase === "dropped" && (
                                <div className="w-1.5 h-1.5 rounded-full bg-amber-300 animate-pulse shadow-xs" />
                              )}
                            </div>

                            {/* Nửa dưới ngà tre khắc số mực đen rõ nét */}
                            <div
                              className={`w-full h-1/2 flex items-start justify-center pt-0.5 ${
                                isChosen
                                  ? "bg-gradient-to-b from-[#fffaf0] to-[#f5ead2]"
                                  : "bg-[#f5ead2]"
                              }`}
                            >
                              <span
                                className={`[writing-mode:vertical-rl] leading-none ${
                                  isChosen
                                    ? "text-[10px] font-black text-[#7a141b] tracking-wider"
                                    : "text-[8px] font-bold text-[#2b180d] opacity-90"
                                }`}
                              >
                                {s.num}
                              </span>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {/* 2. THÂN ỐNG TRE HÌNH TRỤ CÓ ĐAI ĐỎ CHỮ VIỆT & CHỮ THƯ PHÁP "TÂM" (Miệng ống che chân bó xăm) */}
                    <div
                      className="w-34 sm:w-40 h-44 sm:h-48 rounded-2xl relative flex flex-col items-center justify-between p-0 z-20 overflow-hidden shadow-2xl border border-[#7a481d] -mt-3.5"
                      style={{
                        background:
                          "linear-gradient(90deg, #965b25 0%, #c4833f 15%, #df9f58 35%, #f2be7e 50%, #d89852 68%, #ba7733 85%, #884d1c 100%)",
                        boxShadow:
                          "inset 2px 0 5px rgba(255,255,255,0.25), inset -2px 0 6px rgba(0,0,0,0.4), 0 16px 32px rgba(35,20,10,0.35)",
                      }}
                    >
                      {/* Miệng Ống Tre & Đai Đỏ Chữ Việt */}
                      <div className="w-full">
                        {/* Vành miệng tre */}
                        <div className="w-full h-1.5 bg-[#663812] border-b border-[#d89750]/40" />

                        {/* Đai Đỏ Chu Sa Chữ Việt thuần túy */}
                        <div className="w-full h-9 bg-gradient-to-r from-[#7a1518] via-[#a31f24] to-[#6e1114] border-y border-[#d4af37]/60 flex items-center justify-center shadow-inner">
                          <span
                            className="text-[11px] sm:text-xs font-serif font-bold tracking-[0.2em] uppercase"
                            style={{ color: "#f8e192" }}
                          >
                            ✦ AN NHIÊN ✦
                          </span>
                        </div>
                      </div>

                      {/* Thân Ống Tre: Chữ Thư Pháp Quốc Ngữ "Tâm" Mực Đen Thuần Việt */}
                      <div className="my-auto flex flex-col items-center justify-center select-none py-1">
                        <span
                          className="font-serif italic font-black text-4xl sm:text-5xl tracking-tight leading-none"
                          style={{
                            color: "#18100a",
                            textShadow: "0 1px 2px rgba(255,230,190,0.35)",
                            fontFamily: "var(--font-fraunces), serif",
                          }}
                        >
                          Tâm
                        </span>
                        <span className="text-[9px] uppercase font-bold tracking-widest text-[#5c3716] mt-1">
                          An Lạc
                        </span>
                      </div>

                      {/* Đáy Ống Tre bo cong tự nhiên */}
                      <div className="w-full h-3 bg-gradient-to-t from-[#5a300d] to-transparent rounded-b-2xl border-t border-[#462408]/30" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Status and instruction */}
              <div className="space-y-2 mb-6">
                <h3 className="font-display font-bold text-xl sm:text-2xl text-ink">
                  {drawPhase === "dropped"
                    ? `Đã hiện diện Thẻ xăm số ${currentResult.stickNumber}`
                    : drawPhase === "shaking"
                    ? "Đang lắng lòng lắc ống xăm..."
                    : "Sẵn sàng khởi niệm bình an"}
                </h3>
                <p className="text-sm text-muted max-w-md mx-auto leading-relaxed">
                  {drawPhase === "dropped"
                    ? `Thẻ xăm số ${currentResult.stickNumber} đã ứng hiện nhô cao trong bó xăm. Hãy mở xem lời quẻ chiêm nghiệm và thông điệp dành cho bạn.`
                    : "Chạm vào ống xăm hoặc bấm nút bên dưới để rút thẻ tre lưu dấu hôm nay."}
                </p>
              </div>

              {/* Action Buttons: Strict Visual Hierarchy */}
              <div className="flex flex-col items-center justify-center gap-3 w-full">
                {drawPhase === "dropped" ? (
                  <div className="flex flex-col items-center gap-3 w-full max-w-sm">
                    <Button
                      variant="default"
                      size="lg"
                      onClick={() => {
                        setStep(3);
                        window.scrollTo({ top: 0, behavior: "smooth" });
                      }}
                      className="w-full py-3.5 font-semibold shadow-md gap-2 text-base cursor-pointer"
                    >
                      <Sparkles className="w-4 h-4 shrink-0" />
                      <span>Xem chiêm nghiệm thẻ số {currentResult.stickNumber}</span>
                      <ArrowRight className="w-4 h-4 shrink-0" />
                    </Button>

                    <button
                      type="button"
                      onClick={handleStartDraw}
                      disabled={isShaking}
                      className="text-xs text-muted hover:text-accent font-medium py-1 transition-colors cursor-pointer flex items-center gap-1.5"
                    >
                      <RotateCcw className="w-3 h-3" />
                      <span>Lắc lại thẻ khác</span>
                    </button>
                  </div>
                ) : (
                  <Button
                    variant="default"
                    size="lg"
                    onClick={handleStartDraw}
                    disabled={isShaking}
                    className="w-full sm:w-auto px-8 py-3.5 font-semibold shadow-md gap-2 text-base cursor-pointer mx-auto"
                  >
                    <Sparkles className="w-4 h-4 shrink-0" />
                    <span>{isShaking ? "Đang lắng đọng rút thẻ..." : "Thành tâm lắc ống xăm"}</span>
                  </Button>
                )}

                <button
                  type="button"
                  onClick={() => setShowGuideModal(true)}
                  className="text-xs text-muted hover:text-accent font-medium mt-1 cursor-pointer flex items-center gap-1"
                >
                  <Info className="w-3.5 h-3.5" />
                  <span>Xem hướng dẫn chiêm nghiệm</span>
                </button>
              </div>
            </div>

            {/* 3 Cultural Guidance Cards (Subtle Editorial Row) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 border-t border-line/60 mb-10">
              <div className="text-left space-y-1">
                <span className="text-xs font-bold uppercase tracking-wider text-accent">
                  01 • Tâm thành ý tịnh
                </span>
                <p className="text-xs text-muted leading-relaxed">
                  Trước khi rút thẻ, buông xả toan tính được mất. Giữ lòng thanh thản để đón nhận lời khuyên với tâm thế sáng tỏ.
                </p>
              </div>

              <div className="text-left space-y-1">
                <span className="text-xs font-bold uppercase tracking-wider text-accent">
                  02 • Tự soi chiếu tâm tư
                </span>
                <p className="text-xs text-muted leading-relaxed">
                  Lời quẻ dân gian tựa chiếc gương phản chiếu nỗi lòng, giúp nhận ra điều gì cần gìn giữ và điều gì nên buông bỏ.
                </p>
              </div>

              <div className="text-left space-y-1">
                <span className="text-xs font-bold uppercase tracking-wider text-accent">
                  03 • Thuận lẽ tự nhiên
                </span>
                <p className="text-xs text-muted leading-relaxed">
                  Quẻ lành hay quẻ nhẫn nại đều hướng về đạo lý làm người. Tâm an vạn sự ắt sẽ hanh thông, tự tại.
                </p>
              </div>
            </div>

            {/* Cultural & Legal Philosophy Banner */}
            <Card className="p-6 rounded-card bg-surface/80 border border-line flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 mb-12 shadow-2xs">
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-panel bg-surface flex items-center justify-center text-accent flex-shrink-0">
                  <Scale className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <h4 className="font-display font-bold text-base text-ink mb-1">
                    Chiêm nghiệm văn hóa — Không mê tín dị đoan
                  </h4>
                  <p className="text-sm text-muted leading-relaxed max-w-xl">
                    Trải nghiệm chiêm nghiệm văn hóa, không phải dự báo chắc chắn tương
                    lai. Tin Lắm Tâm Linh hướng tới việc tiếp nhận di sản tập tục dân
                    gian như một liệu pháp tinh thần tích cực, vun bồi sự bình an và trân
                    trọng khoảnh khắc hiện tại.
                  </p>
                </div>
              </div>

              <div className="space-y-1.5 text-xs text-muted flex-shrink-0">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-accent" />
                  <span>Miễn phí trong bản thử nghiệm</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-accent" />
                  <span>Không quảng cáo thương mại</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-accent" />
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
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4 text-xs text-muted">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setStep(1)}
                  className="hover:text-accent cursor-pointer"
                >
                  Trải nghiệm
                </button>
                <span>›</span>
                <span>Xin xăm văn hóa</span>
                <span>›</span>
                <span className="text-accent font-semibold">Kết quả chiêm nghiệm</span>
              </div>

              <div className="flex items-center gap-1.5 uppercase font-semibold text-xs text-muted">
                <span className="w-2 h-2 rounded-full bg-action inline-block"></span>
                <span>BƯỚC 3 / 3 • KẾT QUẢ CHIÊM NGHIỆM</span>
              </div>
            </div>

            {/* Top Context Breadcrumb */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-muted mb-6 pb-3 border-b border-line/60">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setStep(1)}
                  className="hover:text-accent cursor-pointer"
                >
                  Xin xăm
                </button>
                <span>›</span>
                <span>{selectedRegion}</span>
                <span>›</span>
                <span className="text-ink font-semibold">{selectedTopic}</span>
              </div>
              <div className="flex items-center gap-1.5 uppercase font-medium text-xs text-muted">
                <span>Thẻ số {currentResult.stickNumber}</span>
                <span>•</span>
                <span className="text-accent font-semibold">{currentResult.sealText}</span>
              </div>
            </div>

            {/* Main Editorial Header */}
            <div className="mb-10 text-left max-w-3xl">
              <div className="text-xs font-bold uppercase tracking-wider text-accent mb-2 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Lời quẻ chiêm nghiệm</span>
              </div>
              <h1 className="page-title mb-3 text-2xl sm:text-3xl lg:text-4xl text-ink font-display">
                Lời gửi gắm từ Thẻ xăm số {currentResult.stickNumber}
              </h1>
              <p className="font-serif italic text-base sm:text-lg text-accent leading-relaxed">
                “{currentResult.quote}”
              </p>
            </div>

            {/* Two Column Layout: Sacred Bamboo Slip & Literary Essay */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 mb-16 items-start">
              {/* Left Column (5 columns): The Sacred Parchment Bamboo Slip */}
              <div className="lg:col-span-5 space-y-4">
                <div className="rounded-2xl p-6 sm:p-8 bg-surface border border-line shadow-sm relative overflow-hidden text-center flex flex-col justify-between min-h-[480px]">
                  {/* Subtle inner paper glow */}
                  <div className="absolute inset-0 bg-gradient-to-b from-amber-500/5 via-transparent to-amber-500/5 pointer-events-none" />

                  {/* Card Header */}
                  <div className="relative z-10">
                    <div className="flex items-center justify-between text-xs uppercase tracking-wider text-muted font-medium mb-4 border-b border-line/60 pb-3">
                      <span>XĂM VIỆT ĐƯƠNG ĐẠI</span>
                      <span className="flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-accent-soft" />
                        <span className="w-1.5 h-1.5 rounded-full bg-action" />
                      </span>
                      <span>
                        {selectedRegion === "Bắc Bộ"
                          ? "BẮC TRẦM"
                          : selectedRegion === "Trung Bộ"
                          ? "HUẾ TỊCH"
                          : "NAM HÀO"}
                      </span>
                    </div>

                    <div className="text-xs font-bold uppercase tracking-widest text-accent mb-1">
                      THẺ SỐ {currentResult.stickNumber} • {selectedRegion.toUpperCase()}
                    </div>

                    <h2 className="section-title text-xl sm:text-2xl leading-snug mb-8 text-ink">
                      {currentResult.title}
                    </h2>

                    {/* 4-Line Poem in Center */}
                    <div className="p-6 rounded-xl bg-surface-soft/60 border border-line/60 mb-8 shadow-inner">
                      <p className="font-serif italic font-semibold text-base sm:text-lg text-ink leading-loose">
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

                  {/* Card Bottom: Traditional Seal & Insight */}
                  <div className="relative z-10 pt-4 border-t border-line/60 flex items-center justify-between text-xs text-muted">
                    <div className="text-left">
                      <div className="text-xs uppercase text-muted">Thấu xăm</div>
                      <div className="font-semibold text-ink">Tự soi chiếu</div>
                    </div>

                    {/* Red Traditional Lacquer Stamp */}
                    <div className="w-12 h-12 rounded-xl border-2 border-accent text-accent bg-accent-soft/40 flex flex-col items-center justify-center font-bold text-xs leading-tight rotate-[-4deg] shadow-xs">
                      <span>{currentResult.sealText.split(" ")[0]}</span>
                      <span>{currentResult.sealText.split(" ")[1] || "NIỆM"}</span>
                    </div>

                    <div className="text-right">
                      <div className="text-xs uppercase text-muted">Ngụ ý</div>
                      <div className="font-semibold text-ink">
                        {currentResult.insight}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Subtle download / share action below slip */}
                <div className="flex items-center justify-between px-2 text-xs text-muted">
                  <span className="italic">Di sản xăm tre văn hóa dân gian</span>
                  <button
                    type="button"
                    onClick={handleSaveResult}
                    disabled={isCardSaved}
                    className="min-h-11 text-accent hover:text-action font-semibold flex items-center gap-2 cursor-pointer transition-colors disabled:cursor-default disabled:opacity-70"
                    title="Lưu thẻ vào Góc của tôi"
                  >
                    <Bookmark className="w-4 h-4" aria-hidden="true" />
                    <span>
                      {isCardSaved ? "Đã lưu thẻ" : "Lưu vào Góc của tôi"}
                    </span>
                  </button>
                </div>
              </div>

              {/* Right Column (7 columns): Seamless Literary Essay (No 4 box cards) */}
              <div className="lg:col-span-7 space-y-8 text-ink">
                {/* Essay Section 1: Lời chiêm nghiệm & Luận giải */}
                <div className="space-y-4">
                  <div className="text-xs font-bold uppercase tracking-wider text-accent flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-action"></span>
                    <span>Tự soi chiếu nội tâm</span>
                  </div>
                  <h3 className="font-display font-semibold text-2xl text-ink">
                    Lắng nghe lẽ biến chuyển
                  </h3>

                  <div className="space-y-4 text-sm sm:text-base text-ink/90 leading-relaxed font-normal">
                    {currentResult.reflectionParagraphs.map((para, pIdx) => (
                      <p key={pIdx} className="leading-relaxed">
                        {pIdx === 0 && (
                          <span className="float-left text-3xl sm:text-4xl font-serif font-bold text-accent mr-2.5 leading-none mt-0.5">
                            {para.charAt(0)}
                          </span>
                        )}
                        {pIdx === 0 ? para.slice(1) : para}
                      </p>
                    ))}
                  </div>

                  {/* 2 Gentle Takeaways */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                    {currentResult.tips.map((tip, tIdx) => (
                      <div
                        key={tIdx}
                        className="p-4 rounded-xl bg-surface/70 border border-line"
                      >
                        <h5 className="font-semibold text-xs text-accent mb-1 flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-action"></span>
                          <span>{tip.title}</span>
                        </h5>
                        <p className="text-xs sm:text-sm text-muted leading-relaxed">
                          {tip.desc}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="w-full h-px bg-line/60" />

                {/* Essay Section 2: Thực hành an yên & Nuôi dưỡng tâm lành */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="text-xs font-bold uppercase tracking-wider text-accent flex items-center gap-1.5">
                      <Flower2 className="w-3.5 h-3.5" />
                      <span>Thực hành an yên hôm nay</span>
                    </div>
                    <span className="text-xs text-muted font-medium">
                      {currentResult.microAction.duration}
                    </span>
                  </div>

                  <div className="p-5 rounded-xl bg-surface/80 border border-line flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <h4 className="font-display font-semibold text-base text-ink mb-1">
                        {currentResult.microAction.title}
                      </h4>
                      <p className="text-xs sm:text-sm text-muted leading-relaxed">
                        {currentResult.microAction.desc}
                      </p>
                    </div>

                    <button
                      onClick={() => setIsActionDone(!isActionDone)}
                      className={`px-4 py-2.5 rounded-full text-xs font-semibold transition-all flex items-center gap-1.5 flex-shrink-0 cursor-pointer ${
                        isActionDone
                          ? "bg-success-soft text-success shadow-2xs"
                          : "bg-surface border border-line text-accent hover:bg-surface-soft"
                      }`}
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      <span>
                        {isActionDone ? "Đã thực hiện xong" : "Đánh dấu đã thực hiện"}
                      </span>
                    </button>
                  </div>
                </div>

                <div className="w-full h-px bg-line/60" />

                {/* Essay Section 3: Góc nhìn văn hóa & Tri thức di sản */}
                <div className="space-y-3">
                  <div className="text-xs font-bold uppercase tracking-wider text-accent flex items-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>Góc nhìn văn hóa & Không gian di sản</span>
                  </div>

                  <p className="text-sm sm:text-base text-muted leading-relaxed">
                    {currentResult.culturalAspect}
                  </p>

                  {/* Cultural link */}
                  <div className="pt-2">
                    <button
                      onClick={() =>
                        onGoToArticle && onGoToArticle(currentResult.relatedArticleId)
                      }
                      className="text-xs font-semibold text-accent hover:text-action flex items-center gap-1.5 cursor-pointer transition-colors"
                    >
                      <span>Tìm hiểu không gian: {currentResult.relatedArticleTitle}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Final Primary Action Buttons (Clear, decisive focal point) */}
                <div className="pt-6 border-t border-line flex flex-col sm:flex-row items-center gap-3">
                  <Button
                    variant="default"
                    size="lg"
                    onClick={handleSaveResult}
                    disabled={isCardSaved}
                    className="w-full sm:w-auto px-7 py-3 font-semibold gap-2 shadow-sm cursor-pointer"
                  >
                    <Bookmark className="w-4 h-4" />
                    <span>
                      {isCardSaved
                        ? "Đã lưu vào Góc của tôi"
                        : "Lưu vào Góc của tôi"}
                    </span>
                  </Button>

                  <Button
                    variant="outline"
                    size="lg"
                    onClick={() => {
                      setStep(1);
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                    className="w-full sm:w-auto px-6 py-3 gap-2 border-line text-ink cursor-pointer"
                  >
                    <RotateCcw className="w-4 h-4" />
                    <span>Chọn lại vùng hoặc chủ đề</span>
                  </Button>

                  {onGoToExplore && (
                    <button
                      onClick={onGoToExplore}
                      className="text-xs font-medium text-muted hover:text-accent flex items-center gap-1 sm:ml-auto cursor-pointer transition-colors py-2"
                    >
                      <span>Khám phá văn hóa Ba Miền</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Bottom Caution Banner */}
            <div className="p-4 rounded-xl bg-surface/60 border border-line flex items-center gap-3 text-xs text-muted leading-relaxed mb-12">
              <ShieldCheck className="w-4 h-4 text-accent flex-shrink-0" />
              <span>
                Nội dung chiêm nghiệm văn hóa và liệu pháp tinh thần tích cực, không mang tính mê tín hay dự báo định mệnh. Mọi quyết định và an vui cuộc sống đều khởi phát từ tâm bạn.
              </span>
            </div>
          </div>
        )}

        {/* =========================================================================
            MODAL HƯỚNG DẪN CHIÊM NGHIỆM (Step 2)
           ========================================================================= */}
        {showGuideModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
            <Card className="max-w-md w-full bg-surface border border-line rounded-card p-6 shadow-xl relative animate-in fade-in zoom-in-95 duration-200">
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-line">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-accent">
                  <Sparkles className="w-4 h-4" />
                  <span>Hướng dẫn chiêm nghiệm</span>
                </div>
                <button
                  onClick={() => setShowGuideModal(false)}
                  className="text-xs text-muted hover:text-accent cursor-pointer"
                >
                  ✕ Đóng
                </button>
              </div>

              <div className="space-y-3 text-xs sm:text-sm text-ink leading-relaxed mb-6">
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

      </main>
    </div>
  );
};
