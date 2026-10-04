import type { ContentMetadata } from "./contentMetadata";
import type { RegionType, TopicType } from "./xinXamData";

export type TraditionalXamCollectionId =
  | "quan-am"
  | "quan-thanh";

export interface TraditionalXamCollection {
  id: TraditionalXamCollectionId;
  title: string;

  // Phân biệt các bản lưu truyền của cùng một bộ xăm.
  editionLabel: string;

  // Chỉ ghi khi đã xác minh số lượng của bản đang dùng.
  totalSticks?: number;

  metadata: ContentMetadata;
}

export interface TraditionalXamStick {
  // ID duy nhất trong hệ thống, không chỉ là số thẻ.
  id: string;

  collectionId: TraditionalXamCollectionId;

  // Số thẻ giữ theo tài liệu nguồn.
  stickNumber: string;

  // Nguyên văn đối chiếu với nguồn.
  originalLines: string[];

  // Bản dịch là phần riêng, có thể chưa có.
  translation?: {
    lines: string[];
    attribution: string;
    metadata: ContentMetadata;
  };

  // Lời sản phẩm biên soạn, không nhập vào nguyên văn.
  reflectionByTopic: Partial<Record<TopicType, string>>;

  // Chỉ ghi vùng khi có nguồn chứng minh mối liên hệ.
  documentedRegions: RegionType[];

  metadata: ContentMetadata;
}

export const TRADITIONAL_XAM_COLLECTIONS:
  TraditionalXamCollection[] = [
    {
      id: "quan-thanh",
      title: "Quan Thánh Đế Quân Linh Xăm",
      editionLabel:
        "Bản chép chữ Hán trên Wikisource — 關聖帝君靈籤",
      totalSticks: 100,
      metadata: {
        contentKind: "editorial",
        editorialStatus: "draft",
        quotationVerified: false,
        sources: [
          {
            id: "wikisource-quan-thanh-index",
            title: "關聖帝君靈籤 — mục lục",
            authorOrOrganization: "Wikisource — nơi đăng tải",
            url:
              "https://zh.wikisource.org/w/index.php?title=關聖帝君靈籤&oldid=2428837",
            locator: "Mục lục thẻ 1–100",
            accessedOn: "2026-10-05",
          },
        ],
        editorialNote:
          "Đã kiểm tra mục lục trên Wikisource. Kho dự án hiện nhập thẻ số 1–3, chưa đối chiếu toàn bộ 100 thẻ hoặc ảnh bản in cổ. Chưa xác nhận đây là bản sử dụng tại một cơ sở tín ngưỡng cụ thể ở Việt Nam.",
      },
    },
  ];

