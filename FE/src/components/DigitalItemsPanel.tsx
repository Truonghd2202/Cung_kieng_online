import React, { useEffect, useState } from "react";
import {
  Flower2,
  Flame,
  Sticker,
  Check,
  Sparkles,
  Download,
  LogIn,
  Package,
  Layers,
  XCircle,
  ArrowRight,
} from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import type { DecorationId } from "./createDigitalDecoration";
import { downloadFolkSticker } from "./downloadFolkSticker";
import { DigitalItemPurchaseDemo } from "./DigitalItemPurchaseDemo";

export type DigitalItemId = DecorationId | "sticker";

interface Collection {
  owned: DigitalItemId[];
  decoration: DecorationId | null;
}

interface Props {
  currentUserEmail?: string;
  onGoToLogin: () => void;
  onDecorationChange: (decoration: DigitalItemId | null) => void;
}

const CHANGED_EVENT = "tltl-digital-items-change";

const ITEMS = [
  {
    id: "lotus-vase",
    title: "Bình sen ngọc",
    category: "Vật phẩm 3D",
    description: "Bình hoa sen bài trí thanh tịnh trên bàn thờ mẫu trong không gian 3D.",
    Icon: Flower2,
    gradient: "from-amber-500/20 to-orange-500/15",
  },
  {
    id: "river-lantern",
    title: "Hoa đăng sông trăng",
    category: "Vật phẩm 3D",
    description: "Hoa đăng thắp sáng lòng thành, tỏa ánh vàng dịu dàng trong không gian tri ân.",
    Icon: Flame,
    gradient: "from-rose-500/20 to-amber-500/15",
  },
  {
    id: "sticker",
    title: "Sticker sen kỷ vật",
    category: "Kỷ vật số 2D",
    description: "Phù hiệu sen mộc 'Gửi bạn bình an' dạng PNG trong suốt để lưu niệm hoặc gửi tặng.",
    Icon: Sticker,
    gradient: "from-emerald-500/20 to-teal-500/15",
  },
] as const;

function emptyCollection(): Collection {
  return {
    owned: [],
    decoration: null,
  };
}

function isItemId(value: unknown): value is DigitalItemId {
  return ITEMS.some((item) => item.id === value);
}

function readCollection(key: string): Collection {
  const raw = localStorage.getItem(key);

  if (raw === null) {
    return emptyCollection();
  }

  const value: unknown = JSON.parse(raw);

  if (!value || typeof value !== "object" || Array.isArray(value)) {
    throw new Error("Kho vật phẩm chưa hợp lệ.");
  }

  const record = value as Record<string, unknown>;
  const rawOwned = record.owned;

  if (
    !Array.isArray(rawOwned) ||
    !rawOwned.every(isItemId) ||
    new Set(rawOwned).size !== rawOwned.length
  ) {
    throw new Error("Danh sách vật phẩm chưa hợp lệ.");
  }

  const owned = rawOwned as DigitalItemId[];
  const decoration = record.decoration as DecorationId | null;

  if (
    decoration !== null &&
    decoration !== "lotus-vase" &&
    decoration !== "river-lantern"
  ) {
    throw new Error("Vật phẩm trang trí chưa hợp lệ.");
  }

  if (decoration !== null && !owned.includes(decoration)) {
    throw new Error("Vật phẩm trang trí chưa được nhận.");
  }

  return {
    owned: [...owned],
    decoration,
  };
}

