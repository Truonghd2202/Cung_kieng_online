import React from "react";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Lock,
  Info,
  Sparkles,
  Flower2,
  Waves,
  HelpCircle,
  Wind,
  Heart,
  Moon,
  SunMedium,
} from "lucide-react";
import { MoodKey, MOODS_LIST } from "../data/demoSignals";
import { Button } from "@/src/components/ui/button";
import { Badge } from "@/src/components/ui/badge";
import { Card } from "@/src/components/ui/card";
import { Textarea } from "@/src/components/ui/textarea";

interface MoodCheckInScreenProps {
  selectedMood: MoodKey;
  onSelectMood: (mood: MoodKey) => void;
  journalText: string;
  onChangeJournal: (text: string) => void;
  onBackToToday: () => void;
  onSubmit: () => void;
}

export const MoodCheckInScreen: React.FC<MoodCheckInScreenProps> = ({
  selectedMood,
  onSelectMood,
  journalText,
  onChangeJournal,
  onBackToToday,
  onSubmit,
}) => {
  const getMoodIcon = (iconType: string, isSelected: boolean) => {
    const colorClass = isSelected ? "text-white" : "text-accent";
    switch (iconType) {
      case "lotus":
        return <Flower2 className={`w-5 h-5 ${colorClass}`} />;
      case "waves":
        return <Waves className={`w-5 h-5 ${colorClass}`} />;
      case "question":
        return <HelpCircle className={`w-5 h-5 ${colorClass}`} />;
      case "wind":
        return <Wind className={`w-5 h-5 ${colorClass}`} />;
      case "heart":
        return <Heart className={`w-5 h-5 ${colorClass}`} />;
      case "moon":
        return <Moon className={`w-5 h-5 ${colorClass}`} />;
      default:
        return <Sparkles className={`w-5 h-5 ${colorClass}`} />;
    }
  };

  return (
    <div className="screen-shell">
      <main className="page-container max-w-6xl">
        {/* Step indicator */}
        <div className="text-center mb-4">
          <Badge variant="terracotta" className="gap-2 px-3.5 py-1 text-xs font-semibold tracking-wider uppercase">
            <span className="w-2 h-2 rounded-full bg-action"></span>
            <span>Bước 1 / 3 • Lắng lại cùng chính mình</span>
          </Badge>
        </div>

        {/* Header title */}
        <div className="text-center max-w-2xl mx-auto mb-8">
          <h1 className="page-title mb-3">
            Bây giờ, tâm trạng bạn đang trôi về đâu?
          </h1>
          <p className="text-sm sm:text-base text-muted leading-relaxed">
            Hãy chọn trạng thái gần nhất với bạn trong khoảnh khắc này. Mọi cảm
            xúc đều xứng đáng được lắng nghe và ôm ấp.
          </p>

          {/* Simple step line */}
          <div className="w-24 h-1 bg-action mx-auto mt-6 rounded-full" />
        </div>

        {/* 2 Columns Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-12">
          {/* Left Column: 6 Moods Grid */}
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center justify-between text-xs text-muted font-medium px-1">
              <span className="flex items-center gap-1.5 uppercase font-bold text-accent tracking-wider">
                <Sparkles className="w-3.5 h-3.5" />
                Sáu miền cảm xúc
              </span>
              <span className="italic">Chạm để soi thấu</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {MOODS_LIST.map((m) => {
                const isSelected = selectedMood === m.key;
                return (
                  <button
                    key={m.key}
                    type="button"
                    aria-pressed={isSelected}
                    onClick={() => onSelectMood(m.key)}
                    className={`relative p-4 sm:p-5 rounded-xl border text-left transition-all duration-200 cursor-pointer ${
                      isSelected
                        ? "bg-accent-soft/90 border-accent ring-2 ring-accent/30 shadow-md"
                        : "bg-surface/80 border-line hover:border-gold/60 hover:bg-surface"
                    }`}
                  >
                    {/* Checkmark badge when active */}
                    {isSelected && (
                      <div className="absolute top-3.5 right-3.5 w-6 h-6 rounded-full bg-action flex items-center justify-center text-white shadow-xs">
                        <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                      </div>
                    )}

                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center mb-2.5 transition-colors ${
                        isSelected ? "bg-action text-white shadow-xs" : "bg-surface text-ink border border-line/60"
                      }`}
                    >
                      {getMoodIcon(m.iconType, isSelected)}
                    </div>

                    <h3 className={`font-display font-bold text-lg mb-1 transition-colors ${
                      isSelected ? "text-accent" : "text-ink"
                    }`}>
                      {m.name}
                    </h3>
                    <p className={`text-sm leading-relaxed transition-colors ${
                      isSelected ? "text-ink font-medium" : "text-muted"
                    }`}>
                      {m.desc}
                    </p>
                  </button>
                );
              })}
            </div>

            {/* Quote Card */}
            <div className="p-4 rounded-xl bg-surface/60 border border-line flex items-center gap-3.5 text-xs sm:text-sm text-ink">
              <div className="w-8 h-8 rounded-full bg-accent-soft flex items-center justify-center text-accent flex-shrink-0">
                <SunMedium className="w-4 h-4 text-accent" />
              </div>
              <p className="italic leading-relaxed font-serif text-muted">
                “Sóng gió ngoài kia có lớn, ngọn đèn trong tâm vẫn tỏ nếu ta chịu dừng chân nương bóng.”
              </p>
            </div>
          </div>

          {/* Right Column: Optional Journal & Preview */}
          <div className="lg:col-span-5 space-y-5">
            {/* Journaling Card */}
            <Card className="p-6 rounded-card shadow-xs">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-display font-bold text-lg text-ink">
                  Gửi gắm tâm sự
                </h3>
                <Badge variant="terracotta">Tùy chọn</Badge>
              </div>

              <p className="text-sm text-muted mb-3">
                Đôi dòng gửi gắm cho ngày hôm nay:
              </p>

              <div className="relative">
                <Textarea
                  value={journalText}
                  onChange={(e) => onChangeJournal(e.target.value)}
                  rows={4}
                  placeholder="Nếu có một điều muốn trút bỏ hoặc nhắn nhủ với chính mình, hãy viết nhẹ vài dòng ở đây... Chúng tôi tuyệt đối bảo mật tâm tư của bạn."
                  className="pr-16"
                />
                <div className="absolute bottom-3 right-3 flex items-center gap-1 text-xs text-muted pointer-events-none">
                  <Lock className="w-3 h-3" />
                  <span>Bảo mật</span>
                </div>
              </div>

              <div className="mt-3 flex items-center gap-1.5 text-xs text-muted">
                <Info className="w-3.5 h-3.5 text-accent" />
                <span>Không bắt buộc. Bạn có thể để trống và tiếp tục ngay.</span>
              </div>

              {/* Tín hiệu tương ứng mini preview */}
              <div className="mt-4 pt-4 border-t border-line flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl overflow-hidden bg-surface-soft flex-shrink-0">
                    <img
                      src="/images/tea_bowl.jpg"
                      alt="Chén trà tĩnh tâm"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <div className="text-xs text-muted uppercase tracking-wider font-medium">
                      Tín hiệu tương ứng
                    </div>
                    <div className="text-xs sm:text-sm font-semibold text-ink">
                      Đang chọn:{" "}
                      <span className="text-accent">{selectedMood}</span>
                    </div>
                  </div>
                </div>
                <div className="w-3 h-3 rounded-full bg-action"></div>
              </div>
            </Card>

            {/* Chiêm nghiệm ngày mới Mini Card */}
            <div className="p-4 rounded-panel bg-surface/80 border border-line flex items-center gap-4">
              <div className="w-16 h-14 rounded-xl overflow-hidden flex-shrink-0 shadow-xs">
                <img
                  src="/images/do_paper_still_life.jpg"
                  alt="Giấy dó và vật dụng thư phòng"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <div className="text-xs font-bold uppercase tracking-wider text-accent mb-0.5">
                  Chiêm nghiệm ngày mới
                </div>
                <p className="text-sm text-ink leading-relaxed">
                  Khi tâm trí được định danh rõ ràng, mỗi bước đi tiếp theo đều
                  biến thành hạt mầm thanh thản.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons Row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-line">
          <Button
            variant="outline"
            size="pill"
            onClick={onBackToToday}
            className="w-full sm:w-auto"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Quay lại màn Hôm nay</span>
          </Button>

          <Button
            variant="default"
            size="pill"
            onClick={onSubmit}
            className="w-full sm:w-auto px-8 py-3.5 text-xs sm:text-sm font-semibold shadow-sm hover:shadow group"
          >
            <span>Gieo tâm ý & Tạo tín hiệu</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </main>
    </div>
  );
};
