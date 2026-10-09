
const express = require("express");
const { z } = require("zod");
const authenticate = require("../middleware/auth.middleware");
const validate = require("../middleware/validation.middleware");
const service = require("../services/horoscope.service");
const { sendSuccess } = require("../utils/response");
const router = express.Router();
const schema = z.object({
  birthDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).refine((value) => { const date = new Date(value); return Number.isFinite(date.getTime()) && date.toISOString().slice(0, 10) === value && date <= new Date() && date.getUTCFullYear() >= 1900; }),
  year: z.number().int().min(2000).max(2100),
  consent: z.literal(true),
}).strict();
router.use(authenticate);
router.get("/yearly", async (req, res) => sendSuccess(res, { data: { items: await service.listYearly(req.user.id) } }));
router.post("/yearly", validate(schema), async (req, res) => sendSuccess(res, { statusCode: 201, data: await service.generateYearly(req.user.id, req.body) }));
module.exports = router;
