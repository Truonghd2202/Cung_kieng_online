import checkInCatalog from "../../../shared/checkin-catalog.json";
import type { MoodContextKey, MoodKey, SignalData } from "./demoSignals";

export const supportedMoodLabels = checkInCatalog.moods.map(({ label }) => label) as MoodKey[];

export function isSupportedMood(value: string): value is MoodKey {
  return supportedMoodLabels.includes(value as MoodKey);
}

export function isConfirmedActionUpdate(
  checkInId: string,
  requested: boolean,
  response: { id?: unknown; actionDone?: unknown } | null | undefined,
) {
  return response?.id === checkInId && response.actionDone === requested;
}

export interface MoodTurnState {
  checkedIn: boolean;
  signalId: string;
  checkInId: string | null;
  actionDone: boolean;
  mood: MoodKey;
  contextKey: MoodContextKey;
}

export interface MoodTurnOutcome {
  signal: SignalData | null;
  checkInId: string | null;
  mood: MoodKey;
  contextKey: MoodContextKey;
}

export function applyMoodTurnOutcome(
  previous: MoodTurnState,
  outcome: MoodTurnOutcome,
  authenticated: boolean,
): MoodTurnState {
  if (!outcome.signal) return previous;
  return {
    checkedIn: !authenticated || Boolean(outcome.checkInId),
    signalId: outcome.signal.id,
    checkInId: outcome.checkInId,
    actionDone: false,
    mood: outcome.mood,
    contextKey: outcome.contextKey,
  };
}
