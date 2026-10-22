import test from "node:test";
import assert from "node:assert/strict";
import {
  closeAdminOverlay,
  getAdminSectionFromSearch,
  getAdminSectionUrl,
  pushAdminOverlay,
} from "../src/admin/adminNavigation.ts";

test("admin section is restored from the URL after reload", () => {
  assert.equal(getAdminSectionFromSearch("?section=signals"), "signals");
  assert.equal(getAdminSectionFromSearch("?section=payments"), "payments");
  assert.equal(getAdminSectionFromSearch("?section=unknown"), "overview");
});

test("navigating sections changes only the section query parameter", () => {
  assert.equal(
    getAdminSectionUrl("http://localhost:3000/admin?debug=1", "signals"),
    "/admin?debug=1&section=signals",
  );
  assert.equal(
    getAdminSectionUrl("http://localhost:3000/admin?section=signals", "overview"),
    "/admin",
  );
});

test("opening an admin editor adds a back step without losing the current section", () => {
  const oldWindow = globalThis.window;
  let backCalls = 0;
  const history = {
    state: { adminSection: "signals" },
    pushState(state, _title, url) {
      this.state = state;
      this.url = url;
    },
    back() {
      backCalls += 1;
    },
  };
  globalThis.window = {
    history,
    location: { href: "http://localhost:3000/admin?section=signals" },
  };

  try {
    pushAdminOverlay("signal-editor");
    assert.equal(history.url, "http://localhost:3000/admin?section=signals");
    assert.equal(history.state.adminOverlay, "signal-editor");
    assert.equal(getAdminSectionFromSearch(new URL(history.url, "http://localhost:3000").search), "signals");
    closeAdminOverlay("signal-editor");
    assert.equal(backCalls, 1);
  } finally {
    if (oldWindow === undefined) delete globalThis.window;
    else globalThis.window = oldWindow;
  }
});
