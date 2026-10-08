ALTER TABLE "xin_xam_draws"
ADD COLUMN "proverb_id" UUID;

ALTER TABLE "xin_keo_throws"
ADD COLUMN "proverb_id" UUID;

CREATE INDEX "idx_xin_xam_draws_proverb_id"
ON "xin_xam_draws"("proverb_id");

CREATE INDEX "idx_xin_keo_throws_proverb_id"
ON "xin_keo_throws"("proverb_id");

ALTER TABLE "xin_xam_draws"
ADD CONSTRAINT "xin_xam_draws_proverb_id_fkey"
FOREIGN KEY ("proverb_id") REFERENCES "proverbs"("id")
ON DELETE SET NULL ON UPDATE NO ACTION;

ALTER TABLE "xin_keo_throws"
ADD CONSTRAINT "xin_keo_throws_proverb_id_fkey"
FOREIGN KEY ("proverb_id") REFERENCES "proverbs"("id")
ON DELETE SET NULL ON UPDATE NO ACTION;
