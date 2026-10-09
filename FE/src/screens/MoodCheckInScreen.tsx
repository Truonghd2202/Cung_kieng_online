import React, { useState, useRef, useEffect } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  ChevronDown,
  Flower2,
  Waves,
  HelpCircle,
  Wind,
  Heart,
  Moon,
  Sparkles,
  PenLine,
  Bell,
  Briefcase,
  Home,
  UserCheck,
  Compass,
} from "lucide-react";

import {
  MoodKey,
  MOODS_LIST,
  MOOD_CONTEXTS,
  type MoodContextKey,
} from "../data/demoSignals";
import { Button } from "@/src/components/ui/button";
import { Textarea } from "@/src/components/ui/textarea";
import "../styles/MoodCheckInScreen.css";

import { SchoolSupportNotice } from "../components/SchoolSupportNotice";

interface MoodCheckInScreenProps {
  selectedMood: MoodKey;
  onSelectMood: (mood: MoodKey) => void;
  journalText: string;
  onChangeJournal: (text: string) => void;
  onBackToToday: () => void;
  onSubmit: (contextKey: MoodContextKey) => void;
  contextKey: MoodContextKey;
  onChangeContext: (contextKey: MoodContextKey) => void;
}

const getMoodIcon = (iconType: string, isSelected: boolean) => {
  const className = "w-5 h-5";

  switch (iconType) {
    case "lotus":
      return <Flower2 className={className} />;
    case "waves":
      return <Waves className={className} />;
    case "question":
      return <HelpCircle className={className} />;
    case "wind":
      return <Wind className={className} />;
    case "heart":
      return <Heart className={className} />;
    case "moon":
      return <Moon className={className} />;
    default:
      return <Sparkles className={className} />;
  }
};

const MOOD_SHORT_DESCRIPTIONS: Record<MoodKey, string> = {
  "An yên": "Bình tĩnh, thanh thản, thấy ổn",
  "Chênh vênh": "Thấy mất cân bằng, hụt hẫng",
  "Băn khoăn": "Có điều trăn trở chưa lời giải",
  "Nôn nóng": "Muốn mọi việc diễn ra nhanh hơn",
  "Biết ơn": "Trân trọng những điều đang có",
  "Cần điểm tựa": "Muốn được lắng nghe, vỗ về",
  "Áp lực": "Nhiều việc và kỳ vọng dồn nén",
  "Cô đơn": "Cần một khoảng kết nối ấm áp",
  "Vui vẻ": "Có niềm vui tươi sáng muốn giữ",
  "Mông lung": "Chưa rõ phương hướng bước tiếp",
};

const CONTEXT_ICONS: Record<string, React.ReactNode> = {
  general: <Compass className="w-4 h-4 text-accent" />,
  work: <Briefcase className="w-4 h-4 text-accent" />,
  family: <Home className="w-4 h-4 text-accent" />,
  relationship: <Heart className="w-4 h-4 text-accent" />,
  self: <UserCheck className="w-4 h-4 text-accent" />,
};

