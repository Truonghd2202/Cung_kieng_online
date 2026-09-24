import React, { useState } from 'react';
import type { ScreenType } from '@/src/types.ts';

interface ForgotPasswordScreenProps {
  onNavigate: (screen: ScreenType) => void;
}

export const ForgotPasswordScreen: React.FC<ForgotPasswordScreenProps> = ({ onNavigate }) => {
  const [identifier, setIdentifier] = useState('nguyenphuc@gmail.com');
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!identifier.trim()) return;
    setIsLoading(true);
    setToastMessage('Đang khởi tạo mã khôi phục bảo mật...');
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
      setToastMessage('Đã gửi mã khôi phục và hướng dẫn đến kênh liên hệ của bạn!');
    }, 800);
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

          {/* Center Tabs: Đăng nhập | Đăng ký | Xác thực | Trợ giúp mật khẩu (Active) */}
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
              className="relative py-2 text-[13.5px] font-bold text-[#80141d] transition-colors"
            >
              <span>Trợ giúp mật khẩu</span>
              <span className="absolute -bottom-1.5 left-0 right-0 h-[2.5px] rounded-full bg-[#80141d]" />
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
          MAIN AUTH SECTION: CENTERED RECOVERY CARD & 3 SUPPORT TILES
          ========================================================= */}
      <main className="flex-1 px-4 py-8 sm:px-6 sm:py-12 lg:px-8 flex flex-col items-center justify-center">
        {/* Main Recovery Card */}
        <div className="w-full max-w-[560px] overflow-hidden rounded-3xl border border-[#dec9b6] bg-[#fdf9f4] p-7 shadow-xl sm:p-10 text-center">
          {/* Top Emblem: Soft Peach Circle with Bell & Key badge */}
          <div className="relative mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#faefe3]">
            <span className="material-symbols-outlined text-[30px] text-[#80141d]">notifications</span>
            <span className="absolute bottom-0 right-0 flex h-6 w-6 items-center justify-center rounded-full bg-[#80141d] text-white shadow-sm ring-2 ring-[#fdf9f4]">
              <span className="material-symbols-outlined text-[13px]">key</span>
            </span>
          </div>

          {/* Badge */}
          <div className="inline-flex items-center gap-1.5 rounded-full border border-[#dec9b6] bg-[#f5ece2] px-3.5 py-1 text-[10.5px] font-bold text-[#80141d]">
            <span className="material-symbols-outlined text-[13px]">shield</span>
            <span>BẢO TOÀN HƯƠNG HỎA & GIA PHẢ</span>
          </div>

          {/* Title & Subtitle */}
          <h1 className="mt-3 font-serif text-2xl sm:text-3xl font-bold text-[#2b1b15]">
            Khôi Phục Mật Khẩu Gia Tộc
          </h1>
          <p className="mt-2 text-[12.5px] leading-relaxed text-[#715b50]">
            Đừng lo lắng, chúng tôi sẽ hỗ trợ Trưởng tộc và Thành viên khôi phục quyền truy cập vào không gian gia đình một cách an toàn và bảo mật nhất.
          </p>

          {/* Sparkle divider icon */}
          <div className="my-4 flex items-center justify-center text-[#c9892c]">
            <span className="material-symbols-outlined text-[18px]">auto_awesome</span>
          </div>

          {/* Recovery Form */}
          <form onSubmit={handleSubmit} className="text-left space-y-4">
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="flex items-center gap-1.5 text-[12px] font-semibold text-[#2b1b15]">
                  <span className="material-symbols-outlined text-[16px] text-[#80141d]">badge</span>
                  <span>Email đăng ký hoặc Số điện thoại gia đình</span>
                </label>
                <span className="text-[10.5px] font-medium text-[#8a6f62]">Bắt buộc</span>
              </div>
              <div className="relative">
                <input
                  type="text"
                  required
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  placeholder="e.g. nguyenphuc@gmail.com hoặc 0912 345 678"
                  className="w-full rounded-xl border border-[#decab7] bg-[#f5ece2] py-3 pl-4 pr-11 text-[13px] text-[#2b1b15] placeholder-[#a08577] focus:border-[#80141d] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#80141d]"
                />
                <span className="material-symbols-outlined absolute right-3.5 top-1/2 -translate-y-1/2 text-[19px] text-[#a07a68]">
                  alternate_email
                </span>
              </div>
            </div>

            {/* Instruction Callout Box */}
            <div className="rounded-xl border border-[#decab7] bg-[#f8ede2] p-3.5 text-[11.5px] text-[#6c5549]">
              <div className="flex items-start gap-2.5">
                <span className="material-symbols-outlined text-[18px] text-[#80141d] shrink-0 mt-0.5">
                  info
                </span>
                <div>
                  <strong className="block font-bold text-[#2b1b15] mb-0.5">
                    Hướng dẫn khôi phục
                  </strong>
                  <span>
                    Hệ thống sẽ gửi một liên kết bảo mật hoặc mã OTP 6 số tạm thời có thời hạn 15 phút đến kênh liên hệ bạn đã đăng ký để thiết lập mật khẩu mới.
                  </span>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#80141d] py-3.5 text-[13.5px] font-bold text-white shadow-md transition-all hover:bg-[#680f16] hover:shadow-lg active:scale-[0.99] disabled:opacity-75"
            >
              <span className="material-symbols-outlined text-[18px]">mail</span>
              <span>{isLoading ? 'Đang gửi...' : 'Gửi Hướng Dẫn Khôi Phục'}</span>
            </button>

            {/* Warning / Alternative notice box */}
            <div className="rounded-xl border border-[#decab7] bg-[#f8ede2] p-3.5 text-[11.5px] text-[#6c5549]">
              <div className="flex items-start gap-2.5">
                <span className="material-symbols-outlined text-[18px] text-[#8a6f62] shrink-0 mt-0.5">
                  help_outline
                </span>
                <span>
                  Nếu số điện thoại/email cũ không còn sử dụng, vui lòng nhờ <strong className="text-[#2b1b15]">Trưởng tộc</strong> cấp lại liên kết mời gia đình hoặc liên hệ chuyên viên hỗ trợ.
                </span>
              </div>
            </div>
          </form>

          {/* Back to Login Link */}
          <div className="mt-5 text-center">
            <button
              type="button"
              onClick={() => onNavigate('login')}
              className="inline-flex items-center gap-1.5 text-[12.5px] font-bold text-[#80141d] hover:underline transition-colors"
            >
              <span>←</span>
              <span>Quay Lại Đăng nhập</span>
            </button>
          </div>
        </div>

        {/* 3 Bottom Support / Security Cards Underneath */}
        <div className="mt-8 grid w-full max-w-[840px] grid-cols-1 gap-4 sm:grid-cols-3">
          {/* Card 1 */}
          <div className="flex items-start gap-3 rounded-2xl border border-[#dec9b6] bg-[#fbf6ef] p-4 shadow-2xs">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#faefe3] text-[#80141d]">
              <span className="material-symbols-outlined text-[19px]">key</span>
            </div>
            <div>
              <strong className="block text-[12px] font-bold text-[#2b1b15]">
                Mật khẩu cấp riêng biệt
              </strong>
              <p className="mt-0.5 text-[11px] leading-relaxed text-[#715b50]">
                Bảo mật đa tầng cho gia phả, chỉ người trong dòng tộc mới được phép ghi chép sổ bộ.
              </p>
            </div>
          </div>

          {/* Card 2 */}
          <div className="flex items-start gap-3 rounded-2xl border border-[#dec9b6] bg-[#fbf6ef] p-4 shadow-2xs">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#f5e9dc] text-[#c9892c]">
              <span className="material-symbols-outlined text-[19px]">verified_user</span>
            </div>
            <div>
              <strong className="block text-[12px] font-bold text-[#2b1b15]">
                Phê chuẩn bởi Trưởng tộc
              </strong>
              <p className="mt-0.5 text-[11px] leading-relaxed text-[#715b50]">
                Khi mất thiết bị xác thực, có thể nhờ ban quản trị cội nguồn chi phái cấp quyền lại.
              </p>
            </div>
          </div>

          {/* Card 3 */}
          <div className="flex items-start gap-3 rounded-2xl border border-[#dec9b6] bg-[#fbf6ef] p-4 shadow-2xs">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#faefe3] text-[#80141d]">
              <span className="material-symbols-outlined text-[19px]">support_agent</span>
            </div>
            <div>
              <strong className="block text-[12px] font-bold text-[#2b1b15]">
                Tổng đài truyền thống
              </strong>
              <p className="mt-0.5 text-[11px] leading-relaxed text-[#715b50]">
                Luôn sẵn sàng hỗ trợ các bậc cao niên và gia đình thao tác lưu trữ di sản hương hỏa.
              </p>
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
