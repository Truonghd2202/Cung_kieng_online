import React from "react";
import {
  Check,
  Calendar,
  Coffee,
  Bookmark,
  LogIn,
  ArrowLeft,
  CheckCircle2,
  Flower2,
} from "lucide-react";
import { MoodKey, SIGNALS_DATA } from "../data/demoSignals";
import { Button } from "@/src/components/ui/button";
import { Badge } from "@/src/components/ui/badge";
import { Card } from "@/src/components/ui/card";

interface CompletionScreenProps {
  mood: MoodKey;
  onGoToHome: () => void;
  onGoToAccount: () => void;
  onGoToAuth?: () => void;
}

export const CompletionScreen: React.FC<CompletionScreenProps> = ({
  mood,
  onGoToHome,
  onGoToAccount,
  onGoToAuth,
}) => {
  const signal = SIGNALS_DATA[mood] || SIGNALS_DATA["Chênh vênh"];

  return (
    <div className="w-full min-h-screen bg-[#fcf8f2] text-[#2e2624] font-['Be_Vietnam_Pro',sans-serif]">
      <main className="max-w-4xl mx-auto px-4 sm:px-6 pt-10 pb-16">
        {/* Step indicator */}
        <div className="text-center mb-6">
          <Badge
            variant="terracotta"
            className="gap-2 px-3.5 py-1 text-xs font-semibold tracking-wider uppercase"
          >
            <span className="w-2 h-2 rounded-full bg-[#9e3b2e]"></span>
            <span>Bước 5 / 5 • Gieo mầm bình an</span>
          </Badge>
        </div>

        {/* Big circular medallion */}
        <div className="relative w-36 h-36 mx-auto mb-6 flex items-center justify-center">
          <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#faece1]/70 via-[#f9f0e7] to-[#faece1]/50 animate-pulse" />
          <div className="absolute inset-2 rounded-full border border-[#eddcd0]" />
          <div className="relative w-24 h-24 rounded-full bg-[#9e3b2e] text-white flex flex-col items-center justify-center shadow-md">
            <Check className="w-7 h-7 stroke-[2.5]" />
            <span className="text-[10px] font-bold tracking-widest uppercase mt-0.5">
              Viên mãn
            </span>
          </div>
          {/* Mood tag attached to bottom of medallion */}
          <div className="absolute -bottom-2 px-3 py-0.5 rounded-full bg-[#faece1] border border-[#edd5c4] text-[#9e3b2e] text-[11px] font-semibold flex items-center gap-1 shadow-2xs">
            <Flower2 className="w-3 h-3" />
            <span>{signal.mood}</span>
          </div>
        </div>

        {/* Heading */}
        <div className="text-center max-w-xl mx-auto mb-10">
          <h1 className="text-3xl sm:text-4xl font-['Noto_Serif',serif] font-bold text-[#9e3b2e] leading-tight mb-3">
            Bạn vừa hoàn thành một nhịp thở lành
          </h1>
          <p className="text-xs sm:text-sm text-[#73635d] leading-relaxed">
            Tâm trí đã chậm lại đôi chút. Khoảnh khắc nhỏ này chính là một hạt
            giống bình an được gieo vào đời sống thường nhật.
          </p>
        </div>

        {/* Two-column Content Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10 items-stretch">
          {/* Left Card: Tín hiệu vừa ghi nhận */}
          <Card className="p-6 rounded-3xl shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between text-xs text-[#8c7b74] mb-4">
                <span className="font-semibold uppercase tracking-wider text-[11px]">
                  Tín hiệu vừa ghi nhận
                </span>
                <span className="flex items-center gap-1 text-[#9e3b2e] font-medium text-[11px]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#9e3b2e]"></span>
                  Vừa xong
                </span>
              </div>

              <div className="flex items-start gap-3.5 mb-4">
                <div className="w-11 h-11 rounded-2xl bg-[#faede2] text-[#9e3b2e] flex items-center justify-center flex-shrink-0">
                  <Coffee className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-['Noto_Serif',serif] font-bold text-base text-[#2a2220]">
                    {signal.action.title.length > 25
                      ? `${signal.action.title.slice(0, 25)}...`
                      : signal.action.title}
                  </h3>
                  <p className="text-xs text-[#806f68] mt-0.5">
                    {signal.action.duration} quán chiếu • Thuộc chuỗi Gột Rửa Thân
                    Tâm
                  </p>
                </div>
              </div>

              {/* Quote box */}
              <div className="p-4 rounded-2xl bg-[#fbf5ee] border border-[#f0dfd1] text-xs text-[#5e4f48] italic font-['Noto_Serif',serif] leading-relaxed mb-4">
                “Một ngụm nước ấm trôi qua cổ họng, rũ sạch bụi trần, lòng an tĩnh
                như mặt hồ không gợn sóng.”
              </div>
            </div>

            <div className="pt-3 border-t border-[#f4e8dc] flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs text-[#7b6b64]">
                <Calendar className="w-4 h-4 text-[#9e3b2e]" />
                <span>Nhịp tỉnh thức hôm nay</span>
              </div>
              <div className="font-['Noto_Serif',serif] font-bold text-lg text-[#9e3b2e]">
                01 / 01
              </div>
            </div>
          </Card>

          {/* Right Card: Lưu giữ hành trình của bạn */}
          <Card className="p-6 rounded-3xl bg-[#fdf3eb] border-[#edd1be] shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2 font-['Noto_Serif',serif] font-bold text-base text-[#2b211f]">
                  <Bookmark className="w-4 h-4 text-[#9e3b2e]" />
                  <span>Lưu giữ hành trình của bạn</span>
                </div>
                <Badge variant="terracotta" className="text-[10px]">
                  Khách vãng lai
                </Badge>
              </div>

              <p className="text-xs text-[#6e5d56] leading-relaxed mb-4">
                Bạn đang trải nghiệm với tư cách Khách. Để lưu lại tín hiệu này
                vào <strong className="text-[#9e3b2e]">“Góc của tôi”</strong> và
                theo dõi chuỗi ngày chiêm nghiệm an lành, hãy đăng nhập hoặc tạo
                tài khoản mới.
              </p>

              {/* 4 Feature checks */}
              <div className="grid grid-cols-2 gap-2.5 text-xs text-[#62514b] mb-6">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#9e3b2e] flex-shrink-0" />
                  <span>Lưu lại quẻ chữ & nhật ký</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#9e3b2e] flex-shrink-0" />
                  <span>Đo nhịp bình an theo tháng</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#9e3b2e] flex-shrink-0" />
                  <span>Nhận gợi ý hành động mỗi sáng</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#9e3b2e] flex-shrink-0" />
                  <span>Đồng bộ trên mọi thiết bị</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3">
              <Button
                variant="default"
                size="default"
                onClick={onGoToAuth || onGoToAccount}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl font-semibold gap-2 shadow-xs"
              >
                <LogIn className="w-4 h-4" />
                <span>Đăng nhập / Đăng ký để lưu</span>
              </Button>

              <button
                onClick={onGoToHome}
                className="text-xs text-[#705e57] hover:text-[#9e3b2e] transition-colors cursor-pointer text-center"
              >
                Tiếp tục khám phá mà không cần lưu
              </button>
            </div>
          </Card>
        </div>

        {/* Bottom Back Button */}
        <div className="text-center">
          <Button
            variant="ghost"
            size="sm"
            onClick={onGoToHome}
            className="text-xs text-[#77665f] hover:text-[#9e3b2e] gap-1.5 mb-1"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Trở về màn Hôm nay</span>
          </Button>
          <div className="text-[11px] text-[#9a8982]">
            Giữ nhịp thở tự nhiên • Thân an tâm lạc
          </div>
        </div>
      </main>
    </div>
  );
};
