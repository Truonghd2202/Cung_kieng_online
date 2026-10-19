import { useState } from "react";
import { enableDevicePush, disableDevicePush } from "../data/pushService";
export function PushNotificationSettings() {
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);
  const change = async (enabled: boolean) => {
    if (busy) return;

    setBusy(true);
    setMessage("");

    try {
      if (enabled) {
        await enableDevicePush();

        setMessage(
          "Máy chủ đã ghi nhận đăng ký thiết bị. Bạn cần bật tùy chọn Thông báo đẩy của tài khoản để nhận nhắc lịch. Việc hiển thị còn phụ thuộc quyền thông báo và cài đặt của thiết bị."
        );
      } else {
        await disableDevicePush();

        setMessage(
          "Đã hoàn tất thao tác ngừng nhận thông báo trên trình duyệt này cho tài khoản hiện tại."
        );
      }
    } catch (error) {
      setMessage(
        error instanceof Error
          ? error.message
          : "Chưa hoàn tất thay đổi thông báo. Bạn hãy kiểm tra kết nối rồi thử lại."
      );
    } finally {
      setBusy(false);
    }
  };
  return (
    <section className="my-5 rounded-xl border border-line p-4">
      <h3 className="font-semibold">Nhắc giỗ trên thiết bị này</h3>
      <p className="my-2 text-sm">
        Đăng ký trình duyệt này và bật Thông báo đẩy của tài khoản
        để nhận nhắc trước 3 ngày theo lịch đã lưu.
        Thông báo có thể đến khi trang web không mở; thời điểm hiển thị
        phụ thuộc kết nối và cài đặt của thiết bị.
      </p>
      <div className="flex flex-wrap gap-3">
        <button
          type="button"
          disabled={busy}
          className="rounded-lg border border-line px-4 py-2"
          onClick={() => void change(true)}
        >
          Đăng ký nhận thông báo
        </button>
        <button
          type="button"
          disabled={busy}
          className="rounded-lg border border-line px-4 py-2"
          onClick={() => void change(false)}
        >
          Ngừng nhận trên thiết bị
        </button>
      </div>
      {message && <p role="status" className="mt-3 text-sm">{message}</p>}
    </section>
  );
}
