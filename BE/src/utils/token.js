const crypto = require("node:crypto");
const { REFRESH_TOKEN_BYTES } = require("../config/constants");

function generateRefreshToken() {
  return crypto.randomBytes(REFRESH_TOKEN_BYTES).toString("base64url");
}

function hashToken(token) {
  return crypto.createHash("sha256").update(token).digest("hex");
}

function durationToMilliseconds(value) {
  const match = String(value).trim().match(/^(\d+)(s|m|h|d)$/i);
  if (!match) throw new Error(`Unsupported duration: ${value}`);
  const multipliers = { s: 1000, m: 60_000, h: 3_600_000, d: 86_400_000 };
  return Number(match[1]) * multipliers[match[2].toLowerCase()];
}

module.exports = { generateRefreshToken, hashToken, durationToMilliseconds };
