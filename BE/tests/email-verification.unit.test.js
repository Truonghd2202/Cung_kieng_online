const test = require("node:test");
const assert = require("node:assert/strict");
const { createEmailVerificationService } = require("../src/services/email-verification.service");

function setup() {
  const state = { user: null, token: null, sent: [], now: new Date("2026-10-19T12:00:00.000Z") };
  let generatedCodes = 0;
  const tx = {
    email_verification_tokens: {
      updateMany: async ({ where, data }) => {
        if (where.token_hash && state.token?.token_hash === where.token_hash && state.token.used_at === null) {
          state.token.used_at = data.used_at;
          return { count: 1 };
        }
        if (where.user_id && state.token?.user_id === where.user_id && state.token.used_at === null) {
          state.token.used_at = data.used_at;
          return { count: 1 };
        }
        if (where.id && state.token?.id === where.id && state.token.used_at === null && state.token.attempt_count < 5) {
          state.token.attempt_count += data.attempt_count?.increment || 0;
          if (state.token.attempt_count >= 5) state.token.used_at = data.used_at;
          if (data.used_at && !data.attempt_count) state.token.used_at = data.used_at;
          return { count: 1 };
        }
        if (where.id && state.token?.id === where.id && state.token.used_at === null && state.token.attempt_count < 5 && where.expires_at?.gt > state.now) {
          state.token.used_at = data.used_at;
          return { count: 1 };
        }
        return { count: 0 };
      },
      create: async ({ data }) => { state.token = { id: "token-1", attempt_count: 0, used_at: null, ...data }; return state.token; },
      findFirst: async ({ where }) => state.token && state.token.user_id === where.user_id && state.token.used_at === null && state.token.attempt_count < 5 && state.token.expires_at > state.now ? state.token : null,
    },
    users: { update: async ({ data }) => { Object.assign(state.user, data); return state.user; } },
  };
  const prisma = { $transaction: (work) => work(tx), email_verification_tokens: tx.email_verification_tokens, users: tx.users };
  const userRepository = { findByEmail: async () => state.user };
  const emailService = { isConfigured: () => true, sendEmailVerificationCodeEmail: async (email, code) => state.sent.push({ email, code }) };
  const service = createEmailVerificationService({ prisma, userRepository, emailService, secret: "test-secret", now: () => state.now, generateCode: () => generatedCodes++ === 0 ? "123456" : "654321" });
  state.user = { id: "user-1", email: "person@example.com", status: "PENDING_EMAIL_VERIFICATION", email_verified_at: null };
  return { state, service };
}

test("email verification issues a short-lived code and activates only after valid confirmation", async () => {
  const { state, service } = setup();
  await service.issue(state.user);
  assert.equal(state.sent[0].code, "123456");
  assert.equal(state.token.token_hash.includes("123456"), false);
  assert.equal(state.user.status, "PENDING_EMAIL_VERIFICATION");

  await assert.rejects(service.verify(state.user.email, "000000"), { statusCode: 400 });
  assert.equal(state.user.status, "PENDING_EMAIL_VERIFICATION");
  const verified = await service.verify(state.user.email, "123456");
  assert.equal(verified.status, "ACTIVE");
  assert.ok(verified.email_verified_at instanceof Date);
  await assert.rejects(service.verify(state.user.email, "123456"), { statusCode: 400 });
});

test("email verification expires, consumes after five wrong attempts, and requires configured delivery", async () => {
  const { state, service } = setup();
  await service.issue(state.user);
  for (let attempt = 0; attempt < 5; attempt += 1) {
    await assert.rejects(service.verify(state.user.email, "000000"), { statusCode: 400 });
  }
  await assert.rejects(service.verify(state.user.email, "123456"), { statusCode: 400 });
  assert.equal(state.user.status, "PENDING_EMAIL_VERIFICATION");

  const expired = setup();
  await expired.service.issue(expired.state.user);
  expired.state.now = new Date(expired.state.now.getTime() + 11 * 60 * 1000);
  await assert.rejects(expired.service.verify(expired.state.user.email, "123456"), { statusCode: 400 });

  const unavailable = createEmailVerificationService({
    prisma: {}, userRepository: {}, emailService: { isConfigured: () => false },
    secret: "test-secret", now: () => state.now, generateCode: () => "654321",
  });
  assert.throws(() => unavailable.ensureDeliveryConfigured(), { statusCode: 503 });
});

test("resending invalidates the previous code and concurrent confirmation activates only once", async () => {
  const { state, service } = setup();
  await service.issue(state.user);
  const firstHash = state.token.token_hash;
  await service.issue(state.user);
  assert.notEqual(state.token.token_hash, firstHash);
  await assert.rejects(service.verify(state.user.email, "123456"), { statusCode: 400 });

  const results = await Promise.allSettled([
    service.verify(state.user.email, "654321"),
    service.verify(state.user.email, "654321"),
  ]);
  assert.equal(results.filter((result) => result.status === "fulfilled").length, 1);
  assert.equal(state.user.status, "ACTIVE");
});

test("auth API exposes verification routes and validates requests before reaching persistence", async () => {
  const app = require("../src/app");
  const server = app.listen(0);
  await new Promise((resolve) => server.once("listening", resolve));
  const baseUrl = `http://127.0.0.1:${server.address().port}/api/v1/auth`;
  try {
    const invalidEmail = await fetch(`${baseUrl}/request-email-verification`, {
      method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ email: "not-an-email" }),
    });
    assert.equal(invalidEmail.status, 422);
    const invalidCode = await fetch(`${baseUrl}/verify-email`, {
      method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ email: "person@example.com", code: "123" }),
    });
    assert.equal(invalidCode.status, 422);
  } finally {
    await new Promise((resolve) => server.close(resolve));
  }
});
