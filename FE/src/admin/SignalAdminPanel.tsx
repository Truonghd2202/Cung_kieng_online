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
  Copy,
  Edit3,
  ExternalLink,
  Eye,
  EyeOff,
  FileClock,
  FileText,
  Filter,
  Grid,
  Layers,
  LayoutGrid,
  List,
  Moon,
  Plus,
  Quote,
  RotateCcw,
  Search,
  Send,
  ShieldAlert,
  ShieldCheck,
  Sparkle,
  Sparkles,
  Sun,
  User,
  X,
} from "lucide-react";
import checkInCatalog from "../../../shared/checkin-catalog.json";
import { apiRequest } from "../lib/api";
import { closeAdminOverlay, pushAdminOverlay } from "./adminNavigation";
import { toast } from "../components/ui/Toast";
import { WithdrawModal } from "./WithdrawModal";
import { useTheme } from "../hooks/useTheme";

type EditorialStatus = "DRAFT" | "IN_REVIEW" | "APPROVED" | "PUBLISHED" | "HIDDEN" | "REVOKED";
type SourceRecord = { id?: string; title: string; authorOrOrganization?: string; url: string; bibliographicReference?: string; locator: string; accessedOn?: string };
type SignalContent = {
  metadata: { contentKind: "editorial" | "folk"; contentType: "GROUP_AUTHORED" | "QUOTATION"; contentAuthor: string; contentRightsBasis: string; originCommunity: string; sources: SourceRecord[]; quotationVerified: boolean; editorialNote: string; [key: string]: unknown };
  moodDesc: string; badge: string;
  poem: { line1: string; line2: string; subtext: string; [key: string]: unknown };
  research: { title: string; source: string; region: string; note: string; [key: string]: unknown };
  reflection: { title: string; highlightWord: string; content: string; advice: string; signalNumber: string; [key: string]: unknown };
  action: { title: string; duration: string; description: string; buttonLabel: string; tag: string; [key: string]: unknown };
  artwork?: { image: string; caption?: string; [key: string]: unknown };
  [key: string]: unknown;
};
type SignalRow = { id: string; source: string; title: string | null; mood: string | null; context_key: string | null; category: string | null; content: string | SignalContent; editorial_status: EditorialStatus; active: boolean; verified: boolean; updated_at: string; submitted_by?: string | null; editor_feedback?: string | null; reviewed_at?: string | null; reviewer?: { full_name: string } | null };
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
    artwork: { image: "", caption: "" },
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
  const artwork = part("artwork");
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
    artwork: { image: String(artwork.image || ""), caption: String(artwork.caption || "") },
  };
}

function moodName(key: string | null) { return checkInCatalog.moods.find((item) => item.key === key)?.label || key || "Chưa rõ"; }
function contextName(key: string | null) {
  if (key === "general") return "Đời sống chung";
  return checkInCatalog.contexts.find((item) => item.key === key)?.label || key || "Chưa rõ";
}
function newDraft(): DraftForm { return { source: "", title: "", mood: checkInCatalog.moods[0].key, contextKey: "general", category: "editorial", editorialStatus: "DRAFT", reviewNote: "", content: emptyContent() }; }

