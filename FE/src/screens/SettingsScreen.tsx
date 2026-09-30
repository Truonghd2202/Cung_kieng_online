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
  onLogout?: () => void;
  onClearAllLocalData?: () => void;
}

export const SettingsScreen: React.FC<SettingsScreenProps> = ({
  onBackToAccount,
  onGoToHome,
  dark,
  onToggleDark,
  user,
  onLogout,
  onClearAllLocalData,
}) => {
  // Navigation section scroll
  const [activeSection, setActiveSection] = useState<string>("profile");

  // Profile Edit State
  const [displayName, setDisplayName] = useState(user?.name || "An Nhiên");
  const [isEditingName, setIsEditingName] = useState(false);
  const [tempName, setTempName] = useState(displayName);

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

  // Notifications Checkboxes
  const [notifyRam, setNotifyRam] = useState(true);
  const [notifyMorning, setNotifyMorning] = useState(true);
  const [notifyFestivals, setNotifyFestivals] = useState(true);
  const [notificationPermission, setNotificationPermission] = useState<string>(() => {
    if (typeof window !== "undefined" && "Notification" in window) {
      return Notification.permission;
    }
    return "default";
  });

  // Modal confirm clear data
  const [showClearConfirm, setShowClearConfirm] = useState(false);
  const [dataClearedNotice, setDataClearedNotice] = useState(false);

  const handleSaveName = () => {
    if (tempName.trim()) {
      setDisplayName(tempName.trim());
      try {
        const stored = localStorage.getItem("tltl-current-user");
        if (stored) {
          const parsed = JSON.parse(stored);
          parsed.name = tempName.trim();
          localStorage.setItem("tltl-current-user", JSON.stringify(parsed));
        }
      } catch {}
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
    <div className="w-full min-h-screen bg-[#fcf8f2] text-[#2e2624] font-['Be_Vietnam_Pro',sans-serif]">
      <main className="max-w-6xl mx-auto px-4 sm:px-6 pt-6 pb-20">
        {/* Top Breadcrumb */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 text-xs text-[#8a7971]">
          <div className="flex items-center gap-2">
            <button
              onClick={onGoToHome}
              className="hover:text-[#9e3b2e] cursor-pointer transition-colors"
            >
              Hôm nay
            </button>
            <span>/</span>
            <button
              onClick={onBackToAccount}
              className="hover:text-[#9e3b2e] cursor-pointer transition-colors"
            >
              Góc của tôi
            </button>
            <span>/</span>
            <span className="text-[#9e3b2e] font-semibold">Cài đặt & Tùy chọn</span>
          </div>

          <button
            onClick={onBackToAccount}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#82716a] hover:text-[#9e3b2e] transition-colors cursor-pointer self-start sm:self-auto"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Về Góc của tôi (Màn 21)</span>
          </button>
        </div>

        {/* Header Title Section */}
        <div className="mb-8">
          <span className="text-xs font-bold uppercase tracking-wider text-[#9e3b2e] mb-1 block">
            TÙY BIẾN KHÔNG GIAN
          </span>
          <h1 className="font-['Noto_Serif',serif] font-bold text-3xl sm:text-4xl text-[#2a2220] leading-tight mb-2">
            Cài đặt & Tùy chọn cá nhân
          </h1>
          <p className="text-sm sm:text-base text-[#68574f] leading-relaxed max-w-3xl">
            Điều chỉnh không gian tĩnh tại, nhịp trải nghiệm văn hóa và quản lý dữ liệu lưu trữ trên
            thiết bị của bạn.
          </p>
        </div>

        {/* 2-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column (4 cols): User Profile Card & Navigation Menu */}
          <div className="lg:col-span-4 space-y-4 lg:sticky lg:top-24">
            {/* User Badge Card */}
            <Card className="p-5 rounded-3xl bg-white border border-[#eddcd0] shadow-xs">
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-full overflow-hidden bg-[#faede2] border border-[#ecd9cb] shrink-0">
                  <img
                    src="/images/ancestor_portrait.jpg"
                    alt="Ảnh đại diện"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-['Noto_Serif',serif] font-bold text-base text-[#2a2220]">
                    {displayName}
                  </h3>
                  <p className="text-xs text-[#8c7b74]">Tâm thức an hòa • Bản demo</p>
                </div>
              </div>
            </Card>

            {/* Navigation Menu Links */}
            <Card className="p-3 rounded-3xl bg-white border border-[#eddcd0] shadow-xs space-y-1 text-xs font-semibold text-[#5a4942]">
              <button
                type="button"
                onClick={() => setActiveSection("profile")}
                className={`w-full text-left px-4 py-2.5 rounded-2xl flex items-center justify-between transition-all cursor-pointer ${
                  activeSection === "profile"
                    ? "bg-[#faede2] text-[#9e3b2e]"
                    : "hover:bg-[#fbf5ee] text-[#55453e]"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <User className="w-4 h-4" />
                  <span>Hồ sơ cá nhân</span>
                </div>
                {activeSection === "profile" && <span className="w-1.5 h-1.5 rounded-full bg-[#9e3b2e]" />}
              </button>

              <button
                type="button"
                onClick={() => setActiveSection("experience")}
                className={`w-full text-left px-4 py-2.5 rounded-2xl flex items-center justify-between transition-all cursor-pointer ${
                  activeSection === "experience"
                    ? "bg-[#faede2] text-[#9e3b2e]"
                    : "hover:bg-[#fbf5ee] text-[#55453e]"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Sparkles className="w-4 h-4" />
                  <span>Tùy biến trải nghiệm</span>
                </div>
                {activeSection === "experience" && <span className="w-1.5 h-1.5 rounded-full bg-[#9e3b2e]" />}
              </button>

              <button
                type="button"
                onClick={() => setActiveSection("notifications")}
                className={`w-full text-left px-4 py-2.5 rounded-2xl flex items-center justify-between transition-all cursor-pointer ${
                  activeSection === "notifications"
                    ? "bg-[#faede2] text-[#9e3b2e]"
                    : "hover:bg-[#fbf5ee] text-[#55453e]"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Bell className="w-4 h-4" />
                  <span>Thông báo & Nhắc lịch</span>
                </div>
                {notificationPermission === "granted" && (
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                )}
              </button>

              <button
                type="button"
                onClick={() => setActiveSection("data")}
                className={`w-full text-left px-4 py-2.5 rounded-2xl flex items-center justify-between transition-all cursor-pointer ${
                  activeSection === "data"
                    ? "bg-[#faede2] text-[#9e3b2e]"
                    : "hover:bg-[#fbf5ee] text-[#55453e]"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Dữ liệu bản demo</span>
                </div>
                {activeSection === "data" && <span className="w-1.5 h-1.5 rounded-full bg-[#9e3b2e]" />}
              </button>

              {onLogout && (
                <div className="pt-2 border-t border-[#f4e8dc]">
                  <button
                    type="button"
                    onClick={onLogout}
                    className="w-full text-left px-4 py-2.5 rounded-2xl flex items-center gap-2.5 text-rose-700 hover:bg-rose-50 transition-all cursor-pointer"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Đăng xuất khỏi thiết bị này</span>
                  </button>
                </div>
              )}
            </Card>

            <div className="p-4 rounded-2xl bg-[#faf3ec] border border-[#eddcd0] text-[11px] text-[#7d6c65] italic leading-relaxed">
              Bản demo hoạt động cục bộ trên thiết bị của bạn. Mọi thay đổi đều được ghi nhớ trực tiếp
              vào bộ nhớ trình duyệt.
            </div>
          </div>

          {/* Right Column (8 cols): Setting Blocks */}
          <div className="lg:col-span-8 space-y-6">
            {/* Block 1: Hồ sơ cá nhân */}
            <Card className="p-6 sm:p-8 rounded-3xl bg-white border border-[#eddcd0] shadow-xs">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#9e3b2e] mb-1">
                <User className="w-3.5 h-3.5" />
                <span>HỒ SƠ CÁ NHÂN</span>
              </div>
              <h3 className="font-['Noto_Serif',serif] font-bold text-xl text-[#2a2220] mb-2">
                Thông tin người dùng
              </h3>
              <p className="text-xs text-[#7d6c65] mb-6">
                Thông tin hiển thị khi check-in tâm trạng và lưu giữ các mục chiêm nghiệm.
              </p>

              {/* Avatar Row */}
              <div className="flex items-center justify-between p-4 rounded-2xl bg-[#fbf5ee] border border-[#ecd9cb] mb-5">
                <div className="flex items-center gap-3.5">
                  <div className="w-14 h-14 rounded-full overflow-hidden bg-white border border-[#eddcd0]">
                    <img
                      src="/images/ancestor_portrait.jpg"
                      alt="Avatar"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <div className="font-bold text-sm text-[#2a2220]">Ảnh đại diện người dùng</div>
                    <div className="text-[11px] text-[#8e7e77]">Định dạng JPG, PNG • Chỉ lưu tại bộ nhớ máy</div>
                  </div>
                </div>

                <Button
                  size="sm"
                  variant="outline"
                  className="text-xs border-[#dfc4b1] gap-1.5"
                  onClick={() => alert("Tính năng đổi ảnh đại diện cá nhân hóa từ tệp tin sẽ có khi mở rộng bộ nhớ.")}
                >
                  <Camera className="w-3.5 h-3.5 text-[#9e3b2e]" />
                  <span>Đổi ảnh</span>
                </Button>
              </div>

              {/* Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-xs font-semibold text-[#5a4942] mb-1.5">
                    Tên hiển thị:
                  </label>
                  {isEditingName ? (
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={tempName}
                        onChange={(e) => setTempName(e.target.value)}
                        className="flex-1 px-3 py-2 rounded-xl border border-[#9e3b2e] text-xs font-medium outline-none"
                      />
                      <Button size="sm" onClick={handleSaveName} className="text-xs bg-[#9e3b2e] text-white">
                        Lưu
                      </Button>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between px-3.5 py-2.5 rounded-xl border border-[#eddcd0] bg-white text-xs font-medium">
                      <span>{displayName}</span>
                      <button
                        onClick={() => {
                          setTempName(displayName);
                          setIsEditingName(true);
                        }}
                        className="text-[#9e3b2e] hover:underline flex items-center gap-1 cursor-pointer"
                      >
                        <Edit2 className="w-3 h-3" />
                        <span>Sửa</span>
                      </button>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#5a4942] mb-1.5">
                    Địa chỉ hòm thư (Email):
                  </label>
                  <div className="px-3.5 py-2.5 rounded-xl border border-[#eddcd0] bg-stone-50 text-xs font-medium text-stone-600 flex items-center justify-between">
                    <span className="font-mono text-xs">{user?.email || "annhien@tinlamtamlinh.vn"}</span>
                    <span className="text-[10px] text-[#8e7e77]">
                      {user?.email === "annhien@tinlamtamlinh.vn" ? "Tài khoản mẫu" : "Hồ sơ cục bộ trên máy"}
                    </span>
                  </div>
                </div>
              </div>

              <p className="text-[11px] text-[#8e7e77] italic">
                Tên hiển thị dùng để gọi bạn trong các lời chào buổi sớm và lưu trữ các dòng chiêm
                nghiệm tại góc lưu bút riêng tư.
              </p>
            </Card>

            {/* Block 2: Tùy biến trải nghiệm */}
            <Card className="p-6 sm:p-8 rounded-3xl bg-white border border-[#eddcd0] shadow-xs">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#9e3b2e] mb-1">
                <Sparkles className="w-3.5 h-3.5" />
                <span>TÙY BIẾN TRẢI NGHIỆM</span>
              </div>
              <h3 className="font-['Noto_Serif',serif] font-bold text-xl text-[#2a2220] mb-2">
                Không gian hiển thị & Âm thanh an hòa
              </h3>
              <p className="text-xs text-[#7d6c65] mb-6">
                Lựa chọn tông màu và âm sắc phù hợp với trạng thái tâm tư trong từng thời điểm trong ngày.
              </p>

              {/* Theme selector */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
                <div
                  onClick={() => {
                    setDisplayMode("light");
                    if (dark && onToggleDark) onToggleDark();
                  }}
                  className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                    displayMode === "light"
                      ? "bg-[#faece1] border-[#9e3b2e] text-[#9e3b2e] shadow-2xs"
                      : "bg-[#fffdfa] border-[#ecdcd0] text-[#55453f]"
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <Sun className="w-4 h-4" />
                    {displayMode === "light" && <Check className="w-3.5 h-3.5" />}
                  </div>
                  <div className="font-bold text-xs">Chế độ Sáng</div>
                  <div className="text-[10px] opacity-80 mt-1">Nền giấy kem ấm, tao nhã ban ngày</div>
                </div>

                <div
                  onClick={() => {
                    setDisplayMode("dark");
                    if (!dark && onToggleDark) onToggleDark();
                  }}
                  className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                    displayMode === "dark"
                      ? "bg-[#faece1] border-[#9e3b2e] text-[#9e3b2e] shadow-2xs"
                      : "bg-[#fffdfa] border-[#ecdcd0] text-[#55453f]"
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <Moon className="w-4 h-4" />
                    {displayMode === "dark" && <Check className="w-3.5 h-3.5" />}
                  </div>
                  <div className="font-bold text-xs">Chế độ Tối</div>
                  <div className="text-[10px] opacity-80 mt-1">Nền mực đen tĩnh lặng, dịu mắt ban đêm</div>
                </div>

                <div
                  onClick={() => setDisplayMode("system")}
                  className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                    displayMode === "system"
                      ? "bg-[#faece1] border-[#9e3b2e] text-[#9e3b2e] shadow-2xs"
                      : "bg-[#fffdfa] border-[#ecdcd0] text-[#55453f]"
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <Monitor className="w-4 h-4" />
                    {displayMode === "system" && <Check className="w-3.5 h-3.5" />}
                  </div>
                  <div className="font-bold text-xs">Theo thiết bị</div>
                  <div className="text-[10px] opacity-80 mt-1">Tự động thích ứng màu hệ thống</div>
                </div>
              </div>

              {/* Smooth animation toggle */}
              <div className="flex items-center justify-between p-4 rounded-2xl bg-[#fbf5ee] border border-[#ecd9cb] mb-3">
                <div>
                  <div className="font-bold text-xs text-[#2a2220]">Hiệu ứng chuyển động êm dịu</div>
                  <div className="text-[11px] text-[#7d6c65]">
                    Giúp việc lật thẻ xăm và xuất hiện quẻ chữ diễn ra mềm mại, uyển chuyển.
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setSmoothAnimations(!smoothAnimations)}
                  className={`w-11 h-6 rounded-full transition-colors relative cursor-pointer ${
                    smoothAnimations ? "bg-[#9e3b2e]" : "bg-[#ded1c8]"
                  }`}
                >
                  <span
                    className={`block w-4 h-4 rounded-full bg-white transition-transform ${
                      smoothAnimations ? "translate-x-6" : "translate-x-1"
                    }`}
                  />
                </button>
              </div>

              {/* Sound toggle */}
              <div className="flex items-center justify-between p-4 rounded-2xl bg-[#fbf5ee] border border-[#ecd9cb] mb-5">
                <div>
                  <div className="font-bold text-xs text-[#2a2220]">Âm thanh chuông tĩnh tâm & tiếng gõ gỗ</div>
                  <div className="text-[11px] text-[#7d6c65]">
                    Tiếng chuông xoay và thanh âm mộc của nếp nhà truyền thống khi bắt đầu tĩnh tâm.
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setBellSound(!bellSound)}
                  className={`w-11 h-6 rounded-full transition-colors relative cursor-pointer ${
                    bellSound ? "bg-[#9e3b2e]" : "bg-[#ded1c8]"
                  }`}
                >
                  <span
                    className={`block w-4 h-4 rounded-full bg-white transition-transform ${
                      bellSound ? "translate-x-6" : "translate-x-1"
                    }`}
                  />
                </button>
              </div>

              {/* Topics chips */}
              <div>
                <div className="text-xs font-semibold text-[#5a4942] mb-2">
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
                            ? "bg-[#9e3b2e] border-[#9e3b2e] text-white shadow-2xs"
                            : "bg-[#fffdfa] border-[#ecdcd0] text-[#6d5b54] hover:border-[#dfc4b1]"
                        }`}
                      >
                        {chip.label}
                      </button>
                    );
                  })}
                </div>
                <p className="text-[11px] text-[#8e7e77] italic">
                  Các chủ đề được chọn sẽ ưu tiên hiển thị nội dung trên màn Hôm nay và Khám phá.
                </p>
              </div>
            </Card>

            {/* Block 3: Nhắc lịch & Thông báo */}
            <Card className="p-6 sm:p-8 rounded-3xl bg-white border border-[#eddcd0] shadow-xs">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#9e3b2e] mb-1">
                <Bell className="w-3.5 h-3.5" />
                <span>NHẮC LỊCH & THÔNG BÁO</span>
              </div>
              <h3 className="font-['Noto_Serif',serif] font-bold text-xl text-[#2a2220] mb-2">
                Thông báo nếp sống lành
              </h3>
              <p className="text-xs text-[#7d6c65] mb-5">
                Lắng nghe nhịp cuốn thời gian và các mốc tiết khí qua từng sớm mai.
              </p>

              {/* Permission Banner */}
              <div className="p-4 rounded-2xl bg-[#faf3ec] border border-[#ebd5c3] flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
                <div className="flex items-start gap-2.5">
                  <Bell className="w-4 h-4 text-[#9e3b2e] shrink-0 mt-0.5" />
                  <div>
                    <div className="font-bold text-xs text-[#2a2220]">
                      Quyền thông báo trình duyệt:{" "}
                      <span className="text-[#9e3b2e]">
                        {notificationPermission === "granted"
                          ? "Đã kích hoạt"
                          : notificationPermission === "denied"
                          ? "Bị chặn"
                          : "Chưa kích hoạt"}
                      </span>
                    </div>
                    <div className="text-[11px] text-[#7d6c65]">
                      Cần cấp quyền để nhận thông báo nhắc nhở ngày rằm hoặc giờ tĩnh tâm sáng sớm.
                    </div>
                  </div>
                </div>

                {notificationPermission !== "granted" && (
                  <Button
                    size="sm"
                    onClick={handleRequestPermission}
                    className="text-xs bg-[#9e3b2e] hover:bg-[#852f24] text-white shrink-0"
                  >
                    Kích hoạt quyền thông báo
                  </Button>
                )}
              </div>

              {/* Notification Toggles */}
              <div className="space-y-3 text-xs text-[#4e3f3a]">
                <label className="flex items-center gap-3 p-3 rounded-2xl bg-[#fbf5ee] border border-[#ecd9cb] cursor-pointer">
                  <input
                    type="checkbox"
                    checked={notifyRam}
                    onChange={(e) => setNotifyRam(e.target.checked)}
                    className="rounded text-[#9e3b2e] focus:ring-[#9e3b2e]"
                  />
                  <div>
                    <div className="font-bold">Nhắc ngày Rằm và Mùng Một âm lịch (Sóc vọng hàng tháng)</div>
                    <div className="text-[11px] text-[#7e6d65]">Gửi thông báo trước 1 ngày để bạn chuẩn bị không gian an tĩnh.</div>
                  </div>
                </label>

                <label className="flex items-center gap-3 p-3 rounded-2xl bg-[#fbf5ee] border border-[#ecd9cb] cursor-pointer">
                  <input
                    type="checkbox"
                    checked={notifyMorning}
                    onChange={(e) => setNotifyMorning(e.target.checked)}
                    className="rounded text-[#9e3b2e] focus:ring-[#9e3b2e]"
                  />
                  <div>
                    <div className="font-bold">Nhắc nhịp tĩnh tâm và check-in cảm xúc buổi sáng (khoảng 08:00)</div>
                    <div className="text-[11px] text-[#7e6d65]">Lời chúc an lành và câu ca dao mở đầu ngày làm việc.</div>
                  </div>
                </label>

                <label className="flex items-center gap-3 p-3 rounded-2xl bg-[#fbf5ee] border border-[#ecd9cb] cursor-pointer">
                  <input
                    type="checkbox"
                    checked={notifyFestivals}
                    onChange={(e) => setNotifyFestivals(e.target.checked)}
                    className="rounded text-[#9e3b2e] focus:ring-[#9e3b2e]"
                  />
                  <div>
                    <div className="font-bold">Nhắc các dịp lễ tết truyền thống lớn</div>
                    <div className="text-[11px] text-[#7e6d65]">Tết Thanh Minh, Tết Đoan Ngọ, Lễ Vu Lan báo hiếu, Tết Trung Thu...</div>
                  </div>
                </label>
              </div>
            </Card>

            {/* Block 4: Dữ liệu bản demo & Lưu trữ thiết bị */}
            <Card className="p-6 sm:p-8 rounded-3xl bg-white border border-[#eddcd0] shadow-xs">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#9e3b2e] mb-1">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>DỮ LIỆU BẢN DEMO & LƯU TRỮ THIẾT BỊ</span>
              </div>
              <h3 className="font-['Noto_Serif',serif] font-bold text-xl text-[#2a2220] mb-2">
                Minh bạch lưu trữ trên trình duyệt
              </h3>
              <p className="text-xs text-[#7d6c65] mb-5 leading-relaxed">
                Toàn bộ quẻ xăm, điều ước riêng và nhật ký tâm trạng được lưu trực tiếp trên bộ nhớ máy
                (Local Storage) của trình duyệt. Không tải về máy chủ trung tâm.
              </p>

              {/* Data Cleared Toast */}
              {dataClearedNotice && (
                <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs mb-4 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Đã xóa sạch toàn bộ dữ liệu trên trình duyệt này thành công. Đang chuyển về Trang chủ...</span>
                </div>
              )}

              {/* Data Actions */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-[#f4e8dc]">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={onBackToAccount}
                  className="w-full sm:w-auto text-xs rounded-xl border-[#eddcd0]"
                >
                  Xem các mục đã lưu trong Góc của tôi
                </Button>

                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setShowClearConfirm(true)}
                  className="w-full sm:w-auto text-xs rounded-xl border-rose-200 text-rose-700 hover:bg-rose-50 gap-1.5"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Xóa toàn bộ dữ liệu trên trình duyệt này</span>
                </Button>
              </div>
            </Card>

            {/* Block 5: Đang đăng nhập dưới phiên */}
            <div className="p-5 rounded-2xl bg-[#faf3ec] border border-[#ebd6c5] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
              <div>
                <div className="font-bold text-[#2a2220]">
                  Đang đăng nhập dưới phiên: {displayName}
                </div>
                <div className="text-[11px] text-[#7d6c65] mt-0.5">
                  Khi đăng xuất, dữ liệu demo trên trình duyệt này vẫn được bảo lưu cho tài khoản.
                </div>
              </div>

              {onLogout && (
                <Button
                  size="sm"
                  variant="outline"
                  onClick={onLogout}
                  className="rounded-xl text-xs border-[#dfc4b1] text-[#9e3b2e] hover:bg-rose-50 shrink-0"
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
            <Card className="max-w-md w-full p-6 rounded-3xl bg-white border border-[#eddcd0] shadow-2xl animate-in fade-in zoom-in-95 duration-200 text-center">
              <div className="w-12 h-12 rounded-2xl bg-rose-50 border border-rose-200 mx-auto mb-4 flex items-center justify-center text-rose-600">
                <AlertTriangle className="w-6 h-6" />
              </div>

              <h3 className="font-['Noto_Serif',serif] font-bold text-xl text-[#2a2220] mb-2">
                Xóa toàn bộ dữ liệu trên trình duyệt?
              </h3>

              <p className="text-xs text-[#736057] leading-relaxed mb-6">
                Hành động này sẽ xóa sạch các thẻ xăm đã lưu, nhật ký điều ước và các dấu mốc cá nhân
                trên máy này. Thao tác không thể hoàn tác.
              </p>

              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => setShowClearConfirm(false)}
                  className="w-1/2 rounded-2xl text-xs font-semibold"
                >
                  Hủy bỏ
                </Button>

                <Button
                  variant="default"
                  size="lg"
                  onClick={handleConfirmClearData}
                  className="w-1/2 rounded-2xl text-xs font-semibold bg-rose-700 hover:bg-rose-800 text-white"
                >
                  Xác nhận xóa
                </Button>
              </div>
            </Card>
          </div>
        )}

        {/* Bottom Banner */}
        <div className="text-center pt-8 border-t border-[#ecdcd0] mt-10">
          <p className="font-['Noto_Serif',serif] italic font-semibold text-xl text-[#9e3b2e] mb-1">
            “Tâm bình thế giới bình, lòng an vạn sự tỏ”
          </p>
          <span className="text-xs uppercase tracking-widest text-[#95837b] font-semibold">
            NƠI LƯU GIỮ NÉT ĐẸP TÂM THỨC VÀ CHIÊM NGHIỆM VĂN HÓA DÂN GIAN VIỆT
          </span>
        </div>
      </main>
    </div>
  );
};