export const TRADITIONAL_XAM_STICKS:
  TraditionalXamStick[] = [
    {
      id: "quan-thanh-wikisource-001",
      collectionId: "quan-thanh",
      stickNumber: "1",
      originalLines: [
        "巍巍獨步向雲間",
        "玉殿千官第一班",
        "富貴榮華天付汝",
        "福如東海壽如山",
      ],

      translation: {
        lines: [
          "Hiên ngang một mình bước lên giữa tầng mây.",
          "Trong điện ngọc, đứng hàng đầu giữa nghìn quan.",
          "Phú quý, vinh hoa được trời ban cho người.",
          "Phúc như biển Đông, thọ như núi.",
        ],
        attribution:
          "Bản dịch nghĩa nháp do trợ lý AI đề xuất cho Tin Lắm Tâm Linh; chưa qua duyệt Hán văn.",
        metadata: {
          contentKind: "editorial",
          editorialStatus: "draft",
          quotationVerified: false,
          sources: [
            {
              id: "wikisource-quan-thanh-001-translation-reference",
              title: "Nguyên văn chữ Hán của thẻ số 1",
              authorOrOrganization: "Wikisource — nơi đăng tải",
              url:
                "https://zh.wikisource.org/w/index.php?title=關聖帝君靈籤/1&oldid=2610595",
              locator:
                "Bốn dòng thơ dưới mục 第一籤　甲甲　大吉",
              accessedOn: "2026-10-05",
            },
          ],
          editorialNote:
            "Nguồn dẫn chứa nguyên văn chữ Hán, không chứa bản dịch tiếng Việt này. Bản dịch phục vụ kiểm tra nội bộ, chưa được duyệt để phát hành.",
        },
      },

      reflectionByTopic: {
        "Học tập":
          "Bạn có thể dùng hình ảnh tiến bước trong bài thơ để nghĩ về một mục tiêu học tập của mình. Hãy chọn một phần việc cụ thể và xác định điều cần luyện thêm. Đây là lời gợi mở do sản phẩm biên soạn, không dự báo kết quả thi cử.",

        "Công việc":
          "Bạn thử nhìn lại mục tiêu nghề nghiệp đang theo đuổi: điều gì phụ thuộc vào sự chuẩn bị của mình, điều gì cần thêm thông tin hoặc sự hỗ trợ? Chọn một bước có thể thực hiện hôm nay. Câu thẻ không bảo đảm thăng tiến hay thu nhập.",

        "Gia đình":
          "Hình ảnh phúc và thọ có thể gợi một lời chúc dành cho người thân. Nếu phù hợp với hoàn cảnh của bạn, hãy gửi một lời hỏi thăm hoặc dành thời gian lắng nghe. Đây là lời chiêm nghiệm của sản phẩm, không phải lời giải nguyên bản của bộ xăm.",

        "Bình an":
          "Bạn có thể đọc bài thơ như một hình ảnh về mong ước được sống đủ đầy và lâu bền. Hãy thử nhận ra một điều đang nâng đỡ mình trong hiện tại. Bạn không cần ép bản thân phải vui hoặc xem câu thẻ là lời hứa về tương lai.",
      },

      // Chưa có căn cứ gán thẻ này cho Bắc–Trung–Nam.
      documentedRegions: [],

      metadata: {
        contentKind: "editorial",
        editorialStatus: "draft",
        quotationVerified: true,
        sources: [
          {
            id: "wikisource-quan-thanh-001",
            title: "關聖帝君靈籤/1 — thẻ số 1",
            authorOrOrganization: "Wikisource — nơi đăng tải",
            url:
              "https://zh.wikisource.org/w/index.php?title=關聖帝君靈籤/1&oldid=2610595",
            locator:
              "Bốn dòng thơ dưới mục 第一籤　甲甲　大吉",
            accessedOn: "2026-10-05",
          },
        ],
        editorialNote:
          "Bốn dòng chữ Hán đã khớp với bản chép tại phiên bản trang được dẫn, chưa đối chiếu ảnh bản in cổ. Bản dịch tiếng Việt do AI đề xuất và lời chiêm nghiệm do sản phẩm biên soạn đều còn chờ duyệt. Chưa phát hành thẻ này trong luồng rút xăm.",
      },
    },
    {
      id: "quan-thanh-wikisource-002",
      collectionId: "quan-thanh",
      stickNumber: "2",
      originalLines: [
        "盈虛消息總天時",
        "自此君當百事宜",
        "若問前程歸縮地",
        "更須方寸好修為",
      ],
      reflectionByTopic: {},
      documentedRegions: [],
      metadata: {
        contentKind: "editorial",
        editorialStatus: "draft",
        quotationVerified: true,
        sources: [
          {
            id: "wikisource-quan-thanh-002",
            title: "關聖帝君靈籤/2 — thẻ số 2",
            authorOrOrganization: "Wikisource — nơi đăng tải",
            url:
              "https://zh.wikisource.org/w/index.php?title=關聖帝君靈籤/2&oldid=2376270",
            locator: "Bốn dòng thơ dưới mục 第二籤",
            accessedOn: "2026-10-05",
          },
        ],
        editorialNote:
          "Nguyên văn đã khớp với bản chép trên trang được dẫn. Chưa đối chiếu ảnh bản in cổ, chưa bổ sung bản dịch hoặc lời chiêm nghiệm đã duyệt. Chưa phát hành trong luồng rút xăm.",
      },
    },
    {
      id: "quan-thanh-wikisource-003",
      collectionId: "quan-thanh",
      stickNumber: "3",
      originalLines: [
        "衣食自然生處有",
        "勸君不用苦勞心",
        "但能孝悌存忠信",
        "福祿來成禍不侵",
      ],
      reflectionByTopic: {},
      documentedRegions: [],
      metadata: {
        contentKind: "editorial",
        editorialStatus: "draft",
        quotationVerified: true,
        sources: [
          {
            id: "wikisource-quan-thanh-003",
            title: "關聖帝君靈籤/3 — thẻ số 3",
            authorOrOrganization: "Wikisource — nơi đăng tải",
            url:
              "https://zh.wikisource.org/w/index.php?title=關聖帝君靈籤/3&oldid=2376475",
            locator: "Bốn dòng thơ dưới mục 第三籤",
            accessedOn: "2026-10-05",
          },
        ],
        editorialNote:
          "Nguyên văn đã khớp với bản chép trên trang được dẫn. Chưa đối chiếu ảnh bản in cổ, chưa bổ sung bản dịch hoặc lời chiêm nghiệm đã duyệt. Chưa phát hành trong luồng rút xăm.",
      },
    },
  ];
