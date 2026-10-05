const env = require("../config/env");
const logger = require("../utils/logger");

function errorHandler(error, req, res, _next) {
  let statusCode = error.statusCode || 500;
  let message = error.message || "Internal server error";

  if (error.code === "P2002") {
    statusCode = 409;
    message = "Resource already exists";
  }

  const logContext = {
    method: req.method,
    path: req.originalUrl,
    ...(statusCode >= 500 && env.NODE_ENV !== "production" ? { stack: error.stack } : {}),
  };
  if (statusCode >= 500) logger.error(message, logContext);
  else logger.warn(message, logContext);

  return res.status(statusCode).json({
    success: false,
    message: statusCode === 500 && env.NODE_ENV === "production" ? "Internal server error" : message,
    errors: error.errors || [],
    ...(env.NODE_ENV !== "production" && statusCode === 500 ? { stack: error.stack } : {}),
  });
}

module.exports = errorHandler;
