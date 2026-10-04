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
  verifiedSource?: string;
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

/**
 * Bảng dữ liệu sự kiện văn hóa, phong tục ĐÃ KIỂM CHỨNG của tháng 10/2024
 * Đối chiếu chính xác theo Lịch Âm Dương thiên văn học Việt Nam (UTC+7):
 * - Tháng 10/2024 Dương lịch tương ứng từ ngày 29/8 đến 29/9 năm Giáp Thìn.
 * - Mùng một tháng 9 Giáp Thìn rơi vào ngày 03/10/2024 Dương lịch.
 * - Ngày Rằm tháng 9 Giáp Thìn (Lễ Sóc Vọng) rơi vào ngày 17/10/2024 Dương lịch.
 */
export const SAMPLE_CALENDAR_EVENTS: CalendarEventItem[] = [
  {
    id: "mung-mot-thang-chin",
    day: 3,
    month: 10,
    year: 2024,
    type: "custom",
    typeLabel: "Phong tục dân gian",
    region: "Toàn quốc",
    title: "Lễ Sóc mùng Một tháng 9 (Giáp Thìn)",
    shortDesc:
      "Ngày đầu tháng âm lịch, thắp nén hương thơm tưởng nhớ tổ tiên, cầu mong thân tâm an định và một tháng mới hanh thông.",
    lunarDate: "Mùng 1 tháng 9 Giáp Thìn (03/10/2024)",
    badge: "Phong tục định kỳ",
    verifiedSource:
      "Tư liệu khảo cứu: 'Việt Nam phong tục' (Phan Kế Bính, 1915), thiên Tế tự gia tiên; Nếp sống tâm linh gia đình truyền thống.",
    heroImage: "/images/ritual_ram.jpg",
    heroCaption:
      "Nếp nhà thanh tịnh ngày mùng Một đầu tháng: Chén nước trong, nén hương trầm gửi gắm ước nguyện bình an.",
    timing: "03/10/2024 Dương lịch (01/9 Âm lịch)",
    scope: "Toàn quốc (Thực hành tại gia)",
    coreMeaning: "Khởi tâm lành & Tưởng nhớ cội nguồn",
    culturalMeaning: {
      paragraphs: [
        "Lễ Sóc là tên gọi cổ xưa của ngày mùng Một đầu tháng âm lịch. Khi mặt trăng giao hội cùng mặt trời, người xưa coi đây là khoảnh khắc giao hòa âm dương, khởi nguồn của một chu kỳ thời gian mới.",
        "Tại gia đình người Việt, nghi thức ngày mùng Một chú trọng vào sự thành kính giản dị: bao sái ban thờ, thay chén nước thanh tịnh, thắp nén hương trầm hướng nguyện cho cha mẹ, con cháu trong nhà tháng mới bình an, việc thiện tăng trưởng."
      ],
      quote: "Sóc giả sơ dã, ngày đầu tháng soi tỏ lòng mình, giữ nếp thảo hiền thuận theo lẽ tự nhiên."
    },
    customs: [
      {
        title: "Chén nước trong & Nén hương thơm",
        desc: "Dâng nước giếng lành hoặc nước thanh khiết, nén trầm thơm nhẹ nhàng, không cần mâm cỗ xa hoa."
      },
      {
        title: "Bao sái bàn thờ gọn gàng",
        desc: "Lau dọn bài vị, đỉnh hương bằng khăn sạch và nước ấm, tạo không gian trang nghiêm thanh tịnh."
      }
    ],
    youthActions: [
      {
        step: 1,
        title: "Khởi đầu tháng mới nhẹ nhàng",
        desc: "Dành 10 phút buổi sáng uống một tách trà ấm, viết ra 1 mục tiêu thiện lành bạn muốn hoàn thành trong tháng."
      },
      {
        step: 2,
        title: "Gửi lời chúc tới người thân",
        desc: "Nhắn tin hoặc gọi điện chúc cha mẹ, bạn bè một tháng mới dồi dào sức khỏe và thuận hòa."
      }
    ],
    regionalNuances: {
      bac: "Coi trọng việc dâng hoa quả tươi theo mùa (chuối tiêu, bưởi đỏ, hoa cúc).",
      trung: "Đậm nét trầm mặc, thắp trầm hương xứ Huế, giữ không gian thanh vắng.",
      nam: "Bày mâm ngũ quả tươi mát, tính cách phóng khoáng và chuộng phóng sinh chim cá lành tính.",
      note: "Thực hành tùy theo gia cảnh, hướng về sự tri ân chân thành, tuyệt đối tránh mê tín dị đoan."
    }
  },
  {
    id: "le-hoi-kate",
    day: 2,
    month: 10,
    year: 2024,
    type: "festival",
    typeLabel: "Lễ hội dân tộc",
    region: "Ninh Thuận & Bình Thuận",
    title: "Lễ hội Katê của đồng bào Chăm",
    shortDesc:
      "Lễ hội truyền thống lớn nhất của người Chăm tưởng nhớ thần Po Klong Garai, Po Rome và ông bà tổ tiên, gắn liền với tiếng trống Ghinăng rộn rã.",
    lunarDate: "Đầu tháng 7 lịch Chăm (02/10/2024)",
    badge: "Di sản Quốc gia",
    verifiedSource:
      "Kiểm chứng: Quyết định ghi danh Di sản văn hóa phi vật thể Quốc gia (Bộ VHTTDL); Lịch thực hành lễ nghi Hội đồng chức sắc Chăm Bà-la-môn.",
    heroImage: "/images/den_hung.jpg",
    heroCaption: "Không gian lễ hội Katê linh thiêng dưới chân tháp Chăm cổ kính.",
    timing: "01 - 03/10/2024 Dương lịch",
    scope: "Khu vực Nam Trung Bộ (Cộng đồng Chăm)",
    coreMeaning: "Tri ân tiền nhân khai mương đắp đập, cầu mưa thuận gió hòa"
  },
  {
    id: "tet-trung-cuu",
    day: 11,
    month: 10,
    year: 2024,
    type: "festival",
    typeLabel: "Phong tục cổ truyền",
    region: "Toàn quốc",
    title: "Tết Trùng Cửu (Trùng Dương 9/9)",
    shortDesc:
      "Tục xưa lên núi ngắm cảnh thu (đăng cao), thưởng hoa cúc mùa thu, uống trà cúc và gửi lời chúc trường thọ tới bậc cao niên trong gia đình.",
    lunarDate: "Ngày 9 tháng 9 Giáp Thìn (11/10/2024)",
    badge: "Mỹ tục mùa thu",
    verifiedSource:
      "Kiểm chứng: 'Hội hè lễ tết của người Việt' (Nguyễn Văn Huyên); Các trước tác thi ca cổ điển thời Lý - Trần - Lê.",
    heroImage: "/images/tea_bowl.jpg",
    heroCaption: "Thưởng hoa cúc và tách trà thu trong tiết Trùng Cửu thanh cao.",
    timing: "11/10/2024 Dương lịch (09/9 Âm lịch)",
    scope: "Toàn quốc (Truyền thống văn nhân & gia đình)",
    coreMeaning: "Kính dưỡng người già & Chiêm nghiệm sự tuần hoàn của trời đất"
  },
  {
    id: "hoi-chua-keo-mua-thu",
    day: 15,
    month: 10,
    year: 2024,
    type: "festival",
    typeLabel: "Lễ hội truyền thống",
    region: "Vũ Thư, Thái Bình",
    title: "Lễ hội Chùa Keo mùa thu (Khai hội)",
    shortDesc:
      "Lễ hội tưởng nhớ Thiền sư Không Lộ với các nghi thức cổ truyền: rước kiệu, thi bơi chải và điệu múa ếch vồ độc đáo tại ngôi chùa gỗ hơn 400 năm tuổi.",
    lunarDate: "Từ 13/9 đến 15/9 Giáp Thìn (15 - 17/10/2024)",
    badge: "Di sản Quốc gia",
    verifiedSource:
      "Kiểm chứng: Hồ sơ Di tích Quốc gia Đặc biệt Chùa Keo; Di sản văn hóa phi vật thể Quốc gia (Bộ VHTTDL).",
    heroImage: "/images/temple_bac_bo.jpg",
    heroCaption: "Gác chuông Chùa Keo Thái Bình — Kiệt tác kiến trúc gỗ cổ truyền Việt Nam.",
    timing: "15/10/2024 - 17/10/2024 Dương lịch (13 - 15/9 Âm lịch)",
    scope: "Đồng bằng Bắc Bộ (Thái Bình)",
    coreMeaning: "Tôn vinh vị đại thiền sư, danh y và tổ nghề đúc đồng"
  },
  {
    id: "le-soc-vong-ngay-ram",
    day: 17,
    month: 10,
    year: 2024,
    type: "custom",
    typeLabel: "Phong tục dân gian",
    region: "Toàn quốc",
    title: "Lễ sóc vọng (Ngày Rằm tháng 9 Giáp Thìn)",
    shortDesc:
      "Khoảnh khắc trăng tròn giữa thu, thắp một nén tâm hương tưởng nhớ gia tiên, giữ lòng thanh tịnh và quây quần bên bữa cơm sum họp.",
    lunarDate: "Ngày 15 tháng 9 Giáp Thìn (17/10/2024)",
    badge: "Sự kiện nổi bật",
    verifiedSource:
      "Tư liệu khảo cứu: 'Việt Nam phong tục' (Phan Kế Bính, 1915), thiên Gia tộc & Tế tự; Khảo sát thực tế nghi lễ nếp nhà của Viện Văn hóa Dân gian.",
    heroImage: "/images/ritual_ram.jpg",
    heroCaption:
      "Tranh minh họa: Nếp nhà Việt ấm áp trong ngày Rằm — Nơi soi sáng đạo hiếu và khoảng an yên sau những ngày bận rộn.",
    timing: "17/10/2024 Dương lịch (15/9 Âm lịch)",
    scope: "Toàn quốc (Mỗi vùng gia đình có nét riêng)",
    coreMeaning: "Phụng sự tri ân & Gìn đạo bình an",
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
  }
];

