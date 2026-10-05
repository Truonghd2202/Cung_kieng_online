const env = require("./env");

const allowedOrigins = env.CORS_ORIGINS.split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

module.exports = {
  credentials: true,
  origin(origin, callback) {
    if (!origin || allowedOrigins.includes("*") || allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    const error = new Error("Origin is not allowed by CORS");
    error.statusCode = 403;
    return callback(error);
  },
};
