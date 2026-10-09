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
  assert.equal(reviewSchema.safeParse({ verified: true, reviewNote: "Đã kiểm tra nguồn chính thức" }).success, true);
  assert.equal(reviewSchema.safeParse({ active: false, reviewNote: "Nội dung đang chờ bổ sung" }).success, true);
  assert.equal(reviewSchema.safeParse({ verified: true, reviewNote: "ngắn" }).success, false);
  assert.equal(reviewSchema.safeParse({ reviewNote: "Không thay đổi trạng thái nào" }).success, false);
});
