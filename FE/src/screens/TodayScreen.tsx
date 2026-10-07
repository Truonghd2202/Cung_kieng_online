import React, { useState, useRef, useEffect } from "react";
import {
  ArrowRight,
  CheckCircle2,
  Flower2,
  BookOpen,
  Wind,
  Compass,
  Bell,
  Sparkles,
  Calendar,
} from "lucide-react";

import type { MoodKey, SignalData } from "../data/demoSignals";
import { Button } from "@/src/components/ui/button";
import { TodayReminderCard } from "../components/TodayReminderCard";
import {
  CULTURAL_TOPICS,
  sanitizeCulturalTopics,
} from "../data/culturalTopics";
import "../styles/TodayScreen.css";

interface TodayScreenProps {
  signal: SignalData;
  isCheckedIn?: boolean;
  isActionDone?: boolean;
  mood?: MoodKey;
  onSelectMoodClick: () => void;
  onViewSignalDetails: () => void;
  selectedTopics?: string[];
  onGoToCulture: () => void;
  onGoToExperience: () => void;
  onGoToZen: () => void;
  currentUserEmail?: string;
  onGoToReminders: () => void;
  onGoToXinXam: () => void;
  onGoToRituals: () => void;
  onGoToGratitude: () => void;
  onGoToCultureMap: () => void;
}

