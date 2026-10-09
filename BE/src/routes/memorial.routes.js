
const express = require("express");
const authenticate = require("../middleware/auth.middleware");
const validate = require("../middleware/validation.middleware");
const controller = require("../controllers/memorial.controller");
const { memorialSchema, memorialUpdateSchema, anniversaryParamsSchema, incenseSchema } = require("../validators/memorial.validator");

const router = express.Router();
router.use(authenticate);
router.get("/", controller.list);
router.post("/", validate(memorialSchema), controller.create);
router.delete("/:id/anniversaries/:anniversaryId", validate(anniversaryParamsSchema, "params"), controller.removeAnniversary);
router.patch("/:id", validate(memorialUpdateSchema), controller.update);
router.delete("/:id", controller.remove);
router.post("/:id/incense", validate(incenseSchema), controller.lightIncense);

module.exports = router;
