
const express = require("express");
const controller = require("../controllers/user.controller");
const authenticate = require("../middleware/auth.middleware");
const validate = require("../middleware/validation.middleware");
const { profileSchema, settingsSchema, topicsSchema } = require("../validators/user.validator");

const router = express.Router();

router.use(authenticate);
router.get("/me", controller.getProfile);
router.patch("/me", validate(profileSchema), controller.updateProfile);
router.get("/me/settings", controller.getSettings);
router.patch("/me/settings", validate(settingsSchema), controller.updateSettings);
router.get("/me/topics", controller.getTopics);
router.put("/me/topics", validate(topicsSchema), controller.replaceTopics);

module.exports = router;
