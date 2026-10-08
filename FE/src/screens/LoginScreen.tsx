import React, { useState, useRef, useEffect, useCallback } from "react";
import {
  Lock,
  Mail,
  Eye,
  EyeOff,
  LogIn,
  Loader2,
  Volume2,
  VolumeX,
  ArrowLeft,
  ArrowRight,
} from "lucide-react";
import { loginAccount, UserProfile, DEMO_USER } from "../data/authService";

export interface LoginScreenProps {
  onBack?: () => void;
  onSuccess: (name?: string, email?: string) => void;
  onGoToRegister: () => void;
  onGoToForgotPassword?: () => void;
  onImmersiveChange?: (immersive: boolean) => void;
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

const REMEMBERED_EMAIL_KEY = "tltl_remembered_email";

export const LoginScreen: React.FC<LoginScreenProps> = ({
  onBack,
  onSuccess,
  onGoToRegister,
  onGoToForgotPassword,
  onImmersiveChange,
  pendingSignalMood,
}) => {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberEmail, setRememberEmail] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [authState, setAuthState] = useState<AuthState>("idle");
  const [authenticatedUser, setAuthenticatedUser] = useState<UserProfile | null>(null);

  // Chỉ khi người dùng CHỦ ĐỘNG CLICK / CHẠM thì nhang mới châm lửa
  const [isIncenseLit, setIsIncenseLit] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  const [reducedMotion, setReducedMotion] = useState(() =>
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    );

    const syncPreference = () => {
      setReducedMotion(mediaQuery.matches);
    };

    syncPreference();
    mediaQuery.addEventListener("change", syncPreference);

