
const express = require("express");
const controller = require("../controllers/user.controller");
const authenticate = require("../middleware/auth.middleware");
const validate = require("../middleware/validation.middleware");
const { profileSchema, settingsSchema, topicsSchema } = require("../validators/user.validator");

const router = express.Router();

router.use(authenticate);
router.delete("/me/personal-content", async (req, res) => {
  await require("../services/privacy.service").clearPersonalContent(req.user.id);
  return require("../utils/response").sendSuccess(res, { message: "Personal content deleted" });
});
router.get("/me", controller.getProfile);
router.patch("/me", validate(profileSchema), controller.updateProfile);
router.get("/me/settings", controller.getSettings);
router.patch("/me/settings", validate(settingsSchema), controller.updateSettings);
router.get("/me/topics", controller.getTopics);
router.put("/me/topics", validate(topicsSchema), controller.replaceTopics);

module.exports = router;
