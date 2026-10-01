import React, { useState, useRef, useEffect } from "react";
import {
  Lock,
  Mail,
  Eye,
  EyeOff,
  LogIn,
  Sparkles,
  Loader2,
  CheckCircle2,
  Volume2,
  VolumeX,
} from "lucide-react";
import { loginAccount } from "../data/authService";

interface LoginScreenProps {
  onBack?: () => void;
  onSuccess: (name?: string, email?: string) => void;
  onGoToRegister: () => void;
  onGoToForgotPassword?: () => void;
  pendingSignalMood?: string;
}

type AuthState = "idle" | "submitting" | "success" | "error";

interface SmokeParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  maxRadius: number;
  alpha: number;
  maxAlpha: number;
  age: number;
  maxAge: number;
  swirlSpeed: number;
  seed: number;
  shade: number;
}

interface SparkParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  life: number;
  maxLife: number;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({
  onSuccess,
  onGoToRegister,
  onGoToForgotPassword,
  pendingSignalMood,
}) => {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [authState, setAuthState] = useState<AuthState>("idle");
  const [isMuted, setIsMuted] = useState(false);
  const [countdown, setCountdown] = useState(15);

  const isSubmitting = authState === "submitting";
  const isSuccess = authState === "success";

  // Canvas, Image & Audio refs
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const leftSectionRef = useRef<HTMLElement | null>(null);
  const altarImageRef = useRef<HTMLImageElement | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const audioElementRef = useRef<HTMLAudioElement | null>(null);

  // ÂM THANH THIỀN ĐỊNH: Tiếng chuông bát thiền cổ (Tibetan Singing Bowl) ngân vang sâu thẳm & linh thiêng
  const playSynthesizedBell = (ctx: AudioContext, now: number) => {
    const masterGain = ctx.createGain();
    masterGain.gain.setValueAtTime(0.2, now);
    masterGain.connect(ctx.destination);

    // 1. Tiếng chuông thiền đồng thứ nhất (Tần số 432Hz - ngân vang 14 giây)
    const bellFrequencies = [432, 864, 1296, 216];
    const bellGains = [0.15, 0.08, 0.03, 0.1];

    bellFrequencies.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(freq + (Math.random() - 0.5) * 1.5, now);

      gain.gain.setValueAtTime(0, now);
      gain.gain.linearRampToValueAtTime(bellGains[idx], now + 0.1);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 14.0);

      osc.connect(gain);
      gain.connect(masterGain);

      osc.start(now);
      osc.stop(now + 14.5);
    });

    // 2. Tiếng chuông thứ hai ngân sau 5.5 giây
    const strike2 = now + 5.5;
    const bell2Freqs = [540, 1080, 270];
    bell2Freqs.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, strike2);

      gain.gain.setValueAtTime(0, strike2);
      gain.gain.linearRampToValueAtTime(0.08 / (idx + 1), strike2 + 0.08);
      gain.gain.exponentialRampToValueAtTime(0.0001, strike2 + 9.5);

      osc.connect(gain);
      gain.connect(masterGain);

      osc.start(strike2);
      osc.stop(strike2 + 10.0);
    });

    // 3. Âm nền trầm ấm 108Hz (Harmonic Zen Pad)
    const droneOsc = ctx.createOscillator();
    const droneGain = ctx.createGain();
    const droneFilter = ctx.createBiquadFilter();

    droneOsc.type = "triangle";
    droneOsc.frequency.setValueAtTime(108, now);
    droneFilter.type = "lowpass";
    droneFilter.frequency.setValueAtTime(280, now);

    droneGain.gain.setValueAtTime(0, now);
    droneGain.gain.linearRampToValueAtTime(0.05, now + 2.5);
    droneGain.gain.setValueAtTime(0.05, now + 12.0);
    droneGain.gain.linearRampToValueAtTime(0, now + 15.0);

    droneOsc.connect(droneFilter);
    droneFilter.connect(droneGain);
    droneGain.connect(masterGain);

    droneOsc.start(now);
    droneOsc.stop(now + 15.5);
  };

  const startWebAudioFallback = () => {
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      if (ctx.state === "suspended") {
        ctx.resume();
      }
      audioCtxRef.current = ctx;
      playSynthesizedBell(ctx, ctx.currentTime);
    } catch {}
  };

  const playZenBellSound = () => {
    if (isMuted) return;

    // Ưu tiên phát file âm thanh chuông bát thiền cổ / Tibetan Singing Bowl thật
    try {
      const audio = new Audio("/audio/meditation-bowl.mp3");
      audio.volume = 0.9;
      audio.muted = isMuted;
      audioElementRef.current = audio;

      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          startWebAudioFallback();
        });
      }
    } catch {
      startWebAudioFallback();
    }
  };

  // Đồng bộ trạng thái tắt/bật tiếng khi người dùng bấm icon loa
  useEffect(() => {
    if (audioElementRef.current) {
      audioElementRef.current.muted = isMuted;
    }
    if (audioCtxRef.current) {
      if (isMuted && audioCtxRef.current.state === "running") {
        audioCtxRef.current.suspend().catch(() => {});
      } else if (!isMuted && audioCtxRef.current.state === "suspended") {
        audioCtxRef.current.resume().catch(() => {});
      }
    }
  }, [isMuted]);

  // Đếm ngược 15s hiển thị trạng thái thanh tịnh
  useEffect(() => {
    if (!isSuccess) return;
    const interval = setInterval(() => {
      setCountdown((prev) => (prev > 1 ? prev - 1 : 1));
    }, 1000);
    return () => clearInterval(interval);
  }, [isSuccess]);

  // Hiệu ứng Canvas: Nén hương trầm cắm CHÍNH XÁC VÀO LÒNG LƯ HƯƠNG & Khói trầm vật lý hạt mờ thực tế
  useEffect(() => {
    if (!isSuccess) return;

    const canvas = canvasRef.current;
    const section = leftSectionRef.current;
    const altarImg = altarImageRef.current;
    if (!canvas || !section) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = section.clientWidth);
    let height = (canvas.height = section.clientHeight);

    const particles: SmokeParticle[] = [];
    const sparks: SparkParticle[] = [];
    const startTime = performance.now();

    const render = (now: number) => {
      const elapsed = (now - startTime) / 1000;

      // Đồng bộ kích thước canvas liên tục khi màn hình mở rộng full màn hình
      if (
        section &&
        (canvas.width !== section.clientWidth ||
          canvas.height !== section.clientHeight)
      ) {
        width = canvas.width = section.clientWidth;
        height = canvas.height = section.clientHeight;
      }

      ctx.clearRect(0, 0, width, height);

      // TỌA ĐỘ HÌNH HỌC CHÍNH XÁC TUYỆT ĐỐI CỦA MIỆNG LƯ HƯƠNG TRÊN ẢNH GỐC 1672 x 941
      const imgNativeW = 1672;
      const imgNativeH = 941;
      const scale = Math.max(width / imgNativeW, height / imgNativeH);
      const imgOffsetX = (width - imgNativeW * scale) / 2;
      const imgOffsetY = (height - imgNativeH * scale) / 2;

      // Tâm miệng lư hương trong ảnh gốc: X = 837, Y = 673 (LÒNG MIỆNG LƯ HƯƠNG)
      const censerMouthX = imgOffsetX + 837 * scale;
      const censerMouthY = imgOffsetY + 673 * scale; // Điểm cắm nhang vào tro
      const stickLength = 115 * scale; // Chiều dài nén nhang cân đối hoàn hảo

      // TIẾN TRÌNH HẠ NHANG TỪ TỪ: Bắt đầu từ giây 0.8 đến 3.2s
      const stickStartTime = 0.8;
      const stickDuration = 2.4;
      const stickProgress = Math.max(
        0,
        Math.min(1, (elapsed - stickStartTime) / stickDuration)
      );
      const stickEase = 1 - Math.pow(1 - stickProgress, 3);
      const currentStickTipY = censerMouthY - stickLength * stickEase;

      // 3 nén nhang: cắm chụm vào giữa miệng lư đồng (X: 831, 837, 843), ngọn hơi xòe nhẹ tự nhiên
      const stickConfigs = [
        { baseXOffset: -3.5 * scale, tipXOffset: -9 * scale },
        { baseXOffset: 0, tipXOffset: 0 },
        { baseXOffset: 3.5 * scale, tipXOffset: 9 * scale },
      ];

      const tips: { x: number; y: number }[] = [];

      // 1. VẼ 3 NÉN NHANG TRẦM CẮM VÀO TRONG MIỆNG LƯ
      if (stickProgress > 0) {
        stickConfigs.forEach((cfg) => {
          const baseX = censerMouthX + cfg.baseXOffset;
          const baseY = censerMouthY; // Đáy nhang nằm ngay tại miệng bát tro
          const tipX = censerMouthX + cfg.tipXOffset * stickEase;
          const tipY = currentStickTipY;

          tips.push({ x: tipX, y: tipY });

          ctx.save();
          ctx.globalAlpha = Math.min(1, stickProgress * 1.5);

          // Bóng mờ nhẹ tạo chiều sâu
          ctx.beginPath();
          ctx.moveTo(baseX + 1, baseY);
          ctx.lineTo(tipX + 1, tipY);
          ctx.strokeStyle = "rgba(0, 0, 0, 0.4)";
          ctx.lineWidth = 2.0 * scale;
          ctx.lineCap = "round";
          ctx.stroke();

          // Thân nén nhang: Bột trầm hương mộc mạc màu nâu quế đất
          ctx.beginPath();
          ctx.moveTo(baseX, baseY);
          ctx.lineTo(tipX, tipY);
          const stickGrad = ctx.createLinearGradient(baseX, baseY, tipX, tipY);
          stickGrad.addColorStop(0, "#4a2d16");
          stickGrad.addColorStop(0.3, "#7a4e2a");
          stickGrad.addColorStop(0.75, "#8f5e33");
          stickGrad.addColorStop(1, "#593719");
          ctx.strokeStyle = stickGrad;
          ctx.lineWidth = 1.9 * scale;
          ctx.lineCap = "round";
          ctx.stroke();

          // Đoạn tăm tre màu đỏ mận truyền thống ở sát gốc cắm
          ctx.beginPath();
          ctx.moveTo(baseX, baseY);
          ctx.lineTo(baseX + (tipX - baseX) * 0.16, baseY + (tipY - baseY) * 0.16);
          ctx.strokeStyle = "#8b1e28";
          ctx.lineWidth = 1.7 * scale;
          ctx.stroke();

          // ĐẦU NÉN NHANG: Đốm than đỏ hồng và mẩu tàn tro xám tự nhiên
          if (stickProgress >= 0.6) {
            const emberGlowProgress = Math.min(1, (stickProgress - 0.6) / 0.4);
            const emberPulse =
              (0.8 + 0.2 * Math.sin(now * 0.0045 + cfg.tipXOffset)) *
              emberGlowProgress;

            // Mẩu tàn tro xám dài khoảng 3.5px vươn nhẹ lên trên đầu than
            ctx.beginPath();
            ctx.moveTo(tipX, tipY);
            ctx.lineTo(
              tipX + (cfg.tipXOffset > 0 ? 0.7 : -0.7) * scale,
              tipY - 3.5 * scale
            );
            ctx.strokeStyle = `rgba(215, 212, 208, ${0.9 * emberGlowProgress})`;
            ctx.lineWidth = 1.5 * scale;
            ctx.lineCap = "round";
            ctx.stroke();

            // Đốm than đỏ hồng âm ỉ ngay dưới tàn tro
            ctx.beginPath();
            ctx.arc(tipX, tipY - 0.5 * scale, 1.4 * scale, 0, Math.PI * 2);
            const emberGrad = ctx.createRadialGradient(
              tipX,
              tipY - 0.5 * scale,
              0,
              tipX,
              tipY - 0.5 * scale,
              1.9 * scale
            );
            emberGrad.addColorStop(0, `rgba(255, 248, 220, ${emberPulse})`);
            emberGrad.addColorStop(0.4, `rgba(255, 75, 10, ${emberPulse * 0.95})`);
            emberGrad.addColorStop(0.9, `rgba(185, 20, 0, ${emberPulse * 0.8})`);
            emberGrad.addColorStop(1, "rgba(185, 20, 0, 0)");
            ctx.fillStyle = emberGrad;
            ctx.fill();

            // Ánh hào quang ấm nhẹ quanh than
            ctx.beginPath();
            ctx.arc(tipX, tipY - 0.5 * scale, 5.5 * scale, 0, Math.PI * 2);
            const haloGrad = ctx.createRadialGradient(
              tipX,
              tipY - 0.5 * scale,
              0,
              tipX,
              tipY - 0.5 * scale,
              5.5 * scale
            );
            haloGrad.addColorStop(0, `rgba(255, 120, 20, ${emberPulse * 0.35})`);
            haloGrad.addColorStop(1, "rgba(255, 80, 0, 0)");
            ctx.fillStyle = haloGrad;
            ctx.fill();
          }

          ctx.restore();
        });

        // TÁI HIỆN CHIỀU SÂU 3D: VẼ LẠI MẢNH VÀNH MIỆNG TRƯỚC CỦA LƯ ĐỒNG ĐỂ CHE CHÂN NHANG
        // Giúp 3 nén nhang nằm 100% BÊN TRONG LÒNG LƯ HƯƠNG thay vì bị cắm đè lên ngoài mặt trước!
        if (altarImg && altarImg.complete) {
          ctx.save();
          // Cắt đúng mẩu vành môi miệng lư hương phía trước trong ảnh gốc (X: 808 -> 866, Y: 673 -> 687)
          ctx.drawImage(
            altarImg,
            808,
            673,
            58,
            14,
            imgOffsetX + 808 * scale,
            imgOffsetY + 673 * scale,
            58 * scale,
            14 * scale
          );
          ctx.restore();
        }
      }

      // 2. KHÓI TRẦM THỰC TẾ (HẠT KHÍ ĐỘNG HỌC MỜ ẢO - KHÔNG PHẢI VECTƠ AI)
      const smokeStartTime = 2.8;
      if (elapsed > smokeStartTime && tips.length === 3) {
        const smokeGrowth = Math.min(1, (elapsed - smokeStartTime) / 3.0);

        // Sinh hạt khói từ 3 đầu nén nhang
        tips.forEach((tip) => {
          // Sinh các hạt khói mềm theo chu kỳ dòng chảy
          if (Math.random() < 0.65 * smokeGrowth) {
            particles.push({
              x: tip.x + (Math.random() - 0.5) * 1.0 * scale,
              y: tip.y - 3.5 * scale,
              vx: (Math.random() - 0.5) * 0.08,
              vy: -(0.85 + Math.random() * 0.45) * scale,
              radius: 0.8 * scale, // Ban đầu mảnh mai như sợi chỉ
              maxRadius: (6 + Math.random() * 7) * scale, // Khi lên cao nở 6px - 13px mờ nhẹ
              alpha: 0,
              maxAlpha: (0.05 + Math.random() * 0.035) * smokeGrowth, // Trong suốt thanh tịnh
              age: 0,
              maxAge: 220 + Math.random() * 80,
              swirlSpeed: 0.85 + Math.random() * 0.6,
              seed: Math.random() * 100,
              shade: 242 + Math.floor(Math.random() * 12),
            });
          }

          // Thỉnh thoảng có 1 tàn than li ti bay lên
          if (Math.random() < 0.012 * smokeGrowth) {
            sparks.push({
              x: tip.x + (Math.random() - 0.5) * 1.5 * scale,
              y: tip.y - 3.5 * scale,
              vx: (Math.random() - 0.5) * 0.3,
              vy: -(1.0 + Math.random() * 0.9) * scale,
              size: (0.6 + Math.random() * 0.5) * scale,
              life: 0,
              maxLife: 24 + Math.random() * 18,
            });
          }
        });

        // CẬP NHẬT VÀ VẼ HẠT KHÓI TRẦM MỀM MẠI
        for (let i = particles.length - 1; i >= 0; i--) {
          const p = particles[i];
          p.age++;

          if (p.age >= p.maxAge) {
            particles.splice(i, 1);
            continue;
          }

          const progress = p.age / p.maxAge;

          // Chuyển động cuộn xoáy tự nhiên kết hợp nhiều tần số sóng (không lặp lại hình sin đơn điệu)
          const turbulence =
            Math.sin(now * 0.0014 * p.swirlSpeed + p.seed + p.y * 0.011) * 0.35 +
            Math.sin(now * 0.0025 + p.y * 0.023) * 0.15;

          p.x += p.vx + turbulence * (0.2 + progress * 0.8) * scale;
          p.y += p.vy;

          // Bán kính nở dần rất êm dịu
          p.radius =
            0.8 * scale +
            (p.maxRadius - 0.8 * scale) * Math.pow(progress, 0.7);

          // Độ mờ: nở nhẹ rồi tan biến dần vào không khí
          if (progress < 0.18) {
            p.alpha = (progress / 0.18) * p.maxAlpha;
          } else {
            p.alpha = Math.max(0, (1 - (progress - 0.18) / 0.82) * p.maxAlpha);
          }

          // Vẽ đốm khói bằng radial gradient đa tầng mờ ảo
          ctx.save();
          const smokeGrad = ctx.createRadialGradient(
            p.x,
            p.y,
            0,
            p.x,
            p.y,
            p.radius
          );
          smokeGrad.addColorStop(
            0,
            `rgba(${p.shade}, ${p.shade - 2}, ${p.shade - 5}, ${p.alpha})`
          );
          smokeGrad.addColorStop(
            0.5,
            `rgba(${p.shade - 8}, ${p.shade - 10}, ${p.shade - 12}, ${
              p.alpha * 0.45
            })`
          );
          smokeGrad.addColorStop(1, "rgba(220, 216, 210, 0)");

          ctx.fillStyle = smokeGrad;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        }

        // VẼ TÀN LỬA LI TI
        for (let j = sparks.length - 1; j >= 0; j--) {
          const s = sparks[j];
          s.life++;
          if (s.life >= s.maxLife) {
            sparks.splice(j, 1);
            continue;
          }
          s.x += s.vx;
          s.y += s.vy;
          const sProgress = s.life / s.maxLife;
          const sAlpha = (1 - sProgress) * 0.75;

          ctx.save();
          ctx.beginPath();
          ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, ${170 - sProgress * 80}, 60, ${sAlpha})`;
          ctx.shadowColor = "#ff7043";
          ctx.shadowBlur = 3;
          ctx.fill();
          ctx.restore();
        }
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      if (audioElementRef.current) {
        audioElementRef.current.pause();
        audioElementRef.current = null;
      }
      if (audioCtxRef.current) {
        audioCtxRef.current.close().catch(() => {});
      }
    };
  }, [isSuccess, isMuted]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting || isSuccess) return;

    setErrorMessage("");
    setAuthState("submitting");

    // Kiểm tra thông tin tài khoản
    setTimeout(() => {
      const result = loginAccount(identifier, password);
      if (!result.success) {
        setAuthState("error");
        setErrorMessage(result.error || "Tài khoản hoặc mật khẩu không chính xác.");
        return;
      }

      // Đăng nhập thành công -> Bàn thờ tự động phóng to FULL MÀN HÌNH
      setAuthState("success");

      // Khởi động tiếng chuông thiền ngân vang thanh tịnh
      playZenBellSound();

      // Giữ không gian thanh tịnh trong đúng 15 giây (khoảng 10-20s theo yêu cầu) rồi tự động chuyển vào trang chủ
      setTimeout(() => {
        onSuccess(result.user?.name, result.user?.email);
      }, 15000);
    }, 280);
  };

  const handleGoogleLogin = () => {
    if (isSubmitting || isSuccess) return;
    setErrorMessage("");
    setAuthState("submitting");

    setTimeout(() => {
      const googleUser = {
        name: "Phật Tử Thiện Tâm",
        email: "thientam.google@gmail.com",
      };
      setAuthState("success");
      playZenBellSound();

      setTimeout(() => {
        onSuccess(googleUser.name, googleUser.email);
      }, 15000);
    }, 300);
  };

  return (
    <div className="relative min-h-[calc(100vh-64px)] w-full flex flex-col lg:flex-row bg-canvas text-ink transition-colors duration-500 overflow-hidden">
      {/* CỘT TRÁI: BÀN THỜ TÂM LINH CỔ TRUYỀN (KHI ĐĂNG NHẬP SẼ MỞ RỘNG FULL 100% TOÀN MÀN HÌNH) */}
      <section
        ref={leftSectionRef}
        aria-label="Không gian Điểm Tựa Tĩnh Lặng"
        onClick={() => {
          if (isSuccess) {
            onSuccess(identifier || "An Nhiên", identifier);
          }
        }}
        title={isSuccess ? "Bấm vào bất kỳ đâu để vào trang chủ ngay" : undefined}
        className={`relative flex flex-col justify-end select-none bg-stone-950 transition-all duration-1000 ease-in-out ${
          isSuccess
            ? "w-full min-h-[calc(100vh-64px)] z-30 cursor-pointer"
            : "w-full lg:w-1/2 min-h-[420px] lg:min-h-full"
        }`}
      >
        {/* Nút bật/tắt tiếng chuông thiền ở góc trên bàn thờ khi full màn hình */}
        {isSuccess && (
          <div className="absolute top-4 right-4 z-40 flex items-center gap-2">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setIsMuted(!isMuted);
              }}
              className="p-2 rounded-full bg-stone-900/60 hover:bg-stone-900/90 text-amber-200/90 hover:text-amber-100 border border-amber-500/30 backdrop-blur-md shadow-lg transition-all cursor-pointer"
              title={isMuted ? "Bật chuông thiền" : "Tắt chuông thiền"}
              aria-label={isMuted ? "Bật chuông thiền" : "Tắt chuông thiền"}
            >
              {isMuted ? (
                <VolumeX className="w-4 h-4" />
              ) : (
                <Volume2 className="w-4 h-4 text-amber-400 animate-pulse" />
              )}
            </button>
          </div>
        )}

        {/* Ảnh nền bàn thờ nguyên bản với độ sâu và ánh sáng tự nhiên */}
        <img
          ref={altarImageRef}
          src="/images/login-altar-scene-v2.png"
          alt="Bàn thờ gia tiên trang nghiêm"
          className={`absolute inset-0 w-full h-full object-cover object-center pointer-events-none transition-all duration-1000 ${
            isSuccess ? "scale-[1.03] filter brightness(1.04)" : "scale-100"
          }`}
        />

        {/* Lớp phủ vầng sáng ấm đèn dầu lung linh */}
        <div
          className={`absolute inset-0 bg-radial from-amber-500/12 via-transparent to-black/25 pointer-events-none transition-opacity duration-1000 ${
            isSuccess ? "opacity-100 animate-pulse duration-1000" : "opacity-75"
          }`}
        />

        {/* Vầng hào quang thanh tịnh bừng sáng quanh lư hương khi dâng hương */}
        {isSuccess && (
          <div className="absolute left-1/2 top-[69.5%] -translate-x-1/2 -translate-y-1/2 w-[480px] h-[480px] rounded-full bg-gradient-to-t from-amber-500/20 via-orange-400/10 to-transparent blur-3xl animate-pulse duration-1000 pointer-events-none" />
        )}

        {/* CANVAS VẼ 3 NÉN NHANG CẮM THẬT VÀO LƯ & KHÓI TRẦM THỰC TẾ (60 FPS) */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full pointer-events-none z-20"
        />

        {/* Lớp phủ chân bàn thờ nhẹ nhàng ở đáy để tôn vẻ sâu lắng của đồ gỗ */}
        <div className="absolute bottom-0 inset-x-0 h-10 bg-gradient-to-t from-stone-950/60 to-transparent pointer-events-none z-10" />
      </section>

      {/* CỘT PHẢI: FORM ĐĂNG NHẬP GÓC AN TRÚ (TỰ ĐỘNG THU VÀ MỜ BIẾN KHI CLICK ĐĂNG NHẬP) */}
      <section
        aria-label="Biểu mẫu đăng nhập"
        className={`transition-all duration-700 ease-in-out ${
          isSuccess
            ? "opacity-0 translate-x-16 pointer-events-none w-0 h-0 p-0 overflow-hidden flex-none"
            : "relative w-full lg:w-1/2 flex items-center justify-center p-4 sm:p-8 lg:p-12 overflow-hidden opacity-100 translate-x-0 bg-canvas transition-colors duration-500"
        }`}
      >
        {/* Đường vân khói lượn sóng mờ tinh tế phía sau */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none stroke-[var(--ui-line)] fill-none opacity-60"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          viewBox="0 0 100 100"
          aria-hidden="true"
        >
          <path
            d="M 72 0 C 63 24, 76 44, 66 64 C 58 80, 73 90, 68 100"
            strokeWidth="0.55"
          />
          <path
            d="M 80 0 C 86 28, 70 50, 81 74 C 87 88, 76 95, 80 100"
            strokeWidth="0.4"
          />
        </svg>

        {/* THẺ ĐĂNG NHẬP CHIÊM NGHIỆM ĐƯƠNG ĐẠI (TỰ ĐỘNG THEO DÕI SÁNG / TỐI THEO CHUẨN GIAO DIỆN) */}
        <div className="relative z-10 w-full max-w-[425px] bg-surface rounded-2xl border border-line px-7 sm:px-8 py-7 sm:py-8 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.14)] dark:shadow-[0_20px_50px_-12px_rgba(0,0,0,0.7)] backdrop-blur-sm transition-colors duration-300">
          {/* 4 GÓC TRIỆN KỶ HÀ KIM SẮC (HOA VĂN TRUYỀN THỐNG VIỆT NAM) */}
          <span className="absolute top-2.5 left-2.5 w-3.5 h-3.5 border-t-2 border-l-2 border-[#d4af37]/65 dark:border-amber-400/60 pointer-events-none rounded-tl-[3px]" />
          <span className="absolute top-2.5 right-2.5 w-3.5 h-3.5 border-t-2 border-r-2 border-[#d4af37]/65 dark:border-amber-400/60 pointer-events-none rounded-tr-[3px]" />
          <span className="absolute bottom-2.5 left-2.5 w-3.5 h-3.5 border-b-2 border-l-2 border-[#d4af37]/65 dark:border-amber-400/60 pointer-events-none rounded-bl-[3px]" />
          <span className="absolute bottom-2.5 right-2.5 w-3.5 h-3.5 border-b-2 border-r-2 border-[#d4af37]/65 dark:border-amber-400/60 pointer-events-none rounded-br-[3px]" />

          {/* Tiêu đề & Ấn son An Trú */}
          <div className="flex items-center gap-3 pb-1">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#8b1e28] to-[#5b1219] flex items-center justify-center shadow-md shadow-[#8b1e28]/25 border border-amber-400/35 text-amber-200 shrink-0">
              <Sparkles className="w-4 h-4 text-amber-300" />
            </div>
            <div className="flex-1">
              <h1 className="font-serif font-bold text-xs sm:text-[13px] tracking-[0.16em] text-ink uppercase">
                ĐĂNG NHẬP GÓC AN TRÚ
              </h1>
              <p className="font-serif italic text-[11px] text-muted tracking-wide mt-0.5">
                Lắng đọng tâm tư • Soi chiếu nội tâm
              </p>
            </div>
          </div>

          {/* Dải phân cách viền kim với biểu tượng hoa sen kỷ hà ❖ */}
          <div className="flex items-center gap-3 my-4">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#d4af37]/45 dark:via-amber-400/35 to-transparent" />
            <span className="text-[#c5a059] dark:text-amber-400 text-[10px] select-none">❖</span>
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#d4af37]/45 dark:via-amber-400/35 to-transparent" />
          </div>

          {/* Quẻ / Tín hiệu chờ */}
          {pendingSignalMood && (
            <div className="mb-4 p-2.5 rounded-xl bg-accent-soft border border-line text-xs text-ink flex items-start gap-2 shadow-xs">
              <Sparkles className="w-3.5 h-3.5 shrink-0 mt-0.5 text-accent" />
              <span>Đang chờ lưu: <strong>{pendingSignalMood}</strong></span>
            </div>
          )}

          {/* Hộp báo lỗi */}
          {errorMessage && (
            <div
              role="alert"
              className="mb-4 p-2.5 rounded-xl bg-danger-soft border border-danger/40 text-xs text-danger flex items-start gap-2"
            >
              <span className="font-bold leading-none mt-0.5">✕</span>
              <span className="leading-relaxed flex-1">{errorMessage}</span>
            </div>
          )}

          {/* Biểu mẫu */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Tài khoản / Email */}
            <div>
              <label
                htmlFor="login-email"
                className="block text-[11px] font-serif font-bold tracking-wider text-ink uppercase mb-1.5 flex items-center gap-1.5"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#8b1e28]" />
                TÀI KHOẢN / EMAIL
              </label>
              <div className="relative group">
                <Mail className="w-4 h-4 text-subtle group-focus-within:text-accent transition-colors absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  id="login-email"
                  type="text"
                  required
                  disabled={isSubmitting || isSuccess}
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  placeholder="tenban@domain.com"
                  className="w-full h-11 pl-10 pr-3.5 rounded-xl border border-line bg-surface-soft text-sm text-ink placeholder:text-subtle focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent focus:bg-surface transition-all shadow-xs disabled:opacity-60"
                />
              </div>
            </div>

            {/* Mật khẩu */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label
                  htmlFor="login-password"
                  className="text-[11px] font-serif font-bold tracking-wider text-ink uppercase flex items-center gap-1.5"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#8b1e28]" />
                  MẬT KHẨU
                </label>
                {onGoToForgotPassword && (
                  <button
                    type="button"
                    onClick={onGoToForgotPassword}
                    disabled={isSubmitting || isSuccess}
                    className="text-xs text-accent hover:underline font-serif font-medium cursor-pointer disabled:opacity-50"
                  >
                    Quên mật khẩu?
                  </button>
                )}
              </div>
              <div className="relative group">
                <Lock className="w-4 h-4 text-subtle group-focus-within:text-accent transition-colors absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  id="login-password"
                  type={showPassword ? "text" : "password"}
                  required
                  disabled={isSubmitting || isSuccess}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full h-11 pl-10 pr-10 rounded-xl border border-line bg-surface-soft text-sm text-ink placeholder:text-subtle focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent focus:bg-surface transition-all tracking-wider shadow-xs disabled:opacity-60"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
                  disabled={isSubmitting || isSuccess}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-subtle hover:text-ink cursor-pointer disabled:opacity-50 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Checkbox Ghi nhớ đăng nhập sơn son */}
            <div className="flex items-center gap-2 pt-0.5 pb-0.5">
              <input
                type="checkbox"
                id="remember"
                checked={rememberMe}
                disabled={isSubmitting || isSuccess}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 rounded border-line text-accent accent-[#8b1e28] focus:ring-accent/30 cursor-pointer"
              />
              <label
                htmlFor="remember"
                className="text-xs text-muted cursor-pointer select-none font-medium"
              >
                Ghi nhớ đăng nhập trên thiết bị này
              </label>
            </div>

            {/* Nút bấm chính Đăng nhập sơn mài đỏ truyền thống */}
            <button
              type="submit"
              disabled={isSubmitting || isSuccess}
              className={`group relative w-full h-11 sm:h-12 rounded-xl font-serif font-semibold text-xs sm:text-[13px] tracking-widest text-[#fff8ed] uppercase flex items-center justify-center gap-2.5 overflow-hidden transition-all duration-300 cursor-pointer ${
                isSuccess
                  ? "bg-[#64141c] ring-2 ring-amber-400/50 shadow-lg shadow-amber-900/20"
                  : "bg-gradient-to-r from-[#8b1e28] via-[#a02330] to-[#761821] hover:from-[#761821] hover:via-[#8b1e28] hover:to-[#63131b] active:scale-[0.985] shadow-[0_6px_20px_rgba(139,30,40,0.32)] hover:shadow-[0_8px_25px_rgba(139,30,40,0.45)] border border-amber-400/30"
              } disabled:opacity-75`}
            >
              {/* Ánh kim lướt nhẹ khi hover */}
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/15 to-transparent pointer-events-none" />

              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-amber-200" />
                  <span>Đang dâng tâm hương...</span>
                </>
              ) : isSuccess ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-amber-300" />
                  <span>Tâm ý viên mãn • Đang an trú...</span>
                </>
              ) : (
                <>
                  <LogIn className="w-4 h-4 text-amber-200/90" />
                  <span>Đăng nhập</span>
                </>
              )}
            </button>

            {/* Phân cách hoặc */}
            <div className="relative my-3 text-center">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-line" />
              </div>
              <span className="relative bg-surface px-3 text-[11px] font-serif uppercase tracking-wider text-muted font-medium">
                Hoặc
              </span>
            </div>

            {/* Nút Đăng nhập Google */}
            <button
              type="button"
              onClick={handleGoogleLogin}
              disabled={isSubmitting || isSuccess}
              className="w-full h-11 rounded-xl border border-line bg-surface hover:bg-surface-soft text-ink font-medium text-xs sm:text-[13px] flex items-center justify-center gap-2.5 transition-all shadow-xs cursor-pointer disabled:opacity-50"
            >
              <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
              <span>Tiếp tục với Google</span>
            </button>
          </form>

          {/* Dòng link đăng ký */}
          <div className="text-center text-xs text-muted mt-5 pt-1">
            <span>Chưa có tài khoản? </span>
            <button
              type="button"
              onClick={onGoToRegister}
              disabled={isSubmitting || isSuccess}
              className="text-accent font-serif font-bold hover:underline cursor-pointer ml-1"
            >
              Đăng ký góc an trú →
            </button>
          </div>

          {/* Châm ngôn thiền định tinh tế dưới đáy thẻ */}
          <div className="mt-4 pt-3 border-t border-line text-center">
            <p className="font-serif italic text-[11px] text-subtle tracking-wide">
              "Tâm an vạn sự an • Giữ một nén lòng thanh tịnh"
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
