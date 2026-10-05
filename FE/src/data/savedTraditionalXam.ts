import { useMemo, useSyncExternalStore } from "react";
import {
  TRADITIONAL_XAM_COLLECTIONS,
  TRADITIONAL_XAM_TEST_MODE,
  type TraditionalXamCollectionId,
} from "./traditionalXamData";
import { getPublishableTraditionalSticks } from
  "./traditionalXamEligibility";
import type { TopicType } from "./xinXamData";

export interface TraditionalXamSaveRequest {
  collectionId: TraditionalXamCollectionId;
  topic: TopicType;
  stickId: string;
  editionLabel: string;
}

export const TRADITIONAL_XAM_CHANGED_EVENT =
  "tltl-traditional-xam-change";

export interface SavedXamSource {
  title: string;
  url?: string;
  locator?: string;
  bibliographicReference?: string;
}

export interface SavedTraditionalXamItem {
  id: string;
  collectionId: TraditionalXamCollectionId;
  collectionTitle: string;
  editionLabel: string;
  stickId: string;
  stickNumber: string;
  topic: TopicType;
  savedAt: number;
  originalLines: string[];
  translationLines: string[];
  translationAttribution: string;
  reflection: string;
  culturalContext?: {
    title: string;
    description: string;
    sourceLocator: string;
  };
  sourceTitles: string[];
  sourceReferences?: SavedXamSource[];
}

const TOPICS: TopicType[] = [
  "Bình an",
  "Học tập",
  "Công việc",
  "Gia đình",
];

export function getTraditionalXamStorageKey(email: string) {
  const account = email.trim().toLowerCase();

  return TRADITIONAL_XAM_TEST_MODE
    ? `tltl-test-traditional-xam_${account}`
    : `tltl-traditional-xam_${account}`;
}

function isStringArray(value: unknown): value is string[] {
  return (
    Array.isArray(value) &&
    value.every((item) => typeof item === "string")
  );
}

function isCulturalContext(value: unknown): boolean {
  // Chấp nhận dữ liệu cũ chưa có trường này.
  if (value === undefined) return true;

  if (
    !value ||
    typeof value !== "object" ||
    Array.isArray(value)
  ) {
    return false;
  }

  const context = value as Record<string, unknown>;

  return (
    typeof context.title === "string" &&
    Boolean(context.title.trim()) &&
    typeof context.description === "string" &&
    Boolean(context.description.trim()) &&
    typeof context.sourceLocator === "string" &&
    Boolean(context.sourceLocator.trim())
  );
}

export function isSafeSourceUrl(value: unknown): value is string {
  if (typeof value !== "string") return false;

  try {
    const url = new URL(value);

    return (
      url.protocol === "https:" ||
      url.protocol === "http:"
    );
  } catch {
    return false;
  }
}

function isSourceReferences(value: unknown): boolean {
  // Dữ liệu cũ chỉ có sourceTitles.
  if (value === undefined) return true;
  if (!Array.isArray(value)) return false;

  return value.every((source: unknown) => {
    if (
      !source ||
      typeof source !== "object" ||
      Array.isArray(source)
    ) {
      return false;
    }

    const item = source as Record<string, unknown>;

    return (
      typeof item.title === "string" &&
      Boolean(item.title.trim()) &&
      (
        item.url === undefined ||
        isSafeSourceUrl(item.url)
      ) &&
      (
        item.locator === undefined ||
        typeof item.locator === "string"
      ) &&
      (
        item.bibliographicReference === undefined ||
        typeof item.bibliographicReference === "string"
      )
    );
  });
}

function isSavedItem(
  value: unknown
): value is SavedTraditionalXamItem {
  if (!value || typeof value !== "object") return false;

  const item = value as Record<string, unknown>;

  return (
    typeof item.id === "string" &&
    Boolean(item.id.trim()) &&
    (item.collectionId === "quan-am" ||
      item.collectionId === "quan-thanh") &&
    typeof item.collectionTitle === "string" &&
    typeof item.editionLabel === "string" &&
    typeof item.stickId === "string" &&
    typeof item.stickNumber === "string" &&
    TOPICS.includes(item.topic as TopicType) &&
    typeof item.savedAt === "number" &&
    Number.isFinite(item.savedAt) &&
    item.savedAt > 0 &&
    isStringArray(item.originalLines) &&
    item.originalLines.length > 0 &&
    isStringArray(item.translationLines) &&
    item.translationLines.length > 0 &&
    typeof item.translationAttribution === "string" &&
    typeof item.reflection === "string" &&
    isCulturalContext(item.culturalContext) &&
    isStringArray(item.sourceTitles) &&
    isSourceReferences(item.sourceReferences)
  );
}

