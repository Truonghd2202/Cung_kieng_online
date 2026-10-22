import { useEffect, useState } from "react";
import {
  AlertCircle,
  ArrowRight,
  BookOpenText,
  CalendarDays,
  CheckCircle2,
  Clock,
  ExternalLink,
  FileCheck2,
  Flame,
  LibraryBig,
  RefreshCw,
  Sparkles,
  Zap,
} from "lucide-react";
import { loadAdminList, type AdminPage, type AdminRecord } from "../data/adminService";
import { apiRequest } from "../lib/api";
import type { AdminSection } from "./adminNavigation";

export type PendingReviewItem = {
  id: string;
  sectionId: AdminSection;
  sectionLabel: string;
  title: string;
  category?: string;
  source?: string | null;
  updated_at?: string;
  created_at?: string;
  author?: string;
};

type ReviewItem = {
  id: AdminSection;
  label: string;
  detail: string;
  icon: typeof BookOpenText;
  count: number;
};

type SignalReviewPage = { pagination: { total: number } };

const SOURCES = [
  { id: "culture", label: "Kho văn hóa", detail: "Bài viết, tư liệu và hồ sơ nguồn", icon: BookOpenText },
  { id: "calendar", label: "Lịch sự kiện", detail: "Ngày lễ, sự kiện âm lịch và dương lịch", icon: CalendarDays },
  { id: "xam", label: "Danh mục xin xăm", detail: "Thẻ xăm, lời thơ và phần diễn giải", icon: LibraryBig },
  { id: "rituals", label: "Nghi lễ", detail: "Hướng dẫn nghi lễ và xuất xứ", icon: BookOpenText },
  { id: "prayers", label: "Văn khấn", detail: "Văn bản, nguồn trích và quyền sử dụng", icon: FileCheck2 },
  { id: "signals", label: "Lời chiêm nghiệm", detail: "Nội dung check-in theo cảm xúc và ngữ cảnh", icon: Sparkles },
] as const;

function formatDate(dateStr?: string) {
  if (!dateStr) return "Gần đây";
  try {
    const d = new Date(dateStr);
    return new Intl.DateTimeFormat("vi-VN", {
      dateStyle: "short",
      timeStyle: "short",
    }).format(d);
  } catch {
    return dateStr;
  }
}

