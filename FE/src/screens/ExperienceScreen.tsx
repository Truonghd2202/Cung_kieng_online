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
  Compass,
  Scroll,
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
  onGoToGratitude?: () => void;
  onGoToXinKeo?: () => void;
  onGoToHoroscope?: () => void;
  onGoToAstrology?: () => void;
  onGoToSanctuary?: () => void;
}

export const ExperienceScreen: React.FC<ExperienceScreenProps> = ({
  initialTopics = ["cadao", "xinxam", "bamien"],
  onComplete,
  onSkip,
  onGoToXinXam,
  onGoToWish,
  onGoToZen,
  onGoToGratitude,
  onGoToXinKeo,
  onGoToHoroscope,
  onGoToAstrology,
  onGoToSanctuary,
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
      icon: <BookOpen className="w-5 h-5 text-accent" />,
    },
    {
      id: "xinxam",
      tag: "NGHI THỨC DÂN GIAN • Thẻ lời ý nghĩa",
      title: "Xin xăm & Gieo quẻ",
      content:
        "Thẻ lời ý nghĩa, soi tỏ băn khoăn, tìm nhịp lắng đọng thường nhật và lắng nghe thông điệp như hòa tiền nhân.",
      quote: "Lắng nghe điềm lành, tâm an sự tỏ",
      num: "02",
      icon: <Sparkles className="w-5 h-5 text-accent" />,
    },
    {
      id: "bamien",
      tag: "ĐỊA LINH NHÂN KIỆT • Bắc - Trung - Nam",
      title: "Văn hóa Ba Miền",
      content:
        "Phong vị Bắc - Trung - Nam, nếp nhà, hồn quê và cảnh sắc địa linh; hội tụ mỹ tục ngàn năm rạng rỡ đất Việt.",
      quote: "Kinh Kỳ • Cố Đô • Phù Sa Phương Nam",
      num: "03",
      icon: <Landmark className="w-5 h-5 text-accent" />,
    },
    {
      id: "nghile",
      tag: "NẾP NHÀ TRUYỀN THỐNG • Rằm mùng một",
      title: "Cẩm nang nghi lễ",
      content:
        "Tập tục truyền thống, nén hương, chén trà, giữ trọn nếp sống thuần phong mỹ tục và tấm lòng hướng thiện thuận tự nhiên.",
      quote: "Hương trầm khói tỏa, kính cẩn gia tiên",
      num: "04",
      icon: <Flower2 className="w-5 h-5 text-accent" />,
    },
    {
      id: "trian",
      tag: "TÂM TỪ ÁI • Khoảng lặng thường nhật",
      title: "Góc tri ân & Tĩnh thức",
      content:
        "Khoảng lặng nuôi dưỡng lòng biết ơn, thực hành vi mô 3 phút an yên mỗi sớm mai. Trân quý từng mối duyên lành, cội nguồn ông bà tổ tiên và vạn vật xung quanh.",
      quote: "Uống nước nhớ nguồn • 3 phút an trú thân tâm",
      num: "05",
      icon: <Heart className="w-5 h-5 text-accent" />,
    },
  ];

  return (
    <div className="screen-shell">
      <main className="page-container max-w-6xl">
        {/* Top Header Badge */}
        <div className="text-center mb-4">
          <Badge
            variant="terracotta"
            className="gap-2 px-3.5 py-1 text-xs font-semibold tracking-wider uppercase bg-surface text-accent border-line"
          >
            <span className="w-2 h-2 rounded-full bg-action"></span>
            <span>Bước khởi tâm • Cá nhân hóa trải nghiệm</span>
          </Badge>
        </div>

        {/* Big Serif Heading */}
        <div className="text-center max-w-3xl mx-auto mb-8">
          <h1 className="page-title mb-4">
            Gieo hạt sở thích, mở lối chiêm nghiệm
          </h1>
          <p className="text-sm sm:text-base text-ink leading-relaxed max-w-2xl mx-auto">
            Hãy chọn những chủ đề dân gian gần gũi với tâm hồn bạn để Tin Lắm Tâm Linh
            gợi mở tín hiệu an lành phù hợp nhất mỗi ngày. Có thể thay đổi bất cứ lúc nào.
          </p>
        </div>

        {/* Selection Status indicator & Preview Notice */}
        <div className="flex flex-col items-center gap-2 mb-8">
          <span className="inline-flex flex-wrap justify-center items-center gap-2 py-3 text-sm text-muted">
            <span>Trạng thái:</span>
            <strong className="text-accent">
              Đã chọn {selectedIds.length} / {TOPICS.length} chủ đề
            </strong>
            <span className="text-subtle">•</span>
            <span className="italic">Bạn có thể chọn bao nhiêu tùy ý</span>
          </span>

          <span className="text-xs text-muted italic">
            ✦ Lựa chọn sẽ được lưu vào hệ thống để gợi mở tín hiệu phù hợp tại màn Hôm nay
          </span>
        </div>

        {/* Featured Interactive Experiences */}
        {(onGoToXinXam || onGoToWish) && (
          <div className="mb-14">
            <div className="flex items-center gap-2 mb-4">
              <span className="w-1.5 h-4 rounded-full bg-action"></span>
              <h2 className="section-title text-xl sm:text-2xl">
                Không gian trải nghiệm tương tác
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-3">
              {/* Card 1: Xin xăm */}
              {onGoToXinXam && (
                <Card
                  role="link"
                  onClick={onGoToXinXam}
                  className="group p-6 border-0 border-t border-line hover:bg-surface-soft text-left transition-colors cursor-pointer relative flex flex-col justify-between"
                >
                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 rounded-panel bg-surface border border-line flex items-center justify-center text-accent">
                        <Sparkles className="w-6 h-6" />
                      </div>
                      <Badge variant="outline" className="text-xs text-accent border-line bg-surface">
                        Nghi thức 3 miền
                      </Badge>
                    </div>

                    <h3 className="font-display font-bold text-xl text-ink group-hover:text-accent transition-colors mb-2">
                      Xin xăm văn hóa ba miền
                    </h3>
                    <p className="text-sm text-ink leading-relaxed mb-4">
                      Khởi tâm nguyện, lắng nghe nhịp điệu ống xăm và đón nhận quẻ thơ cổ cùng vi hành động an lành cho thân tâm.
                    </p>
                  </div>

                  <div className="relative z-10 pt-4 border-t border-line flex items-center justify-between text-sm font-semibold text-accent">
                    <span>Bắt đầu trải nghiệm</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Card>
              )}

              {/* Card 2: Xin keo âm dương (Mới) */}
              {onGoToXinKeo && (
                <Card
                  role="link"
                  onClick={onGoToXinKeo}
                  className="group p-6 border-0 border-t border-line hover:bg-surface-soft text-left transition-colors cursor-pointer relative flex flex-col justify-between"
                >
                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 rounded-panel bg-surface border border-line flex items-center justify-center text-accent">
                        <Compass className="w-6 h-6" />
                      </div>
                      <Badge variant="outline" className="text-xs text-accent border-line bg-surface">
                        Chiêm nghiệm dân gian
                      </Badge>
                    </div>

                    <h3 className="font-display font-bold text-xl text-ink group-hover:text-accent transition-colors mb-2">
                      Xin keo âm dương
                    </h3>
                    <p className="text-sm text-ink leading-relaxed mb-4">
                      Tục gieo keo truyền thống: phương tiện tĩnh tại để soi tỏ mối phân vân, tìm sự an định trước khi khởi sự việc lớn.
                    </p>
                  </div>

                  <div className="relative z-10 pt-4 border-t border-line flex items-center justify-between text-sm font-semibold text-accent">
                    <span>Gieo keo định tâm</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Card>
              )}

              {/* Card 3: Hub tử vi */}
              {onGoToAstrology && (
                <Card
                  role="link"
                  onClick={onGoToAstrology}
                  className="group p-6 border-0 border-t border-line hover:bg-surface-soft text-left transition-colors cursor-pointer relative flex flex-col justify-between"
                >
                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 rounded-panel bg-surface border border-line flex items-center justify-center text-accent">
                        <Sparkles className="w-6 h-6" />
                      </div>
                      <Badge variant="outline" className="text-xs text-accent border-line bg-surface">Tự soi chiếu</Badge>
                    </div>
                    <h3 className="font-display font-bold text-xl text-ink group-hover:text-accent transition-colors mb-2">Tử vi & Lá số</h3>
                    <p className="text-sm text-ink leading-relaxed mb-4">Mở một không gian tìm hiểu biểu tượng thời gian, ngũ hành và câu hỏi dành cho chính mình.</p>
                  </div>
                  <div className="relative z-10 pt-4 border-t border-line flex items-center justify-between text-sm font-semibold text-accent"><span>Khám phá tử vi</span><ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" /></div>
                </Card>
              )}

              {/* Card 4: Lá số chiêm nghiệm (Mới) */}
              {onGoToHoroscope && (
                <Card
                  role="link"
                  onClick={onGoToHoroscope}
                  className="group p-6 border-0 border-t border-line hover:bg-surface-soft text-left transition-colors cursor-pointer relative flex flex-col justify-between"
                >
                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 rounded-panel bg-surface border border-line flex items-center justify-center text-accent">
                        <Scroll className="w-6 h-6" />
                      </div>
                      <Badge variant="outline" className="text-xs text-accent border-line bg-surface">
                        Đối thoại nội tâm
                      </Badge>
                    </div>

                    <h3 className="font-display font-bold text-xl text-ink group-hover:text-accent transition-colors mb-2">
                      Lá số chiêm nghiệm
                    </h3>
                    <p className="text-sm text-ink leading-relaxed mb-4">
                      Khám phá cách người xưa nhìn thời gian và con người qua lăng kính biểu tượng tự nhiên, ngũ hành tương sinh.
                    </p>
                  </div>

                  <div className="relative z-10 pt-4 border-t border-line flex items-center justify-between text-sm font-semibold text-accent">
                    <span>Khám phá lá số</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Card>
              )}

              {/* Card 4: Gửi gắm điều ước */}
              {onGoToSanctuary && (
                <Card
                  role="link"
                  onClick={onGoToSanctuary}
                  className="group p-6 border-0 border-t border-line hover:bg-surface-soft text-left transition-colors cursor-pointer relative flex flex-col justify-between"
                >
                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 rounded-panel bg-surface border border-line flex items-center justify-center text-accent">
                        <Landmark className="w-6 h-6" />
                      </div>
                      <Badge variant="outline" className="text-xs text-accent border-line bg-surface">Không gian riêng</Badge>
                    </div>
                    <h3 className="font-display font-bold text-xl text-ink group-hover:text-accent transition-colors mb-2">Không gian của tôi</h3>
                    <p className="text-sm text-ink leading-relaxed mb-4">Ghé bàn thờ gia tiên, góc tưởng niệm và một khoảng an yên dành riêng cho bạn.</p>
                  </div>
                  <div className="relative z-10 pt-4 border-t border-line flex items-center justify-between text-sm font-semibold text-accent"><span>Ghé không gian riêng</span><ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" /></div>
                </Card>
              )}

              {onGoToWish && (
                <Card
                  role="link"
                  onClick={onGoToWish}
                  className="group p-6 border-0 border-t border-line hover:bg-surface-soft text-left transition-colors cursor-pointer relative flex flex-col justify-between"
                >
                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 rounded-panel bg-surface border border-line flex items-center justify-center text-accent">
                        <BookOpen className="w-6 h-6" />
                      </div>
                      <Badge variant="outline" className="text-xs text-accent border-line bg-surface">
                        Khoảng lặng tự nhìn lại
                      </Badge>
                    </div>

                    <h3 className="font-display font-bold text-xl text-ink group-hover:text-accent transition-colors mb-2">
                      Gửi gắm điều ước & Hoa đăng
                    </h3>
                    <p className="text-sm text-ink leading-relaxed mb-4">
                      Viết ra những nỗi niềm chất chứa; lựa chọn lưu riêng tư vào sổ nhật ký hoặc gửi đi dưới dạng cánh hoa đăng số tan biến.
                    </p>
                  </div>

                  <div className="relative z-10 pt-4 border-t border-line flex items-center justify-between text-sm font-semibold text-accent">
                    <span>Gửi gắm khoảng lòng</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Card>
              )}

              {/* Card 5: Không gian tĩnh tâm */}
              {onGoToZen && (
                <Card
                  role="link"
                  onClick={onGoToZen}
                  className="group p-6 border-0 border-t border-line hover:bg-surface-soft text-left transition-colors cursor-pointer relative flex flex-col justify-between"
                >
                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 rounded-panel bg-surface border border-line flex items-center justify-center text-accent">
                        <Flower2 className="w-6 h-6" />
                      </div>
                      <Badge variant="outline" className="text-xs text-accent border-line bg-surface">
                        Nếp sống chậm
                      </Badge>
                    </div>

                    <h3 className="font-display font-bold text-xl text-ink group-hover:text-accent transition-colors mb-2">
                      Không gian tĩnh tâm
                    </h3>
                    <p className="text-sm text-ink leading-relaxed mb-4">
                      Khoảng lặng 3 phút an trú thân tâm bên hiên nhà Việt mộc mạc; chú tâm vào hơi thở tự nhiên và buông xả âu lo thường nhật.
                    </p>
                  </div>

                  <div className="relative z-10 pt-4 border-t border-line flex items-center justify-between text-sm font-semibold text-accent">
                    <span>Bắt đầu tĩnh tâm</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Card>
              )}

              {/* Card 6: Một nén hương lòng / Góc tri ân */}
              {onGoToGratitude && (
                <Card
                  role="link"
                  onClick={onGoToGratitude}
                  className="group p-6 border-0 border-t border-line hover:bg-surface-soft text-left transition-colors cursor-pointer relative flex flex-col justify-between"
                >
                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 rounded-panel bg-surface border border-line flex items-center justify-center text-accent">
                        <Heart className="w-6 h-6" />
                      </div>
                      <Badge variant="outline" className="text-xs text-accent border-line bg-surface">
                        Lòng biết ơn
                      </Badge>
                    </div>

                    <h3 className="font-display font-bold text-xl text-ink group-hover:text-accent transition-colors mb-2">
                      Một nén hương lòng
                    </h3>
                    <p className="text-sm text-ink leading-relaxed mb-4">
                      Thắp ngọn đèn an hòa, gửi lời tri ân cha mẹ, tiền nhân và trao gửi tấm lòng chân thành vào cõi bình yên.
                    </p>
                  </div>

                  <div className="relative z-10 pt-4 border-t border-line flex items-center justify-between text-sm font-semibold text-accent">
                    <span>Gửi lời tri ân</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Card>
              )}
            </div>
          </div>
        )}

        {/* Section title for topics */}
        <div className="flex items-center gap-2 mb-4">
          <span className="w-1.5 h-4 rounded-full bg-action"></span>
          <h2 className="section-title text-xl sm:text-2xl">
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
                  role="checkbox"
                  tabIndex={0}
                  aria-checked={isSelected}
                  onKeyDown={(event) => { if (event.key === " " || event.key === "Enter") { event.preventDefault(); toggleTopic(item.id); } }}
                  onClick={() => toggleTopic(item.id)}
                  className={`p-6 rounded-card cursor-pointer transition-all duration-300 relative flex flex-col justify-between hover:shadow-card ${
                    isSelected
                      ? "bg-surface border-accent shadow-sm ring-1 ring-accent/30"
                      : "bg-surface border-line hover:border-line"
                  }`}
                >
                  <div>
                    {/* Header: Icon & Checkmark Button */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-10 h-10 rounded-panel bg-surface flex items-center justify-center">
                        {item.icon}
                      </div>

                      <div
                        className={`w-7 h-7 rounded-full flex items-center justify-center transition-all ${
                          isSelected
                            ? "bg-action text-white shadow-2xs"
                            : "border-2 border-line bg-surface text-transparent"
                        }`}
                      >
                        <Check className="w-4 h-4 stroke-[2.5]" />
                      </div>
                    </div>

                    {/* Tag */}
                    <div className="text-xs uppercase font-bold tracking-wider text-accent mb-2 leading-snug">
                      {item.tag}
                    </div>

                    {/* Title */}
                    <h3 className="font-display font-bold text-xl text-ink mb-2.5">
                      {item.title}
                    </h3>

                    {/* Description */}
                    <p className="text-sm text-ink leading-relaxed">
                      {item.content}
                    </p>
                  </div>

                  {/* Card Footer Quote & Number */}
                  <div className="mt-6 pt-4 border-t border-line flex items-center justify-between text-xs text-muted">
                    <span className="font-serif italic truncate max-w-[200px]">
                      {item.quote}
                    </span>
                    <span className="font-sans tabular-nums font-semibold text-muted">
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
                  role="checkbox"
                  tabIndex={0}
                  aria-checked={isSelected}
                  onKeyDown={(event) => { if (event.key === " " || event.key === "Enter") { event.preventDefault(); toggleTopic(item.id); } }}
                  onClick={() => toggleTopic(item.id)}
                  className={`p-6 rounded-card cursor-pointer transition-all duration-300 relative flex flex-col justify-between hover:shadow-card ${
                    isSelected
                      ? "bg-surface border-accent shadow-sm ring-1 ring-accent/30"
                      : "bg-surface border-line hover:border-line"
                  }`}
                >
                  <div>
                    {/* Header: Icon & Checkmark Button */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-10 h-10 rounded-panel bg-surface flex items-center justify-center">
                        {item.icon}
                      </div>

                      <div
                        className={`w-7 h-7 rounded-full flex items-center justify-center transition-all ${
                          isSelected
                            ? "bg-action text-white shadow-2xs"
                            : "border-2 border-line bg-surface text-transparent"
                        }`}
                      >
                        <Check className="w-4 h-4 stroke-[2.5]" />
                      </div>
                    </div>

                    {/* Tag */}
                    <div className="text-xs uppercase font-bold tracking-wider text-accent mb-2 leading-snug">
                      {item.tag}
                    </div>

                    {/* Title */}
                    <h3 className="font-display font-bold text-xl text-ink mb-2.5">
                      {item.title}
                    </h3>

                    {/* Description */}
                    <p className="text-sm text-ink leading-relaxed">
                      {item.content}
                    </p>
                  </div>

                  {/* Card Footer Quote & Number */}
                  <div className="mt-6 pt-4 border-t border-line flex items-center justify-between text-xs text-muted">
                    <span className="font-serif italic truncate max-w-[240px]">
                      {item.quote}
                    </span>
                    <span className="font-sans tabular-nums font-semibold text-muted">
                      {item.num}
                    </span>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Personalization Info Callout Banner */}
        <Card className="p-4 sm:p-5 rounded-panel bg-surface/80 border border-line flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10 shadow-2xs">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-xl overflow-hidden flex-shrink-0 border border-line">
              <img
                src="/images/relic_book.jpg"
                alt="Nhịp điệu tĩnh lặng"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-accent flex items-center gap-1.5 mb-0.5">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Cá nhân hóa nhịp điệu tĩnh lặng</span>
              </div>
              <p className="text-sm text-muted leading-relaxed">
                Hệ thống sẽ chắt lọc bài viết, quẻ chiêm nghiệm và nếp sống xưa dựa trên
                các chủ đề bạn đã chọn để đồng hành mỗi sớm mai.
              </p>
              <div className="mt-2 text-xs uppercase tracking-widest text-muted font-medium">
                Lời gửi gắm từ cội nguồn dân gian
              </div>
            </div>
          </div>

          <div className="flex items-center gap-1.5 self-end sm:self-auto px-3 py-1 rounded-full bg-surface/95 border border-line text-xs font-medium text-accent flex-shrink-0 shadow-2xs">
            <Flower2 className="w-3.5 h-3.5 text-accent" />
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
            className="text-xs sm:text-sm text-muted hover:text-accent"
          >
            <span>Bỏ qua, tôi muốn khám phá tự nhiên</span>
            <ArrowRight className="w-3.5 h-3.5 ml-1" />
          </Button>
        </div>

        {/* Footer info links & copyright */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted pt-4">
          <div className="flex items-center gap-4">
            <span className="hover:text-accent cursor-pointer">
              Văn hóa & Bản sắc
            </span>
            <span>•</span>
            <span className="hover:text-accent cursor-pointer">Về dự án</span>
            <span>•</span>
            <span className="hover:text-accent cursor-pointer">
              Quyền riêng tư
            </span>
          </div>
          <div>
            © {new Date().getFullYear()} Tin Lắm Tâm Linh. Tiếp nối tinh hoa mỹ học Dó & Gốm Việt đương đại.
          </div>
        </div>
      </main>
    </div>
  );
};
