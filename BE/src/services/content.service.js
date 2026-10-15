const repository = require("../repositories/content.repository");
const ApiError = require("../utils/api-error");
const env = require("../config/env");
const { pickVerifiedProverb, toProverbDto } = require("./proverb.service");
const { resolveReviewMetadata } = require("./content-review-metadata");

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
function ritualDto(row, previewMode = false) { return { id: row.slug, slug: row.slug, title: row.title, desc: row.description, occasion: row.occasion, region: REGION_LABELS[row.region] || row.region, source: row.source, verified: row.verified, contentProvenance: row.content_provenance || null, checklists: Array.isArray(row.checklists) ? row.checklists : [], preview: previewMode && (row.verified !== true || row.prayers.some((item) => item.verified !== true)), reviewMetadata: row.reviewMetadata, steps: row.ritual_steps.map((step) => ({ stepNumber: String(step.step_number), title: step.title, desc: step.description })), offerings: row.ritual_offerings.map((item) => ({ id: item.offerings.id, name: item.offerings.name, desc: item.offerings.description || item.note || "", quantity: item.quantity, required: item.required })), prayers: row.prayers.map((item) => ({ title: item.title, content: item.content, source: item.source, verified: item.verified, preview: previewMode && (item.verified !== true || !item.reviewMetadata), reviewMetadata: item.reviewMetadata, applicableTo: row.occasion })) }; }
function calendarDto(row) { return { id: row.id, title: row.title, shortDesc: row.description || "", day: row.day, month: row.month, type: "festival", typeLabel: row.category || "Sự kiện văn hóa", region: REGION_LABELS[row.region] || row.region, source: row.source, verified: row.verified, calendar: row.calendar }; }
async function listArticles(query) { return (await repository.listArticles(query)).map(articleDto); }
async function getArticle(slug) { const row = await repository.findArticle(slug); if (!row) throw new ApiError(404, "Culture article not found"); return articleDto(row); }
async function attachPrayerReviewMetadata(rows, { includeDrafts = false } = {}) {
  const records = Array.isArray(rows) ? rows : [rows];
  const ids = [...new Set(records.flatMap((row) => row.prayers.map((prayer) => prayer.id)))];
  if (!ids.length) return rows;
  const logs = await repository.findPrayerReviewLogs(ids);
  const logsByTarget = new Map();
  for (const log of logs) {
    if (!logsByTarget.has(log.target_id)) logsByTarget.set(log.target_id, []);
    logsByTarget.get(log.target_id).push(log);
  }
  for (const row of records) {
    row.prayers = row.prayers.filter((prayer) => {
      const review = resolveReviewMetadata(logsByTarget.get(prayer.id) || [], prayer.verified === true);
      if (prayer.verified !== true || !review || !/^https:\/\//i.test(prayer.source || "")) {
        prayer.reviewMetadata = null;
        return includeDrafts;
      }
      prayer.reviewMetadata = review;
      return true;
    });
  }
  return rows;
}
async function attachRitualReviewMetadata(rows) {
  const records = Array.isArray(rows) ? rows : [rows];
  const ids = records.map((row) => row.id);
  if (!ids.length) return rows;
  const logs = await repository.findRitualReviewLogs(ids);
  const logsByTarget = new Map();
  for (const log of logs) {
    if (!logsByTarget.has(log.target_id)) logsByTarget.set(log.target_id, []);
    logsByTarget.get(log.target_id).push(log);
  }
  for (const row of records) row.reviewMetadata = resolveReviewMetadata(
    logsByTarget.get(row.id) || [],
    row.verified === true,
    { provenance: row.content_provenance },
  );
  return rows;
}
async function listRituals(query) { const previewMode = query.preview === true && env.NODE_ENV === "development"; const rows = await repository.listRituals({ ...query, preview: previewMode }); await Promise.all([attachPrayerReviewMetadata(rows, { includeDrafts: previewMode }), attachRitualReviewMetadata(rows)]); return rows.filter((row) => previewMode || row.reviewMetadata).map((row) => ritualDto(row, previewMode)); }
async function getRitual(slug, requestedPreview = false) { const previewMode = requestedPreview && env.NODE_ENV === "development"; const row = await repository.findRitual(slug, undefined, previewMode); if (!row) throw new ApiError(404, "Ritual not found"); await Promise.all([attachPrayerReviewMetadata(row, { includeDrafts: previewMode }), attachRitualReviewMetadata(row)]); if (!previewMode && !row.reviewMetadata) throw new ApiError(404, "Ritual is not eligible for public delivery"); return ritualDto(row, previewMode); }
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
