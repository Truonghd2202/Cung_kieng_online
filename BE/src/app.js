const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const corsOptions = require("./config/cors");
const prisma = require("./config/prisma");
const routes = require("./routes");
const notFound = require("./middleware/notFound.middleware");
const errorHandler = require("./middleware/error.middleware");

const app = express();

app.disable("x-powered-by");
app.use(cors(corsOptions));
app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: false, limit: "1mb" }));
app.use(cookieParser());

app.get("/api/health", async (_req, res) => {
  await prisma.$queryRaw`SELECT 1`;
  res.status(200).json({
    success: true,
    message: "Server and database are healthy",
    data: { status: "ok", timestamp: new Date().toISOString() },
  });
});

app.use("/api", routes);
app.use(notFound);
app.use(errorHandler);

module.exports = app;
