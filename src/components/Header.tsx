import React, { useState } from 'react';
import type { ScreenType, UserRole } from '@/src/types.ts';

interface HeaderProps {
  currentScreen: ScreenType;
  onNavigate: (screen: ScreenType) => void;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
  userRole: UserRole;
  onToggleUserRole?: () => void;
  onLogin: () => void;
  onLogout: () => void;
  onToggleSidebar?: () => void;
  onOpenMobileSidebar?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentScreen,
  onNavigate,
  isDarkMode,
  onToggleDarkMode,
  onLogout,
  onToggleSidebar,
  onOpenMobileSidebar,
}) => {
  const [showUserDropdown, setShowUserDropdown] = useState(false);

  const go = (screen: ScreenType) => {
    setShowUserDropdown(false);
    onNavigate(screen);
  };

  const getScreenTitle = (screen: ScreenType): string => {
    switch (screen) {
      case 'today':
        return 'Hôm Nay';
      case 'family-calendar':
        return 'Lịch Gia Tộc & Giỗ Chạp';
      case 'cay-pha-he-25d':
        return 'Cây Gia Phả 2.5D';
      case 'kho-ky-uc':
        return 'Kho Ký Ức & Kỷ Vật';
      case 'cam-nang-nghi-le':
        return 'Sổ Tay Nghi Lễ & Văn Khấn';
      case 'ma-tran-phan-quyen':
        return 'Cài Đặt & Phân Quyền';
      case 'quan-ly-thanh-vien':
        return 'Danh Bạ Gia Tộc';
      case 'them-su-kien':
        return 'Tạo Sự Kiện & Lễ Giỗ';
      default:
        return 'Không Gian Gia Tộc';
    }
  };

  return (
    <header className="sticky top-0 z-30 h-[58px] w-full border-b border-[#dec9b6] bg-[#fdf9f4]/95 backdrop-blur-md shadow-2xs">
      <div className="flex h-full w-full items-center justify-between px-3 sm:px-5 lg:px-6 gap-3">
        {/* =========================================================
            BÊN TRÁI: NÚT TOGGLE SIDEBAR + BREADCRUMBS
            ========================================================= */}
        <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
          {/* Nút mở Menu Di Động (Mobile) */}
          <button
            type="button"
            onClick={onOpenMobileSidebar}
            className="flex md:hidden h-9 w-9 items-center justify-center rounded-xl border border-[#dec9b6] bg-[#f7eee2] text-[#80141d] hover:border-[#80141d]"
            title="Mở menu"
          >
            <span className="material-symbols-outlined text-[20px]">menu</span>
          </button>

          {/* Nút Toggle Sidebar (Desktop) */}
          <button
            type="button"
            onClick={onToggleSidebar}
            className="hidden md:flex h-9 w-9 items-center justify-center rounded-xl border border-[#dec9b6] bg-[#f7eee2] text-[#543e34] hover:bg-[#faefe3] hover:text-[#80141d] hover:border-[#80141d] transition-all"
            title="Đóng / mở menu bên trái"
          >
            <span className="material-symbols-outlined text-[19px]">dock_to_left</span>
          </button>

          {/* Breadcrumb Tinh tế */}
          <div className="flex items-center gap-2 text-[12.5px] leading-none">
            <span className="hidden sm:inline font-medium text-[#8a6f62]">
              Nguyễn Phục Anh
            </span>
            <span className="hidden sm:inline text-[#dec9b6]">/</span>
            <span className="font-serif font-bold text-[#80141d] text-[13.5px] sm:text-[14px]">
              {getScreenTitle(currentScreen)}
            </span>
          </div>
        </div>

        {/* =========================================================
            Ở GIỮA: THANH TÌM KIẾM DI SẢN (DESKTOP)
            ========================================================= */}
        <div className="hidden lg:flex items-center flex-1 max-w-md mx-4">
          <div className="relative w-full">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[17px] text-[#8a6f62]">
              search
            </span>
            <input
              type="text"
              placeholder="Tìm phả hệ, người thân, sự kiện giỗ chạp..."
              className="w-full h-9 pl-9 pr-11 rounded-xl border border-[#dec9b6] bg-[#f7eee2]/70 text-[12px] text-[#2b1b15] placeholder-[#8a6f62] focus:outline-none focus:border-[#80141d] focus:bg-white transition-all shadow-2xs cursor-pointer"
              readOnly
              onClick={() => go('family-calendar')}
            />
            <kbd className="absolute right-2 top-1/2 -translate-y-1/2 px-1.5 py-0.5 text-[9.5px] font-mono font-semibold text-[#8a6f62] bg-[#fdf9f4] rounded border border-[#dec9b6]">
              ⌘K
            </kbd>
          </div>
        </div>

        {/* =========================================================
            BÊN PHẢI: LỊCH ÂM, THÔNG BÁO, TẠO SỰ KIỆN & PROFILE
            ========================================================= */}
        <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
          {/* Hộp Lịch Âm */}
          <div className="hidden sm:flex h-9 items-center gap-2 rounded-xl border border-[#dec9b6] bg-[#f7eee2] px-2.5 shadow-2xs shrink-0 whitespace-nowrap text-left">
            <span className="material-symbols-outlined text-[17px] text-[#c9892c]">
              calendar_month
            </span>
            <div className="flex flex-col justify-center leading-tight">
              <span className="text-[10.5px] font-bold text-[#80141d]">
                Th7 Âm Lịch
              </span>
              <span className="text-[8.5px] text-[#715b50]">
                Năm Giáp Thìn
              </span>
            </div>
          </div>

          {/* Nút Chuông Thông Báo */}
          <button
            type="button"
            onClick={() => go('thong-bao-gia-toc')}
            className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-[#dec9b6] bg-[#f7eee2] text-[#543e34] hover:bg-[#faefe3] hover:border-[#80141d] transition-all shadow-2xs"
            title="Thông báo dòng tộc"
          >
            <span className="material-symbols-outlined text-[18px]">notifications</span>
            <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-[#80141d] ring-2 ring-white" />
          </button>

          {/* Nút Tạo Sự Kiện Nhanh */}
          <button
            type="button"
            onClick={() => go('them-su-kien')}
            className="hidden sm:flex items-center gap-1.5 h-9 px-3 rounded-xl bg-[#80141d] text-white text-[12px] font-bold hover:bg-[#681017] transition-all shadow-2xs whitespace-nowrap active:scale-[0.98]"
          >
            <span className="material-symbols-outlined text-[15px]">add_circle</span>
            <span>Tạo giỗ</span>
          </button>

          {/* Nút Chuyển Đổi Giao Diện: 1 icon sáng tối */}
          <button
            type="button"
            onClick={onToggleDarkMode}
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-[#dec9b6] bg-[#f7eee2] text-[#543e34] hover:border-[#80141d] hover:text-[#80141d] transition-all shadow-2xs cursor-pointer active:scale-95 group"
            title={isDarkMode ? 'Chuyển sang chế độ Sáng' : 'Chuyển sang chế độ Tối'}
            aria-label="Chuyển đổi giao diện sáng tối"
          >
            <span className="material-symbols-outlined text-[19px] text-[#c9892c] group-hover:rotate-12 transition-transform">
              {isDarkMode ? 'dark_mode' : 'light_mode'}
            </span>
          </button>

          {/* Danh Thiếp Trưởng Tộc (Avatar Menu) */}
          <div className="relative shrink-0">
            <button
              type="button"
              onClick={() => setShowUserDropdown(!showUserDropdown)}
              className="flex h-9 items-center gap-2 rounded-xl border border-[#dec9b6] bg-[#f7eee2] pl-2.5 pr-1.5 hover:border-[#80141d] transition-all shadow-2xs whitespace-nowrap"
            >
              <div className="hidden xl:flex flex-col justify-center text-right leading-tight max-w-[100px]">
                <strong className="text-[11px] font-bold text-[#2b1b15] truncate">
                  Nguyễn Trực Viễn
                </strong>
                <span className="text-[8.5px] text-[#8a6f62] truncate">
                  Trưởng tộc
                </span>
              </div>
              <span className="flex h-6.5 w-6.5 shrink-0 items-center justify-center rounded-full bg-[#80141d] text-white shadow-xs text-[12px] font-bold">
                <span className="material-symbols-outlined text-[15px]">person</span>
              </span>
              <span className="material-symbols-outlined text-[15px] text-[#715b50]">
                arrow_drop_down
              </span>
            </button>

            {/* Dropdown Menu User */}
            {showUserDropdown && (
              <div className="absolute right-0 mt-2 w-56 rounded-2xl border border-[#dec9b6] bg-[#fdf9f4] p-2 shadow-xl z-50 animate-in fade-in slide-in-from-top-2">
                <div className="border-b border-[#ebdcd0] px-3 py-2">
                  <strong className="block text-[12px] font-bold text-[#2b1b15]">
                    Nguyễn Trực Viễn
                  </strong>
                  <span className="text-[10.5px] text-[#715b50]">
                    Trưởng tộc chi Trực Lăng (Đời 11)
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => go('ho-so-ca-nhan')}
                  className="mt-1 flex w-full items-center gap-2 rounded-xl px-3 py-2 text-[12px] font-medium text-[#543e34] hover:bg-[#f5ece2]"
                >
                  <span className="material-symbols-outlined text-[16px]">badge</span>
                  <span>Hồ sơ cá nhân &amp; Phả hệ</span>
                </button>
                <button
                  type="button"
                  onClick={() => go('chon-khong-gian')}
                  className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-[12px] font-medium text-[#543e34] hover:bg-[#f5ece2]"
                >
                  <span className="material-symbols-outlined text-[16px]">door_open</span>
                  <span>Không gian phụng thờ</span>
                </button>
                <button
                  type="button"
                  onClick={() => go('bao-mat-tai-khoan')}
                  className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-[12px] font-medium text-[#543e34] hover:bg-[#f5ece2]"
                >
                  <span className="material-symbols-outlined text-[16px]">security</span>
                  <span>Bảo mật tài khoản &amp; 2FA</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    onToggleDarkMode();
                  }}
                  className="flex w-full items-center justify-between rounded-xl px-3 py-2 text-[12px] font-medium text-[#543e34] hover:bg-[#f5ece2]"
                >
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[16px] text-[#c9892c]">
                      {isDarkMode ? 'dark_mode' : 'light_mode'}
                    </span>
                    <span>Chế độ: <strong>{isDarkMode ? 'Trầm Nâu Rượu' : 'Hoàng Thổ Dó'}</strong></span>
                  </div>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#ebdcd0] text-[#80141d] font-bold">
                    Đổi
                  </span>
                </button>
                <div className="my-1 border-t border-[#ebdcd0]" />
                <button
                  type="button"
                  onClick={() => {
                    setShowUserDropdown(false);
                    onLogout();
                  }}
                  className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-[12px] font-bold text-[#80141d] hover:bg-[#faefe3]"
                >
                  <span className="material-symbols-outlined text-[16px]">logout</span>
                  <span>Đăng xuất</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};