
const express = require("express");
const { z } = require("zod");
const controller = require("../controllers/mood.controller");
const authenticate = require("../middleware/auth.middleware");
const validate = require("../middleware/validation.middleware");
const { checkInSchema, checkInQuerySchema } = require("../validators/mood.validator");
const actionSchema = z.object({ actionDone: z.boolean() });

const router = express.Router();
router.use(authenticate);
router.post("/check-ins", validate(checkInSchema), controller.createCheckIn);
router.get("/check-ins/today", controller.getToday);
router.get("/check-ins", validate(checkInQuerySchema, "query"), controller.list);
router.get("/check-ins/statistics", controller.statistics);
router.patch("/check-ins/:id/action", validate(actionSchema), controller.updateAction);

module.exports = router;
