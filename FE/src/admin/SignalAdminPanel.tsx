import { FormEvent, MouseEvent, useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  AlertCircle,
  BookOpen,
  Check,
  CheckCircle2,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  Clock,
  Compass,
  Edit3,
  ExternalLink,
  Eye,
  EyeOff,
  FileClock,
  FileText,
  Filter,
  Grid,
  Layers,
  Plus,
  Quote,
  RotateCcw,
  Search,
  Send,
  ShieldAlert,
  ShieldCheck,
  Sparkles,
  User,
  X,
} from "lucide-react";
import checkInCatalog from "../../../shared/checkin-catalog.json";
import { apiRequest } from "../lib/api";

type EditorialStatus = "DRAFT" | "IN_REVIEW" | "APPROVED" | "PUBLISHED" | "HIDDEN" | "REVOKED";
type SourceRecord = { id?: string; title: string; authorOrOrganization?: string; url: string; bibliographicReference?: string; locator: string; accessedOn?: string };
type SignalContent = {
  metadata: { contentKind: "editorial" | "folk"; contentType: "GROUP_AUTHORED" | "QUOTATION"; contentAuthor: string; contentRightsBasis: string; originCommunity: string; sources: SourceRecord[]; quotationVerified: boolean; editorialNote: string; [key: string]: unknown };
  moodDesc: string; badge: string;
  poem: { line1: string; line2: string; subtext: string; [key: string]: unknown };
  research: { title: string; source: string; region: string; note: string; [key: string]: unknown };
  reflection: { title: string; highlightWord: string; content: string; advice: string; signalNumber: string; [key: string]: unknown };
  action: { title: string; duration: string; description: string; buttonLabel: string; tag: string; [key: string]: unknown };
  [key: string]: unknown;
};
type SignalRow = { id: string; source: string; title: string | null; mood: string | null; context_key: string | null; category: string | null; content: string | SignalContent; editorial_status: EditorialStatus; active: boolean; verified: boolean; reviewed_at?: string | null; reviewer?: { full_name: string } | null };
type AuditRow = { id: string; action: string; details: Record<string, unknown>; created_at: string; users?: { full_name: string } | null };
type Coverage = Record<string, Record<string, number>>;
type SignalPage = { items: SignalRow[]; pagination: { page: number; pageSize: number; total: number; pageCount: number }; stats: { total: number; statuses: Record<EditorialStatus, number>; coverage: Coverage } };
type DraftForm = { source: string; title: string; mood: string; contextKey: string; category: string; editorialStatus: "DRAFT" | "IN_REVIEW"; reviewNote: string; content: SignalContent };

const STATUS_LABELS: Record<EditorialStatus, string> = { DRAFT: "Bản nháp", IN_REVIEW: "Chờ duyệt", APPROVED: "Đã duyệt · ẩn", PUBLISHED: "Đang phát hành", HIDDEN: "Đã duyệt · ẩn", REVOKED: "Đã thu hồi" };
const STATUSES: EditorialStatus[] = ["DRAFT", "IN_REVIEW", "APPROVED", "PUBLISHED", "HIDDEN", "REVOKED"];
const cssStatus: Record<EditorialStatus, string> = { DRAFT: "draft", IN_REVIEW: "review", APPROVED: "approved", PUBLISHED: "published", HIDDEN: "hidden", REVOKED: "revoked" };

function emptyContent(): SignalContent {
  return {
    metadata: { contentKind: "editorial", contentType: "GROUP_AUTHORED", contentAuthor: "", contentRightsBasis: "", originCommunity: "", sources: [], quotationVerified: false, editorialNote: "" },
    moodDesc: "", badge: "", poem: { line1: "", line2: "", subtext: "" }, research: { title: "", source: "", region: "", note: "" },
    reflection: { title: "Một câu để tự suy ngẫm", highlightWord: "", content: "", advice: "", signalNumber: "" },
    action: { title: "Một việc nhỏ tùy chọn", duration: "", description: "", buttonLabel: "", tag: "" },
  };
}

function parseContent(value: SignalRow["content"]): SignalContent {
  let parsed: unknown = value;
  if (typeof value === "string") { try { parsed = JSON.parse(value); } catch { return emptyContent(); } }
  const base = emptyContent();
  if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) return base;
  const row = parsed as Record<string, unknown>;
  const part = (key: string) => row[key] && typeof row[key] === "object" ? row[key] as Record<string, unknown> : {};
  const metadata = part("metadata");
  const reflection = part("reflection");
  const action = part("action");
  const poem = part("poem");
  const research = part("research");
  const kind = metadata.contentKind === "folk" ? "folk" : "editorial";
  const { editorialStatus: _status, reviewedBy: _reviewer, reviewedOn: _date, ...cleanMetadata } = metadata;
  return {
    ...base, ...row,
    metadata: { ...base.metadata, ...cleanMetadata, contentKind: kind, contentType: kind === "folk" ? "QUOTATION" : "GROUP_AUTHORED", contentAuthor: String(metadata.contentAuthor || ""), contentRightsBasis: String(metadata.contentRightsBasis || ""), originCommunity: String(metadata.originCommunity || ""), sources: Array.isArray(metadata.sources) ? metadata.sources as SourceRecord[] : [], quotationVerified: metadata.quotationVerified === true, editorialNote: String(metadata.editorialNote || "") },
    moodDesc: String(row.moodDesc || ""), badge: String(row.badge || ""),
    poem: { ...base.poem, ...poem, line1: String(poem.line1 || ""), line2: String(poem.line2 || ""), subtext: String(poem.subtext || "") },
    research: { ...base.research, ...research, title: String(research.title || ""), source: String(research.source || ""), region: String(research.region || ""), note: String(research.note || "") },
    reflection: { ...base.reflection, ...reflection, title: String(reflection.title || ""), highlightWord: String(reflection.highlightWord || ""), content: String(reflection.content || ""), advice: String(reflection.advice || ""), signalNumber: String(reflection.signalNumber || "") },
    action: { ...base.action, ...action, title: String(action.title || ""), duration: String(action.duration || ""), description: String(action.description || ""), buttonLabel: String(action.buttonLabel || ""), tag: String(action.tag || "") },
  };
}

function moodName(key: string | null) { return checkInCatalog.moods.find((item) => item.key === key)?.label || key || "Chưa rõ"; }
function contextName(key: string | null) { return checkInCatalog.contexts.find((item) => item.key === key)?.label || key || "Chưa rõ"; }
function newDraft(): DraftForm { return { source: "", title: "", mood: checkInCatalog.moods[0].key, contextKey: "general", category: "editorial", editorialStatus: "DRAFT", reviewNote: "", content: emptyContent() }; }

