import type { RemoteContentItem } from "./contentService";

const UNESCO_HOI_AN = "https://whc.unesco.org/en/list/948/";
const UNESCO_HUNG_KINGS = "https://ich.unesco.org/en/RL/worship-of-hng-kings-in-ph-th-00735";
const UNESCO_GIONG = "https://ich.unesco.org/en/RL/giong-festival-of-phu-djong-and-soc-temples-00443";
const HUNG_KINGS_LAW = "https://congbaocdn.chinhphu.vn/CongBaoCP/CongBao/2019/303-304(13-3)/303_304(13-3).pdf";
const DEMO_CULTURE_IMAGES = {
  hoiAn: {
    url: "https://upload.wikimedia.org/wikipedia/commons/b/b5/H%E1%BB%99i_An%2C_Ancient_Town%2C_2020-01_CN-08.jpg",
    source: "https://commons.wikimedia.org/wiki/File:H%E1%BB%99i_An,_Ancient_Town,_2020-01_CN-08.jpg",
    credit: "Steffen Schmitz (Carschten) / Wikimedia Commons",
    rights: "CC BY-SA 4.0 · ghi công tác giả và chia sẻ bản phái sinh theo cùng giấy phép.",
  },
  hungKings: {
    url: "https://upload.wikimedia.org/wikipedia/commons/b/bc/%C4%90%E1%BB%81n_H%C3%B9ng.JPG",
    source: "https://commons.wikimedia.org/wiki/File:%C4%90%E1%BB%81n_H%C3%B9ng.JPG",
    credit: "Hoangvantoanajc / Wikimedia Commons",
    rights: "CC BY-SA 3.0 · ghi công tác giả và chia sẻ bản phái sinh theo cùng giấy phép.",
  },
  giong: {
    url: "https://upload.wikimedia.org/wikipedia/commons/a/a4/H%E1%BB%99i_Gi%C3%B3ng2.jpg",
    source: "https://commons.wikimedia.org/wiki/File:H%E1%BB%99i_Gi%C3%B3ng2.jpg",
    credit: "Hoangvantoanajc / Wikimedia Commons",
    rights: "CC BY-SA 3.0 · ghi công tác giả và chia sẻ bản phái sinh theo cùng giấy phép.",
  },
};

