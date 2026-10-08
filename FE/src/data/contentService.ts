import { apiRequest } from "../lib/api";

export interface RemoteContentItem {
  id: string;
  title: string;
  [key: string]: unknown;
}

export interface DailyProverb {
  id: string;
  date: string;
  sequence: number;
  cycleLength: number;
  content: string;
  meaning: string;
  category: string;
  source: {
    name: string;
    url: string;
    license: string;
  };
  verified: boolean;
}

async function loadItems(path: string): Promise<RemoteContentItem[]> {
  const result = await apiRequest<{ items: RemoteContentItem[] }>(path);
  return result.items;
}

export const loadCultureArticles = () => loadItems("/content/culture");
export const loadRituals = () => loadItems("/content/rituals");
export const loadCalendarEvents = () => loadItems("/content/calendar/events");
export const loadDailyProverb = () => apiRequest<DailyProverb>("/content/daily-proverb");
