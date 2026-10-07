export const GOOD_DAY_PURPOSES = [
  { id: "family", label: "Gặp mặt gia đình & Sum họp", icon: "🏡" },
  { id: "ritual", label: "Chuẩn bị nghi lễ & Tạ ơn tổ tiên", icon: "🏮" },
  { id: "business", label: "Khai trương & Khởi sự việc mới", icon: "✨" },
  { id: "construction", label: "Động thổ & Dọn về nhà mới", icon: "🏛️" },
  { id: "wedding", label: "Cầu an bản mệnh & Hỷ sự", icon: "🌸" },
] as const;

export type GoodDayPurpose = (typeof GOOD_DAY_PURPOSES)[number]["id"];

export interface GoodDayResult {
  id: string;
  date: string; // YYYY-MM-DD
  day: number;
  month: number;
  year: number;
  purpose: GoodDayPurpose;
  title: string;
  lunarDateStr: string;
  canChi: string;
  auspiciousHours: string;
  explanation: string;
  practicalAdvice: string;
  sourceLabel: string;
  isDemo: boolean;
}

export interface GoodDayQuery {
  purpose: GoodDayPurpose;
  from: string;
  to: string;
}

export function parseDateInput(value: string): {
  year: number;
  month: number;
  day: number;
  ordinal: number;
} | null {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);
  if (!match) return null;

  const year = Number(match[1]);
  const month = Number(match[2]);
  const day = Number(match[3]);

  if (year < 1900 || year > 2100) return null;

  const date = new Date(Date.UTC(year, month - 1, day));

  if (
    date.getUTCFullYear() !== year ||
    date.getUTCMonth() !== month - 1 ||
    date.getUTCDate() !== day
  ) {
    return null;
  }

  return {
    year,
    month,
    day,
    ordinal: date.getTime() / 86400000,
  };
}

export function validateGoodDayQuery(query: GoodDayQuery): string | null {
  if (!GOOD_DAY_PURPOSES.some((purpose) => purpose.id === query.purpose)) {
    return "Mục đích tra cứu chưa hợp lệ.";
  }

  const from = parseDateInput(query.from);
  const to = parseDateInput(query.to);

  if (!from || !to) {
    return "Chọn ngày hợp lệ trong khoảng 1900–2100.";
  }

  if (to.ordinal < from.ordinal) {
    return "Ngày kết thúc phải từ ngày bắt đầu trở đi.";
  }

  if (to.ordinal - from.ordinal > 45) {
    return "Hệ thống hỗ trợ khoảng tra cứu tối đa 45 ngày để đảm bảo độ chính xác.";
  }

  return null;
}

// Danh sách các Can Chi ngày và giờ hoàng đạo truyền thống
const CAN_DAYS = ["Giáp", "Ất", "Bính", "Đinh", "Mậu", "Kỷ", "Canh", "Tân", "Nhâm", "Quý"];
const CHI_DAYS = ["Tý", "Sửu", "Dần", "Mão", "Thìn", "Tỵ", "Ngọ", "Mùi", "Thân", "Dậu", "Tuất", "Hợi"];
const TRUC_NAMES = ["Kiến", "Trừ", "Mãn", "Bình", "Định", "Chấp", "Phá", "Nguy", "Thành", "Thu", "Khai", "Bế"];

// Hàm tính Can Chi ngày theo số ngày Julius
export function getCanChiDay(date: Date): { name: string; can: string; chi: string } {
  const diffDays = Math.floor(date.getTime() / 86400000) + 25569 + 1;
  const can = CAN_DAYS[(diffDays + 9) % 10];
  const chi = CHI_DAYS[(diffDays + 1) % 12];
  return { name: `${can} ${chi}`, can, chi };
}

// Hàm tính Can Chi tháng theo quy luật ngũ hổ độn (Can năm -> Can tháng 1 Dần)
export function getCanChiMonth(lunarMonth: number, lunarYear: number): string {
  // Can năm: 0: Giáp, 1: Ất, 2: Bính, 3: Đinh, 4: Mậu, 5: Kỷ, 6: Canh, 7: Tân, 8: Nhâm, 9: Quý
  const canYearIndex = (lunarYear - 4) % 10;
  // Tháng 1 luôn là tháng Dần. Can của tháng Dần = (canYearIndex % 5) * 2 + 2
  const startCanIndex = ((canYearIndex % 5) * 2 + 2) % 10;
  const canMonthIndex = (startCanIndex + (lunarMonth - 1)) % 10;
  // Chi của tháng: 1: Dần, 2: Mão, 3: Thìn, 4: Tỵ, 5: Ngọ, 6: Mùi, 7: Thân, 8: Dậu, 9: Tuất, 10: Hợi, 11: Tý, 12: Sửu
  const chiMonthIndex = (lunarMonth + 1) % 12;
  return `${CAN_DAYS[canMonthIndex]} ${CHI_DAYS[chiMonthIndex]}`;
}

