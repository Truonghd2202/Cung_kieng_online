import React, { useEffect, useRef, useState } from "react";
import {
  Flower2,
  Flame,
  Sticker,
  Check,
  Sparkles,
  ShoppingBag,
  ArrowRight,
  RotateCcw,
  AlertCircle,
  ShieldCheck,
} from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import type { DigitalItemId } from "./DigitalItemsPanel";

interface Props {
  owned: DigitalItemId[];
  onReceive: (id: DigitalItemId) => boolean;
}

type Phase = "choose" | "review" | "processing" | "error";

interface ItemMeta {
  id: DigitalItemId;
  title: string;
  tagline: string;
  description: string;
  icon: typeof Flower2;
  gradient: string;
}

const ITEMS: ItemMeta[] = [
  {
    id: "lotus-vase",
    title: "Bình sen ngọc",
    tagline: "Vật phẩm bài trí 3D",
    description: "Bình hoa sen gốm mộc bài trí trên bàn thờ gia tiên hoặc góc thiền 3D, mang lại khí sắc thanh tịnh.",
    icon: Flower2,
    gradient: "from-amber-500/20 via-orange-500/10 to-amber-600/15",
  },
  {
    id: "river-lantern",
    title: "Hoa đăng sông trăng",
    tagline: "Vật phẩm bài trí 3D",
    description: "Ngọn đèn hoa đăng thắp sáng lòng thành, tỏa ánh vàng ấm áp và dẫn dắt tâm niệm an lành.",
    icon: Flame,
    gradient: "from-rose-500/20 via-amber-500/10 to-orange-600/15",
  },
  {
    id: "sticker",
    title: "Sticker sen kỷ vật",
    tagline: "Vật phẩm số 2D",
    description: "Phù hiệu sen mộc 'Gửi bạn bình an' dạng PNG trong suốt, dùng để tải về lưu niệm hoặc gửi tặng người thân.",
    icon: Sticker,
    gradient: "from-emerald-500/20 via-teal-500/10 to-amber-600/15",
  },
];

