import React, { useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
} from "lucide-react";

import { Button } from "@/src/components/ui/button";
import { GoodDayLookupPanel } from "../components/GoodDayLookupPanel";

interface DayPlan {
  title: string;
  day: number;
  month: number;
  year: number;
}

interface GoodDayScreenProps {
  onBackToCulture: () => void;
  onGoToHome?: () => void;
  onGoToCalendar: () => void;
  onGoToRituals: () => void;
  onSaveDayToCalendar: (plan: DayPlan) => boolean;
}

export const GoodDayScreen: React.FC<GoodDayScreenProps> = ({
  onBackToCulture,
  onGoToCalendar,
  onGoToRituals,
  onSaveDayToCalendar,
}) => {
  const [dateValue, setDateValue] = useState("");
  const [title, setTitle] = useState("");
  const [saveStatus, setSaveStatus] = useState<
    "idle" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const resetStatus = () => {
    setSaveStatus("idle");
    setErrorMessage("");
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    resetStatus();

    const match = dateValue.match(
      /^(\d{4})-(\d{2})-(\d{2})$/
    );

    if (!match || !title.trim()) {
      setErrorMessage("Bạn hãy chọn ngày và nhập việc muốn ghi lại.");
      setSaveStatus("error");
      return;
    }

    const year = Number(match[1]);
    const month = Number(match[2]);
    const day = Number(match[3]);
    const date = new Date(year, month - 1, day);

    if (
      date.getFullYear() !== year ||
      date.getMonth() !== month - 1 ||
      date.getDate() !== day
    ) {
      setErrorMessage("Ngày đã chọn chưa hợp lệ.");
      setSaveStatus("error");
      return;
    }

    const saved = onSaveDayToCalendar({
      title: title.trim(),
      day,
      month,
      year,
    });

    if (!saved) {
      setErrorMessage(
        "Chưa lưu được ghi chú. Bạn hãy thử lại."
      );
      setSaveStatus("error");
      return;
    }

    setSaveStatus("success");
  };

  return (
    <div className="screen-shell">
      <main className="page-container max-w-3xl">
        <Button
          type="button"
          variant="ghost"
          onClick={onBackToCulture}
          className="mb-5"
        >
          <ArrowLeft className="w-4 h-4" aria-hidden="true" />
          <span>Khám phá văn hóa</span>
        </Button>

        <header className="mb-7">
          <h1 className="page-title mb-3">
            Ngày lành và việc bạn muốn chuẩn bị
          </h1>

          <p className="text-base text-muted leading-relaxed">
            Tìm hiểu cách nhìn về thời điểm trong văn hóa
            dân gian và chủ động chuẩn bị cho việc của mình.
          </p>
        </header>

        <GoodDayLookupPanel
          onSaveDayToCalendar={onSaveDayToCalendar}
          onGoToCalendar={onGoToCalendar}
        />

        <form
          onSubmit={handleSubmit}
          className="rounded-2xl border border-line bg-surface p-6 sm:p-8"
        >
          <div className="flex items-center gap-2 mb-5">
            <CalendarDays
              className="w-5 h-5 text-accent"
              aria-hidden="true"
            />
            <h2 className="font-display text-xl font-semibold text-ink">
              Ghi lại ngày dự định
            </h2>
          </div>

          <label
            htmlFor="planned-date"
            className="block text-sm font-semibold text-ink mb-2"
          >
            Ngày dương lịch
          </label>

          <input
            id="planned-date"
            type="date"
            required
            value={dateValue}
            onChange={(event) => {
              setDateValue(event.target.value);
              resetStatus();
            }}
            className="w-full min-w-0 rounded-control border border-line bg-canvas px-4 py-3 text-base text-ink mb-5"
          />

          <label
            htmlFor="planned-title"
            className="block text-sm font-semibold text-ink mb-2"
          >
            Việc bạn muốn chuẩn bị
          </label>

          <input
            id="planned-title"
            type="text"
            required
            maxLength={120}
            value={title}
            onChange={(event) => {
              setTitle(event.target.value);
              resetStatus();
            }}
            placeholder="Ví dụ: Gặp mặt gia đình"
            className="w-full rounded-control border border-line bg-canvas px-4 py-3 text-base text-ink"
          />

          <div
            aria-live="polite"
            aria-atomic="true"
            className="mt-4"
          >
            {saveStatus === "error" && (
              <p className="text-sm text-danger">
                {errorMessage}
              </p>
            )}

            {saveStatus === "success" && (
              <p className="text-sm text-success">
                Đã lưu ghi chú vào lịch trên trình duyệt này.
              </p>
            )}
          </div>

          <Button
            type="submit"
            disabled={saveStatus === "success"}
            className="mt-5 w-full sm:w-auto"
          >
            {saveStatus === "success"
              ? "Đã lưu ghi chú"
              : "Lưu ghi chú vào lịch"}
          </Button>

          <p className="mt-3 text-sm text-muted">
            Ghi chú không tạo lời nhắc tự động.
          </p>
        </form>

        <div className="flex flex-col sm:flex-row gap-3 mt-6">
          <Button
            type="button"
            variant="outline"
            onClick={onGoToCalendar}
          >
            <span>Mở lịch văn hóa</span>
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </Button>

          <Button
            type="button"
            variant="ghost"
            onClick={onGoToRituals}
          >
            Xem hướng dẫn nghi lễ
          </Button>
        </div>
      </main>
    </div>
  );
};
