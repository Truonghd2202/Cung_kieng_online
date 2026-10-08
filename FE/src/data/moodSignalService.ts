import { apiRequest } from "../lib/api";
import type { MoodKey } from "./demoSignals";
import type { SavedSignalItem } from "../screens/AccountScreen";

interface ServerSignal {
  id: string;
  mood: MoodKey;
}

interface CheckInResult {
  checkIn: {
    id: string;
    mood: MoodKey;
    actionDone: boolean;
    signalId: string | null;
  };
  signal: ServerSignal;
}

export function loadSignals(mood?: MoodKey): Promise<{ items: ServerSignal[] }> {
  const query = mood ? `?mood=${encodeURIComponent(mood)}` : "";
  return apiRequest<{ items: ServerSignal[] }>(`/signals${query}`);
}

export function createMoodCheckIn(input: {
  mood: MoodKey;
  note?: string;
  signalId?: string;
  actionDone?: boolean;
}): Promise<CheckInResult> {
  return apiRequest<CheckInResult>("/moods/check-ins", {
    method: "POST",
    body: JSON.stringify(input),
  });
}

export function updateMoodAction(checkInId: string, actionDone: boolean) {
  return apiRequest(`/moods/check-ins/${encodeURIComponent(checkInId)}/action`, {
    method: "PATCH",
    body: JSON.stringify({ actionDone }),
  });
}

export function saveSignal(
  signalId: string,
  input: { checkInId?: string; note?: string; actionDone?: boolean },
): Promise<SavedSignalItem> {
  return apiRequest<SavedSignalItem>(`/signals/${encodeURIComponent(signalId)}/save`, {
    method: "POST",
    body: JSON.stringify(input),
  });
}

export async function loadSavedSignals(): Promise<SavedSignalItem[]> {
  const result = await apiRequest<{ items: SavedSignalItem[] }>("/signals/saved");
  return result.items;
}

export function updateSavedSignal(checkInId: string, starred: boolean) {
  return apiRequest<SavedSignalItem>(`/signals/saved/${encodeURIComponent(checkInId)}`, {
    method: "PATCH",
    body: JSON.stringify({ starred }),
  });
}

export function deleteSavedSignal(checkInId: string) {
  return apiRequest(`/signals/saved/${encodeURIComponent(checkInId)}`, {
    method: "DELETE",
  });
}
