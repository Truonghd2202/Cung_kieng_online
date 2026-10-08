const service = require("../services/memory.service");
const { sendSuccess } = require("../utils/response");

async function getMemorial(req, res) { return sendSuccess(res, { message: "Memorial retrieved", data: await service.getMemorial(req.user.id) }); }
async function saveMemorial(req, res) { return sendSuccess(res, { statusCode: 201, message: "Memorial saved", data: await service.saveMemorial(req.user.id, req.body) }); }
async function listNotes(req, res) { return sendSuccess(res, { message: "Calendar notes retrieved", data: { items: await service.listNotes(req.user.id) } }); }
async function createNote(req, res) { return sendSuccess(res, { statusCode: 201, message: "Calendar note saved", data: await service.createNote(req.user.id, req.body) }); }
async function deleteNote(req, res) { await service.deleteNote(req.user.id, req.params.id); return sendSuccess(res, { message: "Calendar note deleted" }); }

module.exports = { getMemorial, saveMemorial, listNotes, createNote, deleteNote };