/**
 * Bản đồ đối chiếu chính xác Lịch Dương (tháng 10/2024) -> Lịch Âm (Giáp Thìn)
 * Tính theo múi giờ Việt Nam (UTC+7):
 * 01/10/2024 -> 29/8 AL
 * 02/10/2024 -> 30/8 AL
 * 03/10/2024 -> 01/9 AL (Mùng 1 tháng 9)
 * 17/10/2024 -> 15/9 AL (Rằm tháng 9)
 * 31/10/2024 -> 29/9 AL
 */
export interface OctoberDayInfo {
  solarDay: number;
  lunarDay: number;
  lunarMonth: number;
  isFirstDayOfLunarMonth?: boolean;
  isFullMoon?: boolean;
  solarTerm?: string;
  specialBadge?: string;
}

export const OCTOBER_2024_LUNAR_MAP: Record<number, OctoberDayInfo> = {
  1: { solarDay: 1, lunarDay: 29, lunarMonth: 8 },
  2: { solarDay: 2, lunarDay: 30, lunarMonth: 8, specialBadge: "Hội Katê" },
  3: { solarDay: 3, lunarDay: 1, lunarMonth: 9, isFirstDayOfLunarMonth: true, specialBadge: "Mùng 1/9 AL" },
  4: { solarDay: 4, lunarDay: 2, lunarMonth: 9 },
  5: { solarDay: 5, lunarDay: 3, lunarMonth: 9 },
  6: { solarDay: 6, lunarDay: 4, lunarMonth: 9 },
  7: { solarDay: 7, lunarDay: 5, lunarMonth: 9 },
  8: { solarDay: 8, lunarDay: 6, lunarMonth: 9, solarTerm: "Hàn Lộ" },
  9: { solarDay: 9, lunarDay: 7, lunarMonth: 9 },
  10: { solarDay: 10, lunarDay: 8, lunarMonth: 9 },
  11: { solarDay: 11, lunarDay: 9, lunarMonth: 9, specialBadge: "Trùng Cửu 9/9" },
  12: { solarDay: 12, lunarDay: 10, lunarMonth: 9 },
  13: { solarDay: 13, lunarDay: 11, lunarMonth: 9 },
  14: { solarDay: 14, lunarDay: 12, lunarMonth: 9 },
  15: { solarDay: 15, lunarDay: 13, lunarMonth: 9, specialBadge: "Hội Chùa Keo" },
  16: { solarDay: 16, lunarDay: 14, lunarMonth: 9 },
  17: { solarDay: 17, lunarDay: 15, lunarMonth: 9, isFullMoon: true, specialBadge: "RẰM THÁNG 9" },
  18: { solarDay: 18, lunarDay: 16, lunarMonth: 9 },
  19: { solarDay: 19, lunarDay: 17, lunarMonth: 9 },
  20: { solarDay: 20, lunarDay: 18, lunarMonth: 9 },
  21: { solarDay: 21, lunarDay: 19, lunarMonth: 9 },
  22: { solarDay: 22, lunarDay: 20, lunarMonth: 9 },
  23: { solarDay: 23, lunarDay: 21, lunarMonth: 9, solarTerm: "Sương Giáng" },
  24: { solarDay: 24, lunarDay: 22, lunarMonth: 9 },
  25: { solarDay: 25, lunarDay: 23, lunarMonth: 9 },
  26: { solarDay: 26, lunarDay: 24, lunarMonth: 9 },
  27: { solarDay: 27, lunarDay: 25, lunarMonth: 9 },
  28: { solarDay: 28, lunarDay: 26, lunarMonth: 9 },
  29: { solarDay: 29, lunarDay: 27, lunarMonth: 9 },
  30: { solarDay: 30, lunarDay: 28, lunarMonth: 9 },
  31: { solarDay: 31, lunarDay: 29, lunarMonth: 9 },
};

