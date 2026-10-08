const express = require("express");
const authenticate = require("../middleware/auth.middleware");
const validate = require("../middleware/validation.middleware");
const controller = require("../controllers/memory.controller");
const { memorialSchema, calendarNoteSchema } = require("../validators/memory.validator");

const router = express.Router();
router.use(authenticate);
router.get("/memorial", controller.getMemorial);
router.put("/memorial", validate(memorialSchema), controller.saveMemorial);
router.get("/calendar/notes", controller.listNotes);
router.post("/calendar/notes", validate(calendarNoteSchema), controller.createNote);
router.delete("/calendar/notes/:id", controller.deleteNote);
module.exports = router;