export function DigitalItemsPanel({
  currentUserEmail,
  onGoToLogin,
  onDecorationChange,
}: Props) {
  const account = currentUserEmail?.trim().toLowerCase();

  const storageKey = account ? `tltl-digital-items-${account}` : null;

  const [collection, setCollection] = useState<Collection>(emptyCollection);

  const [ready, setReady] = useState(false);
  const [readError, setReadError] = useState(false);
  const [message, setMessage] = useState("");
  const [reloadVersion, setReloadVersion] = useState(0);
  const [downloadingSticker, setDownloadingSticker] = useState(false);

  useEffect(() => {
    setReady(false);
    setMessage("");

    const refresh = () => {
      try {
        const saved = storageKey
          ? readCollection(storageKey)
          : emptyCollection();

        setCollection(saved);
        setReadError(false);
      } catch {
        setCollection(emptyCollection());
        setReadError(true);
      } finally {
        setReady(true);
      }
    };

    const handleStorage = (event: StorageEvent) => {
      if (
        event.storageArea === localStorage &&
        (event.key === storageKey || event.key === null)
      ) {
        refresh();
      }
    };

    const handleAppChange = () => {
      refresh();
    };

    refresh();

    window.addEventListener("storage", handleStorage);
    window.addEventListener(CHANGED_EVENT, handleAppChange);

    return () => {
      window.removeEventListener("storage", handleStorage);
      window.removeEventListener(CHANGED_EVENT, handleAppChange);
    };
  }, [storageKey, reloadVersion]);

  useEffect(() => {
    onDecorationChange(collection.decoration);
  }, [collection.decoration, onDecorationChange]);

  const commit = (
    update: (latest: Collection) => Collection,
    successMessage: string,
  ): boolean => {
    if (!storageKey || !ready || readError) return false;

    try {
      const latest = readCollection(storageKey);
      const next = update(latest);

      localStorage.setItem(storageKey, JSON.stringify(next));

      setCollection(next);
      setMessage(successMessage);

      window.dispatchEvent(new Event(CHANGED_EVENT));

      return true;
    } catch {
      setMessage("Chưa lưu được thay đổi. Bạn hãy thử lại.");
      return false;
    }
  };

  const receiveItem = (id: DigitalItemId): boolean => {
    return commit(
      (latest) => ({
        ...latest,
        owned: latest.owned.includes(id) ? latest.owned : [...latest.owned, id],
      }),
      "Đã lưu vật phẩm vào bộ sưu tập cá nhân.",
    );
  };

  const decorate = (id: DecorationId) => {
    commit(
      (latest) => {
        if (!latest.owned.includes(id)) {
          throw new Error("Bạn chưa nhận vật phẩm này.");
        }

        return {
          ...latest,
          decoration: id,
        };
      },
      "Đã cập nhật bài trí. Bạn hãy mở cảnh 3D bên dưới để chiêm ngưỡng.",
    );
  };

  const handleDownloadSticker = async () => {
    if (!storageKey || downloadingSticker || readError || !ready) {
      return;
    }

    setDownloadingSticker(true);
    setMessage("");

    try {
      const latest = readCollection(storageKey);

      if (!latest.owned.includes("sticker")) {
        setCollection(latest);
        setMessage("Bạn hãy nhận sticker demo trước khi tải ảnh.");
        return;
      }

      await downloadFolkSticker();

      setMessage(
        "Đã tạo ảnh PNG trong suốt thành công! Bạn có thể lưu về máy để gửi tặng người thân.",
      );
    } catch {
      setMessage("Chưa xuất được sticker. Bạn hãy thử lại.");
    } finally {
      setDownloadingSticker(false);
    }
  };

  return (
    <section
      aria-labelledby="digital-items-title"
      className="mb-12 rounded-2xl border border-line bg-surface/95 p-5 sm:p-8 shadow-xs backdrop-blur-sm"
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-line">
        <div className="flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-xl bg-amber-500/15 border border-amber-400/30 flex items-center justify-center text-amber-700 dark:text-amber-400 shrink-0">
            <Package className="w-6 h-6" />
          </div>
          <div>
            <h2
              id="digital-items-title"
              className="font-display text-xl sm:text-2xl font-bold text-ink"
            >
              Bộ sưu tập vật phẩm tâm linh
            </h2>
            <p className="mt-1 text-xs sm:text-sm text-stone-600 dark:text-stone-300">
              Nhận vật phẩm demo miễn phí để thử nghiệm bài trí vào không gian 3D và lưu giữ kỷ niệm
            </p>
          </div>
        </div>

        {collection.decoration && (
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => {
              commit(
                (latest) => ({
                  ...latest,
                  decoration: null,
                }),
                "Đã gỡ vật phẩm khỏi cảnh 3D.",
              );
            }}
            className="text-xs border-amber-400/40 text-amber-800 dark:text-amber-300 hover:bg-amber-500/10 cursor-pointer gap-1.5 self-start sm:self-auto"
          >
            <XCircle className="w-3.5 h-3.5" />
            <span>Gỡ vật phẩm đang bài trí</span>
          </Button>
        )}
      </div>

      {/* Guest Login Banner */}
      {!account && (
        <div className="mt-6 rounded-2xl border border-amber-400/35 bg-gradient-to-br from-amber-500/15 via-amber-500/10 to-orange-500/5 p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-5 shadow-xs">
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-amber-700 dark:text-amber-400 shrink-0 shadow-xs">
              <LogIn className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-display font-bold text-sm sm:text-base text-ink mb-0.5">
                Lưu giữ bảo vật theo tài khoản cá nhân
              </h4>
              <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 leading-relaxed">
                Đăng nhập để đồng bộ và lưu trữ trọn đời bộ sưu tập vật phẩm tâm linh trên trình duyệt này.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onGoToLogin}
            className="group relative overflow-hidden shrink-0 px-6 py-3 rounded-xl font-semibold text-sm text-white cursor-pointer transition-all duration-300 ease-out border border-amber-300/40 shadow-[0_4px_16px_rgba(180,83,9,0.35)] hover:shadow-[0_6px_24px_rgba(180,83,9,0.55)] hover:scale-[1.03] active:scale-[0.98] bg-gradient-to-r from-red-800 via-amber-700 to-amber-900 flex items-center justify-center gap-2 self-start sm:self-auto"
          >
            {/* Shimmer Light Sheen Sweep Effect */}
            <span
              className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/35 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out pointer-events-none"
              aria-hidden="true"
            />

            <Sparkles className="w-4 h-4 text-amber-300 group-hover:rotate-12 group-hover:scale-110 transition-transform duration-300 shrink-0" />
            <span className="relative z-10 tracking-wide font-display">Đăng nhập trải nghiệm</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform duration-300 text-amber-200 shrink-0" />
          </button>
        </div>
      )}

      {/* State: Reading / Error / Cards */}
      {!ready ? (
        <div role="status" className="mt-8 text-center py-8">
          <div className="w-8 h-8 rounded-full border-2 border-amber-600 border-t-transparent animate-spin mx-auto mb-3" />
          <p className="text-sm text-stone-500 dark:text-stone-400">
            Đang tải dữ liệu bộ sưu tập…
          </p>
        </div>
      ) : readError ? (
        <div className="mt-6 p-5 rounded-xl bg-rose-500/10 border border-rose-500/30">
          <p role="alert" className="text-sm text-rose-800 dark:text-rose-300">
            Chưa đọc được bộ sưu tập. Dữ liệu đang lưu được giữ nguyên. Bạn có thể thử đọc lại hoặc xóa cache trải nghiệm.
          </p>

          <Button
            type="button"
            variant="outline"
            className="mt-3 text-xs"
            onClick={() => {
              setReloadVersion((value) => value + 1);
            }}
          >
            Thử đọc lại
          </Button>
        </div>
      ) : (
        <>
          {/* Item Cards Grid */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-5">
            {ITEMS.map((item) => {
              const owned = collection.owned.includes(item.id);
              const selected = collection.decoration === item.id;
              const Icon = item.Icon;

              return (
                <article
                  key={item.id}
                  className={`rounded-2xl border transition-all p-5 flex flex-col justify-between ${
                    selected
                      ? "border-emerald-600/50 dark:border-emerald-400/50 bg-emerald-500/5 shadow-md ring-1 ring-emerald-500/30"
                      : owned
                      ? "border-amber-400/30 bg-surface hover:shadow-sm"
                      : "border-line bg-surface/70"
                  }`}
                >
                  <div>
                    {/* Top Icon & Badge */}
                    <div className="flex items-center justify-between mb-4">
                      <div
                        className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${item.gradient} border border-line flex items-center justify-center text-amber-700 dark:text-amber-400 shadow-xs`}
                      >
                        <Icon className="w-7 h-7" />
                      </div>

                      {selected ? (
                        <Badge className="bg-emerald-600/15 text-emerald-800 dark:text-emerald-300 border border-emerald-500/30 text-xs font-semibold gap-1 px-2.5 py-1">
                          <Check className="w-3.5 h-3.5" /> Đang bài trí 3D
                        </Badge>
                      ) : owned ? (
                        <Badge className="bg-amber-500/15 text-amber-800 dark:text-amber-300 border border-amber-400/30 text-xs font-medium px-2.5 py-1">
                          Đã có trong rương
                        </Badge>
                      ) : (
                        <Badge
                          variant="outline"
                          className="text-stone-500 dark:text-stone-400 text-xs px-2.5 py-1"
                        >
                          Chưa sở hữu
                        </Badge>
                      )}
                    </div>

                    <span className="text-[11px] font-bold tracking-wider uppercase text-amber-800 dark:text-amber-400 block mb-1">
                      {item.category}
                    </span>

                    <h3 className="font-display font-bold text-lg text-ink mb-1.5">
                      {item.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 leading-relaxed mb-4">
                      {item.description}
                    </p>
                  </div>

                  {/* Actions Area */}
                  <div className="pt-3 border-t border-line/60">
                    {account && !owned && (
                      <Button
                        type="button"
                        variant="default"
                        size="sm"
                        className="w-full bg-gradient-to-r from-amber-700 to-amber-900 text-white cursor-pointer font-medium"
                        onClick={() => receiveItem(item.id)}
                      >
                        <Sparkles className="w-3.5 h-3.5 mr-1.5" />
                        Nhận {item.title.toLowerCase()} demo
                      </Button>
                    )}

                    {owned && item.id !== "sticker" && (
                      <Button
                        type="button"
                        variant={selected ? "outline" : "default"}
                        size="sm"
                        className={`w-full cursor-pointer font-medium ${
                          selected
                            ? "border-emerald-600 text-emerald-800 dark:text-emerald-300 hover:bg-emerald-500/10"
                            : "bg-action text-white hover:bg-action/90"
                        }`}
                        aria-pressed={selected}
                        onClick={() => {
                          decorate(item.id);
                        }}
                      >
                        <Layers className="w-3.5 h-3.5 mr-1.5" />
                        {selected ? "Đang bài trí trên 3D" : "Bày trí vào cảnh 3D"}
                      </Button>
                    )}

                    {owned && item.id === "sticker" && (
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        className="w-full border-amber-400/40 text-amber-800 dark:text-amber-300 hover:bg-amber-500/10 cursor-pointer font-medium"
                        disabled={downloadingSticker}
                        onClick={handleDownloadSticker}
                      >
                        <Download className="w-3.5 h-3.5 mr-1.5" />
                        {downloadingSticker ? "Đang xử lý ảnh…" : "Tải ảnh PNG kỷ vật"}
                      </Button>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        </>
      )}

      {/* Purchase Demo Component (Embedded in Section) */}
      {account && ready && !readError && (
        <DigitalItemPurchaseDemo
          key={account}
          owned={collection.owned}
          onReceive={receiveItem}
        />
      )}

      {/* Global Feedback Message */}
      {message && (
        <div
          role="status"
          aria-live="polite"
          className="mt-6 p-4 rounded-xl bg-amber-500/10 border border-amber-400/30 text-amber-900 dark:text-amber-200 text-sm font-medium flex items-center gap-2.5"
        >
          <Sparkles className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0" />
          <span>{message}</span>
        </div>
      )}
    </section>
  );
}
