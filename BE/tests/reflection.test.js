const test = require("node:test");
const assert = require("node:assert/strict");
const app = require("../src/app");
const prisma = require("../src/config/prisma");
const { castPieces } = require("../src/services/xin-keo.service");

test("xin keo maps the two physical sides to the three cultural outcomes", () => {
  const cast = (values) => castPieces(() => values.shift());
  assert.equal(cast([0.1, 0.9]).result, "YES");
  assert.equal(cast([0.1, 0.2]).result, "NO");
  assert.equal(cast([0.8, 0.9]).result, "UNCLEAR");
});

test("xin xam and wishes are authenticated and account-scoped", { timeout: 30_000 }, async () => {
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
    const result = await request("/api/auth/register", { method: "POST", body: { fullName: "Reflection Test", email, password: "StrongPassword123" } });
    assert.equal(result.response.status, 201);
    return result.payload.data.accessToken;
  }

  try {
    const token = await register(`reflection-${suffix}@example.com`);
    const otherToken = await register(`reflection-other-${suffix}@example.com`);
    assert.equal((await request("/api/reflections/wishes")).response.status, 401);

    const drawnXam = await request("/api/reflections/xin-xam/draw", {
      method: "POST", token,
      body: { region: "Bắc Bộ", topic: "Bình an", question: "Nên nhìn việc này thế nào?" },
    });
    assert.equal(drawnXam.response.status, 201);
    assert.equal(drawnXam.payload.data.region, "Bắc Bộ");
    assert.match(drawnXam.payload.data.disclaimer, /chiêm nghiệm/i);
    assert.equal(drawnXam.payload.data.classification, "Đại Cát");
    assert.equal(drawnXam.payload.data.rank, "Thượng Xăm");
    assert.equal(drawnXam.payload.data.classificationGroup, "CAT");
    assert.ok(drawnXam.payload.data.interpretation.recommendation);
    assert.ok(drawnXam.payload.data.proverb.content);
    assert.ok(drawnXam.payload.data.proverb.meaning);
    assert.equal(drawnXam.payload.data.proverb.verified, true);
    assert.match(drawnXam.payload.data.proverb.source.url, /ReML-AI\/VIVID/);
    const savedXam = await request("/api/reflections/xin-xam", { token });
    const reopenedXam = savedXam.payload.data.items.find((item) => item.id === drawnXam.payload.data.id);
    assert.equal(reopenedXam.proverb.id, drawnXam.payload.data.proverb.id);

    const cautionXam = await request("/api/reflections/xin-xam/draw", {
      method: "POST", token,
      body: { region: "Trung Bộ", topic: "Công việc" },
    });
    assert.equal(cautionXam.response.status, 201);
    assert.equal(cautionXam.payload.data.classification, "Đại Hung");
    assert.equal(cautionXam.payload.data.rank, "Hạ Xăm");
    assert.equal(cautionXam.payload.data.classificationGroup, "CAUTION");
    assert.match(cautionXam.payload.data.interpretation.warning, /không phải dự báo tai họa/i);
    assert.match(cautionXam.payload.data.disclaimer, /không cổ súy mê tín/i);

    const keoSession = await request("/api/reflections/xin-keo/sessions", { method: "POST", token, body: { question: "Có nên tiến hành kế hoạch?" } });
    assert.equal(keoSession.response.status, 201);
    const keoProverbIds = [];
    for (let index = 0; index < 3; index += 1) {
      const cast = await request(`/api/reflections/xin-keo/sessions/${keoSession.payload.data.id}/throws`, { method: "POST", token, body: {} });
      assert.equal(cast.response.status, 201);
      assert.ok(["YES", "NO", "UNCLEAR"].includes(cast.payload.data.result));
      assert.ok(cast.payload.data.proverb.content);
      assert.ok(cast.payload.data.proverb.meaning);
      assert.equal(cast.payload.data.proverb.verified, true);
      keoProverbIds.push(cast.payload.data.proverb.id);
    }
    assert.equal(new Set(keoProverbIds).size, 3);
    const savedKeoSessions = await request("/api/reflections/xin-keo/sessions", { token });
    const reopenedKeo = savedKeoSessions.payload.data.items.find((item) => item.id === keoSession.payload.data.id);
    assert.deepEqual(reopenedKeo.throws.map((item) => item.proverb.id), keoProverbIds);
    const fourthCast = await request(`/api/reflections/xin-keo/sessions/${keoSession.payload.data.id}/throws`, { method: "POST", token, body: {} });
    assert.equal(fourthCast.response.status, 409);

    const xam = await request("/api/reflections/xin-xam", {
      method: "POST", token,
      body: { stickNumber: "07", xamType: "Bình an", region: "Bắc Bộ", category: "Bình an", fortuneType: "Thượng Cát", quote: "Nước lặng thì lòng gương sáng." },
    });
    assert.equal(xam.response.status, 201);
    assert.equal(xam.payload.data.stickNumber, "07");

    const wish = await request("/api/reflections/wishes", { method: "POST", token, body: { category: "Gia đình", content: "Mong gia đình luôn bình an." } });
    assert.equal(wish.response.status, 201);
    assert.equal(wish.payload.data.sealed, true);

    const starred = await request(`/api/reflections/wishes/${wish.payload.data.id}`, { method: "PATCH", token, body: { starred: true } });
    assert.equal(starred.response.status, 200);
    assert.equal(starred.payload.data.starred, true);

    const otherWishes = await request("/api/reflections/wishes", { token: otherToken });
    assert.equal(otherWishes.payload.data.items.length, 0);

    const deleted = await request(`/api/reflections/xin-xam/${xam.payload.data.id}`, { method: "DELETE", token });
    assert.equal(deleted.response.status, 200);
  } finally {
    server.close();
    await prisma.$disconnect();
  }
});
