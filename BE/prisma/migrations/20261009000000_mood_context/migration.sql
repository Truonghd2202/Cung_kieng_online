ALTER TABLE "signals"
ADD COLUMN "context_key" VARCHAR(30);

ALTER TABLE "mood_checkins"
ADD COLUMN "context_key" VARCHAR(30) NOT NULL DEFAULT 'general',
ADD COLUMN "signal_snapshot" JSONB;

CREATE INDEX "idx_signals_mood_context"
ON "signals"("mood", "context_key");
