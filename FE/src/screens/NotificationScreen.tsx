import React from "react";
import {
  ArrowLeft,
  ArrowRight,
  Bell,
  CalendarDays,
} from "lucide-react";

import { Button } from "@/src/components/ui/button";

interface NotificationScreenProps {
  onBack: () => void;
  onGoToCalendar: () => void;
}

export const NotificationScreen: React.FC<
  NotificationScreenProps
> = ({ onBack, onGoToCalendar }) => {
  return (
    <div className="screen-shell">
      <main className="page-container max-w-3xl">
        <Button
          type="button"
          variant="ghost"
          onClick={onBack}
          className="mb-5"
        >
          <ArrowLeft
            className="w-4 h-4"
            aria-hidden="true"
          />
          <span>Góc của tôi</span>
        </Button>

        <header className="mb-7">
          <h1 className="page-title mb-3">
            Thông báo
          </h1>

          <p className="text-base text-muted leading-relaxed">
            Nơi dành cho các thông báo và lời nhắc khi
            chức năng này được triển khai.
          </p>
        </header>

        <section
          aria-labelledby="notification-status-title"
          className="rounded-2xl border border-line bg-surface p-6 sm:p-8"
        >
          <div
            aria-hidden="true"
            className="w-14 h-14 rounded-full bg-accent-soft text-accent flex items-center justify-center mb-5"
          >
            <Bell className="w-6 h-6" />
          </div>

          <h2
            id="notification-status-title"
            className="font-display text-2xl font-semibold text-ink mb-3"
          >
            Nhắc lịch tự động chưa hoạt động
          </h2>

          <p className="text-base text-muted leading-relaxed">
            Bản thử nghiệm chưa tạo thông báo theo ngày
            văn hóa, ngày tưởng niệm hoặc giờ check-in.
            Bạn chưa cần cấp quyền thông báo.
          </p>
        </section>

        <section
          aria-labelledby="notification-calendar-title"
          className="mt-5 rounded-2xl border border-line bg-surface p-6 sm:p-8"
        >
          <div className="flex items-center gap-2 mb-3">
            <CalendarDays
              className="w-5 h-5 text-accent"
              aria-hidden="true"
            />
            <h2
              id="notification-calendar-title"
              className="font-display text-xl font-semibold text-ink"
            >
              Ghi lại ngày bạn muốn nhớ
            </h2>
          </div>

          <p className="text-base text-muted leading-relaxed">
            Bạn có thể thêm ghi chú vào lịch văn hóa và
            mở lại trên trình duyệt này. Ghi chú chưa tạo
            lời nhắc tự động.
          </p>

          <Button
            type="button"
            onClick={onGoToCalendar}
            className="mt-5 w-full sm:w-auto"
          >
            <span>Mở lịch và thêm ghi chú</span>
            <ArrowRight
              className="w-4 h-4"
              aria-hidden="true"
            />
          </Button>
        </section>
      </main>
    </div>
  );
};
