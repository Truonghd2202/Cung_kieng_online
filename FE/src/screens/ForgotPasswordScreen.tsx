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
    <div className="w-full min-h-screen bg-[#fcf8f2] text-[#2e2624] font-['Be_Vietnam_Pro',sans-serif] flex flex-col items-center justify-center p-4 sm:p-6">
      {/* Top watermark banner */}
      <div className="flex items-center gap-3 mb-6 text-xs uppercase tracking-[0.2em] text-[#938279] font-medium select-none">
        <span className="w-12 h-px bg-[#dfcebe]"></span>
        <span className="flex items-center gap-1.5 text-[#9e3b2e]">
          <span className="text-sm">✤</span>
          <span>Hồn Việt Đương Đại • Tĩnh Tâm</span>
        </span>
        <span className="w-12 h-px bg-[#dfcebe]"></span>
      </div>

      {/* Main Recovery Card */}
      <Card className="w-full max-w-lg bg-white border border-[#eddcd0] rounded-3xl p-6 sm:p-10 shadow-lg relative overflow-hidden">
        {/* Subtle decorative top border accent */}
        <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-[#9e3b2e] via-[#be8e5a] to-[#9e3b2e]" />
        
        {/* Top subtle decorative bloom background */}
        <div className="absolute -top-12 -right-12 w-40 h-40 rounded-full bg-[#fbece1]/60 pointer-events-none" />

        <div className="relative">
          {/* Badge at top of card */}
          <div className="mb-4">
            <Badge
              variant="terracotta"
              className="gap-1.5 px-3 py-1 text-xs font-semibold tracking-wider uppercase bg-[#faece1] text-[#9e3b2e] border-[#eedcd0]"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#9e3b2e]"></span>
              <span>Khôi phục quyền truy cập</span>
            </Badge>
          </div>

          {/* Heading */}
          <h1 className="font-['Noto_Serif',serif] font-bold text-2xl sm:text-3xl text-[#2a211e] leading-snug mb-3">
            Quên mật khẩu?
          </h1>

          <p className="text-sm sm:text-base text-[#705e57] leading-relaxed mb-6">
            Nhập địa chỉ email đã đăng ký. Chúng tôi sẽ gửi liên kết an toàn để
            bạn thiết lập lại mật khẩu mới.
          </p>

          {submitted ? (
            <div className="space-y-6">
              <div className="p-5 rounded-2xl bg-[#fbf5ee] border border-[#ecd9cb] flex items-start gap-3.5">
                <CheckCircle2 className="w-5 h-5 text-[#9e3b2e] flex-shrink-0 mt-0.5" />
                <div className="text-sm leading-relaxed">
                  <h4 className="font-semibold text-[#2a2220] mb-1">
                    Bản xem trước tính năng
                  </h4>
                  <p className="text-[#6d5b54]">
                    Bản xem trước: Chức năng gửi email sẽ hoạt động sau khi kết nối hệ thống. Bạn có thể quay lại đăng nhập với tài khoản trải nghiệm.
                  </p>
                </div>
              </div>

              <Button
                variant="default"
                size="lg"
                onClick={onBackToLogin}
                className="w-full font-semibold shadow-xs"
              >
                <span>Trở về màn Đăng nhập</span>
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Email Input Field */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-sm font-bold text-[#352926]">
                    Địa chỉ email của bạn
                  </label>
                  <span className="text-xs text-[#95837b]">
                    Định dạng email chuẩn
                  </span>
                </div>

                <div className="relative">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="tenban@mienanlac.vn"
                    className="w-full pl-10 pr-4 py-3 rounded-2xl bg-[#faf3ec]/70 border border-[#eddcd0] text-sm sm:text-base text-[#2e2624] placeholder-[#a6968e] focus:outline-none focus:ring-1 focus:ring-[#9e3b2e]"
                  />
                  <Mail className="w-4 h-4 text-[#9d8a82] absolute left-3.5 top-3.5" />
                </div>
              </div>

              {/* Preview Notice Box */}
              <div className="p-4 rounded-2xl bg-[#fcf5ed] border border-[#f0dfd1] flex items-center gap-3 text-sm text-[#715f57] leading-relaxed">
                <Clock className="w-4 h-4 text-[#9e3b2e] flex-shrink-0" />
                <span>
                  <strong>Bản xem trước:</strong> Chức năng gửi email sẽ hoạt động sau khi kết nối hệ thống.
                </span>
              </div>

              {/* Submit Button */}
              <Button
                variant="default"
                size="lg"
                type="submit"
                className="w-full font-semibold shadow-xs py-3 text-sm sm:text-base flex items-center justify-center gap-2"
              >
                <span>Gửi liên kết khôi phục</span>
                <span className="text-xs">▷</span>
              </Button>

              {/* Back to Login Link */}
              <div className="text-center pt-2">
                <button
                  type="button"
                  onClick={onBackToLogin}
                  className="text-sm font-semibold text-[#8b7972] hover:text-[#9e3b2e] inline-flex items-center gap-1.5 transition-colors cursor-pointer"
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
      <div className="mt-6 text-center text-xs text-[#95837b] max-w-sm leading-relaxed">
        Bản xem trước: Chức năng gửi email khôi phục sẽ hoạt động sau khi kết nối hệ thống.
      </div>
    </div>
  );
};
