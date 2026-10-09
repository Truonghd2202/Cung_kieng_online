ALTER TABLE "horoscope_readings" ADD COLUMN "status" VARCHAR(20) NOT NULL DEFAULT 'SUCCEEDED';
UPDATE "horoscope_readings" SET "status" = 'FAILED' WHERE "prompt_version" = 'yearly-reflection-pending';
CREATE INDEX "horoscope_readings_user_id_status_created_at_idx"
ON "horoscope_readings"("user_id", "status", "created_at");
