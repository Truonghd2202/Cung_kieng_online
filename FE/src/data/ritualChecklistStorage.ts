export interface ChecklistProgressStorage {
  removeItem(key: string): void;
}

export function getRitualChecklistStorageKey(ritualId: string, email?: string) {
  const account = email?.trim().toLowerCase() || "guest";
  return `tltl-ritual-checklist-${account}-${ritualId}`;
}

export function clearRitualChecklistProgress(
  key: string,
  storage: ChecklistProgressStorage = localStorage,
): boolean {
  try {
    storage.removeItem(key);
    return true;
  } catch {
    return false;
  }
}
