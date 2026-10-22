ALTER TABLE "calendar_events"
ADD COLUMN "image_url" TEXT,
ADD COLUMN "editorial_metadata" JSONB NOT NULL DEFAULT '{}'::jsonb;

ALTER TABLE "xin_xam"
ADD COLUMN "image_url" TEXT,
ADD COLUMN "editorial_metadata" JSONB NOT NULL DEFAULT '{}'::jsonb;

ALTER TABLE "prayers"
ADD COLUMN "category" VARCHAR(100),
ADD COLUMN "image_url" TEXT,
ADD COLUMN "editorial_metadata" JSONB NOT NULL DEFAULT '{}'::jsonb;

ALTER TABLE "rituals"
ADD COLUMN "category" VARCHAR(100),
ADD COLUMN "image_url" TEXT;
