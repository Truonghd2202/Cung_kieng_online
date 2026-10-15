const prisma = require("../config/prisma");

function createSession(data, client = prisma) {
  return client.xin_keo_sessions.create({ data, include: { xin_keo_throws: { include: { proverbs: true } } } });
}

function findSession(id, userId, client = prisma) {
  return client.xin_keo_sessions.findFirst({ where: { id, user_id: userId }, include: { xin_keo_throws: { orderBy: { throw_number: "asc" }, include: { proverbs: true } } } });
}

function listSessions(userId, client = prisma) {
  return client.xin_keo_sessions.findMany({ where: { user_id: userId }, orderBy: { created_at: "desc" }, take: 50, include: { xin_keo_throws: { orderBy: { throw_number: "asc" }, include: { proverbs: true } } } });
}

function createThrowAndUpdateSession(session, throwData) {
  return prisma.$transaction(async (transaction) => {
    await transaction.$queryRawUnsafe(
      'SELECT "id" FROM "xin_keo_sessions" WHERE "id" = $1::uuid FOR UPDATE',
      session.id
    );

    // Kiểm tra trước giới hạn ba lần để gửi lại lượt thứ ba
    // vẫn nhận được kết quả đã lưu.
    if (throwData.id) {
      const existing =
        await transaction.xin_keo_throws.findUnique({
          where: { id: throwData.id },
          include: { proverbs: true },
        });

      if (existing) {
        if (existing.session_id !== session.id) {
          const error = new Error("THROW_REQUEST_CONFLICT");
          error.code = "THROW_REQUEST_CONFLICT";
          throw error;
        }

        return existing;
      }
    }

    const count = await transaction.xin_keo_throws.count({
      where: { session_id: session.id },
    });

    if (count >= 3) {
      const error = new Error("SESSION_MAX_THROWS");
      error.code = "SESSION_MAX_THROWS";
      throw error;
    }

    const created = await transaction.xin_keo_throws.create({
      data: {
        ...throwData,
        throw_number: count + 1,
      },
      include: { proverbs: true },
    });

    await transaction.xin_keo_sessions.update({
      where: { id: session.id },
      data: { final_result: created.result },
    });

    return created;
  });
}

module.exports = { createSession, findSession, listSessions, createThrowAndUpdateSession };
