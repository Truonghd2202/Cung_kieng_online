import React, { useState } from "react";
import { Mail, Clock, ArrowLeft, CheckCircle2, KeyRound } from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { Badge } from "@/src/components/ui/badge";
import { Card } from "@/src/components/ui/card";

interface ForgotPasswordScreenProps {
  onBackToLogin: () => void;
  onSuccessSubmit?: (email: string) => void;
}

export const ForgotPasswordScreen: React.FC<ForgotPasswordScreenProps> = ({
  onBackToLogin,
  onSuccessSubmit,
}) => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
    if (onSuccessSubmit) {
      onSuccessSubmit(email);
    }
  };

  return (
    <div className="screen-shell screen-shell--auth">
      {/* Top watermark banner */}
      <div className="flex flex-wrap justify-center items-center gap-3 mb-6 text-xs uppercase tracking-[0.2em] text-muted font-medium select-none">
        <span className="w-12 h-px bg-surface-soft"></span>
        <span className="flex items-center gap-1.5 text-accent">
          <span className="text-sm">✤</span>
          <span>Hồn Việt Đương Đại • Tĩnh Tâm</span>
        </span>
        <span className="w-12 h-px bg-surface-soft"></span>
      </div>

      {/* Main Recovery Card */}
      <Card className="w-full max-w-lg bg-surface border border-line rounded-card p-6 sm:p-10 shadow-card relative overflow-hidden">
        {/* Subtle decorative top border accent */}
        <div className="absolute top-0 inset-x-0 h-1.5 bg-action" />
        
        {/* Top subtle decorative bloom background */}

        <div className="relative">
          {/* Badge at top of card */}
          <div className="mb-4">
            <Badge
              variant="terracotta"
              className="gap-1.5 px-3 py-1 text-xs font-semibold tracking-wider uppercase bg-surface text-accent border-line"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-action"></span>
              <span>Khôi phục quyền truy cập</span>
            </Badge>
          </div>

          {/* Heading */}
          <h1 className="page-title mb-3">
            Quên mật khẩu?
          </h1>

          <p className="text-sm sm:text-base text-ink leading-relaxed mb-6">
            Nhập địa chỉ email của bạn. Chức năng khôi phục mật khẩu sẽ có khi kết nối tài khoản và hoàn thiện máy chủ Backend.
          </p>

          {submitted ? (
            <div className="space-y-6">
              <div className="p-5 rounded-panel bg-surface border border-line flex items-start gap-3.5">
                <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                <div className="text-sm leading-relaxed">
                  <h4 className="font-semibold text-ink mb-1">
                    Thông báo bản demo
                  </h4>
                  <p className="text-ink">
                    Chức năng khôi phục sẽ có khi kết nối tài khoản. Hiện tại bản demo lưu trữ trên trình duyệt và không gửi email thật. Bạn có thể quay lại đăng nhập với tài khoản demo.
                  </p>
                </div>
              </div>

              <Button
                variant="default"
                size="lg"
                onClick={onBackToLogin}
                className="w-full font-semibold shadow-xs"
              >
                <span>Trở về Đăng nhập demo</span>
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Email Input Field */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label htmlFor="recovery-email" className="text-sm font-bold text-ink">
                    Địa chỉ email của bạn
                  </label>
                  <span className="text-xs text-muted">
                    Định dạng email chuẩn
                  </span>
                </div>

                <div className="relative">
                  <input
                    id="recovery-email"
                    autoComplete="email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="tenban@mienanlac.vn"
                    className="w-full min-h-12 pl-10 pr-4 py-3 rounded-control bg-surface border border-line text-base text-ink placeholder:text-subtle focus:outline-none focus:ring-2 focus:ring-accent"
                  />
                  <Mail className="w-4 h-4 text-muted absolute left-3.5 top-3.5" />
                </div>
              </div>

              {/* Submit Button */}
              <Button
                variant="default"
                size="lg"
                type="submit"
                className="w-full font-semibold shadow-xs py-3 text-sm sm:text-base flex items-center justify-center gap-2"
              >
                <span>Yêu cầu khôi phục</span>
                <span className="text-xs">▷</span>
              </Button>

              {/* Back to Login Link */}
              <div className="text-center pt-2">
                <button
                  type="button"
                  onClick={onBackToLogin}
                  className="text-sm font-semibold text-muted hover:text-accent inline-flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Quay lại Đăng nhập</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </Card>

      {/* Bottom note outside card */}
      <div className="mt-6 text-center text-xs text-muted max-w-sm leading-relaxed">
        Nội dung bản demo được lưu trên trình duyệt này.
      </div>
    </div>
  );
};
