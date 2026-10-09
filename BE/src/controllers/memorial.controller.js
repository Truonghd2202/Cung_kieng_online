const service = require("../services/memorial.service");
const { sendSuccess } = require("../utils/response");

async function list(req, res) {
  return sendSuccess(res, { message: "Memorials retrieved", data: { items: await service.list(req.user.id) } });
}

async function create(req, res) {
  return sendSuccess(res, { statusCode: 201, message: "Memorial created", data: await service.create(req.user.id, req.body) });
}

async function update(req, res) {
  return sendSuccess(res, { message: "Memorial updated", data: await service.update(req.user.id, req.params.id, req.body) });
}

async function remove(req, res) {
  await service.remove(req.user.id, req.params.id);
  return sendSuccess(res, { message: "Memorial deleted" });
}

async function lightIncense(req, res) {
  return sendSuccess(res, { statusCode: 201, message: "Incense session recorded", data: await service.lightIncense(req.user.id, req.params.id, req.body) });
}

module.exports = { list, create, update, remove, lightIncense };