    return () => {
      mediaQuery.removeEventListener("change", syncPreference);
    };
  }, []);

  const isSubmitting = authState === "submitting";
  const isSuccess = authState === "success";

  const [canLightIncense, setCanLightIncense] = useState(false);

  useEffect(() => {
    setCanLightIncense(false);

    if (!isSuccess) return;

    const timer = window.setTimeout(() => {
      setCanLightIncense(true);
    }, 5000);

    return () => window.clearTimeout(timer);
  }, [isSuccess]);

  // Quản lý timers & cleanup
  const timeoutRefs = useRef<ReturnType<typeof setTimeout>[]>([]);
  const hasCompletedRef = useRef(false);

  // Hạt tia lửa bùng nổ khi châm nhang (Ignition sparks)
  const sparksRef = useRef<SparkParticle[]>([]);

  // Refs
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const leftSectionRef = useRef<HTMLElement | null>(null);
  const altarImageRef = useRef<HTMLImageElement | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const audioElementRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    return () => {
      const audio = audioElementRef.current;
      audioElementRef.current = null;

      if (audio) {
        audio.pause();
      }

      const audioContext = audioCtxRef.current;
      audioCtxRef.current = null;

      if (audioContext && audioContext.state !== "closed") {
        audioContext.close().catch(() => {});
      }
    };
  }, []);

  // Parallax 2.5D tương tác theo góc nhìn chuột
  const [parallax, setParallax] = useState({ x: 0, y: 0 });
  const parallaxRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (reducedMotion || document.hidden) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    parallaxRef.current.targetX = x;
    parallaxRef.current.targetY = y;
    setParallax({ x, y });
  };

  const handleMouseLeave = () => {
    parallaxRef.current.targetX = 0;
    parallaxRef.current.targetY = 0;
    setParallax({ x: 0, y: 0 });
  };

  useEffect(() => {
    if (!reducedMotion) return;

    parallaxRef.current = {
      x: 0,
      y: 0,
      targetX: 0,
      targetY: 0,
    };

    setParallax({ x: 0, y: 0 });
  }, [reducedMotion]);

  // Khôi phục email nhớ
  useEffect(() => {
    try {
      const savedEmail = localStorage.getItem(REMEMBERED_EMAIL_KEY);
      if (savedEmail) {
        setIdentifier(savedEmail);
        setRememberEmail(true);
      }
    } catch {}
  }, []);

  // Cleanup khi unmount
  useEffect(() => {
    return () => {
      timeoutRefs.current.forEach((id) => clearTimeout(id));
      timeoutRefs.current = [];
      onImmersiveChange?.(false);
    };
  }, [onImmersiveChange]);

  // Âm thanh chuông bát thiền cổ (Tibetan Singing Bowl) ngân vang 432Hz
  const playSynthesizedBell = (ctx: AudioContext, now: number) => {
    const masterGain = ctx.createGain();
    masterGain.gain.setValueAtTime(0.32, now);
    masterGain.connect(ctx.destination);

    const bellFrequencies = [432, 864, 1296, 216];
    const bellGains = [0.2, 0.1, 0.05, 0.14];

    bellFrequencies.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(freq + (Math.random() - 0.5) * 1.5, now);

      gain.gain.setValueAtTime(0, now);
      gain.gain.linearRampToValueAtTime(bellGains[idx], now + 0.06);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 12.0);

      osc.connect(gain);
      gain.connect(masterGain);

      osc.start(now);
      osc.stop(now + 12.5);
    });

    const strike2 = now + 2.8;
    const bell2Freqs = [540, 1080, 270];
    bell2Freqs.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, strike2);

      gain.gain.setValueAtTime(0, strike2);
      gain.gain.linearRampToValueAtTime(0.08 / (idx + 1), strike2 + 0.07);
      gain.gain.exponentialRampToValueAtTime(0.0001, strike2 + 9.0);

      osc.connect(gain);
      gain.connect(masterGain);

      osc.start(strike2);
      osc.stop(strike2 + 9.5);
    });

    const droneOsc = ctx.createOscillator();
    const droneGain = ctx.createGain();
    const droneFilter = ctx.createBiquadFilter();

    droneOsc.type = "triangle";
    droneOsc.frequency.setValueAtTime(108, now);
    droneFilter.type = "lowpass";
    droneFilter.frequency.setValueAtTime(260, now);

    droneGain.gain.setValueAtTime(0, now);
    droneGain.gain.linearRampToValueAtTime(0.06, now + 1.2);
    droneGain.gain.setValueAtTime(0.06, now + 7.5);
    droneGain.gain.linearRampToValueAtTime(0, now + 11.0);

    droneOsc.connect(droneFilter);
    droneFilter.connect(droneGain);
    droneGain.connect(masterGain);

    droneOsc.start(now);
    droneOsc.stop(now + 11.5);
  };

  const startWebAudioFallback = () => {
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
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

  // Hoàn tất và chuyển vào trang trong
  const handleCompleteLogin = useCallback(() => {
    if (hasCompletedRef.current) return;
    hasCompletedRef.current = true;

    if (audioElementRef.current) {
      audioElementRef.current.pause();
    }
    if (audioCtxRef.current) {
      audioCtxRef.current.close().catch(() => {});
    }

    const user = authenticatedUser || DEMO_USER;
    onSuccess(user.name, user.email);
  }, [authenticatedUser, onSuccess]);

  // HÀNH ĐỘNG THẮP NHANG: BÙNG NỔ TIA LỬA + CHUÔNG THIỀN + BẮT ĐẦU TỎA KHÓI
  const handleLightIncense = useCallback(() => {
    if (!isSuccess || !canLightIncense || isIncenseLit) return;
    setIsIncenseLit(true);
    playZenBellSound();

    // Sinh chùm tia lửa mồi rực rỡ khi chạm
    const canvas = canvasRef.current;
    if (canvas) {
      const imgNativeW = 1672;
      const imgNativeH = 941;
      const scale = Math.max(canvas.width / imgNativeW, canvas.height / imgNativeH);
      const imgOffsetX = (canvas.width - imgNativeW * scale) / 2;
      const imgOffsetY = (canvas.height - imgNativeH * scale) / 2;
      const censerMouthX = imgOffsetX + 837 * scale;
      const censerMouthY = imgOffsetY + 673 * scale;
      const tipY = censerMouthY - 120 * scale;

      const burstSparks: SparkParticle[] = [];
      for (let i = 0; i < 28; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = (0.8 + Math.random() * 2.2) * scale;
        burstSparks.push({
          x: censerMouthX + (Math.random() - 0.5) * 16 * scale,
          y: tipY + (Math.random() - 0.5) * 4 * scale,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed - 1.2 * scale,
          size: (0.9 + Math.random() * 1.2) * scale,
          life: 0,
          maxLife: 28 + Math.random() * 22,
        });
      }
      sparksRef.current = burstSparks;
    }
  }, [isSuccess, canLightIncense, isIncenseLit, isMuted]);

  // Sau khi người dùng đã tự tay thắp nhang, cho 5.5s chiêm nghiệm rồi tự chuyển trang
  useEffect(() => {
    if (!isSuccess || !isIncenseLit) return;

    const redirectTimer = window.setTimeout(() => {
      handleCompleteLogin();
    }, 5500);

    return () => window.clearTimeout(redirectTimer);
  }, [
    isSuccess,
    isIncenseLit,
    handleCompleteLogin,
  ]);

  // CANVAS VẼ BÀN THỜ 2.5D: ĐÈN DẦU LUNG LINH, BỤI VÀNG LINH THIÊNG, 3 NÉN NHANG & KHÓI TRẦM
  useEffect(() => {
    const canvas = canvasRef.current;
    const section = leftSectionRef.current;
    if (!canvas || !section) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let animId: number | null = null;
    let disposed = false;
    let width = (canvas.width = section.clientWidth);
    let height = (canvas.height = section.clientHeight);

    // Khởi tạo 42 hạt bụi vàng linh thiêng bay bổng trong không gian
    const dustMotes = Array.from({ length: 42 }, () => ({
      x: Math.random(),
      y: Math.random(),
      size: 1.0 + Math.random() * 1.8,
      speedY: 0.00025 + Math.random() * 0.00045,
      speedX: (Math.random() - 0.5) * 0.0002,
      pulseSpeed: 0.002 + Math.random() * 0.003,
      seed: Math.random() * 100,
      baseAlpha: 0.28 + Math.random() * 0.45,
    }));

    // Hạt tàn lửa nhỏ bay từ đèn dầu
    const lampSparks: { x: number; y: number; vx: number; vy: number; life: number; maxLife: number; size: number }[] = [];

    const particles: SmokeParticle[] = [];

    const render = (now: number) => {
      animId = null;

      if (disposed || document.hidden) return;

      if (
        section &&
        (canvas.width !== section.clientWidth || canvas.height !== section.clientHeight)
      ) {
        width = canvas.width = section.clientWidth;
        height = canvas.height = section.clientHeight;
      }

      // Làm mượt tọa độ parallax (spring interpolation)
      parallaxRef.current.x += (parallaxRef.current.targetX - parallaxRef.current.x) * 0.08;
      parallaxRef.current.y += (parallaxRef.current.targetY - parallaxRef.current.y) * 0.08;

      const px = parallaxRef.current.x;
      const py = parallaxRef.current.y;

      // Độ dịch chuyển của các vật gắn trên ảnh nền bàn thờ (-16px, -12px)
      const imgShiftX = px * -16;
      const imgShiftY = py * -12;

      ctx.clearRect(0, 0, width, height);

      // Tọa độ hình học trên ảnh gốc 1672 x 941
      const imgNativeW = 1672;
      const imgNativeH = 941;
      const scale = Math.max(width / imgNativeW, height / imgNativeH);
      const imgOffsetX = (width - imgNativeW * scale) / 2;
      const imgOffsetY = (height - imgNativeH * scale) / 2;

      // ==========================================
      // 1. NGỌN LỬA ĐÈN DẦU BẰNG ĐỒNG HAI BÊN BÀN THỜ
      // ==========================================
      const lamps = [
        { x: imgOffsetX + 272 * scale + imgShiftX, y: imgOffsetY + 388 * scale + imgShiftY, seed: 12.3 },
        { x: imgOffsetX + 1400 * scale + imgShiftX, y: imgOffsetY + 388 * scale + imgShiftY, seed: 45.6 },
      ];

      lamps.forEach(({ x: lampX, y: lampY, seed }) => {
        // Kiểm tra nếu nằm trong viewport
        if (lampX < -100 || lampX > width + 100 || lampY < -100 || lampY > height + 100) return;

        const flicker =
          Math.sin(now * 0.008 + seed) * 0.12 +
          Math.cos(now * 0.018 + seed * 2) * 0.07 +
          (Math.random() - 0.5) * 0.04;

        const flameH = (23 + flicker * 6) * scale;
        const flameW = (10 + flicker * 2.2) * scale;
        const tipWobble = Math.sin(now * 0.009 + seed) * 2.4 * scale;

        ctx.save();

        // 1.1 Vầng quang phổ ấm tỏa ra xung quanh ngọn đèn
        const haloR = (62 + flicker * 14) * scale;
        const halo = ctx.createRadialGradient(lampX, lampY - flameH * 0.35, 0, lampX, lampY - flameH * 0.35, haloR);
        halo.addColorStop(0, "rgba(255, 185, 65, 0.44)");
        halo.addColorStop(0.35, "rgba(245, 130, 25, 0.18)");
        halo.addColorStop(0.7, "rgba(200, 75, 12, 0.05)");
        halo.addColorStop(1, "rgba(180, 50, 0, 0)");
        ctx.fillStyle = halo;
        ctx.beginPath();
        ctx.arc(lampX, lampY - flameH * 0.35, haloR, 0, Math.PI * 2);
        ctx.fill();

        // 1.2 Thân ngọn lửa hình giọt nước sống động uốn lượn
        ctx.beginPath();
        ctx.moveTo(lampX - flameW * 0.5, lampY);
        ctx.bezierCurveTo(
          lampX - flameW * 0.65,
          lampY - flameH * 0.4,
          lampX - flameW * 0.25,
          lampY - flameH * 0.75,
          lampX + tipWobble,
          lampY - flameH
        );
        ctx.bezierCurveTo(
          lampX + flameW * 0.25,
          lampY - flameH * 0.75,
          lampX + flameW * 0.65,
          lampY - flameH * 0.4,
          lampX + flameW * 0.5,
          lampY
        );
        ctx.closePath();

        const flameGrad = ctx.createLinearGradient(lampX, lampY, lampX, lampY - flameH);
        flameGrad.addColorStop(0, "rgba(255, 60, 5, 0.95)");
        flameGrad.addColorStop(0.28, "rgba(255, 155, 20, 0.98)");
        flameGrad.addColorStop(0.72, "rgba(255, 230, 95, 0.96)");
        flameGrad.addColorStop(1, "rgba(255, 255, 240, 0.98)");
        ctx.fillStyle = flameGrad;
        ctx.shadowColor = "#ff9800";
        ctx.shadowBlur = 10 * scale;
        ctx.fill();

        // 1.3 Tim lửa trắng sáng bên trong
        const coreH = flameH * 0.48;
        const coreW = flameW * 0.42;
        ctx.beginPath();
        ctx.ellipse(
          lampX + tipWobble * 0.2,
          lampY - coreH * 0.42,
          coreW * 0.5,
          coreH * 0.5,
          0,
          0,
          Math.PI * 2
        );
        const coreGrad = ctx.createRadialGradient(
          lampX + tipWobble * 0.2,
          lampY - coreH * 0.42,
          0,
          lampX + tipWobble * 0.2,
          lampY - coreH * 0.42,
          coreH * 0.5
        );
        coreGrad.addColorStop(0, "rgba(255, 255, 255, 0.98)");
        coreGrad.addColorStop(0.65, "rgba(255, 245, 190, 0.85)");
        coreGrad.addColorStop(1, "rgba(255, 195, 50, 0)");
        ctx.fillStyle = coreGrad;
        ctx.shadowBlur = 4 * scale;
        ctx.fill();

        ctx.restore();

        // Đôi khi sinh ra một mẩu tàn lửa bay lên từ tim đèn
        if (Math.random() < 0.02) {
          lampSparks.push({
            x: lampX + tipWobble + (Math.random() - 0.5) * 2 * scale,
            y: lampY - flameH,
            vx: (Math.random() - 0.5) * 0.3 * scale,
            vy: -(0.5 + Math.random() * 0.7) * scale,
            life: 0,
            maxLife: 24 + Math.random() * 20,
            size: (0.7 + Math.random() * 0.8) * scale,
          });
        }
      });

      // Vẽ tàn lửa nhỏ của đèn dầu
      for (let sIdx = lampSparks.length - 1; sIdx >= 0; sIdx--) {
        const sp = lampSparks[sIdx];
        sp.life++;
        if (sp.life >= sp.maxLife) {
          lampSparks.splice(sIdx, 1);
          continue;
        }
        sp.x += sp.vx;
        sp.y += sp.vy;
        const spProgress = sp.life / sp.maxLife;
        const spAlpha = (1 - spProgress) * 0.75;

        ctx.save();
        ctx.beginPath();
        ctx.arc(sp.x, sp.y, sp.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 205, 80, ${spAlpha})`;
        ctx.shadowColor = "#ffb300";
        ctx.shadowBlur = 4;
        ctx.fill();
        ctx.restore();
      }

      // ==========================================
      // 2. KHÔNG GIAN BỤI VÀNG LINH THIÊNG (ATMOSPHERIC GOLDEN DUST)
      // Chuyển động Parallax lớp tiền cảnh (+26px, +20px) tạo chiều sâu 3D
      // ==========================================
      const dustShiftX = px * 28;
      const dustShiftY = py * 22;

      dustMotes.forEach((mote) => {
        mote.y -= mote.speedY;
        mote.x += Math.sin(now * 0.0008 + mote.seed) * 0.00025;
        if (mote.y < -0.05) {
          mote.y = 1.05;
          mote.x = Math.random();
        }

        const moteDrawX = mote.x * width + dustShiftX;
        const moteDrawY = mote.y * height + dustShiftY;

        if (moteDrawX < -20 || moteDrawX > width + 20 || moteDrawY < -20 || moteDrawY > height + 20) return;

        const pulse = 0.5 + 0.5 * Math.sin(now * mote.pulseSpeed + mote.seed);
        const moteAlpha = mote.baseAlpha * pulse;

        ctx.save();
        const moteGrad = ctx.createRadialGradient(moteDrawX, moteDrawY, 0, moteDrawX, moteDrawY, mote.size * 2.6);
        moteGrad.addColorStop(0, `rgba(255, 238, 180, ${moteAlpha})`);
        moteGrad.addColorStop(0.45, `rgba(245, 190, 80, ${moteAlpha * 0.65})`);
        moteGrad.addColorStop(1, "rgba(220, 150, 40, 0)");

        ctx.fillStyle = moteGrad;
        ctx.beginPath();
        ctx.arc(moteDrawX, moteDrawY, mote.size * 2.6, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });

      // ==========================================
      // 3. 3 NÉN NHANG & KHÓI TRẦM KHI ĐĂNG NHẬP THÀNH CÔNG
      // ==========================================
      if (isSuccess) {
        // Tâm miệng lư hương (điểm cắm nhang vào tro)
        const censerMouthX = imgOffsetX + 837 * scale + imgShiftX;
        const censerMouthY = imgOffsetY + 673 * scale + imgShiftY;
        const stickLength = 120 * scale;

        // 3 nén nhang cắm trang nghiêm trong miệng lư đồng
        const stickConfigs = [
          { baseXOffset: -3.5 * scale, tipXOffset: -9.5 * scale },
          { baseXOffset: 0, tipXOffset: 0 },
          { baseXOffset: 3.5 * scale, tipXOffset: 9.5 * scale },
        ];

        const tips: { x: number; y: number }[] = [];

        stickConfigs.forEach((cfg) => {
          const baseX = censerMouthX + cfg.baseXOffset;
          const baseY = censerMouthY;
          const tipX = censerMouthX + cfg.tipXOffset;
          const tipY = censerMouthY - stickLength;

          tips.push({ x: tipX, y: tipY });

          ctx.save();

          // Bóng mờ chân thực
          ctx.beginPath();
          ctx.moveTo(baseX + 1, baseY);
          ctx.lineTo(tipX + 1, tipY);
          ctx.strokeStyle = "rgba(0, 0, 0, 0.45)";
          ctx.lineWidth = 2.2 * scale;
          ctx.stroke();

          // Thân nén nhang màu trầm hương tự nhiên
          ctx.beginPath();
          ctx.moveTo(baseX, baseY);
          ctx.lineTo(tipX, tipY);
          const stickGrad = ctx.createLinearGradient(baseX, baseY, tipX, tipY);
          stickGrad.addColorStop(0, "#422813");
          stickGrad.addColorStop(0.3, "#6e4525");
          stickGrad.addColorStop(0.8, "#80532e");
          stickGrad.addColorStop(1, "#503217");
          ctx.strokeStyle = stickGrad;
          ctx.lineWidth = 2.0 * scale;
          ctx.lineCap = "round";
          ctx.stroke();

          // Chân tăm đỏ son truyền thống ở gốc cắm
          ctx.beginPath();
          ctx.moveTo(baseX, baseY);
          ctx.lineTo(baseX + (tipX - baseX) * 0.18, baseY + (tipY - baseY) * 0.18);
          ctx.strokeStyle = "#8b1e28";
          ctx.lineWidth = 1.8 * scale;
          ctx.stroke();

          // ĐẦU NÉN NHANG
          if (isIncenseLit) {
            // KHI ĐÃ ĐƯỢC CHÂM LỬA: Than đỏ rực, có mẩu tàn tro và hào quang ấm
            const emberPulse = 0.85 + 0.18 * Math.sin(now * 0.0055 + cfg.tipXOffset);

            // Mẩu tàn tro mảnh
            ctx.beginPath();
            ctx.moveTo(tipX, tipY);
            ctx.lineTo(tipX + (cfg.tipXOffset > 0 ? 0.8 : -0.8) * scale, tipY - 3.8 * scale);
            ctx.strokeStyle = "rgba(220, 218, 214, 0.95)";
            ctx.lineWidth = 1.6 * scale;
            ctx.lineCap = "round";
            ctx.stroke();

            // Đốm than đỏ hồng âm ỉ
            ctx.beginPath();
            ctx.arc(tipX, tipY - 0.5 * scale, 1.6 * scale, 0, Math.PI * 2);
            const emberGrad = ctx.createRadialGradient(
              tipX,
              tipY - 0.5 * scale,
              0,
              tipX,
              tipY - 0.5 * scale,
              2.2 * scale
            );
            emberGrad.addColorStop(0, `rgba(255, 250, 225, ${emberPulse})`);
            emberGrad.addColorStop(0.35, `rgba(255, 95, 20, ${emberPulse * 0.95})`);
            emberGrad.addColorStop(0.85, `rgba(195, 25, 0, ${emberPulse * 0.8})`);
            emberGrad.addColorStop(1, "rgba(195, 25, 0, 0)");
            ctx.fillStyle = emberGrad;
            ctx.fill();

            // Ánh hào quang ấm lung linh
            ctx.beginPath();
            ctx.arc(tipX, tipY - 0.5 * scale, 7.5 * scale, 0, Math.PI * 2);
            const haloGrad = ctx.createRadialGradient(
              tipX,
              tipY - 0.5 * scale,
              0,
              tipX,
              tipY - 0.5 * scale,
              7.5 * scale
            );
            haloGrad.addColorStop(0, `rgba(255, 140, 30, ${emberPulse * 0.4})`);
            haloGrad.addColorStop(1, "rgba(255, 90, 0, 0)");
            ctx.fillStyle = haloGrad;
            ctx.fill();
          } else {
            // KHI CHƯA CHÂM: Đầu nhang có vòng ánh sáng vàng ấm nhịp thở mời gọi chạm
            const breathPulse = 0.5 + 0.5 * Math.sin(now * 0.0035);
            ctx.beginPath();
            ctx.arc(tipX, tipY - 1.5 * scale, 4.5 * scale, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(251, 191, 36, ${0.45 * breathPulse})`;
            ctx.fill();

            ctx.beginPath();
            ctx.arc(tipX, tipY - 1.5 * scale, 1.5 * scale, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(254, 240, 138, ${0.8 * breathPulse})`;
            ctx.fill();
          }

          ctx.restore();
        });



        // KHÓI TRẦM VẬT LÝ HẠT MỜ (Khi đã thắp)
        if (isIncenseLit && tips.length === 3) {
          tips.forEach((tip) => {
            if (Math.random() < 0.65) {
              particles.push({
                x: tip.x + (Math.random() - 0.5) * 1.0 * scale,
                y: tip.y - 3.8 * scale,
                vx: (Math.random() - 0.5) * 0.09,
                vy: -(0.9 + Math.random() * 0.5) * scale,
                radius: 0.9 * scale,
                maxRadius: (7 + Math.random() * 8) * scale,
                alpha: 0,
                maxAlpha: 0.065 + Math.random() * 0.035,
                age: 0,
                maxAge: 230 + Math.random() * 90,
                swirlSpeed: 0.85 + Math.random() * 0.6,
                seed: Math.random() * 100,
                shade: 242 + Math.floor(Math.random() * 12),
              });
            }

            if (Math.random() < 0.015) {
              sparksRef.current.push({
                x: tip.x + (Math.random() - 0.5) * 1.5 * scale,
                y: tip.y - 3.8 * scale,
                vx: (Math.random() - 0.5) * 0.35,
                vy: -(1.1 + Math.random() * 0.9) * scale,
                size: (0.7 + Math.random() * 0.5) * scale,
                life: 0,
                maxLife: 26 + Math.random() * 18,
              });
            }
          });

          // Vẽ hạt khói trầm
          for (let i = particles.length - 1; i >= 0; i--) {
            const p = particles[i];
            p.age++;

            if (p.age >= p.maxAge) {
              particles.splice(i, 1);
              continue;
            }

            const progress = p.age / p.maxAge;
            const turbulence =
              Math.sin(now * 0.0014 * p.swirlSpeed + p.seed + p.y * 0.011) * 0.38 +
              Math.sin(now * 0.0025 + p.y * 0.023) * 0.16;

            p.x += p.vx + turbulence * (0.2 + progress * 0.85) * scale;
            p.y += p.vy;
            p.radius = 0.9 * scale + (p.maxRadius - 0.9 * scale) * Math.pow(progress, 0.7);

            if (progress < 0.18) {
              p.alpha = (progress / 0.18) * p.maxAlpha;
            } else {
              p.alpha = Math.max(0, (1 - (progress - 0.18) / 0.82) * p.maxAlpha);
            }

            ctx.save();
            const smokeGrad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.radius);
            smokeGrad.addColorStop(0, `rgba(${p.shade}, ${p.shade - 2}, ${p.shade - 5}, ${p.alpha})`);
            smokeGrad.addColorStop(0.5, `rgba(${p.shade - 8}, ${p.shade - 10}, ${p.shade - 12}, ${p.alpha * 0.45})`);
            smokeGrad.addColorStop(1, "rgba(220, 216, 210, 0)");

            ctx.fillStyle = smokeGrad;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
          }

          // Vẽ tàn lửa li ti & chùm tia lửa mồi
          for (let j = sparksRef.current.length - 1; j >= 0; j--) {
            const s = sparksRef.current[j];
            s.life++;
            if (s.life >= s.maxLife) {
              sparksRef.current.splice(j, 1);
              continue;
            }
            s.x += s.vx;
            s.y += s.vy;
            const sProgress = s.life / s.maxLife;
            const sAlpha = (1 - sProgress) * 0.85;

            ctx.save();
            ctx.beginPath();
            ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255, ${180 - sProgress * 80}, 50, ${sAlpha})`;
            ctx.shadowColor = "#ff7043";
            ctx.shadowBlur = 4;
            ctx.fill();
            ctx.restore();
          }
        }
      }

      if (!reducedMotion) {
        animId = requestAnimationFrame(render);
      }
    };

    const stopAnimation = () => {
      if (animId !== null) {
        cancelAnimationFrame(animId);
        animId = null;
      }
    };

    const startAnimation = () => {
      if (disposed || document.hidden || animId !== null) return;

      if (reducedMotion) {
        render(0);
      } else {
        animId = requestAnimationFrame(render);
      }
    };

    const handleVisibilityChange = () => {
      if (document.hidden) {
        stopAnimation();
      } else {
        startAnimation();
      }
    };

    document.addEventListener(
      "visibilitychange",
      handleVisibilityChange
    );

    startAnimation();

    return () => {
      disposed = true;
      stopAnimation();

      document.removeEventListener(
        "visibilitychange",
        handleVisibilityChange
      );

      ctx.clearRect(0, 0, canvas.width, canvas.height);
    };
  }, [isSuccess, isIncenseLit, reducedMotion]);

  // Xử lý submit email
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting || isSuccess) return;

    setErrorMessage("");
    setAuthState("submitting");

    const timer = setTimeout(async () => {
      const result = await loginAccount(identifier, password);
      if (!result.success) {
        setAuthState("error");
        setErrorMessage(result.error || "Tài khoản hoặc mật khẩu không chính xác.");
        onImmersiveChange?.(false);
        return;
      }

      if (rememberEmail && identifier.trim()) {
        try {
          localStorage.setItem(REMEMBERED_EMAIL_KEY, identifier.trim());
        } catch {}
      } else {
        try {
          localStorage.removeItem(REMEMBERED_EMAIL_KEY);
        } catch {}
      }

      setAuthenticatedUser(result.user);
      setAuthState("success");
      onImmersiveChange?.(true); // Ẩn Header
    }, 280);

    timeoutRefs.current.push(timer);
  };

  // OAuth sẽ được bổ sung sau khi backend có endpoint tương ứng.
  const handleGoogleLogin = () => {
    if (isSubmitting || isSuccess) return;
    setAuthState("error");
    setErrorMessage("Đăng nhập Google chưa được hỗ trợ. Vui lòng dùng email và mật khẩu.");
  };

  return (
    <div
      className={`relative w-full flex flex-col lg:flex-row bg-[#f6f2ea] dark:bg-[#151214] text-ink transition-all duration-700 motion-reduce:transition-none overflow-hidden ${
        isSuccess
          ? "min-h-screen fixed inset-0 z-50 bg-stone-950"
          : "min-h-[calc(100vh-73px)] lg:h-[calc(100dvh-73px)] lg:max-h-[calc(100dvh-73px)]"
      }`}
    >
      {/* KHÔNG GIAN BÀN THỜ GIA TIÊN & LƯ HƯƠNG (CINEMATIC TUYỆT ĐỐI KHÔNG CHỮ KHI THÀNH CÔNG) */}
      <section
        ref={leftSectionRef}
        aria-label="Không gian thanh tịnh bàn thờ và lư hương"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={isSuccess ? handleLightIncense : undefined}
        className={`relative flex flex-col justify-end select-none bg-stone-950 transition-all duration-1000 ease-out motion-reduce:transition-none overflow-hidden ${
          isSuccess
            ? "w-full h-full min-h-screen z-30 cursor-pointer"
            : "w-full lg:w-[58%] xl:w-[62%] h-48 sm:h-64 lg:h-full shrink-0 min-h-[200px] lg:min-h-0"
        }`}
      >
        {/* Nút bật/tắt tiếng chuông thiền ở góc trên */}
        <div className="absolute top-4 right-4 z-40 flex items-center gap-2">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setIsMuted(!isMuted);
            }}
            className="p-2.5 rounded-full bg-stone-900/60 hover:bg-stone-900/90 text-stone-200 border border-amber-500/25 backdrop-blur-md shadow-lg transition-all motion-reduce:transition-none cursor-pointer"
            title={isMuted ? "Bật chuông thiền" : "Tắt chuông thiền"}
            aria-label={isMuted ? "Bật chuông thiền" : "Tắt chuông thiền"}
          >
            {isMuted ? (
              <VolumeX className="w-4 h-4 text-stone-400" />
            ) : (
              <Volume2 className="w-4 h-4 text-amber-400 animate-pulse motion-reduce:animate-none" />
            )}
          </button>
        </div>

        {isSuccess && !isIncenseLit && (
          <div className="absolute bottom-6 left-6 z-40">
            <button
              type="button"
              disabled={!canLightIncense}
              onClick={(event) => {
                event.stopPropagation();
                handleLightIncense();
              }}
              className="min-h-11 rounded-full border border-amber-500/30 bg-stone-900/80 px-5 py-3 text-sm font-medium text-amber-100 backdrop-blur-md disabled:cursor-wait disabled:opacity-60"
            >
              {canLightIncense ? "Đốt nhang" : "Chờ một chút…"}
            </button>
          </div>
        )}

        {/* NÚT VÀO NGAY GÓC PHẢI DƯỚI (SIÊU NHỎ GỌN, KHÔNG CHỮ RƯỜM RÀ, KHÔNG CHE LƯ HƯƠNG) */}
        {isSuccess && (
          <div className="absolute bottom-6 right-6 z-40">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handleCompleteLogin();
              }}
              className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-stone-900/60 hover:bg-stone-900/95 text-stone-300 hover:text-amber-200 border border-amber-500/20 backdrop-blur-md text-xs font-sans shadow-lg transition-all motion-reduce:transition-none cursor-pointer"
              title="Vào ngay"
              aria-label="Vào ngay"
            >
              <span>Vào ngay</span>
              <ArrowRight className="w-3.5 h-3.5 text-amber-400" />
            </button>
          </div>
        )}

        {/* Ảnh nền bàn thờ gia tiên với hiệu ứng Parallax 2.5D */}
        <img
          ref={altarImageRef}
          src="/images/login-altar-scene-v3.png"
          alt="Bàn thờ gia tiên trang nghiêm"
          style={{
            transform: reducedMotion
              ? "scale(1.06)"
              : `scale(1.06) translate3d(${parallax.x * -16}px, ${parallax.y * -12}px, 0)`,
            transition: reducedMotion
              ? "none"
              : "transform 0.18s cubic-bezier(0.2, 0.8, 0.3, 1), filter 1s ease",
          }}
          className={`absolute inset-0 w-full h-full object-cover object-center pointer-events-none will-change-transform ${
            isSuccess ? "filter brightness(1.05)" : ""
          }`}
        />

        {/* Lớp phủ ánh đèn dầu lung linh */}
        <div
          className={`absolute inset-0 bg-radial from-amber-500/10 via-transparent to-black/35 pointer-events-none transition-opacity duration-1000 motion-reduce:transition-none ${
            isSuccess ? "opacity-100" : "opacity-75"
          }`}
        />

        {/* Vầng hào quang nhẹ quanh lư hương khi đã thắp nhang */}
        {isSuccess && isIncenseLit && (
          <div className="absolute left-1/2 top-[69.5%] -translate-x-1/2 -translate-y-1/2 w-[420px] sm:w-[500px] h-[420px] sm:h-[500px] rounded-full bg-gradient-to-t from-amber-500/25 via-orange-400/10 to-transparent blur-3xl animate-pulse duration-1000 motion-reduce:animate-none pointer-events-none" />
        )}

        {/* Canvas vẽ 3 nén nhang và khói trầm — TUYỆT ĐỐI KHÔNG CÓ BẤT KỲ CHỮ NÀO ĐÈ LÊN */}
        <canvas
          ref={canvasRef}
          aria-hidden="true"
          className="absolute inset-0 w-full h-full pointer-events-none z-20"
        />

        {/* Lớp bóng đổ & đường nẹp chỉ đồng kim phân cách giữa 2 cột */}
        {!isSuccess && (
          <>
            <div className="absolute inset-y-0 right-0 w-12 bg-gradient-to-r from-transparent to-black/40 pointer-events-none hidden lg:block z-20" />
            <div className="absolute inset-y-0 right-0 w-[1.5px] bg-gradient-to-b from-transparent via-amber-400/60 to-transparent shadow-[0_0_8px_rgba(251,191,36,0.35)] hidden lg:block z-30 pointer-events-none" />
          </>
        )}

        {/* Lớp phủ chân bàn thờ */}
        <div className="absolute bottom-0 inset-x-0 h-10 bg-gradient-to-t from-stone-950/80 to-transparent pointer-events-none z-10" />
      </section>

      {/* CỘT PHẢI: FORM ĐĂNG NHẬP GÓC AN YÊN — CÂN ĐỐI 10/10, SANG TRỌNG, THOÁNG MẮT */}
      <section
        aria-label="Biểu mẫu đăng nhập"
        className={`relative transition-all duration-700 ease-in-out motion-reduce:transition-none ${
          isSuccess
            ? "opacity-0 translate-x-12 pointer-events-none w-0 h-0 p-0 overflow-hidden flex-none"
            : "w-full lg:w-[42%] xl:w-[38%] shrink-0 flex flex-col justify-center items-center px-6 py-6 sm:px-10 lg:px-8 xl:px-12 opacity-100 translate-x-0 lg:h-full lg:max-h-full overflow-y-auto bg-[radial-gradient(ellipse_at_top_left,_rgba(217,119,6,0.05),_transparent_65%),_linear-gradient(to_bottom,_#fbf8f2,_#f5efe6)] dark:bg-[radial-gradient(ellipse_at_top_left,_rgba(180,83,9,0.06),_transparent_65%),_linear-gradient(to_bottom,_#1c1719,_#151214)]"
        }`}
      >
        {/* Họa tiết hạt xơ giấy dó & hoa sen chìm truyền thống mờ ảo */}
        <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.02] pointer-events-none bg-[radial-gradient(#8b1e28_1px,transparent_1px)] [background-size:18px_18px]" />
        <svg
          className="absolute -right-16 -bottom-16 w-72 h-72 text-amber-900/[0.035] dark:text-amber-300/[0.02] pointer-events-none select-none"
          viewBox="0 0 100 100"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M50 15 C35 30 20 45 20 65 C20 80 35 90 50 90 C65 90 80 80 80 65 C80 45 65 30 50 15 Z" />
        </svg>

        <div className="relative z-10 w-full max-w-[390px] my-auto py-2">
          {onBack && !isSuccess && (
            <button
              type="button"
              onClick={onBack}
              className="inline-flex items-center gap-1.5 text-xs text-muted hover:text-ink transition-colors cursor-pointer mb-3.5"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Quay lại</span>
            </button>
          )}

          {/* TIÊU ĐỀ TRANG NHÃ KÈM DẤU ẤN TRIỆN SON KHẮC GỖ */}
          <div className="mb-4 sm:mb-5">
            <div className="flex items-center gap-2.5">
              <div 
                className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#8b1e28] to-[#68131b] border border-amber-400/50 flex items-center justify-center shadow-[0_2px_10px_rgba(139,30,40,0.35)] shrink-0 select-none"
                title="Triện son An"
              >
                <span className="font-serif font-black text-amber-200 text-xs tracking-tighter leading-none">
                  安
                </span>
              </div>
              <h1 className="font-serif text-2xl sm:text-[1.75rem] font-bold text-ink tracking-tight">
                Góc An Yên
              </h1>
            </div>
            <p className="text-xs sm:text-sm text-muted mt-1 leading-relaxed">
              Đăng nhập để lưu lại quẻ thẻ và tiếp tục hành trình tĩnh tâm.
            </p>
          </div>

          {/* THÔNG BÁO TÁC VỤ ĐANG CHỜ (NẾU CÓ) */}
          {pendingSignalMood && (
            <div className="mb-4 p-3 rounded-xl bg-accent-soft border border-line text-xs text-ink flex items-start gap-2.5 shadow-xs">
              <span className="w-2 h-2 rounded-full bg-accent mt-1.5 shrink-0" />
              <div>
                <span className="font-semibold text-accent">Đang chờ lưu: </span>
                <span className="font-medium">{pendingSignalMood}</span>
              </div>
            </div>
          )}

          {/* HỘP BÁO LỖI */}
          {errorMessage && (
            <div
              role="alert"
              className="mb-4 p-3 rounded-xl bg-danger-soft border border-danger/30 text-xs text-danger flex items-start gap-2"
            >
              <span className="font-bold leading-none mt-0.5">✕</span>
              <span className="leading-relaxed flex-1">{errorMessage}</span>
            </div>
          )}

          <p className="mb-3 rounded-xl border border-line bg-accent-soft px-3 py-2 text-xs leading-relaxed text-ink">
            Tài khoản được xác thực an toàn qua máy chủ.
          </p>

          {/* FORM NHẬP LIỆU GỌN GÀNG, ĐẸP MẮT */}
          <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-3.5">
            <div>
              <label
                htmlFor="login-email"
                className="block text-xs font-semibold text-ink mb-1 tracking-wide"
              >
                Email
              </label>
              <div className="relative group">
                <Mail className="w-4 h-4 text-subtle group-focus-within:text-amber-600 dark:group-focus-within:text-amber-400 transition-colors absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  id="login-email"
                  name="email"
                  type="text"
                  autoComplete="username"
                  required
                  disabled={isSubmitting}
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  placeholder="tenban@domain.com"
                  className="w-full h-11 pl-10 pr-3.5 rounded-xl border border-line bg-surface text-base sm:text-sm text-ink placeholder:text-subtle focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-600/70 dark:focus:border-amber-500 transition-all motion-reduce:transition-none shadow-xs disabled:opacity-60"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label
                  htmlFor="login-password"
                  className="text-xs font-semibold text-ink tracking-wide"
                >
                  Mật khẩu mẫu
                </label>
                {onGoToForgotPassword && (
                  <button
                    type="button"
                    onClick={onGoToForgotPassword}
                    disabled={isSubmitting}
                    className="text-xs text-amber-700 dark:text-amber-400 hover:underline cursor-pointer disabled:opacity-50"
                  >
                    Quên mật khẩu?
                  </button>
                )}
              </div>
              <div className="relative group">
                <Lock className="w-4 h-4 text-subtle group-focus-within:text-amber-600 dark:group-focus-within:text-amber-400 transition-colors absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  id="login-password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  required
                  disabled={isSubmitting}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full h-11 pl-10 pr-11 rounded-xl border border-line bg-surface text-base sm:text-sm text-ink placeholder:text-subtle focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-600/70 dark:focus:border-amber-500 transition-all motion-reduce:transition-none shadow-xs disabled:opacity-60"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
                  disabled={isSubmitting}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-subtle hover:text-ink cursor-pointer disabled:opacity-50 transition-colors p-1"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Checkbox nhớ tài khoản */}
            <div className="flex items-center gap-2 pt-0.5 pb-0.5">
              <input
                type="checkbox"
                id="remember-email"
                checked={rememberEmail}
                disabled={isSubmitting}
                onChange={(e) => setRememberEmail(e.target.checked)}
                className="w-4 h-4 rounded border-line text-accent accent-[#8b1e28] focus:ring-amber-500/30 cursor-pointer"
              />
              <label
                htmlFor="remember-email"
                className="text-xs text-muted cursor-pointer select-none font-medium"
              >
                Nhớ tài khoản trên thiết bị này
              </label>
            </div>

            {/* Nút bấm Đăng nhập chính sơn mài ánh kim cao cấp */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="group relative w-full h-11 rounded-xl bg-gradient-to-r from-[#8b1e28] via-[#9e222d] to-[#781820] hover:from-[#781820] hover:via-[#8b1e28] hover:to-[#63131b] border border-amber-400/35 text-[#fff8ed] font-medium text-sm flex items-center justify-center gap-2 transition-all motion-reduce:transition-none shadow-[0_4px_18px_rgba(139,30,40,0.28)] hover:shadow-[0_6px_26px_rgba(139,30,40,0.42)] overflow-hidden cursor-pointer disabled:opacity-60 active:scale-[0.99]"
            >
              {/* Ánh kim lướt nhẹ */}
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none" />

              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-amber-200" />
                  <span>Đang kết nối...</span>
                </>
              ) : (
                <>
                  <LogIn className="w-4 h-4 text-amber-200" />
                  <span>Đăng nhập</span>
                </>
              )}
            </button>

            {/* Phân cách Hoặc */}
            <div className="relative my-3 text-center">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-line" />
              </div>
              <span className="relative bg-[#f6f2ea] dark:bg-[#151214] px-3 text-xs text-muted">
                Hoặc
              </span>
            </div>

            {/* OAuth chưa được kết nối ở Phase 1 */}
            <button
              type="button"
              onClick={handleGoogleLogin}
              disabled={isSubmitting}
              className="w-full h-11 rounded-xl border border-line bg-surface hover:bg-surface-soft text-ink font-medium text-sm flex items-center justify-center gap-2.5 transition-all motion-reduce:transition-none shadow-xs hover:border-[#8b1e28]/40 cursor-pointer disabled:opacity-50"
            >
              <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" aria-hidden="true">
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
              <span>Đăng nhập bằng Google (sắp có)</span>
            </button>
          </form>

          {/* Chuyển sang Đăng ký */}
          <div className="text-center text-xs text-muted mt-4 sm:mt-5 pt-2.5 border-t border-line">
            <span>Chưa có tài khoản? </span>
            <button
              type="button"
              onClick={onGoToRegister}
              disabled={isSubmitting}
              className="text-accent font-medium hover:underline cursor-pointer ml-1"
            >
              Tạo hồ sơ mới →
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
