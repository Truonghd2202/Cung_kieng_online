import React, { useState } from 'react';
import type { ReactNode } from 'react';
import type { ScreenType } from '@/src/types.ts';

interface MarketingShellProps {
  currentScreen: ScreenType;
  onNavigate: (screen: ScreenType) => void;
  onLogout?: () => void;
  children: ReactNode;
}

const navLinks: Array<{ id: ScreenType; label: string }> = [
  { id: 'guest-landing', label: 'Trang chủ' },
  { id: 'platform-features', label: 'Tính năng' },
  { id: 'privacy-security', label: 'Bảo mật & Quyền riêng tư' },
  { id: 'pricing', label: 'Bảng giá' },
  { id: 'cam-nang-nghi-le', label: 'Hướng dẫn nghi lễ' },
];

export const MarketingShell: React.FC<MarketingShellProps> = ({ currentScreen, onNavigate, onLogout, children }) => {
  const [showUserDropdown, setShowUserDropdown] = useState(false);

  return (
    <div className="min-h-screen bg-[#f7eee2] text-[#2b1b15] selection:bg-[#ecd4c0] selection:text-[#4a1217]">
      {/* Global Header - Exactly matches reference screenshot */}
      <header className="sticky top-0 z-50 border-b border-[#e4d3c2] bg-[#f7eee2]/95 backdrop-blur-md shadow-[0_1px_8px_rgba(43,27,21,0.03)] transition-all">
        <div className="mx-auto flex h-[68px] max-w-[1400px] items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Brand Logo */}
          <div className="flex shrink-0 items-center">
            <button
              type="button"
              onClick={() => onNavigate('guest-landing')}
              className="group flex items-center gap-2.5 text-left transition-transform duration-200 active:scale-[0.98]"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#80141d] text-white shadow-sm transition-all duration-300 group-hover:scale-105">
                <span className="material-symbols-outlined text-[22px]">
                  temple_buddhist
                </span>
              </span>
              <span className="flex flex-col">
                <span className="font-serif text-[18px] sm:text-[19px] font-bold leading-tight tracking-tight text-[#80141d] transition-colors duration-200 group-hover:text-[#680f16]">
                  thích cúng kiếng
                </span>
                <span className="text-[8.5px] font-bold uppercase tracking-[0.18em] text-[#80141d]/90">
                  KÝ ỨC SỐ · HỘI TỤ AN NHIÊN
                </span>
              </span>
            </button>
          </div>

          {/* Desktop Navigation - 5 items matching reference */}
          <nav className="hidden items-center justify-center gap-4 lg:flex xl:gap-7 flex-1 px-4">
            {navLinks.map((link) => {
              const isActive = currentScreen === link.id;

              return (
                <button
                  key={link.id}
                  type="button"
                  onClick={() => onNavigate(link.id)}
                  className={`relative whitespace-nowrap px-2 py-1 text-[13px] xl:text-[13.5px] tracking-normal transition-all duration-150 active:scale-95 ${
                    isActive
                      ? 'font-bold text-[#80141d]'
                      : 'font-medium text-[#4a362d] hover:text-[#80141d]'
                  }`}
                >
                  <span>{link.label}</span>
                  {isActive && (
                    <span className="absolute -bottom-2 left-2 right-2 h-[2.5px] rounded-full bg-[#80141d]" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Actions: Đăng nhập | [ Bắt đầu miễn phí ] | [👤] */}
          <div className="relative flex shrink-0 items-center gap-3 sm:gap-3.5">
            {/* Đăng nhập */}
            <button
              type="button"
              onClick={() => onNavigate('login')}
              className="text-[13px] font-semibold text-[#4a362d] hover:text-[#80141d] transition-colors px-1 py-1"
            >
              Đăng nhập
            </button>

            {/* Bắt đầu miễn phí */}
            <button
              type="button"
              onClick={() => onNavigate('register')}
              className="group inline-flex whitespace-nowrap items-center rounded-full bg-[#80141d] px-4 py-2 text-[12px] sm:text-[12.5px] font-bold text-white shadow-xs transition-all duration-200 hover:bg-[#680f16] hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 active:scale-95"
            >
              <span>Bắt đầu miễn phí</span>
            </button>

            {/* Crimson Avatar Circle */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setShowUserDropdown(!showUserDropdown)}
                className="flex h-8 w-8 items-center justify-center rounded-full bg-[#80141d] text-white shadow-xs transition-all duration-200 hover:bg-[#680f16] hover:scale-105 active:scale-95"
                title="Tài khoản gia tộc"
              >
                <span className="material-symbols-outlined text-[19px]">person</span>
              </button>

              {/* Dropdown with Logout & Account Options */}
              {showUserDropdown && (
                <div className="absolute right-0 mt-2 w-48 rounded-xl border border-[#dec9b7] bg-[#fbf6ef] p-1.5 shadow-lg z-50">
                  <button
                    type="button"
                    onClick={() => {
                      setShowUserDropdown(false);
                      onNavigate('chon-khong-gian');
                    }}
                    className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-[12px] font-semibold text-[#80141d] hover:bg-[#faefe2]"
                  >
                    <span className="material-symbols-outlined text-[16px]">temple_buddhist</span>
                    <span>Chọn không gian phụng thờ</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowUserDropdown(false);
                      onNavigate('login');
                    }}
                    className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-[12px] font-medium text-[#4a362d] hover:bg-[#faefe2] hover:text-[#80141d]"
                  >
                    <span className="material-symbols-outlined text-[16px]">account_circle</span>
                    <span>Tài khoản gia tộc</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowUserDropdown(false);
                      onNavigate('bao-mat-tai-khoan');
                    }}
                    className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-[12px] font-medium text-[#4a362d] hover:bg-[#faefe2] hover:text-[#80141d]"
                  >
                    <span className="material-symbols-outlined text-[16px]">security</span>
                    <span>Bảo mật 2FA</span>
                  </button>
                  <div className="my-1 border-t border-[#ebdcd0]" />
                  <button
                    type="button"
                    onClick={() => {
                      setShowUserDropdown(false);
                      if (onLogout) onLogout();
                      else onNavigate('guest-landing');
                    }}
                    className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-[12px] font-bold text-[#80141d] hover:bg-[#faefe2]"
                  >
                    <span className="material-symbols-outlined text-[16px]">logout</span>
                    <span>Đăng xuất</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Horizontal Subnav */}
        <div className="flex gap-4 overflow-x-auto border-t border-[#e8d8c8] px-5 py-2.5 lg:hidden scrollbar-none">
          {navLinks.map((link) => (
            <button
              key={link.id}
              type="button"
              onClick={() => onNavigate(link.id)}
              className={`whitespace-nowrap text-[13px] transition-colors active:scale-95 ${
                currentScreen === link.id
                  ? 'font-bold text-[#80141d]'
                  : 'font-medium text-[#6c5448] hover:text-[#80141d]'
              }`}
            >
              {link.label}
            </button>
          ))}
        </div>
      </header>

    {/* Main Page Content */}
    <main>{children}</main>

    {/* Footer in Warm Beige Heritage Style with Interactive Links */}
    <footer className="border-t border-[#e2d0be] bg-[#f0e4d5] px-5 py-16 text-[#4a362d] lg:px-8 lg:py-20">
      <div className="mx-auto grid max-w-[1240px] gap-10 md:grid-cols-2 lg:grid-cols-4">
        {/* Col 1: Brand Info */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#8a141e] to-[#6d0d15] text-white shadow-sm ring-1 ring-[#9d1b25]">
              <span className="material-symbols-outlined text-[22px]">temple_buddhist</span>
            </span>
            <div className="flex flex-col">
              <strong className="font-serif text-[20px] font-bold text-[#7a111a]">Thích Cúng Kiếng</strong>
              <span className="text-[9.5px] font-semibold uppercase tracking-[0.18em] text-[#856b5f]">
                Di sản & ký ức gia tộc
              </span>
            </div>
          </div>
          <p className="text-[13px] leading-relaxed text-[#685246]">
            Nền tảng số hóa di sản & ký ức gia tộc thuần Việt. Lưu truyền gia phong, kết nối dòng họ và phụng sự tiền nhân qua từng thế hệ.
          </p>
          <div className="rounded-xl border border-[#dec9b6] bg-[#f8efe5] p-3 text-[12px] text-[#71594d] shadow-2xs">
            <p className="font-semibold text-[#80141d]">📍 Không gian phụng sự di sản Việt Nam</p>
            <p className="mt-1">
              Hotline trợ duyên gia tộc: <span className="font-bold text-[#80141d]">1900 6868</span>
            </p>
          </div>
        </div>

        {/* Col 2: Về chúng tôi */}
        <div>
          <h3 className="font-serif text-[15px] font-bold text-[#2b1b15]">Về chúng tôi</h3>
          <ul className="mt-4 space-y-2.5 text-[13px] text-[#685246]">
            <li>
              <button
                type="button"
                onClick={() => onNavigate('platform-features')}
                className="inline-flex items-center gap-1 transition-all duration-200 hover:translate-x-1 hover:text-[#80141d] active:scale-95"
              >
                <span>›</span> Giới thiệu nền tảng
              </button>
            </li>
            <li>
              <button
                type="button"
                onClick={() => onNavigate('platform-features')}
                className="inline-flex items-center gap-1 transition-all duration-200 hover:translate-x-1 hover:text-[#80141d] active:scale-95"
              >
                <span>›</span> Sứ mệnh văn hóa
              </button>
            </li>
            <li>
              <button
                type="button"
                onClick={() => onNavigate('privacy-security')}
                className="inline-flex items-center gap-1 transition-all duration-200 hover:translate-x-1 hover:text-[#80141d] active:scale-95"
              >
                <span>›</span> Quy ước phụng sự
              </button>
            </li>
            <li>
              <button
                type="button"
                onClick={() => onNavigate('privacy-security')}
                className="inline-flex items-center gap-1 transition-all duration-200 hover:translate-x-1 hover:text-[#80141d] active:scale-95"
              >
                <span>›</span> Bảo mật & Quyền riêng tư
              </button>
            </li>
          </ul>
        </div>

        {/* Col 3: Tính năng chính */}
        <div>
          <h3 className="font-serif text-[15px] font-bold text-[#2b1b15]">Khám phá tính năng</h3>
          <ul className="mt-4 space-y-2.5 text-[13px] text-[#685246]">
            <li>
              <button
                type="button"
                onClick={() => onNavigate('cay-pha-he-25d')}
                className="inline-flex items-center gap-1 transition-all duration-200 hover:translate-x-1 hover:text-[#80141d] active:scale-95"
              >
                <span>›</span> Cây phả hệ trực quan 2.5D
              </button>
            </li>
            <li>
              <button
                type="button"
                onClick={() => onNavigate('phuc-che-ai')}
                className="inline-flex items-center gap-1 transition-all duration-200 hover:translate-x-1 hover:text-[#80141d] active:scale-95"
              >
                <span>›</span> Phục chế ảnh chân dung AI
              </button>
            </li>
            <li>
              <button
                type="button"
                onClick={() => onNavigate('pricing')}
                className="inline-flex items-center gap-1 transition-all duration-200 hover:translate-x-1 hover:text-[#80141d] active:scale-95"
              >
                <span>›</span> Bảng giá dịch vụ
              </button>
            </li>
            <li>
              <button
                type="button"
                onClick={() => onNavigate('bao-tang-gia-bao')}
                className="inline-flex items-center gap-1 transition-all duration-200 hover:translate-x-1 hover:text-[#80141d] active:scale-95"
              >
                <span>›</span> Bảo tàng kỷ vật & điển tích
              </button>
            </li>
          </ul>
        </div>

        {/* Col 4: Văn Hóa Truyền Thống */}
        <div>
          <h3 className="font-serif text-[15px] font-bold text-[#2b1b15]">Văn Hóa Truyền Thống</h3>
          <ul className="mt-4 space-y-2.5 text-[13px] text-[#685246]">
            <li>
              <button
                type="button"
                onClick={() => onNavigate('cam-nang-nghi-le')}
                className="inline-flex items-center gap-1 transition-all duration-200 hover:translate-x-1 hover:text-[#80141d] active:scale-95"
              >
                <span>›</span> Hướng dẫn nghi thức cúng giỗ
              </button>
            </li>
            <li>
              <button
                type="button"
                onClick={() => onNavigate('cam-nang-nghi-le')}
                className="inline-flex items-center gap-1 transition-all duration-200 hover:translate-x-1 hover:text-[#80141d] active:scale-95"
              >
                <span>›</span> Văn khấn cổ truyền chuẩn lễ nghi
              </button>
            </li>
            <li>
              <button
                type="button"
                onClick={() => onNavigate('family-calendar')}
                className="inline-flex items-center gap-1 transition-all duration-200 hover:translate-x-1 hover:text-[#80141d] active:scale-95"
              >
                <span>›</span> Tra cứu lịch Âm – Dương
              </button>
            </li>
            <li className="pt-1 text-[12px] text-[#856b5f]">
              Hỗ trợ số hóa gia phả cổ & tài liệu chữ Hán Nôm
            </li>
          </ul>
        </div>
      </div>

      {/* Copyright Bar */}
      <div className="mx-auto mt-12 flex max-w-[1240px] flex-col items-center justify-between gap-3 border-t border-[#e2d0be] pt-6 text-[12px] text-[#856b5f] sm:flex-row">
        <span>© 2024 Thích Cúng Kiếng. Toàn bộ bản quyền được bảo hộ. Gìn giữ gia phong Việt Nam.</span>
        <span>Bản sắc văn hóa & Công nghệ trường tồn</span>
      </div>
    </footer>
  </div>
  );
};