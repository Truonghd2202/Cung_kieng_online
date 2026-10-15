require("./test-env");

const test = require("node:test");
const assert = require("node:assert/strict");
const { randomUUID } = require("node:crypto");

// Chặn chạy nhầm vào database của ứng dụng đang sử dụng.
if (
  process.env.NODE_ENV !== "test" ||
  !process.env.TEST_DATABASE_URL ||
  process.env.DATABASE_URL !== process.env.TEST_DATABASE_URL
) {
  throw new Error(
    "Bài kiểm tra này chỉ được chạy bằng database test riêng.",
  );
}

const app = require("../src/app");
const prisma = require("../src/config/prisma");

test(
  "membership interest belongs to the signed-in account",
  { timeout: 30_000 },
  async () => {
    const suffix = randomUUID();

    const emailA = `membership-a-${suffix}@example.com`;
    const emailB = `membership-b-${suffix}@example.com`;
    const testEmails = [emailA, emailB];

    const server = app.listen(0, "127.0.0.1");

    await new Promise((resolve) => {
      server.once("listening", resolve);
    });

    const baseUrl =
      `http://127.0.0.1:${server.address().port}/api/v1`;

    async function request(
      path,
      { method = "GET", token, body } = {},
    ) {
      const headers = {};

      if (token) {
        headers.authorization = `Bearer ${token}`;
      }

      if (body !== undefined) {
        headers["content-type"] = "application/json";
      }

      const response = await fetch(`${baseUrl}${path}`, {
        method,
        headers,
        body:
          body !== undefined
            ? JSON.stringify(body)
            : undefined,
      });

      return {
        response,
        payload: await response.json(),
      };
    }

    async function createAccount(email) {
      const result = await request("/auth/register", {
        method: "POST",
        body: {
          fullName: "Membership Test",
          email,
          password: "TestPassword123!",
        },
      });

      assert.equal(result.response.status, 201);
      assert.ok(result.payload.data.accessToken);

      return result.payload.data.accessToken;
    }

    try {
      // 1. Khách không được đọc, đăng ký hoặc hủy.
      for (const method of ["GET", "POST", "DELETE"]) {
        const result = await request("/membership/interests", {
          method,
          ...(method !== "GET" ? { body: {} } : {}),
        });

        assert.equal(
          result.response.status,
          401,
          `${method} must require authentication`,
        );
      }

      const tokenA = await createAccount(emailA);
      const tokenB = await createAccount(emailB);

      // 2. Ban đầu A chưa đăng ký.
      const initial = await request("/membership/interests", {
        token: tokenA,
      });

      assert.equal(initial.response.status, 200);
      assert.equal(initial.payload.data.registered, false);
      assert.equal(initial.payload.data.email, emailA);

      // 3. Đăng ký A.
      const first = await request("/membership/interests", {
        method: "POST",
        token: tokenA,
        body: {},
      });

      assert.equal(first.response.status, 201);
      assert.equal(first.payload.data.email, emailA);

      // 4. Gửi lặp không tạo thêm bản ghi.
      const repeated = await request("/membership/interests", {
        method: "POST",
        token: tokenA,
        body: {},
      });

      assert.equal(repeated.response.status, 201);

      assert.equal(
        await prisma.membership_interests.count({
          where: { email: emailA },
        }),
        1,
      );

      // 5. Đọc lại từ server, tương đương tải lại trang.
      const restored = await request("/membership/interests", {
        token: tokenA,
      });

      assert.equal(restored.payload.data.registered, true);
      assert.equal(restored.payload.data.email, emailA);

      // 6. B chỉ thấy trạng thái của B.
      const otherAccount = await request(
        "/membership/interests",
        { token: tokenB },
      );

      assert.equal(otherAccount.response.status, 200);
      assert.equal(otherAccount.payload.data.email, emailB);
      assert.equal(
        otherAccount.payload.data.registered,
        false,
      );

      // 7. Không cho gửi email người khác vào request.
      for (const method of ["POST", "DELETE"]) {
        const forged = await request("/membership/interests", {
          method,
          token: tokenB,
          body: { email: emailA },
        });

        assert.equal(forged.response.status, 422);
      }

      // 8. B hủy đăng ký của B không ảnh hưởng A.
      const removeB = await request("/membership/interests", {
        method: "DELETE",
        token: tokenB,
        body: {},
      });

      assert.equal(removeB.response.status, 200);

      const stillRegistered = await request(
        "/membership/interests",
        { token: tokenA },
      );

      assert.equal(
        stillRegistered.payload.data.registered,
        true,
      );

      // 9. A hủy được đăng ký của A.
      const removed = await request("/membership/interests", {
        method: "DELETE",
        token: tokenA,
        body: {},
      });

      assert.equal(removed.response.status, 200);

      const afterRemoval = await request(
        "/membership/interests",
        { token: tokenA },
      );

      assert.equal(
        afterRemoval.payload.data.registered,
        false,
      );

      // 10. Hủy lặp vẫn thành công.
      const removedAgain = await request(
        "/membership/interests",
        {
          method: "DELETE",
          token: tokenA,
          body: {},
        },
      );

      assert.equal(removedAgain.response.status, 200);
    } finally {
      await new Promise((resolve, reject) => {
        server.close((error) => {
          if (error) reject(error);
          else resolve();
        });

        server.closeIdleConnections();
      });

      try {
        // Chỉ dọn các bản ghi do lần test này tạo.
        await prisma.membership_interests.deleteMany({
          where: { email: { in: testEmails } },
        });

        const accounts = await prisma.users.findMany({
          where: { email: { in: testEmails } },
          select: { id: true },
        });

        const ids = accounts.map((account) => account.id);

        if (ids.length > 0) {
          await prisma.refresh_tokens.deleteMany({
            where: { user_id: { in: ids } },
          });

          await prisma.users.deleteMany({
            where: { id: { in: ids } },
          });
        }
      } finally {
        await prisma.$disconnect();
      }
    }
  },
);
