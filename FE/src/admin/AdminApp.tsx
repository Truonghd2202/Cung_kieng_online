import { FormEvent, useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  Activity,
  AlertCircle,
  ArrowDownRight,
  ArrowUpRight,
  BookOpenText,
  CalendarDays,
  Check,
  ChevronLeft,
  ChevronRight,
  CircleHelp,
  Clock3,
  Copy,
  Edit3,
  ExternalLink,
  Eye,
  EyeOff,
  FileCheck2,
  Filter,
  Globe,
  LayoutDashboard,
  LayoutGrid,
  LibraryBig,
  List,
  Lock,
  LogOut,
  Mail,
  Menu,
  Moon,
  Plus,
  RefreshCw,
  Search,
  ShieldCheck,
  Sparkles,
  Sun,
  UsersRound,
  X,
} from "lucide-react";
import { useTheme } from "../hooks/useTheme";
import { ApiError } from "../lib/api";
import {
  loginAccount,
  logoutAccount,
  restoreSession,
} from "../data/authService";
import {
  loadAdminList,
  loadAdminOverview,
  reviewAdminRecord,
  type AdminOverview,
  type AdminPage,
  type AdminRecord,
} from "../data/adminService";
import { ContentEditor } from "./ContentEditor";
import { SignalAdminPanel } from "./SignalAdminPanel";
import { PartnershipPanel } from "../components/PartnershipPanel";
import { AdminPaymentsPanel } from "./AdminPaymentsPanel";
import { AdminPaymentAlertsPanel } from "./AdminPaymentAlertsPanel";
import { AdminPartnerGiftsPanel } from "./AdminPartnerGiftsPanel";
import {
  SparklineChart,
  InteractiveTrendChart,
  DonutChart,
  ContentStatusBarChart,
  ContentSectionAnalyticsDeck,
} from "./AdminCharts";
import { LogoutConfirmDialog } from "../components/LogoutConfirmDialog";
import { toast, ToastContainer } from "../components/ui/Toast";
import { getAdminAccessState } from "./adminAccess";
import "./admin.css";

type Section =
  | "overview"
  | "culture"
  | "calendar"
  | "xam"
  | "rituals"
  | "prayers"
  | "signals"
  | "membership-interests"
  | "audit-logs";
type ReviewField = "verified" | "active";
type ContentFilter = "all" | "DRAFT" | "IN_REVIEW" | "APPROVED" | "PUBLISHED" | "HIDDEN" | "REVOKED" | "needs_source";
type ViewMode = "grid" | "table";

const NAV: Array<{
  id: Section;
  label: string;
  icon: typeof LayoutDashboard;
  group: string;
}> = [
  {
    id: "overview",
    label: "Tổng quan",
    icon: LayoutDashboard,
    group: "VẬN HÀNH",
  },
  {
    id: "culture",
    label: "Kho văn hóa",
    icon: BookOpenText,
    group: "NỘI DUNG",
  },
  {
    id: "calendar",
    label: "Lịch sự kiện",
    icon: CalendarDays,
    group: "NỘI DUNG",
  },
  { id: "xam", label: "Danh mục xin xăm", icon: LibraryBig, group: "NỘI DUNG" },
  { id: "rituals", label: "Nghi lễ", icon: BookOpenText, group: "NỘI DUNG" },
  { id: "prayers", label: "Văn khấn", icon: FileCheck2, group: "NỘI DUNG" },
  { id: "signals", label: "Lời chiêm nghiệm", icon: Sparkles, group: "NỘI DUNG" },
  {
    id: "membership-interests",
    label: "Quan tâm hội viên",
    icon: UsersRound,
    group: "TĂNG TRƯỞNG",
  },
  {
    id: "audit-logs",
    label: "Nhật ký quản trị",
    icon: FileCheck2,
    group: "HỆ THỐNG",
  },
];

const TITLES: Record<
  Section,
  { title: string; description: string; tag: string }
> = {
  overview: {
    title: "Tổng quan vận hành",
    description:
      "Bảng tổng hợp hoạt động, trạng thái nội dung và lượt quan tâm hội viên.",
    tag: "EXECUTIVE DASHBOARD",
  },
  culture: {
    title: "Kho văn hóa",
    description:
      "Rà soát nguồn và quản lý trạng thái các bài tư liệu văn hóa Việt.",
    tag: "TƯ LIỆU VĂN HÓA",
  },
  calendar: {
    title: "Lịch sự kiện",
    description:
      "Kiểm tra ngày âm/dương, loại sự kiện lễ hội và liên kết nguồn tham chiếu.",
    tag: "LỄ HỘI CỔ TRUYỀN",
  },
  xam: {
    title: "Danh mục xin xăm",
    description:
      "Quản lý thẻ xăm, thơ và diễn giải cùng trạng thái thẩm định.",
    tag: "CHIÊM NGHIỆM",
  },
  rituals: {
    title: "Nghi lễ truyền thống",
    description:
      "Rà soát quy trình nghi lễ, xuất xứ vùng miền và hướng dẫn phong tục chu chuẩn.",
    tag: "NGHI THỨC",
  },
  prayers: {
    title: "Văn khấn cổ truyền",
    description:
      "Đối chiếu văn tự Hán Nôm/Quốc ngữ, locator nguồn lưu trữ và xác nhận bản quyền.",
    tag: "VĂN TỰ THỜ CÚNG",
  },
  signals: {
    title: "Lời chiêm nghiệm",
    description: "Biên tập và duyệt nội dung check-in theo cảm xúc, ngữ cảnh và hồ sơ nguồn thực tế.",
    tag: "CHECK-IN · TƯ LIỆU BIÊN TẬP",
  },
  "membership-interests": {
    title: "Quan tâm hội viên",
    description:
      "Danh sách người dùng tiềm năng đã tự nguyện đăng ký nhận thông tin gói hội viên.",
    tag: "ĐĂNG KÝ NHẬN CẬP NHẬT",
  },
  "audit-logs": {
    title: "Nhật ký quản trị",
    description:
      "Lịch sử chi tiết mọi thao tác kiểm duyệt, thay đổi trạng thái nội dung của quản trị viên.",
    tag: "HỆ THỐNG KIỂM SOÁT",
  },
};

function readableError(error: unknown) {
  if (error instanceof ApiError) {
    if (error.status === 403)
      return "Tài khoản đã đăng nhập nhưng chưa được cấp quyền ADMIN.";
    if (error.status === 401)
      return "Phiên đăng nhập hết hạn. Vui lòng đăng nhập lại.";
    return error.message;
  }
  return "Không thể tải dữ liệu. Hãy kiểm tra kết nối API rồi thử lại.";
}

function displayValue(value: unknown) {
  if (value === null || value === undefined || value === "") return "—";
  if (typeof value === "boolean") return value ? "Có" : "Không";
  return String(value);
}

function dateValue(value: unknown) {
  if (!value) return "—";
  const date = new Date(String(value));
  return Number.isNaN(date.getTime())
    ? String(value)
    : new Intl.DateTimeFormat("vi-VN", {
        dateStyle: "medium",
        timeStyle: "short",
      }).format(date);
}

function editorialStatusLabel(row: AdminRecord) {
  const labels: Record<string, string> = {
    DRAFT: "Bản nháp",
    IN_REVIEW: "Chờ duyệt",
    APPROVED: "Đã duyệt · đang ẩn",
    PUBLISHED: "Đang phát hành",
    HIDDEN: "Đã duyệt · đang ẩn",
    REVOKED: "Đã thu hồi",
  };
  return labels[String(row.editorial_status)] || (row.verified ? "Đã duyệt" : "Chưa duyệt");
}

function getArticleProvenance(record: AdminRecord) {
  const content = record.content && typeof record.content === "object" ? record.content as Record<string, unknown> : {};
  return content.provenance && typeof content.provenance === "object" ? content.provenance as Record<string, unknown> : {};
}

function getRitualProvenance(record: AdminRecord) {
  return record.content_provenance && typeof record.content_provenance === "object"
    ? record.content_provenance as Record<string, unknown>
    : {};
}

function isGroupAuthoredRitual(record: AdminRecord) {
  return getRitualProvenance(record).contentType === "GROUP_AUTHORED";
}

function reviewProvenanceIsIncomplete(
  section: Section,
  record: AdminRecord,
  rightsConfirmed: boolean,
  usageRights: string,
  sourceUrl: string,
  sourceLocator: string,
) {
  if (!rightsConfirmed) return true;
  if (section === "culture") return !["confirmed", "public-domain"].includes(usageRights);
  if (section === "prayers" || (section === "rituals" && !isGroupAuthoredRitual(record))) {
    return !/^https:\/\//i.test(sourceUrl.trim())
      || sourceLocator.trim().length < 2
      || !["confirmed", "public-domain"].includes(usageRights);
  }
  if (section === "rituals" && isGroupAuthoredRitual(record)) {
    const provenance = getRitualProvenance(record);
    return !String(provenance.authorOrOrganization || "").trim()
      || !String(provenance.scope || "").trim()
      || !String(provenance.contentRightsBasis || "").trim();
  }
  return false;
}

