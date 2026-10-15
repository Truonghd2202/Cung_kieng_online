export type AdminAccessState = "unauthenticated" | "forbidden" | "authorized";

export function getAdminAccessState(user: { role?: string } | null): AdminAccessState {
  if (!user) return "unauthenticated";
  return user.role?.toUpperCase() === "ADMIN" ? "authorized" : "forbidden";
}
