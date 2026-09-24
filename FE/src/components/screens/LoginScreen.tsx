import React, { useState } from 'react';
import type { ScreenType } from '@/src/types.ts';

interface LoginScreenProps {
  onNavigate: (screen: ScreenType) => void;
  onLoginSuccess?: () => void;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({ onNavigate, onLoginSuccess }) => {
  const [identifier, setIdentifier] = useState('truongtoc@nguyengiatoc.vn');
  const [password, setPassword] = useState('••••••••••••');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [authTab, setAuthTab] = useState<'login' | 'register' | 'verify' | 'forgot'>('login');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setToastMessage('Đang kết nối không gian cội nguồn gia tộc...');
    setTimeout(() => {
      setIsLoading(false);
      setToastMessage('Đăng nhập thành công! Đang chuyển hướng...');
      onLoginSuccess?.();
      setTimeout(() => {
        onNavigate('today');
      }, 700);
    }, 900);
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

          {/* Center Tabs: Đăng nhập | Đăng ký | Xác thực | Trợ giúp mật khẩu */}
          <nav className="hidden items-center justify-center gap-5 sm:flex lg:gap-8">
            <button
              type="button"
              onClick={() => setAuthTab('login')}
              className="relative py-2 text-[13.5px] font-bold text-[#80141d] transition-colors"
            >
              <span>Đăng nhập</span>
              <span className="absolute -bottom-1.5 left-0 right-0 h-[2.5px] rounded-full bg-[#80141d]" />
            </button>

            <button
              type="button"
              onClick={() => onNavigate('register')}
              className="py-2 text-[13.5px] font-medium text-[#4a362d] hover:text-[#80141d] transition-colors"
            >
              Đăng ký
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
          MAIN AUTH SECTION: 2-COLUMN SPLIT CONTAINER
          ========================================================= */}
      <main className="flex-1 px-4 py-8 sm:px-6 sm:py-12 lg:px-8 flex items-center justify-center">
        <div className="w-full max-w-[1200px] overflow-hidden rounded-3xl border border-[#dec9b6] bg-[#fbf6ef] shadow-xl">
          <div className="grid lg:grid-cols-2 items-stretch min-h-[620px]">
            {/* ---------------- LEFT COLUMN: DEEP CRIMSON HERITAGE ---------------- */}
            <div className="relative flex flex-col justify-between overflow-hidden bg-gradient-to-br from-[#80141d] via-[#751119] to-[#5e0c13] p-7 text-white sm:p-10 lg:p-12">
              {/* Decorative Concentric Rings & Genealogical Vine */}
              <div className="pointer-events-none absolute -left-20 -top-20 h-[450px] w-[450px] rounded-full border border-white/10" />
              <div className="pointer-events-none absolute -left-10 -top-10 h-[320px] w-[320px] rounded-full border border-white/10" />
              <div className="pointer-events-none absolute left-10 top-0 bottom-0 w-px bg-white/10" />

