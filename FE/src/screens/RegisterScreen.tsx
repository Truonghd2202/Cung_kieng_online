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
  Bell,
} from "lucide-react";
import { registerAccount } from "../data/authService";
import { CelestialAuthLeft } from "../components/CelestialAuthLeft";
import "../styles/LoginScreen.css";
import { toast } from "../components/ui/Toast";

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
    toast.warning(msgEmail);
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
    toast.warning(msgPass);
      return;
    }

    if (submittedPassword !== confirmPassword) {
      const msgConfirm = "Mật khẩu xác nhận không khớp. Vui lòng kiểm tra lại.";
    setErrorMessage(msgConfirm);
    toast.warning(msgConfirm);
      return;
    }

    if (!agreed) {
      const msgAgreed = "Vui lòng đồng ý với quy ước gìn giữ không gian an trú.";
    setErrorMessage(msgAgreed);
    toast.warning(msgAgreed);
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
          const regErr = result.error || "Không thể tạo tài khoản. Vui lòng thử lại.";
          setErrorMessage(regErr);
          toast.error(regErr, "Khởi tạo thất bại");
          return;
        }

        try {
          localStorage.setItem("tltl_remembered_email", cleanEmail);
        } catch {
          // Việc ghi nhớ email không quyết định kết quả đăng ký.
        }

        setSuccessMessage("Tạo tài khoản thành công! Đang mở không gian của bạn...");
        toast.success("Khởi tạo hồ sơ thành công! Chúc bạn vạn sự cát lành.", "Hoan hỷ đón chào");

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
    <div className="split-login-viewport register-auth-viewport relative flex-col lg:flex-row">
      <CelestialAuthLeft onBack={onBack} />

      {/* CỘT PHẢI: FORM KHỞI TẠO HỒ SƠ — CHỈN CHU, SANG TRỌNG, VỪA KHÍT KHUNG HÌNH */}
      {/* CỘT PHẢI: FORM ĐĂNG KÝ KHỞI TẠO HỒ SƠ — CARD SƠN MÀI SANG TRỌNG */}
      <section
        aria-label="Biểu mẫu đăng ký tài khoản"
        className="split-login-right relative w-full lg:w-[40%] shrink-0 flex flex-col justify-center items-center lg:h-full px-4 sm:px-6 py-4"
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
                  Khởi Tạo Hồ Sơ
                </h1>
              </div>
            </div>
            <p className="text-xs sm:text-[13px] text-muted mt-1 leading-relaxed">
              Ghi danh tâm thức để lưu giữ quẻ xăm và hành trình tĩnh tại.
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
              className="mb-2.5 p-2.5 rounded-xl bg-danger-soft border border-danger/30 text-xs text-danger flex items-start gap-2 shadow-xs"
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
          <form onSubmit={handleSubmit} className="space-y-2.5 sm:space-y-3">
            {/* Tên hiển thị */}
            <div>
              <label
                htmlFor="register-name"
                className="block text-xs font-semibold text-ink mb-1 tracking-wide"
              >
                Danh xưng / Pháp danh
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
                  placeholder="Ví dụ: Tuệ An, Minh Tâm..."
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
                Địa chỉ Email
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
                  placeholder="email.cua.ban@domain.com"
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
                  disabled={isSubmitting}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="•••••••• (Từ 6 ký tự trở lên)"
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
                  disabled={isSubmitting}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="•••••••• (Nhập lại mật khẩu trên)"
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
            </div>

            {/* Đồng ý quy ước an trú */}
            <div className="flex items-start gap-2 pt-0.5 pb-0.5">
              <input
                type="checkbox"
                id="agreed"
                checked={agreed}
                disabled={isSubmitting}
                onChange={(e) => setAgreed(e.target.checked)}
                className="w-4 h-4 mt-0.5 rounded border-stone-300 text-accent accent-[#8f202b] focus:ring-amber-500/30 cursor-pointer"
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
              className="group relative w-full h-11 rounded-xl bg-gradient-to-r from-[#8f202b] via-[#a62432] to-[#781721] hover:from-[#7e1923] hover:via-[#95202c] hover:to-[#68131b] border border-amber-300/50 text-[#fffaf0] font-serif text-[15px] font-semibold tracking-wide flex items-center justify-center gap-2 transition-all shadow-[0_4px_18px_rgba(143,32,43,0.32),0_0_10px_rgba(212,175,55,0.18)] hover:shadow-[0_6px_26px_rgba(143,32,43,0.46),0_0_16px_rgba(212,175,55,0.32)] overflow-hidden cursor-pointer disabled:opacity-60 active:scale-[0.99]"
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
