const prisma = require("../config/prisma");

function findMemorial(userId, client = prisma) { return client.memorials.findFirst({ where: { user_id: userId }, orderBy: { updated_at: "desc" } }); }
function createMemorial(data, client = prisma) { return client.memorials.create({ data }); }
function updateMemorial(id, userId, data, client = prisma) { return client.memorials.updateMany({ where: { id, user_id: userId }, data }); }
function listNotes(userId, client = prisma) { return client.calendar_notes.findMany({ where: { user_id: userId }, orderBy: { event_date: "desc" } }); }
function findNote(id, userId, client = prisma) { return client.calendar_notes.findFirst({ where: { id, user_id: userId } }); }
function createNote(data, client = prisma) { return client.calendar_notes.create({ data }); }
function removeNote(id, userId, client = prisma) { return client.calendar_notes.deleteMany({ where: { id, user_id: userId } }); }

module.exports = { findMemorial, createMemorial, updateMemorial, listNotes, findNote, createNote, removeNote };
