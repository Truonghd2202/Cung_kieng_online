import React, { useState } from 'react';
import type { ScreenType } from '@/src/types.ts';

interface RegisterScreenProps {
  onNavigate: (screen: ScreenType) => void;
}

export const RegisterScreen: React.FC<RegisterScreenProps> = ({ onNavigate }) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(true);
  const [agreeAIEthics, setAgreeAIEthics] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Password rules validation
  const hasMinLen = password.length >= 8;
  const hasUpper = /[A-Z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSpecial = /[@#$%!&*^~]/.test(password);

  const getStrengthMeta = () => {
    if (!password) return { label: 'Chưa nhập', color: 'text-[#8a6f62]' };
    const passed = [hasMinLen, hasUpper, hasNumber, hasSpecial].filter(Boolean).length;
    if (passed <= 1) return { label: 'Yếu', color: 'text-rose-600' };
    if (passed === 2) return { label: 'Trung bình', color: 'text-amber-600' };
    if (passed === 3) return { label: 'Khá', color: 'text-emerald-600' };
    return { label: 'Rất mạnh', color: 'text-[#80141d] font-bold' };
  };

  const strength = getStrengthMeta();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreeTerms) {
      alert('Vui lòng đồng ý với Điều khoản Dịch vụ và Quy chế Bảo mật để tiếp tục.');
      return;
    }
    if (password && confirmPassword && password !== confirmPassword) {
      alert('Mật khẩu xác nhận không khớp.');
      return;
    }
    setIsLoading(true);
    setToastMessage('Đang khởi tạo không gian gia tộc...');
    setTimeout(() => {
      setIsLoading(false);
      setToastMessage('Khởi tạo thành công! Tiến hành thiết lập không gian...');
      setTimeout(() => {
        onNavigate('chon-khong-gian');
      }, 700);
    }, 1000);
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-[#f7eee2] text-[#2b1b15] selection:bg-[#ecd4c0] selection:text-[#4a1217]">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 right-6 z-50 flex items-center gap-3 rounded-xl border border-[#dec9b6] bg-[#2b1b15] px-5 py-3 text-white shadow-2xl animate-in fade-in slide-in-from-top-2 duration-200">
          <span className="material-symbols-outlined text-[#c9892c]">temple_buddhist</span>
          <span className="text-[13px] font-medium">{toastMessage}</span>
        </div>
      )}

      {/* =========================================================
          TOP AUTH HEADER (Matching screenshot)
          ========================================================= */}
      <header className="border-b border-[#e4d3c2] bg-[#f7eee2]/95 backdrop-blur-md">
        <div className="mx-auto flex h-[68px] max-w-[1400px] items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Logo */}
          <div className="flex shrink-0 items-center">
            <button
              type="button"
              onClick={() => onNavigate('guest-landing')}
              className="group flex items-center gap-2.5 text-left transition-transform active:scale-[0.98]"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#80141d] text-white shadow-sm transition-transform duration-200 group-hover:scale-105">
                <span className="material-symbols-outlined text-[22px]">temple_buddhist</span>
              </span>
              <span className="flex flex-col">
                <span className="font-serif text-[18px] sm:text-[19px] font-bold leading-tight tracking-tight text-[#80141d]">
                  Thích Cúng Kiếng
                </span>
                <span className="text-[8.5px] font-bold uppercase tracking-[0.18em] text-[#80141d]/90">
                  DI SẢN & KÝ ỨC GIA TỘC
                </span>
              </span>
            </button>
          </div>

          {/* Center Tabs: Đăng nhập | Đăng ký (Active) | Xác thực | Trợ giúp mật khẩu */}
          <nav className="hidden items-center justify-center gap-5 sm:flex lg:gap-8">
            <button
              type="button"
              onClick={() => onNavigate('login')}
              className="py-2 text-[13.5px] font-medium text-[#4a362d] hover:text-[#80141d] transition-colors"
            >
              Đăng nhập
            </button>

            <button
              type="button"
              className="relative py-2 text-[13.5px] font-bold text-[#80141d] transition-colors"
            >
              <span>Đăng ký</span>
              <span className="absolute -bottom-1.5 left-0 right-0 h-[2.5px] rounded-full bg-[#80141d]" />
            </button>

            <button
              type="button"
              onClick={() => onNavigate('bao-mat-tai-khoan')}
              className="py-2 text-[13.5px] font-medium text-[#4a362d] hover:text-[#80141d] transition-colors"
            >
              Xác thực
            </button>

            <button
              type="button"
              onClick={() => onNavigate('forgot-password')}
              className="py-2 text-[13.5px] font-medium text-[#4a362d] hover:text-[#80141d] transition-colors"
            >
              Trợ giúp mật khẩu
            </button>
          </nav>

          {/* Right Actions: Về trang chủ | Theme | Avatar */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => onNavigate('guest-landing')}
              className="hidden items-center gap-1.5 text-[12.5px] font-semibold text-[#4a362d] hover:text-[#80141d] sm:inline-flex transition-colors"
            >
              <span className="material-symbols-outlined text-[16px]">arrow_back</span>
              <span>Về trang chủ</span>
            </button>

            {/* Theme Toggle Icon Button */}
            <div className="flex h-8 w-8 items-center justify-center rounded-full border border-[#dec9b6] bg-[#fbf5ee] text-[#715b50]">
              <span className="material-symbols-outlined text-[17px]">light_mode</span>
            </div>

            {/* Avatar Circle */}
            <button
              type="button"
              onClick={() => onNavigate('ho-so-ca-nhan')}
              className="flex h-8 w-8 items-center justify-center rounded-full bg-[#80141d] text-white shadow-xs hover:bg-[#680f16] transition-colors"
              title="Tài khoản gia tộc"
            >
              <span className="material-symbols-outlined text-[18px]">person</span>
            </button>
          </div>
        </div>
      </header>

      {/* =========================================================
          MAIN AUTH SECTION: ELEGANT CENTERED REGISTER CARD
          ========================================================= */}
      <main className="flex-1 px-4 py-8 sm:px-6 sm:py-12 lg:px-8 flex items-center justify-center">
        <div className="w-full max-w-[760px] overflow-hidden rounded-3xl border border-[#dec9b6] bg-[#fdf9f4] p-7 shadow-xl sm:p-10 lg:p-12">
          {/* Header of the Card */}
          <div className="text-center">
            {/* Ancestral Sun / Wheel Seal Emblem */}
            <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full border-2 border-[#dbcaa8] bg-[#fbf5ee] shadow-sm">
              <svg className="h-8 w-8 text-[#c9892c]" viewBox="0 0 40 40" fill="currentColor">
                <circle cx="20" cy="20" r="6" fill="none" stroke="currentColor" strokeWidth="2" />
                <circle cx="20" cy="20" r="2.5" fill="currentColor" />
                {Array.from({ length: 12 }).map((_, i) => (
                  <line
                    key={i}
                    x1={20 + 8 * Math.cos((i * Math.PI) / 6)}
                    y1={20 + 8 * Math.sin((i * Math.PI) / 6)}
                    x2={20 + 15 * Math.cos((i * Math.PI) / 6)}
                    y2={20 + 15 * Math.sin((i * Math.PI) / 6)}
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                  />
                ))}
              </svg>
            </div>

            <p className="text-[10.5px] font-bold uppercase tracking-[0.2em] text-[#80141d]">
              GIA QUY • TÔN KÍNH • TRUYỀN THỪA
            </p>

            <h1 className="mt-2 font-serif text-3xl font-bold text-[#80141d] sm:text-4xl">
              Khởi Tạo Không Gian Gia Tộc
            </h1>

            <p className="mx-auto mt-2 max-w-lg text-[13px] leading-relaxed text-[#715b50]">
              Bắt đầu hành trình số hóa phả hệ, phục chế ảnh cũ và lưu truyền ký ức hương hỏa trọn vẹn cho muôn đời sau.
            </p>

            {/* Gold Accent Line */}
            <div className="mx-auto mt-4 h-1 w-12 rounded-full bg-[#c9892c]" />
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="mt-8 space-y-4">
            {/* Full Name */}
            <div>
              <label className="block text-[12px] font-semibold text-[#2b1b15] mb-1.5">
                Họ và tên đầy đủ <span className="text-[#80141d]">*</span>
              </label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-[18px] text-[#a07a68]">
                  badge
                </span>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Ví dụ: Nguyễn Phúc Anh"
                  className="w-full rounded-xl border border-[#decab7] bg-[#f5ece2] py-3 pl-11 pr-4 text-[13px] text-[#2b1b15] placeholder-[#a08577] focus:border-[#80141d] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#80141d]"
                />
              </div>
              <span className="mt-1 block text-[11px] text-[#8a6f62]">
                Ghi danh theo đúng tên khai sinh hoặc tên ghi trong sổ họ.
              </span>
            </div>

            {/* Email & Phone (2 cols) */}
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-[12px] font-semibold text-[#2b1b15] mb-1.5">
                  Email liên hệ gia đình <span className="text-[#80141d]">*</span>
                </label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-[18px] text-[#a07a68]">
                    mail
                  </span>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="nguyenphuc@gmail.com"
                    className="w-full rounded-xl border border-[#decab7] bg-[#f5ece2] py-3 pl-11 pr-4 text-[13px] text-[#2b1b15] placeholder-[#a08577] focus:border-[#80141d] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#80141d]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[12px] font-semibold text-[#2b1b15] mb-1.5">
                  Số điện thoại di động <span className="text-[#80141d]">*</span>
                </label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-[18px] text-[#a07a68]">
                    phone
                  </span>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="0912 345 678"
                    className="w-full rounded-xl border border-[#decab7] bg-[#f5ece2] py-3 pl-11 pr-4 text-[13px] text-[#2b1b15] placeholder-[#a08577] focus:border-[#80141d] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#80141d]"
                  />
                </div>
              </div>
            </div>

            {/* Password & Confirm (2 cols) */}
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-[12px] font-semibold text-[#2b1b15] mb-1.5">
                  Mật khẩu truy cập <span className="text-[#80141d]">*</span>
                </label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-[18px] text-[#a07a68]">
                    lock
                  </span>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full rounded-xl border border-[#decab7] bg-[#f5ece2] py-3 pl-11 pr-11 text-[13px] text-[#2b1b15] placeholder-[#a08577] focus:border-[#80141d] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#80141d]"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#a07a68] hover:text-[#2b1b15]"
                  >
                    <span className="material-symbols-outlined text-[19px]">
                      {showPassword ? 'visibility_off' : 'visibility'}
                    </span>
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-[12px] font-semibold text-[#2b1b15] mb-1.5">
                  Xác nhận lại mật khẩu <span className="text-[#80141d]">*</span>
                </label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-[18px] text-[#a07a68]">
                    lock_reset
                  </span>
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full rounded-xl border border-[#decab7] bg-[#f5ece2] py-3 pl-11 pr-11 text-[13px] text-[#2b1b15] placeholder-[#a08577] focus:border-[#80141d] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#80141d]"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#a07a68] hover:text-[#2b1b15]"
                  >
                    <span className="material-symbols-outlined text-[19px]">
                      {showConfirmPassword ? 'visibility_off' : 'visibility'}
                    </span>
                  </button>
                </div>
              </div>
            </div>

            {/* Password Strength Requirement Box */}
            <div className="rounded-xl border border-[#dec9b6] bg-[#f5ece2] p-3 text-[11px] text-[#715b50]">
              <div className="flex items-center justify-between pb-1">
                <span className="font-semibold text-[#2b1b15]">Độ bảo mật mật khẩu:</span>
                <span className={strength.color}>{strength.label}</span>
              </div>
              <p className="mt-0.5 leading-relaxed text-[#8a6f62]">
                Yêu cầu: Ít nhất 8 ký tự, bao gồm chữ in hoa, chữ số và ít nhất một ký tự đặc biệt (@, #, $, %, !).
              </p>
            </div>

            {/* Checkbox 1: Terms Agreement */}
            <div className="pt-1">
              <label className="flex items-start gap-2.5 cursor-pointer text-[12px] leading-relaxed text-[#543e34]">
                <input
                  type="checkbox"
                  checked={agreeTerms}
                  onChange={(e) => setAgreeTerms(e.target.checked)}
                  className="mt-0.5 h-4 w-4 rounded border-[#decab7] text-[#80141d] focus:ring-[#80141d]"
                />
                <span>
                  Tôi đồng ý với{' '}
                  <button
                    type="button"
                    onClick={() => onNavigate('privacy-security')}
                    className="font-semibold text-[#80141d] underline"
                  >
                    Điều khoản Dịch vụ
                  </button>{' '}
                  và{' '}
                  <button
                    type="button"
                    onClick={() => onNavigate('privacy-security')}
                    className="font-semibold text-[#80141d] underline"
                  >
                    Quy chế Bảo mật Dữ liệu Di sản
                  </button>{' '}
                  của Thích Cúng Kiếng.
                </span>
              </label>
            </div>

            {/* Checkbox 2: Special AI Ethics & Privacy Box */}
            <div className="rounded-xl border border-[#dec9b6] bg-[#fbf5ee] p-3.5">
              <label className="flex items-start gap-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={agreeAIEthics}
                  onChange={(e) => setAgreeAIEthics(e.target.checked)}
                  className="mt-0.5 h-4 w-4 rounded border-[#decab7] text-[#80141d] focus:ring-[#80141d]"
                />
                <div>
                  <div className="flex items-center gap-1.5 text-[12px] font-bold text-[#80141d]">
                    <span className="material-symbols-outlined text-[16px]">verified</span>
                    <span>Cam kết xử lý ảnh bằng AI thuần Việt & bảo mật khép kín</span>
                  </div>
                  <p className="mt-1 text-[11px] leading-relaxed text-[#715b50]">
                    Ảnh phục chế chỉ lưu trữ riêng trong không gian số của gia đình, tuyệt đối không dùng để huấn luyện mô hình AI mở và không thương mại hóa bên ngoài.
                  </p>
                </div>
              </label>
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isLoading}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#80141d] py-3.5 text-[13.5px] font-bold text-white shadow-md transition-all hover:bg-[#680f16] hover:shadow-lg active:scale-[0.99] disabled:opacity-75"
              >
                <span className="material-symbols-outlined text-[18px]">menu_book</span>
                <span>{isLoading ? 'Đang khởi tạo...' : 'Đăng Ký Tài Khoản Gia Tộc'}</span>
              </button>
            </div>
          </form>

          {/* Divider: HOẶC */}
          <div className="my-5 flex items-center gap-3">
            <div className="h-px flex-1 bg-[#decab7]" />
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#a07a68]">
              HOẶC
            </span>
            <div className="h-px flex-1 bg-[#decab7]" />
          </div>

          {/* Google Quick Registration */}
          <button
            type="button"
            onClick={handleSubmit}
            className="flex w-full items-center justify-center gap-2.5 rounded-xl border border-[#decab7] bg-[#f5ece2] py-2.5 text-[13px] font-semibold text-[#2b1b15] shadow-2xs transition-all hover:bg-[#ede0d1] active:scale-[0.99]"
          >
            <svg className="h-4 w-4" viewBox="0 0 24 24">
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
            <span>Đăng ký nhanh qua Google</span>
          </button>

          {/* Already have an account link */}
          <p className="mt-5 text-center text-[12.5px] text-[#6c5549]">
            Đã có tài khoản gia đình?{' '}
            <button
              type="button"
              onClick={() => onNavigate('login')}
              className="font-bold text-[#80141d] hover:underline"
            >
              Đăng nhập ngay
            </button>
          </p>

          {/* 3 Trust Badges at Bottom of Card */}
          <div className="mt-8 border-t border-[#decab7] pt-5">
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 text-center">
              <div className="flex items-center justify-center gap-1.5 text-[11px] font-semibold text-[#543e34]">
                <span className="material-symbols-outlined text-[16px] text-[#80141d]">shield</span>
                <span>Mã hóa AES-256</span>
              </div>
              <div className="flex items-center justify-center gap-1.5 text-[11px] font-semibold text-[#543e34]">
                <span className="material-symbols-outlined text-[16px] text-[#80141d]">account_balance</span>
                <span>Quyền sở hữu 100% dòng họ</span>
              </div>
              <div className="flex items-center justify-center gap-1.5 text-[11px] font-semibold text-[#543e34]">
                <span className="material-symbols-outlined text-[16px] text-[#80141d]">workspace_premium</span>
                <span>Bảo mật gia tộc chuẩn quốc tế</span>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* =========================================================
          BOTTOM AUTH FOOTER (Matching screenshot)
          ========================================================= */}
      <footer className="border-t border-[#e4d3c2] bg-[#f7eee2] px-4 py-4 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-[1400px] flex-col items-center justify-between gap-3 text-[11.5px] text-[#715b50] md:flex-row">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[17px] text-[#80141d]">shield</span>
            <span>Bảo mật gia phả & dữ liệu hương hỏa tuyệt đối theo quy ước gia tộc</span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
            <button
              type="button"
              onClick={() => onNavigate('privacy-security')}
              className="hover:text-[#80141d] hover:underline"
            >
              Chính sách bảo mật
            </button>
            <button
              type="button"
              onClick={() => onNavigate('privacy-security')}
              className="hover:text-[#80141d] hover:underline"
            >
              Quy chế bảo tồn di sản
            </button>
            <span>Hỗ trợ dòng tộc: hotro@thiccungkieng.vn</span>
          </div>

          <div>
            <span>© 2024 Thích Cúng Kiếng. Giữ ký ức – Nối cội nguồn.</span>
          </div>
        </div>
      </footer>
    </div>
  );
};
