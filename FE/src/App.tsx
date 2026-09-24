import { useState, useEffect } from 'react';
import { ScreenType, ClanData, UserRole } from '@/src/types.ts';
import { USER_SCREENS, SCREEN_CONFIGS } from '@/src/utils/navigationConfig.ts';
import { Header } from '@/src/components/Header.tsx';
import { Sidebar } from '@/src/components/Sidebar.tsx';
import { Footer } from '@/src/components/Footer.tsx';
import { LoginScreen } from '@/src/components/screens/LoginScreen.tsx';
import { RegisterScreen } from '@/src/components/screens/RegisterScreen.tsx';
import { ForgotPasswordScreen } from '@/src/components/screens/ForgotPasswordScreen.tsx';
import { MarketingHomeScreen } from '@/src/components/marketing/MarketingHomeScreen.tsx';
import { PlatformFeaturesScreen } from '@/src/components/marketing/PlatformFeaturesScreen.tsx';
import { PrivacySecurityScreen } from '@/src/components/marketing/PrivacySecurityScreen.tsx';
import { PricingScreen } from '@/src/components/marketing/PricingScreen.tsx';
import { TodayScreen } from '@/src/components/screens/TodayScreen.tsx';
import { FamilyCalendarScreen } from '@/src/components/screens/FamilyCalendarScreen.tsx';
import { ResetPasswordScreen } from '@/src/components/screens/ResetPasswordScreen.tsx';
import { SelectSpaceScreen } from '@/src/components/screens/SelectSpaceScreen.tsx';
import { CreateClanScreen } from '@/src/components/screens/CreateClanScreen.tsx';
import { FamilySetupScreen } from '@/src/components/screens/FamilySetupScreen.tsx';
import { CreateEventScreen } from '@/src/components/screens/CreateEventScreen.tsx';
import { EventDetailScreen } from '@/src/components/screens/EventDetailScreen.tsx';
import { GenealogyOverviewScreen } from '@/src/components/screens/GenealogyOverviewScreen.tsx';
import { GenealogyTree25DScreen } from '@/src/components/screens/GenealogyTree25DScreen.tsx';
import { AncestorProfileScreen } from '@/src/components/screens/AncestorProfileScreen.tsx';
import { AddMemberScreen } from '@/src/components/screens/AddMemberScreen.tsx';
import { MemoryArchiveScreen } from '@/src/components/screens/MemoryArchiveScreen.tsx';
import { AIRestorationScreen } from '@/src/components/screens/AIRestorationScreen.tsx';
import { RelicDetailScreen } from '@/src/components/screens/RelicDetailScreen.tsx';
import { AlbumCollectionScreen } from '@/src/components/screens/AlbumCollectionScreen.tsx';
import { RestorationCompleteScreen } from '@/src/components/screens/RestorationCompleteScreen.tsx';
import { RestorationProgressScreen } from '@/src/components/screens/RestorationProgressScreen.tsx';
import { RestorationHistoryScreen } from '@/src/components/screens/RestorationHistoryScreen.tsx';
import { HeritageMuseumScreen } from '@/src/components/screens/HeritageMuseumScreen.tsx';
import { DonateRelicScreen } from '@/src/components/screens/DonateRelicScreen.tsx';
import { RelicDetail3DScreen } from '@/src/components/screens/RelicDetail3DScreen.tsx';
import { ManuscriptAnalysisScreen } from '@/src/components/screens/ManuscriptAnalysisScreen.tsx';
import { MemorialTreeScreen } from '@/src/components/screens/MemorialTreeScreen.tsx';
import { AddMilestoneScreen } from '@/src/components/screens/AddMilestoneScreen.tsx';
import { FamilyTraditionLibraryScreen } from '@/src/components/screens/FamilyTraditionLibraryScreen.tsx';
import { ClanChronicleTimelineScreen } from '@/src/components/screens/ClanChronicleTimelineScreen.tsx';
import { FamilyStoryDetailScreen } from '@/src/components/screens/FamilyStoryDetailScreen.tsx';
import { VirtualMemorialHall3DScreen } from '@/src/components/screens/VirtualMemorialHall3DScreen.tsx';
import { AncestralProfileDetailScreen } from '@/src/components/screens/AncestralProfileDetailScreen.tsx';
import { OfferIncenseScreen } from '@/src/components/screens/OfferIncenseScreen.tsx';
import { RitualHandbookScreen } from '@/src/components/screens/RitualHandbookScreen.tsx';
import { RitualDetailScreen } from '@/src/components/screens/RitualDetailScreen.tsx';
import { RolePermissionMatrixScreen } from '@/src/components/screens/RolePermissionMatrixScreen.tsx';
import { ClanMemberDirectoryScreen } from '@/src/components/screens/ClanMemberDirectoryScreen.tsx';
import { InviteMembersScreen } from '@/src/components/screens/InviteMembersScreen.tsx';
import { ClanNotificationCenterScreen } from '@/src/components/screens/ClanNotificationCenterScreen.tsx';
import { UserProfilePedigreeScreen } from '@/src/components/screens/UserProfilePedigreeScreen.tsx';
import { AccountSecurityScreen } from '@/src/components/screens/AccountSecurityScreen.tsx';
import { SubscriptionFundScreen } from '@/src/components/screens/SubscriptionFundScreen.tsx';
import { OFFLINE_IMAGE_PLACEHOLDER } from '@/src/lib/media.ts';