export const DEMO_CULTURE_ITEMS: RemoteContentItem[] = [
  {
    id: "hoi-an-unesco",
    title: "Phố cổ Hội An: dấu ấn của một thương cảng giao lưu",
    subtitle: "Di sản thế giới · Quảng Nam",
    excerpt: "Hội An lưu giữ cấu trúc đô thị của một thương cảng Đông Nam Á hoạt động từ thế kỷ XV đến XIX, với ảnh hưởng văn hóa bản địa và quốc tế.",
    region: "Trung Bộ",
    category: "Di sản thế giới",
    sections: [
      { heading: "Một thương cảng qua nhiều thế kỷ", body: "UNESCO ghi nhận Hội An là một ví dụ được bảo tồn tốt của thương cảng Đông Nam Á từ thế kỷ XV đến XIX. Vị trí bên sông Thu Bồn kết nối phố với hoạt động giao thương trong khu vực và với các vùng xa hơn." },
      { heading: "Dấu vết kiến trúc và cộng đồng", body: "Mặt phố, nhà gỗ, công trình tôn giáo và mạng đường phố phản ánh sự gặp gỡ giữa truyền thống bản địa với ảnh hưởng Trung Hoa, Nhật Bản và châu Âu. Phố cổ vẫn là không gian sinh sống, buôn bán và thực hành văn hóa." },
    ],
    source: UNESCO_HOI_AN,
    image: DEMO_CULTURE_IMAGES.hoiAn.url,
    verified: true,
    contentKind: "article",
    review: { rightsConfirmed: true, usageRights: "confirmed" },
    provenance: {
      contentType: "FACT",
      sourceTitle: "Hoi An Ancient Town",
      sourceAuthor: "UNESCO World Heritage Centre",
      sourceLocator: "Brief synthesis; Description",
      bibliography: "World Heritage List No. 948, inscribed 1999",
      localCommunity: "Hội An, tỉnh Quảng Nam",
      contentRightsBasis: "Bản tóm lược tiếng Việt được biên soạn; đối chiếu trang UNESCO.",
      imageCaption: "Nhà phố trong khu phố cổ Hội An (ảnh chụp tháng 1/2020).",
      imageCredit: DEMO_CULTURE_IMAGES.hoiAn.credit,
      imageSource: DEMO_CULTURE_IMAGES.hoiAn.source,
      imageRightsBasis: DEMO_CULTURE_IMAGES.hoiAn.rights,
    },
  },
  {
    id: "hung-kings-worship-unesco",
    title: "Tín ngưỡng thờ cúng Hùng Vương ở Phú Thọ",
    subtitle: "Di sản văn hóa phi vật thể · Phú Thọ",
    excerpt: "Một thực hành tưởng nhớ tổ tiên được cộng đồng duy trì tại Phú Thọ và nhiều địa phương khác.",
    region: "Bắc Bộ",
    category: "Di sản văn hóa phi vật thể",
    sections: [
      { heading: "Thực hành gắn với cộng đồng", body: "Hồ sơ UNESCO mô tả hoạt động tưởng niệm các Vua Hùng tại Đền Hùng trên núi Nghĩa Lĩnh, cùng các hình thức thờ phụng tại những địa điểm khác trong nước. Cộng đồng và những người am hiểu nghi lễ góp phần duy trì thực hành." },
      { heading: "Ngày Giỗ Tổ", body: "Ngày 10 tháng 3 âm lịch là ngày nghỉ lễ Giỗ Tổ Hùng Vương theo quy định của pháp luật Việt Nam. Lễ hội và hoạt động tưởng niệm có thể được tổ chức theo chương trình của từng địa phương." },
    ],
    source: UNESCO_HUNG_KINGS,
    image: DEMO_CULTURE_IMAGES.hungKings.url,
    verified: true,
    contentKind: "article",
    review: { rightsConfirmed: true, usageRights: "confirmed" },
    provenance: {
      contentType: "FACT",
      sourceTitle: "Worship of Hùng kings in Phú Thọ",
      sourceAuthor: "UNESCO Intangible Cultural Heritage",
      sourceLocator: "Description; Decision 7.COM 11.36",
      bibliography: "UNESCO Representative List, inscribed 2012",
      localCommunity: "Phú Thọ và các cộng đồng thực hành tại Việt Nam",
      contentRightsBasis: "Bản tóm lược tiếng Việt được biên soạn; đối chiếu hồ sơ UNESCO.",
      imageCaption: "Cổng chính Khu di tích Đền Hùng, Phú Thọ.",
      imageCredit: DEMO_CULTURE_IMAGES.hungKings.credit,
      imageSource: DEMO_CULTURE_IMAGES.hungKings.source,
      imageRightsBasis: DEMO_CULTURE_IMAGES.hungKings.rights,
    },
  },
  {
    id: "giong-festival-unesco",
    title: "Hội Gióng ở đền Phù Đổng và đền Sóc",
    subtitle: "Di sản văn hóa phi vật thể · Hà Nội",
    excerpt: "Lễ hội tưởng niệm Thánh Gióng với các thực hành và vai diễn được cộng đồng truyền dạy.",
    region: "Bắc Bộ",
    category: "Lễ hội truyền thống",
    sections: [
      { heading: "Hai địa điểm thực hành", body: "UNESCO ghi nhận lễ hội được tổ chức hằng năm tại các huyện ngoại thành Hà Nội. Lễ hội đền Phù Đổng diễn ra vào tháng tư âm lịch; tại đền Sóc có hoạt động vào tháng giêng âm lịch." },
      { heading: "Diễn xướng và cộng đồng", body: "Tại Phù Đổng, các vai như ông Hiệu cờ, ông Hiệu trống và ông Hiệu chiêng được tập luyện; diễn xướng mô phỏng trận đánh. Ở đền Sóc, nghi lễ tắm tượng và rước hoa tre là một phần thực hành được UNESCO mô tả." },
    ],
    source: UNESCO_GIONG,
    image: DEMO_CULTURE_IMAGES.giong.url,
    verified: true,
    contentKind: "article",
    review: { rightsConfirmed: true, usageRights: "confirmed" },
    provenance: {
      contentType: "FACT",
      sourceTitle: "Gióng festival of Phù Đổng and Sóc temples",
      sourceAuthor: "UNESCO Intangible Cultural Heritage",
      sourceLocator: "Description",
      bibliography: "UNESCO Representative List, inscribed 2010",
      localCommunity: "Phù Đổng và Sóc Sơn, Hà Nội",
      contentRightsBasis: "Bản tóm lược tiếng Việt được biên soạn; đối chiếu hồ sơ UNESCO.",
      imageCaption: "Hình ảnh Hội Gióng trong một cuộc rước lễ.",
      imageCredit: DEMO_CULTURE_IMAGES.giong.credit,
      imageSource: DEMO_CULTURE_IMAGES.giong.source,
      imageRightsBasis: DEMO_CULTURE_IMAGES.giong.rights,
    },
  },
];

