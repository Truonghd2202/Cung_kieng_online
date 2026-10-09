import { useEffect, useState } from "react";

export function useScreenWakeLock(enabled: boolean) {
  const [status, setStatus] = useState("");
  useEffect(() => {
    if (!enabled) { setStatus(""); return; }
    if (!("wakeLock" in navigator)) { setStatus("Trình duyệt chưa hỗ trợ giữ màn hình sáng."); return; }
    let disposed = false;
    let lock: WakeLockSentinel | undefined;
    let pending = false;
    const acquire = async () => {
      if (disposed || pending || document.visibilityState !== "visible" || (lock && !lock.released)) return;
      pending = true;
      try {
        const next = await navigator.wakeLock.request("screen");
        if (disposed) { await next.release(); return; }
        lock = next;
        setStatus("Màn hình được giữ sáng khi đang đọc.");
      } catch { if (!disposed) setStatus("Không thể giữ màn hình sáng; hãy kiểm tra chế độ tiết kiệm pin."); }
      finally { pending = false; }
    };
    void acquire();
    document.addEventListener("visibilitychange", acquire);
    return () => { disposed = true; document.removeEventListener("visibilitychange", acquire); void lock?.release().catch(() => {}); };
  }, [enabled]);
  return status;
}
