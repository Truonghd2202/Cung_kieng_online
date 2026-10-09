import { apiRequest } from "../lib/api";

export interface AdminPage<T> {
  items: T[];
  pagination: { page: number; pageSize: number; total: number; pageCount: number };
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
  source?: string | null;
}

export function loadAdminOverview() {
  return apiRequest<AdminOverview>("/admin/overview");
}

export function loadAdminList<T extends AdminRecord>(section: string, page: number, q: string) {
  const params = new URLSearchParams({ page: String(page) });
  if (q.trim()) params.set("q", q.trim());
  return apiRequest<AdminPage<T>>(`/admin/${section}?${params.toString()}`);
}

export function reviewAdminRecord(section: "culture" | "calendar" | "xam" | "rituals" | "prayers", id: string, input: { verified?: boolean; active?: boolean; reviewNote: string; rightsConfirmed?: boolean; source?: string; sourceLocator?: string; usageRights?: "confirmed" | "public-domain" | "permission-required" | "unknown" }) {
  return apiRequest<AdminRecord>(`/admin/${section}/${encodeURIComponent(id)}/review`, {
    method: "PATCH",
    body: JSON.stringify(input),
  });
}
