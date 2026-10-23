import { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight, CalendarDays, LoaderCircle } from "lucide-react";
import { apiRequest } from "../lib/api";
import { isDemoMode } from "../data/demoMode";

type CheckIn = { id: string; mood: string; contextKey: string; note: string | null; createdAt: string; actionDone: boolean };
type History = {
  anchor: string; period: "week" | "month"; range: { start: string; end: string }; timezone: string; scope: "all_check_ins";
  summary: { total: number; byMood: Array<{ mood: string; count: number }>; byDay: Array<{ day: string; count: number }> };
  items: CheckIn[]; pagination: { page: number; pageSize: number; total: number; pages: number };
};

function localToday() {
  const parts = new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Ho_Chi_Minh", year: "numeric", month: "2-digit", day: "2-digit" }).format(new Date());
  return parts;
}

export function MoodHistoryPanel({ isLoggedIn }: { isLoggedIn: boolean }) {
  const [period, setPeriod] = useState<"week" | "month">("week");
  const [anchor, setAnchor] = useState(localToday);
  const [mood, setMood] = useState("");
  const [page, setPage] = useState(1);
  const [reload, setReload] = useState(0);
  const [data, setData] = useState<History | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!isLoggedIn) return;
    if (isDemoMode()) {
      const days = [0, 1, 3, 5, 6];
      const moods = ["An yên", "Biết ơn", "Bình an", "Hy vọng", "An yên"];
      const items: CheckIn[] = days.map((offset, index) => {
        const date = new Date(`${anchor}T12:00:00+07:00`);
        date.setDate(date.getDate() - offset);
        return {
          id: `demo-checkin-${index}`,
          mood: moods[index],
          contextKey: "general",
          note: ["Dành một chút thời gian cho gia đình.", "Hoàn thành việc còn dang dở.", "Tâm trí nhẹ nhàng hơn.", "Mong mọi điều thuận lợi.", "Biết ơn những điều giản dị."][index],
          createdAt: date.toISOString(),
          actionDone: index % 2 === 0,
        };
      }).filter((item) => !mood || item.mood === mood);
      const counts = items.reduce<Record<string, number>>((result, item) => {
        result[item.mood] = (result[item.mood] ?? 0) + 1;
        return result;
      }, {});
      const summary = {
        total: items.length,
        byMood: Object.entries(counts).map(([label, count]) => ({ mood: label, count })),
        byDay: items.map((item) => ({ day: item.createdAt.slice(0, 10), count: 1 })),
      };
      setData({
        anchor,
        period,
        range: { start: anchor, end: anchor },
        timezone: "Asia/Ho_Chi_Minh",
        scope: "all_check_ins",
        summary,
        items,
        pagination: { page: 1, pageSize: 20, total: items.length, pages: 1 },
      });
      setLoading(false);
      setError("");
      return;
    }
    const params = new URLSearchParams({ period, anchor, page: String(page), pageSize: "20" });
    if (mood) params.set("mood", mood);
    let active = true;
    setLoading(true);
    setError("");
    apiRequest<History>(`/mood/check-ins/history?${params}`)
      .then((result) => { if (active) setData(result); })
      .catch((cause) => { if (active) { setData(null); setError(cause instanceof Error ? cause.message : "Chưa tải được lịch sử check-in."); } })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, [isLoggedIn, period, anchor, mood, page, reload]);

  const movePeriod = (direction: -1 | 1) => {
    const [year, month, day] = anchor.split("-").map(Number);
    const date = new Date(Date.UTC(year, month - 1, period === "month" ? 1 : day, 12));
    if (period === "month") date.setUTCMonth(date.getUTCMonth() + direction);
    else date.setUTCDate(date.getUTCDate() + direction * 7);
    setAnchor(`${date.getUTCFullYear()}-${String(date.getUTCMonth() + 1).padStart(2, "0")}-${String(date.getUTCDate()).padStart(2, "0")}`);
    setPage(1);
  };

  return <section className="mb-10 rounded-3xl border border-line bg-surface p-5 sm:p-7" aria-labelledby="mood-history-title">
    <div className="flex flex-wrap items-start justify-between gap-4">
      <div>
        <h2 id="mood-history-title" className="font-display text-xl font-semibold text-ink">Tổng kết cảm xúc</h2>
        <p className="mt-1 text-sm text-muted">Thống kê từ mọi check-in đã ghi nhận ở tài khoản, dù kết quả có được lưu vào sổ tay hay chưa. Chỉ bộ lọc mới tác động tới danh sách bên dưới.</p>
      </div>
      <div className="flex gap-2" role="group" aria-label="Khoảng thời gian">
        {(["week", "month"] as const).map((value) => <button key={value} type="button" onClick={() => { setPeriod(value); setPage(1); }} aria-pressed={period === value} className={`min-h-10 rounded-xl border px-3 text-sm ${period === value ? "border-accent bg-accent-soft text-accent" : "border-line text-muted"}`}>{value === "week" ? "Theo tuần" : "Theo tháng"}</button>)}
      </div>
    </div>

    {!isLoggedIn ? <p className="mt-5 rounded-xl bg-surface-soft p-4 text-sm text-muted">Đăng nhập để xem lịch sử check-in của tài khoản.</p> : <>
      <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <button type="button" aria-label="Khoảng trước" onClick={() => movePeriod(-1)} className="grid h-10 w-10 place-items-center rounded-xl border border-line text-accent"><ArrowLeft className="h-4 w-4" /></button>
          <button type="button" aria-label="Khoảng sau" onClick={() => movePeriod(1)} disabled={anchor >= localToday()} className="grid h-10 w-10 place-items-center rounded-xl border border-line text-accent disabled:opacity-40"><ArrowRight className="h-4 w-4" /></button>
          <span className="inline-flex items-center gap-1.5 text-sm text-ink"><CalendarDays className="h-4 w-4 text-accent" />{data ? `${data.range.start} – ${data.range.end}` : anchor}</span>
        </div>
        <label className="text-sm text-muted">Lọc danh sách
          <select className="ml-2 min-h-10 rounded-xl border border-line bg-surface px-3 text-ink" value={mood} onChange={(event) => { setMood(event.target.value); setPage(1); }}>
            <option value="">Mọi cảm xúc</option>{(data?.summary.byMood ?? []).map(({ mood: value }) => <option key={value} value={value}>{value}</option>)}
          </select>
        </label>
      </div>
      {loading ? <p role="status" className="mt-5 flex items-center gap-2 text-sm text-muted"><LoaderCircle className="h-4 w-4 animate-spin" />Đang tải dữ liệu check-in…</p> : error ? <div role="alert" className="mt-5 rounded-xl border border-danger/30 bg-danger-soft p-4 text-sm text-danger">{error}<button type="button" onClick={() => setReload((value) => value + 1)} className="ml-3 underline">Thử lại</button></div> : data && <>
        <div className="mt-5 rounded-2xl bg-surface-soft p-4">
          <p className="text-lg font-semibold text-ink">{data.summary.total} lượt check-in</p>
          <div className="mt-3 flex flex-wrap gap-2">{data.summary.byMood.map(({ mood: label, count }) => <span key={label} className="rounded-full border border-line bg-surface px-3 py-1.5 text-xs text-ink">{label}: <strong>{count}</strong></span>)}</div>
          <p className="mt-3 text-xs text-muted">Ngày không có lượt check-in là thiếu dữ liệu, không được tính thành cảm xúc nào. Múi giờ: Việt Nam.</p>
        </div>
        <div className="mt-5">
          <h3 className="font-semibold text-ink">Lịch sử check-in</h3>
          {data.items.length ? <ul className="mt-2 divide-y divide-line">{data.items.map((item) => <li key={item.id} className="py-3"><div className="flex flex-wrap justify-between gap-2"><span className="font-medium text-ink">{item.mood}</span><time className="text-sm text-muted">{new Intl.DateTimeFormat("vi-VN", { timeZone: data.timezone, dateStyle: "medium", timeStyle: "short" }).format(new Date(item.createdAt))}</time></div>{item.note && <p className="mt-1 whitespace-pre-wrap text-sm text-muted">{item.note}</p>}</li>)}</ul> : <p className="mt-2 text-sm text-muted">Không có check-in trong khoảng thời gian và bộ lọc này.</p>}
          {data.pagination.pages > 1 && <div className="mt-4 flex items-center justify-between"><button type="button" disabled={page <= 1} onClick={() => setPage((value) => value - 1)} className="rounded-xl border border-line px-3 py-2 text-sm disabled:opacity-40">Trang trước</button><span className="text-sm text-muted">Trang {data.pagination.page} / {data.pagination.pages} · {data.pagination.total} lượt</span><button type="button" disabled={page >= data.pagination.pages} onClick={() => setPage((value) => value + 1)} className="rounded-xl border border-line px-3 py-2 text-sm disabled:opacity-40">Trang sau</button></div>}
        </div>
      </>}
    </>}
  </section>;
}
