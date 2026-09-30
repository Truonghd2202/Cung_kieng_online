import React, { useState, useEffect } from "react";
import {
  ArrowLeft,
  User,
  Sun,
  Moon,
  Monitor,
  Bell,
  Volume2,
  Trash2,
  LogOut,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  Camera,
  Edit2,
  Info,
  Check,
  AlertTriangle,
  Lock,
} from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { Badge } from "@/src/components/ui/badge";
import { Card } from "@/src/components/ui/card";

interface SettingsScreenProps {
  onBackToAccount: () => void;
  onGoToHome: () => void;
  dark: boolean;
  onToggleDark: () => void;
  user?: { name: string; email: string } | null;
  onUpdateProfile?: (updated: { name: string; email?: string }) => void;
  onLogout?: () => void;
  onClearAllLocalData?: () => void;
}

export const SettingsScreen: React.FC<SettingsScreenProps> = ({
  onBackToAccount,
  onGoToHome,
  dark,
  onToggleDark,
  user,
  onUpdateProfile,
  onLogout,
  onClearAllLocalData,
}) => {
  // Navigation section scroll
  const [activeSection, setActiveSection] = useState<string>("profile");

  // Profile Edit State
  const [displayName, setDisplayName] = useState(user?.name || "An Nhiên");
  const [isEditingName, setIsEditingName] = useState(false);
  const [tempName, setTempName] = useState(displayName);

  // Đồng bộ displayName khi user prop từ App thay đổi
  useEffect(() => {
    if (user?.name) {
      setDisplayName(user.name);
      setTempName(user.name);
    }
  }, [user?.name]);

  // Experience Settings
  const [displayMode, setDisplayMode] = useState<"light" | "dark" | "system">(() => {
    return dark ? "dark" : "light";
  });
  const [smoothAnimations, setSmoothAnimations] = useState(true);
  const [bellSound, setBellSound] = useState(true);

  // Selected topics
  const [selectedTopics, setSelectedTopics] = useState<string[]>([
    "giadao",
    "tap-tuc",
    "chua-keo",
    "xinxam",
  ]);

  // Notifications Checkboxes (lưu trữ và đồng bộ cục bộ trên trình duyệt)
  const [notifyRam, setNotifyRam] = useState(() => {
    try {
      const stored = localStorage.getItem("tltl-settings-notify-ram");
      return stored !== null ? stored === "true" : true;
    } catch {
      return true;
    }
  });
  const [notifyMorning, setNotifyMorning] = useState(() => {
    try {
      const stored = localStorage.getItem("tltl-settings-notify-morning");
      return stored !== null ? stored === "true" : true;
    } catch {
      return true;
    }
  });
  const [notifyFestivals, setNotifyFestivals] = useState(() => {
    try {
      const stored = localStorage.getItem("tltl-settings-notify-festivals");
      return stored !== null ? stored === "true" : true;
    } catch {
      return true;
    }
  });
  const [notificationPermission, setNotificationPermission] = useState<string>(() => {
    if (typeof window !== "undefined" && "Notification" in window) {
      return Notification.permission;
    }
    return "default";
  });
  const [testNotificationSent, setTestNotificationSent] = useState(false);

  // Modal confirm clear data
  const [showClearConfirm, setShowClearConfirm] = useState(false);
  const [dataClearedNotice, setDataClearedNotice] = useState(false);

  const handleToggleNotifyRam = (val: boolean) => {
    setNotifyRam(val);
    try {
      localStorage.setItem("tltl-settings-notify-ram", String(val));
    } catch {}
  };

  const handleToggleNotifyMorning = (val: boolean) => {
    setNotifyMorning(val);
    try {
      localStorage.setItem("tltl-settings-notify-morning", String(val));
    } catch {}
  };

  const handleToggleNotifyFestivals = (val: boolean) => {
    setNotifyFestivals(val);
    try {
      localStorage.setItem("tltl-settings-notify-festivals", String(val));
    } catch {}
  };

  const handleSendTestNotification = () => {
    if (typeof window !== "undefined" && "Notification" in window && Notification.permission === "granted") {
      try {
        new Notification("Thích Cúng Kiếng • Kiểm tra cài đặt", {
          body: "Đã kích hoạt thử nghiệm thông báo từ mục Cài đặt trên máy của bạn.",
          icon: "/logo.png",
        });
        setTestNotificationSent(true);
        setTimeout(() => setTestNotificationSent(false), 4000);
      } catch {}
    }
  };

  const handleSaveName = () => {
    const cleanName = tempName.trim();
    if (cleanName) {
      setDisplayName(cleanName);
      if (onUpdateProfile) {
        onUpdateProfile({ name: cleanName, email: user?.email });
      } else {
        try {
          const stored = localStorage.getItem("tltl-current-user");
          if (stored) {
            const parsed = JSON.parse(stored);
            parsed.name = cleanName;
            localStorage.setItem("tltl-current-user", JSON.stringify(parsed));
          }
        } catch {}
      }
    }
    setIsEditingName(false);
  };

  const handleRequestPermission = async () => {
    if (typeof window !== "undefined" && "Notification" in window) {
      try {
        const perm = await Notification.requestPermission();
        setNotificationPermission(perm);
      } catch {}
    }
  };

  const handleConfirmClearData = () => {
    if (onClearAllLocalData) {
      onClearAllLocalData();
    } else {
      try {
        localStorage.clear();
      } catch {}
    }
    setShowClearConfirm(false);
    setDataClearedNotice(true);
    setTimeout(() => {
      setDataClearedNotice(false);
      onGoToHome();
    }, 2000);
  };

  return (
    <div className="screen-shell">
      <main className="page-container max-w-6xl">
        {/* Top Breadcrumb */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 text-xs text-muted">
          <div className="flex items-center gap-2">
            <button
              onClick={onGoToHome}
              className="hover:text-accent cursor-pointer transition-colors"
            >
              Hôm nay
            </button>
            <span>/</span>
            <button
              onClick={onBackToAccount}
              className="hover:text-accent cursor-pointer transition-colors"
            >
              Góc của tôi
            </button>
            <span>/</span>
            <span className="text-accent font-semibold">Cài đặt & Tùy chọn</span>
          </div>

          <button
            onClick={onBackToAccount}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted hover:text-accent transition-colors cursor-pointer self-start sm:self-auto"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Về Góc của tôi (Màn 21)</span>
          </button>
        </div>

        {/* Header Title Section */}
        <div className="mb-8">
          <span className="text-xs font-bold uppercase tracking-wider text-accent mb-1 block">
            TÙY BIẾN KHÔNG GIAN
          </span>
          <h1 className="page-title mb-2">
            Cài đặt & Tùy chọn cá nhân
          </h1>
          <p className="text-sm sm:text-base text-ink leading-relaxed max-w-3xl">
            Điều chỉnh không gian tĩnh tại, nhịp trải nghiệm văn hóa và quản lý dữ liệu lưu trữ trên
            thiết bị của bạn.
          </p>
        </div>

        {/* 2-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column (4 cols): User Profile Card & Navigation Menu */}
          <div className="lg:col-span-3 space-y-4 lg:sticky lg:top-24">
            {/* User Badge Card */}
            <Card className="p-5 rounded-card bg-surface border border-line shadow-xs">
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-full overflow-hidden bg-surface border border-line shrink-0">
                  <span className="grid h-full w-full place-items-center bg-accent-soft font-display text-xl font-semibold text-accent" aria-hidden="true">
                    {displayName.trim().charAt(0).toUpperCase()}
                  </span>
                </div>
                <div>
                  <h3 className="font-display font-bold text-base text-ink">
                    {displayName}
                  </h3>
                  <p className="text-sm text-muted">Tâm thức an hòa • Bản demo</p>
                </div>
              </div>
            </Card>

            {/* Navigation Menu Links */}
            <Card className="p-3 rounded-card bg-surface border border-line shadow-xs space-y-1 text-xs font-semibold text-ink">
              <button
                type="button"
                onClick={() => setActiveSection("profile")}
                className={`w-full text-left px-4 py-2.5 rounded-panel flex items-center justify-between transition-all cursor-pointer ${
                  activeSection === "profile"
                    ? "bg-accent-soft text-accent"
                    : "hover:bg-surface-soft text-ink"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <User className="w-4 h-4" />
                  <span>Hồ sơ cá nhân</span>
                </div>
                {activeSection === "profile" && <span className="w-1.5 h-1.5 rounded-full bg-action" />}
              </button>

              <button
                type="button"
                onClick={() => setActiveSection("experience")}
                className={`w-full text-left px-4 py-2.5 rounded-panel flex items-center justify-between transition-all cursor-pointer ${
                  activeSection === "experience"
                    ? "bg-accent-soft text-accent"
                    : "hover:bg-surface-soft text-ink"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Sparkles className="w-4 h-4" />
                  <span>Tùy biến trải nghiệm</span>
                </div>
                {activeSection === "experience" && <span className="w-1.5 h-1.5 rounded-full bg-action" />}
              </button>

              <button
                type="button"
                onClick={() => setActiveSection("notifications")}
                className={`w-full text-left px-4 py-2.5 rounded-panel flex items-center justify-between transition-all cursor-pointer ${
                  activeSection === "notifications"
                    ? "bg-accent-soft text-accent"
                    : "hover:bg-surface-soft text-ink"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Bell className="w-4 h-4" />
                  <span>Thông báo & Nhắc lịch</span>
                </div>
                {notificationPermission === "granted" && (
                  <span className="w-2 h-2 rounded-full bg-success" />
                )}
              </button>

              <button
                type="button"
                onClick={() => setActiveSection("data")}
                className={`w-full text-left px-4 py-2.5 rounded-panel flex items-center justify-between transition-all cursor-pointer ${
                  activeSection === "data"
                    ? "bg-accent-soft text-accent"
                    : "hover:bg-surface-soft text-ink"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Dữ liệu bản demo</span>
                </div>
                {activeSection === "data" && <span className="w-1.5 h-1.5 rounded-full bg-action" />}
              </button>

              {onLogout && (
                <div className="pt-2 border-t border-line">
                  <button
                    type="button"
                    onClick={onLogout}
                    className="w-full text-left px-4 py-2.5 rounded-panel flex items-center gap-2.5 text-danger hover:bg-danger-soft transition-all cursor-pointer"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Đăng xuất khỏi thiết bị này</span>
                  </button>
                </div>
              )}
            </Card>

            <div className="p-4 rounded-panel bg-surface border border-line text-xs text-muted italic leading-relaxed">
              Bản demo hoạt động cục bộ trên thiết bị của bạn. Mọi thay đổi đều được ghi nhớ trực tiếp
              vào bộ nhớ trình duyệt.
            </div>
          </div>

          {/* Right Column (8 cols): Setting Blocks */}
          <div className="lg:col-span-9 space-y-6">
            {/* Block 1: Hồ sơ cá nhân */}
            <Card className="p-6 sm:p-8 rounded-card bg-surface border border-line shadow-xs">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-accent mb-1">
                <User className="w-3.5 h-3.5" />
                <span>HỒ SƠ CÁ NHÂN</span>
              </div>
              <h3 className="font-display font-bold text-xl text-ink mb-2">
                Thông tin người dùng
              </h3>
              <p className="text-sm text-muted mb-6">
                Thông tin hiển thị khi check-in tâm trạng và lưu giữ các mục chiêm nghiệm.
              </p>

              {/* Avatar Row */}
              <div className="flex items-center justify-between p-4 rounded-panel bg-surface border border-line mb-5">
                <div className="flex items-center gap-3.5">
                  <div className="w-14 h-14 rounded-full overflow-hidden bg-surface border border-line">
                    <span className="grid h-full w-full place-items-center bg-accent-soft font-display text-2xl font-semibold text-accent" aria-hidden="true">
                      {displayName.trim().charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <div className="font-bold text-sm text-ink">Ảnh đại diện người dùng</div>
                    <div className="text-xs text-muted">Định dạng JPG, PNG • Chỉ lưu tại bộ nhớ máy</div>
                  </div>
                </div>

                <Button
                  size="sm"
                  variant="outline"
                  className="text-xs border-line gap-1.5"
                  onClick={() => alert("Tính năng đổi ảnh đại diện cá nhân hóa từ tệp tin sẽ có khi mở rộng bộ nhớ.")}
                >
                  <Camera className="w-3.5 h-3.5 text-accent" />
                  <span>Đổi ảnh</span>
                </Button>
              </div>

              {/* Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <label htmlFor="settings-display-name" className="block text-xs font-semibold text-ink mb-1.5">
                    Tên hiển thị:
                  </label>
                  {isEditingName ? (
                    <div className="flex gap-2">
                      <input
                        id="settings-display-name"
                        type="text"
                        value={tempName}
                        onChange={(e) => setTempName(e.target.value)}
                        className="min-w-0 flex-1 px-3 py-2 rounded-control border border-accent bg-surface text-base text-ink font-medium outline-none"
                      />
                      <Button size="sm" onClick={handleSaveName} className="text-xs bg-action text-white">
                        Lưu
                      </Button>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between px-3.5 py-2.5 rounded-xl border border-line bg-surface text-xs font-medium">
                      <span>{displayName}</span>
                      <button
                        onClick={() => {
                          setTempName(displayName);
                          setIsEditingName(true);
                        }}
                        className="text-accent hover:underline flex items-center gap-1 cursor-pointer"
                      >
                        <Edit2 className="w-3 h-3" />
                        <span>Sửa</span>
                      </button>
                    </div>
                  )}
                </div>

                <div>
                  <div className="block text-xs font-semibold text-ink mb-1.5">Địa chỉ hòm thư (Email):</div>
                  <div className="px-3.5 py-2.5 rounded-xl border border-line bg-surface-soft text-xs font-medium text-muted flex items-center justify-between">
                    <span className="font-sans tabular-nums text-xs">{user?.email || "annhien@tinlamtamlinh.vn"}</span>
                    <span className="text-xs text-muted">
                      {user?.email === "annhien@tinlamtamlinh.vn" ? "Tài khoản mẫu" : "Hồ sơ cục bộ trên máy"}
                    </span>
                  </div>
                </div>
              </div>

              <p className="text-sm text-muted italic">
                Tên hiển thị dùng để gọi bạn trong các lời chào buổi sớm và lưu trữ các dòng chiêm
                nghiệm tại góc lưu bút riêng tư.
              </p>
            </Card>

            {/* Block 2: Tùy biến trải nghiệm */}
            <Card className="p-6 sm:p-8 rounded-card bg-surface border border-line shadow-xs">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-accent mb-1">
                <Sparkles className="w-3.5 h-3.5" />
                <span>TÙY BIẾN TRẢI NGHIỆM</span>
              </div>
              <h3 className="font-display font-bold text-xl text-ink mb-2">
                Không gian hiển thị & Âm thanh an hòa
              </h3>
              <p className="text-sm text-muted mb-6">
                Lựa chọn tông màu và âm sắc phù hợp với trạng thái tâm tư trong từng thời điểm trong ngày.
              </p>

              {/* Theme selector */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
                <div
                  onClick={() => {
                    setDisplayMode("light");
                    if (dark && onToggleDark) onToggleDark();
                  }}
                  className={`p-4 rounded-panel border cursor-pointer transition-all ${
                    displayMode === "light"
                      ? "bg-surface border-accent text-accent shadow-xs"
                      : "bg-surface border-line text-ink "
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <Sun className="w-4 h-4" />
                    {displayMode === "light" && <Check className="w-3.5 h-3.5" />}
                  </div>
                  <div className="font-bold text-xs">Màu Be (Ban Ngày)</div>
                  <div className="text-xs opacity-80 mt-1">Nền be ấm hoài cổ, thanh nhã di sản</div>
                </div>

                <div
                  onClick={() => {
                    setDisplayMode("dark");
                    if (!dark && onToggleDark) onToggleDark();
                  }}
                  className={`p-4 rounded-panel border cursor-pointer transition-all ${
                    displayMode === "dark"
                      ? "bg-surface border-accent text-accent shadow-xs"
                      : "bg-surface border-line text-ink "
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <Moon className="w-4 h-4" />
                    {displayMode === "dark" && <Check className="w-3.5 h-3.5" />}
                  </div>
                  <div className="font-bold text-xs">Màu Đỏ Sơn Mài (Ban Đêm)</div>
                  <div className="text-xs opacity-80 mt-1">Nền đỏ huyết dụ sơn mài, quý phái trang trọng</div>
                </div>

                <div
                  onClick={() => setDisplayMode("system")}
                  className={`p-4 rounded-panel border cursor-pointer transition-all ${
                    displayMode === "system"
                      ? "bg-surface border-accent text-accent shadow-xs"
                      : "bg-surface border-line text-ink "
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <Monitor className="w-4 h-4" />
                    {displayMode === "system" && <Check className="w-3.5 h-3.5" />}
                  </div>
                  <div className="font-bold text-xs">Theo thiết bị</div>
                  <div className="text-xs opacity-80 mt-1">Tự thích ứng Be sáng hoặc Đỏ sơn mài</div>
                </div>
              </div>

              {/* Smooth animation toggle */}
              <div className="flex items-center justify-between p-4 rounded-panel bg-surface border border-line mb-3">
                <div>
                  <div className="font-bold text-xs text-ink">Hiệu ứng chuyển động êm dịu</div>
                  <div className="text-xs text-muted">
                    Giúp việc lật thẻ xăm và xuất hiện quẻ chữ diễn ra mềm mại, uyển chuyển.
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setSmoothAnimations(!smoothAnimations)}
                  className={`w-11 h-6 rounded-full transition-colors relative cursor-pointer ${
                    smoothAnimations ? "bg-action" : "bg-surface-soft"
                  }`}
                >
                  <span
                    className={`block w-4 h-4 rounded-full bg-surface transition-transform ${
                      smoothAnimations ? "translate-x-6" : "translate-x-1"
                    }`}
                  />
                </button>
              </div>

              {/* Sound toggle */}
              <div className="flex items-center justify-between p-4 rounded-panel bg-surface border border-line mb-5">
                <div>
                  <div className="font-bold text-xs text-ink">Âm thanh chuông tĩnh tâm & tiếng gõ gỗ</div>
                  <div className="text-xs text-muted">
                    Tiếng chuông xoay và thanh âm mộc của nếp nhà truyền thống khi bắt đầu tĩnh tâm.
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setBellSound(!bellSound)}
                  className={`w-11 h-6 rounded-full transition-colors relative cursor-pointer ${
                    bellSound ? "bg-action" : "bg-surface-soft"
                  }`}
                >
                  <span
                    className={`block w-4 h-4 rounded-full bg-surface transition-transform ${
                      bellSound ? "translate-x-6" : "translate-x-1"
                    }`}
                  />
                </button>
              </div>

              {/* Topics chips */}
              <div>
                <div className="text-xs font-semibold text-ink mb-2">
                  Chủ đề văn hóa quan tâm:
                </div>
                <div className="flex flex-wrap gap-2 mb-3">
                  {[
                    { id: "giadao", label: "Gia đạo & Lễ tết gia tiên" },
                    { id: "tap-tuc", label: "Tập tục lễ hội dân gian" },
                    { id: "chua-keo", label: "Di tích & Kiến trúc cổ" },
                    { id: "xinxam", label: "Chiêm nghiệm xin xăm & quẻ chữ" },
                    { id: "cadao", label: "Ca dao & Tục ngữ phong thổ" },
                  ].map((chip) => {
                    const isSelected = selectedTopics.includes(chip.id);
                    return (
                      <button
                        key={chip.id}
                        type="button"
                        onClick={() =>
                          setSelectedTopics((prev) =>
                            isSelected ? prev.filter((x) => x !== chip.id) : [...prev, chip.id]
                          )
                        }
                        className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all cursor-pointer ${
                          isSelected
                            ? "bg-action border-accent text-white shadow-2xs"
                            : "bg-surface border-line text-ink hover:border-line"
                        }`}
                      >
                        {chip.label}
                      </button>
                    );
                  })}
                </div>
                <p className="text-sm text-muted italic">
                  Các chủ đề được chọn sẽ ưu tiên hiển thị nội dung trên màn Hôm nay và Khám phá.
                </p>
              </div>
            </Card>

            {/* Block 3: Nhắc lịch & Thông báo */}
            <Card className="p-6 sm:p-8 rounded-card bg-surface border border-line shadow-xs">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-accent mb-1">
                <Bell className="w-3.5 h-3.5" />
                <span>NHẮC LỊCH & THÔNG BÁO</span>
              </div>
              <h3 className="font-display font-bold text-xl text-ink mb-2">
                Thông báo nếp sống lành
              </h3>
              <p className="text-sm text-muted mb-5">
                Lắng nghe nhịp cuốn thời gian và các mốc tiết khí qua từng sớm mai.
              </p>

              {/* Permission Banner */}
              <div className="p-4 rounded-panel bg-surface border border-line flex flex-col gap-3 mb-5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-start gap-2.5">
                    <Bell className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                    <div>
                      <div className="font-bold text-xs text-ink">
                        Quyền thông báo trình duyệt:{" "}
                        <span className="text-accent">
                          {notificationPermission === "granted"
                            ? "Đã cấp quyền trên trình duyệt"
                            : notificationPermission === "denied"
                            ? "Bị chặn"
                            : "Chưa kích hoạt"}
                        </span>
                      </div>
                      <div className="text-xs text-muted mt-0.5">
                        Cần cấp quyền để trình duyệt có thể hiển thị các lời nhắc ngày rằm và giờ tĩnh tâm sáng sớm.
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    {notificationPermission !== "granted" ? (
                      <Button
                        size="sm"
                        onClick={handleRequestPermission}
                        className="text-xs bg-action hover:bg-action text-white shrink-0 cursor-pointer"
                      >
                        Kích hoạt quyền thông báo
                      </Button>
                    ) : (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={handleSendTestNotification}
                        className="text-xs border-line bg-surface text-accent hover:bg-surface shrink-0 cursor-pointer"
                      >
                        Gửi thử 1 thông báo
                      </Button>
                    )}
                  </div>
                </div>

                {testNotificationSent && (
                  <div className="text-xs text-success font-semibold pt-1 border-t border-line">
                    ✓ Đã kích hoạt 1 thông báo mẫu thử nghiệm trên màn hình của bạn.
                  </div>
                )}
              </div>

              {/* Disclaimer callout about background push in demo */}
              <div className="p-3 mb-4 rounded-xl bg-surface border border-line text-xs text-muted leading-relaxed flex items-start gap-2">
                <Info className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                <div>
                  <strong className="text-ink">Lưu ý về cơ chế nhắc lịch:</strong> Các công tắc bên dưới được lưu trữ trên trình duyệt của bạn. Tính năng tự động gửi thông báo nền theo lịch hẹn định kỳ đang được hoàn thiện khi kết nối máy chủ Backend (Sắp ra mắt).
                </div>
              </div>

              {/* Notification Toggles */}
              <div className="space-y-3 text-xs text-ink">
                <label className="flex items-center gap-3 p-3 rounded-panel bg-surface border border-line cursor-pointer hover:border-line transition-colors">
                  <input
                    type="checkbox"
                    checked={notifyRam}
                    onChange={(e) => handleToggleNotifyRam(e.target.checked)}
                    className="rounded text-accent focus:ring-accent"
                  />
                  <div>
                    <div className="font-bold">Nhắc ngày Rằm và Mùng Một âm lịch (Sóc vọng hàng tháng)</div>
                    <div className="text-xs text-muted">Gửi thông báo trước 1 ngày để bạn chuẩn bị không gian an tĩnh.</div>
                  </div>
                </label>

                <label className="flex items-center gap-3 p-3 rounded-panel bg-surface border border-line cursor-pointer hover:border-line transition-colors">
                  <input
                    type="checkbox"
                    checked={notifyMorning}
                    onChange={(e) => handleToggleNotifyMorning(e.target.checked)}
                    className="rounded text-accent focus:ring-accent"
                  />
                  <div>
                    <div className="font-bold">Nhắc nhịp tĩnh tâm và check-in cảm xúc buổi sáng (khoảng 08:00)</div>
                    <div className="text-xs text-muted">Lời chúc an lành và câu ca dao mở đầu ngày làm việc.</div>
                  </div>
                </label>

                <label className="flex items-center gap-3 p-3 rounded-panel bg-surface border border-line cursor-pointer hover:border-line transition-colors">
                  <input
                    type="checkbox"
                    checked={notifyFestivals}
                    onChange={(e) => handleToggleNotifyFestivals(e.target.checked)}
                    className="rounded text-accent focus:ring-accent"
                  />
                  <div>
                    <div className="font-bold">Nhắc các dịp lễ tết truyền thống lớn</div>
                    <div className="text-xs text-muted">Tết Thanh Minh, Tết Đoan Ngọ, Lễ Vu Lan báo hiếu, Tết Trung Thu...</div>
                  </div>
                </label>
              </div>
            </Card>

            {/* Block 4: Dữ liệu bản demo & Lưu trữ thiết bị */}
            <Card className="p-6 sm:p-8 rounded-card bg-surface border border-line shadow-xs">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-accent mb-1">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>DỮ LIỆU BẢN DEMO & LƯU TRỮ THIẾT BỊ</span>
              </div>
              <h3 className="font-display font-bold text-xl text-ink mb-2">
                Minh bạch lưu trữ trên trình duyệt
              </h3>
              <p className="text-sm text-muted mb-5 leading-relaxed">
                Toàn bộ quẻ xăm, điều ước riêng và nhật ký tâm trạng được lưu trực tiếp trên bộ nhớ máy
                (Local Storage) của trình duyệt. Không tải về máy chủ trung tâm.
              </p>

              {/* Data Cleared Toast */}
              {dataClearedNotice && (
                <div className="p-3.5 rounded-panel bg-success-soft border border-success/25 text-success text-xs mb-4 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-success shrink-0" />
                  <span>Đã xóa sạch toàn bộ dữ liệu trên trình duyệt này thành công. Đang chuyển về Trang chủ...</span>
                </div>
              )}

              {/* Data Actions */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-line">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={onBackToAccount}
                  className="w-full sm:w-auto text-xs rounded-xl border-line"
                >
                  Xem các mục đã lưu trong Góc của tôi
                </Button>

                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setShowClearConfirm(true)}
                  className="w-full sm:w-auto text-xs rounded-xl border-danger/25 text-danger hover:bg-danger-soft gap-1.5"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Xóa toàn bộ dữ liệu trên trình duyệt này</span>
                </Button>
              </div>
            </Card>

            {/* Block 5: Đang đăng nhập dưới phiên */}
            <div className="p-5 rounded-panel bg-surface border border-line flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
              <div>
                <div className="font-bold text-ink">
                  Đang đăng nhập dưới phiên: {displayName}
                </div>
                <div className="text-xs text-muted mt-0.5">
                  Khi đăng xuất, dữ liệu demo trên trình duyệt này vẫn được bảo lưu cho tài khoản.
                </div>
              </div>

              {onLogout && (
                <Button
                  size="sm"
                  variant="outline"
                  onClick={onLogout}
                  className="rounded-xl text-xs border-line text-accent hover:bg-danger-soft shrink-0"
                >
                  <LogOut className="w-3.5 h-3.5 mr-1" />
                  <span>Đăng xuất khỏi thiết bị này</span>
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* Modal: Xác nhận xóa dữ liệu */}
        {showClearConfirm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
            <Card className="max-w-md w-full p-6 rounded-card bg-surface border border-line shadow-2xl animate-in fade-in zoom-in-95 duration-200 text-center">
              <div className="w-12 h-12 rounded-panel bg-danger-soft border border-danger/25 mx-auto mb-4 flex items-center justify-center text-danger">
                <AlertTriangle className="w-6 h-6" />
              </div>

              <h3 className="font-display font-bold text-xl text-ink mb-2">
                Xóa toàn bộ dữ liệu trên trình duyệt?
              </h3>

              <p className="text-sm text-muted leading-relaxed mb-6">
                Hành động này sẽ xóa sạch các thẻ xăm đã lưu, nhật ký điều ước và các dấu mốc cá nhân
                trên máy này. Thao tác không thể hoàn tác.
              </p>

              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => setShowClearConfirm(false)}
                  className="w-1/2 rounded-panel text-xs font-semibold"
                >
                  Hủy bỏ
                </Button>

                <Button
                  variant="default"
                  size="lg"
                  onClick={handleConfirmClearData}
                  className="w-1/2 rounded-panel text-xs font-semibold bg-danger-action hover:bg-danger-action-hover text-white"
                >
                  Xác nhận xóa
                </Button>
              </div>
            </Card>
          </div>
        )}

      </main>
    </div>
  );
};
