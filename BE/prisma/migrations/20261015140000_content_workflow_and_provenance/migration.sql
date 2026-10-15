CREATE TYPE "content_editorial_status" AS ENUM (
  'DRAFT',
  'IN_REVIEW',
  'APPROVED',
  'PUBLISHED',
  'HIDDEN',
  'REVOKED'
);

ALTER TABLE "culture_articles" ADD COLUMN "editorial_status" "content_editorial_status" NOT NULL DEFAULT 'DRAFT';
ALTER TABLE "calendar_events" ADD COLUMN "editorial_status" "content_editorial_status" NOT NULL DEFAULT 'DRAFT';
ALTER TABLE "xin_xam" ADD COLUMN "editorial_status" "content_editorial_status" NOT NULL DEFAULT 'DRAFT';
ALTER TABLE "rituals" ADD COLUMN "editorial_status" "content_editorial_status" NOT NULL DEFAULT 'DRAFT';
ALTER TABLE "prayers" ADD COLUMN "editorial_status" "content_editorial_status" NOT NULL DEFAULT 'DRAFT';

-- Preserve only approvals that already exist. Active but unverified legacy rows
-- are made private, and submitted drafts are inferred only from their latest edit log.
UPDATE "culture_articles" SET
  "editorial_status" = CASE WHEN "verified" AND "active" THEN 'PUBLISHED'::"content_editorial_status" WHEN "verified" THEN 'APPROVED'::"content_editorial_status" ELSE 'DRAFT'::"content_editorial_status" END,
  "active" = "active" AND "verified";
UPDATE "calendar_events" SET
  "editorial_status" = CASE WHEN "verified" AND "active" THEN 'PUBLISHED'::"content_editorial_status" WHEN "verified" THEN 'APPROVED'::"content_editorial_status" ELSE 'DRAFT'::"content_editorial_status" END,
  "active" = "active" AND "verified";
UPDATE "xin_xam" SET
  "editorial_status" = CASE WHEN "verified" AND "active" THEN 'PUBLISHED'::"content_editorial_status" WHEN "verified" THEN 'APPROVED'::"content_editorial_status" ELSE 'DRAFT'::"content_editorial_status" END,
  "active" = "active" AND "verified";
UPDATE "rituals" SET
  "editorial_status" = CASE WHEN "verified" AND "active" THEN 'PUBLISHED'::"content_editorial_status" WHEN "verified" THEN 'APPROVED'::"content_editorial_status" ELSE 'DRAFT'::"content_editorial_status" END,
  "active" = "active" AND "verified";
UPDATE "prayers" SET
  "editorial_status" = CASE WHEN "verified" AND "active" THEN 'PUBLISHED'::"content_editorial_status" WHEN "verified" THEN 'APPROVED'::"content_editorial_status" ELSE 'DRAFT'::"content_editorial_status" END,
  "active" = "active" AND "verified";

-- Replace legacy reviewer UUIDs in article metadata with the reviewer's display name.
WITH latest_approvals AS (
  SELECT DISTINCT ON (log.target_id)
    log.target_id,
    log.actor_id,
    log.created_at
  FROM "admin_audit_logs" log
  WHERE log.target_type = 'culture_articles'
    AND log.action = 'CONTENT_REVIEW_UPDATED'
    AND log.details->'after'->>'verified' = 'true'
  ORDER BY log.target_id, log.created_at DESC
)
UPDATE "culture_articles" article
SET "content" = jsonb_set(
  article."content",
  '{review}',
  article."content"->'review' || jsonb_build_object(
    'reviewerName', reviewer.full_name,
    'reviewedOn', to_char(approval.created_at AT TIME ZONE 'Asia/Ho_Chi_Minh', 'YYYY-MM-DD')
  ),
  true
)
FROM latest_approvals approval
JOIN "users" reviewer ON reviewer.id = approval.actor_id
WHERE article.id = approval.target_id
  AND article.verified = true
  AND jsonb_typeof(article."content"->'review') = 'object';

DO $$
DECLARE
  target_table TEXT;
BEGIN
  FOREACH target_table IN ARRAY ARRAY['culture_articles', 'calendar_events', 'xin_xam', 'rituals', 'prayers'] LOOP
    EXECUTE format(
      'UPDATE %I item SET editorial_status = ''IN_REVIEW''::"content_editorial_status"
       WHERE item.verified = false AND EXISTS (
         SELECT 1 FROM admin_audit_logs log
         WHERE log.target_type = %L AND log.target_id = item.id
           AND log.action IN (''CONTENT_CREATED'', ''CONTENT_EDITED'')
           AND log.details->>''reviewNote'' LIKE ''%%[Gửi duyệt]%%''
           AND NOT EXISTS (
             SELECT 1 FROM admin_audit_logs later
             WHERE later.target_type = log.target_type AND later.target_id = log.target_id
               AND later.action IN (''CONTENT_CREATED'', ''CONTENT_EDITED'')
               AND later.created_at > log.created_at
           )
           AND NOT EXISTS (
             SELECT 1 FROM admin_audit_logs review
             WHERE review.target_type = log.target_type AND review.target_id = log.target_id
               AND review.action = ''CONTENT_REVIEW_UPDATED''
               AND review.details->''after''->>''verified'' = ''false''
               AND review.created_at > log.created_at
           )
       )', target_table, target_table
    );
  END LOOP;
END $$;
