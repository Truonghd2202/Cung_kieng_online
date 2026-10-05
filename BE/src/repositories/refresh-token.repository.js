const prisma = require("../config/prisma");

function create({ userId, tokenHash, expiresAt }, client = prisma) {
  return client.refresh_tokens.create({
    data: { user_id: userId, token_hash: tokenHash, expires_at: expiresAt },
  });
}

function findActiveByHash(tokenHash, client = prisma) {
  return client.refresh_tokens.findFirst({
    where: {
      token_hash: tokenHash,
      revoked_at: null,
      expires_at: { gt: new Date() },
    },
    include: { users: true },
  });
}

function revokeByHash(tokenHash, client = prisma) {
  return client.refresh_tokens.updateMany({
    where: { token_hash: tokenHash, revoked_at: null },
    data: { revoked_at: new Date() },
  });
}

function revokeAllForUser(userId, client = prisma) {
  return client.refresh_tokens.updateMany({
    where: { user_id: userId, revoked_at: null },
    data: { revoked_at: new Date() },
  });
}

module.exports = { create, findActiveByHash, revokeByHash, revokeAllForUser };
