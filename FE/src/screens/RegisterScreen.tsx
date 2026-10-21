import React, { useEffect, useRef, useState } from "react";
import {
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  Loader2,
  Sparkles,
  CheckCircle2,
  Circle,
  Bell,
} from "lucide-react";
import { registerAccount, requestEmailVerification, verifyEmailCode } from "../data/authService";
import { CelestialAuthLeft } from "../components/CelestialAuthLeft";
import "../styles/LoginScreen.css";
import { toast } from "../components/ui/Toast";

interface RegisterScreenProps {
  onBack?: () => void;
  onGoToLogin: () => void;
  pendingSignalMood?: string;
}

const registrationErrorCopy: Record<string, string> = {
  "Email already exists": "Email này đã được đăng ký. Hãy đăng nhập hoặc dùng email khác.",
  "Email is invalid": "Địa chỉ email chưa hợp lệ.",
  "Full name is required": "Vui lòng nhập tên hiển thị.",
  "Password must contain at least 8 characters": "Mật khẩu cần có ít nhất 8 ký tự.",
  "Password must contain at least one uppercase letter": "Mật khẩu cần có ít nhất một chữ hoa.",
  "Password must contain at least one lowercase letter": "Mật khẩu cần có ít nhất một chữ thường.",
  "Password must contain at least one number": "Mật khẩu cần có ít nhất một chữ số.",
  "Resource already exists": "Email này đã được đăng ký. Hãy đăng nhập hoặc dùng email khác.",
  "Internal server error": "Chưa thể tạo tài khoản lúc này. Vui lòng thử lại sau.",
};

function getRegistrationErrorMessage(message?: string): string {
  const cleanMessage = message?.trim();
  if (!cleanMessage) return "Chưa thể tạo tài khoản lúc này. Vui lòng thử lại sau.";
  if (registrationErrorCopy[cleanMessage]) return registrationErrorCopy[cleanMessage];
  return /^[\x00-\x7F]*$/.test(cleanMessage)
    ? "Chưa thể tạo tài khoản lúc này. Vui lòng thử lại sau."
    : cleanMessage;
}

