import { useMemo, useSyncExternalStore } from "react";
import { CULTURE_ARTICLES } from "../data/cultureData";
import { RITUAL_GUIDES } from "../data/ritualData";

export type ReadingKind = "culture" | "ritual";

const CHANGE_EVENT = "tltl-reading-bookmarks-change";

export function getReadingBookmarkKey(
  kind: ReadingKind,
  id: string,
  email?: string
) {
  const account = email?.trim().toLowerCase() || "guest";

  // Giữ đúng khóa nghi lễ cũ.
  return `tltl-${kind}-bookmark-${account}-${id}`;
}

function subscribe(listener: () => void) {
  window.addEventListener("storage", listener);
  window.addEventListener(CHANGE_EVENT, listener);

  return () => {
    window.removeEventListener("storage", listener);
    window.removeEventListener(CHANGE_EVENT, listener);
  };
}

function readBookmark(
  kind: ReadingKind,
  id: string,
  email?: string
): boolean {
  try {
    return (
      localStorage.getItem(
        getReadingBookmarkKey(kind, id, email)
      ) === "true"
    );
  } catch {
    return false;
  }
}

export function setReadingBookmark(
  kind: ReadingKind,
  id: string,
  saved: boolean,
  email?: string
): boolean {
  try {
    const key = getReadingBookmarkKey(kind, id, email);

    if (saved) {
      localStorage.setItem(key, "true");
    } else {
      localStorage.removeItem(key);
    }

    window.dispatchEvent(new Event(CHANGE_EVENT));
    return true;
  } catch {
    return false;
  }
}

export function useReadingBookmark(
  kind: ReadingKind,
  id: string,
  email?: string
) {
  return useSyncExternalStore(
    subscribe,
    () => readBookmark(kind, id, email),
    () => false
  );
}

export interface SavedReading {
  kind: ReadingKind;
  id: string;
  title: string;
}

function readList(email?: string): string {
  const items: SavedReading[] = [];

  for (const article of CULTURE_ARTICLES) {
    if (readBookmark("culture", article.id, email)) {
      items.push({
        kind: "culture",
        id: article.id,
        title: article.title,
      });
    }
  }

  for (const ritual of RITUAL_GUIDES) {
    if (readBookmark("ritual", ritual.id, email)) {
      items.push({
        kind: "ritual",
        id: ritual.id,
        title: ritual.title,
      });
    }
  }

  // Snapshot là chuỗi ổn định, tránh tạo array mới
  // trực tiếp trong useSyncExternalStore.
  return JSON.stringify(items);
}

export function useReadingBookmarks(email?: string) {
  const snapshot = useSyncExternalStore(
    subscribe,
    () => readList(email),
    () => "[]"
  );

  return useMemo(
    () => JSON.parse(snapshot) as SavedReading[],
    [snapshot]
  );
}
