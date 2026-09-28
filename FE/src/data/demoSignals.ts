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

export const ALL_SIGNALS: SignalData[] = [
  // 1. CHÊNH VÊNH - Signal 1
  {
    id: "chenh-venh-1",
    mood: "Chênh vênh",
    moodDesc: "Cảm giác mất thăng bằng, cần một neo đậu an lành",
    badge: "BƯỚC 4 / 4 • CHIÊM NGHIỆM TRỌN VẸN",
    poem: {
      line1: "Nước trong hoa nở ngát dòng",
      line2: "Tâm an vạn nẻo bụi trần hóa sen.",
      subtext: "Nội dung biên soạn minh họa",
    },
    research: {
      title: "VÙNG 2 • TƯ LIỆU THAM KHẢO & KHẢO CỨU",
      source: "Nội dung biên soạn minh họa",
      region: "Không gian văn hóa truyền thống Việt Nam",
      note: "(Nội dung biên soạn minh họa cho sản phẩm thử nghiệm, chưa qua đối chiếu nguồn chính thức).",
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
      buttonLabel: "Đánh dấu đã thực hiện hành động này ✓",
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
      originTitle: "GỢI NHẮC CỘI NGUỒN",
      originContent: "Nội dung biên soạn minh họa gợi nhắc nếp sống và triết lý dân gian.",
      stepText: "Chắt lọc thanh âm tĩnh tại từ mạch nguồn văn hóa...",
    },
    guestPreview: {
      title: "MẠCH NGUỒN AN YÊN",
      message:
        "Thong thả đón gió, tâm thanh tịnh thì vạn sự hanh thông. Hệ thống sẵn sàng mở ra lá quẻ dân gian chúc lành cho bước chân của bạn.",
    },
  },
  // 1. CHÊNH VÊNH - Signal 2
  {
    id: "chenh-venh-2",
    mood: "Chênh vênh",
    moodDesc: "Cảm giác mất thăng bằng, cần một neo đậu an lành",
    badge: "BƯỚC 4 / 4 • CHIÊM NGHIỆM TRỌN VẸN",
    poem: {
      line1: "Gió lay cành trúc bên đồi",
      line2: "Cội sâu rễ chắc mặc đời chuyển rung.",
      subtext: "Nội dung biên soạn minh họa",
    },
    research: {
      title: "VÙNG 2 • TƯ LIỆU THAM KHẢO & KHẢO CỨU",
      source: "Nội dung biên soạn minh họa",
      region: "Không gian văn hóa truyền thống Việt Nam",
      note: "(Nội dung biên soạn minh họa cho sản phẩm thử nghiệm, chưa qua đối chiếu nguồn chính thức).",
    },
    reflection: {
      title: "VÙNG 3 • Góc Nhìn Soi Tỏ Tâm Thức",
      highlightWord: "chênh vênh",
      content:
        "Cành trúc ngả nghiêng theo gió nhưng chẳng bao giờ gãy đổ bởi rễ đã bám sâu vào lòng đất mẹ. Chênh vênh chỉ là lớp sóng mặt ngoài, phẩm giá và bản lĩnh nội tại bên trong bạn vẫn vẹn nguyên vững chãi. Hãy hít một hơi thật sâu và tự nhắc nhở bản thân về cội nguồn bền bỉ này.",
      advice: "Gợi ý tiếp nhận: Đặt bàn chân trần chạm sàn nhà thật vững",
      signalNumber: "Chiêm nghiệm số #2410",
    },
    action: {
      title: "Đứng vững chãi như rễ tre 2 phút",
      duration: "2 PHÚT",
      description:
        "Tháo giày dép, đứng thẳng lưng hai chân mở rộng bằng vai, cảm nhận lòng bàn chân tiếp xúc mặt đất vững chắc, hít thở sâu thả lỏng vai.",
      buttonLabel: "Đánh dấu đã thực hiện hành động này ✓",
      tag: "VÙNG 4 • HÀNH ĐỘNG NUÔI TÂM",
    },
    artwork: {
      tag: "Mộc & Trúc",
      image: "/images/temple_bac_bo.jpg",
      caption: "Họa phẩm cảm hứng: Cội trúc hiên chùa đón gió ngàn",
    },
    loadingFacts: {
      breathingText: "Hít sâu kiên định, thở nhẹ an lành...",
      thoughtTitle: "TÂM NIỆM",
      thoughtContent: "Tâm bất biến giữa dòng đời vạn biến.",
      originTitle: "GỢI NHẮC CỘI NGUỒN",
      originContent: "Nội dung biên soạn minh họa gợi nhắc nếp sống và triết lý dân gian.",
      stepText: "Soi tỏ sức mạnh tiềm ẩn trong im lặng...",
    },
    guestPreview: {
      title: "MẠCH NGUỒN VỮNG CHÃI",
      message:
        "Dẫu gió ngả nghiêng, tâm bạn vẫn là một cội nguồn bất biến. Đón nhận tín hiệu neo giữ an bình cho hôm nay.",
    },
  },

  // 2. AN YÊN - Signal 1
  {
    id: "an-yen-1",
    mood: "An yên",
    moodDesc: "Trái tim bình lặng, sẵn sàng đón nhận điều lành",
    badge: "BƯỚC 4 / 4 • CHIÊM NGHIỆM TRỌN VẸN",
    poem: {
      line1: "Gió mát trăng thanh ngàn thuở rạng",
      line2: "Lòng không vướng bận giấc nồng say.",
      subtext: "Nội dung biên soạn minh họa",
    },
    research: {
      title: "VÙNG 2 • TƯ LIỆU THAM KHẢO & KHẢO CỨU",
      source: "Nội dung biên soạn minh họa",
      region: "Không gian văn hóa truyền thống Việt Nam",
      note: "(Nội dung biên soạn minh họa cho sản phẩm thử nghiệm, chưa qua đối chiếu nguồn chính thức).",
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
      buttonLabel: "Đánh dấu đã thực hiện hành động này ✓",
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
      originTitle: "GỢI NHẮC CỘI NGUỒN",
      originContent: "Nội dung biên soạn minh họa gợi nhắc nếp sống và triết lý dân gian.",
      stepText: "Chắt lọc thanh âm thiền trà sương sớm...",
    },
    guestPreview: {
      title: "MẠCH NGUỒN AN YÊN",
      message:
        "Thong thả đón gió, tâm thanh tịnh thì vạn sự hanh thông. Hệ thống sẵn sàng mở ra lá quẻ dân gian chúc lành cho bước chân của bạn.",
    },
  },
  // 2. AN YÊN - Signal 2
  {
    id: "an-yen-2",
    mood: "An yên",
    moodDesc: "Trái tim bình lặng, sẵn sàng đón nhận điều lành",
    badge: "BƯỚC 4 / 4 • CHIÊM NGHIỆM TRỌN VẸN",
    poem: {
      line1: "Sớm mai mây lượn đầu non biếc",
      line2: "Tách trà nghi ngút nhẹ lòng son.",
      subtext: "Nội dung biên soạn minh họa",
    },
    research: {
      title: "VÙNG 2 • TƯ LIỆU THAM KHẢO & KHẢO CỨU",
      source: "Nội dung biên soạn minh họa",
      region: "Không gian văn hóa truyền thống Việt Nam",
      note: "(Nội dung biên soạn minh họa cho sản phẩm thử nghiệm, chưa qua đối chiếu nguồn chính thức).",
    },
    reflection: {
      title: "VÙNG 3 • Góc Nhìn Soi Tỏ Tâm Thức",
      highlightWord: "an yên",
      content:
        "Niềm an yên đích thực không nằm ở chốn không có tiếng ồn, mà nằm ở chỗ giữa bao tiếng ồn ta vẫn giữ được nhịp thở khoan thai. Tách trà ấm trên tay chính là bài học hiện diện trọn vẹn trong khoảnh khắc này.",
      advice: "Gợi ý tiếp nhận: Nhìn ra bầu trời hoặc một bóng cây xanh",
      signalNumber: "Chiêm nghiệm số #1081",
    },
    action: {
      title: "Mở rộng tầm mắt nhìn mây trời",
      duration: "1 PHÚT",
      description:
        "Bước lại gần cửa sổ, ngước nhìn vòm trời hoặc một tán cây xanh, hít thở không khí tự nhiên và cảm nhận sự bao la của đất trời.",
      buttonLabel: "Đánh dấu đã thực hiện hành động này ✓",
      tag: "VÙNG 4 • HÀNH ĐỘNG NUÔI TÂM",
    },
    artwork: {
      tag: "Sơn & Thủy",
      image: "/images/temple_bac_bo.jpg",
      caption: "Họa phẩm cảm hứng: Non xanh nước biếc một màu thảnh thơi",
    },
    loadingFacts: {
      breathingText: "Hơi thở nhẹ tênh như áng mây trôi...",
      thoughtTitle: "TÂM NIỆM",
      thoughtContent: "Tâm rộng lượng thì đời thênh thang.",
      originTitle: "GỢI NHẮC CỘI NGUỒN",
      originContent: "Nội dung biên soạn minh họa gợi nhắc nếp sống và triết lý dân gian.",
      stepText: "Mở rộng không gian tĩnh lặng trong lồng ngực...",
    },
    guestPreview: {
      title: "MẠCH NGUỒN KHOÁNG ĐẠT",
      message:
        "Tâm hồn bạn lúc này như bầu trời mùa thu trong vắt. Tiếp tục nuôi dưỡng đóa an nhiên này mỗi ngày.",
    },
  },

  // 3. BĂN KHOĂN - Signal 1
  {
    id: "ban-khoan-1",
    mood: "Băn khoăn",
    moodDesc: "Đứng trước ngã rẽ, cần góc nhìn sáng suốt và thấu đạt",
    badge: "BƯỚC 4 / 4 • CHIÊM NGHIỆM TRỌN VẸN",
    poem: {
      line1: "Đường dài vạn dặm khởi đầu bước",
      line2: "Mây tỏ trăng soi lối định hình.",
      subtext: "Nội dung biên soạn minh họa",
    },
    research: {
      title: "VÙNG 2 • TƯ LIỆU THAM KHẢO & KHẢO CỨU",
      source: "Nội dung biên soạn minh họa",
      region: "Không gian văn hóa truyền thống Việt Nam",
      note: "(Nội dung biên soạn minh họa cho sản phẩm thử nghiệm, chưa qua đối chiếu nguồn chính thức).",
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
      buttonLabel: "Đánh dấu đã thực hiện hành động này ✓",
      tag: "VÙNG 4 • HÀNH ĐỘNG NUÔI TÂM",
    },
    artwork: {
      tag: "Mộc & Giấy Dó",
      image: "/images/do_paper_still_life.jpg",
      caption: "Họa phẩm cảm hứng: Cội rễ bền bỉ soi đường chỉ lối",
    },
    loadingFacts: {
      breathingText: "Lắng tâm nghe tiếng thì thầm nội tại...",
      thoughtTitle: "TÂM NIỆM",
      thoughtContent: "Tâm có định tuệ ắt sinh, chớ ngại bước chân do dự.",
      originTitle: "GỢI NHẮC CỘI NGUỒN",
      originContent: "Nội dung biên soạn minh họa gợi nhắc nếp sống và triết lý dân gian.",
      stepText: "Soi tỏ kinh nghiệm cha ông ngàn đời...",
    },
    guestPreview: {
      title: "MẠCH NGUỒN MINH TRIẾT",
      message:
        "Mỗi khúc mắc là hạt mầm cho sự thấu đạt. Lắng đọng tâm can để tiếp nhận lời nhắc nhở chân phương từ tích xưa.",
    },
  },
  // 3. BĂN KHOĂN - Signal 2
  {
    id: "ban-khoan-2",
    mood: "Băn khoăn",
    moodDesc: "Đứng trước ngã rẽ, cần góc nhìn sáng suốt và thấu đạt",
    badge: "BƯỚC 4 / 4 • CHIÊM NGHIỆM TRỌN VẸN",
    poem: {
      line1: "Gương trong không bụi soi tường tận",
      line2: "Dạ sáng như sao tỏ bước đường.",
      subtext: "Nội dung biên soạn minh họa",
    },
    research: {
      title: "VÙNG 2 • TƯ LIỆU THAM KHẢO & KHẢO CỨU",
      source: "Nội dung biên soạn minh họa",
      region: "Không gian văn hóa truyền thống Việt Nam",
      note: "(Nội dung biên soạn minh họa cho sản phẩm thử nghiệm, chưa qua đối chiếu nguồn chính thức).",
    },
    reflection: {
      title: "VÙNG 3 • Góc Nhìn Soi Tỏ Tâm Thức",
      highlightWord: "băn khoăn",
      content:
        "Muốn lau sạch tấm gương soi, trước hết phải đợi cơn gió bụi ngừng thổi. Băn khoăn không thể giải quyết bằng sự bối rối dồn dập. Hãy dừng lại vài phút, để tâm trí nguội bớt; đáp án chân xác nhất thường xuất hiện khi bạn thôi căng thẳng tìm kiếm.",
      advice: "Gợi ý tiếp nhận: Nhắm mắt đếm chậm từ 10 lùi về 1",
      signalNumber: "Chiêm nghiệm số #3313",
    },
    action: {
      title: "Đếm nhịp thở 10 đến 1",
      duration: "2 PHÚT",
      description:
        "Ngồi thẳng lưng, nhắm mắt, hít vào thở ra đếm 10, tiếp tục đếm ngược dần về 1 để đưa tâm trí về trạng thái trung tính sáng suốt.",
      buttonLabel: "Đánh dấu đã thực hiện hành động này ✓",
      tag: "VÙNG 4 • HÀNH ĐỘNG NUÔI TÂM",
    },
    artwork: {
      tag: "Đồng & Gương",
      image: "/images/tea_bowl.jpg",
      caption: "Họa phẩm cảm hứng: Gương đồng soi tỏ lòng chân thật",
    },
    loadingFacts: {
      breathingText: "Gạt bỏ bụi mờ, tâm trí sáng tỏ...",
      thoughtTitle: "TÂM NIỆM",
      thoughtContent: "Tâm tịnh như nước hồ mùa thu.",
      originTitle: "GỢI NHẮC CỘI NGUỒN",
      originContent: "Nội dung biên soạn minh họa gợi nhắc nếp sống và triết lý dân gian.",
      stepText: "Soi tỏ lòng mình trước khi định đoạt...",
    },
    guestPreview: {
      title: "MẠCH NGUỒN SÁNG SUỐT",
      message:
        "Bụi mờ tan biến thì đường đi tự tỏ tường. Đón nhận tín hiệu khai tâm từ lời người xưa.",
    },
  },

  // 4. NÔN NÓNG - Signal 1
  {
    id: "non-nong-1",
    mood: "Nôn nóng",
    moodDesc: "Tâm trí hối hả, cần hạ nhịp thở và chậm lại từng giây",
    badge: "BƯỚC 4 / 4 • CHIÊM NGHIỆM TRỌN VẸN",
    poem: {
      line1: "Nước chảy đá mòn ngàn năm tích",
      line2: "Chậm rãi gieo mùa gặt bội thu.",
      subtext: "Nội dung biên soạn minh họa",
    },
    research: {
      title: "VÙNG 2 • TƯ LIỆU THAM KHẢO & KHẢO CỨU",
      source: "Nội dung biên soạn minh họa",
      region: "Không gian văn hóa truyền thống Việt Nam",
      note: "(Nội dung biên soạn minh họa cho sản phẩm thử nghiệm, chưa qua đối chiếu nguồn chính thức).",
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
      buttonLabel: "Đánh dấu đã thực hiện hành động này ✓",
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
      originTitle: "GỢI NHẮC CỘI NGUỒN",
      originContent: "Nội dung biên soạn minh họa gợi nhắc nếp sống và triết lý dân gian.",
      stepText: "Làm mát tâm hỏa, điều hòa khí tức...",
    },
    guestPreview: {
      title: "MẠCH NGUỒN DỊU MÁT",
      message:
        "Nắng gắt mau tàn, dòng suối mát bền bỉ tuôn trào. Hạ nhiệt âu lo để đón nhận một chỉ dẫn an lành.",
    },
  },
  // 4. NÔN NÓNG - Signal 2
  {
    id: "non-nong-2",
    mood: "Nôn nóng",
    moodDesc: "Tâm trí hối hả, cần hạ nhịp thở và chậm lại từng giây",
    badge: "BƯỚC 4 / 4 • CHIÊM NGHIỆM TRỌN VẸN",
    poem: {
      line1: "Ủ men rượu nếp chờ trăng sáng",
      line2: "Nước đủ hương nồng dạ mới say.",
      subtext: "Nội dung biên soạn minh họa",
    },
    research: {
      title: "VÙNG 2 • TƯ LIỆU THAM KHẢO & KHẢO CỨU",
      source: "Nội dung biên soạn minh họa",
      region: "Không gian văn hóa truyền thống Việt Nam",
      note: "(Nội dung biên soạn minh họa cho sản phẩm thử nghiệm, chưa qua đối chiếu nguồn chính thức).",
    },
    reflection: {
      title: "VÙNG 3 • Góc Nhìn Soi Tỏ Tâm Thức",
      highlightWord: "nôn nóng",
      content:
        "Men rượu cần thời gian ủ kín trong chum sành mới dậy mùi thơm nức. Đốt cháy giai đoạn chỉ làm hỏng cả mẻ ủ quý. Sự việc bạn đang chờ đợi cũng vậy, hãy tin tưởng vào quy luật thời gian của đất trời.",
      advice: "Gợi ý tiếp nhận: Hít sâu 4 nhịp, thở ra 6 nhịp thật chậm",
      signalNumber: "Chiêm nghiệm số #4522",
    },
    action: {
      title: "Thả lỏng khớp vai và hàm",
      duration: "2 PHÚT",
      description:
        "Nhận diện xem quai hàm có đang nghiến chặt không, vai có đang co rút không. Thả lỏng cơ hàm, xoay nhẹ khớp vai 5 vòng theo chiều kim đồng hồ.",
      buttonLabel: "Đánh dấu đã thực hiện hành động này ✓",
      tag: "VÙNG 4 • HÀNH ĐỘNG NUÔI TÂM",
    },
    artwork: {
      tag: "Gốm & Men",
      image: "/images/pottery_artisan.jpg",
      caption: "Họa phẩm cảm hứng: Chum sành ủ men thời gian mộc mạc",
    },
    loadingFacts: {
      breathingText: "Hạ nhịp, buông lỏng toàn thân...",
      thoughtTitle: "TÂM NIỆM",
      thoughtContent: "Ủ kỹ men nồng, thơm ngát ngàn thu.",
      originTitle: "GỢI NHẮC CỘI NGUỒN",
      originContent: "Nội dung biên soạn minh họa gợi nhắc nếp sống và triết lý dân gian.",
      stepText: "Chờ đợi cũng là một dạng tu dưỡng bản lĩnh...",
    },
    guestPreview: {
      title: "MẠCH NGUỒN KIÊN ĐỊNH",
      message:
        "Chậm lại một nhịp để đi xa vạn dặm. Nhận lấy lời nhắn lành giúp lòng bạn dịu lại.",
    },
  },

  // 5. BIẾT ƠN - Signal 1
  {
    id: "biet-on-1",
    mood: "Biết ơn",
    moodDesc: "Tràn đầy cảm kích với những duyên lành nhỏ bé quanh mình",
    badge: "BƯỚC 4 / 4 • CHIÊM NGHIỆM TRỌN VẸN",
    poem: {
      line1: "Ăn quả nhớ kẻ trồng cây",
      line2: "Uống nước nhớ nguồn nghĩa dày tình sâu.",
      subtext: "Nội dung biên soạn minh họa",
    },
    research: {
      title: "VÙNG 2 • TƯ LIỆU THAM KHẢO & KHẢO CỨU",
      source: "Nội dung biên soạn minh họa",
      region: "Không gian văn hóa truyền thống Việt Nam",
      note: "(Nội dung biên soạn minh họa cho sản phẩm thử nghiệm, chưa qua đối chiếu nguồn chính thức).",
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
      buttonLabel: "Đánh dấu đã thực hiện hành động này ✓",
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
      originTitle: "GỢI NHẮC CỘI NGUỒN",
      originContent: "Nội dung biên soạn minh họa gợi nhắc nếp sống và triết lý dân gian.",
      stepText: "Dệt chữ tri ân trên từng nét mực mộc mạc...",
    },
    guestPreview: {
      title: "MẠCH NGUỒN PHÚC LÀNH",
      message:
        "Khi lòng biết ơn tràn ngập, mọi bước chân đều trở thành điềm lành. Đón nhận hoa trái tâm hồn dịu êm.",
    },
  },
  // 5. BIẾT ƠN - Signal 2
  {
    id: "biet-on-2",
    mood: "Biết ơn",
    moodDesc: "Tràn đầy cảm kích với những duyên lành nhỏ bé quanh mình",
    badge: "BƯỚC 4 / 4 • CHIÊM NGHIỆM TRỌN VẸN",
    poem: {
      line1: "Gieo hạt mầm thơm vào đất ẩm",
      line2: "Cảm tạ trời mây giọt sương lành.",
      subtext: "Nội dung biên soạn minh họa",
    },
    research: {
      title: "VÙNG 2 • TƯ LIỆU THAM KHẢO & KHẢO CỨU",
      source: "Nội dung biên soạn minh họa",
      region: "Không gian văn hóa truyền thống Việt Nam",
      note: "(Nội dung biên soạn minh họa cho sản phẩm thử nghiệm, chưa qua đối chiếu nguồn chính thức).",
    },
    reflection: {
      title: "VÙNG 3 • Góc Nhìn Soi Tỏ Tâm Thức",
      highlightWord: "biết ơn",
      content:
        "Người xưa tin rằng: đất cho ta mùa màng, trời cho ta mưa thuận gió hòa, lòng biết ơn biến một bữa cơm đạm bạc thành đại tiệc của sự sum vầy. Giữ được sự biết ơn là giữ được gia tài bình an lớn nhất đời người.",
      advice: "Gợi ý tiếp nhận: Đặt tay lên trái tim thầm cảm ơn bản thân",
      signalNumber: "Chiêm nghiệm số #7790",
    },
    action: {
      title: "Tự cảm ơn chính cơ thể mình",
      duration: "1 PHÚT",
      description:
        "Đặt hai tay lên ngực áo, cảm nhận nhịp đập bền bỉ không ngừng nghỉ của trái tim và thầm cảm ơn cơ thể đã kiên cường đồng hành cùng bạn suốt bao năm tháng.",
      buttonLabel: "Đánh dấu đã thực hiện hành động này ✓",
      tag: "VÙNG 4 • HÀNH ĐỘNG NUÔI TÂM",
    },
    artwork: {
      tag: "Sen & Nước",
      image: "/images/tea_bowl.jpg",
      caption: "Họa phẩm cảm hứng: Chén trà thơm đượm tấm lòng thảo thơm",
    },
    loadingFacts: {
      breathingText: "Nhịp đập chân thành, tri ân vạn vật...",
      thoughtTitle: "TÂM NIỆM",
      thoughtContent: "Thảo thơm ắt gặp người hiền, hạt lành nảy nở muôn duyên.",
      originTitle: "GỢI NHẮC CỘI NGUỒN",
      originContent: "Nội dung biên soạn minh họa gợi nhắc nếp sống và triết lý dân gian.",
      stepText: "Gieo mầm bình an vào từng hơi thở...",
    },
    guestPreview: {
      title: "MẠCH NGUỒN THẢO THƠM",
      message:
        "Biết ơn mở rộng dung lượng trái tim. Chúc cho tâm thức bạn luôn đong đầy niềm hân hoan an lành.",
    },
  },

  // 6. CẦN ĐIỂM TỰA - Signal 1
  {
    id: "can-diem-tua-1",
    mood: "Cần điểm tựa",
    moodDesc: "Mệt mỏi sau ngày dài, muốn được vỗ về trong khoảng lặng",
    badge: "BƯỚC 4 / 4 • CHIÊM NGHIỆM TRỌN VẸN",
    poem: {
      line1: "Núi cao tựa bóng che sương gió",
      line2: "Mẹ hiền ru giấc mộng bình yên.",
      subtext: "Nội dung biên soạn minh họa",
    },
    research: {
      title: "VÙNG 2 • TƯ LIỆU THAM KHẢO & KHẢO CỨU",
      source: "Nội dung biên soạn minh họa",
      region: "Không gian văn hóa truyền thống Việt Nam",
      note: "(Nội dung biên soạn minh họa cho sản phẩm thử nghiệm, chưa qua đối chiếu nguồn chính thức).",
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
      buttonLabel: "Đánh dấu đã thực hiện hành động này ✓",
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
      originTitle: "GỢI NHẮC CỘI NGUỒN",
      originContent: "Nội dung biên soạn minh họa gợi nhắc nếp sống và triết lý dân gian.",
      stepText: "Thắp lên ngọn đèn ấm áp xua tan cô đơn...",
    },
    guestPreview: {
      title: "MẠCH NGUỒN CHE CHỞ",
      message:
        "Tựa vào cội nguồn, buông bỏ muộn phiền. Hệ thống xin gửi đến bạn lời vỗ về ấm áp nhất hôm nay.",
    },
  },
  // 6. CẦN ĐIỂM TỰA - Signal 2
  {
    id: "can-diem-tua-2",
    mood: "Cần điểm tựa",
    moodDesc: "Mệt mỏi sau ngày dài, muốn được vỗ về trong khoảng lặng",
    badge: "BƯỚC 4 / 4 • CHIÊM NGHIỆM TRỌN VẸN",
    poem: {
      line1: "Mái hiên che chở giọt mưa sa",
      line2: "Bếp lửa nhà ai ấm mái nhà.",
      subtext: "Nội dung biên soạn minh họa",
    },
    research: {
      title: "VÙNG 2 • TƯ LIỆU THAM KHẢO & KHẢO CỨU",
      source: "Nội dung biên soạn minh họa",
      region: "Không gian văn hóa truyền thống Việt Nam",
      note: "(Nội dung biên soạn minh họa cho sản phẩm thử nghiệm, chưa qua đối chiếu nguồn chính thức).",
    },
    reflection: {
      title: "VÙNG 3 • Góc Nhìn Soi Tỏ Tâm Thức",
      highlightWord: "cần điểm tựa",
      content:
        "Con thuyền nào rồi cũng phải neo vào bến cảng, cánh chim nào bay mỏi cũng phải tìm về tàng cây. Sự mỏi mệt hôm nay là lời nhắc cơ thể bạn cần được bảo bọc. Đừng ngại tìm về một người thân yêu hoặc đơn giản là cho phép mình nằm nghỉ một giấc thật sâu.",
      advice: "Gợi ý tiếp nhận: Đắp một tấm chăn mỏng hoặc mặc thêm áo ấm",
      signalNumber: "Chiêm nghiệm số #5921",
    },
    action: {
      title: "Thả lỏng toàn thân trên ghế êm",
      duration: "3 PHÚT",
      description:
        "Tựa hoàn toàn lưng và đầu vào thành ghế hoặc gối mềm, buông thõng hai tay và để trọng lực nâng đỡ bạn hoàn toàn mà không cần gồng cứng.",
      buttonLabel: "Đánh dấu đã thực hiện hành động này ✓",
      tag: "VÙNG 4 • HÀNH ĐỘNG NUÔI TÂM",
    },
    artwork: {
      tag: "Bếp Lửa & Hiên Nhà",
      image: "/images/do_paper_still_life.jpg",
      caption: "Họa phẩm cảm hứng: Bếp lửa ấm cúng giữa ngày mưa gió",
    },
    loadingFacts: {
      breathingText: "Tựa vào chiếc gối êm, buông lỏng...",
      thoughtTitle: "TÂM NIỆM",
      thoughtContent: "Mái ấm cội nguồn che chở vạn gió sương.",
      originTitle: "GỢI NHẮC CỘI NGUỒN",
      originContent: "Nội dung biên soạn minh họa gợi nhắc nếp sống và triết lý dân gian.",
      stepText: "Nhen nhóm ngọn lửa bình an trong tim...",
    },
    guestPreview: {
      title: "MẠCH NGUỒN VỖ VỀ",
      message:
        "Bạn luôn được che chở bởi cội nguồn và tình yêu thương. Nhận lấy lời nhắn lành xoa dịu tâm can.",
    },
  },
];

