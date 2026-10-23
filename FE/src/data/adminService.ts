import { apiRequest } from "../lib/api";
import { isDemoMode } from "./demoMode";
import { readDemoValue, writeDemoValue } from "./demoStorage";
import { HERITAGE_SITES } from "./heritageSites";

export interface AdminPage<T> {
  items: T[];
  pagination: { page: number; pageSize: number; total: number; pageCount: number };
  stats?: {
    total: number;
    statuses: Record<"DRAFT" | "IN_REVIEW" | "APPROVED" | "PUBLISHED" | "HIDDEN" | "REVOKED", number>;
    missingSource: number;
    withSource: number;
    regions: Record<string, number>;
  };
}

export interface AdminOverview {
  analytics: {
    dau: number;
    mau: number;
    acquisition: Array<{ source: string; signups: number }>;
    activationRate30d: number | null;
    retention: Array<{ day: string; cohortSize: number; retained: number; ratePercent: number | null }>;
    activeSubscriptions: number;
    unavailableMetrics: string[];
    trends?: Array<{ date: string; label: string; value: number; secondary: number }>;
    sparklines?: {
      dau: number[];
      engagements: number[];
    };
  };
  content: {
    activeArticles: number;
    articlesAwaitingReview: number;
    activeCalendarEvents: number;
    calendarEventsAwaitingReview: number;
    activeXamLots: number;
    xamLotsAwaitingReview: number;
    activeRituals: number;
    ritualsAwaitingReview: number;
    activePrayers: number;
    prayersAwaitingReview: number;
  };
  membershipInterestCount: number;
}

export interface AdminRecord extends Record<string, unknown> {
  id: string;
  verified?: boolean;
  active?: boolean;
  editorial_status?: "DRAFT" | "IN_REVIEW" | "APPROVED" | "PUBLISHED" | "HIDDEN" | "REVOKED";
  updated_at?: string;
  source?: string | null;
}

const DEMO_ADMIN_KEY = "admin-records";
type DemoAdminStore = Record<string, AdminRecord[]>;

function seedDemoAdminRecords(): DemoAdminStore {
  const now = new Date().toISOString();
  const heritage = HERITAGE_SITES.slice(0, 18).map((site, index): AdminRecord => ({
    id: `demo-heritage-${site.id}`,
    title: site.name,
    name: site.name,
    region: site.region.includes("Bắc") ? "NORTH" : site.region.includes("Trung") ? "CENTRAL" : "SOUTH",
    province: site.province_legacy,
    category: site.category,
    summary: site.spiritual_relevance,
    spiritual_relevance: site.spiritual_relevance,
    source: site.source_url,
    source_name: site.source_name,
    source_row_number: site.source_row_number,
    source_locator: `Dữ liệu di sản · dòng ${site.source_row_number}`,
    verification: site.verification,
    editorial_status: index % 3 === 0 ? "IN_REVIEW" : index % 3 === 1 ? "PUBLISHED" : "DRAFT",
    verified: index % 3 === 1,
    active: index % 3 === 1,
    submitted_by: index % 2 ? "Nguyễn Minh Anh" : "Trần Thu Hà",
    created_at: now,
    updated_at: now,
    sections: [{ title: "Câu chuyện di sản", body: `${site.spiritual_relevance}. Nội dung mẫu được dùng để trải nghiệm giao diện quản trị trong chế độ demo.` }],
  }));
  const make = (section: string, title: string, category: string, index: number): AdminRecord => ({
    id: `demo-${section}-${index + 1}`,
    title,
    name: title,
    category,
    region: ["NORTH", "CENTRAL", "SOUTH"][index % 3],
    summary: `Nội dung mẫu ${title.toLowerCase()} dành cho bản demo quản trị.`,
    description: `Nội dung mẫu ${title.toLowerCase()} dành cho bản demo quản trị.`,
    source: "https://example.org/demo-source",
    source_name: "Nguồn minh họa trong demo",
    source_locator: "Hồ sơ mẫu",
    editorial_status: index === 0 ? "IN_REVIEW" : index === 1 ? "PUBLISHED" : "DRAFT",
    verified: index === 1,
    active: index === 1,
    submitted_by: "Tài khoản biên tập demo",
    created_at: now,
    updated_at: now,
    content: { sections: [{ title: "Nội dung", body: `Đây là dữ liệu giả lập để xem trước màn ${section} trong admin.` }] },
    sections: [{ title: "Nội dung", body: `Đây là dữ liệu giả lập để xem trước màn ${section} trong admin.` }],
  });
  return {
    culture: heritage,
    calendar: [make("calendar", "Ngày hội văn hóa địa phương", "Lễ hội", 0), make("calendar", "Ngày tri ân gia đình", "Cộng đồng", 1)],
    xam: [make("xam", "Lời khuyên về sự bình tâm", "Bình an", 0), make("xam", "Lời khuyên về học tập", "Học tập", 1)],
    rituals: [make("rituals", "Nghi thức dâng hương gia tiên", "Gia đình", 0), make("rituals", "Nghi thức ngày lễ", "Lễ nghi", 1)],
    prayers: [make("prayers", "Lời nguyện bình an", "Bình an", 0), make("prayers", "Lời nguyện tri ân", "Tri ân", 1)],
    signals: [make("signals", "Chậm lại để lắng nghe", "An yên", 0)],
    "audit-logs": [make("audit", "Cập nhật nội dung di sản", "Nội dung", 0), make("audit", "Duyệt lịch văn hóa", "Kiểm duyệt", 1), make("audit", "Ẩn bài viết trùng lặp", "Trạng thái nội dung", 2)],
    "membership-interests": [make("membership", "Nguyễn Minh Anh", "Quan tâm gói An Nhiên", 0), make("membership", "Trần Thu Hà", "Quan tâm gói Đồng Hành", 1), make("membership", "Lê Hoàng Nam", "Muốn nhận tin về quà tặng văn hóa", 2)],
  };
}

