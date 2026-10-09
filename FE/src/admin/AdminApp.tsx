import { FormEvent, useCallback, useEffect, useState } from "react";
import {
  Activity, AlertCircle, ArrowDownRight, ArrowUpRight, BookOpenText, CalendarDays,
  Check, ChevronLeft, ChevronRight, CircleHelp, Clock3, FileCheck2, LayoutDashboard,
  LibraryBig, LogOut, Menu, Search, ShieldCheck, UsersRound, X,
} from "lucide-react";
import { ApiError } from "../lib/api";
import { loginAccount, logoutAccount, restoreSession } from "../data/authService";
import {
  loadAdminList, loadAdminOverview, reviewAdminRecord,
  type AdminOverview, type AdminPage, type AdminRecord,
} from "../data/adminService";
import "./admin.css";

type Section = "overview" | "culture" | "calendar" | "xam" | "rituals" | "prayers" | "membership-interests" | "audit-logs";
import { ContentEditor } from "./ContentEditor";
type ReviewField = "verified" | "active";

const NAV: Array<{ id: Section; label: string; icon: typeof LayoutDashboard; group: string }> = [
  { id: "overview", label: "Tổng quan", icon: LayoutDashboard, group: "VẬN HÀNH" },
  { id: "culture", label: "Kho văn hóa", icon: BookOpenText, group: "NỘI DUNG" },
  { id: "calendar", label: "Lịch sự kiện", icon: CalendarDays, group: "NỘI DUNG" },
  { id: "xam", label: "Danh mục xin xăm", icon: LibraryBig, group: "NỘI DUNG" },
  { id: "rituals", label: "Nghi lễ", icon: BookOpenText, group: "NỘI DUNG" },
  { id: "prayers", label: "Văn khấn", icon: FileCheck2, group: "NỘI DUNG" },
  { id: "membership-interests", label: "Quan tâm hội viên", icon: UsersRound, group: "TĂNG TRƯỞNG" },
  { id: "audit-logs", label: "Nhật ký quản trị", icon: FileCheck2, group: "HỆ THỐNG" },
];

const TITLES: Record<Section, { title: string; description: string }> = {
  overview: { title: "Tổng quan vận hành", description: "Theo dõi sức khỏe sản phẩm và các mục cần rà soát." },
  culture: { title: "Kho văn hóa", description: "Rà soát nguồn và trạng thái xác minh của tư liệu văn hóa." },
  calendar: { title: "Lịch sự kiện", description: "Kiểm tra ngày, loại lịch và nguồn của từng sự kiện." },
  xam: { title: "Danh mục xin xăm", description: "Quản lý danh mục tham khảo và trạng thái thẩm định diễn giải." },
  rituals: { title: "Nghi lễ", description: "Rà soát nguồn, vùng miền và trạng thái xuất bản của hướng dẫn nghi lễ." },
  prayers: { title: "Văn khấn", description: "Chỉ xác minh sau khi ghi locator, đối chiếu nội dung và xác nhận quyền sử dụng." },
  "membership-interests": { title: "Quan tâm hội viên", description: "Danh sách email đã tự nguyện đăng ký nhận thông tin gói hội viên." },
  "audit-logs": { title: "Nhật ký quản trị", description: "Lịch sử thay đổi trạng thái nội dung do admin thực hiện." },
};

