import React, { useState } from 'react';
import type { ScreenType } from '../../types.ts';

interface AdminLoginScreenProps {
  onNavigate: (screen: ScreenType) => void;
  onAuthenticated?: () => void;
}

export const AdminLoginScreen: React.FC<AdminLoginScreenProps> = ({ onNavigate, onAuthenticated }) => {
  const [email, setEmail] = useState('quan-tri-vien@thichcungkieng.vn');
  const [password, setPassword] = useState('••••••••••••••••');
  const [showPassword, setShowPassword] = useState(false);
  const [totp, setTotp] = useState('');
  const [rememberDevice, setRememberDevice] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAuthenticated?.();
    onNavigate('admin-tong-quan');
  };

  return (
    <div className="min-h-screen bg-[#fcf8f2] text-[#2b1b15] font-sans flex flex-col justify-between items-center py-6 px-4 relative overflow-hidden select-none">
      {/* Decorative Radial Lines Watermark */}
      <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none">
        <svg viewBox="0 0 600 600" className="w-[680px] h-[680px] text-[#80141d] stroke-current fill-none">
          <circle cx="300" cy="300" r="280" strokeWidth="1" strokeDasharray="4 4" />
          <circle cx="300" cy="300" r="220" strokeWidth="1" />
          <circle cx="300" cy="300" r="160" strokeWidth="1" strokeDasharray="3 3" />
          <circle cx="300" cy="300" r="90" strokeWidth="1" />
          <line x1="300" y1="20" x2="300" y2="580" strokeWidth="0.8" />
          <line x1="20" y1="300" x2="580" y2="300" strokeWidth="0.8" />
          <line x1="102" y1="102" x2="498" y2="498" strokeWidth="0.5" />
          <line x1="102" y1="498" x2="498" y2="102" strokeWidth="0.5" />
        </svg>
      </div>

      {/* Top Floating Status Pill */}
      <div className="relative z-10 pt-2">
        <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-white/90 border border-[#dec9b6] text-xs text-[#6b584d] shadow-2xs">
          <span className="w-2 h-2 rounded-full bg-amber-600 animate-pulse" />
          <span>Tất cả cụm máy chủ &amp; dịch vụ lưu trữ hoạt động ổn định (99.98%)</span>
        </div>
      </div>

      {/* Central Login Card */}
      <div className="relative z-10 w-full max-w-[460px] bg-white rounded-3xl border border-[#dec9b6] shadow-xl overflow-hidden my-4">
        {/* Top Crimson Accent Border Bar */}
        <div className="h-1.5 bg-[#80141d] w-full" />

        <div className="p-7 sm:p-8 space-y-5">
          {/* Header & Logo */}
          <div className="text-center space-y-2">
            <div className="w-12 h-12 rounded-2xl bg-[#faefe3] border border-[#dec9b6] text-[#80141d] flex items-center justify-center mx-auto shadow-2xs">
              <span className="material-symbols-outlined text-2xl">shield</span>
            </div>

            <div className="text-[10px] uppercase font-bold tracking-widest text-[#80141d]">
              THÍCH CÚNG KIẾNG • HỆ THỐNG QUẢN TRỊ TRUNG ƯƠNG
            </div>

            <h1 className="text-xl sm:text-2xl font-serif font-bold text-[#2b1b15] leading-tight">
              Cổng Quản Trị &amp; Vận Hành Di Sản
            </h1>

            <p className="text-xs text-[#8a6f62]">
              Khu vực xác thực danh tính cho Ban Trị Sự &amp; Quản Trị Viên Phả Hệ
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
            {/* Field 1: Email */}
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <label className="font-semibold text-[#2b1b15]">Địa chỉ Email Quản Trị</label>
                <span className="text-[10px] text-[#80141d] font-medium">Bắt buộc @thichcungkieng.vn</span>
              </div>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-3 top-2.5 text-[#8a6f62] text-base pointer-events-none">
                  badge
                </span>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="quan-tri-vien@thichcungkieng.vn"
                  className="w-full bg-[#faefe3]/30 border border-[#dec9b6] rounded-xl pl-9 pr-3 py-2 text-[#2b1b15] font-medium focus:outline-none focus:border-[#80141d]"
                />
              </div>
            </div>

            {/* Field 2: Password */}
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <label className="font-semibold text-[#2b1b15]">Mật mã cấp quyền</label>
                <button
                  type="button"
                  onClick={() => alert('Vui lòng liên hệ Trưởng ban IT để cấp lại mật mã!')}
                  className="text-[10px] text-[#80141d] font-bold hover:underline cursor-pointer"
                >
                  Quên mật khẩu?
                </button>
              </div>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-3 top-2.5 text-[#8a6f62] text-base pointer-events-none">
                  key
                </span>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Nhập khóa bảo mật mật mã"
                  className="w-full bg-[#faefe3]/30 border border-[#dec9b6] rounded-xl pl-9 pr-9 py-2 text-[#2b1b15] font-medium focus:outline-none focus:border-[#80141d]"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-2.5 text-[#8a6f62] hover:text-[#2b1b15] cursor-pointer"
                >
                  <span className="material-symbols-outlined text-base">
                    {showPassword ? 'visibility_off' : 'visibility'}
                  </span>
                </button>
              </div>
            </div>

            {/* Field 3: 2FA / Hardware key */}
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <label className="font-semibold text-[#2b1b15]">Mã bảo mật phần cứng / YubiKey / TOTP</label>
                <div className="flex items-center gap-1.5 text-[10px] text-[#8a6f62]">
                  <span className="px-1.5 py-0.2 rounded bg-[#faeed9] text-[#734c13] font-bold border border-[#dec9b6]">
                    2FA CẤP 3
                  </span>
                  <span>6 chữ số hoặc Chạm khóa</span>
                </div>
              </div>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-3 top-2.5 text-[#8a6f62] text-base pointer-events-none">
                  token
                </span>
                <input
                  type="text"
                  value={totp}
                  onChange={(e) => setTotp(e.target.value)}
                  placeholder="Nhập 6 số ứng dụng Authenticator hoặc chạm khóa..."
                  className="w-full bg-[#faefe3]/30 border border-[#dec9b6] rounded-xl pl-9 pr-9 py-2 text-[#2b1b15] text-xs focus:outline-none focus:border-[#80141d]"
                />
                <span className="material-symbols-outlined absolute right-3 top-2.5 text-[#8a6f62] text-base pointer-events-none">
                  graphic_eq
                </span>
              </div>
            </div>

            {/* Checkbox: Remember device */}
            <div className="pt-0.5">
              <label className="flex items-start gap-2 cursor-pointer text-[11px] text-[#6b584d] leading-snug">
                <input
                  type="checkbox"
                  checked={rememberDevice}
                  onChange={(e) => setRememberDevice(e.target.checked)}
                  className="mt-0.5 rounded border-[#dec9b6] text-[#80141d] focus:ring-[#80141d] accent-[#80141d]"
                />
                <span>
                  Ghi nhớ phiên làm việc trên thiết bị định danh an toàn (Áp dụng IP Whitelisted của Gia Tộc &amp; Văn Phòng Trị Sự)
                </span>
              </label>
            </div>

            {/* Submit Button */}
            <div className="pt-1">
              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-[#80141d] hover:bg-[#681017] text-white font-bold text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-md"
              >
                <span className="material-symbols-outlined text-base">lock</span>
                <span>Đăng Nhập Quản Trị Hệ Thống</span>
              </button>
            </div>

            {/* Security Warning Box */}
            <div className="p-3 bg-[#faefe3]/70 rounded-2xl border border-[#dec9b6] flex items-start gap-2.5 text-[11px] text-[#4a362f]">
              <span className="material-symbols-outlined text-base text-[#80141d] shrink-0 mt-0.5">
                policy
              </span>
              <div className="space-y-0.5 leading-relaxed">
                <div className="font-serif font-bold text-[#80141d]">Cảnh Báo An Ninh Cấp Trung Ương</div>
                <p className="text-[10px] text-[#6b584d]">
                  Mọi truy cập đều được ghi nhật ký (Audit Log) định danh IP, dấu vân tay trình duyệt và vị trí địa lý 24/7. Hành vi xâm nhập trái phép sẽ tự động kích hoạt tường lửa cô lập và chuyển hồ sơ giám định an ninh số.
                </p>
              </div>
            </div>

            {/* Emergency & Support Links */}
            <div className="flex items-center justify-between pt-2 border-t border-[#dec9b6]/40 text-xs">
              <button
                type="button"
                onClick={() => alert('Quy trình khôi phục khẩn cấp S.O.S Protocol: Liên hệ hội đồng bô lão')}
                className="text-[#80141d] hover:underline flex items-center gap-1 font-semibold cursor-pointer"
              >
                <span className="material-symbols-outlined text-sm">emergency</span>
                <span>Mở khóa khẩn cấp (S.O.S Protocol)</span>
              </button>

              <button
                type="button"
                onClick={() => alert('Tổng đài hỗ trợ kỹ thuật IT Di Sản: 1900-8888')}
                className="text-[#6b584d] hover:text-[#2b1b15] flex items-center gap-1 cursor-pointer"
              >
                <span className="material-symbols-outlined text-sm">support_agent</span>
                <span>Trợ giúp Kỹ Thuật IT</span>
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Bottom Footer Info */}
      <div className="relative z-10 text-center text-[10px] text-[#8a6f62] space-y-1">
        <div>
          Mã hóa AES-256 GCM • SHA-384 Lineage Node &nbsp;|&nbsp; Phiên bản Quản Trị Phả Hệ: v4.8.2-HeritageCore &nbsp;|&nbsp; Khu Vực: Hà Nội (VN-North Edge Node)
        </div>
      </div>
    </div>
  );
};
