import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { Button } from "../components/ui/button";
import {
  getStorageKey,
  isValidAnniversaryDay,
  loadSettings,
  type ReminderSettings,
  type AnniversaryCalendar,
  type LeapPolicy,
  type MissingDayPolicy,
} from "../data/reminderData";
import {
  REMINDERS_CHANGED_EVENT,
  useReminderOverview,
} from "../hooks/useReminderOverview";
import { useReminderSettings } from "../hooks/useReminderSettings";

interface NotificationScreenProps {
  currentUserEmail?: string;
  onBack: () => void;
  onGoToCalendar: () => void;
}

function reminderValidationError(message: string): Error {
  const error = new Error(message);
  error.name = "ReminderValidationError";
  return error;
}

export function NotificationScreen({
  currentUserEmail,
  onBack,
  onGoToCalendar,
}: NotificationScreenProps) {
  const settings = useReminderSettings(currentUserEmail);

  const [name, setName] = useState("");
  const [dateInput, setDateInput] = useState("");
  const [calendar, setCalendar] =
    useState<AnniversaryCalendar>("solar");

  const [lunarDay, setLunarDay] = useState(1);
  const [lunarMonth, setLunarMonth] = useState(1);

  const [leapPolicy, setLeapPolicy] =
    useState<LeapPolicy>("regular");

  const [missingDayPolicy, setMissingDayPolicy] =
    useState<MissingDayPolicy>("skip");

  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  const upcoming = useReminderOverview(currentUserEmail);

  const commit = (
    update: (latest: ReminderSettings) => ReminderSettings
  ): boolean => {
    setError("");
    setNotice("");

    try {
      // Không dùng bản settings của lần render trước để ghi.
      const latest = loadSettings(currentUserEmail);
      const next = update(latest);

      localStorage.setItem(
        getStorageKey(currentUserEmail),
        JSON.stringify(next)
      );
    } catch (cause) {
      setError(
        cause instanceof Error &&
          cause.name === "ReminderValidationError"
          ? cause.message
          : "Chưa lưu được tùy chọn nhắc lịch. Bạn hãy thử lại."
      );

      return false;
    }

    window.dispatchEvent(
      new Event(REMINDERS_CHANGED_EVENT)
    );

    setNotice("Đã lưu thay đổi.");
    return true;
  };

  const addAnniversary = () => {
    setError("");
    setNotice("");

    const cleanName = name.trim();

    if (!cleanName || cleanName.length > 80) {
      setError("Nhập tên người tưởng nhớ, tối đa 80 ký tự.");
      return;
    }

    let month: number;
    let day: number;

    if (calendar === "solar") {
      if (!/^\d{4}-\d{2}-\d{2}$/.test(dateInput)) {
        setError("Bạn hãy chọn ngày dương lịch.");
        return;
      }

      const [year, inputMonth, inputDay] =
        dateInput.split("-").map(Number);

      const date = new Date(
        year,
        inputMonth - 1,
        inputDay,
        12
      );

      if (
        year < 1900 ||
        date.getFullYear() !== year ||
        date.getMonth() + 1 !== inputMonth ||
        date.getDate() !== inputDay
      ) {
        setError("Ngày chưa hợp lệ.");
        return;
      }

      const todayDate = new Date();
      todayDate.setHours(23, 59, 59, 999);

      if (date > todayDate) {
        setError("Ngày mất không được ở tương lai.");
        return;
      }

      month = inputMonth;
      day = inputDay;
    } else {
      month = lunarMonth;
      day = lunarDay;

      if (!isValidAnniversaryDay("lunar", month, day)) {
        setError("Ngày hoặc tháng âm lịch chưa hợp lệ.");
        return;
      }
    }

    const newId = crypto.randomUUID();

    const saved = commit((latest) => {
      if (latest.anniversaries.length >= 50) {
        throw reminderValidationError(
          "Bạn có thể lưu tối đa 50 ngày giỗ."
        );
      }

      const duplicate = latest.anniversaries.some(
        (item) =>
          item.name.toLocaleLowerCase("vi-VN") ===
            cleanName.toLocaleLowerCase("vi-VN") &&
          item.day === day &&
          item.month === month &&
          (item.calendar ?? "solar") === calendar
      );

      if (duplicate) {
        throw reminderValidationError(
          "Ngày giỗ này đã có. Bạn có thể bỏ nhắc mục cũ rồi thêm lại nếu muốn đổi quy tắc."
        );
      }

      return {
        ...latest,
        anniversaries: [
          ...latest.anniversaries,
          {
            id: newId,
            name: cleanName,
            month,
            day,
            calendar,
            leapPolicy:
              calendar === "lunar" ? leapPolicy : undefined,
            missingDayPolicy:
              calendar === "lunar"
                ? missingDayPolicy
                : undefined,
          },
        ],
      };
    });

    if (saved) {
      setName("");
      setDateInput("");
    }
  };

  return (
    <div className="screen-shell">
      <main className="page-container max-w-3xl">
        <Button
          type="button"
          variant="ghost"
          onClick={onBack}
          className="mb-5"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Quay lại
        </Button>

        <h1 className="page-title">Nhắc lịch</h1>

        <p className="mt-3 mb-6 text-muted leading-relaxed">
          Xem những ngày bạn muốn nhớ khi mở ứng dụng.
          Chưa gửi thông báo khi đóng web.
        </p>

        <section
          aria-label="Nhắc theo tháng âm lịch"
          className="mb-5 rounded-card border border-line bg-surface p-5"
        >
          <h2 className="mb-4 font-display text-xl font-bold text-ink">
            Nhắc theo tháng âm lịch
          </h2>

          <div className="space-y-4">
            <label className="flex items-center gap-3 text-ink">
              <input
                type="checkbox"
                checked={settings.firstDay}
                onChange={(event) => {
                  const checked = event.currentTarget.checked;

                  commit((latest) => ({
                    ...latest,
                    firstDay: checked,
                  }));
                }}
              />
              Mùng một
            </label>

            <label className="flex items-center gap-3 text-ink">
              <input
                type="checkbox"
                checked={settings.fullMoon}
                onChange={(event) => {
                  const checked = event.currentTarget.checked;

                  commit((latest) => ({
                    ...latest,
                    fullMoon: checked,
                  }));
                }}
              />
              Ngày rằm
            </label>
          </div>
        </section>

        <section
          aria-label="Ngày giỗ"
          className="mb-5 rounded-card border border-line bg-surface p-5"
        >
          <h2 className="font-display text-xl font-bold text-ink">
            Ngày giỗ
          </h2>

          <p className="mt-2 mb-4 text-sm text-muted leading-relaxed">
            Chọn âm lịch hoặc dương lịch theo cách gia đình bạn
            ghi nhớ ngày giỗ.
          </p>

          <form
            className="space-y-4"
            onSubmit={(event) => {
              event.preventDefault();
              addAnniversary();
            }}
          >
            <div>
              <label
                htmlFor="reminder-name"
                className="mb-2 block text-sm font-semibold text-ink"
              >
                Người tưởng nhớ
              </label>

              <input
                id="reminder-name"
                value={name}
                maxLength={80}
                required
                onChange={(event) => setName(event.target.value)}
                className="w-full rounded-panel border border-line bg-surface p-3 text-ink"
              />
            </div>

            <label className="block text-sm font-semibold text-ink">
              Loại lịch
              <select
                value={calendar}
                onChange={(event) =>
                  setCalendar(
                    event.target.value === "lunar" ? "lunar" : "solar"
                  )
                }
                className="mt-2 w-full rounded-panel border border-line bg-surface p-3 text-ink"
              >
                <option value="solar">Dương lịch</option>
                <option value="lunar">Âm lịch</option>
              </select>
            </label>

            {calendar === "solar" && (
              <div>
                <label
                  htmlFor="reminder-date"
                  className="mb-2 block text-sm font-semibold text-ink"
                >
                  Ngày mất — dương lịch
                </label>

                <input
                  id="reminder-date"
                  type="date"
                  min="1900-01-01"
                  value={dateInput}
                  required
                  onChange={(event) =>
                    setDateInput(event.target.value)
                  }
                  className="w-full rounded-panel border border-line bg-surface p-3 text-ink"
                />
              </div>
            )}

            {calendar === "lunar" && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <label className="text-sm font-semibold text-ink">
                    Ngày âm lịch
                    <select
                      value={lunarDay}
                      onChange={(event) =>
                        setLunarDay(Number(event.target.value))
                      }
                      className="mt-2 w-full rounded-panel border border-line bg-surface p-3 text-ink"
                    >
                      {Array.from({ length: 30 }, (_, index) => (
                        <option key={index + 1} value={index + 1}>
                          {index + 1}
                        </option>
                      ))}
                    </select>
                  </label>

                  <label className="text-sm font-semibold text-ink">
                    Tháng âm lịch
                    <select
                      value={lunarMonth}
                      onChange={(event) =>
                        setLunarMonth(Number(event.target.value))
                      }
                      className="mt-2 w-full rounded-panel border border-line bg-surface p-3 text-ink"
                    >
                      {Array.from({ length: 12 }, (_, index) => (
                        <option key={index + 1} value={index + 1}>
                          {index + 1}
                        </option>
                      ))}
                    </select>
                  </label>
                </div>

                <label className="block text-sm font-semibold text-ink">
                  Khi có tháng nhuận cùng số tháng
                  <select
                    value={leapPolicy}
                    onChange={(event) =>
                      setLeapPolicy(
                        event.target.value === "both"
                          ? "both"
                          : "regular"
                      )
                    }
                    className="mt-2 w-full rounded-panel border border-line bg-surface p-3 text-ink"
                  >
                    <option value="regular">Chỉ nhắc tháng thường</option>
                    <option value="both">
                      Nhắc cả tháng thường và tháng nhuận
                    </option>
                  </select>
                </label>

                {lunarDay === 30 && (
                  <label className="block text-sm font-semibold text-ink">
                    Nếu tháng chỉ có 29 ngày
                    <select
                      value={missingDayPolicy}
                      onChange={(event) =>
                        setMissingDayPolicy(
                          event.target.value === "last-day"
                            ? "last-day"
                            : "skip"
                        )
                      }
                      className="mt-2 w-full rounded-panel border border-line bg-surface p-3 text-ink"
                    >
                      <option value="skip">Bỏ qua tháng đó</option>
                      <option value="last-day">Nhắc vào ngày 29</option>
                    </select>
                  </label>
                )}

                <p className="text-xs leading-relaxed text-muted">
                  Các quy tắc này là tùy chọn của ứng dụng.
                  Bạn hãy chọn theo lệ gia đình.
                </p>
              </div>
            )}

            <Button type="submit">Thêm ngày giỗ</Button>
          </form>

          {settings.anniversaries.length > 0 && (
            <ul className="mt-5 divide-y divide-line">
              {settings.anniversaries.map((item) => (
                <li
                  key={item.id}
                  className="flex flex-wrap items-center justify-between gap-3 py-3"
                >
                  <div>
                    <span className="text-ink">
                      {item.name} · {item.day}/{item.month} ·{" "}
                      {item.calendar === "lunar" ? "Âm lịch" : "Dương lịch"}
                    </span>

                    {item.calendar === "lunar" && (
                      <small className="block text-xs text-muted">
                        {item.leapPolicy === "both"
                          ? "Nhắc cả tháng thường và nhuận"
                          : "Chỉ nhắc tháng thường"}
                        {item.day === 30 &&
                          (item.missingDayPolicy === "last-day"
                            ? " · Tháng thiếu nhắc ngày 29"
                            : " · Bỏ qua tháng thiếu")}
                      </small>
                    )}
                  </div>

                  <Button
                    type="button"
                    size="sm"
                    variant="outline"
                    aria-label={`Bỏ nhắc ngày giỗ của ${item.name}`}
                    onClick={() =>
                      commit((latest) => ({
                        ...latest,
                        anniversaries: latest.anniversaries.filter(
                          (entry) => entry.id !== item.id
                        ),
                      }))
                    }
                  >
                    Bỏ nhắc
                  </Button>
                </li>
              ))}
            </ul>
          )}
        </section>

        {error && (
          <p role="alert" className="mb-4 text-sm text-danger">
            {error}
          </p>
        )}

        {notice && (
          <p role="status" className="mb-4 text-sm text-success">
            {notice}
          </p>
        )}

        <section
          aria-label="Lịch sắp tới"
          className="rounded-card border border-line bg-surface p-5"
        >
          <h2 className="font-display text-xl font-bold text-ink">
            Trong 60 ngày tới
          </h2>

          {upcoming.length === 0 ? (
            <p className="mt-4 text-sm text-muted">
              Chưa có lời nhắc trong khoảng này. Bạn có thể
              bật rằm, mùng một hoặc thêm ngày giỗ.
            </p>
          ) : (
            <ul className="mt-4 divide-y divide-line">
              {upcoming.map((item) => (
                <li key={item.id} className="py-3">
                  <p className="font-semibold text-ink">
                    {item.title}
                  </p>
                  <p className="mt-1 text-sm text-muted">
                    {item.date.toLocaleDateString("vi-VN")} ·{" "}
                    {item.daysAway === 0
                      ? "Hôm nay"
                      : `Còn ${item.daysAway} ngày`}
                  </p>
                </li>
              ))}
            </ul>
          )}

          <Button
            type="button"
            variant="outline"
            className="mt-5"
            onClick={onGoToCalendar}
          >
            Mở lịch văn hóa
          </Button>
        </section>
      </main>
    </div>
  );
}
