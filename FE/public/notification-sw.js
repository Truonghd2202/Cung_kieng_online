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
