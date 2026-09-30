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
import { MoodKey, SIGNALS_DATA, SignalData } from "../data/demoSignals";
import { Button } from "@/src/components/ui/button";
import { Badge } from "@/src/components/ui/badge";
import { Card } from "@/src/components/ui/card";

interface CompletionScreenProps {
  mood: MoodKey;
  signal?: SignalData;
  isLoggedIn?: boolean;
  userName?: string;
  onGoToHome: () => void;
  onGoToAccount: () => void;
  onGoToAuth?: () => void;
}

export const CompletionScreen: React.FC<CompletionScreenProps> = ({
  mood,
  signal: propSignal,
  isLoggedIn = false,
  userName,
  onGoToHome,
  onGoToAccount,
  onGoToAuth,
}) => {
  const signal = propSignal || SIGNALS_DATA[mood] || SIGNALS_DATA["Chênh vênh"];

  return (
    <div className="screen-shell">
      <main className="page-container max-w-4xl">
        {/* Step indicator */}
        <div className="text-center mb-6">
          <Badge
            variant="terracotta"
            className="gap-2 px-3.5 py-1 text-xs font-semibold tracking-wider uppercase"
          >
            <span className="w-2 h-2 rounded-full bg-action"></span>
            <span>Bước 5 / 5 • Gieo mầm bình an</span>
          </Badge>
        </div>

        {/* Big circular medallion */}
        <div className="relative w-36 h-36 mx-auto mb-6 flex items-center justify-center">
          <div className="absolute inset-0 rounded-full bg-surface-soft animate-pulse" />
          <div className="absolute inset-2 rounded-full border border-line" />
          <div className="relative w-24 h-24 rounded-full bg-action text-white flex flex-col items-center justify-center shadow-md">
            <Check className="w-7 h-7 stroke-[2.5]" />
            <span className="text-xs font-bold tracking-widest uppercase mt-0.5">
              Viên mãn
            </span>
          </div>
          {/* Mood tag attached to bottom of medallion */}
          <div className="absolute -bottom-2 px-3 py-0.5 rounded-full bg-surface border border-line text-accent text-xs font-semibold flex items-center gap-1 shadow-2xs">
            <Flower2 className="w-3 h-3" />
            <span>{signal.mood}</span>
          </div>
        </div>

        {/* Heading */}
        <div className="text-center max-w-xl mx-auto mb-10">
          <h1 className="page-title mb-3">
            Bạn vừa hoàn thành một nhịp thở lành
          </h1>
          <p className="text-sm text-muted leading-relaxed">
            Tâm trí đã chậm lại đôi chút. Khoảnh khắc nhỏ này chính là một hạt
            giống bình an được gieo vào đời sống thường nhật.
          </p>
        </div>

        {/* Two-column Content Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10 items-stretch">
          {/* Left Card: Tín hiệu vừa ghi nhận */}
          <Card className="p-6 rounded-card shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between text-xs text-muted mb-4">
                <span className="font-semibold uppercase tracking-wider text-xs">
                  Tín hiệu vừa ghi nhận
                </span>
                <span className="flex items-center gap-1 text-accent font-medium text-xs">
                  <span className="w-1.5 h-1.5 rounded-full bg-action"></span>
                  Vừa xong
                </span>
              </div>

              <div className="flex items-start gap-3.5 mb-4">
                <div className="w-11 h-11 rounded-panel bg-surface text-accent flex items-center justify-center flex-shrink-0">
                  <Coffee className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-base text-ink">
                    {signal.action.title.length > 25
                      ? `${signal.action.title.slice(0, 25)}...`
                      : signal.action.title}
                  </h3>
                  <p className="text-sm text-muted mt-0.5">
                    {signal.action.duration} quán chiếu • Thuộc chuỗi Gột Rửa Thân
                    Tâm
                  </p>
                </div>
              </div>

              {/* Quote box */}
              <div className="p-4 rounded-panel bg-surface border border-line text-xs text-ink italic font-display leading-relaxed mb-4">
                “Một ngụm nước ấm trôi qua cổ họng, rũ sạch bụi trần, lòng an tĩnh
                như mặt hồ không gợn sóng.”
              </div>
            </div>

            <div className="pt-3 border-t border-line flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs text-muted">
                <Calendar className="w-4 h-4 text-accent" />
                <span>Nhịp tỉnh thức hôm nay</span>
              </div>
              <div className="font-display font-bold text-lg text-accent">
                01 / 01
              </div>
            </div>
          </Card>

          {/* Right Card: Lưu giữ hành trình của bạn */}
          {isLoggedIn ? (
            <Card className="p-6 rounded-card bg-surface border-line shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2 font-display font-bold text-base text-success">
                    <CheckCircle2 className="w-5 h-5 text-success" />
                    <span>Đã lưu vào Góc của bạn</span>
                  </div>
                  <Badge
                    variant="secondary"
                    className="text-xs bg-surface text-success border-line"
                  >
                    {userName || "Thành viên"} (Demo)
                  </Badge>
                </div>

                <p className="text-sm text-success leading-relaxed mb-4">
                  Quẻ tín hiệu <strong className="text-success">“{signal.mood}”</strong> cùng lời chiêm nghiệm hôm nay đã được lưu an toàn vào tài khoản của bạn.
                </p>

                {/* Demo notice pill */}
                <div className="p-3.5 rounded-panel bg-surface/95 border border-line text-xs text-success mb-6 leading-relaxed shadow-2xs">
                  ✦ <strong>Dữ liệu Demo (chưa kết nối Backend):</strong> Tín hiệu đang được lưu giữ trực tiếp trong bộ nhớ trình duyệt (LocalStorage).
                </div>

                {/* 2 Feature checks */}
                <div className="grid grid-cols-2 gap-2.5 text-xs text-success mb-6">
                  <div className="flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5 text-success flex-shrink-0" />
                    <span>Ghi chép sẵn sàng</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5 text-success flex-shrink-0" />
                    <span>Mở lại bất kỳ lúc nào</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col xl:flex-row items-center gap-3">
                <Button
                  variant="default"
                  size="default"
                  onClick={onGoToAccount}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-xl font-semibold gap-2 shadow-xs bg-action hover:bg-action-hover text-on-action"
                >
                  <Bookmark className="w-4 h-4" />
                  <span>Xem trong Góc của tôi</span>
                </Button>

                <Button
                  variant="outline"
                  size="default"
                  onClick={onGoToHome}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-xl font-semibold gap-2 border-line text-xs text-success"
                >
                  <span>Trở về màn Hôm nay</span>
                </Button>
              </div>
            </Card>
          ) : (
            <Card className="p-6 rounded-card bg-surface border-line shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2 font-display font-bold text-base text-ink">
                    <Bookmark className="w-4 h-4 text-accent" />
                    <span>Lưu giữ hành trình của bạn</span>
                  </div>
                  <Badge variant="terracotta" className="text-xs">
                    Khách vãng lai
                  </Badge>
                </div>

                <p className="text-sm text-ink leading-relaxed mb-4">
                  Bạn đang trải nghiệm với tư cách Khách. Để lưu lại tín hiệu này
                  vào <strong className="text-accent">“Góc của tôi”</strong> và
                  theo dõi chuỗi ngày chiêm nghiệm an lành, hãy đăng nhập hoặc tạo
                  tài khoản mới.
                </p>

                {/* 4 Feature checks */}
                <div className="grid grid-cols-2 gap-2.5 text-xs text-ink mb-6">
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-accent flex-shrink-0" />
                    <span>Lưu lại quẻ chữ & nhật ký</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-accent flex-shrink-0" />
                    <span>Đo nhịp bình an theo tháng</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-accent flex-shrink-0" />
                    <span>Nhận gợi ý hành động mỗi sáng</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-accent flex-shrink-0" />
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
                  className="text-xs text-ink hover:text-accent transition-colors cursor-pointer text-center"
                >
                  Tiếp tục khám phá mà không cần lưu
                </button>
              </div>
            </Card>
          )}
        </div>

        {/* Bottom Back Button */}
        <div className="text-center">
          <Button
            variant="ghost"
            size="sm"
            onClick={onGoToHome}
            className="text-xs text-muted hover:text-accent gap-1.5 mb-1"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Trở về màn Hôm nay</span>
          </Button>
          <div className="text-xs text-muted">
            Giữ nhịp thở tự nhiên • Thân an tâm lạc
          </div>
        </div>
      </main>
    </div>
  );
};
