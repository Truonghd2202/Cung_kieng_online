import { useEffect, useMemo, useState, useSyncExternalStore } from "react";
import {
  CALENDAR_NOTES_CHANGED_EVENT,
  parseCalendarPersonalNotes,
  readCalendarNotesRaw,
} from "../data/calendarData";
import {
  getStorageKey,
  loadSettings,
  getUpcomingReminders,
} from "../data/reminderData";
import { useLocalDay } from "./useLocalDay";
import { loadMemorialProfiles, type MemorialProfile } from "../data/memoryService";
import type { Anniversary } from "../data/reminderData";

export const REMINDERS_CHANGED_EVENT =
  CALENDAR_NOTES_CHANGED_EVENT;
export const MEMORIAL_PROFILES_CHANGED_EVENT = "tltl-memorial-profiles-change";

function subscribe(listener: () => void) {
  window.addEventListener("storage", listener);
  window.addEventListener(REMINDERS_CHANGED_EVENT, listener);
  window.addEventListener(MEMORIAL_PROFILES_CHANGED_EVENT, listener);

  return () => {
    window.removeEventListener("storage", listener);
    window.removeEventListener(
      REMINDERS_CHANGED_EVENT,
      listener
    );
    window.removeEventListener(MEMORIAL_PROFILES_CHANGED_EVENT, listener);
  };
}

function readSnapshot(email?: string): string {
  let reminders = "";

  try {
    reminders =
      localStorage.getItem(getStorageKey(email)) || "";
  } catch {
    // Trình duyệt có thể chặn lưu trữ.
  }

  return JSON.stringify([
    reminders,
    readCalendarNotesRaw(email),
  ]);
}

export function useReminderOverview(email?: string) {
  const today = useLocalDay();
  const [memorialProfiles, setMemorialProfiles] = useState<MemorialProfile[]>([]);

  useEffect(() => {
    let active = true;
    const refreshMemorials = () => {
      loadMemorialProfiles()
        .then((profiles) => { if (active) setMemorialProfiles(profiles); })
        .catch(() => { if (active) setMemorialProfiles([]); });
    };
    refreshMemorials();
    window.addEventListener(MEMORIAL_PROFILES_CHANGED_EVENT, refreshMemorials);
    return () => {
      active = false;
      window.removeEventListener(MEMORIAL_PROFILES_CHANGED_EVENT, refreshMemorials);
    };
  }, [email]);

  const snapshot = useSyncExternalStore(
    subscribe,
    () => readSnapshot(email),
    () => '["","[]"]'
  );

  return useMemo(() => {
    const [, notesRaw] = JSON.parse(snapshot) as [
      string,
      string,
    ];

    const settings = loadSettings(email);
    const memorialAnniversaries: Anniversary[] = memorialProfiles.flatMap((profile) =>
      profile.anniversaries
        .filter((anniversary) => anniversary.repeatYearly)
        .map((anniversary) => ({
          id: `memorial:${anniversary.id}`,
          name: profile.fullName,
          day: anniversary.day,
          month: anniversary.month,
          calendar: anniversary.calendar === "LUNAR" ? "lunar" : "solar",
          missingDayPolicy: "last-day",
        }))
    );
    const reminders = getUpcomingReminders(
      { ...settings, anniversaries: [...settings.anniversaries, ...memorialAnniversaries] },
      parseCalendarPersonalNotes(notesRaw)
    );
    const memorialReminders = reminders
      .filter((reminder) => reminder.id.startsWith("anniversary:memorial:") && reminder.daysAway <= 30)
      .map((reminder) => ({
        ...reminder,
        id: `memorial-reminder:${reminder.id}`,
        title: reminder.daysAway === 0
          ? `Hôm nay là ngày giỗ — ${reminder.title.split(" — ").slice(1).join(" — ").split(" (")[0]}`
          : `Còn ${reminder.daysAway} ngày đến ngày giỗ — ${reminder.title.split(" — ").slice(1).join(" — ").split(" (")[0]}`,
      }));
    return [
      ...reminders.filter((reminder) => !reminder.id.startsWith("anniversary:memorial:")),
      ...memorialReminders,
    ];
  }, [email, memorialProfiles, snapshot, today]);
}
