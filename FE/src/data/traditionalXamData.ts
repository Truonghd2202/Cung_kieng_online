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

  culturalContext?: {
    title: string;
    description: string;
    sourceLocator: string;
  };

  metadata: ContentMetadata;
}

export const TRADITIONAL_XAM_COLLECTIONS:
  TraditionalXamCollection[] = [
    {
      id: "quan-am",
      title: "Xăm Quan Âm",
      editionLabel:
        "Bản đăng trên website Chinese Temples Committee, Hồng Kông",
      metadata: {
        contentKind: "editorial",
        editorialStatus: "in-review",
        quotationVerified: false,
        sources: [
          {
            id: "ctc-quan-am-reference",
            title: "Trang tư liệu thẻ Quan Âm số 1",
            authorOrOrganization:
              "Chinese Temples Committee — 華人廟宇委員會",
            url:
              "https://www.ctc.org.hk/chim/觀音籤-第一籤/",
            locator: "Mục 觀音籤, 第一籤",
            accessedOn: "2026-10-05",
          },
        ],
        editorialNote:
          "Kho hiện nhập một thẻ từ nguồn được dẫn. Chưa xác minh toàn bộ bộ thẻ; không gán bản này cho cơ sở tín ngưỡng cụ thể tại Việt Nam.",
      },
    },
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
      id: "quan-am-ctc-001",
      collectionId: "quan-am",
      stickNumber: "1",

      originalLines: [
        "天開地闢作良緣",
        "日吉時良萬物全",
        "若得此籤非小可",
        "人行中正帝王宣",
      ],

      translation: {
        lines: [
          "Trời mở, đất khai, tạo nên duyên lành.",
          "Ngày tốt, thời thuận, muôn vật vẹn toàn.",
          "Nếu nhận được thẻ này, ấy không phải chuyện nhỏ.",
          "Người đi theo đường ngay chính, được bậc đế vương tuyên dương.",
        ],
        attribution:
          "Bản dịch nghĩa nháp do trợ lý AI đề xuất cho Tin Lắm Tâm Linh; chưa qua duyệt Hán văn.",
        metadata: {
          contentKind: "editorial",
          editorialStatus: "draft",
          quotationVerified: false,
          sources: [
            {
              id: "ctc-quan-am-001-translation-reference",
              title: "Nguyên văn thẻ Quan Âm số 1",
              authorOrOrganization:
                "Chinese Temples Committee — 華人廟宇委員會",
              url:
                "https://www.ctc.org.hk/chim/觀音籤-第一籤/",
              locator:
                "Bốn dòng thơ sau tiêu đề 第一籤",
              accessedOn: "2026-10-05",
            },
          ],
          editorialNote:
            "Nguồn chứa nguyên văn chữ Hán, không chứa bản dịch tiếng Việt này. Cần duyệt nghĩa và cách diễn đạt, đặc biệt dòng cuối.",
        },
      },

      reflectionByTopic: {
        "Bình an":
          "Hình ảnh mở đầu có thể gợi một khoảng bắt đầu mới. Bạn thử chọn một điều nhỏ giúp hôm nay dễ chịu hơn. Đây là lời chiêm nghiệm của sản phẩm, không phải lời hứa về tương lai.",

        "Học tập":
          "Bạn có thể nghĩ về một khởi đầu trong việc học: một bài chưa hiểu, một kỹ năng muốn luyện hoặc một kế hoạch cần làm rõ. Chọn một bước vừa sức thay vì xem thẻ là dự báo kết quả thi.",

        "Công việc":
          "Bạn thử nhìn lại cơ hội đang cân nhắc và thông tin còn thiếu. Một lựa chọn phù hợp cần được xem xét bằng điều kiện thực tế của bạn. Thẻ không bảo đảm thành công hay thu nhập.",

        "Gia đình":
          "Hình ảnh duyên lành có thể gợi một việc nhỏ để nuôi dưỡng sự kết nối. Nếu phù hợp, dành thời gian hỏi thăm hoặc lắng nghe người thân. Đây không phải dự báo về quan hệ gia đình.",
      },

      documentedRegions: [],

      metadata: {
        contentKind: "editorial",
        editorialStatus: "in-review",
        quotationVerified: true,
        sources: [
          {
            id: "ctc-quan-am-001",
            title: "Thẻ Quan Âm số 1",
            authorOrOrganization:
              "Chinese Temples Committee — 華人廟宇委員會",
            url:
              "https://www.ctc.org.hk/chim/觀音籤-第一籤/",
            locator:
              "Bốn dòng thơ sau tiêu đề 第一籤",
            accessedOn: "2026-10-05",
          },
        ],
        editorialNote:
          "Nguyên văn đã đối chiếu với trang được dẫn ngày 05/10/2026. Chưa đối chiếu bản in; bản dịch và lời chiêm nghiệm còn chờ duyệt. Chưa phát hành trong luồng rút thẻ.",
      },
    },
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
      translation: {
        lines: [
          "Đầy vơi, suy thịnh đều theo thời trời.",
          "Từ đây, mọi việc của người sẽ gặp sự thích hợp.",
          "Nếu hỏi đường phía trước, câu thơ nhắc đến phép “súc địa”.",
          "Càng cần tu dưỡng cho tốt tấm lòng mình.",
        ],

        attribution:
          "Bản dịch nghĩa nháp do trợ lý AI đề xuất cho Tin Lắm Tâm Linh; chưa qua duyệt Hán văn.",

        metadata: {
          contentKind: "editorial",
          editorialStatus: "draft",
          quotationVerified: false,

          sources: [
            {
              id: "quan-thanh-002-translation-reference",
              title: "Nguyên văn thẻ Quan Thánh số 2",
              authorOrOrganization: "Wikisource — nơi đăng tải",
              url:
                "https://zh.wikisource.org/w/index.php?title=關聖帝君靈籤/2&oldid=2376270",
              locator: "Bốn dòng thơ dưới mục 第二籤",
              accessedOn: "2026-10-05",
            },
          ],

          editorialNote:
            "Nguồn chứa nguyên văn chữ Hán, không chứa bản dịch tiếng Việt này. Dòng thứ ba giữ lại thuật ngữ 縮地 (súc địa); cần đối chiếu điển tích và duyệt cách dịch trước khi phát hành.",
        },
      },
      reflectionByTopic: {
        "Bình an":
          "Bạn có thể dùng hình ảnh đầy vơi trong bài thơ để nhìn lại những thay đổi đang trải qua. Chọn một điều mình có thể chăm sóc trong hiện tại. Đây là lời gợi mở của sản phẩm, không phải dự báo vận may.",

        "Học tập":
          "Có giai đoạn việc học tiến nhanh, có lúc cần thêm thời gian. Bạn thử xác định một phần kiến thức cần luyện lại và chọn cách kiểm tra mình đã hiểu đến đâu. Thẻ không dự báo kết quả thi.",

        "Công việc":
          "Bạn thử nhìn vào thời điểm, thông tin và điều kiện thực tế trước một quyết định công việc. Điều gì cần chuẩn bị thêm, điều gì có thể làm ngay? Đây không phải lời hứa về cơ hội hoặc thu nhập.",

        "Gia đình":
          "Bạn có thể tự hỏi cách ứng xử nào giúp cuộc trò chuyện trong gia đình rõ ràng và tôn trọng hơn. Nếu phù hợp, chọn một điều muốn lắng nghe trước khi phản hồi. Đây không phải lời giải nguyên bản của bộ xăm.",
      },
      culturalContext: {
        title: "Hình ảnh “súc địa” trong phần giải nghĩa",

        description:
          "Phần 釋義 của bản chép được dẫn giải thích 縮地 — “súc địa” — bằng hình ảnh rút ngắn khoảng cách: nghìn dặm như ở ngay trước mắt. Đoạn này liên hệ hình ảnh ấy với thuật do Hồ Công truyền cho Phí Trường Phòng. Đây là mô-típ trong lời giải văn bản, không phải khẳng định một phép thuật có thật hoặc dự báo hành trình của người đọc.",

        sourceLocator:
          "Trang thẻ số 2, mục 釋義. Đoạn này thuộc phần giải nghĩa; không đồng nhất với các tên tích chuyện ghi phía trên bài thơ.",
      },
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
          "Nguyên văn đã khớp với bản chép trên trang được dẫn. Đã bổ sung bản dịch nghĩa nháp và lời chiêm nghiệm do sản phẩm biên soạn. Chưa đối chiếu ảnh bản in cổ hoặc hoàn tất duyệt bản dịch. Chưa phát hành trong luồng rút xăm.",
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
      translation: {
        lines: [
          "Cơm áo tự nhiên có nơi sinh ra.",
          "Khuyên người không cần khổ nhọc lo lòng.",
          "Chỉ cần giữ hiếu đễ, lòng trung và chữ tín.",
          "Phúc lộc sẽ đến, tai họa không xâm phạm.",
        ],

        attribution:
          "Bản dịch nghĩa nháp do trợ lý AI đề xuất cho Tin Lắm Tâm Linh; chưa qua duyệt Hán văn.",

        metadata: {
          contentKind: "editorial",
          editorialStatus: "draft",
          quotationVerified: false,

          sources: [
            {
              id: "quan-thanh-003-translation-reference",
              title: "Nguyên văn thẻ Quan Thánh số 3",
              authorOrOrganization: "Wikisource — nơi đăng tải",
              url:
                "https://zh.wikisource.org/w/index.php?title=關聖帝君靈籤/3&oldid=2376475",
              locator: "Bốn dòng thơ dưới mục 第三籤",
              accessedOn: "2026-10-05",
            },
          ],

          editorialNote:
            "Bản dịch nghĩa nháp, cần duyệt Hán văn. Những lời về phúc lộc và tai họa thuộc nguyên văn thẻ, không phải cam kết hoặc dự đoán của sản phẩm.",
        },
      },
      reflectionByTopic: {
        "Bình an":
          "Bạn có thể đọc bài thơ như một lời nhắc về cách sống và ứng xử. Điều gì giúp bạn thấy yên lòng vì mình đã làm phù hợp với giá trị của bản thân? Không xem câu thẻ là bảo đảm tránh được rủi ro.",

        "Học tập":
          "Bạn thử chọn một cách học giúp mình hiểu thật và giữ sự trung thực với tiến độ hiện tại. Có phần nào cần hỏi thêm thay vì cố tỏ ra đã hiểu? Thẻ không bảo đảm điểm số hoặc thành tích.",

        "Công việc":
          "Bạn có thể nghĩ về chữ tín trong một việc cụ thể: lời hẹn, trách nhiệm hoặc thông tin cần trao đổi rõ. Chọn một cam kết vừa sức để thực hiện. Thẻ không bảo đảm tài chính hay thành công nghề nghiệp.",

        "Gia đình":
          "Những hình ảnh về hiếu đễ có thể gợi việc quan tâm người thân theo cách phù hợp với hoàn cảnh của bạn. Bạn có thể hỏi thăm, lắng nghe hoặc giữ giới hạn cần thiết. Đây là lời chiêm nghiệm của sản phẩm, không đặt nghĩa vụ lên người dùng.",
      },
      culturalContext: {
        title: "Những giá trị được nhắc trong câu thẻ",

        description:
          "Bài thơ nhắc đến 孝悌 — hiếu đễ — và 忠信 — trung tín. Phần bối cảnh này giúp người đọc nhận diện ngôn ngữ đạo đức truyền thống trong văn bản. Lời chiêm nghiệm bên dưới là cách sản phẩm gợi mở cho đời sống hiện tại, không phải bản dịch hay lời giải cổ.",

        sourceLocator:
          "Trang thẻ số 3, dòng thứ ba của bài thơ. Trang cũng nêu tên các tích chuyện 賈誼遇漢文帝 và 張公藝九世同居; kho hiện chưa bổ sung phần kể lại các tích chuyện đó.",
      },
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
          "Nguyên văn đã khớp với bản chép trên trang được dẫn. Đã bổ sung bản dịch nghĩa nháp và lời chiêm nghiệm do sản phẩm biên soạn. Chưa đối chiếu ảnh bản in cổ hoặc hoàn tất duyệt bản dịch. Chưa phát hành trong luồng rút xăm.",
      },
    },
  ];

