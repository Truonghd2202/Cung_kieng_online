import React, { useState } from 'react';
import type { ScreenType } from '../../types.ts';

interface AccountSecurityScreenProps {
  onNavigate: (screen: ScreenType) => void;
}

export const AccountSecurityScreen: React.FC<AccountSecurityScreenProps> = ({ onNavigate }) => {
  const [currentPassword, setCurrentPassword] = useState('••••••••••••••••');
  const [newPassword, setNewPassword] = useState('••••••••••••••••');
  const [confirmPassword, setConfirmPassword] = useState('••••••••••••••••');
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [autoLockEnabled, setAutoLockEnabled] = useState(true);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const backupCodes = [
    '8A42-99B1',
    '29DF-41C8',
    '73E1-66AA',
    'U6E0-0129',
    '91CD-8419',
    '55XG-1200',
    '67PT-3112',
    'U6ED-9934',
    '04ZZ-7718',
    '88KR-4609',
  ];

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setToastMessage('Đã cập nhật mật khẩu gia tộc mới thành công!');
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleLogoutOthers = () => {
    setToastMessage('Đã đăng xuất khỏi 3 thiết bị khác. Hiện chỉ duy trì phiên trên MacBook Pro này.');
    setTimeout(() => setToastMessage(null), 3500);
  };

  return (
    <div className="w-full min-h-screen bg-[#fcf8f2] text-[#2b1b15] font-sans pb-16">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 right-6 z-50 bg-[#80141d] text-white px-5 py-3 rounded-xl shadow-2xl flex items-center gap-3 border border-[#c9892c]/50 animate-fade-in text-xs font-semibold">
          <span className="material-symbols-outlined text-[#faeed9] text-base">verified</span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main Container */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-5 space-y-6">
        {/* Top Breadcrumb */}
        <div className="flex items-center gap-2 text-xs border-b border-[#dec9b6]/50 pb-3 text-[#8a6f62]">
          <span>Tài Khoản Cá Nhân</span>
          <span>&gt;</span>
          <span className="text-[#80141d] font-bold">Cài Đặt Bảo Mật &amp; An Toàn</span>
        </div>

        {/* Hero Header Area */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#faeed9] text-[#734c13] text-[10px] font-bold uppercase tracking-wider border border-[#dec9b6]">
              <span className="material-symbols-outlined text-xs">shield_lock</span>
              <span>AN NINH DI SẢN GIA TỘC</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#2b1b15] leading-tight">
              Bảo Mật Tài Khoản &amp; Quyền Riêng Tư Di Sản
            </h1>

            <p className="text-xs text-[#6b584d] leading-relaxed">
              Bảo vệ toàn vẹn dữ liệu gia phả, ký ức tiền nhân và thông tin mật của dòng tộc.
            </p>
          </div>

          {/* Right Security Badge */}
          <div className="p-3.5 bg-white border border-[#dec9b6] rounded-2xl shadow-2xs flex items-center gap-3 shrink-0">
            <div className="w-10 h-10 rounded-xl bg-[#80141d] text-white flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-xl">verified_user</span>
            </div>
            <div>
              <div className="text-[10px] uppercase font-bold text-[#8a6f62]">CƠ CHẾ BẢO VỆ</div>
              <div className="font-serif font-bold text-xs text-[#2b1b15]">Mã hóa đa tầng AES-256</div>
            </div>
          </div>
        </div>

        {/* 4 Health Cards Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Card 1: Score */}
          <div className="p-4 bg-white border border-[#dec9b6] rounded-2xl shadow-2xs flex items-center gap-3">
            <div className="relative w-14 h-14 shrink-0 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                <path
                  className="text-[#faefe3]"
                  strokeWidth="3.5"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path
                  className="text-emerald-800"
                  strokeDasharray="95, 100"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
              </svg>
              <div className="absolute text-center">
                <span className="text-sm font-bold text-[#2b1b15] leading-none">95</span>
                <span className="block text-[8px] text-[#8a6f62] leading-none">/100 ĐIỂM</span>
              </div>
            </div>

            <div className="space-y-0.5 text-xs">
              <span className="px-2 py-0.2 rounded-full bg-emerald-100 text-emerald-800 font-bold text-[9px]">
                • Rất Cao
              </span>
              <div className="font-serif font-bold text-[#2b1b15]">Chuẩn Di Sản Tối Cao</div>
              <p className="text-[10px] text-[#8a6f62] leading-tight">
                Tài khoản đạt chuẩn lưu trữ tư liệu gia bảo và quản chế sơ đồ chi phái trực hệ.
              </p>
            </div>
          </div>

          {/* Card 2: 2FA */}
          <div className="p-4 bg-white border border-[#dec9b6] rounded-2xl shadow-2xs flex flex-col justify-between space-y-1">
            <div className="flex items-center justify-between text-xs text-[#8a6f62]">
              <span>Xác thực 2 lớp</span>
              <span className="material-symbols-outlined text-emerald-800 text-base">check_circle</span>
            </div>
            <div className="font-serif font-bold text-sm text-[#2b1b15]">Đã Kích Hoạt</div>
            <div className="text-[10px] text-[#8a6f62]">Khóa mã TOTP an toàn</div>
          </div>

          {/* Card 3: Password Strength */}
          <div className="p-4 bg-white border border-[#dec9b6] rounded-2xl shadow-2xs flex flex-col justify-between space-y-1">
            <div className="flex items-center justify-between text-xs text-[#8a6f62]">
              <span>Độ mạnh mật khẩu</span>
              <span className="material-symbols-outlined text-emerald-800 text-base">lock</span>
            </div>
            <div className="font-serif font-bold text-sm text-[#2b1b15]">Cực Mạnh (16 ký tự)</div>
            <div className="text-[10px] text-[#8a6f62]">Ký tự chữ, số &amp; dấu đặc biệt</div>
          </div>

          {/* Card 4: Sessions */}
          <div className="p-4 bg-white border border-[#dec9b6] rounded-2xl shadow-2xs flex flex-col justify-between space-y-1">
            <div className="flex items-center justify-between text-xs text-[#8a6f62]">
              <span>Phiên làm việc</span>
              <span className="material-symbols-outlined text-[#c9892c] text-base">devices</span>
            </div>
            <div className="font-serif font-bold text-sm text-[#2b1b15]">4 Thiết Bị Ghi Nhận</div>
            <div className="text-[10px] text-[#8a6f62]">Tất cả đều được mã hóa TLS</div>
          </div>
        </div>

        {/* Main 2 Columns Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Column (Change Password & 2FA Setup) */}
          <div className="lg:col-span-6 space-y-5">
            {/* Card 1: Đổi Mật Khẩu Gia Tộc */}
            <div className="bg-white border border-[#dec9b6] rounded-3xl p-5 shadow-2xs space-y-4">
              <div className="flex items-center justify-between border-b border-[#dec9b6]/40 pb-2.5">
                <div className="space-y-0.5">
                  <div className="font-serif font-bold text-sm text-[#2b1b15] flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-base text-[#80141d]">password</span>
                    <span>Đổi Mật Khẩu Gia Tộc</span>
                  </div>
                  <div className="text-[10px] text-[#8a6f62]">
                    Lần đổi mật khẩu gần nhất: 45 ngày trước
                  </div>
                </div>

                <span className="px-2.5 py-0.5 rounded-full bg-[#faeed9] border border-[#dec9b6] text-[#734c13] text-[10px] font-bold">
                  Khuyến nghị 90 ngày
                </span>
              </div>

              <form onSubmit={handlePasswordSubmit} className="space-y-3.5 text-xs">
                {/* Current Password */}
                <div className="space-y-1">
                  <label className="font-semibold text-[#2b1b15]">Mật khẩu hiện tại</label>
                  <div className="relative">
                    <input
                      type={showCurrent ? 'text' : 'password'}
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      className="w-full bg-[#fcf8f2] border border-[#dec9b6] rounded-xl px-3 py-2 text-[#2b1b15] text-xs focus:outline-none focus:border-[#80141d]"
                    />
                    <button
                      type="button"
                      onClick={() => setShowCurrent(!showCurrent)}
                      className="absolute right-3 top-2 text-[#8a6f62] hover:text-[#2b1b15] cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-base">
                        {showCurrent ? 'visibility_off' : 'visibility'}
                      </span>
                    </button>
                  </div>
                </div>

                {/* New Password */}
                <div className="space-y-1">
                  <label className="font-semibold text-[#2b1b15]">Mật khẩu mới</label>
                  <div className="relative">
                    <input
                      type={showNew ? 'text' : 'password'}
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="w-full bg-[#fcf8f2] border border-[#dec9b6] rounded-xl px-3 py-2 text-[#2b1b15] text-xs focus:outline-none focus:border-[#80141d]"
                    />
                    <button
                      type="button"
                      onClick={() => setShowNew(!showNew)}
                      className="absolute right-3 top-2 text-[#8a6f62] hover:text-[#2b1b15] cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-base">
                        {showNew ? 'visibility_off' : 'visibility'}
                      </span>
                    </button>
                  </div>
                </div>

                {/* Strength Meter */}
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-[#8a6f62]">Độ tin cậy bảo mật:</span>
                    <span className="font-bold text-emerald-800">Cực mạnh (16 ký tự)</span>
                  </div>
                  <div className="grid grid-cols-3 gap-1.5 h-1.5">
                    <div className="bg-emerald-600 rounded-full" />
                    <div className="bg-emerald-600 rounded-full" />
                    <div className="bg-emerald-600 rounded-full" />
                  </div>
                  <div className="text-[10px] text-emerald-800 flex items-center gap-1">
                    <span className="material-symbols-outlined text-xs">check</span>
                    <span>Bao gồm chữ hoa, chữ thường, số và ký tự phong thủy (@, #, $).</span>
                  </div>
                </div>

                {/* Confirm Password */}
                <div className="space-y-1">
                  <label className="font-semibold text-[#2b1b15]">Xác nhận mật khẩu mới</label>
                  <div className="relative">
                    <input
                      type={showConfirm ? 'text' : 'password'}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="w-full bg-[#fcf8f2] border border-[#dec9b6] rounded-xl px-3 py-2 text-[#2b1b15] text-xs focus:outline-none focus:border-[#80141d]"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirm(!showConfirm)}
                      className="absolute right-3 top-2 text-[#8a6f62] hover:text-[#2b1b15] cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-base">
                        {showConfirm ? 'visibility_off' : 'visibility'}
                      </span>
                    </button>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center justify-end gap-2.5 pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      setToastMessage('Đã hủy bỏ thao tác đổi mật khẩu');
                      setTimeout(() => setToastMessage(null), 2000);
                    }}
                    className="px-4 py-2 rounded-xl bg-white border border-[#dec9b6] hover:bg-[#faefe3] text-xs font-semibold text-[#4a362f] cursor-pointer"
                  >
                    Hủy thay đổi
                  </button>

                  <button
                    type="submit"
                    className="px-4 py-2 rounded-xl bg-[#80141d] hover:bg-[#681017] text-white text-xs font-bold transition-colors cursor-pointer shadow-2xs flex items-center gap-1.5"
                  >
                    <span className="material-symbols-outlined text-sm">key</span>
                    <span>Cập Nhật Mật Khẩu</span>
                  </button>
                </div>
              </form>
            </div>

            {/* Card 2: Xác Thực Hai Lớp (2FA) */}
            <div className="bg-white border border-[#dec9b6] rounded-3xl p-5 shadow-2xs space-y-4">
              <div className="flex items-center justify-between border-b border-[#dec9b6]/40 pb-2.5">
                <div className="space-y-0.5">
                  <div className="font-serif font-bold text-sm text-[#2b1b15] flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-base text-[#80141d]">phonelink_lock</span>
                    <span>Xác Thực Hai Lớp (2FA)</span>
                  </div>
                  <div className="text-[10px] text-[#8a6f62]">
                    Lớp bảo vệ thứ 2 bắt buộc khi truy cập gia phả gốc
                  </div>
                </div>

                <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                  • ĐÃ KÍCH HOẠT
                </span>
              </div>

              <div className="space-y-3 text-xs">
                {/* Method 1: TOTP App */}
                <div className="p-3 bg-[#fdfaf5] border border-[#dec9b6] rounded-2xl flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-[#faefe3] text-[#80141d] flex items-center justify-center shrink-0">
                      <span className="material-symbols-outlined text-base">mobile_friendly</span>
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-serif font-bold text-[#2b1b15]">
                          Ứng dụng tạo mã TOTP
                        </span>
                        <span className="text-[9px] px-1.5 py-0.2 rounded bg-rose-100 text-rose-800 font-bold">
                          Chính
                        </span>
                      </div>
                      <div className="text-[10px] text-[#8a6f62]">
                        Google Authenticator, 1Password, Microsoft Auth
                      </div>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      setToastMessage('Đang mở màn hình cấu hình lại mã TOTP 2FA...');
                      setTimeout(() => setToastMessage(null), 2500);
                    }}
                    className="px-3 py-1 rounded-lg border border-[#dec9b6] hover:bg-[#faefe3] text-xs font-semibold text-[#4a362f] cursor-pointer"
                  >
                    Cấu hình lại
                  </button>
                </div>

                {/* Method 2: SMS Backup */}
                <div className="p-3 bg-[#fdfaf5] border border-[#dec9b6] rounded-2xl flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-[#faeed9] text-[#734c13] flex items-center justify-center shrink-0">
                      <span className="material-symbols-outlined text-base">sms</span>
                    </div>
                    <div>
                      <div className="font-serif font-bold text-[#2b1b15]">Tin nhắn SMS dự phòng</div>
                      <div className="text-[10px] text-[#8a6f62]">
                        Gửi mã 6 số về số điện thoại (+84) 98***678
                      </div>
                    </div>
                  </div>

                  <span className="text-[10px] font-bold text-emerald-800 flex items-center gap-1">
                    <span className="material-symbols-outlined text-xs">check</span>
                    <span>Sẵn sàng</span>
                  </span>
                </div>

                {/* Method 3: Backup Codes */}
                <div className="p-4 bg-[#faefe3]/60 border border-[#dec9b6] rounded-2xl space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5 font-serif font-bold text-xs text-[#2b1b15]">
                      <span className="material-symbols-outlined text-sm text-[#80141d]">key</span>
                      <span>Bộ Mã Khôi Phục Dự Phòng</span>
                    </div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#faeed9] text-[#734c13] border border-[#dec9b6]">
                      Còn 8 / 10 mã
                    </span>
                  </div>

                  <p className="text-[10px] text-[#6b584d] leading-relaxed">
                    Sử dụng các mã này khi bạn mất điện thoại hoặc không nhận được mã SMS. Hãy in ấn và cất giữ an toàn cùng gia phả.
                  </p>

                  {/* 10 Backup Codes Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-1.5 font-mono text-[11px] text-center">
                    {backupCodes.map((code) => (
                      <div
                        key={code}
                        className="py-1 px-1 bg-white border border-[#dec9b6] rounded-lg text-[#2b1b15] font-semibold"
                      >
                        {code}
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center justify-between pt-1">
                    <button
                      type="button"
                      onClick={() => window.print()}
                      className="px-3 py-1.5 rounded-xl bg-white border border-[#dec9b6] hover:bg-[#faefe3] text-xs font-bold text-[#4a362f] flex items-center gap-1.5 cursor-pointer shadow-2xs"
                    >
                      <span className="material-symbols-outlined text-sm">print</span>
                      <span>Tải Bản In PDF</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setToastMessage('Đã khởi tạo bộ 10 mã khôi phục dự phòng mới!');
                        setTimeout(() => setToastMessage(null), 2500);
                      }}
                      className="px-3 py-1.5 rounded-xl bg-white border border-[#dec9b6] hover:bg-[#faefe3] text-xs font-bold text-[#80141d] flex items-center gap-1.5 cursor-pointer shadow-2xs"
                    >
                      <span className="material-symbols-outlined text-sm">refresh</span>
                      <span>Tạo mã mới</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column (Sessions & Audit Logs) */}
          <div className="lg:col-span-6 space-y-5">
            {/* Card 3: Phiên Đăng Nhập Hoạt Động */}
            <div className="bg-white border border-[#dec9b6] rounded-3xl p-5 shadow-2xs space-y-4">
              <div className="border-b border-[#dec9b6]/40 pb-2.5">
                <div className="font-serif font-bold text-sm text-[#2b1b15] flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-base text-[#80141d]">devices</span>
                  <span>Phiên Đăng Nhập Hoạt Động</span>
                </div>
                <div className="text-[10px] text-[#8a6f62]">Các thiết bị đang duy trì quyền truy cập</div>
              </div>

              <div className="space-y-2.5 text-xs">
                {/* Device 1: Current MacBook */}
                <div className="p-3 bg-[#faefe3]/60 border-2 border-emerald-700/60 rounded-2xl flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-white border border-[#dec9b6] text-emerald-800 flex items-center justify-center shrink-0">
                      <span className="material-symbols-outlined text-lg">laptop_mac</span>
                    </div>
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2">
                        <span className="font-serif font-bold text-[#2b1b15]">
                          MacBook Pro 16" (macOS Sonoma)
                        </span>
                        <span className="px-2 py-0.2 rounded-full bg-emerald-100 text-emerald-800 text-[9px] font-bold">
                          • Thiết bị này
                        </span>
                      </div>
                      <div className="text-[10px] text-[#8a6f62]">
                        Google Chrome 122 • Hà Nội, Việt Nam • IP: 14.161.82.11
                      </div>
                      <div className="text-[10px] font-semibold text-emerald-800">
                        Đang hoạt động (Active Now)
                      </div>
                    </div>
                  </div>

                  <span className="material-symbols-outlined text-sm text-emerald-800">lock</span>
                </div>

                {/* Device 2: iPhone */}
                <div className="p-3 bg-white border border-[#dec9b6] rounded-2xl flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-[#faefe3] text-[#80141d] flex items-center justify-center shrink-0">
                      <span className="material-symbols-outlined text-lg">smartphone</span>
                    </div>
                    <div className="space-y-0.5">
                      <div className="font-serif font-bold text-[#2b1b15]">iPhone 15 Pro Max</div>
                      <div className="text-[10px] text-[#8a6f62]">
                        Ứng dụng Thích Cúng Kiếng Mobile • Hà Nội, Việt Nam
                      </div>
                      <div className="text-[10px] text-[#8a6f62]">Hoạt động 35 phút trước</div>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      setToastMessage('Đã đăng xuất iPhone 15 Pro Max thành công!');
                      setTimeout(() => setToastMessage(null), 2500);
                    }}
                    className="p-1.5 rounded-lg hover:bg-[#faefe3] text-[#8a6f62] hover:text-rose-800 cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-base">logout</span>
                  </button>
                </div>

                {/* Device 3: iPad Pro Từ Đường */}
                <div className="p-3 bg-white border border-[#dec9b6] rounded-2xl flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-[#faeed9] text-[#734c13] flex items-center justify-center shrink-0">
                      <span className="material-symbols-outlined text-lg">tablet_mac</span>
                    </div>
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2">
                        <span className="font-serif font-bold text-[#2b1b15]">iPad Pro 12.9"</span>
                        <span className="px-2 py-0.2 rounded-full bg-[#faeed9] text-[#734c13] text-[9px] font-bold border border-[#dec9b6]">
                          Từ Đường Chi
                        </span>
                      </div>
                      <div className="text-[10px] text-[#8a6f62]">
                        Safari • Nam Định (Từ Đường Chi Trực Lăng)
                      </div>
                      <div className="text-[10px] text-[#8a6f62]">Hoạt động 2 ngày trước</div>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      setToastMessage('Đã ngắt phiên iPad Pro tại Từ Đường!');
                      setTimeout(() => setToastMessage(null), 2500);
                    }}
                    className="p-1.5 rounded-lg hover:bg-[#faefe3] text-[#8a6f62] hover:text-rose-800 cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-base">logout</span>
                  </button>
                </div>

                {/* Device 4: Windows Strange PC */}
                <div className="p-3 bg-white border border-[#dec9b6] rounded-2xl flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-rose-50 text-rose-800 flex items-center justify-center shrink-0">
                      <span className="material-symbols-outlined text-lg">computer</span>
                    </div>
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2">
                        <span className="font-serif font-bold text-[#2b1b15]">Máy tính Windows PC</span>
                        <span className="px-2 py-0.2 rounded-full bg-rose-100 text-rose-800 text-[9px] font-bold">
                          Thiết bị lạ
                        </span>
                      </div>
                      <div className="text-[10px] text-[#8a6f62]">
                        Microsoft Edge • TP. Hồ Chí Minh
                      </div>
                      <div className="text-[10px] text-[#8a6f62]">Hoạt động 12 ngày trước</div>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      setToastMessage('Đã chặn và đăng xuất thiết bị lạ thành công!');
                      setTimeout(() => setToastMessage(null), 2500);
                    }}
                    className="p-1.5 rounded-lg hover:bg-[#faefe3] text-[#8a6f62] hover:text-rose-800 cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-base">logout</span>
                  </button>
                </div>
              </div>

              {/* Logout Others Button */}
              <div className="pt-2">
                <button
                  type="button"
                  onClick={handleLogoutOthers}
                  className="w-full py-2.5 rounded-xl bg-[#80141d] hover:bg-[#681017] text-white text-xs font-bold flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-2xs"
                >
                  <span className="material-symbols-outlined text-base">logout</span>
                  <span>Đăng Xuất Khỏi Tất Cả Các Thiết Bị Khác</span>
                </button>
                <p className="text-[10px] text-[#8a6f62] text-center mt-1.5 italic">
                  Chỉ duy trì đăng nhập trên chiếc MacBook Pro này. Tất cả điện thoại và máy tính khác sẽ bị ngắt kết nối ngay lập tức.
                </p>
              </div>
            </div>

            {/* Card 4: Nhật Ký An Toàn & Dữ Liệu */}
            <div className="bg-white border border-[#dec9b6] rounded-3xl p-5 shadow-2xs space-y-4">
              <div className="flex items-center justify-between border-b border-[#dec9b6]/40 pb-2.5">
                <div className="space-y-0.5">
                  <div className="font-serif font-bold text-sm text-[#2b1b15] flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-base text-[#80141d]">history</span>
                    <span>Nhật Ký An Toàn &amp; Dữ Liệu</span>
                  </div>
                  <div className="text-[10px] text-[#8a6f62]">
                    Lịch sử các thao tác thay đổi phả ký nhạy cảm
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setToastMessage('Đang mở toàn bộ sổ bộ kiểm toán an ninh...');
                    setTimeout(() => setToastMessage(null), 2500);
                  }}
                  className="text-[11px] font-bold text-[#80141d] hover:underline cursor-pointer"
                >
                  Toàn bộ sổ bộ
                </button>
              </div>

              {/* Auto Lock Toggle */}
              <div className="p-3 bg-[#faefe3]/60 border border-[#dec9b6] rounded-2xl flex items-center justify-between gap-3 text-xs">
                <div className="space-y-0.5">
                  <div className="font-serif font-bold text-[#2b1b15] flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-sm text-[#80141d]">timer</span>
                    <span>Tự động khóa phiên sau 15 phút</span>
                  </div>
                  <p className="text-[10px] text-[#6b584d] leading-tight">
                    Tự động chuyển về trạng thái nhập mã PIN khi không có thao tác (Hữu ích khi đặt màn hình tại Từ Đường công cộng).
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setAutoLockEnabled(!autoLockEnabled)}
                  className={`w-10 h-5.5 flex items-center rounded-full p-0.5 cursor-pointer transition-colors shrink-0 ${
                    autoLockEnabled ? 'bg-emerald-700' : 'bg-[#dec9b6]'
                  }`}
                >
                  <div
                    className={`bg-white w-4.5 h-4.5 rounded-full shadow-md transform transition-transform ${
                      autoLockEnabled ? 'translate-x-4.5' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>

              {/* 3 Activity Log Items */}
              <div className="space-y-2 text-xs">
                {/* Item 1 */}
                <div className="p-2.5 rounded-xl bg-[#fdfaf5] border border-[#dec9b6]/60 flex items-start gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-[#faeed9] text-[#734c13] flex items-center justify-center shrink-0 mt-0.5">
                    <span className="material-symbols-outlined text-sm">download</span>
                  </div>
                  <div className="flex-1 space-y-0.5">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-[#2b1b15]">
                        Xuất bản sao lưu Gia Phả Chi Trực Lăng
                      </span>
                      <span className="text-[10px] text-[#8a6f62]">Hôm nay, 08:30</span>
                    </div>
                    <div className="text-[10px] text-[#8a6f62]">
                      Định dạng PDF mã hóa mật khẩu bảo vệ • Địa chỉ IP: 14.161.82.11
                    </div>
                  </div>
                </div>

                {/* Item 2 */}
                <div className="p-2.5 rounded-xl bg-[#fdfaf5] border border-[#dec9b6]/60 flex items-start gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-[#faefe3] text-[#80141d] flex items-center justify-center shrink-0 mt-0.5">
                    <span className="material-symbols-outlined text-sm">verified_user</span>
                  </div>
                  <div className="flex-1 space-y-0.5">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-[#2b1b15]">
                        Phê duyệt phân quyền Tộc Biểu
                      </span>
                      <span className="text-[10px] text-[#8a6f62]">15 Tháng Chạp</span>
                    </div>
                    <div className="text-[10px] text-[#8a6f62]">
                      Cấp quyền ghi chép Điển Tích cho thành viên Nguyễn Trực Hoàng
                    </div>
                  </div>
                </div>

                {/* Item 3 */}
                <div className="p-2.5 rounded-xl bg-[#fdfaf5] border border-[#dec9b6]/60 flex items-start gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-stone-100 text-stone-700 flex items-center justify-center shrink-0 mt-0.5">
                    <span className="material-symbols-outlined text-sm">devices</span>
                  </div>
                  <div className="flex-1 space-y-0.5">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-[#2b1b15]">
                        Đăng nhập thành công từ thiết bị mới
                      </span>
                      <span className="text-[10px] text-[#8a6f62]">02 Tháng Chạp</span>
                    </div>
                    <div className="text-[10px] text-[#8a6f62]">
                      Xác thực TOTP thành công trên iPad Pro 12.9" tại Nam Định
                    </div>
                  </div>
                </div>
              </div>

              {/* Blockchain Timestamp Note */}
              <div className="p-3 bg-[#faefe3]/60 rounded-xl border border-[#dec9b6]/60 flex items-start gap-2 text-[10px] text-[#6b584d]">
                <span className="material-symbols-outlined text-xs text-[#80141d] shrink-0 mt-0.5">
                  verified
                </span>
                <span>
                  Tất cả các bản ghi nhật ký đều được gắn nhãn thời gian bất biến (Immutable Blockchain Timestamp) theo quy chuẩn bảo tồn văn bản số của Tộc Ước.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Global Traditional Footer */}
      <footer className="mt-16 bg-[#faefe3] border-t border-[#dec9b6] pt-12 pb-8 text-[#4a362f]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-[#dec9b6]/60">
            <div className="space-y-3 md:col-span-1">
              <div className="flex items-center gap-2 text-[#80141d] font-serif font-bold text-base">
                <span className="material-symbols-outlined text-xl">temple_buddhist</span>
                <span>Thích Cúng Kiếng</span>
              </div>
              <p className="text-xs text-[#6b584d] leading-relaxed">
                Không gian lưu giữ ký ức, phụng dưỡng tiền tổ và truyền thừa phả hệ tôn nghiêm cho các thế hệ con cháu muôn đời sau.
              </p>
            </div>

            <div className="space-y-2">
              <div className="font-serif font-bold text-xs text-[#80141d] uppercase tracking-wider">
                Di Sản Dòng Tộc
              </div>
              <ul className="text-xs space-y-1.5 text-[#6b584d]">
                <li>
                  <button
                    type="button"
                    onClick={() => onNavigate('cay-ky-niem')}
                    className="hover:text-[#80141d] transition-colors cursor-pointer"
                  >
                    Phả Hệ Chi Phái
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => onNavigate('bien-nien-su')}
                    className="hover:text-[#80141d] transition-colors cursor-pointer"
                  >
                    Biên Niên Sử &amp; Cột Mốc
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => onNavigate('tu-sach-gia-phong')}
                    className="hover:text-[#80141d] transition-colors cursor-pointer"
                  >
                    Điển Tích &amp; Kỷ Niệm
                  </button>
                </li>
              </ul>
            </div>

            <div className="space-y-2">
              <div className="font-serif font-bold text-xs text-[#80141d] uppercase tracking-wider">
                Lễ Nghi &amp; Tập Tục
              </div>
              <ul className="text-xs space-y-1.5 text-[#6b584d]">
                <li>
                  <button
                    type="button"
                    onClick={() => onNavigate('cam-nang-nghi-le')}
                    className="hover:text-[#80141d] transition-colors cursor-pointer"
                  >
                    Cẩm Nang Giỗ Chạp
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => onNavigate('chi-tiet-nghi-le')}
                    className="hover:text-[#80141d] transition-colors cursor-pointer"
                  >
                    Kho Văn Khấn Cổ Truyền
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => onNavigate('bao-tang-gia-bao')}
                    className="hover:text-[#80141d] transition-colors cursor-pointer"
                  >
                    Bảo Quản Di Vật
                  </button>
                </li>
              </ul>
            </div>

            <div className="space-y-2">
              <div className="font-serif font-bold text-xs text-[#80141d] uppercase tracking-wider">
                Bảo Mật &amp; Phụng Điền
              </div>
              <div className="p-3 bg-white border border-[#dec9b6] rounded-xl space-y-1 text-xs text-[#6b584d]">
                <div className="flex items-center gap-1.5 font-bold text-[#2b1b15]">
                  <span className="material-symbols-outlined text-sm text-[#80141d]">verified_user</span>
                  <span>Mã Hóa AES-256 Kép</span>
                </div>
                <p className="text-[11px] leading-relaxed">
                  Toàn bộ gia phả và dữ liệu phả ký được bảo vệ tuyệt đối.
                </p>
              </div>
            </div>
          </div>

          <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-[#8a6f62] gap-3">
            <div>© 2025 Thích Cúng Kiếng. Bản quyền thuộc Đại Tộc Nguyễn Phúc Anh.</div>
            <div className="font-serif italic font-bold text-[#80141d]">
              ĐẠO HIẾU LÀ ĐẦU – UỐNG NƯỚC NHỚ NGUỒN
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
