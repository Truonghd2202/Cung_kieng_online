import React, { useEffect } from "react";
import { LogOut, X } from "lucide-react";

export interface LogoutConfirmDialogProps {
  open: boolean;
  userName?: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export const LogoutConfirmDialog: React.FC<LogoutConfirmDialogProps> = ({
  open,
  userName,
  onConfirm,
  onCancel,
}) => {
  // Lắng nghe phím ESC để đóng hộp thoại
  useEffect(() => {
    if (!open) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onCancel();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open, onCancel]);

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="logout-dialog-title"
      className="fixed inset-0 z-[999999] flex items-center justify-center p-4 bg-black/65 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onCancel();
        }
      }}
    >
      <div className="relative w-full max-w-[400px] rounded-3xl bg-[#fffdf9]/95 dark:bg-[#1a1417]/95 backdrop-blur-xl p-6 sm:p-7 border border-amber-900/20 dark:border-amber-400/25 shadow-[0_24px_60px_rgba(30,15,5,0.35)] text-center overflow-hidden animate-in zoom-in-95 duration-200 select-none">
        {/* 4 Góc kim chi hoa văn cổ điển (Ornamental Brass Corner Brackets) */}
        <div className="absolute top-2.5 left-2.5 w-3.5 h-3.5 border-t-2 border-l-2 border-amber-500/50 rounded-tl-sm pointer-events-none" />
        <div className="absolute top-2.5 right-2.5 w-3.5 h-3.5 border-t-2 border-r-2 border-amber-500/50 rounded-tr-sm pointer-events-none" />
        <div className="absolute bottom-2.5 left-2.5 w-3.5 h-3.5 border-b-2 border-l-2 border-amber-500/50 rounded-bl-sm pointer-events-none" />
        <div className="absolute bottom-2.5 right-2.5 w-3.5 h-3.5 border-b-2 border-r-2 border-amber-500/50 rounded-br-sm pointer-events-none" />

        {/* Nút đóng góc phải */}
        <button
          type="button"
          onClick={onCancel}
          className="absolute top-3.5 right-3.5 p-1.5 rounded-full text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 hover:bg-stone-200/50 dark:hover:bg-stone-800 transition-colors cursor-pointer"
          aria-label="Đóng"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Biểu tượng triện son kết hợp đăng xuất */}
        <div
          className="w-14 h-14 mx-auto mb-3.5 rounded-2xl bg-gradient-to-br from-[#a62432] via-[#851924] to-[#5c1018] border border-amber-400/80 ring-4 ring-amber-400/25 text-amber-100 flex items-center justify-center shadow-md select-none"
          title="Triện An"
        >
          <LogOut className="w-6 h-6 text-amber-200 ml-0.5" />
        </div>

        {/* Tiêu đề */}
        <h3
          id="logout-dialog-title"
          className="font-serif text-xl sm:text-[22px] font-bold text-ink tracking-tight mb-1.5"
        >
          Rời Khỏi Góc An Yên?
        </h3>

        {/* Đường chỉ hoa văn ánh kim */}
        <div className="flex items-center gap-2 max-w-[220px] mx-auto mb-3.5">
          <span className="h-px flex-1 bg-gradient-to-r from-transparent via-amber-500/40 to-amber-500/10" />
          <span className="text-amber-600/70 dark:text-amber-400/70 text-[9px]">✤</span>
          <span className="h-px flex-1 bg-gradient-to-l from-transparent via-amber-500/40 to-amber-500/10" />
        </div>

        {/* Lời nhắn */}
        <p className="text-xs sm:text-[13px] text-stone-600 dark:text-stone-300 leading-relaxed mb-6 font-sans">
          {userName ? `Bạn có chắc muốn đăng xuất tài khoản "${userName}"? ` : "Bạn có chắc chắn muốn đăng xuất tài khoản? "}
          Mọi quẻ xăm và hành trình tĩnh tại của bạn vẫn được lưu giữ an toàn.
        </p>

        {/* Hai nút hành động */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 h-11 rounded-xl border border-stone-300/80 dark:border-stone-700 bg-stone-100/70 dark:bg-stone-800/70 hover:bg-stone-200 dark:hover:bg-stone-800 text-stone-700 dark:text-stone-200 font-sans font-semibold text-sm transition-all cursor-pointer active:scale-[0.98]"
          >
            Ở lại
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="flex-1 h-11 relative overflow-hidden rounded-xl font-serif font-bold text-sm text-amber-100 tracking-wider shadow-[0_4px_16px_rgba(139,26,26,0.35)] transition-all cursor-pointer flex items-center justify-center gap-1.5 border border-amber-400/50 hover:border-amber-300/80 hover:shadow-[0_6px_22px_rgba(139,26,26,0.45)] active:scale-[0.98] bg-gradient-to-r from-[#6b1414] via-[#8f1d1d] to-[#591010]"
          >
            <span>Đăng xuất</span>
          </button>
        </div>
      </div>
    </div>
  );
};
