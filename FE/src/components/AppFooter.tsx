import React from "react";
import { NavScreen } from "./AppHeader";

interface AppFooterProps {
  onNavigate?: (screen: NavScreen) => void;
}

export const AppFooter: React.FC<AppFooterProps> = ({ onNavigate }) => {
  return (
    <footer className="mt-20 border-t border-[#eadcce] dark:border-[#381117] bg-[#f5ece1]/80 dark:bg-[#160407] text-[#584640] dark:text-[#d4bfb7] font-['Be_Vietnam_Pro',sans-serif]">
      {/* Upper poetic quote block */}
      <div className="max-w-4xl mx-auto px-4 py-12 text-center">
        {/* Subtle lotus ornament */}
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="h-[1px] w-12 bg-[#dfc5af] dark:bg-[#4d1b24]"></div>
          <svg
            className="w-5 h-5 text-[#be8e5a] fill-current"
            viewBox="0 0 24 24"
          >
            <path d="M12 3C12 3 9.5 8 9.5 11C9.5 12.5 10.5 13.8 12 14.5C13.5 13.8 14.5 12.5 14.5 11C14.5 8 12 3 12 3Z" />
            <path d="M12 15C10 14.5 7 14 5 16C3 18 3 20 6 21C9 22 11 20 12 17.5C13 20 15 22 18 21C21 20 21 18 19 16C17 14 14 14.5 12 15Z" />
          </svg>
          <div className="h-[1px] w-12 bg-[#dfc5af] dark:bg-[#4d1b24]"></div>
        </div>

        <blockquote className="font-['Noto_Serif',serif] italic text-2xl sm:text-[26px] text-[#8a252c] dark:text-[#f28d96] font-semibold tracking-wide mb-2">
          “Tâm bình thế giới bình, lòng an vạn sự tỏ”
        </blockquote>
        <p className="text-sm text-[#8b7770] dark:text-[#a0837b]">
          Lời gửi gắm từ cội nguồn dân gian • Gieo đóa an yên cho tâm hồn hiện đại
        </p>
      </div>

      {/* Lower links and copyright bar */}
      <div className="border-t border-[#eadcce] dark:border-[#381117] py-6 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#8a7b73] dark:text-[#a89890]">
          {/* Điều hướng đến các phân hệ trải nghiệm */}
          <div className="flex items-center gap-4 sm:gap-5 flex-wrap justify-center">
            <button
              onClick={() => onNavigate?.("today")}
              className="hover:text-[#9e3b2e] transition-colors cursor-pointer"
            >
              Hôm nay
            </button>
            <span>•</span>
            <button
              onClick={() => onNavigate?.("xinxam")}
              className="hover:text-[#9e3b2e] transition-colors cursor-pointer"
            >
              Trải nghiệm
            </button>
            <span>•</span>
            <button
              onClick={() => onNavigate?.("culture")}
              className="hover:text-[#9e3b2e] transition-colors cursor-pointer"
            >
              Khám phá
            </button>
            <span>•</span>
            <button
              onClick={() => onNavigate?.("account")}
              className="hover:text-[#9e3b2e] transition-colors cursor-pointer"
            >
              Góc của tôi
            </button>
            <span>•</span>
            <button
              onClick={() => onNavigate?.("membership")}
              className="hover:text-[#9e3b2e] transition-colors cursor-pointer"
            >
              Gói Tâm An
            </button>
          </div>

          <div className="text-center sm:text-right">
            © {new Date().getFullYear()} Tin Lắm Tâm Linh. Tiếp nối tinh hoa mỹ học Dó & Gốm Việt đương đại.
          </div>
        </div>
      </div>
    </footer>
  );
};
