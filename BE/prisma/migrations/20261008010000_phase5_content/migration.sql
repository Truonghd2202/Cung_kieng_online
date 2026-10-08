CREATE TABLE "culture_articles" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "slug" VARCHAR(255) NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "excerpt" TEXT,
    "category" VARCHAR(120),
    "region" "vietnam_region" DEFAULT 'NATIONWIDE',
    "image_url" TEXT,
    "content" JSONB NOT NULL,
    "source" TEXT,
    "verified" BOOLEAN NOT NULL DEFAULT false,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "culture_articles_pkey" PRIMARY KEY ("id")
);
CREATE UNIQUE INDEX "culture_articles_slug_key" ON "culture_articles"("slug");
CREATE INDEX "culture_articles_category_idx" ON "culture_articles"("category");
CREATE INDEX "culture_articles_region_idx" ON "culture_articles"("region");
