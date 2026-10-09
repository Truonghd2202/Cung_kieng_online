const test = require("node:test");
const assert = require("node:assert/strict");
const app = require("../src/app");
const prisma = require("../src/config/prisma");

test("membership interest can be registered repeatedly and removed", { timeout: 30_000 }, async () => {
  const server = app.listen(0);
  await new Promise((resolve) => server.once("listening", resolve));
  const baseUrl = `http://127.0.0.1:${server.address().port}`;
  const email = `membership-${Date.now()}@example.com`;
  async function request(method, body) {
    const response = await fetch(`${baseUrl}/api/membership/interests`, {
      method,
      headers: { "content-type": "application/json" },
      body: JSON.stringify(body),
    });
    return { response, payload: await response.json() };
  }

  try {
    const first = await request("POST", { email: ` ${email.toUpperCase()} ` });
    const second = await request("POST", { email });
    assert.equal(first.response.status, 201);
    assert.equal(second.response.status, 201);
    assert.equal(first.payload.data.email, email);
    assert.equal(second.payload.data.email, email);

    const removed = await request("DELETE", { email });
    assert.equal(removed.response.status, 200);
    const invalid = await request("POST", { email: "not-an-email" });
    assert.equal(invalid.response.status, 422);
  } finally {
    server.close();
    await prisma.$disconnect();
  }
});