export const DEMO_RITUAL_ITEMS: RemoteContentItem[] = [
  {
    id: "tim-hieu-tho-cung-hung-vuong",
    slug: "tim-hieu-tho-cung-hung-vuong",
    title: "Tìm hiểu thực hành thờ cúng Hùng Vương",
    desc: "Nội dung tham khảo về bối cảnh di sản và cách tìm hiểu có tôn trọng cộng đồng; không thay thế hướng dẫn của người chủ trì tại địa phương.",
    region: "Bắc Bộ",
    occasion: "Dịp gia đình",
    source: UNESCO_HUNG_KINGS,
    verified: true,
    contentProvenance: {
      contentType: "FACT",
      sourceTitle: "Worship of Hùng kings in Phú Thọ",
      sourceAuthor: "UNESCO Intangible Cultural Heritage",
      sourceLocator: "Description; community practice",
      localCommunity: "Phú Thọ và các cộng đồng thực hành tại Việt Nam",
    },
    detail: {
      meaningTitle: "Tưởng nhớ và thực hành theo cộng đồng",
      meaningParagraphs: [
        "Hồ sơ UNESCO mô tả đây là thực hành cộng đồng được duy trì tại Phú Thọ và những nơi khác. Cách thực hành cụ thể phụ thuộc người chủ trì, địa điểm và tập quán địa phương.",
        "Khi tham dự, hãy hỏi ban tổ chức về quy định tại nơi diễn ra; không tự suy rộng một nghi thức thành chuẩn chung cho mọi gia đình.",
      ],
      checklists: [
        { id: "demo-check-source", label: "Đọc nguồn UNESCO và thông tin của đơn vị tổ chức địa phương" },
        { id: "demo-check-scope", label: "Xác nhận thời gian, địa điểm và quy định tham dự" },
        { id: "demo-check-respect", label: "Tôn trọng hướng dẫn của người chủ trì và cộng đồng thực hành" },
      ],
      safetyTip: "Thực hiện theo hướng dẫn tại địa điểm; không tự ý sử dụng lửa, vật phẩm hoặc nghi thức ngoài quy định.",
      steps: [
        { stepNumber: "01", title: "Tìm hiểu bối cảnh", desc: "Đọc hồ sơ UNESCO và thông báo của đơn vị tổ chức tại địa phương." },
        { stepNumber: "02", title: "Hỏi người phụ trách", desc: "Xác nhận thời gian, khu vực được tham dự và những lưu ý dành cho khách." },
        { stepNumber: "03", title: "Tham dự có chừng mực", desc: "Giữ trật tự, làm theo chỉ dẫn và không ghi hình khi chưa được phép." },
      ],
      regionalDetails: [],
      fireSafetyRules: [],
    },
  },
  {
    id: "tim-hieu-hoi-giong",
    slug: "tim-hieu-hoi-giong",
    title: "Tìm hiểu Hội Gióng tại Phù Đổng và Sóc Sơn",
    desc: "Tư liệu tham khảo về lễ hội được UNESCO ghi danh; ngày và lịch hoạt động cụ thể theo thông báo của ban tổ chức.",
    region: "Bắc Bộ",
    occasion: "Dịp gia đình",
    source: UNESCO_GIONG,
    verified: true,
    contentProvenance: {
      contentType: "FACT",
      sourceTitle: "Gióng festival of Phù Đổng and Sóc temples",
      sourceAuthor: "UNESCO Intangible Cultural Heritage",
      sourceLocator: "Description",
      localCommunity: "Phù Đổng và Sóc Sơn, Hà Nội",
    },
    detail: {
      meaningTitle: "Diễn xướng được cộng đồng duy trì",
      meaningParagraphs: ["UNESCO mô tả các vai diễn và nghi lễ tại hai địa điểm. Thông tin này nhằm giúp người đọc hiểu bối cảnh, không phải hướng dẫn để tự tái hiện nghi lễ."],
      checklists: [
        { id: "giong-check-source", label: "Kiểm tra lịch lễ hội do ban tổ chức địa phương công bố" },
        { id: "giong-check-access", label: "Tìm hiểu lối đi và quy định dành cho người tham dự" },
      ],
      safetyTip: "Đông người vào dịp lễ; tuân thủ hướng dẫn điều phối tại chỗ.",
      steps: [
        { stepNumber: "01", title: "Tra cứu lịch tổ chức", desc: "Lễ hội ở Phù Đổng gắn với tháng tư âm lịch, còn hoạt động tại Sóc Sơn gắn với tháng giêng; ngày cụ thể cần xác nhận tại địa phương." },
        { stepNumber: "02", title: "Tìm hiểu vai trò cộng đồng", desc: "Đọc mô tả UNESCO về các vai diễn, diễn xướng và nghi lễ tại từng địa điểm." },
        { stepNumber: "03", title: "Tham dự theo quy định", desc: "Tôn trọng không gian nghi lễ và chỉ chụp ảnh khi được phép." },
      ],
      regionalDetails: [],
      fireSafetyRules: [],
    },
  },
];

