import test from "node:test";
import assert from "node:assert/strict";
import { safeAuthErrorMessage } from "../src/data/authErrorCopy.ts";

test("server errors never expose Prisma paths or stack details to auth screens", () => {
  const prismaError = "Invalid `client.users.findUnique()` invocation in C:\\app\\BE\\src\\repositories\\user.repository.js:18:23 The column `users.email_verified_at` does not exist in the current database.";
  assert.equal(safeAuthErrorMessage(500, prismaError), "Máy chủ đang gặp sự cố. Vui lòng thử lại sau.");
  assert.equal(safeAuthErrorMessage(500, "Internal server error"), "Máy chủ đang gặp sự cố. Vui lòng thử lại sau.");
});

test("client validation errors remain visible without accepting server traces", () => {
  assert.equal(safeAuthErrorMessage(400, "Invalid email or password"), "Invalid email or password");
  assert.equal(safeAuthErrorMessage(400, "PrismaClientKnownRequestError: column missing"), "Máy chủ đang gặp sự cố. Vui lòng thử lại sau.");
});
