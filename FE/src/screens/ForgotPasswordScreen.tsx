import React, { useState, useRef, useEffect } from "react";
import {
  Mail,
  ArrowRight,
  KeyRound,
  CheckCircle2,
  Bell,
} from "lucide-react";
import { CelestialAuthLeft } from "../components/CelestialAuthLeft";
import "../styles/LoginScreen.css";

export interface ForgotPasswordScreenProps {
  onBackToLogin: () => void;
  onImmersiveChange?: (immersive: boolean) => void;
}

export const ForgotPasswordScreen: React.FC<ForgotPasswordScreenProps> = ({
  onBackToLogin,
  onImmersiveChange,
}) => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [bellRinging, setBellRinging] = useState(false);

  const audioElementRef = useRef<HTMLAudioElement | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);

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
    setErrorMessage("");

    const cleanEmail = email.trim().toLowerCase();

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)) {
      setErrorMessage("Vui lòng nhập địa chỉ email hợp lệ.");
      return;
    }

    setEmail(cleanEmail);
    setSubmitted(true);
  };

  return (
    <div className="split-login-viewport" role="main">
      {/* =====================================================================
          CỘT TRÁI (~60%): TRANH TIÊN CẢNH NGHỆ THUẬT & LƯ HƯƠNG TAM THẾ
          ===================================================================== */}
      <CelestialAuthLeft
        onBack={onBackToLogin}
      />

      {/* =====================================================================
          CỘT PHẢI (~40%): NỀN GIẤY DÓ THANH NHÃ & FORM KHÔI PHỤC MẬT KHẨU
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
                <span className="split-seal-badge" title="Dấu ấn Định">
                  定
                </span>
                <span>Khôi phục hồ sơ</span>
                <CloudOrnament className="split-cloud-svg" />
              </div>
            </h1>
            <p className="split-form-subtitle">
              Nhập email tài khoản để nhận hướng dẫn khôi phục an lành.
            </p>
          </div>

          {/* Thông báo lỗi */}
          {errorMessage && (
            <div role="alert" className="split-alert split-alert--error">
              {errorMessage}
            </div>
          )}

          {submitted ? (
            /* TRẠNG THÁI GỬI THÀNH CÔNG */
            <div className="space-y-4">
              <div className="split-success-card">
                <div className="split-success-card-title">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  <span>Đã ghi nhận yêu cầu khôi phục</span>
                </div>
                <p className="split-success-card-body">
                  Địa chỉ email bạn vừa nhập:
                </p>
                <div className="split-success-card-email">{email}</div>
                <p className="split-success-card-body" style={{ marginTop: "8px" }}>
                  Trong phiên thử nghiệm này, bạn có thể quay lại trang Đăng nhập
                  để tiếp tục trải nghiệm hoặc sử dụng tài khoản mẫu với đầy đủ tính năng.
                </p>
              </div>

              <button
                type="button"
                onClick={onBackToLogin}
                className="split-submit-btn"
              >
                <span className="split-sheen" />
                <ButtonOrnament className="split-btn-ornament split-btn-ornament--left" />
                <ButtonOrnament className="split-btn-ornament split-btn-ornament--right" />
                <KeyRound className="w-4 h-4" />
                <span>TRỞ LẠI ĐĂNG NHẬP NGAY</span>
              </button>
            </div>
          ) : (
            /* BIỂU MẪU NHẬP EMAIL */
            <form onSubmit={handleSubmit} className="split-form">
              <div className="split-input-field">
                <Mail className="split-input-icon" aria-hidden="true" />
                <input
                  id="recovery-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  inputMode="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Địa chỉ Email tài khoản"
                  className="split-input-box"
                />
              </div>

              <button type="submit" className="split-submit-btn">
                <span className="split-sheen" />
                <ButtonOrnament className="split-btn-ornament split-btn-ornament--left" />
                <ButtonOrnament className="split-btn-ornament split-btn-ornament--right" />
                <span>GỬI LIÊN KẾT KHÔI PHỤC</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}

          {/* Dải phân cách hoa sen */}
          <div className="split-divider-row" aria-hidden="true">
            <span className="split-divider-line" />
            <div className="split-divider-center">
              <svg viewBox="0 0 24 16" fill="none" stroke="currentColor" strokeWidth="1.2">
                <path d="M12 2c-1.5 2-2 4.5-1.5 7 .5 1.5 1 2.5 1.5 3 .5-.5 1-1.5 1.5-3 .5-2.5 0-5-1.5-7Z" />
                <path d="M9.5 6C7.5 5.5 5.5 6 4.5 7c1 2.2 3.2 4 7.5 4.8" />
                <path d="M14.5 6c2-.5 4 0 5 1-1 2.2-3.2 4-7.5 4.8" />
              </svg>
            </div>
            <span className="split-divider-line" />
          </div>

          {/* Chân trang */}
          <div className="split-footer-link">
            <span>Nhớ lại mật khẩu?</span>
            <button
              type="button"
              onClick={onBackToLogin}
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