export function SignalAdminPanel() {
  const [data, setData] = useState<SignalPage | null>(null);
  const [items, setItems] = useState<SignalRow[]>([]);
  const [page, setPage] = useState(1);
  const [queryText, setQueryText] = useState("");
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<EditorialStatus | "all">("all");
  const [mood, setMood] = useState("all");
  const [contextKey, setContextKey] = useState("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [editing, setEditing] = useState<{ id?: string; form: DraftForm } | null>(null);
  const [sourcesText, setSourcesText] = useState("[]");
  const [editorialNote, setEditorialNote] = useState("");
  const [selected, setSelected] = useState<(SignalRow & { auditLogs?: AuditRow[] }) | null>(null);
  const [detailLoading, setDetailLoading] = useState(false);
  const [reviewNote, setReviewNote] = useState("");
  const [rightsConfirmed, setRightsConfirmed] = useState(false);
  const [saving, setSaving] = useState(false);
  const [coverageExpanded, setCoverageExpanded] = useState(true);
  const request = useRef(0);

  const loadPage = useCallback(async (requestedPage = page) => {
    const current = ++request.current;
    setLoading(true); setError("");
    const params = new URLSearchParams({ page: String(requestedPage) });
    if (query) params.set("q", query);
    if (status !== "all") params.set("status", status);
    if (mood !== "all") params.set("mood", mood);
    if (contextKey !== "all") params.set("contextKey", contextKey);
    try {
      const result = await apiRequest<SignalPage>("/admin/signals?" + params.toString());
      if (current === request.current) { setData(result); setItems(result.items); }
    } catch (loadError) {
      if (current === request.current) setError(loadError instanceof Error ? loadError.message : "Không tải được nội dung.");
    } finally { if (current === request.current) setLoading(false); }
  }, [page, query, status, mood, contextKey]);

  useEffect(() => { void loadPage(page); }, [loadPage, page]);

  async function openDetail(id: string) {
    setDetailLoading(true); setError("");
    try {
      const result = await apiRequest<SignalRow & { auditLogs: AuditRow[] }>("/admin/signals/" + encodeURIComponent(id));
      setSelected(result); setReviewNote(""); setRightsConfirmed(false);
    } catch (loadError) { setError(loadError instanceof Error ? loadError.message : "Không tải được hồ sơ."); }
    finally { setDetailLoading(false); }
  }

  async function openEditor(id?: string) {
    setError("");
    if (!id) { const form = newDraft(); setSourcesText("[]"); setEditorialNote(""); setEditing({ form }); return; }
    try {
      const row = await apiRequest<SignalRow>("/admin/signals/" + encodeURIComponent(id));
      const content = parseContent(row.content);
      setSourcesText(JSON.stringify(content.metadata.sources, null, 2));
      setEditorialNote(content.metadata.editorialNote);
      setEditing({ id, form: { source: row.source, title: row.title || "", mood: row.mood || checkInCatalog.moods[0].key, contextKey: row.context_key || "general", category: row.category || "editorial", editorialStatus: "DRAFT", reviewNote: "", content } });
    } catch (loadError) { setError(loadError instanceof Error ? loadError.message : "Không tải được bản thảo."); }
  }

  function setFormField<K extends keyof DraftForm>(key: K, value: DraftForm[K]) {
    setEditing((current) => current ? { ...current, form: { ...current.form, [key]: value } } : current);
  }
  function setMetaField(key: keyof SignalContent["metadata"], value: unknown) {
    setEditing((current) => current ? { ...current, form: { ...current.form, content: { ...current.form.content, metadata: { ...current.form.content.metadata, [key]: value } } } } : current);
  }
  function setReflectionField(key: keyof SignalContent["reflection"], value: string) {
    setEditing((current) => current ? { ...current, form: { ...current.form, content: { ...current.form.content, reflection: { ...current.form.content.reflection, [key]: value } } } } : current);
  }
  function setActionField(key: keyof SignalContent["action"], value: string) {
    setEditing((current) => current ? { ...current, form: { ...current.form, content: { ...current.form.content, action: { ...current.form.content.action, [key]: value } } } } : current);
  }

  async function saveDraft(event: FormEvent<HTMLFormElement> | MouseEvent<HTMLButtonElement>, nextStatus: "DRAFT" | "IN_REVIEW") {
    event.preventDefault();
    if (!editing) return;
    let sources: SourceRecord[];
    try {
      const parsed: unknown = JSON.parse(sourcesText);
      if (!Array.isArray(parsed)) throw new Error("Hồ sơ nguồn phải là JSON array.");
      sources = parsed as SourceRecord[];
    } catch (parseError) { setError(parseError instanceof Error ? parseError.message : "Hồ sơ nguồn không hợp lệ."); return; }
    const content: SignalContent = { ...editing.form.content, metadata: { ...editing.form.content.metadata, contentType: editing.form.content.metadata.contentKind === "folk" ? "QUOTATION" : "GROUP_AUTHORED", sources, editorialNote, ...(editing.form.content.metadata.contentKind === "editorial" ? { quotationVerified: false } : {}) } };
    const body = { ...editing.form, editorialStatus: nextStatus, content };
    setSaving(true); setError("");
    try {
      await apiRequest<SignalRow>(editing.id ? "/admin/signals/" + encodeURIComponent(editing.id) : "/admin/signals", { method: editing.id ? "PUT" : "POST", body: JSON.stringify(body) });
      setEditing(null); setNotice(nextStatus === "IN_REVIEW" ? "Đã gửi bản thảo chờ duyệt." : "Đã lưu bản nháp.");
      setPage(1); await loadPage(1);
      if (selected) await openDetail(selected.id);
    } catch (saveError) { setError(saveError instanceof Error ? saveError.message : "Không lưu được bản thảo."); }
    finally { setSaving(false); }
  }

  async function transition(patch: { verified?: boolean; active?: boolean }) {
    if (!selected) return;
    if (reviewNote.trim().length < 8) { setError("Ghi chú thao tác cần tối thiểu 8 ký tự."); return; }
    if (patch.verified === true && !rightsConfirmed) { setError("Cần xác nhận đã đối chiếu quyền sử dụng thực tế trước khi duyệt."); return; }
    setSaving(true); setError("");
    try {
      await apiRequest<SignalRow>("/admin/signals/" + encodeURIComponent(selected.id) + "/review", { method: "PATCH", body: JSON.stringify({ ...patch, reviewNote, ...(patch.verified === true ? { rightsConfirmed } : {}) }) });
      setNotice(patch.verified === true ? "Đã duyệt phiên bản nội dung hiện tại." : patch.verified === false ? "Đã thu hồi duyệt và gỡ nội dung khỏi phát hành." : patch.active === false ? "Đã ẩn nội dung; hồ sơ duyệt được giữ nguyên." : "Đã phát hành lại phiên bản đã duyệt.");
      setReviewNote(""); setRightsConfirmed(false); await loadPage(page); await openDetail(selected.id);
    } catch (reviewError) { setError(reviewError instanceof Error ? reviewError.message : "Không cập nhật được trạng thái."); }
    finally { setSaving(false); }
  }

  function searchSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setQuery(queryText.trim());
    setPage(1);
  }

  function handleClearSearch() {
    setQueryText("");
    setQuery("");
    setPage(1);
  }

  function resetAllFilters() {
    setQueryText("");
    setQuery("");
    setStatus("all");
    setMood("all");
    setContextKey("all");
    setPage(1);
  }

  const selectedContent = useMemo(() => selected ? parseContent(selected.content) : null, [selected]);

  // Derived Analytics & Counts
  const totalSignals = data?.stats.total ?? 0;
  const statusCounts = useMemo(() => data?.stats.statuses ?? {
    DRAFT: 0,
    IN_REVIEW: 0,
    APPROVED: 0,
    PUBLISHED: 0,
    HIDDEN: 0,
    REVOKED: 0,
  }, [data?.stats.statuses]);

  const totalMatrixCells = checkInCatalog.moods.length * checkInCatalog.contexts.length;
  const coveredMatrixCells = useMemo(() => {
    if (!data?.stats.coverage) return 0;
    let count = 0;
    for (const m of checkInCatalog.moods) {
      for (const c of checkInCatalog.contexts) {
        if ((data.stats.coverage[m.key]?.[c.key] || 0) > 0) count++;
      }
    }
    return count;
  }, [data?.stats.coverage]);

  const coveragePercent = totalMatrixCells > 0 ? Math.round((coveredMatrixCells / totalMatrixCells) * 100) : 0;
  const publishedCount = statusCounts.PUBLISHED || 0;
  const inReviewCount = statusCounts.IN_REVIEW || 0;
  const draftCount = statusCounts.DRAFT || 0;

  const hasActiveFilters = Boolean(query || status !== "all" || mood !== "all" || contextKey !== "all");

  return (
    <section className="admin-signal-panel" aria-label="Quản trị lời chiêm nghiệm" aria-busy={loading}>
      {/* 1. EXECUTIVE KPI DECK */}
      <div className="admin-content-deck admin-signal-deck">
        <div className="admin-deck-stat-card">
          <span className="deck-eyebrow">TỔNG LỜI CHIÊM NGHIỆM</span>
          <div className="deck-main-num">
            <strong>{totalSignals.toLocaleString("vi-VN")}</strong>
            <small>tín hiệu</small>
          </div>
          <div className="deck-progress">
            <div className="deck-progress-bar" style={{ width: "100%", background: "var(--admin-gold)" }} />
          </div>
          <span className="deck-sub">Toàn bộ kho dữ liệu chiêm nghiệm</span>
        </div>

        <div className="admin-deck-stat-card">
          <span className="deck-eyebrow">ĐỘ BAO PHỦ MA TRẬN</span>
          <div className="deck-main-num">
            <strong>{coveragePercent}%</strong>
            <small>{coveredMatrixCells}/{totalMatrixCells} ô</small>
          </div>
          <div className="deck-progress">
            <div className="deck-progress-bar" style={{ width: `${coveragePercent}%`, background: "var(--admin-emerald)" }} />
          </div>
          <span className="deck-sub">{totalMatrixCells - coveredMatrixCells} tổ hợp còn trống nội dung</span>
        </div>

        <div className="admin-deck-stat-card">
          <span className="deck-eyebrow">ĐANG PHÁT HÀNH</span>
          <div className="deck-main-num">
            <strong>{publishedCount}</strong>
            <small>lên sóng</small>
          </div>
          <div className="deck-progress">
            <div className="deck-progress-bar" style={{ width: `${totalSignals > 0 ? Math.round((publishedCount / totalSignals) * 100) : 0}%`, background: "var(--admin-emerald)" }} />
          </div>
          <span className="deck-sub">Hiển thị trực tiếp cho khách hàng check-in</span>
        </div>

        <div className="admin-deck-stat-card">
          <span className="deck-eyebrow">CHỜ DUYỆT & BẢN NHÁP</span>
          <div className="deck-main-num">
            <strong>{inReviewCount}</strong>
            <small>chờ duyệt</small>
          </div>
          <div className="deck-progress">
            <div className="deck-progress-bar" style={{ width: `${totalSignals > 0 ? Math.round((inReviewCount / totalSignals) * 100) : 0}%`, background: "var(--admin-crimson)" }} />
          </div>
          <span className="deck-sub">{draftCount} bản nháp đang hoàn thiện</span>
        </div>
      </div>

      {/* 2. COVERAGE MATRIX SECTION (HEATMAP) */}
      <div className="admin-signal-coverage-card">
        <div className="admin-signal-coverage-header">
          <div className="admin-signal-coverage-title-wrap">
            <div className="admin-signal-coverage-badge">
              <Grid size={14} /> MA TRẬN PHÁT HÀNH
            </div>
            <div>
              <h3>Bản đồ nhiệt độ bao phủ nội dung</h3>
              <p>
                Ma trận kiểm soát 10 Cảm xúc × 5 Ngữ cảnh. Nhấp vào bất kỳ ô nào để lọc danh sách bên dưới.
              </p>
            </div>
          </div>
          <div className="admin-signal-coverage-actions">
            <span className="admin-signal-coverage-pill">
              {coveredMatrixCells}/{totalMatrixCells} ô có nội dung ({coveragePercent}%)
            </span>
            <button
              type="button"
              className="admin-signal-coverage-toggle"
              onClick={() => setCoverageExpanded(!coverageExpanded)}
              aria-label={coverageExpanded ? "Thu gọn ma trận" : "Mở rộng ma trận"}
            >
              {coverageExpanded ? (
                <>
                  <span>Thu gọn</span>
                  <ChevronUp size={16} />
                </>
              ) : (
                <>
                  <span>Mở rộng</span>
                  <ChevronDown size={16} />
                </>
              )}
            </button>
          </div>
        </div>

        {coverageExpanded && (
          <div className="admin-signal-coverage-scroll">
            <table className="admin-signal-matrix-table">
              <thead>
                <tr>
                  <th className="th-mood">Cảm xúc</th>
                  {checkInCatalog.contexts.map((ctx) => (
                    <th
                      key={ctx.key}
                      className={contextKey === ctx.key ? "is-selected-col" : ""}
                    >
                      {ctx.label}
                    </th>
                  ))}
                  <th className="th-progress">Độ phủ</th>
                </tr>
              </thead>
              <tbody>
                {checkInCatalog.moods.map((m) => {
                  let rowCovered = 0;
                  checkInCatalog.contexts.forEach((c) => {
                    if ((data?.stats.coverage[m.key]?.[c.key] || 0) > 0) rowCovered++;
                  });
                  const rowPercent = Math.round((rowCovered / checkInCatalog.contexts.length) * 100);

                  return (
                    <tr key={m.key} className={mood === m.key ? "is-selected-row" : ""}>
                      <th scope="row" className="td-mood-header">
                        <span className="mood-label-tag">{m.label}</span>
                      </th>
                      {checkInCatalog.contexts.map((ctx) => {
                        const count = data?.stats.coverage[m.key]?.[ctx.key] || 0;
                        const isCurrentActive = mood === m.key && contextKey === ctx.key;

                        return (
                          <td key={ctx.key} className="td-matrix-cell">
                            <button
                              type="button"
                              className={`matrix-cell-btn ${count > 0 ? "is-covered" : "is-empty"} ${isCurrentActive ? "is-active-filter" : ""}`}
                              onClick={() => {
                                setMood(m.key);
                                setContextKey(ctx.key);
                                setPage(1);
                              }}
                              title={`${m.label} · ${ctx.label}: ${count} tín hiệu phát hành (Nhấn để lọc)`}
                            >
                              {count > 0 ? (
                                <span className="cell-count-wrap">
                                  <Check size={11} className="cell-check-icon" />
                                  <strong>{count}</strong>
                                </span>
                              ) : (
                                <span className="cell-empty-dash">—</span>
                              )}
                            </button>
                          </td>
                        );
                      })}
                      <td className="td-progress-cell">
                        <div className="matrix-row-progress-wrap" title={`${rowCovered}/5 ngữ cảnh (${rowPercent}%)`}>
                          <div className="matrix-row-bar-bg">
                            <div
                              className="matrix-row-bar-fill"
                              style={{
                                width: `${rowPercent}%`,
                                background: rowPercent === 100 ? "var(--admin-emerald)" : rowPercent > 0 ? "var(--admin-gold)" : "var(--admin-subtle)",
                              }}
                            />
                          </div>
                          <span className="matrix-row-stat-text">{rowCovered}/5</span>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* 3. STATUS TABS BAR (LINEAR / SAAS WORKSPACE STYLE) */}
      <div className="admin-signal-status-tabs-bar">
        <div className="admin-signal-status-tabs">
          <button
            type="button"
            className={`admin-signal-tab ${status === "all" ? "is-active" : ""}`}
            onClick={() => { setStatus("all"); setPage(1); }}
          >
            <span>Tất cả</span>
            <span className="admin-signal-tab-badge">{totalSignals}</span>
          </button>
          <button
            type="button"
            className={`admin-signal-tab is-draft ${status === "DRAFT" ? "is-active" : ""}`}
            onClick={() => { setStatus("DRAFT"); setPage(1); }}
          >
            <span className="tab-dot dot-draft" />
            <span>Bản nháp</span>
            <span className="admin-signal-tab-badge">{statusCounts.DRAFT || 0}</span>
          </button>
          <button
            type="button"
            className={`admin-signal-tab is-review ${status === "IN_REVIEW" ? "is-active" : ""}`}
            onClick={() => { setStatus("IN_REVIEW"); setPage(1); }}
          >
            <span className="tab-dot dot-review" />
            <span>Chờ duyệt</span>
            <span className="admin-signal-tab-badge">{statusCounts.IN_REVIEW || 0}</span>
          </button>
          <button
            type="button"
            className={`admin-signal-tab is-published ${status === "PUBLISHED" ? "is-active" : ""}`}
            onClick={() => { setStatus("PUBLISHED"); setPage(1); }}
          >
            <span className="tab-dot dot-published" />
            <span>Đang phát hành</span>
            <span className="admin-signal-tab-badge">{statusCounts.PUBLISHED || 0}</span>
          </button>
          <button
            type="button"
            className={`admin-signal-tab is-approved ${status === "APPROVED" || status === "HIDDEN" ? "is-active" : ""}`}
            onClick={() => { setStatus("APPROVED"); setPage(1); }}
          >
            <span className="tab-dot dot-approved" />
            <span>Đã duyệt · ẩn</span>
            <span className="admin-signal-tab-badge">{(statusCounts.APPROVED || 0) + (statusCounts.HIDDEN || 0)}</span>
          </button>
          <button
            type="button"
            className={`admin-signal-tab is-revoked ${status === "REVOKED" ? "is-active" : ""}`}
            onClick={() => { setStatus("REVOKED"); setPage(1); }}
          >
            <span className="tab-dot dot-revoked" />
            <span>Đã thu hồi</span>
            <span className="admin-signal-tab-badge">{statusCounts.REVOKED || 0}</span>
          </button>
        </div>
      </div>

      {/* 4. SEARCH & FILTER TOOLBAR */}
      <div className="admin-signal-toolbar-card">
        <form className="admin-signal-search-box" onSubmit={searchSubmit} role="search">
          <Search size={16} className="admin-signal-search-icon" />
          <input
            aria-label="Tìm lời chiêm nghiệm"
            placeholder="Tìm theo tiêu đề, mã nguồn, nội dung hoặc lời khuyên…"
            value={queryText}
            onChange={(event) => setQueryText(event.target.value)}
          />
          {queryText && (
            <button
              type="button"
              className="admin-signal-search-clear"
              onClick={handleClearSearch}
              aria-label="Xóa từ khóa tìm kiếm"
            >
              <X size={14} />
            </button>
          )}
          <button className="admin-signal-search-submit-btn" type="submit">
            Tìm kiếm
          </button>
        </form>

        <div className="admin-signal-filters-row">
          <div className="admin-signal-select-wrap">
            <span className="select-eyebrow">Cảm xúc:</span>
            <select
              aria-label="Lọc cảm xúc"
              value={mood}
              onChange={(event) => { setMood(event.target.value); setPage(1); }}
            >
              <option value="all">Tất cả cảm xúc (10)</option>
              {checkInCatalog.moods.map((item) => (
                <option key={item.key} value={item.key}>{item.label}</option>
              ))}
            </select>
          </div>

          <div className="admin-signal-select-wrap">
            <span className="select-eyebrow">Ngữ cảnh:</span>
            <select
              aria-label="Lọc ngữ cảnh"
              value={contextKey}
              onChange={(event) => { setContextKey(event.target.value); setPage(1); }}
            >
              <option value="all">Tất cả ngữ cảnh (5)</option>
              {checkInCatalog.contexts.map((item) => (
                <option key={item.key} value={item.key}>{item.label}</option>
              ))}
            </select>
          </div>

          {hasActiveFilters && (
            <button
              type="button"
              className="admin-signal-reset-filters-btn"
              onClick={resetAllFilters}
              title="Đặt lại toàn bộ bộ lọc"
            >
              <RotateCcw size={13} />
              <span>Xóa bộ lọc</span>
            </button>
          )}

          <button
            className="admin-signal-create-cta"
            type="button"
            onClick={() => void openEditor()}
          >
            <Plus size={16} />
            <span>Tạo bản thảo mới</span>
          </button>
        </div>
      </div>

      {/* FEEDBACK BANNERS */}
      {error && (
        <div className="admin-alert" role="alert">
          <div className="admin-alert-content">
            <AlertCircle size={18} />
            <span>{error}</span>
          </div>
          <button type="button" onClick={() => setError("")} aria-label="Đóng thông báo">
            <X size={16} />
          </button>
        </div>
      )}

      {notice && (
        <div className="admin-signal-notice" role="status">
          <div className="notice-inner">
            <CheckCircle2 size={16} className="notice-check-icon" />
            <span>{notice}</span>
          </div>
          <button type="button" onClick={() => setNotice("")} aria-label="Đóng thông báo">
            <X size={15} />
          </button>
        </div>
      )}

      {/* 5. SIGNAL ITEMS LIST (MASTERCLASS EDITORIAL CARDS) */}
      {loading && (
        <div className="admin-empty admin-signal-loading-state">
          <div className="admin-spin-loader" />
          <strong>Đang tải danh sách lời chiêm nghiệm…</strong>
          <span>Đang đồng bộ dữ liệu từ hệ thống phân loại.</span>
        </div>
      )}

      {!loading && items.length === 0 && !error && (
        <div className="admin-empty admin-signal-empty-state">
          <div className="empty-icon-halo">
            <Sparkles size={28} />
          </div>
          <strong>Chưa tìm thấy lời chiêm nghiệm phù hợp</strong>
          <span>
            {hasActiveFilters
              ? "Thử thay đổi hoặc xóa các tiêu chí lọc để xem thêm bản ghi."
              : "Bắt đầu khởi tạo bản thảo lời chiêm nghiệm đầu tiên cho kho tư liệu."}
          </span>
          {hasActiveFilters ? (
            <button type="button" className="admin-secondary-button" onClick={resetAllFilters}>
              <RotateCcw size={14} /> Xóa bộ lọc hiện tại
            </button>
          ) : (
            <button type="button" className="admin-signal-create-cta" onClick={() => void openEditor()}>
              <Plus size={16} /> Tạo bản thảo mới ngay
            </button>
          )}
        </div>
      )}

      {!loading && items.length > 0 && (
        <div className="admin-signal-list">
          {items.map((row) => {
            const content = parseContent(row.content);
            const isFolk = content.metadata.contentKind === "folk";

            return (
              <article className="admin-signal-card" key={row.id}>
                {/* Top Badge Strip */}
                <div className="admin-signal-card-header">
                  <div className="admin-signal-chips-wrap">
                    <span className="signal-chip mood-chip">
                      <Sparkles size={11} /> {moodName(row.mood)}
                    </span>
                    <span className="signal-chip context-chip">
                      <Compass size={11} /> {contextName(row.context_key)}
                    </span>
                    <span className={`signal-chip kind-chip ${isFolk ? "is-folk" : "is-editorial"}`}>
                      {isFolk ? <Quote size={11} /> : <FileText size={11} />}
                      {isFolk ? "Trích dẫn dân gian" : "Biên tập nguyên bản"}
                    </span>
                    <span className={`admin-signal-status-pill is-${cssStatus[row.editorial_status]}`}>
                      <span className="status-glow-dot" />
                      {STATUS_LABELS[row.editorial_status]}
                    </span>
                  </div>

                  <div className="admin-signal-source-badge">
                    <code>{row.source}</code>
                  </div>
                </div>

                {/* Card Title */}
                <h3 className="admin-signal-card-title">
                  {row.title || row.source}
                </h3>

                {/* Card Reflection Quote */}
                <div className="admin-signal-quote-box">
                  <Quote size={20} className="quote-glyph" />
                  <blockquote className="quote-text">
                    {content.reflection.content || "Chưa có lời chiêm nghiệm"}
                  </blockquote>
                </div>

                {/* Sub-advice & Micro-action Preview */}
                {(content.reflection.advice || content.action.title) && (
                  <div className="admin-signal-card-extras">
                    {content.reflection.advice && (
                      <div className="card-extra-item">
                        <span className="extra-label">💡 Lời khuyên:</span>
                        <span className="extra-val">{content.reflection.advice}</span>
                      </div>
                    )}
                    {content.action.title && (
                      <div className="card-extra-item">
                        <span className="extra-label">🎯 Việc nhỏ:</span>
                        <span className="extra-val">
                          <strong>{content.action.title}</strong>
                          {content.action.duration && ` · ${content.action.duration}`}
                        </span>
                      </div>
                    )}
                  </div>
                )}

                {/* Card Footer: Review status & Actions */}
                <div className="admin-signal-card-footer">
                  <div className="admin-signal-meta-info">
                    {row.verified ? (
                      <span className="verified-status-text">
                        <ShieldCheck size={14} className="icon-verified" />
                        <span>
                          Đã thẩm định
                          {row.reviewer?.full_name && ` bởi ${row.reviewer.full_name}`}
                          {row.reviewed_at && (
                            <small>
                              {" "}· {new Intl.DateTimeFormat("vi-VN", { dateStyle: "short" }).format(new Date(row.reviewed_at))}
                            </small>
                          )}
                        </span>
                      </span>
                    ) : (
                      <span className="unverified-status-text">
                        <Clock size={14} />
                        <span>Chưa thẩm định quyền</span>
                      </span>
                    )}
                  </div>

                  <div className="admin-signal-row-actions">
                    <button
                      className="admin-signal-preview-btn"
                      type="button"
                      onClick={() => void openDetail(row.id)}
                    >
                      <Eye size={14} />
                      <span>Xem trước / Phê duyệt</span>
                    </button>
                    <button
                      className="admin-signal-edit-btn"
                      type="button"
                      onClick={() => void openEditor(row.id)}
                    >
                      <Edit3 size={14} />
                      <span>Biên tập</span>
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}

      {/* 6. PAGINATION */}
      {data?.pagination.pageCount && data.pagination.pageCount > 1 && (
        <div className="admin-pagination admin-signal-paginator">
          <button
            type="button"
            className="admin-page-nav-btn"
            disabled={page <= 1 || loading}
            aria-label="Trang trước"
            onClick={() => {
              const next = page - 1;
              setPage(next);
              void loadPage(next);
            }}
          >
            <ChevronLeft size={16} />
            <span>Trang trước</span>
          </button>

          <div className="admin-page-indicator">
            Trang <strong>{page}</strong> / <strong>{data.pagination.pageCount}</strong>
            <span className="total-items-badge">({data.pagination.total} bản ghi)</span>
          </div>

          <button
            type="button"
            className="admin-page-nav-btn"
            disabled={page >= data.pagination.pageCount || loading}
            aria-label="Trang sau"
            onClick={() => {
              const next = page + 1;
              setPage(next);
              void loadPage(next);
            }}
          >
            <span>Trang sau</span>
            <ChevronRight size={16} />
          </button>
        </div>
      )}

      {/* 7. ULTRA-PREMIUM EDITORIAL MODAL STUDIO */}
      {editing && (
        <div
          className="admin-editor-overlay admin-signal-modal-overlay"
          role="dialog"
          aria-modal="true"
          onClick={(e) => {
            if (e.target === e.currentTarget && !saving) setEditing(null);
          }}
        >
          <form
            className="admin-editor-modal admin-signal-editor-modal"
            onSubmit={(event) => void saveDraft(event, editing.form.editorialStatus)}
          >
            <header className="admin-editor-header">
              <div className="admin-editor-header-copy">
                <span className="admin-editor-eyebrow">
                  <Sparkles size={13} /> CHECK-IN · TƯ LIỆU BIÊN TẬP
                </span>
                <h2 className="admin-editor-title">
                  {editing.id ? "Biên tập lời chiêm nghiệm" : "Khởi tạo bản thảo lời chiêm nghiệm"}
                </h2>
                <p className="admin-editor-desc">
                  Biên soạn chuẩn xác nội dung check-in cảm xúc. Mọi lần cập nhật sẽ yêu cầu thẩm định lại trước khi phát hành.
                </p>
              </div>
              <button
                type="button"
                className="admin-editor-close-btn"
                onClick={() => setEditing(null)}
                aria-label="Đóng biểu mẫu"
                disabled={saving}
              >
                <X size={18} />
              </button>
            </header>

            <div className="admin-signal-editor-body">
              {/* Form Grid Area */}
              <div className="admin-signal-form-pane">
                {/* Section 1: Phân loại & Định danh */}
                <fieldset className="admin-form-group">
                  <legend className="group-legend">
                    <Layers size={14} /> 1. Định danh & Phân loại
                  </legend>
                  <div className="admin-signal-editor-grid">
                    <label>
                      <span className="field-title">Mã nguồn ổn định (Slug Key) *</span>
                      <input
                        required
                        pattern="[a-z0-9]+(?:[-_][a-z0-9]+)*"
                        maxLength={120}
                        disabled={Boolean(editing.id)}
                        placeholder="vd: an-yen-1-context-family"
                        value={editing.form.source}
                        onChange={(event) => setFormField("source", event.target.value)}
                      />
                    </label>

                    <label>
                      <span className="field-title">Tiêu đề bản ghi *</span>
                      <input
                        required
                        maxLength={255}
                        placeholder="vd: An yên bên người thân"
                        value={editing.form.title}
                        onChange={(event) => setFormField("title", event.target.value)}
                      />
                    </label>

                    <label>
                      <span className="field-title">Cảm xúc liên kết</span>
                      <select
                        value={editing.form.mood}
                        onChange={(event) => setFormField("mood", event.target.value)}
                      >
                        {checkInCatalog.moods.map((item) => (
                          <option key={item.key} value={item.key}>{item.label}</option>
                        ))}
                      </select>
                    </label>

                    <label>
                      <span className="field-title">Ngữ cảnh check-in</span>
                      <select
                        value={editing.form.contextKey}
                        onChange={(event) => setFormField("contextKey", event.target.value)}
                      >
                        {checkInCatalog.contexts.map((item) => (
                          <option key={item.key} value={item.key}>{item.label}</option>
                        ))}
                      </select>
                    </label>

                    <label>
                      <span className="field-title">Loại nội dung</span>
                      <select
                        value={editing.form.content.metadata.contentKind}
                        onChange={(event) => {
                          const kind = event.target.value as "editorial" | "folk";
                          setMetaField("contentKind", kind);
                          setMetaField("contentType", kind === "folk" ? "QUOTATION" : "GROUP_AUTHORED");
                          setMetaField("quotationVerified", false);
                        }}
                      >
                        <option value="editorial">Nguyên bản do nhóm biên soạn</option>
                        <option value="folk">Trích dẫn dân gian</option>
                      </select>
                    </label>

                    <label>
                      <span className="field-title">Người / nhóm biên soạn</span>
                      <input
                        maxLength={300}
                        placeholder="vd: Ban Biên Tập Tín Lâm"
                        value={editing.form.content.metadata.contentAuthor}
                        onChange={(event) => setMetaField("contentAuthor", event.target.value)}
                      />
                    </label>

                    {editing.form.content.metadata.contentKind === "folk" && (
                      <label className="admin-signal-wide">
                        <span className="field-title">Cộng đồng / xuất xứ</span>
                        <input
                          maxLength={300}
                          placeholder="vd: Tục ngữ ca dao Đồng bằng Bắc Bộ"
                          value={editing.form.content.metadata.originCommunity}
                          onChange={(event) => setMetaField("originCommunity", event.target.value)}
                        />
                      </label>
                    )}
                  </div>
                </fieldset>

                {/* Section 2: Nội dung chiêm nghiệm */}
                <fieldset className="admin-form-group">
                  <legend className="group-legend">
                    <Quote size={14} /> 2. Thông điệp chiêm nghiệm
                  </legend>
                  <div className="admin-signal-editor-grid">
                    <label className="admin-signal-wide">
                      <span className="field-title">Lời chiêm nghiệm chính *</span>
                      <textarea
                        required
                        rows={4}
                        maxLength={10000}
                        placeholder="Câu văn chiêm nghiệm gợi mở bình an trong tâm..."
                        value={editing.form.content.reflection.content}
                        onChange={(event) => setReflectionField("content", event.target.value)}
                      />
                    </label>

                    <label className="admin-signal-wide">
                      <span className="field-title">Câu hỏi tự ngẫm / Lời khuyên *</span>
                      <textarea
                        required
                        rows={2}
                        maxLength={3000}
                        placeholder="vd: Bạn có thể dành ra 5 phút để nhìn lại điều này không?"
                        value={editing.form.content.reflection.advice}
                        onChange={(event) => setReflectionField("advice", event.target.value)}
                      />
                    </label>
                  </div>
                </fieldset>

                {/* Section 3: Hành động nhỏ tùy chọn */}
                <fieldset className="admin-form-group">
                  <legend className="group-legend">
                    <Compass size={14} /> 3. Hành động nhỏ tùy chọn
                  </legend>
                  <div className="admin-signal-editor-grid">
                    <label>
                      <span className="field-title">Tiêu đề việc nhỏ *</span>
                      <input
                        required
                        maxLength={255}
                        placeholder="vd: Uống một ngụm nước ấm"
                        value={editing.form.content.action.title}
                        onChange={(event) => setActionField("title", event.target.value)}
                      />
                    </label>

                    <label>
                      <span className="field-title">Thời lượng gợi ý</span>
                      <input
                        maxLength={120}
                        placeholder="vd: 2 phút"
                        value={editing.form.content.action.duration}
                        onChange={(event) => setActionField("duration", event.target.value)}
                      />
                    </label>

                    <label className="admin-signal-wide">
                      <span className="field-title">Mô tả hành động thực hiện *</span>
                      <textarea
                        required
                        rows={2}
                        maxLength={3000}
                        placeholder="Hướng dẫn bạn đọc thực hiện một việc bình dị để lắng tâm..."
                        value={editing.form.content.action.description}
                        onChange={(event) => setActionField("description", event.target.value)}
                      />
                    </label>
                  </div>
                </fieldset>

                {/* Section 4: Căn cứ quyền sử dụng & Nguồn */}
                <fieldset className="admin-form-group">
                  <legend className="group-legend">
                    <ShieldCheck size={14} /> 4. Căn cứ bản quyền & Hồ sơ nguồn
                  </legend>
                  <div className="admin-signal-editor-grid">
                    <label className="admin-signal-wide">
                      <span className="field-title">Căn cứ quyền sử dụng</span>
                      <textarea
                        rows={2}
                        maxLength={1000}
                        value={editing.form.content.metadata.contentRightsBasis}
                        onChange={(event) => setMetaField("contentRightsBasis", event.target.value)}
                        placeholder="Ghi căn cứ thực tế; để trống nếu chưa xác minh."
                      />
                    </label>

                    {editing.form.content.metadata.contentKind === "folk" && (
                      <>
                        <label className="admin-signal-wide">
                          <span className="field-title">Hồ sơ nguồn (JSON array)</span>
                          <textarea
                            rows={3}
                            value={sourcesText}
                            onChange={(event) => setSourcesText(event.target.value)}
                            placeholder='[{"title":"Kho tàng ca dao tục ngữ","url":"https://…","locator":"tr. 142"}]'
                          />
                        </label>
                        <label className="admin-signal-checkbox admin-signal-wide">
                          <input
                            type="checkbox"
                            checked={editing.form.content.metadata.quotationVerified}
                            onChange={(event) => setMetaField("quotationVerified", event.target.checked)}
                          />
                          <span>Đã đối chiếu nguyên văn với hồ sơ nguồn thực tế.</span>
                        </label>
                      </>
                    )}

                    <label className="admin-signal-wide">
                      <span className="field-title">Ghi chú biên tập nội bộ</span>
                      <textarea
                        rows={2}
                        maxLength={1000}
                        value={editorialNote}
                        onChange={(event) => {
                          setEditorialNote(event.target.value);
                          setMetaField("editorialNote", event.target.value);
                        }}
                        placeholder="Ghi chú nội bộ cho người kiểm duyệt..."
                      />
                    </label>

                    <label className="admin-signal-wide">
                      <span className="field-title">Ghi chú lưu / gửi duyệt (tối thiểu 8 ký tự) *</span>
                      <textarea
                        required
                        rows={2}
                        minLength={8}
                        maxLength={500}
                        value={editing.form.reviewNote}
                        onChange={(event) => setFormField("reviewNote", event.target.value)}
                        placeholder="Nội dung điều chỉnh trong phiên bản này..."
                      />
                    </label>
                  </div>
                </fieldset>
              </div>

              {/* Right: Live Customer Card Mockup */}
              <div className="admin-signal-live-preview-pane">
                <div className="live-preview-sticky">
                  <div className="live-preview-header">
                    <Sparkles size={14} className="preview-sparkle" />
                    <strong>Trải nghiệm khách hàng thực tế</strong>
                  </div>

                  <div className="sacred-client-card">
                    <div className="client-card-inner">
                      <div className="client-card-tags">
                        <span className="client-mood-chip">
                          {moodName(editing.form.mood)}
                        </span>
                        <span className="client-context-chip">
                          {contextName(editing.form.contextKey)}
                        </span>
                      </div>

                      <div className="client-quote-mark">“</div>
                      <p className="client-quote-text">
                        {editing.form.content.reflection.content || "Nội dung lời chiêm nghiệm sẽ hiển thị tại đây khi bạn nhập vào biểu mẫu..."}
                      </p>

                      {editing.form.content.reflection.advice && (
                        <div className="client-advice-box">
                          <p>{editing.form.content.reflection.advice}</p>
                        </div>
                      )}

                      {editing.form.content.action.title && (
                        <div className="client-action-card">
                          <div className="action-card-header">
                            <Compass size={14} />
                            <strong>{editing.form.content.action.title}</strong>
                            {editing.form.content.action.duration && (
                              <span className="action-duration">{editing.form.content.action.duration}</span>
                            )}
                          </div>
                          <p className="action-card-desc">{editing.form.content.action.description}</p>
                        </div>
                      )}

                      <div className="client-card-provenance">
                        <small>
                          {editing.form.content.metadata.contentKind === "folk"
                            ? "Trích dẫn dân gian"
                            : "Biên tập bởi " + (editing.form.content.metadata.contentAuthor || "Tín Lâm Tâm Linh")}
                          {editing.form.content.metadata.originCommunity && ` · ${editing.form.content.metadata.originCommunity}`}
                        </small>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <footer className="admin-editor-footer">
              <button
                type="button"
                className="admin-secondary-button"
                onClick={() => setEditing(null)}
                disabled={saving}
              >
                Hủy bỏ
              </button>
              <div className="editor-footer-right">
                <button
                  type="button"
                  className="admin-editor-action-btn is-draft"
                  disabled={saving}
                  onClick={(event) => void saveDraft(event, "DRAFT")}
                >
                  {saving ? "Đang lưu…" : "Lưu bản nháp"}
                </button>
                <button
                  type="button"
                  className="admin-editor-action-btn is-submit"
                  disabled={saving}
                  onClick={(event) => void saveDraft(event, "IN_REVIEW")}
                >
                  <Send size={15} />
                  <span>{saving ? "Đang gửi…" : "Gửi duyệt thẩm định"}</span>
                </button>
              </div>
            </footer>
          </form>
        </div>
      )}

      {/* 8. DETAIL / APPROVAL & AUDIT MODAL */}
      {(selected || detailLoading) && (
        <div
          className="admin-editor-overlay admin-signal-modal-overlay"
          role="dialog"
          aria-modal="true"
          onClick={(e) => {
            if (e.target === e.currentTarget && !saving) setSelected(null);
          }}
        >
          <div className="admin-editor-modal admin-signal-detail-modal">
            <header className="admin-editor-header">
              <div className="admin-editor-header-copy">
                <span className="admin-editor-eyebrow">
                  <ShieldCheck size={13} /> HỒ SƠ & THẨM ĐỊNH NỘI DUNG
                </span>
                <h2 className="admin-editor-title">
                  {detailLoading ? "Đang tải hồ sơ…" : selected?.title || selected?.source}
                </h2>
                {selected && (
                  <div className="admin-signal-detail-chips">
                    <span className="signal-chip mood-chip">{moodName(selected.mood)}</span>
                    <span className="signal-chip context-chip">{contextName(selected.context_key)}</span>
                    <span className={`admin-signal-status-pill is-${cssStatus[selected.editorial_status]}`}>
                      {STATUS_LABELS[selected.editorial_status]}
                    </span>
                    <code>{selected.source}</code>
                  </div>
                )}
              </div>
              <button
                type="button"
                className="admin-editor-close-btn"
                onClick={() => setSelected(null)}
                aria-label="Đóng hồ sơ"
                disabled={saving}
              >
                <X size={18} />
              </button>
            </header>

            {selected && selectedContent && (
              <div className="admin-signal-detail-body">
                {/* Customer View Parchment */}
                <div className="detail-section-title">
                  <Eye size={15} /> Giao diện hiển thị tới khách hàng
                </div>
                <div className="sacred-client-card detail-card-mode">
                  <div className="client-card-inner">
                    <div className="client-card-tags">
                      <span className="client-mood-chip">{moodName(selected.mood)}</span>
                      <span className="client-context-chip">{contextName(selected.context_key)}</span>
                    </div>

                    {selectedContent.poem.line1 && (
                      <p className="client-poem">
                        {selectedContent.poem.line1}<br />{selectedContent.poem.line2}
                      </p>
                    )}

                    <div className="client-quote-mark">“</div>
                    <blockquote className="client-quote-text">
                      {selectedContent.reflection.content}
                    </blockquote>

                    {selectedContent.reflection.advice && (
                      <div className="client-advice-box">
                        <p>{selectedContent.reflection.advice}</p>
                      </div>
                    )}

                    {selectedContent.action.title && (
                      <div className="client-action-card">
                        <div className="action-card-header">
                          <Compass size={14} />
                          <strong>{selectedContent.action.title}</strong>
                          {selectedContent.action.duration && (
                            <span className="action-duration">{selectedContent.action.duration}</span>
                          )}
                        </div>
                        <p className="action-card-desc">{selectedContent.action.description}</p>
                      </div>
                    )}

                    <div className="client-card-provenance">
                      <strong>Thông tin nguồn / loại nội dung:</strong>
                      <p>
                        {selectedContent.metadata.contentAuthor || "Chưa ghi người biên soạn"} · {selectedContent.metadata.contentRightsBasis || "Chưa ghi căn cứ quyền sử dụng"}
                      </p>
                      {selectedContent.metadata.originCommunity && (
                        <p>Xuất xứ: {selectedContent.metadata.originCommunity}</p>
                      )}
                      {selectedContent.metadata.sources.map((src, index) => (
                        <p key={(src.id || src.url) + index}>
                          {src.title} · {src.locator} ·{" "}
                          <a href={src.url} target="_blank" rel="noreferrer" className="provenance-link">
                            {src.url} <ExternalLink size={11} />
                          </a>
                        </p>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Review & Transition Controls Panel */}
                <div className="admin-signal-review-panel">
                  <div className="detail-section-title">
                    <ShieldAlert size={15} /> Thao tác phê duyệt & điều chuyển trạng thái
                  </div>

                  <label className="admin-signal-review-note-label">
                    <span className="field-title">Ghi chú thao tác biên tập (tối thiểu 8 ký tự) *</span>
                    <textarea
                      rows={2}
                      minLength={8}
                      maxLength={500}
                      value={reviewNote}
                      onChange={(event) => setReviewNote(event.target.value)}
                      placeholder="Ghi rõ nội dung đã thẩm định, đối chiếu nguồn hoặc lý do thay đổi trạng thái..."
                    />
                  </label>

                  <label className="admin-signal-checkbox-styled">
                    <input
                      type="checkbox"
                      checked={rightsConfirmed}
                      onChange={(event) => setRightsConfirmed(event.target.checked)}
                    />
                    <span>Tôi xác nhận đã đối chiếu kỹ lưỡng căn cứ quyền sử dụng và tính chuẩn xác của nội dung.</span>
                  </label>

                  <div className="admin-signal-action-buttons-strip">
                    {!selected.verified && selected.editorial_status === "IN_REVIEW" && (
                      <button
                        type="button"
                        className="btn-action-primary is-approve"
                        disabled={saving}
                        onClick={() => void transition({ verified: true })}
                      >
                        <ShieldCheck size={16} /> Duyệt phiên bản này
                      </button>
                    )}
                    {selected.verified && !selected.active && (
                      <button
                        type="button"
                        className="btn-action-primary is-publish"
                        disabled={saving}
                        onClick={() => void transition({ active: true })}
                      >
                        <Eye size={16} /> Xuất bản / Phát hành
                      </button>
                    )}
                    {selected.active && (
                      <button
                        type="button"
                        className="btn-action-secondary is-hide"
                        disabled={saving}
                        onClick={() => void transition({ active: false })}
                      >
                        <EyeOff size={16} /> Tạm ẩn khỏi bạn đọc
                      </button>
                    )}
                    {selected.verified && (
                      <button
                        type="button"
                        className="btn-action-danger"
                        disabled={saving}
                        onClick={() => void transition({ verified: false })}
                      >
                        Thu hồi phê duyệt
                      </button>
                    )}
                    <button
                      type="button"
                      className="admin-secondary-button"
                      onClick={() => void openEditor(selected.id)}
                    >
                      <Edit3 size={15} /> Sửa nội dung
                    </button>
                  </div>
                </div>

                {/* Audit Trail Timeline */}
                <div className="admin-signal-audit-panel">
                  <div className="detail-section-title">
                    <FileClock size={15} /> Nhật ký kiểm duyệt & thao tác ({selected.auditLogs?.length || 0})
                  </div>
                  {selected.auditLogs?.length ? (
                    <div className="audit-timeline">
                      {selected.auditLogs.map((log) => (
                        <div className="audit-timeline-item" key={log.id}>
                          <div className="audit-timeline-badge">
                            <User size={13} />
                          </div>
                          <div className="audit-timeline-content">
                            <div className="audit-header">
                              <strong>{log.users?.full_name || "Quản trị viên"}</strong>
                              <span className="audit-action-chip">{log.action}</span>
                              <time className="audit-time">
                                {new Intl.DateTimeFormat("vi-VN", { dateStyle: "medium", timeStyle: "short" }).format(new Date(log.created_at))}
                              </time>
                            </div>
                            {Boolean(log.details.reviewNote) && (
                              <p className="audit-note">{String(log.details.reviewNote)}</p>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="audit-empty-text">Chưa có thao tác nào được ghi nhận cho bản ghi này.</div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
