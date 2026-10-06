const { AUTH_RATE_LIMIT_MAX, AUTH_RATE_LIMIT_WINDOW_MS } = require("../config/constants");

const buckets = new Map();

function authRateLimit(req, res, next) {
  const now = Date.now();
  const key = req.ip || req.socket.remoteAddress || "unknown";
  const current = buckets.get(key);

  if (!current || current.resetAt <= now) {
    buckets.set(key, { count: 1, resetAt: now + AUTH_RATE_LIMIT_WINDOW_MS });
    return next();
  }

  current.count += 1;
  if (current.count > AUTH_RATE_LIMIT_MAX) {
    res.set("Retry-After", Math.ceil((current.resetAt - now) / 1000));
    return res.status(429).json({ success: false, message: "Too many authentication attempts", errors: [] });
  }
  return next();
}

module.exports = { authRateLimit };