export const TodayScreen: React.FC<TodayScreenProps> = ({
  signal,
  isCheckedIn = false,
  isActionDone = false,
  mood = "Chênh vênh",
  onSelectMoodClick,
  onViewSignalDetails,
  selectedTopics = [],
  onGoToCulture,
  onGoToExperience,
  onGoToZen,
  currentUserEmail,
  onGoToReminders,
  onGoToXinXam,
  onGoToRituals,
  onGoToGratitude,
  onGoToCultureMap,
}) => {
  const [bellRinging, setBellRinging] = useState(false);
  const audioElementRef = useRef<HTMLAudioElement | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);

  const today = new Date();
  const currentHour = today.getHours();

  // Lời chào động giàu cảm xúc theo buổi trong ngày
  const timeGreeting =
    currentHour < 12
      ? "Sớm mai an lành"
      : currentHour < 18
      ? "Một chiều an yên"
      : "Đêm về tĩnh lặng";

  const timeSubtext =
    currentHour < 12
      ? "Dành một khoảnh khắc tĩnh tại buổi sớm để lắng nghe chính mình trước khi bắt đầu ngày mới."
      : currentHour < 18
      ? "Chậm lại một nhịp giữa bộn bề công việc, thả lỏng đôi vai và nạp lại năng lượng bình an."
      : "Khép lại một ngày dài, gửi gắm tâm sự và tìm về chốn an trú thanh tịnh cho tâm hồn.";

  const localDateISO = [
    today.getFullYear(),
    String(today.getMonth() + 1).padStart(2, "0"),
    String(today.getDate()).padStart(2, "0"),
  ].join("-");

  const formattedDate = today.toLocaleDateString("vi-VN", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });

  // Web Audio chuông thiền
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

  const activities = [
    {
      title: "Khám phá văn hóa Việt",
      description:
        "Tìm hiểu những câu chuyện, tín ngưỡng Thờ Mẫu và di sản ba miền Bắc - Trung - Nam.",
      icon: BookOpen,
      image: "/images/do_paper_still_life.jpg",
      onClick: onGoToCulture,
      buttonLabel: "Dạo cảnh di sản",
    },
    {
      title: "Trải nghiệm thực hành số",
      description:
        "Xin xăm Quan Âm, thả hoa đăng số cầu an hoặc thắp nén nhang tri ân gia tiên.",
      icon: Compass,
      image: "/images/tea_bowl.jpg",
      onClick: onGoToExperience,
      buttonLabel: "Vào trải nghiệm",
    },
    {
      title: "Khoảng nghỉ thiền tịnh",
      description:
        "Tạm gác âu lo và dành vài phút thư giãn cùng chuông thiền và tiếng thở dịu êm.",
      icon: Wind,
      image: "/images/zen_meditation.jpg",
      onClick: onGoToZen,
      buttonLabel: "Không gian thiền",
    },
  ];

  type CulturalTopicId = (typeof CULTURAL_TOPICS)[number]["id"];

  const topicSuggestions: Record<
    CulturalTopicId,
    {
      title: string;
      description: string;
      buttonLabel: string;
      onClick: () => void;
    }
  > = {
    cadao: {
      title: "Một lời chiêm nghiệm",
      description:
        "Bắt đầu từ cảm xúc của bạn để nhận góc nhìn tích cực từ kho tàng dân gian.",
      buttonLabel: "Chọn tâm trạng",
      onClick: onSelectMoodClick,
    },
    xinxam: {
      title: "Xin xăm theo chủ đề",
      description:
        "Chọn vùng và chủ đề để trải nghiệm rút một quẻ thẻ chiêm nghiệm an lành.",
      buttonLabel: "Mở xin xăm",
      onClick: onGoToXinXam,
    },
    bamien: {
      title: "Khám phá văn hóa ba miền",
      description:
        "Dạo bước qua kho tàng phong tục, lễ hội và tín ngưỡng bản địa đặc sắc.",
      buttonLabel: "Chọn vùng văn hóa",
      onClick: onGoToCultureMap,
    },
    nghile: {
      title: "Phong tục và nghi lễ",
      description:
        "Cẩm nang nghi thức chuẩn mực, giải nghĩa phong tục cổ truyền khoa học.",
      buttonLabel: "Mở cẩm nang",
      onClick: onGoToRituals,
    },
    trian: {
      title: "Gửi một lời tri ân",
      description:
        "Viết lời biết ơn hoặc dành một khoảng nhỏ lắng đọng nhớ về nguồn cội.",
      buttonLabel: "Mở góc tri ân",
      onClick: onGoToGratitude,
    },
  };

  const validTopicIds = sanitizeCulturalTopics(
    selectedTopics
  ) as CulturalTopicId[];

  const preferredSuggestions = validTopicIds.slice(0, 3).map((id) => ({
    id,
    ...topicSuggestions[id],
  }));

  return (
    <div className="screen-shell">
      <main className="page-container max-w-6xl py-6 sm:py-8">
        {/* ========================================================= */}
        {/* 1. HEADER NGÀY MỚI CÓ LỜI CHÀO ĐỘNG & NÚT THỈNH CHUÔNG     */}
        {/* ========================================================= */}
        <header className="mb-8">
          <div className="today-header-row">
            <div className="inline-flex items-center gap-2 text-xs sm:text-sm text-muted">
              <Calendar className="w-4 h-4 text-accent" />
              <time dateTime={localDateISO} className="font-medium text-ink capitalize">
                {formattedDate}
              </time>
              <span className="text-line">•</span>
              <span className="text-accent font-medium">Trạm dừng tĩnh tại</span>
            </div>

            {/* Nút Thỉnh chuông thiền sớm */}
            <button
              type="button"
              onClick={handleRingBell}
              className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-amber-700/25 bg-amber-500/8 hover:bg-amber-500/15 text-xs sm:text-sm font-medium text-amber-900 dark:text-amber-200 transition-all cursor-pointer shadow-xs ${
                bellRinging ? "scale-105 border-amber-600 bg-amber-500/20" : ""
              }`}
              title="Thỉnh chuông tĩnh tâm"
            >
              <Bell className={`w-3.5 h-3.5 ${bellRinging ? "animate-bounce text-amber-600" : ""}`} />
              <span>Thỉnh chuông sớm</span>
            </button>
          </div>

          <h1
            tabIndex={-1}
            className="font-display text-3xl sm:text-4xl lg:text-5xl font-semibold text-ink tracking-tight mb-2 flex items-center flex-wrap outline-none focus:outline-none focus-visible:outline-none focus:ring-0"
          >
            <span className="today-seal-badge" title="Dấu ấn An">
              安
            </span>
            <span>{timeGreeting}</span>
          </h1>

          <p className="text-base text-muted leading-relaxed max-w-2xl">
            {timeSubtext}
          </p>
        </header>

        {/* ========================================================= */}
        {/* 2. KHU VỰC TRỌNG TÂM: ĐÃ CHECK-IN HOẶC CHƯA CHECK-IN       */}
        {/* ========================================================= */}
        {isCheckedIn ? (
          /* TRƯỜNG HỢP A: BỨC TRƯỚNG THƯ PHÁP CA DAO CHIÊM NGHIỆM */
          <section
            aria-labelledby="today-signal-title"
            className="today-scroll-card"
          >
            <div className="today-scroll-golden-rim" aria-hidden="true" />

            <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent font-semibold text-xs sm:text-sm tracking-wide">
                <Flower2 className="w-3.5 h-3.5" aria-hidden="true" />
                <h2 id="today-signal-title" className="font-medium">
                  Lời chiêm nghiệm hôm nay
                </h2>
              </div>

              <span className="inline-flex items-center gap-1.5 rounded-full bg-accent text-on-accent px-3 py-1 text-xs font-semibold shadow-xs">
                <Sparkles className="w-3 h-3 text-amber-200" aria-hidden="true" />
                <span>Tâm trạng: {mood}</span>
              </span>
            </div>

            {/* Hai câu ca dao thư pháp trang nhã */}
            <blockquote className="today-poem-quote">
              <p className="mb-1">{signal.poem.line1}</p>
              <p>{signal.poem.line2}</p>
            </blockquote>

            <p className="text-sm sm:text-base text-muted italic max-w-2xl leading-relaxed mt-2">
              {signal.poem.subtext}
            </p>

            {/* Thẻ Một việc nhỏ nuôi dưỡng tâm an */}
            <div className="today-action-box">
              <div className="flex items-start gap-3">
                {isActionDone ? (
                  <div className="w-8 h-8 rounded-full bg-success/15 border border-success/30 flex items-center justify-center text-success shrink-0 mt-0.5">
                    <CheckCircle2 className="w-4 h-4" aria-hidden="true" />
                  </div>
                ) : (
                  <div className="w-8 h-8 rounded-full bg-accent/12 border border-accent/25 flex items-center justify-center text-accent shrink-0 mt-0.5">
                    <Flower2 className="w-4 h-4" aria-hidden="true" />
                  </div>
                )}

                <div className="flex-1">
                  <p className="text-xs font-semibold text-accent uppercase tracking-wider mb-0.5">
                    {isActionDone
                      ? "Đã hoàn thành hôm nay"
                      : `Gợi ý thực hành · ${signal.action.duration}`}
                  </p>
                  <p className="text-base font-semibold text-ink leading-snug">
                    {signal.action.title}
                  </p>
                </div>
              </div>
            </div>

            {/* Các nút hành động */}
            <div className="flex flex-col sm:flex-row gap-3.5 mt-6">
              <button
                type="button"
                onClick={onViewSignalDetails}
                className="today-primary-btn group"
              >
                <span className="today-btn-sheen" />
                <span>
                  {isActionDone
                    ? "Xem lại lời chiêm nghiệm"
                    : "Đọc tiếp và thực hành"}
                </span>
                <ArrowRight
                  className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </button>

              <Button
                type="button"
                variant="outline"
                size="default"
                onClick={onSelectMoodClick}
                className="hover:border-accent/40"
              >
                Cập nhật lại tâm trạng
              </Button>
            </div>
          </section>
        ) : (
          /* TRƯỜNG HỢP B: BÀN TRÀ SỚM MỜI GỌI CHECK-IN */
          <section
            aria-labelledby="today-checkin-title"
            className="today-tea-intro-card grid grid-cols-1 md:grid-cols-12"
          >
            <div className="md:col-span-7 p-6 sm:p-10 flex flex-col justify-center">
              <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-accent mb-3">
                <Flower2 className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Bắt đầu ngày mới từ cảm xúc</span>
              </div>

              <h2
                id="today-checkin-title"
                className="font-display text-2xl sm:text-3xl lg:text-4xl font-semibold text-ink leading-snug mb-3"
              >
                Hôm nay bạn đang cảm thấy thế nào?
              </h2>

              <p className="text-base text-muted leading-relaxed max-w-lg mb-6">
                Chạm vào cảm xúc để nhận một lời khuyên từ ca dao tục ngữ dân gian
                và một hành động nhỏ dịu dàng nuôi dưỡng tâm hồn bạn.
              </p>

              <div>
                <button
                  type="button"
                  onClick={onSelectMoodClick}
                  className="today-primary-btn group"
                >
                  <span className="today-btn-sheen" />
                  <span>Chọn tâm trạng ngay</span>
                  <ArrowRight
                    className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                    aria-hidden="true"
                  />
                </button>
              </div>

              <p className="mt-3.5 text-xs text-muted flex items-center gap-1.5">
                <Sparkles className="w-3 h-3 text-gold" />
                <span>Chỉ mất 1 phút · Không bắt buộc đăng nhập</span>
              </p>
            </div>

            <div className="hidden md:block md:col-span-5 relative overflow-hidden">
              <img
                src="/images/tea_bowl.jpg"
                alt="Chén trà trong không gian yên tĩnh thanh tịnh"
                className="w-full h-full min-h-[19rem] object-cover transition-transform duration-700 hover:scale-103"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-surface via-transparent to-transparent pointer-events-none" />
            </div>
          </section>
        )}

        {/* Nhắc lịch cá nhân nếu có */}
        <div className="mt-7">
          <TodayReminderCard
            email={currentUserEmail}
            onOpenReminders={onGoToReminders}
          />
        </div>

        {/* ========================================================= */}
        {/* 3. THEO CHỦ ĐỀ QUAN TÂM (NẾU CÓ CÀI ĐẶT)                   */}
        {/* ========================================================= */}
        {preferredSuggestions.length > 0 && (
          <section
            aria-labelledby="today-preferred-title"
            className="mt-10 sm:mt-12"
          >
            <div className="mb-5">
              <h2
                id="today-preferred-title"
                className="font-display text-xl sm:text-2xl font-semibold text-ink"
              >
                Gợi ý theo chủ đề bạn yêu thích
              </h2>
              <p className="text-sm sm:text-base text-muted mt-1">
                Nội dung được cá nhân hóa dựa trên sở thích bạn đã chọn trong Cài đặt.
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              {preferredSuggestions.map((suggestion) => (
                <article
                  key={suggestion.id}
                  className="today-heritage-card p-6"
                >
                  <CornerOrnament className="today-card-corner today-card-corner--tl" />
                  <CornerOrnament className="today-card-corner today-card-corner--br" />

                  <div>
                    <h3 className="font-display text-lg font-semibold text-ink mb-2">
                      {suggestion.title}
                    </h3>
                    <p className="text-sm text-muted leading-relaxed mb-5">
                      {suggestion.description}
                    </p>
                  </div>

                  <Button
                    type="button"
                    variant="outline"
                    onClick={suggestion.onClick}
                    className="w-full justify-between hover:border-accent/40"
                  >
                    <span>{suggestion.buttonLabel}</span>
                    <ArrowRight className="h-4 w-4 text-accent" aria-hidden="true" />
                  </Button>
                </article>
              ))}
            </div>
          </section>
        )}

        {/* ========================================================= */}
        {/* 4. BA HÀNH TRÌNH TĨNH TẠI — THẺ BÀI CỔ PHONG               */}
        {/* ========================================================= */}
        <section
          aria-labelledby="today-explore-title"
          className="mt-10 sm:mt-14"
        >
          <div className="mb-6">
            <h2
              id="today-explore-title"
              className="font-display text-xl sm:text-2xl font-semibold text-ink mb-1.5"
            >
              Bạn muốn dành thời gian cho điều gì?
            </h2>
            <p className="text-sm sm:text-base text-muted">
              Tự do dạo cảnh và trải nghiệm văn hóa bất cứ lúc nào trong ngày.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {activities.map((activity) => {
              const Icon = activity.icon;

              return (
                <article
                  key={activity.title}
                  className="today-heritage-card"
                >
                  <CornerOrnament className="today-card-corner today-card-corner--tl" />
                  <CornerOrnament className="today-card-corner today-card-corner--br" />

                  {activity.image && (
                    <div className="today-card-image-box">
                      <img
                        src={activity.image}
                        alt=""
                        loading="lazy"
                        decoding="async"
                      />
                    </div>
                  )}

                  <div className="flex flex-1 flex-col p-6">
                    <div className="flex items-center gap-2 mb-2.5">
                      <div className="w-8 h-8 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center text-accent shrink-0">
                        <Icon className="w-4 h-4" aria-hidden="true" />
                      </div>
                      <h3 className="font-display text-lg font-semibold text-ink">
                        {activity.title}
                      </h3>
                    </div>

                    <p className="text-sm text-muted leading-relaxed mb-5">
                      {activity.description}
                    </p>

                    <Button
                      type="button"
                      variant="outline"
                      onClick={activity.onClick}
                      className="mt-auto w-full justify-between hover:border-accent hover:bg-surface-soft"
                    >
                      <span>{activity.buttonLabel}</span>
                      <ArrowRight className="w-4 h-4 text-accent" aria-hidden="true" />
                    </Button>
                  </div>
                </article>
              );
            })}
          </div>
        </section>
      </main>
    </div>
  );
};

const CornerOrnament: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M4 20V8a4 4 0 0 1 4-4h12" />
    <circle cx="8" cy="8" r="1.5" fill="currentColor" />
  </svg>
);