export function getCalendarEventById(id: string): CalendarEventItem | undefined {
  return SAMPLE_CALENDAR_EVENTS.find((e) => e.id === id);
}

export function getEventsForDay(day: number, month = 10, year = 2024): CalendarEventItem[] {
  return SAMPLE_CALENDAR_EVENTS.filter(
    (e) => e.day === day && e.month === month && e.year === year
  );
}

// -------------------------------------------------------------
// THUẬT TOÁN THIÊN VĂN HỌC TÍNH ÂM LỊCH VIỆT NAM (UTC+7)
// Tác giả: Hồ Ngọc Đức — Chuẩn mực thiên văn học Việt Nam
// -------------------------------------------------------------

function jdFromDate(dd: number, mm: number, yy: number): number {
  const a = Math.floor((14 - mm) / 12);
  const y = yy + 4800 - a;
  const m = mm + 12 * a - 3;
  let jd = dd + Math.floor((153 * m + 2) / 5) + 365 * y + Math.floor(y / 4) - Math.floor(y / 100) + Math.floor(y / 400) - 32045;
  if (jd < 2299161) {
    jd = dd + Math.floor((153 * m + 2) / 5) + 365 * y + Math.floor(y / 4) - 32083;
  }
  return jd;
}

function getNewMoonDay(k: number, timeZone: number): number {
  const T = k / 1236.85;
  const T2 = T * T;
  const T3 = T2 * T;
  const dr = Math.PI / 180;
  let Jd1 = 2415020.75933 + 29.53058868 * k + 0.0001178 * T2 - 0.000000155 * T3;
  Jd1 += 0.00033 * Math.sin((166.56 + 132.87 * T - 0.009173 * T2) * dr);
  const M = 359.2242 + 29.10535608 * k - 0.0000333 * T2 - 0.00000347 * T3;
  const Mpr = 306.0253 + 385.81691806 * k + 0.0107306 * T2 + 0.00001236 * T3;
  const F = 21.2964 + 390.67050646 * k - 0.0016528 * T2 - 0.00000239 * T3;
  let C1 = (0.1734 - 0.000393 * T) * Math.sin(M * dr) + 0.0021 * Math.sin(2 * dr * M);
  C1 -= 0.4068 * Math.sin(Mpr * dr) + 0.0161 * Math.sin(2 * dr * Mpr);
  C1 -= 0.0004 * Math.sin(3 * dr * Mpr);
  C1 += 0.0104 * Math.sin(2 * dr * F) - 0.0051 * Math.sin((M + Mpr) * dr);
  C1 -= 0.0074 * Math.sin((M - Mpr) * dr) + 0.0004 * Math.sin((2 * F + M) * dr);
  C1 -= 0.0004 * Math.sin((2 * F - M) * dr) - 0.0006 * Math.sin((2 * F + Mpr) * dr);
  C1 +=
    0.0010 * Math.sin((2 * F - Mpr) * dr) +
    0.0005 * Math.sin((2 * Mpr + M) * dr);
  const deltaT =
    T < -11
      ? 0.001 +
        0.000839 * T +
        0.0002261 * T2 -
        0.00000845 * T3 -
        0.000000081 * T * T3
      : -0.000278 +
        0.000265 * T +
        0.000262 * T2;

  const JdNew = Jd1 + C1 - deltaT;

  return Math.floor(
    JdNew + 0.5 + timeZone / 24
  );
}

