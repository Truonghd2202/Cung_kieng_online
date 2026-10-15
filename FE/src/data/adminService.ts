import { apiRequest } from "../lib/api";

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
  source?: string | null;
}

export function loadAdminOverview() {
  return apiRequest<AdminOverview>("/admin/overview");
}

export function loadAdminList<T extends AdminRecord>(section: string, page: number, q: string, status = "all") {
  const params = new URLSearchParams({ page: String(page) });
  if (q.trim()) params.set("q", q.trim());
  if (status !== "all") params.set("status", status);
  return apiRequest<AdminPage<T>>(`/admin/${section}?${params.toString()}`);
}

export function reviewAdminRecord(section: "culture" | "calendar" | "xam" | "rituals" | "prayers", id: string, input: { verified?: boolean; active?: boolean; reviewNote: string; rightsConfirmed?: boolean; source?: string; sourceLocator?: string; usageRights?: "confirmed" | "public-domain" | "permission-required" | "unknown" }) {
  return apiRequest<AdminRecord>(`/admin/${section}/${encodeURIComponent(id)}/review`, {
    method: "PATCH",
    body: JSON.stringify(input),
  });
}
