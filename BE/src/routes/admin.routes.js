const express = require("express");
const authenticate = require("../middleware/auth.middleware");
const requireAdmin = require("../middleware/requireAdmin.middleware");
const validate = require("../middleware/validation.middleware");
const controller = require("../controllers/admin.controller");
const { listSchema, idParamsSchema, reviewSchema } = require("../validators/admin.validator");
const signalAdminValidator = require("../validators/signal-admin.validator");

const router = express.Router();
router.use(authenticate, requireAdmin);
router.get("/overview", controller.overview);
router.get("/culture", validate(listSchema, "query"), controller.articles);
router.patch("/culture/:id/review", validate(idParamsSchema, "params"), validate(reviewSchema), controller.updateArticle);
router.get("/calendar", validate(listSchema, "query"), controller.calendar);
router.patch("/calendar/:id/review", validate(idParamsSchema, "params"), validate(reviewSchema), controller.updateCalendar);
router.get("/xam", validate(listSchema, "query"), controller.xam);
router.patch("/xam/:id/review", validate(idParamsSchema, "params"), validate(reviewSchema), controller.updateXam);
router.get("/rituals", validate(listSchema, "query"), controller.rituals);
router.patch("/rituals/:id/review", validate(idParamsSchema, "params"), validate(reviewSchema), controller.updateRitual);
router.get("/prayers", validate(listSchema, "query"), controller.prayers);
router.patch("/prayers/:id/review", validate(idParamsSchema, "params"), validate(reviewSchema), controller.updatePrayer);
router.get("/membership-interests", validate(listSchema, "query"), controller.interests);
router.get("/audit-logs", validate(listSchema, "query"), controller.auditLogs);
router.get("/signals", validate(signalAdminValidator.signalListSchema, "query"), controller.signals);
router.post("/signals", validate(signalAdminValidator.signalDraftSchema), controller.createSignal);
router.get("/signals/:id/audit-logs", validate(idParamsSchema, "params"), controller.signalAuditLogs);
router.get("/signals/:id", validate(idParamsSchema, "params"), controller.signal);
router.put("/signals/:id", validate(idParamsSchema, "params"), validate(signalAdminValidator.signalDraftSchema), controller.updateSignal);
router.patch("/signals/:id/review", validate(idParamsSchema, "params"), validate(signalAdminValidator.reviewSchema), controller.reviewSignal);

const editor = require("../repositories/content-editor.repository");
const { schemas } = require("../validators/content-editor.validator");
const ApiError = require("../utils/api-error");
const { sendSuccess } = require("../utils/response");
for (const kind of ["culture", "calendar", "xam", "rituals", "prayers"]) {
  router.get(`/${kind}/:id`, validate(idParamsSchema, "params"), async (req, res) => {
    const record = await editor.find(kind, req.params.id);
    if (!record) throw new ApiError(404, "Không tìm thấy nội dung.");
    return sendSuccess(res, { data: record });
  });
  router.post(`/${kind}`, validate(schemas[kind]), async (req, res) => {
    return sendSuccess(res, { statusCode: 201, data: await editor.save(kind, null, req.user.id, req.body) });
  });
  router.put(`/${kind}/:id`, validate(idParamsSchema, "params"), validate(schemas[kind]), async (req, res) => {
    const record = await editor.save(kind, req.params.id, req.user.id, req.body);
    if (!record) throw new ApiError(404, "Không tìm thấy nội dung.");
    if (record.versionConflict) throw new ApiError(409, "Nội dung đã được thay đổi sau khi bạn mở. Tải lại rồi thử lại.");
    return sendSuccess(res, { data: record });
  });
}

module.exports = router;
