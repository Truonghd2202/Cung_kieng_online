
const express = require("express");
const controller = require("../controllers/signal.controller");
const authenticate = require("../middleware/auth.middleware");
const validate = require("../middleware/validation.middleware");
const { savedSignalSchema, savedSignalUpdateSchema, signalQuerySchema } = require("../validators/mood.validator");

const router = express.Router();

router.get("/", validate(signalQuerySchema, "query"), controller.list);
router.get("/saved", authenticate, controller.listSaved);
router.get("/:id", controller.get);
router.post("/:id/save", authenticate, validate(savedSignalSchema), controller.save);
router.patch("/saved/:id", authenticate, validate(savedSignalUpdateSchema), controller.updateSaved);
router.delete("/saved/:id", authenticate, controller.removeSaved);

module.exports = router;
