import { useEffect, useState } from "react";
import { apiRequest } from "../lib/api";

interface Item {
  code: string;
  name: string;
  kind: "CONSUMABLE" | "PERMANENT";
  description: string;
  quantity: number;
}

export function DigitalInventory({
  email,
}: {
  email?: string;
}) {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [reload, setReload] = useState(0);

  useEffect(() => {
    let active = true;

    setItems([]);
    setError("");

    if (!email) {
      setLoading(false);
      return;
    }

    setLoading(true);

    void apiRequest<{ items: Item[] }>("/inventory")
      .then((result) => {
        if (active) setItems(result.items);
      })
      .catch(() => {
        if (active) {
          setError("Chưa tải được kho vật phẩm.");
        }
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, [email, reload]);

  if (!email) return null;

  return (
    <section className="my-8 rounded-3xl border border-line bg-surface p-6">
      <h2 className="text-xl font-semibold text-ink">
        Vật phẩm của tôi
      </h2>

      {loading && (
        <p role="status" className="mt-3 text-sm text-muted">
          Đang tải vật phẩm…
        </p>
      )}

      {error && (
        <p role="alert" className="mt-3 text-sm text-danger">
          {error}
        </p>
      )}

      {!loading && !error && items.length === 0 && (
        <p className="mt-3 text-sm text-muted">
          Bạn chưa có vật phẩm.
        </p>
      )}

      <ul className="mt-4 space-y-4">
        {items.map((item) => (
          <li key={item.code}>
            <h3 className="font-semibold">{item.name}</h3>
            <p className="text-sm text-muted">
              {item.kind === "PERMANENT"
                ? "Đã sở hữu"
                : `Còn ${item.quantity} lượt`}
            </p>
            <p className="text-sm text-muted">
              {item.description}
            </p>
          </li>
        ))}
      </ul>

      <p className="mt-4 text-xs text-muted">
        Dùng lượt đèn trong trải nghiệm thả hoa đăng.
        Bình sen ngọc có thể bật hoặc tắt tại không gian thờ
        và bàn thờ gia tiên. Sau khi mua hoặc nhận quà, bấm
        tải lại kho để cập nhật.
      </p>

      <button
        type="button"
        disabled={loading}
        onClick={() => setReload((value) => value + 1)}
        className="mt-4 min-h-11 rounded-xl border border-line px-4 py-2 text-sm disabled:opacity-50"
      >
        Tải lại kho
      </button>
    </section>
  );
}
