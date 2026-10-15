import { useEffect, useRef, useState } from "react";
import { apiRequest } from "../lib/api";

interface Status {
  price: number;
  currency: string;
  salesEnabled: boolean;
  checkoutAvailable: boolean;
  subscription: {
    id: string;
    expires_at: string;
  } | null;
}

interface MembershipCheckoutProps {
  email?: string;
  onLogin: () => void;
}

export function MembershipCheckout({
  email,
  onLogin,
}: MembershipCheckoutProps) {
  const [status, setStatus] = useState<Status | null>(null);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [pendingOrder, setPendingOrder] = useState(false);

  const requestVersion = useRef(0);
  const checkoutLock = useRef(false);

  const refresh = async () => {
    const version = ++requestVersion.current;

    setLoading(true);
    setError("");
    setMessage("");

    try {
      let nextStatus = await apiRequest<Status>(
        "/membership/status",
      );

      const orderId = new URLSearchParams(
        window.location.search,
      ).get("vnp_TxnRef");

      let nextMessage = "";
      let waitingForOrder = false;

      if (email && orderId) {
        const order = await apiRequest<{
          status: string;
        }>(
          `/membership/orders/${encodeURIComponent(orderId)}`,
        );

        if (order.status === "PAID") {
          nextMessage = "Thanh toán đã được xác nhận.";

          nextStatus = await apiRequest<Status>(
            "/membership/status",
          );
        } else if (order.status === "FAILED") {
          nextMessage =
            "Thanh toán chưa thành công. Bạn chưa được cấp hội viên từ giao dịch này.";
        } else {
          waitingForOrder = true;

          nextMessage =
            "Giao dịch đang chờ xác nhận. Hãy kiểm tra lại trạng thái trước khi tạo giao dịch mới.";
        }
      }

      if (version !== requestVersion.current) return;

      setStatus(nextStatus);
      setPendingOrder(waitingForOrder);
      setMessage(nextMessage);
    } catch {
      if (version !== requestVersion.current) return;

      setStatus(null);

      setError(
        "Chưa kiểm tra được trạng thái hội viên. Bạn hãy kiểm tra kết nối rồi thử lại.",
      );
    } finally {
      if (version === requestVersion.current) {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    setStatus(null);
    setPendingOrder(false);

    void refresh();

    return () => {
      requestVersion.current += 1;
    };
  }, [email]);

  const checkout = async () => {
    if (
      checkoutLock.current ||
      loading ||
      !status?.checkoutAvailable ||
      pendingOrder
    ) {
      return;
    }

    if (!email) {
      onLogin();
      return;
    }

    checkoutLock.current = true;
    setBusy(true);
    setError("");

    try {
      const order = await apiRequest<{
        paymentUrl: string;
      }>("/membership/checkout", {
        method: "POST",
      });

      const paymentUrl = new URL(order.paymentUrl);

      if (paymentUrl.protocol !== "https:") {
        throw new Error("Invalid payment URL");
      }

      window.location.assign(paymentUrl.href);
    } catch {
      checkoutLock.current = false;
      setBusy(false);

      setError(
        "Chưa mở được thanh toán. Bạn chưa được xác nhận mua hội viên. Hãy kiểm tra trạng thái rồi thử lại.",
      );
    }
  };

  const formattedPrice = status
    ? new Intl.NumberFormat("vi-VN").format(status.price)
    : "";

  return (
    <section
      className="my-8 rounded-3xl border border-line bg-surface p-6"
      aria-labelledby="membership-checkout-title"
    >
      <h2
        id="membership-checkout-title"
        className="text-xl font-semibold text-ink"
      >
        Trạng thái hội viên Tâm An
      </h2>

      {loading && (
        <p role="status" className="mt-3 text-sm text-muted">
          Đang kiểm tra trạng thái hội viên…
        </p>
      )}

      {!loading && status && (
        <>
          {status.subscription && (
            <p className="mt-3 text-sm text-ink">
              Hội viên đang hoạt động đến{" "}
              {new Date(
                status.subscription.expires_at,
              ).toLocaleDateString("vi-VN")}
              .
            </p>
          )}

          {!status.checkoutAvailable && (
            <p className="mt-3 text-sm text-muted">
              {status.salesEnabled
                ? "Đăng ký và gia hạn đang tạm thời không khả dụng."
                : "Gói hội viên chưa mở bán. Bạn vẫn có thể sử dụng các tính năng miễn phí hiện có."}
            </p>
          )}

          {status.checkoutAvailable && (
            <>
              <p className="mt-3 text-sm text-ink">
                {formattedPrice}đ/tháng. Gia hạn thủ công,
                không tự động trừ tiền.
              </p>

              <button
                type="button"
                disabled={busy || pendingOrder}
                onClick={() => void checkout()}
                className="mt-4 rounded-xl bg-accent px-5 py-3 text-white disabled:opacity-50"
              >
                {busy
                  ? "Đang mở thanh toán…"
                  : pendingOrder
                    ? "Đang chờ xác nhận giao dịch"
                    : !email
                      ? "Đăng nhập để tiếp tục"
                      : status.subscription
                        ? "Gia hạn qua VNPay"
                        : "Đăng ký qua VNPay"}
              </button>
            </>
          )}
        </>
      )}

      {message && (
        <p role="status" className="mt-3 text-sm text-muted">
          {message}
        </p>
      )}

      {error && (
        <p role="alert" className="mt-3 text-sm text-danger">
          {error}
        </p>
      )}

      <button
        type="button"
        disabled={loading || busy}
        onClick={() => void refresh()}
        className="mt-4 rounded-xl border border-line px-4 py-3 text-sm disabled:opacity-50"
      >
        {loading ? "Đang kiểm tra…" : "Kiểm tra lại trạng thái"}
      </button>
    </section>
  );
}
