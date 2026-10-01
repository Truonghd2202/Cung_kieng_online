import React, { useState } from "react";
import {
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  Sparkles,
  Flower2,
  ArrowLeft,
  ArrowRight,
} from "lucide-react";
import { registerAccount } from "../data/authService";

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
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    if (!name.trim()) {
      setErrorMessage("Vui lòng nhập họ và tên hoặc pháp danh của bạn.");
      return;
    }

    if (!email.trim()) {
      setErrorMessage("Vui lòng nhập địa chỉ email hợp lệ.");
      return;
    }

    if (password.length < 6) {
      setErrorMessage("Mật khẩu nên có tối thiểu 6 ký tự để bảo mật.");
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage("Mật khẩu xác nhận không khớp. Vui lòng kiểm tra lại.");
      return;
    }

    if (!agreed) {
      setErrorMessage("Vui lòng đồng ý với quy ước giữ gìn không gian an trú.");
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      const result = registerAccount(name, email, password);
      setIsSubmitting(false);

      if (!result.success) {
        setErrorMessage(result.error || "Không thể tạo tài khoản. Vui lòng thử lại.");
        return;
      }

      onSuccess(result.user.name, result.user.email);
    }, 300);
  };

  return (
    <div className="relative min-h-[calc(100vh-64px)] w-full flex items-center justify-center p-4 sm:p-8 lg:p-12 bg-canvas text-ink transition-colors duration-500 overflow-hidden">
      {/* Đường vân khói lượn sóng mờ tinh tế phía sau nền */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none stroke-[var(--ui-line)] fill-none opacity-50"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        viewBox="0 0 100 100"
        aria-hidden="true"
      >
        <path
          d="M 28 0 C 37 24, 24 44, 34 64 C 42 80, 27 90, 32 100"
          strokeWidth="0.55"
        />
        <path
          d="M 20 0 C 14 28, 30 50, 19 74 C 13 88, 24 95, 20 100"
          strokeWidth="0.4"
        />
      </svg>

      {/* THẺ ĐĂNG KÝ CHIÊM NGHIỆM ĐƯƠNG ĐẠI (ĐỒNG BỘ NGHỆ THUẬT VỚI LOGIN) */}
      <div className="relative z-10 w-full max-w-[460px] bg-surface rounded-2xl border border-line px-7 sm:px-9 py-7 sm:py-8 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.14)] dark:shadow-[0_20px_50px_-12px_rgba(0,0,0,0.7)] backdrop-blur-sm transition-colors duration-300">
        {/* 4 GÓC TRIỆN KỶ HÀ HOÀNG KIM (HOA VĂN TRUYỀN THỐNG VIỆT NAM) */}
        <span className="absolute top-2.5 left-2.5 w-3.5 h-3.5 border-t-2 border-l-2 border-[#d4af37]/65 dark:border-amber-400/60 pointer-events-none rounded-tl-[3px]" />
        <span className="absolute top-2.5 right-2.5 w-3.5 h-3.5 border-t-2 border-r-2 border-[#d4af37]/65 dark:border-amber-400/60 pointer-events-none rounded-tr-[3px]" />
        <span className="absolute bottom-2.5 left-2.5 w-3.5 h-3.5 border-b-2 border-l-2 border-[#d4af37]/65 dark:border-amber-400/60 pointer-events-none rounded-bl-[3px]" />
        <span className="absolute bottom-2.5 right-2.5 w-3.5 h-3.5 border-b-2 border-r-2 border-[#d4af37]/65 dark:border-amber-400/60 pointer-events-none rounded-br-[3px]" />

        {/* Nút quay lại (nếu có) */}
        {onBack && (
          <button
            type="button"
            onClick={onBack}
            className="text-xs text-muted hover:text-accent flex items-center gap-1.5 mb-4 cursor-pointer transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span className="font-serif">Quay lại</span>
          </button>
        )}

        {/* Tiêu đề & Ấn son Khởi Tâm */}
        <div className="flex items-center gap-3 pb-1">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#8b1e28] to-[#5b1219] flex items-center justify-center shadow-md shadow-[#8b1e28]/25 border border-amber-400/35 text-amber-200 shrink-0">
            <Flower2 className="w-4 h-4 text-amber-300" />
          </div>
          <div className="flex-1">
            <h1 className="font-serif font-bold text-xs sm:text-[13px] tracking-[0.16em] text-ink uppercase">
              KHỞI TẠO GÓC AN TRÚ
            </h1>
            <p className="font-serif italic text-[11px] text-muted tracking-wide mt-0.5">
              Ghi danh tâm thức • Gieo duyên an lành
            </p>
          </div>
        </div>

        {/* Dải phân cách viền kim với biểu tượng hoa sen kỷ hà ❖ */}
        <div className="flex items-center gap-3 my-4">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#d4af37]/45 dark:via-amber-400/35 to-transparent" />
          <span className="text-[#c5a059] dark:text-amber-400 text-[10px] select-none">❖</span>
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#d4af37]/45 dark:via-amber-400/35 to-transparent" />
        </div>

        {/* Quẻ / Tín hiệu chờ lưu */}
        {pendingSignalMood && (
          <div className="mb-4 p-2.5 rounded-xl bg-accent-soft border border-line text-xs text-ink flex items-start gap-2 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 shrink-0 mt-0.5 text-accent" />
            <span>Tín hiệu <strong>"{pendingSignalMood}"</strong> sẽ tự động được lưu vào sổ tay ngay sau khi tạo tài khoản.</span>
          </div>
        )}

        {/* Hộp thông báo lỗi */}
        {errorMessage && (
          <div
            role="alert"
            className="mb-4 p-2.5 rounded-xl bg-danger-soft border border-danger/40 text-xs text-danger flex items-start gap-2 animate-fade-in"
          >
            <span className="font-bold leading-none mt-0.5">✕</span>
            <span className="leading-relaxed flex-1">{errorMessage}</span>
          </div>
        )}

        {/* Biểu mẫu đăng ký */}
        <form onSubmit={handleSubmit} className="space-y-3.5">
          {/* Trường 1: Họ tên hoặc Pháp danh */}
          <div>
            <label
              htmlFor="register-name"
              className="block text-[11px] font-serif font-bold tracking-wider text-ink uppercase mb-1.5 flex items-center gap-1.5"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#8b1e28]" />
              HỌ VÀ TÊN HOẶC PHÁP DANH
            </label>
            <div className="relative group">
              <User className="w-4 h-4 text-subtle group-focus-within:text-accent transition-colors absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                id="register-name"
                type="text"
                required
                disabled={isSubmitting}
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ví dụ: Minh Tâm hoặc Tuệ An"
                className="w-full h-11 pl-10 pr-3.5 rounded-xl border border-line bg-surface-soft text-sm text-ink placeholder:text-subtle focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent focus:bg-surface transition-all shadow-xs disabled:opacity-60"
              />
            </div>
          </div>

          {/* Trường 2: Email */}
          <div>
            <label
              htmlFor="register-email"
              className="block text-[11px] font-serif font-bold tracking-wider text-ink uppercase mb-1.5 flex items-center gap-1.5"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#8b1e28]" />
              ĐỊA CHỈ EMAIL
            </label>
            <div className="relative group">
              <Mail className="w-4 h-4 text-subtle group-focus-within:text-accent transition-colors absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                id="register-email"
                type="email"
                required
                disabled={isSubmitting}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="tenban@domain.com"
                className="w-full h-11 pl-10 pr-3.5 rounded-xl border border-line bg-surface-soft text-sm text-ink placeholder:text-subtle focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent focus:bg-surface transition-all shadow-xs disabled:opacity-60"
              />
            </div>
          </div>

          {/* Trường 3: Mật khẩu */}
          <div>
            <label
              htmlFor="register-password"
              className="block text-[11px] font-serif font-bold tracking-wider text-ink uppercase mb-1.5 flex items-center gap-1.5"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#8b1e28]" />
              MẬT KHẨU
            </label>
            <div className="relative group">
              <Lock className="w-4 h-4 text-subtle group-focus-within:text-accent transition-colors absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                id="register-password"
                type={showPassword ? "text" : "password"}
                required
                disabled={isSubmitting}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Tối thiểu 6 ký tự"
                className="w-full h-11 pl-10 pr-10 rounded-xl border border-line bg-surface-soft text-sm text-ink placeholder:text-subtle focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent focus:bg-surface transition-all tracking-wider shadow-xs disabled:opacity-60"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
                disabled={isSubmitting}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-subtle hover:text-ink cursor-pointer disabled:opacity-50 transition-colors"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Trường 4: Xác nhận mật khẩu */}
          <div>
            <label
              htmlFor="register-confirm-password"
              className="block text-[11px] font-serif font-bold tracking-wider text-ink uppercase mb-1.5 flex items-center gap-1.5"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#8b1e28]" />
              XÁC NHẬN MẬT KHẨU
            </label>
            <div className="relative group">
              <Lock className="w-4 h-4 text-subtle group-focus-within:text-accent transition-colors absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                id="register-confirm-password"
                type={showConfirmPassword ? "text" : "password"}
                required
                disabled={isSubmitting}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Nhập lại mật khẩu trên"
                className="w-full h-11 pl-10 pr-10 rounded-xl border border-line bg-surface-soft text-sm text-ink placeholder:text-subtle focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent focus:bg-surface transition-all tracking-wider shadow-xs disabled:opacity-60"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                aria-label={showConfirmPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
                disabled={isSubmitting}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-subtle hover:text-ink cursor-pointer disabled:opacity-50 transition-colors"
              >
                {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Quy ước gìn giữ không gian an trú */}
          <div className="flex items-start gap-2 pt-1 pb-1">
            <input
              type="checkbox"
              id="agreed"
              checked={agreed}
              disabled={isSubmitting}
              onChange={(e) => setAgreed(e.target.checked)}
              className="w-4 h-4 mt-0.5 rounded border-line text-accent accent-[#8b1e28] focus:ring-accent/30 cursor-pointer"
            />
            <label
              htmlFor="agreed"
              className="text-xs text-muted cursor-pointer select-none font-medium leading-relaxed"
            >
              Tôi đồng ý với{" "}
              <span className="text-accent underline font-semibold">Điều khoản sử dụng</span> &{" "}
              <span>Quy ước gìn giữ góc an trú thanh tịnh</span>
            </label>
          </div>

          {/* Nút bấm chính Đăng ký sơn mài đỏ truyền thống */}
          <button
            type="submit"
            disabled={isSubmitting || !agreed}
            className="group relative w-full h-11 sm:h-12 rounded-xl font-serif font-semibold text-xs sm:text-[13px] tracking-widest text-[#fff8ed] uppercase flex items-center justify-center gap-2.5 overflow-hidden transition-all duration-300 cursor-pointer bg-gradient-to-r from-[#8b1e28] via-[#a02330] to-[#761821] hover:from-[#761821] hover:via-[#8b1e28] hover:to-[#63131b] active:scale-[0.985] shadow-[0_6px_20px_rgba(139,30,40,0.32)] hover:shadow-[0_8px_25px_rgba(139,30,40,0.45)] border border-amber-400/30 disabled:opacity-50"
          >
            {/* Ánh kim lướt nhẹ khi hover */}
            <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/15 to-transparent pointer-events-none" />

            <span>Đăng ký góc an trú</span>
            <ArrowRight className="w-4 h-4 text-amber-200/90" />
          </button>
        </form>

        {/* Dòng link quay về đăng nhập */}
        <div className="text-center text-xs text-muted mt-5 pt-1">
          <span>Đã có tài khoản? </span>
          <button
            type="button"
            onClick={onGoToLogin}
            disabled={isSubmitting}
            className="text-accent font-serif font-bold hover:underline cursor-pointer ml-1"
          >
            Đăng nhập ngay →
          </button>
        </div>

        {/* Châm ngôn thiền định tinh tế dưới đáy thẻ */}
        <div className="mt-4 pt-3 border-t border-line text-center">
          <p className="font-serif italic text-[11px] text-subtle tracking-wide">
            "Một niệm an lành • Muôn duyên cát tường"
          </p>
        </div>
      </div>
    </div>
  );
};