function getRecordTitle(row: AdminRecord, section: Section): string {
  if (typeof row.title === "string" && row.title.trim()) {
    return row.title.trim();
  }
  if (typeof row.name === "string" && row.name.trim()) {
    return row.name.trim();
  }
  if (section === "xam") {
    const stick =
      row.stick_number !== undefined && row.stick_number !== null
        ? `Thẻ số ${row.stick_number}`
        : "Thẻ xăm";
    const cat = row.category ? `: ${row.category}` : "";
    const fortune = row.fortune_level ? ` (${row.fortune_level})` : "";
    return `${stick}${cat}${fortune}`;
  }
  if (typeof row.email === "string" && row.email.trim()) {
    return row.email.trim();
  }
  if (typeof row.action === "string" && row.action.trim()) {
    return row.action.trim();
  }
  if (typeof row.slug === "string" && row.slug.trim()) {
    return `/${row.slug.trim()}`;
  }
  if (row.id) {
    return `Mục #${String(row.id).slice(0, 8)}`;
  }
  return "Không có tiêu đề";
}

export default function AdminApp() {
  const { dark, toggleTheme } = useTheme();
  const [section, setSection] = useState<Section>("overview");
  const [adminName, setAdminName] = useState("");
  const [booting, setBooting] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [forbidden, setForbidden] = useState(false);
  const [sessionUnavailable, setSessionUnavailable] = useState("");
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [overview, setOverview] = useState<AdminOverview | null>(null);
  const [pageData, setPageData] = useState<AdminPage<AdminRecord> | null>(null);
  const [rows, setRows] = useState<AdminRecord[]>([]);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [searchDraft, setSearchDraft] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [reviewRecord, setReviewRecord] = useState<AdminRecord | null>(null);
  const [reviewField, setReviewField] = useState<ReviewField | null>(null);
  const [reviewValue, setReviewValue] = useState(false);
  const [reviewNote, setReviewNote] = useState("");
  const [rightsConfirmed, setRightsConfirmed] = useState(false);
  const [sourceUrl, setSourceUrl] = useState("");
  const [sourceLocator, setSourceLocator] = useState("");
  const [usageRights, setUsageRights] = useState<
    "confirmed" | "public-domain" | "permission-required" | "unknown"
  >("unknown");
  const [editing, setEditing] = useState<{
    kind: "culture" | "calendar" | "xam" | "rituals" | "prayers";
    id?: string;
  } | null>(null);
  const [savingReview, setSavingReview] = useState(false);

  // New Interactive Controls
  const [activeFilter, setActiveFilter] = useState<ContentFilter>("all");
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const latestRequest = useRef(0);

  const fetchSection = useCallback(
    async (target: Section, nextPage = 1, query = "", status: ContentFilter = "all") => {
      if (target === "signals") {
        latestRequest.current += 1;
        setLoading(false);
        setPageData(null);
        setRows([]);
        return;
      }
      const requestId = ++latestRequest.current;
      setLoading(true);
      setError("");
      try {
        if (target === "overview") {
          const data = await loadAdminOverview();
          if (requestId !== latestRequest.current) return;
          setOverview(data);
          setPageData(null);
          setRows([]);
        } else {
          const data = await loadAdminList<AdminRecord>(
            target,
            nextPage,
            query,
            status,
          );
          if (requestId !== latestRequest.current) return;
          setPageData(data);
          setRows(data.items);
        }
      } catch (loadError) {
        if (requestId !== latestRequest.current) return;
        const message = readableError(loadError);
        setError(message);
        if (loadError instanceof ApiError && loadError.status === 403)
          setForbidden(true);
      } finally {
        if (requestId === latestRequest.current) setLoading(false);
      }
    },
    [],
  );

  useEffect(() => {
    let mounted = true;
    void restoreSession().then(async (session) => {
      if (!mounted) return;
      const user = session.user;
      if (session.status === "unavailable") {
        setSessionUnavailable(session.message);
        setBooting(false);
        return;
      }
      if (!user) {
        setBooting(false);
        // Chưa đăng nhập: chuyển hướng sang màn hình đăng nhập chung
        window.location.replace("/?login=true&redirect=/admin");
        return;
      }
      const access = getAdminAccessState(user);
      if (access === "forbidden") {
        setForbidden(true);
        setBooting(false);
        return;
      }
      setAdminName(user.name);
      setIsAuthenticated(true);
      await fetchSection("overview");
      if (mounted) {
        setBooting(false);
        try {
          const justLoggedIn = sessionStorage.getItem("tltl_admin_just_logged_in");
          if (justLoggedIn) {
            sessionStorage.removeItem("tltl_admin_just_logged_in");
            toast.success(
              `Chào mừng Quản trị viên ${justLoggedIn} đã trở lại Cổng điều hành Tin Lắm Tâm Linh!`,
              "Đăng nhập thành công"
            );
          }
        } catch {}
      }
    });
    return () => {
      mounted = false;
    };
  }, [fetchSection]);

  const navigate = (target: Section) => {
    setSection(target);
    setPage(1);
    setSearch("");
    setSearchDraft("");
    setActiveFilter("all");
    setReviewRecord(null);
    setMobileNavOpen(false);
    void fetchSection(target, 1, "");
  };

  const handleSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const next = searchDraft.trim();
    setSearch(next);
    setPage(1);
    if (section !== "overview") void fetchSection(section, 1, next, activeFilter);
  };

  const handleClearSearch = () => {
    setSearchDraft("");
    setSearch("");
    setPage(1);
    if (section !== "overview") void fetchSection(section, 1, "", activeFilter);
  };

  const changePage = (nextPage: number) => {
    setPage(nextPage);
    void fetchSection(section, nextPage, search, activeFilter);
  };

  const beginReview = (record: AdminRecord, field: ReviewField) => {
    setReviewRecord(record);
    setReviewField(field);
    setReviewValue(!Boolean(record[field]));
    setReviewNote("");
    setRightsConfirmed(false);
    setSourceUrl(typeof record.source === "string" ? record.source : "");
    setSourceLocator(section === "rituals" ? String(getRitualProvenance(record).sourceLocator || "") : "");
    setUsageRights("unknown");
  };

  const saveReview = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (
      !reviewRecord ||
      !reviewField ||
      section === "overview" ||
      section === "signals" ||
      section === "membership-interests" ||
      section === "audit-logs"
    )
      return;
    setSavingReview(true);
    setError("");
    try {
      const needsRights =
        (section === "culture" || section === "xam" || section === "rituals" || section === "prayers") &&
        reviewField === "verified" &&
        reviewValue;
      await reviewAdminRecord(section, reviewRecord.id, {
        [reviewField]: reviewValue,
        reviewNote,
        ...(needsRights
          ? {
              rightsConfirmed,
              ...(section === "rituals" || section === "prayers"
                ? { source: section === "rituals" && isGroupAuthoredRitual(reviewRecord) ? "" : sourceUrl.trim() }
                : {}),
              sourceLocator,
              usageRights,
            }
          : {}),
      });
      setReviewRecord(null);
      setPage(1);
      await fetchSection(section, 1, search, activeFilter);
    } catch (saveError) {
      setError(readableError(saveError));
    } finally {
      setSavingReview(false);
    }
  };

  const handleLogout = async () => {
    const result = await logoutAccount();
    setIsAuthenticated(false);
    setForbidden(false);
    setOverview(null);
    setRows([]);
    window.location.replace(result.serverRevoked ? "/?screen=login" : "/?screen=login&logout=unconfirmed");
  };

  const filteredRows = rows;

  // Statistics for content deck
  const contentStats = useMemo(() => {
    const stats = pageData?.stats;
    const statuses = stats?.statuses;
    const total = stats?.total ?? pageData?.pagination.total ?? rows.length;
    const verifiedCount = statuses ? statuses.APPROVED + statuses.PUBLISHED + statuses.HIDDEN : rows.filter((r) => Boolean(r.verified)).length;
    const hasSourceCount = stats?.withSource ?? rows.filter((r) => Boolean(r.source)).length;
    const activeCount = statuses?.PUBLISHED ?? rows.filter((r) => Boolean(r.active)).length;
    const north = stats?.regions.NORTH ?? 0;
    const central = stats?.regions.CENTRAL ?? 0;
    const south = stats?.regions.SOUTH ?? 0;
    const nation = stats?.regions.NATIONWIDE ?? 0;

    return {
      total,
      verifiedCount,
      hasSourceCount,
      activeCount,
      regionCounts: { north, central, south, nation },
      statuses: statuses ?? { DRAFT: 0, IN_REVIEW: 0, APPROVED: 0, PUBLISHED: 0, HIDDEN: 0, REVOKED: 0 },
      missingSource: stats?.missingSource ?? Math.max(0, total - hasSourceCount),
    };
  }, [pageData, rows]);

  if (booting) {
    return (
      <div className="admin-boot-screen" role="status">
        <div className="admin-boot-spinner-wrap">
          <div className="admin-boot-spinner" />
          <ShieldCheck size={28} className="admin-boot-icon" />
        </div>
        <p className="admin-boot-title">Tin Lắm Tâm Linh</p>
        <span className="admin-boot-subtitle">Đang tải dữ liệu quản trị…</span>
      </div>
    );
  }

  if (forbidden) {
    return (
      <div className="admin-boot-screen" role="alert">
        <div className="admin-boot-spinner-wrap">
          <Lock size={28} className="admin-boot-icon" />
        </div>
        <p className="admin-boot-title">Tài khoản chưa có quyền quản trị</p>
        <span className="admin-boot-subtitle">
          Chỉ tài khoản ADMIN mới có thể truy cập khu vực này.
        </span>
        <div style={{ display: "flex", gap: 12, marginTop: 20 }}>
          <a className="admin-secondary-button" href="/">Về ứng dụng</a>
          <button
            className="admin-secondary-button"
            type="button"
            onClick={() => void handleLogout()}
          >
            <LogOut size={16} /> Đăng xuất
          </button>
        </div>
      </div>
    );
  }

  if (sessionUnavailable) {
    return (
      <div className="admin-boot-screen" role="alert">
        <div className="admin-boot-spinner-wrap"><ShieldCheck size={28} className="admin-boot-icon" /></div>
        <p className="admin-boot-title">Chưa xác minh được phiên quản trị</p>
        <span className="admin-boot-subtitle">{sessionUnavailable}</span>
        <div style={{ display: "flex", gap: 12, marginTop: 20 }}>
          <a className="admin-secondary-button" href="/?login=true&redirect=/admin">Thử đăng nhập lại</a>
          <a className="admin-secondary-button" href="/">Về ứng dụng</a>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="admin-boot-screen" role="status">
        <div className="admin-boot-spinner-wrap">
          <div className="admin-boot-spinner" />
          <ShieldCheck size={28} className="admin-boot-icon" />
        </div>
        <p className="admin-boot-title">Cổng Quản Trị Tin Lắm Tâm Linh</p>
        <span className="admin-boot-subtitle">
          Chưa xác thực phiên quản trị. Đang chuyển hướng về cổng đăng nhập…{" "}
          <a
            href="/?login=true&redirect=/admin"
            style={{ color: "var(--admin-gold)", textDecoration: "underline", marginLeft: "6px" }}
          >
            Nhấn vào đây nếu trang không tự chuyển
          </a>
        </span>
      </div>
    );
  }

  const current = TITLES[section];
  const hasSearch = section !== "overview" && section !== "audit-logs" && section !== "signals";
  const canCreate =
    section === "culture" ||
    section === "calendar" ||
    section === "xam" ||
    section === "rituals" ||
    section === "prayers";
  const isContentSection =
    section === "culture" ||
    section === "calendar" ||
    section === "xam" ||
    section === "rituals" ||
    section === "prayers";

  return (
    <div className="admin-shell">
      {mobileNavOpen && (
        <button
          className="admin-nav-scrim"
          type="button"
          aria-label="Đóng menu điều hướng"
          onClick={() => setMobileNavOpen(false)}
        />
      )}

      {/* Modern Luxury Obsidian Sidebar */}
      <aside
        className={`admin-sidebar ${mobileNavOpen ? "is-open" : ""}`}
        aria-label="Điều hướng quản trị"
      >
        <div className="admin-sidebar-header">
          <a
            href="/admin"
            className="admin-brand"
            aria-label="Tin Lắm Tâm Linh Admin Portal"
          >
            <span className="admin-brand-mark">
              <ShieldCheck size={20} aria-hidden="true" />
            </span>
            <div className="admin-brand-text">
              <strong>Tin Lắm Tâm Linh</strong>
              <small>BACK OFFICE PORTAL</small>
            </div>
          </a>
          <div className="admin-portal-badge">ADMIN</div>
        </div>

        <nav className="admin-nav">
          {NAV.map((item, index) => {
            const Icon = item.icon;
            const previous = NAV[index - 1];
            return (
              <div key={item.id} className="admin-nav-group-wrapper">
                {item.group !== previous?.group && (
                  <p className="admin-nav-group">{item.group}</p>
                )}
                <button
                  type="button"
                  onClick={() => navigate(item.id)}
                  className={`admin-nav-item ${section === item.id ? "is-active" : ""}`}
                  aria-current={section === item.id ? "page" : undefined}
                >
                  <Icon
                    size={18}
                    aria-hidden="true"
                    className="admin-nav-icon"
                  />
                  <span className="admin-nav-label">{item.label}</span>
                  {section === item.id && (
                    <span className="admin-nav-indicator" aria-hidden="true" />
                  )}
                </button>
              </div>
            );
          })}
        </nav>

        <div className="admin-sidebar-bottom">
          <div className="admin-session-card">
            <span className="admin-avatar">
              {adminName.slice(0, 1).toUpperCase() || "A"}
            </span>
            <div className="admin-session-info">
              <strong>{adminName || "Quản trị viên"}</strong>
              <small>
                <span className="admin-live-dot" /> Quản trị tối cao (ADMIN)
              </small>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Administrative Container */}
      <main className="admin-main">
        <details className="mb-6">
          <summary className="cursor-pointer p-3 font-semibold">
            Quản lý đơn thanh toán
          </summary>

          <AdminPaymentsPanel />
        </details>
        <details>
          <summary>Cảnh báo giao dịch thanh toán</summary>
          <AdminPaymentAlertsPanel />
        </details>
        <details className="mb-6">
          <summary className="cursor-pointer p-3 font-semibold">
            Quản lý đề xuất hợp tác
          </summary>

          <PartnershipPanel admin />
        </details>
        <details>
          <summary>Hộp quà văn hóa từ đối tác</summary>
          <AdminPartnerGiftsPanel />
        </details>
        <header className="admin-topbar">
          <div className="admin-topbar-left">
            <button
              className="admin-mobile-menu"
              type="button"
              aria-label="Mở menu điều hướng"
              onClick={() => setMobileNavOpen(true)}
            >
              <Menu size={20} />
            </button>
            <div className="admin-breadcrumb">
              <span className="admin-crumb-root">Quản trị</span>
              <ChevronRight size={14} className="admin-crumb-arrow" />
              <span className="admin-crumb-active">{current.title}</span>
            </div>
          </div>

          <div className="admin-topbar-right">
            <a
              href="/"
              className="admin-use-app-button"
              title="Mở ứng dụng Tin Lắm Tâm Linh để trải nghiệm như khách hàng"
            >
              <Globe size={15} />
              <span>Sử dụng ứng dụng</span>
            </a>
            <button
              type="button"
              className="admin-theme-toggle-btn"
              onClick={toggleTheme}
              aria-label={
                dark
                  ? "Chuyển sang giao diện sáng"
                  : "Chuyển sang giao diện tối"
              }
              title={
                dark
                  ? "Chuyển sang Màu Be (Ban Ngày)"
                  : "Chuyển sang Màu Đỏ (Ban Đêm)"
              }
            >
              {dark ? (
                <Moon size={16} aria-hidden="true" />
              ) : (
                <Sun size={16} aria-hidden="true" />
              )}
            </button>
            <button
              type="button"
              className="admin-quick-refresh-btn"
              onClick={() => void fetchSection(section, page, search, activeFilter)}
              title="Tải lại dữ liệu"
              disabled={loading}
            >
              <RefreshCw
                size={14}
                className={loading ? "admin-spin-icon" : ""}
              />
              <span>Làm mới</span>
            </button>
            <div className="admin-status-pill"><span>Cổng quản trị</span></div>
            <button
              type="button"
              className="admin-topbar-logout-btn"
              onClick={() => setShowLogoutConfirm(true)}
              title="Đăng xuất khỏi Cổng Quản Trị"
              aria-label="Đăng xuất"
            >
              <LogOut size={15} />
              <span>Đăng xuất</span>
            </button>
          </div>
        </header>

        <div className="admin-content">
          {/* Page Heading & Actions Banner */}
          <div className="admin-page-heading">
            <div className="admin-heading-copy">
              <div className="admin-eyebrow-tag">
                <Sparkles size={12} /> {current.tag}
              </div>
              <h1>{current.title}</h1>
              <p className="admin-muted">{current.description}</p>
            </div>

            <div className="admin-heading-actions">
              {hasSearch && (
                <form
                  className="admin-search"
                  onSubmit={handleSearch}
                  role="search"
                >
                  <Search size={16} className="admin-search-icon" />
                  <input
                    aria-label="Tìm kiếm nội dung"
                    placeholder="Tìm theo tiêu đề, danh mục, từ khóa…"
                    value={searchDraft}
                    onChange={(event) => setSearchDraft(event.target.value)}
                  />
                  {searchDraft && (
                    <button
                      type="button"
                      className="admin-search-clear"
                      onClick={handleClearSearch}
                      aria-label="Xóa từ khóa"
                    >
                      <X size={14} />
                    </button>
                  )}
                  <button type="submit" className="admin-search-submit">
                    Tìm
                  </button>
                </form>
              )}

              {canCreate && (
                <button
                  className="admin-create-button"
                  type="button"
                  onClick={() =>
                    setEditing({
                      kind: section as
                        | "culture"
                        | "calendar"
                        | "xam"
                        | "rituals"
                        | "prayers",
                    })
                  }
                >
                  <Plus size={16} /> Tạo bản thảo mới
                </button>
              )}
            </div>
          </div>

          {error && (
            <div className="admin-alert" role="alert">
              <div className="admin-alert-content">
                <AlertCircle size={18} />
                <span>{error}</span>
              </div>
              <button
                type="button"
                aria-label="Đóng thông báo"
                onClick={() => setError("")}
              >
                <X size={16} />
              </button>
            </div>
          )}

          {/* Section View: Overview Dashboard */}
          {section === "overview" && (
            <OverviewPanel
              overview={overview}
              loading={loading}
              onNavigate={navigate}
            />
          )}

          {/* Section View: Content & Data List */}
          {section === "signals" && <SignalAdminPanel />}

          {section !== "overview" && section !== "signals" && (
            <section
              aria-label={current.title}
              aria-busy={loading}
              className="admin-data-section"
            >
              {/* MINI ANALYTICS & VISUAL CHART DECK FOR CONTENT PAGES */}
              {isContentSection && !loading && pageData?.stats && (
                <ContentSectionAnalyticsDeck
                  total={contentStats.total}
                  verifiedCount={contentStats.verifiedCount}
                  hasSourceCount={contentStats.hasSourceCount}
                  activeCount={contentStats.activeCount}
                  regionCounts={contentStats.regionCounts}
                />
              )}

              {/* INTERACTIVE CONTROLS BAR: FILTER TABS & VIEW MODE */}
              {isContentSection && (
                <div className="admin-filter-control-bar">
                  <div className="admin-filter-tabs">
                    <button
                      type="button"
                      className={`admin-filter-tab ${activeFilter === "all" ? "is-active" : ""}`}
                      onClick={() => { setActiveFilter("all"); setPage(1); void fetchSection(section, 1, search, "all"); }}
                    >
                      <Filter size={13} /> Tất cả ({contentStats.total})
                    </button>
                    <button
                      type="button"
                      className={`admin-filter-tab ${activeFilter === "DRAFT" ? "is-active" : ""}`}
                      onClick={() => { setActiveFilter("DRAFT"); setPage(1); void fetchSection(section, 1, search, "DRAFT"); }}
                    >
                      Bản nháp ({contentStats.statuses.DRAFT})
                    </button>
                    <button
                      type="button"
                      className={`admin-filter-tab ${activeFilter === "IN_REVIEW" ? "is-active" : ""}`}
                      onClick={() => { setActiveFilter("IN_REVIEW"); setPage(1); void fetchSection(section, 1, search, "IN_REVIEW"); }}
                    >
                      Chờ duyệt ({contentStats.statuses.IN_REVIEW})
                    </button>
                    <button
                      type="button"
                      className={`admin-filter-tab ${activeFilter === "APPROVED" ? "is-active" : ""}`}
                      onClick={() => { setActiveFilter("APPROVED"); setPage(1); void fetchSection(section, 1, search, "APPROVED"); }}
                    >
                      Đã duyệt ({contentStats.statuses.APPROVED})
                    </button>
                    <button
                      type="button"
                      className={`admin-filter-tab ${activeFilter === "PUBLISHED" ? "is-active" : ""}`}
                      onClick={() => { setActiveFilter("PUBLISHED"); setPage(1); void fetchSection(section, 1, search, "PUBLISHED"); }}
                    >
                      Đang phát hành ({contentStats.statuses.PUBLISHED})
                    </button>
                    <button type="button" className={`admin-filter-tab ${activeFilter === "HIDDEN" ? "is-active" : ""}`} onClick={() => { setActiveFilter("HIDDEN"); setPage(1); void fetchSection(section, 1, search, "HIDDEN"); }}>
                      Đang ẩn ({contentStats.statuses.HIDDEN})
                    </button>
                    <button type="button" className={`admin-filter-tab ${activeFilter === "REVOKED" ? "is-active" : ""}`} onClick={() => { setActiveFilter("REVOKED"); setPage(1); void fetchSection(section, 1, search, "REVOKED"); }}>
                      Thu hồi ({contentStats.statuses.REVOKED})
                    </button>
                    <button type="button" className={`admin-filter-tab ${activeFilter === "needs_source" ? "is-active" : ""}`} onClick={() => { setActiveFilter("needs_source"); setPage(1); void fetchSection(section, 1, search, "needs_source"); }}>
                      Thiếu URL nguồn ({contentStats.missingSource})
                    </button>
                  </div>

                  <div className="admin-view-toggle">
                    <button
                      type="button"
                      className={`admin-view-btn ${viewMode === "grid" ? "is-active" : ""}`}
                      onClick={() => setViewMode("grid")}
                      title="Chế độ xem dạng Thẻ (Grid)"
                    >
                      <LayoutGrid size={15} />
                    </button>
                    <button
                      type="button"
                      className={`admin-view-btn ${viewMode === "table" ? "is-active" : ""}`}
                      onClick={() => setViewMode("table")}
                      title="Chế độ xem dạng Bảng (Table)"
                    >
                      <List size={15} />
                    </button>
                  </div>
                </div>
              )}

              {loading && (
                <div className="admin-loading-card" role="status">
                  <RefreshCw size={24} className="admin-spin-icon" />
                  <p>Đang đồng bộ dữ liệu từ máy chủ…</p>
                </div>
              )}

              {!loading && filteredRows.length === 0 && !error && (
                <div className="admin-empty">
                  <div className="admin-empty-icon-wrap">
                    <CircleHelp size={28} />
                  </div>
                  <strong>Không tìm thấy bản ghi nào</strong>
                  <span>
                    {search
                      ? `Không có kết quả khớp với "${search}". Hãy thử từ khóa khác.`
                      : activeFilter !== "all"
                        ? "Không có bản ghi nào khớp với bộ lọc đang chọn."
                        : "Danh mục này hiện chưa có dữ liệu khả dụng."}
                  </span>
                  {(search || activeFilter !== "all") && (
                    <button
                      type="button"
                      className="admin-secondary-button admin-empty-reset"
                      onClick={() => {
                        setActiveFilter("all");
                        setSearchDraft("");
                        setSearch("");
                        setPage(1);
                        void fetchSection(section, 1, "", "all");
                      }}
                    >
                      Xóa bộ lọc & Đặt lại
                    </button>
                  )}
                </div>
              )}

              {!loading && filteredRows.length > 0 && (
                <RecordList
                  section={section}
                  rows={filteredRows}
                  viewMode={viewMode}
                  onReview={beginReview}
                  onEdit={(id) => {
                    if (canCreate)
                      setEditing({
                        kind: section as
                          | "culture"
                          | "calendar"
                          | "xam"
                          | "rituals"
                          | "prayers",
                        id,
                      });
                  }}
                />
              )}

              {/* Review / Verification Modal Drawer */}
              {reviewRecord && reviewField && (
                <div className="admin-review-overlay">
                  <form
                    className="admin-review-panel"
                    onSubmit={(event) => void saveReview(event)}
                  >
                    <div className="admin-review-header">
                      <div>
                        <h3>
                          {reviewField === "verified"
                            ? "Cập nhật trạng thái xác minh"
                            : "Cập nhật trạng thái hiển thị"}
                        </h3>
                        <p className="admin-muted">
                          Thao tác sẽ được ghi nhận vào nhật ký kiểm duyệt hệ
                          thống. Vui lòng đối chiếu kỹ nguồn và bản quyền.
                        </p>
                      </div>
                      <button
                        type="button"
                        className="admin-review-close"
                        onClick={() => setReviewRecord(null)}
                        aria-label="Đóng bảng"
                      >
                        <X size={18} />
                      </button>
                    </div>

                    {section === "culture" && (
                      <div className="admin-review-form-fields" aria-label="Hồ sơ nguồn và quyền nội dung">
                        <strong>Hồ sơ nguồn và tài sản</strong>
                        {(() => {
                          const provenance = getArticleProvenance(reviewRecord);
                          const contentTypes: Record<string, string> = { GROUP_AUTHORED: "Do nhóm biên soạn", FACT: "Thông tin / sự kiện", LEGEND: "Truyền thuyết / tín ngưỡng", QUOTATION: "Có câu trích dẫn" };
                          return <dl className="admin-record-details">
                            <div><dt>Loại nội dung</dt><dd>{contentTypes[String(provenance.contentType)] || "Chưa khai báo"}</dd></div>
                            <div><dt>Nguồn / tài liệu</dt><dd>{displayValue(provenance.sourceTitle)}</dd></div>
                            <div><dt>Tác giả / tổ chức</dt><dd>{displayValue(provenance.sourceAuthor)}</dd></div>
                            <div><dt>URL nguồn</dt><dd>{displayValue(reviewRecord.source)}</dd></div>
                            <div><dt>Thư mục xuất bản</dt><dd>{displayValue(provenance.bibliography)}</dd></div>
                            <div><dt>Vị trí nguồn</dt><dd>{displayValue(provenance.sourceLocator)}</dd></div>
                            <div><dt>Địa phương / cộng đồng</dt><dd>{displayValue(provenance.localCommunity)}</dd></div>
                            <div><dt>Chú thích ảnh</dt><dd>{displayValue(provenance.imageCaption)}</dd></div>
                            <div><dt>Nguồn ảnh</dt><dd>{displayValue(provenance.imageSource)}</dd></div>
                            <div><dt>Căn cứ quyền ảnh</dt><dd>{displayValue(provenance.imageRightsBasis)}</dd></div>
                          </dl>;
                        })()}
                      </div>
                    )}

                    {section === "rituals" && (
                      <div className="admin-review-form-fields" aria-label="Phạm vi và nguồn hướng dẫn nghi lễ">
                        {(() => {
                          const provenance = getRitualProvenance(reviewRecord);
                          return <dl className="admin-record-details">
                            <div><dt>Loại nội dung</dt><dd>{displayValue(provenance.contentType)}</dd></div>
                            <div><dt>Người / nhóm biên soạn</dt><dd>{displayValue(provenance.authorOrOrganization)}</dd></div>
                            <div><dt>Phạm vi áp dụng</dt><dd>{displayValue(provenance.scope)}</dd></div>
                            <div><dt>Cộng đồng / địa phương</dt><dd>{displayValue(provenance.localCommunity)}</dd></div>
                            <div><dt>Căn cứ quyền nội dung</dt><dd>{displayValue(provenance.contentRightsBasis)}</dd></div>
                            <div><dt>URL nguồn</dt><dd>{displayValue(reviewRecord.source)}</dd></div>
                            <div><dt>Locator nguồn</dt><dd>{displayValue(provenance.sourceLocator)}</dd></div>
                          </dl>;
                        })()}
                        {isGroupAuthoredRitual(reviewRecord) && <p className="admin-muted">Hướng dẫn nguyên bản không cần URL ngoài; kiểm tra người biên soạn, phạm vi áp dụng, checklist và căn cứ quyền thực tế.</p>}
                      </div>
                    )}

                    {(section === "culture" || section === "xam" ||
                      section === "rituals" ||
                      section === "prayers") &&
                      reviewField === "verified" &&
                      reviewValue && (
                        <div className="admin-review-form-fields">
                          {section === "culture" && (
                            <div className="admin-form-row">
                              <label htmlFor="admin-usage-rights">Căn cứ quyền sử dụng ảnh <span aria-hidden="true">*</span></label>
                              <select id="admin-usage-rights" value={usageRights} onChange={(event) => setUsageRights(event.target.value as typeof usageRights)}>
                                <option value="unknown">Chưa xác minh</option>
                                <option value="confirmed">Đã có văn bản ủy quyền</option>
                                <option value="public-domain">Thuộc phạm vi công cộng</option>
                                <option value="permission-required">Cần bổ sung văn bản cho phép</option>
                              </select>
                            </div>
                          )}
                          {(section === "prayers" || (section === "rituals" && !isGroupAuthoredRitual(reviewRecord))) && (
                            <>
                              <div className="admin-form-row">
                                <label htmlFor="admin-source-url">
                                  URL nguồn tham chiếu HTTPS{" "}
                                  <span aria-hidden="true">*</span>
                                </label>
                                <input
                                  id="admin-source-url"
                                  type="url"
                                  required
                                  value={sourceUrl}
                                  onChange={(event) =>
                                    setSourceUrl(event.target.value)
                                  }
                                  placeholder="https://dlib.vn/..."
                                />
                              </div>
                              <div className="admin-form-row">
                                <label htmlFor="admin-source-locator">
                                  Vị trí trích dẫn / Locator{" "}
                                  <span aria-hidden="true">*</span>
                                </label>
                                <input
                                  id="admin-source-locator"
                                  required
                                  minLength={2}
                                  maxLength={500}
                                  value={sourceLocator}
                                  onChange={(event) =>
                                    setSourceLocator(event.target.value)
                                  }
                                  placeholder="Trang, mục, quyển, số hiệu văn bản…"
                                />
                              </div>
                              <div className="admin-form-row">
                                <label htmlFor="admin-usage-rights">
                                  Căn cứ quyền sử dụng{" "}
                                  <span aria-hidden="true">*</span>
                                </label>
                                <select
                                  id="admin-usage-rights"
                                  value={usageRights}
                                  onChange={(event) =>
                                    setUsageRights(
                                      event.target.value as typeof usageRights,
                                    )
                                  }
                                >
                                  <option value="unknown">Chưa xác minh</option>
                                  <option value="confirmed">
                                    Đã có văn bản ủy quyền
                                  </option>
                                  <option value="public-domain">
                                    Thuộc phạm vi công cộng (Public Domain)
                                  </option>
                                  <option value="permission-required">
                                    Cần bổ sung văn bản cho phép
                                  </option>
                                </select>
                              </div>
                            </>
                          )}
                          <label className="admin-review-rights">
                            <input
                              type="checkbox"
                              checked={rightsConfirmed}
                              onChange={(event) =>
                                setRightsConfirmed(event.target.checked)
                              }
                            />
                            <span>
                              Tôi đã đối chiếu hồ sơ nguồn và căn cứ quyền sử dụng phù hợp với loại nội dung này.
                            </span>
                          </label>
                        </div>
                      )}

                    <div className="admin-form-row">
                      <label htmlFor="admin-review-note">
                        Ghi chú rà soát / Lý do kiểm duyệt{" "}
                        <span aria-hidden="true">*</span>
                      </label>
                      <textarea
                        id="admin-review-note"
                        required
                        minLength={8}
                        maxLength={500}
                        rows={3}
                        value={reviewNote}
                        onChange={(event) => setReviewNote(event.target.value)}
                        placeholder="Nêu rõ nguồn tài liệu, ấn bản đối chiếu và căn cứ duyệt…"
                      />
                    </div>

                    <div className="admin-review-actions">
                      <button
                        className="admin-secondary-button"
                        type="button"
                        onClick={() => setReviewRecord(null)}
                      >
                        Hủy bỏ
                      </button>
                      <button
                        className="admin-primary-button"
                        type="submit"
                        disabled={
                          savingReview ||
                          reviewNote.trim().length < 8 ||
                          ((section === "culture" || section === "xam" ||
                            section === "rituals" || section === "prayers") &&
                            reviewField === "verified" &&
                            reviewValue &&
                            reviewProvenanceIsIncomplete(
                              section,
                              reviewRecord,
                              rightsConfirmed,
                              usageRights,
                              sourceUrl,
                              sourceLocator,
                            ))
                        }
                      >
                        {savingReview ? "Đang ghi nhận…" : "Lưu quyết định"}
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* Enhanced Pagination */}
              {pageData && pageData.pagination.pageCount > 1 && (
                <div className="admin-pagination">
                  <span className="admin-pagination-info">
                    Tổng cộng{" "}
                    <strong>
                      {pageData.pagination.total.toLocaleString("vi-VN")}
                    </strong>{" "}
                    bản ghi · Trang <strong>{page}</strong> /{" "}
                    {pageData.pagination.pageCount}
                  </span>
                  <div className="admin-pagination-buttons">
                    <button
                      type="button"
                      aria-label="Trang trước"
                      disabled={page <= 1 || loading}
                      onClick={() => changePage(page - 1)}
                    >
                      <ChevronLeft size={18} />
                    </button>
                    <span className="admin-page-number-pill">{page}</span>
                    <button
                      type="button"
                      aria-label="Trang sau"
                      disabled={
                        page >= pageData.pagination.pageCount || loading
                      }
                      onClick={() => changePage(page + 1)}
                    >
                      <ChevronRight size={18} />
                    </button>
                  </div>
                </div>
              )}
            </section>
          )}

          {/* Content Editor Dialog */}
          {editing && (
            <ContentEditor
              key={`${editing.kind}:${editing.id || "new"}`}
              {...editing}
              onClose={() => setEditing(null)}
              onSaved={() => {
                setEditing(null);
                setPage(1);
                void fetchSection(section, 1, search, activeFilter);
              }}
            />
          )}

          <footer className="admin-footer">
            <div className="admin-footer-left">
              <span>
                Hệ thống quản trị <strong>Tin Lắm Tâm Linh</strong> · Ứng dụng: Thích Cúng Kiếng.
              </span>
            </div>
            <div className="admin-footer-right">
              <span>
                Động cơ biểu đồ SVG tích hợp · Mã hóa phân quyền ADMIN
              </span>
            </div>
          </footer>
        </div>
      </main>

      {/* Forbidden Dialog */}
      {forbidden && (
        <div
          className="admin-forbidden"
          role="alertdialog"
          aria-labelledby="admin-forbidden-title"
        >
          <div className="admin-forbidden-card">
            <div className="admin-forbidden-badge">
              <ShieldCheck size={32} />
            </div>
            <h2 id="admin-forbidden-title">Tài khoản chưa có quyền quản trị</h2>
            <p>
              Tài khoản đăng nhập không sở hữu role <code>ADMIN</code> được cấp
              phép trên hệ thống máy chủ. Vui lòng liên hệ quản trị viên cấp cao
              để được cấp quyền.
            </p>
            <div className="admin-forbidden-actions">
              <a
                className="admin-secondary-button"
                href="/"
              >
                Về ứng dụng khách
              </a>
              <button
                className="admin-primary-button"
                type="button"
                onClick={() => setShowLogoutConfirm(true)}
              >
                Đăng xuất tài khoản
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Logout Confirm Dialog */}
      <LogoutConfirmDialog
        open={showLogoutConfirm}
        userName={adminName || "Quản trị viên"}
        title="Kết thúc phiên Quản trị?"
        description="Bạn có chắc chắn muốn đăng xuất khỏi Cổng Quản Trị Tin Lắm Tâm Linh? Mọi dữ liệu kiểm duyệt đã lưu sẽ được bảo toàn an toàn."
        confirmText="Xác nhận Đăng xuất"
        onCancel={() => setShowLogoutConfirm(false)}
        onConfirm={() => {
          setShowLogoutConfirm(false);
          void handleLogout();
        }}
      />

      <ToastContainer />
    </div>
  );
}

