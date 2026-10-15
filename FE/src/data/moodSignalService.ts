import { apiRequest } from "../lib/api";
import { trackProductEvent } from "./productAnalytics";
import type { MoodContextKey, MoodKey, SignalData } from "./demoSignals";
import type { SavedSignalItem } from "../screens/AccountScreen";

interface ServerSignalSummary {
  id: string;
  mood: MoodKey;
  contextKey?: MoodContextKey;
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
  excludeSignalId?: string;
}, options: { signal?: AbortSignal } = {}): Promise<{ signal: SignalData; aiUsed: boolean }> {
  return apiRequest("/mood/analyze-signal", {
    method: "POST",
    body: JSON.stringify(input),
    signal: options.signal,
  });
}

export function loadSignals(mood?: MoodKey, contextKey: MoodContextKey = "general"): Promise<{ items: ServerSignalSummary[] }> {
  const params = new URLSearchParams();
  if (mood) params.set("mood", mood);
  params.set("contextKey", contextKey);
  const query = `?${params.toString()}`;
  return apiRequest<{ items: ServerSignalSummary[] }>(`/signals${query}`);
}

export function loadSignalById(signalId: string): Promise<SignalData> {
  return apiRequest<SignalData>(`/signals/${encodeURIComponent(signalId)}`);
}

export function loadSavedSignalById(checkInId: string): Promise<{
  item: SavedSignalItem;
  signal: SignalData;
  contentStatus: "available" | "withdrawn";
}> {
  return apiRequest<{
    item: SavedSignalItem;
    signal: SignalData;
    contentStatus: "available" | "withdrawn";
  }>(`/signals/saved/${encodeURIComponent(checkInId)}`);
}

export function createMoodCheckIn(input: {
  mood: MoodKey;
  contextKey: MoodContextKey;
  note?: string;
  signalId?: string;
  excludeSignalId?: string;
  actionDone?: boolean;
  idempotencyKey?: string;
}, options: { signal?: AbortSignal } = {}): Promise<CheckInResult> {
  return apiRequest<CheckInResult>("/mood/check-ins", {
    method: "POST",
    body: JSON.stringify(input),
    signal: options.signal,
  }).then((result) => {
    trackProductEvent("mood_checkin_completed");
    return result;
  });
}

export function updateMoodAction(checkInId: string, actionDone: boolean) {
  return apiRequest<{ id: string; actionDone: boolean }>(`/mood/check-ins/${encodeURIComponent(checkInId)}/action`, {
    method: "PATCH",
    body: JSON.stringify({ actionDone }),
  });
}

export function saveSignal(
  signalId: string,
  input: {
    checkInId?: string;
    note?: string;
    actionDone?: boolean;
    mood?: MoodKey;
    contextKey?: MoodContextKey;
    signalSnapshot?: SignalData;
    idempotencyKey?: string;
  },
): Promise<SavedSignalItem> {
  const { signalSnapshot, ...fields } = input;

  return apiRequest<SavedSignalItem>(
    "/mood/save-signal",
    {
      method: "POST",
      body: JSON.stringify({
        ...fields,
        signalId,

        ...(!fields.checkInId
          ? {
              resultToken: signalSnapshot?.resultToken,
            }
          : {}),
      }),
    },
  );
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