function getSunLongitude(jdn: number, timeZone: number): number {
  const T =
    (jdn - 2451545.0 - 0.5 - timeZone / 24) / 36525;
  const T2 = T * T;
  const dr = Math.PI / 180;
  const M = 357.5291 + 35999.0503 * T - 0.0001559 * T2 - 0.00000048 * T * T2;
  const L0 = 280.46645 + 36000.76983 * T + 0.0003032 * T2;
  let DL = (1.9146 - 0.004817 * T - 0.000014 * T2) * Math.sin(dr * M);
  DL += (0.019993 - 0.000101 * T) * Math.sin(dr * 2 * M) + 0.00029 * Math.sin(dr * 3 * M);
  let L = L0 + DL;
  L = L * dr;
  L = L - Math.PI * 2 * Math.floor(L / (Math.PI * 2));
  return Math.floor((L / Math.PI) * 6);
}

function getLunarMonth11(yy: number, timeZone: number): number {
  const off = jdFromDate(31, 12, yy) - 2415021;
  const k = Math.floor(off / 29.530588853);
  let nm = getNewMoonDay(k, timeZone);
  const sunLong = getSunLongitude(nm, timeZone);
  if (sunLong >= 9) {
    nm = getNewMoonDay(k - 1, timeZone);
  }
  return nm;
}

