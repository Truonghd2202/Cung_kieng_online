const env = require("../config/env");

const priorities = { debug: 10, info: 20, warn: 30, error: 40 };

function log(level, message, context = {}) {
  if (priorities[level] < priorities[env.LOG_LEVEL]) return;
  const entry = JSON.stringify({ level, timestamp: new Date().toISOString(), message, ...context });
  if (level === "error") console.error(entry);
  else if (level === "warn") console.warn(entry);
  else console.log(entry);
}

module.exports = {
  debug: (message, context) => log("debug", message, context),
  info: (message, context) => log("info", message, context),
  warn: (message, context) => log("warn", message, context),
  error: (message, context) => log("error", message, context),
};
