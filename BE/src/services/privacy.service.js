const prisma = require("../config/prisma");

async function clearPersonalContent(userId) {
  await prisma.$transaction(async (tx) => {
    // Delete dependent incense records before memorials. Keep account and payment receipts.
    for (const model of ["incense_sessions", "reminders", "notifications", "favorites", "wishes", "mood_checkins", "xin_xam_draws", "xin_keo_sessions", "calendar_notes", "memorials", "horoscope_readings", "astrology_profiles", "physiognomy_analyses", "user_divinations", "virtual_sanctuaries", "file_assets", "analytics_events", "ai_generation_logs", "password_reset_tokens"]) {
      await tx[model].deleteMany({ where: { user_id: userId } });
    }
    await tx.family_trees.deleteMany({ where: { owner_user_id: userId } });
  });
}
module.exports = { clearPersonalContent };
