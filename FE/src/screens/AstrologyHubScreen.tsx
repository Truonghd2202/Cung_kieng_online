import React from "react";
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
} from "lucide-react";

import { Button } from "@/src/components/ui/button";
import { BirthChartDemoPanel } from "../components/BirthChartDemoPanel";
import { PhysiognomyDemoPanel } from "../components/PhysiognomyDemoPanel";

interface AstrologyHubScreenProps {
  onBackToExperience: () => void;
  onGoToHoroscope: () => void;
}

export const AstrologyHubScreen: React.FC<
  AstrologyHubScreenProps
> = ({
  onBackToExperience,
  onGoToHoroscope,
}) => {
  return (
    <div className="screen-shell">
      <main className="page-container max-w-4xl">
        <Button
          type="button"
          variant="ghost"
          onClick={onBackToExperience}
          className="mb-5"
        >
          <ArrowLeft
            className="h-4 w-4"
            aria-hidden="true"
          />
          Trải nghiệm
        </Button>

        <header className="mb-7">
          <p className="mb-3 text-sm text-accent">
            Thời gian và biểu tượng dân gian
          </p>

          <h1 className="page-title mb-3">
            Khám phá biểu tượng ngày sinh
          </h1>

          <p className="max-w-2xl text-base leading-relaxed text-muted">
            Tìm hiểu cách ngày sinh được đối chiếu với
            lịch âm, can chi và ngũ hành trong bản thử nghiệm.
            Giữ lại điều phù hợp để tự suy ngẫm.
          </p>
        </header>

        <section
          aria-labelledby="birth-symbols-title"
          className="rounded-card border border-line bg-surface p-6 sm:p-8"
        >
          <div
            aria-hidden="true"
            className="mb-5 flex h-12 w-12 items-center justify-center rounded-panel bg-accent-soft text-accent"
          >
            <CalendarDays className="h-6 w-6" />
          </div>

          <h2
            id="birth-symbols-title"
            className="mb-3 font-display text-2xl font-semibold text-ink"
          >
            Một bản chiêm nghiệm từ ngày sinh
          </h2>

          <p className="text-base leading-relaxed text-muted">
            Nhập ngày sinh, giờ sinh nếu biết và vùng sinh.
            Bạn sẽ nhận thông tin đối chiếu cùng những
            câu hỏi gợi mở để suy ngẫm.
          </p>

          <ul className="mt-5 list-disc space-y-2 pl-5 text-sm leading-relaxed text-ink">
            <li>Ngày âm lịch, can chi năm và nạp âm.</li>
            <li>Biểu tượng mùa sinh, giờ sinh và vùng sinh.</li>
            <li>Lời chiêm nghiệm và câu hỏi tự suy ngẫm.</li>
          </ul>

          <Button
            type="button"
            onClick={onGoToHoroscope}
            className="mt-6 w-full sm:w-auto"
          >
            Nhập ngày sinh
            <ArrowRight
              className="h-4 w-4"
              aria-hidden="true"
            />
          </Button>

          <p className="mt-4 text-sm leading-relaxed text-muted">
            Bản thử nghiệm dùng quy tắc và nội dung biên soạn
            sẵn. Chưa có AI diễn giải hay lá số tử vi đầy đủ.
            Nội dung không dự đoán tương lai.
          </p>
        </section>
        <section
          aria-labelledby="astrology-scope-title"
          className="mt-6 rounded-card border border-line bg-surface p-6 sm:p-8"
        >
          <h2
            id="astrology-scope-title"
            className="font-display text-2xl font-semibold text-ink"
          >
            Các trải nghiệm trong nhóm tử vi
          </h2>

          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <article className="rounded-panel border border-line p-5">
              <h3 className="font-semibold text-ink">
                Lá số tử vi và diễn giải AI
              </h3>

              <p className="mt-2 text-sm leading-relaxed text-muted">
                Có thể thử luồng nhập thông tin và xem kết quả mẫu bên dưới.
                Chưa có tính toán lá số hoặc xử lý AI.
              </p>

              <a
                href="#birth-chart-demo-title"
                className="mt-3 inline-block py-2 text-sm font-semibold text-accent underline underline-offset-4"
              >
                Đến biểu mẫu demo
              </a>
            </article>

            <article className="rounded-panel border border-line p-5">
              <h3 className="font-semibold text-ink">
                Nhân tướng học bằng AI
              </h3>

              <p className="mt-2 text-sm leading-relaxed text-muted">
                Có thể thử chọn ảnh, xem trước và kiểm tra các trạng thái
                xử lý bên dưới. Chưa có phân tích AI.
              </p>

              <a
                href="#physiognomy-demo-title"
                className="mt-3 inline-block py-2 text-sm font-semibold text-accent underline underline-offset-4"
              >
                Đến biểu mẫu demo
              </a>
            </article>
          </div>

          <p className="mt-5 text-sm leading-relaxed text-muted">
            Bạn có thể sử dụng trải nghiệm biểu tượng ngày sinh ở trên.
            Kết quả hiện tại được tạo bằng quy tắc và nội dung biên soạn sẵn.
          </p>
        </section>

        <BirthChartDemoPanel />
        <PhysiognomyDemoPanel />
      </main>
    </div>
  );
};
