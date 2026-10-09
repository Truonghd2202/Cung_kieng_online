ALTER TABLE "xin_keo_sessions"
ADD COLUMN "draw_id" UUID;

ALTER TABLE "xin_keo_sessions"
ADD CONSTRAINT "xin_keo_sessions_draw_id_fkey"
FOREIGN KEY ("draw_id") REFERENCES "xin_xam_draws"("id")
ON DELETE SET NULL ON UPDATE NO ACTION;

CREATE INDEX "xin_keo_sessions_draw_id_idx" ON "xin_keo_sessions"("draw_id");
