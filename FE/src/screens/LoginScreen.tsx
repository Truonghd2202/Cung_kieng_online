import React, { useState } from "react";
import {
  Lock,
  Eye,
  EyeOff,
  AtSign,
  LogIn,
  Flower2,
  Sparkles,
  ArrowLeft,
} from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { Badge } from "@/src/components/ui/badge";
import { Card } from "@/src/components/ui/card";

interface LoginScreenProps {
  onBack?: () => void;
  onSuccess: (name?: string, email?: string) => void;
  onGoToRegister: () => void;
  onGoToForgotPassword?: () => void;
  pendingSignalMood?: string;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({
  onBack,
  onSuccess,
  onGoToRegister,
  onGoToForgotPassword,
  pendingSignalMood,
}) => {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const finalName = identifier.includes("@")
      ? identifier.split("@")[0]
      : identifier || "Lữ khách An Yên";
    const finalEmail = identifier.includes("@")
      ? identifier
      : `${identifier || "khach"}@tinlam.vn`;
    onSuccess(finalName, finalEmail);
  };

  return (
    <div className="w-full min-h-screen bg-[#f7f2ea] text-[#2e2624] font-['Be_Vietnam_Pro',sans-serif] flex flex-col items-center justify-center p-4 sm:p-6">
      <Card className="w-full max-w-4xl bg-white border border-[#eddcd0] rounded-3xl shadow-lg overflow-hidden grid grid-cols-1 md:grid-cols-12">
        {/* Left Column: Peach Parchment Art Panel */}
        <div className="md:col-span-5 bg-[#fbf2e9] p-8 sm:p-10 border-b md:border-b-0 md:border-r border-[#ecdcd0] flex flex-col justify-between">
          <div>
            {/* Top row */}
            <div className="flex items-center justify-between mb-6">
              <Badge
                variant="terracotta"
                className="gap-1.5 px-3 py-1 text-xs font-semibold tracking-wider uppercase"
              >
                <Flower2 className="w-3.5 h-3.5" />
                <span>Hồn Việt đương đại</span>
              </Badge>
              <div className="w-6 h-6 rounded-full bg-[#f4e2d3] flex items-center justify-center text-[#9e3b2e] shadow-2xs">
                <Sparkles className="w-3.5 h-3.5" />
              </div>
            </div>

            {/* Photo Card with text */}
            <div className="relative rounded-2xl overflow-hidden shadow-xs border border-[#ecd9cb] mb-6 group">
              <img
                src="/images/do_paper_still_life.jpg"
                alt="Điểm tựa tĩnh lặng"
                className="w-full h-56 sm:h-64 object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

              <div className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full bg-white/85 backdrop-blur-xs text-xs font-semibold text-[#3b302c] uppercase tracking-wider">
                Điểm tựa tĩnh lặng
              </div>

              <div className="absolute bottom-3 left-3 right-3 text-white">
                <h4 className="font-['Noto_Serif',serif] font-bold text-base sm:text-lg leading-snug">
                  Một nén hương lòng, muôn sự lắng đọng
                </h4>
              </div>
            </div>

            <div className="flex justify-center">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#faece1] text-[#9e3b2e] text-xs font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-[#9e3b2e]"></span>
                Không gian an định hôm nay
              </span>
            </div>
          </div>

          {/* Bottom tag */}
          <div className="pt-6 border-t border-[#ecd9cb] flex items-start gap-2.5">
            <div className="w-1 h-8 bg-[#9e3b2e] rounded-full"></div>
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-[#9e3b2e]">
                Tâm pháp
              </div>
              <div className="text-xs text-[#75655e]">
                Lắng nghe nhịp điệu từ nguồn cội
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Login Form */}
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
                  <strong className="font-semibold">Tín hiệu đang chờ lưu:</strong> Quẻ "{pendingSignalMood}" sẽ tự động được lưu vào Góc của bạn ngay khi hoàn tất đăng nhập.
                </div>
              </div>
            )}