function getLeapMonthOffset(a11: number, timeZone: number): number {
  const k = Math.floor((a11 - 2415021.076998695) / 29.530588853 + 0.5);
  let last = 0;
  let i = 1;
  let arc = getSunLongitude(getNewMoonDay(k + i, timeZone), timeZone);
  do {
    last = arc;
    i++;
    arc = getSunLongitude(getNewMoonDay(k + i, timeZone), timeZone);
  } while (arc !== last && i < 14);
  return i - 1;
}

export function convertSolar2Lunar(
  dd: number,
  mm: number,
  yy: number,
  timeZone = 7
): [number, number, number, boolean] {
  const dayNumber = jdFromDate(dd, mm, yy);

  const k = Math.floor(
    (dayNumber - 2415021.076998695) / 29.530588853
  );

  let monthStart = getNewMoonDay(k + 1, timeZone);

  if (monthStart > dayNumber) {
    monthStart = getNewMoonDay(k, timeZone);
  }

  let a11 = getLunarMonth11(yy, timeZone);
  let b11 = a11;
  let lunarYear: number;

  if (a11 >= monthStart) {
    lunarYear = yy;
    a11 = getLunarMonth11(yy - 1, timeZone);
  } else {
    lunarYear = yy + 1;
    b11 = getLunarMonth11(yy + 1, timeZone);
  }

  const lunarDay = dayNumber - monthStart + 1;
  const diff = Math.floor((monthStart - a11) / 29);

  let lunarMonth = diff + 11;
  let isLeapMonth = false;

  // Khoảng giữa hai tháng 11 có thể chứa tháng nhuận.
  if (b11 - a11 > 365) {
    const leapMonthOffset = getLeapMonthOffset(
      a11,
      timeZone
    );

    if (diff >= leapMonthOffset) {
      lunarMonth = diff + 10;
      isLeapMonth = diff === leapMonthOffset;
    }
  }

  if (lunarMonth > 12) {
    lunarMonth -= 12;
  }

  if (lunarMonth >= 11 && diff < 4) {
    lunarYear -= 1;
  }

  return [
    lunarDay,
    lunarMonth,
    lunarYear,
    isLeapMonth,
  ];
}

