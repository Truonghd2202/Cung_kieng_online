import React, { useState } from 'react';
import type { ScreenType } from '@/src/types.ts';

interface AdminLayoutProps {
  currentScreen: ScreenType;
  onNavigate: (screen: ScreenType) => void;
  isDarkMode?: boolean;
  onToggleDarkMode?: () => void;
  children: React.ReactNode;
}

interface NavItem {
  id: ScreenType;
  label: string;
  icon: string;
}

interface NavSection {
  title: string;
  items: NavItem[];
}

const NAV_SECTIONS: NavSection[] = [
  {
    title: 'TRUNG TÂM ĐIỀU HÀNH',
    items: [
      { id: 'admin-tong-quan', label: 'Tổng quan', icon: 'grid_view' },
    ],
  },
  {
    title: 'NGƯỜI DÙNG & KHÔNG GIAN',
    items: [
      { id: 'admin-nguoi-dung', label: 'Người dùng', icon: 'group' },
      { id: 'admin-chi-tiet-nguoi-dung', label: 'Chi tiết người dùng', icon: 'person_search' },
      { id: 'admin-khong-gian-gia-toc', label: 'Không gian gia tộc', icon: 'account_balance' },
      { id: 'admin-chi-tiet-khong-gian', label: 'Chi tiết không gian', icon: 'domain' },
    ],
  },
  {
    title: 'NGHIỆP VỤ AI & KIỂM DUYỆT',
    items: [
      { id: 'admin-van-hanh-ai', label: 'Vận hành AI', icon: 'memory' },
      { id: 'admin-tham-dinh-ai', label: 'Thẩm định chất lượng AI', icon: 'verified' },
      { id: 'admin-kiem-duyet', label: 'Kiểm duyệt nội dung', icon: 'shield' },
    ],
  },
  {
    title: 'DI SẢN & TRI THỨC',
    items: [
      { id: 'admin-cms-cam-nang', label: 'CMS Cẩm nang văn hóa', icon: 'menu_book' },
    ],
  },
  {
    title: 'GIÁM SÁT & HỆ THỐNG',
    items: [
      { id: 'admin-nhat-ky-audit', label: 'Báo cáo & Nhật ký Audit', icon: 'receipt_long' },
      { id: 'admin-cai-dat-he-thong', label: 'Cài đặt hệ thống', icon: 'tune' },
    ],
  },
];

const SCREEN_TITLES: Record<string, string> = {
  'admin-tong-quan': 'Tổng Quan Bảng Điều Khiển Hệ Thống',
  'admin-nguoi-dung': 'Quản Lý Người Dùng & Định Danh Phả Hệ',
  'admin-chi-tiet-nguoi-dung': 'Chi Tiết Người Dùng (#USR-88291 Nguyễn Trực Viễn)',
  'admin-khong-gian-gia-toc': 'Quản Lý Không Gian Gia Tộc & Nhà Thờ Họ Toàn Quốc',
  'admin-chi-tiet-khong-gian': 'Chi Tiết Không Gian Gia Tộc (#CLAN-0012 Đại Tộc Nguyễn Phục Anh)',
  'admin-van-hanh-ai': 'Trung Tâm Vận Hành & Hạ Tầng AI Di Sản',
  'admin-tham-dinh-ai': 'Hội Đồng Thẩm Định & Kiểm Chuẩn Kết Quả AI',
  'admin-kiem-duyet': 'Kiểm Duyệt Nội Dung & Tôn Nghiêm Di Sản',
  'admin-cms-cam-nang': 'Hệ Thống CMS Cẩm Nang Nghi Lễ & Tri Thức Di Sản',
  'admin-nhat-ky-audit': 'Nhật Ký Kiểm Toán Bất Biến & Báo Cáo An Ninh Hệ Thống',
  'admin-cai-dat-he-thong': 'Cài Đặt & Cấu Hình Hệ Thống Trung Ương',
};

