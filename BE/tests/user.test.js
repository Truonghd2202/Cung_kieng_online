const test = require("node:test");
const assert = require("node:assert/strict");
const app = require("../src/app");
const prisma = require("../src/config/prisma");

test("profile, settings, and topics are private to the authenticated user", { timeout: 30_000 }, async () => {
  const server = app.listen(0);
  await new Promise((resolve) => server.once("listening", resolve));

  const baseUrl = `http://127.0.0.1:${server.address().port}`;
  const suffix = `${Date.now()}-${Math.random().toString(16).slice(2)}`;
  const emails = [`phase2-${suffix}@example.com`, `phase2-other-${suffix}@example.com`];

  async function request(path, { method = "GET", body, token } = {}) {
    const headers = {};
    if (body) headers["content-type"] = "application/json";
    if (token) headers.authorization = `Bearer ${token}`;
    const response = await fetch(`${baseUrl}${path}`, {
      method,
      headers,
      body: body ? JSON.stringify(body) : undefined,
    });
    return { response, payload: await response.json() };
  }

  async function register(email, fullName) {
    const result = await request("/api/auth/register", {
      method: "POST",
      body: { email, fullName, password: "StrongPassword123" },
    });
    assert.equal(result.response.status, 201);
    return result.payload.data.accessToken;
  }

  try {
    const token = await register(emails[0], "Phase Two");
    const otherToken = await register(emails[1], "Other User");

    const anonymous = await request("/api/users/me");
    assert.equal(anonymous.response.status, 401);

    const profile = await request("/api/users/me", { token });
    assert.equal(profile.response.status, 200);
    assert.equal(profile.payload.data.fullName, "Phase Two");
    assert.equal(profile.payload.data.email, emails[0]);

    const emptyProfileUpdate = await request("/api/users/me", {
      method: "PATCH",
      token,
      body: {},
    });
    assert.equal(emptyProfileUpdate.response.status, 422);

    const updatedProfile = await request("/api/users/me", {
      method: "PATCH",
      token,
      body: { fullName: "  Tâm An  ", bio: "Một khoảng lặng bình yên" },
    });
    assert.equal(updatedProfile.response.status, 200);
    assert.equal(updatedProfile.payload.data.fullName, "Tâm An");
    assert.equal(updatedProfile.payload.data.bio, "Một khoảng lặng bình yên");

    const defaultSettings = await request("/api/users/me/settings", { token });
    assert.equal(defaultSettings.response.status, 200);
    assert.equal(defaultSettings.payload.data.theme, "dark");
    assert.equal(defaultSettings.payload.data.emailNotifications, true);

    const updatedSettings = await request("/api/users/me/settings", {
      method: "PATCH",
      token,
      body: { theme: "system", emailNotifications: false, pushNotifications: false },
    });
    assert.equal(updatedSettings.response.status, 200);
    assert.equal(updatedSettings.payload.data.theme, "system");
    assert.equal(updatedSettings.payload.data.emailNotifications, false);
    assert.equal(updatedSettings.payload.data.pushNotifications, false);

    const invalidSettings = await request("/api/users/me/settings", {
      method: "PATCH",
      token,
      body: { theme: "sepia" },
    });
    assert.equal(invalidSettings.response.status, 422);

    const replacedTopics = await request("/api/users/me/topics", {
      method: "PUT",
      token,
      body: { topics: ["cadao", "cadao", "xinxam"] },
    });
    assert.equal(replacedTopics.response.status, 200);
    assert.deepEqual(replacedTopics.payload.data.topics, ["cadao", "xinxam"]);

    const topics = await request("/api/users/me/topics", { token });
    assert.deepEqual(topics.payload.data.topics, ["cadao", "xinxam"]);

    const otherTopics = await request("/api/users/me/topics", { token: otherToken });
    assert.deepEqual(otherTopics.payload.data.topics, []);

    const invalidTopics = await request("/api/users/me/topics", {
      method: "PUT",
      token,
      body: { topics: ["khong-hop-le"] },
    });
    assert.equal(invalidTopics.response.status, 422);
  } finally {
    await prisma.users.deleteMany({ where: { email: { in: emails } } });
    await new Promise((resolve) => server.close(resolve));
    await prisma.$disconnect();
  }
});
