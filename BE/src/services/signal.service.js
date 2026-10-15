
const prisma = require("../config/prisma");
const signalRepository = require("../repositories/signal.repository");
const moodRepository = require("../repositories/mood.repository");
const ApiError = require("../utils/api-error");
const aiService = require("./ai.service");
const checkInCatalog = require("../../../shared/checkin-catalog.json");
const { removeLegacyEditorialState } = require("./signal-publication");
const {
  issueResult,
  readResult,
} = require("../utils/signal-result-token");

const MOOD_TO_DB = Object.freeze(Object.fromEntries(
  checkInCatalog.moods.map(({ label, key }) => [label, key]),
));

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
  const content = removeLegacyEditorialState(parseContent(row)) || parseContent(row);
  const editorialStatus = row.active === false
    ? (row.editorial_status === "REVOKED" ? "revoked" : "hidden")
    : String(row.editorial_status || "DRAFT").toLowerCase().replaceAll("_", "-");
  const reviewProfile = row.reviewed_by && row.reviewed_at && row.reviewer?.full_name
    ? { reviewedBy: row.reviewer.full_name, reviewedOn: new Date(row.reviewed_at).toISOString().slice(0, 10) }
    : {};
  return {
    id: row.source || row.id,
    dbId: row.id,
    mood: toMoodLabel(row.mood),
    contextKey: row.context_key || "general",
    title: row.title,
    category: row.category,
    source: row.source,
    ...content,
    metadata: {
      ...(content.metadata || {}),
      editorialStatus,
      ...reviewProfile,
    },
  };
}

function formatDate(date) {
  return new Intl.DateTimeFormat("vi-VN", { timeZone: "Asia/Ho_Chi_Minh" }).format(date);
}

function toCheckInSignal(checkIn) {
  if (!checkIn.signals) return null;
  const currentSignal = toPublicSignal(checkIn.signals);
  const snapshot = checkIn.signal_snapshot || {};
  const snapshotMetadata = { ...(snapshot.metadata || {}) };
  delete snapshotMetadata.reviewedBy;
  delete snapshotMetadata.reviewedOn;
  const currentMetadata = currentSignal.metadata || {};
  return {
    ...currentSignal,
    ...snapshot,
    metadata: {
      ...currentMetadata,
      ...snapshotMetadata,
      editorialStatus: currentMetadata.editorialStatus,
      ...(currentMetadata.reviewedBy ? { reviewedBy: currentMetadata.reviewedBy } : {}),
      ...(currentMetadata.reviewedOn ? { reviewedOn: currentMetadata.reviewedOn } : {}),
    },
    id: checkIn.signals.source || checkIn.signals.id,
    mood: toMoodLabel(checkIn.mood),
    contextKey: checkIn.context_key || "general",
  };
}

function toSavedSignal(checkIn, starredIds = new Set()) {
  if (!checkIn.signals) return null;
  const signal = toCheckInSignal(checkIn);
  return {
    id: checkIn.id,
    signalId: signal.id,
    mood: signal.mood,
    contextKey: checkIn.context_key || "general",
    signalSnapshot: signal,
    actionDone: checkIn.action_done,
    date: formatDate(checkIn.created_at),
    createdAt: checkIn.created_at.getTime(),
    journal: checkIn.note || undefined,
    poemLine1: signal.poem.line1,
    poemLine2: signal.poem.line2,
    actionTitle: signal.action.title,
    contentStatus: signalRepository.isPublishable(checkIn.signals) ? "available" : "withdrawn",
    starred: starredIds.has(checkIn.signals.id),
  };
}

async function listSignals({ mood, limit, contextKey = "general" }) {
  const rows = await signalRepository.listActive({ mood: mood ? toDbMood(mood) : undefined, limit, contextKey });
  return rows.map(toPublicSignal);
}

async function analyzeForMood({ mood, contextKey = "general", signalId, excludeSignalId }) {
  const row = signalId
    ? await signalRepository.findActiveByIdOrSource(signalId)
    : excludeSignalId
      ? await signalRepository.findNextForMoodContext(toDbMood(mood), contextKey, excludeSignalId)
      : await signalRepository.findForMoodContext(toDbMood(mood), contextKey);
  if (!row) throw new ApiError(signalId ? 404 : 503, signalId ? "Signal not found" : "No curated signal is available for this mood and context");
  if (row.mood !== toDbMood(mood) || (row.context_key || "general") !== contextKey) {
    throw new ApiError(422, "Signal does not match the selected mood and context");
  }
  const enriched = await aiService.enrichSignal(toPublicSignal(row), { mood, contextKey });
  return { signal: enriched.signal, aiUsed: enriched.aiUsed };
}

async function getSignal(id) {
  const row = await signalRepository.findActiveByIdOrSource(id);

  if (!row) {
    throw new ApiError(404, "Signal not found");
  }

  return issueResult(toPublicSignal(row));
}

