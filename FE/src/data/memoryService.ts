import { apiRequest } from "../lib/api";
import type { MemorialRecord } from "../screens/MemorialSpaceScreen";
import type { CalendarEventItem } from "./calendarData";

export function loadMemorial(): Promise<MemorialRecord | null> {
  return apiRequest<MemorialRecord | null>("/memory/memorial");
}

export function saveMemorial(record: MemorialRecord): Promise<MemorialRecord> {
  return apiRequest<MemorialRecord>("/memory/memorial", { method: "PUT", body: JSON.stringify(record) });
}

export function loadCalendarNotes(): Promise<CalendarEventItem[]> {
  return apiRequest<{ items: CalendarEventItem[] }>("/memory/calendar/notes").then((result) => result.items);
}

export function saveCalendarNote(input: Pick<CalendarEventItem, "title" | "day" | "month" | "year">) {
  return apiRequest<CalendarEventItem>("/memory/calendar/notes", { method: "POST", body: JSON.stringify(input) });
}

export function deleteCalendarNote(id: string) {
  return apiRequest(`/memory/calendar/notes/${encodeURIComponent(id)}`, { method: "DELETE" });
}
