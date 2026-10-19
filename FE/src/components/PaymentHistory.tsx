import { useEffect, useRef, useState } from "react";
import { apiRequest } from "../lib/api";

interface Entry {
  id: string;
  name: string;
  amount: number;
  status: string;
  paymentProvider: string;
  paymentEnvironment: string;
  createdAt: string;
  paidAt: string | null;
  paymentWindowExpired: boolean;
  paymentReviewStatus: string;
}

interface HistoryPage {
  items: Entry[];
  total: number;
  page: number;
  pageSize: number;
}

const labels: Record<string, string> = {
  PENDING: "Chờ xác nhận",
  PAID: "Đã thanh toán",
  FAILED: "Không thành công",
  CANCELLED: "SePay xác nhận đã hủy",
  ABANDONED: "Đã bỏ yêu cầu trước khi mở thanh toán",
  EXPIRED: "Đã đóng thời hạn mở thanh toán",
};

export function PaymentHistory({ email }: { email?: string }) {
  const [kind, setKind] = useState("membership");
  const [page, setPage] = useState(1);
  const [data, setData] = useState<HistoryPage | null>(null);
  const [loading, setLoading] = useState(false);
  const [busyId, setBusyId] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [reload, setReload] = useState(0);

  const versionRef = useRef(0);
  const lockRef = useRef(false);

  useEffect(() => {
    const version = ++versionRef.current;

    setData(null);
    setError("");
    setLoading(Boolean(email));

    if (email) {
      const params = new URLSearchParams({
        kind,
        page: String(page),
      });

      void apiRequest<HistoryPage>(
        `/payments/orders?${params}`
      )
        .then((result) => {
          if (version === versionRef.current) {
            setData(result);
          }
        })
        .catch((cause) => {
          if (version === versionRef.current) {
            setError(
              cause instanceof Error
                ? cause.message
                : "Chưa tải được lịch sử đơn."
            );
          }
        })
        .finally(() => {
          if (version === versionRef.current) {
            setLoading(false);
          }
        });
    }

    return () => {
      versionRef.current += 1;
    };
  }, [email, kind, page, reload]);

  const reconcile = async (id: string) => {
    if (!email || lockRef.current || loading) return;

    const version = versionRef.current;
    lockRef.current = true;
    setBusyId(id);
    setMessage("");
    setError("");

    try {
      const result = await apiRequest<{
        status: string;
        reconciliation?: string;
        payment_review_status?: string;
      }>(
        `/payments/sepay/orders/${encodeURIComponent(id)}/reconcile`,
        { method: "POST" }
      );

      if (version !== versionRef.current) return;

      const detail =
        result.payment_review_status === "OPEN"
          ? " Khoản thanh toán cần nhóm hỗ trợ xử lý."
          : result.reconciliation === "NOT_FOUND_ON_PROVIDER"
            ? " Chưa tìm thấy đơn trên SePay."
            : "";

      setMessage(
        `Đơn ${id}: ${
          labels[result.status] ?? result.status
        }.${detail}`
      );

      setReload((value) => value + 1);
    } catch (cause) {
      if (version === versionRef.current) {
        setError(
          cause instanceof Error
            ? cause.message
            : "Chưa đối soát được đơn."
        );
      }
    } finally {
      lockRef.current = false;
      setBusyId("");
    }
  };

  const disabled = loading || Boolean(busyId);
  const buttonClass =
    "min-h-11 rounded-lg border border-line px-4 py-2 text-sm disabled:opacity-50";

  return (
    <section className="my-8 rounded-3xl border border-line bg-surface p-6">
      <h2 className="text-xl font-semibold">
        Lịch sử đơn thanh toán
      </h2>

      {!email ? (
        <p className="mt-3 text-sm text-muted">
          Đăng nhập để xem đơn của tài khoản.
        </p>
      ) : (
        <>
          <div className="mt-4 flex flex-wrap gap-3">
            <label className="text-sm">
              Loại đơn
              <select
                value={kind}
                disabled={disabled}
                onChange={(event) => {
                  setKind(event.target.value);
                  setPage(1);
                  setMessage("");
                }}
                className="ml-2 min-h-11 rounded-lg border border-line bg-surface p-2 text-ink"
              >
                <option value="membership">Hội viên</option>
                <option value="digital">Vật phẩm</option>
              </select>
            </label>

            <button
              type="button"
              className={buttonClass}
              disabled={disabled}
              onClick={() => setReload((value) => value + 1)}
            >
              Tải lại lịch sử
            </button>
          </div>

          {loading && (
            <p role="status" className="mt-3">
              Đang tải lịch sử đơn…
            </p>
          )}

          {error && (
            <p role="alert" className="mt-3 text-danger">
              {error}
            </p>
          )}

          {message && (
            <p role="status" className="mt-3 text-sm">
              {message}
            </p>
          )}

          {data && (
            <>
              <p className="mt-4 text-sm text-muted">
                {data.total} đơn · Trang {data.page}
              </p>

              {!data.items.length && (
                <p className="mt-3 text-sm">
                  Chưa có đơn trong nhóm này.
                </p>
              )}

              <ul className="mt-4 space-y-3">
                {data.items.map((entry) => (
                  <li
                    key={entry.id}
                    className="rounded-xl border border-line p-4"
                  >
                    <h3 className="font-semibold">
                      {entry.name}
                    </h3>

                    <p className="mt-1 break-all text-xs text-muted">
                      Mã đơn: {entry.id}
                    </p>

                    <p className="mt-2 text-sm">
                      {entry.amount.toLocaleString("vi-VN")}đ
                      {" · "}
                      {labels[entry.status] ?? entry.status}
                    </p>

                    <p className="mt-1 text-xs text-muted">
                      Tạo lúc{" "}
                      {new Date(entry.createdAt).toLocaleString("vi-VN")}
                    </p>

                    {entry.paymentEnvironment === "sandbox" && (
                      <p className="mt-2 text-sm">
                        Đơn thử nghiệm, không phải thanh toán thật.
                      </p>
                    )}

                    {entry.paymentReviewStatus === "OPEN" && (
                      <p className="mt-2 text-sm text-danger">
                        Khoản thanh toán cần được hỗ trợ.
                        Hãy cung cấp mã đơn khi liên hệ.
                      </p>
                    )}

                    {entry.paymentProvider === "SEPAY" &&
                      ["PENDING", "CANCELLED", "EXPIRED"].includes(
                        entry.status
                      ) && (
                        <button
                          type="button"
                          disabled={disabled}
                          className={`${buttonClass} mt-3`}
                          onClick={() => void reconcile(entry.id)}
                        >
                          {busyId === entry.id
                            ? "Đang kiểm tra…"
                            : "Kiểm tra với SePay"}
                        </button>
                      )}
                  </li>
                ))}
              </ul>

              <div className="mt-4 flex gap-3">
                <button
                  type="button"
                  className={buttonClass}
                  disabled={disabled || page <= 1}
                  onClick={() => setPage((value) => value - 1)}
                >
                  Trang trước
                </button>

                <button
                  type="button"
                  className={buttonClass}
                  disabled={
                    disabled ||
                    page * data.pageSize >= data.total
                  }
                  onClick={() => setPage((value) => value + 1)}
                >
                  Trang sau
                </button>
              </div>

              <p className="mt-4 text-xs text-muted">
                Sau khi đơn được xác nhận, bấm kiểm tra lại
                trạng thái hội viên hoặc tải lại kho vật phẩm
                ở các mục phía trên.
              </p>
            </>
          )}
        </>
      )}
    </section>
  );
}
