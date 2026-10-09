const express = require("express");
const controller = require("../controllers/content.controller");
const validate = require("../middleware/validation.middleware");
const { listQuerySchema, calendarQuerySchema, dailyProverbQuerySchema, reflectionProverbQuerySchema } = require("../validators/content.validator");
const router = express.Router();
router.get("/support-contact", (_req, res) => {
  const env = require("../config/env");
  const ready = env.SCHOOL_SUPPORT_NAME && /^[+\d][\d\s().-]{6,24}$/.test(env.SCHOOL_SUPPORT_PHONE || "") && /^https:\/\//.test(env.SCHOOL_SUPPORT_SOURCE || "");
  return require("../utils/response").sendSuccess(res, { data: { contact: ready ? { name: env.SCHOOL_SUPPORT_NAME, phone: env.SCHOOL_SUPPORT_PHONE, source: env.SCHOOL_SUPPORT_SOURCE } : null } });
});
router.get("/daily-proverb", validate(dailyProverbQuerySchema, "query"), controller.getDailyProverb);
router.get("/reflection-proverb", validate(reflectionProverbQuerySchema, "query"), controller.getReflectionProverb);
router.get("/culture", validate(listQuerySchema, "query"), controller.listArticles);
router.get("/culture/:slug", controller.getArticle);
router.get("/rituals", validate(listQuerySchema, "query"), controller.listRituals);
router.get("/rituals/:slug", controller.getRitual);
router.get("/calendar/events", validate(calendarQuerySchema, "query"), controller.listCalendarEvents);
router.get("/calendar/events/:id", controller.getCalendarEvent);
module.exports = router;
