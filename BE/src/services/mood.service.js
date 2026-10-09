
const prisma = require("../config/prisma");
const moodRepository = require("../repositories/mood.repository");
const signalService = require("./signal.service");
const ApiError = require("../utils/api-error");

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
  const contextKey = input.contextKey || "general";
  const { signal } = await signalService.analyzeForMood({ mood: input.mood, contextKey, signalId: input.signalId, excludeSignalId: input.excludeSignalId });
  const checkIn = await moodRepository.create({
    user_id: userId,
    mood: signalService.toDbMood(signal.mood),
    context_key: contextKey,
    note: input.note || null,
    intensity: input.intensity === undefined ? null : input.intensity,
    signal_id: signal.dbId,
    signal_snapshot: signal,
    action_done: Boolean(input.actionDone),
  });
  return { checkIn: toPublicCheckIn(checkIn), signal };
}

async function analyzeSignal(input) {
  return signalService.analyzeForMood(input);
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

module.exports = { createCheckIn, analyzeSignal, getLatest, list, updateAction, statistics };
