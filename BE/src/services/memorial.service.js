
const prisma = require("../config/prisma");
const repository = require("../repositories/memorial.repository");
const ApiError = require("../utils/api-error");

function toMemorialDto(item) {
  return {
    id: item.id,
    fullName: item.full_name,
    relationship: item.relationship,
    birthDate: item.birth_date?.toISOString().slice(0, 10) || null,
    deathDate: item.death_date?.toISOString().slice(0, 10) || null,
    avatarUrl: item.avatar_url,
    biography: item.biography,
    note: item.note,
    anniversaries: item.memorial_anniversaries.map((date) => ({
      id: date.id,
      calendar: date.calendar,
      day: date.day,
      month: date.month,
      year: date.year,
      repeatYearly: date.repeat_yearly,
      note: date.note,
    })),
    createdAt: item.created_at,
    updatedAt: item.updated_at,
  };
}

function toDate(value) { return value ? new Date(`${value}T00:00:00.000Z`) : null; }

function toData(input) {
  return {
    ...(input.fullName !== undefined ? { full_name: input.fullName } : {}),
    ...(input.relationship !== undefined ? { relationship: input.relationship || null } : {}),
    ...(input.birthDate !== undefined ? { birth_date: toDate(input.birthDate) } : {}),
    ...(input.deathDate !== undefined ? { death_date: toDate(input.deathDate) } : {}),
    ...(input.avatarUrl !== undefined ? { avatar_url: input.avatarUrl || null } : {}),
    ...(input.biography !== undefined ? { biography: input.biography || null } : {}),
    ...(input.note !== undefined ? { note: input.note || null } : {}),
  };
}

async function list(userId) {
  return (await repository.listForUser(userId)).map(toMemorialDto);
}

async function create(userId, input) {
  const data = { user_id: userId, ...toData(input) };
  if (input.anniversary) {
    data.memorial_anniversaries = { create: {
      calendar: input.anniversary.calendar,
      day: input.anniversary.day,
      month: input.anniversary.month,
      year: input.anniversary.year,
      repeat_yearly: input.anniversary.repeatYearly,
      note: input.anniversary.note,
    } };
  }
  return toMemorialDto(await repository.create(data));
}

async function update(userId, id, input) {
  const existing = await repository.findByIdForUser(id, userId);
  if (!existing) throw new ApiError(404, "Memorial not found");
  const updated = await prisma.$transaction(async (transaction) => {
    await repository.update(id, userId, toData(input), transaction);
    if (input.anniversary !== undefined) {
      await transaction.memorial_anniversaries.deleteMany({ where: { memorial_id: id } });
      if (input.anniversary) {
        await transaction.memorial_anniversaries.create({ data: {
          memorial_id: id,
          calendar: input.anniversary.calendar,
          day: input.anniversary.day,
          month: input.anniversary.month,
          year: input.anniversary.year,
          repeat_yearly: input.anniversary.repeatYearly,
          note: input.anniversary.note,
        } });
      }
    }
    return repository.findByIdForUser(id, userId, transaction);
  });
  return toMemorialDto(updated);
}

async function remove(userId, id) {
  const removedCount = await prisma.$transaction(async (transaction) => {
    const existing = await repository.findByIdForUser(id, userId, transaction);
    if (!existing) return 0;
    await transaction.incense_sessions.deleteMany({ where: { user_id: userId, memorial_id: id } });
    const removed = await repository.remove(id, userId, transaction);
    return removed.count;
  });
  if (removedCount !== 1) throw new ApiError(404, "Memorial not found");
}

async function removeAnniversary(userId, memorialId, anniversaryId) {
  const memorial = await repository.findByIdForUser(memorialId, userId);
  if (!memorial) throw new ApiError(404, "Memorial not found");
  const result = await prisma.memorial_anniversaries.deleteMany({
    where: { id: anniversaryId, memorial_id: memorialId },
  });
  if (result.count !== 1) throw new ApiError(404, "Memorial anniversary not found");
}

async function lightIncense(userId, id, input) {
  if (!(await repository.findByIdForUser(id, userId))) throw new ApiError(404, "Memorial not found");
  const session = await repository.createIncense({ user_id: userId, memorial_id: id, message: input.message || null, incense_count: input.incenseCount });
  return { id: session.id, memorialId: id, incenseCount: session.incense_count, createdAt: session.created_at };
}

module.exports = { list, create, update, remove, removeAnniversary, lightIncense };
