import React, { useState, useMemo, useRef } from "react";
import {
  ArrowLeft,
  Sparkles,
  BookOpen,
  Info,
  ShieldCheck,
  CheckCircle2,
  Lock,
  Compass,
  Eye,
  RotateCcw,
  Flower2,
  HelpCircle,
  AlertTriangle,
  Sun,
  Flame,
  Droplets,
  Trees,
  Mountain,
} from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { Badge } from "@/src/components/ui/badge";
import { Card } from "@/src/components/ui/card";
import {
  calculateHoroscope,
  validateBirthDate,
  HoroscopeCalculationResult,
} from "@/src/data/horoscopeEngine";

interface HoroscopeScreenProps {
  onBackToExperience: () => void;
  onGoToCulture?: () => void;
  onGoToHome?: () => void;
}

export const HoroscopeScreen: React.FC<HoroscopeScreenProps> = ({
  onBackToExperience,
  onGoToCulture,
  onGoToHome,
}) => {
  const currentMaxYear = new Date().getFullYear();

  const [day, setDay] = useState<number>(15);
  const [month, setMonth] = useState<number>(8);
  const [year, setYear] = useState<number>(1998);
  const [hourCanh, setHourCanh] = useState<string>("thin");
  const [noHour, setNoHour] = useState(false);
  const [region, setRegion] = useState("bac");
  const [agreedDisclaimer, setAgreedDisclaimer] = useState(true);
  const [hasConfirmed, setHasConfirmed] = useState(false);
  const [birthDateError, setBirthDateError] = useState("");
  const feedbackRef = useRef<HTMLDivElement | null>(null);

  // Tính toán kết quả trực tiếp ngay khi người dùng thay đổi ngày/giờ sinh
  const liveResult = useMemo(() => {
    try {
      const err = validateBirthDate(day, month, year);
      if (err) return null;
      return calculateHoroscope({
        day,
        month,
        year,
        hourCanh,
        noHour,
        region,
      });
    } catch {
      return null;
    }
  }, [day, month, year, hourCanh, noHour, region]);

  const handleGenerate = (event: React.FormEvent) => {
    event.preventDefault();

    const dateError = validateBirthDate(day, month, year);
    if (dateError) {
      setBirthDateError(dateError);
      return;
    }

    if (!agreedDisclaimer) {
      setBirthDateError("Bạn hãy đánh dấu đồng ý với nguyên tắc chiêm nghiệm văn hóa.");
      return;
    }

    setBirthDateError("");
    setHasConfirmed(true);

    requestAnimationFrame(() => {
      feedbackRef.current?.scrollIntoView({ behavior: "smooth" });
    });
  };

  const handleReset = () => {
    setDay(15);
    setMonth(8);
    setYear(1998);
    setHourCanh("thin");
    setNoHour(false);
    setRegion("bac");
    setHasConfirmed(false);
    setBirthDateError("");
  };

  return (
    <div className="screen-shell">
      <main className="page-container max-w-6xl">
        {/* Top Breadcrumb & Status Ribbon */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 text-xs text-stone-600 dark:text-stone-400">
          <div className="flex items-center gap-2">
            <button
              onClick={onGoToHome}
              className="hover:text-amber-800 dark:hover:text-amber-300 cursor-pointer transition-colors"
            >
              Hôm nay
            </button>
            <span className="text-stone-400">/</span>
            <button
              onClick={onBackToExperience}
              className="hover:text-amber-800 dark:hover:text-amber-300 cursor-pointer transition-colors"
            >
              Trải nghiệm
            </button>
            <span className="text-stone-400">/</span>
            <span className="text-amber-800 dark:text-amber-300 font-semibold">Biểu tượng ngày sinh</span>
          </div>

          <button
            onClick={onBackToExperience}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-stone-600 dark:text-stone-400 hover:text-amber-800 dark:hover:text-amber-300 transition-colors cursor-pointer self-start sm:self-auto"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Về Không gian Chiêm tinh</span>
          </button>
        </div>

        {/* Header Title Section & Mini Artwork */}
        <section className="mb-8 p-6 sm:p-8 rounded-3xl border border-amber-500/30 bg-gradient-to-br from-surface via-surface to-amber-500/[0.04] shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-bl from-amber-500/10 to-transparent pointer-events-none rounded-bl-full" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            <div className="lg:col-span-8 space-y-3">
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-bold uppercase tracking-widest text-amber-800 dark:text-amber-300">
                  ĐỐI THOẠI NỘI TÂM · KHẢO CỨU NẾP XƯA
                </span>
                <span className="text-xs text-stone-400">·</span>
                <span className="text-xs text-stone-500">Việt Lịch Thuần Túy</span>
              </div>

              <h1 className="page-title font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-ink leading-tight">
                Một Góc Nhìn Từ Ngày Sinh Của Bạn
              </h1>

              <p className="text-xs sm:text-sm text-stone-700 dark:text-stone-300 leading-relaxed max-w-2xl">
                Người xưa mượn sự vận hành của tinh tú và tiết khí để soi tỏ phẩm hạnh, quán chiếu tâm tính
                và tìm điểm tựa an lành trong nhịp sống. Đây là không gian đối thoại nội tâm với hệ thống
                biểu tượng cổ truyền, hoàn toàn không phải lời tiên đoán số mệnh hay định đoạt tương lai.
              </p>

              <div className="flex items-center gap-3 text-xs text-stone-500 flex-wrap pt-1">
                <span>✦ Tính toán tức thời</span>
                <span>✦ Không áp đặt định kiến</span>
                <span>✦ Bảo mật tuyệt đối trên trình duyệt</span>
              </div>
            </div>

            <div className="lg:col-span-4">
              <div className="rounded-2xl overflow-hidden border border-line shadow-xs relative aspect-16/10 bg-surface-soft">
                <img
                  src="/images/relic_book.jpg"
                  alt="Sách cũ viết trên giấy dó"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent pointer-events-none" />
                <div className="absolute bottom-2.5 left-3.5 right-3.5 text-[11px] text-white/90 italic flex items-center justify-between">
                  <span>Tranh đồ họa giấy Dó cổ phong</span>
                  <span className="text-amber-300">✦</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 2-Column Content: Form Left (5 cols) | Blueprint Preview Right (7 cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start mb-10">
          {/* Form Column (5 cols) */}
          <div className="lg:col-span-5 space-y-4 lg:sticky lg:top-24 self-start">
            <Card className="p-5 sm:p-7 rounded-3xl bg-surface border border-line shadow-xs">
              <div className="mb-4 pb-3 border-b border-line">
                <h3 className="font-display font-bold text-base sm:text-lg text-ink flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-600" />
                  <span>Thông tin ngày sinh</span>
                </h3>
                <p className="text-xs text-stone-500 mt-0.5 leading-relaxed">
                  Đối chiếu ngũ hành và nạp âm tương ứng ngay trên trình duyệt của bạn.
                </p>
              </div>

              <form onSubmit={handleGenerate} className="space-y-4">
                {/* 1. Ngày sinh Dương lịch */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-xs font-bold uppercase text-stone-600 dark:text-stone-400">
                      1. Ngày sinh (Dương lịch)*
                    </label>
                    <span className="text-[11px] text-amber-800 dark:text-amber-300 font-medium">Lịch chuẩn</span>
                  </div>

                  <div className="grid grid-cols-3 gap-2">
                    <select
                      aria-label="Ngày sinh"
                      value={day}
                      onChange={(e) => setDay(Number(e.target.value))}
                      className="px-2.5 py-2.5 rounded-xl border border-line text-xs font-medium text-ink bg-surface outline-none focus:ring-2 focus:ring-amber-500/30"
                    >
                      {Array.from({ length: 31 }, (_, i) => i + 1).map((d) => (
                        <option key={d} value={d}>
                          Ngày {d}
                        </option>
                      ))}
                    </select>

                    <select
                      aria-label="Tháng sinh"
                      value={month}
                      onChange={(e) => setMonth(Number(e.target.value))}
                      className="px-2.5 py-2.5 rounded-xl border border-line text-xs font-medium text-ink bg-surface outline-none focus:ring-2 focus:ring-amber-500/30"
                    >
                      {Array.from({ length: 12 }, (_, i) => i + 1).map((m) => (
                        <option key={m} value={m}>
                          Tháng {m}
                        </option>
                      ))}
                    </select>

                    <select
                      aria-label="Năm sinh"
                      value={year}
                      onChange={(e) => setYear(Number(e.target.value))}
                      className="px-2.5 py-2.5 rounded-xl border border-line text-xs font-medium text-ink bg-surface outline-none focus:ring-2 focus:ring-amber-500/30"
                    >
                      {Array.from(
                        { length: currentMaxYear - 1920 + 1 },
                        (_, i) => currentMaxYear - i
                      ).map((y) => (
                        <option key={y} value={y}>
                          Năm {y}
                        </option>
                      ))}
                    </select>
                  </div>
                  <p className="text-[11px] text-stone-500 mt-1 italic">
                    Hỗ trợ đầy đủ các năm từ 1920 đến {currentMaxYear}.
                  </p>
                </div>

                {/* 2. Giờ sinh (Tùy chọn) */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-xs font-bold uppercase text-stone-600 dark:text-stone-400">
                      2. Giờ sinh (Thời khắc)
                    </label>
                    <label className="flex items-center gap-1 text-[11px] text-stone-500 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={noHour}
                        onChange={(e) => setNoHour(e.target.checked)}
                        className="rounded text-amber-600 focus:ring-amber-500"
                      />
                      <span>Không nhớ giờ</span>
                    </label>
                  </div>

                  <select
                    aria-label="Giờ sinh"
                    disabled={noHour}
                    value={hourCanh}
                    onChange={(e) => setHourCanh(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl border border-line text-xs font-medium text-ink bg-surface outline-none focus:ring-2 focus:ring-amber-500/30 disabled:opacity-50"
                  >
                    <option value="ty">Giờ Tý (23:00 - 01:00) • Canh một sâu thẳm</option>
                    <option value="suu">Giờ Sửu (01:00 - 03:00) • Đêm lạnh chuyển mình</option>
                    <option value="dan">Giờ Dần (03:00 - 05:00) • Hừng đông thức giấc</option>
                    <option value="mao">Giờ Mão (05:00 - 07:00) • Bình minh rạng ngời</option>
                    <option value="thin">Giờ Thìn (07:00 - 09:00) • Ánh nắng ấm áp</option>
                    <option value="ty_day">Giờ Tỵ (09:00 - 11:00) • Mặt trời vươn cao</option>
                    <option value="ngo">Giờ Ngọ (11:00 - 13:00) • Giữa trưa rực rỡ</option>
                    <option value="mui">Giờ Mùi (13:00 - 15:00) • Nắng dịu chiều về</option>
                    <option value="than">Giờ Thân (15:00 - 17:00) • Gió thoảng chiều tà</option>
                    <option value="dau">Giờ Dậu (17:00 - 19:00) • Hoàng hôn buông rèm</option>
                    <option value="tuat">Giờ Tuất (19:00 - 21:00) • Nếp nhà lên đèn</option>
                    <option value="hoi">Giờ Hợi (21:00 - 23:00) • Đêm về yên nghỉ</option>
                  </select>
                </div>

                {/* 3. Vùng sinh / Phương vị */}
                <div>
                  <label className="block text-xs font-bold uppercase text-stone-600 dark:text-stone-400 mb-1.5">
                    3. Vùng sinh / Phương vị
                  </label>
                  <select
                    aria-label="Vùng sinh hoặc phương vị"
                    value={region}
                    onChange={(e) => setRegion(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl border border-line text-xs font-medium text-ink bg-surface outline-none focus:ring-2 focus:ring-amber-500/30"
                  >
                    <option value="bac">Miền Bắc (Khí hậu tứ thời phân minh, cội nguồn văn hóa)</option>
                    <option value="trung">Miền Trung (Nắng gió dải Trường Sơn kiên cường, nhẫn nại)</option>
                    <option value="nam">Miền Nam (Mùa mưa nắng phù sa hào sảng, phóng khoáng)</option>
                  </select>
                </div>

                {/* 4. Checkbox đồng ý */}
                <div className="p-3 rounded-2xl bg-surface-soft border border-line">
                  <label className="flex items-start gap-2.5 text-xs text-stone-700 dark:text-stone-300 leading-relaxed cursor-pointer">
                    <input
                      type="checkbox"
                      checked={agreedDisclaimer}
                      onChange={(e) => setAgreedDisclaimer(e.target.checked)}
                      className="mt-0.5 rounded text-amber-600 focus:ring-amber-500"
                    />
                    <span>
                      Tôi hiểu đây là hoạt động tìm hiểu biểu tượng văn hóa để tự soi chiếu nội tâm,
                      không mang tính phán xét bói toán.
                    </span>
                  </label>
                </div>

                {birthDateError && (
                  <p
                    role="alert"
                    className="rounded-xl border border-red-500/30 bg-red-500/10 px-3.5 py-2.5 text-xs text-red-700 leading-relaxed"
                  >
                    {birthDateError}
                  </p>
                )}

                {/* Action Button */}
                <div className="flex gap-2 pt-1">
                  <Button
                    type="submit"
                    className="flex-1 py-3 rounded-xl bg-gradient-to-r from-red-800 to-amber-700 hover:from-red-700 hover:to-amber-800 text-white font-semibold text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer min-h-11"
                  >
                    <Eye className="w-4 h-4" />
                    <span>Xác nhận & Khắc ghi bản mệnh</span>
                  </Button>

                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleReset}
                    className="px-3 rounded-xl border-line hover:bg-surface-soft text-ink cursor-pointer min-h-11"
                    title="Thiết lập lại ngày mặc định"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </Button>
                </div>
              </form>

              {/* Data Commitment Note */}
              <div className="mt-4 p-3 rounded-2xl bg-amber-500/[0.06] border border-amber-500/20 text-xs text-stone-600 dark:text-stone-400 flex items-start gap-2">
                <Lock className="w-3.5 h-3.5 text-amber-700 shrink-0 mt-0.5" />
                <span className="text-[11px] leading-relaxed">
                  Thuật toán đối chiếu diễn ra nội bộ trên trình duyệt, không lưu trữ ngày sinh trên máy chủ.
                </span>
              </div>
            </Card>
          </div>

          {/* Blueprint & Results Column (7 cols) - LUÔN HIỂN THỊ ĐẦY ĐỦ */}
          <div ref={feedbackRef} className="lg:col-span-7 space-y-4">
            {liveResult && (
              <Card className="p-5 sm:p-7 rounded-3xl bg-surface border border-amber-500/30 shadow-md">
                <div className="flex flex-wrap items-center justify-between gap-2 pb-3 mb-4 border-b border-line">
                  <div className="flex items-center gap-2">
                    <Compass className="w-4 h-4 text-amber-700" />
                    <h3 className="font-display font-bold text-base sm:text-lg text-ink">
                      Bản Chiêm Nghiệm Biểu Tượng Văn Hóa
                    </h3>
                  </div>
                  <Badge
                    variant="outline"
                    className={`text-xs px-2.5 py-0.5 font-medium ${
                      hasConfirmed
                        ? "border-emerald-500/40 text-emerald-800 dark:text-emerald-300 bg-emerald-500/10"
                        : "border-amber-500/40 text-amber-800 dark:text-amber-300 bg-amber-500/10"
                    }`}
                  >
                    {hasConfirmed ? "✓ Đã khắc ghi tâm nguyện" : "✦ Đối chiếu theo ngày đang chọn"}
                  </Badge>
                </div>

                {hasConfirmed && (
                  <div className="mb-4 p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-900 dark:text-emerald-200 flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <strong>Đã đối chiếu hoàn tất: </strong>
                      Ngày Dương lịch <strong>{liveResult.solarDate}</strong> tương ứng ngày Âm lịch{" "}
                      <strong>{liveResult.lunarDate}</strong>, năm Can Chi{" "}
                      <strong>{liveResult.canChiYear}</strong>.
                    </div>
                  </div>
                )}

                {/* Block 1: Thông tin bản mệnh & Khung biểu tượng đối ứng */}
                <div className="p-4 sm:p-5 rounded-2xl bg-surface-soft border border-line mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-bold text-xs sm:text-sm text-ink flex items-center gap-1.5">
                      <span className="w-4 h-4 rounded-full bg-amber-800 text-white text-[10px] flex items-center justify-center font-bold">
                        1
                      </span>
                      <span>Thông tin bản mệnh & Tứ trụ khí đối ứng</span>
                    </h4>
                    <span className="text-xs text-amber-800 dark:text-amber-300 font-semibold">
                      {liveResult.elementTitle}
                    </span>
                  </div>

                  <div className="py-3 border-y border-line grid grid-cols-2 sm:grid-cols-4 gap-3 text-center my-3">
                    <div className="p-2 rounded-xl bg-surface">
                      <div className="text-[10px] uppercase text-stone-500 font-bold">
                        Năm Can Chi
                      </div>
                      <div className="font-bold text-xs sm:text-sm text-ink mt-0.5">
                        {liveResult.canChiYear}
                      </div>
                      <div className="text-[10px] text-stone-500 truncate" title={liveResult.napAm}>
                        {liveResult.napAm}
                      </div>
                    </div>

                    <div className="p-2 rounded-xl bg-surface">
                      <div className="text-[10px] uppercase text-stone-500 font-bold">
                        Mùa sinh
                      </div>
                      <div className="font-bold text-xs sm:text-sm text-ink mt-0.5">
                        {liveResult.seasonName}
                      </div>
                      <div className="text-[10px] text-stone-500 truncate" title={liveResult.seasonDetail}>
                        {liveResult.seasonDetail.split("•")[0]}
                      </div>
                    </div>

                    <div className="p-2 rounded-xl bg-surface">
                      <div className="text-[10px] uppercase text-stone-500 font-bold">
                        Phương vị
                      </div>
                      <div className="font-bold text-xs sm:text-sm text-ink mt-0.5">
                        {liveResult.regionName}
                      </div>
                      <div className="text-[10px] text-stone-500">
                        {region === "bac" ? "Tứ thời phân minh" : region === "trung" ? "Kiên định nhẫn nại" : "Trù phú hào sảng"}
                      </div>
                    </div>

                    <div className="p-2 rounded-xl bg-surface">
                      <div className="text-[10px] uppercase text-amber-800 dark:text-amber-300 font-bold">
                        Bản Mệnh
                      </div>
                      <div className="font-bold text-xs sm:text-sm text-amber-800 dark:text-amber-300 mt-0.5">
                        Hành {liveResult.element}
                      </div>
                      <div className="text-[10px] text-stone-500 truncate">
                        {liveResult.supportElement.split("(")[0]}
                      </div>
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-surface border border-line text-xs text-stone-700 dark:text-stone-300">
                    <strong className="text-amber-800 dark:text-amber-300">✦ Ý nghĩa Nạp âm: </strong>
                    <span>{liveResult.elementMeaning}</span>
                  </div>
                </div>

                {/* Block 2: Biểu tượng ngũ hành & Phẩm cách tương quan */}
                <div className="p-4 sm:p-5 rounded-2xl bg-surface-soft border border-line mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-bold text-xs sm:text-sm text-ink flex items-center gap-1.5">
                      <span className="w-4 h-4 rounded-full bg-amber-800 text-white text-[10px] flex items-center justify-center font-bold">
                        2
                      </span>
                      <span>Biểu tượng Ngũ Hành & Bài học nhân sinh</span>
                    </h4>
                    <span className="text-[11px] font-semibold text-amber-800 dark:text-amber-300 bg-amber-500/15 px-2 py-0.5 rounded-full border border-amber-500/30">
                      Bản mệnh: {liveResult.element}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 my-3">
                    {/* Kim */}
                    <div
                      className={`p-2.5 rounded-xl border text-center transition-all ${
                        liveResult.element === "Kim"
                          ? "bg-amber-500/20 border-amber-500 ring-2 ring-amber-400/40 shadow-xs"
                          : "bg-surface border-line"
                      }`}
                    >
                      <div className="text-xs font-bold text-amber-800 dark:text-amber-300 mb-0.5">Kim</div>
                      <div className="text-[11px] font-semibold text-ink">Cương trực</div>
                      <div className="text-[10px] text-stone-500 mt-0.5">Thanh khiết, nghĩa khí</div>
                      {liveResult.element === "Kim" && (
                        <span className="mt-1 inline-block text-[10px] font-bold text-amber-900 bg-amber-400/40 px-1.5 py-0.2 rounded">
                          Bản mệnh
                        </span>
                      )}
                    </div>

                    {/* Mộc */}
                    <div
                      className={`p-2.5 rounded-xl border text-center transition-all ${
                        liveResult.element === "Mộc"
                          ? "bg-emerald-500/20 border-emerald-500 ring-2 ring-emerald-400/40 shadow-xs"
                          : "bg-surface border-line"
                      }`}
                    >
                      <div className="text-xs font-bold text-emerald-800 dark:text-emerald-300 mb-0.5">Mộc</div>
                      <div className="text-[11px] font-semibold text-ink">Nhân ái</div>
                      <div className="text-[10px] text-stone-500 mt-0.5">Che chở muôn loài</div>
                      {liveResult.element === "Mộc" && (
                        <span className="mt-1 inline-block text-[10px] font-bold text-emerald-900 bg-emerald-400/40 px-1.5 py-0.2 rounded">
                          Bản mệnh
                        </span>
                      )}
                    </div>

                    {/* Thủy */}
                    <div
                      className={`p-2.5 rounded-xl border text-center transition-all ${
                        liveResult.element === "Thủy"
                          ? "bg-sky-500/20 border-sky-500 ring-2 ring-sky-400/40 shadow-xs"
                          : "bg-surface border-line"
                      }`}
                    >
                      <div className="text-xs font-bold text-sky-800 dark:text-sky-300 mb-0.5">Thủy</div>
                      <div className="text-[11px] font-semibold text-ink">Bao dung</div>
                      <div className="text-[10px] text-stone-500 mt-0.5">Thích nghi, phù sa</div>
                      {liveResult.element === "Thủy" && (
                        <span className="mt-1 inline-block text-[10px] font-bold text-sky-900 bg-sky-400/40 px-1.5 py-0.2 rounded">
                          Bản mệnh
                        </span>
                      )}
                    </div>

                    {/* Hỏa */}
                    <div
                      className={`p-2.5 rounded-xl border text-center transition-all ${
                        liveResult.element === "Hỏa"
                          ? "bg-red-500/20 border-red-500 ring-2 ring-red-400/40 shadow-xs"
                          : "bg-surface border-line"
                      }`}
                    >
                      <div className="text-xs font-bold text-red-800 dark:text-red-300 mb-0.5">Hỏa</div>
                      <div className="text-[11px] font-semibold text-ink">Nhiệt thành</div>
                      <div className="text-[10px] text-stone-500 mt-0.5">Ấm áp, soi sáng</div>
                      {liveResult.element === "Hỏa" && (
                        <span className="mt-1 inline-block text-[10px] font-bold text-red-900 bg-red-400/40 px-1.5 py-0.2 rounded">
                          Bản mệnh
                        </span>
                      )}
                    </div>

                    {/* Thổ */}
                    <div
                      className={`p-2.5 rounded-xl border text-center transition-all ${
                        liveResult.element === "Thổ"
                          ? "bg-amber-600/20 border-amber-600 ring-2 ring-amber-500/40 shadow-xs"
                          : "bg-surface border-line"
                      }`}
                    >
                      <div className="text-xs font-bold text-amber-900 dark:text-amber-200 mb-0.5">Thổ</div>
                      <div className="text-[11px] font-semibold text-ink">Vững vàng</div>
                      <div className="text-[10px] text-stone-500 mt-0.5">Bền bỉ, nâng đỡ</div>
                      {liveResult.element === "Thổ" && (
                        <span className="mt-1 inline-block text-[10px] font-bold text-amber-950 bg-amber-400/40 px-1.5 py-0.2 rounded">
                          Bản mệnh
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-surface border border-line text-xs text-stone-700 dark:text-stone-300">
                    <span className="font-semibold text-amber-800 dark:text-amber-300">✦ Gợi ý tương phối ngũ hành: </span>
                    <span>{liveResult.supportAdvice}</span>
                  </div>
                </div>

                {/* Block 3: Góc nhìn để tự suy ngẫm */}
                <div className="p-4 sm:p-5 rounded-2xl bg-surface-soft border border-line mb-4">
                  <h4 className="font-bold text-xs sm:text-sm text-ink mb-2 flex items-center gap-1.5">
                    <span className="w-4 h-4 rounded-full bg-amber-800 text-white text-[10px] flex items-center justify-center font-bold">
                      3
                    </span>
                    <span>Góc nhìn đối thoại & Tự soi chiếu nội tâm</span>
                  </h4>

                  <div className="p-3.5 rounded-xl bg-surface border border-line text-xs sm:text-sm font-display italic text-ink leading-relaxed mb-3">
                    {liveResult.philosophicalQuote}
                  </div>

                  <div className="p-3.5 rounded-xl bg-surface border border-line text-xs space-y-2">
                    <div className="text-stone-700 dark:text-stone-300">
                      <strong className="text-emerald-700 dark:text-emerald-400">✦ Điểm mạnh tự nhiên: </strong>
                      <span>{liveResult.coreStrength}</span>
                    </div>
                    <div className="text-stone-700 dark:text-stone-300">
                      <strong className="text-amber-700 dark:text-amber-400">✦ Điều cần lưu tâm: </strong>
                      <span>{liveResult.innerWatchout}</span>
                    </div>
                    <div className="pt-2 border-t border-line text-amber-800 dark:text-amber-300 font-medium">
                      <strong>Câu hỏi tự vấn cho hôm nay: </strong>
                      <span>{liveResult.selfInquiryQuestion}</span>
                    </div>
                  </div>
                </div>

                {/* Quick Navigation to Birth Chart & Physiognomy */}
                <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-500/10 to-transparent border border-amber-500/25 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                  <div>
                    <strong className="text-amber-800 dark:text-amber-300 block mb-0.5">✦ Khám phá mở rộng:</strong>
                    <span className="text-stone-600 dark:text-stone-400">Xem bản đồ 12 Cung Vị Tử Vi hoặc khảo cứu nét tướng Tam Đình & Ngũ Quan.</span>
                  </div>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={onBackToExperience}
                    className="rounded-xl border-amber-500/40 text-amber-800 dark:text-amber-300 hover:bg-amber-500/10 cursor-pointer text-xs shrink-0"
                  >
                    Đến Không Gian Chiêm Tinh →
                  </Button>
                </div>
              </Card>
            )}
          </div>
        </div>

        {/* Standard Ethical Standards of Tin Lắm Tâm Linh */}
        <section className="p-6 rounded-3xl bg-surface border border-line mb-8 shadow-2xs">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-800 dark:text-amber-300 mb-4">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Nguyên tắc chuẩn mực của Tin Lắm Tâm Linh</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-stone-700 dark:text-stone-300 leading-relaxed">
            <div className="p-4 rounded-2xl bg-surface-soft border border-line">
              <div className="font-bold text-red-700 dark:text-red-400 mb-1 flex items-center gap-1.5">
                <span>🚫 Không phán đoán đại hạn tai họa</span>
              </div>
              Không tạo nỗi bất an, không răn đe số phận hay tạo sự lo lắng phi căn cứ cho người xem.
            </div>

            <div className="p-4 rounded-2xl bg-surface-soft border border-line">
              <div className="font-bold text-amber-700 dark:text-amber-400 mb-1 flex items-center gap-1.5">
                <span>🚫 Không dự báo tài lộc hay bệnh tật</span>
              </div>
              Tuyệt đối không can thiệp vào các quyết định y tế, pháp lý, tài chính hoặc hôn nhân cá nhân.
            </div>

            <div className="p-4 rounded-2xl bg-surface-soft border border-line">
              <div className="font-bold text-emerald-700 dark:text-emerald-400 mb-1 flex items-center gap-1.5">
                <span>🚫 Không thương mại hóa vật phẩm</span>
              </div>
              Không bán đồ giải hạn, bùa chú, dịch vụ cúng kiếng hay trục lợi trên niềm tin tinh thần.
            </div>
          </div>
        </section>

        {/* Bottom Navigation Links */}
        <div className="flex items-center justify-between text-xs font-semibold text-stone-500 pt-4 border-t border-line">
          <button
            onClick={onBackToExperience}
            className="hover:text-amber-800 dark:hover:text-amber-300 transition-colors cursor-pointer"
          >
            ← Quay lại trang Trải nghiệm
          </button>

          {onGoToCulture && (
            <button
              onClick={onGoToCulture}
              className="text-amber-800 dark:text-amber-300 hover:underline cursor-pointer"
            >
              Tìm hiểu triết lý thời gian trong văn hóa dân gian →
            </button>
          )}
        </div>
      </main>
    </div>
  );
};