export const DEMO_CALENDAR_ITEMS: RemoteContentItem[] = [
  {
    id: "hung-kings-anniversary",
    title: "Giỗ Tổ Hùng Vương",
    day: 10,
    month: 3,
    calendar: "LUNAR",
    region: "Toàn quốc",
    typeLabel: "Ngày lễ truyền thống",
    shortDesc: "Ngày 10 tháng 3 âm lịch; địa phương có thể tổ chức chương trình tưởng niệm riêng.",
    source: HUNG_KINGS_LAW,
    verified: true,
  },
  {
    id: "national-reunification-day",
    title: "Ngày Giải phóng miền Nam, thống nhất đất nước",
    day: 30,
    month: 4,
    calendar: "SOLAR",
    region: "Toàn quốc",
    typeLabel: "Ngày lễ quốc gia",
    shortDesc: "Ngày lễ quốc gia diễn ra vào 30 tháng 4 dương lịch.",
    source: HUNG_KINGS_LAW,
    verified: true,
  },
];

export const DEMO_PUBLIC_SOURCES = {
  hoiAn: UNESCO_HOI_AN,
  hungKings: UNESCO_HUNG_KINGS,
  giong: UNESCO_GIONG,
  hungKingsDate: HUNG_KINGS_LAW,
  stressGuide: "https://tdr.who.int/home/our-work/global-engagement/9789240003927",
  xinXamPractice: "https://tuoitre.vn/nld/thoi-su-trong-nuoc/xin-xam--giai-han-o-van-phong-2-ba-chua-xu-82357.htm",
};
