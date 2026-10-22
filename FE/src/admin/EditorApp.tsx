import { useCallback, useEffect, useMemo, useState } from "react";
import {
  BookOpenText,
  CalendarDays,
  CheckCircle2,
  ChevronRight,
  Clock,
  Edit3,
  Eye,
  FileCheck2,
  FileText,
  Globe,
  LibraryBig,
  LogOut,
  Moon,
  Plus,
  RefreshCw,
  Search,
  ShieldCheck,
  Sparkles,
  Sun,
  X,
} from "lucide-react";
import { ApiError, apiRequest } from "../lib/api";
import {
  logoutAccount,
  restoreSession,
  type UserProfile,
} from "../data/authService";
import {
  loadAdminList,
  type AdminPage,
  type AdminRecord,
} from "../data/adminService";
import { useTheme } from "../hooks/useTheme";
import { ContentEditor, type Kind } from "./ContentEditor";
import { ContentDetailModal } from "./ContentDetailModal";
import { WithdrawModal } from "./WithdrawModal";
import { SignalAdminPanel } from "./SignalAdminPanel";
import { EDITOR_SECTIONS } from "./adminAccess";
import { closeAdminOverlay, pushAdminOverlay } from "./adminNavigation";
import { toast, ToastContainer } from "../components/ui/Toast";
import "./admin.css";
import "./editor.css";

type Section = (typeof EDITOR_SECTIONS)[number];
type StatusFilter =
  | "all"
  | "DRAFT"
  | "IN_REVIEW"
  | "APPROVED"
  | "PUBLISHED"
  | "HIDDEN"
  | "REVOKED";

const SECTION_META: Record<
  Section,
  { label: string; singular: string; icon: typeof BookOpenText }
> = {
  culture: {
    label: "Kho văn hóa",
    singular: "bài viết văn hóa",
    icon: BookOpenText,
  },
  calendar: { label: "Lịch sự kiện", singular: "sự kiện", icon: CalendarDays },
  xam: { label: "Danh mục xin xăm", singular: "bài xin xăm", icon: LibraryBig },
  rituals: { label: "Nghi lễ", singular: "nghi lễ", icon: BookOpenText },
  prayers: { label: "Văn khấn", singular: "bài văn khấn", icon: FileCheck2 },
  signals: {
    label: "Lời chiêm nghiệm",
    singular: "lời chiêm nghiệm",
    icon: Sparkles,
  },
};

const STATUS_LABEL: Record<StatusFilter, string> = {
  all: "Tất cả",
  DRAFT: "Bản nháp",
  IN_REVIEW: "Chờ duyệt",
  APPROVED: "Đã duyệt",
  PUBLISHED: "Đang phát hành",
  HIDDEN: "Đang ẩn",
  REVOKED: "Đã thu hồi",
};

function getSection(): Section {
  const section = new URLSearchParams(window.location.search).get("section");
  return EDITOR_SECTIONS.includes(section as Section)
    ? (section as Section)
    : "culture";
}

function labelForStatus(status?: string) {
  return status ? STATUS_LABEL[status as StatusFilter] || status : "Bản nháp";
}

function titleFor(record: AdminRecord) {
  if (typeof record.title === "string" && record.title) return record.title;
  if (typeof record.name === "string" && record.name) return record.name;
  if (record.stick_number != null) return `Thẻ số ${record.stick_number}`;
  return "Nội dung chưa có tiêu đề";
}

function getInitials(name: string) {
  if (!name) return "B";
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].slice(0, 1).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

