const { createHmac, randomInt, timingSafeEqual } = require("node:crypto");
const ApiError = require("../utils/api-error");
const { ACCOUNT_STATUS } = require("../constants/role.constant");

function createEmailVerificationService({ prisma, userRepository, emailService, secret, now = () => new Date(), generateCode = () => String(randomInt(0, 1_000_000)).padStart(6, "0") }) {
  function ensureDeliveryConfigured() {
    if (!emailService.isConfigured()) throw new ApiError(503, "Email verification is temporarily unavailable");
  }

  function invalidCode() {
    return new ApiError(400, "Verification code is invalid or expired");
  }

  function hashCode(userId, code, expiresAt) {
    return createHmac("sha256", secret)
      .update(`${userId}:${code}:${expiresAt.toISOString()}`)
      .digest("hex");
  }

  async function issue(user) {
    ensureDeliveryConfigured();
    const code = generateCode();
    const createdAt = now();
    const expiresAt = new Date(createdAt.getTime() + 10 * 60 * 1000);
    const tokenHash = hashCode(user.id, code, expiresAt);

    await prisma.$transaction(async (transaction) => {
      await transaction.email_verification_tokens.updateMany({
        where: { user_id: user.id, used_at: null },
        data: { used_at: createdAt },
      });
      await transaction.email_verification_tokens.create({
        data: { user_id: user.id, token_hash: tokenHash, expires_at: expiresAt, attempt_count: 0 },
      });
    });

    try {
      await emailService.sendEmailVerificationCodeEmail(user.email, code);
    } catch {
      await prisma.email_verification_tokens.updateMany({
        where: { token_hash: tokenHash, used_at: null },
        data: { used_at: now() },
      }).catch(() => {});
      throw new ApiError(503, "Unable to send verification email right now");
    }
    return { email: user.email, expiresAt };
  }

  async function request(email) {
    ensureDeliveryConfigured();
    const user = await userRepository.findByEmail(email);
    if (user && !user.email_verified_at && [ACCOUNT_STATUS.ACTIVE, ACCOUNT_STATUS.PENDING_EMAIL_VERIFICATION].includes(user.status)) {
      await issue(user);
    }
    return { requestReceived: true };
  }

  async function verify(email, code) {
    const user = await userRepository.findByEmail(email);
    if (!user) throw invalidCode();

    const currentTime = now();
    const token = await prisma.email_verification_tokens.findFirst({
      where: { user_id: user.id, used_at: null, expires_at: { gt: currentTime }, attempt_count: { lt: 5 } },
      orderBy: { created_at: "desc" },
    });
    if (!token) throw invalidCode();

    const expectedHash = Buffer.from(hashCode(user.id, code, token.expires_at), "hex");
    const storedHash = Buffer.from(token.token_hash, "hex");
    if (storedHash.length !== expectedHash.length || !timingSafeEqual(storedHash, expectedHash)) {
      const nextAttempt = token.attempt_count + 1;
      await prisma.email_verification_tokens.updateMany({
        where: { id: token.id, used_at: null, expires_at: { gt: currentTime }, attempt_count: { lt: 5 } },
        data: {
          attempt_count: { increment: 1 },
          ...(nextAttempt >= 5 ? { used_at: currentTime } : {}),
        },
      });
      throw invalidCode();
    }

    const verified = await prisma.$transaction(async (transaction) => {
      const consumed = await transaction.email_verification_tokens.updateMany({
        where: { id: token.id, used_at: null, expires_at: { gt: currentTime }, attempt_count: { lt: 5 } },
        data: { used_at: currentTime },
      });
      if (consumed.count !== 1) return null;
      return transaction.users.update({
        where: { id: user.id },
        data: {
          email_verified_at: currentTime,
          ...(user.status === ACCOUNT_STATUS.PENDING_EMAIL_VERIFICATION ? { status: ACCOUNT_STATUS.ACTIVE } : {}),
        },
      });
    });
    if (!verified) throw invalidCode();
    return verified;
  }

  return { ensureDeliveryConfigured, issue, request, verify };
}

module.exports = { createEmailVerificationService };
