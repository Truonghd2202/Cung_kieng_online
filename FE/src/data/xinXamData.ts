export type RegionType = "Bắc Bộ" | "Trung Bộ" | "Nam Bộ";
export type TopicType = "Học tập" | "Công việc" | "Gia đình" | "Bình an";

export interface XinXamResult {
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
  "Bắc Bộ-Bình an": {
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
  "Bắc Bộ-Công việc": {
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
        title: "Giữ tinh thần tích cực",
        desc: "Đón nhận phản hồi và thử thách như bài học quý giá để hoàn thiện bản thân.",
      },
    ],
    culturalAspect:
      "Người xưa coi trọng tinh thần cần cù và chữ 'Tín' trong giao thương, lao động. Mái đình làng không chỉ là nơi tế lễ mà còn là nơi tôn vinh các bậc tổ nghề, nhắc nhở thế hệ sau về giá trị của sự chuyên tâm và lương thiện.",
    relatedArticleId: "dinh-lang-bac-bo",
    relatedArticleTitle: "Căn cốt đình làng Bắc Bộ & Tục thờ Thành hoàng",
    microAction: {
      title: "Ghi lại 3 ưu tiên cốt lõi cho ngày hôm nay",
      desc: "Dành 3 phút buổi sớm viết ra 3 việc quan trọng nhất cần hoàn thành, giải quyết dứt điểm từng việc trước khi chuyển sang việc mới.",
      duration: "3 phút thực hành",
    },
  },
  "Bắc Bộ-Học tập": {
    stickNumber: "07",
    region: "Bắc Bộ",
    regionSub: "Trầm mặc Xứ Bắc",
    topic: "Học tập",
    topicTag: "Khởi sáng tri thức",
    title: "HỌC TẬP • MINH TRIẾT THÔNG TUỆ",
    quote: "Học như thuyền bơi ngược nước, không tiến ắt lùi. Khiêm cung đón nhận, trí tuệ tự thông.",
    poem: {
      line1: "Sách mở ngàn trang rạng ánh đèn,",
      line2: "Tâm hồn thanh khiết tựa đài sen.",
      line3: "Trí sâu hiểu rộng ngời nhân nghĩa,",
      line4: "Mỗi bước đi lên sáng một phen.",
    },
    sealText: "TINH TẤN",
    insight: "Mở lòng",
    reflectionParagraphs: [
      "Học vấn không chỉ là tích lũy kiến thức từ trang sách, mà là quá trình mở rộng dung lượng tâm hồn để thấu hiểu vạn vật. Giữ tâm thế của một chiếc cốc rỗng, bạn sẽ tiếp nhận được những nguồn tri thức tinh hoa nhất.",
    ],
    tips: [
      {
        title: "Lắng nghe không định kiến",
        desc: "Tiếp thu ý kiến đa chiều để mở rộng góc nhìn học thuật và đời sống.",
      },
      {
        title: "Suy ngẫm sau khi đọc",
        desc: "Dành thời gian đúc kết lại những điều tâm đắc nhất sau mỗi bài học.",
      },
    ],
    culturalAspect:
      "Văn hóa Bắc Bộ thấm đượm truyền thống hiếu học của đất Kinh Kỳ - Thăng Long và các làng khoa bảng xứ Kinh Bắc, nơi tri thức luôn gắn liền với nhân cách và lòng yêu nước thương nòi.",
    relatedArticleId: "tien-dung-chu-dong-tu",
    relatedArticleTitle: "Huyền tích Tiên Dung - Chử Đồng Tử: Đạo hiếu & Chân tình",
    microAction: {
      title: "Đọc 10 trang sách với sự chú tâm trọn vẹn",
      desc: "Tắt thông báo điện thoại, ngồi ngay ngắn bên tách trà ấm và thưởng thức 10 trang sách yêu thích.",
      duration: "10 phút thực hành",
    },
  },
  "Bắc Bộ-Gia đình": {
    stickNumber: "09",
    region: "Bắc Bộ",
    regionSub: "Trầm mặc Xứ Bắc",
    topic: "Gia đình",
    topicTag: "Mái ấm an hòa",
    title: "GIA ĐÌNH • THUẬN HÒA ẤM ÊM",
    quote: "Gia hòa vạn sự hưng. Lấy lòng hiếu đễ làm gốc, nếp nhà bền vững ngàn năm.",
    poem: {
      line1: "Cây có cội mới xanh cành thắm lá,",
      line2: "Nước có nguồn mới tỏa khắp sông sâu.",
      line3: "Ơn sinh thành dưỡng dục tựa biển thâu,",
      line4: "Gia đạo thuận hòa muôn thuở vững.",
    },
    sealText: "HÒA HỢP",
    insight: "Tri ân",
    reflectionParagraphs: [
      "Mái ấm gia đình là chốn nương náu bình yên nhất sau mọi giông bão cuộc đời. Đôi khi những cử chỉ quan tâm nhỏ nhặt, lời hỏi han chân thành lại có sức mạnh hàn gắn mọi khoảng cách vô hình.",
    ],
    tips: [
      {
        title: "Dành thời gian chất lượng",
        desc: "Hiện diện trọn vẹn bên mâm cơm gia đình, không để thiết bị công nghệ làm gián đoạn.",
      },
      {
        title: "Lắng nghe thế hệ trước",
        desc: "Kiên nhẫn lắng nghe những lời dặn dò, câu chuyện xưa cũ của ông bà, cha mẹ.",
      },
    ],
    culturalAspect:
      "Nếp nhà gia phong Bắc Bộ coi trọng tôn ti trật tự và tình làng nghĩa xóm, lấy đạo hiếu làm thước đo phẩm hạnh cao quý nhất của con người.",
    relatedArticleId: "den-hung",
    relatedArticleTitle: "Hội Đền Hùng & Tín ngưỡng thờ cúng Hùng Vương",
    microAction: {
      title: "Gửi một tin nhắn yêu thương đến người thân",
      desc: "Viết vài dòng hỏi thăm sức khỏe cha mẹ hoặc anh chị em trong gia đình với sự chân thành.",
      duration: "2 phút thực hành",
    },
  },
  "Trung Bộ-Bình an": {
    stickNumber: "02",
    region: "Trung Bộ",
    regionSub: "Nét Giao thoa Xứ Huế & Miền Trung",
    topic: "Bình an",
    topicTag: "Tâm sáng an nhiên",
    title: "BÌNH AN • AN ĐỊNH NHƯ NƯỚC",
    quote: "Sông sâu tĩnh lặng, lúa chín cúi đầu. Giữ tâm trầm tĩnh trước sóng gió phong trần.",
    poem: {
      line1: "Sông Hương lững lờ trôi êm ả,",
      line2: "Chuông chùa Thiên Mụ thoảng chiều buông.",
      line3: "Rũ sạch bụi trần bao vất vả,",
      line4: "Lòng sáng trong ngần ánh nguyệt suông.",
    },
    sealText: "TĨNH TÂM",
    insight: "Khoan hòa",
    reflectionParagraphs: [
      "Chất trầm mặc của xứ Huế nhắc nhở ta về giá trị của sự chậm rãi và chiều sâu nội cảm. Bình an không đến từ việc trốn tránh khó khăn, mà từ khả năng đứng vững vàng giữa muôn trùng thử thách.",
    ],
    tips: [
      {
        title: "Hít thở nhịp nhàng",
        desc: "Thực hành hít thở sâu mỗi khi cảm thấy căng thẳng hay lo âu xuất hiện.",
      },
      {
        title: "Bao dung với chính mình",
        desc: "Chấp nhận những thiếu sót và kiên nhẫn hoàn thiện từng ngày.",
      },
    ],
    culturalAspect:
      "Văn hóa miền Trung là sự giao hòa giữa nếp sống cung đình trầm tư và sức sống kiên cường của cư dân vùng nắng gió, luôn giữ trọn niềm tin hướng thiện.",
    relatedArticleId: "dien-hon-chen",
    relatedArticleTitle: "Nét trầm mặc điện Hòn Chén & Lễ Mẹ Thiên Y A Na",
    microAction: {
      title: "Ngồi tĩnh lặng thưởng thức một chén trà",
      desc: "Uống từng ngụm chậm rãi, cảm nhận hơi ấm và hương thơm dịu nhẹ để đưa tâm về với thân.",
      duration: "5 phút thực hành",
    },
  },
  "Nam Bộ-Bình an": {
    stickNumber: "05",
    region: "Nam Bộ",
    regionSub: "Hồn Phù sa Khoáng đạt Phương Nam",
    topic: "Bình an",
    topicTag: "Tâm sáng an nhiên",
    title: "BÌNH AN • HÀO SẢNG & BAO DUNG",
    quote: "Đất lành chim đậu, lòng rộng đường thênh thang. Buông bỏ nhỏ nhen, đón nhận phúc lành.",
    poem: {
      line1: "Nước lớn nước ròng theo con nước,",
      line2: "Phù sa bồi đắp bãi bờ xanh.",
      line3: "Lòng người rộng mở như sông rộng,",
      line4: "Gặp cảnh phong ba dạ vẫn lành.",
    },
    sealText: "KHOÁNG ĐẠT",
    insight: "Bao dung",
    reflectionParagraphs: [
      "Khí chất phương Nam hào sảng, chân chất dạy ta bài học về sự cởi mở và linh hoạt. Cuộc sống như dòng sông Cửu Long luôn bồi đắp phù sa mầu mỡ cho những ai biết mở lòng đón nhận.",
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
      "Tâm thức Tây Nam Bộ hội tụ lòng từ bi của tín ngưỡng Bà Chúa Xứ và tinh thần trượng nghĩa, chở che cho nhau của người mở cõi.",
    relatedArticleId: "mieu-ba-chua-xu",
    relatedArticleTitle: "Miếu Bà Chúa Xứ Núi Sam & Tâm thức bao dung Tây Nam Bộ",
    microAction: {
      title: "Cười một nụ cười rạng rỡ chào ngày mới",
      desc: "Soi gương, thả lỏng cơ mặt và mỉm cười tự tin, gửi năng lượng tích cực đến những người bạn gặp.",
      duration: "1 phút thực hành",
    },
  },
};

export const getXinXamResult = (region: RegionType, topic: TopicType): XinXamResult => {
  const key = `${region}-${topic}`;
  if (XIN_XAM_RESULTS[key]) {
    return XIN_XAM_RESULTS[key];
  }
  // Fallback to default
  return XIN_XAM_RESULTS["Bắc Bộ-Bình an"];
};
