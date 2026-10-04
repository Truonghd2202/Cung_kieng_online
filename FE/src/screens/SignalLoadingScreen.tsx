import React, { useEffect, useRef } from "react";
import { X } from "lucide-react";
import { MoodKey, SIGNALS_DATA } from "../data/demoSignals";
import { Badge } from "@/src/components/ui/badge";
import { Card } from "@/src/components/ui/card";
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

  // Giữ callback ổn định qua ref để tránh re-render kích hoạt lại hiệu ứng
  const onFinishRef = useRef(onFinishLoading);
  onFinishRef.current = onFinishLoading;

  useEffect(() => {
    let cancelled = false;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const timer = setTimeout(() => {
      if (cancelled) return;

      onFinishRef.current();
    }, reducedMotion ? 200 : 700);

    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [mood]);

  return (
    <div className="screen-shell">
      <main className="page-container max-w-4xl">
        {/* Step indicator badge */}
        <div className="text-center mb-6">
          <Badge variant="terracotta" className="gap-2 px-3.5 py-1 text-xs font-semibold tracking-wider uppercase">
            <span className="w-2 h-2 rounded-full bg-action animate-pulse motion-reduce:animate-none"></span>
            <span>Mở lời chiêm nghiệm</span>
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
            <div className="absolute inset-0 rounded-full bg-surface-soft animate-pulse motion-reduce:animate-none" />
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
            Một lời gợi mở theo tâm trạng bạn chọn
          </h1>
          <p
            role="status"
            className="text-sm text-muted max-w-md mx-auto leading-relaxed mb-6"
          >
            Đang mở lời chiêm nghiệm từ bộ nội dung mẫu.
            Bạn có thể giữ lại điều phù hợp với mình.
          </p>

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
