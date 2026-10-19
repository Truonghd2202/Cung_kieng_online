import { useEffect, useState } from "react";
import { apiRequest } from "../lib/api";

interface Gift {
  id: string;
  name: string;
  description: string;
  partner_name: string;
  purchase_url: string;
}

function readDestination(value: string): URL | null {
  try {
    const url = new URL(value);

    if (
      url.protocol !== "https:" ||
      url.username ||
      url.password ||
      url.port
    ) {
      return null;
    }

    return url;
  } catch {
    return null;
  }
}

export function PartnerGifts() {
  const [items, setItems] = useState<Gift[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [reload, setReload] = useState(0);

  useEffect(() => {
    let active = true;

    setLoading(true);
    setError("");
    setItems([]);

    void apiRequest<{ items: Gift[] }>("/partner-gifts")
      .then((result) => {
        if (active) setItems(result.items);
      })
      .catch((cause: unknown) => {
        if (active) {
          setError(
            cause instanceof Error
              ? cause.message
              : "Chưa tải được danh sách hộp quà."
          );
        }
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, [reload]);

  return (
    <section
      aria-labelledby="partner-gifts-title"
      className="my-8"
    >
      <h2
        id="partner-gifts-title"
        className="text-xl font-semibold"
      >
        Hộp quà văn hóa
      </h2>

      <p className="mt-2 text-sm text-muted">
        Khám phá sản phẩm từ các đối tác được giới thiệu.
        Bạn sẽ xem giá, đặt mua và thanh toán trên website
        đối tác.
      </p>

      {loading && (
        <p role="status" className="mt-4">
          Đang tải hộp quà…
        </p>
      )}

      {error && (
        <div className="mt-4">
          <p role="alert">{error}</p>
          <button
            type="button"
            disabled={loading}
            onClick={() => setReload((current) => current + 1)}
            className="mt-2 rounded-lg border px-4 py-2"
          >
            Thử lại
          </button>
        </div>
      )}

      {!loading && !error && items.length === 0 && (
        <p className="mt-4 text-sm text-muted">
          Hiện chưa có hộp quà được giới thiệu.
          Bạn có thể quay lại sau.
        </p>
      )}

      {!loading && !error && (
        <div className="mt-5 grid gap-4 md:grid-cols-2">
          {items.map((gift) => {
            const destination = readDestination(gift.purchase_url);

            // BE đã kiểm tra danh sách tên miền được phép.
            // FE kiểm tra thêm giao thức trước khi tạo liên kết.
            if (!destination) return null;

            return (
              <article
                key={gift.id}
                className="min-w-0 rounded-2xl border p-5"
              >
                <p className="text-sm text-muted">
                  Cung cấp bởi {gift.partner_name}
                </p>

                <h3 className="mt-2 text-lg font-semibold">
                  {gift.name}
                </h3>

                <p
                  className="mt-3 whitespace-pre-wrap text-sm"
                  style={{ overflowWrap: "anywhere" }}
                >
                  {gift.description}
                </p>

                <p className="mt-4 text-sm text-muted">
                  Giá, tình trạng hàng, giao nhận và đổi trả:
                  xem thông tin của đối tác trước khi đặt mua.
                </p>

                <a
                  href={destination.href}
                  target="_blank"
                  rel="noopener noreferrer sponsored"
                  referrerPolicy="no-referrer"
                  className="mt-4 inline-flex rounded-lg border px-4 py-2 font-medium"
                  aria-label={`Xem ${gift.name} tại ${gift.partner_name}, mở website đối tác trong tab mới`}
                >
                  Xem tại đối tác ↗
                </a>

                <p
                  className="mt-2 text-xs text-muted"
                  style={{ overflowWrap: "anywhere" }}
                >
                  Mở tab mới: {destination.hostname}
                </p>
              </article>
            );
          })}
        </div>
      )}
    </section>
  );
}
