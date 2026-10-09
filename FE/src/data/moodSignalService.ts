import { apiRequest } from "../lib/api";
import { trackProductEvent } from "./productAnalytics";
import type { MoodContextKey, MoodKey, SignalData } from "./demoSignals";
import type { SavedSignalItem } from "../screens/AccountScreen";

interface ServerSignal {
  id: string;
  mood: MoodKey;
}

interface CheckInResult {
  checkIn: {
    id: string;
    mood: MoodKey;
    contextKey: MoodContextKey;
    actionDone: boolean;
    signalId: string | null;
  };
  signal: SignalData;
}

export function analyzeMoodSignal(input: {
  mood: MoodKey;
  contextKey: MoodContextKey;
}): Promise<{ signal: SignalData; aiUsed: boolean }> {
  return apiRequest("/mood/analyze-signal", {
    method: "POST",
    body: JSON.stringify(input),
  });
}

export function loadSignals(mood?: MoodKey): Promise<{ items: ServerSignal[] }> {
  const query = mood ? `?mood=${encodeURIComponent(mood)}` : "";
  return apiRequest<{ items: ServerSignal[] }>(`/signals${query}`);
}

export function createMoodCheckIn(input: {
  mood: MoodKey;
  contextKey: MoodContextKey;
  note?: string;
  signalId?: string;
  actionDone?: boolean;
}): Promise<CheckInResult> {
  return apiRequest<CheckInResult>("/mood/check-ins", {
    method: "POST",
    body: JSON.stringify(input),
  }).then((result) => {
    trackProductEvent("mood_checkin_completed");
    return result;
  });
}

export function updateMoodAction(checkInId: string, actionDone: boolean) {
  return apiRequest(`/mood/check-ins/${encodeURIComponent(checkInId)}/action`, {
    method: "PATCH",
    body: JSON.stringify({ actionDone }),
  });
}

export function saveSignal(
  signalId: string,
  input: { checkInId?: string; note?: string; actionDone?: boolean },
): Promise<SavedSignalItem> {
  return apiRequest<SavedSignalItem>("/mood/save-signal", {
    method: "POST",
    body: JSON.stringify({ ...input, signalId }),
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
