import React, { useState, useEffect } from "react";
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
} from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { Badge } from "@/src/components/ui/badge";
import { Card } from "@/src/components/ui/card";
import {
  calculateHoroscope,
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
  const [agreedDisclaimer, setAgreedDisclaimer] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [calculationResult, setCalculationResult] =
    useState<HoroscopeCalculationResult | null>(null);

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreedDisclaimer) return;

    const res = calculateHoroscope({
      day,
      month,
      year,
      hourCanh,
      noHour,
      region,
    });
    setCalculationResult(res);
    setShowResult(true);
  };

  // Tự động cập nhật kết quả đối chiếu ngay khi người dùng điều chỉnh thông tin nếu đã xem
  useEffect(() => {
    if (showResult && agreedDisclaimer) {
      const res = calculateHoroscope({
        day,
        month,
        year,
        hourCanh,
        noHour,
        region,
      });
      setCalculationResult(res);
    }
  }, [day, month, year, hourCanh, noHour, region, showResult, agreedDisclaimer]);

  const handleReset = () => {
    setShowResult(false);
    setCalculationResult(null);
  };

  return (
    <div className="screen-shell">
      <main className="page-container max-w-6xl">
        {/* Top Breadcrumb & Status Ribbon */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 text-xs text-muted">
          <div className="flex items-center gap-2">
            <button
              onClick={onGoToHome}
              className="hover:text-accent cursor-pointer transition-colors"
            >
              Hôm nay
            </button>
            <span>/</span>
            <button
              onClick={onBackToExperience}
              className="hover:text-accent cursor-pointer transition-colors"
            >
              Trải nghiệm
            </button>
            <span>/</span>
            <span className="text-accent font-semibold">Lá số chiêm nghiệm</span>
          </div>

          <button
            onClick={onBackToExperience}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted hover:text-accent transition-colors cursor-pointer self-start sm:self-auto"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Về danh mục Trải nghiệm</span>
          </button>
        </div>

        {/* Top Tags */}
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wider bg-surface text-accent border border-line flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-accent" />
            BIỂU TƯỢNG TRUYỀN THỐNG • TỰ NHÌN LẠI BẢN THÂN
          </span>
          <span className="text-xs text-muted">
            • Góc nhìn văn hóa chiêm nghiệm • Không đại diện cho bói toán đoán mệnh
          </span>
        </div>

        {/* Header Title Section & Mini Artwork */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-8">
          <div className="lg:col-span-7">
            <span className="text-xs font-bold uppercase tracking-wider text-accent mb-1 block">
              ĐỐI THOẠI NỘI TÂM
            </span>
            <h1 className="page-title mb-3">
              Khám phá cách người xưa nhìn thời gian và con người
            </h1>
            <p className="text-sm sm:text-base text-ink leading-relaxed mb-4">
              Người xưa mượn sự vận hành của tinh tú và tiết khí để soi tỏ phẩm hạnh, quán chiếu tâm tính
              và tìm điểm tựa an lành trong nhịp sống. Đây là không gian đối thoại nội tâm với hệ thống
              biểu tượng cổ truyền, hoàn toàn không phải lời tiên đoán số mệnh hay định đoạt tương lai.
            </p>
            <div className="flex items-center gap-3 text-xs text-muted flex-wrap">
              <span>• Không áp đặt định kiến</span>
              <span>• Không suy đoán tai ương</span>
              <span>• Bảo mật tuyệt đối trên máy</span>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="rounded-card overflow-hidden border border-line shadow-xs relative aspect-16/10 bg-surface-soft">
              <img
                src="/images/relic_book.jpg"
                alt="Sách cũ viết trên giấy dó"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-3 left-4 right-4 text-xs text-white/90 italic flex items-center justify-between">
                <span>Tranh đồ họa giấy Dó • Góc học thảo dân gian</span>
                <span className="text-subtle">✦</span>
              </div>
            </div>
          </div>
        </div>

        {/* 2-Column Content: Form Left | Blueprint Preview Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-10">
          {/* Form Column (5 cols) */}
          <div className="lg:col-span-5 space-y-5 lg:sticky lg:top-24 self-start">
            <Card className="p-6 sm:p-7 rounded-card bg-surface border border-line shadow-xs">
              <div className="mb-4">
                <h3 className="font-display font-bold text-lg text-ink flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-action" />
                  <span>Nhập thông tin chiêm nghiệm</span>
                </h3>
                <p className="text-sm text-muted mt-1 leading-relaxed">
                  Thông tin được dùng để đối chiếu nhất quán ngũ hành và nạp âm tương ứng ngay trên trình duyệt của bạn.
                </p>
              </div>

              <form onSubmit={handleGenerate} className="space-y-4">
                {/* 1. Ngày sinh Dương lịch */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-xs font-semibold text-ink">
                      Ngày sinh (Dương lịch)*
                    </label>
                    <span className="text-xs text-muted">Lịch chuẩn</span>
                  </div>

                  <div className="grid grid-cols-3 gap-2">
                    <select
                      aria-label="Ngày sinh"
                      value={day}
                      onChange={(e) => setDay(Number(e.target.value))}
                      className="px-3 py-2.5 rounded-xl border border-line text-xs font-medium text-ink bg-surface outline-none focus:border-accent"
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
                      className="px-3 py-2.5 rounded-xl border border-line text-xs font-medium text-ink bg-surface outline-none focus:border-accent"
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
                      className="px-3 py-2.5 rounded-xl border border-line text-xs font-medium text-ink bg-surface outline-none focus:border-accent"
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
                  <p className="text-sm text-muted mt-1 italic">
                    Hỗ trợ đầy đủ các năm từ 1920 đến {currentMaxYear}.
                  </p>
                </div>

                {/* 2. Giờ sinh (Tùy chọn) */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-xs font-semibold text-ink">
                      Giờ sinh (Tùy chọn)
                    </label>
                    <label className="flex items-center gap-1.5 text-xs text-muted cursor-pointer">
                      <input
                        type="checkbox"
                        checked={noHour}
                        onChange={(e) => setNoHour(e.target.checked)}
                        className="rounded text-accent focus:ring-accent"
                      />
                      <span>Không nhớ giờ sinh</span>
                    </label>
                  </div>

                  <select
                    aria-label="Giờ sinh"
                    disabled={noHour}
                    value={hourCanh}
                    onChange={(e) => setHourCanh(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-line text-xs font-medium text-ink bg-surface outline-none focus:border-accent disabled:opacity-50"
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
                  <label className="block text-xs font-semibold text-ink mb-1.5">
                    Vùng sinh / Phương vị (Tùy chọn)
                  </label>
                  <select
                    aria-label="Vùng sinh hoặc phương vị"
                    value={region}
                    onChange={(e) => setRegion(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-line text-xs font-medium text-ink bg-surface outline-none focus:border-accent"
                  >
                    <option value="bac">Miền Bắc (Khí hậu tứ thời phân minh, cội nguồn văn hóa)</option>
                    <option value="trung">Miền Trung (Nắng gió dải Trường Sơn kiên cường, nhẫn nại)</option>
                    <option value="nam">Miền Nam (Mùa mưa nắng phù sa hào sảng, phóng khoáng)</option>
                  </select>
                  <p className="text-sm text-muted mt-1 italic">
                    Tham chiếu sắc thái văn hóa và đặc trưng vùng miền địa lý.
                  </p>
                </div>

                {/* 4. Checkbox đồng ý */}
                <div className="p-3 rounded-panel bg-surface border border-line">
                  <label className="flex items-start gap-2.5 text-xs text-ink leading-relaxed cursor-pointer">
                    <input
                      type="checkbox"
                      required
                      checked={agreedDisclaimer}
                      onChange={(e) => setAgreedDisclaimer(e.target.checked)}
                      className="mt-0.5 rounded text-accent focus:ring-accent"
                    />
                    <span>
                      Tôi hiểu rằng đây là hoạt động tìm hiểu biểu tượng văn hóa để tự suy ngẫm,
                      không phải dự đoán vận mệnh. Đồng ý sử dụng thông tin tạm thời để đối chiếu
                      cho phiên làm việc này.
                    </span>
                  </label>
                </div>

                {/* Submit Action */}
                <div className="flex gap-2">
                  <Button
                    type="submit"
                    disabled={!agreedDisclaimer}
                    className="flex-1 py-3.5 rounded-panel bg-action hover:bg-action text-white font-semibold text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    <Eye className="w-4 h-4" />
                    <span>Xem bản chiêm nghiệm</span>
                  </Button>

                  {showResult && (
                    <Button
                      type="button"
                      variant="outline"
                      onClick={handleReset}
                      className="px-3.5 rounded-panel border-line hover:bg-surface text-ink cursor-pointer"
                      title="Thiết lập lại"
                    >
                      <RotateCcw className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              </form>

              {/* Data Commitment Note */}
              <div className="mt-5 p-3.5 rounded-panel bg-surface border border-line text-xs text-muted flex items-start gap-2.5">
                <Lock className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                <div>
                  <strong className="text-ink">Cam kết dữ liệu cá nhân: </strong>
                  Toàn bộ thuật toán đối chiếu diễn ra nội bộ trên trình duyệt, không lưu trữ
                  hoặc truyền tải ngày sinh lên bất kỳ máy chủ nào.
                </div>
              </div>
            </Card>
          </div>

          {/* Blueprint & Results Column (7 cols) */}
          <div className="lg:col-span-7 space-y-5">
            <Card className="p-6 sm:p-8 rounded-card bg-surface border border-line shadow-xs">
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-line">
                <h3 className="font-display font-bold text-lg text-ink flex items-center gap-2">
                  <Compass className="w-4 h-4 text-accent" />
                  <span>Bản chiêm nghiệm văn hóa</span>
                </h3>
                <Badge
                  variant="outline"
                  className={`text-xs ${
                    showResult
                      ? "border-success/25 text-success bg-success-soft"
                      : "border-line text-muted"
                  }`}
                >
                  {showResult ? "✓ Đã đối chiếu biểu tượng" : "Chờ nhập dữ liệu"}
                </Badge>
              </div>

              {/* Thông báo minh bạch kết quả */}
              {showResult && calculationResult && (
                <div className="mb-5 p-3.5 rounded-panel bg-surface border border-line text-xs text-success flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-success shrink-0 mt-0.5" />
                  <div>
                    <strong>Kết quả đối chiếu văn hóa nhất quán: </strong>
                    Tính toán theo ngày Dương lịch{" "}
                    <strong>{calculationResult.solarDate}</strong> (tương ứng ngày{" "}
                    <strong>{calculationResult.lunarDate}</strong>, năm Can Chi{" "}
                    <strong>{calculationResult.canChiYear}</strong>). Mang tính chất biểu tượng
                    tham chiếu, không áp đặt số phận.
                  </div>
                </div>
              )}

              {/* Block 1: Thông tin lá số & Khung biểu tượng */}
              <div className="p-5 rounded-panel bg-surface border border-line mb-5">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-bold text-sm text-ink flex items-center gap-1.5">
                    <span className="w-4 h-4 rounded-full bg-action text-white text-xs flex items-center justify-center font-bold">
                      1
                    </span>
                    <span>Thông tin bản mệnh & Khung biểu tượng đối ứng</span>
                  </h4>
                  <Lock className="w-3.5 h-3.5 text-accent" />
                </div>
                <p className="text-sm text-ink mb-3">
                  Sơ đồ vị trí các cung nếp xưa, ngũ hành nạp âm tương phối và mùa sinh đối ứng nhịp điệu tự nhiên.
                </p>

                {showResult && calculationResult ? (
                  <div className="space-y-3">
                    <div className="py-5 border-y border-line grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
                      <div>
                        <div className="text-xs uppercase text-accent font-bold">
                          Năm Can Chi
                        </div>
                        <div className="font-bold text-sm text-ink">
                          {calculationResult.canChiYear}
                        </div>
                        <div className="text-xs text-muted">
                          {calculationResult.napAm}
                        </div>
                      </div>
                      <div>
                        <div className="text-xs uppercase text-accent font-bold">
                          Mùa sinh
                        </div>
                        <div className="font-bold text-sm text-ink">
                          {calculationResult.seasonName}
                        </div>
                        <div className="text-xs text-muted truncate" title={calculationResult.seasonDetail}>
                          {calculationResult.seasonDetail.split("•")[0] || calculationResult.seasonName}
                        </div>
                      </div>
                      <div>
                        <div className="text-xs uppercase text-accent font-bold">
                          Phương vị
                        </div>
                        <div className="font-bold text-sm text-ink">
                          {calculationResult.regionName}
                        </div>
                        <div className="text-xs text-muted">
                          {region === "bac" ? "Tứ thời luân chuyển" : region === "trung" ? "Trường Sơn kiên định" : "Cửu Long trù phú"}
                        </div>
                      </div>
                      <div>
                        <div className="text-xs uppercase text-accent font-bold">
                          Bản Mệnh
                        </div>
                        <div className="font-bold text-sm text-accent">
                          Hành {calculationResult.element}
                        </div>
                        <div className="text-xs text-muted">
                          {calculationResult.supportElement.split("(")[0]}
                        </div>
                      </div>
                    </div>

                    <div className="p-3 rounded-xl bg-surface border border-line text-xs text-ink flex items-center justify-between">
                      <div>
                        <strong className="text-accent">Ý nghĩa Nạp âm: </strong>
                        <span>{calculationResult.elementMeaning}</span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="p-4 rounded-xl bg-surface/95 border border-dashed border-line text-center text-xs text-muted">
                    Tứ trụ khí & Vòng quay mùa vụ sẽ hiển thị chính xác theo ngày tháng năm sinh sau khi bạn bấm xem.
                  </div>
                )}
              </div>

              {/* Block 2: Biểu tượng và ý nghĩa văn hóa */}
              <div className="p-5 rounded-panel bg-surface border border-line mb-5">
                <div className="flex items-center justify-between mb-1">
                  <h4 className="font-bold text-sm text-ink flex items-center gap-1.5">
                    <span className="w-4 h-4 rounded-full bg-action text-white text-xs flex items-center justify-center font-bold">
                      2
                    </span>
                    <span>Biểu tượng ngũ hành & Phẩm cách tương quan</span>
                  </h4>
                  {showResult && calculationResult && (
                    <span className="text-xs font-semibold text-accent bg-gold-soft px-2.5 py-0.5 rounded-full border border-gold/40">
                      Bản mệnh: {calculationResult.element}
                    </span>
                  )}
                </div>
                <p className="text-sm text-ink mb-4">
                  Diễn giải hình tượng tự nhiên (Cây cỏ, Dòng nước, Đất lành, Ngọn lửa, Kim khí) và bài học nhân sinh cha ông đúc kết.
                </p>

                <div className="grid grid-cols-2 xl:grid-cols-5 gap-3">
                  {/* Kim */}
                  <div
                    className={`p-3 rounded-xl border text-center transition-all ${
                      calculationResult?.element === "Kim"
                        ? "bg-gold-soft/80 border-gold/40 ring-2 ring-gold/30 shadow-xs"
                        : "bg-surface border-line"
                    }`}
                  >
                    <div className="text-sm font-bold text-accent mb-0.5">Kim</div>
                    <div className="text-xs font-semibold text-ink">Cương trực</div>
                    <div className="text-xs text-muted mt-1">Sắc bén, thanh khiết, trọng nghĩa khí</div>
                    {calculationResult?.element === "Kim" && (
                      <span className="mt-1.5 inline-block text-xs font-bold text-gold bg-gold-soft px-1.5 py-0.5 rounded">
                        Bản mệnh
                      </span>
                    )}
                  </div>

                  {/* Mộc */}
                  <div
                    className={`p-3 rounded-xl border text-center transition-all ${
                      calculationResult?.element === "Mộc"
                        ? "bg-success-soft/80 border-success ring-2 ring-success/30 shadow-xs"
                        : "bg-surface border-line"
                    }`}
                  >
                    <div className="text-sm font-bold text-success mb-0.5">Mộc</div>
                    <div className="text-xs font-semibold text-ink">Nhân ái</div>
                    <div className="text-xs text-muted mt-1">Rừng cây vươn cao, che chở muôn loài</div>
                    {calculationResult?.element === "Mộc" && (
                      <span className="mt-1.5 inline-block text-xs font-bold text-success bg-success-soft px-1.5 py-0.5 rounded">
                        Bản mệnh
                      </span>
                    )}
                  </div>

                  {/* Thủy */}
                  <div
                    className={`p-3 rounded-xl border text-center transition-all ${
                      calculationResult?.element === "Thủy"
                        ? "bg-sky-50/80 border-sky-400 ring-2 ring-sky-300 shadow-xs"
                        : "bg-surface border-line"
                    }`}
                  >
                    <div className="text-sm font-bold text-ink mb-0.5">Thủy</div>
                    <div className="text-xs font-semibold text-ink">Bao dung</div>
                    <div className="text-xs text-muted mt-1">Dòng suối thích nghi, nuôi dưỡng phù sa</div>
                    {calculationResult?.element === "Thủy" && (
                      <span className="mt-1.5 inline-block text-xs font-bold text-sky-800 bg-sky-200/60 px-1.5 py-0.5 rounded">
                        Bản mệnh
                      </span>
                    )}
                  </div>

                  {/* Hỏa */}
                  <div
                    className={`p-3 rounded-xl border text-center transition-all ${
                      calculationResult?.element === "Hỏa"
                        ? "bg-danger-soft/80 border-danger ring-2 ring-danger/30 shadow-xs"
                        : "bg-surface border-line"
                    }`}
                  >
                    <div className="text-sm font-bold text-accent mb-0.5">Hỏa</div>
                    <div className="text-xs font-semibold text-ink">Nhiệt thành</div>
                    <div className="text-xs text-muted mt-1">Ngọn lửa ấm áp, soi sáng đêm tối</div>
                    {calculationResult?.element === "Hỏa" && (
                      <span className="mt-1.5 inline-block text-xs font-bold text-danger bg-danger-soft px-1.5 py-0.5 rounded">
                        Bản mệnh
                      </span>
                    )}
                  </div>

                  {/* Thổ */}
                  <div
                    className={`p-3 rounded-xl border text-center transition-all ${
                      calculationResult?.element === "Thổ"
                        ? "bg-gold-soft/80 border-gold/40 ring-2 ring-gold/30 shadow-xs"
                        : "bg-surface border-line"
                    }`}
                  >
                    <div className="text-sm font-bold text-accent mb-0.5">Thổ</div>
                    <div className="text-xs font-semibold text-ink">Vững vàng</div>
                    <div className="text-xs text-muted mt-1">Mảnh đất bền bỉ, nâng đỡ vạn vật</div>
                    {calculationResult?.element === "Thổ" && (
                      <span className="mt-1.5 inline-block text-xs font-bold text-gold bg-gold-soft px-1.5 py-0.5 rounded">
                        Bản mệnh
                      </span>
                    )}
                  </div>
                </div>

                {showResult && calculationResult && (
                  <div className="mt-4 p-3 rounded-xl bg-surface border border-line text-xs text-ink">
                    <span className="font-semibold text-accent">Gợi ý tương phối ngũ hành: </span>
                    <span>{calculationResult.supportAdvice}</span>
                  </div>
                )}
              </div>

              {/* Block 3: Góc nhìn để tự suy ngẫm */}
              <div className="p-5 rounded-panel bg-surface border border-line mb-5">
                <h4 className="font-bold text-sm text-ink mb-1 flex items-center gap-1.5">
                  <span className="w-4 h-4 rounded-full bg-action text-white text-xs flex items-center justify-center font-bold">
                    3
                  </span>
                  <span>Góc nhìn để tự suy ngẫm</span>
                </h4>
                <p className="text-sm text-ink mb-3">
                  Các câu hỏi mở để người dùng tự lắng nghe điểm mạnh, điểm cần tôi luyện của bản thân thay vì nhận phán xét áp đặt.
                </p>

                {showResult && calculationResult ? (
                  <div className="space-y-3">
                    <div className="p-4 rounded-xl bg-surface border border-line text-xs sm:text-sm font-display italic text-ink leading-relaxed">
                      {calculationResult.philosophicalQuote}
                    </div>

                    <div className="p-3.5 rounded-xl bg-surface border border-line text-xs space-y-2">
                      <div className="text-ink">
                        <strong className="text-success">✦ Điểm mạnh tự nhiên: </strong>
                        <span>{calculationResult.coreStrength}</span>
                      </div>
                      <div className="text-ink">
                        <strong className="text-gold">✦ Điều cần lưu tâm: </strong>
                        <span>{calculationResult.innerWatchout}</span>
                      </div>
                      <div className="pt-2 border-t border-line text-accent font-medium">
                        <strong>Câu hỏi tự vấn cho hôm nay: </strong>
                        <span>{calculationResult.selfInquiryQuestion}</span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="p-4 rounded-xl bg-surface border border-line text-xs sm:text-sm font-display italic text-ink leading-relaxed">
                    “Khi lòng dừng lại, vạn cảnh mới tự thông suốt. Bản mệnh không phải là chiếc lồng giam hãm, mà là bài học nuôi dưỡng tâm từ và sự kiên định giữa đời.”
                  </div>
                )}
              </div>

              <div className="text-xs text-muted italic text-center">
                Mỗi biểu tượng chỉ là một lăng kính mộc mạc để bạn thấu hiểu chính mình sâu sắc hơn trong dòng chảy cuộc sống hôm nay.
              </div>
            </Card>
          </div>
        </div>

        {/* Standard Ethical Standards of Tin Lắm Tâm Linh */}
        <div className="p-6 rounded-card bg-surface border border-line mb-8">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-accent mb-4">
            <ShieldCheck className="w-4 h-4 text-accent" />
            <span>Nguyên tắc chuẩn mực của Tin Lắm Tâm Linh</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-ink leading-relaxed">
            <div className="p-4 rounded-panel bg-surface border border-line">
              <div className="font-bold text-ink mb-1.5 flex items-center gap-1.5 text-danger">
                <span>🚫 Không phán đoán đại hạn tai họa</span>
              </div>
              Không tạo nỗi bất an, không răn đe số phận hay tạo sự lo lắng phi căn cứ cho người xem.
            </div>

            <div className="p-4 rounded-panel bg-surface border border-line">
              <div className="font-bold text-ink mb-1.5 flex items-center gap-1.5 text-gold">
                <span>🚫 Không dự báo tài lộc hay bệnh tật</span>
              </div>
              Tuyệt đối không can thiệp vào các quyết định y tế, pháp lý, tài chính hoặc hôn nhân cá nhân.
            </div>

            <div className="p-4 rounded-panel bg-surface border border-line">
              <div className="font-bold text-ink mb-1.5 flex items-center gap-1.5 text-accent">
                <span>🚫 Không thương mại hóa vật phẩm</span>
              </div>
              Không bán đồ giải hạn, bùa chú, dịch vụ cúng kiếng hay trục lợi trên niềm tin tinh thần.
            </div>
          </div>
        </div>

        {/* Bottom Navigation Links */}
        <div className="flex items-center justify-between text-xs font-semibold text-muted pt-4 border-t border-line">
          <button
            onClick={onBackToExperience}
            className="hover:text-accent transition-colors cursor-pointer"
          >
            ← Quay lại trang Trải nghiệm
          </button>

          {onGoToCulture && (
            <button
              onClick={onGoToCulture}
              className="text-accent hover:underline cursor-pointer"
            >
              Tìm hiểu triết lý thời gian trong văn hóa dân gian →
            </button>
          )}
        </div>
      </main>
    </div>
  );
};
