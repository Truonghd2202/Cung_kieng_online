import React, { useState } from "react";
import {
  Smile,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  Sparkles,
  Flower2,
  ArrowLeft,
} from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { Badge } from "@/src/components/ui/badge";
import { Card } from "@/src/components/ui/card";

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
  const [showPassword, setShowPassword] = useState(false);
  const [agreed, setAgreed] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreed) return;
    onSuccess(name || "Lữ khách An Nhiên", email || "annhien@tinlam.vn");
  };

  return (
    <div className="w-full min-h-screen bg-[#f7f2ea] text-[#2e2624] font-['Be_Vietnam_Pro',sans-serif] flex flex-col items-center justify-center p-4 sm:p-6">
      <Card className="w-full max-w-4xl bg-white border border-[#eddcd0] rounded-3xl shadow-lg overflow-hidden grid grid-cols-1 md:grid-cols-12">
        {/* Left Column: Peach Parchment Artistic Panel */}
        <div className="md:col-span-5 bg-[#fbf2e9] p-8 sm:p-10 border-b md:border-b-0 md:border-r border-[#ecdcd0] flex flex-col justify-between relative overflow-hidden">
          {/* Subtle background texture pattern */}
          <div className="absolute inset-0 bg-[radial-gradient(#ebd6c3_1px,transparent_1px)] [background-size:16px_16px] opacity-40 pointer-events-none" />

          {/* Top tag */}
          <div className="relative text-xs font-bold uppercase tracking-wider text-[#9e3b2e] flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#9e3b2e]"></span>
            <span>Sổ tay tâm thức • Khởi tâm</span>
          </div>

          {/* Center lotus emblem & quotation */}
          <div className="relative my-8 text-center">
            {/* Medallion */}
            <div className="w-24 h-24 mx-auto mb-6 rounded-full border border-dashed border-[#dfc5af] p-1.5 flex items-center justify-center">
              <div className="w-full h-full rounded-full bg-[#f6e6d8] flex items-center justify-center text-[#9e3b2e] shadow-2xs">
                <Flower2 className="w-10 h-10 text-[#9e3b2e]" />
              </div>
            </div>

            <h3 className="font-['Noto_Serif',serif] font-bold text-2xl text-[#2b211f] mb-3">
              Thư thái gieo hạt
            </h3>

            <p className="font-['Noto_Serif',serif] italic text-xs sm:text-sm text-[#6f5e57] leading-relaxed max-w-xs mx-auto">
              “Lòng tĩnh lặng như mặt hồ soi bóng mây trời. Mỗi dòng tự sự là một
              đóa sen an nhiên giữa dòng đời hối hả.”
            </p>
          </div>

          {/* Bottom footnote */}
          <div className="relative text-xs text-[#938279] text-center font-medium">
            Kỳ An Nhiên &nbsp;•&nbsp; Tháng Giêng Giáp Thìn
          </div>
        </div>

        {/* Right Column: Register Form */}
        <div className="md:col-span-7 p-8 sm:p-10 bg-[#fffdfa] flex flex-col justify-between">
          <div>
            {onBack && (
              <button
                type="button"
                onClick={onBack}
                className="text-xs text-[#887870] hover:text-[#9e3b2e] flex items-center gap-1 mb-4 cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Quay lại</span>
              </button>
            )}

            {/* Pending Signal Notice */}
            {pendingSignalMood && (
              <div className="mb-5 p-3.5 rounded-2xl bg-[#faede2] border border-[#ecd2bf] text-xs text-[#823326] flex items-start gap-2.5 shadow-2xs">
                <Sparkles className="w-4 h-4 text-[#9e3b2e] flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="font-semibold">Tín hiệu đang chờ lưu:</strong> Quẻ "{pendingSignalMood}" sẽ tự động được lưu vào Góc của bạn ngay khi tạo tài khoản.
                </div>
              </div>
            )}

            {/* Demo Notice Banner */}
            <div className="mb-5 p-2.5 rounded-xl bg-[#fbf5ee] border border-[#eddcd0] flex items-center gap-2 text-xs text-[#786962]">
              <Badge variant="secondary" className="text-xs py-0 px-2 uppercase font-bold text-[#9e3b2e]">
                Demo
              </Badge>
              <span>Chưa có Backend • Đăng ký mô phỏng để trải nghiệm lưu trữ.</span>
            </div>

            <Badge
              variant="secondary"
              className="gap-1.5 px-3 py-1 mb-2 text-xs font-medium"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Tạo không gian tĩnh tại</span>
            </Badge>

            <h2 className="font-['Noto_Serif',serif] font-bold text-2xl sm:text-[28px] text-[#2a211e] leading-snug mb-1.5">
              Khởi tạo góc an trú của bạn
            </h2>
            <p className="text-sm text-[#77665f] leading-relaxed mb-6">
              Lưu giữ những tín hiệu dân gian đã thấu cảm và bồi đắp thói quen
              lắng lòng mỗi ngày.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Field 1: Name */}
              <div>
                <label className="block text-sm font-semibold text-[#4e403a] mb-1.5">
                  Họ và tên hoặc Pháp danh / Biệt hiệu thân mật
                </label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Ví dụ: An Nhiên"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#faf3ec]/70 border border-[#eddcd0] text-sm text-[#2e2624] placeholder-[#a6968e] focus:outline-none focus:ring-1 focus:ring-[#9e3b2e]"
                  />
                  <Smile className="w-4 h-4 text-[#9d8a82] absolute left-3.5 top-3" />
                </div>
              </div>

              {/* Field 2: Email */}
              <div>
                <label className="block text-sm font-semibold text-[#4e403a] mb-1.5">
                  Địa chỉ Email
                </label>
                <div className="relative">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="ban@email.com"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#faf3ec]/70 border border-[#eddcd0] text-sm text-[#2e2624] placeholder-[#a6968e] focus:outline-none focus:ring-1 focus:ring-[#9e3b2e]"
                  />
                  <Mail className="w-4 h-4 text-[#9d8a82] absolute left-3.5 top-3" />
                </div>
              </div>

              {/* Field 3: Password */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-sm font-semibold text-[#4e403a]">
                    Mật khẩu
                  </label>
                  <span className="text-xs text-[#9a8982]">
                    Tối thiểu 8 ký tự an toàn
                  </span>
                </div>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-[#faf3ec]/70 border border-[#eddcd0] text-sm text-[#2e2624] placeholder-[#a6968e] focus:outline-none focus:ring-1 focus:ring-[#9e3b2e]"
                  />
                  <Lock className="w-4 h-4 text-[#9d8a82] absolute left-3.5 top-3" />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-3 text-[#9d8a82] hover:text-[#2e2624]"
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              {/* Terms checkbox */}
              <label className="flex items-start gap-2.5 cursor-pointer text-sm text-[#6e5e57] pt-1">
                <input
                  type="checkbox"
                  checked={agreed}
                  onChange={(e) => setAgreed(e.target.checked)}
                  className="mt-0.5 rounded border-[#cfbcaf] text-[#9e3b2e] focus:ring-[#9e3b2e]"
                />
                <span>
                  Tôi đồng ý với{" "}
                  <strong className="text-[#9e3b2e]">Quy ước bảo mật</strong> &{" "}
                  <strong className="text-[#9e3b2e]">
                    Tôn trọng bản sắc văn hóa
                  </strong>
                </span>
              </label>

              {/* Submit Button */}
              <Button
                variant="default"
                size="lg"
                type="submit"
                disabled={!agreed}
                className="w-full mt-2 font-semibold shadow-xs"
              >
                <span>Tạo tài khoản</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
            </form>

            {/* Social Divider */}
            <div className="relative my-6 text-center">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-[#f1e5d8]"></div>
              </div>
              <span className="relative bg-[#fffdfa] px-3 text-xs uppercase tracking-wider text-[#9f8f87] font-medium">
                Hoặc đăng nhập bằng
              </span>
            </div>

            {/* Social Buttons */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              <Button
                variant="outline"
                type="button"
                onClick={() => onSuccess("Lữ khách Google", "an.nhien@gmail.com")}
                className="bg-[#faf3ec]/60 border-[#eedcd0] text-xs font-semibold gap-2 py-2.5"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                  />
                </svg>
                <span>Google</span>
              </Button>

              <Button
                variant="outline"
                type="button"
                onClick={() => onSuccess("Lữ khách Apple", "an.nhien@icloud.com")}
                className="bg-[#faf3ec]/60 border-[#eedcd0] text-xs font-semibold gap-2 py-2.5"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.84c.66-.8 1.11-1.92.99-3.04-1 .04-2.14.67-2.82 1.47-.6.7-1.12 1.83-.98 2.92 1.11.09 2.16-.57 2.81-1.35z" />
                </svg>
                <span>Apple</span>
              </Button>
            </div>

            {/* Bottom link */}
            <div className="text-center text-xs text-[#7d6d66]">
              <span>Đã có tài khoản? </span>
              <button
                type="button"
                onClick={onGoToLogin}
                className="text-[#9e3b2e] font-bold hover:underline cursor-pointer"
              >
                Đăng nhập ngay
              </button>
            </div>
          </div>
        </div>
      </Card>

      {/* Outer bottom watermark */}
      <div className="mt-8 text-center text-xs tracking-wider uppercase text-[#a5948c] font-medium">
        ● Giữ gìn nét đẹp chiêm nghiệm người Việt ●
      </div>
    </div>
  );
};
