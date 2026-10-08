const test = require("node:test");
const assert = require("node:assert/strict");
const app = require("../src/app");
const prisma = require("../src/config/prisma");

test("mood check-ins and saved signals are authenticated and account-scoped", { timeout: 30_000 }, async () => {
  const server = app.listen(0);
  await new Promise((resolve) => server.once("listening", resolve));

  const baseUrl = `http://127.0.0.1:${server.address().port}`;
  const emails = [`mood-${Date.now()}@example.com`, `mood-other-${Date.now()}@example.com`];

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

  async function register(email) {
    const result = await request("/api/auth/register", {
      method: "POST",
      body: { fullName: "Mood Test", email, password: "StrongPassword123" },
    });
    assert.equal(result.response.status, 201);
    return result.payload.data.accessToken;
  }

  try {
    const publicSignals = await request("/api/signals?mood=An%20y%C3%AAn");
    assert.equal(publicSignals.response.status, 200);
    assert.equal(publicSignals.payload.data.items.length, 2);
    assert.equal(publicSignals.payload.data.items[0].mood, "An yên");

    const token = await register(emails[0]);
    const otherToken = await register(emails[1]);

    const anonymousCheckIn = await request("/api/moods/check-ins", {
      method: "POST",
      body: { mood: "An yên" },
    });
    assert.equal(anonymousCheckIn.response.status, 401);

    const created = await request("/api/moods/check-ins", {
      method: "POST",
      token,
      body: {
        mood: "An yên",
        signalId: "an-yen-1",
        note: "Một ngày dịu lại",
        intensity: 4,
      },
    });
    assert.equal(created.response.status, 201);
    assert.equal(created.payload.data.checkIn.mood, "An yên");
    assert.equal(created.payload.data.checkIn.signalId, "an-yen-1");
    assert.equal(created.payload.data.signal.id, "an-yen-1");

    const latest = await request("/api/moods/check-ins/today", { token });
    assert.equal(latest.response.status, 200);
    assert.equal(latest.payload.data.checkIn.id, created.payload.data.checkIn.id);

    const action = await request(`/api/moods/check-ins/${created.payload.data.checkIn.id}/action`, {
      method: "PATCH",
      token,
      body: { actionDone: true },
    });
    assert.equal(action.response.status, 200);
    assert.equal(action.payload.data.actionDone, true);

    const saved = await request("/api/signals/an-yen-1/save", {
      method: "POST",
      token,
      body: { checkInId: created.payload.data.checkIn.id },
    });
    assert.equal(saved.response.status, 201);
    assert.equal(saved.payload.data.signalId, "an-yen-1");
    assert.equal(saved.payload.data.journal, "Một ngày dịu lại");

    const starred = await request(`/api/signals/saved/${created.payload.data.checkIn.id}`, {
      method: "PATCH",
      token,
      body: { starred: true },
    });
    assert.equal(starred.response.status, 200);
    assert.equal(starred.payload.data.starred, true);

    const savedList = await request("/api/signals/saved", { token });
    assert.equal(savedList.response.status, 200);
    assert.equal(savedList.payload.data.items.length, 1);
    assert.equal(savedList.payload.data.items[0].starred, true);

    const otherSavedList = await request("/api/signals/saved", { token: otherToken });
    assert.deepEqual(otherSavedList.payload.data.items, []);

    const stats = await request("/api/moods/check-ins/statistics", { token });
    assert.equal(stats.response.status, 200);
    assert.equal(stats.payload.data.total, 1);

    const removed = await request(`/api/signals/saved/${created.payload.data.checkIn.id}`, {
      method: "DELETE",
      token,
    });
    assert.equal(removed.response.status, 200);

    const afterRemove = await request("/api/signals/saved", { token });
    assert.deepEqual(afterRemove.payload.data.items, []);
  } finally {
    await prisma.users.deleteMany({ where: { email: { in: emails } } });
    await new Promise((resolve) => server.close(resolve));
    await prisma.$disconnect();
  }
});
