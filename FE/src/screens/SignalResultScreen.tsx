import React, { useState } from "react";
import {
  Calendar,
  Check,
  Heart,
  RotateCw,
  Bookmark,
  Share2,
  BookOpen,
  Flower2,
  CheckCircle2,
  Sparkles,
  Coffee,
  Lightbulb,
} from "lucide-react";
import { MoodKey, SignalData } from "../data/demoSignals";
import { Button } from "@/src/components/ui/button";
import { Badge } from "@/src/components/ui/badge";
import { Card } from "@/src/components/ui/card";

interface SignalResultScreenProps {
  mood?: MoodKey;
  signal: SignalData;
  isActionDone: boolean;
  onToggleAction: (completed: boolean) => void;
  onGoToCompletion?: () => void;
  isSaved?: boolean;
  onSaveToAccount: () => void;
  onRefreshSignal: () => void;
  onGoToDiary: () => void;
}

export const SignalResultScreen: React.FC<SignalResultScreenProps> = ({
  signal,
  isActionDone,
  onToggleAction,
  onGoToCompletion,
  isSaved = false,
  onSaveToAccount,
  onRefreshSignal,
  onGoToDiary,
}) => {
  const [liked, setLiked] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleSave = () => {
    onSaveToAccount();
  };

  return (
    <div className="w-full min-h-screen bg-[#fcf8f2] text-[#2e2624] font-['Be_Vietnam_Pro',sans-serif]">
      <main className="max-w-6xl mx-auto px-4 sm:px-6 pt-8 pb-16">
        {/* Top Banner Row */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-6 border-b border-[#eddcd0] mb-8 text-xs">
          <div className="flex items-center gap-2 text-[#7f6f68] flex-wrap">
            <span className="w-2 h-2 rounded-full bg-[#9e3b2e]"></span>
            <span className="font-bold text-[#9e3b2e] uppercase tracking-wide">
              {signal.badge}
            </span>
            <span>•</span>
            <span>
              Tín hiệu ngày lành tương ứng với tâm trạng{" "}
              <strong className="text-[#9e3b2e]">[{signal.mood}]</strong>
            </span>
          </div>

          <div className="flex items-center gap-2 text-[#806f67]">
            <Calendar className="w-3.5 h-3.5 text-[#9e3b2e]" />
            <span>
              Hôm nay: <strong>Ngày Hoàng Đạo</strong> • Tiết khí thanh tịnh
            </span>
          </div>
        </div>

        {/* 2 Columns Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-12">
          {/* Left Column (Vùng 1, Vùng 2, Vùng 3) */}
          <div className="lg:col-span-7 space-y-6">
            {/* Card 1: Vùng 1 & Vùng 2 */}
            <Card className="p-6 sm:p-8 rounded-3xl shadow-xs">
              {/* Header */}
              <div className="flex items-center justify-between text-xs text-[#9e3b2e] font-semibold uppercase tracking-wider mb-6">
                <span>— Vùng 1 • Cội nguồn văn hóa dân gian</span>
                <Flower2 className="w-4 h-4 text-[#be8e5a]" />
              </div>

              {/* Classic Poem */}
              <div className="relative pl-6 mb-6">
                <span className="absolute -left-2 -top-6 text-5xl font-['Noto_Serif',serif] text-[#e8c8b4] select-none">
                  “
                </span>
                <blockquote className="font-['Noto_Serif',serif] font-bold text-2xl sm:text-3xl text-[#9e3b2e] leading-snug">
                  {signal.poem.line1}
                  <br />
                  {signal.poem.line2}
                </blockquote>
              </div>

              <div className="flex items-center gap-1.5 text-xs text-[#8c7a72] mb-6">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#9e3b2e]" />
                <span>{signal.poem.subtext}</span>
              </div>

              {/* Subcard: Vùng 2 Khảo cứu */}
              <div className="p-4 sm:p-5 rounded-2xl bg-[#fbf5ee] border border-[#ebd8c8]">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#9e3b2e] mb-1.5">
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>{signal.research.title}</span>
                </div>
                <p className="text-xs sm:text-sm text-[#66564f] leading-relaxed">
                  Nguồn khảo cứu: <strong>{signal.research.source}</strong> •{" "}
                  {signal.research.region}{" "}
                  <span className="italic text-[#8c7b74]">
                    {signal.research.note}
                  </span>
                </p>
              </div>
            </Card>

            {/* Card 2: Vùng 3 Góc nhìn soi tỏ tâm thức */}
            <Card className="p-6 sm:p-8 rounded-3xl shadow-xs">
              <div className="flex items-center gap-2 text-xs font-bold text-[#2a2220] uppercase tracking-wider mb-4">
                <Sparkles className="w-3.5 h-3.5 text-[#9e3b2e]" />
                <span>{signal.reflection.title}</span>
              </div>

              <div className="p-5 rounded-2xl bg-[#fcf8f2] border border-[#f0e2d5] text-sm sm:text-[15px] text-[#4d3e38] leading-relaxed font-normal">
                {signal.mood === "Chênh vênh" ? (
                  <p>
                    Khi bạn cảm thấy{" "}
                    <strong className="text-[#9e3b2e]">chênh vênh</strong>, đó
                    không phải là dấu hiệu bạn đang thụt lùi, mà là tâm thức đang
                    đòi hỏi một{" "}
                    <strong className="underline decoration-[#9e3b2e]/40 underline-offset-4">
                      khoảng lặng tự nhiên
                    </strong>
                    . Nước có lắng thì hoa mới nở thơm, tâm có tĩnh thì mọi xáo
                    động đời sống mới trở về trật tự vốn có. Hãy cho phép mình
                    chưa cần phải có câu trả lời ngay ngày hôm nay.
                  </p>
                ) : (
                  <p>{signal.reflection.content}</p>
                )}
              </div>

              <div className="mt-5 pt-4 border-t border-[#f2e4d7] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs text-[#8c7b73]">
                <span className="flex items-center gap-1.5">
                  <span className="text-[#be8e5a]">☁</span>
                  <span>{signal.reflection.advice}</span>
                </span>
                <span className="font-medium text-[#7d6c65]">
                  {signal.reflection.signalNumber}
                </span>
              </div>
            </Card>
          </div>

          {/* Right Column (Họa đồ, Vùng 4, Vùng 5) */}
          <div className="lg:col-span-5 space-y-6">
            {/* Card 1: Họa đồ tĩnh lặng & Vùng 4 Hành động nuôi tâm */}
            <Card className="rounded-3xl shadow-xs overflow-hidden">
              <div className="p-4 sm:p-5 flex items-center justify-between border-b border-[#f1e3d6]">
                <div className="text-xs font-bold uppercase tracking-wider text-[#9e3b2e] flex items-center gap-1.5">
                  <Flower2 className="w-3.5 h-3.5" />
                  <span>Họa đồ tĩnh lặng</span>
                </div>
                <Badge variant="terracotta">{signal.artwork.tag}</Badge>
              </div>

              {/* Artwork Photo */}
              <div className="relative h-56 sm:h-64 overflow-hidden">
                <img
                  src={signal.artwork.image}
                  alt={signal.artwork.caption}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-4 text-white text-xs">
                  {signal.artwork.caption}
                </div>
              </div>

              {/* Subcard inside: Vùng 4 */}
              <div className="p-5 sm:p-6 bg-[#fffcf8]">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#9e3b2e]">
                    <Coffee className="w-3.5 h-3.5" />
                    <span>{signal.action.tag}</span>
                  </div>
                  <Badge variant="secondary" className="text-xs font-bold">
                    {signal.action.duration}
                  </Badge>
                </div>

                <h3 className="font-['Noto_Serif',serif] font-bold text-lg text-[#2a2220] mb-2">
                  {signal.action.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#705f58] leading-relaxed mb-4">
                  {signal.action.description}
                </p>

                <Button
                  variant={isActionDone ? "secondary" : "default"}
                  onClick={() => onToggleAction(!isActionDone)}
                  className={`w-full py-3 px-4 text-xs sm:text-sm font-semibold gap-2 ${
                    isActionDone
                      ? "bg-[#2e6930] text-white hover:bg-[#255727]"
                      : ""
                  }`}
                >
                  <Check className="w-4 h-4" />
                  <span>
                    {isActionDone
                      ? "Đã hoàn thành hành động này ✓"
                      : signal.action.buttonLabel}
                  </span>
                </Button>

                {/* Nút tiến vào trạng thái viên mãn khi đã làm xong hành động */}
                {isActionDone && onGoToCompletion && (
                  <Button
                    variant="default"
                    size="lg"
                    onClick={onGoToCompletion}
                    className="w-full mt-3 py-3 px-4 text-xs sm:text-sm font-semibold gap-2 shadow-xs bg-[#9e3b2e] hover:bg-[#882f23] text-white"
                  >
                    <Sparkles className="w-4 h-4" />
                    <span>Tiến vào trạng thái Viên mãn (Bước 5/5)</span>
                  </Button>
                )}
              </div>
            </Card>

            {/* Card 2: Vùng 5 Phản hồi & Lưu trữ */}
            <Card className="p-6 rounded-3xl shadow-xs">
              <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-[#2e2624] mb-2">
                <span>Vùng 5 • Phản hồi & Lưu trữ</span>
                <span className="w-2 h-2 rounded-full bg-[#5a3818]"></span>
              </div>

              <p className="text-xs text-[#7d6e67] mb-4">
                Tín hiệu này có đồng điệu với năng lượng bên trong bạn lúc này?
              </p>

              {/* Feedback 2 buttons */}
              <div className="grid grid-cols-2 gap-3 mb-4">
                <Button
                  variant={liked ? "secondary" : "outline"}
                  onClick={() => setLiked(!liked)}
                  className="py-2.5 text-xs font-medium gap-1.5"
                >
                  <Heart
                    className={`w-3.5 h-3.5 ${liked ? "fill-current" : ""}`}
                  />
                  <span>Tín hiệu chạm đến tôi</span>
                </Button>

                <Button
                  variant="outline"
                  onClick={onRefreshSignal}
                  className="py-2.5 text-xs font-medium gap-1.5"
                  title="Nhận một tín hiệu khác cho cùng tâm trạng này"
                >
                  <RotateCw className="w-3.5 h-3.5 text-[#88756d]" />
                  <span>Cần thông điệp khác</span>
                </Button>
              </div>

              {/* Big Save Button */}
              <Button
                variant={isSaved ? "secondary" : "bronze"}
                size="lg"
                onClick={handleSave}
                className="w-full text-xs sm:text-sm font-semibold gap-2 mb-4"
              >
                <Bookmark className="w-4 h-4" />
                <span>
                  {isSaved ? "Đã lưu vào Góc của tôi ✓" : "Lưu tín hiệu vào Góc của tôi"}
                </span>
              </Button>

              {/* Bottom links */}
              <div className="pt-2 flex items-center justify-center gap-4 text-xs text-[#7b6b64]">
                <button
                  onClick={() => {
                    const shareUrl = `${window.location.origin}/result?signalId=${signal.id}`;
                    navigator.clipboard?.writeText(shareUrl);
                    setCopied(true);
                    setTimeout(() => setCopied(false), 3000);
                  }}
                  className="hover:text-[#9e3b2e] flex items-center gap-1 transition-colors cursor-pointer"
                  title="Sao chép liên kết mở lại đúng tín hiệu này"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span>{copied ? "Đã sao chép liên kết ✓" : "Chia sẻ chiêm nghiệm"}</span>
                </button>
                <span>•</span>
                <button
                  onClick={onGoToDiary}
                  className="hover:text-[#9e3b2e] flex items-center gap-1 transition-colors cursor-pointer"
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>Xem nhật ký gieo duyên</span>
                </button>
              </div>
            </Card>
          </div>
        </div>

        {/* Bottom Banner Ribbon */}
        <div className="p-4 sm:p-5 rounded-2xl bg-[#faede2]/80 border border-[#ecd9cb] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#74625b]">
          <div className="flex items-center gap-2 text-center sm:text-left">
            <Lightbulb className="w-4 h-4 text-[#9e3b2e] flex-shrink-0" />
            <span>
              Mỗi ngày một quẻ chữ, một tách trà tĩnh tâm. Giữ lại khoảnh khắc
              lắng đọng giữa nhịp sống vội vã.
            </span>
          </div>
          <div className="text-right flex-shrink-0">
            <span>Đồng hành cùng: </span>
            <strong className="text-[#2a2220]">3.420 bạn hữu hôm nay</strong>
          </div>
        </div>
      </main>
    </div>
  );
};