function readableError(error: unknown) {
  if (error instanceof ApiError) {
    if (error.status === 403) return "Tài khoản đã đăng nhập nhưng chưa được cấp quyền ADMIN.";
    if (error.status === 401) return "Phiên đăng nhập hết hạn. Vui lòng đăng nhập lại.";
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
  return Number.isNaN(date.getTime()) ? String(value) : new Intl.DateTimeFormat("vi-VN", { dateStyle: "medium", timeStyle: "short" }).format(date);
}

export default function AdminApp() {
  const [section, setSection] = useState<Section>("overview");
  const [adminName, setAdminName] = useState("");
  const [booting, setBooting] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [forbidden, setForbidden] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState("");
  const [isSigningIn, setIsSigningIn] = useState(false);
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
  const [usageRights, setUsageRights] = useState<"confirmed" | "public-domain" | "permission-required" | "unknown">("unknown");
  const [editing, setEditing] = useState<{ kind: "culture" | "calendar" | "xam"; id?: string } | null>(null);
  const [savingReview, setSavingReview] = useState(false);

  const fetchSection = useCallback(async (target: Section, nextPage = 1, query = "") => {
    setLoading(true);
    setError("");
    try {
      if (target === "overview") {
        setOverview(await loadAdminOverview());
        setPageData(null);
        setRows([]);
      } else {
        const data = await loadAdminList<AdminRecord>(target, nextPage, query);
        setPageData(data);
        setRows(data.items);
      }
    } catch (loadError) {
      const message = readableError(loadError);
      setError(message);
      if (loadError instanceof ApiError && loadError.status === 403) setForbidden(true);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    let mounted = true;
    void restoreSession().then(async (user) => {
      if (!mounted) return;
      if (!user) {
        setBooting(false);
        return;
      }
      setAdminName(user.name);
      setIsAuthenticated(true);
      await fetchSection("overview");
      if (mounted) setBooting(false);
    });
    return () => { mounted = false; };
  }, [fetchSection]);

  const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setAuthError("");
    setIsSigningIn(true);
    const result = await loginAccount(email, password);
    if (!result.success) {
      setAuthError(result.error || "Đăng nhập thất bại.");
      setIsSigningIn(false);
      return;
    }
    setAdminName(result.user.name);
    setIsAuthenticated(true);
    await fetchSection("overview");
    setPassword("");
    setIsSigningIn(false);
  };

  const navigate = (target: Section) => {
    setSection(target);
    setPage(1);
    setSearch("");
    setSearchDraft("");
    setReviewRecord(null);
    setMobileNavOpen(false);
    void fetchSection(target, 1, "");
  };

  const handleSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const next = searchDraft.trim();
    setSearch(next);
    setPage(1);
    if (section !== "overview") void fetchSection(section, 1, next);
  };

  const changePage = (nextPage: number) => {
    setPage(nextPage);
    void fetchSection(section, nextPage, search);
  };

  const beginReview = (record: AdminRecord, field: ReviewField) => {
    setReviewRecord(record);
    setReviewField(field);
    setReviewValue(!Boolean(record[field]));
    setReviewNote("");
    setRightsConfirmed(false);
    setSourceUrl(typeof record.source === "string" ? record.source : "");
    setSourceLocator("");
    setUsageRights("unknown");
  };

  const saveReview = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!reviewRecord || !reviewField || section === "overview" || section === "membership-interests" || section === "audit-logs") return;
    setSavingReview(true);
    setError("");
    try {
      const needsRights = (section === "xam" || section === "rituals" || section === "prayers") && reviewField === "verified" && reviewValue;
      await reviewAdminRecord(section, reviewRecord.id, { [reviewField]: reviewValue, reviewNote, ...(needsRights ? { rightsConfirmed, ...(section === "rituals" || section === "prayers" ? { source: sourceUrl.trim() } : {}), sourceLocator, usageRights } : {}) });
      setReviewRecord(null);
      await fetchSection(section, page, search);
    } catch (saveError) {
      setError(readableError(saveError));
    } finally {
      setSavingReview(false);
    }
  };

  const handleLogout = async () => {
    await logoutAccount();
    setIsAuthenticated(false);
    setForbidden(false);
    setOverview(null);
    setRows([]);
  };

  if (booting) return <div className="admin-loading" role="status">Đang kiểm tra phiên quản trị…</div>;

  if (!isAuthenticated) {
    return (
      <main className="admin-login-page">
        <section className="admin-login-card" aria-labelledby="admin-login-title">
          <div className="admin-brand-mark"><ShieldCheck size={22} aria-hidden="true" /></div>
          <p className="admin-eyebrow">TIN LÀM TÂM LINH · BACK OFFICE</p>
          <h1 id="admin-login-title">Đăng nhập quản trị</h1>
          <p className="admin-muted">Dùng tài khoản được cấp quyền ADMIN. Quyền được xác thực lại từ máy chủ.</p>
          <form onSubmit={handleLogin} className="admin-login-form">
            <label htmlFor="admin-email">Email</label>
            <input id="admin-email" type="email" autoComplete="username" required value={email} onChange={(event) => setEmail(event.target.value)} />
            <label htmlFor="admin-password">Mật khẩu</label>
            <input id="admin-password" type="password" autoComplete="current-password" required value={password} onChange={(event) => setPassword(event.target.value)} />
            {authError && <p className="admin-error" role="alert"><AlertCircle size={16} />{authError}</p>}
            <button className="admin-primary-button" type="submit" disabled={isSigningIn}>{isSigningIn ? "Đang xác thực…" : "Đăng nhập"}</button>
          </form>
          <a className="admin-back-link" href="/">Quay về ứng dụng</a>
        </section>
      </main>
    );
  }

  const current = TITLES[section];
  const hasSearch = section !== "overview" && section !== "audit-logs";

  return (
    <div className="admin-shell">
      {mobileNavOpen && <button className="admin-nav-scrim" type="button" aria-label="Đóng menu điều hướng" onClick={() => setMobileNavOpen(false)} />}
      <aside className={`admin-sidebar ${mobileNavOpen ? "is-open" : ""}`} aria-label="Điều hướng quản trị">
        <a href="/admin" className="admin-brand" aria-label="Tin Làm Tâm Linh Admin">
          <span className="admin-brand-mark"><ShieldCheck size={20} aria-hidden="true" /></span>
          <span><strong>Tin Làm</strong><small>ADMIN PORTAL</small></span>
        </a>
        <nav className="admin-nav">
          {NAV.map((item, index) => {
            const Icon = item.icon;
            const previous = NAV[index - 1];
            return <div key={item.id}>
              {item.group !== previous?.group && <p className="admin-nav-group">{item.group}</p>}
              <button type="button" onClick={() => navigate(item.id)} className={`admin-nav-item ${section === item.id ? "is-active" : ""}`} aria-current={section === item.id ? "page" : undefined}>
                <Icon size={18} aria-hidden="true" /><span>{item.label}</span>
                {section === item.id && <span className="admin-nav-indicator" aria-hidden="true" />}
              </button>
            </div>;
          })}
        </nav>
        <div className="admin-sidebar-bottom">
          <div className="admin-session"><span className="admin-avatar">{adminName.slice(0, 1).toUpperCase() || "A"}</span><span><strong>{adminName || "Quản trị viên"}</strong><small>Quyền ADMIN</small></span></div>
          <button className="admin-logout" type="button" onClick={() => void handleLogout()}><LogOut size={17} />Đăng xuất</button>
          <a href="/" className="admin-back-link">Trở về ứng dụng</a>
        </div>
      </aside>

      <main className="admin-main">
        <header className="admin-topbar">
          <button className="admin-mobile-menu" type="button" aria-label="Mở menu điều hướng" onClick={() => setMobileNavOpen(true)}><Menu size={21} /></button>
          <div className="admin-breadcrumb"><span>Quản trị</span><ChevronRight size={15} /><strong>{current.title}</strong></div>
          <span className="admin-secure"><ShieldCheck size={15} />Khu vực bảo mật</span>
        </header>

        <div className="admin-content">
          <div className="admin-page-heading">
            <div><p className="admin-eyebrow">BẢNG ĐIỀU KHIỂN</p><h1>{current.title}</h1><p className="admin-muted">{current.description}</p></div>
            {hasSearch && <form className="admin-search" onSubmit={handleSearch} role="search"><Search size={17} /><input aria-label="Tìm kiếm nội dung" placeholder="Tìm theo tên, từ khóa…" value={searchDraft} onChange={(event) => setSearchDraft(event.target.value)} /><button type="submit">Tìm</button></form>}
          </div>

          {error && <div className="admin-alert" role="alert"><AlertCircle size={18} /><span>{error}</span><button type="button" aria-label="Đóng thông báo" onClick={() => setError("")}><X size={17} /></button></div>}

          {section === "overview" && <OverviewPanel overview={overview} loading={loading} onNavigate={navigate} />}
          {(section === "culture" || section === "calendar" || section === "xam") && <button className="admin-primary-button" type="button" onClick={() => setEditing({ kind: section })}>+ Tạo bản thảo</button>}
          {editing && <ContentEditor key={`${editing.kind}:${editing.id || "new"}`} {...editing} onClose={() => setEditing(null)} onSaved={() => { setEditing(null); void fetchSection(section, page, search); }} />}
          {section !== "overview" && <section aria-label={current.title} aria-busy={loading}>
            {loading && <div className="admin-loading-inline" role="status">Đang tải dữ liệu…</div>}
            {!loading && rows.length === 0 && !error && <div className="admin-empty"><CircleHelp size={24} /><strong>Chưa có dữ liệu phù hợp</strong><span>Thử đổi từ khóa hoặc quay lại sau.</span></div>}
            {!loading && rows.length > 0 && <RecordList section={section} rows={rows} onReview={beginReview} onEdit={(id) => { if (section === "culture" || section === "calendar" || section === "xam") setEditing({ kind: section, id }); }} />}
            {reviewRecord && reviewField && <form className="admin-review-panel" onSubmit={(event) => void saveReview(event)}>
<div><strong>{reviewField === "verified" ? "Cập nhật trạng thái xác minh" : "Cập nhật trạng thái hiển thị"}</strong><p className="admin-muted">Ghi lý do để lưu vào nhật ký quản trị. Với quẻ xăm, cần đủ bốn dòng thơ và luận giải; người duyệt phải kiểm tra nội dung, nguồn và quyền sử dụng trước khi xác minh.</p></div>
              {(section === "xam" || section === "rituals" || section === "prayers") && reviewField === "verified" && reviewValue && <>
                {(section === "rituals" || section === "prayers") && <>
                   <label htmlFor="admin-source-url">URL nguồn HTTPS <span aria-hidden="true">*</span></label>
                   <input id="admin-source-url" type="url" required value={sourceUrl} onChange={(event) => setSourceUrl(event.target.value)} placeholder="https://…" />
                  <label htmlFor="admin-source-locator">Vị trí trích dẫn / locator <span aria-hidden="true">*</span></label>
                  <input id="admin-source-locator" required minLength={2} maxLength={500} value={sourceLocator} onChange={(event) => setSourceLocator(event.target.value)} placeholder="Trang, mục, số hiệu văn bản hoặc mốc thời gian" />
                  <label htmlFor="admin-usage-rights">Căn cứ quyền sử dụng <span aria-hidden="true">*</span></label>
                  <select id="admin-usage-rights" value={usageRights} onChange={(event) => setUsageRights(event.target.value as typeof usageRights)}>
                    <option value="unknown">Chưa xác minh</option><option value="confirmed">Đã có xác nhận quyền</option><option value="public-domain">Đã xác minh thuộc phạm vi công cộng</option><option value="permission-required">Cần xin phép</option>
                  </select>
                </>}
                <label className="admin-review-rights"><input type="checkbox" checked={rightsConfirmed} onChange={(event) => setRightsConfirmed(event.target.checked)} /> Tôi đã kiểm tra nguồn và có căn cứ để xuất bản.</label>
              </>}
              <label htmlFor="admin-review-note">Ghi chú rà soát <span aria-hidden="true">*</span></label>
              <textarea id="admin-review-note" required minLength={8} maxLength={500} rows={3} value={reviewNote} onChange={(event) => setReviewNote(event.target.value)} placeholder="Nêu nguồn đã đối chiếu và kết quả rà soát…" />
              <div className="admin-review-actions"><button className="admin-secondary-button" type="button" onClick={() => setReviewRecord(null)}>Hủy</button><button className="admin-primary-button" type="submit" disabled={savingReview || reviewNote.trim().length < 8 || (((section === "xam" || section === "rituals" || section === "prayers") && reviewField === "verified" && reviewValue) && (!rightsConfirmed || ((section === "rituals" || section === "prayers") && (!/^https:\/\//i.test(sourceUrl.trim()) || sourceLocator.trim().length < 2 || !["confirmed", "public-domain"].includes(usageRights)))))}>{savingReview ? "Đang lưu…" : "Lưu thay đổi"}</button></div>
            </form>}
            {pageData && pageData.pagination.pageCount > 1 && <div className="admin-pagination"><span>{pageData.pagination.total.toLocaleString("vi-VN")} bản ghi · Trang {page} / {pageData.pagination.pageCount}</span><div><button type="button" aria-label="Trang trước" disabled={page <= 1 || loading} onClick={() => changePage(page - 1)}><ChevronLeft size={18} /></button><button type="button" aria-label="Trang sau" disabled={page >= pageData.pagination.pageCount || loading} onClick={() => changePage(page + 1)}><ChevronRight size={18} /></button></div></div>}
          </section>}
          <footer className="admin-footer">Dữ liệu quản trị được tải từ API có kiểm tra quyền ADMIN.</footer>
        </div>
      </main>
      {forbidden && <div className="admin-forbidden" role="alertdialog" aria-labelledby="admin-forbidden-title"><div><ShieldCheck size={28} /><h2 id="admin-forbidden-title">Tài khoản chưa có quyền quản trị</h2><p>API đã từ chối quyền truy cập. Hãy liên hệ người quản lý hệ thống để được cấp role ADMIN.</p><div><button className="admin-secondary-button" type="button" onClick={() => setForbidden(false)}>Đóng</button><button className="admin-primary-button" type="button" onClick={() => void handleLogout()}>Đăng xuất</button></div></div></div>}
    </div>
  );
}

function OverviewPanel({ overview, loading, onNavigate }: { overview: AdminOverview | null; loading: boolean; onNavigate: (section: Section) => void }) {
  if (loading && !overview) return <div className="admin-loading-inline" role="status">Đang tổng hợp chỉ số…</div>;
  if (!overview) return <div className="admin-empty"><CircleHelp size={24} /><strong>Chưa tải được số liệu</strong><span>Kiểm tra kết nối API rồi thử tải lại.</span></div>;
  const metricCards = [
    { label: "Người dùng hoạt động hôm nay", value: overview.analytics.dau, note: "DAU · người đã đồng ý analytics", icon: Activity },
    { label: "Lượt hoạt động tháng này", value: overview.analytics.mau, note: "MAU · visitor ID ngẫu nhiên, đã đồng ý", icon: UsersRound },
    { label: "Kích hoạt trong 24 giờ", value: overview.analytics.activationRate30d === null ? "—" : `${overview.analytics.activationRate30d}%`, note: "Trong nhóm đồng ý analytics từ lúc đăng ký", icon: ArrowUpRight },
    { label: "Subscription đang hoạt động", value: overview.analytics.activeSubscriptions, note: "Không đồng nghĩa doanh thu đã đối soát", icon: ArrowDownRight },
  ];
  const reviewItems = [
    { label: "Bài văn hóa cần rà soát", value: overview.content.articlesAwaitingReview, total: overview.content.activeArticles, target: "culture" as const },
    { label: "Sự kiện lịch cần rà soát", value: overview.content.calendarEventsAwaitingReview, total: overview.content.activeCalendarEvents, target: "calendar" as const },
    { label: "Thẻ xin xăm cần rà soát", value: overview.content.xamLotsAwaitingReview, total: overview.content.activeXamLots, target: "xam" as const },
    { label: "Nghi lễ cần rà soát", value: overview.content.ritualsAwaitingReview, total: overview.content.activeRituals, target: "rituals" as const },
    { label: "Văn khấn cần rà soát", value: overview.content.prayersAwaitingReview, total: overview.content.activePrayers, target: "prayers" as const },
  ];

  return <div className="admin-overview">
    <div className="admin-metric-grid">{metricCards.map((metric) => { const Icon = metric.icon; return <article className="admin-metric-card" key={metric.label}><div className="admin-metric-icon"><Icon size={18} /></div><p>{metric.label}</p><strong>{typeof metric.value === "number" ? metric.value.toLocaleString("vi-VN") : metric.value}</strong><span>{metric.note}</span></article>; })}</div>
    <div className="admin-overview-grid">
      <section className="admin-panel"><div className="admin-panel-heading"><div><p className="admin-eyebrow">KIỂM SOÁT CHẤT LƯỢNG</p><h2>Hàng chờ rà soát</h2></div><span className="admin-count-pill">{reviewItems.reduce((sum, item) => sum + item.value, 0)}</span></div>
        {reviewItems.map((item) => <button className="admin-review-row" key={item.target} type="button" onClick={() => onNavigate(item.target)}><span className="admin-review-row-icon"><FileCheck2 size={17} /></span><span className="admin-review-row-copy"><strong>{item.label}</strong><small>{item.total.toLocaleString("vi-VN")} mục đang hoạt động</small></span><b>{item.value.toLocaleString("vi-VN")}</b><ChevronRight size={17} /></button>)}
      </section>
      <section className="admin-panel"><div className="admin-panel-heading"><div><p className="admin-eyebrow">TĂNG TRƯỞNG</p><h2>Nguồn đăng ký 30 ngày</h2></div><span className="admin-subtle-icon"><Activity size={18} /></span></div>
        {overview.analytics.acquisition.length ? overview.analytics.acquisition.map((item) => { const max = Math.max(...overview.analytics.acquisition.map((entry) => entry.signups), 1); return <div className="admin-source-row" key={item.source}><div><span>{item.source.replaceAll("_", " ")}</span><strong>{item.signups.toLocaleString("vi-VN")}</strong></div><div className="admin-progress-track"><span style={{ width: `${Math.max(4, item.signups / max * 100)}%` }} /></div></div>; }) : <p className="admin-empty-inline">Chưa có lượt đăng ký được ghi nhận sau khi người dùng đồng ý analytics.</p>}
        <p className="admin-caveat"><Clock3 size={14} /> Chỉ tính lượt đăng ký có telemetry đồng ý; không đại diện tổng người dùng.</p>
      </section>
    </div>
    <section className="admin-panel"><div className="admin-panel-heading"><div><p className="admin-eyebrow">GIỮ CHÂN</p><h2>Retention theo cohort ngày</h2></div><span className="admin-subtle-icon"><Clock3 size={18} /></span></div>
      <p className="admin-caveat">Chỉ đo nhóm có sự kiện đăng ký sau khi đồng ý analytics; không đại diện toàn bộ người dùng.</p>
      <div className="admin-retention-grid">{overview.analytics.retention.map((item) => <article key={item.day}><span>{item.day}</span><strong>{item.ratePercent === null ? "—" : `${item.ratePercent}%`}</strong><small>{item.retained}/{item.cohortSize} tài khoản hoạt động đúng ngày</small></article>)}</div>
      <p className="admin-caveat"><CircleHelp size={14} /> Referral K-factor, tỷ lệ trả phí và LTV/CAC chưa được tính khi chưa có attribution/giao dịch/chi phí đáng tin cậy.</p>
    </section>
    <button className="admin-membership-callout" type="button" onClick={() => onNavigate("membership-interests")}><span><UsersRound size={19} /><strong>Quan tâm gói hội viên</strong></span><b>{overview.membershipInterestCount.toLocaleString("vi-VN")}</b><ChevronRight size={17} /></button>
  </div>;
}

function StatusBadge({ label, active }: { label: string; active: boolean }) {
  return <span className={`admin-status ${active ? "is-good" : "is-muted"}`}><span />{label}</span>;
}

function RecordList({ section, rows, onReview, onEdit }: { section: Section; rows: AdminRecord[]; onReview: (record: AdminRecord, field: ReviewField) => void; onEdit: (id: string) => void }) {
  return <div className="admin-record-list">{rows.map((row) => {
    const title = displayValue(row.title ?? row.name ?? row.email ?? row.action ?? row.id);
    const source = typeof row.source === "string" && row.source.startsWith("https://") ? row.source : null;
    const secondary = section === "culture" ? `${displayValue(row.category)} · ${displayValue(row.region)}`
      : section === "calendar" ? `${displayValue(row.calendar)} · ${displayValue(row.day)}/${displayValue(row.month)} · ${displayValue(row.region)}`
        : section === "xam" ? `${displayValue(row.xam_type)} · Số ${displayValue(row.stick_number)} · ${displayValue(row.fortune_level)}`
          : section === "rituals" ? `${displayValue(row.occasion)} · ${displayValue(row.region)}`
            : section === "prayers" ? `${displayValue(row.language_style)} · ${displayValue(row.region)} · ${displayValue(row.ritual_id)}`
              : section === "membership-interests" ? `Đăng ký ${dateValue(row.created_at)}`
            : `${displayValue(row.target_type)} · ${dateValue(row.created_at)} · ${displayValue((row.users as { full_name?: string } | undefined)?.full_name)}`;
    const canReview = section === "culture" || section === "calendar" || section === "xam" || section === "rituals" || section === "prayers";
    const canEdit = section === "culture" || section === "calendar" || section === "xam";
    const requiresExistingSource = section === "culture" || section === "calendar" || section === "xam";
    return <article className="admin-record-card" key={row.id}>
      {canEdit && <button type="button" className="admin-mini-button" onClick={() => onEdit(row.id)}>Biên tập</button>}
      <div className="admin-record-main"><div className="admin-record-title-row"><h2>{title}</h2>{row.verified !== undefined && <StatusBadge label={row.verified ? "Đã xác minh" : "Chưa xác minh"} active={Boolean(row.verified)} />}</div><p>{secondary}</p>{section === "culture" && <small className="admin-record-slug">/{displayValue(row.slug)}</small>}{section === "culture" && row.verified === true && <small className="admin-record-slug">Trạng thái nguồn không đồng nghĩa toàn bộ bài viết đã được thẩm định học thuật.</small>}{section === "audit-logs" && <small className="admin-record-slug">Mã mục tiêu: {displayValue(row.target_id)} · {displayValue(JSON.stringify(row.details))}</small>}{source ? <a className="admin-source-link" href={source} target="_blank" rel="noreferrer">Mở nguồn tham chiếu <ArrowUpRight size={14} /></a> : (section === "culture" || section === "calendar" || section === "xam") && <span className="admin-source-missing">Chưa có liên kết nguồn</span>}</div>
      <div className="admin-record-side">{row.active !== undefined && <StatusBadge label={row.active ? "Đang hiển thị" : "Đã ẩn"} active={Boolean(row.active)} />}{canReview && <div className="admin-record-actions">{row.verified !== undefined && <button type="button" className="admin-mini-button" disabled={!row.verified && requiresExistingSource && !source} onClick={() => onReview(row, "verified")} title={!row.verified && requiresExistingSource && !source ? "Cần bổ sung nguồn HTTPS trước khi xác minh" : undefined}><Check size={15} />{row.verified ? "Bỏ xác minh" : "Xác minh"}</button>}{row.active !== undefined && <button type="button" className="admin-mini-button" onClick={() => onReview(row, "active")}><X size={15} />{row.active ? "Ẩn mục" : "Hiện lại"}</button>}</div>}</div>
    </article>;
  })}</div>;
}
