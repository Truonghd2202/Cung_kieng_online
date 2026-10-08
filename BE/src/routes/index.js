const express = require("express");
const authRoutes = require("./auth.routes");
const userRoutes = require("./user.routes");
const moodRoutes = require("./mood.routes");
const signalRoutes = require("./signal.routes");
const reflectionRoutes = require("./reflection.routes");
const memoryRoutes = require("./memory.routes");
const contentRoutes = require("./content.routes");

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/users", userRoutes);
router.use("/moods", moodRoutes);
router.use("/signals", signalRoutes);
router.use("/reflections", reflectionRoutes);
router.use("/memory", memoryRoutes);
router.use("/content", contentRoutes);

module.exports = router;