function OverviewPanel({
  overview,
  loading,
  onNavigate,
}: {
  overview: AdminOverview | null;
  loading: boolean;
  onNavigate: (section: Section) => void;
}) {
  if (loading && !overview) {
    return (
      <div className="admin-loading-card" role="status">
        <RefreshCw size={24} className="admin-spin-icon" />
        <p>Đang tính toán các chỉ số vận hành và biểu đồ…</p>
      </div>
    );
  }

  if (!overview) {
    return (
      <div className="admin-empty">
        <div className="admin-empty-icon-wrap">
          <CircleHelp size={28} />
        </div>
        <strong>Chưa tải được số liệu vận hành</strong>
        <span>Kiểm tra kết nối tới máy chủ backend và thử tải lại.</span>
      </div>
    );
  }

  const metricCards = [
    {
      label: "Người dùng hoạt động hôm nay",
      value: overview.analytics.dau,
      note: "DAU · Chấp thuận telemetry",
      icon: Activity,
      color: "metric-crimson",
      sparkColor: "#8b252e",
      sparkData: overview.analytics.sparklines?.dau || [],
    },
    {
      label: "Lượt hoạt động tháng này",
      value: overview.analytics.mau,
      note: "MAU · Visitor ID ẩn danh",
      icon: UsersRound,
      color: "metric-gold",
      sparkColor: "#c89655",
      sparkData: overview.analytics.sparklines?.engagements || [],
    },
    {
      label: "Kích hoạt trong 24 giờ",
      value:
        overview.analytics.activationRate30d === null
          ? "—"
          : `${overview.analytics.activationRate30d}%`,
      note: overview.analytics.activationRate30d === null ? "Chưa có đủ mẫu đăng ký để tính" : "Hoàn thành ít nhất một luồng MVP trong 24 giờ",
      icon: ArrowUpRight,
      color: "metric-emerald",
      sparkColor: "#2d7a52",
      sparkData: [],
    },
    {
      label: "Lượt quan tâm hội viên",
      value: overview.membershipInterestCount,
      note: "Đăng ký nhận cập nhật · chưa có thanh toán",
      icon: UsersRound,
      color: "metric-blue",
      sparkColor: "#2c6ca8",
      sparkData: [],
    },
  ];

  const reviewItems = [
    {
      label: "Bài văn hóa cần rà soát",
      value: overview.content.articlesAwaitingReview,
      total: overview.content.activeArticles,
      target: "culture" as const,
    },
    {
      label: "Sự kiện lịch cần rà soát",
      value: overview.content.calendarEventsAwaitingReview,
      total: overview.content.activeCalendarEvents,
      target: "calendar" as const,
    },
    {
      label: "Thẻ xin xăm cần rà soát",
      value: overview.content.xamLotsAwaitingReview,
      total: overview.content.activeXamLots,
      target: "xam" as const,
    },
    {
      label: "Nghi lễ cần rà soát",
      value: overview.content.ritualsAwaitingReview,
      total: overview.content.activeRituals,
      target: "rituals" as const,
    },
    {
      label: "Văn khấn cần rà soát",
      value: overview.content.prayersAwaitingReview,
      total: overview.content.activePrayers,
      target: "prayers" as const,
    },
  ];

  const totalReviewsNeeded = reviewItems.reduce(
    (sum, item) => sum + item.value,
    0,
  );

  // Content Bar Chart Data
  const contentComparisonData = [
    {
      name: "Kho văn hóa",
      verified:
        overview.content.activeArticles -
        overview.content.articlesAwaitingReview,
      unverified: overview.content.articlesAwaitingReview,
    },
    {
      name: "Lịch sự kiện",
      verified:
        overview.content.activeCalendarEvents -
        overview.content.calendarEventsAwaitingReview,
      unverified: overview.content.calendarEventsAwaitingReview,
    },
    {
      name: "Xin xăm",
      verified:
        overview.content.activeXamLots - overview.content.xamLotsAwaitingReview,
      unverified: overview.content.xamLotsAwaitingReview,
    },
    {
      name: "Nghi lễ",
      verified:
        overview.content.activeRituals - overview.content.ritualsAwaitingReview,
      unverified: overview.content.ritualsAwaitingReview,
    },
    {
      name: "Văn khấn",
      verified:
        overview.content.activePrayers - overview.content.prayersAwaitingReview,
      unverified: overview.content.prayersAwaitingReview,
    },
  ];

  // User Acquisition Donut Data
  const SOURCE_LABELS: Record<string, string> = {
    campus_qr: "QR Học đường",
    direct: "Trực tiếp",
    organic_social: "Mạng xã hội",
    referral: "Giới thiệu",
    google_search: "Tìm kiếm",
  };

  const acquisitionDonutData = (overview.analytics.acquisition || []).map((item, idx) => ({
    label: SOURCE_LABELS[item.source] || item.source.replaceAll("_", " "),
    value: item.signups,
    color: ["#c89655", "#8b252e", "#2d7a52", "#2c6ca8", "#8b5cf6"][idx % 5],
  }));

  return (
    <div className="admin-overview">
      {/* 4 Elevated Metric Cards with Sparkline Glow Curves */}
      <div className="admin-metric-grid">
        {metricCards.map((metric) => {
          const Icon = metric.icon;
          return (
            <article
              className={`admin-metric-card ${metric.color}`}
              key={metric.label}
            >
              <div className="admin-metric-header">
                <div className="admin-metric-icon">
                  <Icon size={20} />
                </div>
                <SparklineChart
                  data={metric.sparkData}
                  color={metric.sparkColor}
                  height={32}
                  width={100}
                />
              </div>
              <p className="admin-metric-label">{metric.label}</p>
              <strong className="admin-metric-value">
                {typeof metric.value === "number"
                  ? metric.value.toLocaleString("vi-VN")
                  : metric.value}
              </strong>
              <span className="admin-metric-note">{metric.note}</span>
            </article>
          );
        })}
      </div>

      {/* FULL-WIDTH INTERACTIVE TREND CHART */}
      <InteractiveTrendChart
        title="Lưu lượng Truy cập & Tương tác Tâm Linh (7 ngày)"
        subtitle="Dữ liệu thực tế tổng hợp theo ngày từ máy chủ backend (analytics_events)"
        data={overview.analytics.trends || []}
      />

      {/* GRID: CONTENT STATUS BAR CHART & USER ACQUISITION DONUT */}
      <div className="admin-overview-grid">
        <ContentStatusBarChart
          title="Chỉ số Thẩm định & Xác minh 5 Kho nội dung"
          categories={contentComparisonData}
        />
        <DonutChart
          title="Phân bổ Nguồn Tăng trưởng (30 ngày)"
          data={acquisitionDonutData}
          size={160}
          strokeWidth={22}
        />
      </div>

      {/* Grid: Quality Control Review Queue & Retention */}
      <div className="admin-overview-grid">
        <section className="admin-panel admin-review-queue-panel">
          <div className="admin-panel-heading">
            <div>
              <p className="admin-eyebrow">KIỂM SOÁT NỘI DUNG</p>
              <h2>Hàng chờ rà soát & thẩm định</h2>
            </div>
            <span
              className={`admin-count-pill ${totalReviewsNeeded > 0 ? "has-pending" : ""}`}
            >
              {totalReviewsNeeded} mục
            </span>
          </div>

          <div className="admin-review-queue-list">
            {reviewItems.map((item) => (
              <button
                className="admin-review-row"
                key={item.target}
                type="button"
                onClick={() => onNavigate(item.target)}
              >
                <div className="admin-review-row-left">
                  <span className="admin-review-row-icon">
                    <FileCheck2 size={16} />
                  </span>
                  <div className="admin-review-row-copy">
                    <strong>{item.label}</strong>
                    <small>
                      {item.total.toLocaleString("vi-VN")} mục đang lưu hành
                    </small>
                  </div>
                </div>
                <div className="admin-review-row-right">
                  <span
                    className={`admin-review-badge ${item.value > 0 ? "is-alert" : "is-clean"}`}
                  >
                    {item.value.toLocaleString("vi-VN")} cần duyệt
                  </span>
                  <ChevronRight size={16} className="admin-review-arrow" />
                </div>
              </button>
            ))}
          </div>
        </section>

        {/* Retention Cohort Table */}
        <section className="admin-panel admin-retention-panel">
          <div className="admin-panel-heading">
            <div>
              <p className="admin-eyebrow">CHỈ SỐ GIỮ CHÂN</p>
              <h2>Retention Cohort theo ngày</h2>
            </div>
            <span className="admin-subtle-icon">
              <Clock3 size={18} />
            </span>
          </div>

          <div className="admin-retention-grid">
            {overview.analytics.retention.map((item) => (
              <article key={item.day} className="admin-retention-card">
                <span className="admin-retention-day">{item.day}</span>
                <strong className="admin-retention-rate">
                  {item.ratePercent === null ? "—" : `${item.ratePercent}%`}
                </strong>
                <small className="admin-retention-stats">
                  {item.retained}/{item.cohortSize} tài khoản
                </small>
              </article>
            ))}
          </div>
        </section>
      </div>

      {/* Premium Membership VIP Banner */}
      <button
        className="admin-membership-callout"
        type="button"
        onClick={() => onNavigate("membership-interests")}
      >
        <div className="admin-callout-content">
          <div className="admin-callout-icon-box">
            <UsersRound size={22} />
          </div>
          <div className="admin-callout-text">
            <strong>Danh sách quan tâm gói hội viên</strong>
            <small>
              Xem và xuất danh sách các liên hệ tiềm năng đăng ký nhận tin
            </small>
          </div>
        </div>
        <div className="admin-callout-stats">
          <b>{overview.membershipInterestCount.toLocaleString("vi-VN")}</b>
          <span>đăng ký</span>
          <ChevronRight size={18} />
        </div>
      </button>
    </div>
  );
}

