
const prisma = require("../config/prisma");
const moodRepository = require("../repositories/mood.repository");
const signalService = require("./signal.service");
const ApiError = require("../utils/api-error");

function toPublicCheckIn(checkIn) {
  return {
    id: checkIn.id,
    mood: signalService.toMoodLabel(checkIn.mood),
    note: checkIn.note,
    intensity: checkIn.intensity,
    actionDone: checkIn.action_done,
    signalId: checkIn.signals ? checkIn.signals.source || checkIn.signals.id : null,
    createdAt: checkIn.created_at,
  };
}

async function createCheckIn(userId, input) {
  const signal = await signalService.resolveForMood(input.mood, input.signalId);
  const checkIn = await moodRepository.create({
    user_id: userId,
    mood: signal.mood,
    note: input.note || null,
    intensity: input.intensity === undefined ? null : input.intensity,
    signal_id: signal.id,
    action_done: Boolean(input.actionDone),
  });
  return { checkIn: toPublicCheckIn(checkIn), signal: signalService.toPublicSignal(signal) };
}

async function getLatest(userId) {
  const checkIn = await moodRepository.findLatestForUser(userId);
  return checkIn ? { checkIn: toPublicCheckIn(checkIn), signal: checkIn.signals ? signalService.toPublicSignal(checkIn.signals) : null } : null;
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

module.exports = { createCheckIn, getLatest, list, updateAction, statistics };
