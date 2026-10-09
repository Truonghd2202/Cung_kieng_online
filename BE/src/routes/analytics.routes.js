const express = require("express");
const controller = require("../controllers/analytics.controller");
const validate = require("../middleware/validation.middleware");
const authenticate = require("../middleware/auth.middleware");
const { eventSchema } = require("../validators/analytics.validator");

const router = express.Router();
router.post("/events", authenticate.optionalAuthenticate, validate(eventSchema), controller.record);
router.get("/summary", authenticate, controller.summary);

module.exports = router;
