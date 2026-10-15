ALTER TABLE "rituals"
ADD COLUMN "checklists" JSONB NOT NULL DEFAULT '[]'::jsonb;

-- Preserve a usable checklist for existing rituals by migrating the ordered
-- preparation steps already stored in ritual_steps. IDs remain stable later
-- because the editor sends these IDs back unchanged when labels/order change.
UPDATE "rituals" AS ritual
SET "checklists" = migrated.items
FROM (
  SELECT
    steps."ritual_id",
    jsonb_agg(
      jsonb_build_object(
        'id', CASE ritual.slug
          WHEN 'chuan-bi-ngay-ram' THEN 'c'
          WHEN 'mung-mot-thanh-tinh' THEN 'mm'
          WHEN 'tuong-nho-gia-dinh' THEN 'tn'
          WHEN 'phong-tuc-dau-nam' THEN 'tet'
          WHEN 'cung-gio-mien-nam' THEN 'cg'
          WHEN 'ta-on-nha-moi' THEN 'nm'
          ELSE 'legacy'
        END || '-' || steps."step_number"::text,
        'label', COALESCE(NULLIF(BTRIM(steps."title"), ''), NULLIF(BTRIM(steps."description"), ''))
      )
      ORDER BY steps."step_number"
    ) AS items
  FROM "ritual_steps" AS steps
  JOIN "rituals" AS ritual ON ritual."id" = steps."ritual_id"
  WHERE NULLIF(BTRIM(steps."title"), '') IS NOT NULL
     OR NULLIF(BTRIM(steps."description"), '') IS NOT NULL
  GROUP BY steps."ritual_id", ritual.slug
) AS migrated
WHERE ritual."id" = migrated."ritual_id";

-- Do not leave previously published rituals visible without a usable checklist.
UPDATE "rituals"
SET "active" = false
WHERE "verified" = true
  AND NOT EXISTS (
    SELECT 1
    FROM jsonb_array_elements("rituals"."checklists") AS checklist_item(value)
    WHERE NULLIF(BTRIM(checklist_item.value ->> 'id'), '') IS NOT NULL
      AND NULLIF(BTRIM(checklist_item.value ->> 'label'), '') IS NOT NULL
  );
