export type EditorialStatus =
  | "draft"
  | "in-review"
  | "approved";

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
  contentKind: "demo" | "editorial";
  editorialStatus: EditorialStatus;

  sources: ContentSource[];

  // Tách việc kiểm chứng câu trích dẫn
  // khỏi việc duyệt lời diễn giải.
  quotationVerified: boolean;

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
      "Nội dung mẫu đang sử dụng trong FE. Chưa hoàn tất đối chiếu nguồn và duyệt lời diễn giải.",
  };
}
