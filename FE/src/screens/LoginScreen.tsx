import React, { useState } from "react";
import {
  Lock,
  Eye,
  EyeOff,
  AtSign,
  LogIn,
  Sparkles,
  ArrowLeft,
  CheckCircle2,
  Loader2,
} from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { loginAccount } from "../data/authService";

interface LoginScreenProps {
  onBack?: () => void;
  onSuccess: (name?: string, email?: string) => void;
  onGoToRegister: () => void;
  onGoToForgotPassword?: () => void;
  pendingSignalMood?: string;
}

type AuthState = "idle" | "submitting" | "success" | "error";

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
  const [errorMessage, setErrorMessage] = useState("");
  const [authState, setAuthState] = useState<AuthState>("idle");
  const [prefersReducedMotion] = useState(() =>
    typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );

  const isSubmitting = authState === "submitting";
  const isSuccess = authState === "success";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting || isSuccess) return;

    setErrorMessage("");
    setAuthState("submitting");

    // Xác thực tài khoản nhanh chóng & chính xác
    setTimeout(() => {
      const result = loginAccount(identifier, password);
      if (!result.success) {
        setAuthState("error");
        setErrorMessage(result.error || "Tài khoản hoặc mật khẩu không chính xác.");
        return;
      }

      // Đăng nhập thành công -> Ba cây nhang tỏa khói trầm thanh thoát
      setAuthState("success");

      // Chuyển vào trang tiếp theo sau khi làn khói bốc lên tuyệt đẹp (~750ms)
      setTimeout(() => {
        onSuccess(result.user?.name, result.user?.email);
      }, prefersReducedMotion ? 160 : 2800);
    }, 180);
  };

  return (
    <div className="relative min-h-[calc(100vh-64px)] w-full flex flex-col justify-between overflow-x-hidden bg-canvas text-ink transition-colors duration-500">
      {/* Vầng hào quang thiền định nền */}
      <div
        className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
        aria-hidden="true"
      >
        <div
          className={`absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl transition-all duration-1000 ${
            isSuccess
              ? "w-[850px] h-[850px] bg-gradient-to-b from-amber-400/50 via-red-500/35 to-transparent scale-140 opacity-100"
              : "w-[600px] h-[600px] bg-gradient-to-b from-amber-500/15 via-red-900/10 to-transparent scale-100 opacity-60"
          }`}
        />
        <div className="absolute inset-0 bg-[radial-gradient(#8f202b_1px,transparent_1px)] [background-size:32px_32px] opacity-[0.025] dark:opacity-[0.05]" />
      </div>

      {/* TOP: Nút trở về tinh gọn góc trên */}
      <div className="login-screen-back relative z-20 w-full max-w-7xl mx-auto px-4 sm:px-8 pt-3 flex items-center justify-between">
        {onBack ? (
          <button
            type="button"
            onClick={onBack}
            disabled={isSubmitting || isSuccess}
            className="group inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-surface/80 hover:bg-surface border border-line text-xs font-medium text-muted hover:text-ink transition-all shadow-2xs cursor-pointer backdrop-blur-md"
          >
            <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-0.5" />
            <span>Trở về</span>
          </button>
        ) : (
          <div />
        )}
      </div>

      {/* BỐ CỤC TRÁI - PHẢI (LEFT: LƯ HƯƠNG KHỔNG LỒ CHIẾM ĐA SỐ, RIGHT: FORM ĐĂNG NHẬP) */}
      <main className="login-screen-layout relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-8 py-3 sm:py-6 flex-1 flex flex-col lg:grid lg:grid-cols-3 lg:gap-8 items-center justify-center">
        
        {/* CỘT TRÁI: LƯ HƯƠNG KHỔNG LỒ (CHIẾM ~70% KHÔNG GIAN DESKTOP, CÀNG TO CÀNG TỐT) */}
        <section
          aria-label="Khu vực Lư hương truyền thống"
          className="login-altar-column lg:col-span-2 w-full flex flex-col items-center justify-center text-center select-none py-4 lg:py-0"
        >
          {/* Thông báo quẻ đang chờ nếu có */}
          {pendingSignalMood && (
            <div className="w-full max-w-md mb-4 p-2.5 rounded-panel bg-surface/90 backdrop-blur-md border border-accent/40 text-xs text-accent flex items-start gap-2 shadow-2xs animate-fade-in text-left">
              <Sparkles className="w-4 h-4 text-accent shrink-0 mt-0.5" />
              <div>
                <strong className="font-semibold">Tín hiệu đang chờ:</strong> Quẻ "{pendingSignalMood}" sẽ tự động lưu vào Góc của bạn ngay khi hoàn tất.
              </div>
            </div>
          )}

          {/* LƯ HƯƠNG ĐỒNG KHỔNG LỒ VỚI 3 NÉN NHANG */}
          <div className={`login-altar-stage relative w-full max-w-[480px] sm:max-w-[560px] md:max-w-[620px] xl:max-w-[680px] h-[340px] sm:h-[400px] md:h-[460px] xl:h-[500px] flex items-center justify-center mt-1 sm:mt-3 ${isSuccess ? "login-altar-stage--success" : ""}`}>
            <div className="login-altar-backdrop" aria-hidden="true">
              <img src="/images/login-altar-scene-v2.png" alt="" className="login-altar-image" />
              <div className="login-altar-panel" />
              <div className="login-altar-crown" />
              <div className="login-altar-candle login-altar-candle--left"><span /></div>
              <div className="login-altar-candle login-altar-candle--right"><span /></div>
              <div className="login-altar-vase"><span className="login-altar-flower login-altar-flower--one" /><span className="login-altar-flower login-altar-flower--two" /><span className="login-altar-flower login-altar-flower--three" /></div>
              <div className="login-altar-fruit login-altar-fruit--one" />
              <div className="login-altar-fruit login-altar-fruit--two" />
              <div className="login-altar-fruit login-altar-fruit--three" />
              <div className="login-altar-table" />
            </div>
            {/* Vầng ánh sáng ấm trang trọng sau lưng lư hương */}
            <div
                className={`login-altar-legacy-aura absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full transition-all duration-1000 pointer-events-none ${
                isSuccess
                  ? "w-80 sm:w-[480px] md:w-[560px] h-80 sm:h-[480px] md:h-[560px] bg-gradient-to-tr from-amber-500/20 via-amber-300/15 to-orange-400/10 blur-3xl scale-115 censer-aura-success"
                  : "w-64 sm:w-80 md:w-96 h-64 sm:h-80 md:h-96 bg-amber-500/12 dark:bg-amber-400/12 blur-2xl scale-100"
              }`}
            />

            <svg
              viewBox="0 -20 340 350"
              className={`login-altar-censer w-full h-full overflow-visible transition-all duration-700 drop-shadow-2xl ${
                isSuccess ? "scale-105 filter drop-shadow-[0_0_35px_rgba(245,158,11,0.6)]" : ""
              }`}
              xmlns="http://www.w3.org/2000/svg"
              role="img"
              aria-label="Lư hương đồng Việt Nam to lớn uy nghi với đúng ba nén nhang trầm"
            >
              <defs>
                {/* Chất liệu đồng hun cổ truyền Việt Nam */}
                <linearGradient id="bronzeCastBody" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#38210f" />
                  <stop offset="25%" stopColor="#633918" />
                  <stop offset="50%" stopColor="#a76e33" />
                  <stop offset="70%" stopColor="#d49746" />
                  <stop offset="85%" stopColor="#633918" />
                  <stop offset="100%" stopColor="#241407" />
                </linearGradient>

                <linearGradient id="bronzeRimHighlight" x1="0%" y1="50%" x2="100%" y2="50%">
                  <stop offset="0%" stopColor="#2c1708" />
                  <stop offset="20%" stopColor="#7a461b" />
                  <stop offset="50%" stopColor="#f3c278" />
                  <stop offset="80%" stopColor="#7a461b" />
                  <stop offset="100%" stopColor="#2c1708" />
                </linearGradient>

                <linearGradient id="bronzeHandles" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#241306" />
                  <stop offset="45%" stopColor="#875525" />
                  <stop offset="70%" stopColor="#c58a3e" />
                  <stop offset="100%" stopColor="#301a09" />
                </linearGradient>

                {/* Bát tro xám mịn chân thực */}
                <radialGradient id="ashBedTexture" cx="50%" cy="45%" r="52%">
                  <stop
                    offset="0%"
                    stopColor={isSuccess ? "#fef08a" : "#78716c"}
                    stopOpacity={isSuccess ? 0.95 : 0.9}
                  />
                  <stop
                    offset="45%"
                    stopColor={isSuccess ? "#f97316" : "#57534e"}
                    stopOpacity={isSuccess ? 0.9 : 0.85}
                  />
                  <stop
                    offset="85%"
                    stopColor={isSuccess ? "#b91c1c" : "#44403c"}
                    stopOpacity="0.95"
                  />
                  <stop offset="100%" stopColor="#292524" />
                </radialGradient>

                {/* Khói hương trầm chân thực - Gradient thanh khiết lan tỏa */}
                <linearGradient id="realSmokeCoreGrad" x1="0%" y1="100%" x2="0%" y2="0%">
                  <stop offset="0%" stopColor="#fff7ed" stopOpacity="0.85" />
                  <stop offset="15%" stopColor="#ffffff" stopOpacity="0.75" />
                  <stop offset="40%" stopColor="#f8fafc" stopOpacity="0.55" />
                  <stop offset="70%" stopColor="#e2e8f0" stopOpacity="0.25" />
                  <stop offset="90%" stopColor="#cbd5e1" stopOpacity="0.08" />
                  <stop offset="100%" stopColor="#94a3b8" stopOpacity="0" />
                </linearGradient>

                <linearGradient id="realSmokeWispyGrad" x1="0%" y1="100%" x2="0%" y2="0%">
                  <stop offset="0%" stopColor="#ffffff" stopOpacity="0.65" />
                  <stop offset="25%" stopColor="#f1f5f9" stopOpacity="0.45" />
                  <stop offset="60%" stopColor="#e2e8f0" stopOpacity="0.2" />
                  <stop offset="85%" stopColor="#cbd5e1" stopOpacity="0.05" />
                  <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
                </linearGradient>

                <linearGradient id="realSmokeMistGrad" x1="0%" y1="100%" x2="0%" y2="0%">
                  <stop offset="0%" stopColor="#fef3c7" stopOpacity="0.25" />
                  <stop offset="25%" stopColor="#ffffff" stopOpacity="0.18" />
                  <stop offset="65%" stopColor="#f1f5f9" stopOpacity="0.08" />
                  <stop offset="100%" stopColor="#e2e8f0" stopOpacity="0" />
                </linearGradient>

                {/* Bộ lọc làm mềm tự nhiên cho làn khói */}
                <filter id="realSmokeSoftFilter" x="-40%" y="-40%" width="180%" height="180%">
                  <feGaussianBlur stdDeviation="0.7" />
                </filter>

                {/* Bộ lọc khuếch tán sương khói mờ ảo phía sau */}
                <filter id="realSmokeMistFilter" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur stdDeviation="4" />
                </filter>

                {/* Đốm than hồng ấm áp chân thực */}
                <filter id="realEmberGlow" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur stdDeviation="1.4" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {/* CHỈ HIỆN KHÓI KHI ĐĂNG NHẬP THÀNH CÔNG: KHÓI BỐC LÊN VÀ LAN TỎA THANH THOÁT NHƯ KHÓI NHANG THẬT */}
              {isSuccess && (
                <g className="censer-smoke-bloom-container pointer-events-none">
                  {/* === NÉN TRÁI (Tip: 132, 82) === */}
                  <g className="censer-smoke-stream-left">
                    {/* Sương mờ tỏa khí trầm */}
                    <path
                      d="M 132 80 C 128 64, 118 50, 122 34 C 126 18, 115 4, 118 -12"
                      fill="none"
                      stroke="url(#realSmokeMistGrad)"
                      strokeWidth="7"
                      strokeLinecap="round"
                      filter="url(#realSmokeMistFilter)"
                    />
                    {/* Sợi khói chính uốn lượn */}
                    <g filter="url(#realSmokeSoftFilter)">
                      <path
                        d="M 132 82 C 132 72, 129 62, 125 50 C 120 38, 112 30, 116 16 C 120 2, 130 -8, 122 -22 C 117 -30, 108 -38, 112 -48"
                        fill="none"
                        stroke="url(#realSmokeCoreGrad)"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      />
                      {/* Sợi tơ khói phụ quấn quýt */}
                      <path
                        d="M 132 82 C 133 74, 134 60, 128 48 C 122 36, 128 24, 123 10 C 118 -4, 112 -16, 116 -28 C 120 -38, 112 -46, 115 -55"
                        fill="none"
                        stroke="url(#realSmokeWispyGrad)"
                        strokeWidth="1.1"
                        strokeLinecap="round"
                      />
                      {/* Nhánh tơ khói tách nhẹ */}
                      <path
                        d="M 125 50 C 118 42, 110 36, 112 26 C 114 16, 122 10, 117 0"
                        fill="none"
                        stroke="url(#realSmokeWispyGrad)"
                        strokeWidth="0.8"
                        opacity="0.5"
                        strokeLinecap="round"
                      />
                    </g>
                  </g>

                  {/* === NÉN GIỮA (Tip: 170, 58 - Cao & thanh thoát nhất) === */}
                  <g className="censer-smoke-stream-center">
                    {/* Sương mờ tỏa khí trầm */}
                    <path
                      d="M 170 54 C 172 38, 164 22, 168 6 C 172 -10, 164 -26, 166 -45"
                      fill="none"
                      stroke="url(#realSmokeMistGrad)"
                      strokeWidth="8"
                      strokeLinecap="round"
                      filter="url(#realSmokeMistFilter)"
                    />
                    {/* Sợi khói chính vút cao */}
                    <g filter="url(#realSmokeSoftFilter)">
                      <path
                        d="M 170 58 C 170 46, 172 36, 168 24 C 163 10, 156 -2, 163 -16 C 170 -30, 178 -42, 170 -56 C 164 -66, 158 -74, 162 -85"
                        fill="none"
                        stroke="url(#realSmokeCoreGrad)"
                        strokeWidth="1.7"
                        strokeLinecap="round"
                      />
                      {/* Sợi tơ khói lượn sóng */}
                      <path
                        d="M 170 58 C 169 48, 166 36, 172 24 C 177 12, 175 0, 168 -14 C 162 -28, 166 -42, 173 -56 C 178 -68, 170 -78, 172 -90"
                        fill="none"
                        stroke="url(#realSmokeWispyGrad)"
                        strokeWidth="1.2"
                        strokeLinecap="round"
                      />
                      {/* Nhánh tơ khói phụ cuộn nhẹ */}
                      <path
                        d="M 168 24 C 162 14, 154 6, 156 -4 C 158 -14, 166 -22, 160 -32"
                        fill="none"
                        stroke="url(#realSmokeWispyGrad)"
                        strokeWidth="0.9"
                        opacity="0.5"
                        strokeLinecap="round"
                      />
                    </g>
                  </g>

                  {/* === NÉN PHẢI (Tip: 208, 82) === */}
                  <g className="censer-smoke-stream-right">
                    {/* Sương mờ tỏa khí trầm */}
                    <path
                      d="M 208 80 C 212 64, 222 50, 218 34 C 214 18, 225 4, 222 -12"
                      fill="none"
                      stroke="url(#realSmokeMistGrad)"
                      strokeWidth="7"
                      strokeLinecap="round"
                      filter="url(#realSmokeMistFilter)"
                    />
                    {/* Sợi khói chính uốn lượn */}
                    <g filter="url(#realSmokeSoftFilter)">
                      <path
                        d="M 208 82 C 208 72, 211 62, 215 50 C 220 38, 228 30, 224 16 C 220 2, 210 -8, 218 -22 C 223 -30, 232 -38, 228 -48"
                        fill="none"
                        stroke="url(#realSmokeCoreGrad)"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      />
                      {/* Sợi tơ khói phụ */}
                      <path
                        d="M 208 82 C 207 74, 206 60, 212 48 C 218 36, 212 24, 217 10 C 222 -4, 228 -16, 224 -28 C 220 -38, 228 -46, 225 -55"
                        fill="none"
                        stroke="url(#realSmokeWispyGrad)"
                        strokeWidth="1.1"
                        strokeLinecap="round"
                      />
                      {/* Nhánh tơ khói tách nhẹ */}
                      <path
                        d="M 215 50 C 222 42, 230 36, 228 26 C 226 16, 218 10, 223 0"
                        fill="none"
                        stroke="url(#realSmokeWispyGrad)"
                        strokeWidth="0.8"
                        opacity="0.5"
                        strokeLinecap="round"
                      />
                    </g>
                  </g>
                </g>
              )}

              {/* BA NÉN NHANG TRẦM VIỆT NAM (REALISTIC INCENSE STICKS) */}
              <g className={`censer-sticks ${isSuccess ? "censer-sticks-success" : ""}`}>
                {/* NÉN 1: BÊN TRÁI (Nghiêng nhẹ ~5 độ) */}
                <line
                  x1="132"
                  y1="82"
                  x2="144"
                  y2="190"
                  stroke="#8b5a2b"
                  strokeWidth="3.2"
                  strokeLinecap="round"
                />
                <line
                  x1="142"
                  y1="172"
                  x2="146"
                  y2="200"
                  stroke="#b91c1c"
                  strokeWidth="2.5"
                />
                {/* Đầu tàn tro xám nhạt */}
                <circle cx="132" cy="80.6" r="1.3" fill="#cbd5e1" opacity="0.8" />
                {/* Đốm than hồng thật - Cháy âm ỉ chân thực */}
                <circle
                  cx="132"
                  cy="82"
                  r={isSuccess ? 2.5 : 1.9}
                  fill="#ea580c"
                  className={isSuccess ? "censer-ember-success" : "censer-ember-idle"}
                  filter="url(#realEmberGlow)"
                />
                {/* Tia nhiệt cực nhỏ trong lõi than */}
                <circle
                  cx="132"
                  cy="81.8"
                  r={isSuccess ? 1.1 : 0.8}
                  fill="#fffbeb"
                  opacity={isSuccess ? 0.95 : 0.8}
                />

                {/* NÉN 2: Ở GIỮA (Thẳng đứng, cao hơn theo đúng phong tục Việt) */}
                <line
                  x1="170"
                  y1="58"
                  x2="170"
                  y2="190"
                  stroke="#9a6332"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                />
                <line
                  x1="170"
                  y1="172"
                  x2="170"
                  y2="200"
                  stroke="#b91c1c"
                  strokeWidth="2.8"
                />
                <circle cx="170" cy="56.5" r="1.5" fill="#cbd5e1" opacity="0.85" />
                <circle
                  cx="170"
                  cy="58"
                  r={isSuccess ? 2.8 : 2.2}
                  fill="#f97316"
                  className={isSuccess ? "censer-ember-success" : "censer-ember-idle"}
                  filter="url(#realEmberGlow)"
                />
                <circle
                  cx="170"
                  cy="57.8"
                  r={isSuccess ? 1.3 : 0.9}
                  fill="#fffbeb"
                  opacity={isSuccess ? 1 : 0.85}
                />

                {/* NÉN 3: BÊN PHẢI (Nghiêng nhẹ ~5 độ) */}
                <line
                  x1="208"
                  y1="82"
                  x2="196"
                  y2="190"
                  stroke="#8b5a2b"
                  strokeWidth="3.2"
                  strokeLinecap="round"
                />
                <line
                  x1="198"
                  y1="172"
                  x2="194"
                  y2="200"
                  stroke="#b91c1c"
                  strokeWidth="2.5"
                />
                <circle cx="208" cy="80.6" r="1.3" fill="#cbd5e1" opacity="0.8" />
                <circle
                  cx="208"
                  cy="82"
                  r={isSuccess ? 2.5 : 1.9}
                  fill="#ea580c"
                  className={isSuccess ? "censer-ember-success" : "censer-ember-idle"}
                  filter="url(#realEmberGlow)"
                />
                <circle
                  cx="208"
                  cy="81.8"
                  r={isSuccess ? 1.1 : 0.8}
                  fill="#fffbeb"
                  opacity={isSuccess ? 0.95 : 0.8}
                />
              </g>

              {/* ĐẾ GỖ MUN CHẠM TRUYỀN THỐNG (WOOD PEDESTAL) */}
              <g className="censer-wood-base">
                <ellipse cx="170" cy="302" rx="84" ry="14" fill="#170c06" />
                <rect x="90" y="293" width="160" height="9" rx="3.5" fill="#201209" />
                <ellipse cx="170" cy="293" rx="77" ry="9" fill="#361e0f" />
                <path d="M 104 302 L 102 312 L 118 312 L 115 302 Z" fill="#0d0704" />
                <path d="M 162 304 L 162 313 L 178 313 L 178 304 Z" fill="#0d0704" />
                <path d="M 225 302 L 227 312 L 243 312 L 241 302 Z" fill="#0d0704" />
              </g>

              {/* BA CHÂN ĐỈNH ĐỒNG VỮNG CHÃI (TRIPOD LEGS) */}
              <g className="censer-tripod-legs">
                <path
                  d="M 122 242 C 115 260, 104 282, 111 295 C 118 295, 129 295, 133 291 C 129 275, 136 257, 142 244 Z"
                  fill="url(#bronzeCastBody)"
                  stroke="#241407"
                  strokeWidth="1.3"
                />
                <path
                  d="M 218 242 C 225 260, 236 282, 229 295 C 222 295, 211 295, 207 291 C 211 275, 204 257, 198 244 Z"
                  fill="url(#bronzeCastBody)"
                  stroke="#241407"
                  strokeWidth="1.3"
                />
                <path
                  d="M 161 251 C 159 269, 160 286, 163 297 C 168 298, 172 298, 177 297 C 180 286, 181 269, 179 251 Z"
                  fill="url(#bronzeCastBody)"
                  stroke="#241407"
                  strokeWidth="1.3"
                />
              </g>

              {/* TAI MÂY ĐỈNH ĐỒNG (CLOUD HANDLES CÓ ĐỘ DÀY 3D) */}
              <g className="censer-handles">
                <path
                  d="M 108 192 C 68 183, 57 216, 72 238 C 83 251, 99 249, 110 231 C 99 227, 88 218, 88 207 C 88 198, 97 196, 108 196 Z"
                  fill="url(#bronzeHandles)"
                  stroke="#241407"
                  strokeWidth="1.8"
                />
                <path
                  d="M 106 194 C 75 187, 66 214, 77 232"
                  fill="none"
                  stroke="#f3c278"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  opacity="0.9"
                />

                <path
                  d="M 232 192 C 272 183, 283 216, 268 238 C 257 251, 241 249, 230 231 C 241 227, 252 218, 252 207 C 252 198, 243 196, 232 196 Z"
                  fill="url(#bronzeHandles)"
                  stroke="#241407"
                  strokeWidth="1.8"
                />
                <path
                  d="M 234 194 C 265 187, 274 214, 263 232"
                  fill="none"
                  stroke="#f3c278"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  opacity="0.9"
                />
              </g>

              {/* THÂN BỤNG LƯ HƯƠNG ĐỒNG (MAIN CENSER BOWL BODY) */}
              <g className="censer-body">
                <path
                  d="M 100 192 C 98 234, 117 257, 170 257 C 223 257, 242 234, 240 192 Z"
                  fill="url(#bronzeCastBody)"
                  stroke="#241407"
                  strokeWidth="2.2"
                />

                {/* Cánh sen đắp nổi */}
                <path
                  d="M 141 255 C 143 231, 157 218, 170 213 C 183 218, 197 231, 199 255 Z"
                  fill="#6e3d16"
                  stroke="#d49746"
                  strokeWidth="1.4"
                  opacity="0.95"
                />
                <path
                  d="M 115 244 C 119 226, 130 218, 141 218 C 139 236, 135 246, 128 251 Z"
                  fill="#542e0e"
                  stroke="#d49746"
                  strokeWidth="1.1"
                  opacity="0.85"
                />
                <path
                  d="M 225 244 C 221 226, 210 218, 199 218 C 201 236, 205 246, 212 251 Z"
                  fill="#542e0e"
                  stroke="#d49746"
                  strokeWidth="1.1"
                  opacity="0.85"
                />

                {/* Mặt trời / Ấn triện cát tường chính giữa */}
                <circle
                  cx="170"
                  cy="216"
                  r="9.5"
                  fill={isSuccess ? "#fef08a" : "#d97706"}
                  stroke="#78350f"
                  strokeWidth="1.4"
                  className={isSuccess ? "animate-pulse" : ""}
                />
                <circle cx="170" cy="216" r="4.8" fill={isSuccess ? "#ffffff" : "#fef3c7"} />

                {/* Miệng đỉnh loe tròn */}
                <ellipse
                  cx="170"
                  cy="190"
                  rx="73"
                  ry="14.5"
                  fill="url(#bronzeRimHighlight)"
                  stroke="#241407"
                  strokeWidth="2.2"
                />

                {/* Gờ miệng trong */}
                <ellipse
                  cx="170"
                  cy="190"
                  rx="65"
                  ry="11"
                  fill="#241306"
                  stroke="#9a6332"
                  strokeWidth="1.1"
                />

                {/* LÒNG BÁT TRO TÀN & THAN HỒNG THẬT */}
                <ellipse
                  cx="170"
                  cy="189"
                  rx="60"
                  ry="9.5"
                  fill="url(#ashBedTexture)"
                />

                {/* Hạt than hồng li ti vùi trong tro */}
                <circle
                  cx="155"
                  cy="188"
                  r={isSuccess ? 1.6 : 1.3}
                  fill={isSuccess ? "#f97316" : "#ea580c"}
                  opacity={isSuccess ? 0.85 : 0.65}
                />
                <circle
                  cx="179"
                  cy="190"
                  r={isSuccess ? 1.8 : 1.4}
                  fill={isSuccess ? "#fb923c" : "#c2410c"}
                  opacity={isSuccess ? 0.9 : 0.7}
                />
                <circle
                  cx="167"
                  cy="187"
                  r={isSuccess ? 1.4 : 1.2}
                  fill={isSuccess ? "#fdba74" : "#9a3412"}
                  opacity={isSuccess ? 0.8 : 0.55}
                />
                <circle
                  cx="191"
                  cy="189"
                  r={isSuccess ? 1.5 : 1.2}
                  fill={isSuccess ? "#f97316" : "#7c2d12"}
                  opacity={isSuccess ? 0.75 : 0.45}
                />
              </g>
            </svg>

            {isSuccess && (
              <svg className={`login-incense-overlay ${isSuccess ? "login-incense-overlay--success" : ""}`} viewBox="0 0 680 500" aria-hidden="true">
                <g className="login-incense-sticks">
                  <line x1="258" y1="335" x2="247" y2="244" />
                  <line x1="276" y1="335" x2="276" y2="225" />
                  <line x1="294" y1="335" x2="305" y2="244" />
                  <circle cx="247" cy="244" r="3" />
                  <circle cx="276" cy="225" r="3" />
                  <circle cx="305" cy="244" r="3" />
                </g>
                <g className="login-incense-smoke">
                  <path d="M247 244 C238 224 258 214 247 193 C238 176 257 163 250 143" />
                  <path d="M276 225 C267 203 288 190 276 169 C265 149 288 134 279 111" />
                  <path d="M305 244 C314 224 294 214 305 193 C314 176 295 163 302 143" />
                </g>
              </svg>
            )}
          </div>

          {/* DÒNG TÂM PHÁP DẪN DẮT */}
          <div className="login-altar-caption mt-4 px-4 max-w-lg mx-auto text-center">
            <h1 className="font-display font-bold text-2xl sm:text-3xl md:text-4xl text-ink leading-tight tracking-wide">
              Điểm Tựa Tĩnh Lặng
            </h1>
            <p className="text-xs sm:text-sm md:text-base text-muted mt-1.5 font-serif italic leading-relaxed">
              "Một nén tâm hương tỏ tấc lòng,
              <span className="inline sm:hidden"><br /></span>
              {" "}muôn sự trần ai lắng về không."
            </p>
          </div>
        </section>

        {/* CỘT PHẢI: FORM ĐĂNG NHẬP TINH GỌN, SANG TRỌNG (CHIẾM ~30% DESKTOP, KHÔNG CÓ FOOTER) */}
        <section
          aria-label="Biểu mẫu đăng nhập"
          className="relative isolate overflow-hidden lg:col-span-1 w-full flex flex-col items-center justify-center py-5 sm:py-6 lg:py-8"
        >
          <svg
            className="login-form-incense-smoke"
            viewBox="0 0 400 760"
            aria-hidden="true"
          >
            <g className="login-form-smoke-haze">
              <path d="M112 220 C76 174 151 143 116 94 C90 57 124 30 145 0" />
              <path d="M286 178 C330 133 260 97 298 58 C320 34 294 15 278 0" />
              <path d="M130 760 C163 708 95 682 132 630 C157 595 126 571 112 542" />
              <path d="M276 760 C242 711 309 674 271 635 C249 612 273 583 288 555" />
            </g>
            <path className="login-form-smoke-path login-form-smoke-path--one" d="M112 220 C76 174 151 143 116 94 C90 57 124 30 145 0" />
            <path className="login-form-smoke-path login-form-smoke-path--two" d="M286 178 C330 133 260 97 298 58 C320 34 294 15 278 0" />
            <path className="login-form-smoke-path login-form-smoke-path--three" d="M130 760 C163 708 95 682 132 630 C157 595 126 571 112 542" />
            <path className="login-form-smoke-path login-form-smoke-path--four" d="M276 760 C242 711 309 674 271 635 C249 612 273 583 288 555" />
          </svg>
          <div className="login-form-card relative z-10 w-full max-w-[400px] bg-surface/90 dark:bg-surface/85 backdrop-blur-xl border border-line/80 dark:border-line rounded-card shadow-2xl p-6 sm:p-7 transition-all duration-300">
            {/* Header form tinh gọn */}
            <div className="flex items-center justify-between mb-4 border-b border-line/50 pb-3">
              <div className="flex items-center gap-2.5">
                <span className="w-2.5 h-2.5 rounded-full bg-action animate-pulse" />
                <h2 className="text-base sm:text-lg font-bold uppercase tracking-wide text-ink font-serif">
                  Đăng nhập vào Góc an trú
                </h2>
              </div>
              {isSuccess ? (
                <span className="text-xs font-semibold text-amber-600 dark:text-amber-400 flex items-center gap-1 animate-pulse">
                  <Sparkles className="w-3.5 h-3.5" />
                  Viên mãn
                </span>
              ) : isSubmitting ? (
                <span className="text-xs font-semibold text-accent animate-pulse">
                  Đang dâng hương...
                </span>
              ) : null}
            </div>

            {/* Hộp thông báo lỗi nếu có */}
            {errorMessage && (
              <div
                role="alert"
                className="mb-4 p-3 rounded-panel bg-danger-soft border border-danger/25 text-xs text-danger flex items-start gap-2 animate-shake"
              >
                <span className="font-bold text-sm leading-none mt-0.5">✕</span>
                <span className="leading-relaxed flex-1">{errorMessage}</span>
              </div>
            )}

            {/* CÁC TRƯỜNG FORM */}
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Trường 1: Tài khoản / Email */}
              <div>
                <label
                  htmlFor="login-email"
                  className="block text-xs sm:text-sm font-semibold uppercase tracking-wider text-ink mb-2"
                >
                  Tài khoản / Email
                </label>
                <div className="relative">
                  <input
                    id="login-email"
                    autoComplete="email"
                    type="email"
                    required
                    disabled={isSubmitting || isSuccess}
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                    placeholder="tenban@domain.com"
                    className="w-full min-h-[58px] pl-11 pr-4 py-3 rounded-card bg-surface/90 border border-line text-sm sm:text-base text-ink placeholder:text-subtle focus:outline-none focus:ring-1 focus:ring-accent focus:border-accent transition-all disabled:opacity-60"
                  />
                  <AtSign className="w-4 h-4 text-muted absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>

              {/* Trường 2: Mật khẩu */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label
                    htmlFor="login-password"
                    className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-ink"
                  >
                    Mật khẩu
                  </label>
                  {onGoToForgotPassword && (
                    <button
                      type="button"
                      onClick={onGoToForgotPassword}
                      disabled={isSubmitting || isSuccess}
                      className="text-xs sm:text-sm text-accent hover:underline cursor-pointer disabled:opacity-50"
                    >
                      Quên mật khẩu?
                    </button>
                  )}
                </div>
                <div className="relative">
                  <input
                    id="login-password"
                    autoComplete="current-password"
                    type={showPassword ? "text" : "password"}
                    required
                    disabled={isSubmitting || isSuccess}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full min-h-[58px] pl-11 pr-12 py-3 rounded-card bg-surface/90 border border-line text-sm sm:text-base text-ink placeholder:text-subtle focus:outline-none focus:ring-1 focus:ring-accent focus:border-accent transition-all disabled:opacity-60"
                  />
                  <Lock className="w-4 h-4 text-muted absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={showPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
                    disabled={isSubmitting || isSuccess}
                    className="absolute right-0 top-0 min-h-[58px] w-12 grid place-items-center text-muted hover:text-ink cursor-pointer disabled:opacity-50 transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Ghi nhớ đăng nhập */}
              <div className="flex items-center justify-between text-sm pt-0">
                <label className="flex items-center gap-2.5 cursor-pointer text-ink/80 select-none">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    disabled={isSubmitting || isSuccess}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4 rounded border-line text-action focus:ring-accent cursor-pointer"
                  />
                  <span className="text-sm">Ghi nhớ đăng nhập</span>
                </label>
              </div>

              {/* Nút bấm chính: Đỏ Sơn Mài Huế */}
              <Button
                variant="default"
                size="lg"
                type="submit"
                disabled={isSubmitting || isSuccess}
                className={`w-full min-h-[58px] py-3 text-sm sm:text-base font-semibold tracking-wide gap-2.5 shadow-lg rounded-card transition-all duration-300 cursor-pointer ${
                  isSuccess
                    ? "bg-amber-600 text-white hover:bg-amber-600 scale-[1.01] shadow-amber-500/40"
                    : "bg-action text-white hover:bg-action-hover active:scale-[0.99]"
                }`}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Đang dâng nén tâm hương...</span>
                  </>
                ) : isSuccess ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-white animate-bounce" />
                    <span>Tâm ý viên mãn • Đang vào trang...</span>
                  </>
                ) : (
                  <>
                    <LogIn className="w-5 h-5" />
                    <span>Đăng nhập</span>
                  </>
                )}
              </Button>
            </form>

            {/* Dòng link nhẹ chuyển sang đăng ký (tinh gọn, không có footer riêng) */}
            <div className="text-center text-sm text-muted mt-4 pt-3 border-t border-line/40">
              <span>Chưa có tài khoản? </span>
              <button
                type="button"
                onClick={onGoToRegister}
                disabled={isSubmitting || isSuccess}
                className="text-accent font-semibold hover:underline cursor-pointer ml-1 inline-flex items-center gap-0.5"
              >
                <span>Đăng ký ngay</span>
                <span>→</span>
              </button>
            </div>
          </div>
        </section>

      </main>
    </div>
  );
};
