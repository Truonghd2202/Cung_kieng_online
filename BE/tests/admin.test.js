const test = require("node:test");
const assert = require("node:assert/strict");
const requireAdmin = require("../src/middleware/requireAdmin.middleware");
const { reviewSchema } = require("../src/validators/admin.validator");

test("admin guard allows ADMIN and rejects ordinary users", () => {
  let passed = false;
  requireAdmin({ user: { role: "ADMIN" } }, {}, () => { passed = true; });
  assert.equal(passed, true);

  let denied;
  requireAdmin({ user: { role: "USER" } }, {}, (error) => { denied = error; });
  assert.equal(denied.statusCode, 403);
});

test("content review requires a meaningful audit note and at least one status change", () => {
  const version = { expectedUpdatedAt: "2026-10-19T10:00:00.000Z" };
  assert.equal(reviewSchema.safeParse({ ...version, verified: true, reviewNote: "Đã kiểm tra nguồn chính thức" }).success, true);
  assert.equal(reviewSchema.safeParse({ ...version, active: false, reviewNote: "Nội dung đang chờ bổ sung" }).success, true);
  assert.equal(reviewSchema.safeParse({ ...version, verified: true, reviewNote: "ngắn" }).success, false);
  assert.equal(reviewSchema.safeParse({ verified: true, reviewNote: "Thiếu phiên bản" }).success, false);
  assert.equal(reviewSchema.safeParse({ ...version, reviewNote: "Không thay đổi trạng thái nào" }).success, false);
});

test("review returns a conflict when the record changes after it was read", async (context) => {
  const prisma = require("../src/config/prisma");
  const repository = require("../src/repositories/admin.repository");
  const originalTransaction = prisma.$transaction;
  const updatedAt = new Date("2026-10-19T10:00:00.000Z");
  let auditWrites = 0;
  prisma.$transaction = async (callback) => callback({
    calendar_events: {
      findUnique: async () => ({ id: "event-1", updated_at: updatedAt, source: "https://source.test/item", active: false, verified: false, editorial_status: "IN_REVIEW" }),
      updateMany: async ({ where }) => {
        assert.equal(where.id, "event-1");
        assert.deepEqual(where.updated_at, { gte: updatedAt, lt: new Date(updatedAt.getTime() + 1) });
        return { count: 0 };
      },
    },
    admin_audit_logs: { findFirst: async () => null, create: async () => { auditWrites += 1; } },
  });
  context.after(() => { prisma.$transaction = originalTransaction; });

  const result = await repository.updateReview({
    model: "calendar_events",
    id: "event-1",
    actorId: "admin-1",
    patch: { verified: true },
    expectedUpdatedAt: updatedAt.toISOString(),
    reviewNote: "Đã kiểm tra hồ sơ nguồn",
    source: "https://source.test/item",
  });

  assert.deepEqual(result, { versionConflict: true });
  assert.equal(auditWrites, 0);
});

test("review workflow failures return 422 before any Prisma write", async (context) => {
  const prisma = require("../src/config/prisma");
  const adminService = require("../src/services/admin.service");
  const originalTransaction = prisma.$transaction;
  const updatedAt = new Date("2026-10-19T10:00:00.000Z");
  let writes = 0;
  prisma.$transaction = async (callback) => callback({
    calendar_events: {
      findUnique: async () => ({ id: "event-1", updated_at: updatedAt, source: null, active: false, verified: false, editorial_status: "DRAFT" }),
      updateMany: async () => { writes += 1; return { count: 1 }; },
      update: async () => { writes += 1; },
    },
    admin_audit_logs: { findFirst: async () => null, create: async () => { writes += 1; } },
  });
  context.after(() => { prisma.$transaction = originalTransaction; });

  await assert.rejects(
    adminService.updateCalendarReview("event-1", "admin-1", {
      expectedUpdatedAt: updatedAt.toISOString(), verified: true, reviewNote: "Review current calendar item",
    }),
    (error) => error.statusCode === 422 && /IN_REVIEW/.test(error.message),
  );
  assert.equal(writes, 0);
});

test("review and publish in one request returns 422 before any Prisma write", async (context) => {
  const prisma = require("../src/config/prisma");
  const adminService = require("../src/services/admin.service");
  const originalTransaction = prisma.$transaction;
  const updatedAt = new Date("2026-10-19T10:00:00.000Z");
  let writes = 0;
  prisma.$transaction = async (callback) => callback({
    calendar_events: {
      findUnique: async () => ({ id: "event-1", updated_at: updatedAt, source: null, active: false, verified: false, editorial_status: "IN_REVIEW" }),
      updateMany: async () => { writes += 1; return { count: 1 }; },
      update: async () => { writes += 1; },
    },
    admin_audit_logs: { findFirst: async () => null, create: async () => { writes += 1; } },
  });
  context.after(() => { prisma.$transaction = originalTransaction; });

  await assert.rejects(
    adminService.updateCalendarReview("event-1", "admin-1", {
      expectedUpdatedAt: updatedAt.toISOString(), verified: true, active: true, reviewNote: "Review then publish item",
    }),
    (error) => error.statusCode === 422 && /riêng/.test(error.message),
  );
  assert.equal(writes, 0);
});

test("calendar admin listing selects the schema-backed version column", async (context) => {
  const prisma = require("../src/config/prisma");
  const repository = require("../src/repositories/admin.repository");
  const original = prisma.calendar_events;
  let listArgs;
  prisma.calendar_events = {
    findMany: async (args) => { listArgs = args; return []; },
    count: async () => 0,
    groupBy: async ({ by }) => by[0] === "editorial_status" ? [] : [],
  };
  context.after(() => { prisma.calendar_events = original; });

  await repository.listCalendarEvents({ page: 1 });
  assert.equal(listArgs.select.updated_at, true);
});

test("ritual admin listing includes category so its card does not reuse the occasion", async (context) => {
  const prisma = require("../src/config/prisma");
  const repository = require("../src/repositories/admin.repository");
  const original = prisma.rituals;
  let listArgs;
  prisma.rituals = {
    findMany: async (args) => { listArgs = args; return []; },
    count: async () => 0,
    groupBy: async () => [],
  };
  context.after(() => { prisma.rituals = original; });

  await repository.listRituals({ page: 1 });
  assert.equal(listArgs.select.category, true);
});
