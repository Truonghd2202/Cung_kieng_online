import React, { useState, useEffect, useRef } from "react";
import {
  Volume2,
  VolumeX,
  Play,
  Pause,
  RotateCcw,
  Sparkles,
  Flame,
  Flower2,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Code2,
  Compass,
  Wind,
} from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { Badge } from "@/src/components/ui/badge";
import { Card } from "@/src/components/ui/card";

interface ZenScreenProps {
  onBackToExperience: () => void;
  onGoToHome: () => void;
}

export const ZenScreen: React.FC<ZenScreenProps> = ({
  onBackToExperience,
  onGoToHome,
}) => {
  // 3 States: 'ready' (State 1) | 'active' (State 2) | 'completed' (State 3)
  const [zenState, setZenState] = useState<"ready" | "active" | "completed">("ready");

  // Display & Ambient options
  const [viewMode, setViewMode] = useState<"2D" | "3D">("2D");
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [isLampLit, setIsLampLit] = useState(false);

  // Timer & Breathing Loop (3 minutes = 180 seconds)
  const [secondsRemaining, setSecondsRemaining] = useState(180);
  const [isPaused, setIsPaused] = useState(false);
  const [breathPhase, setBreathPhase] = useState<"inhale" | "hold" | "exhale">("inhale");
  const [breathCycleTime, setBreathCycleTime] = useState(0);

  // Web Audio Context for natural ambient tone
  const audioContextRef = useRef<AudioContext | null>(null);
  const oscillatorRef = useRef<OscillatorNode | null>(null);

  const startAmbientSound = () => {
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      audioContextRef.current = ctx;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(216, ctx.currentTime); // Calm 216Hz singing bowl tone
      gain.gain.setValueAtTime(0.015, ctx.currentTime);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      oscillatorRef.current = osc;
    } catch {}
  };

  const stopAmbientSound = () => {
    try {
      if (oscillatorRef.current) {
        oscillatorRef.current.stop();
        oscillatorRef.current.disconnect();
      }
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    } catch {}
  };

  useEffect(() => {
    if (soundEnabled && zenState === "active") {
      startAmbientSound();
    } else {
      stopAmbientSound();
    }
    return () => stopAmbientSound();
  }, [soundEnabled, zenState]);

  // Timer interval
  useEffect(() => {
    if (zenState !== "active" || isPaused) return;

    const timer = setInterval(() => {
      setSecondsRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setZenState("completed");
          return 0;
        }
        return prev - 1;
      });

      // Breathing Cycle: 4s inhale, 4s hold, 4s exhale (total 12s)
      setBreathCycleTime((prev) => {
        const next = (prev + 1) % 12;
        if (next < 4) setBreathPhase("inhale");
        else if (next < 8) setBreathPhase("hold");
        else setBreathPhase("exhale");
        return next;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [zenState, isPaused]);

  const handleStartZen = () => {
    setSecondsRemaining(180);
    setIsPaused(false);
    setZenState("active");
  };

  const handleReset = () => {
    setSecondsRemaining(180);
    setIsPaused(false);
    setZenState("ready");
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="w-full min-h-screen bg-[#fcf8f2] text-[#2e2624] font-['Be_Vietnam_Pro',sans-serif]">
      <main className="max-w-6xl mx-auto px-4 sm:px-6 pt-6 pb-20">
        {/* Top Breadcrumb & Tag */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4 text-xs text-[#8a7971]">
          <div className="flex items-center gap-2">
            <span
              onClick={onBackToExperience}
              className="hover:text-[#9e3b2e] cursor-pointer transition-colors"
            >
              Trải nghiệm
            </span>
            <span>/</span>
            <span
              onClick={onBackToExperience}
              className="hover:text-[#9e3b2e] cursor-pointer transition-colors"
            >
              Khoảng lặng
            </span>
            <span>/</span>
            <span className="text-[#9e3b2e] font-semibold">Không gian tĩnh tâm</span>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 uppercase font-semibold text-[11px] text-[#938279]">
              <span className="w-2 h-2 rounded-full bg-[#9e3b2e] inline-block"></span>
              <span>TRẢI NGHIỆM TƯƠNG TÁC • NẾP SỐNG CHẬM • PHI TÔN GIÁO & PHI TIÊN TRI</span>
            </div>
          </div>
        </div>

        {/* Header Title Section */}
        <div className="mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="font-['Noto_Serif',serif] font-bold text-2xl sm:text-3xl lg:text-[40px] text-[#2a2220] leading-tight mb-2.5">
                Không gian tĩnh tâm: Lắng đọng tâm trí giữa đời sống hiện đại
              </h1>
              <p className="text-sm sm:text-base text-[#6f5e57] leading-relaxed max-w-3xl">
                Một khoảng lặng tương tác tượng trưng lấy cảm hứng từ mỹ thuật và kiến trúc dân
                gian mộc mạc của hiên nhà Việt. Dành cho bạn 3 phút buông xả căng thẳng, chú tâm
                vào hơi thở mà không vướng bận lễ nghi.
              </p>
            </div>

            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-2xl bg-white border border-[#eddcd0] shrink-0 text-xs text-[#806f67]">
              <Flower2 className="w-4 h-4 text-[#9e3b2e]" />
              <div className="text-left">
                <div className="font-bold text-[#2a2220]">Tin Lắm Tâm Linh</div>
                <div className="text-[10px] text-[#9a8981]">Khoảng lặng thảnh thơi</div>
              </div>
            </div>
          </div>
        </div>

        {/* Interactive Controls Bar */}
        <div className="p-3 sm:p-4 rounded-2xl bg-[#fbece1]/50 border border-[#ecd5c4] mb-6 flex flex-wrap items-center justify-between gap-3 text-xs">
          {/* Mode Switcher */}
          <div className="flex items-center gap-2">
            <span className="font-semibold text-[#6f5e57]">HIỂN THỊ:</span>
            <button
              onClick={() => setViewMode("2D")}
              className={`px-3 py-1 rounded-full font-medium transition-all cursor-pointer ${
                viewMode === "2D"
                  ? "bg-[#9e3b2e] text-white shadow-2xs font-semibold"
                  : "bg-white border border-[#eddcd0] text-[#6d5c55]"
              }`}
            >
              Chế độ 2D mộc mạc (Khuyên dùng)
            </button>
            <button
              onClick={() => setViewMode("3D")}
              className={`px-3 py-1 rounded-full font-medium transition-all cursor-pointer ${
                viewMode === "3D"
                  ? "bg-[#9e3b2e] text-white shadow-2xs font-semibold"
                  : "bg-white border border-[#eddcd0] text-[#6d5c55]"
              }`}
            >
              WebGL 3D thực nghiệm <span className="text-[10px] text-[#b35e53]">Thử nghiệm</span>
            </button>
          </div>

          {/* Sound & Motion toggles */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setSoundEnabled(!soundEnabled)}
              className="px-3 py-1 rounded-full bg-white border border-[#eddcd0] text-[#6d5c55] hover:border-[#dfc3af] flex items-center gap-1.5 cursor-pointer"
            >
              {soundEnabled ? (
                <>
                  <Volume2 className="w-3.5 h-3.5 text-[#9e3b2e]" />
                  <span>Âm thanh tự nhiên: Bật</span>
                </>
              ) : (
                <>
                  <VolumeX className="w-3.5 h-3.5 text-[#a19087]" />
                  <span>Âm thanh tự nhiên: Tắt</span>
                </>
              )}
            </button>

            <button
              onClick={() => setReducedMotion(!reducedMotion)}
              className="px-3 py-1 rounded-full bg-white border border-[#eddcd0] text-[#6d5c55] hover:border-[#dfc3af] flex items-center gap-1.5 cursor-pointer"
            >
              <Wind className="w-3.5 h-3.5 text-[#9e3b2e]" />
              <span>Chuyển động: {reducedMotion ? "Tối thiểu" : "Mặc định"}</span>
            </button>
          </div>

          {/* State Switcher for quick review */}
          <div className="flex items-center gap-1.5 bg-white px-2.5 py-1 rounded-full border border-[#eddcd0]">
            <span className="font-semibold text-[#8c7a72] mr-1">Demo:</span>
            <button
              onClick={() => setZenState("ready")}
              className={`px-2 py-0.5 rounded text-[11px] font-medium ${
                zenState === "ready"
                  ? "bg-[#9e3b2e] text-white font-bold"
                  : "text-[#6b5a53] hover:text-[#9e3b2e]"
              }`}
            >
              1. Sẵn sàng
            </button>
            <button
              onClick={() => setZenState("active")}
              className={`px-2 py-0.5 rounded text-[11px] font-medium ${
                zenState === "active"
                  ? "bg-[#9e3b2e] text-white font-bold"
                  : "text-[#6b5a53] hover:text-[#9e3b2e]"
              }`}
            >
              2. Đang tĩnh tâm
            </button>
            <button
              onClick={() => setZenState("completed")}
              className={`px-2 py-0.5 rounded text-[11px] font-medium ${
                zenState === "completed"
                  ? "bg-[#9e3b2e] text-white font-bold"
                  : "text-[#6b5a53] hover:text-[#9e3b2e]"
              }`}
            >
              3. Hoàn thành
            </button>
          </div>
        </div>

        {/* 16:9 Cinematic Canvas Scene */}
        <div className="relative aspect-[16/9] w-full rounded-3xl overflow-hidden border border-[#ecd5c4] shadow-md bg-[#251f1c] mb-8 select-none">
          {/* Background Visual (Vietnamese Courtyard Veranda) */}
          <img
            src="/images/temple_bac_bo.jpg"
            alt="Hiên nhà Việt tĩnh lặng"
            className={`w-full h-full object-cover transition-all duration-1000 ${
              zenState === "active" ? "scale-105 filter blur-xs brightness-75" : "brightness-90"
            }`}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/40" />

          {/* Top-Right: Light Oil Lamp Button */}
          <div className="absolute top-4 right-4 z-20">
            <button
              onClick={() => setIsLampLit(!isLampLit)}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold backdrop-blur-md border transition-all flex items-center gap-1.5 cursor-pointer ${
                isLampLit
                  ? "bg-amber-500/90 text-white border-amber-300 shadow-md shadow-amber-500/30"
                  : "bg-black/50 text-white/90 border-white/20 hover:bg-black/70"
              }`}
            >
              <Flame
                className={`w-3.5 h-3.5 ${
                  isLampLit ? "text-amber-200 animate-pulse fill-current" : "text-amber-400"
                }`}
              />
              <span>{isLampLit ? "Ánh sáng đã thắp 🕯️" : "Thắp ánh sáng biểu tượng 🕯️"}</span>
            </button>
          </div>

          {/* Center Interactive Modal based on zenState */}
          <div className="absolute inset-0 z-10 flex items-center justify-center p-4">
            {/* ================= STATE 1: READY ================= */}
            {zenState === "ready" && (
              <div className="max-w-md w-full p-6 sm:p-8 rounded-3xl bg-[#fffdfa]/95 backdrop-blur-md border border-[#eddcd0] shadow-xl text-center">
                <div className="w-12 h-12 rounded-full bg-[#fbf3ec] border border-[#ecd9cb] mx-auto mb-3 flex items-center justify-center text-[#9e3b2e]">
                  <Flower2 className="w-6 h-6" />
                </div>

                <div className="text-xs uppercase font-bold tracking-widest text-[#9e3b2e] mb-1.5">
                  KHOẢNH KHẮC AN TRÚ
                </div>

                <h2 className="font-['Noto_Serif',serif] font-bold text-xl sm:text-2xl text-[#2a2220] mb-3">
                  Bạn đã sẵn sàng cho 3 phút an trú?
                </h2>

                <p className="text-xs sm:text-sm text-[#6c5a52] leading-relaxed mb-6">
                  Thả lỏng đôi vai, nới lỏng cơ mặt và để nhịp thở diễn ra tự nhiên. Hãy cho phép
                  bản thân tạm gác lại mọi âu lo.
                </p>

                <Button
                  variant="default"
                  size="lg"
                  onClick={handleStartZen}
                  className="w-full py-3.5 text-sm font-semibold gap-2 shadow-sm rounded-2xl"
                >
                  <span>Bắt đầu 3 phút tĩnh tâm</span>
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            )}

            {/* ================= STATE 2: ACTIVE (BREATHING & COUNTDOWN) ================= */}
            {zenState === "active" && (
              <div className="max-w-md w-full p-6 sm:p-8 rounded-3xl bg-[#1f1917]/90 backdrop-blur-md border border-white/10 shadow-2xl text-center text-white">
                {/* Breathing Ring Visualizer */}
                <div className="relative w-36 h-36 mx-auto mb-6 flex items-center justify-center">
                  <div
                    className={`absolute inset-0 rounded-full border-2 transition-all duration-1000 ${
                      breathPhase === "inhale"
                        ? "border-[#d88476] scale-110 shadow-lg shadow-[#9e3b2e]/40"
                        : breathPhase === "hold"
                        ? "border-amber-400 scale-105 shadow-md shadow-amber-400/30"
                        : "border-[#7cae9e] scale-95 shadow-sm"
                    }`}
                  />
                  <div className="text-center z-10">
                    <div className="font-mono text-2xl font-bold tracking-tight text-white mb-0.5">
                      {formatTime(secondsRemaining)}
                    </div>
                    <div className="text-[11px] text-white/60">03:00</div>
                  </div>
                </div>

                {/* Breathing Text Guide */}
                <div className="mb-6">
                  <div className="text-base sm:text-lg font-['Noto_Serif',serif] font-bold text-[#f7deda] mb-1">
                    {breathPhase === "inhale" && "Hít vào nhẹ nhàng..."}
                    {breathPhase === "hold" && "Giữ hơi an định..."}
                    {breathPhase === "exhale" && "Thở ra thảnh thơi..."}
                  </div>
                  <p className="text-xs text-white/70 italic">
                    {breathPhase === "inhale" && "Cảm nhận luồng dưỡng khí mát lành tràn ngập thân tâm."}
                    {breathPhase === "hold" && "Tĩnh tại trong khoảnh khắc hiện tiền trọn vẹn."}
                    {breathPhase === "exhale" && "Buông bỏ mọi căng thẳng theo từng nhịp thở êm."}
                  </p>
                </div>

                {/* Active Controls */}
                <div className="flex items-center justify-center gap-3">
                  <button
                    onClick={() => setIsPaused(!isPaused)}
                    className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-semibold text-white backdrop-blur-xs transition-all flex items-center gap-1.5 cursor-pointer"
                  >
                    {isPaused ? <Play className="w-3.5 h-3.5" /> : <Pause className="w-3.5 h-3.5" />}
                    <span>{isPaused ? "Tiếp tục" : "Tạm dừng"}</span>
                  </button>

                  <button
                    onClick={() => setZenState("completed")}
                    className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-semibold text-white/80 hover:text-white backdrop-blur-xs transition-all cursor-pointer"
                  >
                    Kết thúc sớm
                  </button>
                </div>
              </div>
            )}

            {/* ================= STATE 3: COMPLETED ================= */}
            {zenState === "completed" && (
              <div className="max-w-md w-full p-6 sm:p-8 rounded-3xl bg-[#fffdfa]/95 backdrop-blur-md border border-[#eddcd0] shadow-xl text-center">
                <div className="w-14 h-14 rounded-full bg-[#fbf3ec] border border-[#ecd9cb] mx-auto mb-3 flex items-center justify-center text-[#9e3b2e] shadow-2xs">
                  <CheckCircle2 className="w-8 h-8" />
                </div>

                <div className="text-xs uppercase font-bold tracking-widest text-[#9e3b2e] mb-1.5">
                  KHOẢNH KHẮC HOÀN THÀNH
                </div>

                <h2 className="font-['Noto_Serif',serif] font-bold text-xl sm:text-2xl text-[#2a2220] mb-2.5">
                  Khoảnh khắc an tĩnh đã trọn vẹn
                </h2>

                <p className="text-xs sm:text-sm text-[#6c5a52] leading-relaxed mb-6">
                  Tâm đã lắng, lòng đã nhẹ. Mang theo sự an định này bước vào những khoảnh khắc
                  tiếp theo của ngày mới bằng thái độ an hòa và thấu suốt.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-2.5">
                  <Button
                    variant="default"
                    size="sm"
                    onClick={onGoToHome}
                    className="w-full sm:w-auto px-5 py-2.5 text-xs font-semibold gap-1.5"
                  >
                    <span>Trở về Hôm nay</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Button>

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleReset}
                    className="w-full sm:w-auto px-4 py-2.5 text-xs font-semibold gap-1.5"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Bắt đầu lại</span>
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Developer Architecture Note Banner */}
        <Card className="p-4 sm:p-5 rounded-2xl bg-[#eef4f2] border border-[#d3e3dd] mb-12 shadow-2xs">
          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-white border border-[#cbe0d8] flex items-center justify-center text-[#2d6a59] shrink-0 mt-0.5">
              <Code2 className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-[#245849] flex items-center gap-2 mb-1">
                <span>CHÚ THÍCH CÔNG NGHỆ NHÚNG (DÀNH CHO ĐỘI NGŨ PHÁT TRIỂN)</span>
                <span className="px-2 py-0.5 rounded-full text-[10px] bg-white border border-[#cbe0d8] text-[#245849]">
                  Front-end Architecture
                </span>
              </div>
              <p className="text-xs text-[#3f6356] leading-relaxed">
                Khu vực trung tâm được thiết kế sẵn container{" "}
                <code className="px-1.5 py-0.5 bg-white rounded text-[#1b4e40] font-mono">
                  &lt;canvas id="folk-zen-canvas"&gt;
                </code>{" "}
                với tỷ lệ khung hình 16:9. Khi build production, engine WebGL / Three.js sẽ tự
                động hydrate thay thế ảnh 2D tĩnh nếu trình duyệt hỗ trợ GPU; trường hợp thiết bị
                bật <em>"prefers-reduced-motion"</em> hoặc không có WebGL, hệ thống giữ nguyên lớp
                nền tranh dân gian 2D tĩnh để đảm bảo hiệu năng và tính tiếp cận.
              </p>
            </div>
          </div>
        </Card>

        {/* Interactive Comparison Table: 3 States */}
        <div className="mb-14">
          <div className="mb-4">
            <div className="text-xs font-bold uppercase tracking-wider text-[#9e3b2e] mb-1">
              TÀI LIỆU TƯƠNG TÁC
            </div>
            <h2 className="font-['Noto_Serif',serif] font-bold text-xl sm:text-2xl text-[#2a2220]">
              Đối chiếu 3 trạng thái tĩnh tâm
            </h2>
            <p className="text-xs text-[#8a776e]">
              Bản xem nhanh cấu trúc luồng trải nghiệm cho người thiết kế và duyệt giao diện.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Column 1: Sẵn sàng */}
            <Card className="p-5 rounded-3xl bg-white border-[#eddcd0] flex flex-col justify-between shadow-2xs">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-['Noto_Serif',serif] font-bold text-lg text-[#2a2220]">
                    01. Sẵn sàng
                  </h3>
                  <Badge variant="outline" className="text-xs text-[#8f7e77] border-[#eddcd0]">
                    Ready
                  </Badge>
                </div>
                <p className="text-xs sm:text-sm text-[#66544c] leading-relaxed mb-4">
                  Giai đoạn ổn định tư thế và tâm thế: người dùng nhìn thấy hiên nhà trong sương mai,
                  chọn kiểm tra âm thanh hoặc bấm bắt đầu thời lượng 3 phút.
                </p>
                <ul className="space-y-1.5 text-xs text-[#7d6b63] mb-6 list-disc pl-4">
                  <li>Mặc định tắt âm lượng (tôn trọng riêng tư)</li>
                  <li>Lời nhắc thả lỏng vai và hơi thở</li>
                  <li>Tùy chọn thắp ngọn đèn dầu lọc tượng trưng</li>
                </ul>
              </div>

              <Button
                variant="outline"
                size="sm"
                onClick={() => setZenState("ready")}
                className="w-full text-xs font-semibold"
              >
                Xem mô phỏng State 1
              </Button>
            </Card>

            {/* Column 2: Đang diễn ra */}
            <Card className="p-5 rounded-3xl bg-white border-[#eddcd0] flex flex-col justify-between shadow-2xs">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-['Noto_Serif',serif] font-bold text-lg text-[#2a2220]">
                    02. Đang diễn ra
                  </h3>
                  <Badge variant="terracotta" className="text-xs bg-[#faede2] text-[#9e3b2e]">
                    Active 03:00
                  </Badge>
                </div>
                <p className="text-xs sm:text-sm text-[#66544c] leading-relaxed mb-4">
                  Khoảng đếm ngược đồng hồ nhẹ nhàng cùng vòng tròn thở (Breathing ring 4-4-4).
                  Hình ảnh nền hơi mờ nhẹ để hướng tiêu điểm vào tâm thức.
                </p>
                <ul className="space-y-1.5 text-xs text-[#7d6b63] mb-6 list-disc pl-4">
                  <li>Đồng hồ hiển thị định dạng 02:45 / 03:00</li>
                  <li>Chữ hướng dẫn nhịp thở Hít vào / Thở ra</li>
                  <li>Nút Tạm dừng và Kết thúc sớm khi cần</li>
                </ul>
              </div>

              <Button
                variant="outline"
                size="sm"
                onClick={() => setZenState("active")}
                className="w-full text-xs font-semibold"
              >
                Xem mô phỏng State 2
              </Button>
            </Card>

            {/* Column 3: Hoàn thành */}
            <Card className="p-5 rounded-3xl bg-white border-[#eddcd0] flex flex-col justify-between shadow-2xs">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-['Noto_Serif',serif] font-bold text-lg text-[#2a2220]">
                    03. Hoàn thành
                  </h3>
                  <Badge variant="outline" className="text-xs text-[#2d6a59] border-[#cbe0d8] bg-[#eef6f3]">
                    Complete
                  </Badge>
                </div>
                <p className="text-xs sm:text-sm text-[#66544c] leading-relaxed mb-4">
                  Kết thúc tĩnh lặng bằng câu chúc an lành, không tạo cảm giác thành tích giả tạo
                  hay cạnh tranh số phút tĩnh tâm.
                </p>
                <ul className="space-y-1.5 text-xs text-[#7d6b63] mb-6 list-disc pl-4">
                  <li>Thông điệp nhắc nhở tâm an tỉnh thức</li>
                  <li>Nút trở về mục Hôm nay (màn 06B/01)</li>
                  <li>Tùy chọn Bắt đầu lại nếu muốn tiếp tục</li>
                </ul>
              </div>

              <Button
                variant="outline"
                size="sm"
                onClick={() => setZenState("completed")}
                className="w-full text-xs font-semibold"
              >
                Xem mô phỏng State 3
              </Button>
            </Card>
          </div>
        </div>

        {/* Bottom Pledge Banner */}
        <Card className="p-6 rounded-3xl bg-[#fbece1]/70 border border-[#ecd5c4] mb-12 shadow-2xs">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[#faede2] border border-[#ecd9cb] flex items-center justify-center text-[#9e3b2e] shrink-0 mt-0.5">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-[#9e3b2e] mb-1.5">
                NGUYÊN TẮC KHÔNG GIAN TĨNH TÂM & MINH BẠCH VĂN HÓA
              </div>
              <p className="text-xs sm:text-sm text-[#6c5b54] leading-relaxed max-w-4xl">
                Không gian này được tạo ra hoàn toàn phi thương mại và phi tôn giáo, nhằm phục vụ sự
                an định tinh thần và tình yêu di sản văn hóa Việt của người trẻ hiện đại. Tuyệt đối
                không thay thế các nghi lễ thực tế ngoài đời, không có tính năng cúng dường, quyên
                góp tiền, xin xăm bói toán hay lời hứa hẹn chữa lành kỳ diệu.
              </p>
            </div>
          </div>
        </Card>

        {/* Footer Quote */}
        <div className="text-center pt-6 border-t border-[#eddcd0]">
          <p className="font-['Noto_Serif',serif] italic font-semibold text-lg text-[#9e3b2e] mb-1.5">
            “Tâm bình thế giới bình, lòng an vạn sự tỏ.”
          </p>
          <div className="text-xs uppercase tracking-widest text-[#938279] font-medium">
            © 2025 Tin Lắm Tâm Linh. Mọi quyền được bảo lưu.
          </div>
        </div>
      </main>
    </div>
  );
};
