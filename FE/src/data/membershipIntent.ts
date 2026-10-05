export type MembershipTerm = "monthly" | "yearly";

const STORAGE_KEY = "tltl-membership-intent";
const MAX_AGE_MS = 30 * 60 * 1000;

export function readMembershipIntent(): MembershipTerm | null {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return null;

    const value: unknown = JSON.parse(raw);

    if (
      !value ||
      typeof value !== "object" ||
      Array.isArray(value)
    ) {
      return null;
    }

    const item = value as Record<string, unknown>;

    if (
      (item.term !== "monthly" && item.term !== "yearly") ||
      typeof item.createdAt !== "number" ||
      !Number.isFinite(item.createdAt)
    ) {
      return null;
    }

    const age = Date.now() - item.createdAt;

    if (age < 0 || age > MAX_AGE_MS) return null;

    return item.term;
  } catch {
    return null;
  }
}

export function writeMembershipIntent(
  term: MembershipTerm
): boolean {
  try {
    sessionStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        term,
        createdAt: Date.now(),
      })
    );

    return true;
  } catch {
    return false;
  }
}

export function clearMembershipIntent(): void {
  try {
    sessionStorage.removeItem(STORAGE_KEY);
  } catch {
    // Không chặn điều hướng nếu trình duyệt từ chối.
  }
}
