const prisma = require("../config/prisma");
const env = require("../config/env");
const webpush = require("web-push");
const logger = require("../utils/logger");
const { anniversaryMatches, threeDaysFromVietnamToday } = require("../utils/anniversary");
function configured() { return Boolean(env.VAPID_PUBLIC_KEY && env.VAPID_PRIVATE_KEY && env.VAPID_SUBJECT); }
async function runReminders(now = new Date()) {
  if (!configured()) return;
  const target = threeDaysFromVietnamToday(now);
  let cursor;
  for (;;) {
    const rows = await prisma.memorial_anniversaries.findMany({ take: 200, ...(cursor ? { cursor: { id: cursor }, skip: 1 } : {}), orderBy: { id: "asc" }, include: { memorials: { select: { users: { select: { id: true, user_settings: true, push_subscriptions: true } } } } } });
    for (const anniversary of rows) {
      const user = anniversary.memorials.users;
      if (user.user_settings?.push_notifications === false || !user.push_subscriptions.length || !anniversaryMatches(anniversary, target)) continue;
      const key = `${anniversary.id}:${target.toISOString().slice(0, 10)}`;
      const notice = await prisma.notifications.upsert({ where: { dedupe_key: key }, update: {}, create: { user_id: user.id, type: "MEMORIAL", title: "Nhắc ngày giỗ trước 3 ngày", message: "Bạn có ngày giỗ sắp tới trong sổ tưởng niệm. Mở ứng dụng để xem chi tiết.", dedupe_key: key } });
      const claim = await prisma.notifications.updateMany({ where: { id: notice.id, delivered_at: null, OR: [{ claimed_until: null }, { claimed_until: { lt: now } }] }, data: { claimed_until: new Date(now.getTime() + 5 * 60000) } });
      if (!claim.count) continue;
      let successful = true;
      for (const sub of user.push_subscriptions) {
        try {
          await webpush.sendNotification({ endpoint: sub.endpoint, keys: { p256dh: sub.p256dh, auth: sub.auth } }, JSON.stringify({ title: notice.title, body: notice.message, tag: key, url: "/notifications" }), { timeout: 10000, TTL: 86400, vapidDetails: { subject: env.VAPID_SUBJECT, publicKey: env.VAPID_PUBLIC_KEY, privateKey: env.VAPID_PRIVATE_KEY } });
        } catch (error) {
          if (error.statusCode === 404 || error.statusCode === 410) await prisma.push_subscriptions.deleteMany({ where: { id: sub.id } });
          else successful = false;
        }
      }
      await prisma.notifications.update({ where: { id: notice.id }, data: { delivered_at: successful ? new Date() : null, claimed_until: null } });
    }
    if (rows.length < 200) break;
    cursor = rows.at(-1).id;
  }
}
function startReminderWorker() {
  if (!configured()) return () => {};
  let running = false;
  const tick = async () => {
    if (running) return;
    running = true;
    try { await runReminders(); } catch { logger.warn("Memorial reminder delivery failed; will retry"); }
    finally { running = false; }
  };
  void tick();
  const timer = setInterval(tick, 15 * 60000);
  timer.unref();
  return () => clearInterval(timer);
}
module.exports = { configured, runReminders, startReminderWorker };
