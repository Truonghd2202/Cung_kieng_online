import React from "react";
import {
  ArrowRight,
  CheckCircle2,
  Flower2,
  BookOpen,
  Wind,
  Compass,
} from "lucide-react";

import type { MoodKey, SignalData } from "../data/demoSignals";
import { Button } from "@/src/components/ui/button";

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
}

export const TodayScreen: React.FC<TodayScreenProps> = ({
  signal,
  isCheckedIn = false,
  isActionDone = false,
  mood = "Chênh vênh",
  onSelectMoodClick,
  onViewSignalDetails,
  onGoToCulture,
  onGoToExperience,
  onGoToZen,
}) => {
  const today = new Date();

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

  const activities = [
    {
      title: "Khám phá văn hóa Việt",
      description:
        "Tìm hiểu những câu chuyện, phong tục và không gian văn hóa ba miền.",
      icon: BookOpen,
      image: "/images/do_paper_still_life.jpg",
      onClick: onGoToCulture,
      buttonLabel: "Khám phá văn hóa",
    },
    {
      title: "Thử một trải nghiệm",
      description:
        "Chọn xin xăm, lời nguyện hoặc một thực hành phù hợp với bạn.",
      icon: Compass,
      image: "/images/tea_bowl.jpg",
      onClick: onGoToExperience,
      buttonLabel: "Xem trải nghiệm",
    },
    {
      title: "Dành một khoảng nghỉ",
      description:
        "Tạm rời nhịp vội và dành vài phút cho một phiên thiền ngắn.",
      icon: Wind,
      onClick: onGoToZen,
      buttonLabel: "Mở không gian thiền",
    },
  ];

  return (
    <div className="screen-shell">
      <main className="page-container max-w-6xl">
        <header className="mb-6 sm:mb-8">
          <p className="text-sm text-muted mb-3">
            <time dateTime={localDateISO}>
              {formattedDate}
            </time>
          </p>

          <h1 className="page-title mb-3">
            Một khoảng bình yên giữa ngày
          </h1>

          <p className="text-base text-muted leading-relaxed max-w-2xl">
            Lắng nghe mình một chút, hoặc bắt đầu từ một câu
            chuyện văn hóa bạn muốn khám phá.
          </p>
        </header>

        {isCheckedIn ? (
          <section
            aria-labelledby="today-signal-title"
            className="rounded-2xl border border-line bg-surface p-6 sm:p-8"
          >
            <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
              <div className="flex items-center gap-2 text-sm text-accent">
                <Flower2
                  className="w-4 h-4"
                  aria-hidden="true"
                />
                <h2
                  id="today-signal-title"
                  className="font-semibold"
                >
                  Lời chiêm nghiệm hôm nay
                </h2>
              </div>

              <span className="inline-flex items-center gap-2 rounded-full bg-accent-soft px-3 py-1.5 text-sm text-accent">
                <CheckCircle2
                  className="w-4 h-4"
                  aria-hidden="true"
                />
                {mood}
              </span>
            </div>

            <blockquote className="font-display font-semibold text-2xl sm:text-3xl text-ink leading-relaxed max-w-3xl">
              <p>{signal.poem.line1}</p>
              <p>{signal.poem.line2}</p>
            </blockquote>

            <p className="mt-4 text-sm text-muted">
              {signal.poem.subtext}
            </p>

            <div className="mt-6 pt-5 border-t border-line">
              <div className="flex items-start gap-3">
                {isActionDone ? (
                  <CheckCircle2
                    className="w-5 h-5 text-success shrink-0 mt-0.5"
                    aria-hidden="true"
                  />
                ) : (
                  <Flower2
                    className="w-5 h-5 text-accent shrink-0 mt-0.5"
                    aria-hidden="true"
                  />
                )}

                <div>
                  <p className="text-sm text-muted mb-1">
                    {isActionDone
                      ? "Bạn đã thực hiện"
                      : `Một việc nhỏ · ${signal.action.duration}`}
                  </p>
                  <p className="text-base font-semibold text-ink">
                    {signal.action.title}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 mt-6">
              <Button
                type="button"
                onClick={onViewSignalDetails}
              >
                <span>
                  {isActionDone
                    ? "Xem lại lời chiêm nghiệm"
                    : "Đọc tiếp và thực hành"}
                </span>
                <ArrowRight
                  className="w-4 h-4"
                  aria-hidden="true"
                />
              </Button>

              <Button
                type="button"
                variant="outline"
                onClick={onSelectMoodClick}
              >
                Cập nhật tâm trạng
              </Button>
            </div>
          </section>
        ) : (
          <section
            aria-labelledby="today-checkin-title"
            className="grid grid-cols-1 md:grid-cols-12 overflow-hidden rounded-2xl border border-line bg-surface"
          >
            <div className="md:col-span-7 p-6 sm:p-8">
              <div className="flex items-center gap-2 text-sm text-accent mb-4">
                <Flower2
                  className="w-4 h-4"
                  aria-hidden="true"
                />
                <span>Bắt đầu từ cảm xúc của bạn</span>
              </div>

              <h2
                id="today-checkin-title"
                className="font-display text-2xl sm:text-3xl font-semibold text-ink leading-snug mb-4"
              >
                Hôm nay bạn cảm thấy thế nào?
              </h2>

              <p className="text-base text-muted leading-relaxed max-w-lg">
                Chọn tâm trạng để nhận một lời chiêm nghiệm
                và một hành động nhỏ bạn có thể thử.
              </p>

              <Button
                type="button"
                onClick={onSelectMoodClick}
                className="mt-6 w-full sm:w-auto"
              >
                <span>Chọn tâm trạng</span>
                <ArrowRight
                  className="w-4 h-4"
                  aria-hidden="true"
                />
              </Button>

              <p className="mt-3 text-sm text-muted">
                Không cần đăng nhập để bắt đầu.
              </p>
            </div>

            <div className="hidden md:block md:col-span-5">
              <img
                src="/images/tea_bowl.jpg"
                alt="Chén trà trong một khoảng nghỉ yên tĩnh"
                className="w-full h-full min-h-72 object-cover"
              />
            </div>
          </section>
        )}

        <section
          aria-labelledby="today-explore-title"
          className="mt-9 sm:mt-12"
        >
          <div className="mb-5">
            <h2
              id="today-explore-title"
              className="font-display text-xl sm:text-2xl font-semibold text-ink mb-2"
            >
              Bạn muốn dành thời gian cho điều gì?
            </h2>
            <p className="text-base text-muted">
              Có thể khám phá ngay, không cần chọn tâm trạng trước.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {activities.map((activity) => {
              const Icon = activity.icon;

              return (
                <article
                  key={activity.title}
                  className="flex flex-col rounded-xl border border-line bg-surface overflow-hidden"
                >
                  {activity.image ? (
                    <img
                      src={activity.image}
                      alt=""
                      loading="lazy"
                      decoding="async"
                      className="hidden md:block w-full h-36 object-cover"
                    />
                  ) : (
                    <div
                      aria-hidden="true"
                      className="hidden md:flex h-36 items-center justify-center bg-accent-soft"
                    >
                      <Wind className="w-12 h-12 text-accent" />
                    </div>
                  )}

                  <div className="flex flex-1 flex-col p-5">
                    <div className="flex items-center gap-2 mb-3">
                      <Icon
                        className="w-5 h-5 text-accent shrink-0"
                        aria-hidden="true"
                      />
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
                      className="mt-auto w-full"
                    >
                      <span>{activity.buttonLabel}</span>
                      <ArrowRight
                        className="w-4 h-4"
                        aria-hidden="true"
                      />
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
