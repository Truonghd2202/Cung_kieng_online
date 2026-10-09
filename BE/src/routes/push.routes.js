const router = require("express").Router();
const authenticate = require("../middleware/auth.middleware");
const validate = require("../middleware/validation.middleware");
const { subscriptionSchema, endpointSchema } = require("../validators/push.validator");
const prisma = require("../config/prisma");
const env = require("../config/env");
const { sendSuccess } = require("../utils/response");
router.use(authenticate);
router.get("/key", (_req, res) => sendSuccess(res, { data: { publicKey: require("../services/push.service").configured() ? env.VAPID_PUBLIC_KEY : null } }));
router.post("/subscriptions", validate(subscriptionSchema), async (req, res) => {
  const { endpoint, keys } = req.body;
  await prisma.push_subscriptions.upsert({ where: { endpoint }, create: { user_id: req.user.id, endpoint, ...keys }, update: { user_id: req.user.id, ...keys } });
  return sendSuccess(res, { message: "Đã bật nhắc giỗ trên thiết bị này" });
});
router.delete("/subscriptions", validate(endpointSchema), async (req, res) => {
  await prisma.push_subscriptions.deleteMany({ where: { user_id: req.user.id, endpoint: req.body.endpoint } });
  return sendSuccess(res, { message: "Đã tắt thông báo trên thiết bị này" });
});
module.exports = router;
