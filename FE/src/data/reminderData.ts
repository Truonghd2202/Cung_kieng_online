import { getReliableLunarDate } from "./calendarData";

export type AnniversaryCalendar = "solar" | "lunar";
export type LeapPolicy = "regular" | "both";
export type MissingDayPolicy = "skip" | "last-day";

export interface Anniversary {
  id: string;
  name: string;
  month: number;
  day: number;

  // Không có calendar ở dữ liệu cũ nghĩa là dương lịch.
  calendar?: AnniversaryCalendar;
  leapPolicy?: LeapPolicy;
  missingDayPolicy?: MissingDayPolicy;
}

export interface ReminderSettings {
  firstDay: boolean;
  fullMoon: boolean;
  anniversaries: Anniversary[];
}

export interface UpcomingReminder {
  id: string;
  title: string;
  date: Date;
  daysAway: number;
}

export interface PersonalReminderNote {
  id: string;
  title: string;
  day: number;
  month: number;
  year: number;
}

export const EMPTY_SETTINGS: ReminderSettings = {
  firstDay: false,
  fullMoon: false,
  anniversaries: [],
};

export function getStorageKey(email?: string) {
  const account = email?.trim().toLowerCase() || "guest";
  return `tltl-reminders:${account}`;
}

export function isValidMonthDay(month: number, day: number) {
  if (
    !Number.isInteger(month) ||
    !Number.isInteger(day) ||
    month < 1 ||
    month > 12 ||
    day < 1
  ) {
    return false;
  }

  // Dùng năm nhuận để chấp nhận ngày 29/2.
  const daysInMonth = new Date(2024, month, 0).getDate();
  return day <= daysInMonth;
}

export function isValidAnniversaryDay(
  calendar: AnniversaryCalendar,
  month: number,
  day: number
): boolean {
  if (calendar === "solar") {
    return isValidMonthDay(month, day);
  }

  return (
    Number.isInteger(month) &&
    Number.isInteger(day) &&
    month >= 1 &&
    month <= 12 &&
    day >= 1 &&
    day <= 30
  );
}

export function loadSettings(email?: string): ReminderSettings {
  try {
    const raw = localStorage.getItem(getStorageKey(email));

    if (!raw) return { ...EMPTY_SETTINGS, anniversaries: [] };

    const parsed: unknown = JSON.parse(raw);

    if (
      typeof parsed !== "object" ||
      parsed === null ||
      Array.isArray(parsed)
    ) {
      return { ...EMPTY_SETTINGS, anniversaries: [] };
    }

    const value = parsed as Record<string, unknown>;
    const anniversaries: Anniversary[] = [];
    const ids = new Set<string>();

    if (Array.isArray(value.anniversaries)) {
      for (const entry of value.anniversaries) {
        if (
          typeof entry !== "object" ||
          entry === null ||
          Array.isArray(entry)
        ) {
          continue;
        }

        const item = entry as Record<string, unknown>;
        const calendar: AnniversaryCalendar =
          item.calendar === "lunar" ? "lunar" : "solar";

        if (
          typeof item.id !== "string" ||
          !item.id.trim() ||
          ids.has(item.id) ||
          typeof item.name !== "string" ||
          !item.name.trim() ||
          item.name.length > 80 ||
          typeof item.month !== "number" ||
          typeof item.day !== "number" ||
          !isValidAnniversaryDay(
            calendar,
            item.month,
            item.day
          )
        ) {
          continue;
        }

        ids.add(item.id);

        anniversaries.push({
          id: item.id,
          name: item.name.trim(),
          month: item.month,
          day: item.day,
          calendar,
          leapPolicy:
            item.leapPolicy === "both" ? "both" : "regular",
          missingDayPolicy:
            item.missingDayPolicy === "last-day"
              ? "last-day"
              : "skip",
        });

        if (anniversaries.length >= 50) break;
      }
    }

    return {
      firstDay: value.firstDay === true,
      fullMoon: value.fullMoon === true,
      anniversaries,
    };
  } catch {
    return { ...EMPTY_SETTINGS, anniversaries: [] };
  }
}

export function matchesAnniversary(
  anniversary: Anniversary,
  date: Date
): boolean {
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  if ((anniversary.calendar ?? "solar") === "solar") {
    return (
      anniversary.day === day &&
      anniversary.month === month
    );
  }

  const lunar = getReliableLunarDate(day, month, year);

  if (lunar.lunarMonth !== anniversary.month) return false;

  if (
    lunar.isLeapMonth &&
    anniversary.leapPolicy !== "both"
  ) {
    return false;
  }

  if (lunar.lunarDay === anniversary.day) return true;

  const mayUseLastDay =
    anniversary.day === 30 &&
    lunar.lunarDay === 29 &&
    anniversary.missingDayPolicy === "last-day";

  if (!mayUseLastDay) return false;

  const tomorrow = new Date(date);
  tomorrow.setDate(tomorrow.getDate() + 1);

  const nextLunar = getReliableLunarDate(
    tomorrow.getDate(),
    tomorrow.getMonth() + 1,
    tomorrow.getFullYear()
  );

  // Ngày 29 chỉ là ngày cuối tháng nếu hôm sau sang mùng 1.
  return nextLunar.lunarDay === 1;
}

export function getUpcomingReminders(
  settings: ReminderSettings,
  personalNotes: PersonalReminderNote[] = []
): UpcomingReminder[] {
  const today = new Date();
  today.setHours(12, 0, 0, 0);

  const result: UpcomingReminder[] = [];

  for (let offset = 0; offset < 60; offset += 1) {
    const date = new Date(today);
    date.setDate(today.getDate() + offset);

    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    const dateId = `${year}-${month}-${day}`;

    if (settings.firstDay || settings.fullMoon) {
      const lunar = getReliableLunarDate(day, month, year);

      if (settings.firstDay && lunar.isFirstDay) {
        result.push({
          id: `first:${dateId}`,
          title: `Mùng một tháng ${lunar.lunarMonth}${
            lunar.isLeapMonth ? " nhuận" : ""
          }`,
          date,
          daysAway: offset,
        });
      }

      if (settings.fullMoon && lunar.isFullMoon) {
        result.push({
          id: `full:${dateId}`,
          title: `Rằm tháng ${lunar.lunarMonth}${
            lunar.isLeapMonth ? " nhuận" : ""
          }`,
          date,
          daysAway: offset,
        });
      }
    }

    for (const anniversary of settings.anniversaries) {
      if (matchesAnniversary(anniversary, date)) {
        result.push({
          id: `anniversary:${anniversary.id}:${dateId}`,
          title: `Ngày giỗ — ${anniversary.name} (${
            anniversary.calendar === "lunar"
              ? "âm lịch"
              : "dương lịch"
          })`,
          date,
          daysAway: offset,
        });
      }
    }

    for (const note of personalNotes) {
      if (
        note.day === day &&
        note.month === month &&
        note.year === year
      ) {
        result.push({
          id: `note:${note.id}:${dateId}`,
          title: `Ghi chú — ${note.title}`,
          date,
          daysAway: offset,
        });
      }
    }
  }

  return result;
}
