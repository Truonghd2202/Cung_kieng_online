export type CalendarEventType = "custom" | "festival" | "personal";

export interface CalendarEventItem {
  id: string;
  day: number;
  month: number; // 1-12
  year: number;
  type: CalendarEventType;
  typeLabel: string;
  region: string;
  title: string;
  shortDesc: string;
  lunarDate: string;
  badge?: string;
  // Full detail fields for Screen 20
  heroImage?: string;
  heroCaption?: string;
  timing?: string;
  scope?: string;
  coreMeaning?: string;
  culturalMeaning?: {
    paragraphs: string[];
    quote: string;
  };
  customs?: Array<{
    title: string;
    desc: string;
  }>;
  youthActions?: Array<{
    step: number;
    title: string;
    desc: string;
  }>;
  regionalNuances?: {
    bac: string;
    trung: string;
    nam: string;
    note: string;
  };
}

export const SAMPLE_CALENDAR_EVENTS: CalendarEventItem[] = [
  {
    id: "le-soc-vong-ngay-ram",
    day: 15,
    month: 10,
    year: 2024,
    type: "custom",
    typeLabel: "Phong tục dân gian",
    region: "Toàn quốc",
    title: "Lễ sóc vọng (Ngày Rằm thường kỳ)",
    shortDesc:
      "Khoảnh khắc trăng tròn thắp một nén tâm hương tưởng nhớ gia tiên, giữ lòng thanh tịnh và ăn bữa cơm sum họp cùng gia đình.",
    lunarDate: "Ngày 15 Âm lịch (Trăng tròn định kỳ)",
    badge: "Sự kiện nổi bật",
    heroImage: "/images/ritual_ram.jpg",
    heroCaption:
      "Tranh minh họa: Nếp nhà Việt ấm áp trong ngày Rằm — Nơi soi sáng đạo hiếu và khoảng an yên sau những ngày bận rộn.",
    timing: "Ngày 15 Âm lịch (Trăng tròn định kỳ)",
    scope: "Toàn quốc (Mỗi vùng gia đình có nét riêng)",
    coreMeaning: "Phụng sự tri ân & gìn đạo bình an",
    culturalMeaning: {
      paragraphs: [
        "Trong vòng quay của thời gian, ngày Rằm (ngày Vọng) là một điểm tựa tĩnh tại quan trọng trong đời sống nếp nhà. Vào đêm trăng tròn viên mãn nhất mỗi tháng, dân gian giữ nếp sáng trầm ấm áp, thắp nén hương thơm hướng về tổ tiên và cội nguồn gia quyến.",
        "Người xưa chọn ngày này không phải để cầu xin những phép màu hoang đường hay danh lợi bất chính, mà là ngày quay về với tự tính, lắng lòng nhìn nhận những việc mình đã làm, con cháu kính ngưỡng tri ân công đức sinh thành của các bậc tiền nhân, giữ cho nếp nhà hòa khí và gia đạo hưng thịnh."
      ],
      quote:
        "Vọng giả tích sở minh dã, ngước mắt nhìn vầng trăng tỏ để lòng tròn viên mãn, khấn một thấu tâm về cội nguồn để đời đời thừa hưởng phúc an."
    },
    customs: [
      {
        title: "Bao sái & Dọn nếp nhà",
        desc: "Lau dọn bàn thờ bằng nước ngũ vị ấm, quét dọn hiên nhà và góc sống thoáng đãng, đón nhận sinh khí tươi mới."
      },
      {
        title: "Thắp hương & Hoa quả mùa",
        desc: "Dâng một nén trầm thơm, đĩa hoa cúc mùa thu hoặc chén nước thanh khiết với lòng thành kính mộc mạc."
      },
      {
        title: "Bữa cơm gia đạo",
        desc: "Một bữa cơm chay thanh đạm hoặc mâm cơm gia đình sum vầy, quây quần nói lời yêu thương."
      },
      {
        title: "Hòa ái & Thiện tâm",
        desc: "Nói lời hòa nhã, bao dung với người khác, làm việc thiện nguyện nhỏ giúp đỡ người khó khăn quanh mình."
      }
    ],
    youthActions: [
      {
        step: 1,
        title: "15 phút tĩnh lặng buổi sớm",
        desc: "Tạm gác màn hình điện thoại, tự tay pha một ấm trà sen hoặc hoa cúc, hít thở sâu và ghi lại 3 điều bạn cảm thấy biết ơn trong tháng vừa qua."
      },
      {
        step: 2,
        title: "Một cuộc gọi ấm áp về nhà",
        desc: "Nếu ở xa, hãy gửi lời thăm hỏi chân tình tới cha mẹ, ông bà. Đôi khi chỉ một câu hỏi han ân cần ngày Rằm lại mang ý nghĩa hơn vạn lời chúc xa xôi."
      },
      {
        step: 3,
        title: "Lắng nghe ký ức từ bữa cơm sum họp",
        desc: "Hỏi ông bà về cách cúng ngày Rằm thuở trước, vừa tiếp thu nét đẹp nếp xưa vừa bồi đắp sợi dây gắn kết thế hệ trong gia đình."
      }
    ],
    regionalNuances: {
      bac: "Coi trọng nếp mâm cỗ tươm tất trong gian thờ, hương hoa tươi theo mùa, mang sắc thái trang nghiêm tao nhã.",
      trung: "Đậm chất cung đình kết hợp nếp làng, chuộng lễ vật mộc mạc, tĩnh lặng và trân trọng sâu sắc thời khắc giao thoa nhật nguyệt.",
      nam: "Khoáng đạt và rộng mở, gia chủ thường bày hoa trái xum xuê, chú trọng tính gắn kết thân tình hàng xóm láng giềng.",
      note: "Những điểm tiếp nối: Tuyệt đối không mê tín dị đoan, không bắt chước các hủ tục tốn kém phi thực tế. Tùy theo hoàn cảnh mỗi người mà ứng xử giản dị, lấy cái tâm bình an làm điều cốt tủy."
    }
  },
  {
    id: "hoi-den-lang-mua-thu",
    day: 15,
    month: 10,
    year: 2024,
    type: "festival",
    typeLabel: "Lễ hội truyền thống",
    region: "Đồng bằng Bắc Bộ",
    title: "Hội đền làng mùa thu",
    shortDesc:
      "Nét sinh hoạt cộng đồng gắn với việc rước kiệu, tri ân tiền nhân khai khẩn và cầu mong quốc thái dân an.",
    lunarDate: "Ngày 15/9 Âm lịch"
  },
  {
    id: "dip-tinh-tam-nguoi-than",
    day: 15,
    month: 10,
    year: 2024,
    type: "personal",
    typeLabel: "Ghi chú cá nhân",
    region: "Cá nhân",
    title: "Dịp tĩnh tâm & thăm hỏi người thân",
    shortDesc:
      "Khoảng lặng dành riêng cho bản thân để buông bỏ lo toan và kết nối lại với gia đình.",
    lunarDate: "Dấu mốc tự lưu"
  },
  {
    id: "mung-mot-dau-thang",
    day: 2,
    month: 10,
    year: 2024,
    type: "custom",
    typeLabel: "Phong tục dân gian",
    region: "Toàn quốc",
    title: "Lễ Sóc mùng một đầu tháng",
    shortDesc: "Khởi đầu tháng mới với tâm nguyện hanh thông, gieo hạt giống bình an và hướng thiện.",
    lunarDate: "Mùng 1 Âm lịch"
  },
  {
    id: "hoi-den-kiep-bac",
    day: 5,
    month: 10,
    year: 2024,
    type: "festival",
    typeLabel: "Lễ hội dân gian",
    region: "Hải Dương",
    title: "Lễ hội truyền thống Đền Kiếp Bạc",
    shortDesc: "Tưởng niệm ngày hóa của Đức Thánh Trần Hưng Đạo, tôn vinh tinh thần hộ quốc an dân.",
    lunarDate: "Tháng 8 - 9 Âm lịch"
  },
  {
    id: "chuan-bi-nep-nha",
    day: 11,
    month: 10,
    year: 2024,
    type: "custom",
    typeLabel: "Phong tục dân gian",
    region: "Toàn quốc",
    title: "Chuẩn bị nếp nhà trước ngày Rằm",
    shortDesc: "Dọn dẹp hiên nhà, chuẩn bị hoa quả mùa thu và kiểm tra đèn nến nơi thờ tự.",
    lunarDate: "Ngày 11 Âm lịch"
  },
  {
    id: "hoi-lang-ven-song",
    day: 20,
    month: 10,
    year: 2024,
    type: "festival",
    typeLabel: "Lễ hội truyền thống",
    region: "Đồng bằng Sông Hồng",
    title: "Hội rước nước & Lễ hội làng ven sông",
    shortDesc: "Tục rước nước thiêng cầu mùa màng tươi tốt và tri ân thần sông nước bảo bọc dân làng.",
    lunarDate: "Ngày 20 Âm lịch"
  },
  {
    id: "tham-ong-ba",
    day: 26,
    month: 10,
    year: 2024,
    type: "personal",
    typeLabel: "Ghi chú cá nhân",
    region: "Gia đình",
    title: "Cuối tuần về thăm ông bà & ăn cơm nhà",
    shortDesc: "Dành trọn vẹn một chiều thứ Bảy cùng người thân thưởng trà và nghe chuyện xưa.",
    lunarDate: "Dấu mốc tự lưu"
  },
  {
    id: "mung-mot-thang-muoi-mot",
    day: 31,
    month: 10,
    year: 2024,
    type: "custom",
    typeLabel: "Phong tục dân gian",
    region: "Toàn quốc",
    title: "Lễ Sóc mùng một cuối tháng 10",
    shortDesc: "Tiễn tháng cũ, đón tháng mới an lành và bền bỉ trong từng việc nhỏ đời thường.",
    lunarDate: "Mùng 1 Âm lịch"
  }
];

export function getCalendarEventById(id: string): CalendarEventItem | undefined {
  return SAMPLE_CALENDAR_EVENTS.find((e) => e.id === id);
}

export function getEventsForDay(day: number, month = 10, year = 2024): CalendarEventItem[] {
  return SAMPLE_CALENDAR_EVENTS.filter(
    (e) => e.day === day && e.month === month && e.year === year
  );
}
