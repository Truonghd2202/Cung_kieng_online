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
  Compass,
  Wind,
  Layers,
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
  // 3 States: 'ready' | 'active' | 'completed'
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

  // Canvas ref for 3D Perspective Scene
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Web Audio Context for authentic harmonic singing bowl & ambient breeze
  const audioContextRef = useRef<AudioContext | null>(null);
  const activeNodesRef = useRef<{ [key: string]: any }>({});

  const startAmbientSound = () => {
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      audioContextRef.current = ctx;

      // Master gain
      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(0.08, ctx.currentTime);
      masterGain.connect(ctx.destination);

      // 1. Warm Pink/Brown Noise Generator for gentle natural breeze/stream
      const bufferSize = ctx.sampleRate * 2;
      const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      let b0 = 0, b1 = 0, b2 = 0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        b0 = 0.99 * b0 + white * 0.05;
        b1 = 0.96 * b1 + white * 0.11;
        b2 = 0.86 * b2 + white * 0.25;
        output[i] = (b0 + b1 + b2) * 0.15;
      }

      const whiteNoise = ctx.createBufferSource();
      whiteNoise.buffer = noiseBuffer;
      whiteNoise.loop = true;

      const filter = ctx.createBiquadFilter();
      filter.type = "lowpass";
      filter.frequency.setValueAtTime(320, ctx.currentTime);

      const noiseGain = ctx.createGain();
      noiseGain.gain.setValueAtTime(0.04, ctx.currentTime);

      whiteNoise.connect(filter);
      filter.connect(noiseGain);
      noiseGain.connect(masterGain);
      whiteNoise.start();

      // 2. Gentle Singing Bowl Resonance (Fundamental 108Hz + 216Hz + 432Hz harmonics)
      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const bowlGain1 = ctx.createGain();
      const bowlGain2 = ctx.createGain();

      osc1.type = "sine";
      osc1.frequency.setValueAtTime(108, ctx.currentTime);
      bowlGain1.gain.setValueAtTime(0.03, ctx.currentTime);

      osc2.type = "sine";
      osc2.frequency.setValueAtTime(216.5, ctx.currentTime); // Slight detune for natural vibrato beat
      bowlGain2.gain.setValueAtTime(0.02, ctx.currentTime);

      osc1.connect(bowlGain1);
      osc2.connect(bowlGain2);
      bowlGain1.connect(masterGain);
      bowlGain2.connect(masterGain);

      osc1.start();
      osc2.start();

      activeNodesRef.current = {
        whiteNoise,
        osc1,
        osc2,
        masterGain,
      };
    } catch {}
  };

  const stopAmbientSound = () => {
    try {
      if (activeNodesRef.current.osc1) activeNodesRef.current.osc1.stop();
      if (activeNodesRef.current.osc2) activeNodesRef.current.osc2.stop();
      if (activeNodesRef.current.whiteNoise) activeNodesRef.current.whiteNoise.stop();
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    } catch {}
    activeNodesRef.current = {};
    audioContextRef.current = null;
  };

  useEffect(() => {
    if (soundEnabled && zenState === "active") {
      startAmbientSound();
    } else {
      stopAmbientSound();
    }
    return () => stopAmbientSound();
  }, [soundEnabled, zenState]);

  // Timer interval & Breathing Cycle
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

  // 3D Canvas Rendering Engine (Perspective Projection with 3D Particles & Golden Bell)
  useEffect(() => {
    if (viewMode !== "3D") return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    const width = (canvas.width = canvas.offsetWidth || 800);
    const height = (canvas.height = canvas.offsetHeight || 450);

    // Generate 3D floating particles
    const particleCount = reducedMotion ? 25 : 65;
    const particles = Array.from({ length: particleCount }, () => ({
      x: (Math.random() - 0.5) * 600,
      y: (Math.random() - 0.5) * 400,
      z: Math.random() * 800 + 100,
      speedZ: Math.random() * 0.8 + 0.3,
      radius: Math.random() * 2 + 1.2,
      opacity: Math.random() * 0.7 + 0.3,
    }));

    let angle = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Radial dark background with atmospheric mist
      const grad = ctx.createRadialGradient(
        width / 2,
        height / 2,
        40,
        width / 2,
        height / 2,
        width / 1.4
      );
      grad.addColorStop(0, isLampLit ? "#2f1e16" : "#1c1715");
      grad.addColorStop(1, "#0f0c0b");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, height);

      const fov = 350;
      const centerX = width / 2;
      const centerY = height / 2;

      // Draw 3D rotating lotus / meditation platform
      angle += reducedMotion ? 0.002 : 0.008;
      const pulse =
        breathPhase === "inhale"
          ? 1.08
          : breathPhase === "hold"
          ? 1.05
          : 0.96;

      ctx.save();
      ctx.translate(centerX, centerY + 20);

      // Concentric 3D elliptical rings
      for (let r = 1; r <= 3; r++) {
        ctx.beginPath();
        ctx.ellipse(0, 40, (110 - r * 15) * pulse, (35 - r * 5) * pulse, 0, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(216, 132, 118, ${0.15 + r * 0.1})`;
        ctx.lineWidth = 1.5;
        ctx.stroke();
      }

      // Golden Lantern / Singing Bowl Center Glow
      if (isLampLit) {
        const glow = ctx.createRadialGradient(0, -10, 2, 0, -10, 80);
        glow.addColorStop(0, "rgba(251, 191, 36, 0.6)");
        glow.addColorStop(0.5, "rgba(245, 158, 11, 0.2)");
        glow.addColorStop(1, "rgba(245, 158, 11, 0)");
        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(0, -10, 80, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.restore();

      // Render 3D Perspective Particles
      particles.forEach((p) => {
        p.z -= p.speedZ;
        if (p.z <= 10) {
          p.z = 800;
          p.x = (Math.random() - 0.5) * 600;
          p.y = (Math.random() - 0.5) * 400;
        }

        const scale = fov / (fov + p.z);
        const projX = centerX + p.x * scale;
        const projY = centerY + p.y * scale;
        const projRadius = p.radius * scale * (isLampLit ? 1.3 : 1);

        if (projX >= 0 && projX <= width && projY >= 0 && projY <= height) {
          ctx.beginPath();
          ctx.arc(projX, projY, Math.max(0.5, projRadius), 0, Math.PI * 2);
          ctx.fillStyle = isLampLit
            ? `rgba(251, 191, 36, ${p.opacity * scale})`
            : `rgba(235, 214, 197, ${p.opacity * scale * 0.75})`;
          ctx.fill();
        }
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [viewMode, breathPhase, isLampLit, reducedMotion]);

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

          <div className="flex items-center gap-1.5 uppercase font-semibold text-[11px] text-[#938279]">
            <span className="w-2 h-2 rounded-full bg-[#9e3b2e] inline-block"></span>
            <span>TRẢI NGHIỆM TƯƠNG TÁC • NẾP SỐNG CHẬM • PHI TÔN GIÁO & PHI TIÊN TRI</span>
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

            <div className="hidden sm:flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-white border border-[#eddcd0] shrink-0 text-xs text-[#806f67] shadow-2xs">
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
              className={`px-3 py-1.5 rounded-full font-medium transition-all cursor-pointer flex items-center gap-1.5 ${
                viewMode === "2D"
                  ? "bg-[#9e3b2e] text-white shadow-2xs font-semibold"
                  : "bg-white border border-[#eddcd0] text-[#6d5c55] hover:border-[#dfc3af]"
              }`}
            >
              <span>Chế độ 2D hiên nhà</span>
            </button>
            <button
              onClick={() => setViewMode("3D")}
              className={`px-3 py-1.5 rounded-full font-medium transition-all cursor-pointer flex items-center gap-1.5 ${
                viewMode === "3D"
                  ? "bg-[#9e3b2e] text-white shadow-2xs font-semibold"
                  : "bg-white border border-[#eddcd0] text-[#6d5c55] hover:border-[#dfc3af]"
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Không gian 3D chiều sâu</span>
            </button>
          </div>

          {/* Sound & Motion toggles */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setSoundEnabled(!soundEnabled)}
              className={`px-3 py-1.5 rounded-full border transition-all flex items-center gap-1.5 cursor-pointer ${
                soundEnabled
                  ? "bg-[#9e3b2e] text-white border-[#9e3b2e] font-semibold shadow-2xs"
                  : "bg-white border-[#eddcd0] text-[#6d5c55] hover:border-[#dfc3af]"
              }`}
            >
              {soundEnabled ? (
                <>
                  <Volume2 className="w-3.5 h-3.5 text-amber-200" />
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
              className="px-3 py-1.5 rounded-full bg-white border border-[#eddcd0] text-[#6d5c55] hover:border-[#dfc3af] flex items-center gap-1.5 cursor-pointer"
            >
              <Wind className="w-3.5 h-3.5 text-[#9e3b2e]" />
              <span>Chuyển động: {reducedMotion ? "Tối thiểu" : "Mặc định"}</span>
            </button>
          </div>
        </div>

        {/* 16:9 Cinematic Canvas Scene */}
        <div className="relative aspect-[16/9] w-full rounded-3xl overflow-hidden border border-[#ecd5c4] shadow-md bg-[#161211] mb-8 select-none">
          {viewMode === "2D" ? (
            <>
              {/* Background Visual (Vietnamese Courtyard Veranda) */}
              <img
                src="/images/temple_bac_bo.jpg"
                alt="Hiên nhà Việt tĩnh lặng"
                className={`w-full h-full object-cover transition-all duration-1000 ${
                  zenState === "active" ? "scale-105 filter blur-xs brightness-75" : "brightness-90"
                }`}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/40" />
            </>
          ) : (
            /* Real 3D Perspective Canvas */
            <canvas
              ref={canvasRef}
              className="w-full h-full block absolute inset-0 z-0"
            />
          )}

          {/* Top-Right: Light Oil Lamp Button */}
          <div className="absolute top-4 right-4 z-20">
            <button
              onClick={() => setIsLampLit(!isLampLit)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold backdrop-blur-md border transition-all flex items-center gap-1.5 cursor-pointer ${
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

        {/* 3 Mindful Living Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card className="p-6 rounded-3xl bg-white border border-[#eddcd0] shadow-2xs">
            <div className="w-10 h-10 rounded-2xl bg-[#faede2] text-[#9e3b2e] flex items-center justify-center mb-4">
              <Flower2 className="w-5 h-5" />
            </div>
            <h3 className="font-['Noto_Serif',serif] font-bold text-base text-[#2a2220] mb-2">
              01. Thả lỏng thân thể
            </h3>
            <p className="text-xs sm:text-sm text-[#6e5d56] leading-relaxed">
              Ngồi thẳng lưng tự nhiên, thả lỏng bờ vai và khớp hàm. Để trọng lực nâng đỡ thân thể
              mà không gồng cứng hay tạo áp lực.
            </p>
          </Card>

          <Card className="p-6 rounded-3xl bg-white border border-[#eddcd0] shadow-2xs">
            <div className="w-10 h-10 rounded-2xl bg-[#faede2] text-[#9e3b2e] flex items-center justify-center mb-4">
              <Wind className="w-5 h-5" />
            </div>
            <h3 className="font-['Noto_Serif',serif] font-bold text-base text-[#2a2220] mb-2">
              02. Nhận diện hơi thở
            </h3>
            <p className="text-xs sm:text-sm text-[#6e5d56] leading-relaxed">
              Chỉ đơn giản nhận biết hơi thở vào và hơi thở ra. Khi tâm trí đi lang thang, nhẹ
              nhàng mỉm cười và đưa sự chú ý trở về luồng dưỡng khí.
            </p>
          </Card>

          <Card className="p-6 rounded-3xl bg-white border border-[#eddcd0] shadow-2xs">
            <div className="w-10 h-10 rounded-2xl bg-[#faede2] text-[#9e3b2e] flex items-center justify-center mb-4">
              <Sparkles className="w-5 h-5" />
            </div>
            <h3 className="font-['Noto_Serif',serif] font-bold text-base text-[#2a2220] mb-2">
              03. Nuôi dưỡng an tĩnh
            </h3>
            <p className="text-xs sm:text-sm text-[#6e5d56] leading-relaxed">
              Sự an định không đến từ việc cưỡng ép tâm trí ngừng suy nghĩ, mà đến từ sự chấp
              nhận bao dung trước mọi trạng thái đang hiện diện.
            </p>
          </Card>
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
