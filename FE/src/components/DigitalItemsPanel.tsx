import { useEffect, useState } from "react";
import { Flower2, Flame, Sticker } from "lucide-react";
import { Button } from "./ui/button";
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
    title: "Bình sen",
    description: "Bình sen minh họa để trang trí cảnh 3D.",
    Icon: Flower2,
  },
  {
    id: "river-lantern",
    title: "Hoa đăng",
    description: "Hoa đăng minh họa để trang trí cảnh 3D.",
    Icon: Flame,
  },
  {
    id: "sticker",
    title: "Sticker kỷ vật",
    description: "Vật phẩm minh họa 2D, không đặt vào cảnh 3D.",
    Icon: Sticker,
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

  if (
    !value ||
    typeof value !== "object" ||
    Array.isArray(value)
  ) {
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

  if (
    decoration !== null &&
    !owned.includes(decoration)
  ) {
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

  const storageKey = account
    ? `tltl-digital-items-${account}`
    : null;

  const [collection, setCollection] =
    useState<Collection>(emptyCollection);

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
        (
          event.key === storageKey ||
          event.key === null
        )
      ) {
        setMessage("");
        refresh();
      }
    };

    refresh();

    window.addEventListener("storage", handleStorage);
    window.addEventListener(CHANGED_EVENT, refresh);

    return () => {
      window.removeEventListener("storage", handleStorage);
      window.removeEventListener(CHANGED_EVENT, refresh);
    };
  }, [storageKey, reloadVersion]);

  useEffect(() => {
    onDecorationChange(
      ready && !readError
        ? collection.decoration
        : null,
    );
  }, [
    ready,
    readError,
    collection.decoration,
    onDecorationChange,
  ]);

  const commit = (
    update: (latest: Collection) => Collection,
    successMessage: string,
  ): boolean => {
    if (!storageKey || !ready || readError) return false;

    try {
      const latest = readCollection(storageKey);
      const next = update(latest);

      localStorage.setItem(
        storageKey,
        JSON.stringify(next),
      );

      setCollection(next);
      setMessage(successMessage);

      window.dispatchEvent(
        new Event(CHANGED_EVENT),
      );

      return true;
    } catch {
      setMessage(
        "Chưa lưu được thay đổi. Bạn hãy thử lại.",
      );
      return false;
    }
  };

  const receiveItem = (id: DigitalItemId): boolean => {
    return commit(
      (latest) => ({
        ...latest,
        owned: latest.owned.includes(id)
          ? latest.owned
          : [...latest.owned, id],
      }),
      "Đã lưu vật phẩm vào bộ sưu tập demo.",
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
      "Đã lưu trang trí. Mở cảnh 3D bên dưới để xem.",
    );
  };

  const handleDownloadSticker = async () => {
    if (!storageKey || downloadingSticker || readError || !ready) {
      return;
    }

    setDownloadingSticker(true);
    setMessage("");

    try {
      // Kiểm tra lại kho đang lưu trước khi xuất ảnh.
      const latest = readCollection(storageKey);

      if (!latest.owned.includes("sticker")) {
        setCollection(latest);
        setMessage("Bạn hãy nhận sticker demo trước khi tải.");
        return;
      }

      await downloadFolkSticker();

      setMessage(
        "Đã yêu cầu trình duyệt tải ảnh PNG. Bạn có thể chọn ảnh để gửi trong ứng dụng trò chuyện.",
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
      className="mb-10 rounded-card border border-line bg-surface p-5 sm:p-6"
    >
      <h2
        id="digital-items-title"
        className="font-display text-xl font-semibold text-ink"
      >
        Bộ sưu tập vật phẩm
      </h2>

      <p className="mt-3 text-sm leading-relaxed text-muted">
        Nhận vật phẩm demo miễn phí để thử bộ sưu tập
        và trang trí. Chưa có mua bán hoặc thanh toán.
      </p>

      {!account && (
        <div className="mt-4 rounded-panel border border-line p-4">
          <p className="text-sm text-muted">
            Đăng nhập demo để lưu bộ sưu tập theo tài khoản
            trên trình duyệt này.
          </p>

          <Button
            type="button"
            className="mt-3"
            onClick={onGoToLogin}
          >
            Đăng nhập
          </Button>
        </div>
      )}

      {!ready ? (
        <p role="status" className="mt-4 text-sm text-muted">
          Đang đọc bộ sưu tập…
        </p>
      ) : readError ? (
        <div className="mt-4">
          <p role="alert" className="text-sm text-danger">
            Chưa đọc được bộ sưu tập. Dữ liệu đang lưu
            được giữ nguyên. Bạn có thể thử đọc lại hoặc
            xóa dữ liệu trải nghiệm trong Cài đặt.
          </p>

          <Button
            type="button"
            variant="outline"
            className="mt-3"
            onClick={() => {
              setReloadVersion((value) => value + 1);
            }}
          >
            Thử đọc lại
          </Button>
        </div>
      ) : (
        <>
          <div className="mt-5 grid gap-4 sm:grid-cols-3">
            {ITEMS.map((item) => {
              const owned = collection.owned.includes(item.id);
              const selected =
                collection.decoration === item.id;
              const Icon = item.Icon;

              return (
                <article
                  key={item.id}
                  className="rounded-panel border border-line p-4"
                >
                  <Icon
                    aria-hidden="true"
                    className="h-8 w-8 text-accent"
                  />

                  <h3 className="mt-3 font-semibold text-ink">
                    {item.title}
                  </h3>

                  <p className="mt-2 text-sm text-muted">
                    {item.description}
                  </p>

                  <p className="mt-3 text-xs text-muted">
                    {owned
                      ? "Đã có trong bộ sưu tập"
                      : "Chưa có trong bộ sưu tập"}
                  </p>

                  {account && !owned && (
                    <Button
                      type="button"
                      variant="outline"
                      className="mt-3"
                      onClick={() => receiveItem(item.id)}
                    >
                      Nhận {item.title.toLowerCase()} demo
                    </Button>
                  )}

                  {owned && item.id !== "sticker" && (
                    <Button
                      type="button"
                      variant="outline"
                      className="mt-3"
                      aria-pressed={selected}
                      onClick={() => {
                        decorate(item.id);
                      }}
                    >
                      {selected
                        ? "Đang trang trí"
                        : "Dùng để trang trí"}
                    </Button>
                  )}

                  {owned && item.id === "sticker" && (
                    <div className="mt-3">
                      <p className="text-xs text-muted">
                        Ảnh sen “Gửi bạn bình an”, nền trong suốt.
                        Tải ảnh PNG để gửi cho người thân.
                      </p>

                      <Button
                        type="button"
                        variant="outline"
                        className="mt-3"
                        disabled={downloadingSticker}
                        onClick={handleDownloadSticker}
                      >
                        {downloadingSticker
                          ? "Đang tạo ảnh…"
                          : "Tải sticker PNG"}
                      </Button>
                    </div>
                  )}
                </article>
              );
            })}
          </div>

          {collection.decoration && (
            <Button
              type="button"
              variant="outline"
              className="mt-4"
              onClick={() => {
                commit(
                  (latest) => ({
                    ...latest,
                    decoration: null,
                  }),
                  "Đã bỏ trang trí. Vật phẩm vẫn trong bộ sưu tập.",
                );
              }}
            >
              Bỏ vật phẩm đang trang trí
            </Button>
          )}
        </>
      )}

      {account && ready && !readError && (
        <DigitalItemPurchaseDemo
          key={account}
          owned={collection.owned}
          onReceive={receiveItem}
        />
      )}

      <p
        role="status"
        aria-live="polite"
        className="mt-4 text-sm text-ink"
      >
        {message}
      </p>
    </section>
  );
}
