const prisma = require("../config/prisma");
const env = require("../config/env");
const userRepository = require("../repositories/user.repository");
const refreshTokenRepository = require("../repositories/refresh-token.repository");
const { hashPassword, comparePassword } = require("../utils/password");
const { signAccessToken } = require("../utils/jwt");
const { generateRefreshToken, hashToken, durationToMilliseconds } = require("../utils/token");
const ApiError = require("../utils/api-error");
const { ROLE, ACCOUNT_STATUS } = require("../constants/role.constant");

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

module.exports = { register, login, refresh, logout, logoutAll, getCurrentUser, changePassword };
