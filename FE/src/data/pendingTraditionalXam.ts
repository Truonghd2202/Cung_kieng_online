import type { TraditionalXamSaveRequest } from "./savedTraditionalXam";

const STORAGE_KEY = "tltl-pending-traditional-xam";

const COLLECTION_IDS = ["quan-am", "quan-thanh"];
const TOPICS = ["Bình an", "Học tập", "Công việc", "Gia đình"];

export function readPendingTraditionalXam():
  TraditionalXamSaveRequest | null {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return null;

    const value: unknown = JSON.parse(raw);

    if (
      !value ||
      typeof value !== "object" ||
      Array.isArray(value)
    ) {
      return null;
    }

    const item = value as Record<string, unknown>;

    if (
      typeof item.collectionId !== "string" ||
      !COLLECTION_IDS.includes(item.collectionId) ||
      typeof item.topic !== "string" ||
      !TOPICS.includes(item.topic) ||
      typeof item.stickId !== "string" ||
      !item.stickId.trim() ||
      typeof item.editionLabel !== "string" ||
      !item.editionLabel.trim()
    ) {
      return null;
    }

    return {
      collectionId:
        item.collectionId as TraditionalXamSaveRequest["collectionId"],
      topic: item.topic as TraditionalXamSaveRequest["topic"],
      stickId: item.stickId,
      editionLabel: item.editionLabel,
    };
  } catch {
    return null;
  }
}

export function writePendingTraditionalXam(
  request: TraditionalXamSaveRequest
): boolean {
  try {
    sessionStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(request)
    );

    return true;
  } catch {
    return false;
  }
}

export function clearPendingTraditionalXam(): boolean {
  try {
    sessionStorage.removeItem(STORAGE_KEY);
    return true;
  } catch {
    return false;
  }
}