// Admin & Super Admin Module Screens
import { AdminLayout } from '@/src/components/admin/AdminLayout.tsx';
import { AdminLoginScreen } from '@/src/components/admin/AdminLoginScreen.tsx';
import { AdminDashboardScreen } from '@/src/components/admin/AdminDashboardScreen.tsx';
import { AdminUserManagementScreen } from '@/src/components/admin/AdminUserManagementScreen.tsx';
import { AdminUserDetailScreen } from '@/src/components/admin/AdminUserDetailScreen.tsx';
import { AdminClanSpacesScreen } from '@/src/components/admin/AdminClanSpacesScreen.tsx';
import { AdminClanDetailScreen } from '@/src/components/admin/AdminClanDetailScreen.tsx';
import { AdminAIOperationsScreen } from '@/src/components/admin/AdminAIOperationsScreen.tsx';
import { AdminAIReviewScreen } from '@/src/components/admin/AdminAIReviewScreen.tsx';
import { AdminModerationScreen } from '@/src/components/admin/AdminModerationScreen.tsx';
import { AdminHandbookCMSScreen } from '@/src/components/admin/AdminHandbookCMSScreen.tsx';
import { AdminAuditLogScreen } from '@/src/components/admin/AdminAuditLogScreen.tsx';
import { AdminSystemSettingsScreen } from '@/src/components/admin/AdminSystemSettingsScreen.tsx';

const normalizeScreenPath = (rawPath: string): ScreenType | null => {
  if (!rawPath) return null;
  // Hỗ trợ alias URL tiếng Việt thân thiện
  if (rawPath === 'tien-trinh-phuc-che') return 'dang-phuc-che';
  if (rawPath === 'xem-truoc-phuc-che') return 'hoan-tat-phuc-che';
  if (
    rawPath in SCREEN_CONFIGS ||
    rawPath.startsWith('admin-') ||
    rawPath === 'login' ||
    rawPath === 'register' ||
    rawPath === 'forgot-password' ||
    rawPath === 'chon-khong-gian' ||
    rawPath === 'khoi-tao-gia-toc' ||
    rawPath === 'thiet-lap-gia-dinh' ||
    rawPath === 'guest-landing' ||
    rawPath === 'pricing' ||
    rawPath === 'platform-features' ||
    rawPath === 'privacy-security'
  ) {
    return rawPath as ScreenType;
  }
  return null;
};