// Helper methods
export function getSignalById(id: string): SignalData | undefined {
  return ALL_SIGNALS.find((s) => s.id === id);
}

export function getSignalsByMood(mood: MoodKey): SignalData[] {
  return ALL_SIGNALS.filter((s) => s.mood === mood);
}

export function getDefaultSignalForMood(mood: MoodKey): SignalData {
  const list = getSignalsByMood(mood);
  return list[0] || ALL_SIGNALS[0];
}

export function getNextSignalForMood(
  currentSignalId: string,
  mood: MoodKey
): SignalData {
  const list = getSignalsByMood(mood);
  if (list.length <= 1) return list[0] || ALL_SIGNALS[0];
  const currentIndex = list.findIndex((s) => s.id === currentSignalId);
  const nextIndex = (currentIndex + 1) % list.length;
  return list[nextIndex];
}

// Backward compatibility map
export const SIGNALS_DATA: Record<MoodKey, SignalData> = {
  "Chênh vênh": getDefaultSignalForMood("Chênh vênh"),
  "An yên": getDefaultSignalForMood("An yên"),
  "Băn khoăn": getDefaultSignalForMood("Băn khoăn"),
  "Nôn nóng": getDefaultSignalForMood("Nôn nóng"),
  "Biết ơn": getDefaultSignalForMood("Biết ơn"),
  "Cần điểm tựa": getDefaultSignalForMood("Cần điểm tựa"),
};
