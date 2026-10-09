import React, { useState, useRef, useEffect } from "react";
import { requestPasswordReset, verifyResetCode, resetPassword } from "../data/authService";
import {
  Mail,
  ArrowRight,
  KeyRound,
  CheckCircle2,
  Bell,
  Lock,
  Eye,
  EyeOff,
  ShieldCheck,
  RotateCcw,
} from "lucide-react";
import { CelestialAuthLeft } from "../components/CelestialAuthLeft";
import "../styles/LoginScreen.css";
import { toast } from "../components/ui/Toast";

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
  const [isCodeVerified, setIsCodeVerified] = useState(false);
  const [complete, setComplete] = useState(false);

  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [noticeMessage, setNoticeMessage] = useState("");
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

  // Bước 0: Gửi email yêu cầu đặt lại mật khẩu
  const handleRequestReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    setNoticeMessage("");

    const cleanEmail = email.trim().toLowerCase();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)) {
      setErrorMessage("Vui lòng nhập địa chỉ email hợp lệ.");
      return;
    }

    setIsSubmitting(true);
    try {
      const result = await requestPasswordReset(cleanEmail);
      if (!result.deliveryConfigured) {
        setErrorMessage("Chưa cấu hình gửi email. Hãy kiểm tra SMTP_USER và SMTP_PASS trong BE/.env.");
        return;
      }
      setEmail(cleanEmail);
      setSubmitted(true); toast.info("Đã gửi mã xác minh 6 chữ số vào hộp thư của bạn.", "Kiểm tra hòm thư");
      setIsCodeVerified(false);
      setCode("");
    } catch {
      setErrorMessage("Chưa gửi được mã xác minh. Vui lòng kiểm tra kết nối rồi thử lại.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Bước 1: Chỉ xác minh mã 6 chữ số
  const handleVerifyCodeOnly = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    setNoticeMessage("");

    const cleanCode = code.trim();
    if (!/^\d{6}$/.test(cleanCode)) {
      setErrorMessage("Vui lòng nhập đầy đủ mã xác minh 6 chữ số.");
      return;
    }

    setIsSubmitting(true);
    try {
      await verifyResetCode(email, cleanCode);
      setIsCodeVerified(true);
      setNoticeMessage("Mã xác minh chính xác. Mời bạn thiết lập mật khẩu mới.");
    } catch {
      setErrorMessage("Mã xác minh không đúng hoặc đã hết hạn. Hãy kiểm tra lại hòm thư.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Bước 2: Nhập và lưu mật khẩu mới
  const handleSaveNewPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    setNoticeMessage("");

    const cleanCode = code.trim();
    if (newPassword.length < 8 || !/[A-Z]/.test(newPassword) || !/[a-z]/.test(newPassword) || !/[0-9]/.test(newPassword)) {
      setErrorMessage("Mật khẩu cần ít nhất 8 ký tự, gồm chữ hoa, chữ thường và chữ số.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setErrorMessage("Mật khẩu xác nhận không trùng khớp.");
      return;
    }

    setIsSubmitting(true);
    try {
      await resetPassword(email, cleanCode, newPassword);
      setComplete(true); toast.success("Đặt lại mật khẩu thành công! Bạn có thể đăng nhập ngay.", "Hoàn tất khôi phục");
    } catch {
      setErrorMessage("Không thể cập nhật mật khẩu. Mã xác minh có thể đã hết hạn, vui lòng gửi lại mã mới.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResendCode = async () => {
    setErrorMessage("");
    setNoticeMessage("");
    setIsSubmitting(true);
    try {
      const result = await requestPasswordReset(email);
      if (!result.deliveryConfigured) {
        setErrorMessage("Chưa cấu hình gửi email. Hãy kiểm tra SMTP_USER và SMTP_PASS trong BE/.env.");
      } else {
        setCode("");
        setIsCodeVerified(false);
        setNoticeMessage("Đã gửi mã mới vào hộp thư. Mã cũ không còn hiệu lực.");
      }
    } catch {
      setErrorMessage("Chưa gửi lại được mã. Vui lòng thử lại sau.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResetToEmailStep = () => {
    setSubmitted(false);
    setIsCodeVerified(false);
    setCode("");
    setNewPassword("");
    setConfirmPassword("");
    setErrorMessage("");
    setNoticeMessage("");
  };

  return (
    <div className="split-login-viewport" role="main">
      {/* =====================================================================
          CỘT TRÁI (~60%): TRANH TIÊN CẢNH NGHỆ THUẬT & LƯ HƯƠNG TAM THẾ
          ===================================================================== */}
      <CelestialAuthLeft onBack={onBackToLogin} />

      {/* =====================================================================
          CỘT PHẢI (~40%): NỀN GIẤY DÓ THANH NHÃ & SANCTUARY CARD
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

        {/* =================================================================
            THẺ BÀI AN YÊN (SANCTUARY CARD) VỚI GÓC KIM CHI ÁNH KIM
            ================================================================= */}
        <div className="w-full max-w-[420px] bg-white/85 dark:bg-stone-900/85 backdrop-blur-md rounded-2xl p-6 sm:p-7 shadow-[0_12px_40px_rgba(40,20,10,0.08)] dark:shadow-[0_12px_40px_rgba(0,0,0,0.4)] border border-amber-900/15 dark:border-amber-400/15 relative z-10">
          {/* 4 Góc kim chi hoa văn cổ điển (Ornamental Brass Corner Brackets) */}
          <div className="absolute top-2.5 left-2.5 w-3.5 h-3.5 border-t-2 border-l-2 border-amber-500/40 rounded-tl-sm pointer-events-none" />
          <div className="absolute top-2.5 right-2.5 w-3.5 h-3.5 border-t-2 border-r-2 border-amber-500/40 rounded-tr-sm pointer-events-none" />
          <div className="absolute bottom-2.5 left-2.5 w-3.5 h-3.5 border-b-2 border-l-2 border-amber-500/40 rounded-bl-sm pointer-events-none" />
          <div className="absolute bottom-2.5 right-2.5 w-3.5 h-3.5 border-b-2 border-r-2 border-amber-500/40 rounded-br-sm pointer-events-none" />

          {/* TIÊU ĐỀ TRANG NHÃ KÈM DẤU ẤN TRIỆN SON KHẮC GỖ */}
          <div className="split-form-header mb-4">
            <div className="split-form-title-row flex items-center gap-3">
              <div
                className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#a62432] via-[#851924] to-[#5c1018] border border-amber-400/70 ring-2 ring-amber-400/30 shadow-[0_3px_10px_rgba(166,36,50,0.35)] flex items-center justify-center shrink-0 select-none"
                title="Triện son Định"
              >
                <span className="font-serif font-black text-amber-100 text-sm tracking-tight leading-none">
                  定
                </span>
              </div>
              <div>
                <h1 className="font-serif text-[1.6rem] sm:text-[1.8rem] font-bold text-ink tracking-tight leading-tight">
                  Khôi Phục Hồ Sơ
                </h1>
              </div>
            </div>
            <p className="text-xs sm:text-[13px] text-muted mt-1 leading-relaxed">
              {!submitted
                ? "Nhập email tài khoản để nhận mã xác minh khôi phục mật khẩu."
                : !isCodeVerified
                ? "Nhập mã 6 chữ số trong hộp thư để xác minh quyền sở hữu."
                : "Nhập mật khẩu mới để hoàn tất khôi phục tài khoản."}
            </p>
            {/* Đường chỉ hoa văn ánh kim */}
            <div className="flex items-center gap-2 mt-2">
              <span className="h-px flex-1 bg-gradient-to-r from-transparent via-amber-500/30 to-amber-500/10" />
              <span className="text-amber-600/70 dark:text-amber-400/70 text-[9px]">✤</span>
              <span className="h-px flex-1 bg-gradient-to-l from-transparent via-amber-500/30 to-amber-500/10" />
            </div>
          </div>

          {/* THÔNG BÁO LỖI */}
          {errorMessage && (
            <div
              role="alert"
              className="mb-3 p-2.5 rounded-xl bg-danger-soft border border-danger/30 text-xs text-danger flex items-start gap-2 shadow-xs animate-fade-in"
            >
              <span className="font-bold leading-none mt-0.5">✕</span>
              <span className="leading-relaxed flex-1">{errorMessage}</span>
            </div>
          )}

          {/* THÔNG BÁO GỢI Ý / TIẾN TRÌNH */}
          {noticeMessage && (
            <div
              role="status"
              className="mb-3 p-2.5 rounded-xl bg-emerald-500/15 border border-emerald-500/35 text-xs text-emerald-800 dark:text-emerald-300 flex items-start gap-2 shadow-xs animate-fade-in"
            >
              <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600 dark:text-emerald-400 mt-0.5" />
              <span className="leading-relaxed font-medium flex-1">{noticeMessage}</span>
            </div>
          )}

          {/* TRƯỜNG HỢP 1: HOÀN TẤT ĐẶT LẠI MẬT KHẨU */}
          {complete ? (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-center shadow-xs">
                <div className="w-12 h-12 mx-auto rounded-full bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-2.5">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h3 className="font-serif font-bold text-base text-ink mb-1">
                  Đã Đặt Lại Mật Khẩu Thành Công
                </h3>
                <p className="text-xs text-muted leading-relaxed">
                  Hồ sơ của bạn đã được bảo vệ với mật khẩu mới. Bạn có thể đăng nhập ngay bây giờ.
                </p>
              </div>

              <button
                type="button"
                onClick={onBackToLogin}
                className="w-full h-11 relative overflow-hidden rounded-xl font-serif font-bold text-sm text-amber-100 tracking-wider shadow-[0_4px_16px_rgba(139,26,26,0.35)] transition-all duration-300 group cursor-pointer flex items-center justify-center gap-2 border border-amber-400/40 hover:border-amber-300/70 hover:shadow-[0_6px_22px_rgba(139,26,26,0.45)] active:scale-[0.99] bg-gradient-to-r from-[#6b1414] via-[#8f1d1d] to-[#591010]"
              >
                <span className="split-sheen" />
                <ButtonOrnament className="split-btn-ornament split-btn-ornament--left" />
                <ButtonOrnament className="split-btn-ornament split-btn-ornament--right" />
                <KeyRound className="w-4 h-4" />
                <span>TRỞ LẠI ĐĂNG NHẬP NGAY</span>
              </button>
            </div>
          ) : !submitted ? (
            /* TRƯỜNG HỢP 2: NHẬP EMAIL ĐỂ GỬI MÃ */
            <form onSubmit={handleRequestReset} className="space-y-3.5">
              <div>
                <label
                  htmlFor="recovery-email"
                  className="block text-xs font-semibold text-ink mb-1.5 tracking-wide"
                >
                  Địa chỉ Email tài khoản
                </label>
                <div className="relative group">
                  <Mail className="w-4 h-4 text-stone-400 group-focus-within:text-amber-600 dark:group-focus-within:text-amber-400 transition-colors absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    id="recovery-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    inputMode="email"
                    required
                    disabled={isSubmitting}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="email.cua.ban@domain.com"
                    className="w-full h-10.5 pl-10 pr-3.5 rounded-xl border border-stone-300/80 dark:border-stone-700/80 bg-stone-50/60 dark:bg-stone-900/60 text-sm text-ink placeholder:text-stone-400 focus:outline-none focus:ring-3 focus:ring-amber-500/20 focus:border-amber-600 dark:focus:border-amber-400 focus:bg-white dark:focus:bg-stone-900 transition-all shadow-xs disabled:opacity-60"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full h-11 relative overflow-hidden rounded-xl font-serif font-bold text-sm text-amber-100 tracking-wider shadow-[0_4px_16px_rgba(139,26,26,0.35)] transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed group cursor-pointer flex items-center justify-center gap-2 border border-amber-400/40 hover:border-amber-300/70 hover:shadow-[0_6px_22px_rgba(139,26,26,0.45)] active:scale-[0.99] bg-gradient-to-r from-[#6b1414] via-[#8f1d1d] to-[#591010]"
              >
                <span className="split-sheen" />
                <ButtonOrnament className="split-btn-ornament split-btn-ornament--left" />
                <ButtonOrnament className="split-btn-ornament split-btn-ornament--right" />
                <span>{isSubmitting ? "ĐANG GỬI MÃ…" : "GỬI MÃ XÁC MINH"}</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
            </form>
          ) : !isCodeVerified ? (
            /* TRƯỜNG HỢP 3: CHỈ HIỆN NHẬP MÃ (BƯỚC 1 THEO YÊU CẦU NGƯỜI DÙNG) */
            <div className="space-y-3.5">
              {/* Thẻ hiển thị email đã gửi mã */}
              <div className="p-3 rounded-xl bg-amber-50/80 dark:bg-stone-800/80 border border-amber-300/40 dark:border-amber-700/40 text-xs">
                <div className="flex items-center gap-2 font-medium text-amber-900 dark:text-amber-200">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                  <span>Mã xác minh đã gửi tới:</span>
                </div>
                <div className="mt-1 font-semibold text-ink break-all select-all font-mono">
                  {email}
                </div>
                <p className="mt-1 text-[11px] text-muted">
                  Mã có hiệu lực trong 10 phút. Vui lòng kiểm tra cả thư mục Spam.
                </p>
              </div>

              <form onSubmit={handleVerifyCodeOnly} className="space-y-3">
                <div>
                  <label
                    htmlFor="recovery-code"
                    className="block text-xs font-semibold text-ink mb-1.5 tracking-wide"
                  >
                    Mã xác minh (6 chữ số)
                  </label>
                  <div className="relative group">
                    <KeyRound className="w-4 h-4 text-stone-400 group-focus-within:text-amber-600 dark:group-focus-within:text-amber-400 transition-colors absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                      id="recovery-code"
                      name="code"
                      type="text"
                      inputMode="numeric"
                      autoComplete="one-time-code"
                      pattern="[0-9]{6}"
                      maxLength={6}
                      required
                      autoFocus
                      disabled={isSubmitting}
                      value={code}
                      onChange={(e) => setCode(e.target.value.replace(/\D/g, "").slice(0, 6))}
                      placeholder="000000"
                      className="w-full h-11 pl-10 pr-3.5 rounded-xl border border-stone-300/80 dark:border-stone-700/80 bg-stone-50/60 dark:bg-stone-900/60 text-ink placeholder:text-stone-400 focus:outline-none focus:ring-3 focus:ring-amber-500/20 focus:border-amber-600 dark:focus:border-amber-400 focus:bg-white dark:focus:bg-stone-900 transition-all shadow-xs font-mono text-center text-lg tracking-[0.35em] font-bold disabled:opacity-60"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting || code.length !== 6}
                  className="w-full h-11 relative overflow-hidden rounded-xl font-serif font-bold text-sm text-amber-100 tracking-wider shadow-[0_4px_16px_rgba(139,26,26,0.35)] transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed group cursor-pointer flex items-center justify-center gap-2 border border-amber-400/40 hover:border-amber-300/70 hover:shadow-[0_6px_22px_rgba(139,26,26,0.45)] active:scale-[0.99] bg-gradient-to-r from-[#6b1414] via-[#8f1d1d] to-[#591010]"
                >
                  <span className="split-sheen" />
                  <ButtonOrnament className="split-btn-ornament split-btn-ornament--left" />
                  <ButtonOrnament className="split-btn-ornament split-btn-ornament--right" />
                  <span>{isSubmitting ? "ĐANG KIỂM TRA MÃ…" : "XÁC MINH MÃ"}</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>
              </form>

              {/* Tùy chọn đổi email hoặc gửi lại mã */}
              <div className="flex items-center justify-between text-xs pt-1 px-1">
                <button
                  type="button"
                  onClick={handleResetToEmailStep}
                  disabled={isSubmitting}
                  className="text-stone-600 dark:text-stone-400 hover:text-amber-700 dark:hover:text-amber-400 transition-colors inline-flex items-center gap-1 cursor-pointer"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Đổi email khác</span>
                </button>
                <button
                  type="button"
                  onClick={handleResendCode}
                  disabled={isSubmitting}
                  className="text-amber-700 dark:text-amber-400 font-medium hover:underline transition-colors disabled:opacity-50 cursor-pointer"
                >
                  Gửi lại mã
                </button>
              </div>
            </div>
          ) : (
            /* TRƯỜNG HỢP 4: ĐÃ XÁC MINH MÃ ĐÚNG -> CHO PHÉP NHẬP MẬT KHẨU MỚI */
            <div className="space-y-3.5">
              {/* Thẻ chứng thực đã xác minh mã */}
              <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-xs text-emerald-800 dark:text-emerald-300 flex items-center justify-between shadow-xs">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                  <div>
                    <span className="font-medium">Mã hợp lệ cho tài khoản:</span>
                    <div className="font-semibold text-ink">{email}</div>
                  </div>
                </div>
                <span className="text-[11px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 font-semibold shrink-0">
                  Đã duyệt ✓
                </span>
              </div>

              <form onSubmit={handleSaveNewPassword} className="space-y-3">
                {/* Mật khẩu mới */}
                <div>
                  <label
                    htmlFor="new-password"
                    className="block text-xs font-semibold text-ink mb-1 tracking-wide"
                  >
                    Mật khẩu mới
                  </label>
                  <div className="relative group">
                    <Lock className="w-4 h-4 text-stone-400 group-focus-within:text-amber-600 dark:group-focus-within:text-amber-400 transition-colors absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                      id="new-password"
                      name="newPassword"
                      type={showNewPassword ? "text" : "password"}
                      autoComplete="new-password"
                      minLength={8}
                      required
                      autoFocus
                      disabled={isSubmitting}
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="•••••••• (Tối thiểu 8 ký tự)"
                      className="w-full h-10.5 pl-10 pr-10 rounded-xl border border-stone-300/80 dark:border-stone-700/80 bg-stone-50/60 dark:bg-stone-900/60 text-sm text-ink placeholder:text-stone-400 focus:outline-none focus:ring-3 focus:ring-amber-500/20 focus:border-amber-600 dark:focus:border-amber-400 focus:bg-white dark:focus:bg-stone-900 transition-all shadow-xs disabled:opacity-60"
                    />
                    <button
                      type="button"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                      tabIndex={-1}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 dark:hover:text-stone-200 transition-colors cursor-pointer"
                      aria-label={showNewPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
                    >
                      {showNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Xác nhận mật khẩu mới */}
                <div>
                  <label
                    htmlFor="confirm-new-password"
                    className="block text-xs font-semibold text-ink mb-1 tracking-wide"
                  >
                    Xác nhận mật khẩu mới
                  </label>
                  <div className="relative group">
                    <Lock className="w-4 h-4 text-stone-400 group-focus-within:text-amber-600 dark:group-focus-within:text-amber-400 transition-colors absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                      id="confirm-new-password"
                      name="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      autoComplete="new-password"
                      minLength={8}
                      required
                      disabled={isSubmitting}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Nhập lại mật khẩu mới..."
                      className="w-full h-10.5 pl-10 pr-10 rounded-xl border border-stone-300/80 dark:border-stone-700/80 bg-stone-50/60 dark:bg-stone-900/60 text-sm text-ink placeholder:text-stone-400 focus:outline-none focus:ring-3 focus:ring-amber-500/20 focus:border-amber-600 dark:focus:border-amber-400 focus:bg-white dark:focus:bg-stone-900 transition-all shadow-xs disabled:opacity-60"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      tabIndex={-1}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 dark:hover:text-stone-200 transition-colors cursor-pointer"
                      aria-label={showConfirmPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
                    >
                      {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  <p className="text-[11px] text-muted mt-1 leading-normal">
                    Mật khẩu cần ít nhất 8 ký tự, bao gồm chữ hoa, chữ thường và chữ số.
                  </p>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full h-11 relative overflow-hidden rounded-xl font-serif font-bold text-sm text-amber-100 tracking-wider shadow-[0_4px_16px_rgba(139,26,26,0.35)] transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed group cursor-pointer flex items-center justify-center gap-2 border border-amber-400/40 hover:border-amber-300/70 hover:shadow-[0_6px_22px_rgba(139,26,26,0.45)] active:scale-[0.99] bg-gradient-to-r from-[#6b1414] via-[#8f1d1d] to-[#591010]"
                >
                  <span className="split-sheen" />
                  <ButtonOrnament className="split-btn-ornament split-btn-ornament--left" />
                  <ButtonOrnament className="split-btn-ornament split-btn-ornament--right" />
                  <span>{isSubmitting ? "ĐANG LƯU MẬT KHẨU…" : "LƯU MẬT KHẨU MỚI & HOÀN TẤT"}</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>
              </form>
            </div>
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
              className="split-register-action cursor-pointer font-serif font-bold text-amber-700 dark:text-amber-400 hover:text-amber-800"
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
