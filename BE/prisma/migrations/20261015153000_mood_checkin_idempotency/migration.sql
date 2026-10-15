ALTER TABLE "mood_checkins"
ADD COLUMN "idempotency_key" UUID;

CREATE UNIQUE INDEX "uq_mood_checkins_user_idempotency"
ON "mood_checkins" ("user_id", "idempotency_key");
