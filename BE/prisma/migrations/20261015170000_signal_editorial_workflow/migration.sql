ALTER TABLE "signals"
  ADD COLUMN "editorial_status" "content_editorial_status" NOT NULL DEFAULT 'DRAFT',
  ADD COLUMN "reviewed_by" UUID,
  ADD COLUMN "reviewed_at" TIMESTAMPTZ(6),
  ADD COLUMN "approved_content_hash" CHAR(64);

ALTER TABLE "rituals"
  ADD COLUMN "content_provenance" JSONB NOT NULL DEFAULT '{}'::JSONB;

ALTER TABLE "signals"
  ADD CONSTRAINT "signals_reviewed_by_fkey"
  FOREIGN KEY ("reviewed_by") REFERENCES "users"("id")
  ON DELETE SET NULL ON UPDATE NO ACTION;

CREATE INDEX "idx_signals_publication" ON "signals"("editorial_status", "active");
CREATE INDEX "idx_signals_mood_context_status" ON "signals"("mood", "context_key", "editorial_status");

-- Signal rows have no trusted approval record in the legacy workflow. Keep all
-- content private until an administrator reviews the current version.
UPDATE "signals"
SET "editorial_status" = 'DRAFT',
    "active" = false,
    "reviewed_by" = NULL,
    "reviewed_at" = NULL,
    "approved_content_hash" = NULL;

UPDATE "signals" SET "context_key" = 'general' WHERE "context_key" IS NULL;

-- Remove legacy editorial-state copies without discarding the content or its
-- source metadata. Plain-text legacy rows are left unchanged.
DO $$
DECLARE
  signal_row RECORD;
  parsed JSONB;
BEGIN
  FOR signal_row IN SELECT "id", "content" FROM "signals" LOOP
    BEGIN
      parsed := signal_row."content"::JSONB;
    EXCEPTION WHEN invalid_text_representation THEN
      CONTINUE;
    END;

    IF jsonb_typeof(parsed) = 'object'
      AND jsonb_typeof(parsed->'metadata') = 'object'
      AND ((parsed->'metadata') ?| ARRAY['editorialStatus', 'reviewedBy', 'reviewedOn']) THEN
      parsed := jsonb_set(
        parsed,
        '{metadata}',
        (parsed->'metadata') - ARRAY['editorialStatus', 'reviewedBy', 'reviewedOn'],
        true
      );
      UPDATE "signals" SET "content" = parsed::TEXT WHERE "id" = signal_row."id";
    END IF;
  END LOOP;
END $$;