function StatusBadge({
  label,
  variant,
}: {
  label: string;
  variant: "verified" | "pending" | "published" | "hidden";
}) {
  return (
    <span className={`admin-status-badge is-${variant}`}>
      <span className="admin-status-dot" />
      {label}
    </span>
  );
}

function CopyEmailButton({ email }: { email: string }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    void navigator.clipboard.writeText(email);
    setCopied(true);
    toast.success(`Đã sao chép email: ${email}`);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <button
      type="button"
      className="card-action-btn btn-copy"
      onClick={handleCopy}
      title="Sao chép địa chỉ email"
    >
      <Copy size={13} />
      <span>{copied ? "Đã chép" : "Sao chép"}</span>
    </button>
  );
}

function fortuneLevelClass(level: unknown) {
  const l = String(level || "").toLowerCase();
  if (l.includes("thượng") || l.includes("đại cát")) return "fortune-top";
  if (l.includes("hạ")) return "fortune-low";
  return "fortune-mid";
}

function RegionPill({ region }: { region?: unknown }) {
  const reg = String(region || "").toUpperCase();
  let label = "Toàn quốc";
  let colorClass = "region-nation";

  if (reg.includes("NORTH") || reg.includes("BẮC")) {
    label = "Miền Bắc";
    colorClass = "region-north";
  } else if (reg.includes("CENTRAL") || reg.includes("TRUNG")) {
    label = "Miền Trung";
    colorClass = "region-central";
  } else if (reg.includes("SOUTH") || reg.includes("NAM")) {
    label = "Miền Nam";
    colorClass = "region-south";
  }

  return <span className={`admin-region-pill ${colorClass}`}>{label}</span>;
}

