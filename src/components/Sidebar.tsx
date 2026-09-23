import React, { useState } from 'react';
import type { ScreenType, UserRole } from '@/src/types.ts';

interface SidebarProps {
  currentScreen: ScreenType;
  onNavigate: (screen: ScreenType) => void;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
  isOpenMobile: boolean;
  onCloseMobile: () => void;
  userRole: UserRole;
  onLogout: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentScreen,
  onNavigate,
  isCollapsed,
  onToggleCollapse,
  isOpenMobile,
  onCloseMobile,
  onLogout,
}) => {
  const [showSpaceDropdown, setShowSpaceDropdown] = useState(false);

  const go = (screen: ScreenType) => {
    onCloseMobile();
    setShowSpaceDropdown(false);
    onNavigate(screen);
  };

  const navGroups = [
    {
      groupTitle: 'TRUNG TÂM ĐIỀU HÀNH',
      items: [
        {
          id: 'today' as ScreenType,
          label: 'Hôm Nay',
          icon: 'dashboard',
          badge: 'Trọng sự',
        },
        {
          id: 'family-calendar' as ScreenType,
          label: 'Lịch Gia Tộc & Giỗ Chạp',
          icon: 'calendar_month',
        },
      ],
    },
    {
      groupTitle: 'DI SẢN & GIA PHẢ',
      items: [
        {
          id: 'tong-quan-pha-he' as ScreenType,
          label: 'Tổng Quan Phả Hệ',
          icon: 'hub',
        },
        {
          id: 'cay-pha-he-25d' as ScreenType,
          label: 'Cây Gia Phả 2.5D',
          icon: 'account_tree',
          badge: 'Trực quan',
        },
        {
          id: 'ho-so-tien-nhan' as ScreenType,
          label: 'Hồ Sơ Tiền Nhân',
          icon: 'badge',
          badge: 'Cụ Cố Phúc',
        },
        {
          id: 'kho-ky-uc' as ScreenType,
          label: 'Kho Ký Ức & Kỷ Vật',
          icon: 'photo_library',
        },
        {
          id: 'cam-nang-nghi-le' as ScreenType,
          label: 'Nghi Lễ & Văn Khấn',
          icon: 'menu_book',
        },
      ],
    },
    {
      groupTitle: 'QUẢN TRỊ GIA TỘC',
      items: [
        {
          id: 'ma-tran-phan-quyen' as ScreenType,
          label: 'Cài Đặt & Phân Quyền',
          icon: 'admin_panel_settings',
        },
        {
          id: 'quan-ly-thanh-vien' as ScreenType,
          label: 'Danh Bạ Thành Viên',
          icon: 'groups',
        },
      ],
    },
  ];

  const sidebarContent = (
    <div className="app-main-sidebar flex h-full flex-col justify-between overflow-hidden bg-[#fdf9f4] border-r border-[#dec9b6] text-[#2b1b15]">
      {/* 1. Phần Đầu: Logo & Không Gian Dòng Tộc */}
      <div className="p-3.5 border-b border-[#ebdcd0] dark:border-[#3d141a]">
        {/* Logo Thích Cúng Kiếng */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <button
            type="button"
            onClick={() => go('guest-landing')}
            className="flex items-center gap-2.5 text-left group transition-transform active:scale-[0.98] min-w-0"
            title="Về trang chủ"
          >
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#80141d] text-white shadow-xs transition-transform duration-200 group-hover:scale-105">
              <span className="material-symbols-outlined text-[20px]">temple_buddhist</span>
            </span>
            {!isCollapsed && (
              <div className="flex flex-col min-w-0">
                <span className="sidebar-brand-title font-serif text-[16px] font-bold leading-none tracking-tight text-[#80141d] dark:text-white truncate">
                  Thích Cúng Kiếng
                </span>
                <span className="sidebar-brand-sub mt-1 text-[8px] font-bold uppercase tracking-[0.16em] text-[#80141d]/85 dark:text-[#f5c278] leading-none">
                  DI SẢN GIA TỘC
                </span>
              </div>
            )}
          </button>

          {/* Nút Thu gọn Desktop */}
          <button
            type="button"
            onClick={onToggleCollapse}
            className="sidebar-collapse-btn hidden md:flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-[#8a6f62] dark:text-white hover:bg-[#faefe3] dark:hover:bg-white/10 hover:text-[#80141d] dark:hover:text-white transition-colors"
            title={isCollapsed ? 'Mở rộng menu' : 'Thu gọn menu'}
          >
            <span className="material-symbols-outlined text-[18px]">
              {isCollapsed ? 'chevron_right' : 'chevron_left'}
            </span>
          </button>
        </div>

        {/* Ô Chọn Không Gian Dòng Tộc */}
        {!isCollapsed ? (
          <div className="relative">
            <button
              type="button"
              onClick={() => setShowSpaceDropdown(!showSpaceDropdown)}
              className="sidebar-space-box w-full flex items-center gap-2.5 rounded-xl border border-[#dec9b6] bg-[#f7eee2] p-2.5 text-left hover:border-[#80141d] hover:bg-[#faefe3] transition-all shadow-2xs group"
            >
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[#80141d]/10 text-[#80141d] group-hover:bg-[#80141d] group-hover:text-white transition-colors">
                <span className="material-symbols-outlined text-[17px]">account_tree</span>
              </span>
              <div className="flex flex-col justify-center min-w-0 flex-1 leading-tight">
                <div className="flex items-center gap-1.5">
                  <span className="sidebar-space-label text-[8px] font-bold uppercase tracking-wider text-[#8a6f62] dark:text-white/80">
                    KHÔNG GIAN
                  </span>
                  <span className="text-[7.5px] font-bold px-1 rounded bg-[#c9892c]/20 text-[#80141d] dark:bg-[#402a10] dark:text-[#f5c278] border border-[#c9892c]/30">
                    Chính phái
                  </span>
                </div>
                <strong className="sidebar-space-title mt-0.5 font-serif text-[12.5px] font-bold text-[#2b1b15] dark:text-white truncate">
                  Nguyễn Phục Anh - Chi Trực Lăng
                </strong>
              </div>
              <span className="material-symbols-outlined text-[18px] text-[#715b50] dark:text-white/80 shrink-0">
                unfold_more
              </span>
            </button>

            {/* Dropdown Menu Đổi Họ */}
            {showSpaceDropdown && (
              <div className="absolute left-0 right-0 mt-1.5 rounded-2xl border border-[#dec9b6] bg-[#fdf9f4] p-2 shadow-xl z-50 animate-in fade-in slide-in-from-top-1">
                <span className="block px-2.5 py-1 text-[9.5px] font-bold uppercase tracking-wider text-[#8a6f62] dark:text-white/80">
                  Không gian của bạn
                </span>
                <button
                  type="button"
                  onClick={() => go('today')}
                  className="flex w-full items-center gap-2 rounded-xl bg-[#faefe3] px-2.5 py-2 text-left text-[12px] font-bold text-[#80141d] dark:text-white"
                >
                  <span className="material-symbols-outlined text-[16px]">temple_buddhist</span>
                  <span className="truncate">Nguyễn Phục Anh - Chi Trực Lăng</span>
                </button>
                <button
                  type="button"
                  onClick={() => go('chon-khong-gian')}
                  className="mt-1 flex w-full items-center gap-2 rounded-xl px-2.5 py-2 text-left text-[11.5px] font-medium text-[#543e34] hover:bg-[#f5ece2] dark:text-white"
                >
                  <span className="material-symbols-outlined text-[16px]">add_circle</span>
                  <span>Chuyển hoặc tạo họ mới...</span>
                </button>
              </div>
            )}
          </div>
        ) : (
          <button
            type="button"
            onClick={onToggleCollapse}
            className="flex h-9 w-9 mx-auto items-center justify-center rounded-xl border border-[#dec9b6] bg-[#f7eee2] text-[#80141d] dark:text-white hover:border-[#80141d]"
            title="Nguyễn Phục Anh - Chi Trực Lăng"
          >
            <span className="material-symbols-outlined text-[18px]">account_tree</span>
          </button>
        )}
      </div>

      {/* 2. Thân Sidebar: Danh sách các Phân hệ Menu */}
      <div className="flex-1 overflow-y-auto px-2.5 py-3 space-y-4 no-scrollbar">
        {navGroups.map((group) => (
          <div key={group.groupTitle} className="space-y-1">
            {!isCollapsed ? (
              <div className="sidebar-group-title px-2.5 pb-1 text-[9.5px] font-bold uppercase tracking-wider text-[#8a6f62] dark:text-white/85">
                {group.groupTitle}
              </div>
            ) : (
              <div className="h-px bg-[#dec9b6]/60 dark:bg-[#3d141a] my-2 mx-1" />
            )}
            {group.items.map((item) => {
              const isActive = currentScreen === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => go(item.id)}
                  title={item.label}
                  className={`sidebar-nav-item ${isActive ? 'active' : ''} w-full flex items-center gap-2.5 rounded-xl px-2.5 py-2 text-left transition-all ${
                    isActive
                      ? 'bg-[#80141d] font-bold text-white shadow-xs'
                      : 'font-medium text-[#4a352a] dark:text-white hover:bg-[#faefe3] dark:hover:bg-white/10 hover:text-[#80141d] dark:hover:text-white'
                  } ${isCollapsed ? 'justify-center px-0' : ''}`}
                >
                  <span
                    className={`sidebar-nav-icon material-symbols-outlined text-[20px] shrink-0 ${
                      isActive ? 'text-white' : 'text-[#80141d] dark:text-white'
                    }`}
                  >
                    {item.icon}
                  </span>
                  {!isCollapsed && (
                    <div className="flex items-center justify-between flex-1 min-w-0">
                      <span className="sidebar-nav-label text-[13px] truncate dark:text-white">{item.label}</span>
                      {item.badge && (
                        <span
                          className={`text-[8.5px] font-bold px-1.5 py-0.5 rounded-full ${
                            isActive
                              ? 'bg-black/30 text-white border border-white/20'
                              : 'bg-[#c9892c]/20 text-[#80141d] dark:bg-[#402a10] dark:text-[#f5c278]'
                          }`}
                        >
                          {item.badge}
                        </span>
                      )}
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        ))}
      </div>

      {/* 3. Phần Chân: Thông tin Trưởng Tộc & Đăng xuất */}
      <div className="sidebar-footer p-3 border-t border-[#ebdcd0] bg-[#f7eee2]/70 dark:bg-[#1e090c] dark:border-[#3d141a]">
        {!isCollapsed ? (
          <div className="flex items-center justify-between gap-2">
            <button
              type="button"
              onClick={() => go('ho-so-ca-nhan')}
              className="flex items-center gap-2.5 min-w-0 text-left hover:opacity-90 group"
            >
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#80141d] text-white shadow-xs text-[14px] font-bold">
                <span className="material-symbols-outlined text-[17px]">person</span>
              </span>
              <div className="flex flex-col min-w-0">
                <strong className="sidebar-footer-name text-[12px] font-bold text-[#2b1b15] dark:text-white truncate group-hover:text-[#80141d] dark:group-hover:text-white">
                  Nguyễn Trực Viễn
                </strong>
                <span className="sidebar-footer-role text-[9px] text-[#8a6f62] dark:text-white/75 truncate">
                  Trưởng tộc đời 11
                </span>
              </div>
            </button>
            <button
              type="button"
              onClick={onLogout}
              className="sidebar-logout-btn flex h-7 w-7 items-center justify-center rounded-lg text-[#8a6f62] dark:text-white hover:bg-[#faefe3] dark:hover:bg-white/10 hover:text-[#80141d] transition-colors"
              title="Đăng xuất"
            >
              <span className="material-symbols-outlined text-[17px]">logout</span>
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={onLogout}
            className="sidebar-logout-btn flex h-9 w-9 mx-auto items-center justify-center rounded-xl text-[#8a6f62] dark:text-white hover:bg-[#faefe3] dark:hover:bg-white/10 hover:text-[#80141d]"
            title="Đăng xuất"
          >
            <span className="material-symbols-outlined text-[18px]">logout</span>
          </button>
        )}
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar Cố định */}
      <aside
        className={`hidden md:block fixed left-0 top-0 bottom-0 z-40 transition-all duration-300 ${
          isCollapsed ? 'w-[72px]' : 'w-[260px]'
        }`}
      >
        {sidebarContent}
      </aside>

      {/* Mobile Drawer (Bên trái trượt ra khi bấm menu di động) */}
      {isOpenMobile && (
        <div className="fixed inset-0 z-50 md:hidden animate-in fade-in duration-200">
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-xs"
            onClick={onCloseMobile}
          />
          <div className="fixed inset-y-0 left-0 w-72 max-w-[85vw] shadow-2xl animate-in slide-in-from-left duration-300">
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  );
};