export function DigitalItemPurchaseDemo({ owned, onReceive }: Props) {
  const [selectedId, setSelectedId] = useState<DigitalItemId>("lotus-vase");
  const [phase, setPhase] = useState<Phase>("choose");
  const [simulateError, setSimulateError] = useState(false);
  const [message, setMessage] = useState("");

  const receiverRef = useRef(onReceive);
  const statusRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    receiverRef.current = onReceive;
  }, [onReceive]);

  useEffect(() => {
    if (phase !== "processing") return;

    const timer = window.setTimeout(() => {
      if (simulateError) {
        setMessage("Lỗi kết nối mô phỏng: Chưa thể lưu vật phẩm vào bộ sưu tập.");
        setPhase("error");
        return;
      }

      const saved = receiverRef.current(selectedId);

      if (!saved) {
        setMessage(
          "Chưa lưu được vật phẩm vào trình duyệt. Hãy kiểm tra bộ sưu tập hoặc thử lại.",
        );
        setPhase("error");
        return;
      }

      setMessage("Đã thỉnh vật phẩm demo thành công vào bộ sưu tập cá nhân!");
      setPhase("choose");
    }, 800);

    return () => window.clearTimeout(timer);
  }, [phase, selectedId, simulateError]);

  useEffect(() => {
    if (phase !== "choose") statusRef.current?.focus();
  }, [phase]);

  const selectedItem = ITEMS.find((item) => item.id === selectedId) || ITEMS[0];
  const alreadyOwned = owned.includes(selectedId);

  return (
    <section
      aria-labelledby="digital-purchase-demo-title"
      className="mt-8 rounded-2xl border border-line bg-surface/95 p-5 sm:p-7 shadow-xs backdrop-blur-sm"
    >
      {/* Header section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-line">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500/15 border border-amber-400/30 flex items-center justify-center text-amber-700 dark:text-amber-400 shrink-0">
            <ShoppingBag className="w-5 h-5" />
          </div>
          <div>
            <h3
              id="digital-purchase-demo-title"
              className="font-display text-lg sm:text-xl font-bold text-ink"
            >
              Gian hàng vật phẩm demo
            </h3>
            <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 mt-0.5">
              Trải nghiệm thỉnh vật phẩm tâm linh vào không gian ảo • Hoàn toàn miễn phí (0đ)
            </p>
          </div>
        </div>

        <Badge
          variant="outline"
          className="self-start sm:self-auto text-xs px-3 py-1 font-medium bg-amber-500/10 text-amber-800 dark:text-amber-300 border-amber-400/30 flex items-center gap-1.5"
        >
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Mô phỏng trải nghiệm • Không thu tiền</span>
        </Badge>
      </div>

      {phase === "choose" ? (
        <div className="mt-6 space-y-6">
          {/* Item Selector Cards */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-amber-800 dark:text-amber-300 mb-3">
              Bước 1: Chọn vật phẩm muốn thỉnh
            </label>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {ITEMS.map((item) => {
                const isSelected = item.id === selectedId;
                const isItemOwned = owned.includes(item.id);
                const ItemIcon = item.icon;

                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => {
                      setSelectedId(item.id);
                      setMessage("");
                    }}
                    className={`text-left p-4 rounded-xl border transition-all relative flex flex-col justify-between cursor-pointer ${
                      isSelected
                        ? "border-amber-600 dark:border-amber-400 bg-amber-50/70 dark:bg-amber-950/30 shadow-md ring-2 ring-amber-500/30"
                        : "border-line bg-surface hover:border-amber-500/40 hover:bg-surface-soft"
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <div
                          className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.gradient} border border-line flex items-center justify-center text-amber-700 dark:text-amber-400`}
                        >
                          <ItemIcon className="w-6 h-6" />
                        </div>

                        {isItemOwned ? (
                          <Badge className="bg-emerald-600/15 text-emerald-800 dark:text-emerald-300 border border-emerald-500/30 text-[11px] gap-1 px-2 py-0.5">
                            <Check className="w-3 h-3" /> Đã sở hữu
                          </Badge>
                        ) : (
                          <Badge variant="outline" className="text-[11px] px-2 py-0.5 font-bold text-amber-700 dark:text-amber-400 border-amber-400/40">
                            0đ (Demo)
                          </Badge>
                        )}
                      </div>

                      <h4 className="font-display font-bold text-base text-ink mb-1">
                        {item.title}
                      </h4>
                      <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed mb-3">
                        {item.description}
                      </p>
                    </div>

                    <div className="pt-2 border-t border-line/60 flex items-center justify-between text-xs">
                      <span className="text-stone-500 dark:text-stone-400 font-medium">
                        {item.tagline}
                      </span>
                      <span
                        className={`font-semibold ${
                          isSelected
                            ? "text-amber-700 dark:text-amber-400"
                            : "text-stone-500 dark:text-stone-400"
                        }`}
                      >
                        {isSelected ? "Đang chọn" : "Nhấn để chọn"}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Action Row */}
          <div className="p-4 sm:p-5 rounded-xl bg-surface-soft/80 border border-line flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-sm font-semibold text-ink">
                <span>Vật phẩm đang chọn:</span>
                <span className="text-amber-700 dark:text-amber-400 font-bold font-display">
                  {selectedItem.title}
                </span>
                <span className="text-xs font-normal text-stone-500 dark:text-stone-400">
                  (Giá thử nghiệm: 0 VND)
                </span>
              </div>
              <label className="flex items-center gap-2 text-xs text-stone-600 dark:text-stone-400 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={simulateError}
                  onChange={(e) => setSimulateError(e.target.checked)}
                  className="rounded border-line text-amber-600 focus:ring-amber-500 w-3.5 h-3.5"
                />
                <span>Mô phỏng tình huống gián đoạn kết nối để kiểm thử</span>
              </label>
            </div>

            <div className="flex items-center gap-3">
              <Button
                type="button"
                disabled={alreadyOwned}
                onClick={() => {
                  setMessage("");
                  setPhase("review");
                }}
                className={`gap-2 min-h-11 px-6 font-semibold shadow-md transition-all cursor-pointer ${
                  alreadyOwned
                    ? "opacity-60 cursor-not-allowed"
                    : "bg-gradient-to-r from-amber-700 via-amber-800 to-amber-900 hover:from-amber-600 hover:to-amber-800 text-white"
                }`}
              >
                <Sparkles className="w-4 h-4" />
                <span>
                  {alreadyOwned
                    ? "Vật phẩm đã có trong bộ sưu tập"
                    : `Thỉnh ${selectedItem.title} (0đ)`}
                </span>
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <div
          ref={statusRef}
          tabIndex={-1}
          aria-busy={phase === "processing"}
          className="mt-6"
        >
          {/* Phase: Review Confirmation */}
          {phase === "review" && (
            <div className="max-w-xl mx-auto p-6 rounded-2xl bg-surface-soft border border-line text-center">
              <div className="w-14 h-14 rounded-full bg-amber-500/15 border border-amber-400/30 flex items-center justify-center text-amber-700 dark:text-amber-400 mx-auto mb-4 shadow-sm">
                <Sparkles className="w-7 h-7" />
              </div>

              <h4 className="font-display text-xl font-bold text-ink mb-2">
                Xác nhận thỉnh vật phẩm demo
              </h4>

              <p className="text-sm text-stone-600 dark:text-stone-300 leading-relaxed mb-4">
                Bạn đang chuẩn bị thêm <strong className="text-ink">{selectedItem.title}</strong> vào bộ sưu tập cá nhân.
                Hệ thống chỉ lưu trữ trên trình duyệt của bạn và hoàn toàn không phát sinh chi phí.
              </p>

              <div className="p-3 rounded-lg bg-surface border border-line text-xs text-stone-600 dark:text-stone-400 mb-6 inline-block">
                Chi phí: <span className="font-bold text-emerald-700 dark:text-emerald-400">0 VND</span> • Thao tác an toàn
              </div>

              <div className="flex items-center justify-center gap-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setPhase("choose")}
                  className="px-5 border-line text-ink cursor-pointer"
                >
                  Chọn vật phẩm khác
                </Button>

                <Button
                  type="button"
                  onClick={() => setPhase("processing")}
                  className="px-6 bg-gradient-to-r from-amber-700 to-amber-900 text-white font-semibold cursor-pointer gap-2"
                >
                  <span>Xác nhận đưa vào bộ sưu tập</span>
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          )}

          {/* Phase: Processing */}
          {phase === "processing" && (
            <div className="max-w-md mx-auto p-8 rounded-2xl bg-surface-soft border border-line text-center">
              <div className="w-12 h-12 rounded-full border-2 border-amber-600 border-t-transparent animate-spin mx-auto mb-4" />
              <h4 className="font-display font-bold text-lg text-ink mb-1">
                Đang tiếp nhận vật phẩm...
              </h4>
              <p className="text-xs text-stone-500 dark:text-stone-400">
                Đang cập nhật rương báu trong không gian của bạn
              </p>
            </div>
          )}

          {/* Phase: Error Simulation */}
          {phase === "error" && (
            <div className="max-w-md mx-auto p-6 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-center">
              <div className="w-12 h-12 rounded-full bg-rose-500/20 text-rose-600 dark:text-rose-400 flex items-center justify-center mx-auto mb-3">
                <AlertCircle className="w-6 h-6" />
              </div>
              <h4 className="font-display font-bold text-base text-rose-800 dark:text-rose-300 mb-2">
                Không thể hoàn tất
              </h4>
              <p className="text-xs text-stone-600 dark:text-stone-300 mb-5">
                {message || "Đã xảy ra sự cố trong quá trình lưu trữ vật phẩm mô phỏng."}
              </p>
              <div className="flex items-center justify-center gap-2.5">
                <Button
                  type="button"
                  onClick={() => {
                    setSimulateError(false);
                    setMessage("");
                    setPhase("processing");
                  }}
                  className="text-xs bg-rose-700 hover:bg-rose-800 text-white gap-1.5 cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Thử lại</span>
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setMessage("");
                    setPhase("choose");
                  }}
                  className="text-xs border-line text-ink cursor-pointer"
                >
                  Quay lại
                </Button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Success / Feedback Notification */}
      {phase === "choose" && message && (
        <div
          role="status"
          aria-live="polite"
          className="mt-5 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center gap-3 text-emerald-800 dark:text-emerald-300 text-sm font-medium animate-fadeIn"
        >
          <div className="w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center shrink-0">
            <Check className="w-4 h-4 text-emerald-700 dark:text-emerald-300" />
          </div>
          <span>{message}</span>
        </div>
      )}
    </section>
  );
}
