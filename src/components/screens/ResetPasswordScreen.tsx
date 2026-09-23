import React, { useState, useEffect } from 'react';
import { ScreenType } from '@/src/types.ts';

interface ResetPasswordScreenProps {
  onNavigate: (screen: ScreenType) => void;
}

export const ResetPasswordScreen: React.FC<ResetPasswordScreenProps> = ({ onNavigate }) => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [countdown, setCountdown] = useState(3);

  // Criteria validation
  const hasMinLen = password.length >= 8;
  const hasUpperLower = /[a-z]/.test(password) && /[A-Z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSpecial = /[^A-Za-z0-9]/.test(password);

  const passedCount = [hasMinLen, hasUpperLower, hasNumber, hasSpecial].filter(Boolean).length;
  const isMatch = password.length > 0 && password === confirmPassword;

  // Countdown auto redirect when success
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isSuccess && countdown > 0) {
      timer = setTimeout(() => {
        setCountdown((c) => c - 1);
      }, 1000);
    } else if (isSuccess && countdown === 0) {
      onNavigate('login');
    }
    return () => clearTimeout(timer);
  }, [isSuccess, countdown, onNavigate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (passedCount < 3) {
      alert('Vui lòng tạo mật khẩu có độ bảo mật cao hơn để bảo vệ phả ký.');
      return;
    }
    if (!isMatch) {
      alert('Mật khẩu xác nhận không khớp.');
      return;
    }
    setIsSuccess(true);
    setCountdown(3);
  };

  return (
    <div className="w-full min-h-[calc(100vh-80px)] bg-surface py-12 px-4 sm:px-6 lg:px-8 flex flex-col justify-center">
      <div className="max-w-md w-full mx-auto">
        {/* Top return link & encryption badge */}
        <div className="flex items-center justify-between mb-6">
          <button
            type="button"
            onClick={() => onNavigate('login')}
            className="inline-flex items-center gap-1.5 text-label-sm text-on-surface-variant hover:text-primary transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">arrow_back</span>
            <span>Về Đăng nhập</span>
          </button>
          <div className="flex items-center gap-1.5 text-label-xs text-secondary font-medium">
            <span className="material-symbols-outlined text-[16px]">lock</span>
            <span>Mã hóa 256-bit</span>
          </div>
        </div>

        {/* Card */}
        <div className="bg-surface-container-lowest rounded-2xl p-6 sm:p-8 shadow-xl border border-outline-variant/30">
          {!isSuccess ? (
            <>
              {/* Header */}
              <div className="text-center mb-6">
                <div className="w-14 h-14 rounded-2xl bg-primary text-on-primary mx-auto mb-4 flex items-center justify-center shadow">
                  <span className="material-symbols-outlined text-[28px]">lock_reset</span>
                </div>
                <h1 className="font-headline-md text-headline-md text-on-surface font-serif font-bold">
                  Thiết Lập Mật Khẩu Mới
                </h1>
                <p className="font-body-sm text-body-sm text-on-surface-variant mt-2">
                  Tạo mật khẩu mạnh để bảo vệ tư liệu gia phả, ký ức hương hỏa và thông tin các thế hệ.
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Input New Password */}
                <div>
                  <label className="block font-label-md text-label-md text-on-surface font-medium mb-1.5">
                    Mật khẩu mới <span className="text-error">*</span>
                  </label>
                  <div className="relative">
                    <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-outline text-[20px]">
                      key
                    </span>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Nhập mật khẩu mới..."
                      className="w-full pl-11 pr-11 py-3 rounded-xl bg-surface-container-low border border-outline-variant/50 focus:border-primary focus:bg-surface focus:outline-none focus:ring-2 focus:ring-primary/20 text-body-md text-on-surface transition-all"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      aria-label={showPassword ? 'Ẩn mật khẩu' : 'Hiện mật khẩu'}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-outline hover:text-on-surface cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-[20px]">
                        {showPassword ? 'visibility_off' : 'visibility'}
                      </span>
                    </button>
                  </div>
                </div>

                {/* 4-bar visual strength meter */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-label-xs">
                    <span className="text-on-surface-variant font-medium">Độ mạnh mật khẩu:</span>
                    <span
                      className={`font-semibold ${
                        passedCount <= 1
                          ? 'text-error'
                          : passedCount <= 2
                          ? 'text-secondary'
                          : passedCount <= 3
                          ? 'text-secondary-fixed-dim'
                          : 'text-emerald-700'
                      }`}
                    >
                      {passedCount === 0 && 'Chưa nhập'}
                      {passedCount === 1 && 'Yếu'}
                      {passedCount === 2 && 'Trung bình'}
                      {passedCount === 3 && 'Khá tốt'}
                      {passedCount === 4 && 'Rất an toàn'}
                    </span>
                  </div>
                  <div className="grid grid-cols-4 gap-1.5 h-1.5">
                    <div
                      className={`rounded-full ${
                        passedCount >= 1 ? 'bg-primary' : 'bg-outline-variant/40'
                      }`}
                    ></div>
                    <div
                      className={`rounded-full ${
                        passedCount >= 2 ? 'bg-secondary' : 'bg-outline-variant/40'
                      }`}
                    ></div>
                    <div
                      className={`rounded-full ${
                        passedCount >= 3 ? 'bg-secondary-container' : 'bg-outline-variant/40'
                      }`}
                    ></div>
                    <div
                      className={`rounded-full ${
                        passedCount >= 4 ? 'bg-emerald-600' : 'bg-outline-variant/40'
                      }`}
                    ></div>
                  </div>
                </div>

                {/* Criteria Checklist */}
                <div className="p-3.5 rounded-xl bg-surface-container-low border border-outline-variant/40 space-y-2 text-label-xs">
                  <div className={`flex items-center gap-2 ${hasMinLen ? 'text-emerald-700 font-medium' : 'text-on-surface-variant'}`}>
                    <span className="material-symbols-outlined text-[16px]">
                      {hasMinLen ? 'check_circle' : 'circle'}
                    </span>
                    <span>Tối thiểu 8 ký tự</span>
                  </div>
                  <div className={`flex items-center gap-2 ${hasUpperLower ? 'text-emerald-700 font-medium' : 'text-on-surface-variant'}`}>
                    <span className="material-symbols-outlined text-[16px]">
                      {hasUpperLower ? 'check_circle' : 'circle'}
                    </span>
                    <span>Bao gồm cả chữ in hoa và chữ thường</span>
                  </div>
                  <div className={`flex items-center gap-2 ${hasNumber ? 'text-emerald-700 font-medium' : 'text-on-surface-variant'}`}>
                    <span className="material-symbols-outlined text-[16px]">
                      {hasNumber ? 'check_circle' : 'circle'}
                    </span>
                    <span>Chứa ít nhất một chữ số (0-9)</span>
                  </div>
                  <div className={`flex items-center gap-2 ${hasSpecial ? 'text-emerald-700 font-medium' : 'text-on-surface-variant'}`}>
                    <span className="material-symbols-outlined text-[16px]">
                      {hasSpecial ? 'check_circle' : 'circle'}
                    </span>
                    <span>Chứa ký tự đặc biệt (!, @, #, $, %, ^...)</span>
                  </div>
                </div>

                {/* Input Confirm Password */}
                <div>
                  <label className="block font-label-md text-label-md text-on-surface font-medium mb-1.5">
                    Xác nhận lại mật khẩu mới <span className="text-error">*</span>
                  </label>
                  <div className="relative">
                    <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-outline text-[20px]">
                      lock_reset
                    </span>
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      required
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Nhập lại mật khẩu mới..."
                      className="w-full pl-11 pr-11 py-3 rounded-xl bg-surface-container-low border border-outline-variant/50 focus:border-primary focus:bg-surface focus:outline-none focus:ring-2 focus:ring-primary/20 text-body-md text-on-surface transition-all"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      aria-label={showConfirmPassword ? 'Ẩn mật khẩu' : 'Hiện mật khẩu'}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-outline hover:text-on-surface cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-[20px]">
                        {showConfirmPassword ? 'visibility_off' : 'visibility'}
                      </span>
                    </button>
                  </div>
                  {confirmPassword.length > 0 && (
                    <div className="mt-1.5 flex items-center gap-1.5 text-label-xs">
                      <span
                        className={`material-symbols-outlined text-[16px] ${
                          isMatch ? 'text-emerald-600' : 'text-error'
                        }`}
                      >
                        {isMatch ? 'check_circle' : 'cancel'}
                      </span>
                      <span className={isMatch ? 'text-emerald-700 font-medium' : 'text-error'}>
                        {isMatch ? 'Mật khẩu trùng khớp' : 'Mật khẩu xác nhận chưa khớp'}
                      </span>
                    </div>
                  )}
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={!isMatch || passedCount < 2}
                  className="w-full py-3.5 px-6 rounded-xl bg-primary text-on-primary font-title-md font-semibold shadow-md hover:bg-primary-container active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  <span className="material-symbols-outlined text-[20px]">verified</span>
                  <span>Lưu Mật Khẩu &amp; Đăng Nhập Ngay</span>
                </button>
              </form>
            </>
          ) : (
            /* Success Screen State */
            <div className="text-center py-6 space-y-6 animate-fade-in">
              <div className="relative w-20 h-20 mx-auto">
                <div className="absolute inset-0 rounded-full bg-emerald-100 animate-ping opacity-25"></div>
                <div className="relative w-20 h-20 rounded-full bg-emerald-600 text-white flex items-center justify-center shadow-lg">
                  <span className="material-symbols-outlined text-[44px]">check</span>
                </div>
              </div>

              <div>
                <h2 className="font-headline-md text-headline-md text-on-surface font-serif font-bold">
                  Thiết Lập Mật Khẩu Thành Công
                </h2>
                <p className="font-body-sm text-body-sm text-on-surface-variant mt-2 max-w-sm mx-auto">
                  Mật khẩu gia tộc của bạn đã được cập nhật an toàn. Mọi dữ liệu phả ký của bạn đều được bảo mật khép kín.
                </p>
              </div>

              <div className="p-3 bg-surface-container-low rounded-xl text-label-sm text-secondary font-medium">
                Tự động chuyển về trang Đăng nhập sau {countdown}s...
              </div>

              <button
                type="button"
                onClick={() => onNavigate('login')}
                className="w-full py-3.5 px-6 rounded-xl bg-primary text-on-primary font-title-md font-semibold shadow-md hover:bg-primary-container active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Về Trang Đăng Nhập Ngay</span>
                <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
              </button>
            </div>
          )}
        </div>

        {/* Interactive State Demo Switcher Bar */}
        <div className="mt-8 p-3 rounded-xl bg-surface-container-low border border-outline-variant/40 flex items-center justify-between text-label-xs">
          <span className="text-on-surface-variant font-medium">Xem trước trạng thái:</span>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setIsSuccess(false)}
              className={`px-2.5 py-1 rounded-lg transition-colors cursor-pointer ${
                !isSuccess
                  ? 'bg-primary text-on-primary font-semibold'
                  : 'text-on-surface hover:bg-surface-container'
              }`}
            >
              Form Nhập Mật Khẩu
            </button>
            <button
              type="button"
              onClick={() => {
                setIsSuccess(true);
                setCountdown(10);
              }}
              className={`px-2.5 py-1 rounded-lg transition-colors cursor-pointer ${
                isSuccess
                  ? 'bg-primary text-on-primary font-semibold'
                  : 'text-on-surface hover:bg-surface-container'
              }`}
            >
              Màn Thành Công
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
