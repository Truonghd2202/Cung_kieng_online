const { z } = require("zod");
const endpoint = z.string().url().max(2000).refine((value) => {
  const url = new URL(value);
  return url.protocol === "https:" && !url.username && !url.password && (!url.port || url.port === "443") && (url.hostname === "fcm.googleapis.com" || url.hostname === "updates.push.services.mozilla.com" || url.hostname.endsWith(".notify.windows.com") || url.hostname === "web.push.apple.com");
}, "Dịch vụ push này chưa được hỗ trợ");
const subscriptionSchema = z.object({ endpoint, keys: z.object({ p256dh: z.string().regex(/^[\w-]{87}$/), auth: z.string().regex(/^[\w-]{22}$/) }).strict(), expirationTime: z.number().nullable().optional() }).strict();
module.exports = { subscriptionSchema, endpointSchema: z.object({ endpoint }).strict() };
