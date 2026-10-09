const express = require("express");
const authRoutes = require("./auth.routes");
const userRoutes = require("./user.routes");
const moodRoutes = require("./mood.routes");
const signalRoutes = require("./signal.routes");
const reflectionRoutes = require("./reflection.routes");
const memoryRoutes = require("./memory.routes");
const contentRoutes = require("./content.routes");
const reflectionController = require("../controllers/reflection.controller");
const authenticate = require("../middleware/auth.middleware");
const validate = require("../middleware/validation.middleware");
const { xinXamRequestSchema, xinKeoTossSchema } = require("../validators/reflection.validator");
const memorialRoutes = require("./memorial.routes");
const wishRoutes = require("./wish.routes");
const membershipRoutes = require("./membership.routes");
const analyticsRoutes = require("./analytics.routes");
const adminRoutes = require("./admin.routes");

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/users", userRoutes);
router.use("/mood", moodRoutes);
router.use("/moods", moodRoutes); // Legacy alias kept during migration.
router.use("/signals", signalRoutes);
router.use("/reflections", reflectionRoutes);
router.use("/memory", memoryRoutes);
router.use("/content", contentRoutes);
router.use("/memorials", memorialRoutes);
router.use("/wishes", wishRoutes);
router.use("/membership", membershipRoutes);
router.use("/horoscope", require("./horoscope.routes"));
router.use("/push", require("./push.routes"));
router.use("/analytics", analyticsRoutes);
router.use("/admin", adminRoutes);
router.post("/xam/draw", authenticate.optionalAuthenticate, validate(xinXamRequestSchema), reflectionController.drawXam);
router.post("/xam/toss-keo", authenticate, validate(xinKeoTossSchema), reflectionController.tossKeo);

module.exports = router;
