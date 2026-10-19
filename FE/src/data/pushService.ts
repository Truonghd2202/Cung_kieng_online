import { apiRequest } from "../lib/api";
export async function enableDevicePush() {
  if (!("serviceWorker" in navigator) || !("PushManager" in window) || !("Notification" in window)) throw new Error("Trình duyệt chưa hỗ trợ Web Push. Trên iPhone, hãy thêm ứng dụng vào màn hình chính trước.");
  if (await Notification.requestPermission() !== "granted") throw new Error("Bạn chưa cấp quyền thông báo cho thiết bị này.");
  const { publicKey } = await apiRequest<{ publicKey: string | null }>("/push/key");
  if (!publicKey) throw new Error("Máy chủ chưa cấu hình thông báo đẩy.");
  await navigator.serviceWorker.register("/service-worker.js");
  const registration = await navigator.serviceWorker.ready;
  const padded = publicKey.replace(/-/g, "+").replace(/_/g, "/").padEnd(Math.ceil(publicKey.length / 4) * 4, "=");
  const applicationServerKey = Uint8Array.from(atob(padded), (character) => character.charCodeAt(0));
  const existing = await registration.pushManager.getSubscription();
  const subscription = existing ?? await registration.pushManager.subscribe({ userVisibleOnly: true, applicationServerKey });
  await apiRequest("/push/subscriptions", { method: "POST", body: JSON.stringify(subscription.toJSON()) });
}
export async function disableDevicePush() {
  if (
    !("serviceWorker" in navigator) ||
    !("PushManager" in window)
  ) {
    return;
  }

  const registration =
    await navigator.serviceWorker.getRegistration("/");

  const subscription =
    await registration?.pushManager.getSubscription();

  if (!subscription) return;

  // Chờ BE xác nhận xóa trước.
  // Nếu mất mạng, báo lỗi để người dùng biết chưa hoàn tất.
  await apiRequest("/push/subscriptions", {
    method: "DELETE",
    body: JSON.stringify({
      endpoint: subscription.endpoint,
    }),
  });

  const unsubscribed = await subscription.unsubscribe();

  if (!unsubscribed) {
    const remaining =
      await registration!.pushManager.getSubscription();

    if (remaining) {
      throw new Error(
        "Máy chủ đã ngừng đăng ký cho tài khoản này, nhưng trình duyệt chưa hủy đăng ký thiết bị. Bạn hãy thử lại."
      );
    }
  }
}

export async function detachDevicePushForLogout():
  Promise<boolean> {
  if (!("serviceWorker" in navigator)) {
    return true;
  }

  // Thử xóa đăng ký trên BE khi còn phiên đăng nhập.
  try {
    await disableDevicePush();
  } catch {
    // Dù BE chưa xác nhận, vẫn thử ngừng nhận trên thiết bị.
  }

  try {
    const registration =
      await navigator.serviceWorker.getRegistration("/");

    if (!registration) return true;

    // Dọn các thông báo đã hiển thị của ứng dụng.
    const notifications =
      await registration.getNotifications();

    notifications.forEach((notification) => {
      notification.close();
    });

    const subscription =
      await registration.pushManager.getSubscription();

    if (!subscription) return true;

    await subscription.unsubscribe();

    const remaining =
      await registration.pushManager.getSubscription();

    return remaining === null;
  } catch {
    return false;
  }
}
