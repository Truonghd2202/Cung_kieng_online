const test = require("node:test");
const assert = require("node:assert/strict");
const app = require("../src/app");
const prisma = require("../src/config/prisma");

test("complete authentication lifecycle", { timeout: 30_000 }, async () => {
  const server = app.listen(0);
  await new Promise((resolve) => server.once("listening", resolve));

  const baseUrl = `http://127.0.0.1:${server.address().port}`;
  const email = `auth-test-${Date.now()}@example.com`;
  const originalPassword = "StrongPassword123";
  const newPassword = "NewPassword456";

  async function request(path, { method = "GET", body, token, cookie } = {}) {
    const headers = {};
    if (body) headers["content-type"] = "application/json";
    if (token) headers.authorization = `Bearer ${token}`;
    if (cookie) headers.cookie = cookie;
    const response = await fetch(`${baseUrl}${path}`, {
      method,
      headers,
      body: body ? JSON.stringify(body) : undefined,
    });
    const payload = await response.json();
    return { response, payload, cookie: response.headers.get("set-cookie")?.split(";")[0] };
  }

  try {
    const health = await request("/api/health");
    assert.equal(health.response.status, 200);

    const registered = await request("/api/v1/auth/register", {
      method: "POST",
      body: { fullName: "  Auth Test  ", email: email.toUpperCase(), password: originalPassword },
    });
    assert.equal(registered.response.status, 201);
    assert.equal(registered.payload.data.user.fullName, "Auth Test");
    assert.equal(registered.payload.data.user.email, email);
    assert.ok(registered.payload.data.accessToken);
    assert.ok(registered.cookie?.startsWith("refreshToken="));
    assert.match(registered.response.headers.get("set-cookie"), /HttpOnly/i);
    assert.match(registered.response.headers.get("set-cookie"), /SameSite=Lax/i);
    assert.match(registered.response.headers.get("set-cookie"), /Path=\/api\/v1\/auth/i);
    assert.match(registered.response.headers.get("set-cookie"), /Path=\/api\/auth/i);
    assert.equal(JSON.stringify(registered.payload).includes("password_hash"), false);

    const weakPassword = await request("/api/v1/auth/register", {
      method: "POST",
      body: { fullName: "Weak Password", email: `weak-${email}`, password: "weak" },
    });
    assert.equal(weakPassword.response.status, 422);

    const duplicate = await request("/api/v1/auth/register", {
      method: "POST",
      body: { fullName: "Duplicate", email, password: originalPassword },
    });
    assert.equal(duplicate.response.status, 409);
    assert.equal(duplicate.payload.message, "Email already exists");

    const wrongLogin = await request("/api/v1/auth/login", {
      method: "POST",
      body: { email, password: "WrongPassword123" },
    });
    assert.equal(wrongLogin.response.status, 401);
    assert.equal(wrongLogin.payload.message, "Invalid email or password");

    const anonymousMe = await request("/api/v1/auth/me");
    assert.equal(anonymousMe.response.status, 401);

    const authenticatedMe = await request("/api/v1/auth/me", {
      token: registered.payload.data.accessToken,
    });
    assert.equal(authenticatedMe.response.status, 200);
    assert.equal(authenticatedMe.payload.data.email, email);

    await prisma.users.update({ where: { email }, data: { status: "BANNED" } });
    const bannedLogin = await request("/api/v1/auth/login", {
      method: "POST",
      body: { email, password: originalPassword },
    });
    assert.equal(bannedLogin.response.status, 403);
    assert.equal(bannedLogin.payload.message, "Account has been banned");
    const bannedProtectedRequest = await request("/api/v1/auth/me", {
      token: registered.payload.data.accessToken,
    });
    assert.equal(bannedProtectedRequest.response.status, 403);
    await prisma.users.update({ where: { email }, data: { status: "INACTIVE" } });
    const inactiveLogin = await request("/api/v1/auth/login", {
      method: "POST",
      body: { email, password: originalPassword },
    });
    assert.equal(inactiveLogin.response.status, 403);
    assert.equal(inactiveLogin.payload.message, "Account is inactive");
    await prisma.users.update({ where: { email }, data: { status: "ACTIVE" } });

    const oldCookie = registered.cookie;
    const refreshed = await request("/api/v1/auth/refresh", { method: "POST", cookie: oldCookie });
    assert.equal(refreshed.response.status, 200);
    assert.ok(refreshed.payload.data.accessToken);
    assert.notEqual(refreshed.cookie, oldCookie);

    const reusedOldToken = await request("/api/v1/auth/refresh", { method: "POST", cookie: oldCookie });
    assert.equal(reusedOldToken.response.status, 401);

    const loggedOut = await request("/api/v1/auth/logout", { method: "POST", cookie: refreshed.cookie });
    assert.equal(loggedOut.response.status, 200);

    const refreshAfterLogout = await request("/api/v1/auth/refresh", {
      method: "POST",
      cookie: refreshed.cookie,
    });
    assert.equal(refreshAfterLogout.response.status, 401);

    const loginBeforeChange = await request("/api/v1/auth/login", {
      method: "POST",
      body: { email, password: originalPassword },
    });
    assert.equal(loginBeforeChange.response.status, 200);

    const changed = await request("/api/v1/auth/change-password", {
      method: "PATCH",
      token: loginBeforeChange.payload.data.accessToken,
      cookie: loginBeforeChange.cookie,
      body: { currentPassword: originalPassword, newPassword },
    });
    assert.equal(changed.response.status, 200);

    const accessAfterChange = await request("/api/v1/auth/me", {
      token: loginBeforeChange.payload.data.accessToken,
    });
    assert.equal(accessAfterChange.response.status, 401);

    const revokedAfterChange = await request("/api/v1/auth/refresh", {
      method: "POST",
      cookie: loginBeforeChange.cookie,
    });
    assert.equal(revokedAfterChange.response.status, 401);

    const oldPasswordLogin = await request("/api/v1/auth/login", {
      method: "POST",
      body: { email, password: originalPassword },
    });
    assert.equal(oldPasswordLogin.response.status, 401);

    const firstSession = await request("/api/v1/auth/login", {
      method: "POST",
      body: { email, password: newPassword },
    });
    const secondSession = await request("/api/v1/auth/login", {
      method: "POST",
      body: { email, password: newPassword },
    });
    assert.equal(firstSession.response.status, 200);
    assert.equal(secondSession.response.status, 200);

    const logoutAll = await request("/api/v1/auth/logout-all", {
      method: "POST",
      token: firstSession.payload.data.accessToken,
      cookie: firstSession.cookie,
    });
    assert.equal(logoutAll.response.status, 200);

    for (const cookie of [firstSession.cookie, secondSession.cookie]) {
      const revokedSession = await request("/api/v1/auth/refresh", { method: "POST", cookie });
      assert.equal(revokedSession.response.status, 401);
    }
  } finally {
    await prisma.users.deleteMany({ where: { email } });
    await new Promise((resolve) => server.close(resolve));
    await prisma.$disconnect();
  }
});
