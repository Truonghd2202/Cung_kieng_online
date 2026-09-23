import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-surface-container-low border-t border-outline-variant/30 py-space-xl mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 flex flex-col md:flex-row items-center justify-between gap-space-lg">
        {/* Security badge and hotline */}
        <div className="flex flex-col sm:flex-row items-center gap-space-md text-center sm:text-left">
          <div className="flex items-center gap-2 text-on-surface-variant font-label-sm text-label-sm">
            <span className="material-symbols-outlined text-secondary text-[20px]">verified_user</span>
            <span>Mã hóa phân cấp gia phả AES-256 • Chuẩn bảo mật Di sản Quốc tế</span>
          </div>
          <span className="hidden sm:inline text-outline-variant">•</span>
          <div className="flex items-center gap-2 text-secondary font-medium font-label-sm text-label-sm">
            <span className="material-symbols-outlined text-[18px]">support_agent</span>
            <span>Tổng đài tộc ước: 1900 8888 (08:00 - 21:00)</span>
          </div>
        </div>

        {/* Links */}
        <div className="flex flex-wrap items-center justify-center gap-space-md font-label-xs text-label-xs text-on-surface-variant">
          <a href="#dieu-khoan" onClick={(e) => e.preventDefault()} className="hover:text-primary transition-colors">
            Điều khoản di sản
          </a>
          <span>•</span>
          <a href="#bao-mat" onClick={(e) => e.preventDefault()} className="hover:text-primary transition-colors">
            Chính sách bảo mật phả ký
          </a>
          <span>•</span>
          <a href="#toc-uoc" onClick={(e) => e.preventDefault()} className="hover:text-primary transition-colors">
            Quy chế tộc ước
          </a>
          <span>•</span>
          <span>© 2024 Thích Cúng Kiếng</span>
        </div>
      </div>
    </footer>
  );
};
