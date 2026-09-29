import React, { useState } from "react";
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
  const [day, setDay] = useState<number>(15);
  const [month, setMonth] = useState<number>(8);
  const [year, setYear] = useState<number>(1998);
  const [hourCanh, setHourCanh] = useState<string>("thin");
  const [noHour, setNoHour] = useState(false);
  const [region, setRegion] = useState("bac");
  const [agreedDisclaimer, setAgreedDisclaimer] = useState(false);
  const [showResult, setShowResult] = useState(false);

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreedDisclaimer) return;
    setShowResult(true);
  };

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
              onClick={onBackToExperience}
              className="hover:text-[#9e3b2e] cursor-pointer transition-colors"
            >
              Trải nghiệm
            </button>
            <span>/</span>
            <span className="text-[#9e3b2e] font-semibold">Lá số chiêm nghiệm</span>
          </div>

          <button
            onClick={onBackToExperience}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#82716a] hover:text-[#9e3b2e] transition-colors cursor-pointer self-start sm:self-auto"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Về danh mục Trải nghiệm</span>
          </button>
        </div>

        {/* Top Tags */}
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wider bg-[#fef3e2] text-[#8a5a22] border border-[#f6d8a8] flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[#c97a2b]" />
            BIỂU TƯỢNG TRUYỀN THỐNG • TỰ NHÌN LẠI BẢN THÂN
          </span>
          <span className="text-xs text-[#9c8980]">
            • Góc nhìn văn hóa chiêm nghiệm • Không đại diện cho bói toán đoán mệnh
          </span>
        </div>

        {/* Header Title Section & Mini Artwork */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-8">
          <div className="lg:col-span-7">
            <span className="text-xs font-bold uppercase tracking-wider text-[#9e3b2e] mb-1 block">
              ĐỐI THOẠI NỘI TÂM
            </span>
            <h1 className="font-['Noto_Serif',serif] font-bold text-3xl sm:text-4xl lg:text-[40px] text-[#2a2220] leading-tight mb-3">
              Khám phá cách người xưa nhìn thời gian và con người
            </h1>
            <p className="text-sm sm:text-base text-[#6a5951] leading-relaxed mb-4">
              Người xưa mượn sự vận hành của tinh tú và tiết khí để soi tỏ phẩm hạnh, quán chiếu tâm tính
              và tìm điểm tựa an lành trong nhịp sống. Đây là không gian đối thoại nội tâm với hệ thống
              biểu tượng cổ truyền, hoàn toàn không phải lời tiên đoán số mệnh hay định đoạt tương lai.
            </p>
            <div className="flex items-center gap-3 text-xs text-[#8c7b73] flex-wrap">
              <span>• Không áp đặt định kiến</span>
              <span>• Không suy đoán tai ương</span>
              <span>• Bảo mật tuyệt đối trên máy</span>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="rounded-3xl overflow-hidden border border-[#eddcd0] shadow-xs relative aspect-16/10 bg-[#2b211d]">
              <img
                src="/images/ancestor_portrait.jpg"
                alt="Học giả bên bàn gỗ và bản đồ thiên văn giấy dó"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-3 left-4 right-4 text-xs text-white/90 italic flex items-center justify-between">
                <span>Tranh đồ họa giấy Dó • Góc học thảo dân gian</span>
                <span className="text-[#e2caa8]">✦</span>
              </div>
            </div>
          </div>
        </div>

        {/* 2-Column Content: Form Left | Blueprint Preview Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-10">
          {/* Form Column (5 cols) */}
          <div className="lg:col-span-5 space-y-5">
            <Card className="p-6 sm:p-7 rounded-3xl bg-white border border-[#eddcd0] shadow-xs">
              <div className="mb-4">
                <h3 className="font-['Noto_Serif',serif] font-bold text-lg text-[#2a2220] flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#9e3b2e]" />
                  <span>Nhập thông tin chiêm nghiệm</span>
                </h3>
                <p className="text-xs text-[#827169] mt-1 leading-relaxed">
                  Mỗi thông tin dưới đây chỉ phục vụ duy nhất mục đích tra cứu biểu tượng đối ứng trong
                  buổi làm việc này.
                </p>
              </div>

              <form onSubmit={handleGenerate} className="space-y-4">
                {/* 1. Ngày sinh Dương lịch */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-xs font-semibold text-[#5a4942]">
                      Ngày sinh (Dương lịch)*
                    </label>
                    <span className="text-[11px] text-[#9a8981]">Lịch chuẩn</span>
                  </div>

                  <div className="grid grid-cols-3 gap-2">
                    <select
                      value={day}
                      onChange={(e) => setDay(Number(e.target.value))}
                      className="px-3 py-2.5 rounded-xl border border-[#eddcd0] text-xs font-medium text-[#2a2220] bg-white outline-none focus:border-[#9e3b2e]"
                    >
                      {Array.from({ length: 31 }, (_, i) => i + 1).map((d) => (
                        <option key={d} value={d}>
                          Ngày {d}
                        </option>
                      ))}
                    </select>

                    <select
                      value={month}
                      onChange={(e) => setMonth(Number(e.target.value))}
                      className="px-3 py-2.5 rounded-xl border border-[#eddcd0] text-xs font-medium text-[#2a2220] bg-white outline-none focus:border-[#9e3b2e]"
                    >
                      {Array.from({ length: 12 }, (_, i) => i + 1).map((m) => (
                        <option key={m} value={m}>
                          Tháng {m}
                        </option>
                      ))}
                    </select>

                    <select
                      value={year}
                      onChange={(e) => setYear(Number(e.target.value))}
                      className="px-3 py-2.5 rounded-xl border border-[#eddcd0] text-xs font-medium text-[#2a2220] bg-white outline-none focus:border-[#9e3b2e]"
                    >
                      {Array.from({ length: 70 }, (_, i) => 2024 - i).map((y) => (
                        <option key={y} value={y}>
                          Năm {y}
                        </option>
                      ))}
                    </select>
                  </div>
                  <p className="text-[11px] text-[#93827a] mt-1 italic">
                    Dùng để xác định vị trí nhịp điệu thời gian và chu kỳ mùa vụ theo góc nhìn cổ truyền.
                  </p>
                </div>

                {/* 2. Giờ sinh (Tùy chọn) */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-xs font-semibold text-[#5a4942]">
                      Giờ sinh (Tùy chọn)
                    </label>
                    <label className="flex items-center gap-1.5 text-[11px] text-[#84726b] cursor-pointer">
                      <input
                        type="checkbox"
                        checked={noHour}
                        onChange={(e) => setNoHour(e.target.checked)}
                        className="rounded text-[#9e3b2e] focus:ring-[#9e3b2e]"
                      />
                      <span>Không nhớ giờ sinh</span>
                    </label>
                  </div>

                  <select
                    disabled={noHour}
                    value={hourCanh}
                    onChange={(e) => setHourCanh(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#eddcd0] text-xs font-medium text-[#2a2220] bg-white outline-none focus:border-[#9e3b2e] disabled:opacity-50"
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
                  <label className="block text-xs font-semibold text-[#5a4942] mb-1.5">
                    Vùng sinh / Phương vị (Tùy chọn)
                  </label>
                  <select
                    value={region}
                    onChange={(e) => setRegion(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#eddcd0] text-xs font-medium text-[#2a2220] bg-white outline-none focus:border-[#9e3b2e]"
                  >
                    <option value="bac">Miền Bắc (Khí hậu tứ thời phân minh)</option>
                    <option value="trung">Miền Trung (Nắng gió trường tồn kiên định)</option>
                    <option value="nam">Miền Nam (Mùa mưa nắng phù sa hào sảng)</option>
                  </select>
                  <p className="text-[11px] text-[#93827a] mt-1 italic">
                    Giúp tham chiếu tương quan múi giờ tự nhiên của vùng đất bạn chào đời.
                  </p>
                </div>

                {/* 4. Checkbox đồng ý */}
                <div className="p-3 rounded-2xl bg-[#faf3ec] border border-[#ecd9cb]">
                  <label className="flex items-start gap-2.5 text-xs text-[#5f4e47] leading-relaxed cursor-pointer">
                    <input
                      type="checkbox"
                      required
                      checked={agreedDisclaimer}
                      onChange={(e) => setAgreedDisclaimer(e.target.checked)}
                      className="mt-0.5 rounded text-[#9e3b2e] focus:ring-[#9e3b2e]"
                    />
                    <span>
                      Tôi hiểu rằng đây là hoạt động tìm hiểu biểu tượng văn hóa để tự suy ngẫm,
                      không phải dự đoán vận mệnh. Đồng ý sử dụng thông tin tạm thời để tạo kết quả
                      cho phiên làm việc này.
                    </span>
                  </label>
                </div>

                {/* Submit Action */}
                <Button
                  type="submit"
                  disabled={!agreedDisclaimer}
                  className="w-full py-3.5 rounded-2xl bg-[#9e3b2e] hover:bg-[#852f24] text-white font-semibold text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  <Eye className="w-4 h-4" />
                  <span>Xem bản chiêm nghiệm</span>
                </Button>
              </form>

              {/* Data Commitment Note */}
              <div className="mt-5 p-3.5 rounded-2xl bg-[#fcf8f3] border border-[#f0e4d7] text-xs text-[#78665f] flex items-start gap-2.5">
                <Lock className="w-4 h-4 text-[#9e3b2e] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-[#2a2220]">Cam kết dữ liệu cá nhân: </strong>
                  Bản demo hoạt động trực tiếp trên trình duyệt, không gửi hoặc lưu trữ ngày tháng
                  năm sinh lên bất kỳ máy chủ nào. Bạn hoàn toàn làm chủ thông tin của mình.
                </div>
              </div>
            </Card>
          </div>

          {/* Blueprint & Results Column (7 cols) */}
          <div className="lg:col-span-7 space-y-5">
            <Card className="p-6 sm:p-8 rounded-3xl bg-white border border-[#eddcd0] shadow-xs">
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-[#f3e6da]">
                <h3 className="font-['Noto_Serif',serif] font-bold text-lg text-[#2a2220] flex items-center gap-2">
                  <Compass className="w-4 h-4 text-[#9e3b2e]" />
                  <span>Cấu trúc bản chiêm nghiệm sẽ hiển thị</span>
                </h3>
                <Badge variant="outline" className="text-xs border-[#eedcd0] text-[#8c7b74]">
                  {showResult ? "Đã đối chiếu biểu tượng" : "Chờ nhập dữ liệu"}
                </Badge>
              </div>

              {/* Block 1: Thông tin lá số & Khung biểu tượng */}
              <div className="p-5 rounded-2xl bg-[#fbf5ee] border border-[#eedcd0] mb-5">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-bold text-sm text-[#2a2220] flex items-center gap-1.5">
                    <span className="w-4 h-4 rounded-full bg-[#9e3b2e] text-white text-[10px] flex items-center justify-center font-bold">
                      1
                    </span>
                    <span>Thông tin lá số & Khung biểu tượng</span>
                  </h4>
                  <Lock className="w-3.5 h-3.5 text-[#9e3b2e]" />
                </div>
                <p className="text-xs text-[#715f57] mb-3">
                  Xem trước sơ đồ vị trí các cung nếp xưa, ngũ hành tương phối và mùa sinh đối ứng nhịp điệu vũ trụ.
                </p>

                {showResult ? (
                  <div className="p-4 rounded-xl bg-white border border-[#ebd6c5] grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
                    <div>
                      <div className="text-[10px] uppercase text-[#9e3b2e] font-bold">Năm sinh</div>
                      <div className="font-bold text-sm text-[#2a2220]">Mậu Dần</div>
                      <div className="text-[11px] text-[#8c7b74]">Thành Đầu Thổ</div>
                    </div>
                    <div>
                      <div className="text-[10px] uppercase text-[#9e3b2e] font-bold">Mùa sinh</div>
                      <div className="font-bold text-sm text-[#2a2220]">Mùa Thu</div>
                      <div className="text-[11px] text-[#8c7b74]">Khí Kim thanh tú</div>
                    </div>
                    <div>
                      <div className="text-[10px] uppercase text-[#9e3b2e] font-bold">Phương vị</div>
                      <div className="font-bold text-sm text-[#2a2220]">Bắc Bộ</div>
                      <div className="text-[11px] text-[#8c7b74]">Tứ thời luân chuyển</div>
                    </div>
                    <div>
                      <div className="text-[10px] uppercase text-[#9e3b2e] font-bold">Chủ khí</div>
                      <div className="font-bold text-sm text-[#2a2220]">Đất dưỡng</div>
                      <div className="text-[11px] text-[#8c7b74]">Bền bỉ, che chở</div>
                    </div>
                  </div>
                ) : (
                  <div className="p-4 rounded-xl bg-white/60 border border-dashed border-[#dfcfc2] text-center text-xs text-[#8c7b74]">
                    Tứ trụ khí & Vòng quay mùa vụ sẽ hiển thị tự động sau khi nhập thông tin.
                  </div>
                )}
              </div>

              {/* Block 2: Biểu tượng và ý nghĩa văn hóa */}
              <div className="p-5 rounded-2xl bg-[#fbf5ee] border border-[#eedcd0] mb-5">
                <h4 className="font-bold text-sm text-[#2a2220] mb-1 flex items-center gap-1.5">
                  <span className="w-4 h-4 rounded-full bg-[#9e3b2e] text-white text-[10px] flex items-center justify-center font-bold">
                    2
                  </span>
                  <span>Biểu tượng và ý nghĩa văn hóa</span>
                </h4>
                <p className="text-xs text-[#715f57] mb-4">
                  Diễn giải hình tượng tự nhiên (Cây cỏ, Dòng nước, Đất lành, Ngọn lửa) và các bài học nhân sinh cha ông đúc kết.
                </p>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  <div className="p-3 rounded-xl bg-white border border-[#eedcd0] text-center">
                    <div className="text-sm font-bold text-[#2d6a59] mb-0.5">Mộc</div>
                    <div className="text-xs font-semibold text-[#2a2220]">Điềm đạm</div>
                    <div className="text-[10px] text-[#8a7972] mt-1">Như rừng cây vươn đón nắng</div>
                  </div>
                  <div className="p-3 rounded-xl bg-white border border-[#eedcd0] text-center">
                    <div className="text-sm font-bold text-[#1d5b79] mb-0.5">Thủy</div>
                    <div className="text-xs font-semibold text-[#2a2220]">Bao dung</div>
                    <div className="text-[10px] text-[#8a7972] mt-1">Như dòng sông ôm lấy phù sa</div>
                  </div>
                  <div className="p-3 rounded-xl bg-white border border-[#eedcd0] text-center">
                    <div className="text-sm font-bold text-[#9e3b2e] mb-0.5">Hỏa</div>
                    <div className="text-xs font-semibold text-[#2a2220]">Nhiệt thành</div>
                    <div className="text-[10px] text-[#8a7972] mt-1">Như ngọn lửa sưởi ấm gia đình</div>
                  </div>
                  <div className="p-3 rounded-xl bg-white border border-[#eedcd0] text-center">
                    <div className="text-sm font-bold text-[#8a5a22] mb-0.5">Thổ</div>
                    <div className="text-xs font-semibold text-[#2a2220]">Vững vàng</div>
                    <div className="text-[10px] text-[#8a7972] mt-1">Như mảnh đất nuôi dưỡng muôn hoa</div>
                  </div>
                </div>
              </div>

              {/* Block 3: Góc nhìn để tự suy ngẫm */}
              <div className="p-5 rounded-2xl bg-[#fbf5ee] border border-[#eedcd0] mb-5">
                <h4 className="font-bold text-sm text-[#2a2220] mb-1 flex items-center gap-1.5">
                  <span className="w-4 h-4 rounded-full bg-[#9e3b2e] text-white text-[10px] flex items-center justify-center font-bold">
                    3
                  </span>
                  <span>Góc nhìn để tự suy ngẫm</span>
                </h4>
                <p className="text-xs text-[#715f57] mb-3">
                  Các câu hỏi mở để người dùng tự lắng nghe điểm mạnh, điểm cần tôi luyện của bản thân
                  thay vì nhận phán xét áp đặt.
                </p>

                <div className="p-4 rounded-xl bg-white border border-[#ebd6c5] text-xs sm:text-sm font-['Noto_Serif',serif] italic text-[#4a3a33] leading-relaxed">
                  “Khi lòng dừng lại, vạn cảnh mới tự thông suốt. Bản mệnh không phải là chiếc lồng giam
                  hãm, mà là bài học nuôi dưỡng tâm từ và sự kiên định giữa đời.”
                </div>
              </div>

              <div className="text-[11px] text-[#89776f] italic text-center">
                Mỗi biểu tượng chỉ là một lăng kính mộc mạc để bạn thấu hiểu chính mình sâu sắc hơn
                trong dòng chảy cuộc sống hôm nay.
              </div>
            </Card>
          </div>
        </div>

        {/* Standard Ethical Standards of Tin Lắm Tâm Linh */}
        <div className="p-6 rounded-3xl bg-[#faf4ed] border border-[#ebdcd0] mb-8">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#9e3b2e] mb-4">
            <ShieldCheck className="w-4 h-4 text-[#9e3b2e]" />
            <span>Nguyên tắc chuẩn mực của Tin Lắm Tâm Linh</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-[#6b5952] leading-relaxed">
            <div className="p-4 rounded-2xl bg-white border border-[#ecd9cb]">
              <div className="font-bold text-[#2a2220] mb-1.5 flex items-center gap-1.5 text-rose-700">
                <span>🚫 Không phán đoán đại hạn tai họa</span>
              </div>
              Không tạo nỗi bất an, không răn đe số phận hay tạo sự lo lắng phi căn cứ cho người xem.
            </div>

            <div className="p-4 rounded-2xl bg-white border border-[#ecd9cb]">
              <div className="font-bold text-[#2a2220] mb-1.5 flex items-center gap-1.5 text-amber-700">
                <span>🚫 Không dự báo tài lộc hay bệnh tật</span>
              </div>
              Tuyệt đối không can thiệp vào các quyết định y tế, pháp lý, tài chính hoặc hôn nhân cá nhân.
            </div>

            <div className="p-4 rounded-2xl bg-white border border-[#ecd9cb]">
              <div className="font-bold text-[#2a2220] mb-1.5 flex items-center gap-1.5 text-indigo-700">
                <span>🚫 Không thương mại hóa vật phẩm</span>
              </div>
              Không bán đồ giải hạn, bùa chú, dịch vụ cúng kiếng hay trục lợi trên niềm tin tinh thần.
            </div>
          </div>
        </div>

        {/* Bottom Navigation Links */}
        <div className="flex items-center justify-between text-xs font-semibold text-[#8c7a72] pt-4 border-t border-[#ecdcd0]">
          <button
            onClick={onBackToExperience}
            className="hover:text-[#9e3b2e] transition-colors cursor-pointer"
          >
            ← Quay lại trang Trải nghiệm
          </button>

          {onGoToCulture && (
            <button
              onClick={onGoToCulture}
              className="text-[#9e3b2e] hover:underline cursor-pointer"
            >
              Tìm hiểu triết lý thời gian trong văn hóa dân gian →
            </button>
          )}
        </div>
      </main>
    </div>
  );
};