export const RegisterScreen: React.FC<RegisterScreenProps> = ({
  onBack,
  onGoToLogin,
  pendingSignalMood,
}) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [verificationPending, setVerificationPending] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");
  const registerPanelRef = useRef<HTMLElement | null>(null);

  const passwordRequirements = [
    { label: "Ít nhất 8 ký tự", met: password.length >= 8 },
    { label: "Có chữ hoa", met: /[A-Z]/.test(password) },
    { label: "Có chữ thường", met: /[a-z]/.test(password) },
    { label: "Có chữ số", met: /[0-9]/.test(password) },
  ];
  const passwordRequirementCount = passwordRequirements.filter((item) => item.met).length;
  const passwordStrengthLabel =
    password.length === 0
      ? "Nhập mật khẩu"
      : passwordRequirementCount === 4
        ? "Đạt yêu cầu"
        : `${passwordRequirementCount}/4 tiêu chí`;
  const confirmPasswordHasInput = confirmPassword.length > 0;
  const confirmPasswordMatches = confirmPassword === password;

  const handleRingBell = () => {
    const bell = new Audio("/audio/meditation-bowl.mp3");
    bell.volume = 0.8;
    void bell.play().catch(() => {});
  };

  const registerTimerRef = useRef<ReturnType<typeof setTimeout> | null>(
    null
  );

  const redirectTimerRef = useRef<ReturnType<typeof setTimeout> | null>(
    null
  );

  useEffect(() => {
    return () => {
      if (registerTimerRef.current !== null) {
        clearTimeout(registerTimerRef.current);
        registerTimerRef.current = null;
      }

      if (redirectTimerRef.current !== null) {
        clearTimeout(redirectTimerRef.current);
        redirectTimerRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (errorMessage) registerPanelRef.current?.scrollTo({ top: 0, behavior: "smooth" });
  }, [errorMessage]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Chặn gửi lại trong lúc đăng ký hoặc chờ chuyển trang.
    if (
      registerTimerRef.current !== null ||
      redirectTimerRef.current !== null
    ) {
      return;
    }

    setErrorMessage("");
    setSuccessMessage("");

    const cleanName = name.trim();
    const cleanEmail = email.trim().toLowerCase();
    const submittedPassword = password;

    if (!cleanName) {
      setErrorMessage("Vui lòng nhập tên hiển thị của bạn.");
      return;
    }

    if (cleanName.length > 120) {
      setErrorMessage("Tên hiển thị không được vượt quá 120 ký tự.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)) {
      const msgEmail = "Vui lòng nhập địa chỉ email hợp lệ.";
    setErrorMessage(msgEmail);
      return;
    }

    if (
      submittedPassword.length < 8 ||
      !/[A-Z]/.test(submittedPassword) ||
      !/[a-z]/.test(submittedPassword) ||
      !/[0-9]/.test(submittedPassword)
    ) {
      const msgPass = "Mật khẩu cần ít nhất 8 ký tự, gồm chữ hoa, chữ thường và chữ số.";
    setErrorMessage(msgPass);
      return;
    }

    if (submittedPassword !== confirmPassword) {
      const msgConfirm = "Mật khẩu xác nhận không khớp. Vui lòng kiểm tra lại.";
    setErrorMessage(msgConfirm);
      return;
    }

    setIsSubmitting(true);

    registerTimerRef.current = setTimeout(async () => {
      registerTimerRef.current = null;

      try {
        const result = await registerAccount(
          cleanName,
          cleanEmail,
          submittedPassword
        );

        if (!result.success) {
          setIsSubmitting(false);
          const regErr = getRegistrationErrorMessage(result.error);
          setErrorMessage(regErr);
          return;
        }

        setEmail(result.email);
        setVerificationPending(true);
        setIsSubmitting(false);
        setSuccessMessage("Mã xác minh đã được gửi nếu dịch vụ email nhận yêu cầu. Hãy kiểm tra hộp thư và thư rác.");
        toast.success("Hãy xác minh email để kích hoạt tài khoản.", "Mã xác minh đã được gửi");
      } catch {
        setIsSubmitting(false);
        const message = "Chưa thể tạo tài khoản lúc này. Vui lòng thử lại sau.";
        setErrorMessage(message);
      }
    }, 400);
  };

  const handleVerifyEmail = async (event: React.FormEvent) => {
    event.preventDefault();
    setErrorMessage("");
    if (!/^\d{6}$/.test(verificationCode.trim())) {
      setErrorMessage("Vui lòng nhập mã xác minh gồm 6 chữ số.");
      return;
    }
    setIsSubmitting(true);
    const result = await verifyEmailCode(email, verificationCode);
    setIsSubmitting(false);
    if (!result.success) {
      const message = result.error || "Mã xác minh không đúng hoặc đã hết hạn. Vui lòng thử lại.";
      setErrorMessage(message);
      return;
    }
    try { localStorage.setItem("tltl_remembered_email", email); } catch {}
    setSuccessMessage("Email đã được xác minh. Hãy đăng nhập bằng email và mật khẩu vừa tạo.");
    toast.success("Email đã được xác minh. Hãy đăng nhập để tiếp tục.", "Xác minh thành công");
    onGoToLogin();
  };

  const handleResendVerification = async () => {
    setIsSubmitting(true);
    setErrorMessage("");
    try {
      await requestEmailVerification(email);
      setVerificationCode("");
      setSuccessMessage("Nếu email thuộc tài khoản chưa xác minh, mã mới sẽ được gửi. Mã cũ không còn hiệu lực.");
    } catch {
      setErrorMessage("Chưa gửi lại được mã xác minh. Vui lòng thử lại sau.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="split-login-viewport register-auth-viewport relative flex-col lg:flex-row">
      <CelestialAuthLeft onBack={onBack} />

      {/* CỘT PHẢI: FORM KHỞI TẠO HỒ SƠ — CHỈN CHU, SANG TRỌNG, VỪA KHÍT KHUNG HÌNH */}
      {/* CỘT PHẢI: FORM ĐĂNG KÝ KHỞI TẠO HỒ SƠ — CARD SƠN MÀI SANG TRỌNG */}
      <section
        ref={registerPanelRef}
        aria-label="Biểu mẫu đăng ký tài khoản"
        className={`split-login-right relative w-full lg:w-[40%] shrink-0 flex flex-col justify-center items-center lg:h-full px-4 sm:px-6 py-4 ${errorMessage ? "register-form-has-error" : ""}`}
      >
        {/* Topbar: Thỉnh chuông tĩnh tâm */}
        <div className="w-full max-w-[430px] flex justify-end mb-2.5 sm:mb-3 relative z-20">
          <button
            type="button"
            onClick={handleRingBell}
            className="group inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/80 dark:bg-stone-900/80 hover:bg-white dark:hover:bg-stone-850 border border-amber-600/35 hover:border-amber-500 text-amber-900 dark:text-amber-200 text-xs font-medium shadow-xs hover:shadow-md transition-all hover:scale-[1.02] cursor-pointer backdrop-blur-md"
            title="Thỉnh một tiếng chuông an định tâm hồn"
            aria-label="Thỉnh chuông tĩnh tâm"
          >
            <Bell className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400 group-hover:rotate-12 transition-transform" />
            <span>Thỉnh chuông</span>
          </button>
        </div>

        {/* THẺ BÀI KHỞI TẠO HỒ SƠ (SANCTUARY CARD) */}
        <div className="relative z-10 w-full max-w-[430px] rounded-3xl p-5 sm:p-6 bg-white/90 dark:bg-[#1a1417]/90 backdrop-blur-xl border border-amber-900/10 dark:border-amber-400/20 shadow-[0_20px_50px_-10px_rgba(45,20,10,0.1),0_0_0_1px_rgba(212,175,55,0.22)] transition-all">
          {/* 4 Góc kim chi hoa văn cổ điển (Ornamental Brass Corner Brackets) */}
          <div className="absolute top-2.5 left-2.5 w-3.5 h-3.5 border-t-2 border-l-2 border-amber-500/40 rounded-tl-sm pointer-events-none" />
          <div className="absolute top-2.5 right-2.5 w-3.5 h-3.5 border-t-2 border-r-2 border-amber-500/40 rounded-tr-sm pointer-events-none" />
          <div className="absolute bottom-2.5 left-2.5 w-3.5 h-3.5 border-b-2 border-l-2 border-amber-500/40 rounded-bl-sm pointer-events-none" />
          <div className="absolute bottom-2.5 right-2.5 w-3.5 h-3.5 border-b-2 border-r-2 border-amber-500/40 rounded-br-sm pointer-events-none" />

          {/* TIÊU ĐỀ TRANG NHÃ KÈM DẤU ẤN TRIỆN SON KHẮC GỖ */}
          <div className="split-form-header mb-3">
            <div className="split-form-title-row flex items-center gap-3">
              <div 
                className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#a62432] via-[#851924] to-[#5c1018] border border-amber-400/70 ring-2 ring-amber-400/30 shadow-[0_3px_10px_rgba(166,36,50,0.35)] flex items-center justify-center shrink-0 select-none"
                title="Triện son Tâm"
              >
                <span className="font-serif font-black text-amber-100 text-sm tracking-tight leading-none">
                  心
                </span>
              </div>
              <div>
                <h1 className="font-serif text-[1.6rem] sm:text-[1.8rem] font-bold text-ink tracking-tight leading-tight">
                  Tạo tài khoản
                </h1>
              </div>
            </div>
            <p className="text-xs sm:text-[13px] text-muted mt-1 leading-relaxed">
              Tạo tài khoản để lưu và xem lại nội dung bạn đã chọn trong Tin Lắm Tâm Linh.
            </p>
            {/* Đường chỉ hoa văn ánh kim */}
            <div className="flex items-center gap-2 mt-2">
              <span className="h-px flex-1 bg-gradient-to-r from-transparent via-amber-500/30 to-amber-500/10" />
              <span className="text-amber-600/70 dark:text-amber-400/70 text-[9px]">✤</span>
              <span className="h-px flex-1 bg-gradient-to-l from-transparent via-amber-500/30 to-amber-500/10" />
            </div>
          </div>

          {/* QUẺ CHỜ LƯU (NẾU CÓ) */}
          {pendingSignalMood && (
            <div className="mb-2.5 p-2.5 rounded-xl bg-accent-soft border border-line text-xs text-ink flex items-start gap-2 shadow-xs">
              <Sparkles className="w-3.5 h-3.5 shrink-0 mt-0.5 text-accent" />
              <span>
                Đang chờ lưu: <strong>"{pendingSignalMood}"</strong>
              </span>
            </div>
          )}

          {/* THÔNG BÁO LỖI */}
          {errorMessage && (
            <div
              role="alert"
              className="mb-2.5 max-h-24 overflow-y-auto break-words p-2.5 rounded-xl bg-danger-soft border border-danger/30 text-xs text-danger flex items-start gap-2 shadow-xs"
            >
              <span className="font-bold leading-none mt-0.5">✕</span>
              <span className="leading-relaxed flex-1">{errorMessage}</span>
            </div>
          )}

          {/* THÔNG BÁO THÀNH CÔNG */}
          {successMessage && (
            <div
              role="status"
              className="mb-2.5 p-2.5 rounded-xl bg-emerald-500/15 border border-emerald-500/35 text-xs text-emerald-800 dark:text-emerald-300 flex items-start gap-2 shadow-xs animate-fade-in"
            >
              <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600 dark:text-emerald-400 mt-0.5" />
              <span className="leading-relaxed font-medium">{successMessage}</span>
            </div>
          )}

          {/* FORM NHẬP LIỆU */}
          {verificationPending ? (
            <form onSubmit={handleVerifyEmail} className="space-y-4">
              <div className="rounded-xl border border-amber-900/15 bg-amber-50/60 p-4 text-sm text-stone-700 dark:border-amber-300/20 dark:bg-stone-900/60 dark:text-stone-200">
                Nhập mã 6 chữ số đã gửi tới <strong>{email}</strong>. Mã có hiệu lực trong 10 phút. Tài khoản chỉ đăng nhập được sau khi xác minh.
              </div>
              <label htmlFor="register-verification-code" className="block text-xs font-semibold text-ink mb-1">Mã xác minh email</label>
              <input
                id="register-verification-code"
                inputMode="numeric"
                autoComplete="one-time-code"
                maxLength={6}
                required
                disabled={isSubmitting}
                value={verificationCode}
                onChange={(event) => setVerificationCode(event.target.value.replace(/\D/g, "").slice(0, 6))}
                placeholder="Nhập mã 6 chữ số"
                className="w-full h-11 px-3.5 rounded-xl border border-stone-300/80 bg-stone-50/60 text-center text-lg tracking-[0.35em] text-ink placeholder:text-sm placeholder:tracking-normal focus:outline-none focus:ring-3 focus:ring-amber-500/20 focus:border-amber-600 disabled:opacity-60"
              />
              <button type="submit" disabled={isSubmitting} className="w-full h-11 rounded-xl bg-[#8f202b] text-white font-semibold disabled:opacity-60">
                {isSubmitting ? "Đang xác minh..." : "Xác minh email"}
              </button>
              <button type="button" onClick={() => void handleResendVerification()} disabled={isSubmitting} className="w-full text-sm font-semibold text-[#8f202b] hover:underline disabled:opacity-60">
                Gửi lại mã xác minh
              </button>
            </form>
          ) : (
          <form onSubmit={handleSubmit} className="space-y-2.5 sm:space-y-3">
            {/* Tên hiển thị */}
            <div>
              <label
                htmlFor="register-name"
                className="block text-xs font-semibold text-ink mb-1 tracking-wide"
              >
                Tên hiển thị
              </label>
              <div className="relative group">
                <User className="w-4 h-4 text-stone-400 group-focus-within:text-amber-600 dark:group-focus-within:text-amber-400 transition-colors absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  id="register-name"
                  type="text"
                  required
                  maxLength={80}
                  autoComplete="nickname"
                  disabled={isSubmitting}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Ví dụ: An, Minh..."
                  className="w-full h-10.5 pl-10 pr-3.5 rounded-xl border border-stone-300/80 dark:border-stone-700/80 bg-stone-50/60 dark:bg-stone-900/60 text-sm text-ink placeholder:text-stone-400 focus:outline-none focus:ring-3 focus:ring-amber-500/20 focus:border-amber-600 dark:focus:border-amber-400 focus:bg-white dark:focus:bg-stone-900 transition-all shadow-xs disabled:opacity-60"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="register-email"
                className="block text-xs font-semibold text-ink mb-1 tracking-wide"
              >
                Email
              </label>
              <div className="relative group">
                <Mail className="w-4 h-4 text-stone-400 group-focus-within:text-amber-600 dark:group-focus-within:text-amber-400 transition-colors absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  id="register-email"
                  type="email"
                  autoComplete="email"
                  required
                  disabled={isSubmitting}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="tenban@example.com"
                  className="w-full h-10.5 pl-10 pr-3.5 rounded-xl border border-stone-300/80 dark:border-stone-700/80 bg-stone-50/60 dark:bg-stone-900/60 text-sm text-ink placeholder:text-stone-400 focus:outline-none focus:ring-3 focus:ring-amber-500/20 focus:border-amber-600 dark:focus:border-amber-400 focus:bg-white dark:focus:bg-stone-900 transition-all shadow-xs disabled:opacity-60"
                />
              </div>
            </div>

            {/* Mật khẩu */}
            <div>
              <label
                htmlFor="register-password"
                className="block text-xs font-semibold text-ink mb-1 tracking-wide"
              >
                Mật khẩu
              </label>
              <div className="relative group">
                <Lock className="w-4 h-4 text-stone-400 group-focus-within:text-amber-600 dark:group-focus-within:text-amber-400 transition-colors absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  id="register-password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="new-password"
                  required
                  aria-describedby="register-password-help"
                  disabled={isSubmitting}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Tối thiểu 8 ký tự"
                  className="w-full h-10.5 pl-10 pr-11 rounded-xl border border-stone-300/80 dark:border-stone-700/80 bg-stone-50/60 dark:bg-stone-900/60 text-sm text-ink placeholder:text-stone-400 focus:outline-none focus:ring-3 focus:ring-amber-500/20 focus:border-amber-600 dark:focus:border-amber-400 focus:bg-white dark:focus:bg-stone-900 transition-all shadow-xs disabled:opacity-60"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
                  disabled={isSubmitting}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-amber-700 dark:hover:text-amber-400 cursor-pointer disabled:opacity-50 transition-colors p-1"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              <div id="register-password-help" className="mt-2.5 rounded-xl border border-amber-900/10 dark:border-amber-400/15 bg-amber-50/50 dark:bg-stone-900/35 px-3 py-2.5">
                <div className="flex items-center justify-between gap-3">
                  <span className="text-[11px] font-medium text-stone-600 dark:text-stone-300">Mức độ đáp ứng</span>
                  <span className={`text-[11px] font-semibold ${passwordRequirementCount === 4 ? "text-emerald-700 dark:text-emerald-400" : password.length > 0 ? "text-amber-700 dark:text-amber-300" : "text-stone-500 dark:text-stone-400"}`}>
                    {passwordStrengthLabel}
                  </span>
                </div>
                <div
                  className="mt-1.5 grid grid-cols-4 gap-1.5"
                  role="progressbar"
                  aria-label="Mức độ đáp ứng yêu cầu mật khẩu"
                  aria-valuemin={0}
                  aria-valuemax={4}
                  aria-valuenow={passwordRequirementCount}
                  aria-valuetext={`${passwordRequirementCount} trên 4 yêu cầu; ${passwordStrengthLabel}`}
                >
                  {passwordRequirements.map((item, index) => (
                    <span
                      key={item.label}
                      className={`h-1.5 rounded-full transition-colors duration-200 ${index < passwordRequirementCount ? (passwordRequirementCount === 4 ? "bg-emerald-500" : passwordRequirementCount <= 1 ? "bg-rose-500" : "bg-amber-500") : "bg-stone-200 dark:bg-stone-700"}`}
                    />
                  ))}
                </div>
                <ul className="mt-2 grid grid-cols-2 gap-x-3 gap-y-1" aria-live="polite">
                  {passwordRequirements.map((item) => (
                    <li key={item.label} className={`flex items-center gap-1.5 text-[10px] leading-4 ${item.met ? "text-emerald-700 dark:text-emerald-400" : "text-stone-500 dark:text-stone-400"}`}>
                      {item.met ? <CheckCircle2 className="h-3 w-3 shrink-0" aria-hidden="true" /> : <Circle className="h-3 w-3 shrink-0" aria-hidden="true" />}
                      <span>{item.label}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Xác nhận mật khẩu */}
            <div>
              <label
                htmlFor="register-confirm-password"
                className="block text-xs font-semibold text-ink mb-1 tracking-wide"
              >
                Xác nhận mật khẩu
              </label>
              <div className="relative group">
                <Lock className="w-4 h-4 text-stone-400 group-focus-within:text-amber-600 dark:group-focus-within:text-amber-400 transition-colors absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  id="register-confirm-password"
                  type={showConfirmPassword ? "text" : "password"}
                  autoComplete="new-password"
                  required
                  aria-describedby="register-confirm-password-help"
                  aria-invalid={confirmPasswordHasInput && !confirmPasswordMatches}
                  disabled={isSubmitting}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Nhập lại mật khẩu"
                  className="w-full h-10.5 pl-10 pr-11 rounded-xl border border-stone-300/80 dark:border-stone-700/80 bg-stone-50/60 dark:bg-stone-900/60 text-sm text-ink placeholder:text-stone-400 focus:outline-none focus:ring-3 focus:ring-amber-500/20 focus:border-amber-600 dark:focus:border-amber-400 focus:bg-white dark:focus:bg-stone-900 transition-all shadow-xs disabled:opacity-60"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  aria-label={showConfirmPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
                  disabled={isSubmitting}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-amber-700 dark:hover:text-amber-400 cursor-pointer disabled:opacity-50 transition-colors p-1"
                >
                  {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              <p
                id="register-confirm-password-help"
                className={`mt-1 min-h-4 text-[11px] leading-4 ${confirmPasswordHasInput ? (confirmPasswordMatches ? "text-emerald-700 dark:text-emerald-400" : "text-rose-600 dark:text-rose-400") : "text-stone-500 dark:text-stone-400"}`}
                aria-live="polite"
              >
                {confirmPasswordHasInput
                  ? confirmPasswordMatches
                    ? "Mật khẩu khớp."
                    : "Mật khẩu chưa khớp."
                  : "Nhập lại mật khẩu để xác nhận."}
              </p>
            </div>

            {/* Nút Đăng ký đỏ trầm son ánh kim */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="group relative w-full h-11 rounded-xl bg-gradient-to-r from-[#8f202b] via-[#a62432] to-[#781721] hover:from-[#7e1923] hover:via-[#95202c] hover:to-[#68131b] border border-amber-300/50 text-[#fffaf0] font-serif text-[15px] font-semibold tracking-wide flex items-center justify-center gap-2 transition-all shadow-[0_4px_18px_rgba(143,32,43,0.32),0_0_10px_rgba(212,175,55,0.18)] hover:shadow-[0_6px_26px_rgba(143,32,43,0.46),0_0_16px_rgba(212,175,55,0.32)] overflow-hidden cursor-pointer disabled:opacity-60 active:scale-[0.99]"
            >
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none" />

              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-amber-200" />
                  <span>Đang tạo tài khoản...</span>
                </>
              ) : (
                <>
                  <span>Tạo tài khoản</span>
                  <ArrowRight className="w-4 h-4 text-amber-200" />
                </>
              )}
            </button>
          </form>
          )}

          {/* Quay về Đăng nhập */}
          <div className="text-center text-xs text-muted mt-3 pt-2.5 border-t border-amber-900/10 dark:border-amber-400/15">
            <span>Đã có tài khoản? </span>
            <button
              type="button"
              onClick={onGoToLogin}
              disabled={isSubmitting}
              className="text-[#8f202b] dark:text-[#f18a83] font-semibold hover:underline cursor-pointer ml-1"
            >
              Đăng nhập ngay →
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
