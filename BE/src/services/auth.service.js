const prisma = require("../config/prisma");
const env = require("../config/env");
const { OAuth2Client } = require("google-auth-library");
const userRepository = require("../repositories/user.repository");
const refreshTokenRepository = require("../repositories/refresh-token.repository");
const { hashPassword, comparePassword } = require("../utils/password");
const { signAccessToken } = require("../utils/jwt");
const { generateRefreshToken, hashToken, durationToMilliseconds } = require("../utils/token");
const { randomBytes, randomInt, createHmac, timingSafeEqual } = require("node:crypto");
const emailService = require("./email.service");
const logger = require("../utils/logger");
const ApiError = require("../utils/api-error");
const { ROLE, ACCOUNT_STATUS } = require("../constants/role.constant");

const googleOAuthClient = new OAuth2Client();

function toPublicUser(user) {
  return {
    id: user.id,
    fullName: user.full_name,
    email: user.email,
    avatarUrl: user.avatar_url,
    role: user.role,
    status: user.status,
    dateOfBirth: user.date_of_birth,
    gender: user.gender,
    phone: user.phone,
    bio: user.bio,
    createdAt: user.created_at,
  };
}

function createRefreshCredentials() {
  const token = generateRefreshToken();
  return {
    token,
    tokenHash: hashToken(token),
    expiresAt: new Date(Date.now() + durationToMilliseconds(env.JWT_REFRESH_EXPIRES_IN)),
  };
}

function assertActive(user) {
  if (user.status === ACCOUNT_STATUS.BANNED) throw new ApiError(403, "Account has been banned");
  if (user.status !== ACCOUNT_STATUS.ACTIVE) throw new ApiError(403, "Account is inactive");
}

async function register({ fullName, email, password }) {
  if (await userRepository.findByEmail(email)) throw new ApiError(409, "Email already exists");

  const passwordHash = await hashPassword(password);
  const refresh = createRefreshCredentials();

  try {
    const user = await prisma.$transaction(async (transaction) => {
      const createdUser = await userRepository.create(
        {
          full_name: fullName,
          email,
          password_hash: passwordHash,
          role: ROLE.USER,
          status: ACCOUNT_STATUS.ACTIVE,
        },
        transaction,
      );
      await refreshTokenRepository.create(
        { userId: createdUser.id, tokenHash: refresh.tokenHash, expiresAt: refresh.expiresAt },
        transaction,
      );
      return createdUser;
    });

    return { user: toPublicUser(user), accessToken: signAccessToken(user), refreshToken: refresh.token };
  } catch (error) {
    if (error.code === "P2002") throw new ApiError(409, "Email already exists");
    throw error;
  }
}

async function login({ email, password }) {
  const user = await userRepository.findByEmail(email);
  const passwordMatches = user ? await comparePassword(password, user.password_hash) : false;

  if (!user || !passwordMatches) throw new ApiError(401, "Invalid email or password");
  assertActive(user);

  const refresh = createRefreshCredentials();
  const updatedUser = await prisma.$transaction(async (transaction) => {
    const currentUser = await userRepository.updateLastLogin(user.id, transaction);
    await refreshTokenRepository.create(
      { userId: user.id, tokenHash: refresh.tokenHash, expiresAt: refresh.expiresAt },
      transaction,
    );
    return currentUser;
  });

  return {
    user: toPublicUser(updatedUser),
    accessToken: signAccessToken(updatedUser),
    refreshToken: refresh.token,
  };
}

