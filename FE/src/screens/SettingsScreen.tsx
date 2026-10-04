import React, { useState, useEffect } from "react";
import {
  ArrowLeft,
  User,
  Sun,
  Moon,
  Monitor,
  Bell,
  Trash2,
  LogOut,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  Camera,
  Edit2,
  Check,
  AlertTriangle,
  Lock,
} from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { Badge } from "@/src/components/ui/badge";
import { Card } from "@/src/components/ui/card";
import type { ThemePreference } from "../hooks/useTheme";
import { CULTURAL_TOPICS } from "../data/culturalTopics";
import { AppDialog } from "../components/AppDialog";

interface SettingsScreenProps {
  onBackToAccount: () => void;
  onGoToHome: () => void;
  themePreference: ThemePreference;
  onChangeTheme: (theme: ThemePreference) => void;
  selectedTopics: string[];
  onChangeTopics: (topics: string[]) => boolean;
  user?: { name: string; email: string } | null;
  onUpdateProfile?: (updated: { name: string; email?: string }) => void;
  onLogout?: () => void;
  onClearAllLocalData?: () => boolean;
}

export const SettingsScreen: React.FC<SettingsScreenProps> = ({
  onBackToAccount,
  onGoToHome,
  themePreference,
  onChangeTheme,
  selectedTopics,
  onChangeTopics,
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


  const [topicsSaveStatus, setTopicsSaveStatus] = useState<
    "idle" | "success" | "error"
  >("idle");

  useEffect(() => {
    setTopicsSaveStatus("idle");
  }, [user?.email]);

  // Modal confirm clear data
  const [showClearConfirm, setShowClearConfirm] = useState(false);
  const [dataClearedNotice, setDataClearedNotice] = useState(false);
  const [clearDataError, setClearDataError] = useState("");



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



  const handleConfirmClearData = () => {
    setClearDataError("");
    setDataClearedNotice(false);

    let success = false;

    try {
      success = onClearAllLocalData?.() === true;
    } catch {
      success = false;
    }

    setShowClearConfirm(false);

    if (!success) {
      setClearDataError(
        "Chưa hoàn tất việc xóa dữ liệu. Bạn hãy tải lại trang để kiểm tra các mục còn lưu trước khi thử lại."
      );

      return;
    }

    setDataClearedNotice(true);
  };

  const handleToggleTopic = (topicId: string) => {
    const nextTopics = selectedTopics.includes(topicId)
      ? selectedTopics.filter((id) => id !== topicId)
      : [...selectedTopics, topicId];

    const saved = onChangeTopics(nextTopics);

    setTopicsSaveStatus(saved ? "success" : "error");
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
              Bản thử nghiệm lưu dữ liệu trên trình duyệt này.
              Một số chức năng mở rộng chưa được triển khai.
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
                Giao diện
              </h3>
              <p className="text-sm text-muted mb-6">
                Chọn giao diện sáng, tối hoặc tự động theo thiết bị.
              </p>

              {/* Theme selector */}
              <fieldset className="mb-6">
                <legend className="text-sm font-semibold text-ink mb-3">
                  Giao diện
                </legend>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {[
                    {
                      value: "light" as const,
                      title: "Sáng",
                      description: "Nền be ấm, chữ tối.",
                      icon: Sun,
                    },
                    {
                      value: "dark" as const,
                      title: "Tối",
                      description: "Nền tối, chữ sáng.",
                      icon: Moon,
                    },
                    {
                      value: "system" as const,
                      title: "Theo thiết bị",
                      description: "Theo giao diện của hệ điều hành.",
                      icon: Monitor,
                    },
                  ].map((option) => {
                    const Icon = option.icon;
                    const isSelected =
                      themePreference === option.value;

                    return (
                      <label
                        key={option.value}
                        className={[
                          "flex cursor-pointer items-start gap-3",
                          "rounded-xl border p-4",
                          isSelected
                            ? "border-accent bg-accent-soft"
                            : "border-line bg-surface",
                        ].join(" ")}
                      >
                        <input
                          type="radio"
                          name="theme-preference"
                          value={option.value}
                          checked={isSelected}
                          onChange={() => onChangeTheme(option.value)}
                          className="mt-1 h-4 w-4 shrink-0"
                        />

                        <span>
                          <span className="flex items-center gap-2 text-sm font-semibold text-ink">
                            <Icon
                              className="w-4 h-4 text-accent"
                              aria-hidden="true"
                            />
                            {option.title}
                          </span>

                          <span className="block mt-2 text-sm text-muted leading-relaxed">
                            {option.description}
                          </span>
                        </span>
                      </label>
                    );
                  })}
                </div>
              </fieldset>

              <p className="mb-5 text-sm text-muted leading-relaxed">
                Âm thanh được điều khiển trong từng trải nghiệm.
                Một số hiệu ứng hỗ trợ tùy chọn giảm chuyển động của thiết bị.
              </p>

              {/* Topics chips */}
              <fieldset className="mt-6">
                <legend className="text-base font-semibold text-ink mb-2">
                  Chủ đề bạn quan tâm
                </legend>

                <p className="text-sm text-muted leading-relaxed mb-4">
                  Bạn có thể chọn nhiều chủ đề hoặc bỏ chọn tất cả.
                  Lựa chọn được ghi nhớ cho tài khoản trên trình duyệt này.
                </p>

                <div className="flex flex-wrap gap-2">
                  {CULTURAL_TOPICS.map((topic) => {
                    const isSelected = selectedTopics.includes(topic.id);

                    return (
                      <button
                        key={topic.id}
                        type="button"
                        aria-pressed={isSelected}
                        onClick={() => handleToggleTopic(topic.id)}
                        className={[
                          "inline-flex min-h-11 items-center gap-2",
                          "rounded-full border px-4 py-2 text-sm",
                          "font-medium transition-colors",
                          "focus-visible:outline-none",
                          "focus-visible:ring-2 focus-visible:ring-accent",
                          isSelected
                            ? "bg-action border-action text-on-action"
                            : "bg-surface border-line text-ink hover:border-accent",
                        ].join(" ")}
                      >
                        {isSelected && (
                          <Check
                            className="w-4 h-4"
                            aria-hidden="true"
                          />
                        )}
                        {topic.label}
                      </button>
                    );
                  })}
                </div>

                <div
                  aria-live="polite"
                  aria-atomic="true"
                  className="mt-3 text-sm"
                >
                  {topicsSaveStatus === "success" && (
                    <p className="text-success">
                      Đã ghi nhớ {selectedTopics.length} chủ đề.
                    </p>
                  )}

                  {topicsSaveStatus === "error" && (
                    <p className="text-danger">
                      Chưa lưu được lựa chọn. Trình duyệt có thể đang
                      hạn chế lưu dữ liệu; bạn hãy thử lại.
                    </p>
                  )}
                </div>

                <p className="mt-3 text-sm text-muted leading-relaxed">
                  Bản thử nghiệm hiện ghi nhớ sở thích.
                  Các lựa chọn chưa tự động thay đổi thông điệp
                  hoặc thứ tự bài viết.
                </p>
              </fieldset>
            </Card>

            {/* Block 3: Nhắc lịch & Thông báo */}
            <Card className="p-6 sm:p-8 rounded-card bg-surface border-line">
              <div className="flex items-center gap-2 mb-3">
                <Bell
                  className="w-5 h-5 text-accent"
                  aria-hidden="true"
                />
                <h2 className="font-display text-xl font-semibold text-ink">
                  Thông báo và nhắc lịch
                </h2>
              </div>

              <span className="inline-flex rounded-full bg-accent-soft px-3 py-1.5 text-sm text-accent mb-4">
                Chưa có trong bản thử nghiệm
              </span>

              <p className="text-base text-muted leading-relaxed">
                Trang chưa gửi lời nhắc tự động cho ngày rằm,
                mùng một, lễ hội hoặc giờ check-in. Các tùy chọn
                sẽ xuất hiện khi chức năng hoạt động.
              </p>

              <p className="mt-3 text-sm text-muted leading-relaxed">
                Nếu trước đây bạn đã cấp quyền thông báo, quyền
                đó vẫn do trình duyệt quản lý. Nó không đồng nghĩa
                với việc đã đặt lịch nhắc.
              </p>
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

              {clearDataError && (
                <p
                  role="alert"
                  className="mb-4 rounded-panel border border-danger/25 bg-danger-soft p-3.5 text-sm text-danger"
                >
                  {clearDataError}
                </p>
              )}

              {/* Data Cleared Toast */}
              {dataClearedNotice && (
                <div className="p-3.5 rounded-panel bg-success-soft border border-success/25 text-success text-xs mb-4 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-success shrink-0" />
                  <span>
                    Đã xóa nội dung trong Góc của tôi và ghi chú lịch
                    của tài khoản hiện tại trên trình duyệt này.
                  </span>
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
                  <span>Xóa nội dung đã lưu và ghi chú lịch</span>
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
          <AppDialog
            labelledBy="clear-account-data-title"
            onClose={() => setShowClearConfirm(false)}
            className="max-w-md text-center"
          >
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-panel border border-danger/25 bg-danger-soft text-danger">
              <AlertTriangle
                className="h-6 w-6"
                aria-hidden="true"
              />
            </div>

            <h3
              id="clear-account-data-title"
              className="mb-2 font-display text-xl font-bold text-ink"
            >
              Xóa nội dung đã lưu của tài khoản này?
            </h3>

            <p className="mb-6 text-sm leading-relaxed text-muted">
              Xóa lời chiêm nghiệm, thẻ xăm, lời gửi gắm
              trong Góc của tôi và ghi chú lịch của tài
              khoản hiện tại trên trình duyệt này.
              Thao tác không thể hoàn tác.
              Góc tưởng niệm, tùy chọn giao diện và dữ liệu
              của tài khoản khác được giữ lại.
            </p>

            <div className="flex items-center gap-3">
              <Button
                type="button"
                autoFocus
                variant="outline"
                size="lg"
                onClick={() => setShowClearConfirm(false)}
                className="min-h-11 flex-1"
              >
                Hủy bỏ
              </Button>

              <Button
                type="button"
                variant="default"
                size="lg"
                onClick={handleConfirmClearData}
                className="min-h-11 flex-1 bg-danger-action text-white hover:bg-danger-action-hover"
              >
                Xác nhận xóa
              </Button>
            </div>
          </AppDialog>
        )}

      </main>
    </div>
  );
};
