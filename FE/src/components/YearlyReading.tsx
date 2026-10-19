import { useEffect, useState } from "react";
import { apiRequest } from "../lib/api";

type Reading = { id: string; year: number; sections: Array<{ title: string; body: string }>; disclaimer: string };

export function YearlyReading({
  canGenerate,
  usage,
}: {
  canGenerate: boolean;
  usage: { successfulUsed: number; inProgress: number; successfulRemaining: number; successfulLimit: number; attemptsUsed: number; attemptsRemaining: number; providerAttemptLimit: number; nextUsableAt: string | null };
}) {
  const [birthDate, setBirthDate] = useState("");
  const [year, setYear] = useState(Number(new Intl.DateTimeFormat("en", { timeZone: "Asia/Ho_Chi_Minh", year: "numeric" }).format(new Date())));
  const [consent, setConsent] = useState(false);
  const [busy, setBusy] = useState(false);
  const [loadingHistory, setLoadingHistory] = useState(false);
  const [message, setMessage] = useState("");
  const [readings, setReadings] = useState<Reading[]>([]);
  const [currentUsage, setCurrentUsage] = useState(usage);

  useEffect(() => setCurrentUsage(usage), [usage]);

  const refreshUsage = async () => {
    try {
      const result = await apiRequest<{ aiUsage: typeof currentUsage }>("/membership/status");
      setCurrentUsage(result.aiUsage);
    } catch {
      // Keep the last server-confirmed quota visible if refresh is unavailable.
    }
  };

  const load = async () => {
    if (busy || loadingHistory) return;

    setLoadingHistory(true);
    setMessage("");

    try {
      const result = await apiRequest<{ items: Reading[] }>(
        "/horoscope/yearly"
      );

      setReadings(result.items);
    } catch (error) {
      setMessage(
        error instanceof Error
          ? error.message
          : "Chưa tải được diễn giải đã lưu."
      );
    } finally {
      setLoadingHistory(false);
    }
  };

  const generate = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!canGenerate) {
      setMessage(
        "Bạn cần hội viên đang hoạt động để tạo diễn giải mới. Các bản đã lưu vẫn có thể đọc lại."
      );
      return;
    }
    if (busy || loadingHistory) return;
    setBusy(true);
    setMessage("");

    try {
      const result = await apiRequest<Reading>("/horoscope/yearly", {
        method: "POST",
        body: JSON.stringify({ birthDate, year, consent }),
      });
      setReadings((items) => [
        result,
        ...items.filter((item) => item.id !== result.id),
      ]);
      await refreshUsage();
    } catch (e) {
      setMessage(e instanceof Error ? e.message : "Chưa tạo được diễn giải.");
      await refreshUsage();
    } finally {
      setBusy(false);
    }
  };

  return (
    <section className="my-8 rounded-3xl border border-line bg-surface p-6" aria-labelledby="yearly-reading-title">
      <h2 id="yearly-reading-title" className="text-xl font-semibold">Diễn giải AI theo năm · Hội viên Tâm An</h2>
      <p className="my-3 text-sm">Gợi ý để tự suy ngẫm và lập kế hoạch. Đây không phải lá số tử vi được tính toán hay dự báo tương lai.</p>
      <p className="mb-4 text-sm leading-relaxed text-muted">
        Trong 24 giờ gần nhất, mỗi tài khoản được nhận tối đa
        3 bản diễn giải thành công và thực hiện tối đa 5 lượt gọi AI.
        Lượt gọi thất bại vẫn tính vào giới hạn 5 lượt.
        Lượt đang xử lý sẽ tạm giữ một suất diễn giải.
      </p>
      <p className="mb-4 text-xs leading-relaxed text-muted">
        Nếu quá trình bị gián đoạn, lượt chờ quá 10 phút sẽ được
        đóng khi bạn yêu cầu tạo diễn giải tiếp theo.
        Lượt này vẫn tính vào giới hạn số lần gọi trong 24 giờ.
      </p>
      <p className="mb-4 rounded-xl bg-surface-soft p-3 text-sm text-ink">Trong 24 giờ qua: {currentUsage.successfulUsed} bản thành công, {currentUsage.inProgress} lượt đang xử lý; còn {currentUsage.successfulRemaining}/{currentUsage.successfulLimit} suất. Đã gọi {currentUsage.attemptsUsed}/{currentUsage.providerAttemptLimit} lần; lượt lỗi vẫn tính vào giới hạn gọi.{currentUsage.nextUsableAt ? ` Dự kiến dùng tiếp từ ${new Date(currentUsage.nextUsableAt).toLocaleString("vi-VN")}.` : ""}</p>
      <details className="mb-4 rounded-xl border border-line p-3">
        <summary className="cursor-pointer text-sm font-semibold">AI gửi và lưu dữ liệu nào?</summary>
        <div className="mt-2 space-y-2 text-sm leading-relaxed text-muted">
          <p>Khi bạn xác nhận đồng ý và tạo nội dung, máy chủ gửi ngày sinh đã nhập và năm đã chọn tới Google Gemini để viết các mục chiêm nghiệm. Check-in, ghi chú và lịch sử cá nhân không được đính kèm.</p>
          <p>Máy chủ lưu ngày/năm yêu cầu, trạng thái và kết quả trong lịch sử tài khoản. Nếu Gemini lỗi, trạng thái yêu cầu cũng được giữ để áp dụng giới hạn lượt. Có thể xóa lịch sử này cùng dữ liệu cá nhân trong Cài đặt → xóa dữ liệu cá nhân.</p>
          <p>Đây là nội dung gợi ý để tự suy ngẫm, không phải lá số được tính toán, chẩn đoán hay dự đoán chắc chắn. Gemini có thể không khả dụng; khi đó không tạo được kết quả mới.</p>
        </div>
      </details>
      <form onSubmit={(event) => void generate(event)} className="space-y-4">
        <label className="block">Ngày sinh<input className="ml-3 rounded-lg border border-line bg-surface p-2" type="date" required value={birthDate} onChange={(e) => setBirthDate(e.target.value)} /></label>
        <label className="block">Năm muốn chiêm nghiệm<input className="ml-3 rounded-lg border border-line bg-surface p-2" type="number" min={2000} max={2100} required value={year} onChange={(e) => setYear(Number(e.target.value))} /></label>
        <label className="flex gap-2 text-sm"><input type="checkbox" required checked={consent} onChange={(e) => setConsent(e.target.checked)} />Tôi đồng ý gửi ngày sinh và năm lựa chọn tới dịch vụ Gemini để tạo diễn giải, và lưu kết quả vào tài khoản.</label>
        <div className="flex gap-3">
          <button
            disabled={
              busy ||
              loadingHistory ||
              !consent ||
              !canGenerate
            }
            className="rounded-xl bg-accent px-4 py-3 text-white disabled:opacity-50"
          >
            {busy ? "Đang tạo diễn giải…" : "Tạo diễn giải"}
          </button>
          <button
            type="button"
            disabled={busy || loadingHistory}
            onClick={() => void load()}
            className="rounded-xl border border-line px-4 py-3"
          >
            {loadingHistory ? "Đang tải…" : "Đọc lại bản đã lưu"}
          </button>
        </div>
      </form>
      {message && <p className="mt-3" role="alert">{message}</p>}
      {readings.map((reading) => (
        <article key={reading.id} className="mt-6 border-t border-line pt-4">
          <h3 className="text-lg font-semibold">Năm {reading.year}</h3>
          {reading.sections.map((section, index) => (
            <div key={index} className="mt-4">
              <h4 className="font-semibold">{section.title}</h4>
              <p className="mt-2 whitespace-pre-wrap">{section.body}</p>
            </div>
          ))}
          <p className="mt-4 text-sm text-muted">{reading.disclaimer}</p>
        </article>
      ))}
    </section>
  );
}
