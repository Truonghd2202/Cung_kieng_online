import React, { useEffect, useRef, useState } from "react";
import { BookOpen, X, Flower2, Feather } from "lucide-react";
import { MoodKey, SIGNALS_DATA } from "../data/demoSignals";
import { Badge } from "@/src/components/ui/badge";
import { Card } from "@/src/components/ui/card";
import { Progress } from "@/src/components/ui/progress";
import { Button } from "@/src/components/ui/button";

interface SignalLoadingScreenProps {
  mood: MoodKey;
  onFinishLoading: () => void;
  onCancel: () => void;
}

export const SignalLoadingScreen: React.FC<SignalLoadingScreenProps> = ({
  mood,
  onFinishLoading,
  onCancel,
}) => {
  const signal = SIGNALS_DATA[mood] || SIGNALS_DATA["Chênh vênh"];
  const [progress, setProgress] = useState(25);

  // Giữ callback ổn định qua ref để tránh re-render kích hoạt lại hiệu ứng
  const onFinishRef = useRef(onFinishLoading);
  onFinishRef.current = onFinishLoading;

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout> | null = null;
    let isCancelled = false;

    const intervalId = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(intervalId);
          if (!isCancelled) {
            timeoutId = setTimeout(() => {
              if (!isCancelled) {
                onFinishRef.current();
              }
            }, 600);
          }
          return 100;
        }
        return prev + 15;
      });
    }, 700);

    // Dọn dẹp triệt để cả interval và timeout khi rời màn hoặc bấm Hủy
    return () => {
      isCancelled = true;
      clearInterval(intervalId);
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, []);

  return (
    <div className="screen-shell">
      <main className="page-container max-w-4xl">
        {/* Step indicator badge */}
        <div className="text-center mb-6">
          <Badge variant="terracotta" className="gap-2 px-3.5 py-1 text-xs font-semibold tracking-wider uppercase">
            <span className="w-2 h-2 rounded-full bg-action animate-pulse"></span>
            <span>Bước 3 • Lắng đọng & Gieo nhịp</span>
          </Badge>
        </div>

        {/* Central Large Card */}
        <Card className="relative rounded-panel p-5 sm:p-12 border-0 bg-transparent text-center">
          {/* Subtle vertical text stamps on the left & right sides */}
          <div className="hidden md:block absolute left-6 top-1/2 -translate-y-1/2 text-xs font-semibold text-subtle uppercase tracking-[0.25em] [writing-mode:vertical-rl] rotate-180 select-none">
            Đổi thư thả
          </div>
          <div className="hidden md:block absolute right-6 top-1/2 -translate-y-1/2 text-xs font-semibold text-subtle uppercase tracking-[0.25em] [writing-mode:vertical-rl] select-none">
            An vạn sự
          </div>

          {/* Compass / Mandala / Breathing Element */}
          <div className="relative w-48 h-48 sm:w-56 sm:h-56 mx-auto mb-6 flex items-center justify-center">
            {/* Outer soft glowing rings */}
            <div className="absolute inset-0 rounded-full bg-surface-soft animate-pulse" />
            <div className="absolute inset-4 rounded-full border border-line" />
            <div className="absolute inset-8 rounded-full border border-line" />

            {/* Directional labels in compass */}
            <span className="absolute top-2 text-xs font-bold tracking-widest text-muted">
              BẮC
            </span>
            <span className="absolute right-3 text-xs font-bold tracking-widest text-muted">
              ĐÔNG
            </span>
            <span className="absolute bottom-2 text-xs font-bold tracking-widest text-muted">
              NAM
            </span>
            <span className="absolute left-3 text-xs font-bold tracking-widest text-muted">
              TÂY
            </span>

            {/* Sacred Vietnamese bronze drum geometric star emblem */}
            <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-full border border-line flex items-center justify-center bg-surface/95 backdrop-blur-xs shadow-inner">
              <svg
                className="w-20 h-20 text-accent fill-none stroke-current"
                viewBox="0 0 100 100"
              >
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  strokeWidth="0.8"
                  strokeDasharray="2 3"
                  className="text-accent"
                />
                <circle cx="50" cy="50" r="34" strokeWidth="0.8" />
                <circle cx="50" cy="50" r="20" strokeWidth="1" />

                <path
                  d="M50 15 L56 44 L85 50 L56 56 L50 85 L44 56 L15 50 L44 44 Z"
                  strokeWidth="1.6"
                  className="stroke-accent"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="5"
                  className="fill-accent stroke-none"
                />
              </svg>
            </div>
          </div>

          {/* Breathing reminder pill */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-surface text-accent text-xs font-medium mb-6 shadow-2xs">
            <span className="text-accent">🍃</span>
            <span>{signal.loadingFacts.breathingText}</span>
          </div>

          {/* Heading */}
          <h1 className="page-title max-w-xl mx-auto mb-3">
            Thở nhẹ ba nhịp, lắng tâm đón nhận
          </h1>
          <p className="text-sm text-muted max-w-md mx-auto leading-relaxed mb-8">
            Hệ thống đang kết nối tâm trạng của bạn với kho tàng văn hóa dân gian
            Việt, chắt lọc một điềm lành tương hợp.
          </p>

          {/* Progress bar and stages */}
          <div className="max-w-md mx-auto mb-8">
            <div className="flex items-center justify-between text-xs text-muted font-medium mb-2">
              <span className="flex items-center gap-1.5 text-accent">
                <BookOpen className="w-3.5 h-3.5" />
                <span>{signal.loadingFacts.stepText}</span>
              </span>
              <span className="font-bold text-accent">{progress}%</span>
            </div>

            {/* Shadcn Progress component */}
            <Progress value={progress} />

            {/* Stages */}
            <div className="flex items-center justify-between text-xs text-muted mt-2 px-1">
              <span>Khởi nguồn tâm thức</span>
              <span>Hòa quyện tích cổ</span>
              <span>Khai mở chỉ dẫn</span>
            </div>
          </div>

          {/* 2 Info Cards below */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-lg mx-auto text-left mb-8">
            {/* Card 1 */}
            <div className="p-4 rounded-panel bg-surface border border-line flex items-start gap-3">
              <div className="w-8 h-8 rounded-xl bg-surface flex items-center justify-center text-accent flex-shrink-0">
                <Flower2 className="w-4 h-4" />
              </div>
              <div>
                <div className="text-xs font-bold uppercase tracking-wider text-accent mb-0.5">
                  {signal.loadingFacts.thoughtTitle}
                </div>
                <div className="text-xs text-ink leading-relaxed">
                  {signal.loadingFacts.thoughtContent}
                </div>
              </div>
            </div>

            {/* Card 2 */}
            <div className="p-4 rounded-panel bg-surface border border-line flex items-start gap-3">
              <div className="w-8 h-8 rounded-xl bg-surface flex items-center justify-center text-accent flex-shrink-0">
                <Feather className="w-4 h-4" />
              </div>
              <div>
                <div className="text-xs font-bold uppercase tracking-wider text-accent mb-0.5">
                  {signal.loadingFacts.originTitle}
                </div>
                <div className="text-xs text-ink leading-relaxed">
                  {signal.loadingFacts.originContent}
                </div>
              </div>
            </div>
          </div>

          {/* Cancel button */}
          <Button
            variant="ghost"
            size="sm"
            onClick={onCancel}
            className="text-xs text-muted hover:text-accent"
          >
            <X className="w-3.5 h-3.5 mr-1" />
            <span>Hủy nhịp chiêm nghiệm</span>
          </Button>
        </Card>

        {/* Sub-quote below card */}
        <div className="mt-8 text-center text-xs sm:text-sm italic text-muted font-display">
          “Vạn vật sinh sôi từ chỗ lặng im. Chúc bạn một niệm lành trong veo.”
        </div>
      </main>
    </div>
  );
};
