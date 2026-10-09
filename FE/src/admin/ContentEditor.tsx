import { useEffect, useState } from "react";
import { apiRequest } from "../lib/api";
import { AppDialog } from "../components/AppDialog";

type Kind = "culture" | "calendar" | "xam";
const fields: Record<Kind, Array<[string, string, string?]>> = {
  culture: [["title", "Tiêu đề"], ["slug", "Đường dẫn bài viết"], ["category", "Chủ đề"], ["excerpt", "Tóm tắt", "textarea"], ["image_url", "Đường dẫn hình ảnh"]],
  calendar: [["title", "Tên sự kiện"], ["category", "Loại sự kiện"], ["day", "Ngày", "number"], ["month", "Tháng", "number"], ["description", "Giới thiệu và lưu ý về ngày tổ chức", "textarea"]],
  xam: [["name", "Tên thẻ"], ["stick_number", "Số thẻ (1–100)", "number"], ["xam_type", "Bộ thẻ (ví dụ NORTH:Bình an)"], ["category", "Chủ đề"], ["poem", "Thơ gốc", "textarea"], ["meaning", "Diễn giải tiếng Việt", "textarea"], ["advice", "Gợi ý chiêm nghiệm", "textarea"]],
};
export function ContentEditor({ kind, id, onClose, onSaved }: { kind: Kind; id?: string; onClose: () => void; onSaved: () => void }) {
  const [values, setValues] = useState<Record<string, string>>({ region: "NATIONWIDE", calendar: "LUNAR", fortune_level: "Bình" });
  const [sections, setSections] = useState([{ heading: "", body: "" }]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(Boolean(id));
  const [saving, setSaving] = useState(false);
  useEffect(() => {
    if (!id) return;
    let active = true;
    apiRequest<Record<string, unknown>>(`/admin/${kind}/${id}`).then((record) => {
      if (!active) return;
      const next: Record<string, string> = {};
      for (const [key, value] of Object.entries(record)) if (typeof value === "string" || typeof value === "number") next[key] = String(value);
      setValues(next);
      const content = record.content as { sections?: Array<{ heading?: string; title?: string; body?: string | string[]; paragraphs?: string[] }> } | undefined;
      if (content?.sections?.length) setSections(content.sections.map((section) => ({ heading: section.heading ?? section.title ?? "", body: Array.isArray(section.body) ? section.body.join("\n\n") : section.body ?? section.paragraphs?.join("\n\n") ?? "" })));
    }).catch((e) => { if (active) setError(e.message); }).finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, [kind, id]);
  const set = (key: string, value: string) => setValues((previous) => ({ ...previous, [key]: value }));
  const save = async (event: React.FormEvent) => {
    event.preventDefault(); if (saving) return; setSaving(true); setError("");
    const payload: Record<string, unknown> = { region: values.region, source: values.source || "", reviewNote: values.reviewNote || "" };
    for (const [key, , type] of fields[kind]) payload[key] = type === "number" ? Number(values[key]) : values[key] || "";
    if (kind === "culture") payload.sections = sections;
    if (kind === "calendar") payload.calendar = values.calendar;
    if (kind === "xam") payload.fortune_level = values.fortune_level;
    try { await apiRequest(`/admin/${kind}${id ? `/${id}` : ""}`, { method: id ? "PUT" : "POST", body: JSON.stringify(payload) }); onSaved(); }
    catch (e) { setError(e instanceof Error ? e.message : "Chưa lưu được nội dung."); }
    finally { setSaving(false); }
  };
  const inputStyle = "mt-1 w-full rounded-lg border border-line bg-surface p-3 text-ink";
  return <AppDialog labelledBy="content-editor-title" onClose={() => { if (!saving) onClose(); }} className="max-w-3xl max-h-[90vh] overflow-y-auto">
    <h2 id="content-editor-title" className="text-xl font-semibold">{id ? "Biên tập nội dung" : "Tạo bản thảo"}</h2>
    <p className="my-3 text-sm">Lưu bản thảo sẽ đưa nội dung về trạng thái chờ rà soát và tạm ẩn. Hãy duyệt rồi xuất bản sau khi kiểm tra nguồn.</p>
    {loading ? <p role="status">Đang tải bản thảo…</p> : <form onSubmit={(event) => void save(event)} className="space-y-4">
      {fields[kind].map(([key, label, type]) => <label className="block" key={key}>{label}{type === "textarea" ? <textarea className={inputStyle} rows={4} value={values[key] || ""} onChange={(e) => set(key, e.target.value)} /> : <input className={inputStyle} type={type || "text"} value={values[key] || ""} onChange={(e) => set(key, e.target.value)} />}</label>)}
      <label className="block">Vùng miền<select className={inputStyle} value={values.region} onChange={(e) => set("region", e.target.value)}>{[["NORTH", "Bắc Bộ"], ["CENTRAL", "Trung Bộ"], ["SOUTH", "Nam Bộ"], ["NATIONWIDE", "Toàn quốc"]].map(([value, label]) => <option key={value} value={value}>{label}</option>)}</select></label>
      {kind === "calendar" && <label className="block">Loại lịch<select className={inputStyle} value={values.calendar} onChange={(e) => set("calendar", e.target.value)}><option value="LUNAR">Âm lịch</option><option value="SOLAR">Dương lịch</option></select></label>}
      {kind === "xam" && <label className="block">Xếp loại<select className={inputStyle} value={values.fortune_level} onChange={(e) => set("fortune_level", e.target.value)}>{["Thượng Cát", "Trung Cát", "Hạ Bình", "Bình"].map((value) => <option key={value}>{value}</option>)}</select></label>}
      {kind === "culture" && <fieldset className="space-y-3"><legend>Các phần của bài viết</legend>{sections.map((section, index) => <div key={index} className="rounded-lg border border-line p-3"><label className="block">Tiêu đề phần {index + 1}<input required className={inputStyle} value={section.heading} onChange={(e) => setSections(sections.map((s, i) => i === index ? { ...s, heading: e.target.value } : s))} /></label><label className="block">Nội dung<textarea required rows={6} className={inputStyle} value={section.body} onChange={(e) => setSections(sections.map((s, i) => i === index ? { ...s, body: e.target.value } : s))} /></label><button type="button" disabled={sections.length === 1} onClick={() => setSections(sections.filter((_, i) => i !== index))}>Bỏ phần này</button></div>)}<button type="button" onClick={() => setSections([...sections, { heading: "", body: "" }])}>+ Thêm phần</button></fieldset>}
      <label className="block">Nguồn HTTPS<input className={inputStyle} type="url" value={values.source || ""} onChange={(e) => set("source", e.target.value)} /></label>
      <label className="block">Ghi chú thay đổi<textarea required minLength={8} maxLength={500} className={inputStyle} value={values.reviewNote || ""} onChange={(e) => set("reviewNote", e.target.value)} /></label>
      {error && <p role="alert">{error}</p>}
      <div className="flex gap-3"><button className="admin-primary-button" disabled={saving} type="submit">{saving ? "Đang lưu…" : "Lưu bản thảo"}</button><button type="button" className="admin-secondary-button" disabled={saving} onClick={onClose}>Hủy</button></div>
    </form>}
  </AppDialog>;
}
