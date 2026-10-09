import { apiRequest } from "../lib/api";

const CONSENT_KEY = "tltl-analytics-consent";
const ANONYMOUS_ID_KEY = "tltl-analytics-anonymous-id";
const ATTRIBUTION_KEY = "tltl-analytics-source";

type ProductEvent =
  | "app_open"
  | "signup_completed"
  | "mood_checkin_completed"
  | "xam_draw_completed"
  | "share_link_copied"
  | "membership_interest_registered";

function readOrCreateId(key: string): string | null {
  try {
    const current = localStorage.getItem(key);
    if (current && /^[0-9a-f-]{36}$/i.test(current)) return current;
    const next = crypto.randomUUID();
    localStorage.setItem(key, next);
    return next;
  } catch {
    return null;
  }
}

function campaignSource(): "campus_qr" | "organic_social" | "direct" {
  try {
    const existing = localStorage.getItem(ATTRIBUTION_KEY);
    if (existing === "campus_qr" || existing === "organic_social" || existing === "direct") return existing;
    const query = new URLSearchParams(window.location.search);
    const source = query.get("utm_source")?.toLowerCase();
    const selected = source === "campus_qr" ? "campus_qr" : source === "tiktok" || source === "instagram" || source === "threads" ? "organic_social" : "direct";
    localStorage.setItem(ATTRIBUTION_KEY, selected);
    return selected;
  } catch {
    return "direct";
  }
}

export function setProductAnalyticsConsent(consented: boolean) {
  try {
    if (consented) localStorage.setItem(CONSENT_KEY, "granted");
    else {
      localStorage.removeItem(CONSENT_KEY);
      localStorage.removeItem(ANONYMOUS_ID_KEY);
      localStorage.removeItem(ATTRIBUTION_KEY);
    }
  } catch {
    // Analytics remains disabled when browser storage is unavailable.
  }
}

export function hasProductAnalyticsConsent() {
  try {
    return localStorage.getItem(CONSENT_KEY) === "granted";
  } catch {
    return false;
  }
}

export function trackProductEvent(eventName: ProductEvent) {
  if (!hasProductAnalyticsConsent()) return;
  const anonymousId = readOrCreateId(ANONYMOUS_ID_KEY);
  if (!anonymousId) return;

  void apiRequest("/analytics/events", {
    method: "POST",
    body: JSON.stringify({
      clientEventId: crypto.randomUUID(),
      anonymousId,
      eventName,
      campaignSource: campaignSource(),
    }),
  }).catch(() => undefined);
}
