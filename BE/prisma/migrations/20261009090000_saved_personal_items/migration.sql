ALTER TABLE "mood_checkins" ADD COLUMN "saved_at" TIMESTAMPTZ(6);
ALTER TABLE "xin_xam_draws" ADD COLUMN "saved_at" TIMESTAMPTZ(6);

CREATE INDEX "mood_checkins_user_id_saved_at_idx" ON "mood_checkins"("user_id", "saved_at");
CREATE INDEX "xin_xam_draws_user_id_saved_at_idx" ON "xin_xam_draws"("user_id", "saved_at");
