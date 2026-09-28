export type MoodKey =
  | "An yên"
  | "Chênh vênh"
  | "Băn khoăn"
  | "Nôn nóng"
  | "Biết ơn"
  | "Cần điểm tựa";

export interface SignalData {
  id: string;
  mood: MoodKey;
  moodDesc: string;
  badge: string;
  poem: {
    line1: string;
    line2: string;
    subtext: string;
  };
  research: {
    title: string;
    source: string;
    region: string;
    note: string;
  };
  reflection: {
    title: string;
    highlightWord: string;
    content: string;
    advice: string;
    signalNumber: string;
  };
  action: {
    title: string;
    duration: string;
    description: string;
    buttonLabel: string;
    tag: string;
  };
  artwork: {
    tag: string;
    image: string;
    caption: string;
  };
  loadingFacts: {
    breathingText: string;
    thoughtTitle: string;
    thoughtContent: string;
    originTitle: string;
    originContent: string;
    stepText: string;
  };
  guestPreview: {
    title: string;
    message: string;
  };
}

export const MOODS_LIST: {
  key: MoodKey;
  name: string;
  desc: string;
  iconType: string;
}[] = [
  {
    key: "An yên",
    name: "An yên",
    desc: "Trái tim bình lặng, sẵn sàng đón nhận điều lành",
    iconType: "lotus",
  },
  {
    key: "Chênh vênh",
    name: "Chênh vênh",
    desc: "Cảm giác mất thăng bằng, cần một neo đậu an lành",
    iconType: "waves",
  },
  {
    key: "Băn khoăn",
    name: "Băn khoăn",
    desc: "Đứng trước ngã rẽ, cần góc nhìn sáng suốt và thấu đạt",
    iconType: "question",
  },
  {
    key: "Nôn nóng",
    name: "Nôn nóng",
    desc: "Tâm trí hối hả, cần hạ nhịp thở và chậm lại từng giây",
    iconType: "wind",
  },
  {
    key: "Biết ơn",
    name: "Biết ơn",
    desc: "Tràn đầy cảm kích với những duyên lành nhỏ bé quanh mình",
    iconType: "heart",
  },
  {
    key: "Cần điểm tựa",
    name: "Cần điểm tựa",
    desc: "Mệt mỏi sau ngày dài, muốn được vỗ về trong khoảng lặng",
    iconType: "moon",
  },
];