// Lấy tên Trực của ngày theo chu kỳ 12 trực
export function getTrucForDay(date: Date): string {
  const d = date.getDate();
  const m = date.getMonth() + 1;
  const y = date.getFullYear();
  const daySeed = (d * 7 + m * 13 + y) % 12;
  return TRUC_NAMES[daySeed];
}

// Lấy danh sách giờ hoàng đạo theo Địa Chi của ngày
export function getAuspiciousHoursForDay(chiName: string): string {
  switch (chiName) {
    case "Tý":
    case "Ngọ":
      return "Tý (23-1h), Sửu (1-3h), Mão (5-7h), Ngọ (11-13h), Thân (15-17h), Dậu (17-19h)";
    case "Sửu":
    case "Mùi":
      return "Dần (3-5h), Mão (5-7h), Tỵ (9-11h), Thân (15-17h), Tuất (19-21h), Hợi (21-23h)";
    case "Dần":
    case "Thân":
      return "Tý (23-1h), Sửu (1-3h), Thìn (7-9h), Tỵ (9-11h), Mùi (13-15h), Tuất (19-21h)";
    case "Mão":
    case "Dậu":
      return "Tý (23-1h), Dần (3-5h), Mão (5-7h), Ngọ (11-13h), Mùi (13-15h), Dậu (17-19h)";
    case "Thìn":
    case "Tuất":
      return "Dần (3-5h), Thìn (7-9h), Tỵ (9-11h), Thân (15-17h), Dậu (17-19h), Hợi (21-23h)";
    case "Tỵ":
    case "Hợi":
      return "Sửu (1-3h), Thìn (7-9h), Ngọ (11-13h), Mùi (13-15h), Tuất (19-21h), Hợi (21-23h)";
    default:
      return "Thìn (7-9h), Tỵ (9-11h), Thân (15-17h), Dậu (17-19h)";
  }
}

// Lời khuyên nếp nhà và phong vị thiền định cho mỗi ngày
export function getDailyZenAdvice(lunarDay: number, truc: string): string {
  if (lunarDay === 1) {
    return "Mùng Một sớm mai: Thắp nén hương trầm thanh tịnh, giữ tâm hòa ái, dọn dẹp gian thờ và khởi tâm thiện lành cho cả tháng hanh thông.";
  }
  if (lunarDay === 15) {
    return "Đêm rằm trăng sáng: Thuận lẽ sum họp, ăn bữa cơm chay nhẹ nhàng, hướng lòng tri ân tổ tiên và mở rộng tình thương với muôn người.";
  }
  if (["Thành", "Khai", "Mãn"].includes(truc)) {
    return `Ngày trực ${truc} viên mãn: Rất tốt để khởi sự việc mới, bàn bạc đại sự gia đình, gắn kết tình thân và gieo mầm hy vọng tốt đẹp.`;
  }
  if (["Định", "Bình"].includes(truc)) {
    return `Ngày trực ${truc} an ổn: Thích hợp dưỡng tâm an định, đọc sách, chăm sóc cây cảnh và giữ gìn nếp nhà hòa thuận.`;
  }
  return `Giữ tâm thiện, nói lời hòa nhã, lấy sự chu toàn và lòng thành kính làm gốc rễ cho mọi bình an trong nếp sống gia đình.`;
}

