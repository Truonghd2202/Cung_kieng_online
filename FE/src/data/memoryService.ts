import { apiRequest } from "../lib/api";
import type { MemorialRecord } from "../screens/MemorialSpaceScreen";
import type { CalendarEventItem } from "./calendarData";

export function loadMemorial(): Promise<MemorialRecord | null> {
  return apiRequest<MemorialRecord | null>("/memory/memorial");
}

export function saveMemorial(record: MemorialRecord): Promise<MemorialRecord> {
  return apiRequest<MemorialRecord>("/memory/memorial", { method: "PUT", body: JSON.stringify(record) });
}

export function recordIncense(memorialId: string, message?: string) {
  return apiRequest<{ id: string; memorialId: string; incenseCount: number; createdAt: string }>(
    `/memorials/${encodeURIComponent(memorialId)}/incense`,
    { method: "POST", body: JSON.stringify({ message, incenseCount: 1 }) },
  );
}

export interface MemorialProfile {
  id: string;
  fullName: string;
  relationship?: string | null;
  birthDate?: string | null;
  deathDate?: string | null;
  avatarUrl?: string | null;
  biography?: string | null;
  note?: string | null;
  anniversaries: Array<{ id: string; calendar: "SOLAR" | "LUNAR"; day: number; month: number; year?: number | null; repeatYearly: boolean; note?: string | null }>;
}

export function loadMemorialProfiles(): Promise<MemorialProfile[]> {
  return apiRequest<{ items: MemorialProfile[] }>("/memorials").then((result) => result.items);
}

export function createMemorialProfile(input: Omit<MemorialProfile, "id" | "anniversaries"> & { anniversary?: Omit<MemorialProfile["anniversaries"][number], "id"> | null }): Promise<MemorialProfile> {
  return apiRequest<MemorialProfile>("/memorials", { method: "POST", body: JSON.stringify(input) });
}

export function updateMemorialProfile(id: string, input: Partial<Omit<MemorialProfile, "id" | "anniversaries">> & { anniversary?: Omit<MemorialProfile["anniversaries"][number], "id"> | null }): Promise<MemorialProfile> {
  return apiRequest<MemorialProfile>(`/memorials/${encodeURIComponent(id)}`, { method: "PATCH", body: JSON.stringify(input) });
}

export function deleteMemorialProfile(id: string) {
  return apiRequest(`/memorials/${encodeURIComponent(id)}`, { method: "DELETE" });
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
