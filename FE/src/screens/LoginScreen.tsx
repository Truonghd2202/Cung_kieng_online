import React, { useState, useRef, useEffect, useCallback } from "react";
import {
  Lock,
  Mail,
  Eye,
  EyeOff,
  ArrowRight,
  ArrowLeft,
  Loader2,
  Sparkles,
  Bell,
} from "lucide-react";
import {
  loginAccount,
  loginWithSocial,
  UserProfile,
  DEMO_USER,
} from "../data/authService";
import "../styles/LoginScreen.css";

export interface LoginScreenProps {
  onBack?: () => void;
  onSuccess: (name?: string, email?: string) => boolean;
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
}

interface EmberParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  alpha: number;
  age: number;
  maxAge: number;
  seed: number;
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
  const [bellRinging, setBellRinging] = useState(false);

  const [reducedMotion, setReducedMotion] = useState(() =>
    typeof window !== "undefined"
      ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
      : false
  );

  const [parallax, setParallax] = useState({ x: 0, y: 0 });

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const smokeParticlesRef = useRef<SmokeParticle[]>([]);
  const emberParticlesRef = useRef<EmberParticle[]>([]);
  const timeoutRefs = useRef<ReturnType<typeof setTimeout>[]>([]);
  const hasCompletedRef = useRef(false);

  const audioElementRef = useRef<HTMLAudioElement | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);

  const isSubmitting = authState === "submitting";
  const isSuccess = authState === "success";

  // Check prefers-reduced-motion
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const syncPreference = () => setReducedMotion(mediaQuery.matches);
    syncPreference();
    mediaQuery.addEventListener("change", syncPreference);
    return () => mediaQuery.removeEventListener("change", syncPreference);
  }, []);

  // Ẩn thanh header chung để màn Login hiển thị toàn màn hình chuẩn thiết kế
  useEffect(() => {
    onImmersiveChange?.(true);
    return () => {
      onImmersiveChange?.(false);
    };
  }, [onImmersiveChange]);

  // Đọc email đã ghi nhớ
  useEffect(() => {
    try {
      const savedEmail = localStorage.getItem(REMEMBERED_EMAIL_KEY);
      if (savedEmail) {
        setIdentifier(savedEmail);
        setRememberEmail(true);
      }
    } catch {}

    return () => {
      timeoutRefs.current.forEach(clearTimeout);
      if (audioElementRef.current) {
        audioElementRef.current.pause();
        audioElementRef.current = null;
      }
      if (audioCtxRef.current) {
        audioCtxRef.current.close().catch(() => {});
        audioCtxRef.current = null;
      }
    };
  }, []);

  // Web Audio chuông thiền thanh tịnh
  const playSynthesizedBell = (ctx: AudioContext, now: number) => {
    const masterGain = ctx.createGain();
    masterGain.gain.setValueAtTime(0.001, now);
    masterGain.gain.linearRampToValueAtTime(0.3, now + 0.05);
    masterGain.gain.exponentialRampToValueAtTime(0.0001, now + 8.5);
    masterGain.connect(ctx.destination);

    const freqs = [216, 432, 648, 864, 1296];
    const decays = [8.5, 6.2, 4.8, 3.5, 2.2];
    const amps = [0.4, 0.25, 0.15, 0.08, 0.04];

    freqs.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, now);

      gain.gain.setValueAtTime(amps[idx], now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + decays[idx]);

      osc.connect(gain);
      gain.connect(masterGain);

      osc.start(now);
      osc.stop(now + decays[idx]);
    });
  };

  const playZenBellSound = () => {
    try {
      const audio = new Audio("/audio/meditation-bowl.mp3");
      audio.volume = 0.8;
      audioElementRef.current = audio;

      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          try {
            const AudioCtx =
              window.AudioContext ||
              (window as unknown as { webkitAudioContext: typeof AudioContext })
                .webkitAudioContext;
            if (AudioCtx) {
              const ctx = new AudioCtx();
              audioCtxRef.current = ctx;
              playSynthesizedBell(ctx, ctx.currentTime);
            }
          } catch {}
        });
      }
    } catch {
      try {
        const AudioCtx =
          window.AudioContext ||
          (window as unknown as { webkitAudioContext: typeof AudioContext })
            .webkitAudioContext;
        if (AudioCtx) {
          const ctx = new AudioCtx();
          audioCtxRef.current = ctx;
          playSynthesizedBell(ctx, ctx.currentTime);
        }
      } catch {}
    }
  };

  // Parallax nhẹ khi rê chuột ở cột trái
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reducedMotion) return;
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    const normX = (clientX / innerWidth - 0.5) * 2;
    const normY = (clientY / innerHeight - 0.5) * 2;
    setParallax({ x: normX, y: normY });
  };

  // Canvas hiệu ứng khói nhang nhẹ nhàng ở Cột Trái
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number | null = null;
    let disposed = false;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const parent = canvas.parentElement;
      const width = parent ? parent.clientWidth : window.innerWidth * 0.6;
      const height = parent ? parent.clientHeight : window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();
    window.addEventListener("resize", resize);

    let lastTime = performance.now();

    const render = (now: number) => {
      if (disposed) return;
      const dt = lastTime > 0 && now > lastTime ? Math.min((now - lastTime) / 1000, 0.05) : 0.016;
      lastTime = now;

      const parent = canvas.parentElement;
      const width = parent ? parent.clientWidth : window.innerWidth * 0.6;
      const height = parent ? parent.clientHeight : window.innerHeight;

      ctx.clearRect(0, 0, width, height);

      // Điểm phát khói ở Cột Trái: đỉnh 3 nén nhang trong tranh nghệ thuật
      const incenseX = width * 0.505;
      const incenseY = height * 0.566;

      // 1. Sinh khói nhang nhẹ nhàng
      if (smokeParticlesRef.current.length < 32 && Math.random() < 0.45) {
        const offsetAngle = (Math.random() - 0.5) * 0.25;
        smokeParticlesRef.current.push({
          x: incenseX + (Math.random() - 0.5) * 6,
          y: incenseY,
          vx: Math.sin(offsetAngle) * 2.5 + (Math.random() - 0.5) * 1.5,
          vy: -14 - Math.random() * 10,
          radius: 2 + Math.random() * 2,
          maxRadius: 16 + Math.random() * 16,
          alpha: 0,
          maxAlpha: 0.35 + Math.random() * 0.15,
          age: 0,
          maxAge: 3.2 + Math.random() * 1.6,
          swirlSpeed: 0.8 + Math.random() * 1.2,
          seed: Math.random() * 100,
        });
      }

      // 2. Sinh các hạt tàn nhang lấp lánh (Golden sparks / embers) bay lên
      if (emberParticlesRef.current.length < 12 && Math.random() < 0.3) {
        const tipOffsets = [-5.5, 0, 5.5];
        const offsetChosen = tipOffsets[Math.floor(Math.random() * 3)];
        emberParticlesRef.current.push({
          x: incenseX + offsetChosen + (Math.random() - 0.5) * 2,
          y: incenseY - 1,
          vx: (Math.random() - 0.5) * 3,
          vy: -16 - Math.random() * 14,
          radius: 0.8 + Math.random() * 0.8,
          alpha: 0.9,
          age: 0,
          maxAge: 1.6 + Math.random() * 1.2,
          seed: Math.random() * 50,
        });
      }

      // 3. Cập nhật và vẽ khói nhang
      for (let i = smokeParticlesRef.current.length - 1; i >= 0; i--) {
        const p = smokeParticlesRef.current[i];
        p.age += dt;
        if (p.age >= p.maxAge) {
          smokeParticlesRef.current.splice(i, 1);
          continue;
        }

        const progress = p.age / p.maxAge;
        const wave = Math.sin(now * 0.0018 * p.swirlSpeed + p.seed + p.y * 0.015) * 7;

        p.x += (p.vx + wave) * dt;
        p.y += p.vy * dt;
        p.radius += (p.maxRadius - p.radius) * 0.35 * dt;

        if (progress < 0.2) {
          p.alpha = (progress / 0.2) * p.maxAlpha;
        } else {
          p.alpha = (1 - (progress - 0.2) / 0.8) * p.maxAlpha;
        }

        const currentRadius = Math.max(1, p.radius);
        const currentAlpha = Math.max(0, Math.min(1, p.alpha));

        try {
          ctx.save();
          const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, currentRadius);
          grad.addColorStop(0, `rgba(255, 255, 255, ${currentAlpha * 0.85})`);
          grad.addColorStop(0.5, `rgba(250, 246, 240, ${currentAlpha * 0.4})`);
          grad.addColorStop(1, "rgba(245, 240, 230, 0)");

          ctx.fillStyle = grad;
          ctx.beginPath();
          ctx.arc(p.x, p.y, currentRadius, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        } catch {}
      }

      // 4. Cập nhật và vẽ các hạt tàn nhang lấp lánh
      for (let i = emberParticlesRef.current.length - 1; i >= 0; i--) {
        const ep = emberParticlesRef.current[i];
        ep.age += dt;
        if (ep.age >= ep.maxAge) {
          emberParticlesRef.current.splice(i, 1);
          continue;
        }
        const epProgress = ep.age / ep.maxAge;
        const epWave = Math.sin(now * 0.003 + ep.seed) * 2.5;
        ep.x += (ep.vx + epWave) * dt;
        ep.y += ep.vy * dt;
        const currentEpAlpha = (1 - epProgress) * ep.alpha;

        try {
          ctx.save();
          ctx.fillStyle = `rgba(255, 220, 130, ${currentEpAlpha})`;
          ctx.shadowColor = "rgba(255, 150, 50, 0.9)";
          ctx.shadowBlur = 4;
          ctx.beginPath();
          ctx.arc(ep.x, ep.y, ep.radius, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        } catch {}
      }

      // 5. Vẽ 3 đốm than hồng nhấp nháy ở đỉnh 3 nén nhang
      try {
        ctx.save();
        const emberPulse = 0.7 + 0.3 * Math.sin(now * 0.006);
        [-5.5, 0, 5.5].forEach((offset, idx) => {
          const flicker = 0.8 + 0.2 * Math.sin(now * 0.015 + idx * 2.3);
          const intensity = emberPulse * flicker;
          const grad = ctx.createRadialGradient(
            incenseX + offset, incenseY, 0,
            incenseX + offset, incenseY, 4.5
          );
          grad.addColorStop(0, `rgba(255, 240, 180, ${0.95 * intensity})`);
          grad.addColorStop(0.35, `rgba(255, 125, 45, ${0.85 * intensity})`);
          grad.addColorStop(0.7, `rgba(220, 60, 20, ${0.4 * intensity})`);
          grad.addColorStop(1, "rgba(180, 20, 0, 0)");
          ctx.fillStyle = grad;
          ctx.beginPath();
          ctx.arc(incenseX + offset, incenseY, 4.5, 0, Math.PI * 2);
          ctx.fill();
        });
        ctx.restore();
      } catch {}

      if (!reducedMotion) {
        animId = requestAnimationFrame(render);
      }
    };

    if (reducedMotion) {
      render(0);
    } else {
      animId = requestAnimationFrame(render);
    }

    return () => {
      disposed = true;
      if (animId !== null) cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, [reducedMotion]);

  // Hoàn tất và điều hướng vào trong app
  const handleCompleteLogin = useCallback(() => {
    if (hasCompletedRef.current) return;
    hasCompletedRef.current = true;

    const user = authenticatedUser || DEMO_USER;
    let completed = false;

    try {
      completed = onSuccess(user.name, user.email);
    } catch {
      completed = false;
    }

    if (!completed) {
      hasCompletedRef.current = false;
      setErrorMessage(
        "Chưa hoàn tất đăng nhập vì trình duyệt chưa lưu được dữ liệu. Bạn hãy bấm Vào ngay để thử lại."
      );
      return;
    }

    setErrorMessage("");
    audioElementRef.current?.pause();
    if (audioCtxRef.current) {
      audioCtxRef.current.close().catch(() => {});
    }
  }, [authenticatedUser, onSuccess]);

  // Submit form đăng nhập - vào trang tiếp theo ngay lập tức
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting || isSuccess) return;

    setErrorMessage("");

    const result = loginAccount(identifier, password);
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
    playZenBellSound();

    // Vào trang tiếp theo liền luôn
    try {
      onSuccess(result.user.name, result.user.email);
    } catch {
      handleCompleteLogin();
    }
  };

  // Đăng nhập qua Google - vào trang tiếp theo ngay lập tức
  const handleSocialAuth = (provider: "Google" | "Apple") => {
    if (isSubmitting || isSuccess) return;

    setErrorMessage("");
    const result = loginWithSocial(provider);
    setAuthenticatedUser(result.user);
    setAuthState("success");
    playZenBellSound();

    // Vào trang tiếp theo liền luôn
    try {
      onSuccess(result.user.name, result.user.email);
    } catch {
      handleCompleteLogin();
    }
  };

  return (
    <div className="split-login-viewport" onMouseMove={handleMouseMove}>
      {/* Hiệu ứng chuyển cảnh kim quang khi đăng nhập thành công */}
      {isSuccess && <div className="split-success-cinematic-glow" aria-hidden="true" />}

      {/* =================================================================== */}
      {/* CỘT TRÁI (~60%): TRANH TIÊN CẢNH NGHỆ THUẬT & LƯ HƯƠNG             */}
      {/* =================================================================== */}
      <div className="split-login-left">
        {/* Nẹp viền chỉ vàng đồng mảnh ở ranh giới giữa 2 cột */}
        <div className="split-golden-divider" aria-hidden="true" />

        {/* Ảnh nền tiên cảnh nghệ thuật chuẩn ảnh mẫu người dùng */}
        <img
          src="/images/login-celestial-left.jpg"
          alt="Tin vào những điều tốt lành - Không gian mây ngàn tiên cảnh thanh tịnh"
          className="split-left-bg"
          fetchPriority="high"
          style={{
            transform: reducedMotion
              ? "none"
              : `scale(1.02) translate3d(${parallax.x * -6}px, ${parallax.y * -4}px, 0)`,
          }}
        />

        {/* Canvas khói nhang động bốc lên từ 3 nén nhang */}
        <canvas ref={canvasRef} className="split-left-canvas" aria-hidden="true" />

        {/* Nút Quay lại góc trên bên trái */}
        {onBack && !isSuccess && (
          <div className="split-left-back-wrapper">
            <button
              type="button"
              onClick={onBack}
              className="split-back-btn"
              title="Quay lại"
              aria-label="Quay lại"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
          </div>
        )}

        {/* Nội dung trợ năng và SEO (đã thể hiện trực quan trên tranh nghệ thuật) */}
        <div className="sr-only">
          <h2>Tin vào những điều tốt lành</h2>
          <p>Một không gian để lắng nghe, chiêm nghiệm và kết nối với văn hóa tâm linh Việt.</p>
        </div>
      </div>

      {/* =================================================================== */}
      {/* CỘT PHẢI (~40%): NỀN GIẤY DÓ & FORM ĐĂNG NHẬP CHUẨN ẢNH MẪU         */}
      {/* =================================================================== */}
      <div className="split-login-right">
        {/* Họa tiết mây mờ góc trên bên phải */}
        <svg className="split-corner-cloud-tr" viewBox="0 0 140 110" fill="currentColor" aria-hidden="true">
          <path d="M70 20c8-10 24-10 32 0 10-4 22 2 24 12 8 2 12 10 10 18-6 16-24 16-36 12-10 10-28 8-34-4-12 2-20-8-18-18 2-10 12-16 22-20Z" opacity="0.3" />
          <path d="M90 40c6-6 18-6 24 0 8-3 16 2 18 8 6 1 8 8 6 14-5 11-18 11-26 8-8 7-20 5-24-3-8 1-14-6-12-13 1-7 8-11 14-14Z" opacity="0.4" />
        </svg>

        {/* Nhánh hoa đào/mai mờ góc dưới bên phải */}
        <svg className="split-corner-blossom-br" viewBox="0 0 160 130" fill="none" stroke="currentColor" strokeWidth="1" aria-hidden="true">
          <path d="M160 130 C120 110, 90 80, 80 40" stroke="rgba(140, 90, 60, 0.25)" strokeWidth="1.5" />
          <circle cx="85" cy="45" r="7" fill="rgba(220, 140, 140, 0.35)" />
          <circle cx="110" cy="75" r="8" fill="rgba(220, 140, 140, 0.3)" />
          <circle cx="135" cy="100" r="9" fill="rgba(220, 140, 140, 0.25)" />
        </svg>

        {/* Nút Thỉnh chuông & Trợ giúp góc trên bên phải */}
        <div className="split-right-topbar">
          <button
            type="button"
            onClick={() => {
              playZenBellSound();
              setBellRinging(true);
              setTimeout(() => setBellRinging(false), 900);
            }}
            className={`split-topbar-btn split-bell-btn ${bellRinging ? "split-bell-btn--active" : ""}`}
            title="Thỉnh chuông thiền tịnh tâm"
            aria-label="Thỉnh chuông thiền"
          >
            <Bell className={`w-4 h-4 ${bellRinging ? "split-bell-shake" : ""}`} />
            <span>Thỉnh chuông</span>
          </button>
        </div>

        {/* Khung Form ở giữa Cột Phải (Nằm trực tiếp trên nền kem giấy dó) */}
        <div className="split-form-wrapper">
          {isSuccess ? (
            /* TRẠNG THÁI ĐĂNG NHẬP THÀNH CÔNG */
            <div className="split-success-box">
              <div className="w-14 h-14 rounded-full bg-amber-500/15 border border-amber-500/35 flex items-center justify-center mb-3 text-[#a3271e] animate-pulse">
                <Sparkles className="w-7 h-7" />
              </div>
              <h2 className="font-serif text-3xl font-semibold text-[#22140d]">
                Chào mừng bạn trở lại
              </h2>
              <p className="split-success-quote">
                “Tâm an vạn sự lành · Thân tĩnh lòng thanh thản”
              </p>
              <button
                type="button"
                onClick={handleCompleteLogin}
                className="split-submit-btn max-w-[220px]"
              >
                <span>VÀO NGAY</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          ) : (
            /* FORM ĐĂNG NHẬP CHUẨN XÁC 1:1 THEO ẢNH MẪU */
            <>
              <div className="split-form-header">
                <h1 className="split-form-title">
                  Chào mừng
                  <div className="split-form-title-row">
                    <span>trở lại</span>
                    {/* Họa tiết đám mây cổ phong bên cạnh chữ trở lại */}
                    <CloudOrnament className="split-cloud-svg" />
                  </div>
                </h1>
                <p className="split-form-subtitle">
                  Tiếp tục hành trình khám phá những giá trị
                  <br />
                  tâm linh và văn hóa Việt.
                </p>
              </div>

              {/* Thông báo cảm xúc đang giữ (nếu có) */}
              {pendingSignalMood && (
                <div className="split-alert split-alert--mood">
                  Đang giữ cảm xúc: <strong>{pendingSignalMood}</strong>
                </div>
              )}

              {/* Thông báo lỗi (nếu có) */}
              {errorMessage && (
                <div id="login-error" role="alert" className="split-alert split-alert--error">
                  {errorMessage}
                </div>
              )}

              <form onSubmit={handleSubmit} className="split-form">
                {/* Trường Email */}
                <div className="split-input-field">
                  <Mail className="split-input-icon" aria-hidden="true" />
                  <input
                    id="login-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    inputMode="email"
                    required
                    disabled={isSubmitting}
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                    placeholder="Email"
                    className="split-input-box"
                  />
                </div>

                {/* Trường Mật khẩu */}
                <div className="split-input-field">
                  <Lock className="split-input-icon" aria-hidden="true" />
                  <input
                    id="login-password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    required
                    disabled={isSubmitting}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Mật khẩu"
                    className="split-input-box"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={showPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
                    disabled={isSubmitting}
                    className="split-input-toggle"
                  >
                    {showPassword ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                  </button>
                </div>

                {/* Hàng Ghi nhớ đăng nhập + Quên mật khẩu */}
                <div className="split-form-options">
                  <label className="split-remember-label">
                    <input
                      type="checkbox"
                      checked={rememberEmail}
                      onChange={(e) => setRememberEmail(e.target.checked)}
                      disabled={isSubmitting}
                      className="split-checkbox"
                    />
                    <span>Ghi nhớ đăng nhập</span>
                  </label>

                  {onGoToForgotPassword && (
                    <button
                      type="button"
                      onClick={onGoToForgotPassword}
                      disabled={isSubmitting}
                      className="split-forgot-link"
                    >
                      Quên mật khẩu?
                    </button>
                  )}
                </div>

                {/* Nút BƯỚC VÀO -> */}
                <button type="submit" disabled={isSubmitting} className="split-submit-btn">
                  <span className="split-sheen" />
                  <ButtonOrnament className="split-btn-ornament split-btn-ornament--left" />
                  <ButtonOrnament className="split-btn-ornament split-btn-ornament--right" />
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>ĐANG KẾT NỐI...</span>
                    </>
                  ) : (
                    <>
                      <span>BƯỚC VÀO</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>

              {/* Dải phân cách hoa sen & hoặc có chấm tròn 2 đầu */}
              <div className="split-divider-row" aria-hidden="true">
                <span className="split-divider-line" />
                <div className="split-divider-center">
                  <svg viewBox="0 0 24 16" fill="none" stroke="currentColor" strokeWidth="1.2">
                    <path d="M12 2c-1.5 2-2 4.5-1.5 7 .5 1.5 1 2.5 1.5 3 .5-.5 1-1.5 1.5-3 .5-2.5 0-5-1.5-7Z" />
                    <path d="M9.5 6C7.5 5.5 5.5 6 4.5 7c1 2.2 3.2 4 7.5 4.8" />
                    <path d="M14.5 6c2-.5 4 0 5 1-1 2.2-3.2 4-7.5 4.8" />
                  </svg>
                  <span>hoặc</span>
                </div>
                <span className="split-divider-line" />
              </div>

              {/* Nút đăng nhập Google */}
              <div className="split-social-single">
                <button
                  type="button"
                  onClick={() => handleSocialAuth("Google")}
                  disabled={isSubmitting || isSuccess}
                  className="split-social-btn"
                >
                  <svg className="split-social-icon" viewBox="0 0 48 48" aria-hidden="true">
                    <path
                      fill="#4285F4"
                      d="M47.5 24.6c0-1.6-.1-3.1-.4-4.6H24v9h13.2c-.6 2.9-2.3 5.4-4.8 7.1l7.7 6C44.6 37.8 47.5 31.7 47.5 24.6Z"
                    />
                    <path
                      fill="#34A853"
                      d="M24 48c6.5 0 11.9-2.2 15.9-5.9l-7.7-6c-2.1 1.4-4.7 2.3-8.2 2.3-6.3 0-11.6-4.2-13.5-9.9l-8 6.2C6.5 42.6 14.6 48 24 48Z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M10.5 28.5a14.5 14.5 0 0 1 0-9.1l-8-6.2a24 24 0 0 0 0 21.5l8-6.2Z"
                    />
                    <path
                      fill="#EA4335"
                      d="M24 9.5c3.5 0 6.7 1.2 9.2 3.6l6.9-6.9C35.9 2.4 30.5 0 24 0 14.6 0 6.5 5.4 2.5 13.2l8 6.2C12.4 13.7 17.7 9.5 24 9.5Z"
                    />
                  </svg>
                  <span>Tiếp tục với Google</span>
                </button>
              </div>

              {/* Chân trang */}
              <div className="split-footer-link">
                <span>Chưa có tài khoản?</span>
                <button
                  type="button"
                  onClick={onGoToRegister}
                  disabled={isSubmitting}
                  className="split-register-action"
                >
                  Đăng ký ngay →
                </button>
              </div>
            </>
          )}
        </div>

        {/* Khoảng đệm chân cột phải */}
        <div className="h-6 w-full" aria-hidden="true" />
      </div>
    </div>
  );
};

/** Họa tiết đám mây cổ phong cạnh tiêu đề */
const CloudOrnament: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    className={className}
    viewBox="0 0 60 28"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M4 18c2-3 5-4 8-3 1-3 4-5 8-4 2-4 7-4 10-1 3-3 8-2 10 2 3-1 6 1 7 4 2 3 1 7-2 9H6c-3 0-4-4-2-7Z" />
    <path d="M12 18c3-1 7 1 9 3" />
    <path d="M26 15c2-1 5 0 7 2" />
    <path d="M46 19c3 0 6 2 8 4" />
  </svg>
);

/** Hoa văn mây cuộn vàng ở hai đầu nút "Bước vào" */
const ButtonOrnament: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    className={className}
    viewBox="0 0 30 20"
    fill="none"
    stroke="currentColor"
    strokeWidth="1"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M2 3v14" />
    <path d="M2 10h4" />
    <path d="M9 10c0-2.6 2-4.4 4.4-4.4 2.2 0 3.8 1.6 3.8 3.6 0 1.6-1.2 2.8-2.7 2.8-1.2 0-2.1-.9-2.1-2 0-.9.7-1.6 1.6-1.6" />
    <path d="M17.2 9.2c1.2-2.6 3.6-3.8 6-3.2 1.8.5 3 2 3 3.6" />
    <path d="M9 10c0 2.6 2 4.4 4.6 4.4h12.4" />
    <path d="M6 5.5c1.2-1.4 2.8-2.2 4.6-2.2" />
    <path d="M6 14.5c1.2 1.4 2.8 2.2 4.6 2.2" />
  </svg>
);
