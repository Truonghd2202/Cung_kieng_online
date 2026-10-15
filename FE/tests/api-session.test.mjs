import test from "node:test";
import assert from "node:assert/strict";
import { createSessionApiClient } from "../src/lib/sessionApiClient.ts";

const deferred = () => {
  let resolve;
  const promise = new Promise((done) => { resolve = done; });
  return { promise, resolve };
};
const ok = (data) => new Response(JSON.stringify({ success: true, data }), { status: 200 });
const unauthorized = () => new Response(JSON.stringify({ success: false, message: "Unauthorized" }), { status: 401 });

test("stale A POST 401 is never retried with account B token or body", async () => {
  const oldResponse = deferred();
  const requests = [];
  const client = createSessionApiClient({ baseUrl: "https://api.test", fetcher: async (url, init) => {
    requests.push({ url, authorization: new Headers(init.headers).get("authorization"), body: init.body });
    if (url.endsWith("/private") && new Headers(init.headers).get("authorization") === "Bearer token-A") return oldResponse.promise;
    return ok({ accessToken: "refresh-token" });
  } });
  client.setAccessToken("token-A");

  const oldRequest = client.apiRequest("/private", { method: "POST", body: JSON.stringify({ privateA: true }) });
  client.beginSessionTransition();
  client.setAccessToken("token-B");
  oldResponse.resolve(unauthorized());

  await assert.rejects(oldRequest, /phiên đăng nhập đã thay đổi/i);
  assert.equal(requests.length, 1);
  assert.equal(requests[0].authorization, "Bearer token-A");
  assert.equal(requests[0].body, JSON.stringify({ privateA: true }));
  await client.apiRequest("/private", { method: "GET" });
  assert.equal(requests.at(-1).authorization, "Bearer token-B");
});

test("an in-flight refresh cannot replace a newer session token", async () => {
  const refreshResponse = deferred();
  const first401 = deferred();
  const requests = [];
  const client = createSessionApiClient({ baseUrl: "https://api.test", fetcher: async (url, init) => {
    const authorization = new Headers(init.headers).get("authorization");
    requests.push({ url, authorization });
    if (url.endsWith("/auth/refresh")) return refreshResponse.promise;
    if (url.endsWith("/private") && authorization === "Bearer token-A") return first401.promise;
    return ok({ value: true });
  } });
  client.setAccessToken("token-A");
  const oldRequest = client.apiRequest("/private");
  first401.resolve(unauthorized());
  await new Promise((resolve) => setImmediate(resolve));
  client.beginSessionTransition();
  client.setAccessToken("token-B");
  refreshResponse.resolve(ok({ accessToken: "stale-refresh-A" }));
  await assert.rejects(oldRequest, /phiên đăng nhập đã thay đổi/i);
  await client.apiRequest("/private");
  assert.equal(requests.at(-1).authorization, "Bearer token-B");
});

test("session is checked after the response body has been read", async () => {
  const body = deferred();
  const client = createSessionApiClient({ baseUrl: "https://api.test", fetcher: async () => ({
    ok: true,
    status: 200,
    json: () => body.promise,
  }) });
  client.setAccessToken("token-A");
  const request = client.apiRequest("/private");
  await new Promise((resolve) => setImmediate(resolve));
  client.beginSessionTransition();
  body.resolve({ success: true, data: { value: true } });
  await assert.rejects(request, /phiên đăng nhập đã thay đổi/i);
});

test("logout invalidates a pending refresh without restoring its token", async () => {
  const refreshResponse = deferred();
  const old401 = deferred();
  const requests = [];
  const client = createSessionApiClient({ baseUrl: "https://api.test", fetcher: async (url, init) => {
    const authorization = new Headers(init.headers).get("authorization");
    requests.push({ url, authorization });
    if (url.endsWith("/auth/refresh")) return refreshResponse.promise;
    if (url.endsWith("/private") && authorization === "Bearer token-A") return old401.promise;
    return ok({ value: true });
  } });
  client.setAccessToken("token-A");
  const request = client.apiRequest("/private");
  old401.resolve(unauthorized());
  await new Promise((resolve) => setImmediate(resolve));
  client.beginSessionTransition(false); // logout starts; token is retained only for the logout request
  refreshResponse.resolve(ok({ accessToken: "stale-token-A" }));
  await assert.rejects(request, /phiên đăng nhập đã thay đổi/i);
  client.beginSessionTransition();
  await client.apiRequest("/private");
  assert.equal(requests.at(-1).authorization, null);
});

test("same-session token rotation does not invalidate a successful concurrent request", async () => {
  const body = deferred();
  const refreshResponse = deferred();
  const requests = [];
  const client = createSessionApiClient({ baseUrl: "https://api.test", fetcher: async (url, init) => {
    const authorization = new Headers(init.headers).get("authorization");
    requests.push({ url, authorization });
    if (url.endsWith("/will-refresh") && authorization === "Bearer token-A") return unauthorized();
    if (url.endsWith("/will-refresh")) return ok({ value: true });
    if (url.endsWith("/auth/refresh")) return refreshResponse.promise;
    return { ok: true, status: 200, json: () => body.promise };
  } });
  client.setAccessToken("token-A");
  const concurrent = client.apiRequest("/concurrent");
  const refreshing = client.apiRequest("/will-refresh");
  await new Promise((resolve) => setImmediate(resolve));
  refreshResponse.resolve(ok({ accessToken: "token-A-rotated" }));
  body.resolve({ success: true, data: { result: true } });
  assert.deepEqual(await concurrent, { result: true });
  assert.deepEqual(await refreshing, { value: true });
  assert.ok(requests.some((entry) => entry.authorization === "Bearer token-A-rotated"));
});