export default function EditorApp() {
  const { dark, toggleTheme } = useTheme();
  const [user, setUser] = useState<UserProfile | null>(null);
  const [booting, setBooting] = useState(true);
  const [section, setSection] = useState<Section>(getSection);
  const [status, setStatus] = useState<StatusFilter>(
    (new URLSearchParams(window.location.search).get(
      "status",
    ) as StatusFilter) || "all",
  );
  const [query, setQuery] = useState("");
  const [submittedQuery, setSubmittedQuery] = useState("");
  const [page, setPage] = useState(1);
  const [pageData, setPageData] = useState<AdminPage<AdminRecord> | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [editing, setEditing] = useState<{ kind: Kind; id?: string } | null>(() => {
    if (typeof window === "undefined") return null;
    const params = new URLSearchParams(window.location.search);
    const contentEdit = params.get("contentEdit") as Kind | null;
    if (contentEdit && ["culture", "calendar", "xam", "rituals", "prayers"].includes(contentEdit)) {
      const editId = params.get("editId") || undefined;
      return { kind: contentEdit, id: editId };
    }
    return null;
  });
  const [viewing, setViewing] = useState<AdminRecord | null>(null);
  const [withdrawingRecord, setWithdrawingRecord] = useState<AdminRecord | null>(null);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  useEffect(() => {
    let active = true;
    void restoreSession().then((session) => {
      if (!active) return;
      if (session.status === "unavailable") {
        setError(session.message);
        setBooting(false);
        return;
      }
      if (!session.user) {
        window.location.replace("/?login=true&redirect=/editor");
        return;
      }
      if (session.user.role?.toUpperCase() === "ADMIN") {
        window.location.replace("/admin");
        return;
      }
      if (session.user.role?.toUpperCase() !== "EDITOR") {
        setError("Tài khoản này chưa được cấp quyền biên tập.");
        setBooting(false);
        return;
      }
      setUser(session.user);
      setBooting(false);
    });
    return () => {
      active = false;
    };
  }, []);

  const loadContent = useCallback(async () => {
    if (!user || section === "signals") return;
    setLoading(true);
    setError("");
    try {
      setPageData(
        await loadAdminList<AdminRecord>(section, page, submittedQuery, status),
      );
    } catch (loadError) {
      if (loadError instanceof ApiError && loadError.status === 403)
        setError(
          "Phiên làm việc không còn quyền biên tập. Hãy đăng nhập lại hoặc liên hệ quản trị viên.",
        );
      else
        setError(
          loadError instanceof Error
            ? loadError.message
            : "Không thể tải danh sách nội dung.",
        );
    } finally {
      setLoading(false);
    }
  }, [section, status, submittedQuery, user, page]);

  useEffect(() => {
    void loadContent();
  }, [loadContent]);

  useEffect(() => {
    const onPopState = () => {
      setSection(getSection());
      const params = new URLSearchParams(window.location.search);
      setStatus((params.get("status") as StatusFilter) || "all");
      const contentEdit = params.get("contentEdit") as Kind | null;
      if (contentEdit && ["culture", "calendar", "xam", "rituals", "prayers"].includes(contentEdit)) {
        const editId = params.get("editId") || undefined;
        setEditing({ kind: contentEdit, id: editId });
      } else {
        setEditing(null);
      }
    };
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  const statusCounts = pageData?.stats?.statuses;
  const counts = useMemo(
    () => ({
      total: pageData?.stats?.total ?? pageData?.pagination.total ?? 0,
      draft: statusCounts?.DRAFT ?? 0,
      review: statusCounts?.IN_REVIEW ?? 0,
      approved: statusCounts?.APPROVED ?? 0,
      published: statusCounts?.PUBLISHED ?? 0,
      hidden: statusCounts?.HIDDEN ?? 0,
      revoked: statusCounts?.REVOKED ?? 0,
    }),
    [pageData, statusCounts],
  );

  function navigate(nextSection: Section) {
    if (editing) {
      closeEditor();
    }
    setSection(nextSection);
    setStatus("all");
    setPage(1);
    setQuery("");
    setSubmittedQuery("");
    setPageData(null);
    setError("");
    const url = new URL(window.location.href);
    url.searchParams.set("section", nextSection);
    url.searchParams.delete("status");
    url.searchParams.delete("contentEdit");
    window.history.pushState(
      { editorSection: nextSection },
      "",
      url.toString(),
    );
  }

  function filter(nextStatus: StatusFilter) {
    setStatus(nextStatus);
    setPage(1);
    const url = new URL(window.location.href);
    if (nextStatus === "all") url.searchParams.delete("status");
    else url.searchParams.set("status", nextStatus);
    window.history.pushState(
      { editorSection: section, status: nextStatus },
      "",
      url.toString(),
    );
  }

  function openEditor(kind: Kind, id?: string) {
    pushAdminOverlay("content-editor");
    setEditing({ kind, id });
    const url = new URL(window.location.href);
    url.searchParams.set("contentEdit", kind);
    if (id) url.searchParams.set("editId", id);
    else url.searchParams.delete("editId");
    window.history.pushState(
      { editorSection: section, contentEdit: kind, editId: id },
      "",
      url.toString(),
    );
  }

  function closeEditor() {
    setEditing(null);
    closeAdminOverlay("content-editor");
    const url = new URL(window.location.href);
    url.searchParams.delete("contentEdit");
    url.searchParams.delete("editId");
    window.history.pushState(
      { editorSection: section },
      "",
      url.toString(),
    );
  }

  function withdrawToDraft(record: AdminRecord) {
    setWithdrawingRecord(record);
  }

  async function confirmWithdraw(reason: string) {
    if (!withdrawingRecord) return;
    try {
      await apiRequest(`/admin/${section}/${encodeURIComponent(withdrawingRecord.id)}/withdraw`, {
        method: "POST",
        body: JSON.stringify({ expectedUpdatedAt: withdrawingRecord.updated_at, reviewNote: reason }),
      });
      const title = titleFor(withdrawingRecord);
      setWithdrawingRecord(null);
      await loadContent();
      toast.success(`Đã chuyển bài viết "${title}" về bản nháp thành công.`, "Rút bài thành công");
    } catch (withdrawError) {
      const msg = withdrawError instanceof Error ? withdrawError.message : "Không thể rút bài về bản nháp.";
      setError(msg);
      toast.error(msg, "Lỗi rút bài");
      throw withdrawError;
    }
  }

  async function viewRecord(record: AdminRecord) {
    try {
      setViewing(await apiRequest<AdminRecord>(`/admin/${section}/${encodeURIComponent(record.id)}`));
    } catch (detailError) {
      setError(detailError instanceof Error ? detailError.message : "Không thể tải chi tiết nội dung.");
    }
  }

  async function logout() {
    await logoutAccount();
    window.location.replace("/");
  }

  if (booting)
    return (
      <main className="editor-loading" role="status">
        <RefreshCw className="editor-spin" /> Đang xác thực không gian biên tập…
      </main>
    );

  if (!user)
    return (
      <main className="editor-access-denied">
        <ShieldCheck />
        <h1>Không thể vào không gian biên tập</h1>
        <p>{error}</p>
        <a href="/">Về trang chủ</a>
      </main>
    );

  const meta = SECTION_META[section];
  const Icon = meta.icon;
  const isSignals = section === "signals";

  const metricCards = [
    {
      id: "all" as StatusFilter,
      label: "Tổng nội dung của tôi",
      value: counts.total,
      icon: FileText,
      color: "metric-neutral",
    },
    {
      id: "DRAFT" as StatusFilter,
      label: "Bản nháp đang soạn",
      value: counts.draft,
      icon: Edit3,
      color: "metric-gold",
    },
    {
      id: "IN_REVIEW" as StatusFilter,
      label: "Đang chờ admin duyệt",
      value: counts.review,
      icon: Clock,
      color: "metric-crimson",
    },
    {
      id: "PUBLISHED" as StatusFilter,
      label: "Đã xuất bản lưu hành",
      value: counts.published,
      icon: CheckCircle2,
      color: "metric-emerald",
    },
  ];

  return (
    <div className="editor-workspace">
      {/* SIDEBAR BẢNG BIÊN TẬP (STICKY 10/10) */}
      <aside className="editor-sidebar">
        <div className="editor-sidebar-top">
          <a className="editor-brand" href="/" title="Trang chủ Tin Lắm Tâm Linh">
            <span className="editor-brand-mark">
              <Sparkles size={20} />
            </span>
            <div className="editor-brand-text">
              <strong>Tin Lắm Tâm Linh</strong>
              <small>KHÔNG GIAN BIÊN TẬP</small>
            </div>
          </a>
        </div>

        <div className="editor-nav-label">NỘI DUNG CỦA BẠN</div>
        <nav className="editor-nav" aria-label="Khu vực biên tập">
          {EDITOR_SECTIONS.map((item) => {
            const itemMeta = SECTION_META[item];
            const ItemIcon = itemMeta.icon;
            const isCurrent = section === item;
            return (
              <button
                key={item}
                type="button"
                className={`editor-nav-item ${isCurrent ? "is-current" : ""}`}
                onClick={() => navigate(item)}
              >
                <ItemIcon size={18} />
                <span>{itemMeta.label}</span>
                {isCurrent && <span className="editor-nav-indicator" />}
              </button>
            );
          })}
        </nav>

        {/* FOOTER TÀI KHOẢN DƯỚI CHÂN SIDEBAR */}
        <div className="editor-sidebar-bottom">
          <div className="editor-sidebar-note">
            <ShieldCheck size={16} />
            <span>Quyền duyệt và xuất bản cuối cùng thuộc về Quản trị viên hệ thống.</span>
          </div>

          <div className="editor-session-card">
            <span className="editor-avatar">
              {getInitials(user.name || "Biên tập viên")}
            </span>
            <div className="editor-session-info">
              <strong>{user.name || "Biên tập viên"}</strong>
              <small>
                <span className="editor-live-dot" /> Biên tập viên nội dung
              </small>
            </div>
            <button
              type="button"
              className="editor-session-logout-btn"
              onClick={() => setShowLogoutConfirm(true)}
              title="Đăng xuất khỏi Không gian Biên tập"
              aria-label="Đăng xuất"
            >
              <LogOut size={16} />
            </button>
          </div>
        </div>
      </aside>

      {/* KHÔNG GIAN LÀM VIỆC CHÍNH */}
      <div className="editor-main">
        {/* TOPBAR THANH THAO TÁC */}
        <header className="editor-topbar">
          <div className="editor-breadcrumb-wrap">
            <span className="editor-breadcrumb-root">Không gian biên tập</span>
            <ChevronRight size={14} className="editor-breadcrumb-arrow" />
            <strong className="editor-breadcrumb-current">{meta.label}</strong>
          </div>

          <div className="editor-top-actions">
            <a
              href="/"
              className="editor-public-link"
              title="Mở ứng dụng Tin Lắm Tâm Linh dành cho người dùng"
            >
              <Globe size={15} />
              <span>Xem trang người dùng</span>
            </a>

            <button
              type="button"
              className="editor-quick-refresh-btn"
              onClick={() => void loadContent()}
              title="Tải lại nội dung"
              disabled={loading}
            >
              <RefreshCw
                size={14}
                className={loading ? "editor-spin" : ""}
              />
              <span>Làm mới</span>
            </button>

            <button
              type="button"
              className="editor-theme-btn"
              onClick={toggleTheme}
              aria-label={dark ? "Chuyển giao diện sáng" : "Chuyển giao diện tối"}
              title={dark ? "Chuyển sang giao diện Sáng" : "Chuyển sang giao diện Tối"}
            >
              {dark ? <Moon size={16} /> : <Sun size={16} />}
            </button>
          </div>
        </header>

        {/* NỘI DUNG CHÍNH */}
        <main className="editor-content">
          <div className="editor-heading">
            <div className="editor-heading-text">
              <span className="editor-eyebrow">
                <Icon size={14} /> KHÔNG GIAN SOẠN THẢO · {meta.label.toUpperCase()}
              </span>
              <h1>{meta.label}</h1>
              <p>Soạn nội dung, bổ sung nguồn tư liệu và gửi quản trị viên phê duyệt xuất bản.</p>
            </div>

            {isSignals ? (
              <button
                type="button"
                className="editor-primary-btn"
                onClick={() => window.dispatchEvent(new CustomEvent("admin:signal-new"))}
              >
                <Plus size={17} /> Soạn lời chiêm nghiệm mới
              </button>
            ) : (
              <button
                type="button"
                className="editor-primary-btn"
                onClick={() => openEditor(section as Kind)}
              >
                <Plus size={17} /> Soạn {meta.singular} mới
              </button>
            )}
          </div>

          {!isSignals && (
            <>
              {/* 4 THẺ TỔNG QUAN TƯƠNG TÁC (CLICKABLE KPI CARDS) */}
              <section
                className="editor-summary-grid"
                aria-label="Tổng quan bài của tôi"
              >
                {metricCards.map((card) => {
                  const CardIcon = card.icon;
                  const isActive = status === card.id;
                  return (
                    <article
                      key={card.id}
                      className={`editor-summary-card ${card.color} ${isActive ? "is-active" : ""}`}
                      onClick={() => filter(card.id)}
                      role="button"
                      tabIndex={0}
                      title={`Bấm để lọc theo: ${card.label}`}
                    >
                      <div className="editor-card-header">
                        <span className="editor-card-icon">
                          <CardIcon size={18} />
                        </span>
                        <span className="editor-card-badge">Lọc nhanh</span>
                      </div>
                      <span className="editor-card-label">{card.label}</span>
                      <strong className="editor-card-value">
                        {loading ? "…" : card.value.toLocaleString("vi-VN")}
                      </strong>
                    </article>
                  );
                })}
              </section>

              {/* THANH CÔNG CỤ BỘ LỌC VÀ TÌM KIẾM TỨC THÌ */}
              <div className="editor-toolbar-deck">
                <div
                  className="editor-status-tabs"
                  role="tablist"
                  aria-label="Lọc theo trạng thái"
                >
                  {(
                    [
                      { key: "all", label: "Tất cả", count: counts.total },
                      { key: "DRAFT", label: "Bản nháp", count: counts.draft },
                      { key: "IN_REVIEW", label: "Chờ duyệt", count: counts.review },
                      { key: "APPROVED", label: "Đã duyệt", count: counts.approved },
                      { key: "PUBLISHED", label: "Đang phát hành", count: counts.published },
                      { key: "HIDDEN", label: "Đang ẩn", count: counts.hidden },
                      { key: "REVOKED", label: "Đã thu hồi", count: counts.revoked },
                    ] as const
                  ).map((item) => (
                    <button
                      type="button"
                      key={item.key}
                      className={`editor-status-tab ${status === item.key ? "is-selected" : ""}`}
                      onClick={() => filter(item.key)}
                      role="tab"
                      aria-selected={status === item.key}
                    >
                      {item.label} <span className="tab-count">({item.count})</span>
                    </button>
                  ))}
                </div>

                <form
                  className="editor-search-form"
                  onSubmit={(event) => {
                    event.preventDefault();
                    setPage(1);
                    setSubmittedQuery(query.trim());
                  }}
                  role="search"
                >
                  <Search size={15} className="editor-search-icon" />
                  <input
                    value={query}
                    onChange={(event) => {
                      const val = event.target.value;
                      setQuery(val);
                      if (!val.trim() && submittedQuery) {
                        setSubmittedQuery("");
                        setPage(1);
                      }
                    }}
                    placeholder="Tìm theo tiêu đề hoặc từ khóa…"
                    aria-label="Tìm bài viết"
                  />
                  {query && (
                    <button
                      type="button"
                      className="editor-search-clear"
                      onClick={() => {
                        setQuery("");
                        setSubmittedQuery("");
                        setPage(1);
                      }}
                      aria-label="Xóa từ khóa"
                    >
                      <X size={13} />
                    </button>
                  )}
                  <button type="submit" className="editor-search-btn">
                    Tìm
                  </button>
                </form>
              </div>

              {/* THÔNG BÁO LỖI NẾU CÓ */}
              {error && (
                <div className="editor-error-banner" role="alert">
                  <span>{error}</span>
                  <button type="button" onClick={() => void loadContent()}>
                    Thử lại
                  </button>
                </div>
              )}

              {/* DANH SÁCH BẢN GHI HOẶC EMPTY STATE */}
              {loading ? (
                <div className="editor-loading-state" role="status">
                  <RefreshCw className="editor-spin" size={24} />
                  <p>Đang đồng bộ dữ liệu bài viết…</p>
                </div>
              ) : pageData?.items.length ? (
                <div className="editor-record-list">
                  {pageData.items.map((record) => (
                    <article className="editor-record-card" key={record.id}>
                      <div className="editor-record-main">
                        <div className="editor-record-status-row">
                          <span
                            className={`editor-status-badge status-${String(record.editorial_status || "DRAFT").toLowerCase()}`}
                          >
                            <span className="editor-status-dot" />
                            {labelForStatus(record.editorial_status)}
                          </span>
                        </div>
                        <h2 className="editor-record-title">{titleFor(record)}</h2>
                        <p className="editor-record-meta">
                          {[record.category, record.region, record.source]
                            .filter(
                              (value) => typeof value === "string" && value,
                            )
                            .join(" · ") || "Chưa có danh mục hoặc xuất xứ"}
                        </p>
                        {typeof record.editor_feedback === "string" && record.editor_feedback && (
                          <p className="editor-record-meta" role="note"><strong>Góp ý Admin:</strong> {record.editor_feedback}</p>
                        )}
                      </div>

                      <div className="editor-record-actions">
                        <time className="editor-record-time">
                          {record.updated_at
                            ? new Intl.DateTimeFormat("vi-VN", {
                                dateStyle: "medium",
                                timeStyle: "short",
                              }).format(new Date(record.updated_at))
                            : ""}
                        </time>
                        <button type="button" className="editor-edit-btn" onClick={() => void viewRecord(record)}>
                          <Eye size={14} /> Xem chi tiết
                        </button>
                        {record.editorial_status === "DRAFT" ? (
                          <button type="button" className="editor-edit-btn" onClick={() => openEditor(section as Kind, record.id)}>
                            <Edit3 size={14} /> Mở chỉnh sửa
                          </button>
                        ) : (
                          <button type="button" className="editor-edit-btn" onClick={() => void withdrawToDraft(record)}>
                            <Edit3 size={14} /> Rút về bản nháp
                          </button>
                        )}
                      </div>
                    </article>
                  ))}
                </div>
              ) : !error ? (
                <div className="editor-warm-empty">
                  <div className="editor-empty-icon-wrap">
                    <Icon size={28} />
                  </div>
                  <h2>Chưa có {meta.singular} nào</h2>
                  <p>
                    Bắt đầu xây dựng kho tư liệu tâm linh bằng cách tạo một bản thảo mới. Sau khi lưu, bạn có thể gửi lên ban quản trị phê duyệt.
                  </p>

                  <div className="editor-empty-workflow">
                    <div className="workflow-step">
                      <span className="step-num">1</span>
                      <span>Soạn thảo & đính kèm tư liệu</span>
                    </div>
                    <span className="workflow-arrow">➔</span>
                    <div className="workflow-step">
                      <span className="step-num">2</span>
                      <span>Gửi yêu cầu phê duyệt</span>
                    </div>
                    <span className="workflow-arrow">➔</span>
                    <div className="workflow-step">
                      <span className="step-num">3</span>
                      <span>Admin duyệt & xuất bản lên app</span>
                    </div>
                  </div>

                  <button
                    type="button"
                    className="editor-primary-btn"
                    onClick={() => openEditor(section as Kind)}
                  >
                    <Plus size={16} /> Bắt đầu soạn {meta.singular}
                  </button>
                </div>
              ) : null}

              {/* PHÂN TRANG */}
              {pageData && pageData.pagination.pageCount > 1 && (
                <div className="editor-pagination">
                  <span>
                    Trang {pageData.pagination.page} /{" "}
                    {pageData.pagination.pageCount}
                  </span>
                  <div className="editor-pagination-buttons">
                    <button
                      type="button"
                      disabled={page <= 1}
                      onClick={() => setPage((value) => Math.max(1, value - 1))}
                    >
                      Trước
                    </button>
                    <button
                      type="button"
                      disabled={page >= pageData.pagination.pageCount}
                      onClick={() =>
                        setPage((value) =>
                          Math.min(pageData.pagination.pageCount, value + 1),
                        )
                      }
                    >
                      Tiếp
                    </button>
                  </div>
                </div>
              )}
            </>
          )}

          {isSignals && (
            <>
              <div className="editor-signal-intro">
                <Sparkles size={18} />
                <span>
                  Danh sách và thao tác ở đây chỉ gồm lời chiêm nghiệm do bạn
                  tạo. Quản trị viên sẽ thẩm định trước khi phát hành tới người dùng.
                </span>
              </div>
              <SignalAdminPanel canReview={false} />
            </>
          )}
        </main>

        <footer className="editor-footer">
          <span>Tin Lắm Tâm Linh · Không gian làm việc Biên tập viên</span>
          <a href="/" target="_blank" rel="noreferrer">
            Mở Cổng Trải Nghiệm Văn Hóa
          </a>
        </footer>
      </div>

      {/* POPUP XÁC NHẬN ĐĂNG XUẤT AN TOÀN */}
      {showLogoutConfirm && (
        <div className="admin-review-overlay" role="dialog" aria-modal="true" aria-labelledby="editor-logout-title">
          <div className="admin-team-modal-card">
            <div className="admin-team-modal-icon">
              <LogOut size={28} />
            </div>
            <h3 id="editor-logout-title">Xác nhận đăng xuất</h3>
            <p>
              Bạn có chắc chắn muốn rời khỏi Không gian Biên tập của <strong>Tin Lắm Tâm Linh</strong>?
            </p>
            <div className="admin-team-modal-actions">
              <button
                type="button"
                className="admin-secondary-button"
                onClick={() => setShowLogoutConfirm(false)}
              >
                Ở lại
              </button>
              <button
                type="button"
                className="admin-team-modal-confirm-btn"
                onClick={() => void logout()}
              >
                Đăng xuất ngay
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL CHI TIẾT NỘI DUNG 10/10 */}
      {viewing && (
        <ContentDetailModal
          kind={section as Kind}
          id={String(viewing.id)}
          record={viewing}
          onClose={() => setViewing(null)}
          onEdit={(k, editId) => {
            setViewing(null);
            openEditor(k, editId);
          }}
          onWithdraw={(rec) => {
            setViewing(null);
            withdrawToDraft(rec);
          }}
        />
      )}

      {/* MODAL XÁC NHẬN RÚT BÀI VỀ BẢN NHÁP 10/10 */}
      <WithdrawModal
        isOpen={Boolean(withdrawingRecord)}
        itemTitle={withdrawingRecord ? titleFor(withdrawingRecord) : ""}
        itemTypeLabel="bài viết"
        onClose={() => setWithdrawingRecord(null)}
        onConfirm={confirmWithdraw}
      />

      {editing && (
        <ContentEditor
          kind={editing.kind}
          id={editing.id}
          onClose={closeEditor}
          onSaved={() => {
            closeEditor();
            void loadContent();
          }}
        />
      )}
      <ToastContainer />
    </div>
  );
}
