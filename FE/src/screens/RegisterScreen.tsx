import React, { useEffect, useRef, useState } from "react";
import {
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowLeft,
  ArrowRight,
  Loader2,
  Sparkles,
  CheckCircle2,
} from "lucide-react";
import { registerAccount } from "../data/authService";
import { AltarVisualSection } from "../components/AltarVisualSection";

interface RegisterScreenProps {
  onBack?: () => void;
  onSuccess: (name?: string, email?: string) => void;
  onGoToLogin: () => void;
  pendingSignalMood?: string;
}

export const RegisterScreen: React.FC<RegisterScreenProps> = ({
  onBack,
  onSuccess,
  onGoToLogin,
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
      setErrorMessage("Vui lòng nhập địa chỉ email hợp lệ.");
      return;
    }

    if (
      submittedPassword.length < 8 ||
      !/[A-Z]/.test(submittedPassword) ||
      !/[a-z]/.test(submittedPassword) ||
      !/[0-9]/.test(submittedPassword)
    ) {
      setErrorMessage("Mật khẩu cần ít nhất 8 ký tự, gồm chữ hoa, chữ thường và chữ số.");
      return;
    }

    if (submittedPassword !== confirmPassword) {
      setErrorMessage(
        "Mật khẩu xác nhận không khớp. Vui lòng kiểm tra lại."
      );
      return;
    }

    if (!agreed) {
      setErrorMessage(
        "Vui lòng đồng ý với quy ước gìn giữ không gian an trú."
      );
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
          setErrorMessage(result.error || "Không thể tạo tài khoản. Vui lòng thử lại.");
          return;
        }

        try {
          localStorage.setItem("tltl_remembered_email", cleanEmail);
        } catch {
          // Việc ghi nhớ email không quyết định kết quả đăng ký.
        }

        setSuccessMessage("Tạo tài khoản thành công! Đang mở không gian của bạn...");

        redirectTimerRef.current = setTimeout(() => {
          redirectTimerRef.current = null;
          onSuccess(result.user.name, result.user.email);
        }, 1000);
      } catch {
        setIsSubmitting(false);
        setErrorMessage("Không thể tạo tài khoản. Vui lòng thử lại.");
      }
    }, 400);
  };

  return (
    <div className="relative w-full flex flex-col lg:flex-row bg-[#f6f2ea] dark:bg-[#151214] text-ink transition-all duration-700 overflow-hidden min-h-[calc(100vh-73px)] lg:h-[calc(100dvh-73px)] lg:max-h-[calc(100dvh-73px)]">
      {/* CỘT TRÁI: KHÔNG GIAN BÀN THỜ GIA TIÊN SỐNG ĐỘNG (LỬA ĐÈN DẦU, BỤI VÀNG, PARALLAX 2.5D) */}
      <AltarVisualSection
        quoteText='"Khởi tâm an lạc • Kết duyên thiện lành"'
        className="w-full lg:w-[56%] xl:w-[60%] h-44 sm:h-56 lg:h-full shrink-0 min-h-[180px] lg:min-h-0"
      />

      {/* CỘT PHẢI: FORM KHỞI TẠO HỒ SƠ — CHỈN CHU, SANG TRỌNG, VỪA KHÍT KHUNG HÌNH */}
      <section
        aria-label="Biểu mẫu đăng ký tài khoản"
        className="relative w-full lg:w-[44%] xl:w-[40%] shrink-0 flex flex-col justify-center items-center px-6 py-5 sm:px-10 lg:px-8 xl:px-12 lg:h-full lg:max-h-full overflow-y-auto bg-[radial-gradient(ellipse_at_top_left,_rgba(217,119,6,0.05),_transparent_65%),_linear-gradient(to_bottom,_#fbf8f2,_#f5efe6)] dark:bg-[radial-gradient(ellipse_at_top_left,_rgba(180,83,9,0.06),_transparent_65%),_linear-gradient(to_bottom,_#1c1719,_#151214)]"
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
          {onBack && (
            <button
              type="button"
              onClick={onBack}
              className="inline-flex items-center gap-1.5 text-xs text-muted hover:text-ink transition-colors cursor-pointer mb-3"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Quay lại</span>
            </button>
          )}

          {/* TIÊU ĐỀ TRANG NHÃ KÈM DẤU ẤN TRIỆN SON KHẮC GỖ */}
          <div className="mb-3.5">
            <div className="flex items-center gap-2.5">
              <div 
                className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#8b1e28] to-[#68131b] border border-amber-400/50 flex items-center justify-center shadow-[0_2px_10px_rgba(139,30,40,0.35)] shrink-0 select-none"
                title="Triện son Tâm"
              >
                <span className="font-serif font-black text-amber-200 text-xs tracking-tighter leading-none">
                  心
                </span>
              </div>
              <h1 className="font-serif text-2xl sm:text-[1.7rem] font-bold text-ink tracking-tight">
                Khởi Tạo Hồ Sơ
              </h1>
            </div>
            <p className="text-xs sm:text-sm text-muted mt-1 leading-relaxed">
              Ghi danh tâm thức để lưu giữ quẻ xăm và hành trình tĩnh tại.
            </p>
          </div>

          {/* QUẺ CHỜ LƯU (NẾU CÓ) */}
          {pendingSignalMood && (
            <div className="mb-3 p-2.5 rounded-xl bg-accent-soft border border-line text-xs text-ink flex items-start gap-2 shadow-xs">
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
              className="mb-3 p-2.5 rounded-xl bg-danger-soft border border-danger/30 text-xs text-danger flex items-start gap-2"
            >
              <span className="font-bold leading-none mt-0.5">✕</span>
              <span className="leading-relaxed flex-1">{errorMessage}</span>
            </div>
          )}

          {/* THÔNG BÁO THÀNH CÔNG */}
          {successMessage && (
            <div
              role="status"
              className="mb-3 p-3 rounded-xl bg-emerald-500/15 border border-emerald-500/35 text-xs text-emerald-800 dark:text-emerald-300 flex items-start gap-2 shadow-xs animate-fade-in"
            >
              <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600 dark:text-emerald-400 mt-0.5" />
              <span className="leading-relaxed font-medium">{successMessage}</span>
            </div>
          )}

          <p className="mb-3 rounded-xl border border-line bg-accent-soft px-3 py-2 text-xs leading-relaxed text-ink">
            Tài khoản được tạo và xác thực an toàn qua máy chủ.
          </p>

          {/* FORM NHẬP LIỆU */}
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
                <User className="w-4 h-4 text-subtle group-focus-within:text-amber-600 dark:group-focus-within:text-amber-400 transition-colors absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  id="register-name"
                  type="text"
                  required
                  maxLength={80}
                  autoComplete="nickname"
                  disabled={isSubmitting}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Bạn muốn được gọi là gì?"
                  className="w-full h-10.5 pl-10 pr-3.5 rounded-xl border border-line bg-surface text-sm text-ink placeholder:text-subtle focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-600/70 dark:focus:border-amber-500 transition-all shadow-xs disabled:opacity-60"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="register-email"
                className="block text-xs font-semibold text-ink mb-1 tracking-wide"
              >
                Địa chỉ Email
              </label>
              <div className="relative group">
                <Mail className="w-4 h-4 text-subtle group-focus-within:text-amber-600 dark:group-focus-within:text-amber-400 transition-colors absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  id="register-email"
                  type="email"
                  autoComplete="email"
                  required
                  disabled={isSubmitting}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="tenban@domain.com"
                  className="w-full h-10.5 pl-10 pr-3.5 rounded-xl border border-line bg-surface text-sm text-ink placeholder:text-subtle focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-600/70 dark:focus:border-amber-500 transition-all shadow-xs disabled:opacity-60"
                />
              </div>
            </div>

            {/* Mật khẩu */}
            <div>
              <label
                htmlFor="register-password"
                className="block text-xs font-semibold text-ink mb-1 tracking-wide"
              >
                Mật khẩu mẫu
              </label>
              <div className="relative group">
                <Lock className="w-4 h-4 text-subtle group-focus-within:text-amber-600 dark:group-focus-within:text-amber-400 transition-colors absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  id="register-password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="new-password"
                  required
                  disabled={isSubmitting}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Tối thiểu 6 ký tự"
                  className="w-full h-10.5 pl-10 pr-11 rounded-xl border border-line bg-surface text-sm text-ink placeholder:text-subtle focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-600/70 dark:focus:border-amber-500 transition-all shadow-xs disabled:opacity-60"
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

            {/* Xác nhận mật khẩu */}
            <div>
              <label
                htmlFor="register-confirm-password"
                className="block text-xs font-semibold text-ink mb-1 tracking-wide"
              >
                Nhập lại mật khẩu mẫu
              </label>
              <div className="relative group">
                <Lock className="w-4 h-4 text-subtle group-focus-within:text-amber-600 dark:group-focus-within:text-amber-400 transition-colors absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  id="register-confirm-password"
                  type={showConfirmPassword ? "text" : "password"}
                  autoComplete="new-password"
                  required
                  disabled={isSubmitting}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Nhập lại mật khẩu"
                  className="w-full h-10.5 pl-10 pr-11 rounded-xl border border-line bg-surface text-sm text-ink placeholder:text-subtle focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-600/70 dark:focus:border-amber-500 transition-all shadow-xs disabled:opacity-60"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  aria-label={showConfirmPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
                  disabled={isSubmitting}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-subtle hover:text-ink cursor-pointer disabled:opacity-50 transition-colors p-1"
                >
                  {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Đồng ý quy ước an trú */}
            <div className="flex items-start gap-2 pt-0.5 pb-0.5">
              <input
                type="checkbox"
                id="agreed"
                checked={agreed}
                disabled={isSubmitting}
                onChange={(e) => setAgreed(e.target.checked)}
                className="w-4 h-4 mt-0.5 rounded border-line text-accent accent-[#8b1e28] focus:ring-amber-500/30 cursor-pointer"
              />
              <label
                htmlFor="agreed"
                className="text-xs text-muted cursor-pointer select-none font-medium leading-relaxed"
              >
                Đồng ý quy ước gìn giữ không gian an trú thanh tịnh
              </label>
            </div>

            {/* Nút Đăng ký đỏ trầm son ánh kim */}
            <button
              type="submit"
              disabled={isSubmitting || !agreed}
              className="group relative w-full h-11 rounded-xl bg-gradient-to-r from-[#8b1e28] via-[#9e222d] to-[#781820] hover:from-[#781820] hover:via-[#8b1e28] hover:to-[#63131b] border border-amber-400/35 text-[#fff8ed] font-medium text-sm flex items-center justify-center gap-2 transition-all shadow-[0_4px_18px_rgba(139,30,40,0.28)] hover:shadow-[0_6px_26px_rgba(139,30,40,0.42)] overflow-hidden cursor-pointer disabled:opacity-60 active:scale-[0.99]"
            >
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none" />

              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-amber-200" />
                  <span>Đang khởi tạo...</span>
                </>
              ) : (
                <>
                  <span>Tạo hồ sơ an trú</span>
                  <ArrowRight className="w-4 h-4 text-amber-200" />
                </>
              )}
            </button>
          </form>

          {/* Quay về Đăng nhập */}
          <div className="text-center text-xs text-muted mt-3.5 pt-2.5 border-t border-line">
            <span>Đã có tài khoản? </span>
            <button
              type="button"
              onClick={onGoToLogin}
              disabled={isSubmitting}
              className="text-accent font-medium hover:underline cursor-pointer ml-1"
            >
              Đăng nhập ngay →
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