              {/* Top Tag Row */}
              <div className="relative z-10 flex items-center justify-between text-[11px] font-semibold tracking-wider text-white/80">
                <div className="flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[15px] text-[#dbcaa8]">account_tree</span>
                  <span>ĐẠI TỘC KÝ ỨC • CHI NHÁNH CỘI NGUỒN</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-[14px] text-[#dbcaa8]">hourglass_bottom</span>
                  <span>Bảo Tồn Thế Hệ</span>
                </div>
              </div>

              {/* Center: Overlapping Heritage Photo Cards */}
              <div className="relative z-10 my-8">
                <div className="relative mx-auto max-w-[380px]">
                  {/* Photo 1: Vintage 1955 Original (Tilted Left) */}
                  <div className="relative w-48 rounded-xl border border-white/20 bg-[#f7eee2] p-2.5 shadow-2xl rotate-[-6deg] transition-transform hover:rotate-[-4deg]">
                    <div className="relative aspect-[3/4] overflow-hidden rounded-lg bg-[#2b1b15]">
                      <div className="flex h-full w-full items-center justify-center bg-gradient-to-b from-[#3a261f] to-[#1a110c] text-center p-3">
                        <span className="material-symbols-outlined text-[44px] text-[#dbcaa8]/60">groups</span>
                      </div>
                      <span className="absolute bottom-1.5 left-1.5 rounded bg-black/75 px-2 py-0.5 text-[9px] font-bold text-white">
                        Bản Gốc 1955
                      </span>
                    </div>
                  </div>

                  {/* Photo 2: Restored Vibrant Color Portrait (Front Right) */}
                  <div className="absolute right-0 top-6 w-56 rounded-xl border-2 border-[#dbcaa8] bg-[#fdf9f4] p-3 shadow-2xl rotate-[3deg] transition-transform hover:rotate-[1deg]">
                    <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-[#2b1b15]">
                      <div className="flex h-full w-full items-center justify-center bg-gradient-to-b from-[#4a1217] to-[#260508] p-3 text-center">
                        <span className="material-symbols-outlined text-[48px] text-[#dbcaa8]">temple_buddhist</span>
                      </div>
                      <span className="absolute right-2 top-2 inline-flex items-center gap-1 rounded-full bg-[#80141d] px-2 py-0.5 text-[9px] font-bold text-white shadow">
                        <span className="material-symbols-outlined text-[11px]">auto_fix_high</span>
                        <span>Đã phục chế AI</span>
                      </span>
                    </div>

                    <div className="mt-2.5 flex items-center justify-between">
                      <div>
                        <strong className="block font-serif text-[13px] font-bold text-[#2b1b15]">
                          Cố Cụ Nguyễn Văn Phúc
                        </strong>
                        <span className="text-[10px] text-[#715b50]">
                          Đời thứ 11 • Tộc Nguyễn Trực Lăng
                        </span>
                      </div>
                      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#c9892c] text-white">
                        <span className="material-symbols-outlined text-[13px]">verified</span>
                      </span>
                    </div>
                  </div>

                  {/* Parchment Quote Note (Overlapping Lower Left) */}
                  <div className="relative mt-20 max-w-[260px] rounded-xl border border-[#dec9b6] bg-[#fbf5ee] p-3.5 shadow-lg text-[#2b1b15]">
                    <span className="block text-[9px] font-bold uppercase tracking-wider text-[#80141d]">
                      GIA HUẤN BÚT TÍCH • MỰC NHO
                    </span>
                    <p className="mt-1 font-serif text-[11.5px] italic leading-relaxed text-[#4a362d]">
                      &ldquo;Uống nước nhớ nguồn, ngàn năm bia miệng chẳng phai danh thơm tộc họ.&rdquo;
                    </p>
                    <span className="mt-1 block text-right text-[9.5px] text-[#715b50]">
                      — Trích gia phả Xuân Ất Mùi (1955)
                    </span>
                  </div>
                </div>
              </div>

              {/* Bottom Big Quotation & Statistics */}
              <div className="relative z-10 pt-4 border-t border-white/15">
                <div className="h-1 w-10 rounded-full bg-[#c9892c] mb-3" />
                <p className="font-serif text-[16px] italic leading-snug text-white sm:text-[18px]">
                  &ldquo;Mỗi bức ảnh cũ là một câu chuyện, mỗi gia đình là một dòng chảy bất tận.&rdquo;
                </p>
                <div className="mt-3 flex items-center gap-5 text-[11.5px] text-white/80 font-medium">
                  <div className="flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[16px] text-[#dbcaa8]">shield</span>
                    <span>142 Đời Lưu Truyền</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[16px] text-[#dbcaa8]">photo_library</span>
                    <span>2.4 Triệu Kỷ Niệm</span>
                  </div>
                </div>
              </div>
            </div>

            {/* ---------------- RIGHT COLUMN: WARM BEIGE AUTH FORM ---------------- */}
            <div className="flex flex-col justify-between bg-[#fdf9f4] p-7 sm:p-10 lg:p-12">
              <div>
                {/* Top Meta: Cổng xác thực & Language Pill */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-[11px] font-bold text-[#715b50]">
                    <span className="h-2 w-2 rounded-full bg-[#c9892c]" />
                    <span>CỔNG XÁC THỰC GIA TỘC</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1 rounded-full border border-[#dec9b6] bg-[#f5ece2] px-2.5 py-1 text-[11px] font-semibold text-[#543e34]">
                      <span>VI</span>
                      <span className="material-symbols-outlined text-[13px]">arrow_drop_down</span>
                    </div>
                    <div className="flex h-7 w-7 items-center justify-center rounded-full border border-[#dec9b6] bg-[#f5ece2] text-[#715b50]">
                      <span className="material-symbols-outlined text-[15px]">brightness_medium</span>
                    </div>
                  </div>
                </div>

                {/* Heading */}
                <div className="mt-6">
                  <h1 className="font-serif text-3xl font-bold text-[#80141d] sm:text-4xl">
                    Đăng nhập Gia tộc
                  </h1>
                  <p className="mt-2 text-[13px] leading-relaxed text-[#715b50]">
                    Trở về với không gian lưu giữ ký ức và cội nguồn tổ tiên
                  </p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                  {/* Email / SĐT Input */}
                  <div>
                    <label className="block text-[12px] font-semibold text-[#2b1b15] mb-1.5">
                      Email hoặc Số điện thoại gia tộc
                    </label>
                    <div className="relative">
                      <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-[18px] text-[#a07a68]">
                        badge
                      </span>
                      <input
                        type="text"
                        required
                        value={identifier}
                        onChange={(e) => setIdentifier(e.target.value)}
                        placeholder="truongtoc@nguyengiatoc.vn hoặc 090..."
                        className="w-full rounded-xl border border-[#decab7] bg-[#f5ece2] py-3 pl-11 pr-4 text-[13px] text-[#2b1b15] placeholder-[#a08577] focus:border-[#80141d] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#80141d]"
                      />
                    </div>
                  </div>

                  {/* Password Input */}
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="text-[12px] font-semibold text-[#2b1b15]">
                        Mật khẩu lưu truyền
                      </label>
                      <button
                        type="button"
                        onClick={() => onNavigate('forgot-password')}
                        className="text-[11.5px] font-semibold text-[#80141d] hover:underline"
                      >
                        Quên mật khẩu?
                      </button>
                    </div>
                    <div className="relative">
                      <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-[18px] text-[#a07a68]">
                        lock
                      </span>
                      <input
                        type={showPassword ? 'text' : 'password'}
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Nhập mật khẩu an toàn..."
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

                  {/* Remember Me Checkbox */}
                  <div className="flex items-center justify-between pt-1">
                    <label className="flex items-center gap-2 cursor-pointer text-[12px] text-[#543e34]">
                      <input
                        type="checkbox"
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
                        className="h-4 w-4 rounded border-[#decab7] text-[#80141d] focus:ring-[#80141d]"
                      />
                      <span>Ghi nhớ phiên đăng nhập gia tộc</span>
                    </label>
                    <span className="rounded-md border border-[#dec9b6] bg-[#faefe3] px-2 py-0.5 text-[10px] font-bold text-[#715b50]">
                      30 ngày an toàn
                    </span>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#80141d] py-3.5 text-[13.5px] font-bold text-white shadow-md transition-all hover:bg-[#680f16] hover:shadow-lg active:scale-[0.99] disabled:opacity-75"
                    >
                      <span>{isLoading ? 'Đang xác thực...' : 'Vào Không Gian Gia Tộc'}</span>
                      <span className="material-symbols-outlined text-[17px]">arrow_forward</span>
                    </button>
                  </div>
                </form>

                {/* Divider: HOẶC TIẾP TỤC VỚI */}
                <div className="my-5 flex items-center gap-3">
                  <div className="h-px flex-1 bg-[#decab7]" />
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#a07a68]">
                    HOẶC TIẾP TỤC VỚI
                  </span>
                  <div className="h-px flex-1 bg-[#decab7]" />
                </div>

                {/* Google Sign In */}
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
                  <span>Đăng nhập với Google</span>
                </button>

                {/* Register Link */}
                <p className="mt-4 text-center text-[12px] text-[#6c5549]">
                  Chưa có tài khoản lưu danh gia tộc?{' '}
                  <button
                    type="button"
                    onClick={() => onNavigate('register')}
                    className="font-bold text-[#80141d] hover:underline"
                  >
                    Đăng ký lập phả ký ngay
                  </button>
                </p>
              </div>

              {/* Bottom Security Badge */}
              <div className="mt-6 rounded-xl border border-[#dec9b6] bg-[#f5ece2] p-3">
                <div className="flex items-start gap-2.5 text-[11px] text-[#715b50]">
                  <span className="material-symbols-outlined text-[17px] text-[#80141d] shrink-0 mt-0.5">
                    verified_user
                  </span>
                  <span>
                    Không gian gia đình riêng tư 100% • Dữ liệu mã hóa chuẩn phân quyền tộc phái
                  </span>
                </div>
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
