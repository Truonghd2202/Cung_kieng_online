export type AdminAccessState = "unauthenticated" | "forbidden" | "authorized";

export const EDITOR_SECTIONS = ["culture", "calendar", "xam", "rituals", "prayers", "signals"] as const;

export function getAdminAccessState(user: { role?: string } | null): AdminAccessState {
  if (!user) return "unauthenticated";
  return ["ADMIN", "EDITOR"].includes(user.role?.toUpperCase() || "") ? "authorized" : "forbidden";
}

export function getAllowedAdminSection(role: string | undefined, requested: string): string {
  if (role?.toUpperCase() !== "EDITOR") return requested;
  return EDITOR_SECTIONS.includes(requested as (typeof EDITOR_SECTIONS)[number]) ? requested : "culture";
}
