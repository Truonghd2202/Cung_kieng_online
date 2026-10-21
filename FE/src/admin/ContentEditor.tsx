import { useEffect, useState } from "react";
import {
  AlertCircle,
  ArrowDown,
  ArrowUp,
  BookOpenText,
  CalendarDays,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  Eye,
  FileCheck2,
  FileText,
  Globe,
  Image as ImageIcon,
  Info,
  LibraryBig,
  Link2,
  Lock,
  MapPin,
  Plus,
  RefreshCw,
  Save,
  Send,
  ShieldCheck,
  Sparkles,
  Trash2,
  Unlock,
  X,
} from "lucide-react";
import { apiRequest } from "../lib/api";
import { loadAdminList, type AdminRecord } from "../data/adminService";

export type Kind = "culture" | "calendar" | "xam" | "rituals" | "prayers";
type Step = { title: string; description: string };
type ChecklistDraft = { id: string; label: string };
type RitualChoice = AdminRecord & { title: string };
type EditorialStatus = NonNullable<AdminRecord["editorial_status"]>;

const EDITORIAL_STATUS_LABELS: Record<EditorialStatus, string> = {
  DRAFT: "Bản nháp",
  IN_REVIEW: "Chờ duyệt",
  APPROVED: "Đã duyệt · chưa công khai",
  PUBLISHED: "Đang công khai",
  HIDDEN: "Đã duyệt · đang ẩn",
  REVOKED: "Đã thu hồi",
};

export function slugifyVietnamese(text: string): string {
  if (!text) return "";
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[đĐ]/g, "d")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/[\s_]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-+|-+$/g, "");
}

const CULTURE_CATEGORIES = [
  "Phong tục & Nghi lễ",
  "Lễ hội truyền thống",
  "Không gian tín ngưỡng",
  "Di tích & Danh thắng",
  "Diễn tích & Điển tích xưa",
  "Nhân vật lịch sử & Tâm linh",
  "Ẩm thực & Lễ vật cúng lễ",
  "Tín ngưỡng dân gian",
];