            {/* Demo Notice Banner */}
            <div className="mb-5 p-2.5 rounded-xl bg-[#fbf5ee] border border-[#eddcd0] flex items-center gap-2 text-xs text-[#786962]">
              <Badge variant="secondary" className="text-xs py-0 px-2 uppercase font-bold text-[#9e3b2e]">
                Demo
              </Badge>
              <span>Chưa có Backend • Đăng nhập mô phỏng để trải nghiệm lưu trữ.</span>
            </div>

            <div className="text-xs font-bold uppercase tracking-wider text-[#be8e5a] mb-1 flex items-center gap-1.5">
              <span>✦ Cánh cửa soi chiếu</span>
            </div>

            <h2 className="font-['Noto_Serif',serif] font-bold text-2xl sm:text-[28px] text-[#2a211e] leading-snug mb-1.5">
              Chào mừng bạn quay về
            </h2>
            <p className="text-sm text-[#77665f] leading-relaxed mb-6">
              Tiếp tục hành trình chiêm nghiệm và soi chiếu tâm hồn cùng cội
              nguồn dân tộc.
            </p>

            {/* Google Social Button */}
            <Button
              variant="outline"
              type="button"
              onClick={() => onSuccess("Lữ khách Google", "an.nhien@gmail.com")}
              className="w-full bg-[#faede2]/60 hover:bg-[#faede2] border-[#ecd9cb] text-sm font-semibold gap-2 py-3 mb-6"
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
              <span>Tiếp tục với Google</span>
            </Button>

            {/* Divider */}
            <div className="relative my-6 text-center">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-[#f1e5d8]"></div>
              </div>
              <span className="relative bg-[#fffdfa] px-3 text-xs uppercase tracking-wider text-[#9f8f87] font-medium">
                ● Hoặc đăng nhập bằng lối xưa ●
              </span>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Field 1: Email / Username */}
              <div>
                <label className="block text-sm font-semibold text-[#4e403a] mb-1.5">
                  Email hoặc Tên đăng nhập
                </label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                    placeholder="tennguoidung@domain.vn"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#faf3ec]/70 border border-[#eddcd0] text-sm text-[#2e2624] placeholder-[#a6968e] focus:outline-none focus:ring-1 focus:ring-[#9e3b2e]"
                  />
                  <AtSign className="w-4 h-4 text-[#9d8a82] absolute left-3.5 top-3" />
                </div>
              </div>

              {/* Field 2: Password */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-sm font-semibold text-[#4e403a]">
                    Mật khẩu
                  </label>
                  <button
                    type="button"
                    onClick={onGoToForgotPassword}
                    className="text-sm text-[#9e3b2e] hover:underline cursor-pointer"
                  >
                    Quên mật khẩu?
                  </button>
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

              {/* Remember me checkbox */}
              <label className="flex items-center gap-2 cursor-pointer text-sm text-[#6e5e57]">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded border-[#cfbcaf] text-[#9e3b2e] focus:ring-[#9e3b2e]"
                />
                <span>Ghi nhớ đăng nhập trên thiết bị này</span>
              </label>

              {/* Submit Button */}
              <Button
                variant="default"
                size="lg"
                type="submit"
                className="w-full mt-2 font-semibold gap-2 shadow-xs text-sm"
              >
                <LogIn className="w-4 h-4" />
                <span>Đăng nhập vào Góc của tôi</span>
              </Button>
            </form>

            {/* Bottom link */}
            <div className="text-center text-xs text-[#7d6d66] mt-6">
              <span>Chưa có tài khoản? </span>
              <button
                type="button"
                onClick={onGoToRegister}
                className="text-[#9e3b2e] font-bold hover:underline cursor-pointer"
              >
                Khởi tạo hành trình mới (Đăng ký)
              </button>
            </div>

            {/* Motivational Quote pill */}
            <div className="mt-4 p-3 rounded-xl bg-[#faf4ed] border border-[#f0e2d5] text-center text-xs font-['Noto_Serif',serif] italic text-[#705e57]">
              “Trở về với chính mình là chuyến đi bình an nhất.”
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};
