import { useEffect, useState } from "react";

export function useLocalDay(): string {
  const [day, setDay] = useState(() => new Date().toDateString());

  useEffect(() => {
    let timer: number | ReturnType<typeof setTimeout> | undefined;

    const syncDay = () => {
      setDay(new Date().toDateString());
    };

    const scheduleNextMidnight = () => {
      if (timer !== undefined) {
        window.clearTimeout(timer);
      }

      const now = new Date();
      const nextMidnight = new Date(now);

      nextMidnight.setHours(24, 0, 0, 0);

      timer = window.setTimeout(() => {
        syncDay();
        scheduleNextMidnight();
      }, nextMidnight.getTime() - now.getTime() + 100);
    };

    const refresh = () => {
      syncDay();
      scheduleNextMidnight();
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        refresh();
      }
    };

    refresh();

    window.addEventListener("focus", refresh);
    document.addEventListener(
      "visibilitychange",
      handleVisibilityChange
    );

    return () => {
      if (timer !== undefined) {
        window.clearTimeout(timer);
      }

      window.removeEventListener("focus", refresh);
      document.removeEventListener(
        "visibilitychange",
        handleVisibilityChange
      );
    };
  }, []);

  return day;
}