const getInitialScreen = (): ScreenType => {
  if (typeof window === 'undefined') return 'guest-landing';
  const path = window.location.pathname.replace(/^\/+/, '').split('/')[0];
  const screen = normalizeScreenPath(path);
  return screen || 'guest-landing';
};

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<ScreenType>(getInitialScreen);
  const [userRole, setUserRole] = useState<UserRole>(() => {
    const screen = getInitialScreen();
    const publicScreens = ['guest-landing', 'platform-features', 'privacy-security', 'pricing', 'login', 'register', 'forgot-password'];
    return publicScreens.includes(screen) ? 'guest' : 'user';
  });
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const path = window.location.pathname.replace(/^\/+/, '').split('/')[0];
      return path.startsWith('admin-');
    }
    return true;
  });
  const [globalToast, setGlobalToast] = useState<string | null>(null);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('thich-cung-kieng-theme');
      if (saved) return saved === 'dark';
      return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState<boolean>(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState<boolean>(false);

  // Sync theme changes with DOM and localStorage
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
      localStorage.setItem('thich-cung-kieng-theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.add('light');
      localStorage.setItem('thich-cung-kieng-theme', 'light');
    }
  }, [isDarkMode]);

  // Sync URL when browser back/forward buttons are pressed
  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname.replace(/^\/+/, '').split('/')[0];
      const screen = normalizeScreenPath(path);
      if (screen) {
        if (screen.startsWith('admin-')) {
          setIsAdminAuthenticated(true);
        }
        setCurrentScreen(screen);
      } else {
        setCurrentScreen('guest-landing');
      }
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Shared clan information state
  const [clanData, setClanData] = useState<ClanData>({
    spaceName: 'Đại Gia Tộc Nguyễn Phục Anh - Chi Trực Lăng',
    surname: 'Nguyễn (阮)',
    branch: 'Chi Giáp - Đệ Tam Ngành',
    provinceOrigin: 'Nam Định',
    villageAncestral: 'Làng Hành Thiện, Xã Xuân Hồng (Nhà Thờ Tổ)',
    repName: 'Nguyễn Hữu Hoàng',
    repRole: 'truong-chi',
    repPhone: '0912 345 678',
    motto:
      'Tổ tông công đức thiên niên thịnh - Tử hiếu tôn hiền vạn đại vinh. Giữ trọn gia phong, khuyến học khuyến tài, thảo kính tiền nhân.',
    privacyLevel: 'closed',
  });

  const toggleDarkMode = () => {
    setIsDarkMode((prev) => !prev);
  };

  const handleNavigate = (screen: ScreenType) => {
    const isAdminScreen = screen.startsWith('admin-');
    if (isAdminScreen) {
      setIsAdminAuthenticated(true);
    }

    setCurrentScreen(screen);
    const newPath = screen === 'guest-landing' ? '/' : `/${screen}`;
    if (window.location.pathname !== newPath) {
      window.history.pushState(null, '', newPath);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleToggleUserRole = () => {
    setUserRole((prev) => (prev === 'user' ? 'guest' : 'user'));
  };

  const handleLogin = () => {
    handleNavigate('login');
  };

  const handleLogout = () => {
    setUserRole('guest');
    setIsAdminAuthenticated(false);
    handleNavigate('guest-landing');
  };

  useEffect(() => {
    // Sync title based on current screen
    const screenTitles: Record<ScreenType, string> = {
      login: 'Đăng nhập Gia tộc',
      'guest-landing': 'Chào mừng đến với Thích Cúng Kiếng',
      today: 'Hôm nay trong gia đình',
      'family-calendar': 'Lịch gia đình',
      'platform-features': 'Tính năng nền tảng',
      'privacy-security': 'Bảo mật & Quyền riêng tư',
      pricing: 'Bảng giá phụng sự',
      register: 'Khởi tạo không gian gia tộc',
      'forgot-password': 'Khôi phục mật khẩu gia tộc',
      'reset-password': 'Thiết lập mật khẩu mới',
      'chon-khong-gian': 'Chọn không gian phụng thờ',
      'khoi-tao-gia-toc': 'Khởi tạo gia tộc',
      'thiet-lap-gia-dinh': 'Thiết lập gia đình & Bàn thờ',
      'them-su-kien': 'Tạo lễ giỗ & Sự kiện gia tộc',
      'chi-tiet-gio-chap': 'Chi tiết lễ giỗ chính kỵ (15/7)',
      'tong-quan-pha-he': 'Tổng quan phả hệ dòng tộc',
      'cay-pha-he-25d': 'Cây gia phả trực quan 2.5D',
      'ho-so-tien-nhan': 'Hồ sơ tiền nhân - Cụ Cố Nguyễn Văn Phúc',
      'them-thanh-vien': 'Thêm thành viên mới vào sổ phả',
      'kho-ky-uc': 'Kho Ký Ức & Kỷ Vật Gia Tộc',
      'phuc-che-ai': 'Phục Chế Ảnh Ký Ức AI Di Sản',
      'chi-tiet-di-vat': 'Bức Chân Dung Cụ Cố Đời Thứ 9 - Nguyễn Khắc Cẩn',
      'tuyen-tap-album': 'Tuyển Tập Album Ký Ức & Điển Tích Dòng Họ',
      'hoan-tat-phuc-che': 'Hoàn Tất Phục Chế Ảnh Ký Ức Tiền Nhân 4K',
      'dang-phuc-che': 'Đang Phục Chế Ký Ức Tiền Nhân...',
      'lich-su-phuc-che': 'Nhật Ký & Lịch Sử Phục Chế Ảnh AI Dòng Họ',
      'bao-tang-gia-bao': 'Bảo Tàng Gia Bảo & Di Vật Tổ Tiên',
      'hien-tang-gia-bao': 'Hiến Tặng & Đăng Ký Gia Bảo Vào Bảo Tàng',
      'chi-tiet-gia-bao': 'Chi Tiết Đồng Hồ Quả Quýt Khải Định 1922 (3D 360°)',
      'phan-tich-but-tich': 'Phân Tích & Dịch Thuật Bút Tích Chữ Viết Tay Tiền Nhân',
      'cay-ky-niem': 'Cây Kỷ Niệm Dòng Tộc & Cội Nguồn Bách Niên',
      'them-cot-moc': 'Thêm Cột Mốc Mới Vào Cây Kỷ Niệm',
      'tu-sach-gia-phong': 'Tủ Sách Gia Phong & Điển Tích Tiền Nhân',
      'bien-nien-su': 'Biên Niên Sử & Niên Biểu Đại Tộc 340 Năm',
      'cau-chuyen-gia-phong': 'Điển Tích: Chữ Tín Bên Dòng Sông Vị Hoàng',
      'khong-gian-tuong-niem-3d': 'Không Gian Bàn Thờ 3D Linh Thiêng Trực Tuyến',
      'ho-so-huong-linh': 'Hồ Sơ Hương Linh & Bài Vị Tiền Nhân',
      'thap-huong-tri-an': 'Thắp Hương Tri Ân & Dâng Lễ Tiền Linh',
      'cam-nang-nghi-le': 'Cẩm Nang Nghi Lễ & Phong Tục Cổ Truyền',
      'chi-tiet-nghi-le': 'Nghi Lễ Xuân Tế Kỳ Yên Mùng 10 Tháng Giêng',
      'ma-tran-phan-quyen': 'Hệ Thống Phân Cấp Vai Trò & Ma Trận Quyền Hạn Dòng Tộc',
      'quan-ly-thanh-vien': 'Quản Lý Thành Viên & Danh Bạ Dòng Tộc Chi Trực Lăng',
      'moi-thanh-vien': 'Gửi Lời Mời Gia Nhập Không Gian Gia Tộc',
      'thong-bao-gia-toc': 'Trung Tâm Thông Báo & Tin Tức Dòng Tộc',
      'ho-so-ca-nhan': 'Hồ Sơ Định Danh & Phả Hệ Cá Nhân (Nguyễn Trực Viễn)',
      'bao-mat-tai-khoan': 'Trung Tâm An Toàn & Bảo Mật Tài Khoản (2FA)',
      'goi-dich-vu-ngan-quy': 'Gói Dịch Vụ Số Hóa & Quỹ Phụng Điền Dòng Tộc',
      // Admin screens
      'admin-dang-nhap': 'Cổng Đăng Nhập Quản Trị Hệ Thống Trung Ương',
      'admin-tong-quan': 'Bảng Điều Khiển Tổng Quan Super Admin',
      'admin-nguoi-dung': 'Sổ Bộ Nhân Sự & Quản Lý Người Dùng',
      'admin-chi-tiet-nguoi-dung': 'Hồ Sơ Chi Tiết Người Dùng & Quyền Phủ Quyết',
      'admin-khong-gian-gia-toc': 'Quản Lý Không Gian Gia Tộc & Nhà Thờ Họ Toàn Quốc',
      'admin-chi-tiet-khong-gian': 'Chi Tiết Quản Trị Không Gian Gia Tộc',
      'admin-van-hanh-ai': 'Trung Tâm Vận Hành & Hạ Tầng AI Di Sản',
      'admin-tham-dinh-ai': 'Hội Đồng Thẩm Định & Kiểm Chuẩn Kết Quả AI',
      'admin-kiem-duyet': 'Kiểm Duyệt Nội Dung & Tôn Nghiêm Di Sản',
      'admin-cms-cam-nang': 'Hệ Thống CMS Cẩm Nang Nghi Lễ & Tri Thức Di Sản',
      'admin-nhat-ky-audit': 'Nhật Ký Kiểm Toán Bất Biến & An Ninh Hệ Thống',
      'admin-cai-dat-he-thong': 'Cài Đặt & Cấu Hình Hệ Thống Trung Ương',
    };
    document.title = `${screenTitles[currentScreen]} | Thích Cúng Kiếng`;
  }, [currentScreen]);


  // Keep legacy actions usable without native blocking dialogs and keep remote media graceful offline.
  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout> | undefined;
    const originalAlert = window.alert.bind(window);
    window.alert = (message?: unknown) => {
      setGlobalToast(String(message ?? 'Đã hoàn tất thao tác.'));
      if (timeoutId) clearTimeout(timeoutId);
      timeoutId = setTimeout(() => setGlobalToast(null), 3500);
    };
    const handleImageError = (event: Event) => {
      const image = event.target;
      if (!(image instanceof HTMLImageElement) || !image.src.startsWith('http') || image.dataset.fallbackApplied) return;
      image.dataset.fallbackApplied = 'true';
      image.src = OFFLINE_IMAGE_PLACEHOLDER;
      image.alt = image.alt || 'Hình ảnh di sản tạm thời không khả dụng';
    };
    window.addEventListener('error', handleImageError, true);
    return () => {
      window.alert = originalAlert;
      window.removeEventListener('error', handleImageError, true);
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, []);
  const publicMarketingScreens: ScreenType[] = ['guest-landing', 'platform-features', 'privacy-security', 'pricing'];
  if (publicMarketingScreens.includes(currentScreen)) {
    return currentScreen === 'guest-landing' ? <MarketingHomeScreen onNavigate={handleNavigate} onLogout={handleLogout} />
      : currentScreen === 'platform-features' ? <PlatformFeaturesScreen onNavigate={handleNavigate} onLogout={handleLogout} />
        : currentScreen === 'privacy-security' ? <PrivacySecurityScreen onNavigate={handleNavigate} onLogout={handleLogout} />
          : <PricingScreen onNavigate={handleNavigate} onLogout={handleLogout} />;
  }

  // Handle standalone Login & Register screens matching design screenshot
  if (currentScreen === 'login') {
    return (
      <LoginScreen
        onNavigate={handleNavigate}
        onLoginSuccess={() => setUserRole('user')}
      />
    );
  }

  if (currentScreen === 'register') {
    return (
      <RegisterScreen
        onNavigate={handleNavigate}
      />
    );
  }

  if (currentScreen === 'forgot-password') {
    return (
      <ForgotPasswordScreen
        onNavigate={handleNavigate}
      />
    );
  }

  if (currentScreen === 'chon-khong-gian') {
    return (
      <SelectSpaceScreen
        onNavigate={handleNavigate}
      />
    );
  }

  if (currentScreen === 'khoi-tao-gia-toc') {
    return (
      <CreateClanScreen
        onNavigate={handleNavigate}
        clanData={clanData}
        setClanData={setClanData}
      />
    );
  }

  if (currentScreen === 'thiet-lap-gia-dinh') {
    return (
      <FamilySetupScreen
        onNavigate={handleNavigate}
        clanData={clanData}
      />
    );
  }

  // Handle Admin Portal screens separately for clean administrative layout
  if (currentScreen === 'admin-dang-nhap') {
    return (
      <AdminLoginScreen
        onNavigate={handleNavigate}
        onAuthenticated={() => {
          setIsAdminAuthenticated(true);
          setCurrentScreen('admin-tong-quan');
        }}
      />
    );
  }

  if (currentScreen.startsWith('admin-')) {
    return (
      <AdminLayout
        currentScreen={currentScreen}
        onNavigate={handleNavigate}
        isDarkMode={isDarkMode}
        onToggleDarkMode={toggleDarkMode}
      >
        {currentScreen === 'admin-tong-quan' && (
          <AdminDashboardScreen onNavigate={handleNavigate} />
        )}
        {currentScreen === 'admin-nguoi-dung' && (
          <AdminUserManagementScreen onNavigate={handleNavigate} />
        )}
        {currentScreen === 'admin-chi-tiet-nguoi-dung' && (
          <AdminUserDetailScreen onNavigate={handleNavigate} />
        )}
        {currentScreen === 'admin-khong-gian-gia-toc' && (
          <AdminClanSpacesScreen onNavigate={handleNavigate} />
        )}
        {currentScreen === 'admin-chi-tiet-khong-gian' && (
          <AdminClanDetailScreen onNavigate={handleNavigate} />
        )}
        {currentScreen === 'admin-van-hanh-ai' && (
          <AdminAIOperationsScreen onNavigate={handleNavigate} />
        )}
        {currentScreen === 'admin-tham-dinh-ai' && (
          <AdminAIReviewScreen onNavigate={handleNavigate} />
        )}
        {currentScreen === 'admin-kiem-duyet' && (
          <AdminModerationScreen onNavigate={handleNavigate} />
        )}
        {currentScreen === 'admin-cms-cam-nang' && (
          <AdminHandbookCMSScreen onNavigate={handleNavigate} />
        )}
        {currentScreen === 'admin-nhat-ky-audit' && (
          <AdminAuditLogScreen onNavigate={handleNavigate} />
        )}
        {currentScreen === 'admin-cai-dat-he-thong' && (
          <AdminSystemSettingsScreen onNavigate={handleNavigate} />
        )}
      </AdminLayout>
    );
  }

  return (
    <div className="min-h-screen flex bg-[#f7eee2] text-[#2b1b15] dark:bg-[#1a0a0c] dark:text-[#f7ebe8] transition-colors duration-200">
      {globalToast && (
        <div className="fixed right-5 top-24 z-[70] flex max-w-md items-start gap-3 rounded-xl border border-secondary/40 bg-inverse-surface px-4 py-3 text-sm text-inverse-on-surface shadow-2xl" role="status">
          <span className="material-symbols-outlined text-secondary">info</span>
          <span className="flex-1">{globalToast}</span>
          <button type="button" onClick={() => setGlobalToast(null)} aria-label="Đóng thông báo"><span className="material-symbols-outlined text-base">close</span></button>
        </div>
      )}

      {/* Left Heritage Sidebar */}
      <Sidebar
        currentScreen={currentScreen}
        onNavigate={handleNavigate}
        isCollapsed={isSidebarCollapsed}
        onToggleCollapse={() => setIsSidebarCollapsed((prev) => !prev)}
        isOpenMobile={isMobileSidebarOpen}
        onCloseMobile={() => setIsMobileSidebarOpen(false)}
        userRole={userRole}
        onLogout={handleLogout}
      />

      {/* Right Main Container (Padded left for fixed Sidebar) */}
      <div
        className={`flex-1 flex flex-col min-w-0 transition-all duration-300 ${
          isSidebarCollapsed ? 'md:pl-[72px]' : 'md:pl-[260px]'
        }`}
      >
        {/* Top Slim Header (h-[58px]) */}
        <Header
          currentScreen={currentScreen}
          onNavigate={handleNavigate}
          isDarkMode={isDarkMode}
          onToggleDarkMode={toggleDarkMode}
          userRole={userRole}
          onToggleUserRole={handleToggleUserRole}
          onLogin={handleLogin}
          onLogout={handleLogout}
          onToggleSidebar={() => setIsSidebarCollapsed((prev) => !prev)}
          onOpenMobileSidebar={() => setIsMobileSidebarOpen(true)}
        />

        {/* Main Content Area */}
        <main className="flex-1">
        {/* Contextual notice if guest is visiting a protected user screen */}
        {userRole === 'guest' && USER_SCREENS.includes(currentScreen) && (
          <div className="bg-amber-500/10 border-b border-amber-500/30 text-amber-900 dark:text-amber-200 px-4 py-2.5 text-xs flex flex-wrap items-center justify-between gap-3 sticky top-20 z-40 backdrop-blur-md">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[18px] text-amber-600">lock_open</span>
              <span>
                <strong>Góc nhìn Khách (Guest):</strong> Trang &ldquo;<strong>{SCREEN_CONFIGS[currentScreen]?.title}</strong>&rdquo; là phân hệ nội bộ dòng họ. Bạn đang xem với dữ liệu minh họa.
              </span>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={() => setUserRole('user')}
                className="px-3 py-1 bg-primary text-on-primary rounded-lg font-semibold text-[11px] hover:bg-primary/90 transition-colors cursor-pointer shadow-xs"
              >
                Chuyển sang vai trò Thành viên (User)
              </button>
              <button
                type="button"
                onClick={() => handleNavigate('chon-khong-gian')}
                className="underline text-[11px] text-amber-800 dark:text-amber-300 hover:text-primary cursor-pointer"
              >
                Về Không Gian Mở
              </button>
            </div>
          </div>
        )}

        {currentScreen === 'today' && <TodayScreen onNavigate={handleNavigate} />}
        {currentScreen === 'family-calendar' && <FamilyCalendarScreen onNavigate={handleNavigate} />}
        {currentScreen === 'reset-password' && (
          <ResetPasswordScreen onNavigate={handleNavigate} />
        )}
        {currentScreen === 'them-su-kien' && (
          <CreateEventScreen onNavigate={handleNavigate} />
        )}
        {currentScreen === 'chi-tiet-gio-chap' && (
          <EventDetailScreen onNavigate={handleNavigate} />
        )}
        {currentScreen === 'tong-quan-pha-he' && (
          <GenealogyOverviewScreen onNavigate={handleNavigate} />
        )}
        {currentScreen === 'cay-pha-he-25d' && (
          <GenealogyTree25DScreen onNavigate={handleNavigate} />
        )}
        {currentScreen === 'ho-so-tien-nhan' && (
          <AncestorProfileScreen onNavigate={handleNavigate} />
        )}
        {currentScreen === 'them-thanh-vien' && (
          <AddMemberScreen onNavigate={handleNavigate} />
        )}
        {currentScreen === 'kho-ky-uc' && (
          <MemoryArchiveScreen onNavigate={handleNavigate} />
        )}
        {currentScreen === 'phuc-che-ai' && (
          <AIRestorationScreen onNavigate={handleNavigate} />
        )}
        {currentScreen === 'chi-tiet-di-vat' && (
          <RelicDetailScreen onNavigate={handleNavigate} />
        )}
        {currentScreen === 'tuyen-tap-album' && (
          <AlbumCollectionScreen onNavigate={handleNavigate} />
        )}
        {currentScreen === 'hoan-tat-phuc-che' && (
          <RestorationCompleteScreen onNavigate={handleNavigate} />
        )}
        {currentScreen === 'dang-phuc-che' && (
          <RestorationProgressScreen onNavigate={handleNavigate} />
        )}
        {currentScreen === 'lich-su-phuc-che' && (
          <RestorationHistoryScreen onNavigate={handleNavigate} />
        )}
        {currentScreen === 'bao-tang-gia-bao' && (
          <HeritageMuseumScreen onNavigate={handleNavigate} />
        )}
        {currentScreen === 'hien-tang-gia-bao' && (
          <DonateRelicScreen onNavigate={handleNavigate} />
        )}
        {currentScreen === 'chi-tiet-gia-bao' && (
          <RelicDetail3DScreen onNavigate={handleNavigate} />
        )}
        {currentScreen === 'phan-tich-but-tich' && (
          <ManuscriptAnalysisScreen onNavigate={handleNavigate} />
        )}
        {currentScreen === 'cay-ky-niem' && (
          <MemorialTreeScreen onNavigate={handleNavigate} />
        )}
        {currentScreen === 'them-cot-moc' && (
          <AddMilestoneScreen onNavigate={handleNavigate} />
        )}
        {currentScreen === 'tu-sach-gia-phong' && (
          <FamilyTraditionLibraryScreen onNavigate={handleNavigate} />
        )}
        {currentScreen === 'bien-nien-su' && (
          <ClanChronicleTimelineScreen onNavigate={handleNavigate} />
        )}
        {currentScreen === 'cau-chuyen-gia-phong' && (
          <FamilyStoryDetailScreen onNavigate={handleNavigate} />
        )}
        {currentScreen === 'khong-gian-tuong-niem-3d' && (
          <VirtualMemorialHall3DScreen onNavigate={handleNavigate} />
        )}
        {currentScreen === 'ho-so-huong-linh' && (
          <AncestralProfileDetailScreen onNavigate={handleNavigate} />
        )}
        {currentScreen === 'thap-huong-tri-an' && (
          <OfferIncenseScreen onNavigate={handleNavigate} />
        )}
        {currentScreen === 'cam-nang-nghi-le' && (
          <RitualHandbookScreen onNavigate={handleNavigate} />
        )}
        {currentScreen === 'chi-tiet-nghi-le' && (
          <RitualDetailScreen onNavigate={handleNavigate} />
        )}
        {currentScreen === 'ma-tran-phan-quyen' && (
          <RolePermissionMatrixScreen onNavigate={handleNavigate} />
        )}
        {currentScreen === 'quan-ly-thanh-vien' && (
          <ClanMemberDirectoryScreen onNavigate={handleNavigate} />
        )}
        {currentScreen === 'moi-thanh-vien' && (
          <InviteMembersScreen onNavigate={handleNavigate} />
        )}
        {currentScreen === 'thong-bao-gia-toc' && (
          <ClanNotificationCenterScreen onNavigate={handleNavigate} />
        )}
        {currentScreen === 'ho-so-ca-nhan' && (
          <UserProfilePedigreeScreen onNavigate={handleNavigate} />
        )}
        {currentScreen === 'bao-mat-tai-khoan' && (
          <AccountSecurityScreen onNavigate={handleNavigate} />
        )}
        {currentScreen === 'goi-dich-vu-ngan-quy' && (
          <SubscriptionFundScreen onNavigate={handleNavigate} />
        )}
      </main>

      {/* Bottom Footer */}
      <Footer />
      </div>
    </div>
  );
}
