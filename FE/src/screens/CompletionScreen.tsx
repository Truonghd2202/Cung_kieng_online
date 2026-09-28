import React from "react";
import { Check, BookOpen, Sparkles, Home } from "lucide-react";
import { MoodKey, SIGNALS_DATA } from "../data/demoSignals";
import { Button } from "@/src/components/ui/button";
import { Badge } from "@/src/components/ui/badge";
import { Card } from "@/src/components/ui/card";

interface CompletionScreenProps {
  mood: MoodKey;
  onGoToHome: () => void;
  onGoToAccount: () => void;
}

export const CompletionScreen: React.FC<CompletionScreenProps> = ({
  mood,
  onGoToHome,
  onGoToAccount,
}) => {
  const signal = SIGNALS_DATA[mood] || SIGNALS_DATA["Chênh vênh"];

  return (
    <div className="w-full min-h-screen bg-[#fcf8f2] text-[#2e2624] font-['Be_Vietnam_Pro',sans-serif] flex items-center justify-center p-4">
      <Card className="w-full max-w-lg rounded-3xl p-8 sm:p-10 shadow-sm text-center">
        <div className="w-16 h-16 mx-auto rounded-full bg-[#faede2] border border-[#eddcd0] flex items-center justify-center text-[#9e3b2e] mb-6 shadow-xs">
          <Check className="w-8 h-8 stroke-[2.5]" />
        </div>

        <Badge variant="terracotta" className="gap-1.5 px-3.5 py-1 mb-3 uppercase tracking-wider text-xs">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Đã lưu vào nhật ký duyên lành</span>
        </Badge>

        <h2 className="font-['Noto_Serif',serif] font-bold text-2xl sm:text-3xl text-[#2a2220] mb-3">
          Nhịp an lành đã được gửi trao
        </h2>

        <p className="text-xs sm:text-sm text-[#73635d] max-w-sm mx-auto leading-relaxed mb-6">
          Khoảnh khắc bạn dừng chân soi tỏ tâm thức{" "}
          <strong className="text-[#9e3b2e]">[{signal.mood}]</strong> đã được
          ghi lại tại Góc của tôi. Chúc bạn một ngày an yên, thuận hòa.
        </p>

        {/* Poetic quote box */}
        <div className="p-4 rounded-2xl bg-[#fbf5ee] border border-[#f0dfd1] mb-8 text-left">
          <div className="text-[11px] font-bold text-[#9e3b2e] uppercase tracking-wider mb-1">
            Gợi nhớ hôm nay
          </div>
          <p className="font-['Noto_Serif',serif] italic font-semibold text-sm sm:text-base text-[#2c2220]">
            “{signal.poem.line1}
            <br />
            {signal.poem.line2}”
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Button
            variant="default"
            size="pill"
            onClick={onGoToAccount}
            className="w-full sm:w-auto"
          >
            <BookOpen className="w-4 h-4" />
            <span>Mở Góc của tôi</span>
          </Button>

          <Button
            variant="outline"
            size="pill"
            onClick={onGoToHome}
            className="w-full sm:w-auto"
          >
            <Home className="w-4 h-4" />
            <span>Về trang chủ</span>
          </Button>
        </div>
      </Card>
    </div>
  );
};
