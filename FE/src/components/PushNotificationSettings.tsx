import { useState } from "react";
import { enableDevicePush, disableDevicePush } from "../data/pushService";
export function PushNotificationSettings() {
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);
  const change = async (enabled: boolean) => {
    setBusy(true); setMessage("");
    try { if (enabled) await enableDevicePush(); else await disableDevicePush(); setMessage(enabled ? "Đã đăng ký thiết bị. Bật tùy chọn thông báo đẩy để nhận nhắc giỗ trước 3 ngày." : "Đã ngừng gửi thông báo đến thiết bị này."); }
    catch (e) { setMessage(e instanceof Error ? e.message : "Chưa thay đổi được thông báo."); }
    finally { setBusy(false); }
  };
  return <section className="my-5 rounded-xl border border-line p-4"><h3 className="font-semibold">Nhắc giỗ trên thiết bị này</h3><p className="my-2 text-sm">Đăng ký thiết bị để nhận thông báo khi ứng dụng đóng. Hệ thống nhắc trước 3 ngày theo ngày âm hoặc dương đã lưu.</p><div className="flex flex-wrap gap-3"><button type="button" disabled={busy} className="rounded-lg border border-line px-4 py-2" onClick={() => void change(true)}>Đăng ký nhận thông báo</button><button type="button" disabled={busy} className="rounded-lg border border-line px-4 py-2" onClick={() => void change(false)}>Ngừng nhận trên thiết bị</button></div>{message && <p role="status" className="mt-3 text-sm">{message}</p>}</section>;
}
