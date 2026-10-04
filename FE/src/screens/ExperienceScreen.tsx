import React from "react";
import {
  ArrowRight,
  Compass,
  Flower2,
  Heart,
  Landmark,
  PenLine,
  ScrollText,
  Sparkles,
  Wind,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { Button } from "@/src/components/ui/button";

interface ExperienceScreenProps {
  onGoToXinXam: () => void;
  onGoToWish: () => void;
  onGoToZen: () => void;
  onGoToGratitude: () => void;
  onGoToXinKeo: () => void;
  onGoToAstrology: () => void;
  onGoToSanctuary: () => void;
  onGoToCulture: () => void;
}

interface ExperienceItem {
  id: string;
  title: string;
  description: string;
  label: string;
  icon: LucideIcon;
  onClick: () => void;
}

interface ExperienceGroup {
  id: string;
  title: string;
  description: string;
  items: ExperienceItem[];
}

export const ExperienceScreen: React.FC<
  ExperienceScreenProps
> = ({
  onGoToXinXam,
  onGoToWish,
  onGoToZen,
  onGoToGratitude,
  onGoToXinKeo,
  onGoToAstrology,
  onGoToSanctuary,
  onGoToCulture,
}) => {
  const groups: ExperienceGroup[] = [
    {
      id: "quiet-moments",
      title: "Một khoảng nghỉ cho mình",
      description:
        "Chọn một thực hành nhẹ nhàng, theo cách bạn thấy thoải mái.",
      items: [
        {
          id: "zen",
          title: "Thiền ngắn",
          description:
            "Dành vài phút chú ý đến hơi thở trong một không gian yên tĩnh.",
          label: "Mở phiên thiền",
          icon: Wind,
          onClick: onGoToZen,
        },
        {
          id: "wish",
          title: "Lời nguyện",
          description:
            "Viết điều bạn đang mong mỏi và chọn giữ lại hoặc để nó đi.",
          label: "Viết lời nguyện",
          icon: PenLine,
          onClick: onGoToWish,
        },
        {
          id: "gratitude",
          title: "Một lời biết ơn",
          description:
            "Dành một lời tri ân cho người hoặc điều bạn trân quý.",
          label: "Gửi lời tri ân",
          icon: Heart,
          onClick: onGoToGratitude,
        },
      ],
    },
    {
      id: "cultural-reflection",
      title: "Chiêm nghiệm qua văn hóa",
      description:
        "Tiếp cận những biểu tượng dân gian như một lời gợi mở để tự suy ngẫm.",
      items: [
        {
          id: "xinxam",
          title: "Xin xăm văn hóa",
          description:
            "Chọn vùng và chủ đề, nhận một thẻ lời cùng gợi ý thực hành.",
          label: "Bắt đầu xin xăm",
          icon: ScrollText,
          onClick: onGoToXinXam,
        },
        {
          id: "xinkeo",
          title: "Xin keo",
          description:
            "Khám phá một tương tác mô phỏng dân gian và đọc lời chiêm nghiệm.",
          label: "Trải nghiệm xin keo",
          icon: Compass,
          onClick: onGoToXinKeo,
        },
      ],
    },
    {
      id: "spaces-and-symbols",
      title: "Không gian và biểu tượng",
      description:
        "Khám phá theo sở thích; bạn không cần thực hành tín ngưỡng để sử dụng sản phẩm.",
      items: [
        {
          id: "sanctuary",
          title: "Không gian gia tiên và tưởng niệm",
          description:
            "Mở các không gian hướng về cội nguồn và người bạn muốn nhớ.",
          label: "Xem các không gian",
          icon: Landmark,
          onClick: onGoToSanctuary,
        },
        {
          id: "astrology",
          title: "Biểu tượng ngày sinh",
          description:
            "Đối chiếu ngày sinh với lịch âm, can chi và ngũ hành để đọc một lời chiêm nghiệm.",
          label: "Khám phá ngày sinh",
          icon: Sparkles,
          onClick: onGoToAstrology,
        },
      ],
    },
  ];

  return (
    <div className="screen-shell">
      <main className="page-container max-w-6xl">
        <header className="mb-8 sm:mb-10 max-w-3xl">
          <div className="flex items-center gap-2 text-sm text-accent mb-3">
            <Flower2 className="w-4 h-4" aria-hidden="true" />
            <span>Chọn một trải nghiệm</span>
          </div>

          <h1 className="page-title mb-3">
            Dành thời gian cho điều bạn cần
          </h1>

          <p className="text-base text-muted leading-relaxed">
            Một khoảng nghỉ, một lời gửi gắm hay một góc nhìn
            văn hóa. Bạn có thể bắt đầu ngay, không cần chọn
            tâm trạng trước.
          </p>
        </header>

        <div className="space-y-9 sm:space-y-12">
          {groups.map((group) => (
            <section
              key={group.id}
              aria-labelledby={`${group.id}-title`}
            >
              <div className="mb-4">
                <h2
                  id={`${group.id}-title`}
                  className="font-display text-xl sm:text-2xl font-semibold text-ink mb-2"
                >
                  {group.title}
                </h2>

                <p className="text-sm sm:text-base text-muted leading-relaxed max-w-3xl">
                  {group.description}
                </p>
              </div>

              <div
                className={[
                  "grid grid-cols-1 sm:grid-cols-2 gap-4",
                  group.items.length === 3
                    ? "lg:grid-cols-3"
                    : "",
                ].join(" ")}
              >
                {group.items.map((item) => {
                  const Icon = item.icon;

                  return (
                    <article
                      key={item.id}
                      className="flex flex-col rounded-xl border border-line bg-surface p-5 sm:p-6"
                    >
                      <div
                        aria-hidden="true"
                        className="w-11 h-11 rounded-xl bg-accent-soft text-accent flex items-center justify-center mb-4"
                      >
                        <Icon className="w-5 h-5" />
                      </div>

                      <h3 className="font-display text-xl font-semibold text-ink mb-2">
                        {item.title}
                      </h3>

                      <p className="text-sm sm:text-base text-muted leading-relaxed mb-5">
                        {item.description}
                      </p>

                      <Button
                        type="button"
                        variant="outline"
                        onClick={item.onClick}
                        className="mt-auto w-full justify-between"
                      >
                        <span>{item.label}</span>
                        <ArrowRight
                          className="w-4 h-4"
                          aria-hidden="true"
                        />
                      </Button>
                    </article>
                  );
                })}
              </div>
            </section>
          ))}
        </div>

        <section
          aria-labelledby="experience-culture-title"
          className="mt-9 sm:mt-12 rounded-xl border border-line bg-surface p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-5"
        >
          <div className="max-w-2xl">
            <h2
              id="experience-culture-title"
              className="font-display text-xl font-semibold text-ink mb-2"
            >
              Muốn hiểu thêm câu chuyện phía sau?
            </h2>

            <p className="text-sm sm:text-base text-muted leading-relaxed">
              Khám phá bài viết về phong tục, nghi lễ và văn
              hóa ba miền trước hoặc sau khi trải nghiệm.
            </p>
          </div>

          <Button
            type="button"
            onClick={onGoToCulture}
            className="w-full sm:w-auto shrink-0"
          >
            <span>Khám phá văn hóa</span>
            <ArrowRight
              className="w-4 h-4"
              aria-hidden="true"
            />
          </Button>
        </section>

        <p className="mt-5 text-sm text-muted leading-relaxed">
          Các trải nghiệm chiêm nghiệm không dự báo tương lai
          hay quyết định thay bạn.
        </p>
      </main>
    </div>
  );
};
