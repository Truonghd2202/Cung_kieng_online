import { useState, useMemo, type FormEvent } from "react";
import {
  Sparkles,
  Compass,
  RotateCcw,
  BookOpen,
  Info,
  Calendar,
  Clock,
  MapPin,
  ChevronRight,
  ShieldCheck,
  Heart,
  Eye,
} from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Card } from "./ui/card";
import { convertSolar2Lunar, getCanChiYear } from "../data/calendarData";
import { getCanChiDay, getCanChiMonth } from "../data/goodDayLookup";

// 12 Địa Chi
const DIA_CHI = [
  "Tý", "Sửu", "Dần", "Mão", "Thìn", "Tỵ",
  "Ngọ", "Mùi", "Thân", "Dậu", "Tuất", "Hợi"
] as const;

// 12 Cung Tử Vi cổ truyền
const PALACE_NAMES = [
  "MỆNH",
  "PHỤ MẪU",
  "PHÚC ĐỨC",
  "ĐIỀN TRẠCH",
  "QUAN LỘC",
  "NÔ BỘC",
  "THIÊN DI",
  "TẬT ÁCH",
  "TÀI BẠCH",
  "TỬ TỨC",
  "PHU THÊ",
  "HUYNH ĐỆ",
] as const;

// Các chính tinh và ý nghĩa nếp xưa
const STARS_FOR_PALACES: Record<string, { star: string; tone: string; element: string; meaning: string }> = {
  "MỆNH": {
    star: "Tử Vi · Thiên Phủ",
    tone: "Đế vương quý tinh",
    element: "Thổ / Thổ",
    meaning: "Tự chủ, bao dung, có tư chất lãnh đạo và trọng chữ tín trong đời sống gia đình.",
  },
  "PHỤ MẪU": {
    star: "Thái Dương · Thiên Lương",
    tone: "Quang minh ấm áp",
    element: "Hỏa / Mộc",
    meaning: "Cha mẹ hiền hòa, gia phong nề nếp; con cháu giữ trọn đạo hiếu và gia huấn tổ tiên.",
  },
  "PHÚC ĐỨC": {
    star: "Thiên Đồng · Hóa Khoa",
    tone: "Phúc ấm trường cửu",
    element: "Thủy / Mộc",
    meaning: "Tổ tiên để lại phúc ấm; tâm hồn thanh thản, chuộng việc thiện lành và sự an yên.",
  },
  "ĐIỀN TRẠCH": {
    star: "Vũ Khúc · Thiên Phủ",
    tone: "An cư lạc nghiệp",
    element: "Kim / Thổ",
    meaning: "Nếp nhà vững chãi, gia trạch tụ khí lành; thích vun vén không gian sống ấm cúng.",
  },
  "QUAN LỘC": {
    star: "Thái Dương · Hóa Quyền",
    tone: "Sự nghiệp quang minh",
    element: "Hỏa / Thủy",
    meaning: "Công việc chính trực, nỗ lực bền bỉ gặt hái thành quả; lấy đạo đức nghề nghiệp làm gốc.",
  },
  "NÔ BỘC": {
    star: "Thiên Cơ · Tả Phù",
    tone: "Bằng hữu tương trợ",
    element: "Mộc / Thổ",
    meaning: "Nhiều tri kỷ, bạn bè hòa nhã đồng hành, hỗ trợ lẫn nhau trong lúc khó khăn hoạn nạn.",
  },
  "THIÊN DI": {
    star: "Thất Sát · Hữu Bật",
    tone: "Viễn hành đắc lợi",
    element: "Kim / Thủy",
    meaning: "Thích nghi nhanh khi đi xa; bước ra xã hội được quý nhân giúp đỡ, mở rộng tầm mắt.",
  },
  "TẬT ÁCH": {
    star: "Thiên Lương · Giải Thần",
    tone: "Tai qua nạn khỏi",
    element: "Mộc / Thủy",
    meaning: "Sức khỏe dẻo dai, tâm an tịnh giúp vượt qua bệnh tật; chú trọng dưỡng sinh ăn uống.",
  },
  "TÀI BẠCH": {
    star: "Liêm Trinh · Vũ Khúc",
    tone: "Tụ tài cần kiệm",
    element: "Hỏa / Kim",
    meaning: "Tài lộc đến từ mồ hôi công sức chân chính; chi tiêu có kế hoạch, biết tích lũy cho mai sau.",
  },
  "TỬ TỨC": {
    star: "Cự Môn · Thiên Hỷ",
    tone: "Hậu duệ thành toàn",
    element: "Thủy / Thủy",
    meaning: "Con cháu thông tuệ, hiếu thảo; gia đình chú trọng giáo dục nhân cách từ tấm bé.",
  },
  "PHU THÊ": {
    star: "Thiên Tướng · Hồng Loan",
    tone: "Duyên lành sắt son",
    element: "Thủy / Thủy",
    meaning: "Bạn đời thấu hiểu sẻ chia; vợ chồng thuận hòa, kính nhau như thuở ban đầu gặp gỡ.",
  },
  "HUYNH ĐỆ": {
    star: "Tham Lang · Thiên Khôi",
    tone: "Cốt nhục tình thâm",
    element: "Thủy / Hỏa",
    meaning: "Anh chị em hòa thuận, tương thân tương ái; luôn là điểm tựa ấm áp của nhau.",
  },
};