export function getCanChiYear(lunarYear: number): string {
  const can = ["Canh", "Tân", "Nhâm", "Quý", "Giáp", "Ất", "Bính", "Đinh", "Mậu", "Kỷ"];
  const chi = ["Thân", "Dậu", "Tuất", "Hợi", "Tý", "Sửu", "Dần", "Mão", "Thìn", "Tỵ", "Ngọ", "Mùi"];
  const c = can[lunarYear % 10];
  const ch = chi[lunarYear % 12];
  return `${c} ${ch}`;
}

export interface ReliableLunarDate {
  lunarDay: number;
  lunarMonth: number;
  lunarYear: number;
  canChiYear: string;
  isFullMoon: boolean;
  isFirstDay: boolean;
  isLeapMonth?: boolean;
  solarTerm?: string;
  specialBadge?: string;
}

/**
 * Trả về thông tin âm lịch đáng tin cậy:
 * - Ưu tiên tư liệu đã khảo cứu tháng 10/2024 (có kèm tiết khí và lễ hội địa phương).
 * - Tự động tính toán chuẩn xác theo thuật toán thiên văn học Việt Nam cho các ngày/tháng/năm khác.
 */
export function getReliableLunarDate(
  day: number,
  month: number,
  year: number
): ReliableLunarDate {
  // Đối chiếu tư liệu kiểm chứng chuyên sâu tháng 10/2024
  if (year === 2024 && month === 10 && OCTOBER_2024_LUNAR_MAP[day]) {
    const info = OCTOBER_2024_LUNAR_MAP[day];
    return {
      lunarDay: info.lunarDay,
      lunarMonth: info.lunarMonth,
      lunarYear: 2024,
      canChiYear: "Giáp Thìn",
      isFullMoon: !!info.isFullMoon,
      isFirstDay: !!info.isFirstDayOfLunarMonth,
      solarTerm: info.solarTerm,
      specialBadge: info.specialBadge,
    };
  }

  const [lunarDay, lunarMonth, lYear, isLeap] = convertSolar2Lunar(day, month, year);
  const canChi = getCanChiYear(lYear);
  const isFullMoon = lunarDay === 15;
  const isFirstDay = lunarDay === 1;

  let specialBadge: string | undefined;
  if (isFullMoon) {
    specialBadge = `Rằm tháng ${lunarMonth}`;
  } else if (isFirstDay) {
    specialBadge = `Mùng 1/${lunarMonth} AL`;
  }

  return {
    lunarDay,
    lunarMonth,
    lunarYear: lYear,
    canChiYear: canChi,
    isFullMoon,
    isFirstDay,
    isLeapMonth: isLeap,
    specialBadge,
  };
}

/**
 * Khóa lưu trữ ghi chú lịch cá nhân theo tài khoản độc lập
 */
export const getCalendarNotesStorageKey = (email?: string | null): string => {
  const accountId = email ? email.trim().toLowerCase() : "guest";
  return `tltl-calendar-personal-notes_${accountId}`;
};

/**
 * Tải ghi chú lịch cá nhân của đúng tài khoản đang đăng nhập
 */
export const loadCalendarPersonalNotes = (email?: string | null): CalendarEventItem[] => {
  try {
    const key = getCalendarNotesStorageKey(email);
    const stored = localStorage.getItem(key);
    if (stored) return JSON.parse(stored);

    // Dành cho tài khoản demo An Nhiên hoặc guest: nếu chưa có key riêng, kiểm tra dữ liệu từ key cũ
    const accountId = email ? email.trim().toLowerCase() : "guest";
    if (accountId === "annhien@tinlamtamlinh.vn" || accountId === "guest") {
      const legacy = localStorage.getItem("tltl-calendar-personal-notes");
      if (legacy) {
        try {
          const parsed = JSON.parse(legacy);
          localStorage.setItem(key, legacy);
          return parsed;
        } catch {}
      }
    }
    return [];
  } catch {
    return [];
  }
};

/**
 * Trả về true khi ghi chú đã được lưu thành công.
 */
export const saveCalendarPersonalNotes = (
  email: string | null | undefined,
  notes: CalendarEventItem[]
): boolean => {
  try {
    const key = getCalendarNotesStorageKey(email);

    localStorage.setItem(
      key,
      JSON.stringify(notes)
    );

    return true;
  } catch {
    return false;
  }
};