function parseItems(
  raw: string
): SavedTraditionalXamItem[] | null {
  try {
    const parsed: unknown = JSON.parse(raw);

    if (
      !Array.isArray(parsed) ||
      !parsed.every(isSavedItem)
    ) {
      return null;
    }

    const ids = parsed.map((item) => item.id);

    if (new Set(ids).size !== ids.length) return null;

    return parsed;
  } catch {
    return null;
  }
}

function readRaw(email?: string): string {
  if (!email?.trim()) return "[]";

  try {
    return (
      localStorage.getItem(
        getTraditionalXamStorageKey(email)
      ) ?? "[]"
    );
  } catch {
    // Giá trị không hợp lệ để UI hiển thị lỗi đọc.
    return "null";
  }
}

function subscribe(listener: () => void) {
  window.addEventListener("storage", listener);
  window.addEventListener(
    TRADITIONAL_XAM_CHANGED_EVENT,
    listener
  );

  return () => {
    window.removeEventListener("storage", listener);
    window.removeEventListener(
      TRADITIONAL_XAM_CHANGED_EVENT,
      listener
    );
  };
}

export function useSavedTraditionalXam(email?: string) {
  const raw = useSyncExternalStore(
    subscribe,
    () => readRaw(email),
    () => "[]"
  );

  return useMemo(() => {
    const parsed = parseItems(raw);

    return {
      items: parsed ?? [],
      readError: parsed === null,
    };
  }, [raw]);
}

function updateItems(
  email: string,
  update: (
    latest: SavedTraditionalXamItem[]
  ) => SavedTraditionalXamItem[]
): boolean {
  if (!email.trim()) return false;

  try {
    const latest = parseItems(readRaw(email));

    // Không ghi đè kho lỗi bằng một danh sách rỗng.
    if (latest === null) return false;

    const next = update(latest);

    if (parseItems(JSON.stringify(next)) === null) {
      return false;
    }

    localStorage.setItem(
      getTraditionalXamStorageKey(email),
      JSON.stringify(next)
    );

    window.dispatchEvent(
      new Event(TRADITIONAL_XAM_CHANGED_EVENT)
    );

    return true;
  } catch {
    return false;
  }
}

export function saveTraditionalXam(
  email: string,
  collectionId: TraditionalXamCollectionId,
  topic: TopicType,
  stickId: string
): boolean {
  const collection = TRADITIONAL_XAM_COLLECTIONS.find(
    (item) => item.id === collectionId
  );

  const stick = getPublishableTraditionalSticks(
    collectionId,
    topic
  ).find((item) => item.id === stickId);

  const translation = stick?.translation;
  const reflection = stick?.reflectionByTopic[topic];

  if (
    !collection ||
    !stick ||
    !translation ||
    !reflection
  ) {
    return false;
  }

  return updateItems(email, (latest) => {
    // Đợt này lưu theo thẻ + bản tư liệu + chủ đề,
    // không tạo lịch sử riêng cho mỗi lần rút lại.
    const exists = latest.some(
      (item) =>
        item.collectionId === collectionId &&
        item.editionLabel === collection.editionLabel &&
        item.stickId === stickId &&
        item.topic === topic
    );

    if (exists) return latest;

    const sourceReferences: SavedXamSource[] = [];
    const seenSources = new Set<string>();

    for (const source of [
      ...stick.metadata.sources,
      ...translation.metadata.sources,
    ]) {
      const reference: SavedXamSource = {
        title: source.title,
        ...(source.url && isSafeSourceUrl(source.url)
          ? { url: source.url }
          : {}),
        ...(source.locator
          ? { locator: source.locator }
          : {}),
        ...(source.bibliographicReference
          ? { bibliographicReference: source.bibliographicReference }
          : {}),
      };

      const signature = JSON.stringify(reference);

      if (!seenSources.has(signature)) {
        seenSources.add(signature);
        sourceReferences.push(reference);
      }
    }

    const saved: SavedTraditionalXamItem = {
      id: crypto.randomUUID(),
      collectionId,
      collectionTitle: collection.title,
      editionLabel: collection.editionLabel,
      stickId,
      stickNumber: stick.stickNumber,
      topic,
      savedAt: Date.now(),
      originalLines: [...stick.originalLines],
      translationLines: [...translation.lines],
      translationAttribution: translation.attribution,
      reflection,
      sourceReferences,

      ...(stick.culturalContext
        ? {
            culturalContext: {
              ...stick.culturalContext,
            },
          }
        : {}),

      sourceTitles: [
        ...new Set([
          ...stick.metadata.sources.map(
            (source) => source.title
          ),
          ...translation.metadata.sources.map(
            (source) => source.title
          ),
        ]),
      ],
    };

    return [saved, ...latest];
  });
}

export function deleteTraditionalXam(
  email: string,
  id: string
): boolean {
  return updateItems(
    email,
    (latest) => latest.filter((item) => item.id !== id)
  );
}
