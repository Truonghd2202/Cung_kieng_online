
const express = require("express");
const { z } = require("zod");
const controller = require("../controllers/mood.controller");
const authenticate = require("../middleware/auth.middleware");
const validate = require("../middleware/validation.middleware");
const { analyzeSignalSchema, checkInSchema, checkInQuerySchema } = require("../validators/mood.validator");
const actionSchema = z.object({ actionDone: z.boolean() });
const saveSignalSchema = require("../validators/mood.validator").savedSignalSchema.extend({ signalId: z.string().trim().min(1) });

const router = express.Router();
router.post("/analyze-signal", validate(analyzeSignalSchema), controller.analyzeSignal);
router.use(authenticate);
router.post("/save-signal", validate(saveSignalSchema), controller.saveSignal);
router.post("/check-ins", validate(checkInSchema), controller.createCheckIn);
router.get("/check-ins/today", controller.getToday);
router.get("/check-ins", validate(checkInQuerySchema, "query"), controller.list);
router.get("/check-ins/statistics", controller.statistics);
router.patch("/check-ins/:id/action", validate(actionSchema), controller.updateAction);

module.exports = router;
