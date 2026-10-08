const test = require("node:test");
const assert = require("node:assert/strict");
const app = require("../src/app");

test("culture, ritual, and calendar catalogs are publicly readable", async () => {
  const server = app.listen(0);
  await new Promise((resolve) => server.once("listening", resolve));
  const baseUrl = `http://127.0.0.1:${server.address().port}`;
  try {
    const culture = await fetch(`${baseUrl}/api/content/culture`).then((response) => response.json());
    assert.ok(culture.data.items.length >= 6);
    const article = await fetch(`${baseUrl}/api/content/culture/dinh-lang-bac-bo`).then((response) => response.json());
    assert.equal(article.data.id, "dinh-lang-bac-bo");
    const rituals = await fetch(`${baseUrl}/api/content/rituals`).then((response) => response.json());
    assert.ok(rituals.data.items.length >= 6);
    const calendar = await fetch(`${baseUrl}/api/content/calendar/events`).then((response) => response.json());
    assert.ok(calendar.data.items.length >= 5);
    const daily = await fetch(`${baseUrl}/api/content/daily-proverb?date=2026-10-08`).then((response) => response.json());
    assert.equal(daily.data.date, "2026-10-08");
    assert.equal(daily.data.cycleLength, 365);
    assert.equal(daily.data.verified, true);
    assert.ok(daily.data.content);
    assert.ok(daily.data.meaning);
    assert.match(daily.data.source.url, /ReML-AI\/VIVID/);
    const reflectionProverb = await fetch(`${baseUrl}/api/content/reflection-proverb?context=XAM`).then((response) => response.json());
    assert.ok(reflectionProverb.data.content);
    assert.ok(reflectionProverb.data.meaning);
    assert.equal(reflectionProverb.data.verified, true);
  } finally {
    server.close();
  }
});
