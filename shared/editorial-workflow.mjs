export const EDITORIAL_STATUSES = Object.freeze([
  "DRAFT",
  "IN_REVIEW",
  "APPROVED",
  "PUBLISHED",
  "HIDDEN",
  // Retained for records created by the previous workflow.
  "REVOKED",
]);

export const EDITORIAL_ACTIONS = Object.freeze([
  "edit_draft",
  "submit_review",
  "withdraw_review",
  "request_changes",
  "approve",
  "publish",
  "hide",
  "show",
  "revoke_approval",
]);

const STATUS_LABELS = Object.freeze({
  DRAFT: "Bản nháp",
  IN_REVIEW: "Chờ duyệt",
  APPROVED: "Đã duyệt · chưa công khai",
  PUBLISHED: "Đang công khai",
  HIDDEN: "Đã ẩn",
  REVOKED: "Đã thu hồi (trạng thái cũ)",
});

export function editorialStatusLabel(status) {
  return STATUS_LABELS[status] || STATUS_LABELS.DRAFT;
}

export function canTransitionEditorialStatus(status, action, approvalCurrent = true) {
  switch (action) {
    case "edit_draft":
    case "submit_review":
      return status === "DRAFT";
    case "withdraw_review":
    case "approve":
      return status === "IN_REVIEW";
    case "request_changes":
      // REVOKED is read only as a compatibility state for existing records.
      return status === "IN_REVIEW" || status === "REVOKED";
    case "publish":
      return (status === "APPROVED" || status === "HIDDEN") && approvalCurrent;
    case "hide":
      return status === "PUBLISHED";
    case "show":
      return status === "HIDDEN" && approvalCurrent;
    case "revoke_approval":
      return ["APPROVED", "PUBLISHED", "HIDDEN"].includes(status) && approvalCurrent;
    default:
      return false;
  }
}

export function nextEditorialStatus(status, action) {
  if (!canTransitionEditorialStatus(status, action, true)) return null;
  switch (action) {
    case "edit_draft":
    case "withdraw_review":
    case "request_changes":
    case "revoke_approval":
      return "DRAFT";
    case "submit_review":
      return "IN_REVIEW";
    case "approve":
      return "APPROVED";
    case "publish":
    case "show":
      return "PUBLISHED";
    case "hide":
      return "HIDDEN";
    default:
      return null;
  }
}

export function allowedEditorialActions({ role, status, ownsContent = false, approvalCurrent = false }) {
  const normalizedRole = String(role || "").toUpperCase();
  if (normalizedRole === "EDITOR") {
    return EDITORIAL_ACTIONS.filter((action) =>
      ownsContent
      && ((status === "DRAFT" && ["edit_draft", "submit_review"].includes(action))
        || (status === "IN_REVIEW" && action === "withdraw_review")),
    );
  }
  if (normalizedRole !== "ADMIN") return [];
  return EDITORIAL_ACTIONS.filter((action) =>
    !["edit_draft", "submit_review", "withdraw_review"].includes(action)
      && canTransitionEditorialStatus(status, action, approvalCurrent),
  );
}
