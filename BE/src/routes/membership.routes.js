const express = require("express");
const controller = require("../controllers/membership.controller");
const validate = require("../middleware/validation.middleware");
const { interestSchema } = require("../validators/membership.validator");
const authenticate = require("../middleware/auth.middleware");

const router = express.Router();
const payment = require("../controllers/payment.controller");
router.get("/status", authenticate.optionalAuthenticate, payment.membership);
router.post("/checkout", authenticate, payment.checkout);
router.get("/orders/:id", authenticate, payment.order);
router.post("/interests", validate(interestSchema), controller.registerInterest);
router.delete("/interests", authenticate, validate(interestSchema), controller.removeInterest);

module.exports = router;
