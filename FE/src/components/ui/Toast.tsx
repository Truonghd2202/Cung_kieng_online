import React, { useState, useEffect, useSyncExternalStore } from "react";
import { X, CheckCircle2, AlertTriangle, AlertCircle, Info } from "lucide-react";

export type ToastType = "success" | "error" | "info" | "warning";

export interface ToastOptions {
  type?: ToastType;
  title?: string;
  duration?: number;
}

export interface ToastItem {
  id: string;
  type: ToastType;
  title: string;
  message: string;
  duration: number;
  createdAt: number;
}

type ToastListener = () => void;

let toasts: ToastItem[] = [];
let listeners: ToastListener[] = [];
let activeTimer: ReturnType<typeof setTimeout> | null = null;

function emitChange() {
  for (const listener of listeners) {
    listener();
  }
}

function subscribe(listener: ToastListener) {
  listeners.push(listener);
  return () => {
    listeners = listeners.filter((l) => l !== listener);
  };
}

function getSnapshot(): ToastItem[] {
  return toasts;
}

export const toast = {
  show: (message: string, options?: ToastOptions): string => {
    // Nếu có toast trước đó đang hiển thị thì hủy timer cũ ngay lập tức
    if (activeTimer) {
      clearTimeout(activeTimer);
      activeTimer = null;
    }

    const id = `toast-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
    const type = options?.type || "info";
    const defaultTitles: Record<ToastType, string> = {
      success: "Cát Lành",
      error: "Thông Báo",
      info: "Khởi Niệm",
      warning: "Lưu Ý",
    };
    const title = options?.title || defaultTitles[type];
    const duration = options?.duration ?? (type === "error" ? 5000 : 3800);

    const newItem: ToastItem = {
      id,
      type,
      title,
      message,
      duration,
      createdAt: Date.now(),
    };

    // QUY TẮC: Luôn chỉ giữ duy nhất 1 toast đang hiển thị.
    // Toast mới xuất hiện sẽ tự động thay thế/đè lên toast trước đó, không xếp chồng lên nhau.
    toasts = [newItem];
    emitChange();

    if (duration > 0) {
      activeTimer = setTimeout(() => {
        toast.dismiss(id);
      }, duration);
    }

    return id;
  },

  success: (message: string, title?: string, duration?: number): string => {
    return toast.show(message, { type: "success", title: title || "Cát Tường Như Ý", duration });
  },

  error: (message: string, title?: string, duration?: number): string => {
    return toast.show(message, { type: "error", title: title || "Chưa Hoàn Tất", duration });
  },

  info: (message: string, title?: string, duration?: number): string => {
    return toast.show(message, { type: "info", title: title || "Thông Điệp An Yên", duration });
  },

  warning: (message: string, title?: string, duration?: number): string => {
    return toast.show(message, { type: "warning", title: title || "Cần Lưu Tâm", duration });
  },

  dismiss: (id: string) => {
    if (activeTimer) {
      clearTimeout(activeTimer);
      activeTimer = null;
    }
    const prevLen = toasts.length;
    toasts = toasts.filter((t) => t.id !== id);
    if (toasts.length !== prevLen) {
      emitChange();
    }
  },

  clearAll: () => {
    if (activeTimer) {
      clearTimeout(activeTimer);
      activeTimer = null;
    }
    if (toasts.length > 0) {
      toasts = [];
      emitChange();
    }
  },
};

// Ghi đè tự động window.alert để không bao giờ hiện popup thô sơ của trình duyệt
if (typeof window !== "undefined") {
  window.alert = (message?: unknown) => {
    toast.info(String(message ?? ""), "Thông Báo");
  };
}

const ToastCard: React.FC<{
  item: ToastItem;
  onDismiss: (id: string) => void;
}> = ({ item, onDismiss }) => {
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    if (item.duration <= 0) return;
    const startTime = Date.now();
    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const remaining = Math.max(0, 100 - (elapsed / item.duration) * 100);
      setProgress(remaining);
      if (remaining <= 0) clearInterval(interval);
    }, 35);

    return () => clearInterval(interval);
  }, [item.id, item.duration]);

  // Cấu hình dấu ấn và sắc thái theo từng loại
  const themeConfig = {
    success: {
      sealChar: "吉",
      sealTitle: "Triện Cát Lành",
      sealBg: "bg-gradient-to-br from-[#1b5e3f] via-[#144931] to-[#0c2f20] border-emerald-400/80 ring-emerald-400/30 text-emerald-100",
      cardBorder: "border-emerald-600/35 dark:border-emerald-500/40",
      cardGlow: "shadow-[0_16px_36px_rgba(20,73,49,0.18)] dark:shadow-[0_16px_36px_rgba(0,0,0,0.65)]",
      titleColor: "text-emerald-950 dark:text-emerald-200",
      progressBg: "from-emerald-600 via-amber-400 to-emerald-700",
      icon: <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />,
    },
    error: {
      sealChar: "✕",
      sealTitle: "Triện Chu Sa",
      sealBg: "bg-gradient-to-br from-[#a62432] via-[#851924] to-[#5c1018] border-amber-400/80 ring-amber-400/30 text-amber-100",
      cardBorder: "border-[#a62432]/35 dark:border-[#a62432]/45",
      cardGlow: "shadow-[0_16px_36px_rgba(166,36,50,0.18)] dark:shadow-[0_16px_36px_rgba(0,0,0,0.65)]",
      titleColor: "text-[#7a1823] dark:text-red-200",
      progressBg: "from-[#a62432] via-amber-400 to-[#7a1823]",
      icon: <AlertCircle className="w-3.5 h-3.5 text-[#a62432] dark:text-red-400" />,
    },
    warning: {
      sealChar: "!",
      sealTitle: "Triện Cẩn Trọng",
      sealBg: "bg-gradient-to-br from-amber-600 via-amber-700 to-stone-900 border-amber-400/80 ring-amber-400/30 text-amber-100",
      cardBorder: "border-amber-600/35 dark:border-amber-500/40",
      cardGlow: "shadow-[0_16px_36px_rgba(180,83,9,0.18)] dark:shadow-[0_16px_36px_rgba(0,0,0,0.65)]",
      titleColor: "text-amber-950 dark:text-amber-200",
      progressBg: "from-amber-600 via-yellow-400 to-amber-700",
      icon: <AlertTriangle className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />,
    },
    info: {
      sealChar: "心",
      sealTitle: "Triện Khởi Niệm",
      sealBg: "bg-gradient-to-br from-[#8f5223] via-[#754018] to-[#42220b] border-amber-400/80 ring-amber-400/30 text-amber-100",
      cardBorder: "border-amber-700/25 dark:border-amber-400/30",
      cardGlow: "shadow-[0_16px_36px_rgba(143,82,35,0.16)] dark:shadow-[0_16px_36px_rgba(0,0,0,0.65)]",
      titleColor: "text-stone-900 dark:text-amber-200",
      progressBg: "from-amber-600 via-amber-400 to-stone-700",
      icon: <Info className="w-3.5 h-3.5 text-amber-700 dark:text-amber-400" />,
    },
  }[item.type];

  return (
    <div
      role="status"
      aria-live="polite"
      className={`group pointer-events-auto relative w-full sm:w-[380px] max-w-[94vw] rounded-2xl bg-white/95 dark:bg-[#1c1618]/95 backdrop-blur-xl p-3.5 sm:p-4 border ${themeConfig.cardBorder} ${themeConfig.cardGlow} transition-all duration-300 transform translate-y-0 opacity-100 animate-in slide-in-from-top-3 fade-in overflow-hidden select-none`}
    >
      {/* 4 Góc kim chi hoa văn cổ điển (Ornamental Brass Corner Brackets) */}
      <div className="absolute top-1.5 left-1.5 w-2 h-2 border-t border-l border-amber-500/50 rounded-tl-xs pointer-events-none" />
      <div className="absolute top-1.5 right-1.5 w-2 h-2 border-t border-r border-amber-500/50 rounded-tr-xs pointer-events-none" />
      <div className="absolute bottom-1.5 left-1.5 w-2 h-2 border-b border-l border-amber-500/50 rounded-bl-xs pointer-events-none" />
      <div className="absolute bottom-1.5 right-1.5 w-2 h-2 border-b border-r border-amber-500/50 rounded-br-xs pointer-events-none" />

      {/* Nội dung Toast */}
      <div className="flex items-start gap-3">
        {/* Dấu ấn Triện son / Triện ngọc */}
        <div
          className={`w-9 h-9 rounded-xl ${themeConfig.sealBg} border ring-2 flex items-center justify-center shrink-0 shadow-sm mt-0.5`}
          title={themeConfig.sealTitle}
        >
          <span className="font-serif font-black text-sm tracking-tight leading-none">
            {themeConfig.sealChar}
          </span>
        </div>

        {/* Tiêu đề & Thông điệp */}
        <div className="flex-1 min-w-0 pr-4">
          <div className="flex items-center gap-1.5">
            <h4 className={`font-sans font-bold text-[13px] sm:text-sm tracking-normal ${themeConfig.titleColor}`}>
              {item.title}
            </h4>
            <span className="shrink-0">{themeConfig.icon}</span>
          </div>
          <p className="text-xs text-stone-600 dark:text-stone-300 mt-0.5 leading-relaxed break-words font-sans">
            {item.message}
          </p>
        </div>

        {/* Nút đóng */}
        <button
          type="button"
          onClick={() => onDismiss(item.id)}
          className="absolute top-2.5 right-2.5 p-1 rounded-lg text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors cursor-pointer"
          aria-label="Đóng thông báo"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Thanh đo thời gian lướt mạ vàng đáy */}
      {item.duration > 0 && (
        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-stone-200/50 dark:bg-stone-800 overflow-hidden pointer-events-none">
          <div
            className={`h-full bg-gradient-to-r ${themeConfig.progressBg} transition-all duration-75 ease-linear`}
            style={{ width: `${progress}%` }}
          />
        </div>
      )}
    </div>
  );
};

export const ToastContainer: React.FC = () => {
  const currentToasts = useSyncExternalStore(subscribe, getSnapshot, getSnapshot);

  if (currentToasts.length === 0) return null;

  return (
    <div
      aria-label="Thông báo hệ thống"
      className="fixed top-4 right-0 left-0 sm:left-auto sm:right-5 z-[999999] flex flex-col items-center sm:items-end gap-2.5 px-3 pointer-events-none"
    >
      {currentToasts.map((item) => (
        <ToastCard key={item.id} item={item} onDismiss={toast.dismiss} />
      ))}
    </div>
  );
};
