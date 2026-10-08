
const prisma = require("../config/prisma");
const signalRepository = require("../repositories/signal.repository");
const moodRepository = require("../repositories/mood.repository");
const ApiError = require("../utils/api-error");

const MOOD_TO_DB = Object.freeze({
  "An yên": "PEACEFUL",
  "Chênh vênh": "UNSTABLE",
  "Băn khoăn": "WORRIED",
  "Nôn nóng": "IMPATIENT",
  "Biết ơn": "GRATEFUL",
  "Cần điểm tựa": "NEED_SUPPORT",
});

const DB_TO_MOOD = Object.freeze(Object.fromEntries(
  Object.entries(MOOD_TO_DB).map(([label, value]) => [value, label]),
));

function toDbMood(label) {
  return MOOD_TO_DB[label] || label;
}

function toMoodLabel(value) {
  return DB_TO_MOOD[value] || value;
}

function parseContent(row) {
  try {
    const parsed = JSON.parse(row.content);
    if (parsed && typeof parsed === "object") return parsed;
  } catch {
    // Legacy plain-text signal content is handled by the fallback below.
  }

  return {
    moodDesc: row.advice || "Một khoảng dừng dịu dàng cho hôm nay.",
    badge: "CHIÊM NGHIỆM HÔM NAY",
    poem: { line1: row.title || "Một lời nhắc an lành", line2: row.content, subtext: row.source || "" },
    research: { title: "TƯ LIỆU THAM KHẢO", source: row.source || "", region: "", note: "" },
    reflection: { title: "Góc nhìn soi tỏ", highlightWord: "an lành", content: row.content, advice: row.advice || "Thở chậm ba lần", signalNumber: row.id },
    action: { title: "Trở về với hơi thở", duration: "2 PHÚT", description: "Hít vào chậm, thở ra dài.", buttonLabel: "Đánh dấu đã thực hiện hành động này ✓", tag: "HÀNH ĐỘNG NUÔI TÂM" },
    artwork: { tag: "Không gian an trú", image: "/images/tea_bowl.jpg", caption: "Một khoảng lặng" },
    loadingFacts: { breathingText: "Hít vào tĩnh lặng, thở ra nhẹ nhàng...", thoughtTitle: "TÂM NIỆM", thoughtContent: "Tâm bình thì đường đi sáng rõ.", originTitle: "GỢI NHẮC CỘI NGUỒN", originContent: "Lắng nghe bản thân là bước đầu của sự chăm sóc.", stepText: "Chắt lọc một lời nhắc dịu dàng..." },
    guestPreview: { title: "MẠCH NGUỒN AN LÀNH", message: "Bắt đầu từ một hơi thở chậm." },
  };
}

function toPublicSignal(row) {
  return {
    id: row.source || row.id,
    dbId: row.id,
    mood: toMoodLabel(row.mood),
    title: row.title,
    category: row.category,
    source: row.source,
    ...parseContent(row),
  };
}

function formatDate(date) {
  return new Intl.DateTimeFormat("vi-VN", { timeZone: "Asia/Ho_Chi_Minh" }).format(date);
}

function toSavedSignal(checkIn, starredIds = new Set()) {
  if (!checkIn.signals) return null;
  const signal = toPublicSignal(checkIn.signals);
  return {
    id: checkIn.id,
    signalId: signal.id,
    mood: signal.mood,
    date: formatDate(checkIn.created_at),
    createdAt: checkIn.created_at.getTime(),
    journal: checkIn.note || undefined,
    poemLine1: signal.poem.line1,
    poemLine2: signal.poem.line2,
    actionTitle: signal.action.title,
    starred: starredIds.has(checkIn.signals.id),
  };
}

async function listSignals({ mood, limit }) {
  const rows = await signalRepository.listActive({ mood: mood ? toDbMood(mood) : undefined, limit });
  return rows.map(toPublicSignal);
}

async function getSignal(id) {
  const row = await signalRepository.findActiveByIdOrSource(id);
  if (!row) throw new ApiError(404, "Signal not found");
  return toPublicSignal(row);
}

async function resolveForMood(mood, signalId) {
  let row;
  if (signalId) row = await signalRepository.findActiveByIdOrSource(signalId);
  if (!row) row = await signalRepository.findFirstByMood(toDbMood(mood));
  if (!row) throw new ApiError(404, "No signal is available for this mood");
  if (mood && row.mood !== toDbMood(mood)) throw new ApiError(422, "Signal does not match the selected mood");
  return row;
}

async function getSavedSignals(userId, limit = 100) {
  const rows = await moodRepository.listForUser(userId, { limit });
  const signalIds = rows.filter((row) => row.signals).map((row) => row.signals.id);
  const favorites = await signalRepository.findFavorites(userId, signalIds);
  const starredIds = new Set(favorites.map((favorite) => favorite.target_id));
  return rows.map((row) => toSavedSignal(row, starredIds)).filter(Boolean);
}

async function saveSignal(userId, signalId, input) {
  const signal = await resolveForMood(undefined, signalId);
  let checkIn;

  if (input.checkInId) {
    checkIn = await moodRepository.findByIdForUser(input.checkInId, userId);
    if (!checkIn) throw new ApiError(404, "Check-in not found");
    if (!checkIn.signals || checkIn.signals.id !== signal.id) throw new ApiError(422, "Check-in does not match the signal");
    const updated = await moodRepository.update(input.checkInId, userId, {
      ...(input.note !== undefined ? { note: input.note || null } : {}),
      ...(input.actionDone !== undefined ? { action_done: input.actionDone } : {}),
    });
    checkIn = updated.count
      ? await moodRepository.findByIdForUser(input.checkInId, userId)
      : checkIn;
  } else {
    checkIn = await moodRepository.create({
      user_id: userId,
      mood: signal.mood,
      signal_id: signal.id,
      note: input.note || null,
      action_done: Boolean(input.actionDone),
    });
  }

  return toSavedSignal(checkIn);
}

async function updateSavedSignal(userId, checkInId, starred) {
  const checkIn = await moodRepository.findByIdForUser(checkInId, userId);
  if (!checkIn || !checkIn.signals) throw new ApiError(404, "Saved signal not found");
  if (starred) await signalRepository.addFavorite(userId, checkIn.signals.id);
  else await signalRepository.removeFavorite(userId, checkIn.signals.id);
  return toSavedSignal(checkIn, starred ? new Set([checkIn.signals.id]) : new Set());
}

async function deleteSavedSignal(userId, checkInId) {
  const checkIn = await moodRepository.findByIdForUser(checkInId, userId);
  if (!checkIn) throw new ApiError(404, "Saved signal not found");
  await prisma.$transaction(async (transaction) => {
    if (checkIn.signals) await signalRepository.removeFavoriteForCheckIn(userId, checkIn.signals.id, transaction);
    const removed = await moodRepository.remove(checkInId, userId, transaction);
    if (removed.count !== 1) throw new ApiError(404, "Saved signal not found");
  });
}

module.exports = {
  MOOD_TO_DB,
  DB_TO_MOOD,
  toDbMood,
  toMoodLabel,
  toPublicSignal,
  toSavedSignal,
  listSignals,
  getSignal,
  resolveForMood,
  getSavedSignals,
  saveSignal,
  updateSavedSignal,
  deleteSavedSignal,
};
