import test from "node:test";
import assert from "node:assert/strict";
import { getAdminAccessState } from "../src/admin/adminAccess.ts";

test("a USER reaching /admin gets a forbidden state, not the unauthenticated redirect state", () => {
  assert.equal(getAdminAccessState({ role: "USER" }), "forbidden");
});

test("an unauthenticated visitor still goes through the login flow", () => {
  assert.equal(getAdminAccessState(null), "unauthenticated");
});

test("ADMIN retains access", () => {
  assert.equal(getAdminAccessState({ role: "ADMIN" }), "authorized");
});
