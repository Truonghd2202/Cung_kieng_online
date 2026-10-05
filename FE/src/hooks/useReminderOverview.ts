import { useMemo, useSyncExternalStore } from "react";
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

export const REMINDERS_CHANGED_EVENT =
  CALENDAR_NOTES_CHANGED_EVENT;

function subscribe(listener: () => void) {
  window.addEventListener("storage", listener);
  window.addEventListener(REMINDERS_CHANGED_EVENT, listener);

  return () => {
    window.removeEventListener("storage", listener);
    window.removeEventListener(
      REMINDERS_CHANGED_EVENT,
      listener
    );
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

    return getUpcomingReminders(
      loadSettings(email),
      parseCalendarPersonalNotes(notesRaw)
    );
  }, [email, snapshot, today]);
}
