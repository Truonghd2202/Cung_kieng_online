import React from "react";
import {
  ArrowRight,
  BookOpen,
  Coffee,
  Volume2,
  Clock,
  Sparkles,
  ArrowUpRight,
  FileText,
} from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { Badge } from "@/src/components/ui/badge";
import { Card } from "@/src/components/ui/card";

interface TodayScreenProps {
  onSelectMoodClick: () => void;
  onExploreRegion?: (region: string) => void;
}

export const TodayScreen: React.FC<TodayScreenProps> = ({
  onSelectMoodClick,
  onExploreRegion,
}) => {
  return (
    <div className="w-full min-h-screen bg-[#fcf8f2] text-[#2e2624] font-['Be_Vietnam_Pro',sans-serif]">
      <main className="max-w-6xl mx-auto px-4 sm:px-6 pt-10 pb-16">
        {/* Top Status Badge */}
        <div className="flex justify-center mb-6">
          <Badge variant="secondary" className="gap-2 px-4 py-1.5 text-xs font-semibold tracking-wide">
            <span className="w-2 h-2 rounded-full bg-[#9e3b2e]"></span>
            <span>Chưa ghi nhận nhịp tâm hôm nay</span>
            <span className="text-[#be8e5a]">•</span>
            <span className="italic font-normal">Lắng lòng một chút</span>
          </Badge>
        </div>

        {/* Center Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="text-xs uppercase tracking-[0.14em] font-bold text-[#9e3b2e] mb-2">
            Chiêm nghiệm thường nhật • Khởi tạo an yên
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-[42px] font-['Noto_Serif',serif] font-bold text-[#2a211e] leading-tight">
            Hôm nay bạn thấy thế nào?
          </h1>
          <p className="mt-3 text-sm sm:text-base text-[#6f6059] leading-relaxed">
            Một ngày trôi qua với nhiều xáo động hay an ả. Hãy dành một khoảng
            lặng ngắn ngủi để soi tỏ cảm xúc của chính mình trước khi đón nhận
            tín hiệu dân gian lành.
          </p>
        </div>

        {/* Central Callout Card */}
        <Card className="max-w-2xl mx-auto rounded-3xl p-8 text-center shadow-xs mb-16 relative overflow-hidden">
          <div className="w-14 h-14 mx-auto rounded-2xl bg-[#faece1] border border-[#eddcd0] flex items-center justify-center text-[#9e3b2e] mb-5 shadow-xs">
            <FileText className="w-7 h-7 text-[#9e3b2e]" />
          </div>

          <p className="font-['Noto_Serif',serif] font-bold text-xl sm:text-2xl text-[#2a2220] leading-snug max-w-xl mx-auto mb-6">
            “Mỗi ngày một lời nhắn lành, soi thấu suy tư qua nét văn hóa dân
            gian trầm ấm.”
          </p>

          <Button
            variant="default"
            size="pill"
            onClick={onSelectMoodClick}
            className="px-8 py-3.5 text-sm font-semibold shadow-xs hover:shadow group"
          >
            <span>Chọn tâm trạng</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Button>

          <div className="mt-4 text-xs text-[#8c7b74] flex items-center justify-center gap-2">
            <Clock className="w-3.5 h-3.5 text-[#9e3b2e]" />
            <span>Chỉ mất 1 phút</span>
            <span>•</span>
            <span>Không cần đăng nhập trước để bắt đầu</span>
          </div>
        </Card>

        {/* Section: Cội nguồn phong thổ */}
        <section className="mb-16">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 mb-6">
            <div>
              <div className="text-xs font-bold text-[#9e3b2e] uppercase tracking-wider mb-1 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#9e3b2e]"></span>
                Cội nguồn phong thổ
              </div>
              <h2 className="text-2xl sm:text-3xl font-['Noto_Serif',serif] font-bold text-[#2a2220]">
                Khám phá văn hóa ba miền
              </h2>
            </div>
            <div className="text-xs text-[#82726b] italic">
              Nếp sống, tín ngưỡng lành và tập tục ngàn đời
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Card 1: Bắc Bộ */}
            <Card className="rounded-2xl overflow-hidden shadow-xs flex flex-col justify-between group">
              <div>
                <div className="relative h-48 overflow-hidden">
                  <img
                    src="/images/temple_bac_bo.jpg"
                    alt="Bắc Bộ"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-black/60 backdrop-blur-xs text-white text-[11px] font-semibold">
                    Bắc Bộ
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="font-['Noto_Serif',serif] font-bold text-lg text-[#2a2220] mb-2">
                    Căn cốt Kinh Bắc & Tràng An
                  </h3>
                  <p className="text-xs sm:text-sm text-[#72625b] leading-relaxed line-clamp-2">
                    Nếp trật tự trang nghiêm, tục thờ gia tiên, nét thâm trầm
                    của văn hóa đình làng và...
                  </p>
                </div>
              </div>
              <div className="px-5 pb-5">
                <div className="text-[11px] text-[#9a8982] mb-2">
                  Nội dung minh họa — đang biên tập
                </div>
                <Button
                  variant="link"
                  onClick={() => onExploreRegion?.("Bắc Bộ")}
                  className="p-0 h-auto text-xs font-semibold text-[#9e3b2e] hover:text-[#7f2c22] flex items-center gap-1"
                >
                  <span>Chiêm nghiệm lối Bắc</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Button>
              </div>
            </Card>

            {/* Card 2: Trung Bộ */}
            <Card className="rounded-2xl overflow-hidden shadow-xs flex flex-col justify-between group">
              <div>
                <div className="relative h-48 overflow-hidden">
                  <img
                    src="/images/hue_trung_bo.jpg"
                    alt="Trung Bộ"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-black/60 backdrop-blur-xs text-white text-[11px] font-semibold">
                    Trung Bộ
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="font-['Noto_Serif',serif] font-bold text-lg text-[#2a2220] mb-2">
                    Trầm lắng miền Cố Đô
                  </h3>
                  <p className="text-xs sm:text-sm text-[#72625b] leading-relaxed line-clamp-2">
                    Sự hòa quyện giữa tinh hoa cung đình và nếp sống mộc mạc xứ
                    cát, tâm thức hướn...
                  </p>
                </div>
              </div>
              <div className="px-5 pb-5">
                <div className="text-[11px] text-[#9a8982] mb-2">
                  Nội dung minh họa — đang biên tập
                </div>
                <Button
                  variant="link"
                  onClick={() => onExploreRegion?.("Trung Bộ")}
                  className="p-0 h-auto text-xs font-semibold text-[#9e3b2e] hover:text-[#7f2c22] flex items-center gap-1"
                >
                  <span>Chiêm nghiệm lối Trung</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Button>
              </div>
            </Card>

            {/* Card 3: Nam Bộ */}
            <Card className="rounded-2xl overflow-hidden shadow-xs flex flex-col justify-between group">
              <div>
                <div className="relative h-48 overflow-hidden">
                  <img
                    src="/images/mekong_nam_bo.jpg"
                    alt="Nam Bộ"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-black/60 backdrop-blur-xs text-white text-[11px] font-semibold">
                    Nam Bộ
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="font-['Noto_Serif',serif] font-bold text-lg text-[#2a2220] mb-2">
                    Khoáng đạt đất Phương Nam
                  </h3>
                  <p className="text-xs sm:text-sm text-[#72625b] leading-relaxed line-clamp-2">
                    Lòng bao dung sông nước, tín ngưỡng Bà Chúa Xứ, tinh thần
                    hào sảng dung hòa đa...
                  </p>
                </div>
              </div>
              <div className="px-5 pb-5">
                <div className="text-[11px] text-[#9a8982] mb-2">
                  Nội dung minh họa — đang biên tập
                </div>
                <Button
                  variant="link"
                  onClick={() => onExploreRegion?.("Nam Bộ")}
                  className="p-0 h-auto text-xs font-semibold text-[#9e3b2e] hover:text-[#7f2c22] flex items-center gap-1"
                >
                  <span>Chiêm nghiệm lối Nam</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Button>
              </div>
            </Card>
          </div>
        </section>

        {/* Section: Chất liệu soi tỏ */}
        <section className="mb-14">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 mb-6">
            <div>
              <div className="text-xs font-bold text-[#9e3b2e] uppercase tracking-wider mb-1 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#9e3b2e]"></span>
                Chất liệu soi tỏ
              </div>
              <h2 className="text-2xl sm:text-3xl font-['Noto_Serif',serif] font-bold text-[#2a2220]">
                Chọn trải nghiệm
              </h2>
            </div>
            <div className="text-xs text-[#82726b] italic">
              Lối mở dành cho bạn tự do tìm hiểu lúc rảnh rỗi
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Experience 1 */}
            <Card className="p-6 rounded-2xl flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-[#faede2] flex items-center justify-center text-[#9e3b2e] mb-4">
                  <BookOpen className="w-5 h-5" />
                </div>
                <h3 className="font-['Noto_Serif',serif] font-bold text-lg text-[#29201e] mb-2">
                  Thư viện tích cổ dân gian
                </h3>
                <p className="text-xs sm:text-sm text-[#71615b] leading-relaxed">
                  Những mẩu chuyện biểu tượng, lời răn dạy từ ngàn xưa truyền
                  lại qua ca dao tục ngữ được dịch nghĩa giản dị.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-[#f4e8dc] flex items-center justify-between text-xs text-[#9a8982]">
                <span>Nội dung minh họa — đang biên tập</span>
                <ArrowUpRight className="w-4 h-4 text-[#9e3b2e]" />
              </div>
            </Card>

            {/* Experience 2 */}
            <Card className="p-6 rounded-2xl flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-[#faede2] flex items-center justify-center text-[#9e3b2e] mb-4">
                  <Coffee className="w-5 h-5" />
                </div>
                <h3 className="font-['Noto_Serif',serif] font-bold text-lg text-[#29201e] mb-2">
                  Gieo hạt an lành
                </h3>
                <p className="text-xs sm:text-sm text-[#71615b] leading-relaxed">
                  Thực hành một cử chỉ dịu dàng trong ngày: thắp nén trầm, châm
                  búp trà, hay gửi lời tri ân bình dị đến người thân.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-[#f4e8dc] flex items-center justify-between text-xs text-[#9a8982]">
                <span>Nội dung minh họa — đang biên tập</span>
                <ArrowUpRight className="w-4 h-4 text-[#9e3b2e]" />
              </div>
            </Card>

            {/* Experience 3 */}
            <Card className="p-6 rounded-2xl flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-[#faede2] flex items-center justify-center text-[#9e3b2e] mb-4">
                  <Volume2 className="w-5 h-5" />
                </div>
                <h3 className="font-['Noto_Serif',serif] font-bold text-lg text-[#29201e] mb-2">
                  Thanh âm thuần khiết
                </h3>
                <p className="text-xs sm:text-sm text-[#71615b] leading-relaxed">
                  Tiếng chuông đồng ngân vang nơi chốn tịnh, tiếng mưa trên mái
                  ngói rêu phong và làn gió thoảng qua lũy tre làng.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-[#f4e8dc] flex items-center justify-between text-xs text-[#9a8982]">
                <span>Nội dung minh họa — đang biên tập</span>
                <ArrowUpRight className="w-4 h-4 text-[#9e3b2e]" />
              </div>
            </Card>
          </div>
        </section>

        {/* Bottom Thought Ribbon */}
        <div className="p-4 sm:p-5 rounded-2xl bg-[#faede2]/80 border border-[#ecd9cb] text-center text-xs sm:text-sm text-[#78665f] flex items-center justify-center gap-2">
          <Sparkles className="w-4 h-4 text-[#9e3b2e]" />
          <span>
            Mỗi suy tư đều xứng đáng được lắng nghe. Hãy thong thả khởi đầu ngày
            mới khi bạn đã sẵn sàng.
          </span>
        </div>
      </main>
    </div>
  );
};