export function SignalAdminPanel({ canReview = true }: { canReview?: boolean }) {
  const { dark, toggleTheme } = useTheme();
  const [data, setData] = useState<SignalPage | null>(null);
  const [items, setItems] = useState<SignalRow[]>([]);
  const [page, setPage] = useState(1);
  const [queryText, setQueryText] = useState("");
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<EditorialStatus | "all">(() => {
    const requested = new URLSearchParams(window.location.search).get("status");
    return requested && STATUSES.includes(requested as EditorialStatus) ? requested as EditorialStatus : "all";
  });
  const [mood, setMood] = useState("all");
  const [contextKey, setContextKey] = useState("all");
  const [viewMode, setViewMode] = useState<"table" | "grid">("table");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const initialParams = typeof window !== "undefined" ? new URLSearchParams(window.location.search) : null;
  const initialEditId = initialParams?.get("signalEdit") || null;
  const initialDetailId = initialParams?.get("signalDetail") || null;

  const [editing, setEditing] = useState<{ id?: string; expectedUpdatedAt?: string; form: DraftForm; loading?: boolean } | null>(
    initialEditId && !canReview
      ? {
          id: initialEditId === "new" ? undefined : initialEditId,
          form: newDraft(),
          loading: initialEditId !== "new",
        }
      : null
  );
  const [sourcesText, setSourcesText] = useState("[]");
  const [editorialNote, setEditorialNote] = useState("");
  const [showLivePreview, setShowLivePreview] = useState(true);
  const [selected, setSelected] = useState<(SignalRow & { auditLogs?: AuditRow[] }) | null>(
    initialDetailId
      ? ({
          id: initialDetailId,
          source: "",
          title: "Đang tải hồ sơ…",
          mood: "general",
          context_key: "general",
          category: "editorial",
          content: emptyContent(),
          editorial_status: "DRAFT",
          active: false,
          verified: false,
          updated_at: "",
        } as unknown as SignalRow & { auditLogs?: AuditRow[] })
      : null
  );
  const [detailLoading, setDetailLoading] = useState(Boolean(initialDetailId));
  const [reviewNote, setReviewNote] = useState("");
  const [rightsConfirmed, setRightsConfirmed] = useState(false);
  const [saving, setSaving] = useState(false);
  const [showWithdrawOwn, setShowWithdrawOwn] = useState(false);
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

  useEffect(() => {
    const url = new URL(window.location.href);
    if (status === "all") url.searchParams.delete("status");
    else url.searchParams.set("status", status);
    window.history.replaceState({ ...window.history.state }, "", `${url.pathname}${url.search}${url.hash}`);
  }, [status]);

  const closeEditor = useCallback(() => {
    setEditing(null);
    const url = new URL(window.location.href);
    url.searchParams.delete("signalEdit");
    window.history.replaceState({}, "", `${url.pathname}${url.search}${url.hash}`);
  }, []);

  const closeDetail = useCallback(() => {
    setSelected(null);
    const url = new URL(window.location.href);
    url.searchParams.delete("signalDetail");
    window.history.replaceState({}, "", `${url.pathname}${url.search}${url.hash}`);
  }, []);

  const openDetail = useCallback(async (id: string, updateUrl = true) => {
    if (updateUrl) {
      const url = new URL(window.location.href);
      url.searchParams.set("signalDetail", id);
      url.searchParams.delete("signalEdit");
      window.history.pushState({}, "", `${url.pathname}${url.search}${url.hash}`);
    }

    setDetailLoading(true); setError("");
    try {
      const result = await apiRequest<SignalRow & { auditLogs: AuditRow[] }>("/admin/signals/" + encodeURIComponent(id));
      setSelected(result); setReviewNote(""); setRightsConfirmed(false);
    } catch (loadError) {
      const errUrl = new URL(window.location.href);
      errUrl.searchParams.delete("signalDetail");
      window.history.replaceState({}, "", `${errUrl.pathname}${errUrl.search}${errUrl.hash}`);
      setError(loadError instanceof Error ? loadError.message : "Không tải được hồ sơ.");
    }
    finally { setDetailLoading(false); }
  }, []);

  const openEditor = useCallback(async (id?: string, initialMood?: string, initialContext?: string, updateUrl = true) => {
    if (canReview) return;
    setError("");
    if (updateUrl) {
      const url = new URL(window.location.href);
      url.searchParams.set("signalEdit", id || "new");
      url.searchParams.delete("signalDetail");
      window.history.pushState({}, "", `${url.pathname}${url.search}${url.hash}`);
    }

    if (!id || id === "new") {
      const form = newDraft();
      if (initialMood) form.mood = initialMood;
      if (initialContext) form.contextKey = initialContext;
      setSourcesText("[]");
      setEditorialNote("");
      setEditing({ form, loading: false });
      return;
    }

    try {
      const row = await apiRequest<SignalRow>("/admin/signals/" + encodeURIComponent(id));
      const content = parseContent(row.content);
      setSourcesText(JSON.stringify(content.metadata.sources, null, 2));
      setEditorialNote(content.metadata.editorialNote);
      setEditing({
        id,
        expectedUpdatedAt: row.updated_at,
        form: {
          source: row.source,
          title: row.title || "",
          mood: row.mood || checkInCatalog.moods[0].key,
          contextKey: row.context_key || "general",
          category: row.category || "editorial",
          editorialStatus: "DRAFT",
          reviewNote: "",
          content,
        },
        loading: false,
      });
    } catch (loadError) {
      const errUrl = new URL(window.location.href);
      errUrl.searchParams.delete("signalEdit");
      window.history.replaceState({}, "", `${errUrl.pathname}${errUrl.search}${errUrl.hash}`);
      setError(loadError instanceof Error ? loadError.message : "Không tải được bản thảo.");
      setEditing(null);
    }
  }, [canReview]);

  // Đọc URL ban đầu để fetch data cho modal mà không chớp màn hình nền
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const detailId = params.get("signalDetail");
    const editId = params.get("signalEdit");
    if (detailId) {
      void openDetail(detailId, false);
    } else if (editId && !canReview) {
      void openEditor(editId, undefined, undefined, false);
    }
  }, [canReview, openDetail, openEditor]);

  // Lắng nghe nút Back/Forward của trình duyệt
  useEffect(() => {
    const handlePopState = () => {
      const params = new URLSearchParams(window.location.search);
      const editId = params.get("signalEdit");
      const detailId = params.get("signalDetail");
      if (editId && !canReview) {
        void openEditor(editId, undefined, undefined, false);
      } else {
        setEditing(null);
      }
      if (detailId) {
        void openDetail(detailId, false);
      } else {
        setSelected(null);
      }
    };
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, [canReview, openDetail, openEditor]);

  // Lắng nghe sự kiện đổi tab / thoát modal từ sidebar hoặc phím Escape
  useEffect(() => {
    const handleCloseFromEvent = () => {
      setEditing(null);
      setSelected(null);
      const url = new URL(window.location.href);
      url.searchParams.delete("signalEdit");
      url.searchParams.delete("signalDetail");
      window.history.replaceState({}, "", `${url.pathname}${url.search}${url.hash}`);
    };
    window.addEventListener("admin:close-modals", handleCloseFromEvent);
    return () => window.removeEventListener("admin:close-modals", handleCloseFromEvent);
  }, []);

  useEffect(() => {
    const handleNewSignal = () => {
      if (!canReview) void openEditor();
    };
    window.addEventListener("admin:signal-new", handleNewSignal);
    return () => window.removeEventListener("admin:signal-new", handleNewSignal);
  }, [canReview, openEditor]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (editing && !saving) closeEditor();
        else if (selected && !saving) closeDetail();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [editing, selected, saving, closeEditor, closeDetail]);

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
  function setPoemField(key: keyof SignalContent["poem"], value: string) {
    setEditing((current) => current ? { ...current, form: { ...current.form, content: { ...current.form.content, poem: { ...current.form.content.poem, [key]: value } } } } : current);
  }
  function setArtworkField(key: "image" | "caption", value: string) {
    setEditing((current) => current ? { ...current, form: { ...current.form, content: { ...current.form.content, artwork: { ...(current.form.content.artwork || { image: "", caption: "" }), [key]: value } } } } : current);
  }
  function setResearchField(key: keyof SignalContent["research"], value: string) {
    setEditing((current) => current ? { ...current, form: { ...current.form, content: { ...current.form.content, research: { ...current.form.content.research, [key]: value } } } } : current);
  }
  function setBadgeField(value: string) {
    setEditing((current) => current ? { ...current, form: { ...current.form, content: { ...current.form.content, badge: value } } } : current);
  }

  async function saveDraft(event: FormEvent<HTMLFormElement> | MouseEvent<HTMLButtonElement>, nextStatus: "DRAFT" | "IN_REVIEW") {
    event.preventDefault();
    if (!editing || canReview) return;
    let sources: SourceRecord[];
    try {
      const parsed: unknown = JSON.parse(sourcesText);
      if (!Array.isArray(parsed)) throw new Error("Hồ sơ nguồn phải là JSON array.");
      sources = parsed as SourceRecord[];
    } catch (parseError) { setError(parseError instanceof Error ? parseError.message : "Hồ sơ nguồn không hợp lệ."); return; }
    const content: SignalContent = { ...editing.form.content, metadata: { ...editing.form.content.metadata, contentType: editing.form.content.metadata.contentKind === "folk" ? "QUOTATION" : "GROUP_AUTHORED", sources, editorialNote, ...(editing.form.content.metadata.contentKind === "editorial" ? { quotationVerified: false } : {}) } };
    const body = { ...editing.form, editorialStatus: nextStatus, content, ...(editing.id ? { expectedUpdatedAt: editing.expectedUpdatedAt } : {}) };
    setSaving(true); setError("");
    try {
      await apiRequest<SignalRow>(editing.id ? "/admin/signals/" + encodeURIComponent(editing.id) : "/admin/signals", { method: editing.id ? "PUT" : "POST", body: JSON.stringify(body) });
      const signalTitle = editing.form.title || "Lời chiêm nghiệm";
      closeEditor();
      setNotice(nextStatus === "IN_REVIEW" ? "Đã gửi bản thảo chờ duyệt." : "Đã lưu bản nháp.");
      if (nextStatus === "IN_REVIEW") {
        toast.success(`Lời chiêm nghiệm "${signalTitle}" đã được gửi lên hàng đợi chờ duyệt.`, "Gửi duyệt thành công");
      } else {
        toast.success(`Lời chiêm nghiệm "${signalTitle}" đã được lưu trữ thành công.`, "Đã lưu bản nháp");
      }
      setPage(1); await loadPage(1);
      if (selected) await openDetail(selected.id);
    } catch (saveError) {
      const msg = saveError instanceof Error ? saveError.message : "Không lưu được bản thảo.";
      setError(msg);
      toast.error(msg, "Lưu không thành công");
    }
    finally { setSaving(false); }
  }

  async function transition(patch: { verified?: boolean; active?: boolean }) {
    if (!selected) return;
    if (reviewNote.trim().length < 8) { setError("Ghi chú thao tác cần tối thiểu 8 ký tự."); return; }
    if (patch.verified === true && !rightsConfirmed) { setError("Cần xác nhận đã đối chiếu quyền sử dụng thực tế trước khi duyệt."); return; }
    setSaving(true); setError("");
    try {
      await apiRequest<SignalRow>("/admin/signals/" + encodeURIComponent(selected.id) + "/review", { method: "PATCH", body: JSON.stringify({ ...patch, expectedUpdatedAt: selected.updated_at, reviewNote, ...(patch.verified === true ? { rightsConfirmed } : {}) }) });
      setNotice(patch.verified === true ? "Đã duyệt phiên bản nội dung hiện tại." : patch.verified === false ? "Đã thu hồi duyệt và gỡ nội dung khỏi phát hành." : patch.active === false ? "Đã ẩn nội dung; hồ sơ duyệt được giữ nguyên." : "Đã phát hành lại phiên bản đã duyệt.");
      if (patch.verified === true) {
        toast.success(`Đã thẩm định và phê duyệt lời chiêm nghiệm: "${selected.title}"`, "Phê duyệt hoàn tất");
      } else if (patch.verified === false) {
        toast.info(`Đã thu hồi phê duyệt của lời chiêm nghiệm: "${selected.title}"`, "Thu hồi phê duyệt");
      } else if (patch.active === true) {
        toast.success(`Lời chiêm nghiệm "${selected.title}" đã được công khai trên hệ thống.`, "Công khai thành công");
      } else if (patch.active === false) {
        toast.info(`Lời chiêm nghiệm "${selected.title}" đã được tạm ẩn khỏi bạn đọc.`, "Đã ẩn nội dung");
      }
      setReviewNote(""); setRightsConfirmed(false); await loadPage(page); await openDetail(selected.id);
    } catch (reviewError) {
      const msg = reviewError instanceof Error ? reviewError.message : "Không cập nhật được trạng thái.";
      setError(msg);
      toast.error(msg, "Thao tác không thành công");
    }
    finally { setSaving(false); }
  }

  async function returnToDraftFromDetail() {
    if (!selected) return;
    if (reviewNote.trim().length < 8) { setError("Nhập lý do yêu cầu chỉnh sửa (ít nhất 8 ký tự)."); return; }
    setSaving(true); setError("");
    try {
      await apiRequest<SignalRow>("/admin/signals/" + encodeURIComponent(selected.id) + "/review", {
        method: "PATCH",
        body: JSON.stringify({ requestChanges: true, reviewNote: reviewNote.trim(), expectedUpdatedAt: selected.updated_at }),
      });
      setNotice("Đã trả bản ghi về trạng thái Bản nháp.");
      toast.info(`Đã chuyển lời chiêm nghiệm "${selected.title}" về bản nháp để chỉnh sửa.`, "Yêu cầu chỉnh sửa");
      setReviewNote("");
      await loadPage(page);
      await openDetail(selected.id);
    } catch (returnError) {
      const msg = returnError instanceof Error ? returnError.message : "Không thể chuyển trạng thái.";
      setError(msg);
      toast.error(msg, "Lỗi cập nhật");
    } finally {
      setSaving(false);
    }
  }

  function withdrawOwnSignal() {
    setShowWithdrawOwn(true);
  }

  async function confirmWithdrawOwnSignal(reason: string) {
    if (!selected) return;
    setSaving(true); setError("");
    try {
      await apiRequest<SignalRow>("/admin/signals/" + encodeURIComponent(selected.id) + "/withdraw", {
        method: "POST",
        body: JSON.stringify({ expectedUpdatedAt: selected.updated_at, reviewNote: reason }),
      });
      setNotice("Đã rút nội dung về Bản nháp.");
      toast.success(`Đã chuyển lời chiêm nghiệm "${selected.title}" về bản nháp.`, "Rút bài thành công");
      setShowWithdrawOwn(false);
      await loadPage(page);
      await openDetail(selected.id);
    } catch (withdrawError) {
      const msg = withdrawError instanceof Error ? withdrawError.message : "Không thể rút nội dung về bản nháp.";
      setError(msg);
      toast.error(msg, "Lỗi rút bài");
      throw withdrawError;
    } finally {
      setSaving(false);
    }
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
    <section className={`admin-signal-panel ${canReview ? "" : "is-editor-mode"}`} aria-label="Quản trị lời chiêm nghiệm" aria-busy={loading}>
      {/* 1. EXECUTIVE KPI DECK */}
      <div className="admin-content-deck admin-signal-deck">
        <div className="admin-deck-stat-card">
          <span className="deck-eyebrow">TỔNG LỜI CHIÊM NGHIỆM</span>
          <div className="deck-main-num">
            <strong>{totalSignals.toLocaleString("vi-VN")}</strong>
            <small>lời chiêm nghiệm</small>
          </div>
          <div className="deck-progress">
            <div className="deck-progress-bar" style={{ width: "100%", background: "var(--admin-gold)" }} />
          </div>
          <span className="deck-sub">Toàn bộ kho dữ liệu chiêm nghiệm tâm an</span>
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
                      {ctx.key === "general" ? "Đời sống chung" : ctx.label}
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
                                if (isCurrentActive) {
                                  // Click lại chính ô đang chọn => Hủy chọn (bỏ lọc)
                                  setMood("all");
                                  setContextKey("all");
                                } else {
                                  setMood(m.key);
                                  setContextKey(ctx.key);
                                }
                                setPage(1);
                              }}
                              title={
                                isCurrentActive
                                  ? `${m.label} · ${ctx.label}: Đang chọn (Nhấn lần nữa để bỏ chọn)`
                                  : count > 0
                                  ? `${m.label} · ${ctx.label}: ${count} lời chiêm nghiệm phát hành (Nhấn để lọc danh sách)`
                                  : `${m.label} · ${ctx.label}: Chưa có nội dung (Nhấn để lọc hoặc soạn mới)`
                              }
                            >
                              {count > 0 ? (
                                <span className="cell-count-wrap">
                                  <Check size={11} className="cell-check-icon" />
                                  <strong>{count}</strong>
                                </span>
                              ) : (
                                <span className="cell-empty-dash" title="Ô còn trống">
                                  <Plus size={11} className="cell-add-icon" />
                                </span>
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
            placeholder="Tìm tiêu đề, mã nguồn hoặc nội dung…"
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
                <option key={item.key} value={item.key}>
                  {item.key === "general" ? "Đời sống chung" : item.label}
                </option>
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

          <div className="admin-signal-view-toggle" role="group" aria-label="Chế độ xem">
            <button
              type="button"
              className={`admin-view-btn ${viewMode === "table" ? "is-active" : ""}`}
              onClick={() => setViewMode("table")}
              title="Chế độ xem dạng Bảng gọn (Table View)"
            >
              <List size={15} />
              <span>Bảng</span>
            </button>
            <button
              type="button"
              className={`admin-view-btn ${viewMode === "grid" ? "is-active" : ""}`}
              onClick={() => setViewMode("grid")}
              title="Chế độ xem dạng Thẻ (Grid View)"
            >
              <LayoutGrid size={15} />
              <span>Thẻ</span>
            </button>
          </div>

          <button
            className="admin-signal-create-cta"
            type="button"
            onClick={() => void openEditor()}
          >
            <Plus size={16} />
            <span>Soạn lời chiêm nghiệm mới</span>
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
          <strong style={{ fontSize: "16px", color: "var(--admin-heading)" }}>
            {hasActiveFilters ? "Không có lời chiêm nghiệm nào khớp bộ lọc" : "Kho tàng lời chiêm nghiệm đang chờ bạn khởi tạo"}
          </strong>
          <span style={{ maxWidth: "460px", lineHeight: "1.6" }}>
            {hasActiveFilters
              ? "Hãy thử chọn cảm xúc/ngữ cảnh khác hoặc xóa bộ lọc để xem toàn bộ danh sách."
              : "Bắt đầu khởi tạo bản thảo lời chiêm nghiệm đầu tiên với câu đối thơ và bài học chiêm nghiệm để làm phong phú kho tư liệu."}
          </span>
          {hasActiveFilters ? (
            <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", justifyContent: "center" }}>
              <button type="button" className="admin-secondary-button" onClick={resetAllFilters}>
                <RotateCcw size={14} /> Xóa bộ lọc hiện tại
              </button>
              <button
                type="button"
                className="admin-signal-create-cta"
                onClick={() => void openEditor(undefined, mood !== "all" ? mood : undefined, contextKey !== "all" ? contextKey : undefined)}
              >
                <Plus size={16} /> Soạn cho [{moodName(mood)} · {contextName(contextKey)}]
              </button>
            </div>
          ) : (
            <button type="button" className="admin-signal-create-cta" onClick={() => void openEditor()}>
              <Plus size={16} /> Soạn lời chiêm nghiệm đầu tiên
            </button>
          )}
        </div>
      )}

      {!loading && items.length > 0 && (
        viewMode === "table" ? (
          <div className="admin-signal-table-card">
            <div className="admin-table-scroll">
              <table className="admin-signal-data-table">
                <thead>
                  <tr>
                    <th style={{ width: "130px" }}>Cảm xúc</th>
                    <th style={{ width: "120px" }}>Ngữ cảnh</th>
                    <th>Nội dung chiêm nghiệm & Lời khuyên</th>
                    <th style={{ width: "140px" }}>Mã nguồn</th>
                    <th style={{ width: "125px" }}>Trạng thái</th>
                    <th style={{ width: "110px" }}>Thẩm định</th>
                    <th style={{ width: "140px", textAlign: "right" }}>Thao tác</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((row) => {
                    const content = parseContent(row.content);
                    const isFolk = content.metadata.contentKind === "folk";
                    return (
                      <tr key={row.id} className="admin-signal-table-row">
                        <td>
                          <span className="signal-table-chip mood-chip">
                            {moodName(row.mood)}
                          </span>
                        </td>
                        <td>
                          <span className="signal-table-chip context-chip">
                            {contextName(row.context_key)}
                          </span>
                        </td>
                        <td className="td-signal-quote-cell">
                          <div className="signal-table-quote-wrap">
                            <strong className="signal-table-quote-title">
                              {row.title || row.source}
                            </strong>
                            <p className="signal-table-poem-preview">
                              {content.poem.line1 || content.reflection.content || "Chưa có nội dung"}
                            </p>
                            {content.reflection.advice && (
                              <small className="signal-table-advice-preview">
                                💡 {content.reflection.advice}
                              </small>
                            )}
                            {row.editorial_status === "IN_REVIEW" && row.submitted_by && (
                              <small className="signal-table-advice-preview">Người gửi duyệt: {row.submitted_by}</small>
                            )}
                            {row.editor_feedback && <small className="signal-table-advice-preview"><strong>Góp ý Admin:</strong> {row.editor_feedback}</small>}
                          </div>
                        </td>
                        <td>
                          <code className="signal-table-source-code">{row.source}</code>
                        </td>
                        <td>
                          <span className={`admin-signal-status-pill is-${cssStatus[row.editorial_status]}`}>
                            <span className="status-glow-dot" />
                            {STATUS_LABELS[row.editorial_status]}
                          </span>
                        </td>
                        <td>
                          {row.verified ? (
                            <span className="table-verified-badge" title={row.reviewed_at ? `Duyệt ngày ${new Date(row.reviewed_at).toLocaleDateString("vi-VN")}` : "Đã thẩm định"}>
                              <ShieldCheck size={13} />
                              <span>Đã duyệt</span>
                            </span>
                          ) : (
                            <span className="table-unverified-badge">
                              <Clock size={13} />
                              <span>Chưa duyệt</span>
                            </span>
                          )}
                        </td>
                        <td style={{ textAlign: "right" }}>
                          <div className="admin-signal-table-actions">
                            <button
                              className="table-action-icon-btn is-preview"
                              type="button"
                              title="Xem chi tiết / Thẩm định"
                              onClick={() => void openDetail(row.id)}
                            >
                              <Eye size={14} />
                            </button>
                            {!canReview && row.editorial_status === "DRAFT" && <button
                              className="table-action-icon-btn is-edit"
                              type="button"
                              title="Sửa bản nháp"
                              aria-label={`Sửa ${row.title || row.source}`}
                              onClick={() => void openEditor(row.id)}
                            >
                              <Edit3 size={14} />
                            </button>}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
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
                  {row.editor_feedback && <p className="signal-table-advice-preview"><strong>Góp ý Admin:</strong> {row.editor_feedback}</p>}

                  {/* Card Reflection Quote */}
                  <div className="admin-signal-quote-box">
                    <Quote size={18} className="quote-glyph" />
                    <blockquote className="quote-text">
                      {content.poem.line1 ? `${content.poem.line1} ${content.poem.line2 || ""}` : (content.reflection.content || "Chưa có lời chiêm nghiệm")}
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
                      {!canReview && row.editorial_status === "DRAFT" && <button
                        className="admin-signal-edit-btn"
                        type="button"
                        onClick={() => void openEditor(row.id)}
                      >
                        <Edit3 size={14} />
                        <span>Sửa bản nháp</span>
                      </button>}
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )
      )}

      {/* 6. PAGINATION */}
      {data && data.pagination.pageCount > 1 ? (
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
      ) : null}

      {/* 7. ULTRA-PREMIUM EDITORIAL MODAL STUDIO */}
      {editing && (
        <div
          className="admin-editor-overlay admin-signal-modal-overlay"
          role="dialog"
          aria-modal="true"
          onClick={(e) => {
            if (e.target === e.currentTarget && !saving) closeEditor();
          }}
        >
          <form
            className="admin-editor-modal admin-signal-editor-modal"
            onSubmit={(event) => void saveDraft(event, editing.form.editorialStatus)}
          >
            <header className="admin-editor-header">
              <div className="admin-editor-header-copy">
                <span className="admin-editor-eyebrow">
                  <Sparkles size={13} /> CHECK-IN · PHÒNG BIÊN TẬP CHIÊM NGHIỆM
                </span>
                <h2 className="admin-editor-title">
                  {editing.id ? "Hiệu đính lời chiêm nghiệm" : "Khởi tạo bản thảo chiêm nghiệm mới"}
                </h2>
                <p className="admin-editor-desc">
                  Biên soạn chuẩn hóa tư liệu chiêm nghiệm tâm an dân gian đương đại. Bản thảo sau khi lưu hoặc gửi duyệt sẽ được đối chiếu trước khi phát hành.
                </p>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <button
                  type="button"
                  className="admin-theme-toggle-btn"
                  onClick={toggleTheme}
                  aria-label={dark ? "Chuyển giao diện sáng" : "Chuyển giao diện tối"}
                  title={dark ? "Chuyển sang giao diện Sáng" : "Chuyển sang giao diện Tối"}
                >
                  {dark ? <Sun size={15} /> : <Moon size={15} />}
                </button>
                <button
                  type="button"
                  className={`admin-toggle-preview-btn ${showLivePreview ? "is-active" : ""}`}
                  onClick={() => setShowLivePreview((prev) => !prev)}
                  title={showLivePreview ? "Ẩn khung xem trước để tập trung soạn thảo" : "Bật khung xem trước giao diện thẻ người dùng"}
                >
                  {showLivePreview ? <EyeOff size={15} /> : <Eye size={15} />}
                  <span>{showLivePreview ? "Ẩn xem trước (Tập trung)" : "Hiện xem trước (Live)"}</span>
                </button>
                <button
                  type="button"
                  className="admin-editor-close-btn"
                  onClick={closeEditor}
                  aria-label="Đóng biểu mẫu"
                  disabled={saving}
                >
                  <X size={18} />
                </button>
              </div>
            </header>

            {editing.loading ? (
              <div className="admin-signal-editor-loading-state">
                <div className="admin-boot-spinner-wrap">
                  <div className="admin-boot-spinner" />
                  <Sparkles size={26} className="admin-boot-icon" />
                </div>
                <strong className="loading-state-title">
                  Đang nạp hồ sơ biên tập chiêm nghiệm…
                </strong>
                <span className="loading-state-sub">
                  Đồng bộ câu đối thơ, tư liệu khảo cứu và môi trường live preview
                </span>
              </div>
            ) : (
              <>
                <div className={`admin-signal-editor-body ${!showLivePreview ? "is-focus-mode" : ""}`}>
              {/* Form Grid Area */}
              <div className="admin-signal-form-pane">
                {/* Section 1: Định danh & Phân loại văn hóa */}
                <fieldset className="admin-form-group">
                  <legend className="group-legend">
                    <Layers size={14} /> 1. Định danh & Phân loại văn hóa
                  </legend>
                  <div className="admin-signal-editor-grid">
                    <label>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "4px" }}>
                        <span className="field-title" style={{ margin: 0 }}>Mã nguồn ổn định (Slug Key) *</span>
                        {!editing.id && (
                          <button
                            type="button"
                            onClick={() => {
                              const baseText = `${editing.form.mood}-${editing.form.contextKey}-${editing.form.title || editing.form.content.poem.line1 || "chua-dat-ten"}`;
                              const generated = baseText
                                .toLowerCase()
                                .normalize("NFD")
                                .replace(/[\u0300-\u036f]/g, "")
                                .replace(/đ/g, "d")
                                .replace(/[^a-z0-9]+/g, "-")
                                .replace(/^-+|-+$/g, "")
                                .slice(0, 100);
                              setFormField("source", generated);
                              toast.info(`Đã tạo mã định danh: "${generated}"`, "Tự sinh mã");
                            }}
                            style={{
                              fontSize: "0.75rem",
                              fontWeight: 600,
                              color: "var(--admin-gold, #c89655)",
                              background: "none",
                              border: "none",
                              cursor: "pointer",
                              textDecoration: "underline",
                              padding: 0,
                            }}
                          >
                            ✦ Tự sinh mã
                          </button>
                        )}
                      </div>
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
                      <span className="field-title">Cảm xúc liên kết (Tâm trạng)</span>
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
                      <span className="field-title">Ngữ cảnh check-in (Chủ đề)</span>
                      <select
                        value={editing.form.contextKey}
                        onChange={(event) => setFormField("contextKey", event.target.value)}
                      >
                        {checkInCatalog.contexts.map((item) => (
                          <option key={item.key} value={item.key}>
                            {item.key === "general" ? "Đời sống chung (Mặc định)" : item.label}
                          </option>
                        ))}
                      </select>
                    </label>

                    <label>
                      <span className="field-title">Nhãn chủ đề trên thẻ (Tag)</span>
                      <input
                        maxLength={60}
                        placeholder="vd: Chiêm nghiệm tâm an (hoặc để trống)"
                        value={editing.form.content.badge}
                        onChange={(event) => setBadgeField(event.target.value)}
                      />
                    </label>

                    <label>
                      <span className="field-title">Loại tác quyền nội dung</span>
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
                        <option value="folk">Trích dẫn dân gian (Ca dao / Tục ngữ)</option>
                      </select>
                    </label>

                    <label className={editing.form.content.metadata.contentKind !== "folk" ? "admin-signal-wide" : ""}>
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
                        <span className="field-title">Cộng đồng / Vùng xuất xứ văn hóa</span>
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

                {/* Section 2: Bức trướng thư pháp (Couplet Poetry) */}
                <fieldset className="admin-form-group">
                  <legend className="group-legend">
                    <Quote size={14} /> 2. Bức trướng thư pháp (Cặp câu thơ chiêm nghiệm)
                  </legend>
                  <div className="admin-signal-editor-grid">
                    <label className="admin-signal-wide">
                      <span className="field-title">Câu thơ / Đối vế trên (Dòng 1) *</span>
                      <input
                        required
                        maxLength={300}
                        placeholder="vd: Sương mai giăng kín mây mờ, chớ ngại mông lung giữa dòng đời trôi."
                        value={editing.form.content.poem.line1}
                        onChange={(event) => setPoemField("line1", event.target.value)}
                      />
                    </label>

                    <label className="admin-signal-wide">
                      <span className="field-title">Câu thơ / Đối vế dưới (Dòng 2) *</span>
                      <input
                        required
                        maxLength={300}
                        placeholder="vd: Giữ tâm trong sáng thiện lành, mây tan nắng ấm trời xanh lại về."
                        value={editing.form.content.poem.line2}
                        onChange={(event) => setPoemField("line2", event.target.value)}
                      />
                    </label>

                    <label className="admin-signal-wide">
                      <span className="field-title">Lời gợi mở phụ đề (Thông điệp dẫn dắt)</span>
                      <input
                        maxLength={500}
                        placeholder="vd: Lời gợi mở chiêm nghiệm đương đại · Đồng hành cùng tâm an."
                        value={editing.form.content.poem.subtext}
                        onChange={(event) => setPoemField("subtext", event.target.value)}
                      />
                    </label>
                  </div>
                </fieldset>

                {/* Section 3: Tranh di sản nghệ thuật (Artwork) */}
                <fieldset className="admin-form-group">
                  <legend className="group-legend">
                    <Sparkle size={14} /> 3. Tranh di sản nghệ thuật (Tác phẩm thị giác)
                  </legend>
                  <div className="admin-signal-editor-grid">
                    <label>
                      <span className="field-title">Chọn từ kho họa phẩm di sản kiểm định</span>
                      <select
                        value={editing.form.content.artwork?.image || ""}
                        onChange={(event) => {
                          const val = event.target.value;
                          setArtworkField("image", val);
                          if (val === "relic_book.jpg") setArtworkField("caption", "Sách cổ văn hiến thời Lê - Nguyễn");
                          else if (val === "zen_meditation.jpg") setArtworkField("caption", "Lắng đọng tâm an & tĩnh tại");
                          else if (val === "tea_bowl.jpg") setArtworkField("caption", "Bộ ấm chén trà đạo truyền thống Việt Nam");
                          else if (val === "temple_bac_bo.jpg") setArtworkField("caption", "Văn Miếu - Quốc Tử Giám Hà Nội");
                          else if (val === "hero_family.jpg") setArtworkField("caption", "Bức họa gia đình sum vầy truyền thống");
                          else if (val === "hoi_an_bai_choi.jpg") setArtworkField("caption", "Phố cổ Hội An đêm rằm hoa đăng sông Hoài");
                          else if (val === "hue_trung_bo.jpg") setArtworkField("caption", "Cung đình & nhã nhạc xứ Huế");
                          else if (val === "mieu_ba_chua_xu.jpg") setArtworkField("caption", "Miếu Bà Chúa Xứ núi Sam Nam Bộ");
                          else if (val === "chu_dong_tu.jpg") setArtworkField("caption", "Tích xưa Chử Đồng Tử - Tiên Dung đầm Dạ Trạch");
                          else if (val === "ancestor_portrait.jpg") setArtworkField("caption", "Bức họa tôn vinh nguồn cội tổ tiên");
                          else if (val === "do_paper_still_life.jpg") setArtworkField("caption", "Giấy Dó nghệ thuật truyền thống");
                        }}
                      >
                        <option value="">(Không dùng ảnh minh họa)</option>
                        <option value="relic_book.jpg">relic_book.jpg - Sách cổ văn hiến thời Lê - Nguyễn</option>
                        <option value="zen_meditation.jpg">zen_meditation.jpg - Lắng đọng tâm an & tĩnh tại</option>
                        <option value="tea_bowl.jpg">tea_bowl.jpg - Bộ ấm chén trà đạo truyền thống</option>
                        <option value="temple_bac_bo.jpg">temple_bac_bo.jpg - Văn Miếu Quốc Tử Giám</option>
                        <option value="hero_family.jpg">hero_family.jpg - Bức họa gia đình sum vầy</option>
                        <option value="hoi_an_bai_choi.jpg">hoi_an_bai_choi.jpg - Phố cổ Hội An đêm rằm</option>
                        <option value="hue_trung_bo.jpg">hue_trung_bo.jpg - Cung đình & nhã nhạc xứ Huế</option>
                        <option value="mieu_ba_chua_xu.jpg">mieu_ba_chua_xu.jpg - Miếu Bà Chúa Xứ Nam Bộ</option>
                        <option value="chu_dong_tu.jpg">chu_dong_tu.jpg - Tích xưa Chử Đồng Tử</option>
                        <option value="ancestor_portrait.jpg">ancestor_portrait.jpg - Bức họa tôn vinh nguồn cội</option>
                        <option value="do_paper_still_life.jpg">do_paper_still_life.jpg - Giấy Dó nghệ thuật truyền thống</option>
                      </select>
                    </label>

                    <label>
                      <span className="field-title">Đường dẫn hình ảnh (File name hoặc URL)</span>
                      <input
                        maxLength={500}
                        placeholder="vd: relic_book.jpg hoặc /images/..."
                        value={editing.form.content.artwork?.image || ""}
                        onChange={(event) => setArtworkField("image", event.target.value)}
                      />
                    </label>

                    <label>
                      <span className="field-title">Chú thích tranh di sản</span>
                      <input
                        maxLength={300}
                        placeholder="vd: Tranh khắc gỗ dân gian Đông Hồ"
                        value={editing.form.content.artwork?.caption || ""}
                        onChange={(event) => setArtworkField("caption", event.target.value)}
                      />
                    </label>

                    <label>
                      <span className="field-title">Vùng miền văn hóa</span>
                      <input
                        maxLength={120}
                        placeholder="vd: Đồng bằng Bắc Bộ / Miền Trung"
                        value={editing.form.content.research.region}
                        onChange={(event) => setResearchField("region", event.target.value)}
                      />
                    </label>
                  </div>
                </fieldset>

                {/* Section 4: Lời gửi gắm & Thông điệp chiêm nghiệm */}
                <fieldset className="admin-form-group">
                  <legend className="group-legend">
                    <Sparkles size={14} /> 4. Lời gửi gắm & Thông điệp tự chiêm nghiệm
                  </legend>
                  <div className="admin-signal-editor-grid">
                    <label className="admin-signal-wide">
                      <span className="field-title">Lời gửi gắm cho ngày hôm nay (Hiển thị trong ô hổ phách) *</span>
                      <textarea
                        required
                        rows={2}
                        maxLength={3000}
                        placeholder="vd: Cảm giác mông lung là hoàn toàn bình thường. Hãy xem đây là khoảng lặng cần thiết..."
                        value={editing.form.content.reflection.advice}
                        onChange={(event) => setReflectionField("advice", event.target.value)}
                      />
                    </label>

                    <label className="admin-signal-wide">
                      <span className="field-title">Thông điệp gợi mở sâu / Tự suy ngẫm</span>
                      <textarea
                        rows={3}
                        maxLength={10000}
                        placeholder="Câu văn chiêm nghiệm gợi mở bình an trong tâm..."
                        value={editing.form.content.reflection.content}
                        onChange={(event) => setReflectionField("content", event.target.value)}
                      />
                    </label>
                  </div>
                </fieldset>

                {/* Section 5: Phiến ngọc việc nhỏ an yên */}
                <fieldset className="admin-form-group">
                  <legend className="group-legend">
                    <Compass size={14} /> 5. Phiến ngọc việc nhỏ an yên (Hành động gợi ý)
                  </legend>
                  <div className="admin-signal-editor-grid">
                    <label>
                      <span className="field-title">Tiêu đề việc nhỏ (Vừa sức, nuôi dưỡng tâm lành) *</span>
                      <input
                        required
                        maxLength={255}
                        placeholder="vd: Viết một bước thử nhỏ"
                        value={editing.form.content.action.title}
                        onChange={(event) => setActionField("title", event.target.value)}
                      />
                    </label>

                    <label>
                      <span className="field-title">Thời lượng gợi ý</span>
                      <input
                        maxLength={120}
                        placeholder="vd: 5 phút"
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

                {/* Section 6: Căn cứ pháp lý, Hồ sơ nguồn & Thẩm định */}
                <fieldset className="admin-form-group">
                  <legend className="group-legend">
                    <ShieldCheck size={14} /> 6. Căn cứ bản quyền, Hồ sơ nguồn & Thẩm định
                  </legend>
                  <div className="admin-signal-editor-grid">
                    <label className="admin-signal-wide">
                      <span className="field-title">Căn cứ quyền sử dụng / Bản quyền</span>
                      <textarea
                        rows={2}
                        maxLength={1000}
                        value={editing.form.content.metadata.contentRightsBasis}
                        onChange={(event) => setMetaField("contentRightsBasis", event.target.value)}
                        placeholder="Ghi căn cứ thực tế, trích dẫn văn hóa hoặc nguồn biên soạn."
                      />
                    </label>

                    {editing.form.content.metadata.contentKind === "folk" && (
                      <>
                        <label className="admin-signal-wide">
                          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "4px" }}>
                            <span className="field-title" style={{ margin: 0 }}>Hồ sơ nguồn trích dẫn khảo cứu (JSON array)</span>
                            <button
                              type="button"
                              onClick={() => {
                                const sample = JSON.stringify([
                                  {
                                    title: editing.form.content.research.source || "Kho tàng ca dao dân ca người Việt",
                                    url: "https://vi.wikipedia.org/wiki/Ca_dao_Vi%E1%BB%87t_Nam",
                                    locator: "Tập 1, mục Khảo luận phong tục",
                                    bibliographicReference: "NXB Văn học, 2012",
                                    accessedOn: new Date().toISOString().slice(0, 10),
                                  }
                                ], null, 2);
                                setSourcesText(sample);
                                toast.info("Đã điền mẫu cấu trúc hồ sơ nguồn trích dẫn.", "Mẫu chuẩn hóa");
                              }}
                              style={{
                                fontSize: "0.75rem",
                                fontWeight: 600,
                                color: "var(--admin-gold, #c89655)",
                                background: "none",
                                border: "none",
                                cursor: "pointer",
                                textDecoration: "underline",
                                padding: 0,
                              }}
                            >
                              + Chèn mẫu nguồn chuẩn
                            </button>
                          </div>
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
                      <span className="field-title">Ghi chú biên tập nội bộ (Lưu ý cho hội đồng duyệt)</span>
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
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "4px" }}>
                        <span className="field-title" style={{ margin: 0 }}>Ghi chú lưu / gửi duyệt (tối thiểu 8 ký tự) *</span>
                        <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
                          {["Khởi tạo bản thảo mới", "Hiệu đính câu chữ & nguồn", "Bổ sung tranh di sản & gợi ý", "Hoàn tất sẵn sàng thẩm định"].map((quickNote) => (
                            <button
                              key={quickNote}
                              type="button"
                              onClick={() => setFormField("reviewNote", quickNote)}
                              style={{
                                fontSize: "0.72rem",
                                padding: "2px 8px",
                                borderRadius: "4px",
                                background: "rgba(255, 255, 255, 0.06)",
                                border: "1px solid var(--admin-border-subtle, rgba(255,255,255,0.1))",
                                color: "var(--admin-text-subtle, #b0b0b0)",
                                cursor: "pointer",
                              }}
                            >
                              + {quickNote}
                            </button>
                          ))}
                        </div>
                      </div>
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
              {showLivePreview && (
                <div className="admin-signal-live-preview-pane">
                  <div className="live-preview-sticky">
                    <div className="live-preview-header">
                      <Sparkles size={14} className="preview-sparkle" />
                      <strong>Trải nghiệm khách hàng thực tế (Live Preview)</strong>
                    </div>

                    <div className="admin-client-mockup-card">
                      <div className="mockup-golden-rim" />

                      <div className="mockup-header-row">
                        <div className="mockup-seal-tag">
                          <span className="mockup-seal-mark">啓</span>
                          <span>{editing.form.content.badge || "Chiêm nghiệm tâm an"}</span>
                        </div>
                        <span className="mockup-quotation-verified">
                          {editing.form.content.metadata.quotationVerified
                            ? "✓ Đã đối chiếu nguồn"
                            : "Chiêm nghiệm đương đại"}
                        </span>
                      </div>

                      <div className="mockup-poem-block">
                        <div className="mockup-quote-mark">“</div>
                        <blockquote className="mockup-poem-lines">
                          <p className="m-0">
                            {editing.form.content.poem.line1 ||
                              editing.form.content.reflection.content ||
                              "Nội dung lời chiêm nghiệm sẽ hiển thị tại đây khi bạn nhập vào biểu mẫu..."}
                          </p>
                          {editing.form.content.poem.line2 && (
                            <p className="m-0 mt-1">{editing.form.content.poem.line2}</p>
                          )}
                        </blockquote>
                        <p className="mockup-poem-subtext">
                          {editing.form.content.poem.subtext || "Lời gợi mở chiêm nghiệm đương đại · Đồng hành cùng tâm an."}
                        </p>
                      </div>

                      {editing.form.content.artwork?.image && editing.form.content.artwork.image !== "none" ? (
                        <figure className="mockup-artwork-frame">
                          <img
                            src={
                              editing.form.content.artwork.image.startsWith("http") ||
                              editing.form.content.artwork.image.startsWith("/")
                                ? editing.form.content.artwork.image
                                : `/images/${editing.form.content.artwork.image}`
                            }
                            alt={editing.form.content.artwork.caption || "Minh họa di sản"}
                            className="mockup-artwork-img"
                          />
                          <figcaption className="mockup-artwork-caption">
                            <span className="flex items-center gap-1.5">
                              <Sparkle size={13} className="text-accent" />
                              <span>{editing.form.content.artwork.caption || "Hình ảnh di sản minh họa"}</span>
                            </span>
                            {(editing.form.content.research?.region || editing.form.content.metadata?.originCommunity) && (
                              <span className="mockup-region-tag">
                                {editing.form.content.research?.region || editing.form.content.metadata?.originCommunity}
                              </span>
                            )}
                          </figcaption>
                        </figure>
                      ) : null}

                      <div className="mockup-advice-box">
                        <div className="mockup-advice-tag">
                          <Sparkle size={13} />
                          <span>LỜI GỬI GẮM CHO NGÀY HÔM NAY</span>
                        </div>
                        <p className="mockup-advice-text">
                          {editing.form.content.reflection.advice || "Một bước đi nhỏ hôm nay gieo mầm bình yên cho tâm trí."}
                        </p>
                      </div>

                      <div className="mockup-action-card">
                        <div className="mockup-action-header">
                          <div className="mockup-action-tag">
                            <Sparkles size={13} />
                            <span>MỘT VIỆC NHỎ AN YÊN</span>
                          </div>
                          <span className="mockup-action-duration">
                            <Clock size={12} />
                            <span>{editing.form.content.action.duration || "5 phút"}</span>
                          </span>
                        </div>
                        <h4 className="mockup-action-title">
                          {editing.form.content.action.title || "Chọn một việc nhỏ vừa sức"}
                        </h4>
                        <p className="mockup-action-desc">
                          {editing.form.content.action.description || "Dành ít phút viết ra hoặc thực hiện ngay việc này."}
                        </p>
                        <div className="mockup-action-btn-preview">
                          <Sparkles size={14} />
                          <span>Tôi đã thực hiện</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

                <footer className="admin-editor-footer">
                  <button
                    type="button"
                    className="admin-secondary-button"
                    onClick={closeEditor}
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
              </>
            )}
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
            if (e.target === e.currentTarget && !saving) closeDetail();
          }}
        >
          <div className="admin-editor-modal admin-signal-detail-modal">
            <header className="admin-editor-header">
              <div className="admin-editor-header-copy">
                <span className="admin-editor-eyebrow">
                  <ShieldCheck size={13} /> THẨM ĐỊNH & KIỂM SOÁT DI SẢN CHIÊM NGHIỆM
                </span>
                <div className="admin-signal-detail-title-row">
                  <h2 className="admin-editor-title">
                    {detailLoading ? "Đang tải hồ sơ…" : selected?.title || selected?.source}
                  </h2>
                  {selected && (
                    <span className={`admin-signal-status-pill is-${cssStatus[selected.editorial_status]}`}>
                      <span className="status-glow-dot" />
                      {STATUS_LABELS[selected.editorial_status]}
                    </span>
                  )}
                </div>
              </div>

              {selected && (
                <div className="admin-signal-detail-header-actions">
                  <span className="signal-table-chip mood-chip">{moodName(selected.mood)}</span>
                  <span className="signal-table-chip context-chip">{contextName(selected.context_key)}</span>
                  <button
                    type="button"
                    className="admin-signal-source-badge-btn"
                    onClick={() => {
                      void navigator.clipboard?.writeText(selected.source);
                      setNotice("Đã sao chép mã nguồn: " + selected.source);
                    }}
                    title="Bấm để sao chép mã nguồn này"
                  >
                    <code>{selected.source}</code>
                    <Copy size={12} />
                  </button>
                  <button
                    type="button"
                    className="admin-theme-toggle-btn"
                    onClick={toggleTheme}
                    aria-label={dark ? "Chuyển giao diện sáng" : "Chuyển giao diện tối"}
                    title={dark ? "Chuyển sang giao diện Sáng" : "Chuyển sang giao diện Tối"}
                  >
                    {dark ? <Sun size={15} /> : <Moon size={15} />}
                  </button>
                  <button
                    type="button"
                    className="admin-editor-close-btn"
                    onClick={closeDetail}
                    aria-label="Đóng hồ sơ"
                    disabled={saving}
                  >
                    <X size={18} />
                  </button>
                </div>
              )}
            </header>

            {selected && selectedContent && (
              <div className="admin-signal-detail-body">
                <div className="admin-signal-detail-split-grid">
                  {/* ========================================================= */}
                  {/* CỘT TRÁI (52%): LIVE CLIENT CARD MOCKUP                  */}
                  {/* ========================================================= */}
                  <div className="admin-signal-mockup-col">
                    <div className="detail-section-title">
                      <Eye size={15} /> Giao diện hiển thị tới khách hàng (Live Mockup)
                    </div>

                    <div className="admin-client-mockup-card">
                      <div className="mockup-golden-rim" />

                      {/* Header triện & nhãn */}
                      <div className="mockup-header-row">
                        <div className="mockup-seal-tag">
                          <span className="mockup-seal-mark">啓</span>
                          <span>{selectedContent.badge || "Chiêm nghiệm tâm an"}</span>
                        </div>
                        <span className="mockup-quotation-verified">
                          {selectedContent.metadata.quotationVerified
                            ? "✓ Đã đối chiếu nguồn"
                            : "Chiêm nghiệm đương đại"}
                        </span>
                      </div>

                      {/* Bức trướng thư pháp 2 câu */}
                      <div className="mockup-poem-block">
                        <div className="mockup-quote-mark">“</div>
                        <blockquote className="mockup-poem-lines">
                          <p className="m-0">{selectedContent.poem.line1 || "Sương mai giăng kín mây mờ, chớ ngại mông lung giữa dòng đời trôi."}</p>
                          <p className="m-0 mt-1">{selectedContent.poem.line2 || "Giữ tâm trong sáng thiện lành, mây tan nắng ấm trời xanh lại về."}</p>
                        </blockquote>
                        <p className="mockup-poem-subtext">
                          {selectedContent.poem.subtext || "Lời gợi mở chiêm nghiệm đương đại · Đồng hành cùng tâm an."}
                        </p>
                      </div>

                      {/* Tranh di sản minh họa (nếu có) */}
                      {selectedContent.artwork?.image && selectedContent.artwork.image !== "none" ? (
                        <figure className="mockup-artwork-frame">
                          <img
                            src={selectedContent.artwork.image}
                            alt={selectedContent.artwork.caption || "Minh họa di sản"}
                            className="mockup-artwork-img"
                          />
                          <figcaption className="mockup-artwork-caption">
                            <span className="flex items-center gap-1.5">
                              <Sparkle size={13} className="text-accent" />
                              <span>{selectedContent.artwork.caption || "Hình ảnh di sản minh họa"}</span>
                            </span>
                            {(selectedContent.research?.region || selectedContent.metadata?.originCommunity) && (
                              <span className="mockup-region-tag">
                                {selectedContent.research?.region || selectedContent.metadata?.originCommunity}
                              </span>
                            )}
                          </figcaption>
                        </figure>
                      ) : (
                        <div className="mockup-artwork-empty">
                          <Sparkles size={16} />
                          <span>Nội dung chữ nguyên bản · Chưa gắn tài sản hình ảnh</span>
                        </div>
                      )}

                      {/* Khối lời khuyên ấm áp */}
                      <div className="mockup-advice-box">
                        <div className="mockup-advice-tag">
                          <Sparkle size={13} />
                          <span>LỜI GỬI GẮM CHO NGÀY HÔM NAY</span>
                        </div>
                        <p className="mockup-advice-text">
                          {selectedContent.reflection.advice || selectedContent.reflection.content || "Một bước đi nhỏ hôm nay gieo mầm bình yên cho tâm trí."}
                        </p>
                      </div>

                      {/* Phiến ngọc việc nhỏ */}
                      <div className="mockup-action-card">
                        <div className="mockup-action-header">
                          <div className="mockup-action-tag">
                            <Sparkles size={13} />
                            <span>MỘT VIỆC NHỎ AN YÊN</span>
                          </div>
                          <span className="mockup-action-duration">
                            <Clock size={12} />
                            <span>{selectedContent.action.duration || "5 phút"}</span>
                          </span>
                        </div>
                        <h4 className="mockup-action-title">
                          {selectedContent.action.title || "Chọn một việc nhỏ vừa sức"}
                        </h4>
                        <p className="mockup-action-desc">
                          {selectedContent.action.description || "Dành ít phút viết ra hoặc thực hiện ngay việc này."}
                        </p>
                        <div className="mockup-action-btn-preview">
                          <Sparkles size={14} />
                          <span>Tôi đã thực hiện</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* ========================================================= */}
                  {/* CỘT PHẢI (48%): THẨM ĐỊNH & THAO TÁC BIÊN TẬP            */}
                  {/* ========================================================= */}
                  <div className="admin-signal-control-col">
                    {/* 1. Card Hồ sơ nguồn & Căn cứ bản quyền */}
                    <div className="admin-signal-provenance-card">
                      <div className="detail-section-title">
                        <FileText size={15} /> Thẩm tra căn cứ nguồn & Bản quyền
                      </div>
                      <div className="provenance-grid">
                        <div className="provenance-item">
                          <span className="provenance-label">Loại nội dung:</span>
                          <strong className="provenance-value">
                            {selectedContent.metadata.contentKind === "folk"
                              ? "📜 Ca dao / Trích dẫn dân gian (QUOTATION)"
                              : "✍️ Tác phẩm nhóm tự biên soạn (GROUP_AUTHORED)"}
                          </strong>
                        </div>
                        <div className="provenance-item">
                          <span className="provenance-label">Người biên soạn:</span>
                          <span className="provenance-value">
                            {selectedContent.metadata.contentAuthor || "Nhóm biên soạn Tín Lâm"}
                          </span>
                        </div>
                        <div className="provenance-item">
                          <span className="provenance-label">Căn cứ quyền sử dụng:</span>
                          <span className="provenance-value">
                            {selectedContent.metadata.contentRightsBasis || "Bản quyền sản phẩm nguyên bản của dự án"}
                          </span>
                        </div>
                        {selectedContent.metadata.originCommunity && (
                          <div className="provenance-item">
                            <span className="provenance-label">Cộng đồng / Xuất xứ:</span>
                            <span className="provenance-value">{selectedContent.metadata.originCommunity}</span>
                          </div>
                        )}
                        {selectedContent.metadata.editorialNote && (
                          <div className="provenance-item full-width">
                            <span className="provenance-label">Ghi chú biên tập:</span>
                            <p className="provenance-note">{selectedContent.metadata.editorialNote}</p>
                          </div>
                        )}
                      </div>

                      {/* Danh sách link nguồn */}
                      {selectedContent.metadata.sources?.length > 0 && (
                        <div className="provenance-sources-list">
                          <span className="sources-list-title">Tài liệu đối chiếu ({selectedContent.metadata.sources.length}):</span>
                          {selectedContent.metadata.sources.map((src, index) => (
                            <div key={(src.id || src.url) + index} className="source-link-item">
                              <span className="source-name"><strong>{src.title}</strong> · {src.locator}</span>
                              <a href={src.url} target="_blank" rel="noreferrer" className="provenance-link">
                                {src.url} <ExternalLink size={11} />
                              </a>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* 2. Card Thao tác phê duyệt & Trạng thái */}
                    {canReview ? <div className="admin-signal-review-panel">
                      <div className="detail-section-title">
                        <ShieldAlert size={15} /> Bảng điều khiển phê duyệt & Trạng thái
                      </div>

                      <div className="workflow-status-callout">
                        <span className="status-callout-label">Trạng thái hiện tại:</span>
                        <span className={`admin-signal-status-pill is-${cssStatus[selected.editorial_status]}`}>
                          <span className="status-glow-dot" />
                          {STATUS_LABELS[selected.editorial_status]}
                        </span>
                        {selected.verified && (
                          <span className="workflow-verified-chip">
                            <ShieldCheck size={13} /> Đã kiểm định
                          </span>
                        )}
                      </div>

                      {selected.editorial_status === "REVOKED" && (
                        <div
                          style={{
                            display: "flex",
                            alignItems: "flex-start",
                            gap: "8px",
                            padding: "10px 12px",
                            borderRadius: "8px",
                            background: "rgba(239, 68, 68, 0.08)",
                            border: "1px solid rgba(239, 68, 68, 0.25)",
                            fontSize: "12px",
                            lineHeight: "1.5",
                            color: "var(--admin-text-main, #333)",
                            marginBottom: "12px",
                          }}
                        >
                          <AlertCircle size={15} style={{ color: "#ef4444", flexShrink: 0, marginTop: "2px" }} />
                          <span>
                            Nội dung này đang bị thu hồi. Bạn có thể <strong>Trả về bản nháp</strong> để biên tập viên chỉnh sửa lại, hoặc <strong>Tái duyệt phiên bản này</strong> nếu đã kiểm tra đạt chuẩn.
                          </span>
                        </div>
                      )}

                      <label className="admin-signal-review-note-label">
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="field-title font-semibold text-xs">Ghi chú thao tác biên tập (tối thiểu 8 ký tự) *</span>
                          <span className={`text-[11px] ${reviewNote.trim().length >= 8 ? "text-emerald-500" : "text-amber-500"}`}>
                            {reviewNote.trim().length}/500 ký tự
                          </span>
                        </div>
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

                      {/* Băng nút hành động thông minh theo trạng thái */}
                      <div className="admin-signal-action-buttons-strip">
                        {/* 1. TRƯỜNG HỢP: CHỜ DUYỆT (IN_REVIEW) */}
                        {!selected.verified && selected.editorial_status === "IN_REVIEW" && (
                          <>
                            <button
                              type="button"
                              className="btn-action-primary is-approve"
                              disabled={saving}
                              onClick={() => void transition({ verified: true })}
                              title="Phê duyệt phiên bản nội dung này sau khi đã thẩm định"
                            >
                              <ShieldCheck size={16} /> Duyệt phiên bản này
                            </button>
                            <button
                              type="button"
                              className="btn-action-secondary"
                              disabled={saving}
                              onClick={returnToDraftFromDetail}
                              title="Yêu cầu chỉnh sửa và trả về bản nháp"
                            >
                              <RotateCcw size={14} /> Yêu cầu chỉnh sửa
                            </button>
                          </>
                        )}

                        {/* 2. TRƯỜNG HỢP: ĐÃ THU HỒI (REVOKED) */}
                        {selected.editorial_status === "REVOKED" && (
                          <>
                            <button
                              type="button"
                              className="btn-action-primary is-approve"
                              disabled={saving}
                              onClick={() => void transition({ verified: true })}
                              title="Tái thẩm định và phê duyệt lại phiên bản này"
                            >
                              <ShieldCheck size={16} /> Tái duyệt phiên bản này
                            </button>
                            <button
                              type="button"
                              className="btn-action-secondary"
                              disabled={saving}
                              onClick={returnToDraftFromDetail}
                              title="Trả bản ghi về bản nháp để biên tập viên sửa đổi và nộp duyệt lại"
                            >
                              <RotateCcw size={14} /> Trả về bản nháp để sửa
                            </button>
                          </>
                        )}

                        {/* 3. TRƯỜNG HỢP: ĐÃ DUYỆT NHƯNG CHƯA PHÁT HÀNH */}
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

                        {/* 4. TRƯỜNG HỢP: ĐANG PHÁT HÀNH => CÓ THỂ TẠM ẨN */}
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

                        {/* 5. THU HỒI PHÊ DUYỆT (NẾU ĐÃ DUYỆT) */}
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

                      </div>
                    </div> : (
                      <div className="admin-signal-review-panel" role="status">
                        <div className="detail-section-title"><ShieldCheck size={15} /> Trạng thái biên tập</div>
                        <p>Bản này đang ở trạng thái <strong>{STATUS_LABELS[selected.editorial_status]}</strong>. Gửi duyệt trong màn hình biên tập; Admin sẽ rà soát và phát hành.</p>
                        {selected.editorial_status === "REVOKED" && (
                          <p>Admin đã thu hồi phê duyệt. Đưa bản này về nháp, cập nhật nếu cần rồi gửi duyệt lại để Admin có thể phê duyệt phiên bản mới.</p>
                        )}
                        {selected.editorial_status === "DRAFT" ? (
                          <button type="button" className="admin-secondary-button" onClick={() => void openEditor(selected.id)}>
                            <Edit3 size={15} /> Sửa / gửi duyệt nội dung
                          </button>
                        ) : (
                          <button
                            type="button"
                            className="admin-secondary-button"
                            disabled={saving}
                            onClick={() => void withdrawOwnSignal()}
                            style={{
                              display: "inline-flex",
                              alignItems: "center",
                              gap: "8px",
                              padding: "9px 18px",
                              borderRadius: "10px",
                              border: "1px solid rgba(200, 150, 85, 0.4)",
                              background: "rgba(200, 150, 85, 0.08)",
                              color: "var(--admin-gold, #c89655)",
                              fontWeight: 600,
                              fontSize: "13px",
                              cursor: "pointer",
                              transition: "all 0.2s ease",
                            }}
                          >
                            <RotateCcw size={15} /> Rút bài về bản nháp để chỉnh sửa
                          </button>
                        )}
                      </div>
                    )}

                    {/* 3. Card Nhật ký kiểm duyệt & Dòng thời gian */}
                    {canReview && <div className="admin-signal-audit-panel">
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
                        <div className="audit-empty-state">
                          <Clock size={18} className="text-muted opacity-60" />
                          <span>Chưa có lịch sử thao tác nào được ghi nhận cho bản ghi này.</span>
                        </div>
                      )}
                    </div>}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Modal rút tín hiệu về bản nháp */}
      <WithdrawModal
        isOpen={showWithdrawOwn}
        itemTitle={selected?.title || "Tín hiệu"}
        itemTypeLabel="tín hiệu"
        onClose={() => setShowWithdrawOwn(false)}
        onConfirm={confirmWithdrawOwnSignal}
      />
    </section>
  );
}
