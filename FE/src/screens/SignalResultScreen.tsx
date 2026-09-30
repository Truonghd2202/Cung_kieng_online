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
    <div className="screen-shell">
      <main className="page-container max-w-6xl">
        {/* Top Banner Row */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-6 border-b border-line mb-8 text-xs">
          <div className="flex items-center gap-2 text-muted flex-wrap">
            <span className="w-2 h-2 rounded-full bg-action"></span>
            <span className="font-bold text-accent uppercase tracking-wide">
              {signal.badge}
            </span>
            <span>•</span>
            <span>
              Tín hiệu ngày lành tương ứng với tâm trạng{" "}
              <strong className="text-accent">[{signal.mood}]</strong>
            </span>
          </div>

          <div className="flex items-center gap-2 text-muted">
            <Calendar className="w-3.5 h-3.5 text-accent" />
            <span>
              Chủ đề văn hóa: <strong>Ngày Hoàng Đạo</strong> • Tiết khí thanh tịnh
            </span>
          </div>
        </div>

        {/* 2 Columns Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-12">
          {/* Left Column (Vùng 1, Vùng 2, Vùng 3) */}
          <div className="lg:col-span-7 space-y-6">
            {/* Card 1: Vùng 1 & Vùng 2 */}
            <Card className="py-6 border-0 border-b border-line bg-transparent rounded-none">
              {/* Header */}
              <div className="flex items-center justify-between text-xs text-accent font-semibold uppercase tracking-wider mb-6">
                <span>— Vùng 1 • Cội nguồn văn hóa dân gian</span>
                <Flower2 className="w-4 h-4 text-accent" />
              </div>

              {/* Classic Poem */}
              <div className="relative pl-6 mb-6">
                <span className="absolute -left-2 -top-6 text-5xl font-display text-subtle select-none">
                  “
                </span>
                <blockquote className="font-display font-bold text-2xl sm:text-3xl text-accent leading-snug">
                  {signal.poem.line1}
                  <br />
                  {signal.poem.line2}
                </blockquote>
              </div>

              <div className="flex items-center gap-1.5 text-xs text-muted mb-6">
                <CheckCircle2 className="w-3.5 h-3.5 text-accent" />
                <span>{signal.poem.subtext}</span>
              </div>

              {/* Subcard: Vùng 2 Khảo cứu */}
              <div className="pt-5 border-t border-line">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-accent mb-1.5">
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>{signal.research.title}</span>
                </div>
                <p className="text-sm text-ink leading-relaxed">
                  Nguồn khảo cứu: <strong>{signal.research.source}</strong> •{" "}
                  {signal.research.region}{" "}
                  <span className="italic text-muted">
                    {signal.research.note}
                  </span>
                </p>
              </div>
            </Card>

            {/* Card 2: Vùng 3 Góc nhìn soi tỏ tâm thức */}
            <Card className="py-6 border-0 border-b border-line bg-transparent rounded-none">
              <div className="flex items-center gap-2 text-xs font-bold text-ink uppercase tracking-wider mb-4">
                <Sparkles className="w-3.5 h-3.5 text-accent" />
                <span>{signal.reflection.title}</span>
              </div>

              <div className="text-base text-ink leading-loose">
                {signal.mood === "Chênh vênh" ? (
                  <p>
                    Khi bạn cảm thấy{" "}
                    <strong className="text-accent">chênh vênh</strong>, đó
                    không phải là dấu hiệu bạn đang thụt lùi, mà là tâm thức đang
                    đòi hỏi một{" "}
                    <strong className="underline decoration-accent/40 underline-offset-4">
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

              <div className="mt-5 pt-4 border-t border-line flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs text-muted">
                <span className="flex items-center gap-1.5">
                  <span className="text-accent">☁</span>
                  <span>{signal.reflection.advice}</span>
                </span>
                <span className="font-medium text-muted">
                  {signal.reflection.signalNumber}
                </span>
              </div>
            </Card>
          </div>

          {/* Right Column (Họa đồ, Vùng 4, Vùng 5) */}
          <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-24">
            {/* Card 1: Họa đồ tĩnh lặng & Vùng 4 Hành động nuôi tâm */}
            <Card className="rounded-card shadow-xs overflow-hidden">
              <div className="p-4 sm:p-5 flex items-center justify-between border-b border-line">
                <div className="text-xs font-bold uppercase tracking-wider text-accent flex items-center gap-1.5">
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
              <div className="p-5 sm:p-6 bg-surface">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-accent">
                    <Coffee className="w-3.5 h-3.5" />
                    <span>{signal.action.tag}</span>
                  </div>
                  <Badge variant="secondary" className="text-xs font-bold">
                    {signal.action.duration}
                  </Badge>
                </div>

                <h3 className="font-display font-bold text-lg text-ink mb-2">
                  {signal.action.title}
                </h3>
                <p className="text-sm text-ink leading-relaxed mb-4">
                  {signal.action.description}
                </p>

                <Button
                  variant={isActionDone ? "secondary" : "default"}
                  onClick={() => onToggleAction(!isActionDone)}
                  className={`w-full py-3 px-4 text-xs sm:text-sm font-semibold gap-2 ${
                    isActionDone
                      ? "bg-success-soft text-success"
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
                    className="w-full mt-3 py-3 px-4 text-xs sm:text-sm font-semibold gap-2 shadow-xs bg-action hover:bg-action text-white"
                  >
                    <Sparkles className="w-4 h-4" />
                    <span>Tiến vào trạng thái Viên mãn (Bước 5/5)</span>
                  </Button>
                )}
              </div>
            </Card>

            {/* Card 2: Vùng 5 Phản hồi & Lưu trữ */}
            <Card className="p-6 rounded-card shadow-xs">
              <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-ink mb-2">
                <span>Vùng 5 • Phản hồi & Lưu trữ</span>
                <span className="w-2 h-2 rounded-full bg-surface-soft"></span>
              </div>

              <p className="text-sm text-muted mb-4">
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
                  <RotateCw className="w-3.5 h-3.5 text-muted" />
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
              <div className="pt-2 flex items-center justify-center gap-4 text-xs text-muted">
                <button
                  onClick={() => {
                    const shareUrl = `${window.location.origin}/result?signalId=${signal.id}`;
                    navigator.clipboard?.writeText(shareUrl);
                    setCopied(true);
                    setTimeout(() => setCopied(false), 3000);
                  }}
                  className="hover:text-accent flex items-center gap-1 transition-colors cursor-pointer"
                  title="Sao chép liên kết mở lại đúng tín hiệu này"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span>{copied ? "Đã sao chép liên kết ✓" : "Chia sẻ chiêm nghiệm"}</span>
                </button>
                <span>•</span>
                <button
                  onClick={onGoToDiary}
                  className="hover:text-accent flex items-center gap-1 transition-colors cursor-pointer"
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>Xem nhật ký gieo duyên</span>
                </button>
              </div>
            </Card>
          </div>
        </div>

        {/* Bottom Banner Ribbon */}
        <div className="p-4 sm:p-5 rounded-panel bg-surface/80 border border-line flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-muted">
          <div className="flex items-center gap-2 text-center sm:text-left">
            <Lightbulb className="w-4 h-4 text-accent flex-shrink-0" />
            <span>
              Mỗi ngày một quẻ chữ, một tách trà tĩnh tâm. Giữ lại khoảnh khắc
              lắng đọng giữa nhịp sống vội vã.
            </span>
          </div>
          <div className="text-right flex-shrink-0">
            <span>Đồng hành cùng: </span>
            <strong className="text-ink">3.420 bạn hữu hôm nay</strong>
          </div>
        </div>
      </main>
    </div>
  );
};
