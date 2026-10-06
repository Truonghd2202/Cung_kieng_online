const jwt = require("jsonwebtoken");
const crypto = require("node:crypto");
const env = require("../config/env");

const verificationOptions = {
  issuer: "tin-lam-tam-linh-api",
  audience: "tin-lam-tam-linh-web",
};

function credentialVersion(passwordHash) {
  return crypto.createHmac("sha256", env.JWT_ACCESS_SECRET).update(passwordHash).digest("base64url");
}

function signAccessToken(user) {
  return jwt.sign(
    { sub: user.id, role: user.role, ver: credentialVersion(user.password_hash) },
    env.JWT_ACCESS_SECRET,
    {
    ...verificationOptions,
    expiresIn: env.JWT_ACCESS_EXPIRES_IN,
    },
  );
}

function verifyAccessToken(token) {
  return jwt.verify(token, env.JWT_ACCESS_SECRET, verificationOptions);
}

module.exports = { signAccessToken, verifyAccessToken, credentialVersion };
