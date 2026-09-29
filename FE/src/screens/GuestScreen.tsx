import React, { useState } from "react";
import {
  Compass,
  Calendar,
  Sparkles,
  BookOpen,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  HelpCircle,
  Wind,
  Heart,
  Moon,
  Waves,
  Feather,
  Flower2,
} from "lucide-react";
import { MoodKey, MOODS_LIST, SIGNALS_DATA } from "../data/demoSignals";
import { Button } from "@/src/components/ui/button";
import { Badge } from "@/src/components/ui/badge";
import { Card } from "@/src/components/ui/card";

interface GuestScreenProps {
  onStartSignal: (mood: MoodKey) => void;
  onGoToToday: () => void;
  onGoToAccount: () => void;
}

export const GuestScreen: React.FC<GuestScreenProps> = ({
  onStartSignal,
  onGoToToday,
  onGoToAccount,
}) => {
  const [selectedMood, setSelectedMood] = useState<MoodKey>("An yên");
  const currentSignal = SIGNALS_DATA[selectedMood];

  const getMoodIcon = (iconType: string) => {
    switch (iconType) {
      case "lotus":
        return <Flower2 className="w-3.5 h-3.5 text-[#9e3b2e]" />;
      case "waves":
        return <Waves className="w-3.5 h-3.5 text-[#9e3b2e]" />;
      case "question":
        return <HelpCircle className="w-3.5 h-3.5 text-[#9e3b2e]" />;
      case "wind":
        return <Wind className="w-3.5 h-3.5 text-[#9e3b2e]" />;
      case "heart":
        return <Heart className="w-3.5 h-3.5 text-[#9e3b2e]" />;
      case "moon":
        return <Moon className="w-3.5 h-3.5 text-[#9e3b2e]" />;
      default:
        return <Sparkles className="w-3.5 h-3.5 text-[#9e3b2e]" />;
    }
  };

  return (
    <div className="w-full min-h-screen bg-[#fcf8f2] text-[#2e2624] font-['Be_Vietnam_Pro',sans-serif]">
      <main className="max-w-6xl mx-auto px-4 sm:px-6 pt-10 pb-16">
        {/* Top greeting badge and title */}
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6 mb-8">
          <div className="max-w-3xl">
            <Badge variant="terracotta" className="gap-2 px-3 py-1 mb-3 uppercase tracking-wider text-xs">
              <span className="w-2 h-2 rounded-full bg-[#9e3b2e] animate-pulse"></span>
              Tâm duyên hội tụ • Khách thập phương
            </Badge>

            <h1 className="text-3xl sm:text-4xl lg:text-[44px] font-['Noto_Serif',serif] font-bold text-[#2a2220] leading-[1.25] tracking-tight">
              Chào bạn hữu duyên ghé lại —{" "}
              <span className="block sm:inline font-semibold italic text-[#9e3b2e]">
                Gieo một nhịp an lành hôm nay
              </span>
            </h1>

            <p className="mt-3 text-base sm:text-lg text-[#6f615b] leading-relaxed max-w-2xl font-normal">
              Không cần tạo tài khoản ngay. Bạn hoàn toàn có thể lắng lòng, chọn
              tâm trạng và đón nhận một thông điệp văn hóa dân gian chân thực.
            </p>
          </div>

          {/* Right date/almanac card */}
          <Card className="self-start lg:mt-2 px-5 py-3.5 rounded-2xl flex items-center gap-3.5">
            <div className="w-9 h-9 rounded-full bg-[#faece1] flex items-center justify-center text-[#9e3b2e]">
              <Flower2 className="w-5 h-5 text-[#9e3b2e]" />
            </div>
            <div>
              <div className="text-xs uppercase tracking-wider text-[#938279] font-medium">
                Khoảng lặng hôm nay
              </div>
              <div className="font-['Noto_Serif',serif] font-bold text-base text-[#2e2624]">
                Thuận Hòa • An Nhiên
              </div>
            </div>
          </Card>
        </div>

        {/* Hero Interactive Split Card */}
        <Card className="rounded-3xl p-6 sm:p-8 shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
          {/* Left Column: Visual and Classical Quote */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div className="relative rounded-2xl overflow-hidden shadow-inner group">
              <img
                src="/images/tea_bowl.jpg"
                alt="Chén trà tịnh tâm"
                className="w-full h-64 sm:h-72 object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20" />

              {/* Floating badges on image */}
              <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-white/85 backdrop-blur-md text-xs font-semibold text-[#3a302c] uppercase tracking-wider shadow-xs">
                Khởi thức vô ưu
              </div>
              <div className="absolute top-4 right-4 w-7 h-7 rounded-full bg-white/85 backdrop-blur-md flex items-center justify-center text-[#9e3b2e] shadow-xs">
                <Flower2 className="w-4 h-4" />
              </div>
            </div>

            {/* Quote directly beneath photo */}
            <div className="mt-5 p-5 rounded-2xl bg-[#fbf6f0] border border-[#f0e2d5]">
              <div className="text-xs font-bold uppercase tracking-wider text-[#9e3b2e] mb-1.5 flex items-center gap-1.5">
                <span>Cổ thi dẫn giải</span>
              </div>
              <p className="font-['Noto_Serif',serif] italic font-semibold text-lg sm:text-[19px] text-[#2c2220] leading-snug">
                “Nước trong hoa nở ngát dòng,
                <br />
                Tâm an vạn nẻo bụi trần hóa sen.”
              </p>
              <div className="mt-3 text-xs text-[#82716a] flex items-center gap-1.5">
                <span className="text-[#be8e5a]">✦</span>
                <span>Dân gian truyền khuyên • Thảnh thơi nhịp thở</span>
              </div>
            </div>
          </div>

          {/* Right Column: Mood Selection and Action */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
            <div>
              {/* Top metadata row */}
              <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-[#f2e5d9]">
                <div className="flex items-center gap-2 text-xs text-[#7d6e67]">
                  <Calendar className="w-3.5 h-3.5 text-[#9e3b2e]" />
                  <span className="font-medium text-[#2f2623]">
                    Ngày lành khởi tâm
                  </span>
                  <span>•</span>
                  <span>Dữ liệu chiêm nghiệm tự nhiên</span>
                </div>
                <Badge variant="gold">Giờ Hoàng Đạo</Badge>
              </div>

              {/* Question Heading */}
              <div className="mt-5">
                <div className="flex items-baseline justify-between mb-1">
                  <h3 className="text-base sm:text-lg font-bold text-[#2e2624] flex items-center gap-2">
                    <span className="text-[#9e3b2e]">✦</span>
                    Hiện tại, tâm cảnh bạn tựa ngọn gió nào?
                  </h3>
                  <span className="text-xs text-[#9a8982]">
                    Chọn 1 để soi sáng
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-[#7a6b65] leading-relaxed">
                  Mỗi rung cảm đều là cánh cửa mở ra một tích truyện, câu ca dao
                  hay phong vị mộc mạc trao tặng bạn.
                </p>
              </div>

              {/* Mood Buttons Grid (2 cols x 3 rows) */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 mt-5">
                {MOODS_LIST.map((m) => {
                  const isSelected = selectedMood === m.key;
                  return (
                    <button
                      key={m.key}
                      onClick={() => setSelectedMood(m.key)}
                      className={`px-3 py-2.5 rounded-xl border text-xs sm:text-sm font-medium flex items-center justify-between transition-all cursor-pointer ${
                        isSelected
                          ? "bg-[#faece1] border-[#9e3b2e] text-[#9e3b2e] shadow-xs ring-1 ring-[#9e3b2e]"
                          : "bg-[#fffdfa] border-[#eddcd0] text-[#4d403b] hover:border-[#dfc3af] hover:bg-[#faf4ee]"
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${
                            isSelected ? "bg-[#9e3b2e]" : "bg-[#c5b4aa]"
                          }`}
                        />
                        <span>{m.name}</span>
                      </div>
                      <div className="opacity-70">{getMoodIcon(m.iconType)}</div>
                    </button>
                  );
                })}
              </div>

              {/* Dynamic Signal Preview Box */}
              <div className="mt-5 p-4 rounded-2xl bg-[#faf3ec] border border-[#eedcd0] flex items-start gap-3.5">
                <div className="w-8 h-8 rounded-lg bg-white border border-[#e4d1c2] flex-shrink-0 flex items-center justify-center text-[#9e3b2e]">
                  <Compass className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-[#9e3b2e] mb-0.5">
                    {currentSignal.guestPreview.title}
                  </div>
                  <p className="text-xs sm:text-sm text-[#665751] leading-relaxed">
                    {currentSignal.guestPreview.message}
                  </p>
                </div>
              </div>
            </div>

            {/* Action Row */}
            <div className="pt-4 border-t border-[#f2e5d9] flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
              <Button
                variant="default"
                size="lg"
                onClick={() => onStartSignal(selectedMood)}
                className="gap-2.5 shadow-sm hover:shadow"
              >
                <BookOpen className="w-4 h-4" />
                <span>Khám phá tín hiệu không cần đăng nhập</span>
              </Button>

              <Button
                variant="link"
                onClick={onGoToAccount}
                className="text-xs sm:text-sm text-[#63534d] hover:text-[#9e3b2e]"
              >
                <span>Đã có tài khoản? Đăng nhập đồng bộ Góc của tôi</span>
                <ArrowRight className="w-3.5 h-3.5 ml-0.5" />
              </Button>
            </div>
          </div>
        </Card>

        {/* 3 Pillars Section */}
        <section className="mb-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
            <div>
              <div className="text-xs font-bold text-[#9e3b2e] uppercase tracking-wider mb-1">
                — Ba trụ cột trải nghiệm
              </div>
              <h2 className="text-2xl sm:text-3xl font-['Noto_Serif',serif] font-bold text-[#2a2220]">
                Tinh hoa dân gian, nếp sống tỉnh thức
              </h2>
              <p className="mt-2 text-sm text-[#73635d] max-w-2xl leading-relaxed">
                Không ly kỳ huyền hoặc, không gieo rắc sợ hãi. Mỗi lời chiêm
                nghiệm là một tấm gương soi tỏ lòng mình qua trí tuệ nghìn đời
                của tiền nhân.
              </p>
            </div>

            <div className="flex items-center gap-2 text-xs text-[#82726b] font-medium">
              <span className="w-2 h-2 rounded-full bg-[#be8e5a]"></span>
              <span>Khách ghé tự do</span>
              <span>•</span>
              <span>Bảo mật trọn vẹn</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Pillar 1 */}
            <Card className="p-6 rounded-2xl flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-[#faede2] flex items-center justify-center text-[#9e3b2e] mb-4">
                  <BookOpen className="w-5 h-5" />
                </div>
                <div className="text-xs font-semibold uppercase text-[#9e3b2e] tracking-wider mb-1">
                  Trụ cột 01 • Khảo cứu văn bản
                </div>
                <h3 className="font-['Noto_Serif',serif] font-bold text-lg text-[#29201e] mb-2.5">
                  Chất liệu nguồn cội
                </h3>
                <p className="text-xs sm:text-sm text-[#71615b] leading-relaxed">
                  Ca dao, tục ngữ, tích xưa đã được tuyển lựa cẩn trọng và trích
                  dẫn nguồn xác thực từ kho tàng văn hóa dân tộc — không biến
                  tướng hay pha tạp.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-[#f4e8dc] flex items-center justify-between text-xs font-semibold text-[#8b4237]">
                <span className="flex items-center gap-1.5">
                  <Feather className="w-3.5 h-3.5" />
                  Kho tàng Dó & Văn bia
                </span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </Card>

            {/* Pillar 2 */}
            <Card className="p-6 rounded-2xl flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-[#faede2] flex items-center justify-center text-[#9e3b2e] mb-4">
                  <HelpCircle className="w-5 h-5" />
                </div>
                <div className="text-xs font-semibold uppercase text-[#9e3b2e] tracking-wider mb-1">
                  Trụ cột 02 • Nhân văn hiện đại
                </div>
                <h3 className="font-['Noto_Serif',serif] font-bold text-lg text-[#29201e] mb-2.5">
                  Chiêm nghiệm không mê tín
                </h3>
                <p className="text-xs sm:text-sm text-[#71615b] leading-relaxed">
                  Lời soi chiếu nhân văn, văn minh, không phán xét, không hù dọa
                  vận hạn. Lấy an lạc tự thân và trí tuệ tỉnh táo làm trung tâm
                  soi chiếu đường đời.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-[#f4e8dc] flex items-center justify-between text-xs font-semibold text-[#8b4237]">
                <span className="flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  100% Thuần khiết tư duy
                </span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </Card>

            {/* Pillar 3 */}
            <Card className="p-6 rounded-2xl flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-[#faede2] flex items-center justify-center text-[#9e3b2e] mb-4">
                  <Flower2 className="w-5 h-5" />
                </div>
                <div className="text-xs font-semibold uppercase text-[#9e3b2e] tracking-wider mb-1">
                  Trụ cột 03 • Thực hành vi mô
                </div>
                <h3 className="font-['Noto_Serif',serif] font-bold text-lg text-[#29201e] mb-2.5">
                  Hành động nhỏ nuôi tâm
                </h3>
                <p className="text-xs sm:text-sm text-[#71615b] leading-relaxed">
                  Một cử chỉ vi mô thiết thực cho bạn thực hành ngay trong ngày:
                  tưới một khóm cây, lắng nghe một tri âm, hay giữ một nhịp thở
                  chậm giữa phố thị.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-[#f4e8dc] flex items-center justify-between text-xs font-semibold text-[#8b4237]">
                <span className="flex items-center gap-1.5">
                  <Compass className="w-3.5 h-3.5" />
                  Hành thiền vi mô 5 phút
                </span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </Card>
          </div>
        </section>

        {/* Community Banner Callout */}
        <Card className="p-6 sm:p-8 rounded-3xl bg-[#fbece1] border border-[#edd1c0] flex flex-col lg:flex-row items-center justify-between gap-6 shadow-xs">
          <div className="max-w-2xl">
            <div className="text-xs font-bold text-[#9e3b2e] uppercase tracking-wider mb-1 flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              Gieo duyên cộng đồng
            </div>
            <h3 className="font-['Noto_Serif',serif] font-bold text-xl sm:text-2xl text-[#2a211e]">
              Mỗi ngày một nét mực Dó, góp một nhánh an lành
            </h3>
            <p className="mt-2 text-xs sm:text-sm text-[#705e57] leading-relaxed">
              Hơn 12.400 người bạn hữu duyên đã ghé thăm tuần qua để đón nhận
              một chỉ dẫn văn hóa nhẹ nhàng trước khi bắt đầu ngày làm việc.
            </p>
            <div className="mt-4 flex flex-wrap items-center gap-4 text-xs font-medium text-[#7d6b63]">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#9e3b2e]" />
                Không quảng cáo làm phiền
              </span>
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#9e3b2e]" />
                Không thu thập danh tính
              </span>
            </div>
          </div>

          <div className="text-center flex-shrink-0">
            <Button
              variant="outline"
              size="pill"
              onClick={onGoToToday}
              className="bg-white hover:bg-[#fff9f4] border-[#ebd2c2] text-[#8e392d] shadow-xs"
            >
              <BookOpen className="w-4 h-4 text-[#9e3b2e]" />
              <span>Xem thư viện ca dao & điềm lành</span>
            </Button>
            <div className="mt-2 text-xs text-[#9a867e]">
              Trải nghiệm hoàn toàn mở cho khách
            </div>
          </div>
        </Card>
      </main>
    </div>
  );
};
