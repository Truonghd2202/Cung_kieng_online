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
    const colorClass = isSelected ? "text-white" : "text-[#9e3b2e]";
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
    <div className="w-full min-h-screen bg-[#fcf8f2] text-[#2e2624] font-['Be_Vietnam_Pro',sans-serif]">
      <main className="max-w-6xl mx-auto px-4 sm:px-6 pt-10 pb-16">
        {/* Step indicator */}
        <div className="text-center mb-4">
          <Badge variant="terracotta" className="gap-2 px-3.5 py-1 text-xs font-semibold tracking-wider uppercase">
            <span className="w-2 h-2 rounded-full bg-[#9e3b2e]"></span>
            <span>Bước 1 / 3 • Lắng lại cùng chính mình</span>
          </Badge>
        </div>

        {/* Header title */}
        <div className="text-center max-w-2xl mx-auto mb-8">
          <h1 className="text-3xl sm:text-4xl lg:text-[40px] font-['Noto_Serif',serif] font-bold text-[#2a211e] leading-tight mb-3">
            Bây giờ, tâm trạng bạn đang trôi về đâu?
          </h1>
          <p className="text-sm sm:text-base text-[#73635d] leading-relaxed">
            Hãy chọn trạng thái gần nhất với bạn trong khoảnh khắc này. Mọi cảm
            xúc đều xứng đáng được lắng nghe và ôm ấp.
          </p>

          {/* Simple step line */}
          <div className="w-24 h-1 bg-[#9e3b2e] mx-auto mt-6 rounded-full" />
        </div>

        {/* 2 Columns Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-12">
          {/* Left Column: 6 Moods Grid */}
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center justify-between text-xs text-[#7e6d66] font-medium px-1">
              <span className="flex items-center gap-1.5 uppercase font-bold text-[#9e3b2e] tracking-wider">
                <Sparkles className="w-3.5 h-3.5" />
                Sáu miền cảm xúc
              </span>
              <span className="italic">Chạm để soi thấu</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {MOODS_LIST.map((m) => {
                const isSelected = selectedMood === m.key;
                return (
                  <button
                    key={m.key}
                    onClick={() => onSelectMood(m.key)}
                    className={`relative p-5 rounded-2xl border text-left transition-all cursor-pointer ${
                      isSelected
                        ? "bg-[#faece1] border-[#9e3b2e] shadow-sm ring-1 ring-[#9e3b2e]"
                        : "bg-[#fffdfa] border-[#eddcd0] hover:border-[#dfc3af] hover:bg-[#faf4ee]"
                    }`}
                  >
                    {/* Checkmark badge when active */}
                    {isSelected && (
                      <div className="absolute top-4 right-4 w-6 h-6 rounded-full bg-[#9e3b2e] flex items-center justify-center text-white shadow-xs">
                        <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                      </div>
                    )}

                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 transition-colors ${
                        isSelected ? "bg-[#9e3b2e]" : "bg-[#faede2]"
                      }`}
                    >
                      {getMoodIcon(m.iconType, isSelected)}
                    </div>

                    <h3 className="font-['Noto_Serif',serif] font-bold text-lg text-[#2a2220] mb-1">
                      {m.name}
                    </h3>
                    <p className="text-xs text-[#72625b] leading-relaxed">
                      {m.desc}
                    </p>
                  </button>
                );
              })}
            </div>

            {/* Quote Card */}
            <div className="p-4 rounded-2xl bg-[#faf3ec] border border-[#ecd9cb] flex items-center gap-3.5 text-xs sm:text-sm text-[#6d5b54]">
              <div className="w-9 h-9 rounded-full bg-white flex items-center justify-center text-[#be8e5a] flex-shrink-0 shadow-xs">
                <SunMedium className="w-5 h-5 text-[#be8e5a]" />
              </div>
              <p className="italic leading-relaxed font-['Noto_Serif',serif]">
                “Sóng gió ngoài kia có lớn, ngọn đèn trong tâm vẫn tỏ nếu ta
                chịu dừng chân nương bóng.”
              </p>
            </div>
          </div>

          {/* Right Column: Optional Journal & Preview */}
          <div className="lg:col-span-5 space-y-5">
            {/* Journaling Card */}
            <Card className="p-6 rounded-3xl shadow-xs">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-['Noto_Serif',serif] font-bold text-lg text-[#2b211f]">
                  Gửi gắm tâm sự
                </h3>
                <Badge variant="terracotta">Tùy chọn</Badge>
              </div>

              <p className="text-xs text-[#7d6e67] mb-3">
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
                <div className="absolute bottom-3 right-3 flex items-center gap-1 text-[11px] text-[#93827a] pointer-events-none">
                  <Lock className="w-3 h-3" />
                  <span>Bảo mật</span>
                </div>
              </div>

              <div className="mt-3 flex items-center gap-1.5 text-xs text-[#8c7b74]">
                <Info className="w-3.5 h-3.5 text-[#9e3b2e]" />
                <span>Không bắt buộc. Bạn có thể để trống và tiếp tục ngay.</span>
              </div>

              {/* Tín hiệu tương ứng mini preview */}
              <div className="mt-4 pt-4 border-t border-[#f2e4d7] flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl overflow-hidden bg-[#e0d0c3] flex-shrink-0">
                    <img
                      src="/images/tea_bowl.jpg"
                      alt="Thumbnail"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <div className="text-[11px] text-[#907f78] uppercase tracking-wider font-medium">
                      Tín hiệu tương ứng
                    </div>
                    <div className="text-xs sm:text-sm font-semibold text-[#2f2523]">
                      Đang chọn:{" "}
                      <span className="text-[#9e3b2e]">{selectedMood}</span>
                    </div>
                  </div>
                </div>
                <div className="w-3 h-3 rounded-full bg-[#9e3b2e]"></div>
              </div>
            </Card>

            {/* Chiêm nghiệm ngày mới Mini Card */}
            <div className="p-4 rounded-2xl bg-[#faede2]/80 border border-[#ebd6c5] flex items-center gap-4">
              <div className="w-16 h-14 rounded-xl overflow-hidden flex-shrink-0 shadow-xs">
                <img
                  src="/images/tea_bowl.jpg"
                  alt="Tea cup"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <div className="text-[10px] font-bold uppercase tracking-wider text-[#9e3b2e] mb-0.5">
                  Chiêm nghiệm ngày mới
                </div>
                <p className="text-xs text-[#6e5d56] leading-relaxed">
                  Khi tâm trí được định danh rõ ràng, mỗi bước đi tiếp theo đều
                  biến thành hạt mầm thanh thản.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons Row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-[#ebdcd0]">
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
