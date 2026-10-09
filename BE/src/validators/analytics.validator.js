const { z } = require("zod");

const eventNames = [
  "app_open",
  "signup_completed",
  "mood_checkin_completed",
  "xam_draw_completed",
  "share_link_copied",
  "membership_interest_registered",
];

const eventSchema = z.object({
  clientEventId: z.string().uuid(),
  anonymousId: z.string().uuid(),
  eventName: z.enum(eventNames),
  campaignSource: z.enum(["campus_qr", "organic_social", "direct"]).optional(),
}).strict();

module.exports = { eventSchema };
