import { useEffect, useState } from "react";
import { apiRequest } from "../lib/api";

interface Status {
  price: number;
  checkoutAvailable: boolean;
  subscription: { id: string; expires_at: string } | null;
}
export function MembershipCheckout({ email, onLogin }: { email?: string; onLogin: () => void }) {
  const [status, setStatus] = useState<Status | null>(null);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");
  const refresh = async () => {
    try {
      setStatus(await apiRequest<Status>("/membership/status"));
      const orderId = new URLSearchParams(location.search).get("vnp_TxnRef");
      if (email && orderId) {
        const order = await apiRequest<{ status: string }>(`/membership/orders/${encodeURIComponent(orderId)}`);
        setMessage(order.status === "PAID" ? "Thanh toán đã được xác nhận." : order.status === "FAILED" ? "Thanh toán chưa thành công. Bạn có thể thử lại." : "Đang chờ VNPay xác nhận. Hãy kiểm tra lại trạng thái trước khi tạo giao dịch mới.");
      }
    } catch (error) { setMessage(error instanceof Error ? error.message : "Chưa tải được hội viên."); }
  };
  useEffect(() => { void refresh(); }, [email]);
  const checkout = async () => {
    if (!email) { onLogin(); return; }
    setBusy(true); setMessage("");
    try {
      const order = await apiRequest<{ paymentUrl: string }>("/membership/checkout", { method: "POST" });
      window.location.assign(order.paymentUrl);
    } catch (error) { setMessage(error instanceof Error ? error.message : "Chưa tạo được giao dịch."); setBusy(false); }
  };
  return <section className="my-8 rounded-3xl border border-line bg-surface p-6" aria-labelledby="membership-checkout-title">
    <h2 id="membership-checkout-title" className="text-xl font-semibold">Hội viên Tâm An · 29.000đ/tháng</h2>
    <p className="my-3 text-sm">Thanh toán qua VNPay. Gói được gia hạn thủ công, không tự động trừ tiền.</p>
    {status?.subscription && <p className="my-3">Đang hoạt động đến {new Date(status.subscription.expires_at).toLocaleDateString("vi-VN")}. Gia hạn sẽ cộng thêm một tháng vào thời hạn hiện tại.</p>}
    {status && !status.checkoutAvailable && <p className="my-3">Cổng thanh toán đang được chuẩn bị. Chưa thể đăng ký trả phí.</p>}
    <div className="flex flex-wrap gap-3">
      <button type="button" className="rounded-xl bg-accent px-5 py-3 text-white disabled:opacity-50" disabled={busy || !status?.checkoutAvailable} onClick={() => void checkout()}>{busy ? "Đang chuyển đến VNPay…" : !email ? "Đăng nhập để đăng ký" : status?.subscription ? "Gia hạn qua VNPay" : "Đăng ký qua VNPay"}</button>
      <button type="button" className="rounded-xl border border-line px-4 py-3" onClick={() => void refresh()}>Kiểm tra trạng thái</button>
    </div>
    {message && <p role="status" className="mt-3">{message}</p>}
  </section>;
}
