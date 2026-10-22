import { apiRequest } from "../lib/api";
import { isDemoMode } from "./demoMode";
import { readDemoValue, writeDemoValue } from "./demoStorage";
import type { MemorialRecord } from "../screens/MemorialSpaceScreen";
import type { CalendarEventItem } from "./calendarData";

export function memorialProfileToRecord(profile: MemorialProfile): MemorialRecord {
  return {
    id: profile.id,
    name: profile.fullName,
    relation: profile.relationship || "Người thân",
    date: profile.deathDate || profile.birthDate || "",
    note: profile.note || profile.biography || undefined,
    avatarUrl: profile.avatarUrl || undefined,
  };
}

export function recordIncense(memorialId: string, message?: string) {
  if (isDemoMode()) {
    const counts = readDemoValue<Record<string, number>>("incense-counts", {});
    const incenseCount = (counts[memorialId] || 0) + 1;
    counts[memorialId] = incenseCount;
    writeDemoValue("incense-counts", counts);
    return Promise.resolve({ id: crypto.randomUUID(), memorialId, incenseCount, createdAt: new Date().toISOString() });
  }
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
  if (isDemoMode()) return Promise.resolve(readDemoValue<MemorialProfile[]>("memorial-profiles", []));
  return apiRequest<{ items: MemorialProfile[] }>("/memorials").then((result) => result.items);
}

export function createMemorialProfile(input: Omit<MemorialProfile, "id" | "anniversaries"> & { anniversary?: Omit<MemorialProfile["anniversaries"][number], "id"> | null }): Promise<MemorialProfile> {
  if (isDemoMode()) {
    const anniversary = input.anniversary ? { ...input.anniversary, id: crypto.randomUUID() } : null;
    const profile: MemorialProfile = { ...input, id: crypto.randomUUID(), anniversaries: anniversary ? [anniversary] : [] };
    writeDemoValue("memorial-profiles", [profile, ...readDemoValue<MemorialProfile[]>("memorial-profiles", [])]);
    return Promise.resolve(profile);
  }
  return apiRequest<MemorialProfile>("/memorials", { method: "POST", body: JSON.stringify(input) });
}

export function updateMemorialProfile(id: string, input: Partial<Omit<MemorialProfile, "id" | "anniversaries">> & { anniversary?: Omit<MemorialProfile["anniversaries"][number], "id"> | null }): Promise<MemorialProfile> {
  if (isDemoMode()) {
    const profiles = readDemoValue<MemorialProfile[]>("memorial-profiles", []);
    const existing = profiles.find((item) => item.id === id);
    if (!existing) return Promise.reject(new Error("Không tìm thấy hồ sơ demo."));
    const updated: MemorialProfile = { ...existing, ...input, anniversaries: input.anniversary ? [{ ...input.anniversary, id: crypto.randomUUID() }] : existing.anniversaries };
    writeDemoValue("memorial-profiles", profiles.map((item) => item.id === id ? updated : item));
    return Promise.resolve(updated);
  }
  return apiRequest<MemorialProfile>(`/memorials/${encodeURIComponent(id)}`, { method: "PATCH", body: JSON.stringify(input) });
}

export function deleteMemorialProfile(id: string) {
  if (isDemoMode()) {
    writeDemoValue("memorial-profiles", readDemoValue<MemorialProfile[]>("memorial-profiles", []).filter((item) => item.id !== id));
    return Promise.resolve();
  }
  return apiRequest(`/memorials/${encodeURIComponent(id)}`, { method: "DELETE" });
}

export function deleteMemorialAnniversary(memorialId: string, anniversaryId: string) {
  if (isDemoMode()) {
    const profiles = readDemoValue<MemorialProfile[]>("memorial-profiles", []);
    writeDemoValue("memorial-profiles", profiles.map((item) => item.id === memorialId ? { ...item, anniversaries: item.anniversaries.filter((entry) => entry.id !== anniversaryId) } : item));
    return Promise.resolve();
  }
  return apiRequest(`/memorials/${encodeURIComponent(memorialId)}/anniversaries/${encodeURIComponent(anniversaryId)}`, { method: "DELETE" });
}

export function loadCalendarNotes(): Promise<CalendarEventItem[]> {
  if (isDemoMode()) return Promise.resolve(readDemoValue<CalendarEventItem[]>("calendar-notes", []));
  return apiRequest<{ items: CalendarEventItem[] }>("/memory/calendar/notes").then((result) => result.items);
}

export function saveCalendarNote(input: Pick<CalendarEventItem, "title" | "day" | "month" | "year">) {
  if (isDemoMode()) {
    const note: CalendarEventItem = { ...input, id: `demo-note-${crypto.randomUUID()}`, type: "personal", typeLabel: "Ngày cá nhân", region: "Cá nhân", shortDesc: "Ghi chú lưu trên thiết bị trong phiên demo.", lunarDate: "" };
    writeDemoValue("calendar-notes", [note, ...readDemoValue<CalendarEventItem[]>("calendar-notes", [])]);
    return Promise.resolve(note);
  }
  return apiRequest<CalendarEventItem>("/memory/calendar/notes", { method: "POST", body: JSON.stringify(input) });
}

export function deleteCalendarNote(id: string) {
  if (isDemoMode()) {
    writeDemoValue("calendar-notes", readDemoValue<CalendarEventItem[]>("calendar-notes", []).filter((item) => item.id !== id));
    return Promise.resolve();
  }
  return apiRequest(`/memory/calendar/notes/${encodeURIComponent(id)}`, { method: "DELETE" });
}