export const SIGNALS_DATA: Record<MoodKey, SignalData> = {
  "Chênh vênh": {
    id: "chenh-venh",
    mood: "Chênh vênh",
    moodDesc: "Cảm giác mất thăng bằng, cần một neo đậu an lành",
    badge: "BƯỚC 4 / 4 • CHIÊM NGHIỆM TRỌN VẸN",
    poem: {
      line1: "Nước trong hoa nở ngát dòng",
      line2: "Tâm an vạn nẻo bụi trần hóa sen.",
      subtext: "Nội dung minh họa kinh điển đang trong quá trình chuẩn hóa thư tịch",
    },
    research: {
      title: "VÙNG 2 • KHẢO CỨU NGUỒN GỐC & ĐỊA PHƯƠNG",
      source: "Ca dao & Lời ru châu thổ sông Hồng",
      region: "Lưu truyền dân gian vùng đồng bằng Bắc Bộ",
      note: "(Đang biên tập dữ liệu xác thực cùng Viện Nghiên cứu Di sản).",
    },
    reflection: {
      title: "VÙNG 3 • Góc Nhìn Soi Tỏ Tâm Thức",
      highlightWord: "chênh vênh",
      content:
        "Khi bạn cảm thấy chênh vênh, đó không phải là dấu hiệu bạn đang thụt lùi, mà là tâm thức đang đòi hỏi một khoảng lặng tự nhiên. Nước có lắng thì hoa mới nở thơm, tâm có tĩnh thì mọi xáo động đời sống mới trở về trật tự vốn có. Hãy cho phép mình chưa cần phải có câu trả lời ngay ngày hôm nay.",
      advice: "Gợi ý tiếp nhận: Đọc thong thả 2 lần trước khi chuyển động",
      signalNumber: "Chiêm nghiệm số #2409",
    },
    action: {
      title: "Thưởng chén nước ấm định tâm",
      duration: "3 PHÚT",
      description:
        "Rót một ly nước ấm, đặt hai bàn tay quanh thân cốc cảm nhận hơi ấm lan tỏa, uống chậm từng ngụm nhỏ và tạm thời gác lại mọi suy tính.",
      buttonLabel: "Tôi đã thực hiện hành động này ✓",
      tag: "VÙNG 4 • HÀNH ĐỘNG NUÔI TÂM",
    },
    artwork: {
      tag: "Gốm & Nước",
      image: "/images/tea_bowl.jpg",
      caption: "Họa phẩm cảm hứng: Bình yên bên giọt sương mai",
    },
    loadingFacts: {
      breathingText: "Thở ra, mỉm cười với hiện tại...",
      thoughtTitle: "TÂM NIỆM",
      thoughtContent: "Nước lắng thấy trăng tỏ, lòng tịnh ắt thấy đường.",
      originTitle: "CỘI NGUỒN",
      originContent: "Trích ý niệm từ dòng tranh mộc bản Hàng Trống.",
      stepText: "Chiết tự mượn ý gốm nung Bát Tràng...",
    },
    guestPreview: {
      title: "MẠCH NGUỒN AN YÊN",
      message:
        "Thong thả đón gió, tâm thanh tịnh thì vạn sự hanh thông. Hệ thống sẵn sàng mở ra lá quẻ dân gian chúc lành cho bước chân của bạn.",
    },
  },
  "An yên": {
    id: "an-yen",
    mood: "An yên",
    moodDesc: "Trái tim bình lặng, sẵn sàng đón nhận điều lành",
    badge: "BƯỚC 4 / 4 • CHIÊM NGHIỆM TRỌN VẸN",
    poem: {
      line1: "Gió mát trăng thanh ngàn thuở rạng",
      line2: "Lòng không vướng bận giấc nồng say.",
      subtext: "Tuyển trích ngụ ngôn và thi ca thiền gia Đại Việt thời Trần",
    },
    research: {
      title: "VÙNG 2 • KHẢO CỨU NGUỒN GỐC & ĐỊA PHƯƠNG",
      source: "Trúc Lâm Yên Tử Văn Tập",
      region: "Không gian di sản văn hóa tâm linh Yên Tử - Đông Triều",
      note: "(Tư liệu khảo cứu phối hợp hội đồng nghiên cứu Phật học Trúc Lâm).",
    },
    reflection: {
      title: "VÙNG 3 • Góc Nhìn Soi Tỏ Tâm Thức",
      highlightWord: "an yên",
      content:
        "Trạng thái an yên hôm nay là đóa hoa kết tinh từ những nhịp buông xả nhẹ nhàng. Khi tâm đã tĩnh như mặt hồ không gợn sóng, bạn có thể nhìn thấu vạn vật mà không khởi sinh âu lo. Hãy ghi nhớ cảm giác này như một chốn neo đậu an bình mỗi khi giông bão cuộc đời ùa tới.",
      advice: "Gợi ý tiếp nhận: Giữ nụ cười mỉm trên môi trong 30 giây",
      signalNumber: "Chiêm nghiệm số #1080",
    },
    action: {
      title: "Gieo nụ cười vào không gian",
      duration: "2 PHÚT",
      description:
        "Khép nhẹ mi mắt, hít sâu ba hơi thở dịu nhẹ và thầm gửi lời chúc lành đến người thân yêu hoặc vạn vật xung quanh bạn.",
      buttonLabel: "Tôi đã thực hiện hành động này ✓",
      tag: "VÙNG 4 • HÀNH ĐỘNG NUÔI TÂM",
    },
    artwork: {
      tag: "Gốm & Sen",
      image: "/images/tea_bowl.jpg",
      caption: "Họa phẩm cảm hứng: Hương hoa đầu mùa thanh khiết",
    },
    loadingFacts: {
      breathingText: "Hít vào tĩnh lặng, thở ra nhẹ nhàng...",
      thoughtTitle: "TÂM NIỆM",
      thoughtContent: "Tâm bình thế giới bình, hoa thơm tự nở ngát trời mây.",
      originTitle: "CỘI NGUỒN",
      originContent: "Lời chỉ dẫn từ điển cố danh gia gốm Chu Đậu thế kỷ XV.",
      stepText: "Chắt lọc thanh âm thiền trà sương sớm...",
    },
    guestPreview: {
      title: "MẠCH NGUỒN AN YÊN",
      message:
        "Thong thả đón gió, tâm thanh tịnh thì vạn sự hanh thông. Hệ thống sẵn sàng mở ra lá quẻ dân gian chúc lành cho bước chân của bạn.",
    },
  },
  "Băn khoăn": {
    id: "ban-khoan",
    mood: "Băn khoăn",
    moodDesc: "Đứng trước ngã rẽ, cần góc nhìn sáng suốt và thấu đạt",
    badge: "BƯỚC 4 / 4 • CHIÊM NGHIỆM TRỌN VẸN",
    poem: {
      line1: "Đường dài vạn dặm khởi đầu bước",
      line2: "Mây tỏ trăng soi lối định hình.",
      subtext: "Lời khuyên răn dân gian lưu truyền trong thư tịch cổ Nam Hà",
    },
    research: {
      title: "VÙNG 2 • KHẢO CỨU NGUỒN GỐC & ĐỊA PHƯƠNG",
      source: "Gia Định Thành Thông Chí & Tục ngữ Nam Bộ",
      region: "Không gian giao thoa văn hóa thương cảng Hội An - Sài Gòn",
      note: "(Đang đối chiếu dữ liệu văn khắc Hán Nôm cổ lục).",
    },
    reflection: {
      title: "VÙNG 3 • Góc Nhìn Soi Tỏ Tâm Thức",
      highlightWord: "băn khoăn",
      content:
        "Sự băn khoăn chứng tỏ bạn đang rất trân trọng các lựa chọn phía trước. Tiền nhân thường dạy: khi phân vân trước ngã rẽ, chớ vội chạy theo con đường ồn ào nhất, hãy lắng nghe tiếng vọng sâu kín của lương tri. Mọi quyết định xuất phát từ lòng chân thành đều mở ra trái ngọt.",
      advice: "Gợi ý tiếp nhận: Đặt tay lên lồng ngực cảm nhận nhịp đập",
      signalNumber: "Chiêm nghiệm số #3312",
    },
    action: {
      title: "Ghi lại ngã rẽ lương tâm",
      duration: "3 PHÚT",
      description:
        "Lấy giấy bút viết ra 2 lựa chọn đang khiến bạn băn khoăn nhất, bên cạnh mỗi việc hãy ghi lại giá trị chân thành bạn mong muốn giữ gìn.",
      buttonLabel: "Tôi đã thực hiện hành động này ✓",
      tag: "VÙNG 4 • HÀNH ĐỘNG NUÔI TÂM",
    },
    artwork: {
      tag: "Mộc & Giấy Dó",
      image: "/images/temple_bac_bo.jpg",
      caption: "Họa phẩm cảm hứng: Cội rễ bền bỉ soi đường chỉ lối",
    },
    loadingFacts: {
      breathingText: "Lắng tâm nghe tiếng thì thầm nội tại...",
      thoughtTitle: "TÂM NIỆM",
      thoughtContent: "Tâm có định tuệ ắt sinh, chớ ngại bước chân do dự.",
      originTitle: "CỘI NGUỒN",
      originContent: "Trích từ tục thỉnh ý tiền hiền đình làng Bắc Bộ.",
      stepText: "Soi tỏ kinh nghiệm cha ông ngàn đời...",
    },
    guestPreview: {
      title: "MẠCH NGUỒN MINH TRIẾT",
      message:
        "Mỗi khúc mắc là hạt mầm cho sự thấu đạt. Lắng đọng tâm can để tiếp nhận lời nhắc nhở chân phương từ tích xưa.",
    },
  },
  "Nôn nóng": {
    id: "non-nong",
    mood: "Nôn nóng",
    moodDesc: "Tâm trí hối hả, cần hạ nhịp thở và chậm lại từng giây",
    badge: "BƯỚC 4 / 4 • CHIÊM NGHIỆM TRỌN VẸN",
    poem: {
      line1: "Nước chảy đá mòn ngàn năm tích",
      line2: "Chậm rãi gieo mùa gặt bội thu.",
      subtext: "Ca dao nhà nông vùng phù sa châu thổ sông Hồng ngàn năm",
    },
    research: {
      title: "VÙNG 2 • KHẢO CỨU NGUỒN GỐC & ĐỊA PHƯƠNG",
      source: "Kho tàng Tục ngữ Ca dao canh nông Việt Nam",
      region: "Lưu truyền tại các làng cổ châu thổ sông Hồng và sông Đáy",
      note: "(Hiệu đính cùng nhà nghiên cứu văn hóa dân gian Việt Nam).",
    },
    reflection: {
      title: "VÙNG 3 • Góc Nhìn Soi Tỏ Tâm Thức",
      highlightWord: "nôn nóng",
      content:
        "Cơn nôn nóng thường sinh ra khi ta mong muốn kết quả xuất hiện trước khi nhân duyên chín muồi. Cây cổ thụ trăm năm không thể lớn nhanh trong một buổi sớm mai. Hãy hạ nhịp bước, kiên nhẫn bồi đắp từng hành động nhỏ nhất, quả ngọt tự khắc thành tựu.",
      advice: "Gợi ý tiếp nhận: Đứng dậy, đi bộ 10 bước thật chậm rãi",
      signalNumber: "Chiêm nghiệm số #4521",
    },
    action: {
      title: "Rửa tay thanh tẩy nhịp vội vã",
      duration: "1 PHÚT",
      description:
        "Mở vòi nước mát, để dòng nước chảy qua từng kẽ ngón tay, cảm nhận sự mát lành và buông bỏ sự căng thẳng đang tích tụ trên đôi vai.",
      buttonLabel: "Tôi đã thực hiện hành động này ✓",
      tag: "VÙNG 4 • HÀNH ĐỘNG NUÔI TÂM",
    },
    artwork: {
      tag: "Thủy & Đất Mẹ",
      image: "/images/mekong_nam_bo.jpg",
      caption: "Họa phẩm cảm hứng: Dòng sông muôn đời chở nặng êm đềm",
    },
    loadingFacts: {
      breathingText: "Thong thả nhả ra từng đợt hơi ấm...",
      thoughtTitle: "TÂM NIỆM",
      thoughtContent: "Dục tốc bất đạt, mưa dầm thấm lâu mầm xanh tươi tốt.",
      originTitle: "CỘI NGUỒN",
      originContent: "Triết lý gốm nung củi truyền thống Lái Thiêu xưa.",
      stepText: "Làm mát tâm hỏa, điều hòa khí tức...",
    },
    guestPreview: {
      title: "MẠCH NGUỒN DỊU MÁT",
      message:
        "Nắng gắt mau tàn, dòng suối mát bền bỉ tuôn trào. Hạ nhiệt âu lo để đón nhận một chỉ dẫn an lành.",
    },
  },
  "Biết ơn": {
    id: "biet-on",
    mood: "Biết ơn",
    moodDesc: "Tràn đầy cảm kích với những duyên lành nhỏ bé quanh mình",
    badge: "BƯỚC 4 / 4 • CHIÊM NGHIỆM TRỌN VẸN",
    poem: {
      line1: "Ăn quả nhớ kẻ trồng cây",
      line2: "Uống nước nhớ nguồn nghĩa dày tình sâu.",
      subtext: "Đạo lý truyền đời người Việt qua ngàn năm văn hiến",
    },
    research: {
      title: "VÙNG 2 • KHẢO CỨU NGUỒN GỐC & ĐỊA PHƯƠNG",
      source: "Quốc Âm Thi Tập & Đạo làm người đất Thăng Long",
      region: "Văn hóa ứng xử gia đình và cộng đồng đất Tràng An xưa",
      note: "(Trích từ văn bản khắc gỗ thời Lê sơ).",
    },
    reflection: {
      title: "VÙNG 3 • Góc Nhìn Soi Tỏ Tâm Thức",
      highlightWord: "biết ơn",
      content:
        "Lòng biết ơn là suối nguồn nuôi dưỡng phúc lành bền vững nhất. Khi trái tim bạn ngập tràn sự tri ân đối với những điều bình dị — chén cơm dẻo thơm, ngụm nước ngọt mát hay một ánh nhìn ấm áp — bạn đã mở toang cánh cửa đón nhận thêm nhiều phúc lộc của vũ trụ.",
      advice: "Gợi ý tiếp nhận: Nhắn một lời cảm ơn tới người bất kỳ",
      signalNumber: "Chiêm nghiệm số #7789",
    },
    action: {
      title: "Gửi tin nhắn tri ân thân tình",
      duration: "2 PHÚT",
      description:
        "Chọn một người đã từng giúp đỡ hoặc sẻ chia cùng bạn, gửi cho họ một câu hỏi thăm chân thành kèm lời cảm ơn giản dị.",
      buttonLabel: "Tôi đã thực hiện hành động này ✓",
      tag: "VÙNG 4 • HÀNH ĐỘNG NUÔI TÂM",
    },
    artwork: {
      tag: "Hương & Trầm",
      image: "/images/hue_trung_bo.jpg",
      caption: "Họa phẩm cảm hứng: Cội nguồn thiêng liêng hoa trái ngọt ngào",
    },
    loadingFacts: {
      breathingText: "Cảm tạ đất trời, cha mẹ và vạn duyên...",
      thoughtTitle: "TÂM NIỆM",
      thoughtContent: "Tâm biết ơn sinh hoa thơm cỏ lạ, lòng hoan hỷ đón nhận muôn phúc.",
      originTitle: "CỘI NGUỒN",
      originContent: "Văn bia chùa Keo Thái Bình tôn vinh đạo hiếu thuận.",
      stepText: "Dệt chữ tri ân trên từng nét mực Dó...",
    },
    guestPreview: {
      title: "MẠCH NGUỒN PHÚC LÀNH",
      message:
        "Khi lòng biết ơn tràn ngập, mọi bước chân đều trở thành điềm lành. Đón nhận hoa trái tâm hồn dịu êm.",
    },
  },
  "Cần điểm tựa": {
    id: "can-diem-tua",
    mood: "Cần điểm tựa",
    moodDesc: "Mệt mỏi sau ngày dài, muốn được vỗ về trong khoảng lặng",
    badge: "BƯỚC 4 / 4 • CHIÊM NGHIỆM TRỌN VẸN",
    poem: {
      line1: "Núi cao tựa bóng che sương gió",
      line2: "Mẹ hiền ru giấc mộng bình yên.",
      subtext: "Lời ru Bắc Bộ lưu truyền qua nhiều thế hệ mẹ Việt Nam",
    },
    research: {
      title: "VÙNG 2 • KHẢO CỨU NGUỒN GỐC & ĐỊA PHƯƠNG",
      source: "Tuyển tập Ca dao & Điệu Hát Ru Xứ Đoài",
      region: "Vùng văn hóa Xứ Đoài mây trắng - Sơn Tây cổ xưa",
      note: "(Tư liệu lưu trữ tại Thư viện Văn hóa Dân gian Việt Nam).",
    },
    reflection: {
      title: "VÙNG 3 • Góc Nhìn Soi Tỏ Tâm Thức",
      highlightWord: "cần điểm tựa",
      content:
        "Thừa nhận mình đang mệt mỏi và cần điểm tựa chính là lòng dũng cảm. Bạn không cần phải luôn kiên cường trước mọi sóng gió. Hãy ngả lưng tựa vào chiếc ghế êm, uống một ngụm trà nóng và cảm nhận rằng tổ tiên cùng mái nhà an lành luôn dang tay che chở cho bạn.",
      advice: "Gợi ý tiếp nhận: Đặt hai tay ôm chéo đôi bờ vai của mình",
      signalNumber: "Chiêm nghiệm số #5920",
    },
    action: {
      title: "Tự ôm lấy chính mình trong im lặng",
      duration: "2 PHÚT",
      description:
        "Khoanh tay nhẹ nhàng ôm lấy đôi vai bạn, nhắm mắt lại và tự nhủ: 'Hôm nay mình đã làm rất tốt rồi, giờ là lúc nghỉ ngơi'.",
      buttonLabel: "Tôi đã thực hiện hành động này ✓",
      tag: "VÙNG 4 • HÀNH ĐỘNG NUÔI TÂM",
    },
    artwork: {
      tag: "Nến & Ấm Áp",
      image: "/images/tea_bowl.jpg",
      caption: "Họa phẩm cảm hứng: Chốn nương náu bình yên sau ngày dài",
    },
    loadingFacts: {
      breathingText: "Nương náu vào hơi thở an lành này...",
      thoughtTitle: "TÂM NIỆM",
      thoughtContent: "Tâm cần chốn đỗ, lòng sẽ gặp bến bờ yêu thương rộng mở.",
      originTitle: "CỘI NGUỒN",
      originContent: "Triết lý hiếu nghĩa và nếp nhà bình an của người Việt xưa.",
      stepText: "Thắp lên ngọn đèn ấm áp xua tan cô đơn...",
    },
    guestPreview: {
      title: "MẠCH NGUỒN CHE CHỞ",
      message:
        "Tựa vào cội nguồn, buông bỏ muộn phiền. Hệ thống xin gửi đến bạn lời vỗ về ấm áp nhất hôm nay.",
    },
  },
};