async function loginWithGoogle(credential) {
  if (!env.GOOGLE_CLIENT_ID) {
    throw new ApiError(503, "Google login is not configured on the server");
  }

  let payload;
  try {
    const ticket = await googleOAuthClient.verifyIdToken({
      idToken: credential,
      audience: env.GOOGLE_CLIENT_ID,
    });
    payload = ticket.getPayload();
  } catch {
    throw new ApiError(401, "Google credential is invalid or expired");
  }

  if (!payload?.sub || payload.email_verified !== true || !payload.email) {
    throw new ApiError(401, "Google account must have a verified email address");
  }

  const email = payload.email.trim().toLowerCase();
  let user = await userRepository.findByEmail(email);

  if (!user) {
    const generatedPassword = randomBytes(48).toString("base64url");
    const passwordHash = await hashPassword(generatedPassword);
    const fullName = (payload.name || email.split("@")[0]).trim().slice(0, 120) || email;

    try {
      user = await userRepository.create({
        full_name: fullName,
        email,
        password_hash: passwordHash,
        ...(typeof payload.picture === "string" ? { avatar_url: payload.picture } : {}),
        role: ROLE.USER,
        status: ACCOUNT_STATUS.ACTIVE,
      });
    } catch (error) {
      // Handle two first-time Google sign-ins racing to create the same email.
      if (error.code !== "P2002") throw error;
      user = await userRepository.findByEmail(email);
      if (!user) throw error;
    }
  }

  assertActive(user);
  const refresh = createRefreshCredentials();
  const updatedUser = await prisma.$transaction(async (transaction) => {
    const currentUser = await userRepository.updateLastLogin(user.id, transaction);
    await refreshTokenRepository.create(
      { userId: user.id, tokenHash: refresh.tokenHash, expiresAt: refresh.expiresAt },
      transaction,
    );
    return currentUser;
  });

  return {
    user: toPublicUser(updatedUser),
    accessToken: signAccessToken(updatedUser),
    refreshToken: refresh.token,
  };
}

async function refresh(rawToken) {
  if (!rawToken) throw new ApiError(401, "Refresh token is required");

  const oldHash = hashToken(rawToken);
  const storedToken = await refreshTokenRepository.findActiveByHash(oldHash);
  if (!storedToken) throw new ApiError(401, "Invalid or expired refresh token");

  try {
    assertActive(storedToken.users);
  } catch (error) {
    await refreshTokenRepository.revokeByHash(oldHash);
    throw error;
  }

  const nextRefresh = createRefreshCredentials();

  await prisma.$transaction(async (transaction) => {
    const revoked = await transaction.refresh_tokens.updateMany({
      where: {
        id: storedToken.id,
        token_hash: oldHash,
        revoked_at: null,
        expires_at: { gt: new Date() },
      },
      data: { revoked_at: new Date() },
    });
    if (revoked.count !== 1) throw new ApiError(401, "Invalid or expired refresh token");
    await refreshTokenRepository.create(
      {
        userId: storedToken.user_id,
        tokenHash: nextRefresh.tokenHash,
        expiresAt: nextRefresh.expiresAt,
      },
      transaction,
    );
  });

  return {
    accessToken: signAccessToken(storedToken.users),
    refreshToken: nextRefresh.token,
  };
}

async function logout(rawToken) {
  if (rawToken) await refreshTokenRepository.revokeByHash(hashToken(rawToken));
}

async function logoutAll(userId) {
  await refreshTokenRepository.revokeAllForUser(userId);
}

async function getCurrentUser(userId) {
  const user = await userRepository.findPublicById(userId);
  if (!user) throw new ApiError(404, "User not found");
  return toPublicUser(user);
}

async function changePassword(userId, { currentPassword, newPassword }) {
  const user = await userRepository.findById(userId);
  if (!user) throw new ApiError(404, "User not found");

  if (!(await comparePassword(currentPassword, user.password_hash))) {
    throw new ApiError(400, "Current password is incorrect");
  }
  if (await comparePassword(newPassword, user.password_hash)) {
    throw new ApiError(400, "New password must be different from current password");
  }

  const passwordHash = await hashPassword(newPassword);
  await prisma.$transaction(async (transaction) => {
    await userRepository.updatePassword(userId, passwordHash, transaction);
    await refreshTokenRepository.revokeAllForUser(userId, transaction);
  });
}