function RecordList({
  section,
  rows,
  viewMode = "grid",
  onReview,
  onEdit,
}: {
  section: Section;
  rows: AdminRecord[];
  viewMode?: ViewMode;
  onReview: (record: AdminRecord, field: ReviewField) => void;
  onEdit: (id: string) => void;
}) {
  const canReview =
    section === "culture" ||
    section === "calendar" ||
    section === "xam" ||
    section === "rituals" ||
    section === "prayers";
  const canEdit =
    section === "culture" ||
    section === "calendar" ||
    section === "xam" ||
    section === "rituals" ||
    section === "prayers";
  const requiresExistingSource =
    section === "culture" || section === "calendar" || section === "xam";

  // RENDER DẠNG BẢNG DOANH NGHIỆP (TABLE VIEW)
  if (viewMode === "table") {
    // 1. Table View cho Đăng ký hội viên
    if (section === "membership-interests") {
      return (
        <div className="admin-table-wrapper">
          <table className="admin-data-table">
            <thead>
              <tr>
                <th>Email người dùng</th>
                <th>Phân loại</th>
                <th>Thời gian đăng ký</th>
                <th className="th-actions">Thao tác liên hệ</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.id}>
                  <td>
                    <div className="table-lead-email-cell">
                      <Mail size={15} className="table-lead-icon" />
                      <strong>{displayValue(row.email)}</strong>
                    </div>
                  </td>
                  <td>
                    <span className="card-vip-lead-badge">Đăng ký nhận cập nhật</span>
                  </td>
                  <td>
                    <span className="table-date-cell">
                      <Clock3 size={13} /> {dateValue(row.created_at)}
                    </span>
                  </td>
                  <td>
                    <div className="table-action-cell">
                      <CopyEmailButton email={String(row.email || "")} />
                      <a
                        href={`mailto:${row.email}`}
                        className="admin-mini-action-btn mail"
                        title="Gửi thư liên hệ"
                      >
                        <ExternalLink size={12} /> Gửi email
                      </a>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    }

    // 2. Table View cho Nhật ký kiểm duyệt
    if (section === "audit-logs") {
      return (
        <div className="admin-table-wrapper">
          <table className="admin-data-table">
            <thead>
              <tr>
                <th>Thời gian & Quản trị viên</th>
                <th>Hành động</th>
                <th>Mục tiêu</th>
                <th>Chi tiết cập nhật</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => {
                const actorName =
                  (row.users as { full_name?: string } | undefined)?.full_name ||
                  "Quản trị viên";
                return (
                  <tr key={row.id}>
                    <td>
                      <div className="table-title-cell">
                        <strong>{actorName}</strong>
                        <small className="table-date-cell">
                          <Clock3 size={12} /> {dateValue(row.created_at)}
                        </small>
                      </div>
                    </td>
                    <td>
                      <span className="card-audit-action-badge">
                        🛡️ {displayValue(row.action)}
                      </span>
                    </td>
                    <td>
                      <div className="table-cat-cell">
                        <span className="card-audit-target-badge">
                          {displayValue(row.target_type)}
                        </span>
                        <code className="table-id-code">
                          #{String(row.target_id).slice(0, 8)}
                        </code>
                      </div>
                    </td>
                    <td>
                      <pre className="table-audit-details-preview">
                        {displayValue(JSON.stringify(row.details, null, 2))}
                      </pre>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      );
    }

    // 3. Table View cho 5 Kho nội dung (Văn hóa, Lịch, Xăm, Nghi lễ, Văn khấn)
    return (
      <div className="admin-table-wrapper">
        <table className="admin-data-table">
          <thead>
            <tr>
              <th>Tiêu đề & Định danh</th>
              <th>Đặc thù & Vùng miền</th>
              <th>Nguồn tham chiếu</th>
              <th>Xác minh</th>
              <th>Hiển thị</th>
              <th className="th-actions">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => {
              const title = getRecordTitle(row, section);
              const source =
                typeof row.source === "string" &&
                row.source.startsWith("https://")
                  ? row.source
                  : null;
              const category = displayValue(
                row.category ??
                  row.xam_type ??
                  row.occasion ??
                  row.target_type ??
                  "Chung",
              );

              return (
                <tr key={row.id}>
                  <td>
                    <div className="table-title-cell">
                      <strong>{title}</strong>
                      {section === "calendar" && (
                        <small className="table-calendar-sub">
                          {row.calendar === "LUNAR" ? "🌙 Âm lịch" : "☀️ Dương lịch"} Ngày {displayValue(row.day)}/{displayValue(row.month)}
                        </small>
                      )}
                      {section === "xam" && (
                        <small className="table-xam-sub">
                          Thẻ #{displayValue(row.stick_number)} · Điềm: {displayValue(row.fortune_level)}
                        </small>
                      )}
                      {Boolean(row.slug) && (
                        <small className="table-slug">
                          /{displayValue(row.slug)}
                        </small>
                      )}
                    </div>
                  </td>
                  <td>
                    <div className="table-cat-cell">
                      <span className="table-cat-tag">{category}</span>
                      <RegionPill region={row.region} />
                    </div>
                  </td>
                  <td>
                    {source ? (
                      <a
                        className="table-source-link"
                        href={source}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <ExternalLink size={12} /> HTTPS Gốc
                      </a>
                    ) : (
                      <span className="table-source-missing">Chưa có</span>
                    )}
                  </td>
                  <td>
                    {row.verified !== undefined ? (
                      <StatusBadge
                        label={editorialStatusLabel(row)}
                        variant={row.verified ? "verified" : "pending"}
                      />
                    ) : (
                      "—"
                    )}
                  </td>
                  <td>
                    {row.active !== undefined ? (
                      <StatusBadge
                        label={row.active ? "Công khai" : "Đã ẩn"}
                        variant={row.active ? "published" : "hidden"}
                      />
                    ) : (
                      "—"
                    )}
                  </td>
                  <td>
                    <div className="table-action-cell">
                      {canEdit && (
                        <button
                          type="button"
                          className="admin-mini-action-btn edit"
                          onClick={() => onEdit(row.id)}
                          title="Biên tập"
                        >
                          <Edit3 size={13} /> Sửa
                        </button>
                      )}
                      {canReview && row.verified !== undefined && (
                        <button
                          type="button"
                          className={`admin-mini-action-btn ${row.verified ? "unverify" : "verify"}`}
                          disabled={
                            !row.verified && requiresExistingSource && !source
                          }
                          onClick={() => onReview(row, "verified")}
                          title={
                            !row.verified && requiresExistingSource && !source
                              ? "Cần URL nguồn HTTPS hợp lệ"
                              : row.verified
                                ? "Bỏ xác minh"
                                : "Xác minh nội dung"
                          }
                        >
                          <Check size={13} /> {row.verified ? "Bỏ" : "Duyệt"}
                        </button>
                      )}
                      {canReview && row.active !== undefined && (
                        <button
                          type="button"
                          className={`admin-mini-action-btn ${row.active ? "toggle-hide" : "toggle-show"}`}
                          disabled={!row.active && !row.verified}
                          onClick={() => onReview(row, "active")}
                          title={row.active ? "Ẩn bài" : row.verified ? "Công khai bài đã duyệt" : "Cần duyệt nội dung trước khi công khai"}
                        >
                          {row.active ? <EyeOff size={13} /> : <Eye size={13} />}
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }

  // RENDER DẠNG THẺ TẠP CHÍ DI SẢN (GRID VIEW)
  // 1. Grid View riêng cho Quan tâm hội viên (Leads)
  if (section === "membership-interests") {
    return (
      <div className="admin-record-grid">
        {rows.map((row) => (
          <article className="admin-record-magazine-card card-variant-lead" key={row.id}>
            <div className="card-top-bar">
              <div className="card-tags-group">
                <span className="card-vip-lead-badge">
                  Đăng ký nhận cập nhật hội viên
                </span>
              </div>
              <span className="card-lead-time">
                <Clock3 size={12} /> {dateValue(row.created_at)}
              </span>
            </div>

            <div className="card-body">
              <div className="card-lead-email-row">
                <Mail size={18} className="card-lead-icon" />
                <strong className="card-lead-email">{displayValue(row.email)}</strong>
              </div>
              <p className="card-lead-note">
                Người dùng đồng ý nhận cập nhật về kế hoạch hội viên. Chưa có thanh toán hoặc quyền lợi kích hoạt.
              </p>
            </div>

            <div className="card-footer-actions">
              <CopyEmailButton email={String(row.email || "")} />
              <a
                href={`mailto:${row.email}`}
                className="card-action-btn btn-mail"
                title="Gửi email trao đổi trực tiếp"
              >
                <ExternalLink size={13} /> Gửi thư liên hệ
              </a>
            </div>
          </article>
        ))}
      </div>
    );
  }

  // 2. Grid View riêng cho Nhật ký quản trị (Audit Logs)
  if (section === "audit-logs") {
    return (
      <div className="admin-record-grid">
        {rows.map((row) => {
          const actorName =
            (row.users as { full_name?: string } | undefined)?.full_name ||
            "Quản trị viên";
          return (
            <article className="admin-record-magazine-card card-variant-audit" key={row.id}>
              <div className="card-top-bar">
                <div className="card-tags-group">
                  <span className="card-audit-action-badge">
                    🛡️ {displayValue(row.action)}
                  </span>
                  <span className="card-audit-target-badge">
                    {displayValue(row.target_type)}
                  </span>
                </div>
                <span className="card-lead-time">
                  <Clock3 size={12} /> {dateValue(row.created_at)}
                </span>
              </div>

              <div className="card-body">
                <div className="card-audit-actor-row">
                  <span>Người thực hiện:</span>
                  <strong>{actorName}</strong>
                </div>
                <div className="card-audit-box">
                  <small>Mã mục tiêu: {displayValue(row.target_id)}</small>
                  <pre>{displayValue(JSON.stringify(row.details, null, 2))}</pre>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    );
  }

  // 3. Grid View cho 5 Kho nội dung (Văn hóa, Lịch, Xăm, Nghi lễ, Văn khấn)
  return (
    <div className="admin-record-grid">
      {rows.map((row) => {
        const title = getRecordTitle(row, section);
        const source =
          typeof row.source === "string" && row.source.startsWith("https://")
            ? row.source
            : null;
        const category = displayValue(
          row.category ??
            row.xam_type ??
            row.occasion ??
            row.target_type ??
            "Tư liệu",
        );

        return (
          <article
            className={`admin-record-magazine-card card-variant-${section}`}
            key={row.id}
          >
            <div className="card-top-bar">
              <div className="card-tags-group">
                {/* Lịch sự kiện: Date Pill */}
                {section === "calendar" && (
                  <span
                    className={`card-calendar-date-pill ${row.calendar === "LUNAR" ? "is-lunar" : "is-solar"}`}
                  >
                    {row.calendar === "LUNAR" ? "🌙 Âm lịch" : "☀️ Dương lịch"}: Ngày {displayValue(row.day)}/{displayValue(row.month)}
                  </span>
                )}

                {/* Danh mục xin xăm: Stick Number & Fortune Badge */}
                {section === "xam" && (
                  <>
                    <span className="card-xam-stick-badge">
                      🎋 Thẻ số {displayValue(row.stick_number)}
                    </span>
                    {Boolean(row.fortune_level) && (
                      <span
                        className={`card-fortune-pill ${fortuneLevelClass(row.fortune_level)}`}
                      >
                        ✨ {displayValue(row.fortune_level)}
                      </span>
                    )}
                  </>
                )}

                {/* Nghi lễ: Occasion Badge */}
                {section === "rituals" && (
                  <span className="card-ritual-occasion-badge">
                    🏮 Dịp: {displayValue(row.occasion || "Quanh năm")}
                  </span>
                )}

                {/* Văn khấn: Language Style & Ritual Tag */}
                {section === "prayers" && (
                  <>
                    <span className="card-prayer-style-badge">
                      📜 {displayValue(row.language_style || "Quốc ngữ chuẩn")}
                    </span>
                    {Boolean(row.ritual_id) && (
                      <span className="card-prayer-ritual-tag">
                        🏮 Gắn nghi lễ
                      </span>
                    )}
                  </>
                )}

                {/* Phân loại & Vùng miền chung */}
                {section !== "xam" && section !== "prayers" && (
                  <span className="card-cat-pill">{category}</span>
                )}
                <RegionPill region={row.region} />
              </div>

              <div className="card-status-group">
                {row.verified !== undefined && (
                  <StatusBadge
                    label={editorialStatusLabel(row)}
                    variant={row.verified ? "verified" : "pending"}
                  />
                )}
                {row.active !== undefined && (
                  <StatusBadge
                    label={row.active ? "Hiển thị" : "Đã ẩn"}
                    variant={row.active ? "published" : "hidden"}
                  />
                )}
              </div>
            </div>

            <div className="card-body">
              <h3 className="card-title">{title}</h3>

              {/* Lịch sự kiện: Description Snippet */}
              {section === "calendar" && Boolean(row.description) && (
                <p className="card-desc-snippet">{displayValue(row.description)}</p>
              )}

              {/* Xin xăm: Collection & Category */}
              {section === "xam" && (
                <p className="card-meta">
                  Bộ thẻ: <strong>{displayValue(row.xam_type || "Chung")}</strong> · Phân loại: {category}
                </p>
              )}

              {/* Kho văn hóa / Nghi lễ: Slug */}
              {(section === "culture" || section === "rituals") && Boolean(row.slug) && (
                <div className="card-slug">
                  <span>Đường dẫn:</span> <code>/{displayValue(row.slug)}</code>
                </div>
              )}

              <div className="card-source-bar">
                {source ? (
                  <a
                    className="card-source-link"
                    href={source}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <ExternalLink size={12} /> Nguồn HTTPS tham chiếu
                  </a>
                ) : (
                  requiresExistingSource && (
                    <span className="card-source-missing">
                      <AlertCircle size={12} /> Chưa có URL nguồn HTTPS
                    </span>
                  )
                )}
              </div>
            </div>

            <div className="card-footer-actions">
              {canEdit && (
                <button
                  type="button"
                  className="card-action-btn btn-edit"
                  onClick={() => onEdit(row.id)}
                  title="Biên tập nội dung"
                >
                  <Edit3 size={13} /> Biên tập
                </button>
              )}

              {canReview && row.verified !== undefined && (
                <button
                  type="button"
                  className={`card-action-btn ${row.verified ? "btn-unverify" : "btn-verify"}`}
                  disabled={!row.verified && requiresExistingSource && !source}
                  onClick={() => onReview(row, "verified")}
                  title={
                    !row.verified && requiresExistingSource && !source
                      ? "Cần có URL nguồn HTTPS hợp lệ trước khi xác minh"
                      : row.verified
                        ? "Bỏ trạng thái xác minh"
                        : "Xác minh nội dung đạt chuẩn"
                  }
                >
                  <Check size={13} />
                  {row.verified ? "Bỏ duyệt" : "Xác minh"}
                </button>
              )}

              {canReview && row.active !== undefined && (
                <button
                  type="button"
                  className={`card-action-btn ${row.active ? "btn-hide" : "btn-show"}`}
                  disabled={!row.active && !row.verified}
                  onClick={() => onReview(row, "active")}
                  title={row.active ? "Tạm ẩn nội dung này" : row.verified ? "Công khai nội dung đã duyệt" : "Cần duyệt nội dung trước khi công khai"}
                >
                  {row.active ? <EyeOff size={13} /> : <Eye size={13} />}
                  {row.active ? "Ẩn" : "Công khai"}
                </button>
              )}
            </div>
          </article>
        );
      })}
    </div>
  );
}
