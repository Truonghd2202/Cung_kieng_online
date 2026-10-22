export const ADMIN_SECTIONS = [
  "overview",
  "review-queue",
  "culture",
  "calendar",
  "xam",
  "rituals",
  "prayers",
  "signals",
  "payments",
  "payment-alerts",
  "partnerships",
  "partner-gifts",
  "membership-interests",
  "audit-logs",
  "team",
] as const;

export type AdminSection = (typeof ADMIN_SECTIONS)[number];

export function getAdminSectionFromSearch(search: string): AdminSection {
  const value = new URLSearchParams(search).get("section");
  return ADMIN_SECTIONS.includes(value as AdminSection)
    ? (value as AdminSection)
    : "overview";
}

export function getAdminSectionUrl(currentUrl: string, section: AdminSection): string {
  const url = new URL(currentUrl);
  url.searchParams.delete("signalEdit");
  url.searchParams.delete("signalDetail");
  if (section === "overview") url.searchParams.delete("section");
  else url.searchParams.set("section", section);
  return `${url.pathname}${url.search}${url.hash}`;
}

export function pushAdminOverlay(overlay: string): void {
  const currentState = window.history.state;
  const state = currentState && typeof currentState === "object" ? currentState : {};
  window.history.pushState(
    { ...state, adminOverlay: overlay },
    "",
    window.location.href,
  );
}

export function closeAdminOverlay(overlay: string): void {
  if (window.history.state?.adminOverlay === overlay) window.history.back();
}
