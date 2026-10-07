import { useState } from "react";
import {
  ArrowLeft,
  Bell,
  Calendar,
  Sparkles,
  Heart,
  Plus,
  Trash2,
  CheckCircle2,
  Clock,
  Flower2,
  Info,
} from "lucide-react";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Card } from "../components/ui/card";
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

export function NotificationScreen({
  currentUserEmail,
  onBack,
  onGoToCalendar,
}: NotificationScreenProps) {
  const settings = useReminderSettings(currentUserEmail);

  const [name, setName] = useState("");
  const [dateInput, setDateInput] = useState("");
  const [calendar, setCalendar] = useState<AnniversaryCalendar>("lunar");

  const [lunarDay, setLunarDay] = useState(1);
  const [lunarMonth, setLunarMonth] = useState(1);

  const [leapPolicy, setLeapPolicy] = useState<LeapPolicy>("regular");
  const [missingDayPolicy, setMissingDayPolicy] = useState<MissingDayPolicy>("last-day");

  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  const upcoming = useReminderOverview(currentUserEmail);

  const commit = (
    update: (latest: ReminderSettings) => ReminderSettings
  ): boolean => {
    setError("");
    setNotice("");

    try {
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

    window.dispatchEvent(new Event(REMINDERS_CHANGED_EVENT));
    setNotice("Đã lưu thay đổi nếp nhà thành công.");
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

    let itemDay: number;
    let itemMonth: number;
    let itemYear: number | undefined;

    if (calendar === "solar") {
      const parts = dateInput.split("-").map(Number);
      if (parts.length !== 3) {
        setError("Vui lòng chọn ngày dương lịch hợp lệ.");
        return;
      }
      itemYear = parts[0];
      itemMonth = parts[1];
      itemDay = parts[2];
    } else {
      itemDay = lunarDay;
      itemMonth = lunarMonth;
    }

    const newItem = {
      id: crypto.randomUUID(),
      name: cleanName,
      calendar,
      day: itemDay,
      month: itemMonth,
      year: itemYear,
      leapPolicy,
      missingDayPolicy,
    };

    const saved = commit((latest) => ({
      ...latest,
      anniversaries: [newItem, ...latest.anniversaries],
    }));

    if (saved) {
      setName("");
      setDateInput("");
    }
  };

  return (
    <div className="screen-shell">
      <main className="page-container max-w-4xl">
        {/* Top Breadcrumb Nav */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 text-xs text-stone-600 dark:text-stone-400">
          <button
            type="button"
            onClick={onBack}
            className="inline-flex items-center gap-1.5 hover:text-amber-800 dark:hover:text-amber-300 font-medium cursor-pointer transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Quay lại Góc của tôi</span>
          </button>

          <Badge
            variant="outline"
            className="text-xs px-3 py-0.5 border-amber-500/40 text-amber-800 dark:text-amber-300 bg-amber-500/10 font-medium self-start sm:self-auto"
          >
            ✦ UỐNG NƯỚC NHỚ NGUỒN · VẸN TRÒN ĐẠO HIẾU
          </Badge>
        </div>

        {/* Hero Magazine Section */}
        <section className="mb-8 p-6 sm:p-8 rounded-3xl border border-amber-500/30 bg-gradient-to-br from-surface via-surface to-amber-500/[0.04] shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-bl from-amber-500/10 to-transparent pointer-events-none rounded-bl-full" />

          <div className="relative z-10 space-y-3">
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-bold uppercase tracking-widest text-amber-800 dark:text-amber-300">
                CHUÔNG NHẮC NẾP NHÀ & DẤU MỐC TƯỞNG NHỚ
              </span>
              <span className="text-xs text-stone-400">·</span>
              <span className="text-xs text-stone-500">Giữ Gìn Đạo Hiếu</span>
            </div>

            <h1 className="page-title font-display text-2xl sm:text-3xl font-bold text-ink">
              Nhắc Lịch Nếp Nhà & Ngày Giỗ Tiên Tổ
            </h1>

            <p className="text-xs sm:text-sm text-stone-700 dark:text-stone-300 leading-relaxed max-w-2xl">
              “Chim có tổ, người có tông”. Đặt lời nhắc những dịp sóc vọng, ngày giỗ chạp và tiết lễ quan trọng
              để gia đình chủ động chuẩn bị mâm cúng thanh tịnh, nén hương thơm tưởng nhớ cội nguồn.
            </p>
          </div>
        </section>

        {notice && (
          <div role="status" className="mb-6 p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/25 text-xs text-emerald-800 dark:text-emerald-300 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{notice}</span>
          </div>
        )}

        {error && (
          <div role="alert" className="mb-6 p-4 rounded-2xl bg-red-500/10 border border-red-500/25 text-xs text-red-700 flex items-center gap-2">
            <Info className="w-4 h-4 text-red-600 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <div className="space-y-6">
          {/* Card 1: Nhắc chu kỳ Sóc Vọng (Mùng 1 & Rằm) */}
          <section className="p-6 rounded-3xl border border-line bg-surface shadow-xs">
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-line">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-amber-500/15 flex items-center justify-center text-amber-800 dark:text-amber-300">
                  <Flower2 className="w-4 h-4" />
                </div>
                <div>
                  <h2 className="font-display font-bold text-base sm:text-lg text-ink">
                    Nhắc chu kỳ Sóc Vọng (Hàng tháng)
                  </h2>
                  <p className="text-xs text-stone-500">
                    Bật thông báo gợi ý ngày Mùng Một và ngày Rằm âm lịch
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <label className="flex items-start gap-3 p-3.5 rounded-2xl bg-surface-soft border border-line cursor-pointer hover:border-amber-500/40 transition-colors">
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
                  className="mt-0.5 rounded text-amber-600 focus:ring-amber-500"
                />
                <div>
                  <span className="font-bold text-ink block">Mùng Một sớm mai (Lễ Sóc)</span>
                  <span className="text-stone-500 text-[11px] leading-relaxed">
                    Nhắc thay chén nước thanh tịnh, thắp nén hương trầm cầu tháng mới bình an.
                  </span>
                </div>
              </label>

              <label className="flex items-start gap-3 p-3.5 rounded-2xl bg-surface-soft border border-line cursor-pointer hover:border-amber-500/40 transition-colors">
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
                  className="mt-0.5 rounded text-amber-600 focus:ring-amber-500"
                />
                <div>
                  <span className="font-bold text-ink block">Đêm Rằm tròn trăng (Lễ Vọng)</span>
                  <span className="text-stone-500 text-[11px] leading-relaxed">
                    Nhắc ngày trăng tròn sum họp gia đình, dâng hoa quả tươi và ăn bữa cơm chay nhẹ nhàng.
                  </span>
                </div>
              </label>
            </div>
          </section>

          {/* Card 2: Thêm ngày giỗ tưởng nhớ gia tiên */}
          <section className="p-6 rounded-3xl border border-line bg-surface shadow-xs">
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-line">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-amber-500/15 flex items-center justify-center text-amber-800 dark:text-amber-300">
                  <Heart className="w-4 h-4" />
                </div>
                <div>
                  <h2 className="font-display font-bold text-base sm:text-lg text-ink">
                    Ngày Giỗ & Dấu Mốc Tưởng Nhớ
                  </h2>
                  <p className="text-xs text-stone-500">
                    Ghi nhớ ngày mất của ông bà, cha mẹ theo nếp nhà
                  </p>
                </div>
              </div>
            </div>

            <form
              className="space-y-4"
              onSubmit={(event) => {
                event.preventDefault();
                addAnniversary();
              }}
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-xs">
                <div>
                  <label htmlFor="reminder-name" className="block font-bold uppercase text-stone-600 dark:text-stone-400 mb-1.5">
                    1. Người tưởng nhớ:
                  </label>
                  <input
                    id="reminder-name"
                    value={name}
                    maxLength={80}
                    required
                    placeholder="Ví dụ: Cụ cố nội, Ông ngoại..."
                    onChange={(event) => setName(event.target.value)}
                    className="w-full rounded-xl border border-line bg-surface px-3 py-2 text-xs text-ink focus:outline-none focus:ring-2 focus:ring-amber-500/30"
                  />
                </div>

                <div>
                  <label className="block font-bold uppercase text-stone-600 dark:text-stone-400 mb-1.5">
                    2. Loại lịch gia đình áp dụng:
                  </label>
                  <select
                    value={calendar}
                    onChange={(event) =>
                      setCalendar(
                        event.target.value === "solar" ? "solar" : "lunar"
                      )
                    }
                    className="w-full rounded-xl border border-line bg-surface px-3 py-2 text-xs text-ink focus:outline-none focus:ring-2 focus:ring-amber-500/30"
                  >
                    <option value="lunar">Lịch Âm (Phong tục dân gian truyền thống)</option>
                    <option value="solar">Lịch Dương</option>
                  </select>
                </div>
              </div>

              {calendar === "solar" ? (
                <div>
                  <label htmlFor="reminder-date" className="block text-xs font-bold uppercase text-stone-600 dark:text-stone-400 mb-1.5">
                    Ngày mất (Dương lịch):
                  </label>
                  <input
                    id="reminder-date"
                    type="date"
                    min="1900-01-01"
                    value={dateInput}
                    required
                    onChange={(event) => setDateInput(event.target.value)}
                    className="w-full rounded-xl border border-line bg-surface px-3 py-2 text-xs text-ink focus:outline-none focus:ring-2 focus:ring-amber-500/30"
                  />
                </div>
              ) : (
                <div className="p-4 rounded-2xl bg-surface-soft border border-line space-y-3 text-xs">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block font-semibold text-stone-600 dark:text-stone-400 mb-1">
                        Ngày âm lịch:
                      </label>
                      <select
                        value={lunarDay}
                        onChange={(event) => setLunarDay(Number(event.target.value))}
                        className="w-full rounded-xl border border-line bg-surface px-3 py-2 text-xs text-ink"
                      >
                        {Array.from({ length: 30 }, (_, index) => (
                          <option key={index + 1} value={index + 1}>
                            Ngày {index + 1}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block font-semibold text-stone-600 dark:text-stone-400 mb-1">
                        Tháng âm lịch:
                      </label>
                      <select
                        value={lunarMonth}
                        onChange={(event) => setLunarMonth(Number(event.target.value))}
                        className="w-full rounded-xl border border-line bg-surface px-3 py-2 text-xs text-ink"
                      >
                        {Array.from({ length: 12 }, (_, index) => (
                          <option key={index + 1} value={index + 1}>
                            Tháng {index + 1}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-stone-500 text-[11px] pt-1">
                    <span>* Tự động điều chỉnh khi năm có tháng nhuận theo quy tắc gia phong</span>
                  </div>
                </div>
              )}

              <Button
                type="submit"
                className="rounded-xl bg-gradient-to-r from-red-800 to-amber-700 hover:from-red-700 hover:to-amber-800 text-white font-semibold text-xs px-5 min-h-10 cursor-pointer shadow-xs gap-1.5"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Thêm ngày giỗ vào lịch</span>
              </Button>
            </form>

            {/* Danh sách ngày giỗ đã lưu */}
            {settings.anniversaries.length > 0 && (
              <div className="mt-5 pt-4 border-t border-line">
                <span className="text-xs font-bold uppercase text-stone-500 tracking-wider block mb-3">
                  Danh sách ngày giỗ nếp nhà ({settings.anniversaries.length})
                </span>

                <ul className="divide-y divide-line text-xs">
                  {settings.anniversaries.map((item) => (
                    <li key={item.id} className="py-3 flex items-center justify-between gap-3">
                      <div>
                        <strong className="text-ink font-bold text-sm block">{item.name}</strong>
                        <span className="text-stone-500">
                          Ngày {item.day} tháng {item.month} ({item.calendar === "lunar" ? "Âm lịch" : "Dương lịch"})
                        </span>
                      </div>

                      <Button
                        type="button"
                        size="sm"
                        variant="ghost"
                        className="text-stone-400 hover:text-red-600 cursor-pointer p-2 rounded-xl"
                        onClick={() =>
                          commit((latest) => ({
                            ...latest,
                            anniversaries: latest.anniversaries.filter(
                              (entry) => entry.id !== item.id
                            ),
                          }))
                        }
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </section>

          {/* Card 3: Sự kiện trong 60 ngày tới */}
          <section className="p-6 rounded-3xl border border-line bg-surface shadow-xs">
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-line">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-amber-700" />
                <h2 className="font-display font-bold text-base sm:text-lg text-ink">
                  Dấu Mốc Trong 60 Ngày Tới
                </h2>
              </div>
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="rounded-xl border-line text-xs"
                onClick={onGoToCalendar}
              >
                Mở lịch văn hóa toàn diện →
              </Button>
            </div>

            {upcoming.length === 0 ? (
              <p className="text-xs text-stone-500 py-3">
                Chưa có lời nhắc nào trong 60 ngày tới. Bạn có thể bật nhắc ngày Sóc Vọng hoặc thêm ngày giỗ tiên tổ ở trên.
              </p>
            ) : (
              <ul className="divide-y divide-line text-xs">
                {upcoming.map((item) => (
                  <li key={item.id} className="py-3 flex items-center justify-between gap-3">
                    <div>
                      <p className="font-bold text-ink text-sm">{item.title}</p>
                      <p className="text-stone-500 mt-0.5">
                        {item.date.toLocaleDateString("vi-VN")}
                      </p>
                    </div>
                    <Badge variant="outline" className="border-amber-500/30 text-amber-800 dark:text-amber-300 bg-amber-500/10 font-medium">
                      {item.daysAway === 0 ? "Hôm nay" : `Còn ${item.daysAway} ngày`}
                    </Badge>
                  </li>
                ))}
              </ul>
            )}
          </section>
        </div>
      </main>
    </div>
  );
}