function getDemoAdminStore(): DemoAdminStore {
  const saved = readDemoValue<DemoAdminStore | null>(DEMO_ADMIN_KEY, null);
  if (saved && typeof saved === "object") return saved;
  const seeded = seedDemoAdminRecords();
  writeDemoValue(DEMO_ADMIN_KEY, seeded);
  return seeded;
}

export function getDemoAdminRecord(section: string, id: string): AdminRecord | undefined {
  return getDemoAdminStore()[section]?.find((record) => record.id === id);
}

export function requestDemoAdminChanges(section: string, id: string, note: string): void {
  const store = getDemoAdminStore();
  store[section] = (store[section] || []).map((record) => record.id === id
    ? { ...record, editorial_status: "DRAFT", verified: false, review_note: note, updated_at: new Date().toISOString() }
    : record);
  writeDemoValue(DEMO_ADMIN_KEY, store);
}

export function loadAdminOverview() {
  if (isDemoMode()) {
    const store = getDemoAdminStore();
    const count = (section: string) => store[section]?.length || 0;
    const pending = (section: string) => store[section]?.filter((record) => record.editorial_status === "IN_REVIEW").length || 0;
    return Promise.resolve<AdminOverview>({
      analytics: { dau: 128, mau: 2840, acquisition: [{ source: "Tìm kiếm", signups: 46 }, { source: "Giới thiệu", signups: 31 }], activationRate30d: 64, retention: [], activeSubscriptions: 18, unavailableMetrics: [], trends: [], sparklines: { dau: [8, 12, 9, 16, 14, 19, 22], engagements: [10, 14, 12, 18, 17, 22, 26] } },
      content: { activeArticles: count("culture"), articlesAwaitingReview: pending("culture"), activeCalendarEvents: count("calendar"), calendarEventsAwaitingReview: pending("calendar"), activeXamLots: count("xam"), xamLotsAwaitingReview: pending("xam"), activeRituals: count("rituals"), ritualsAwaitingReview: pending("rituals"), activePrayers: count("prayers"), prayersAwaitingReview: pending("prayers") },
      membershipInterestCount: count("membership-interests"),
    });
  }
  return apiRequest<AdminOverview>("/admin/overview");
}

export function loadAdminList<T extends AdminRecord>(section: string, page: number, q: string, status = "all") {
  if (isDemoMode()) {
    const store = getDemoAdminStore();
    const normalizedQuery = q.trim().toLocaleLowerCase("vi");
    const matches = (store[section] || []).filter((record) => {
      const text = `${record.title || ""} ${record.name || ""} ${record.category || ""} ${record.region || ""}`.toLocaleLowerCase("vi");
      if (normalizedQuery && !text.includes(normalizedQuery)) return false;
      if (status === "needs_source") return !record.source;
      return status === "all" || record.editorial_status === status;
    });
    const pageSize = 10;
    const items = matches.slice((page - 1) * pageSize, page * pageSize) as T[];
    const statuses = { DRAFT: 0, IN_REVIEW: 0, APPROVED: 0, PUBLISHED: 0, HIDDEN: 0, REVOKED: 0 };
    for (const record of store[section] || []) {
      const key = record.editorial_status as keyof typeof statuses;
      if (key in statuses) statuses[key] += 1;
    }
    const withSource = (store[section] || []).filter((record) => Boolean(record.source)).length;
    return Promise.resolve({ items, pagination: { page, pageSize, total: matches.length, pageCount: Math.max(1, Math.ceil(matches.length / pageSize)) }, stats: { total: (store[section] || []).length, statuses, missingSource: (store[section] || []).length - withSource, withSource, regions: { NORTH: 6, CENTRAL: 8, SOUTH: 4, NATIONWIDE: 0 } } });
  }
  const params = new URLSearchParams({ page: String(page) });
  if (q.trim()) params.set("q", q.trim());
  if (status !== "all") params.set("status", status);
  return apiRequest<AdminPage<T>>(`/admin/${section}?${params.toString()}`);
}

export function reviewAdminRecord(section: "culture" | "calendar" | "xam" | "rituals" | "prayers", id: string, input: { expectedUpdatedAt: string; verified?: boolean; active?: boolean; reviewNote: string; rightsConfirmed?: boolean; imageRightsConfirmed?: boolean; source?: string; sourceLocator?: string; usageRights?: "confirmed" | "public-domain" | "permission-required" | "unknown" | "group-authored" }) {
  if (isDemoMode()) {
    const store = getDemoAdminStore();
    store[section] = (store[section] || []).map((record) => {
      if (record.id !== id) return record;
      const verified = input.verified ?? Boolean(record.verified);
      const active = input.active ?? Boolean(record.active);
      return { ...record, verified, active, editorial_status: input.verified === false ? "DRAFT" : input.verified === true ? "APPROVED" : input.active === true ? "PUBLISHED" : input.active === false ? "HIDDEN" : record.editorial_status, review_note: input.reviewNote, updated_at: new Date().toISOString() };
    });
    writeDemoValue(DEMO_ADMIN_KEY, store);
    return Promise.resolve(getDemoAdminRecord(section, id) || { id });
  }
  return apiRequest<AdminRecord>(`/admin/${section}/${encodeURIComponent(id)}/review`, {
    method: "PATCH",
    body: JSON.stringify(input),
  });
}
