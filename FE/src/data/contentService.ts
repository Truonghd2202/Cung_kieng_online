import { apiRequest } from "../lib/api";
import { isDemoMode } from "./demoMode";
import { DEMO_CALENDAR_ITEMS, DEMO_CULTURE_ITEMS, DEMO_RITUAL_ITEMS } from "./demoContent";

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
  if (isDemoMode()) return DEMO_CULTURE_ITEMS;
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
  if (isDemoMode()) return DEMO_RITUAL_ITEMS;
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
  isDemoMode()
    ? Promise.resolve(DEMO_RITUAL_ITEMS.find((item) => item.slug === slug || item.id === slug) ?? DEMO_RITUAL_ITEMS[0])
    : apiRequest<RemoteContentItem>(`/content/rituals/${encodeURIComponent(slug)}`);
export const loadCalendarEvents = () => isDemoMode()
  ? Promise.resolve(DEMO_CALENDAR_ITEMS)
  : loadAllItems("/content/calendar/events");
export const loadCalendarEvent = (id: string) => isDemoMode()
  ? Promise.resolve(DEMO_CALENDAR_ITEMS.find((item) => item.id === id) ?? DEMO_CALENDAR_ITEMS[0])
  : apiRequest<RemoteContentItem>(`/content/calendar/events/${encodeURIComponent(id)}`);
export const loadDailyProverb = () => isDemoMode()
  ? Promise.resolve({
      id: "demo-ca-dao-tri-an",
      date: new Date().toISOString().slice(0, 10),
      sequence: 1,
      cycleLength: 1,
      content: "Ăn quả nhớ kẻ trồng cây",
      meaning: "Lời nhắc về lòng biết ơn; câu chữ có thể có dị bản theo nguồn sưu tầm.",
      category: "Tục ngữ",
      source: { name: "Ca dao Mẹ · mục Dị bản", url: "https://cadao.me/an-qua-nho-ke-trong-cay/", license: "Trang sưu tầm; cần đối chiếu dị bản" },
      verified: false,
    })
  : apiRequest<DailyProverb>("/content/daily-proverb");