// Bố cục bàn 12 Cung theo lưới 4x4 truyền thống
// Vị trí 12 Chi trên bàn tròn/vuông (theo chiều kim đồng hồ):
// Hàng 0: Tỵ (5), Ngọ (6), Mùi (7), Thân (8)
// Cột phải: Dậu (9), Tuất (10)
// Hàng 3: Hợi (11), Tý (0), Sửu (1), Dần (2)
// Cột trái: Mão (3), Thìn (4)
const GRID_CELLS = [
  { row: 0, col: 0, chiIndex: 5, chiName: "Tỵ" },
  { row: 0, col: 1, chiIndex: 6, chiName: "Ngọ" },
  { row: 0, col: 2, chiIndex: 7, chiName: "Mùi" },
  { row: 0, col: 3, chiIndex: 8, chiName: "Thân" },
  { row: 1, col: 3, chiIndex: 9, chiName: "Dậu" },
  { row: 2, col: 3, chiIndex: 10, chiName: "Tuất" },
  { row: 3, col: 3, chiIndex: 11, chiName: "Hợi" },
  { row: 3, col: 2, chiIndex: 0, chiName: "Tý" },
  { row: 3, col: 1, chiIndex: 1, chiName: "Sửu" },
  { row: 3, col: 0, chiIndex: 2, chiName: "Dần" },
  { row: 2, col: 0, chiIndex: 3, chiName: "Mão" },
  { row: 1, col: 0, chiIndex: 4, chiName: "Thìn" },
];

