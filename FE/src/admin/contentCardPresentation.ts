import { editorialStatusLabel as sharedEditorialStatusLabel } from "../../../shared/editorial-workflow.mjs";

type ContentCardRow = {
  editorial_status?: string;
  verified?: boolean;
  active?: boolean;
  category?: unknown;
  xam_type?: unknown;
  occasion?: unknown;
  target_type?: unknown;
};

export type ContentCardStatus = {
  label: string;
  variant: "verified" | "pending" | "published" | "hidden";
};

export function getContentCardStatus(row: ContentCardRow): ContentCardStatus {
  const status = String(row.editorial_status || "DRAFT");
  const variants: Record<string, ContentCardStatus["variant"]> = {
    DRAFT: "pending",
    IN_REVIEW: "pending",
    APPROVED: "verified",
    PUBLISHED: "published",
    HIDDEN: "hidden",
    REVOKED: "hidden",
  };
  return {
    label: status === "REVOKED"
      ? `${sharedEditorialStatusLabel(status)} (dữ liệu cũ)`
      : sharedEditorialStatusLabel(status),
    variant: variants[status] || "pending",
  };
}

export function getContentCardCategory(section: string, row: ContentCardRow): string {
  const value = section === "rituals"
    ? row.category
    : row.category ?? row.xam_type ?? row.occasion ?? row.target_type ?? "Tư liệu";
  return typeof value === "string" ? value.trim() : "";
}