async function requestPasswordReset(email) {
  const deliveryConfigured = emailService.isConfigured();
  if (!deliveryConfigured) return { deliveryConfigured: false };

  const user = await userRepository.findByEmail(email);
  if (!user) return { deliveryConfigured: true };

  const code = String(randomInt(0, 1_000_000)).padStart(6, "0");
  const now = new Date();
  const expiresAt = new Date(now.getTime() + 10 * 60 * 1000);
  const tokenHash = createHmac("sha256", env.JWT_ACCESS_SECRET)
    .update(`${user.id}:${code}:${expiresAt.toISOString()}`)
    .digest("hex");
  await prisma.$transaction(async (transaction) => {
    await transaction.password_reset_tokens.updateMany({
      where: { user_id: user.id, used_at: null },
      data: { used_at: now },
    });
    await transaction.password_reset_tokens.create({
      data: { user_id: user.id, token_hash: tokenHash, expires_at: expiresAt },
    });
  });

  try {
    await emailService.sendPasswordResetCodeEmail(user.email, code);
  } catch {
    // Do not reveal provider or account status through this public endpoint.
    logger.warn("Password reset email delivery failed");
    await prisma.password_reset_tokens.updateMany({
      where: { token_hash: tokenHash, used_at: null },
      data: { used_at: new Date() },
    }).catch(() => {});
  }
  return { deliveryConfigured: true };
}

async function verifyResetCode(email, code) {
  const user = await userRepository.findByEmail(email);
  if (!user) throw new ApiError(400, "Mã xác minh không hợp lệ hoặc đã hết hạn.");

  const reset = await prisma.password_reset_tokens.findFirst({
    where: { user_id: user.id, used_at: null, expires_at: { gt: new Date() } },
  });
  if (!reset) throw new ApiError(400, "Mã xác minh không hợp lệ hoặc đã hết hạn.");

  const expectedHash = createHmac("sha256", env.JWT_ACCESS_SECRET)
    .update(`${user.id}:${code}:${reset.expires_at.toISOString()}`)
    .digest();
  const storedHash = Buffer.from(reset.token_hash, "hex");
  if (storedHash.length !== expectedHash.length || !timingSafeEqual(storedHash, expectedHash)) {
    throw new ApiError(400, "Mã xác minh không hợp lệ hoặc đã hết hạn.");
  }

  return { valid: true };
}

async function resetPassword(email, code, newPassword) {
  const user = await userRepository.findByEmail(email);
  if (!user) throw new ApiError(400, "Mã xác minh không hợp lệ hoặc đã hết hạn.");

  const passwordHash = await hashPassword(newPassword);
  await prisma.$transaction(async (transaction) => {
    await transaction.$queryRaw`SELECT id FROM password_reset_tokens WHERE user_id = ${user.id} AND used_at IS NULL AND expires_at > NOW() FOR UPDATE`;
    const reset = await transaction.password_reset_tokens.findFirst({
      where: { user_id: user.id, used_at: null, expires_at: { gt: new Date() } },
    });
    if (!reset) throw new ApiError(400, "Mã xác minh không hợp lệ hoặc đã hết hạn.");
    const expectedHash = createHmac("sha256", env.JWT_ACCESS_SECRET)
      .update(`${user.id}:${code}:${reset.expires_at.toISOString()}`)
      .digest();
    const storedHash = Buffer.from(reset.token_hash, "hex");
    if (storedHash.length !== expectedHash.length || !timingSafeEqual(storedHash, expectedHash)) {
      throw new ApiError(400, "Mã xác minh không hợp lệ hoặc đã hết hạn.");
    }
    const consumed = await transaction.password_reset_tokens.updateMany({
      where: { id: reset.id, used_at: null, expires_at: { gt: new Date() } },
      data: { used_at: new Date() },
    });
    if (consumed.count !== 1) throw new ApiError(400, "Mã xác minh không hợp lệ hoặc đã hết hạn.");
    await userRepository.updatePassword(reset.user_id, passwordHash, transaction);
    await refreshTokenRepository.revokeAllForUser(reset.user_id, transaction);
  });
}

module.exports = { register, login, loginWithGoogle, refresh, logout, logoutAll, getCurrentUser, changePassword, requestPasswordReset, verifyResetCode, resetPassword };
