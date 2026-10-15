export type EditorialStatus =
  | "draft"
  | "in-review"
  | "approved"
  | "published"
  | "hidden"
  | "revoked";

export interface ContentSource {
  id: string;
  title: string;
  authorOrOrganization?: string;
  url?: string;
  bibliographicReference?: string;
  locator?: string;
  accessedOn?: string;
}

export interface ContentMetadata {
  contentKind: "demo" | "editorial" | "folk" | "ai-generated";
  editorialStatus: EditorialStatus;
  contentType?: "GROUP_AUTHORED" | "FACT" | "LEGEND" | "QUOTATION";
  contentAuthor?: string;
  contentRightsBasis?: string;
  scope?: string;
  originCommunity?: string;

  sources: ContentSource[];
  imageSource?: string;
  imageRightsBasis?: string;

  // Tách việc kiểm chứng câu trích dẫn
  // khỏi việc duyệt lời diễn giải.
  quotationVerified: boolean;

  // Chỉ xác nhận quyền sử dụng khi hồ sơ quyền đã được đối chiếu.
  usageRights?: {
    status: "confirmed" | "public-domain" | "permission-required" | "unknown";
    note: string;
  };

  reviewedBy?: string;
  reviewedOn?: string;
  editorialNote?: string;
}

export function createDemoMetadata(): ContentMetadata {
  return {
    contentKind: "demo",
    editorialStatus: "draft",
    sources: [],
    quotationVerified: false,
    editorialNote:
      "Nội dung minh họa do ứng dụng biên soạn; chưa được đối chiếu nguồn hoặc duyệt biên tập.",
  };
}
