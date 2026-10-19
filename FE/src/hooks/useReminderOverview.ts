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
  const [reloadVersion, setReloadVersion] = useState(0);

  const [loadState, setLoadState] = useState<{
    email: string | null;
    status: "loading" | "ready" | "error";
  }>({
    email: null,
    status: "ready",
  });

  useEffect(() => {
    let active = true;
    let requestVersion = 0;

    // Không giữ hồ sơ của tài khoản trước trong lúc tải.
    setMemorialProfiles([]);

    const refreshMemorials = () => {
      const version = ++requestVersion;

      if (!email) {
        setMemorialProfiles([]);
        setLoadState({
          email: null,
          status: "ready",
        });
        return;
      }

      setLoadState({
        email,
        status: "loading",
      });

      void loadMemorialProfiles()
        .then((profiles) => {
          if (!active || version !== requestVersion) return;

          setMemorialProfiles(profiles);
          setLoadState({
            email,
            status: "ready",
          });
        })
        .catch(() => {
          if (!active || version !== requestVersion) return;

          // Không hiển thị lại lịch cũ khi chưa xác nhận được
          // hồ sơ hiện tại từ BE.
          setMemorialProfiles([]);
          setLoadState({
            email,
            status: "error",
          });
        });
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        refreshMemorials();
      }
    };

    refreshMemorials();

    window.addEventListener(
      MEMORIAL_PROFILES_CHANGED_EVENT,
      refreshMemorials
    );

    document.addEventListener(
      "visibilitychange",
      handleVisibilityChange
    );

    return () => {
      active = false;
      requestVersion += 1;

      window.removeEventListener(
        MEMORIAL_PROFILES_CHANGED_EVENT,
        refreshMemorials
      );

      document.removeEventListener(
        "visibilitychange",
        handleVisibilityChange
      );
    };
  }, [email, reloadVersion]);

  const snapshot = useSyncExternalStore(
    subscribe,
    () => readSnapshot(email),
    () => '["","[]"]'
  );

  const upcoming = useMemo(() => {
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

  const matchesAccount =
    loadState.email === (email ?? null);

  return {
    upcoming,
    loading:
      Boolean(email) &&
      (!matchesAccount || loadState.status === "loading"),
    loadError:
      Boolean(email) &&
      matchesAccount &&
      loadState.status === "error",
    retry: () => setReloadVersion((value) => value + 1),
  };
}
