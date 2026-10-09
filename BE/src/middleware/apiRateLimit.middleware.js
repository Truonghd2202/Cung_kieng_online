const { createHash } = require("node:crypto");
const env = require("../config/env");
const prisma = require("../config/prisma");

let lastCleanupAt = 0;

async function apiRateLimit(req, res, next) {
  const address = req.ip || req.socket.remoteAddress || "unknown";
  // Store a one-way identifier instead of retaining client IP addresses.
  const bucketKey = createHash("sha256").update(address).digest("hex");
  const windowMs = BigInt(env.RATE_LIMIT_WINDOW_MS);

  try {
    const [bucket] = await prisma.$queryRaw`
      WITH current_window AS (
        SELECT floor(extract(epoch FROM clock_timestamp()) * 1000 / ${env.RATE_LIMIT_WINDOW_MS})::bigint AS window_id
      )
      INSERT INTO api_rate_limit_buckets (bucket_key, window_id, request_count, updated_at)
      SELECT ${bucketKey}, window_id, 1, clock_timestamp() FROM current_window
      ON CONFLICT (bucket_key, window_id) DO UPDATE
        SET request_count = api_rate_limit_buckets.request_count + 1,
            updated_at = clock_timestamp()
      RETURNING request_count, window_id
    `;

    const resetAt = (Number(bucket.window_id + 1n) * Number(windowMs)) / 1000;
    const retryAfter = Math.max(1, Math.ceil(resetAt - Date.now() / 1000));
    const remaining = Math.max(0, env.RATE_LIMIT_MAX - bucket.request_count);
    res.set("RateLimit-Limit", String(env.RATE_LIMIT_MAX));
    res.set("RateLimit-Remaining", String(remaining));
    res.set("RateLimit-Reset", String(Math.ceil(resetAt)));

    if (bucket.request_count > env.RATE_LIMIT_MAX) {
      res.set("Retry-After", String(retryAfter));
      return res.status(429).json({ success: false, message: "Too many requests", errors: [] });
    }

    // Opportunistic bounded cleanup; counters are shared by all app instances.
    const now = Date.now();
    if (now - lastCleanupAt > Math.max(env.RATE_LIMIT_WINDOW_MS, 60_000)) {
      lastCleanupAt = now;
      const oldestWindow = BigInt(Math.floor((now - 3 * env.RATE_LIMIT_WINDOW_MS) / env.RATE_LIMIT_WINDOW_MS));
      await prisma.$executeRaw`DELETE FROM api_rate_limit_buckets WHERE window_id < ${oldestWindow}`;
    }
    return next();
  } catch (error) {
    // Do not silently bypass a security control when the shared store is unavailable.
    return res.status(503).json({ success: false, message: "Rate limiting temporarily unavailable", errors: [] });
  }
}

module.exports = apiRateLimit;