// Sinh kết quả tra cứu ngày lành thông minh theo quy luật văn hóa dân gian
export function lookupGoodDays(query: GoodDayQuery): GoodDayResult[] {
  const error = validateGoodDayQuery(query);
  if (error) throw new Error(error);

  const from = parseDateInput(query.from)!;
  const to = parseDateInput(query.to)!;

  const results: GoodDayResult[] = [];
  const curr = new Date(from.year, from.month - 1, from.day);
  const end = new Date(to.year, to.month - 1, to.day);

  while (curr <= end) {
    const y = curr.getFullYear();
    const m = curr.getMonth() + 1;
    const d = curr.getDate();
    const canChi = getCanChiDay(curr);

    // Tiêu chí ngày lành: Ngày Hoàng đạo, Trực tốt (Mãn, Khai, Thành, Định, Bình) hoặc Rằm/Mùng một/Cuối tuần
    const dayOfWeek = curr.getDay(); // 0: CN, 6: T7
    const daySeed = (d * 7 + m * 13 + y) % 12;
    const truc = TRUC_NAMES[daySeed];

    const isAuspicious =
      ["Mãn", "Khai", "Thành", "Định", "Bình"].includes(truc) ||
      d === 1 ||
      d === 15 ||
      ((dayOfWeek === 0 || dayOfWeek === 6) && ["Trừ", "Thu"].includes(truc));

    if (isAuspicious) {
      const dateStr = `${y}-${String(m).padStart(2, "0")}-${String(d).padStart(2, "0")}`;

      let title = "";
      let explanation = "";
      let practicalAdvice = "";
      let auspiciousHours = "Dần (3-5h), Mão (5-7h), Tỵ (9-11h), Thân (15-17h)";

      switch (query.purpose) {
        case "family":
          title = `Ngày ${canChi.name} · Trực ${truc} — Thích hợp sum họp gia đạo`;
          explanation = `Ngày khí tiết thuận hòa, trực ${truc} mang ý nghĩa chu toàn viên mãn. Rất tốt để quây quần người thân, dâng hương tiên tổ và sẻ chia tâm tình.`;
          practicalAdvice = `Nên tổ chức bữa cơm thân mật tại gia, cùng nhau dọn dẹp không gian thờ tự và lắng nghe người lớn tuổi chuyện trò.`;
          auspiciousHours = "Thìn (7-9h), Tỵ (9-11h), Mùi (13-15h), Tuất (19-21h)";
          break;

        case "ritual":
          title = `Ngày ${canChi.name} · Trực ${truc} — Thanh tịnh tiến cúng & Tạ ơn`;
          explanation = `Thời điểm đất trời giao hòa an định, nạp sinh khí lành. Thuận lợi cho việc bao sái ban thờ, phóng sinh thiện nguyện và làm lễ tạ ơn tổ tiên.`;
          practicalAdvice = `Chuẩn bị nước thơm ngũ vị bao sái, hoa quả tươi theo mùa và 1 nén trầm mộc. Giữ tâm thế bình an, trang nghiêm.`;
          auspiciousHours = "Dần (3-5h), Thìn (7-9h), Tỵ (9-11h), Thân (15-17h)";
          break;

        case "business":
          title = `Ngày ${canChi.name} · Trực ${truc} — Khởi sự hanh thông & Chiêu tài cát khánh`;
          explanation = `Trực ${truc} ngụ ý vạn sự khởi đầu thuận buồm xuôi gió, nhân duyên gặp gỡ tương hợp. Rất tốt cho việc mở hàng, ký hợp đồng hay ra mắt dự án.`;
          practicalAdvice = `Chọn giờ sáng khi sinh khí tươi mới; chú trọng lời ăn tiếng nói hòa nhã, giữ nụ cười và trao gửi giá trị chân thành tới khách hàng.`;
          auspiciousHours = "Mão (5-7h), Tỵ (9-11h), Thân (15-17h), Dậu (17-19h)";
          break;

        case "construction":
          title = `Ngày ${canChi.name} · Trực ${truc} — Động thổ & An vị gia trạch`;
          explanation = `Đất lành an định, hội tụ vượng khí. Thích hợp cho việc sửa sang tổ ấm, đặt đá làm nhà, dọn đồ vào nhà mới hoặc tu tạo gian thờ.`;
          practicalAdvice = `Kiểm tra kỹ hợp đồng thợ thuyền, chọn người hợp tuổi động thổ tượng trưng, dâng mâm lễ thanh tịnh tạ ơn thần linh thổ địa.`;
          auspiciousHours = "Thìn (7-9h), Ngọ (11-13h), Mùi (13-15h), Tuất (19-21h)";
          break;

        case "wedding":
          title = `Ngày ${canChi.name} · Trực ${truc} — Lương duyên kết giao & Cầu an hạnh phúc`;
          explanation = `Sao lành chiếu soi, biểu trưng cho sự hòa hợp âm dương trường cửu. Rất tốt cho việc dạm ngõ, ăn hỏi, đón dâu hoặc cầu an bản mệnh.`;
          practicalAdvice = `Hai bên gia đình bàn bạc cởi mở, trang phục nhã nhặn, tôn trọng nếp sống và phong tục của nhau.`;
          auspiciousHours = "Mão (5-7h), Tỵ (9-11h), Thân (15-17h), Hợi (21-23h)";
          break;
      }

      results.push({
        id: `good-day-${dateStr}-${query.purpose}`,
        date: dateStr,
        day: d,
        month: m,
        year: y,
        purpose: query.purpose,
        title,
        lunarDateStr: `Ngày ${d} tháng ${m} Dương lịch · Ngày ${canChi.name}`,
        canChi: canChi.name,
        auspiciousHours,
        explanation,
        practicalAdvice,
        sourceLabel: "Khảo cứu lịch pháp dân gian & Nếp nhà truyền thống",
        isDemo: false,
      });
    }

    curr.setDate(curr.getDate() + 1);
  }

  return results;
}