const developmentEnvironment = (
  import.meta as ImportMeta & {
    env?: { DEV?: boolean };
  }
).env?.DEV === true;

const TEST_MODE_SESSION_KEY = "tltl-xam-test-mode";

function readTraditionalXamTestMode(): boolean {
  if (
    !developmentEnvironment ||
    typeof window === "undefined"
  ) {
    return false;
  }

  const requestedMode = new URLSearchParams(
    window.location.search,
  ).get("xamTest");

  if (requestedMode === "0") {
    try {
      sessionStorage.removeItem(TEST_MODE_SESSION_KEY);
    } catch {
      // Yêu cầu thoát vẫn có hiệu lực trong lần tải hiện tại.
    }

    return false;
  }

  if (requestedMode === "1") {
    try {
      sessionStorage.setItem(TEST_MODE_SESSION_KEY, "1");
    } catch {
      // Vẫn bật theo URL trong lần tải hiện tại.
    }

    return true;
  }

  try {
    return sessionStorage.getItem(TEST_MODE_SESSION_KEY) === "1";
  } catch {
    return false;
  }
}

export const TRADITIONAL_XAM_TEST_MODE =
  readTraditionalXamTestMode();

if (TRADITIONAL_XAM_TEST_MODE) {
  const fixtureMetadata = (): ContentMetadata => ({
    contentKind: "editorial",
    editorialStatus: "approved",
    quotationVerified: true,

    // Các giá trị này chỉ mô phỏng trạng thái để kiểm thử.
    // Không phải xác nhận duyệt tư liệu văn hóa.
    reviewedBy: "TEST FIXTURE — trạng thái giả phục vụ kiểm thử",
    reviewedOn: "2026-10-05",

    sources: [
      {
        id: "ui-test-fixture",
        title: "Dữ liệu kiểm thử giao diện",
        bibliographicReference:
          "TEST FIXTURE — không phải tư liệu dân gian",
        locator: "Bản ghi giả lập trong mã nguồn",
      },
    ],

    editorialNote:
      "Dữ liệu giả chỉ dùng kiểm tra thao tác FE. Không phải xăm cổ hoặc bản dịch tư liệu.",
  });

  const collectionIds: TraditionalXamCollectionId[] = [
    "quan-am",
    "quan-thanh",
  ];

  TRADITIONAL_XAM_COLLECTIONS.splice(
    0,
    TRADITIONAL_XAM_COLLECTIONS.length,
    ...collectionIds.map((id) => ({
      id,
      title:
        id === "quan-am"
          ? "Quan Âm — bộ kiểm thử"
          : "Quan Thánh — bộ kiểm thử",
      editionLabel: "TEST FIXTURE — không phải bản tư liệu",
      totalSticks: 2,
      metadata: fixtureMetadata(),
    })),
  );

  const fixtures: TraditionalXamStick[] = [];

  for (const collectionId of collectionIds) {
    for (const number of [1, 2]) {
      fixtures.push({
        id: `ui-test-${collectionId}-${number}`,
        collectionId,
        stickNumber: String(number),

        originalLines: [
          `Dòng kiểm thử 1 — thẻ ${number}`,
          "Dòng kiểm thử 2",
          "Dòng kiểm thử 3",
          "Dòng kiểm thử 4",
        ],

        translation: {
          lines: [
            "Bản ghi này dùng kiểm tra bố cục.",
            "Không phải nguyên văn hoặc bản dịch xăm cổ.",
            "Bạn có thể thử xem và lưu kết quả.",
            "Dữ liệu được giữ trong kho kiểm thử riêng.",
          ],
          attribution: "Nội dung giả lập phục vụ kiểm thử FE",
          metadata: fixtureMetadata(),
        },

        reflectionByTopic: {
          "Bình an": `Lời kiểm thử bình an — thẻ ${number}.`,
          "Học tập": `Lời kiểm thử học tập — thẻ ${number}.`,
          "Công việc": `Lời kiểm thử công việc — thẻ ${number}.`,
          "Gia đình": `Lời kiểm thử gia đình — thẻ ${number}.`,
        },

        culturalContext: {
          title: "Bối cảnh kiểm thử",
          description:
            "Khối này kiểm tra việc hiển thị và lưu bối cảnh. Không chứa điển tích thật.",
          sourceLocator: "Bản ghi kiểm thử trong mã nguồn",
        },

        documentedRegions: [],
        metadata: fixtureMetadata(),
      });
    }
  }

  TRADITIONAL_XAM_STICKS.splice(
    0,
    TRADITIONAL_XAM_STICKS.length,
    ...fixtures,
  );
}

