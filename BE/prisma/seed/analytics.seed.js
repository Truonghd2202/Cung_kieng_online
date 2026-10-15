const prisma = require("../../src/config/prisma");
const { randomUUID } = require("crypto");

async function seedAnalytics() {
  console.log("Seeding analytics events for demo & testing...");

  // Get existing users
  const existingUsers = await prisma.users.findMany({
    select: { id: true, created_at: true },
    take: 50,
  });

  const now = new Date();
  const events = [];

  const sources = ["campus_qr", "direct", "organic_social", "referral"];
  const eventTypes = [
    "app_open",
    "mood_checkin_completed",
    "xam_draw_completed",
    "reading_opened",
  ];

  // Generate 7 days of realistic activity
  for (let daysAgo = 6; daysAgo >= 0; daysAgo--) {
    const targetDate = new Date(now.getTime() - daysAgo * 86400000);
    
    // Traffic base: weekend has more activity
    const dayOfWeek = targetDate.getDay();
    const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
    const baseVisitors = isWeekend ? 75 : 45;
    const visitorCount = Math.floor(baseVisitors + Math.random() * 25);

    // Create unique anonymous visitors for this day
    for (let v = 0; v < visitorCount; v++) {
      const anonId = randomUUID();
      const user = existingUsers[v % existingUsers.length] || null;
      const hour = Math.floor(8 + Math.random() * 14); // 8:00 - 22:00
      const minute = Math.floor(Math.random() * 60);
      const eventTime = new Date(targetDate);
      eventTime.setHours(hour, minute, 0, 0);

      // 1. Visit / app_open
      events.push({
        client_event_id: randomUUID(),
        user_id: user ? user.id : null,
        anonymous_id: anonId,
        event_name: "app_open",
        campaign_source: sources[v % sources.length],
        created_at: eventTime,
      });

      // 2. Engagement action (65% chance of checking in or drawing xam)
      if (Math.random() > 0.35) {
        const engTime = new Date(eventTime.getTime() + 120000); // 2 mins later
        const engType = Math.random() > 0.5 ? "mood_checkin_completed" : "xam_draw_completed";
        events.push({
          client_event_id: randomUUID(),
          user_id: user ? user.id : null,
          anonymous_id: anonId,
          event_name: engType,
          campaign_source: sources[v % sources.length],
          created_at: engTime,
        });
      }
    }
  }

  // Also seed signup_completed events with campaign sources for the existing users
  for (let i = 0; i < existingUsers.length; i++) {
    const u = existingUsers[i];
    const source = sources[i % sources.length];
    events.push({
      client_event_id: randomUUID(),
      user_id: u.id,
      anonymous_id: randomUUID(),
      event_name: "signup_completed",
      campaign_source: source,
      created_at: u.created_at || new Date(now.getTime() - (i % 25) * 86400000),
    });
  }

  // Insert in batches of 100
  console.log(`Inserting ${events.length} analytics events into database...`);
  const chunkSize = 100;
  for (let i = 0; i < events.length; i += chunkSize) {
    const chunk = events.slice(i, i + chunkSize);
    await prisma.analytics_events.createMany({
      data: chunk,
      skipDuplicates: true,
    });
  }

  console.log("Analytics events seeded successfully!");
}

if (require.main === module) {
  seedAnalytics()
    .then(() => process.exit(0))
    .catch((err) => {
      console.error("Failed to seed analytics:", err);
      process.exit(1);
    });
}

module.exports = { seedAnalytics };
