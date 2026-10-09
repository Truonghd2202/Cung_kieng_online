
const express = require("express");
const authenticate = require("../middleware/auth.middleware");
const validate = require("../middleware/validation.middleware");
const controller = require("../controllers/reflection.controller");
const { wishSchema, savedItemUpdateSchema } = require("../validators/reflection.validator");

const router = express.Router();
router.use(authenticate);
router.get("/", controller.listWishes);
router.post("/", validate(wishSchema), controller.createWish);
router.patch("/:id", validate(savedItemUpdateSchema), controller.updateWish);
router.delete("/:id", controller.deleteWish);

module.exports = router;
