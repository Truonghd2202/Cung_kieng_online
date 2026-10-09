import { useState } from "react";
import { apiRequest } from "../lib/api";
type Reading = { id: string; year: number; sections: Array<{ title: string; body: string }>; disclaimer: string };
export function YearlyReading() {
  const [birthDate, setBirthDate] = useState("");
  const [year, setYear] = useState(Number(new Intl.DateTimeFormat("en", { timeZone: "Asia/Ho_Chi_Minh", year: "numeric" }).format(new Date())));
  const [consent, setConsent] = useState(false);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");
  const [readings, setReadings] = useState<Reading[]>([]);
  const load = async () => {
    setMessage("");
    try { setReadings((await apiRequest<{ items: Reading[] }>("/horoscope/yearly")).items); }
    catch (e) { setMessage(e instanceof Error ? e.message : "Chưa tải được diễn giải."); }
  };
  const generate = async (event: React.FormEvent) => {
    event.preventDefault(); if (busy) return; setBusy(true); setMessage("");
    try { const result = await apiRequest<Reading>("/horoscope/yearly", { method: "POST", body: JSON.stringify({ birthDate, year, consent }) }); setReadings((items) => [result, ...items]); }
    catch (e) { setMessage(e instanceof Error ? e.message : "Chưa tạo được diễn giải."); }
    finally { setBusy(false); }
  };
  return <section className="my-8 rounded-3xl border border-line bg-surface p-6" aria-labelledby="yearly-reading-title">
    <h2 id="yearly-reading-title" className="text-xl font-semibold">Diễn giải AI theo năm · Hội viên Tâm An</h2>
    <p className="my-3 text-sm">Gợi ý để tự suy ngẫm và lập kế hoạch. Đây không phải lá số tử vi được tính toán hay dự báo tương lai.</p>
    <form onSubmit={(event) => void generate(event)} className="space-y-4">
      <label className="block">Ngày sinh<input className="ml-3 rounded-lg border border-line bg-surface p-2" type="date" required value={birthDate} onChange={(e) => setBirthDate(e.target.value)} /></label>
      <label className="block">Năm muốn chiêm nghiệm<input className="ml-3 rounded-lg border border-line bg-surface p-2" type="number" min={2000} max={2100} required value={year} onChange={(e) => setYear(Number(e.target.value))} /></label>
      <label className="flex gap-2 text-sm"><input type="checkbox" required checked={consent} onChange={(e) => setConsent(e.target.checked)} />Tôi đồng ý gửi ngày sinh và năm lựa chọn tới dịch vụ Gemini để tạo diễn giải, và lưu kết quả vào tài khoản.</label>
      <div className="flex gap-3"><button disabled={busy || !consent} className="rounded-xl bg-accent px-4 py-3 text-white disabled:opacity-50">{busy ? "Đang tạo diễn giải…" : "Tạo diễn giải"}</button><button type="button" onClick={() => void load()} className="rounded-xl border border-line px-4 py-3">Đọc lại bản đã lưu</button></div>
    </form>
    {message && <p className="mt-3" role="alert">{message}</p>}
    {readings.map((reading) => <article key={reading.id} className="mt-6 border-t border-line pt-4"><h3 className="text-lg font-semibold">Năm {reading.year}</h3>{reading.sections.map((section, index) => <div key={index} className="mt-4"><h4 className="font-semibold">{section.title}</h4><p className="mt-2 whitespace-pre-wrap">{section.body}</p></div>)}<p className="mt-4 text-sm text-muted">{reading.disclaimer}</p></article>)}
  </section>;
}
