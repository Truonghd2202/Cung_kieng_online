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
    const value = localStorage.getItem(getReadingBookmarkKey(kind, id, email));
    if (value === "true") return true;
    if (!value) return false;
    const parsed: unknown = JSON.parse(value);
    return Boolean(parsed && typeof parsed === "object" && (parsed as { saved?: unknown }).saved === true);
  } catch {
    return false;
  }
}

function readBookmarkTitle(kind: ReadingKind, id: string, email?: string) {
  try {
    const value = localStorage.getItem(getReadingBookmarkKey(kind, id, email));
    if (!value || value === "true") return undefined;
    const parsed: unknown = JSON.parse(value);
    return parsed && typeof parsed === "object" && typeof (parsed as { title?: unknown }).title === "string"
      ? (parsed as { title: string }).title
      : undefined;
  } catch {
    return undefined;
  }
}

export function setReadingBookmark(
  kind: ReadingKind,
  id: string,
  saved: boolean,
  email?: string,
  title?: string
): boolean {
  try {
    const key = getReadingBookmarkKey(kind, id, email);

    if (saved) {
      localStorage.setItem(key, JSON.stringify({ saved: true, ...(title ? { title } : {}) }));
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
  const cultureIds = new Set<string>();
  const ritualIds = new Set<string>();

  for (const article of CULTURE_ARTICLES) {
    if (readBookmark("culture", article.id, email)) {
      cultureIds.add(article.id);
      items.push({
        kind: "culture",
        id: article.id,
        title: readBookmarkTitle("culture", article.id, email) || article.title,
      });
    }
  }

  for (const ritual of RITUAL_GUIDES) {
    if (readBookmark("ritual", ritual.id, email)) {
      ritualIds.add(ritual.id);
      items.push({
        kind: "ritual",
        id: ritual.id,
        title: readBookmarkTitle("ritual", ritual.id, email) || ritual.title,
      });
    }
  }

  try {
    const account = email?.trim().toLowerCase() || "guest";
    const culturePrefix = `tltl-culture-bookmark-${account}-`;
    const ritualPrefix = `tltl-ritual-bookmark-${account}-`;
    for (const key of Object.keys(localStorage)) {
      const kind: ReadingKind | undefined = key.startsWith(culturePrefix)
        ? "culture"
        : key.startsWith(ritualPrefix) ? "ritual" : undefined;
      if (!kind) continue;
      const id = key.slice((kind === "culture" ? culturePrefix : ritualPrefix).length);
      const knownIds = kind === "culture" ? cultureIds : ritualIds;
      if (!id || knownIds.has(id) || !readBookmark(kind, id, email)) continue;
      items.push({ kind, id, title: readBookmarkTitle(kind, id, email) || id });
      knownIds.add(id);
    }
  } catch {
    // A bookmark whose ID is not in the built-in catalog stays saved even if storage listing is blocked.
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