export const MoodCheckInScreen: React.FC<MoodCheckInScreenProps> = ({
  selectedMood,
  onSelectMood,
  journalText,
  onChangeJournal,
  onBackToToday,
  onSubmit,
  contextKey,
  onChangeContext,
}) => {
  const [bellRinging, setBellRinging] = useState(false);
  const audioElementRef = useRef<HTMLAudioElement | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);

  const playSynthesizedBell = (ctx: AudioContext, now: number) => {
    const masterGain = ctx.createGain();
    masterGain.gain.setValueAtTime(0.001, now);
    masterGain.gain.linearRampToValueAtTime(0.3, now + 0.05);
    masterGain.gain.exponentialRampToValueAtTime(0.0001, now + 8.5);
    masterGain.connect(ctx.destination);

    const freqs = [216, 432, 648, 864, 1296];
    const decays = [8.5, 6.2, 4.8, 3.5, 2.2];
    const amps = [0.4, 0.25, 0.15, 0.08, 0.04];

    freqs.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, now);
      gain.gain.setValueAtTime(amps[idx], now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + decays[idx]);
      osc.connect(gain);
      gain.connect(masterGain);
      osc.start(now);
      osc.stop(now + decays[idx]);
    });
  };

  const playZenBellSound = () => {
    try {
      const audio = new Audio("/audio/meditation-bowl.mp3");
      audio.volume = 0.8;
      audioElementRef.current = audio;

      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          try {
            const AudioCtx =
              window.AudioContext ||
              (window as unknown as { webkitAudioContext: typeof AudioContext })
                .webkitAudioContext;
            if (AudioCtx) {
              const ctx = new AudioCtx();
              audioCtxRef.current = ctx;
              playSynthesizedBell(ctx, ctx.currentTime);
            }
          } catch {}
        });
      }
    } catch {
      try {
        const AudioCtx =
          window.AudioContext ||
          (window as unknown as { webkitAudioContext: typeof AudioContext })
            .webkitAudioContext;
        if (AudioCtx) {
          const ctx = new AudioCtx();
          audioCtxRef.current = ctx;
          playSynthesizedBell(ctx, ctx.currentTime);
        }
      } catch {}
    }
  };

  const handleRingBell = () => {
    setBellRinging(true);
    playZenBellSound();
    setTimeout(() => setBellRinging(false), 900);
  };

  useEffect(() => {
    return () => {
      if (audioElementRef.current) {
        audioElementRef.current.pause();
        audioElementRef.current = null;
      }
      if (audioCtxRef.current) {
        audioCtxRef.current.close().catch(() => {});
        audioCtxRef.current = null;
      }
    };
  }, []);

  return (
    <div className="screen-shell">
      <main className="page-container max-w-3xl pb-40 sm:pb-16 py-6 sm:py-8">
        {/* ========================================================= */}
        {/* 1. HEADER LẮNG ĐỌNG & TRIỆN SON "TÂM"                     */}
        {/* ========================================================= */}
        <header className="mb-6 sm:mb-9">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
            <div className="inline-flex items-center gap-2 text-xs sm:text-sm text-accent font-semibold tracking-wide">
              <Flower2 className="w-4 h-4" aria-hidden="true" />
              <span>Khoảng nghỉ nuôi dưỡng tâm hồn</span>
            </div>

            {/* Nút Thỉnh chuông tĩnh tâm */}
            <button
              type="button"
              onClick={handleRingBell}
              className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-amber-700/25 bg-amber-500/8 hover:bg-amber-500/15 text-xs sm:text-sm font-medium text-amber-900 dark:text-amber-200 transition-all cursor-pointer shadow-xs ${
                bellRinging ? "scale-105 border-amber-600 bg-amber-500/20" : ""
              }`}
              title="Thỉnh chuông tĩnh tâm"
            >
              <Bell className={`w-3.5 h-3.5 ${bellRinging ? "animate-bounce text-amber-600" : ""}`} />
              <span>Thỉnh chuông tĩnh tâm</span>
            </button>
          </div>

          <h1
            tabIndex={-1}
            className="font-display text-3xl sm:text-4xl lg:text-5xl font-semibold text-ink tracking-tight mb-2 flex items-center flex-wrap outline-none focus:outline-none focus-visible:outline-none focus:ring-0"
          >
            <span className="mood-seal-badge" title="Dấu ấn Tâm">
              心
            </span>
            <span>Hôm nay bạn cảm thấy thế nào?</span>
          </h1>

          <p className="text-base text-muted leading-relaxed max-w-xl">
            Chọn cảm xúc gần nhất với bạn lúc này.
            Không cần phải thấy ổn mới bắt đầu — mọi tâm sự đều được lắng nghe chân thành.
          </p>
        </header>

        {/* ========================================================= */}
        {/* 2. 10 PHIẾN NGỌC CẢM XÚC (JADE EMOTION TILES)             */}
        {/* ========================================================= */}
        <section aria-labelledby="mood-selection-title" className="mb-8">
          <div className="flex items-center justify-between gap-2 mb-3">
            <h2
              id="mood-selection-title"
              className="text-sm font-semibold uppercase tracking-wider text-ink"
            >
              Chọn một cảm xúc của bạn
            </h2>
            <span className="text-xs text-muted">
              Đang chọn: <strong className="text-accent">{selectedMood}</strong>
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            {MOODS_LIST.map((mood) => {
              const isSelected = selectedMood === mood.key;

              return (
                <button
                  key={mood.key}
                  type="button"
                  aria-pressed={isSelected}
                  onClick={() => onSelectMood(mood.key)}
                  className={`mood-tile-card ${
                    isSelected ? "mood-tile-card--selected" : ""
                  }`}
                >
                  <div className="mb-2 flex items-center justify-between gap-2">
                    <span
                      aria-hidden="true"
                      className={`mood-tile-icon-box ${
                        isSelected
                          ? "bg-accent text-on-accent shadow-sm"
                          : "bg-accent/8 text-accent"
                      }`}
                    >
                      {getMoodIcon(mood.iconType, isSelected)}
                    </span>

                    <span
                      aria-hidden="true"
                      className={`mood-tile-check ${
                        isSelected
                          ? "bg-accent text-on-accent"
                          : "border border-line/80 text-transparent"
                      }`}
                    >
                      {isSelected ? (
                        <Check className="h-3 w-3 stroke-[3]" />
                      ) : (
                        <span className="w-1.5 h-1.5 rounded-full bg-line/60" />
                      )}
                    </span>
                  </div>

                  <div>
                    <span className="block font-display text-base font-semibold leading-snug text-ink sm:text-lg mb-0.5">
                      {mood.name}
                    </span>

                    <span className="block text-xs sm:text-sm leading-snug text-muted line-clamp-1">
                      {MOOD_SHORT_DESCRIPTIONS[mood.key]}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </section>

        {/* ========================================================= */}
        {/* 3. NGỮ CẢNH: CHỌN MỐI BẬN LÒNG (PILL CHIPS THAY CHO RADIO) */}
        {/* ========================================================= */}
        <fieldset className="mb-8 border-0 p-0 m-0">
          <legend className="mb-2 font-display text-lg font-semibold text-ink">
            Bạn muốn lời gợi mở hướng về điều gì?
          </legend>

          <p className="mb-4 text-xs sm:text-sm leading-relaxed text-muted">
            Không bắt buộc. Lời gợi mở biên soạn và việc nhỏ sẽ được chọn theo ngữ cảnh bạn gửi gắm.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {MOOD_CONTEXTS.map((context) => {
              const isActive = contextKey === context.key;

              return (
                <div
                  key={context.key}
                  onClick={() => onChangeContext(context.key)}
                  className={`mood-context-chip ${
                    isActive ? "mood-context-chip--active" : ""
                  }`}
                  role="radio"
                  aria-checked={isActive}
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      onChangeContext(context.key);
                    }
                  }}
                >
                  <div className="mood-context-radio-dot">
                    <div className="mood-context-radio-inner" />
                  </div>

                  <div className="flex items-center gap-2">
                    {CONTEXT_ICONS[context.key] || <Compass className="w-4 h-4 text-accent" />}
                    <span className="text-sm font-medium text-ink">
                      {context.label}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </fieldset>

        {/* ========================================================= */}
        {/* 4. TRANG GIẤY DÓ TÂM SỰ (GHI CHÉP TÙY CHỌN)               */}
        {/* ========================================================= */}
        <details className="group mood-letter-container mb-8">
          <summary className="mood-letter-summary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent">
            <div className="w-8 h-8 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center text-accent shrink-0">
              <PenLine className="w-4 h-4" aria-hidden="true" />
            </div>

            <div className="flex-1">
              <span className="block text-sm font-semibold text-ink">
                Viết thêm vài dòng tâm sự gửi gió mây
              </span>
              <span className="block text-xs text-muted mt-0.5">
                {journalText.trim()
                  ? "Đã có vài dòng trải lòng trong lượt này"
                  : "Tùy chọn — một khoảng không gian riêng tư dành cho bạn"}
              </span>
            </div>

            <ChevronDown
              className="w-4 h-4 text-muted transition-transform group-open:rotate-180"
              aria-hidden="true"
            />
          </summary>

          <div className="px-5 pb-5 pt-1 border-t border-line/60">
            <label
              htmlFor="mood-journal"
              className="block text-xs font-semibold text-accent uppercase tracking-wider mb-2 mt-2"
            >
              Gửi gắm nỗi niềm lúc này
            </label>

            <Textarea
              id="mood-journal"
              value={journalText}
              onChange={(event) => onChangeJournal(event.target.value)}
              rows={4}
              maxLength={2000}
              placeholder="Một chuyện vừa diễn ra, một điều làm bạn bận lòng, hoặc đơn giản là một dòng thở phào..."
              aria-describedby="mood-journal-note"
              className="resize-y bg-surface border-line focus:border-accent text-sm leading-relaxed"
            />

            <div className="flex items-center justify-between text-xs text-muted mt-2">
              
              <span>{journalText.length}/2000 ký tự</span>
            </div>
          </div>
        </details>

        {/* ========================================================= */}
        {/* 5. THANH HÀNH ĐỘNG CỐ ĐỊNH CHÂN TRANG                     */}
        {/* ========================================================= */}
        <div
          className={[
            "fixed inset-x-0 bottom-0 z-30",
            "border-t border-line/80 bg-surface/95 backdrop-blur-md",
            "px-4 pt-3.5",
            "pb-[calc(0.85rem+env(safe-area-inset-bottom))]",
            "sm:static sm:mt-10 sm:border-0",
            "sm:bg-transparent sm:p-0",
          ].join(" ")}
        >
          <div className="mx-auto max-w-3xl flex items-center justify-between gap-3">
            <Button
              type="button"
              variant="outline"
              size="lg"
              onClick={onBackToToday}
              className="shrink-0 hover:border-accent/40"
            >
              <ArrowLeft className="w-4 h-4" aria-hidden="true" />
              <span>Quay lại</span>
            </Button>

            <button
              type="button"
              onClick={() => onSubmit(contextKey)}
              aria-label="Nhận lời chiêm nghiệm"
              className="mood-submit-btn flex-1 sm:flex-none sm:min-w-64"
            >
              <span className="mood-submit-sheen" />
              <ButtonOrnament className="w-6 h-4 text-amber-200/80 shrink-0 hidden sm:block" />
              <span>NHẬN LỜI CHIÊM NGHIỆM</span>
              <ArrowRight className="h-4 w-4 shrink-0 text-amber-200" aria-hidden="true" />
            </button>
          </div>
        </div>
        <SchoolSupportNotice text={journalText} />
      </main>
    </div>
  );
};

const ButtonOrnament: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    className={className}
    viewBox="0 0 30 20"
    fill="none"
    stroke="currentColor"
    strokeWidth="1"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M2 3v14" />
    <path d="M2 10h4" />
    <path d="M9 10c0-2.6 2-4.4 4.4-4.4 2.2 0 3.8 1.6 3.8 3.6 0 1.6-1.2 2.8-2.7 2.8-1.2 0-2.1-.9-2.1-2 0-.9.7-1.6 1.6-1.6" />
    <path d="M17.2 9.2c1.2-2.6 3.6-3.8 6-3.2 1.8.5 3 2 3 3.6" />
  </svg>
);
