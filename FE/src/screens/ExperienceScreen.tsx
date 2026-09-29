import React, { useState } from "react";
import {
  BookOpen,
  Sparkles,
  Landmark,
  Flower2,
  Heart,
  Check,
  ArrowRight,
  Sun,
  Shield,
  Feather,
} from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { Badge } from "@/src/components/ui/badge";
import { Card } from "@/src/components/ui/card";

interface TopicItem {
  id: string;
  tag: string;
  title: string;
  content: string;
  quote: string;
  num: string;
  icon: React.ReactNode;
}

interface ExperienceScreenProps {
  initialTopics?: string[];
  onComplete: (selectedTopics: string[]) => void;
  onSkip?: () => void;
  onGoToXinXam?: () => void;
  onGoToWish?: () => void;
  onGoToZen?: () => void;
}

export const ExperienceScreen: React.FC<ExperienceScreenProps> = ({
  initialTopics = ["cadao", "xinxam", "bamien"],
  onComplete,
  onSkip,
  onGoToXinXam,
  onGoToWish,
  onGoToZen,
}) => {
  // Quản lý các chủ đề đã chọn
  const [selectedIds, setSelectedIds] = useState<string[]>(initialTopics);

  const toggleTopic = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const TOPICS: TopicItem[] = [
    {
      id: "cadao",
      tag: "LỜI XƯA RU NGỦ • Chiêm nghiệm đời sống",
      title: "Ca dao & Tục ngữ",
      content:
        "Lời dặn cổ nhân, chiêm nghiệm đời sống, mộc mạc và sâu sắc qua ngàn đời nuôi dưỡng tâm hồn người Việt.",
      quote: "“Gió đưa cành trúc la đà...”",
      num: "01",
      icon: <BookOpen className="w-5 h-5 text-[#9e3b2e]" />,
    },
    {
      id: "xinxam",
      tag: "NGHI THỨC DÂN GIAN • Thẻ lời ý nghĩa",
      title: "Xin xăm & Gieo quẻ",
      content:
        "Thẻ lời ý nghĩa, soi tỏ băn khoăn, tìm nhịp lắng đọng thường nhật và lắng nghe thông điệp như hòa tiền nhân.",
      quote: "Lắng nghe điềm lành, tâm an sự tỏ",
      num: "02",
      icon: <Sparkles className="w-5 h-5 text-[#9e3b2e]" />,
    },
    {
      id: "bamien",
      tag: "ĐỊA LINH NHÂN KIỆT • Bắc - Trung - Nam",
      title: "Văn hóa Ba Miền",
      content:
        "Phong vị Bắc - Trung - Nam, nếp nhà, hồn quê và cảnh sắc địa linh; hội tụ mỹ tục ngàn năm rạng rỡ đất Việt.",
      quote: "Kinh Kỳ • Cố Đô • Phù Sa Phương Nam",
      num: "03",
      icon: <Landmark className="w-5 h-5 text-[#9e3b2e]" />,
    },
    {
      id: "nghile",
      tag: "NẾP NHÀ TRUYỀN THỐNG • Rằm mùng một",
      title: "Cẩm nang nghi lễ",
      content:
        "Tập tục truyền thống, nén hương, chén trà, giữ trọn nếp sống thuần phong mỹ tục và tấm lòng hướng thiện thuận tự nhiên.",
      quote: "Hương trầm khói tỏa, kính cẩn gia tiên",
      num: "04",
      icon: <Flower2 className="w-5 h-5 text-[#9e3b2e]" />,
    },
    {
      id: "trian",
      tag: "TÂM TỪ ÁI • Khoảng lặng thường nhật",
      title: "Góc tri ân & Tĩnh thức",
      content:
        "Khoảng lặng nuôi dưỡng lòng biết ơn, thực hành vi mô 3 phút an yên mỗi sớm mai. Trân quý từng mối duyên lành, cội nguồn ông bà tổ tiên và vạn vật xung quanh.",
      quote: "Uống nước nhớ nguồn • 3 phút an trú thân tâm",
      num: "05",
      icon: <Heart className="w-5 h-5 text-[#9e3b2e]" />,
    },
  ];

  return (
    <div className="w-full min-h-screen bg-[#fcf8f2] text-[#2e2624] font-['Be_Vietnam_Pro',sans-serif]">
      <main className="max-w-6xl mx-auto px-4 sm:px-6 pt-10 pb-20">
        {/* Top Header Badge */}
        <div className="text-center mb-4">
          <Badge
            variant="terracotta"
            className="gap-2 px-3.5 py-1 text-xs font-semibold tracking-wider uppercase bg-[#faece1] text-[#9e3b2e] border-[#eedcd0]"
          >
            <span className="w-2 h-2 rounded-full bg-[#9e3b2e]"></span>
            <span>Bước khởi tâm • Cá nhân hóa trải nghiệm</span>
          </Badge>
        </div>

        {/* Big Serif Heading */}
        <div className="text-center max-w-3xl mx-auto mb-8">
          <h1 className="text-3xl sm:text-4xl lg:text-[42px] font-['Noto_Serif',serif] font-bold text-[#9e3b2e] leading-tight mb-4">
            Gieo hạt sở thích, mở lối chiêm nghiệm
          </h1>
          <p className="text-sm sm:text-base text-[#6f5e57] leading-relaxed max-w-2xl mx-auto">
            Hãy chọn những chủ đề dân gian gần gũi với tâm hồn bạn để Tin Lắm Tâm Linh
            gợi mở tín hiệu an lành phù hợp nhất mỗi ngày. Có thể thay đổi bất cứ lúc nào.
          </p>
        </div>

        {/* Selection Status indicator & Preview Notice */}
        <div className="flex flex-col items-center gap-2 mb-8">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#fbf3ec] border border-[#ecd9cb] text-sm text-[#78645d]">
            <span>Trạng thái:</span>
            <strong className="text-[#9e3b2e]">
              Đã chọn {selectedIds.length} / {TOPICS.length} chủ đề
            </strong>
            <span className="text-[#c7b4a7]">•</span>
            <span className="italic">Bạn có thể chọn bao nhiêu tùy ý</span>
          </span>

          <span className="text-xs text-[#95837b] italic">
            ✦ Lựa chọn sẽ được lưu vào hệ thống để gợi mở tín hiệu phù hợp tại màn Hôm nay
          </span>
        </div>

        {/* Featured Interactive Experiences */}
        {(onGoToXinXam || onGoToWish) && (
          <div className="mb-14">
            <div className="flex items-center gap-2 mb-4">
              <span className="w-1.5 h-4 rounded-full bg-[#9e3b2e]"></span>
              <h2 className="font-['Noto_Serif',serif] font-bold text-xl sm:text-2xl text-[#2a2220]">
                Không gian trải nghiệm tương tác
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Card 1: Xin xăm */}
              {onGoToXinXam && (
                <div
                  onClick={onGoToXinXam}
                  className="group p-6 rounded-3xl bg-white border border-[#eedcd0] hover:border-[#9e3b2e]/60 shadow-xs hover:shadow-md transition-all cursor-pointer relative overflow-hidden flex flex-col justify-between"
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-[#faece1]/50 rounded-full blur-2xl -mr-10 -mt-10 group-hover:bg-[#faece1] transition-all"></div>
                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 rounded-2xl bg-[#faede2] border border-[#ecd9cb] flex items-center justify-center text-[#9e3b2e]">
                        <Sparkles className="w-6 h-6" />
                      </div>
                      <Badge variant="outline" className="text-xs text-[#9e3b2e] border-[#eedcd0] bg-[#fffaf5]">
                        Nghi thức 3 miền
                      </Badge>
                    </div>

                    <h3 className="font-['Noto_Serif',serif] font-bold text-xl text-[#2a2220] group-hover:text-[#9e3b2e] transition-colors mb-2">
                      Xin xăm văn hóa ba miền
                    </h3>
                    <p className="text-sm text-[#6e5d56] leading-relaxed mb-4">
                      Khởi tâm nguyện, lắng nghe nhịp điệu ống xăm và đón nhận quẻ thơ cổ cùng vi hành động an lành cho thân tâm.
                    </p>
                  </div>

                  <div className="relative z-10 pt-4 border-t border-[#f4e8dc] flex items-center justify-between text-sm font-semibold text-[#9e3b2e]">
                    <span>Bắt đầu trải nghiệm</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              )}

              {/* Card 2: Gửi gắm điều ước */}
              {onGoToWish && (
                <div
                  onClick={onGoToWish}
                  className="group p-6 rounded-3xl bg-white border border-[#eedcd0] hover:border-[#9e3b2e]/60 shadow-xs hover:shadow-md transition-all cursor-pointer relative overflow-hidden flex flex-col justify-between"
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-[#faece1]/50 rounded-full blur-2xl -mr-10 -mt-10 group-hover:bg-[#faece1] transition-all"></div>
                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 rounded-2xl bg-[#faede2] border border-[#ecd9cb] flex items-center justify-center text-[#9e3b2e]">
                        <BookOpen className="w-6 h-6" />
                      </div>
                      <Badge variant="outline" className="text-xs text-[#9e3b2e] border-[#eedcd0] bg-[#fffaf5]">
                        Khoảng lặng tự nhìn lại
                      </Badge>
                    </div>

                    <h3 className="font-['Noto_Serif',serif] font-bold text-xl text-[#2a2220] group-hover:text-[#9e3b2e] transition-colors mb-2">
                      Gửi gắm điều ước & Hoa đăng
                    </h3>
                    <p className="text-sm text-[#6e5d56] leading-relaxed mb-4">
                      Viết ra những nỗi niềm chất chứa; lựa chọn lưu riêng tư vào sổ nhật ký hoặc gửi đi dưới dạng cánh hoa đăng số tan biến.
                    </p>
                  </div>

                  <div className="relative z-10 pt-4 border-t border-[#f4e8dc] flex items-center justify-between text-sm font-semibold text-[#9e3b2e]">
                    <span>Gửi gắm khoảng lòng</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              )}

              {/* Card 3: Không gian tĩnh tâm */}
              {onGoToZen && (
                <div
                  onClick={onGoToZen}
                  className="group p-6 rounded-3xl bg-white border border-[#eedcd0] hover:border-[#9e3b2e]/60 shadow-xs hover:shadow-md transition-all cursor-pointer relative overflow-hidden flex flex-col justify-between"
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-[#faece1]/50 rounded-full blur-2xl -mr-10 -mt-10 group-hover:bg-[#faece1] transition-all"></div>
                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 rounded-2xl bg-[#faede2] border border-[#ecd9cb] flex items-center justify-center text-[#9e3b2e]">
                        <Flower2 className="w-6 h-6" />
                      </div>
                      <Badge variant="outline" className="text-xs text-[#9e3b2e] border-[#eedcd0] bg-[#fffaf5]">
                        Nếp sống chậm
                      </Badge>
                    </div>

                    <h3 className="font-['Noto_Serif',serif] font-bold text-xl text-[#2a2220] group-hover:text-[#9e3b2e] transition-colors mb-2">
                      Không gian tĩnh tâm
                    </h3>
                    <p className="text-sm text-[#6e5d56] leading-relaxed mb-4">
                      Khoảng lặng 3 phút an trú thân tâm bên hiên nhà Việt mộc mạc; chú tâm vào hơi thở tự nhiên và buông xả âu lo thường nhật.
                    </p>
                  </div>

                  <div className="relative z-10 pt-4 border-t border-[#f4e8dc] flex items-center justify-between text-sm font-semibold text-[#9e3b2e]">
                    <span>Bắt đầu tĩnh tâm</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Section title for topics */}
        <div className="flex items-center gap-2 mb-4">
          <span className="w-1.5 h-4 rounded-full bg-[#9e3b2e]"></span>
          <h2 className="font-['Noto_Serif',serif] font-bold text-xl sm:text-2xl text-[#2a2220]">
            Chọn chủ đề yêu thích
          </h2>
        </div>

        {/* 5 Topic Cards Grid (3 top, 2 bottom) */}
        <div className="space-y-6 mb-10">
          {/* Top Row: 3 Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TOPICS.slice(0, 3).map((item) => {
              const isSelected = selectedIds.includes(item.id);
              return (
                <Card
                  key={item.id}
                  onClick={() => toggleTopic(item.id)}
                  className={`p-6 rounded-3xl cursor-pointer transition-all duration-300 relative flex flex-col justify-between hover:shadow-md ${
                    isSelected
                      ? "bg-white border-[#9e3b2e] shadow-sm ring-1 ring-[#9e3b2e]/30"
                      : "bg-[#fffdfa] border-[#ecdcd0] hover:border-[#dfc3af]"
                  }`}
                >
                  <div>
                    {/* Header: Icon & Checkmark Button */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-10 h-10 rounded-2xl bg-[#faede2] flex items-center justify-center">
                        {item.icon}
                      </div>

                      <div
                        className={`w-7 h-7 rounded-full flex items-center justify-center transition-all ${
                          isSelected
                            ? "bg-[#9e3b2e] text-white shadow-2xs"
                            : "border-2 border-[#eddcd0] bg-white text-transparent"
                        }`}
                      >
                        <Check className="w-4 h-4 stroke-[2.5]" />
                      </div>
                    </div>

                    {/* Tag */}
                    <div className="text-xs uppercase font-bold tracking-wider text-[#9e3b2e] mb-2 leading-snug">
                      {item.tag}
                    </div>

                    {/* Title */}
                    <h3 className="font-['Noto_Serif',serif] font-bold text-xl text-[#2a2220] mb-2.5">
                      {item.title}
                    </h3>

                    {/* Description */}
                    <p className="text-sm text-[#6e5d56] leading-relaxed">
                      {item.content}
                    </p>
                  </div>

                  {/* Card Footer Quote & Number */}
                  <div className="mt-6 pt-4 border-t border-[#f4e8dc] flex items-center justify-between text-xs text-[#8c7a72]">
                    <span className="font-serif italic truncate max-w-[200px]">
                      {item.quote}
                    </span>
                    <span className="font-mono font-semibold text-[#a39188]">
                      {item.num}
                    </span>
                  </div>
                </Card>
              );
            })}
          </div>

          {/* Bottom Row: 2 Cards Centered */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {TOPICS.slice(3, 5).map((item) => {
              const isSelected = selectedIds.includes(item.id);
              return (
                <Card
                  key={item.id}
                  onClick={() => toggleTopic(item.id)}
                  className={`p-6 rounded-3xl cursor-pointer transition-all duration-300 relative flex flex-col justify-between hover:shadow-md ${
                    isSelected
                      ? "bg-white border-[#9e3b2e] shadow-sm ring-1 ring-[#9e3b2e]/30"
                      : "bg-[#fffdfa] border-[#ecdcd0] hover:border-[#dfc3af]"
                  }`}
                >
                  <div>
                    {/* Header: Icon & Checkmark Button */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-10 h-10 rounded-2xl bg-[#faede2] flex items-center justify-center">
                        {item.icon}
                      </div>

                      <div
                        className={`w-7 h-7 rounded-full flex items-center justify-center transition-all ${
                          isSelected
                            ? "bg-[#9e3b2e] text-white shadow-2xs"
                            : "border-2 border-[#eddcd0] bg-white text-transparent"
                        }`}
                      >
                        <Check className="w-4 h-4 stroke-[2.5]" />
                      </div>
                    </div>

                    {/* Tag */}
                    <div className="text-xs uppercase font-bold tracking-wider text-[#9e3b2e] mb-2 leading-snug">
                      {item.tag}
                    </div>

                    {/* Title */}
                    <h3 className="font-['Noto_Serif',serif] font-bold text-xl text-[#2a2220] mb-2.5">
                      {item.title}
                    </h3>

                    {/* Description */}
                    <p className="text-sm text-[#6e5d56] leading-relaxed">
                      {item.content}
                    </p>
                  </div>

                  {/* Card Footer Quote & Number */}
                  <div className="mt-6 pt-4 border-t border-[#f4e8dc] flex items-center justify-between text-xs text-[#8c7a72]">
                    <span className="font-serif italic truncate max-w-[240px]">
                      {item.quote}
                    </span>
                    <span className="font-mono font-semibold text-[#a39188]">
                      {item.num}
                    </span>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Personalization Info Callout Banner */}
        <Card className="p-4 sm:p-5 rounded-2xl bg-[#fbece1]/80 border border-[#ecd5c4] flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10 shadow-2xs">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-xl overflow-hidden flex-shrink-0 border border-[#e4ccbb]">
              <img
                src="/images/tea_bowl.jpg"
                alt="Nhịp điệu tĩnh lặng"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-[#9e3b2e] flex items-center gap-1.5 mb-0.5">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Cá nhân hóa nhịp điệu tĩnh lặng</span>
              </div>
              <p className="text-xs sm:text-sm text-[#73615a] leading-relaxed">
                Hệ thống sẽ chắt lọc bài viết, quẻ chiêm nghiệm và nếp sống xưa dựa trên
                các chủ đề bạn đã chọn để đồng hành mỗi sớm mai.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 self-end sm:self-auto px-3 py-1 rounded-full bg-white/90 border border-[#edd6c7] text-xs font-medium text-[#883227] flex-shrink-0 shadow-2xs">
            <Flower2 className="w-3.5 h-3.5 text-[#9e3b2e]" />
            <span>Tĩnh giản & như hòa</span>
          </div>
        </Card>

        {/* Action Buttons Row */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <Button
            variant="default"
            size="lg"
            onClick={() => onComplete(selectedIds)}
            className="w-full sm:w-auto px-8 py-3.5 text-sm sm:text-base font-semibold gap-2 shadow-sm"
          >
            <span>Hoàn tất & Bước vào Hôm nay</span>
            <ArrowRight className="w-4 h-4" />
          </Button>

          <Button
            variant="ghost"
            size="lg"
            onClick={onSkip || (() => onComplete(selectedIds))}
            className="text-xs sm:text-sm text-[#7a6a63] hover:text-[#9e3b2e]"
          >
            <span>Bỏ qua, tôi muốn khám phá tự nhiên</span>
            <ArrowRight className="w-3.5 h-3.5 ml-1" />
          </Button>
        </div>

        {/* Classical Bottom Quote */}
        <div className="text-center pt-8 border-t border-[#eddcd0] mb-8">
          <p className="font-['Noto_Serif',serif] italic font-semibold text-lg sm:text-xl text-[#9e3b2e] mb-1.5">
            “Tâm bình thế giới bình, lòng an vạn sự tỏ.”
          </p>
          <div className="text-xs uppercase tracking-widest text-[#938279] font-medium">
            Lời gửi gắm từ cội nguồn dân gian
          </div>
        </div>

        {/* Footer info links & copyright */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#95837b] pt-4">
          <div className="flex items-center gap-4">
            <span className="hover:text-[#9e3b2e] cursor-pointer">
              Văn hóa & Bản sắc
            </span>
            <span>•</span>
            <span className="hover:text-[#9e3b2e] cursor-pointer">Về dự án</span>
            <span>•</span>
            <span className="hover:text-[#9e3b2e] cursor-pointer">
              Quyền riêng tư
            </span>
          </div>
          <div>
            © 2025 Tin Lắm Tâm Linh. Tiếp nối tinh hoa mỹ học Dó & Gốm Việt đương đại.
          </div>
        </div>
      </main>
    </div>
  );
};
