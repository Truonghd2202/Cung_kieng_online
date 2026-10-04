import React from "react";
import {
  ArrowRight,
  BookOpen,
  Flower2,
  Heart,
  ScrollText,
} from "lucide-react";

import { Button } from "@/src/components/ui/button";

interface GuestScreenProps {
  onSelectMood: () => void;
  onGoToCulture: () => void;
  onGoToExperience: () => void;
}

export const GuestScreen: React.FC<GuestScreenProps> = ({
  onSelectMood,
  onGoToCulture,
  onGoToExperience,
}) => {
  return (
    <div className="screen-shell">
      <main className="page-container max-w-6xl">
        <section
          aria-labelledby="guest-intro-title"
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center"
        >
          <div className="lg:col-span-7">
            <div className="flex items-center gap-2 text-sm text-accent mb-4">
              <Flower2
                className="w-4 h-4"
                aria-hidden="true"
              />
              <span>Văn hóa Việt · Một khoảng nghỉ cho bạn</span>
            </div>

            <h1
              id="guest-intro-title"
              className="font-display text-4xl sm:text-5xl lg:text-6xl font-semibold text-ink leading-tight tracking-tight mb-5"
            >
              Chạm một chút văn hóa.
              <span className="block text-accent mt-2">
                Dành một chút cho mình.
              </span>
            </h1>

            <p className="text-base sm:text-lg text-muted leading-relaxed max-w-xl">
              Tin Lắm Tâm Linh đưa bạn đến những câu chuyện
              văn hóa dân gian Việt và những lời chiêm nghiệm
              nhẹ nhàng, bắt đầu từ cảm xúc hôm nay.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 mt-7">
              <Button
                type="button"
                size="lg"
                onClick={onSelectMood}
                className="w-full sm:w-auto"
              >
                <span>Chọn tâm trạng hôm nay</span>
                <ArrowRight
                  className="w-4 h-4"
                  aria-hidden="true"
                />
              </Button>

              <Button
                type="button"
                variant="outline"
                size="lg"
                onClick={onGoToCulture}
                className="w-full sm:w-auto"
              >
                <BookOpen
                  className="w-4 h-4"
                  aria-hidden="true"
                />
                <span>Khám phá văn hóa</span>
              </Button>
            </div>

            <p className="mt-4 text-sm text-muted">
              Không cần đăng nhập để bắt đầu.
              Bạn chọn cách trải nghiệm phù hợp với mình.
            </p>
          </div>

          <figure className="lg:col-span-5">
            <div className="overflow-hidden rounded-t-[8rem] rounded-b-2xl border border-line bg-surface">
              <img
                src="/images/tea_bowl.jpg"
                alt="Chén trà trong một không gian yên tĩnh"
                decoding="async"
                className="w-full h-52 sm:h-72 lg:h-[26rem] object-cover"
              />
            </div>

            <figcaption className="mt-3 text-sm text-muted">
              Một khoảng dừng nhỏ giữa nhịp sống thường ngày.
            </figcaption>
          </figure>
        </section>

        <section
          aria-labelledby="guest-how-it-works-title"
          className="mt-10 sm:mt-14"
        >
          <div className="mb-5">
            <h2
              id="guest-how-it-works-title"
              className="font-display text-2xl font-semibold text-ink mb-2"
            >
              Bạn có thể bắt đầu từ đây
            </h2>

            <p className="text-base text-muted leading-relaxed">
              Lắng nghe cảm xúc hoặc khám phá điều bạn tò mò.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <article className="rounded-xl border border-line bg-surface p-5 sm:p-6">
              <Heart
                className="w-5 h-5 text-accent mb-4"
                aria-hidden="true"
              />

              <h3 className="font-display text-xl font-semibold text-ink mb-2">
                Lắng nghe mình
              </h3>

              <p className="text-sm sm:text-base text-muted leading-relaxed">
                Chọn tâm trạng, nhận một lời chiêm nghiệm
                và thử một hành động nhỏ trong ngày.
              </p>
            </article>

            <article className="rounded-xl border border-line bg-surface p-5 sm:p-6">
              <BookOpen
                className="w-5 h-5 text-accent mb-4"
                aria-hidden="true"
              />

              <h3 className="font-display text-xl font-semibold text-ink mb-2">
                Hiểu thêm văn hóa Việt
              </h3>

              <p className="text-sm sm:text-base text-muted leading-relaxed">
                Khám phá những câu chuyện, phong tục và
                không gian văn hóa Bắc, Trung, Nam.
              </p>
            </article>

            <article className="rounded-xl border border-line bg-surface p-5 sm:p-6">
              <ScrollText
                className="w-5 h-5 text-accent mb-4"
                aria-hidden="true"
              />

              <h3 className="font-display text-xl font-semibold text-ink mb-2">
                Chọn một trải nghiệm
              </h3>

              <p className="text-sm sm:text-base text-muted leading-relaxed">
                Thử xin xăm văn hóa, viết lời nguyện,
                gửi lời biết ơn hoặc dành vài phút thiền.
              </p>
            </article>
          </div>
        </section>

        <section
          aria-labelledby="guest-experience-title"
          className="mt-8 sm:mt-10 rounded-xl border border-line bg-surface p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-5"
        >
          <div className="max-w-2xl">
            <h2
              id="guest-experience-title"
              className="font-display text-xl font-semibold text-ink mb-2"
            >
              Muốn thử một trải nghiệm trước?
            </h2>

            <p className="text-sm sm:text-base text-muted leading-relaxed">
              Bạn có thể mở danh mục và chọn trực tiếp,
              không cần check-in.
            </p>
          </div>

          <Button
            type="button"
            variant="outline"
            onClick={onGoToExperience}
            className="w-full sm:w-auto shrink-0"
          >
            <span>Xem các trải nghiệm</span>
            <ArrowRight
              className="w-4 h-4"
              aria-hidden="true"
            />
          </Button>
        </section>

        <p className="mt-5 text-sm text-muted leading-relaxed">
          Nội dung dành cho khám phá văn hóa và tự chiêm nghiệm,
          không dự báo tương lai hay quyết định thay bạn.
        </p>
      </main>
    </div>
  );
};
