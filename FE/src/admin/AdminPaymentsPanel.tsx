import { useEffect, useRef, useState } from "react";
import { apiRequest } from "../lib/api";

interface PaymentRow {
  id: string;
  amount: number;
  status: string;
  payment_provider: string;
  payment_environment: string;
  transaction_no: string | null;
  created_at: string;
  expires_at: string;
  paid_at: string | null;
  users: { email: string };
  membership_plans?: { code: string; name: string };
  item_code?: string;
  quantity?: number;
  payment_review_status?: "NONE" | "OPEN" | "RESOLVED";
  payment_review_note?: string | null;
}

interface PaymentPage {
  items: PaymentRow[];
  total: number;
  page: number;
  pageSize: number;
}

const statusLabels: Record<string, string> = {
  PENDING: "Chờ xác nhận",
  PAID: "Đã thanh toán",
  FAILED: "Không thành công",
  CANCELLED: "Đã hủy",
  ABANDONED: "Đã bỏ yêu cầu",
  EXPIRED: "Hết hạn mở thanh toán",
};

function dateLabel(value: string | null) {
  return value
    ? new Date(value).toLocaleString("vi-VN")
    : "—";
}

export function AdminPaymentsPanel() {
  const [kind, setKind] = useState("membership");
  const [status, setStatus] = useState("ALL");
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [reload, setReload] = useState(0);
  const [data, setData] = useState<PaymentPage | null>(null);
  const [loading, setLoading] = useState(true);
  const [busyId, setBusyId] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [resolutionNotes, setResolutionNotes] =
    useState<Record<string, string>>({});

  const versionRef = useRef(0);
  const lockRef = useRef(false);

  useEffect(() => {
    const version = ++versionRef.current;
    setLoading(true);
    setError("");
    setData(null);

    const params = new URLSearchParams({
      kind,
      status,
      q: query,
      page: String(page),
    });

    void apiRequest<PaymentPage>(
      `/admin/payments?${params}`
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
              : "Chưa tải được đơn thanh toán."
          );
        }
      })
      .finally(() => {
        if (version === versionRef.current) {
          setLoading(false);
        }
      });

    return () => {
      versionRef.current += 1;
    };
  }, [kind, status, query, page, reload]);

  const reconcile = async (id: string) => {
    if (lockRef.current) return;

    lockRef.current = true;
    setBusyId(id);
    setError("");
    setMessage("");

    const version = versionRef.current;

    try {
      const result = await apiRequest<{
        status: string;
        reconciliation?: string;
      }>(
        `/admin/payments/${encodeURIComponent(id)}/reconcile`,
        { method: "POST" }
      );

      if (version !== versionRef.current) return;

      setMessage(
        result.status === "PAID"
          ? `Đơn ${id}: đã xác nhận thanh toán.`
          : `Đơn ${id}: ${
              statusLabels[result.status] ?? result.status
            }. Kết quả đối soát: ${
              result.reconciliation ?? "không thay đổi"
            }.`
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

  const resolveReview = async (id: string) => {
    if (lockRef.current) return;

    const note = (resolutionNotes[id] ?? "").trim();

    if (note.length < 20) {
      setError("Ghi rõ kết quả xử lý, ít nhất 20 ký tự.");
      return;
    }

    lockRef.current = true;
    setBusyId(id);
    setError("");
    setMessage("");

    const version = versionRef.current;

    try {
      await apiRequest(
        `/admin/payments/${encodeURIComponent(id)}/review-resolution`,
        {
          method: "PATCH",
          body: JSON.stringify({ note }),
        }
      );

      if (version !== versionRef.current) return;

      setMessage("Đã ghi nhận xử lý cảnh báo.");
      setReload((value) => value + 1);
    } catch (cause) {
      if (version === versionRef.current) {
        setError(
          cause instanceof Error
            ? cause.message
            : "Chưa lưu được kết quả xử lý."
        );
      }
    } finally {
      lockRef.current = false;
      setBusyId("");
    }
  };

  const disabled = loading || Boolean(busyId);
  const controlClass =
    "min-h-11 rounded-lg border border-line bg-surface px-3 py-2 text-ink disabled:opacity-50";

  return (
    <section className="rounded-2xl border border-line bg-surface p-4 text-ink">
      <h2 className="text-lg font-semibold">
        Đơn thanh toán
      </h2>

      <p className="mt-2 text-sm text-muted">
        Đối soát lấy kết quả từ SePay. Đơn sandbox là giao
        dịch thử, không phải doanh thu thật.
      </p>

      <form
        className="mt-4 flex flex-wrap gap-3"
        onSubmit={(event) => {
          event.preventDefault();
          if (disabled) return;
          setPage(1);
          setQuery(search.trim());
          setReload((value) => value + 1);
          setMessage("");
        }}
      >
        <select
          aria-label="Loại đơn"
          className={controlClass}
          value={kind}
          disabled={disabled}
          onChange={(event) => {
            setKind(event.target.value);
            setPage(1);
            setMessage("");
          }}
        >
          <option value="membership">Hội viên</option>
          <option value="digital">Vật phẩm</option>
        </select>

        <select
          aria-label="Trạng thái đơn"
          className={controlClass}
          value={status}
          disabled={disabled}
          onChange={(event) => {
            setStatus(event.target.value);
            setPage(1);
            setMessage("");
          }}
        >
          <option value="ALL">Tất cả trạng thái</option>
          <option value="PENDING">Chờ xác nhận</option>
          <option value="PAID">Đã thanh toán</option>
          <option value="FAILED">Không thành công</option>
          <option value="CANCELLED">Đã hủy</option>
          <option value="ABANDONED">Đã bỏ yêu cầu</option>
          <option value="EXPIRED">Hết hạn mở thanh toán</option>
        </select>

        <input
          aria-label="Tìm mã đơn hoặc email"
          className={controlClass}
          placeholder="Mã đơn hoặc email"
          maxLength={200}
          value={search}
          disabled={disabled}
          onChange={(event) => setSearch(event.target.value)}
        />

        <button
          type="submit"
          className={controlClass}
          disabled={disabled}
        >
          Tìm / tải lại
        </button>
      </form>

      {loading && (
        <p role="status" className="mt-4">
          Đang tải đơn…
        </p>
      )}

      {error && (
        <p role="alert" className="mt-4 text-danger">
          {error}
        </p>
      )}

      {message && (
        <p role="status" className="mt-4">
          {message}
        </p>
      )}

      {data && (
        <>
          <p className="mt-4 text-sm">
            {data.total} đơn · Trang {data.page}
          </p>

          {!data.items.length && (
            <p className="mt-3">Không có đơn phù hợp.</p>
          )}

          <div className="mt-4 space-y-3">
            {data.items.map((row) => (
              <article
                key={row.id}
                className="rounded-xl border border-line p-4"
              >
                <p className="break-all font-semibold">
                  {row.id}
                </p>

                <p className="mt-1 break-all text-sm">
                  {row.users.email}
                </p>

                <p className="mt-2 text-sm">
                  {row.membership_plans?.name ??
                    `${row.item_code} × ${row.quantity}`}
                  {" · "}
                  {row.amount.toLocaleString("vi-VN")}đ
                </p>

                <p className="mt-2 text-sm">
                  {statusLabels[row.status] ?? row.status}
                  {" · "}
                  {row.payment_provider}
                  {" · "}
                  {row.payment_environment}
                </p>

                {row.payment_review_status === "OPEN" && (
                  <div className="mt-3 rounded-xl border border-amber-500 p-3">
                    <p className="font-semibold">
                      Cần xử lý thanh toán thừa
                    </p>

                    <p className="mt-2 text-sm">
                      {row.payment_review_note}
                    </p>

                    <label className="mt-3 block text-sm">
                      Kết quả xử lý thực tế
                      <textarea
                        className="mt-2 block w-full rounded-lg border border-line bg-surface p-3 text-ink"
                        value={resolutionNotes[row.id] ?? ""}
                        maxLength={1500}
                        disabled={disabled}
                        onChange={(event) =>
                          setResolutionNotes((current) => ({
                            ...current,
                            [row.id]: event.target.value,
                          }))
                        }
                      />
                    </label>

                    <p className="mt-2 text-xs text-muted">
                      Chỉ ghi nhận sau khi đã đối chiếu và xử lý thực tế.
                      Nút này không chuyển tiền hoặc thực hiện hoàn tiền.
                      Không nhập mật khẩu, OTP hoặc thông tin thẻ.
                    </p>

                    <button
                      type="button"
                      className={`${controlClass} mt-3`}
                      disabled={disabled}
                      onClick={() => void resolveReview(row.id)}
                    >
                      Ghi nhận đã xử lý
                    </button>
                  </div>
                )}

                {row.payment_review_status === "RESOLVED" && (
                  <p className="mt-3 text-sm">
                    Cảnh báo đã được xử lý: {row.payment_review_note}
                  </p>
                )}

                <details className="mt-3 text-sm">
                  <summary className="cursor-pointer">
                    Chi tiết giao dịch
                  </summary>

                  <div className="mt-2 space-y-1 break-all">
                    <p>Tạo: {dateLabel(row.created_at)}</p>
                    <p>
                      Hạn mở thanh toán: {dateLabel(row.expires_at)}
                    </p>
                    <p>
                      Xác nhận thanh toán: {dateLabel(row.paid_at)}
                    </p>
                    <p>
                      Mã giao dịch: {row.transaction_no ?? "—"}
                    </p>
                  </div>
                </details>

                {row.payment_provider === "SEPAY" &&
                  ["PENDING", "CANCELLED", "EXPIRED"].includes(row.status) && (
                    <button
                      type="button"
                      className={`${controlClass} mt-3`}
                      disabled={disabled}
                      onClick={() => void reconcile(row.id)}
                    >
                      {busyId === row.id
                         ? "Đang đối soát…"
                         : "Đối soát với SePay"}
                    </button>
                  )}
              </article>
            ))}
          </div>

          <div className="mt-4 flex gap-3">
            <button
              type="button"
              className={controlClass}
              disabled={disabled || page <= 1}
              onClick={() => setPage((value) => value - 1)}
            >
              Trang trước
            </button>

            <button
              type="button"
              className={controlClass}
              disabled={
                disabled ||
                page * data.pageSize >= data.total
              }
              onClick={() => setPage((value) => value + 1)}
            >
              Trang sau
            </button>
          </div>
        </>
      )}
    </section>
  );
}