export function ReviewQueuePanel({
  onSelect,
  onReviewItem,
  onTotalChange,
}: {
  onSelect: (section: AdminSection) => void;
  onReviewItem?: (section: AdminSection, id: string) => void;
  onTotalChange?: (total: number) => void;
}) {
  const [items, setItems] = useState<ReviewItem[]>([]);
  const [pendingRecords, setPendingRecords] = useState<PendingReviewItem[]>([]);
  const [activeCategoryFilter, setActiveCategoryFilter] = useState<string>("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function loadCounts() {
    setLoading(true);
    setError("");
    try {
      const results = await Promise.all(
        SOURCES.map(async (source) => {
          if (source.id === "signals") {
            try {
              const res = await apiRequest<SignalReviewPage>("/admin/signals?page=1&status=IN_REVIEW");
              return { count: res.pagination?.total || 0, items: [] as PendingReviewItem[] };
            } catch {
              return { count: 0, items: [] as PendingReviewItem[] };
            }
          }
          try {
            const res = (await loadAdminList<AdminRecord>(
              source.id,
              1,
              "",
              "IN_REVIEW",
            )) as AdminPage<AdminRecord>;

            const mapped: PendingReviewItem[] = (res.items || []).map((rec) => {
              const title =
                (typeof rec.title === "string" && rec.title.trim()) ||
                (typeof rec.name === "string" && rec.name.trim()) ||
                (source.id === "xam" ? `Thẻ số ${rec.stick_number ?? "—"}` : "") ||
                `Mục #${String(rec.id).slice(0, 8)}`;

              const category =
                (typeof rec.category === "string" && rec.category.trim()) ||
                (typeof rec.occasion === "string" && rec.occasion.trim()) ||
                (typeof rec.target_type === "string" && rec.target_type.trim()) ||
                undefined;

              const sourceUrl =
                typeof rec.source === "string" && rec.source.startsWith("https://")
                  ? rec.source
                  : null;

              return {
                id: rec.id,
                sectionId: source.id,
                sectionLabel: source.label,
                title,
                category,
                source: sourceUrl,
                updated_at: typeof rec.updated_at === "string" ? rec.updated_at : undefined,
                created_at: typeof rec.created_at === "string" ? rec.created_at : undefined,
                author: typeof rec.author === "string" ? rec.author : undefined,
              };
            });

            return { count: res.pagination?.total || 0, items: mapped };
          } catch {
            return { count: 0, items: [] as PendingReviewItem[] };
          }
        }),
      );

      const updatedItems = SOURCES.map((source, index) => ({
        ...source,
        count: results[index].count,
      }));
      setItems(updatedItems);

      const allPending = results.flatMap((r) => r.items);
      setPendingRecords(allPending);

      const sumTotal = updatedItems.reduce((acc, curr) => acc + curr.count, 0);
      onTotalChange?.(sumTotal);
    } catch (loadError) {
      setError(
        loadError instanceof Error ? loadError.message : "Không tải được danh sách bài chờ duyệt.",
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void loadCounts();
  }, []);

  const total = items.reduce((sum, item) => sum + item.count, 0);

  const categoriesWithPending = items.filter((item) => item.count > 0);

  const displayedPending =
    activeCategoryFilter === "all"
      ? pendingRecords
      : pendingRecords.filter((r) => r.sectionId === activeCategoryFilter);

  const handleFastTrack = () => {
    if (pendingRecords.length > 0) {
      const first = pendingRecords[0];
      if (onReviewItem) {
        onReviewItem(first.sectionId, first.id);
      } else {
        onSelect(first.sectionId);
      }
    }
  };

  return (
    <section className="admin-review-queue" aria-label="Hàng chờ duyệt" aria-busy={loading}>
      {/* 1. Summary Card */}
      <div className="admin-review-queue-summary">
        <div>
          <span>Tổng nội dung chờ duyệt</span>
          <strong>
            {loading ? "—" : total.toLocaleString("vi-VN")}
            {!loading && (
              total > 0 ? (
                <span className="admin-queue-pill-urgent">
                  <Flame size={12} /> Cần xử lý
                </span>
              ) : (
                <span className="admin-queue-pill-ok">
                  <CheckCircle2 size={12} /> Hoàn tất
                </span>
              )
            )}
          </strong>
        </div>
        <p>
          Rà soát các bài gửi lên từ biên tập viên, đối chiếu nguồn tham khảo và xác nhận bản quyền nội dung trước khi phát hành.
        </p>
        <div>
          {total > 0 ? (
            <button
              type="button"
              className="admin-primary-button admin-queue-fasttrack-btn"
              onClick={handleFastTrack}
              disabled={loading || pendingRecords.length === 0}
            >
              <Zap size={15} /> Thẩm định ngay ({total})
            </button>
          ) : (
            <div className="admin-queue-all-done-pill">
              <CheckCircle2 size={16} /> Đã kiểm duyệt toàn bộ
            </div>
          )}
        </div>
      </div>

      {error && (
        <div className="admin-alert" role="alert">
          <span>{error}</span>
          <button type="button" onClick={() => void loadCounts()}>
            Thử lại
          </button>
        </div>
      )}

      {/* 2. Category Cards Grid */}
      {loading ? (
        <div className="admin-loading-card" role="status">
          <RefreshCw size={22} className="admin-spin-icon" />
          <p>Đang tổng hợp hàng chờ duyệt…</p>
        </div>
      ) : (
        <div className="admin-review-queue-grid">
          {items.map((item) => {
            const Icon = item.icon;
            const hasPending = item.count > 0;
            return (
              <button
                type="button"
                className={`admin-review-queue-card ${hasPending ? "has-pending" : "is-empty"}`}
                key={item.id}
                onClick={() => onSelect(item.id)}
              >
                <span className="admin-review-queue-icon">
                  <Icon size={19} />
                </span>
                <span className="admin-review-queue-copy">
                  <strong>{item.label}</strong>
                  <small>{item.detail}</small>
                </span>
                <span className={`admin-review-queue-count ${hasPending ? "has-items" : ""}`}>
                  {hasPending ? `${item.count} bài` : "0"}
                </span>
                <ArrowRight size={16} className="admin-review-queue-arrow" />
              </button>
            );
          })}
        </div>
      )}

      {/* 3. Direct Pending Items List */}
      {!loading && pendingRecords.length > 0 && (
        <div className="admin-review-pending-section">
          <div className="admin-review-pending-header">
            <div className="admin-review-pending-header-title">
              <FileCheck2 size={18} style={{ color: "var(--admin-gold)" }} />
              <h3>Danh sách bài chờ thẩm định trực tiếp</h3>
              <span className="admin-count-pill has-pending">
                {pendingRecords.length} mục
              </span>
            </div>

            {categoriesWithPending.length > 1 && (
              <div className="admin-review-pending-filters">
                <button
                  type="button"
                  className={`admin-review-filter-btn ${activeCategoryFilter === "all" ? "is-active" : ""}`}
                  onClick={() => setActiveCategoryFilter("all")}
                >
                  Tất cả ({pendingRecords.length})
                </button>
                {categoriesWithPending.map((cat) => (
                  <button
                    key={cat.id}
                    type="button"
                    className={`admin-review-filter-btn ${activeCategoryFilter === cat.id ? "is-active" : ""}`}
                    onClick={() => setActiveCategoryFilter(cat.id)}
                  >
                    {cat.label} ({cat.count})
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="admin-review-pending-list">
            {displayedPending.map((record) => (
              <div className="admin-review-pending-card" key={`${record.sectionId}-${record.id}`}>
                <div className="admin-review-pending-info">
                  <div className="admin-review-pending-top">
                    <span className="table-cat-tag">{record.sectionLabel}</span>
                    {record.category && (
                      <span className="table-cat-tag" style={{ opacity: 0.85 }}>
                        {record.category}
                      </span>
                    )}
                    {record.source ? (
                      <span className="admin-source-pill has-source">
                        <ExternalLink size={11} /> Có URL nguồn
                      </span>
                    ) : (
                      <span className="admin-source-pill no-source">
                        <AlertCircle size={11} /> Cần kiểm tra nguồn
                      </span>
                    )}
                  </div>
                  <h4 className="admin-review-pending-title">{record.title}</h4>
                  <div className="admin-review-pending-meta">
                    {record.author && <span>Tác giả: {record.author}</span>}
                    <span>
                      <Clock size={12} /> Cập nhật: {formatDate(record.updated_at || record.created_at)}
                    </span>
                    {record.source && (
                      <a
                        href={record.source}
                        target="_blank"
                        rel="noreferrer"
                        className="table-source-link"
                        style={{ fontSize: "12px" }}
                        onClick={(e) => e.stopPropagation()}
                      >
                        Mở liên kết nguồn
                      </a>
                    )}
                  </div>
                </div>

                <div className="admin-review-pending-actions">
                  <button
                    type="button"
                    className="admin-review-quick-btn"
                    onClick={() => {
                      if (onReviewItem) {
                        onReviewItem(record.sectionId, record.id);
                      } else {
                        onSelect(record.sectionId);
                      }
                    }}
                  >
                    <Zap size={14} /> Thẩm định ngay
                  </button>
                  <button
                    type="button"
                    className="admin-review-browse-btn"
                    title={`Mở danh mục ${record.sectionLabel}`}
                    onClick={() => onSelect(record.sectionId)}
                  >
                    <ArrowRight size={15} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 4. All Done Empty State */}
      {!loading && !error && total === 0 && (
        <div className="admin-review-queue-clear">
          <CheckCircle2 size={18} /> Hiện không có nội dung nào cần duyệt. Tất cả bài viết và tư liệu đã được thẩm định hoàn tất!
        </div>
      )}
    </section>
  );
}