function createChecklistId() {
  return globalThis.crypto?.randomUUID?.() ?? `check-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

const KIND_META: Record<
  Kind,
  { title: string; tag: string; icon: typeof BookOpenText }
> = {
  culture: {
    title: "bài viết văn hóa",
    tag: "KHO VĂN HÓA",
    icon: BookOpenText,
  },
  calendar: {
    title: "Sự kiện lễ hội cổ truyền",
    tag: "LỊCH SỰ KIỆN TÂM LINH",
    icon: CalendarDays,
  },
  xam: {
    title: "Thẻ xăm chiêm nghiệm",
    tag: "HỆ THỐNG QUẺ XĂM",
    icon: LibraryBig,
  },
  rituals: {
    title: "Quy chuẩn nghi lễ",
    tag: "NGHI THỨC TRUYỀN THỐNG",
    icon: BookOpenText,
  },
  prayers: {
    title: "Bản văn khấn cổ truyền",
    tag: "VĂN TỰ THỜ CÚNG",
    icon: FileCheck2,
  },
};

export function ContentEditor({
  kind,
  id,
  onClose,
  onSaved,
}: {
  kind: Kind;
  id?: string;
  onClose: () => void;
  onSaved: () => void;
}) {
  const [activeTab, setActiveTab] = useState<"info" | "content" | "media" | "preview">("info");
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [slugUnlocked, setSlugUnlocked] = useState(!id);
  const [expectedUpdatedAt, setExpectedUpdatedAt] = useState<string>();
  const [editorialStatus, setEditorialStatus] = useState<EditorialStatus | null>(id ? null : "DRAFT");

  const [values, setValues] = useState<Record<string, string>>({
    title: "",
    slug: "",
    category: kind === "culture" ? "Phong tục & Nghi lễ" : "",
    excerpt: "",
    region: "NATIONWIDE",
    image_url: "",
    source: "",
    reviewNote: "",
    // Special kind fields
    calendar: "LUNAR",
    day: "1",
    month: "1",
    description: "",
    name: "",
    stick_number: "1",
    xam_type: "quan_am",
    fortune_level: "Thượng Cát",
    poem: "",
    meaning: "",
    advice: "",
    occasion: "",
    language_style: "Quốc ngữ chuẩn",
    ritual_id: "",
    content: "",
  });

  // Source & provenance metadata (clean separation)
  const [sourceDoc, setSourceDoc] = useState("");
  const [sourceAuthor, setSourceAuthor] = useState("");
  const [bibliography, setBibliography] = useState("");
  const [contentType, setContentType] = useState<"" | "GROUP_AUTHORED" | "FACT" | "LEGEND" | "QUOTATION">("");
  const [sourceLocator, setSourceLocator] = useState("");
  const [localCommunity, setLocalCommunity] = useState("");
  const [scopeOfPractice, setScopeOfPractice] = useState("");
  const [contentRightsBasis, setContentRightsBasis] = useState("");
  const [imageCaption, setImageCaption] = useState("");
  const [imageCredit, setImageCredit] = useState("");
  const [imageSource, setImageSource] = useState("");
  const [imageRightsBasis, setImageRightsBasis] = useState("");
  const [imageLoadError, setImageLoadError] = useState(false);
  const [membersOnly, setMembersOnly] = useState(false);

  // Dynamic sections (culture) and steps (rituals)
  const [sections, setSections] = useState([{ heading: "", body: "" }]);
  const [steps, setSteps] = useState<Step[]>([{ title: "", description: "" }]);
  const [checklists, setChecklists] = useState<ChecklistDraft[]>([]);
  const [rituals, setRituals] = useState<RitualChoice[]>([]);

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(Boolean(id));
  const [savingMode, setSavingMode] = useState<"draft" | "submit" | null>(null);

  const meta = KIND_META[kind];
  const activeWorkflowStage: Partial<Record<EditorialStatus, number>> = {
    DRAFT: 0,
    IN_REVIEW: 1,
    APPROVED: 2,
    HIDDEN: 2,
    PUBLISHED: 3,
  };
  const currentWorkflowStage = editorialStatus
    ? activeWorkflowStage[editorialStatus]
    : undefined;

  // Load rituals if kind is prayers
  useEffect(() => {
    let active = true;
    if (kind === "prayers") {
      void (async () => {
        try {
          const firstPage = await loadAdminList<RitualChoice>("rituals", 1, "");
          const remaining = await Promise.all(
            Array.from(
              { length: Math.max(0, firstPage.pagination.pageCount - 1) },
              (_, index) => loadAdminList<RitualChoice>("rituals", index + 2, ""),
            ),
          );
          if (active) {
            setRituals([
              ...firstPage.items,
              ...remaining.flatMap((page) => page.items),
            ]);
          }
        } catch (loadError) {
          if (active) {
            setError(
              loadError instanceof Error
                ? loadError.message
                : "Không tải được danh sách nghi lễ.",
            );
          }
        }
      })();
    }
    return () => {
      active = false;
    };
  }, [kind]);

  // Load record if editing
  useEffect(() => {
    if (!id) return;
    let active = true;
    apiRequest<Record<string, unknown>>(`/admin/${kind}/${id}`)
      .then((record) => {
        setExpectedUpdatedAt(typeof record.updated_at === "string" ? record.updated_at : undefined);
        if (!active) return;
        const loadedStatus = record.editorial_status;
        setEditorialStatus(
          loadedStatus === "DRAFT" ||
            loadedStatus === "IN_REVIEW" ||
            loadedStatus === "APPROVED" ||
            loadedStatus === "PUBLISHED" ||
            loadedStatus === "HIDDEN" ||
            loadedStatus === "REVOKED"
            ? loadedStatus
            : null,
        );
        const next: Record<string, string> = {};
        for (const [key, value] of Object.entries(record)) {
          if (typeof value === "string" || typeof value === "number") {
            next[key] = String(value);
          }
        }

        // Clean source URL: if source contains "Tư liệu biên tập nội bộ" or is not https, move to sourceDoc
        if (record.source) {
          const rawSource = String(record.source).trim();
          if (/^https?:\/\//i.test(rawSource)) {
            next.source = rawSource;
          } else {
            next.source = "";
            setSourceDoc(rawSource);
          }
        }

        setValues((current) => ({ ...current, ...next }));
        setMembersOnly(record.members_only === true);

        const content = record.content as
          | {
              provenance?: Record<string, unknown>;
              sections?: Array<{
                heading?: string;
                title?: string;
                body?: string | string[];
                paragraphs?: string[];
              }>;
            }
          | undefined;

        const provenance = content?.provenance;
        const ritualProvenance = record.content_provenance && typeof record.content_provenance === "object" ? record.content_provenance as Record<string, unknown> : undefined;
        const legacyProvenance = record.legacyProvenance && typeof record.legacyProvenance === "object" ? record.legacyProvenance as Record<string, unknown> : undefined;
        if (provenance) {
          setSourceDoc(String(provenance.sourceTitle ?? ""));
          setSourceAuthor(String(provenance.sourceAuthor ?? ""));
          setBibliography(String(provenance.bibliography ?? ""));
          setSourceLocator(String(provenance.sourceLocator ?? ""));
          setLocalCommunity(String(provenance.localCommunity ?? ""));
          setImageCaption(String(provenance.imageCaption ?? ""));
          setImageSource(String(provenance.imageSource ?? ""));
          setImageRightsBasis(String(provenance.imageRightsBasis ?? ""));
          if (["GROUP_AUTHORED", "FACT", "LEGEND", "QUOTATION"].includes(String(provenance.contentType))) setContentType(String(provenance.contentType) as typeof contentType);
        } else if (legacyProvenance) {
          setSourceDoc(String(legacyProvenance.sourceTitle ?? ""));
          setSourceLocator(String(legacyProvenance.sourceLocator ?? ""));
          setLocalCommunity(String(legacyProvenance.localCommunity ?? ""));
          setImageCaption(String(legacyProvenance.imageCaption ?? ""));
          setImageRightsBasis(String(legacyProvenance.imageRightsBasis ?? ""));
        }
        if (kind === "rituals" && ritualProvenance) {
          const ritualType = String(ritualProvenance.contentType ?? "");
          if (["GROUP_AUTHORED", "FACT", "LEGEND", "QUOTATION"].includes(ritualType)) setContentType(ritualType as typeof contentType);
          setSourceDoc(String(ritualProvenance.sourceTitle ?? ""));
          setSourceAuthor(String(ritualProvenance.authorOrOrganization ?? ritualProvenance.sourceAuthor ?? ""));
          setSourceLocator(String(ritualProvenance.sourceLocator ?? ""));
          setLocalCommunity(String(ritualProvenance.localCommunity ?? ""));
          setScopeOfPractice(String(ritualProvenance.scope ?? ""));
          setContentRightsBasis(String(ritualProvenance.contentRightsBasis ?? ""));
          setBibliography(String(ritualProvenance.bibliography ?? ""));
        }

        if (content?.sections?.length) {
          setSections(
            content.sections.map((section) => ({
              heading: section.heading ?? section.title ?? "",
              body: Array.isArray(section.body)
                ? section.body.join("\n\n")
                : section.body ?? section.paragraphs?.join("\n\n") ?? "",
            })),
          );
        }

        const storedSteps = record.ritual_steps as
          | Array<{ title?: string; description?: string }>
          | undefined;
        if (storedSteps?.length) {
          setSteps(
            storedSteps.map((step) => ({
              title: step.title ?? "",
              description: step.description ?? "",
            })),
          );
        }
        const storedChecklists = record.checklists as ChecklistDraft[] | undefined;
        if (Array.isArray(storedChecklists)) {
          setChecklists(storedChecklists.filter((item) => item && typeof item.id === "string" && typeof item.label === "string"));
        }
      })
      .catch((loadError) => {
        if (active) {
          setError(
            loadError instanceof Error
              ? loadError.message
              : "Không tải được bản thảo.",
          );
        }
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, [kind, id]);

  const set = (key: string, value: string) => {
    setValues((previous) => ({ ...previous, [key]: value }));
  };

  const handleTitleChange = (newTitle: string) => {
    set("title", newTitle);
    // Auto-generate slug if not customized and not an existing article
    if (slugUnlocked && !id) {
      set("slug", slugifyVietnamese(newTitle));
    }
  };

  const isSourceUrlInvalid =
    Boolean(values.source) && !/^https:\/\//i.test(values.source);

  const isExcerptDuplicatingTitle =
    Boolean(values.title && values.excerpt) &&
    values.excerpt.trim().toLowerCase() === values.title.trim().toLowerCase();

  const save = async (event?: React.FormEvent, submitForReview = false) => {
    if (event) event.preventDefault();
    if (savingMode) return;

    // Validate HTTPS source URL
    if (isSourceUrlInvalid) {
      setError("URL nguồn tham khảo không hợp lệ. Vui lòng nhập URL bắt đầu bằng https:// hoặc để trống.");
      setActiveTab("media");
      return;
    }
    if (kind === "culture" && !contentType) {
      setError("Hãy chọn loại nội dung để khai báo hồ sơ nguồn phù hợp.");
      setActiveTab("info");
      return;
    }
    if (kind === "rituals" && submitForReview && !contentType) {
      setError("Hãy khai báo hướng dẫn là nội dung nhóm biên soạn hay nội dung dựa trên tư liệu trước khi gửi duyệt.");
      setActiveTab("info");
      return;
    }

    setSavingMode(submitForReview ? "submit" : "draft");
    setError("");

    const payload: Record<string, unknown> = {
      region: values.region || "NATIONWIDE",
      source: values.source.trim(),
      reviewNote: values.reviewNote.trim() || (submitForReview ? "Gửi duyệt nội dung" : "Lưu bản nháp"),
      editorialStatus: submitForReview ? "IN_REVIEW" : "DRAFT",
      ...(id && expectedUpdatedAt ? { expectedUpdatedAt } : {}),
    };

    if (kind === "culture") {
      const generatedSlug = values.slug.trim() || slugifyVietnamese(values.title) || "bai-viet-moi";
      payload.slug = generatedSlug;
      payload.title = values.title.trim();
      payload.members_only = membersOnly;
      payload.category = values.category.trim() || "Phong tục & Nghi lễ";
      payload.excerpt = values.excerpt.trim();
      payload.image_url = values.image_url.trim();
      payload.provenance = {
        contentType,
        sourceTitle: sourceDoc.trim(),
        sourceAuthor: sourceAuthor.trim(),
        bibliography: bibliography.trim(),
        sourceLocator: sourceLocator.trim(),
        localCommunity: localCommunity.trim(),
        imageCaption: imageCaption.trim(),
        imageSource: imageSource.trim() || imageCredit.trim(),
        imageRightsBasis: imageRightsBasis.trim(),
      };
      payload.sections = sections.map((sec, idx) => ({
        heading: sec.heading.trim() || `Phần ${idx + 1}`,
        body: sec.body.trim() || "Nội dung đang được bổ sung…",
      }));
    } else if (kind === "calendar") {
      payload.title = values.title.trim();
      payload.category = values.category.trim() || "Lễ hội";
      payload.calendar = values.calendar || "LUNAR";
      payload.day = Number(values.day) || 1;
      payload.month = Number(values.month) || 1;
      payload.description = values.description.trim();
    } else if (kind === "xam") {
      payload.name = values.name.trim() || `Quẻ số ${values.stick_number}`;
      payload.stick_number = Number(values.stick_number) || 1;
      payload.xam_type = values.xam_type.trim() || "quan_am";
      payload.category = values.category.trim() || "Chiêm nghiệm";
      payload.fortune_level = values.fortune_level || "Thượng Cát";
      payload.poem = values.poem.trim();
      payload.meaning = values.meaning.trim() || "Đang cập nhật diễn giải.";
      payload.advice = values.advice.trim();
    } else if (kind === "rituals") {
      const generatedSlug = values.slug.trim() || slugifyVietnamese(values.title) || "nghi-le-moi";
      payload.slug = generatedSlug;
      payload.title = values.title.trim();
      payload.description = values.description.trim();
      payload.occasion = values.occasion.trim() || "Dịp lễ truyền thống";
      payload.calendar = values.calendar || null;
      payload.steps = steps.map((st, idx) => ({
        title: st.title.trim() || `Bước ${idx + 1}`,
        description: st.description.trim() || "Thực hiện theo chỉ dẫn nghi thức.",
      }));
      payload.checklists = checklists
        .map((item) => ({ id: item.id, label: item.label.trim() }))
        .filter((item) => item.label.length > 0);
      payload.provenance = {
        ...(contentType ? { contentType } : {}),
        authorOrOrganization: sourceAuthor.trim(),
        scope: scopeOfPractice.trim(),
        sourceTitle: sourceDoc.trim(),
        sourceAuthor: sourceAuthor.trim(),
        bibliography: bibliography.trim(),
        sourceLocator: sourceLocator.trim(),
        localCommunity: localCommunity.trim(),
        contentRightsBasis: contentRightsBasis.trim(),
      };
    } else if (kind === "prayers") {
      payload.title = values.title.trim();
      payload.language_style = values.language_style.trim() || "Quốc ngữ chuẩn";
      payload.content = values.content.trim();
      payload.ritual_id = values.ritual_id || null;
    }

    try {
      await apiRequest(`/admin/${kind}${id ? `/${id}` : ""}`, {
        method: id ? "PUT" : "POST",
        body: JSON.stringify(payload),
      });
      onSaved();
    } catch (saveError) {
      setError(
        saveError instanceof Error
          ? saveError.message
          : "Chưa lưu được nội dung bản thảo.",
      );
    } finally {
      setSavingMode(null);
    }
  };

  return (
    <div
      className="admin-editor-overlay"
      role="dialog"
      aria-modal="true"
      aria-labelledby="content-editor-title"
      onClick={(e) => {
        if (e.target === e.currentTarget && !savingMode) onClose();
      }}
    >
      <div className="admin-editor-modal">
        {/* Header */}
        <div className="admin-editor-header">
          <div className="admin-editor-header-copy">
            <span className="admin-editor-eyebrow">
              <Sparkles size={13} /> {meta.tag}
            </span>
            <h2 id="content-editor-title" className="admin-editor-title">
              {id ? `Biên tập ${meta.title}` : `Tạo bản nháp ${meta.title}`}
            </h2>
            <div className="admin-editor-workflow" style={{ marginTop: "4px" }}>
              <span className={`admin-editor-step ${currentWorkflowStage === 0 ? "is-active" : ""}`}>
                <FileText size={12} /> 1. Bản nháp
              </span>
              <span className="admin-editor-step-arrow">➔</span>
              <span className={`admin-editor-step ${currentWorkflowStage === 1 ? "is-active" : ""}`}>
                <ClockIcon size={12} /> 2. Chờ duyệt
              </span>
              <span className="admin-editor-step-arrow">➔</span>
              <span className={`admin-editor-step ${currentWorkflowStage === 2 ? "is-active" : ""}`}>
                <CheckCircle2 size={12} /> 3. Đã duyệt
              </span>
              <span className="admin-editor-step-arrow">➔</span>
              <span className={`admin-editor-step ${currentWorkflowStage === 3 ? "is-active" : ""}`}>
                <Globe size={12} /> 4. Đang công khai
              </span>
            </div>
            <div className="admin-editor-current-status">
              Trạng thái hiện tại: <strong>{editorialStatus ? EDITORIAL_STATUS_LABELS[editorialStatus] : "Chưa xác định"}</strong>
            </div>
          </div>
          <button
            type="button"
            className="admin-editor-close-btn"
            onClick={onClose}
            disabled={Boolean(savingMode)}
            title="Đóng bản thảo (Esc)"
            aria-label="Đóng bản thảo"
          >
            <X size={18} />
          </button>
        </div>

        {/* Explain the distinct save and review actions. */}
        <div style={{ padding: "0 28px", paddingTop: "14px" }}>
          <div className="admin-editor-notice">
            <AlertCircle size={16} style={{ color: "var(--admin-gold)", flexShrink: 0, marginTop: "2px" }} />
            <div>
              <div style={{ fontWeight: 650, marginBottom: "4px" }}>
                Quy trình duyệt bài
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "4px", fontSize: "12px", lineHeight: "1.5" }}>
                <div>
                  • <strong>Lưu bản nháp:</strong> Lưu nội dung ở trạng thái Nháp để tiếp tục chỉnh sửa. Nội dung chưa hiển thị với người dùng.
                </div>
                <div>
                  • <strong>Gửi duyệt:</strong> Chuyển nội dung sang Chờ duyệt. Quản trị viên kiểm tra nội dung và hồ sơ nguồn, quyền sử dụng (nếu có). Nội dung chỉ hiển thị sau khi được duyệt và công khai.
                </div>
                {editorialStatus === "PUBLISHED" && (
                  <div>
                    • Nội dung này đang công khai. Sau khi lưu thay đổi, nội dung sẽ tạm ẩn và cần được duyệt, công khai lại.
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Form Body */}
        {loading ? (
          <div className="admin-editor-body" style={{ alignItems: "center", justifyContent: "center", minHeight: "320px" }}>
            <RefreshCw size={26} className="admin-spin-icon" style={{ color: "var(--admin-gold)" }} />
            <p style={{ margin: 0, color: "var(--admin-muted)", fontSize: "14px" }}>
              Đang đồng bộ dữ liệu bản thảo từ máy chủ…
            </p>
          </div>
        ) : (
          <form id="admin-content-editor-form" onSubmit={(event) => void save(event, false)} className="admin-editor-body">
            {error && (
              <div className="admin-alert" role="alert" style={{ margin: 0 }}>
                <div className="admin-alert-content">
                  <AlertCircle size={18} />
                  <span>{error}</span>
                </div>
                <button type="button" onClick={() => setError("")} aria-label="Đóng">
                  <X size={14} />
                </button>
              </div>
            )}

            {/* 3 MVP Group Tabs + Live Preview */}
            <div className="admin-editor-tabs-nav">
              <button
                type="button"
                className={`admin-editor-tab-btn ${activeTab === "info" ? "is-active" : ""}`}
                onClick={() => setActiveTab("info")}
              >
                <BookOpenText size={15} /> 1. Thông tin bài viết
              </button>
              <button
                type="button"
                className={`admin-editor-tab-btn ${activeTab === "content" ? "is-active" : ""}`}
                onClick={() => setActiveTab("content")}
              >
                <FileText size={15} /> 2. Nội dung chi tiết
              </button>
              <button
                type="button"
                className={`admin-editor-tab-btn ${activeTab === "media" ? "is-active" : ""}`}
                onClick={() => setActiveTab("media")}
              >
                <Link2 size={15} /> 3. Nguồn & Ảnh minh họa
              </button>
              <button
                type="button"
                className={`admin-editor-tab-btn ${activeTab === "preview" ? "is-active" : ""}`}
                onClick={() => setActiveTab("preview")}
                style={{ marginLeft: "auto" }}
              >
                <Eye size={15} /> Xem trước bài viết
              </button>
            </div>

            {/* TAB 1: THÔNG TIN BÀI VIẾT */}
            {activeTab === "info" && (
              <div className="admin-editor-grid">
                {/* Tiêu đề bài viết */}
                <div className="admin-editor-field admin-editor-col-full">
                  <label htmlFor="field-title" className="admin-editor-label">
                    <span>
                      {kind === "calendar"
                        ? "Tên sự kiện / Lễ hội"
                        : kind === "rituals"
                          ? "Tên nghi lễ truyền thống"
                          : kind === "prayers"
                            ? "Tên bài văn khấn"
                            : kind === "xam"
                              ? "Tên thẻ quẻ"
                              : "Tiêu đề bài viết"}{" "}
                      <span style={{ color: "var(--admin-crimson)" }}>*</span>
                    </span>
                    <span className="admin-editor-label-hint">Bắt buộc</span>
                  </label>
                  <input
                    id="field-title"
                    required
                    className="admin-editor-input"
                    type="text"
                    placeholder="Nhập tiêu đề cô đọng, rõ nghĩa (ví dụ: Lễ hội Tịch điền Đọi Sơn)…"
                    value={kind === "xam" ? values.name || "" : values.title || ""}
                    onChange={(e) =>
                      kind === "xam" ? set("name", e.target.value) : handleTitleChange(e.target.value)
                    }
                  />
                </div>

                {kind === "culture" && (
                  <label className="admin-editor-col-full flex items-start gap-3">
                    <input
                      type="checkbox"
                      checked={membersOnly}
                      onChange={(event) =>
                        setMembersOnly(event.target.checked)
                      }
                    />

                    <span>
                      <strong>Chỉ dành cho hội viên Tâm An</strong>
                      <span className="block text-sm">
                        Bài vẫn phải được duyệt và xuất bản.
                        Bài hội viên không xuất hiện trong danh mục văn hóa miễn phí.
                      </span>
                    </span>
                  </label>
                )}

                {/* Chủ đề văn hóa */}
                <div className="admin-editor-field">
                  <label htmlFor="field-category" className="admin-editor-label">
                    <span>Chủ đề chuyên mục <span style={{ color: "var(--admin-crimson)" }}>*</span></span>
                    <span className="admin-editor-label-hint">Chọn một danh mục</span>
                  </label>
                  {kind === "culture" ? (
                    <select
                      id="field-category"
                      className="admin-editor-select"
                      value={values.category || "Phong tục & Nghi lễ"}
                      onChange={(e) => set("category", e.target.value)}
                    >
                      {/* If legacy data has custom category, display it gracefully */}
                      {values.category && !CULTURE_CATEGORIES.includes(values.category) && (
                        <option value={values.category}>Tùy chỉnh: {values.category}</option>
                      )}
                      {CULTURE_CATEGORIES.map((cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <input
                      id="field-category"
                      className="admin-editor-input"
                      type="text"
                      placeholder="Phân loại chủ đề…"
                      value={values.category || ""}
                      onChange={(e) => set("category", e.target.value)}
                    />
                  )}
                </div>

                {/* Vùng miền liên quan */}
                <div className="admin-editor-field">
                  <label htmlFor="field-region" className="admin-editor-label">
                    <span>Vùng miền liên quan <span style={{ color: "var(--admin-crimson)" }}>*</span></span>
                  </label>
                  <select
                    id="field-region"
                    className="admin-editor-select"
                    value={values.region || "NATIONWIDE"}
                    onChange={(event) => set("region", event.target.value)}
                  >
                    <option value="NATIONWIDE">🇻🇳 Toàn quốc (Chung)</option>
                    <option value="NORTH">🏔️ Bắc Bộ</option>
                    <option value="CENTRAL">🌊 Trung Bộ</option>
                    <option value="SOUTH">🌾 Nam Bộ</option>
                  </select>
                </div>

                {kind === "rituals" && <div className="admin-editor-field">
                  <label htmlFor="field-ritual-content-type" className="admin-editor-label">Loại hướng dẫn</label>
                  <select id="field-ritual-content-type" className="admin-editor-select" value={contentType} onChange={(event) => setContentType(event.target.value as typeof contentType)}>
                    <option value="">Chưa phân loại</option>
                    <option value="GROUP_AUTHORED">Hướng dẫn nguyên bản do nhóm biên soạn</option>
                    <option value="FACT">Nhận định dựa trên tư liệu</option>
                    <option value="LEGEND">Truyền thuyết / tín ngưỡng</option>
                    <option value="QUOTATION">Có câu trích dẫn</option>
                  </select>
                </div>}

                {/* Phạm vi nội dung: Địa phương / Cộng đồng cụ thể */}
                <div className="admin-editor-field admin-editor-col-full">
                  <label htmlFor="field-local-community" className="admin-editor-label">
                    <span>Địa phương / Cộng đồng cụ thể</span>
                    <span className="admin-editor-label-hint">Khuyến nghị chi tiết hóa (ví dụ: Hội An, Sa Pa, Tây Ninh…)</span>
                  </label>
                  <input
                    id="field-local-community"
                    className="admin-editor-input"
                    type="text"
                    placeholder="Ví dụ: Làng Đọi Tam (Hà Nam), Đồng bào Khmer Trà Vinh, Đền Hùng (Phú Thọ)…"
                    value={localCommunity}
                    onChange={(e) => setLocalCommunity(e.target.value)}
                  />
                </div>

                {kind === "rituals" && <div className="admin-editor-field admin-editor-col-full">
                  <label htmlFor="field-ritual-scope" className="admin-editor-label">Phạm vi áp dụng / trường hợp hướng dẫn này phù hợp</label>
                  <textarea id="field-ritual-scope" rows={2} className="admin-editor-textarea" maxLength={500} value={scopeOfPractice} onChange={(event) => setScopeOfPractice(event.target.value)} placeholder="Ghi giới hạn theo gia đình, địa phương hoặc hoàn cảnh; tránh tuyên bố chuẩn chung." />
                </div>}

                {kind === "culture" && (
                  <div className="admin-editor-field">
                    <label htmlFor="field-content-type" className="admin-editor-label">Loại nội dung</label>
                    <select id="field-content-type" className="admin-editor-select" required value={contentType} onChange={(event) => setContentType(event.target.value as typeof contentType)}>
                      <option value="">Chọn loại nội dung</option>
                      <option value="GROUP_AUTHORED">Do nhóm biên soạn</option>
                      <option value="FACT">Thông tin / sự kiện</option>
                      <option value="LEGEND">Truyền thuyết / tín ngưỡng</option>
                      <option value="QUOTATION">Có câu trích dẫn</option>
                    </select>
                  </div>
                )}

                {/* Tóm tắt ngắn (1-3 câu, không lặp tiêu đề) */}
                {kind === "culture" && (
                  <div className="admin-editor-field admin-editor-col-full">
                    <label htmlFor="field-excerpt" className="admin-editor-label">
                      <span>Tóm tắt giới thiệu (1–3 câu)</span>
                      <span className="admin-editor-label-hint">{values.excerpt?.length || 0}/500 ký tự</span>
                    </label>
                    <textarea
                      id="field-excerpt"
                      rows={3}
                      className="admin-editor-textarea"
                      placeholder="Viết 1–3 câu giới thiệu bối cảnh, ý nghĩa và giá trị nhân văn cốt lõi của bài viết (không lặp lại nguyên văn tiêu đề)…"
                      value={values.excerpt || ""}
                      onChange={(e) => set("excerpt", e.target.value)}
                    />
                    {isExcerptDuplicatingTitle && (
                      <div className="admin-field-feedback is-warning">
                        <AlertCircle size={14} />
                        <span>Lưu ý: Tóm tắt đang lặp nguyên tiêu đề. Hãy viết 1–3 câu khái quát nội dung và bối cảnh.</span>
                      </div>
                    )}
                  </div>
                )}

                {/* Calendar specific fields */}
                {kind === "calendar" && (
                  <>
                    <div className="admin-editor-field">
                      <label htmlFor="field-cal-type" className="admin-editor-label">
                        <span>Hệ thống lịch tổ chức <span style={{ color: "var(--admin-crimson)" }}>*</span></span>
                      </label>
                      <select
                        id="field-cal-type"
                        className="admin-editor-select"
                        value={values.calendar || "LUNAR"}
                        onChange={(e) => set("calendar", e.target.value)}
                      >
                        <option value="LUNAR">🌙 Âm lịch truyền thống</option>
                        <option value="SOLAR">☀️ Dương lịch quốc tế</option>
                      </select>
                    </div>
                    <div className="admin-editor-field" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
                      <div>
                        <label htmlFor="field-day" className="admin-editor-label">
                          <span>Ngày <span style={{ color: "var(--admin-crimson)" }}>*</span></span>
                        </label>
                        <input
                          id="field-day"
                          type="number"
                          min={1}
                          max={31}
                          required
                          className="admin-editor-input"
                          value={values.day || "1"}
                          onChange={(e) => set("day", e.target.value)}
                        />
                      </div>
                      <div>
                        <label htmlFor="field-month" className="admin-editor-label">
                          <span>Tháng <span style={{ color: "var(--admin-crimson)" }}>*</span></span>
                        </label>
                        <input
                          id="field-month"
                          type="number"
                          min={1}
                          max={12}
                          required
                          className="admin-editor-input"
                          value={values.month || "1"}
                          onChange={(e) => set("month", e.target.value)}
                        />
                      </div>
                    </div>
                  </>
                )}

                {/* Xam specific fields */}
                {kind === "xam" && (
                  <>
                    <div className="admin-editor-field">
                      <label htmlFor="field-stick-number" className="admin-editor-label">
                        <span>Số hiệu quẻ xăm (1–100) <span style={{ color: "var(--admin-crimson)" }}>*</span></span>
                      </label>
                      <input
                        id="field-stick-number"
                        type="number"
                        min={1}
                        max={100}
                        required
                        className="admin-editor-input"
                        value={values.stick_number || "1"}
                        onChange={(e) => set("stick_number", e.target.value)}
                      />
                    </div>
                    <div className="admin-editor-field">
                      <label htmlFor="field-fortune" className="admin-editor-label">
                        <span>Xếp loại điềm quẻ <span style={{ color: "var(--admin-crimson)" }}>*</span></span>
                      </label>
                      <select
                        id="field-fortune"
                        className="admin-editor-select"
                        value={values.fortune_level || "Thượng Cát"}
                        onChange={(e) => set("fortune_level", e.target.value)}
                      >
                        <option value="Thượng Cát">✨ Thượng Cát (Đại Cát)</option>
                        <option value="Trung Cát">⚖️ Trung Cát (Trung Bình)</option>
                        <option value="Hạ Bình">⚠️ Hạ Bình (Hạ Điềm)</option>
                        <option value="Bình">Bình thường</option>
                      </select>
                    </div>
                  </>
                )}

                {/* Rituals occasion */}
                {kind === "rituals" && (
                  <div className="admin-editor-field admin-editor-col-full">
                    <label htmlFor="field-occasion" className="admin-editor-label">
                      <span>Dịp áp dụng thực hiện</span>
                    </label>
                    <input
                      id="field-occasion"
                      className="admin-editor-input"
                      type="text"
                      placeholder="Ví dụ: Rằm tháng Giêng, Tết Nguyên đán, Lễ nhập trạch…"
                      value={values.occasion || ""}
                      onChange={(e) => set("occasion", e.target.value)}
                    />
                  </div>
                )}

                {/* Prayers linked ritual */}
                {kind === "prayers" && (
                  <div className="admin-editor-field admin-editor-col-full">
                    <label htmlFor="field-ritual" className="admin-editor-label">
                      <span>Gắn với nghi lễ cụ thể</span>
                    </label>
                    <select
                      id="field-ritual"
                      className="admin-editor-select"
                      value={values.ritual_id || ""}
                      onChange={(e) => set("ritual_id", e.target.value)}
                    >
                      <option value="">Không gắn với nghi lễ riêng</option>
                      {rituals.map((ritual) => (
                        <option key={ritual.id} value={ritual.id}>
                          {ritual.title}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
              </div>
            )}

            {/* TAB 2: NỘI DUNG CHI TIẾT */}
            {activeTab === "content" && (
              <div className="admin-editor-grid">
                {/* Kind: Culture -> Multi-section content */}
                {kind === "culture" && (
                  <div className="admin-editor-sections-block admin-editor-col-full">
                    <div className="admin-editor-block-header">
                      <div>
                        <strong>Các phân mục nội dung bài viết ({sections.length})</strong>
                        <p style={{ margin: "2px 0 0", fontSize: "12px", color: "var(--admin-muted)" }}>
                          Mỗi phân mục gồm tiêu đề đề mục và nội dung phân tích chi tiết.
                        </p>
                      </div>
                      <button
                        type="button"
                        className="admin-editor-add-sub-btn"
                        onClick={() => setSections([...sections, { heading: "", body: "" }])}
                      >
                        <Plus size={14} /> Thêm phân mục
                      </button>
                    </div>

                    {sections.map((section, index) => (
                      <div key={index} className="admin-editor-sub-card">
                        <div className="admin-editor-sub-card-top">
                          <span>Phân mục #{index + 1}</span>
                          <button
                            type="button"
                            className="admin-editor-remove-sub-btn"
                            disabled={sections.length === 1}
                            onClick={() => setSections(sections.filter((_, i) => i !== index))}
                          >
                            <Trash2 size={12} /> Xóa phân mục
                          </button>
                        </div>
                        <input
                          required
                          className="admin-editor-input"
                          placeholder={`Tiêu đề phân mục ${index + 1} (ví dụ: Nguồn gốc lịch sử)…`}
                          value={section.heading}
                          onChange={(e) =>
                            setSections(
                              sections.map((item, i) =>
                                i === index ? { ...item, heading: e.target.value } : item,
                              ),
                            )
                          }
                        />
                        <textarea
                          required
                          rows={4}
                          className="admin-editor-textarea"
                          placeholder="Nội dung chi tiết phân mục…"
                          value={section.body}
                          onChange={(e) =>
                            setSections(
                              sections.map((item, i) =>
                                i === index ? { ...item, body: e.target.value } : item,
                              ),
                            )
                          }
                        />
                      </div>
                    ))}
                  </div>
                )}

                {/* Kind: Rituals -> Step-by-step */}
                {kind === "rituals" && (
                  <>
                    <div className="admin-editor-field admin-editor-col-full">
                      <label htmlFor="field-rit-desc" className="admin-editor-label">
                        <span>Ý nghĩa và quy chuẩn nghi lễ</span>
                      </label>
                      <textarea
                        id="field-rit-desc"
                        rows={3}
                        className="admin-editor-textarea"
                        placeholder="Nêu rõ bối cảnh và ý nghĩa tâm linh của nghi lễ…"
                        value={values.description || ""}
                        onChange={(e) => set("description", e.target.value)}
                      />
                    </div>

                    <div className="admin-editor-sections-block admin-editor-col-full">
                      <div className="admin-editor-block-header">
                        <strong>Các bước tiến hành nghi thức ({steps.length})</strong>
                        <button
                          type="button"
                          className="admin-editor-add-sub-btn"
                          onClick={() => setSteps([...steps, { title: "", description: "" }])}
                        >
                          <Plus size={14} /> Thêm bước nghi lễ
                        </button>
                      </div>
                      {steps.map((step, index) => (
                        <div key={index} className="admin-editor-sub-card">
                          <div className="admin-editor-sub-card-top">
                            <span>Bước #{index + 1}</span>
                            <button
                              type="button"
                              className="admin-editor-remove-sub-btn"
                              disabled={steps.length === 1}
                              onClick={() => setSteps(steps.filter((_, i) => i !== index))}
                            >
                              <Trash2 size={12} /> Xóa bước này
                            </button>
                          </div>
                          <input
                            required
                            className="admin-editor-input"
                            placeholder={`Tên bước ${index + 1} (ví dụ: Chuẩn bị lễ phẩm)…`}
                            value={step.title}
                            onChange={(e) =>
                              setSteps(
                                steps.map((item, i) =>
                                  i === index ? { ...item, title: e.target.value } : item,
                                ),
                              )
                            }
                          />
                          <textarea
                            required
                            rows={3}
                            className="admin-editor-textarea"
                            placeholder="Hướng dẫn cách thức hành lễ chi tiết…"
                            value={step.description}
                            onChange={(e) =>
                              setSteps(
                                steps.map((item, i) =>
                                  i === index ? { ...item, description: e.target.value } : item,
                                ),
                              )
                            }
                          />
                        </div>
                      ))}
                    </div>

                    <div className="admin-editor-sections-block admin-editor-col-full">
                      <div className="admin-editor-block-header">
                        <div>
                          <strong>Checklist chuẩn bị ({checklists.length})</strong>
                          <p style={{ margin: "2px 0 0", fontSize: "12px", color: "var(--admin-muted)" }}>
                            ID mục được giữ nguyên khi đổi nhãn hoặc thứ tự để bảo toàn tiến độ người dùng.
                          </p>
                        </div>
                        <button
                          type="button"
                          className="admin-editor-add-sub-btn"
                          onClick={() => setChecklists((items) => [...items, { id: createChecklistId(), label: "" }])}
                        >
                          <Plus size={14} /> Thêm mục checklist
                        </button>
                      </div>
                      {checklists.map((item, index) => (
                        <div key={item.id} className="admin-editor-sub-card">
                          <div className="admin-editor-sub-card-top">
                            <span>Mục #{index + 1}</span>
                            <div style={{ display: "flex", gap: 6 }}>
                              <button type="button" className="admin-editor-remove-sub-btn" disabled={index === 0}
                                aria-label={`Chuyển mục ${index + 1} lên`}
                                onClick={() => setChecklists((items) => { const next = [...items]; [next[index - 1], next[index]] = [next[index], next[index - 1]]; return next; })}>
                                <ArrowUp size={12} /> Lên
                              </button>
                              <button type="button" className="admin-editor-remove-sub-btn" disabled={index === checklists.length - 1}
                                aria-label={`Chuyển mục ${index + 1} xuống`}
                                onClick={() => setChecklists((items) => { const next = [...items]; [next[index], next[index + 1]] = [next[index + 1], next[index]]; return next; })}>
                                <ArrowDown size={12} /> Xuống
                              </button>
                              <button type="button" className="admin-editor-remove-sub-btn"
                                onClick={() => setChecklists((items) => items.filter((candidate) => candidate.id !== item.id))}>
                                <Trash2 size={12} /> Xóa
                              </button>
                            </div>
                          </div>
                          <input
                            className="admin-editor-input"
                            aria-label={`Nội dung mục checklist ${index + 1}`}
                            placeholder="Ví dụ: Chuẩn bị nước sạch"
                            value={item.label}
                            onChange={(event) => setChecklists((items) => items.map((candidate) => candidate.id === item.id ? { ...candidate, label: event.target.value } : candidate))}
                          />
                        </div>
                      ))}
                      {checklists.length === 0 && (
                        <p style={{ color: "var(--admin-muted)", fontSize: 13 }}>
                          Chưa có mục checklist. Cần ít nhất một mục hợp lệ trước khi gửi duyệt.
                        </p>
                      )}
                    </div>
                  </>
                )}

                {/* Kind: Calendar -> Event Description */}
                {kind === "calendar" && (
                  <div className="admin-editor-field admin-editor-col-full">
                    <label htmlFor="field-cal-desc" className="admin-editor-label">
                      <span>Giới thiệu sự kiện & lưu ý tổ chức</span>
                    </label>
                    <textarea
                      id="field-cal-desc"
                      rows={6}
                      className="admin-editor-textarea"
                      placeholder="Mô tả bối cảnh lễ hội, các hoạt động văn hóa đặc sắc và lưu ý chuẩn bị…"
                      value={values.description || ""}
                      onChange={(e) => set("description", e.target.value)}
                    />
                  </div>
                )}

                {/* Kind: Xam -> Poem, Meaning, Advice */}
                {kind === "xam" && (
                  <>
                    <div className="admin-editor-field admin-editor-col-full">
                      <label htmlFor="field-poem" className="admin-editor-label">
                        <span>Thơ gốc chữ Hán / Dịch thơ</span>
                      </label>
                      <textarea
                        id="field-poem"
                        rows={4}
                        className="admin-editor-textarea"
                        placeholder="Nội dung bài thơ quẻ xăm…"
                        value={values.poem || ""}
                        onChange={(e) => set("poem", e.target.value)}
                      />
                    </div>
                    <div className="admin-editor-field admin-editor-col-full">
                      <label htmlFor="field-meaning" className="admin-editor-label">
                        <span>Diễn giải ý nghĩa quẻ <span style={{ color: "var(--admin-crimson)" }}>*</span></span>
                      </label>
                      <textarea
                        id="field-meaning"
                        required
                        rows={4}
                        className="admin-editor-textarea"
                        placeholder="Ý nghĩa tổng quan của thẻ quẻ…"
                        value={values.meaning || ""}
                        onChange={(e) => set("meaning", e.target.value)}
                      />
                    </div>
                    <div className="admin-editor-field admin-editor-col-full">
                      <label htmlFor="field-advice" className="admin-editor-label">
                        <span>Lời khuyên chiêm nghiệm</span>
                      </label>
                      <textarea
                        id="field-advice"
                        rows={3}
                        className="admin-editor-textarea"
                        placeholder="Lời khuyên tu dưỡng, hành thiện…"
                        value={values.advice || ""}
                        onChange={(e) => set("advice", e.target.value)}
                      />
                    </div>
                  </>
                )}

                {/* Kind: Prayers -> Sacred text */}
                {kind === "prayers" && (
                  <div className="admin-editor-field admin-editor-col-full">
                    <label htmlFor="field-content" className="admin-editor-label">
                      <span>Toàn văn bài văn khấn cổ truyền <span style={{ color: "var(--admin-crimson)" }}>*</span></span>
                    </label>
                    <textarea
                      id="field-content"
                      required
                      rows={12}
                      className="admin-editor-textarea"
                      style={{ fontFamily: "var(--font-serif)", fontSize: "14.5px", lineHeight: 1.8 }}
                      placeholder="Nam mô A Di Đà Phật!..."
                      value={values.content || ""}
                      onChange={(e) => set("content", e.target.value)}
                    />
                  </div>
                )}
              </div>
            )}

            {/* TAB 3: NGUỒN & ẢNH MINH HỌA */}
            {activeTab === "media" && (
              <div className="admin-editor-grid">
                {/* Phần 1: Nguồn tham khảo */}
                <div className="admin-editor-col-full" style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", borderBottom: "1px solid var(--admin-line)", paddingBottom: "8px" }}>
                    <Globe size={16} style={{ color: "var(--admin-gold)" }} />
                    <strong style={{ fontSize: "14px", color: "var(--admin-heading)" }}>Nguồn tham khảo</strong>
                  </div>

                  {/* URL nguồn tham khảo HTTPS */}
                  <div className="admin-editor-field">
                    <label htmlFor="field-source-url" className="admin-editor-label">
                      <span>Liên kết nguồn (HTTPS)</span>
                      <span className="admin-editor-label-hint">Để trống nếu dùng tư liệu lưu trữ nội bộ</span>
                    </label>
                    <input
                      id="field-source-url"
                      className="admin-editor-input"
                      type="url"
                      placeholder="https://example.com/tai-lieu-co-truyen…"
                      value={values.source || ""}
                      onChange={(e) => set("source", e.target.value)}
                    />
                    {isSourceUrlInvalid && (
                      <div className="admin-field-feedback is-error">
                        <AlertCircle size={14} />
                        <span>URL nguồn phải bắt đầu bằng https:// (để trống nếu là tư liệu nội bộ).</span>
                      </div>
                    )}
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                    {/* Tên tài liệu / Cơ quan xuất bản */}
                    <div className="admin-editor-field">
                      <label htmlFor="field-source-doc" className="admin-editor-label">
                        <span>Tên nguồn / tài liệu</span>
                      </label>
                      <input
                        id="field-source-doc"
                        className="admin-editor-input"
                        type="text"
                        placeholder="Tên sách, văn bản hoặc cơ quan lưu trữ…"
                        value={sourceDoc}
                        onChange={(e) => setSourceDoc(e.target.value)}
                      />
                    </div>

                    {/* Vị trí trích dẫn */}
                    <div className="admin-editor-field">
                      <label htmlFor="field-source-locator" className="admin-editor-label">
                        <span>Trang hoặc mục tham khảo</span>
                      </label>
                      <input
                        id="field-source-locator"
                        className="admin-editor-input"
                        type="text"
                        placeholder="Ví dụ: Tập 2, tr. 145-148, Mục II…"
                        value={sourceLocator}
                        onChange={(e) => setSourceLocator(e.target.value)}
                      />
                    </div>
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginTop: "12px" }}>
                    <div className="admin-editor-field">
                      <label htmlFor="field-source-author" className="admin-editor-label">Tác giả / tổ chức</label>
                      <input id="field-source-author" className="admin-editor-input" type="text" value={sourceAuthor} onChange={(event) => setSourceAuthor(event.target.value)} />
                    </div>
                    <div className="admin-editor-field">
                      <label htmlFor="field-bibliography" className="admin-editor-label">Thông tin xuất bản / thư mục</label>
                      <input id="field-bibliography" className="admin-editor-input" type="text" value={bibliography} onChange={(event) => setBibliography(event.target.value)} />
                    </div>
                  </div>
                  {kind === "rituals" && <>
                    <div className="admin-editor-field">
                      <label htmlFor="field-content-rights" className="admin-editor-label">Căn cứ quyền sử dụng nội dung</label>
                      <textarea id="field-content-rights" rows={2} className="admin-editor-textarea" maxLength={1000} value={contentRightsBasis} onChange={(event) => setContentRightsBasis(event.target.value)} placeholder="Nêu căn cứ thực tế; không nhập URL thay cho căn cứ quyền." />
                    </div>
                    <p className="admin-editor-label-hint">Hướng dẫn nguyên bản cần người/nhóm biên soạn, phạm vi, checklist hữu ích và quyền nội dung được người duyệt xác nhận. Chỉ nhận định dựa trên tư liệu hoặc câu trích mới cần URL HTTPS và locator.</p>
                  </>}
                </div>

                {/* Phần 2: Ảnh minh họa & Bản quyền */}
                <div className="admin-editor-col-full" style={{ display: "flex", flexDirection: "column", gap: "12px", marginTop: "12px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", borderBottom: "1px solid var(--admin-line)", paddingBottom: "8px" }}>
                    <ImageIcon size={16} style={{ color: "var(--admin-gold)" }} />
                    <strong style={{ fontSize: "14px", color: "var(--admin-heading)" }}>Ảnh minh họa & Bản quyền sử dụng</strong>
                  </div>

                  {/* URL ảnh */}
                  <div className="admin-editor-field">
                    <label htmlFor="field-image-url" className="admin-editor-label">
                      <span>Đường dẫn ảnh</span>
                      <span className="admin-editor-label-hint">https:// hoặc đường dẫn nội bộ /images/...</span>
                    </label>
                    <input
                      id="field-image-url"
                      className="admin-editor-input"
                      type="text"
                      placeholder="URL ảnh hoặc đường dẫn nội bộ"
                      value={values.image_url || ""}
                      onChange={(e) => {
                        set("image_url", e.target.value);
                        setImageLoadError(false);
                      }}
                    />
                  </div>

                  {/* Live Image Preview Card */}
                  <div className="admin-img-preview-card">
                    <span style={{ fontSize: "12px", fontWeight: 650, color: "var(--admin-subtle)" }}>
                      Ảnh dùng trong nội dung:
                    </span>
                    <div className="admin-img-preview-viewport">
                      {values.image_url && !imageLoadError ? (
                        <img
                          src={values.image_url}
                          alt="Ảnh minh họa"
                          className="admin-img-preview-img"
                          onError={() => setImageLoadError(true)}
                        />
                      ) : (
                        <div className="admin-img-preview-empty">
                          <ImageIcon size={32} style={{ opacity: 0.5 }} />
                          <span>
                            {imageLoadError
                              ? "Không thể tải trước hình ảnh từ liên kết này. Vui lòng kiểm tra lại URL."
                              : "Chưa thêm ảnh. Có thể để trống nếu chưa có ảnh phù hợp."}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                    {/* Chú thích ảnh */}
                    <div className="admin-editor-field">
                      <label htmlFor="field-img-caption" className="admin-editor-label">
                        <span>Chú thích ảnh minh họa</span>
                      </label>
                      <input
                        id="field-img-caption"
                        className="admin-editor-input"
                        type="text"
                        placeholder="Mô tả đúng nội dung ảnh"
                        value={imageCaption}
                        onChange={(e) => setImageCaption(e.target.value)}
                      />
                    </div>

                    {/* Tác giả & Căn cứ quyền sử dụng */}
                    <div className="admin-editor-field">
                      <label htmlFor="field-img-credit" className="admin-editor-label">
                        <span>Nguồn / tác giả ảnh</span>
                      </label>
                      <input
                        id="field-img-credit"
                        className="admin-editor-input"
                        type="text"
                        placeholder="Người chụp hoặc kho ảnh có liên kết"
                        value={imageCredit}
                        onChange={(e) => setImageCredit(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="admin-editor-field">
                    <label htmlFor="field-image-rights" className="admin-editor-label">Căn cứ quyền sử dụng ảnh</label>
                    <input id="field-image-rights" className="admin-editor-input" type="text" placeholder="Ví dụ: giấy phép, liên kết cấp phép hoặc xác nhận của chủ sở hữu" value={imageRightsBasis} onChange={(event) => setImageRightsBasis(event.target.value)} />
                  </div>
                </div>
              </div>
            )}

            {/* TAB 4: XEM TRƯỚC BÀI VIẾT (LIVE READER SIMULATION) */}
            {activeTab === "preview" && (
              <div className="admin-preview-frame">
                <div className="admin-preview-badges">
                  <span className="admin-preview-badge">
                    <Sparkles size={12} /> {values.category || "Văn hóa Việt"}
                  </span>
                  <span className="admin-preview-badge">
                    <Globe size={12} /> {values.region === "NORTH" ? "Bắc Bộ" : values.region === "CENTRAL" ? "Trung Bộ" : values.region === "SOUTH" ? "Nam Bộ" : "Toàn quốc"}
                  </span>
                  {localCommunity && (
                    <span className="admin-preview-badge">
                      <><MapPin size={12} /> {localCommunity}</>
                    </span>
                  )}
                  <span className="admin-preview-badge" style={{ background: "rgba(200, 150, 85, 0.15)", marginLeft: "auto" }}>
                    Bản xem trước · Chờ duyệt
                  </span>
                </div>

                <h1 className="admin-preview-title">
                  {values.title || values.name || "Tiêu đề bài viết chưa được nhập"}
                </h1>

                {values.excerpt && (
                  <blockquote className="admin-preview-excerpt">
                    {values.excerpt}
                  </blockquote>
                )}

                {values.image_url && (imageSource.trim() || imageCredit.trim()) && imageRightsBasis.trim() && !imageLoadError ? (
                  <figure className="admin-preview-figure">
                    <div className="admin-preview-img-container">
                      <img src={values.image_url} alt={imageCaption || values.title} />
                    </div>
                    <figcaption className="admin-preview-figcaption">
                      {imageCaption && <span>{imageCaption}</span>}
                      <span>Nguồn: {imageSource || imageCredit}</span>
                      <span>Quyền sử dụng: {imageRightsBasis}</span>
                    </figcaption>
                  </figure>
                ) : values.image_url ? (
                  <p className="admin-preview-references">Ảnh chưa hiển thị cho khách vì thiếu nguồn hoặc hồ sơ quyền sử dụng.</p>
                ) : null}

                {/* Render Sections */}
                {kind === "culture" && (
                  <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                    {sections.map((section, idx) => (
                      <div key={idx} className="admin-preview-section">
                        <h2 className="admin-preview-heading">
                          <span style={{ color: "var(--admin-gold)" }}>§{idx + 1}.</span> {section.heading || `Mục ${idx + 1}`}
                        </h2>
                        <div className="admin-preview-body-text">
                          {section.body || "Chưa có nội dung cho phân mục này."}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Render Ritual Steps */}
                {kind === "rituals" && (
                  <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                    {values.description && (
                      <p className="admin-preview-body-text">{values.description}</p>
                    )}
                    {steps.map((step, idx) => (
                      <div key={idx} className="admin-preview-section" style={{ padding: "12px", border: "1px solid var(--admin-line)", borderRadius: "10px" }}>
                        <h3 style={{ margin: 0, fontSize: "15px", color: "var(--admin-gold)" }}>
                          Bước {idx + 1}: {step.title || "Tên bước"}
                        </h3>
                        <p className="admin-preview-body-text" style={{ marginTop: "6px" }}>
                          {step.description || "Chưa có mô tả bước thực hiện."}
                        </p>
                      </div>
                    ))}
                  </div>
                )}

                {/* Render Prayers Content */}
                {kind === "prayers" && (
                  <div style={{ padding: "20px", background: "var(--admin-surface-muted)", borderRadius: "12px", border: "1px solid var(--admin-line)" }}>
                    <p className="admin-preview-body-text" style={{ fontFamily: "var(--font-serif)", fontSize: "16px" }}>
                      {values.content || "Chưa nhập nội dung bài khấn."}
                    </p>
                  </div>
                )}

                {/* Footer Sources in Preview */}
                <div className="admin-preview-references">
                  <strong>Nguồn và hồ sơ biên tập</strong>
                  {sourceAuthor && <div>Người biên soạn / tác giả: {sourceAuthor}</div>}
                  {contentType && <div>Loại nội dung: {contentType === "GROUP_AUTHORED" ? "Nhóm biên soạn" : contentType}</div>}
                  {values.source ? (
                    <div>
                      🔗 Liên kết đối chiếu:{" "}
                      <a href={values.source} target="_blank" rel="noreferrer" style={{ color: "var(--admin-gold)", textDecoration: "underline" }}>
                        {values.source}
                      </a>
                    </div>
                  ) : (
                    <div>Tư liệu đối chiếu: {sourceDoc || "Chưa có thông tin nguồn."}</div>
                  )}
                  {sourceLocator && <div>Vị trí trích dẫn: {sourceLocator}</div>}
                  <div>Trạng thái: Bản nháp, chưa được duyệt để hiển thị cho khách.</div>
                </div>
              </div>
            )}

            {/* PHẦN MỞ RỘNG: CÀI ĐẶT NÂNG CAO (SLUG & GHI CHÚ NỘI BỘ) */}
            <div style={{ marginTop: "10px" }}>
              <button
                type="button"
                className="admin-advanced-toggle"
                onClick={() => setShowAdvanced(!showAdvanced)}
              >
                <span style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}>
                  <ShieldCheck size={16} style={{ color: "var(--admin-gold)" }} />
                  Cài đặt nâng cao & Ghi chú chỉnh sửa nội bộ
                </span>
                {showAdvanced ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
              </button>

              {showAdvanced && (
                <div className="admin-advanced-body">
                  {/* Đường dẫn định danh (Slug) */}
                  <div className="admin-editor-field admin-editor-col-full">
                    <label htmlFor="field-slug" className="admin-editor-label">
                      <span>
                        Đường dẫn định danh (Slug) URL
                      </span>
                      <span className="admin-editor-label-hint">
                        {slugUnlocked ? "Chế độ sửa thủ công" : "Đã khóa bảo toàn liên kết"}
                      </span>
                    </label>
                    <div style={{ display: "flex", gap: "8px" }}>
                      <input
                        id="field-slug"
                        className="admin-editor-input"
                        type="text"
                        disabled={!slugUnlocked}
                        placeholder="ten-bai-viet-viet-nam"
                        value={values.slug || ""}
                        onChange={(e) => set("slug", e.target.value)}
                      />
                      <button
                        type="button"
                        className="admin-secondary-button"
                        style={{ padding: "0 12px", flexShrink: 0 }}
                        title={slugUnlocked ? "Khóa tự động" : "Mở khóa chỉnh sửa đường dẫn"}
                        onClick={() => setSlugUnlocked(!slugUnlocked)}
                      >
                        {slugUnlocked ? <Lock size={15} /> : <Unlock size={15} />}
                        <span style={{ fontSize: "12px", marginLeft: "4px" }}>
                          {slugUnlocked ? "Khóa" : "Mở khóa"}
                        </span>
                      </button>
                    </div>
                    <div className="admin-field-feedback is-info">
                      <Info size={13} />
                      <span>
                        {id
                          ? "Bài viết đã lưu: đường dẫn được bảo toàn để tránh lỗi liên kết 404. Chỉ mở khóa khi thực sự cần thay đổi."
                          : "Đường dẫn tự động sinh chuẩn hóa từ tiêu đề không dấu."}
                      </span>
                    </div>
                  </div>

                  {/* Ghi chú chỉnh sửa nội bộ */}
                  <div className="admin-editor-field admin-editor-col-full">
                    <label htmlFor="field-reviewNote" className="admin-editor-label">
                      <span>
                        Ghi chú chỉnh sửa nội bộ <span style={{ color: "var(--admin-crimson)" }}>*</span>
                      </span>
                      <span className="admin-editor-label-hint">Tối thiểu 8 ký tự</span>
                    </label>
                    <textarea
                      id="field-reviewNote"
                      required
                      minLength={8}
                      maxLength={500}
                      rows={2}
                      className="admin-editor-textarea"
                      placeholder="Ghi rõ nội dung vừa chỉnh sửa hoặc lý do cập nhật (ví dụ: Chuẩn hóa câu từ phân mục 2 theo sách Lễ hội cổ truyền)…"
                      value={values.reviewNote || ""}
                      onChange={(event) => set("reviewNote", event.target.value)}
                    />
                    <div className="admin-field-feedback is-info">
                      <ShieldCheck size={13} />
                      <span>Lưu bản nháp không đồng nghĩa đã thẩm định. Ghi chú này phục vụ lưu vết nhật ký biên tập.</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </form>
        )}

        {/* Footer */}
        <div className="admin-editor-footer">
          <div className="admin-editor-footer-hint">
            <ShieldCheck size={16} style={{ color: "var(--admin-gold)" }} />
            <span>Thay đổi chỉ được lưu khi chọn “Lưu bản nháp” hoặc “Gửi duyệt nội dung”.</span>
          </div>
          <div className="admin-editor-footer-actions">
            <button
              type="button"
              className="admin-editor-action-btn is-cancel"
              disabled={Boolean(savingMode)}
              onClick={onClose}
            >
              Đóng
            </button>
            <button
              type="button"
              className="admin-editor-action-btn is-draft"
              disabled={Boolean(savingMode) || loading || isSourceUrlInvalid}
              onClick={() => void save(undefined, false)}
              title="Lưu lại các nội dung đang soạn và giữ bài ở chế độ nháp để tiếp tục hoàn thiện"
            >
              {savingMode === "draft" ? (
                <>
                  <RefreshCw size={14} className="admin-spin-icon" />
                  <span>Đang lưu nháp…</span>
                </>
              ) : (
                <>
                  <Save size={15} />
                  <span>Lưu bản nháp</span>
                </>
              )}
            </button>
            <button
              type="button"
              className="admin-editor-action-btn is-submit"
              disabled={Boolean(savingMode) || loading || isSourceUrlInvalid}
              onClick={() => void save(undefined, true)}
              title="Chuyển bài sang trạng thái Chờ duyệt để người phụ trách rà soát"
            >
              {savingMode === "submit" ? (
                <>
                  <RefreshCw size={14} className="admin-spin-icon" />
                  <span>Đang gửi duyệt…</span>
                </>
              ) : (
                <>
                  <Send size={15} />
                  <span>Gửi duyệt nội dung</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function ClockIcon({ size }: { size?: number }) {
  return <Sparkles size={size || 14} />;
}
