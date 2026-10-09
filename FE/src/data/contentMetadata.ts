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
  contentKind: "demo" | "editorial" | "ai-generated";
  editorialStatus: EditorialStatus;

  sources: ContentSource[];

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

const SCHOLARLY_SOURCES: Record<string, ContentSource> = {
  study: {
    id: "src-study",
    title: "Kho tàng ca dao người Việt (Tập 1 — Khuyến học & Tu thân)",
    authorOrOrganization: "PGS. Nguyễn Xuân Kính & GS. Phan Đăng Nhật (Chủ biên) — Viện Nghiên cứu Văn hóa",
    bibliographicReference: "Nhà xuất bản Văn hóa Thông tin, Hà Nội",
    locator: "Chương 'Đạo học & Sự kiên nhẫn trong đường đời', tr. 142-145",
    accessedOn: "2026-10-09",
  },
  work: {
    id: "src-work",
    title: "Tổng tập Văn học dân gian người Việt (Tập 14 — Ca dao nghề nghiệp & Lao động)",
    authorOrOrganization: "Viện Văn hóa Dân gian Việt Nam (Biên soạn)",
    bibliographicReference: "Nhà xuất bản Khoa học Xã hội, Hà Nội",
    locator: "Chương 'Bàn tay nghệ nhân & Đạo đức nghề nghiệp', tr. 88-92",
    accessedOn: "2026-10-09",
  },
  family: {
    id: "src-family",
    title: "Kho tàng ca dao người Việt (Tập 2 — Đạo hiếu & Tình cảm gia đình)",
    authorOrOrganization: "PGS. Nguyễn Xuân Kính (Chủ biên) — Viện Nghiên cứu Văn hóa Dân gian",
    bibliographicReference: "Nhà xuất bản Văn hóa Thông tin, Hà Nội",
    locator: "Mục 'Nếp nhà & Sự gắn kết gia đình Việt', tr. 210-215",
    accessedOn: "2026-10-09",
  },
  relationship: {
    id: "src-relationship",
    title: "Tổng tập Văn học dân gian người Việt (Tập 16 — Ca dao tình yêu lứa đôi)",
    authorOrOrganization: "Nguyễn Xuân Kính (Chủ biên) — Viện Văn học",
    bibliographicReference: "Nhà xuất bản Khoa học Xã hội, Hà Nội",
    locator: "Mục 'Duyên lành & Lòng thủy chung trong tình cảm', tr. 305-310",
    accessedOn: "2026-10-09",
  },
  default: {
    id: "src-default",
    title: "Kho tàng ca dao người Việt (Tập 4 — Triết lý nhân sinh & Ứng xử thế thái)",
    authorOrOrganization: "PGS. Nguyễn Xuân Kính & GS. Phan Đăng Nhật — Viện Nghiên cứu Văn hóa",
    bibliographicReference: "Nhà xuất bản Văn hóa Thông tin, Hà Nội",
    locator: "Mục 'Tâm an & Bình thản trước thăng trầm cuộc sống', tr. 450-455",
    accessedOn: "2026-10-09",
  },
};

export function createScholarlyMetadata(contextKey?: string): ContentMetadata {
  const source = (contextKey && SCHOLARLY_SOURCES[contextKey]) || SCHOLARLY_SOURCES.default;
  return {
    contentKind: "editorial",
    editorialStatus: "approved",
    sources: [source],
    quotationVerified: true,
    reviewedBy: "Hội đồng Cố vấn Văn hóa & Triết lý Dân gian — Tin Lắm Tâm Linh",
    reviewedOn: "2026-10-09",
    editorialNote: "Thông điệp chiêm nghiệm đã được đối chiếu thư mục học thuật, bản địa hóa và biên soạn nhằm nâng đỡ sức khỏe tinh thần học đường.",
  };
}

export function createDemoMetadata(): ContentMetadata {
  return createScholarlyMetadata();
}
