import React, { useState } from "react";
import { ArrowLeft, Lock, Mail, ArrowRight, Flower2 } from "lucide-react";

interface LoginScreenProps {
  onBack: () => void;
  onSuccess: () => void;
  onGoToRegister: () => void;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({
  onBack,
  onSuccess,
  onGoToRegister,
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSuccess();
  };

  return (
    <div className="w-full min-h-screen bg-[#fcf8f2] text-[#2e2624] font-['Be_Vietnam_Pro',sans-serif] flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-[#fffdfa] border border-[#eddcd0] rounded-3xl p-8 shadow-sm">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 text-xs text-[#84746d] hover:text-[#9e3b2e] mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Quay lại</span>
        </button>

        <div className="text-center mb-8">
          <div className="w-12 h-12 mx-auto rounded-full bg-[#faece1] border border-[#e8d5c4] flex items-center justify-center text-[#9e3b2e] mb-3">
            <Flower2 className="w-6 h-6" />
          </div>
          <h2 className="font-['Noto_Serif',serif] font-bold text-2xl text-[#2a2220]">
            Đăng nhập Góc của tôi
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-[#73635d]">
            Đồng bộ nhật ký chiêm nghiệm và lưu giữ những điềm lành thường nhật.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-[#544640] mb-1.5">
              Email hoặc Số điện thoại
            </label>
            <div className="relative">
              <input
                type="text"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="tenban@domain.vn"
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#faf4ed]/80 border border-[#e8d5c4] text-sm text-[#2f2523] placeholder-[#a2928a] focus:outline-none focus:ring-1 focus:ring-[#9e3b2e]"
              />
              <Mail className="w-4 h-4 text-[#9c8981] absolute left-3.5 top-3.5" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#544640] mb-1.5">
              Mật khẩu
            </label>
            <div className="relative">
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#faf4ed]/80 border border-[#e8d5c4] text-sm text-[#2f2523] placeholder-[#a2928a] focus:outline-none focus:ring-1 focus:ring-[#9e3b2e]"
              />
              <Lock className="w-4 h-4 text-[#9c8981] absolute left-3.5 top-3.5" />
            </div>
          </div>

          <button
            type="submit"
            className="w-full mt-2 py-3.5 px-4 rounded-xl bg-[#9e3b2e] hover:bg-[#882f23] text-white text-sm font-semibold flex items-center justify-center gap-2 shadow-sm transition-all"
          >
            <span>Vào Góc của tôi</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="mt-6 pt-5 border-t border-[#f2e5d9] text-center text-xs text-[#83736b]">
          <span>Chưa có tài khoản? </span>
          <button
            onClick={onGoToRegister}
            className="text-[#9e3b2e] font-semibold hover:underline"
          >
            Khởi tạo ngay
          </button>
        </div>
      </div>
    </div>
  );
};
