const repository = require("../repositories/content.repository");
const ApiError = require("../utils/api-error");
const { pickVerifiedProverb, toProverbDto } = require("./proverb.service");

const DAILY_PROVERB_EPOCH = Date.UTC(2026, 0, 1) / 86_400_000;

function vietnamDateKey(now = new Date()) {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "Asia/Ho_Chi_Minh",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(now);
  const value = Object.fromEntries(parts.map((part) => [part.type, part.value]));
  return `${value.year}-${value.month}-${value.day}`;
}

function dailyProverbIndex(dateKey, total) {
  const [year, month, day] = dateKey.split("-").map(Number);
  const serialDay = Date.UTC(year, month - 1, day) / 86_400_000;
  return ((serialDay - DAILY_PROVERB_EPOCH) % total + total) % total;
}

const REGION_LABELS = { NORTH: "Bắc Bộ", CENTRAL: "Trung Bộ", SOUTH: "Nam Bộ", NATIONWIDE: "Toàn quốc" };
function articleDto(row) { return { id: row.slug, slug: row.slug, title: row.title, excerpt: row.excerpt, category: row.category, region: REGION_LABELS[row.region] || row.region, image: row.image_url, source: row.source, verified: row.verified, ...row.content }; }
function ritualDto(row) { return { id: row.slug, title: row.title, desc: row.description, occasion: row.occasion, region: REGION_LABELS[row.region] || row.region, source: row.source, verified: row.verified, steps: row.ritual_steps.map((step) => ({ stepNumber: String(step.step_number), title: step.title, desc: step.description })), offerings: row.ritual_offerings.map((item) => ({ id: item.offerings.id, name: item.offerings.name, desc: item.offerings.description || "", quantity: item.quantity, required: item.required })), prayers: row.prayers.map((item) => ({ title: item.title, content: item.content, source: item.source })) }; }
function calendarDto(row) { return { id: row.id, title: row.title, shortDesc: row.description || "", day: row.day, month: row.month, type: "festival", typeLabel: row.category || "Sự kiện văn hóa", region: REGION_LABELS[row.region] || row.region, source: row.source, verified: row.verified, calendar: row.calendar }; }
async function listArticles(query) { return (await repository.listArticles(query)).map(articleDto); }
async function getArticle(slug) { const row = await repository.findArticle(slug); if (!row) throw new ApiError(404, "Culture article not found"); return articleDto(row); }
async function listRituals(query) { return (await repository.listRituals(query)).map(ritualDto); }
async function getRitual(slug) { const row = await repository.findRitual(slug); if (!row) throw new ApiError(404, "Ritual not found"); return ritualDto(row); }
async function listCalendarEvents(query) { return (await repository.listCalendarEvents(query)).map(calendarDto); }
async function getCalendarEvent(id) { const row = await repository.findCalendarEvent(id); if (!row || !row.active) throw new ApiError(404, "Calendar event not found"); return calendarDto(row); }
async function getDailyProverb(date = vietnamDateKey()) {
  const total = await repository.countDailyProverbs();
  if (total < 365) throw new ApiError(503, "Daily proverb catalog is not ready");
  const sequence = dailyProverbIndex(date, total);
  const row = await repository.findDailyProverb(sequence);
  if (!row) throw new ApiError(503, "Daily proverb is unavailable");
  return {
    id: row.id,
    date,
    sequence: sequence + 1,
    cycleLength: total,
    content: row.content,
    meaning: row.meaning,
    category: row.category,
    source: {
      name: "VIVID – Vietnamese Idioms and Proverbs Benchmark",
      url: row.source,
      license: "MIT",
    },
    verified: row.verified,
  };
}

async function getReflectionProverb(context) {
  const categories = context === "KEO"
    ? ["Đức tính", "Bài học cuộc sống"]
    : ["Bài học cuộc sống", "Đức tính", "Tình cảm"];
  const proverb = await pickVerifiedProverb({ categories });
  if (!proverb) throw new ApiError(503, "Reflection proverb is unavailable");
  return toProverbDto(proverb);
}

module.exports = { listArticles, getArticle, listRituals, getRitual, listCalendarEvents, getCalendarEvent, getDailyProverb, getReflectionProverb, dailyProverbIndex, vietnamDateKey };
