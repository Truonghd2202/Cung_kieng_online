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

async function loadAllItems(path: string): Promise<RemoteContentItem[]> {
  const pageSize = 100;
  const items: RemoteContentItem[] = [];
  for (let offset = 0; ; offset += pageSize) {
    const separator = path.includes("?") ? "&" : "?";
    const page = await loadItems(`${path}${separator}limit=${pageSize}&offset=${offset}`);
    items.push(...page);
    if (page.length < pageSize) return items;
  }
}

export const loadCultureArticles = async () => {
  const pageSize = 100;
  const items: RemoteContentItem[] = [];
  let offset = 0;
  for (;;) {
    const page = await apiRequest<{ items: RemoteContentItem[]; nextOffset: number | null }>(
      `/content/culture?limit=${pageSize}&offset=${offset}`,
    );
    items.push(...page.items);
    if (page.nextOffset === null) return items;
    offset = page.nextOffset;
  }
};
export const loadRituals = async () => {
  const pageSize = 100;
  const items: RemoteContentItem[] = [];
  let offset = 0;
  for (;;) {
    const page = await apiRequest<{ items: RemoteContentItem[]; nextOffset: number | null }>(
      `/content/rituals?limit=${pageSize}&offset=${offset}`,
    );
    items.push(...page.items);
    if (page.nextOffset === null) return items;
    offset = page.nextOffset;
  }
};
export const loadRitual = (slug: string) =>
  apiRequest<RemoteContentItem>(`/content/rituals/${encodeURIComponent(slug)}`);
export const loadCalendarEvents = () => loadAllItems("/content/calendar/events");
export const loadCalendarEvent = (id: string) => apiRequest<RemoteContentItem>(`/content/calendar/events/${encodeURIComponent(id)}`);
export const loadDailyProverb = () => apiRequest<DailyProverb>("/content/daily-proverb");
