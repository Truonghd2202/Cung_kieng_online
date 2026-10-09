const SHELL_CACHE = "tltl-shell-v1";
const ASSET_CACHE = "tltl-public-assets-v1";
const SHELL = ["/", "/index.html"];

self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(SHELL_CACHE).then((cache) => cache.addAll(SHELL)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", (event) => {
  event.waitUntil(caches.keys().then((keys) => Promise.all(keys.filter((key) => key.startsWith("tltl-") && ![SHELL_CACHE, ASSET_CACHE].includes(key)).map((key) => caches.delete(key)))).then(() => self.clients.claim()));
});

self.addEventListener("fetch", (event) => {
  const request = event.request;
  const url = new URL(request.url);
  if (request.method !== "GET" || url.origin !== self.location.origin || request.headers.has("authorization")) return;
  if (url.pathname.startsWith("/api/") || /\/(auth|payment|account|profile|private|users?)(\/|$)/i.test(url.pathname)) return;

  if (request.mode === "navigate") {
    event.respondWith(fetch(request).catch(async () => (await caches.match("/index.html")) || Response.error()));
    return;
  }

  const isPublicAsset = /\/(assets|images|audio|fonts|content)\//.test(url.pathname) || /\.(?:js|css|svg|png|jpe?g|webp|avif|woff2?|mp3|json)$/i.test(url.pathname);
  if (!isPublicAsset) return;
  event.respondWith((async () => {
    const cache = await caches.open(ASSET_CACHE);
    const cached = await cache.match(request);
    if (cached) return cached;
    try {
      const response = await fetch(request);
      if (response.ok && response.type === "basic") await cache.put(request, response.clone());
      return response;
    } catch { return Response.error(); }
  })());
});

self.addEventListener("push", (event) => {
  let message;
  try { message = event.data.json(); } catch { return; }
  event.waitUntil(self.registration.showNotification(message.title || "Tâm An", { body: message.body || "Bạn có lời nhắc mới.", tag: message.tag, data: { url: "/notifications" } }));
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  event.waitUntil((async () => {
    const windows = await self.clients.matchAll({ type: "window", includeUncontrolled: true });
    const existing = windows.find((client) => new URL(client.url).origin === self.location.origin);
    if (existing) { await existing.navigate("/notifications"); return existing.focus(); }
    return self.clients.openWindow("/notifications");
  })());
});
