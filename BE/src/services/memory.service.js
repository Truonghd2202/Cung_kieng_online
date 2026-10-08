const repository = require("../repositories/memory.repository");
const ApiError = require("../utils/api-error");

function toDate(value) { return new Date(`${value}T00:00:00.000Z`); }
function toDateString(value) { return value.toISOString().slice(0, 10); }

function toMemorial(record) {
  if (!record) return null;
  return { id: record.id, name: record.full_name, relation: record.relationship || "", date: toDateString(record.death_date || record.birth_date), note: record.note || undefined };
}

function toNote(record) {
  return { id: record.id, title: record.title, day: record.event_date.getUTCDate(), month: record.event_date.getUTCMonth() + 1, year: record.event_date.getUTCFullYear(), type: "personal", typeLabel: "Ghi chú cá nhân", region: "Cá nhân", shortDesc: record.note || "Ngày dự định do bạn chọn.", lunarDate: "", note: record.note || undefined };
}

async function getMemorial(userId) { return toMemorial(await repository.findMemorial(userId)); }
async function saveMemorial(userId, input) {
  const existing = await repository.findMemorial(userId);
  const data = { full_name: input.name, relationship: input.relation, death_date: toDate(input.date), note: input.note || null };
  if (existing) {
    const updated = await repository.updateMemorial(existing.id, userId, data);
    if (updated.count !== 1) throw new ApiError(404, "Memorial not found");
    return toMemorial(await repository.findMemorial(userId));
  }
  return toMemorial(await repository.createMemorial({ user_id: userId, ...data }));
}
async function listNotes(userId) { return (await repository.listNotes(userId)).map(toNote); }
async function createNote(userId, input) { return toNote(await repository.createNote({ user_id: userId, title: input.title, note: input.note || null, event_date: new Date(Date.UTC(input.year, input.month - 1, input.day)) })); }
async function deleteNote(userId, id) { const removed = await repository.removeNote(id, userId); if (removed.count !== 1) throw new ApiError(404, "Calendar note not found"); }

module.exports = { getMemorial, saveMemorial, listNotes, createNote, deleteNote };
