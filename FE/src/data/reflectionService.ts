import { apiRequest } from "../lib/api";
import { trackProductEvent } from "./productAnalytics";
import type { SavedWishItem, SavedXinXamItem } from "../screens/AccountScreen";
import type { ContentMetadata } from "./contentMetadata";

export interface SourcedProverb {
  id: string;
  content: string;
  meaning: string;
  category: string;
  source: { name: string; url: string; license: string };
  verified: boolean;
}

export function loadSavedXam(): Promise<SavedXinXamItem[]> {
  return apiRequest<{ items: SavedXinXamItem[] }>("/reflections/xin-xam").then((result) => result.items);
}

export function saveXam(result: {
  drawId?: string;
  stickNumber: string;
  topic: string;
  region: string;
  category?: string;
  fortuneType?: string;
  sealText?: string;
  quote: string;
}): Promise<SavedXinXamItem> {
  return apiRequest<SavedXinXamItem>("/reflections/xin-xam", {
    method: "POST",
    body: JSON.stringify({
      drawId: result.drawId?.startsWith("guest:") ? undefined : result.drawId,
      stickNumber: result.stickNumber,
      xamType: result.topic,
      region: result.region,
      category: result.category || result.topic,
      fortuneType: result.fortuneType || result.sealText,
      quote: result.quote,
    }),
  });
}

export interface XinXamDrawResponse extends SavedXinXamItem {
  active: boolean;
  xamType: string;
  classification: string;
  rank: "Thượng Xăm" | "Trung Xăm" | "Hạ Xăm";
  classificationGroup: "CAT" | "NEUTRAL" | "CAUTION";
  poem: string | null;
  originalContent: {
    poem: string | null;
    meaning: string;
    advice: string;
    metadata: ContentMetadata;
  };
  aiExplanation: {
    content: string;
    metadata: ContentMetadata;
  } | null;
  meaning: string;
  advice: string;
  disclaimer: string;
  interpretation: {
    summary: string;
    recommendation: string;
    warning: string;
  };
  proverb: SourcedProverb | null;
}

export function drawXinXam(region: string, topic: string, question?: string): Promise<XinXamDrawResponse> {
  return apiRequest<XinXamDrawResponse>("/xam/draw", {
    method: "POST",
    body: JSON.stringify({ region, topic, question }),
  }).then((result) => {
    trackProductEvent("xam_draw_completed");
    return result;
  });
}

export function updateSavedXam(id: string, starred: boolean) {
  return apiRequest<SavedXinXamItem>(`/reflections/xin-xam/${encodeURIComponent(id)}`, {
    method: "PATCH",
    body: JSON.stringify({ starred }),
  });
}

export function deleteSavedXam(id: string) {
  return apiRequest(`/reflections/xin-xam/${encodeURIComponent(id)}`, { method: "DELETE" });
}

export function loadSavedWishes(): Promise<SavedWishItem[]> {
  return apiRequest<{ items: SavedWishItem[] }>("/wishes").then((result) => result.items);
}

export function saveWish(content: string, category: string): Promise<SavedWishItem> {
  return apiRequest<SavedWishItem>("/wishes", {
    method: "POST",
    body: JSON.stringify({ content, category }),
  });
}

export function updateSavedWish(id: string, starred: boolean) {
  return apiRequest<SavedWishItem>(`/wishes/${encodeURIComponent(id)}`, {
    method: "PATCH",
    body: JSON.stringify({ starred }),
  });
}

export function deleteSavedWish(id: string) {
  return apiRequest(`/wishes/${encodeURIComponent(id)}`, { method: "DELETE" });
}

export interface XinKeoCast {
  type: "nhat-am-nhat-duong" | "nhi-duong" | "nhi-am";
  piece1: "am" | "duong";
  piece2: "am" | "duong";
  proverb: SourcedProverb | null;
}

export function createXinKeoSession(question: string, drawId?: string): Promise<{ id: string }> {
  return apiRequest<{ id: string }>("/reflections/xin-keo/sessions", {
    method: "POST",
    body: JSON.stringify({ question, drawId }),
  });
}

export function castXinKeo(sessionId: string): Promise<XinKeoCast> {
  return apiRequest<XinKeoCast>("/xam/toss-keo", {
    method: "POST",
    body: JSON.stringify({ sessionId }),
  });
}

export function loadReflectionProverb(context: "XAM" | "KEO"): Promise<SourcedProverb> {
  return apiRequest<SourcedProverb>(`/content/reflection-proverb?context=${context}`);
}
