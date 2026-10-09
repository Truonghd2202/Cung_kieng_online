import {
  createDemoMetadata,
  type ContentMetadata,
} from "./contentMetadata";

export type RegionType = "Bắc Bộ" | "Trung Bộ" | "Nam Bộ";
export type TopicType = "Học tập" | "Công việc" | "Gia đình" | "Bình an";

export interface XinXamResult {
  metadata: ContentMetadata;
  aiExplanation?: {
    content: string;
    metadata: ContentMetadata;
  };
  source?: string;
  verified?: boolean;
  stickNumber: string;
  region: RegionType;
  regionSub: string;
  topic: TopicType;
  topicTag: string;
  title: string;
  quote: string;
  poem: {
    line1: string;
    line2: string;
    line3: string;
    line4: string;
  };
  sealText: string;
  fortuneType?: string;
  category?: string;
  insight: string;
  reflectionParagraphs: string[];
  tips: {
    title: string;
    desc: string;
  }[];
  culturalAspect: string;
  relatedArticleId: string;
  relatedArticleTitle: string;
  microAction: {
    title: string;
    desc: string;
    duration: string;
  };
}

export const XIN_XAM_RESULTS: Record<string, XinXamResult> = {
  // ==========================================
  // BẮC BỘ (4 Chủ đề)
  // ==========================================
  "Bắc Bộ-Bình an": {
    metadata: createDemoMetadata(),
    stickNumber: "01",
    region: "Bắc Bộ",
    regionSub: "Trầm mặc Xứ Bắc",
    topic: "Bình an",
    topicTag: "Tâm sáng an nhiên",
    title: "BÌNH AN • AN TRÚ NỘI TÂM",
    quote: "Nước lặng thì lòng gương sáng. Giữ tâm thuần hậu, việc ắt an nhiên.",
    poem: {
      line1: "Gió thoảng đầu hiên lá rụng êm,",
      line2: "Tâm an vạn sự khắc bình yên.",
      line3: "Chớ lo mây xám giăng ngõ tối,",
      line4: "Trời rạng bình minh sáng trước thềm.",
    },
    sealText: "AN NHIÊN",
    insight: "Tĩnh lặng",
    reflectionParagraphs: [
      "Trong nhịp sống gấp gáp, chúng ta thường tìm kiếm sự bình an từ những biến chuyển bên ngoài, nhưng cội nguồn của sự an định luôn bắt đầu từ một nhịp thở chậm. Thẻ số 01 mở thông điệp về sự kiên nhẫn với chính mình: bình an không phải là một ngày không có sóng gió, mà là khi lòng ta đủ tĩnh lặng để nhìn rõ con đường phía trước.",
      "Khi đối diện với những quyết định quan trọng hay khoảnh khắc lưỡng lự, việc lùi lại một bước để quan sát chính là chiếc chìa khóa giúp gỡ bỏ những nút thắt trong tâm tưởng.",
    ],
    tips: [
      {
        title: "Tĩnh lòng trước xáo động",
        desc: "Lắng nghe cảm xúc xuất hiện trong ngày mà không vội vàng phán xét hay phản ứng tức thời.",
      },
      {
        title: "Đơn giản hóa ưu tư",
        desc: "Nhận diện những yếu tố nằm ngoài tầm kiểm soát của bạn và học cách buông lặng nhẹ nhàng.",
      },
    ],
    culturalAspect:
      "Tập tục rút thẻ xin xăm tại các đình, đền truyền thống Việt Nam từ lâu đời không đơn thuần là nghi thức cầu may, mà là một khoảng lặng thiêng liêng để người xưa gửi gắm tâm tư, tự soi chiếu lòng mình trước bậc tiền nhân. Mỗi lời thẻ là một câu châm ngôn răn dạy về đạo lý làm người, nhắc nhở lối sống thuận hòa với thiên nhiên và cộng đồng.",
    relatedArticleId: "dinh-lang-bac-bo",
    relatedArticleTitle: "Đình làng Bắc Bộ & Không gian tín ngưỡng dân gian",
    microAction: {
      title: "Dành 5 phút an trú trong hiện tại",
      desc: "Tạm gác lại điện thoại và công việc dang dở. Uống một ngụm nước ấm, hít thở sâu 3 nhịp và quan sát một vật bình dị quanh bạn với lòng biết ơn.",
      duration: "5 phút thực hành",
    },
  },

  "Bắc Bộ-Gia đình": {
    metadata: createDemoMetadata(),
    stickNumber: "02",
    region: "Bắc Bộ",
    regionSub: "Nếp nhà Xứ Bắc",
    topic: "Gia đình",
    topicTag: "Thuận hòa nếp nhà",
    title: "GIA ĐÌNH • HIẾU NGHĨA TRƯỚC SAU",
    quote: "Thuận vợ thuận chồng tát bể Đông cũng cạn. Trong ấm ngoài êm, phúc lộc tự sinh.",
    poem: {
      line1: "Tre già ấp ủ măng non mọc,",
      line2: "Mái rạ khói lam ấm bếp hồng.",
      line3: "Một dạ thương nhau qua giông bão,",
      line4: "Tình nhà bền chặt tựa non sông.",
    },
    sealText: "THUẬN HÒA",
    insight: "Bao dung",
    reflectionParagraphs: [
      "Văn hóa gia đình xứ Bắc coi trọng tôn ti trật tự nhưng cốt lõi vẫn là chữ Tình và lòng Hiếu kính. Mọi mâu thuẫn vụn vặt thường nhật sẽ tan biến khi mỗi người biết hạ bớt cái tôi và mở lòng lắng nghe.",
      "Gia đình là bến đỗ bình yên nhất; hãy trân quý những bữa cơm sum vầy và lời thăm hỏi ân cần dành cho cha mẹ, người thân.",
    ],
    tips: [
      {
        title: "Lắng nghe không định kiến",
        desc: "Dành trọn sự chú tâm khi trò chuyện cùng người thân trong gia đình.",
      },
      {
        title: "Bày tỏ lòng biết ơn",
        desc: "Chủ động gửi một lời cảm ơn chân thành đến người bạn trân quý hôm nay.",
      },
    ],
    culturalAspect:
      "Lễ cúng gia tiên và sum vầy con cháu nơi đất Bắc luôn nhắc nhở về cội nguồn 'Uống nước nhớ nguồn', xem sự hòa thuận giữa các thế hệ là phúc lành lớn nhất của dòng tộc.",
    relatedArticleId: "dinh-lang-bac-bo",
    relatedArticleTitle: "Đình làng Bắc Bộ & Không gian tín ngưỡng dân gian",
    microAction: {
      title: "Gửi một lời hỏi thăm ấm áp",
      desc: "Nhắn tin hoặc gọi điện hỏi thăm sức khỏe cha mẹ hay người thân bằng tất cả sự chân thành.",
      duration: "3 phút thực hành",
    },
  },

  "Bắc Bộ-Học tập": {
    metadata: createDemoMetadata(),
    stickNumber: "05",
    region: "Bắc Bộ",
    regionSub: "Văn hiến Thăng Long",
    topic: "Học tập",
    topicTag: "Bút nghiên tỏa rạng",
    title: "HỌC TẬP • BỀN BỈ DÙNG CÔNG",
    quote: "Ngọc bất trác bất thành khí, nhân bất học bất tri đạo. Cần cù bù thông minh, đèn sách tất nên danh.",
    poem: {
      line1: "Đêm dài miệt mài bên trang sách,",
      line2: "Bút mực khai hoa rạng bảng vàng.",
      line3: "Chớ nản đường xa nhiều khúc khuỷu,",
      line4: "Mai ngày thành đạt bước hiên ngang.",
    },
    sealText: "KHAI MINH",
    insight: "Chăm chỉ",
    reflectionParagraphs: [
      "Truyền thống hiếu học của đất Thăng Long nghìn năm văn hiến đề cao tinh thần kiên trì, tự học và cầu tiến. Tri thức không thể có được sau một đêm, mà là sự tích lũy bền bỉ qua từng trang sách.",
      "Đừng lo lắng trước những bài toán khó hay kỳ thi phía trước. Hãy giữ tâm trí sáng suốt, phân bổ thời gian hợp lý và tin tưởng vào sự nỗ lực của chính mình.",
    ],
    tips: [
      {
        title: "Kỷ luật tự thân",
        desc: "Thiết lập khoảng thời gian học tập tập trung 25 phút không bị xao nhãng bởi mạng xã hội.",
      },
      {
        title: "Học đi đôi với hành",
        desc: "Áp dụng kiến thức vừa học vào một việc làm thực tế để ghi nhớ sâu sắc.",
      },
    ],
    culturalAspect:
      "Văn Miếu - Quốc Tử Giám và tục xin chữ đầu xuân là biểu trưng cho lòng tôn sư trọng đạo, xem việc rèn đức luyện tài là con đường phụng sự xã hội và rạng danh tổ tiên.",
    relatedArticleId: "dinh-lang-bac-bo",
    relatedArticleTitle: "Văn Miếu Quốc Tử Giám & Tinh hoa khoa bảng",
    microAction: {
      title: "Dọn góc học tập tinh tươm",
      desc: "Sắp xếp lại bàn học ngăn nắp, đặt một cốc nước sạch và viết ra 3 mục tiêu ưu tiên cần hoàn thành.",
      duration: "5 phút thực hành",
    },
  },

  "Bắc Bộ-Công việc": {
    metadata: createDemoMetadata(),
    stickNumber: "03",
    region: "Bắc Bộ",
    regionSub: "Trầm mặc Xứ Bắc",
    topic: "Công việc",
    topicTag: "Thuận buồm xuôi gió",
    title: "CÔNG VIỆC • VỮNG CHÍ TIẾN BƯỚC",
    quote: "Có công mài sắt có ngày nên kim. Kiên định bước đi, ắt thông lối sáng.",
    poem: {
      line1: "Gỗ mục rèn nên cột chống đình,",
      line2: "Người bền tâm trí dạ đinh ninh.",
      line3: "Đường xa vạn dặm không sờn bước,",
      line4: "Hoa nở mùa xuân đượm sắc vinh.",
    },
    sealText: "HANH THÔNG",
    insight: "Bền chí",
    reflectionParagraphs: [
      "Mọi thành tựu bền vững đều đòi hỏi sự kiên nhẫn thầm lặng tựa như việc người thợ đục đẽo từng thớ gỗ dựng mái đình xưa. Đừng nản lòng trước những khúc quanh ban đầu; mỗi thử thách là một cơ hội trui rèn bản lĩnh.",
      "Tập trung vào từng việc nhỏ trước mắt, hoàn thành bằng tinh thần trách nhiệm cao nhất, thành công tự khắc sẽ đơm hoa kết trái.",
    ],
    tips: [
      {
        title: "Tập trung vào hiện tại",
        desc: "Chia nhỏ mục tiêu lớn thành những bước hành động cụ thể trong ngày.",
      },
      {
        title: "Giữ vững chữ Tín",
        desc: "Chữ Tín là nền móng cho mọi sự hợp tác lâu dài và thành công vững bền.",
      },
    ],
    culturalAspect:
      "Người thợ làng nghề Bắc Bộ truyền đời bí quyết bằng sự tỉ mẩn, coi trọng danh dự và uy tín của phường hội làng nghề truyền thống.",
    relatedArticleId: "dinh-lang-bac-bo",
    relatedArticleTitle: "Làng nghề truyền thống & Tinh thần bách nghệ",
    microAction: {
      title: "Liệt kê việc quan trọng nhất",
      desc: "Ghi ra giấy một đầu việc quan trọng nhất bạn đã trì hoãn và bắt tay vào làm ngay trong 15 phút.",
      duration: "15 phút hành động",
    },
  },

  // ==========================================
  // TRUNG BỘ (4 Chủ đề)
  // ==========================================
  "Trung Bộ-Bình an": {
    metadata: createDemoMetadata(),
    stickNumber: "23",
    region: "Trung Bộ",
    regionSub: "Trầm mặc Cố Đô",
    topic: "Bình an",
    topicTag: "Lặng gió sông Hương",
    title: "BÌNH AN • TÂM AN VẠN SỰ THÁI",
    quote: "Gió lặng mây quang bên dòng Hương giang. Buông bớt nhọc nhằn để đón thanh lương.",
    poem: {
      line1: "Chiều buông chuông đổ mái chùa xưa,",
      line2: "Dòng nước êm trôi tiễn nắng vừa.",
      line3: "Lòng giữ thanh lương như giọt ngọc,",
      line4: "Mặc đời biến đổi mấy phong ba.",
    },
    sealText: "THANH LƯƠNG",
    insight: "Khoan thai",
    reflectionParagraphs: [
      "Khí chất xứ Huế và miền Trung mang đậm tính thâm trầm, sâu lắng. Giữa những khắc nghiệt của thiên nhiên, con người nơi đây rèn luyện cho mình một nội lực tĩnh lặng, điềm nhiên đối diện trước mọi thăng trầm.",
      "Khi tâm ta không động trước những xáo động bên ngoài, mọi biến cố đều trở thành bài học tôi luyện phẩm hạnh.",
    ],
    tips: [
      {
        title: "Sống chậm lại một nhịp",
        desc: "Tập ăn chậm, uống một tách trà sen và thưởng thức trọn vẹn hương vị hiện tại.",
      },
      {
        title: "Bao dung với nghịch cảnh",
        desc: "Nhìn nhận những khó khăn như cơn mưa rào giúp rửa sạch bụi bặm cuộc đời.",
      },
    ],
    culturalAspect:
      "Điện Hòn Chén và các danh lam cổ tự xứ Huế gìn giữ nếp sống trầm mặc, coi trọng sự tu dưỡng thân tâm giữa cảnh sắc sông núi hữu tình.",
    relatedArticleId: "dien-hon-chen",
    relatedArticleTitle: "Lễ hội Điện Hòn Chén & Nét linh thiêng Xứ Huế",
    microAction: {
      title: "Thưởng trà trong tĩnh lặng",
      desc: "Pha một chén trà thơm, ngồi thẳng lưng và uống từng ngụm chậm rãi mà không lướt điện thoại.",
      duration: "5 phút thực hành",
    },
  },

  "Trung Bộ-Gia đình": {
    metadata: createDemoMetadata(),
    stickNumber: "21",
    region: "Trung Bộ",
    regionSub: "Mộc mạc miền Trung",
    topic: "Gia đình",
    topicTag: "Chắt chiu nghĩa tình",
    title: "GIA ĐÌNH • GẮN KẾT THỦY CHUNG",
    quote: "Gừng cay muối mặn xin đừng quên nhau. Đồng cam cộng khổ, gia đạo an vui.",
    poem: {
      line1: "Gừng cay muối mặn nghĩa phu thê,",
      line2: "Bao quản gian nan trọn lối về.",
      line3: "Đắp đổi ân tình qua bão gió,",
      line4: "Trọn đời gắn kết sắt son thề.",
    },
    sealText: "THỦY CHUNG",
    insight: "Chắt chiu",
    reflectionParagraphs: [
      "Đất miền Trung chịu nhiều gió bão, nắng lửa mưa dầm nên tình cảm gia đình nơi đây được tôi luyện bằng đức hy sinh và lòng thủy chung son sắt. Chữ 'thương' của người miền Trung thầm lặng mà da diết.",
      "Gia đình là điểm tựa vững chãi nhất chở che bạn qua những dông bão cuộc đời. Hãy trân quý từng giọt mồ hôi và tình thương vô bờ bến của đấng sinh thành.",
    ],
    tips: [
      {
        title: "Đồng cam cộng khổ",
        desc: "Chia sẻ gánh nặng cùng người thân bằng những việc làm giản dị mỗi ngày.",
      },
      {
        title: "Trân quý bữa cơm nhà",
        desc: "Tự tay vào bếp chuẩn bị một món ăn ấm cúng cho cả nhà cùng thưởng thức.",
      },
    ],
    culturalAspect:
      "Tục thờ cúng tổ tiên và cúng xóm ở miền Trung luôn chứa chan đạo lý gia đình bền chặt, coi trọng lòng thảo thơm hơn mâm cao cỗ đầy.",
    relatedArticleId: "dien-hon-chen",
    relatedArticleTitle: "Nếp nhà và đạo hiếu nghĩa xứ Quảng - Huế",
    microAction: {
      title: "Nấu một bữa cơm ấm cúng",
      desc: "Vào bếp chuẩn bị một món canh thanh mát hay phụ giúp dọn dẹp gian bếp gia đình.",
      duration: "15 phút thực hành",
    },
  },

  "Trung Bộ-Học tập": {
    metadata: createDemoMetadata(),
    stickNumber: "25",
    region: "Trung Bộ",
    regionSub: "Đất học miền Trung",
    topic: "Học tập",
    topicTag: "Khổ luyện thành tài",
    title: "HỌC TẬP • Ý CHÍ VƯỢT KHÓ",
    quote: "Nắng lửa mưa dầm rèn chí lớn. Bền lòng dùi mài, ắt có ngày vinh hiển.",
    poem: {
      line1: "Nắng gió miền Trung hun đúc chí,",
      line2: "Đèn khuya dùi mài chữ tiền nhân.",
      line3: "Khổ tận cam lai ươm quả ngọt,",
      line4: "Rạng danh dòng họ sáng tinh thần.",
    },
    sealText: "QUẢ CẢM",
    insight: "Vượt khó",
    reflectionParagraphs: [
      "Miền Trung là cái nôi sản sinh nhiều bậc hiền tài nhờ tinh thần khổ học, 'nắng lửa mưa dầm đúc nên người'. Gian nan thử thách chính là lò luyện giúp viên ngọc trí tuệ thêm sáng ngời.",
      "Khi gặp bài vở khó khăn hay những áp lực học vấn, hãy nhớ đến truyền thống kiên cường của cha ông để vững tin tiến bước.",
    ],
    tips: [
      {
        title: "Tự học chuyên sâu",
        desc: "Dành thời gian tự suy ngẫm và giải quyết vấn đề trước khi tìm kiếm sự trợ giúp.",
      },
      {
        title: "Bền bỉ không bỏ cuộc",
        desc: "Mỗi ngày giải quyết thêm một bài toán khó để mở rộng giới hạn tư duy.",
      },
    ],
    culturalAspect:
      "Trường Quốc Học Huế và các văn từ xứ Quảng là chứng nhân lịch sử cho tinh thần học tập quật cường, trọng khí tiết và lòng yêu nước của trí thức miền Trung.",
    relatedArticleId: "dien-hon-chen",
    relatedArticleTitle: "Tinh hoa đất học miền Trung & Quốc Học Huế",
    microAction: {
      title: "Đọc 10 trang sách hữu ích",
      desc: "Mở cuốn sách bạn đang đọc dở và tập trung đọc trọn vẹn 10 trang với sự suy ngẫm sâu sắc.",
      duration: "15 phút đọc sách",
    },
  },

  "Trung Bộ-Công việc": {
    metadata: createDemoMetadata(),
    stickNumber: "27",
    region: "Trung Bộ",
    regionSub: "Biển cả miền Trung",
    topic: "Công việc",
    topicTag: "Cưỡi sóng vươn khơi",
    title: "CÔNG VIỆC • ĐÓN ĐẦU SÓNG GIÓ",
    quote: "Thuận dòng buồm lướt, vững lái vượt trùng khơi. Vững vàng tay lái, không ngại phong ba.",
    poem: {
      line1: "Thuyền ra biển lớn đón gió khơi,",
      line2: "Lòng bền trí vững mặc chơi vơi.",
      line3: "Đầu sóng ngọn gió nuôi bản lĩnh,",
      line4: "Cập bến bình yên cá bạc đầy.",
    },
    sealText: "KIÊN ĐỊNH",
    insight: "Bản lĩnh",
    reflectionParagraphs: [
      "Người dân chài miền Trung quanh năm gắn liền với biển cả, học được cách nhìn ngắm con nước, nương theo ngọn gió để vươn khơi. Trong công việc cũng vậy, thời cơ và thử thách luôn song hành.",
      "Hãy trau dồi tay nghề, chuẩn bị kỹ lưỡng về kế hoạch và giữ vững sự bình tĩnh; bạn sẽ vượt qua được những con sóng lớn trong sự nghiệp.",
    ],
    tips: [
      {
        title: "Đo lường rủi ro",
        desc: "Chuẩn bị kế hoạch dự phòng trước khi triển khai các dự án quan trọng.",
      },
      {
        title: "Đoàn kết tập thể",
        desc: "Như bạn chài cùng chèo một con thuyền, sự đồng lòng sẽ giúp vượt qua mọi sóng gió.",
      },
    ],
    culturalAspect:
      "Lễ hội Cầu Ngư và tục thờ thần Nam Hải (Cá Ông) phản ánh niềm tin vững chãi của ngư dân miền Trung vào sự bảo bọc của thiên nhiên và lòng dũng cảm khi vươn khơi bám biển.",
    relatedArticleId: "le-hoi-cau-ngu",
    relatedArticleTitle: "Lễ hội Cầu Ngư miền Trung & Tục thờ Cá Ông",
    microAction: {
      title: "Rà soát lại kế hoạch tuần",
      desc: "Kiểm tra lại tiến độ công việc, loại bỏ những việc không cần thiết và tập trung vào mục tiêu then chốt.",
      duration: "10 phút rà soát",
    },
  },

  // ==========================================
  // NAM BỘ (4 Chủ đề)
  // ==========================================
  "Nam Bộ-Bình an": {
    metadata: createDemoMetadata(),
    stickNumber: "07",
    region: "Nam Bộ",
    regionSub: "Khoáng đạt Phương Nam",
    topic: "Bình an",
    topicTag: "Thuận theo tự nhiên",
    title: "BÌNH AN • SÔNG NƯỚC HIỀN HÒA",
    quote: "Nước chảy xuôi dòng, lòng an vạn sự tỏ. Thuận theo lẽ tự nhiên ắt gặp lành.",
    poem: {
      line1: "Nước lớn nước ròng theo con nước,",
      line2: "Phù sa bồi đắp bãi bờ xanh.",
      line3: "Lòng người rộng mở như sông rộng,",
      line4: "Gặp cảnh phong ba dạ vẫn lành.",
    },
    sealText: "KHOÁNG ĐẠT",
    insight: "Bao dung",
    reflectionParagraphs: [
      "Khí chất phương Nam hào sảng, chân chất dạy ta bài học về sự cởi mở và linh hoạt. Cuộc sống như dòng sông Cửu Long luôn bồi đắp phù sa màu mỡ cho những ai biết mở lòng đón nhận.",
      "Buông bỏ những tính toán so đo vụn vặt, nhìn đời bằng con mắt phóng khoáng và nhân ái, bạn sẽ tìm thấy sự tự do và bình an tuyệt đối trong tâm hồn.",
    ],
    tips: [
      {
        title: "Sống chân thành, mộc mạc",
        desc: "Đối xử với mọi người xung quanh bằng tấm lòng phóng khoáng, không toan tính.",
      },
      {
        title: "Tự tại trước đổi thay",
        desc: "Thích nghi thuận hòa với hoàn cảnh mới như phù sa thuận dòng trôi chảy.",
      },
    ],
    culturalAspect:
      "Tâm thức Tây Nam Bộ hội tụ lòng từ bi của tín ngưỡng Bà Chúa Xứ và tinh thần trượng nghĩa, chở che cho nhau của người mở cõi phương Nam.",
    relatedArticleId: "mieu-ba-chua-xu",
    relatedArticleTitle: "Miếu Bà Chúa Xứ Núi Sam & Tâm thức bao dung Tây Nam Bộ",
    microAction: {
      title: "Cười một nụ cười rạng rỡ",
      desc: "Soi gương, thả lỏng cơ mặt và mỉm cười tự tin, gửi năng lượng tích cực đến những người bạn gặp hôm nay.",
      duration: "1 phút thực hành",
    },
  },

  "Nam Bộ-Gia đình": {
    metadata: createDemoMetadata(),
    stickNumber: "08",
    region: "Nam Bộ",
    regionSub: "Mộc mạc Phương Nam",
    topic: "Gia đình",
    topicTag: "Chân chất nghĩa tình",
    title: "GIA ĐÌNH • ĐẦM ẤM NGHĨA TÌNH",
    quote: "Ăn quả nhớ kẻ trồng cây. Tấm lòng thơm thảo, con cháu đề huề phúc ấm.",
    poem: {
      line1: "Nhà tranh vách đất mà vui vẻ,",
      line2: "Bát nước chè xanh ấm dạ người.",
      line3: "Cha mẹ thảo thơm vun gốc đức,",
      line4: "Đời con rạng rỡ tiếng cười tươi.",
    },
    sealText: "ẤM ÊM",
    insight: "Hòa thuận",
    reflectionParagraphs: [
      "Nếp nhà phương Nam mộc mạc, bình dị mà chan chứa ân tình. Người Nam Bộ coi trọng chữ hiếu qua những cử chỉ thực tế: bát canh thơm ngon mời cha mẹ, nụ cười vui vẻ giữa anh em lối xóm.",
      "Đừng để những lo toan vật chất che mờ niềm hạnh phúc giản đơn khi được ở bên cạnh những người thân yêu trong gia đình.",
    ],
    tips: [
      {
        title: "Chia sẻ niềm vui",
        desc: "Kể một câu chuyện vui trong ngày để mang lại tiếng cười cho cả nhà.",
      },
      {
        title: "Chăm sóc cha mẹ",
        desc: "Hỏi han sức khỏe hoặc xoa bóp vai cho cha mẹ sau một ngày lao động vất vả.",
      },
    ],
    culturalAspect:
      "Tập tục giỗ chạp và nếp sống làng xóm Nam Bộ luôn mở rộng cửa đón khách, thắm đượm nghĩa tình lối xóm 'tối lửa tắt đèn có nhau'.",
    relatedArticleId: "mieu-ba-chua-xu",
    relatedArticleTitle: "Nét văn hóa Nam Bộ & Tấm lòng thảo thơm",
    microAction: {
      title: "Gọi điện về cho gia đình",
      desc: "Dành 5 phút gọi điện tâm sự nhẹ nhàng cùng người thân nơi quê nhà.",
      duration: "5 phút kết nối",
    },
  },

  "Nam Bộ-Học tập": {
    metadata: createDemoMetadata(),
    stickNumber: "09",
    region: "Nam Bộ",
    regionSub: "Khai phóng Phương Nam",
    topic: "Học tập",
    topicTag: "Mở lối tri thức",
    title: "HỌC TẬP • KHAI PHÓNG TƯ DUY",
    quote: "Đi một ngày đàng học một sàng khôn. Tinh thần cởi mở, chân trời rộng mở đón tương lai.",
    poem: {
      line1: "Sông sâu biển rộng thỏa chí bay,",
      line2: "Học hỏi muôn phương trí dạn dày.",
      line3: "Mở rộng tầm nhìn theo sóng gió,",
      line4: "Dựng xây cơ nghiệp sáng ngày mai.",
    },
    sealText: "SÁNG TẠO",
    insight: "Khai phóng",
    reflectionParagraphs: [
      "Văn hóa Nam Bộ luôn mang tinh thần cởi mở, sáng tạo và tiếp thu những điều mới mẻ. Việc học tập không chỉ dừng lại trong sách vở mà là sự trải nghiệm từ thực tế đời sống muôn màu.",
      "Hãy giữ cho mình một tâm hồn tò mò, ham học hỏi và không ngại thử nghiệm những hướng đi mới trong nghiên cứu và học tập.",
    ],
    tips: [
      {
        title: "Tò mò khám phá",
        desc: "Tìm hiểu một chủ đề mới nằm ngoài chuyên môn quen thuộc của bạn.",
      },
      {
        title: "Học hỏi từ bạn bè",
        desc: "Chủ động trao đổi và học hỏi góc nhìn mới từ những người xung quanh.",
      },
    ],
    culturalAspect:
      "Tinh thần khai hoang mở cõi Nam Bộ gắn liền với khả năng thích ứng linh hoạt và sáng tạo không ngừng để làm chủ thiên nhiên và tạo dựng cuộc sống ấm no.",
    relatedArticleId: "mieu-ba-chua-xu",
    relatedArticleTitle: "Vùng đất mở cõi & Tinh thần hiếu học phóng khoáng",
    microAction: {
      title: "Ghi chép một điều mới",
      desc: "Ghi lại vào sổ tay một phát hiện hay một kiến thức thú vị mà bạn vừa học được trong ngày.",
      duration: "3 phút ghi chép",
    },
  },

  "Nam Bộ-Công việc": {
    metadata: createDemoMetadata(),
    stickNumber: "12",
    region: "Nam Bộ",
    regionSub: "Năng động Phương Nam",
    topic: "Công việc",
    topicTag: "Vạn sự hanh thông",
    title: "CÔNG VIỆC • TẤN TÀI TẤN LỘC",
    quote: "Gốc rễ vững vàng, kiên nhẫn bồi đắp. Hoa lành nở muộn nhưng bền lâu.",
    poem: {
      line1: "Sông dài xuôi chảy biển bao la,",
      line2: "Lộc biếc cành tươi rạng cửa nhà.",
      line3: "Chữ Tín làm đầu xây sự nghiệp,",
      line4: "Thành công vang dội cất bài ca.",
    },
    sealText: "THỊNH VƯỢNG",
    insight: "Phát đạt",
    reflectionParagraphs: [
      "Vùng đất Nam Bộ năng động, nghĩa tình coi trọng sự sòng phẳng, chữ Tín và sự nhạy bén trong kinh doanh làm ăn. Muốn gặt hái thành quả lớn, gốc rễ đạo đức và chất lượng công việc phải thật vững vàng.",
      "Hãy làm việc bằng cái tâm trong sáng và sự nhiệt huyết; duyên lành và cơ hội hợp tác tốt đẹp sẽ tự tìm đến với bạn.",
    ],
    tips: [
      {
        title: "Chữ Tín hàng đầu",
        desc: "Luôn giữ lời hứa và thực hiện đúng cam kết trong công việc.",
      },
      {
        title: "Chủ động hợp tác",
        desc: "Tạo dựng mối quan hệ win-win bền vững cùng các đối tác và đồng nghiệp.",
      },
    ],
    culturalAspect:
      "Tục xin xăm tại Chùa Ông (Cần Thơ) và Chùa Bà Thiên Hậu (Chợ Lớn) từ lâu là điểm tựa tâm linh cầu mong buôn may bán đắt, công việc hanh thông của thương nhân Nam Bộ.",
    relatedArticleId: "mieu-ba-chua-xu",
    relatedArticleTitle: "Thương cảng xưa & Văn hóa tín ngưỡng Chùa Ông",
    microAction: {
      title: "Gửi lời cảm ơn đối tác/đồng nghiệp",
      desc: "Gửi một lời cảm ơn chân thành đến người đã hỗ trợ bạn trong công việc gần đây.",
      duration: "2 phút thực hành",
    },
  },
};

export const getXinXamResult = (region: RegionType, topic: TopicType): XinXamResult => {
  const key = `${region}-${topic}`;
  if (XIN_XAM_RESULTS[key]) {
    return XIN_XAM_RESULTS[key];
  }

  // Smart fallback: try the same region first with "Bình an"
  const regionFallback = `${region}-Bình an`;
  if (XIN_XAM_RESULTS[regionFallback]) {
    return XIN_XAM_RESULTS[regionFallback];
  }

  // Absolute fallback
  return XIN_XAM_RESULTS["Bắc Bộ-Bình an"];
};