async function resolveForMood(mood, signalId, contextKey = "general") {
  let row;
  if (signalId) row = await signalRepository.findActiveByIdOrSource(signalId);
  if (signalId && !row) throw new ApiError(404, "Signal not found");
  if (!row) row = await signalRepository.findForMoodContext(toDbMood(mood), contextKey);
  if (!row) throw new ApiError(404, "No signal is available for this mood");
  if (mood && row.mood !== toDbMood(mood)) throw new ApiError(422, "Signal does not match the selected mood");
  if ((row.context_key || "general") !== contextKey) throw new ApiError(422, "Signal does not match the selected context");
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
  function assertSameSavedRequest(existing) {
    const differentMood =
      input.mood &&
      existing.mood !== toDbMood(input.mood);

    const differentContext =
      input.contextKey &&
      (existing.context_key || "general") !== input.contextKey;

    const differentNote =
      input.note !== undefined &&
      (existing.note || null) !== (input.note || null);

    const differentSignal =
      signalId &&
      ![
        existing.signals?.id,
        existing.signals?.source,
      ].includes(signalId);

    const differentCheckIn =
      input.checkInId &&
      input.checkInId !== existing.id;

    if (
      differentMood ||
      differentContext ||
      differentNote ||
      differentSignal ||
      differentCheckIn
    ) {
      throw new ApiError(
        409,
        "Idempotency key was already used for a different saved result",
      );
    }
  }

  // Nếu lần lưu trước đã thành công, trả lại bản đó.
  if (input.idempotencyKey) {
    const existing = await moodRepository.findByIdempotencyKey(
      userId,
      input.idempotencyKey,
    );

    if (existing?.saved_at) {
      assertSameSavedRequest(existing);
      return toSavedSignal(existing);
    }
  }

  const mood = input.mood
    ? toDbMood(input.mood)
    : undefined;

  const contextKey = input.contextKey || "general";

  const row = await resolveForMood(
    mood,
    signalId,
    contextKey,
  );

  let checkIn;

  if (input.checkInId) {
    // Người đã đăng nhập: dùng kết quả có sẵn trên server.
    checkIn = await moodRepository.findByIdForUser(
      input.checkInId,
      userId,
    );

    if (!checkIn) {
      throw new ApiError(404, "Check-in not found");
    }

    if (
      !checkIn.signals ||
      checkIn.signals.id !== row.id
    ) {
      throw new ApiError(
        422,
        "Check-in does not match the signal",
      );
    }

    const updated = await moodRepository.update(
      input.checkInId,
      userId,
      {
        saved_at: checkIn.saved_at || new Date(),

        ...(input.note !== undefined
          ? { note: input.note || null }
          : {}),

        ...(input.actionDone !== undefined
          ? { action_done: input.actionDone }
          : {}),
      },
    );

    if (updated.count !== 1) {
      throw new ApiError(404, "Check-in not found");
    }

    checkIn = await moodRepository.findByIdForUser(
      input.checkInId,
      userId,
    );

    if (!checkIn) {
      throw new ApiError(404, "Check-in not found");
    }
  } else {
    // Khách vừa đăng nhập: chỉ nhận kết quả có chữ ký server.
    const signal = readResult(input.resultToken);

    if (
      signal.dbId !== row.id ||
      signal.id !== (row.source || row.id) ||
      signal.mood !== toMoodLabel(row.mood) ||
      signal.contextKey !== contextKey
    ) {
      throw new ApiError(
        422,
        "Kết quả không khớp với cảm xúc và chủ đề đã chọn.",
      );
    }

    try {
      checkIn = await moodRepository.create({
        user_id: userId,
        mood: row.mood,
        context_key: contextKey,
        signal_id: row.id,
        signal_snapshot: signal,
        note: input.note || null,
        action_done: Boolean(input.actionDone),
        saved_at: new Date(),
        idempotency_key: input.idempotencyKey || null,
      });
    } catch (error) {
      // Hai request lưu cùng lúc: giữ lại một bản.
      if (
        input.idempotencyKey &&
        error.code === "P2002"
      ) {
        const existing =
          await moodRepository.findByIdempotencyKey(
            userId,
            input.idempotencyKey,
          );

        if (existing?.saved_at) {
          assertSameSavedRequest(existing);
          return toSavedSignal(existing);
        }
      }

      throw error;
    }
  }

  return toSavedSignal(checkIn);
}

async function getSavedSignal(userId, checkInId) {
  const checkIn = await moodRepository.findByIdForUser(checkInId, userId);
  if (!checkIn?.saved_at || !checkIn.signals) throw new ApiError(404, "Saved signal not found");
  const item = toSavedSignal(checkIn);
  return {
    item,
    signal: toCheckInSignal(checkIn),
    contentStatus: signalRepository.isPublishable(checkIn.signals) ? "available" : "withdrawn",
  };
}

async function updateSavedSignal(userId, checkInId, starred) {
  const checkIn = await moodRepository.findByIdForUser(checkInId, userId);
  if (!checkIn || !checkIn.signals || !checkIn.saved_at) throw new ApiError(404, "Saved signal not found");
  if (starred) await signalRepository.addFavorite(userId, checkIn.signals.id);
  else await signalRepository.removeFavorite(userId, checkIn.signals.id);
  return toSavedSignal(checkIn, starred ? new Set([checkIn.signals.id]) : new Set());
}

async function deleteSavedSignal(userId, checkInId) {
  const checkIn = await moodRepository.findByIdForUser(checkInId, userId);
  if (!checkIn || !checkIn.saved_at) throw new ApiError(404, "Saved signal not found");
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
  toCheckInSignal,
  toSavedSignal,
  listSignals,
  analyzeForMood,
  getSignal,
  resolveForMood,
  getSavedSignals,
  getSavedSignal,
  saveSignal,
  updateSavedSignal,
  deleteSavedSignal,
};
