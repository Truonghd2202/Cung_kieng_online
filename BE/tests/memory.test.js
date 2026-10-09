const test = require("node:test");
const assert = require("node:assert/strict");
const app = require("../src/app");
const prisma = require("../src/config/prisma");

test("memorial and calendar notes are private and account-scoped", { timeout: 30_000 }, async () => {
  const server = app.listen(0);
  await new Promise((resolve) => server.once("listening", resolve));
  const baseUrl = `http://127.0.0.1:${server.address().port}`;
  const suffix = Date.now();
  async function request(path, { method = "GET", body, token } = {}) {
    const headers = {};
    if (body) headers["content-type"] = "application/json";
    if (token) headers.authorization = `Bearer ${token}`;
    const response = await fetch(`${baseUrl}${path}`, { method, headers, body: body ? JSON.stringify(body) : undefined });
    return { response, payload: await response.json() };
  }
  async function register(email) {
    const result = await request("/api/auth/register", { method: "POST", body: { fullName: "Memory Test", email, password: "StrongPassword123" } });
    assert.equal(result.response.status, 201);
    return result.payload.data.accessToken;
  }
  try {
    const token = await register(`memory-${suffix}@example.com`);
    const other = await register(`memory-other-${suffix}@example.com`);
    assert.equal((await request("/api/memory/memorial")).response.status, 401);
    const memorial = await request("/api/memory/memorial", { method: "PUT", token, body: { name: "Người thương", relation: "Gia đình", date: "2024-10-17", note: "Ghi nhớ" } });
    assert.equal(memorial.response.status, 201);
    assert.equal(memorial.payload.data.name, "Người thương");
    const note = await request("/api/memory/calendar/notes", { method: "POST", token, body: { title: "Ngày thiện lành", day: 17, month: 10, year: 2024 } });
    assert.equal(note.response.status, 201);
    const otherNotes = await request("/api/memory/calendar/notes", { token: other });
    assert.equal(otherNotes.payload.data.items.length, 0);
    const deleted = await request(`/api/memory/calendar/notes/${note.payload.data.id}`, { method: "DELETE", token });
    assert.equal(deleted.response.status, 200);

    const profile = await request("/api/memorials", {
      method: "POST", token,
      body: {
        fullName: "Người thân được tưởng niệm",
        relationship: "Ông",
        deathDate: "2020-08-10",
        anniversary: { calendar: "LUNAR", day: 12, month: 7 },
      },
    });
    assert.equal(profile.response.status, 201);
    assert.equal(profile.payload.data.anniversaries[0].calendar, "LUNAR");
    const incense = await request(`/api/memorials/${profile.payload.data.id}/incense`, {
      method: "POST", token, body: { message: "Tưởng nhớ", incenseCount: 1 },
    });
    assert.equal(incense.response.status, 201);
    assert.equal(incense.payload.data.memorialId, profile.payload.data.id);
    const otherProfiles = await request("/api/memorials", { token: other });
    assert.equal(otherProfiles.payload.data.items.length, 0);
  } finally {
    server.close();
    await prisma.$disconnect();
  }
});