export function BirthChartDemoPanel() {
  const [birthDate, setBirthDate] = useState("1998-08-15");
  const [birthTime, setBirthTime] = useState("08:30");
  const [gender, setGender] = useState<"nam" | "nu">("nam");
  const [birthPlace, setBirthPlace] = useState("Hà Nội");
  const [selectedPalaceIndex, setSelectedPalaceIndex] = useState<number>(0);
  const [hasCalculated, setHasCalculated] = useState(true);

  // Tính toán Địa Chi giờ sinh
  const hourChiIndex = useMemo(() => {
    if (!birthTime) return 4; // Thìn mặc định
    const [h] = birthTime.split(":").map(Number);
    // 23-1: Tý (0), 1-3: Sửu (1), 3-5: Dần (2), 5-7: Mão (3), 7-9: Thìn (4)...
    if (h >= 23 || h < 1) return 0;
    return Math.floor((h + 1) / 2) % 12;
  }, [birthTime]);

  // Tính toán Âm lịch và an Cung Mệnh theo thuật toán dân gian
  const chartData = useMemo(() => {
    const parts = birthDate.split("-").map(Number);
    if (parts.length !== 3) return null;
    const [y, m, d] = parts;

    const [lunarDay, lunarMonth, lunarYear] = convertSolar2Lunar(d, m, y);
    const canChiY = getCanChiYear(lunarYear);
    const dateObj = new Date(y, m - 1, d);
    const canChiD = getCanChiDay(dateObj);
    const canChiM = getCanChiMonth(lunarMonth, lunarYear);

    // Thuật toán an Cung Mệnh truyền thống:
    // Khởi từ Dần (chỉ số 2) tính là tháng 1, đếm thuận đến tháng sinh.
    // Từ cung đó kể là giờ Tý, đếm nghịch đến giờ sinh -> đó là CUNG MỆNH.
    const monthStartChi = (2 + (lunarMonth - 1)) % 12;
    const menhChiIndex = (monthStartChi - hourChiIndex + 12) % 12;

    // Cung Thân: Khởi từ cung tháng sinh, đếm thuận đến giờ sinh
    const thanChiIndex = (monthStartChi + hourChiIndex) % 12;

    // Phân bổ 12 Cung chức năng vào 12 Địa Chi (từ cung Mệnh đếm nghịch theo chiều kim đồng hồ)
    const chiToPalace: Record<number, { palaceName: string; isMenh: boolean; isThan: boolean }> = {};
    for (let i = 0; i < 12; i++) {
      // Cung thứ i: Mệnh (0), Phụ Mẫu (1), Phúc Đức (2)...
      const chiIdx = (menhChiIndex - i + 12) % 12;
      chiToPalace[chiIdx] = {
        palaceName: PALACE_NAMES[i],
        isMenh: i === 0,
        isThan: chiIdx === thanChiIndex,
      };
    }

    return {
      solarDateStr: `${d}/${m}/${y}`,
      lunarDateStr: `Ngày ${lunarDay} tháng ${lunarMonth} năm ${canChiY}`,
      lunarYear,
      canChiY,
      canChiM,
      canChiD: canChiD.name,
      hourChiName: DIA_CHI[hourChiIndex],
      menhChiName: DIA_CHI[menhChiIndex],
      thanChiName: DIA_CHI[thanChiIndex],
      chiToPalace,
    };
  }, [birthDate, hourChiIndex]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setHasCalculated(true);
  };

  const selectedPalaceName = PALACE_NAMES[selectedPalaceIndex];
  const starInfo = STARS_FOR_PALACES[selectedPalaceName] || STARS_FOR_PALACES["MỆNH"];

  return (
    <section
      id="birth-chart-demo-title"
      aria-labelledby="birth-chart-heading"
      className="mt-8 rounded-3xl border border-amber-500/30 bg-surface p-5 sm:p-8 shadow-sm"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 mb-6 border-b border-line">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-bold uppercase tracking-widest text-amber-800 dark:text-amber-300">
              KHẢO CỨU NẾP XƯA
            </span>
            <span className="text-xs text-stone-400">·</span>
            <span className="text-xs text-stone-500">Bản đồ 12 Cung Vị</span>
          </div>
          <h2 id="birth-chart-heading" className="font-display text-xl sm:text-2xl font-bold text-ink mt-1">
            Bản đồ Lá Số 12 Cung Hoàng Đạo Việt Nam
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400 mt-1 leading-relaxed">
            Mượn sự phân bổ của 12 cung nếp xưa để quán chiếu nội tâm, nhìn lại gia đạo và hướng thiện.
          </p>
        </div>

        <Badge variant="outline" className="border-amber-500/40 text-amber-800 dark:text-amber-300 bg-amber-500/10 text-xs px-3 py-1 self-start sm:self-auto font-medium">
          ✦ THỂ NGHIỆM CHIÊM NGHIỆM
        </Badge>
      </div>

      {/* Input Parameters Form */}
      <form onSubmit={handleSubmit} className="p-4 sm:p-5 rounded-2xl bg-surface-soft border border-line mb-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
          <div>
            <label className="block text-xs font-bold uppercase text-stone-600 dark:text-stone-400 mb-1.5">
              1. Ngày sinh (Dương lịch)
            </label>
            <input
              type="date"
              required
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
              className="w-full rounded-xl border border-line bg-surface px-3 py-2 text-xs sm:text-sm text-ink focus:outline-none focus:ring-2 focus:ring-amber-500/30"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-stone-600 dark:text-stone-400 mb-1.5">
              2. Giờ sinh (Thời khắc)
            </label>
            <input
              type="time"
              required
              value={birthTime}
              onChange={(e) => setBirthTime(e.target.value)}
              className="w-full rounded-xl border border-line bg-surface px-3 py-2 text-xs sm:text-sm text-ink focus:outline-none focus:ring-2 focus:ring-amber-500/30"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-stone-600 dark:text-stone-400 mb-1.5">
              3. Giới tính
            </label>
            <div className="grid grid-cols-2 gap-1.5">
              <button
                type="button"
                onClick={() => setGender("nam")}
                className={`py-2 px-3 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                  gender === "nam"
                    ? "bg-amber-800 text-white border-amber-800 shadow-xs"
                    : "bg-surface text-stone-700 dark:text-stone-300 border-line hover:border-amber-500/40"
                }`}
              >
                Nam mệnh
              </button>
              <button
                type="button"
                onClick={() => setGender("nu")}
                className={`py-2 px-3 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                  gender === "nu"
                    ? "bg-amber-800 text-white border-amber-800 shadow-xs"
                    : "bg-surface text-stone-700 dark:text-stone-300 border-line hover:border-amber-500/40"
                }`}
              >
                Nữ mệnh
              </button>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-stone-600 dark:text-stone-400 mb-1.5">
              4. Nơi sinh / Quê quán
            </label>
            <input
              type="text"
              value={birthPlace}
              onChange={(e) => setBirthPlace(e.target.value)}
              placeholder="Ví dụ: Thăng Long, Cố Đô Huế..."
              className="w-full rounded-xl border border-line bg-surface px-3 py-2 text-xs sm:text-sm text-ink focus:outline-none focus:ring-2 focus:ring-amber-500/30"
            />
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 mt-4 pt-3 border-t border-line">
          <span className="text-xs text-stone-500 italic">
            * Tính toán vị trí 12 cung theo âm lịch thiên văn Việt Nam ngay trên trình duyệt
          </span>
          <Button
            type="submit"
            className="rounded-xl bg-gradient-to-r from-red-800 to-amber-700 hover:from-red-700 hover:to-amber-800 text-white font-semibold text-xs px-5 min-h-9 cursor-pointer shadow-xs gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Lập bàn Tử Vi nếp xưa</span>
          </Button>
        </div>
      </form>

      {/* 12-Palace Interactive Grid Map */}
      {hasCalculated && chartData && (
        <div className="space-y-6">
          <div className="rounded-3xl border border-amber-500/40 bg-gradient-to-br from-surface via-surface to-amber-500/[0.04] p-4 sm:p-6 shadow-md overflow-hidden">
            {/* Top Bar Summary */}
            <div className="flex flex-wrap items-center justify-between gap-3 pb-3 mb-4 border-b border-line text-xs">
              <div className="flex items-center gap-2">
                <span className="font-bold text-amber-800 dark:text-amber-300">
                  {chartData.lunarDateStr}
                </span>
                <span className="text-stone-400">·</span>
                <span className="text-stone-600 dark:text-stone-400 font-medium">
                  Giờ {chartData.hourChiName} ({birthTime})
                </span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-stone-500">Mệnh tại: <strong className="text-amber-800 dark:text-amber-300">{chartData.menhChiName}</strong></span>
                <span className="text-stone-500">Thân cư: <strong className="text-amber-800 dark:text-amber-300">{chartData.thanChiName}</strong></span>
              </div>
            </div>

            {/* Traditional 12 Palace Grid (4x3 outer ring with center board) */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-2.5">
              {GRID_CELLS.map((cell) => {
                const palaceInfo = chartData.chiToPalace[cell.chiIndex];
                const palaceName = palaceInfo?.palaceName || "MỆNH";
                const isSelected = PALACE_NAMES[selectedPalaceIndex] === palaceName;
                const star = STARS_FOR_PALACES[palaceName];

                return (
                  <button
                    key={cell.chiName}
                    type="button"
                    onClick={() => {
                      const idx = PALACE_NAMES.indexOf(palaceName as any);
                      if (idx >= 0) setSelectedPalaceIndex(idx);
                    }}
                    className={`p-3 rounded-2xl text-left border transition-all cursor-pointer relative flex flex-col justify-between min-h-[96px] sm:min-h-[110px] ${
                      isSelected
                        ? "bg-gradient-to-b from-amber-700 to-amber-900 border-amber-400 text-white shadow-md ring-2 ring-amber-400/40 scale-[1.02] z-10"
                        : palaceInfo?.isMenh
                        ? "bg-amber-500/15 border-amber-500/60 text-ink hover:border-amber-600"
                        : "bg-surface border-line hover:border-amber-500/40 hover:bg-surface-soft text-ink"
                    }`}
                  >
                    <div className="flex items-center justify-between w-full">
                      <span className={`text-[11px] font-extrabold uppercase tracking-wider ${
                        isSelected ? "text-amber-200" : "text-amber-800 dark:text-amber-300"
                      }`}>
                        CUNG {palaceName}
                      </span>
                      <span className={`text-xs font-bold ${isSelected ? "text-white/80" : "text-stone-400"}`}>
                        {cell.chiName}
                      </span>
                    </div>

                    <div className="my-1">
                      <div className={`text-xs font-bold truncate ${isSelected ? "text-white" : "text-stone-800 dark:text-stone-200"}`}>
                        {star?.star.split("·")[0]}
                      </div>
                      <div className={`text-[10px] truncate ${isSelected ? "text-amber-200/90" : "text-stone-500"}`}>
                        {star?.tone}
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-[10px] pt-1 border-t border-line/40">
                      {palaceInfo?.isMenh && (
                        <span className={`px-1.5 py-0.2 rounded font-bold uppercase tracking-tight ${
                          isSelected ? "bg-amber-400 text-amber-950" : "bg-amber-600 text-white"
                        }`}>
                          Bản Mệnh
                        </span>
                      )}
                      {palaceInfo?.isThan && !palaceInfo.isMenh && (
                        <span className={`px-1.5 py-0.2 rounded font-bold uppercase tracking-tight ${
                          isSelected ? "bg-white/20 text-white" : "bg-stone-500 text-white"
                        }`}>
                          Thân Cư
                        </span>
                      )}
                      {!palaceInfo?.isMenh && !palaceInfo?.isThan && (
                        <span className={isSelected ? "text-white/60" : "text-stone-400"}>
                          Bấm để xem
                        </span>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Palace Detail Insight Panel */}
          <div className="p-5 sm:p-7 rounded-3xl bg-surface border border-amber-500/30 shadow-xs space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-line">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-600" />
                <h3 className="font-display text-lg sm:text-xl font-bold text-ink">
                  Luận giải Cung {selectedPalaceName} — {starInfo.star}
                </h3>
              </div>
              <Badge variant="outline" className="border-amber-500/30 text-amber-800 dark:text-amber-300 font-semibold bg-amber-500/10 text-xs self-start sm:self-auto">
                Khí chất: {starInfo.element}
              </Badge>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              <div className="p-4 rounded-2xl bg-surface-soft border border-line space-y-1">
                <span className="text-[10px] uppercase font-bold text-stone-500 tracking-wider">
                  Chính tinh tọa thủ
                </span>
                <div className="font-bold text-sm text-ink">{starInfo.star}</div>
                <p className="text-stone-600 dark:text-stone-400 leading-relaxed text-[11px] pt-1">
                  Đặc tính: {starInfo.tone}
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-surface-soft border border-line space-y-1 md:col-span-2">
                <span className="text-[10px] uppercase font-bold text-amber-800 dark:text-amber-300 tracking-wider">
                  Ý nghĩa nếp nhà & Đạo dưỡng tâm
                </span>
                <p className="text-stone-700 dark:text-stone-300 leading-relaxed text-xs pt-0.5">
                  {starInfo.meaning}
                </p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-amber-500/[0.07] border border-amber-500/20 text-xs text-stone-700 dark:text-stone-300 leading-relaxed flex items-start gap-2.5">
              <Info className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
              <div>
                <strong>Lời cổ nhân gửi gắm: </strong>
                Lá số là tấm gương phản chiếu để con người tự biết cương nhu, biết chỗ mạnh mà phát huy,
                chỗ yếu mà thận trọng bồi đắp. Cung mệnh dẫu thuận hay nghịch, nếp sống chân thành và tâm hướng thiện
                mới là cội rễ của phúc lộc bền lâu.
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
