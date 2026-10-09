import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { AppDialog } from "./AppDialog";
import { createMemorialProfile, deleteMemorialProfile, loadMemorialProfiles, memorialProfileToRecord, updateMemorialProfile, type MemorialProfile } from "../data/memoryService";
import type { MemorialRecord } from "../screens/MemorialSpaceScreen";
import { MEMORIAL_PROFILES_CHANGED_EVENT } from "../hooks/useReminderOverview";

const empty = { fullName: "", relationship: "", birthDate: "", deathDate: "", avatarUrl: "", biography: "", note: "", calendar: "LUNAR" as "LUNAR" | "SOLAR", day: "1", month: "1", reminder: false };
export function MemorialProfilesPanel({ selectedId, onSelect }: { selectedId?: string; onSelect: (value: MemorialRecord | null) => void }) {
  const [profiles, setProfiles] = useState<MemorialProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [editor, setEditor] = useState<string | null>(null);
  const [deleting, setDeleting] = useState<MemorialProfile | null>(null);
  const [form, setForm] = useState(empty);
  const select = (profile: MemorialProfile) => onSelect(memorialProfileToRecord(profile));
  async function refresh() {
    setLoading(true); setError("");
    try { setProfiles(await loadMemorialProfiles()); }
    catch (e) { setError(e instanceof Error ? e.message : "Chưa tải được hồ sơ."); }
    finally { setLoading(false); }
  }
  useEffect(() => { void refresh(); }, []);
  function edit(profile?: MemorialProfile) {
    const anniversary = profile?.anniversaries[0];
    setForm(profile ? {
      fullName: profile.fullName, relationship: profile.relationship || "", birthDate: profile.birthDate || "",
      deathDate: profile.deathDate || "", avatarUrl: profile.avatarUrl || "", biography: profile.biography || "", note: profile.note || "",
      calendar: anniversary?.calendar || "LUNAR", day: String(anniversary?.day || 1), month: String(anniversary?.month || 1), reminder: Boolean(anniversary),
    } : empty);
    setError(""); setMessage(""); setEditor(profile?.id || "new");
  }
  async function save(event: React.FormEvent) {
    event.preventDefault();
    if (busy) return;
    setBusy(true); setError("");
    try {
      if (form.birthDate && form.deathDate && form.birthDate > form.deathDate) throw new Error("Ngày mất không được trước ngày sinh.");
      const input = { fullName: form.fullName, relationship: form.relationship, birthDate: form.birthDate || null,
        deathDate: form.deathDate || null, avatarUrl: form.avatarUrl || null, biography: form.biography, note: form.note,
        anniversary: form.reminder ? { calendar: form.calendar, day: Number(form.day), month: Number(form.month), repeatYearly: true } : null };
      const saved = editor === "new" ? await createMemorialProfile(input) : await updateMemorialProfile(editor!, input);
      setProfiles((items) => [...items.filter((item) => item.id !== saved.id), saved]);
      window.dispatchEvent(new Event(MEMORIAL_PROFILES_CHANGED_EVENT));
      select(saved); setEditor(null); setMessage("Đã lưu hồ sơ và chọn cho bàn thờ.");
    } catch (e) { setError(e instanceof Error ? e.message : "Chưa lưu được hồ sơ. Vui lòng thử lại."); }
    finally { setBusy(false); }
  }
  async function remove() {
    if (!deleting || busy) return;
    setBusy(true); setError("");
    try {
      await deleteMemorialProfile(deleting.id);
      setProfiles((items) => items.filter((item) => item.id !== deleting.id));
      window.dispatchEvent(new Event(MEMORIAL_PROFILES_CHANGED_EVENT));
      if (selectedId === deleting.id) onSelect(null);
      setDeleting(null); setMessage("Đã xóa hồ sơ cùng lịch nhắc và lịch sử thắp nhang liên quan.");
    } catch (e) { setError(e instanceof Error ? e.message : "Chưa xóa được hồ sơ."); }
    finally { setBusy(false); }
  }
  const inputClass = "mt-1 min-h-11 w-full rounded-lg border border-line bg-surface p-3 text-ink";
  return <section className="mb-8 space-y-4 rounded-2xl border border-line bg-surface p-5" aria-busy={loading || busy} aria-labelledby="memorial-profiles-heading">
    <div className="flex flex-wrap items-center justify-between gap-3">
      <h2 id="memorial-profiles-heading" className="text-xl font-semibold text-ink">Hồ sơ người thân</h2>
      <Button onClick={() => edit()} disabled={loading || busy}>Thêm người thân</Button>
    </div>
    <p className="text-sm text-muted">Quản lý riêng từng hồ sơ, ngày giỗ âm hoặc dương lịch. Bật thông báo trên thiết bị trong Cài đặt để nhận nhắc trước 3 ngày.</p>
    {loading && <p role="status">Đang tải hồ sơ…</p>}
    {error && !editor && !deleting && <div role="alert"><p>{error}</p><Button variant="outline" onClick={() => void refresh()}>Thử lại</Button></div>}
    {message && <p role="status">{message}</p>}
    {!loading && !error && !profiles.length && <p>Chưa có hồ sơ. Hãy thêm người thân đầu tiên.</p>}
    <div className="grid gap-3 sm:grid-cols-2">
      {profiles.map((profile) => <article key={profile.id} className="min-w-0 rounded-xl border border-line p-4">
        <h3 className="break-words font-semibold text-ink">{profile.fullName}</h3>
        <p className="text-sm text-muted">{profile.relationship || "Người thân"}</p>
        {profile.anniversaries.map((date) => <p key={date.id} className="mt-2 text-sm">Ngày giỗ: {date.day}/{date.month} ({date.calendar === "LUNAR" ? "âm lịch, tháng thường" : "dương lịch"})</p>)}
        <div className="mt-3 flex flex-wrap gap-2">
          <Button variant="outline" onClick={() => select(profile)} aria-pressed={selectedId === profile.id}>{selectedId === profile.id ? "Đang chọn" : "Chọn bàn thờ"}</Button>
          <Button variant="outline" onClick={() => edit(profile)} aria-label={`Sửa hồ sơ ${profile.fullName}`}>Sửa</Button>
          <Button variant="outline" onClick={() => { setError(""); setDeleting(profile); }} aria-label={`Xóa hồ sơ ${profile.fullName}`}>Xóa</Button>
        </div>
      </article>)}
    </div>
    {editor && <AppDialog labelledBy="memorial-editor-title" onClose={() => { if (!busy) setEditor(null); }} className="w-full max-w-xl">
      <form onSubmit={save} className="space-y-4 p-5">
        <h2 id="memorial-editor-title" className="text-xl font-semibold">{editor === "new" ? "Thêm người thân" : "Sửa hồ sơ"}</h2>
        <fieldset disabled={busy} className="space-y-4">
          <label className="block">Họ tên *<input className={inputClass} required maxLength={255} value={form.fullName} onChange={(e) => setForm({ ...form, fullName: e.target.value })} /></label>
          <label className="block">Mối quan hệ<input className={inputClass} maxLength={100} value={form.relationship} onChange={(e) => setForm({ ...form, relationship: e.target.value })} /></label>
          <div className="grid gap-3 sm:grid-cols-2">
            <label>Ngày sinh (dương lịch)<input type="date" className={inputClass} value={form.birthDate} onChange={(e) => setForm({ ...form, birthDate: e.target.value })} /></label>
            <label>Ngày mất (dương lịch)<input type="date" className={inputClass} min={form.birthDate || undefined} value={form.deathDate} onChange={(e) => setForm({ ...form, deathDate: e.target.value })} /></label>
          </div>
          <label className="block">Liên kết ảnh (HTTPS)<input type="url" className={inputClass} value={form.avatarUrl} onChange={(e) => setForm({ ...form, avatarUrl: e.target.value })} /></label>
          <label className="block">Tiểu sử<textarea className={inputClass} maxLength={5000} value={form.biography} onChange={(e) => setForm({ ...form, biography: e.target.value })} /></label>
          <label className="block">Lời tưởng nhớ<textarea className={inputClass} maxLength={2000} value={form.note} onChange={(e) => setForm({ ...form, note: e.target.value })} /></label>
          <label className="flex min-h-11 items-center gap-3"><input type="checkbox" checked={form.reminder} onChange={(e) => setForm({ ...form, reminder: e.target.checked })} />Lưu ngày giỗ lặp hằng năm</label>
          {form.reminder && <div className="grid grid-cols-3 gap-3">
            <label>Loại lịch<select className={inputClass} value={form.calendar} onChange={(e) => setForm({ ...form, calendar: e.target.value as "LUNAR" | "SOLAR" })}><option value="LUNAR">Âm lịch</option><option value="SOLAR">Dương lịch</option></select></label>
            <label>Ngày<input type="number" className={inputClass} required min={1} max={form.calendar === "LUNAR" ? 30 : 31} value={form.day} onChange={(e) => setForm({ ...form, day: e.target.value })} /></label>
            <label>Tháng<input type="number" className={inputClass} required min={1} max={12} value={form.month} onChange={(e) => setForm({ ...form, month: e.target.value })} /></label>
          </div>}
        </fieldset>
        {error && <p role="alert" className="text-danger">{error}</p>}
        <div className="flex gap-3"><Button type="submit" disabled={busy}>{busy ? "Đang lưu…" : "Lưu hồ sơ"}</Button><Button type="button" variant="outline" disabled={busy} onClick={() => setEditor(null)}>Hủy</Button></div>
      </form>
    </AppDialog>}
    {deleting && <AppDialog labelledBy="memorial-delete-title" onClose={() => { if (!busy) setDeleting(null); }} className="max-w-md">
      <div className="space-y-4 p-5"><h2 id="memorial-delete-title" className="text-xl font-semibold">Xóa hồ sơ {deleting.fullName}?</h2>
        <p>Hồ sơ, ngày giỗ và lịch sử thắp nhang liên quan sẽ bị xóa khỏi máy chủ. Không thể hoàn tác.</p>
        {error && <p role="alert">{error}</p>}
        <div className="flex gap-3"><Button disabled={busy} onClick={() => void remove()}>{busy ? "Đang xóa…" : "Xác nhận xóa"}</Button><Button variant="outline" disabled={busy} onClick={() => setDeleting(null)}>Giữ lại</Button></div>
      </div>
    </AppDialog>}
  </section>;
}