export const AdminLayout: React.FC<AdminLayoutProps> = ({
  currentScreen,
  onNavigate,
  isDarkMode,
  onToggleDarkMode,
  children,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#f7eee2] text-[#2b1b15] dark:bg-[#1a0a0c] dark:text-[#f7ebe8] flex flex-col font-sans antialiased transition-colors duration-200">
      {/* Top Global Navigation Bar */}
      <header className="h-14 bg-[#fdf9f4]/95 border-b border-[#dec9b6] backdrop-blur-md flex items-center justify-between px-4 sm:px-6 sticky top-0 z-40 shadow-xs dark:bg-[#240a0d]/95 dark:border-[#3d141a]">
        {/* Left Branding and Breadcrumb */}
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-1.5 rounded-xl border border-[#dec9b6] bg-[#f7eee2] text-[#543e34] hover:bg-[#faefe3] hover:text-[#80141d]"
            title="Mở menu"
          >
            <span className="material-symbols-outlined text-[20px]">menu</span>
          </button>

          <div className="flex items-center gap-2.5">
            <span className="text-[12px] font-medium text-[#8a6f62] hidden sm:inline">
              Điều Hành Trung Ương &gt;
            </span>
            <span className="text-[13px] font-bold text-[#80141d] font-serif">
              {SCREEN_TITLES[currentScreen] || 'Không Gian Quản Trị'}
            </span>
          </div>

          <div className="hidden lg:flex items-center gap-1.5 text-[11px] text-emerald-800 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>Máy chủ hoạt động ổn định</span>
          </div>
        </div>

        {/* Right Search, Actions & Profile */}
        <div className="flex items-center gap-2.5">
          {/* Global Search Bar */}
          <div className="relative hidden md:block w-64 lg:w-80">
            <span className="material-symbols-outlined absolute left-2.5 top-1/2 -translate-y-1/2 text-[17px] text-[#8a6f62]">
              search
            </span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Tra cứu ID, Gia tộc, Di văn..."
              className="w-full pl-9 pr-3 py-1.5 text-[12px] bg-[#f7eee2]/70 border border-[#dec9b6] rounded-xl focus:outline-none focus:border-[#80141d] focus:bg-[#fdf9f4] text-[#2b1b15] placeholder:text-[#8a6f62] shadow-2xs"
            />
          </div>

          {/* User App Switcher */}
          <button
            type="button"
            onClick={() => onNavigate('tong-quan-pha-he')}
            className="px-2.5 py-1.5 text-[11px] font-bold text-[#543e34] hover:text-[#80141d] bg-[#f7eee2] hover:bg-[#faefe3] border border-[#dec9b6] rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer shadow-2xs"
            title="Quay lại giao diện người dùng"
          >
            <span className="material-symbols-outlined text-[15px] text-[#80141d]">storefront</span>
            <span className="hidden sm:inline">Giao Diện Người Dùng</span>
          </button>

          {/* Theme switcher */}
          {onToggleDarkMode && (
            <button
              type="button"
              onClick={onToggleDarkMode}
              className="flex items-center justify-center h-8 w-8 text-[#543e34] hover:text-[#80141d] bg-[#f7eee2] hover:bg-[#faefe3] border border-[#dec9b6] rounded-xl transition-all shadow-2xs cursor-pointer active:scale-95 group"
              title={isDarkMode ? 'Chuyển sang chế độ Sáng' : 'Chuyển sang chế độ Tối'}
              aria-label="Chuyển đổi giao diện sáng tối"
            >
              <span className="material-symbols-outlined text-[17px] text-[#c9892c] group-hover:rotate-12 transition-transform">
                {isDarkMode ? 'dark_mode' : 'light_mode'}
              </span>
            </button>
          )}

          {/* Notification icon */}
          <button
            type="button"
            onClick={() => onNavigate('admin-kiem-duyet')}
            className="relative p-1.5 text-[#543e34] hover:text-[#80141d] rounded-xl bg-[#f7eee2] hover:bg-[#faefe3] border border-[#dec9b6] shadow-2xs cursor-pointer"
            title="Thông báo khẩn"
          >
            <span className="material-symbols-outlined text-[18px]">notifications</span>
            <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-[#80141d]"></span>
          </button>

          {/* Super Admin Avatar Badge */}
          <div className="flex items-center gap-2 pl-2 border-l border-stone-200">
            <div className="w-8 h-8 rounded-full bg-[#8A1A1B] text-white flex items-center justify-center font-bold text-[12px] shadow-xs">
              <span className="material-symbols-outlined text-[18px]">admin_panel_settings</span>
            </div>
            <div className="hidden xl:block text-left">
              <p className="text-[12px] font-bold text-stone-800 leading-tight">Quản Trị Viên Tối Cao</p>
              <p className="text-[10px] text-stone-500 font-medium leading-tight">Super Admin • Tier 1</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Administrative Body: Sidebar + Main Viewport */}
      <div className="flex-1 flex overflow-hidden">
        {/* Deep Burgundy Administrative Sidebar */}
        <aside
          className={`fixed inset-y-0 left-0 z-50 w-64 bg-[#3B0709] text-stone-200 transform transition-transform duration-200 ease-in-out md:translate-x-0 md:static md:inset-auto flex flex-col justify-between border-r border-[#520B0F] shadow-xl md:shadow-none ${
            mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          {/* Top Brand Banner in Sidebar */}
          <div>
            <div className="p-4 border-b border-[#520B0F] flex items-center justify-between">
              <div
                onClick={() => onNavigate('admin-tong-quan')}
                className="flex items-center gap-2.5 cursor-pointer"
              >
                <div className="w-9 h-9 rounded-lg bg-[#8A1A1B] border border-amber-400/30 flex items-center justify-center text-white font-serif font-black text-base shadow-sm">
                  TCK
                </div>
                <div>
                  <h1 className="text-[13px] font-bold tracking-wide text-white leading-tight font-serif">
                    THÍCH CÚNG KIẾNG
                  </h1>
                  <p className="text-[9px] font-semibold tracking-widest text-[#E5B56E] uppercase">
                    TỔNG SỰ PHẢ HỆ
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="md:hidden text-stone-400 hover:text-white"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            {/* Nav Menu Groups */}
            <div className="py-3 px-2 space-y-4 overflow-y-auto max-h-[calc(100vh-160px)] custom-scrollbar">
              {NAV_SECTIONS.map((section, idx) => (
                <div key={idx} className="space-y-1">
                  <div className="px-3 py-1 text-[10px] font-bold tracking-wider text-amber-200/50 uppercase">
                    {section.title}
                  </div>
                  <div className="space-y-0.5">
                    {section.items.map((item) => {
                      const isActive = currentScreen === item.id;
                      return (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => {
                            onNavigate(item.id);
                            setMobileMenuOpen(false);
                          }}
                          className={`w-full text-left px-3 py-2 rounded-lg text-[12.5px] font-medium flex items-center gap-2.5 transition-all cursor-pointer ${
                            isActive
                              ? 'bg-gradient-to-r from-[#8A1A1B] to-[#701516] text-white shadow-sm font-semibold border-l-3 border-amber-400 pl-2.5'
                              : 'text-stone-300 bg-transparent hover:bg-[#520B0F]/60 hover:text-white'
                          }`}
                        >
                          <span
                            className={`material-symbols-outlined text-[19px] ${
                              isActive ? 'text-amber-300' : 'text-stone-400'
                            }`}
                          >
                            {item.icon}
                          </span>
                          <span className="truncate">{item.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Sidebar Footer */}
          <div className="p-3 border-t border-[#520B0F] bg-[#300507] flex items-center justify-between text-[11px] text-stone-400">
            <div>
              <p className="font-semibold text-stone-300">Hệ thống Điều hành</p>
              <p className="text-[10px] text-stone-500">v2.5-enterprise</p>
            </div>
            <button
              type="button"
              onClick={() => onNavigate('admin-dang-nhap')}
              className="flex items-center gap-1 text-stone-400 hover:text-amber-300 px-2 py-1 rounded bg-transparent hover:bg-[#520B0F]/60 transition-colors"
              title="Đăng xuất khỏi phiên Quản Trị"
            >
              <span className="material-symbols-outlined text-[16px]">logout</span>
              <span>Thoát</span>
            </button>
          </div>
        </aside>

        {/* Backdrop for mobile */}
        {mobileMenuOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-40 md:hidden"
            onClick={() => setMobileMenuOpen(false)}
          />
        )}

        {/* Content Area */}
        <main className="flex-1 overflow-y-auto bg-[#f7eee2] text-[#2b1b15] dark:bg-[#1a0a0c] dark:text-[#f7ebe8] p-4 sm:p-6 lg:p-8">
          <div className="max-w-7xl mx-auto">{children}</div>
        </main>
      </div>
    </div>
  );
};
