
const prisma = require("../config/prisma");
const moodRepository = require("../repositories/mood.repository");
const signalService = require("./signal.service");
const ApiError = require("../utils/api-error");
const { moodValues } = require("../validators/mood.validator");

function assertSameRequest(existing, input) {
  const expectedContext = input.contextKey || "general";
  if (existing.mood !== signalService.toDbMood(input.mood)
    || (existing.context_key || "general") !== expectedContext
    || (input.note || null) !== (existing.note || null)) {
    throw new ApiError(409, "Idempotency key was already used for a different check-in");
  }
}

function toPublicCheckIn(checkIn) {
  return {
    id: checkIn.id,
    mood: signalService.toMoodLabel(checkIn.mood),
    contextKey: checkIn.context_key || "general",
    note: checkIn.note,
    intensity: checkIn.intensity,
    actionDone: checkIn.action_done,
    signalId: checkIn.signals ? checkIn.signals.source || checkIn.signals.id : null,
    createdAt: checkIn.created_at,
  };
}

async function createCheckIn(userId, input) {
  if (input.idempotencyKey) {
    const existing = await moodRepository.findByIdempotencyKey(userId, input.idempotencyKey);
    if (existing) {
      assertSameRequest(existing, input);
      return { checkIn: toPublicCheckIn(existing), signal: signalService.toCheckInSignal(existing) };
    }
  }
  const contextKey = input.contextKey || "general";
  const { signal } = await signalService.analyzeForMood({ mood: input.mood, contextKey, signalId: input.signalId, excludeSignalId: input.excludeSignalId });
  let checkIn;
  try {
    checkIn = await moodRepository.create({
      user_id: userId,
      mood: signalService.toDbMood(signal.mood),
      context_key: contextKey,
      note: input.note || null,
      intensity: input.intensity === undefined ? null : input.intensity,
      signal_id: signal.dbId,
      signal_snapshot: signal,
      action_done: Boolean(input.actionDone),
      idempotency_key: input.idempotencyKey || null,
    });
  } catch (error) {
    if (input.idempotencyKey && error.code === "P2002") {
      const existing = await moodRepository.findByIdempotencyKey(userId, input.idempotencyKey);
      if (existing) {
        assertSameRequest(existing, input);
        return { checkIn: toPublicCheckIn(existing), signal: signalService.toCheckInSignal(existing) };
      }
    }
    throw error;
  }
  return { checkIn: toPublicCheckIn(checkIn), signal };
}

async function analyzeSignal(input) {
  const result = await signalService.analyzeForMood(input);

  const { issueResult } = require("../utils/signal-result-token");

  return {
    ...result,
    signal: issueResult(result.signal),
  };
}

async function getLatest(userId) {
  const checkIn = await moodRepository.findLatestForUser(userId);
  return checkIn ? { checkIn: toPublicCheckIn(checkIn), signal: signalService.toCheckInSignal(checkIn) } : null;
}

async function list(userId, query) {
  return (await moodRepository.listForUser(userId, { limit: query.limit, mood: query.mood ? signalService.toDbMood(query.mood) : undefined })).map(toPublicCheckIn);
}

async function updateAction(userId, id, actionDone) {
  const result = await moodRepository.update(id, userId, { action_done: actionDone });
  if (result.count !== 1) throw new ApiError(404, "Check-in not found");
  return toPublicCheckIn(await moodRepository.findByIdForUser(id, userId));
}

async function statistics(userId) {
  const [total, grouped] = await prisma.$transaction([
    prisma.mood_checkins.count({ where: { user_id: userId } }),
    prisma.mood_checkins.groupBy({ by: ["mood"], where: { user_id: userId }, _count: { _all: true } }),
  ]);
  return {
    total,
    byMood: grouped.map((item) => ({ mood: signalService.toMoodLabel(item.mood), count: item._count._all })),
  };
}

async function history(userId, query) {
  const anchorValue = query.anchor || new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Ho_Chi_Minh" }).format(new Date());
  const [year, month, day] = anchorValue.split("-").map(Number);
  const anchor = new Date(Date.UTC(year, month - 1, day));
  if (anchor.getUTCFullYear() !== year || anchor.getUTCMonth() !== month - 1 || anchor.getUTCDate() !== day) {
    throw new ApiError(422, "Ngày xem lịch sử không hợp lệ.");
  }
  const startLocal = new Date(anchor);
  let endLocal;
  if (query.period === "week") {
    startLocal.setUTCDate(startLocal.getUTCDate() - ((startLocal.getUTCDay() + 6) % 7));
    endLocal = new Date(startLocal);
    endLocal.setUTCDate(endLocal.getUTCDate() + 7);
  } else {
    startLocal.setUTCDate(1);
    endLocal = new Date(Date.UTC(year, month, 1));
  }
  const toUtc = (localMidnight) => new Date(localMidnight.getTime() - 7 * 60 * 60 * 1000);
  const start = toUtc(startLocal);
  const end = toUtc(endLocal);
  const result = await moodRepository.historyForUser(userId, {
    start,
    end,
    mood: query.mood ? signalService.toDbMood(query.mood) : undefined,
    skip: (query.page - 1) * query.pageSize,
    take: query.pageSize,
  });
  const grouped = new Map(result.byMood.map((item) => [signalService.toMoodLabel(item.mood), item._count._all]));
  return {
    period: query.period,
    anchor: anchorValue,
    range: { start: startLocal.toISOString().slice(0, 10), end: new Date(endLocal.getTime() - 86400000).toISOString().slice(0, 10) },
    timezone: "Asia/Ho_Chi_Minh",
    scope: "all_check_ins",
    summary: {
      total: result.byMood.reduce((sum, item) => sum + item._count._all, 0),
      byMood: moodValues.map((mood) => ({ mood, count: grouped.get(mood) || 0 })),
      byDay: result.byDay.map(({ day: localDay, count }) => ({ day: String(localDay).slice(0, 10), count: Number(count) })),
    },
    items: result.items.map(toPublicCheckIn),
    pagination: { page: query.page, pageSize: query.pageSize, total: result.total, pages: Math.ceil(result.total / query.pageSize) },
  };
}

module.exports = { createCheckIn, analyzeSignal, getLatest, list, updateAction, statistics, history };
