import React, { useState } from "react";
import {
  ArrowLeft,
  Calendar,
  Sparkles,
  BookOpen,
  MapPin,
  Clock,
  Check,
  Bookmark,
  Info,
  ShieldCheck,
  ArrowRight,
  Filter,
  CheckCircle2,
  CalendarDays,
} from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { Badge } from "@/src/components/ui/badge";
import { Card } from "@/src/components/ui/card";

interface GoodDayScreenProps {
  onBackToCulture: () => void;
  onGoToHome?: () => void;
  onGoToCalendar: () => void;
  onGoToRituals: () => void;
  onSaveDayToCalendar?: (dayData: { title: string; day: number; month: number; year?: number }) => void;
}

export const GoodDayScreen: React.FC<GoodDayScreenProps> = ({
  onBackToCulture,
  onGoToHome,
  onGoToCalendar,
  onGoToRituals,
  onSaveDayToCalendar,
}) => {
  const [purposeTab, setPurposeTab] = useState<string>("giadao");
  const [selectedRange, setSelectedRange] = useState("30ngay");
  const [selectedRegion, setSelectedRegion] = useState("bac-trung");
  const [savedDays, setSavedDays] = useState<number[]>([]);

  const handleSaveDay = (day: number, title: string) => {
    if (!savedDays.includes(day)) {
      setSavedDays((prev) => [...prev, day]);
      if (onSaveDayToCalendar) {
        onSaveDayToCalendar({ title, day, month: 10, year: new Date().getFullYear() });
      }
    }
  };

  const purposes = [
    { id: "giadao", label: "Gặp mặt gia đình / Việc gia đạo" },
    { id: "luongduyen", label: "Gắn kết lương duyên" },
    { id: "khonggian", label: "Chuyển dọn không gian" },
    { id: "hoctap", label: "Khởi sự học tập, nghiên cứu" },
  ];

  return (
    <div className="w-full min-h-screen bg-[#fcf8f2] text-[#2e2624] font-['Be_Vietnam_Pro',sans-serif]">
      <main className="max-w-6xl mx-auto px-4 sm:px-6 pt-6 pb-20">
        {/* Top Breadcrumb & Status Ribbon */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 text-xs text-[#8a7971]">
          <div className="flex items-center gap-2">
            <button
              onClick={onGoToHome}
              className="hover:text-[#9e3b2e] cursor-pointer transition-colors"
            >
              Hôm nay
            </button>
            <span>/</span>
            <button
              onClick={onBackToCulture}
              className="hover:text-[#9e3b2e] cursor-pointer transition-colors"
            >
              Khám phá
            </button>
            <span>/</span>
            <span className="text-[#9e3b2e] font-semibold">Tra cứu ngày lành</span>
          </div>

          <button
            onClick={onBackToCulture}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#82716a] hover:text-[#9e3b2e] transition-colors cursor-pointer self-start sm:self-auto"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Về danh mục Khám phá</span>
          </button>
        </div>

        {/* Top Badges */}
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wider bg-[#fef3e2] text-[#8a5a22] border border-[#f6d8a8] flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#c97a2b]"></span>
            CHIÊM NGHIỆM THỜI ĐIỂM • GỢI Ý ĐIỂM NHÌN DÂN GIAN
          </span>
          <span className="text-xs text-[#9b8980]">
            • Dữ liệu văn hóa minh họa • Không thay thế điều kiện thực tế
          </span>
        </div>

        {/* Header Title Section */}
        <div className="mb-8">
          <h1 className="font-['Noto_Serif',serif] font-bold text-3xl sm:text-4xl lg:text-[40px] text-[#2a2220] leading-tight mb-3">
            Chọn một ngày, chuẩn bị một tâm thế
          </h1>
          <p className="text-sm sm:text-base text-[#68574f] leading-relaxed max-w-4xl">
            Người xưa thường chọn thời điểm bắt đầu một việc lớn không chỉ để cầu thuận lợi, mà trước
            hết là một nhịp nhắc nhở bản thân chuẩn bị chu đáo, tĩnh tâm và khởi sự trong trạng thái
            an định nhất. Mọi gợi ý tại đây là góc nhìn văn hóa tham khảo, không bảo đảm kết quả và
            không thay thế các yếu tố điều kiện thực tế.
          </p>
        </div>

        {/* Top Hero Banner */}
        <Card className="rounded-3xl overflow-hidden bg-white border border-[#eddcd0] shadow-xs mb-8">
          <div className="grid grid-cols-1 md:grid-cols-12 items-center">
            <div className="md:col-span-6 relative aspect-16/10 sm:aspect-16/9 bg-[#2a201c] overflow-hidden">
              <img
                src="/images/do_paper_still_life.jpg"
                alt="Góc học và lịch cổ truyền dân gian"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-black/40 via-transparent to-transparent pointer-events-none" />
            </div>

            <div className="md:col-span-6 p-6 sm:p-8">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#9e3b2e]">
                LỊCH TRĂNG VÀ NHỊP VỤ MÙA
              </span>
              <h3 className="font-['Noto_Serif',serif] font-bold text-xl sm:text-2xl text-[#2a2220] mt-1 mb-3">
                Nhịp thở tiết khí qua ngòi bút dân gian
              </h3>
              <p className="text-xs sm:text-sm italic text-[#594741] font-['Noto_Serif',serif] leading-relaxed mb-4">
                “Thời khắc thuận lợi nhất thường khởi nguồn từ tâm thế vững vàng và sự chuẩn bị cẩn trọng.”
              </p>
              <div className="flex items-center justify-between text-xs text-[#8c7b73] pt-4 border-t border-[#f4e8dc]">
                <span>Minh họa: Tấm vé giấy dó khắc mộc</span>
                <span className="font-semibold text-[#9e3b2e]">Độ tin cậy: 100%</span>
              </div>
            </div>
          </div>
        </Card>

        {/* Filter Section: Mục đích và khoảng thời gian dự định */}
        <Card className="p-6 sm:p-8 rounded-3xl bg-white border border-[#eddcd0] shadow-xs mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className="text-xs font-bold uppercase tracking-wider text-[#9e3b2e] flex items-center gap-1.5">
              <Filter className="w-3.5 h-3.5" />
              <span>MỤC ĐÍCH VÀ KHOẢNG THỜI GIAN DỰ ĐỊNH</span>
            </div>
            <span className="text-[11px] text-[#938279]">
              ⓘ Không thu thập thông tin cá nhân hay ngày sinh
            </span>
          </div>

          {/* 1. Purpose Tabs */}
          <div className="mb-5">
            <label className="block text-xs font-semibold text-[#5a4942] mb-2">
              1. Việc bạn đang chuẩn bị:
            </label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5">
              {purposes.map((p) => {
                const isSelected = purposeTab === p.id;
                return (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => setPurposeTab(p.id)}
                    className={`p-3 rounded-2xl border text-left text-xs font-semibold transition-all flex items-center justify-between cursor-pointer ${
                      isSelected
                        ? "bg-[#faece1] border-[#9e3b2e] text-[#9e3b2e] shadow-2xs"
                        : "bg-[#fffdfa] border-[#eddcd0] text-[#55453f] hover:border-[#dfc4b1]"
                    }`}
                  >
                    <span>{p.label}</span>
                    {isSelected && <Check className="w-3.5 h-3.5 text-[#9e3b2e]" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* 2 & 3: Range & Region Selectors */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-xs font-semibold text-[#5a4942] mb-1.5">
                2. Khoảng thời gian muốn xem:
              </label>
              <select
                value={selectedRange}
                onChange={(e) => setSelectedRange(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#eddcd0] text-xs font-medium text-[#2a2220] bg-white outline-none focus:border-[#9e3b2e]"
              >
                <option value="30ngay">Trong vòng 30 ngày tới (Tháng 10 - Tháng 11)</option>
                <option value="60ngay">Trong vòng 60 ngày tới (Mùa thu - đông)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#5a4942] mb-1.5">
                3. Vùng miền tham khảo (tùy chọn):
              </label>
              <select
                value={selectedRegion}
                onChange={(e) => setSelectedRegion(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#eddcd0] text-xs font-medium text-[#2a2220] bg-white outline-none focus:border-[#9e3b2e]"
              >
                <option value="bac-trung">Đồng bằng Bắc Bộ & Trung Bộ</option>
                <option value="nam">Nam Bộ phù sa sông nước</option>
                <option value="all">Toàn quốc</option>
              </select>
            </div>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-[#f4e8dc] flex-wrap gap-2">
            <span className="text-xs text-[#8c7b74]">
              ✦ Dữ liệu hướng tới tính hòa thuận và gìn giữ gia tộc
            </span>
            <Button
              size="sm"
              className="rounded-xl text-xs bg-[#9e3b2e] hover:bg-[#852f24] text-white px-5"
            >
              Cập nhật bộ lọc
            </Button>
          </div>
        </Card>

        {/* Results Area: Mini Calendar Left + Suggested Days Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-8">
          {/* Left: Mini Calendar Widget */}
          <div className="lg:col-span-4 space-y-4">
            <Card className="p-5 sm:p-6 rounded-3xl bg-white border border-[#eddcd0] shadow-xs">
              <div className="flex items-center justify-between mb-4">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#9e3b2e]">
                  KHUNG THỜI GIAN GỢI Ý
                </span>
                <span className="text-xs font-bold text-[#2a2220]">Tháng 10 Dương Lịch</span>
              </div>

              {/* Mini Month Grid */}
              <div className="grid grid-cols-7 gap-1 text-center text-[10px] font-bold text-[#8f7e77] mb-2">
                <div>T2</div>
                <div>T3</div>
                <div>T4</div>
                <div>T5</div>
                <div>T6</div>
                <div>T7</div>
                <div>CN</div>
              </div>

              <div className="grid grid-cols-7 gap-1 text-center text-xs font-mono mb-4">
                {/* 30 Sep */}
                <div className="p-1.5 text-stone-300">30</div>
                {Array.from({ length: 31 }, (_, i) => i + 1).map((d) => {
                  const isHighlighted18 = d === 18;
                  const isHighlighted25 = d === 25;
                  const isToday = d === 17; // Rằm tháng 9
                  return (
                    <div
                      key={d}
                      className={`p-1.5 rounded-lg text-[11px] font-medium transition-all ${
                        isHighlighted18 || isHighlighted25
                          ? "bg-[#9e3b2e] text-white font-bold shadow-xs scale-105"
                          : isToday
                          ? "bg-[#faece1] text-[#9e3b2e] font-bold border border-[#ebd6c5]"
                          : "text-[#3f312c] hover:bg-stone-50"
                      }`}
                    >
                      {d}
                    </div>
                  );
                })}
              </div>

              <div className="p-3 rounded-xl bg-[#faf3ec] border border-[#eedcd0] text-[11px] text-[#7a6861] leading-relaxed mb-4">
                <span className="w-2 h-2 rounded-full bg-[#9e3b2e] inline-block mr-1.5" />
                Các ngày được đánh dấu là thời điểm hòa hợp (cuối tuần, ngày trăng tròn, ngày hội
                truyền thống).
              </div>

              <div className="text-xs text-[#73625a] leading-relaxed">
                <strong className="text-[#2a2220]">GÓC NHÌN ĐẤT TỰ NHIÊN:</strong> Cuối tuần khí
                trời dịu mát hơn, nhịp sinh học của người cũng tự nhiên thảnh thơi, đặc biệt thích hợp
                nhất để sum họp nơi quây quần mâm cơm ấm.
              </div>
            </Card>
          </div>

          {/* Right: Suggested Day Cards */}
          <div className="lg:col-span-8 space-y-4">
            {/* Suggestion Card 1: Ngày 18 Tháng 10 */}
            <Card className="p-6 rounded-3xl bg-white border border-[#eddcd0] shadow-xs">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold uppercase tracking-wider text-[#9e3b2e]">
                  GỢI Ý TÂM ĐIỂM • Phong tục lương hảo & Hòa khí gia đạo
                </span>
                <Badge className="bg-emerald-50 text-emerald-800 border-emerald-200 text-[10px]">
                  Phù hợp ngày này
                </Badge>
              </div>

              <h3 className="font-['Noto_Serif',serif] font-bold text-2xl text-[#2a2220] mb-1">
                Ngày 18 Tháng 10
              </h3>
              <p className="text-xs text-[#8c7b73] mb-4">
                (Cuối tuần, cận rằm tháng Chín âm lịch • Tiết khí mát mẻ)
              </p>

              {/* Ý nghĩa */}
              <div className="p-4 rounded-2xl bg-[#fbf5ee] border border-[#ecd9cb] mb-4">
                <h4 className="text-xs font-bold text-[#9e3b2e] uppercase mb-1">
                  Ý nghĩa trong nếp dân gian
                </h4>
                <p className="text-xs text-[#6e5d56] leading-relaxed">
                  Dân gian xem đây là ngày vượng khí ấm cúng, tâm trí mọi người lắng dịu sau những giờ lao
                  động bộn bề; rất thích hợp để chuyện trò, hàn gắn bất đồng và thắt chặt tình cảm giữa
                  các thế hệ.
                </p>
              </div>

              {/* 3 Lời dặn */}
              <div className="space-y-1.5 text-xs text-[#62514a] mb-5">
                <div className="font-bold text-[#2a2220] mb-1">
                  Điều cần chuẩn bị thực tế (3 lời dặn chu đáo):
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-[#9e3b2e] font-bold">•</span>
                  <span>Chuẩn bị trà ấm, bữa cơm thanh đạm với các món mang hương vị nếp nhà.</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-[#9e3b2e] font-bold">•</span>
                  <span>Chủ động lắng nghe các bậc tiền bối với thái độ hòa ái, không phán xét.</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-[#9e3b2e] font-bold">•</span>
                  <span>Tránh bàn chuyện tranh chấp tài chính hoặc các việc dễ phát sinh sự xáo trộn chưa cần thiết.</span>
                </div>
              </div>

              <div className="text-[11px] text-[#8e7e77] italic mb-4">
                Cơ sở văn hóa: Tập quán truyền khẩu dân gian đồng bằng Bắc Bộ (khảo sát nếp sinh hoạt gia đình truyền thống).
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-[#f4e8dc]">
                <button
                  onClick={onGoToCalendar}
                  className="text-xs font-semibold text-[#9e3b2e] hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <span>Xem minh họa ngày này</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleSaveDay(18, "Gặp mặt gia đình (Ngày 18/10)")}
                  className="text-xs rounded-xl border-[#eddcd0] gap-1.5"
                >
                  <Bookmark className="w-3.5 h-3.5 text-[#9e3b2e]" />
                  <span>
                    {savedDays.includes(18) ? "✓ Đã lưu vào Lịch văn hóa" : "Lưu ngày vào Lịch văn hóa (Màn 22)"}
                  </span>
                </Button>
              </div>
            </Card>

            {/* Suggestion Card 2: Ngày 25 Tháng 10 */}
            <Card className="p-6 rounded-3xl bg-white border border-[#eddcd0] shadow-xs">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold uppercase tracking-wider text-[#9e3b2e]">
                  GỢI Ý THỨ HAI • Nếp gia an lành & Dọn dẹp nếp nhà
                </span>
                <span className="text-xs text-[#8e7d75]">25 Tháng 10 thuận</span>
              </div>

              <h3 className="font-['Noto_Serif',serif] font-bold text-2xl text-[#2a2220] mb-1">
                Ngày 25 Tháng 10
              </h3>
              <p className="text-xs text-[#8c7b73] mb-4">
                (Thời thu hanh hao • Thích hợp làm mới không gian gia đình)
              </p>

              <div className="p-4 rounded-2xl bg-[#fbf5ee] border border-[#ecd9cb] mb-4">
                <h4 className="text-xs font-bold text-[#9e3b2e] uppercase mb-1">
                  Ý nghĩa trong nếp dân gian
                </h4>
                <p className="text-xs text-[#6e5d56] leading-relaxed">
                  Tiết khí sương giáng mang lại không gian trong lành, thích hợp để cả nhà cùng bao sái,
                  tái tạo không gian sống và tạo cảm giác tươi mới cho các thế hệ trong cùng mái nhà.
                </p>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-[#f4e8dc]">
                <button
                  onClick={onGoToCalendar}
                  className="text-xs font-semibold text-[#9e3b2e] hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <span>Xem minh họa ngày này</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleSaveDay(25, "Làm mới không gian (Ngày 25/10)")}
                  className="text-xs rounded-xl border-[#eddcd0] gap-1.5"
                >
                  <Bookmark className="w-3.5 h-3.5 text-[#9e3b2e]" />
                  <span>
                    {savedDays.includes(25) ? "✓ Đã lưu vào Lịch văn hóa" : "Lưu ngày vào Lịch văn hóa"}
                  </span>
                </Button>
              </div>
            </Card>

            {/* Suggestion Card 3: Ngày ngẫu nhiên khi tâm an */}
            <Card className="p-5 rounded-2xl bg-[#faf3ec] border border-[#ecd9cb] flex items-start gap-3.5">
              <div className="w-8 h-8 rounded-full bg-[#f4e2ce] text-[#9e3b2e] flex items-center justify-center shrink-0 mt-0.5">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <h4 className="font-['Noto_Serif',serif] font-bold text-sm text-[#2a2220] mb-1">
                  Ngày ngẫu nhiên bất kỳ khi bạn cảm thấy tâm mình an
                </h4>
                <p className="text-xs text-[#6b5850] italic leading-relaxed">
                  “Thời điểm tốt nhất là thời điểm bạn đã chuẩn bị chu đáo, thân tâm tự tại và không bị
                  cuốn theo xáo trộn thường nhật.”
                </p>
              </div>
            </Card>
          </div>
        </div>

        {/* Disclaimer / Transparency Box */}
        <div className="p-6 rounded-3xl bg-[#faf4ed] border border-[#ebdcd0] mb-8">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#9e3b2e] mb-3">
            <Info className="w-4 h-4 text-[#9e3b2e]" />
            <span>Lưu ý quan trọng từ Tin Lắm Tâm Linh</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-[#6d5b53] leading-relaxed">
            <div className="p-3.5 rounded-2xl bg-white border border-[#ecd9cb]">
              <div className="font-bold text-[#2a2220] mb-1">• Dữ liệu có tính chất minh họa</div>
              Ngày và lời khuyên mang tính chất tham khảo dựa trên phong tục dân gian; không cam kết đem lại may mắn hay tài lộc.
            </div>

            <div className="p-3.5 rounded-2xl bg-white border border-[#ecd9cb]">
              <div className="font-bold text-[#2a2220] mb-1">• Không mê tín dị đoan</div>
              Nền tảng tuyệt đối không sử dụng các thuật bói toán ép buộc hay phán xét tương lai gây hoang mang cho người dùng.
            </div>

            <div className="p-3.5 rounded-2xl bg-white border border-[#ecd9cb]">
              <div className="font-bold text-[#2a2220] mb-1">• Không thương mại hóa ngày tốt</div>
              Không bán ngày tốt, không thu phí dịch vụ xem ngày để trục lợi niềm tin tâm thức.
            </div>
          </div>
        </div>

        {/* Bottom Navigation Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
          <Card
            onClick={onGoToCalendar}
            className="p-5 rounded-2xl bg-white border border-[#eedcd0] hover:border-[#9e3b2e] cursor-pointer transition-all flex items-center justify-between group shadow-2xs"
          >
            <div className="flex items-center gap-3">
              <CalendarDays className="w-5 h-5 text-[#9e3b2e]" />
              <div>
                <div className="text-[10px] uppercase font-bold text-[#98877f]">KHO LƯU TRỮ CÁ NHÂN</div>
                <div className="font-bold text-sm text-[#2a2220] group-hover:text-[#9e3b2e] transition-colors">
                  Mở Lịch văn hóa (Màn 22)
                </div>
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-[#9e3b2e] group-hover:translate-x-1 transition-transform" />
          </Card>

          <Card
            onClick={onGoToRituals}
            className="p-5 rounded-2xl bg-white border border-[#eedcd0] hover:border-[#9e3b2e] cursor-pointer transition-all flex items-center justify-between group shadow-2xs"
          >
            <div className="flex items-center gap-3">
              <BookOpen className="w-5 h-5 text-[#9e3b2e]" />
              <div>
                <div className="text-[10px] uppercase font-bold text-[#98877f]">TẬP TỤC & LỐI SỐNG</div>
                <div className="font-bold text-sm text-[#2a2220] group-hover:text-[#9e3b2e] transition-colors">
                  Xem Cẩm nang nghi lễ (Màn 18)
                </div>
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-[#9e3b2e] group-hover:translate-x-1 transition-transform" />
          </Card>
        </div>

        {/* Bottom Quote Banner */}
        <div className="text-center pt-8 border-t border-[#ecdcd0]">
          <p className="font-['Noto_Serif',serif] italic font-semibold text-xl text-[#9e3b2e] mb-1">
            “Tâm bình thế giới bình, lòng an vạn sự tỏ”
          </p>
          <span className="text-xs uppercase tracking-widest text-[#95837b] font-semibold">
            NƠI LƯU GIỮ NÉT ĐẸP TÂM THỨC VÀ CHIÊM NGHIỆM VĂN HÓA DÂN GIAN VIỆT
          </span>
        </div>
      </main>
    </div>
  );
};
