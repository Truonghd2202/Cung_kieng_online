import { useEffect, useRef, useState } from "react";
import { apiRequest } from "../lib/api";

type AlertStatus = "OPEN" | "RESOLVED";

interface PaymentAlert {
  id: string;
  order_id: string;
  environment: string;
  event_type: string;
  transaction_id: string;
  status: AlertStatus;
  resolution_note: string | null;
  created_at: string;
  resolved_at: string | null;
}

interface AlertPage {
  items: PaymentAlert[];
  total: number;
  page: number;
  pageSize: number;
}

function formatDate(value: string | null) {
  return value ? new Date(value).toLocaleString("vi-VN") : "—";
}

export function AdminPaymentAlertsPanel() {
  const [status, setStatus] = useState<AlertStatus>("OPEN");
  const [page, setPage] = useState(1);
  const [reload, setReload] = useState(0);
  const [data, setData] = useState<AlertPage | null>(null);
  const [loading, setLoading] = useState(true);
  const [busyId, setBusyId] = useState("");
  const [notes, setNotes] = useState<Record<string, string>>({});
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const versionRef = useRef(0);
  const lockRef = useRef(false);

  useEffect(() => {
    const version = ++versionRef.current;

    setLoading(true);
    setData(null);
    setError("");

    const params = new URLSearchParams({
      status,
      page: String(page),
    });

    void apiRequest<AlertPage>(
      `/admin/payments/alerts?${params.toString()}`
    )
      .then((result) => {
        if (version === versionRef.current) {
          setData(result);
        }
      })
      .catch((cause: unknown) => {
        if (version === versionRef.current) {
          setError(
            cause instanceof Error
              ? cause.message
              : "Không tải được cảnh báo thanh toán."
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
  }, [status, page, reload]);

  async function resolveAlert(alert: PaymentAlert) {
    if (
      lockRef.current ||
      loading ||
      alert.status !== "OPEN"
    ) {
      return;
    }

    const note = (notes[alert.id] ?? "").trim();

    if (note.length < 20 || note.length > 2000) {
      setError("Ghi kết quả xử lý từ 20 đến 2.000 ký tự.");
      return;
    }

    lockRef.current = true;
    setBusyId(alert.id);
    setError("");
    setMessage("");

    const version = versionRef.current;

    try {
      await apiRequest(
        `/admin/payments/alerts/${encodeURIComponent(alert.id)}/resolve`,
        {
          method: "PATCH",
          body: JSON.stringify({ note }),
        }
      );

      if (version !== versionRef.current) return;

      setNotes((current) => {
        const next = { ...current };
        delete next[alert.id];
        return next;
      });

      setMessage("Đã lưu kết quả và đóng cảnh báo.");
      setReload((current) => current + 1);
    } catch (cause: unknown) {
      if (version === versionRef.current) {
        setError(
          cause instanceof Error
            ? cause.message
            : "Không lưu được kết quả xử lý."
        );
      }
    } finally {
      lockRef.current = false;

      if (version === versionRef.current) {
        setBusyId("");
      }
    }
  }

  const disabled = loading || busyId !== "";
  const totalPages = data
    ? Math.max(1, Math.ceil(data.total / data.pageSize))
    : 1;

  return (
    <section aria-label="Cảnh báo thanh toán">
      <h2>Cảnh báo thanh toán</h2>

      <p>
        Kiểm tra giao dịch trên SePay và đối chiếu đơn hàng trước
        khi ghi kết quả. Đóng cảnh báo chỉ lưu kết quả xử lý,
        không hoàn tiền hoặc điều chỉnh quyền hội viên, vật phẩm.
      </p>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 12,
          alignItems: "center",
          marginBottom: 16,
        }}
      >
        <label>
          Trạng thái{" "}
          <select
            value={status}
            disabled={disabled}
            onChange={(event) => {
              setStatus(event.target.value as AlertStatus);
              setPage(1);
              setMessage("");
            }}
          >
            <option value="OPEN">Cần xử lý</option>
            <option value="RESOLVED">Đã xử lý</option>
          </select>
        </label>

        <button
          type="button"
          disabled={disabled}
          onClick={() => setReload((current) => current + 1)}
        >
          Làm mới
        </button>

        {data && <span>{data.total} cảnh báo</span>}
      </div>

      {error && <p role="alert">{error}</p>}
      {message && <p role="status">{message}</p>}
      {loading && <p role="status">Đang tải cảnh báo…</p>}

      {!loading && data?.items.length === 0 && (
        <p>
          {status === "OPEN"
            ? "Không có cảnh báo cần xử lý."
            : "Chưa có cảnh báo đã xử lý."}
        </p>
      )}

      {!loading &&
        data?.items.map((alert) => {
          const note = notes[alert.id] ?? "";
          const validNote =
            note.trim().length >= 20 &&
            note.trim().length <= 2000;

          return (
            <article
              key={alert.id}
              style={{
                border: "1px solid #d6d3d1",
                borderRadius: 12,
                padding: 16,
                marginBottom: 16,
                overflowWrap: "anywhere",
              }}
            >
              <h3>
                {alert.event_type === "TRANSACTION_VOID"
                  ? "SePay báo giao dịch bị hủy — cần đối chiếu"
                  : alert.event_type === "MULTIPLE_APPROVED_PAYMENTS"
                    ? "Một đơn có nhiều giao dịch thành công — cần đối chiếu"
                    : alert.event_type}
              </h3>

              <dl>
                <dt>Mã đơn hàng</dt>
                <dd>{alert.order_id}</dd>

                <dt>Mã giao dịch SePay</dt>
                <dd>{alert.transaction_id}</dd>

                <dt>Môi trường</dt>
                <dd>
                  {alert.environment === "sandbox"
                    ? "Sandbox — thử nghiệm"
                    : alert.environment === "production"
                      ? "Production — giao dịch thật"
                      : alert.environment}
                </dd>

                <dt>Thời điểm nhận cảnh báo</dt>
                <dd>{formatDate(alert.created_at)}</dd>

                <dt>Trạng thái</dt>
                <dd>
                  {alert.status === "OPEN"
                    ? "Cần xử lý"
                    : "Đã xử lý"}
                </dd>
              </dl>

              {alert.status === "OPEN" ? (
                <form
                  onSubmit={(event) => {
                    event.preventDefault();
                    void resolveAlert(alert);
                  }}
                >
                  <label
                    htmlFor={`payment-alert-note-${alert.id}`}
                  >
                    Kết quả đối chiếu và xử lý
                  </label>

                  <textarea
                    id={`payment-alert-note-${alert.id}`}
                    value={note}
                    minLength={20}
                    maxLength={2000}
                    required
                    rows={4}
                    disabled={disabled}
                    placeholder="Ghi kết quả đã xác minh, hành động đã thực hiện và mã tham chiếu nếu có. Không nhập thông tin thẻ hoặc khóa bí mật."
                    onChange={(event) => {
                      const value = event.target.value;
                      setNotes((current) => ({
                        ...current,
                        [alert.id]: value,
                      }));
                    }}
                    style={{
                      display: "block",
                      width: "100%",
                      boxSizing: "border-box",
                      marginTop: 8,
                    }}
                  />

                  <p>{note.trim().length}/2.000 ký tự</p>

                  <button
                    type="submit"
                    disabled={disabled || !validNote}
                  >
                    {busyId === alert.id
                      ? "Đang lưu…"
                      : "Lưu kết quả và đóng cảnh báo"}
                  </button>
                </form>
              ) : (
                <>
                  <p>
                    <strong>Kết quả xử lý:</strong>
                  </p>
                  <p style={{ whiteSpace: "pre-wrap" }}>
                    {alert.resolution_note || "—"}
                  </p>
                  <p>
                    Đã đóng: {formatDate(alert.resolved_at)}
                  </p>
                </>
              )}
            </article>
          );
        })}

      {!loading && data && data.total > 0 && (
        <nav
          aria-label="Phân trang cảnh báo thanh toán"
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            gap: 12,
          }}
        >
          <button
            type="button"
            disabled={disabled || page <= 1}
            onClick={() => setPage((current) => current - 1)}
          >
            Trang trước
          </button>

          <span>
            Trang {page}/{totalPages}
          </span>

          <button
            type="button"
            disabled={disabled || page >= totalPages}
            onClick={() => setPage((current) => current + 1)}
          >
            Trang sau
          </button>
        </nav>
      )}
    </section>
  );
}
