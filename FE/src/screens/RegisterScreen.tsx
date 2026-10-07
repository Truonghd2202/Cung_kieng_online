import React, { useState, useRef, useEffect } from "react";
import {
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  Loader2,
  Sparkles,
  Bell,
  CheckCircle2,
} from "lucide-react";
import { registerAccount, loginWithSocial } from "../data/authService";
import { CelestialAuthLeft } from "../components/CelestialAuthLeft";
import "../styles/LoginScreen.css";

export interface RegisterScreenProps {
  onBack?: () => void;
  onSuccess: (name?: string, email?: string) => void;
  onGoToLogin: () => void;
  onImmersiveChange?: (immersive: boolean) => void;
  pendingSignalMood?: string;
}

export const RegisterScreen: React.FC<RegisterScreenProps> = ({
  onBack,
  onSuccess,
  onGoToLogin,
  onImmersiveChange,
  pendingSignalMood,
}) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreed, setAgreed] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bellRinging, setBellRinging] = useState(false);

  const audioElementRef = useRef<HTMLAudioElement | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);

  // Ẩn thanh header chung để hiển thị toàn màn hình chuẩn Split-screen
  useEffect(() => {
    onImmersiveChange?.(true);
    return () => {
      onImmersiveChange?.(false);
    };
  }, [onImmersiveChange]);

  useEffect(() => {
    return () => {
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

  const handleRingBell = () => {
    setBellRinging(true);
    playZenBellSound();
    setTimeout(() => setBellRinging(false), 900);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    setErrorMessage("");
    setSuccessMessage("");

    const cleanName = name.trim();
    const cleanEmail = email.trim().toLowerCase();
    const submittedPassword = password;

    if (!cleanName) {
      setErrorMessage("Vui lòng nhập họ tên hoặc danh xưng hiển thị.");
      return;
    }

    if (cleanName.length > 80) {
      setErrorMessage("Tên hiển thị không được vượt quá 80 ký tự.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)) {
      setErrorMessage("Vui lòng nhập địa chỉ email hợp lệ.");
      return;
    }

    if (submittedPassword.length < 6) {
      setErrorMessage("Mật khẩu cần có tối thiểu 6 ký tự.");
      return;
    }

    if (submittedPassword !== confirmPassword) {
      setErrorMessage("Mật khẩu xác nhận không khớp. Vui lòng kiểm tra lại.");
      return;
    }

    if (!agreed) {
      setErrorMessage("Vui lòng đồng ý với quy ước gìn giữ không gian an trú.");
      return;
    }

    setIsSubmitting(true);

    try {
      const result = registerAccount(cleanName, cleanEmail, submittedPassword);

      if (!result.success) {
        setIsSubmitting(false);
        setErrorMessage(result.error || "Không thể tạo tài khoản. Vui lòng thử lại.");
        return;
      }

      try {
        localStorage.setItem("tltl_remembered_email", cleanEmail);
      } catch {}

      // Vào trang tiếp theo liền luôn theo mong muốn của người dùng
      onSuccess(result.user.name, result.user.email);
    } catch {
      setIsSubmitting(false);
      setErrorMessage("Có lỗi xảy ra khi tạo tài khoản. Vui lòng thử lại.");
    }
  };

  const handleSocialAuth = (provider: "Google" | "Apple") => {
    if (isSubmitting) return;
    setIsSubmitting(true);
    setErrorMessage("");

    try {
      const result = loginWithSocial(provider);
      if (result.success) {
        onSuccess(result.user.name, result.user.email);
      } else {
        setIsSubmitting(false);
        setErrorMessage(`Đăng ký với ${provider} không thành công.`);
      }
    } catch {
      setIsSubmitting(false);
      setErrorMessage(`Đăng ký với ${provider} không thành công.`);
    }
  };

  return (
    <div className="split-login-viewport" role="main">
      {/* =====================================================================
          CỘT TRÁI (~60%): TRANH TIÊN CẢNH NGHỆ THUẬT & LƯ HƯƠNG TAM THẾ
          ===================================================================== */}
      <CelestialAuthLeft
        onBack={onBack || onGoToLogin}
      />

      {/* =====================================================================
          CỘT PHẢI (~40%): NỀN GIẤY DÓ THANH NHÃ & FORM KHỞI TẠO HỒ SƠ
          ===================================================================== */}
      <div className="split-login-right">
        {/* Họa tiết mây dập chìm góc trên bên phải */}
        <svg
          className="split-corner-cloud-tr"
          viewBox="0 0 120 90"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          aria-hidden="true"
        >
          <path d="M110 10c-15 0-25 8-28 18-5-2-12-1-16 4-6-2-14 1-16 8-4-1-9 1-11 5-4 0-8 4-8 9 0 8 7 14 15 14h64c12 0 22-9 22-21 0-11-9-20-20-21" />
        </svg>

        {/* Cành hoa đào/mai trang nhã góc dưới */}
        <svg
          className="split-corner-blossom-br"
          viewBox="0 0 140 120"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.1"
          aria-hidden="true"
        >
          <path d="M140 110c-35-5-65-25-85-55-10-15-18-35-20-55" />
          <circle cx="85" cy="72" r="6" />
          <circle cx="110" cy="50" r="5" />
          <circle cx="55" cy="45" r="4" />
        </svg>

        {/* Thanh công cụ góc trên: Nút Thỉnh chuông */}
        <div className="split-right-topbar">
          <button
            type="button"
            onClick={handleRingBell}
            className={`split-topbar-btn split-bell-btn ${
              bellRinging ? "split-bell-btn--active" : ""
            }`}
            title="Thỉnh một tiếng chuông tĩnh tâm"
            aria-label="Thỉnh chuông tĩnh tâm"
          >
            <Bell
              className={`w-3.5 h-3.5 text-amber-700 ${
                bellRinging ? "split-bell-shake" : ""
              }`}
            />
            <span>Thỉnh chuông</span>
          </button>
        </div>

        {/* Khung nội dung biểu mẫu */}
        <div className="split-form-wrapper">
          <div className="split-form-header">
            <h1 className="split-form-title">
              <div className="split-form-title-row">
                <span className="split-seal-badge" title="Dấu ấn Tâm">
                  心
                </span>
                <span>Khởi tạo hồ sơ</span>
                <CloudOrnament className="split-cloud-svg" />
              </div>
            </h1>
            <p className="split-form-subtitle">
              Ghi danh tâm thức để lưu giữ quẻ xăm và hành trình tĩnh tại.
            </p>
          </div>

          {/* Quẻ đang chờ lưu (nếu có) */}
          {pendingSignalMood && (
            <div className="split-alert split-alert--mood">
              <Sparkles className="w-3.5 h-3.5 inline mr-1 text-amber-600" />
              Đang chờ lưu: <strong>{pendingSignalMood}</strong>
            </div>
          )}

          {/* Thông báo lỗi (nếu có) */}
          {errorMessage && (
            <div role="alert" className="split-alert split-alert--error">
              {errorMessage}
            </div>
          )}

          {/* Thông báo thành công */}
          {successMessage && (
            <div role="status" className="split-alert split-alert--mood">
              <CheckCircle2 className="w-3.5 h-3.5 inline mr-1 text-emerald-600" />
              {successMessage}
            </div>
          )}

          <form onSubmit={handleSubmit} className="split-form split-form-compact">
            {/* Họ và tên */}
            <div className="split-input-field">
              <User className="split-input-icon" aria-hidden="true" />
              <input
                id="register-name"
                name="name"
                type="text"
                autoComplete="name"
                required
                maxLength={80}
                disabled={isSubmitting}
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Tên hiển thị của bạn"
                className="split-input-box"
              />
            </div>

            {/* Email */}
            <div className="split-input-field">
              <Mail className="split-input-icon" aria-hidden="true" />
              <input
                id="register-email"
                name="email"
                type="email"
                autoComplete="email"
                inputMode="email"
                required
                disabled={isSubmitting}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Địa chỉ Email"
                className="split-input-box"
              />
            </div>

            {/* Mật khẩu */}
            <div className="split-input-field">
              <Lock className="split-input-icon" aria-hidden="true" />
              <input
                id="register-password"
                name="password"
                type={showPassword ? "text" : "password"}
                autoComplete="new-password"
                required
                disabled={isSubmitting}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Mật khẩu (tối thiểu 6 ký tự)"
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

            {/* Nhập lại mật khẩu */}
            <div className="split-input-field">
              <Lock className="split-input-icon" aria-hidden="true" />
              <input
                id="register-confirm-password"
                name="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                autoComplete="new-password"
                required
                disabled={isSubmitting}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Xác nhận lại mật khẩu"
                className="split-input-box"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                aria-label={showConfirmPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
                disabled={isSubmitting}
                className="split-input-toggle"
              >
                {showConfirmPassword ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
              </button>
            </div>

            {/* Checkbox Quy ước an trú */}
            <label className="split-terms-row">
              <input
                type="checkbox"
                id="register-agreed"
                checked={agreed}
                disabled={isSubmitting}
                onChange={(e) => setAgreed(e.target.checked)}
                className="split-checkbox"
              />
              <span>Đồng ý quy ước gìn giữ không gian an trú thanh tịnh</span>
            </label>

            {/* Nút KHỞI TẠO HỒ SƠ -> */}
            <button
              type="submit"
              disabled={isSubmitting || !agreed}
              className="split-submit-btn"
            >
              <span className="split-sheen" />
              <ButtonOrnament className="split-btn-ornament split-btn-ornament--left" />
              <ButtonOrnament className="split-btn-ornament split-btn-ornament--right" />
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>ĐANG KHỞI TẠO...</span>
                </>
              ) : (
                <>
                  <span>TẠO HỒ SƠ AN TRÚ</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Dải phân cách hoa sen & hoặc */}
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
              disabled={isSubmitting}
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

          {/* Chân trang: Đã có tài khoản? */}
          <div className="split-footer-link">
            <span>Đã có tài khoản?</span>
            <button
              type="button"
              onClick={onGoToLogin}
              disabled={isSubmitting}
              className="split-register-action"
            >
              Đăng nhập ngay →
            </button>
          </div>
        </div>

        {/* Khoảng đệm chân */}
        <div className="h-6 w-full" aria-hidden="true" />
      </div>
    </div>
  );
};

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
