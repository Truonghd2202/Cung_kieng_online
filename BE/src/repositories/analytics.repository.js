const prisma = require("../config/prisma");

async function recordEvents(events) {
  if (events.length === 0) return 0;
  const result = await prisma.analytics_events.createMany({ data: events, skipDuplicates: true });
  return result.count;
}

async function getSummary() {
  const [activity, signupSources, activation, retention, subscribers] = await Promise.all([
    prisma.$queryRaw`
      SELECT
        COUNT(DISTINCT anonymous_id) FILTER (WHERE created_at >= date_trunc('day', CURRENT_TIMESTAMP))::int AS dau,
        COUNT(DISTINCT anonymous_id) FILTER (WHERE created_at >= date_trunc('month', CURRENT_TIMESTAMP))::int AS mau
      FROM analytics_events
      WHERE created_at >= date_trunc('month', CURRENT_TIMESTAMP)
    `,
    prisma.analytics_events.groupBy({
      by: ["campaign_source"],
      where: { event_name: "signup_completed", created_at: { gte: new Date(Date.now() - 30 * 86400000) } },
      _count: { _all: true },
    }),
    prisma.$queryRaw`
      SELECT
        COUNT(*)::int AS signups,
        COUNT(*) FILTER (WHERE EXISTS (
          SELECT 1 FROM analytics_events e
          WHERE e.user_id = u.id
            AND e.event_name IN ('mood_checkin_completed', 'xam_draw_completed')
            AND e.created_at >= u.created_at
            AND e.created_at < u.created_at + INTERVAL '24 hours'
        ))::int AS activated
      FROM users u
      WHERE u.created_at >= CURRENT_TIMESTAMP - INTERVAL '30 days'
        AND EXISTS (SELECT 1 FROM analytics_events consent WHERE consent.user_id = u.id AND consent.event_name = 'signup_completed')
    `,
    prisma.$queryRaw`
      SELECT metric, cohort_size, retained,
        CASE WHEN cohort_size = 0 THEN NULL ELSE ROUND(retained::numeric * 100 / cohort_size, 2) END AS rate_percent
      FROM (
        SELECT 'D1' AS metric,
          COUNT(*) FILTER (WHERE u.created_at::date = CURRENT_DATE - 1)::int AS cohort_size,
          COUNT(*) FILTER (WHERE u.created_at::date = CURRENT_DATE - 1 AND EXISTS (
            SELECT 1 FROM analytics_events e WHERE e.user_id = u.id AND e.created_at::date = CURRENT_DATE
          ))::int AS retained
        FROM users u
        WHERE EXISTS (SELECT 1 FROM analytics_events consent WHERE consent.user_id = u.id AND consent.event_name = 'signup_completed')
        UNION ALL
        SELECT 'D7',
          COUNT(*) FILTER (WHERE u.created_at::date = CURRENT_DATE - 7)::int,
          COUNT(*) FILTER (WHERE u.created_at::date = CURRENT_DATE - 7 AND EXISTS (
            SELECT 1 FROM analytics_events e WHERE e.user_id = u.id AND e.created_at::date = CURRENT_DATE
          ))::int
        FROM users u
        WHERE EXISTS (SELECT 1 FROM analytics_events consent WHERE consent.user_id = u.id AND consent.event_name = 'signup_completed')
        UNION ALL
        SELECT 'D30',
          COUNT(*) FILTER (WHERE u.created_at::date = CURRENT_DATE - 30)::int,
          COUNT(*) FILTER (WHERE u.created_at::date = CURRENT_DATE - 30 AND EXISTS (
            SELECT 1 FROM analytics_events e WHERE e.user_id = u.id AND e.created_at::date = CURRENT_DATE
          ))::int
        FROM users u
        WHERE EXISTS (SELECT 1 FROM analytics_events consent WHERE consent.user_id = u.id AND consent.event_name = 'signup_completed')
      ) cohorts
    `,
    prisma.subscriptions.count({ where: { status: "ACTIVE", expires_at: { gt: new Date() } } }),
  ]);

  const funnel = activation[0];
  return {
    dau: activity[0].dau,
    mau: activity[0].mau,
    acquisition: signupSources.map(({ campaign_source, _count }) => ({ source: campaign_source || "unknown", signups: _count._all })),
    activationRate30d: funnel.signups === 0 ? null : Number((funnel.activated * 100 / funnel.signups).toFixed(2)),
    retention: retention.map(({ metric, cohort_size, retained, rate_percent }) => ({ day: metric, cohortSize: cohort_size, retained, ratePercent: rate_percent === null ? null : Number(rate_percent) })),
    activeSubscriptions: subscribers,
    referralKFactor: null,
    ltvToCac: null,
    unavailableMetrics: [
      "Paid conversion: chưa có luồng thanh toán tích hợp để xác nhận giao dịch",
      "Referral K-factor: chưa có cơ chế referral attribution",
      "LTV/CAC: chưa có dữ liệu doanh thu và chi phí thu hút đáng tin cậy",
    ],
  };
}

module.exports = { recordEvents, getSummary };
