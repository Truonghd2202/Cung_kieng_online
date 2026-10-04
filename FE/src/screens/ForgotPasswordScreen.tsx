import React, { useState } from "react";
import {
  Mail,
  ArrowLeft,
  KeyRound,
} from "lucide-react";
import { AltarVisualSection } from "../components/AltarVisualSection";

interface ForgotPasswordScreenProps {
  onBackToLogin: () => void;
}

export const ForgotPasswordScreen: React.FC<ForgotPasswordScreenProps> = ({
  onBackToLogin,
}) => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    const cleanEmail = email.trim();

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)) {
      setErrorMessage(
        "Bạn hãy nhập địa chỉ email hợp lệ."
      );
      return;
    }

    setEmail(cleanEmail);
    setSubmitted(true);
  };

  return (
    <div className="relative w-full flex flex-col lg:flex-row bg-[#f6f2ea] dark:bg-[#151214] text-ink transition-all duration-700 overflow-hidden min-h-[calc(100vh-73px)] lg:h-[calc(100dvh-73px)] lg:max-h-[calc(100dvh-73px)]">
      {/* CỘT TRÁI: BÀN THỜ GIA TIÊN SỐNG ĐỘNG (LỬA ĐÈN DẦU, BỤI VÀNG, PARALLAX 2.5D) */}
      <AltarVisualSection
        quoteText='"Vạn dặm khởi hành • Giữ tâm sáng trong"'
        className="w-full lg:w-[58%] xl:w-[62%] h-48 sm:h-60 lg:h-full shrink-0 min-h-[200px] lg:min-h-0"
      />

      {/* CỘT PHẢI: FORM KHÔI PHỤC MẬT KHẨU */}
      <section
        aria-label="Biểu mẫu khôi phục mật khẩu"
        className="relative w-full lg:w-[42%] xl:w-[38%] shrink-0 flex flex-col justify-center items-center px-6 py-6 sm:px-10 lg:px-8 xl:px-14 lg:h-full lg:max-h-full overflow-y-auto bg-[radial-gradient(ellipse_at_top_left,_rgba(217,119,6,0.05),_transparent_65%),_linear-gradient(to_bottom,_#fbf8f2,_#f5efe6)] dark:bg-[radial-gradient(ellipse_at_top_left,_rgba(180,83,9,0.06),_transparent_65%),_linear-gradient(to_bottom,_#1c1719,_#151214)]"
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
          {/* Nút quay lại */}
          <button
            type="button"
            onClick={onBackToLogin}
            className="inline-flex items-center gap-1.5 text-xs text-muted hover:text-ink transition-colors cursor-pointer mb-4"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Quay lại Đăng nhập</span>
          </button>

          {/* TIÊU ĐỀ TRANG NHÃ KÈM DẤU ẤN TRIỆN SON KHẮC GỖ */}
          <div className="mb-5">
            <div className="flex items-center gap-2.5">
              <div 
                className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#8b1e28] to-[#68131b] border border-amber-400/50 flex items-center justify-center shadow-[0_2px_10px_rgba(139,30,40,0.35)] shrink-0 select-none"
                title="Triện son Định"
              >
                <span className="font-serif font-black text-amber-200 text-xs tracking-tighter leading-none">
                  定
                </span>
              </div>
              <h1 className="font-serif text-2xl sm:text-[1.75rem] font-bold text-ink tracking-tight">
                Khôi phục hồ sơ — bản mẫu
              </h1>
            </div>
            <p className="mt-1 text-xs leading-relaxed text-muted sm:text-sm">
              Màn này minh họa bước khôi phục.
              Bản thử nghiệm chưa gửi email hoặc đặt lại mật khẩu.
            </p>
          </div>

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

          {submitted ? (
            /* TRẠNG THÁI GỬI THÀNH CÔNG */
            <div className="space-y-4">
              <div
                role="status"
                aria-live="polite"
                className="rounded-xl border border-line bg-accent-soft p-4"
              >
                <p className="mb-2 text-sm font-semibold text-accent">
                  Đã xem bước minh họa
                </p>

                <p className="text-sm leading-relaxed text-muted">
                  Email bạn vừa nhập:
                </p>

                <p className="my-2 break-all text-sm font-medium text-ink">
                  {email}
                </p>

                <p className="text-sm leading-relaxed text-muted">
                  Chưa có email hoặc mã khôi phục được gửi.
                  Bạn có thể quay lại để tiếp tục dùng hồ sơ mẫu.
                </p>
              </div>

              <button
                type="button"
                onClick={onBackToLogin}
                className="w-full h-11 rounded-xl bg-gradient-to-r from-[#8b1e28] via-[#9e222d] to-[#781820] hover:from-[#781820] hover:via-[#8b1e28] hover:to-[#63131b] border border-amber-400/35 text-[#fff8ed] font-medium text-sm flex items-center justify-center gap-2 transition-all shadow-[0_4px_18px_rgba(139,30,40,0.28)] hover:shadow-[0_6px_26px_rgba(139,30,40,0.42)] cursor-pointer active:scale-[0.99]"
              >
                <KeyRound className="w-4 h-4 text-amber-200" />
                <span>Trở lại Đăng nhập ngay</span>
              </button>
            </div>
          ) : (
            /* BIỂU MẪU NHẬP EMAIL */
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="recovery-email"
                  className="block text-xs font-semibold text-ink mb-1.5 tracking-wide"
                >
                  Địa chỉ Email tài khoản
                </label>
                <div className="relative group">
                  <Mail className="w-4 h-4 text-subtle group-focus-within:text-amber-600 dark:group-focus-within:text-amber-400 transition-colors absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    id="recovery-email"
                    type="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="tenban@domain.com"
                    className="w-full h-11 pl-10 pr-3.5 rounded-xl border border-line bg-surface text-sm text-ink placeholder:text-subtle focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-600/70 dark:focus:border-amber-500 transition-all shadow-xs"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="group relative w-full h-11 rounded-xl bg-gradient-to-r from-[#8b1e28] via-[#9e222d] to-[#781820] hover:from-[#781820] hover:via-[#8b1e28] hover:to-[#63131b] border border-amber-400/35 text-[#fff8ed] font-medium text-sm flex items-center justify-center gap-2 transition-all shadow-[0_4px_18px_rgba(139,30,40,0.28)] hover:shadow-[0_6px_26px_rgba(139,30,40,0.42)] overflow-hidden cursor-pointer active:scale-[0.99]"
              >
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none" />
                <span>Xem bước minh họa</span>
              </button>
            </form>
          )}

          {/* Dòng chân trang */}
          <div className="text-center text-xs text-muted mt-5 pt-3 border-t border-line">
            <span>Nhớ lại mật khẩu? </span>
            <button
              type="button"
              onClick={onBackToLogin}
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
