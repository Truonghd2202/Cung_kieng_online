CREATE TABLE "partner_gifts" (
  "id" UUID NOT NULL DEFAULT gen_random_uuid(),
  "name" VARCHAR(200) NOT NULL,
  "description" VARCHAR(5000) NOT NULL,
  "partner_name" VARCHAR(200) NOT NULL,
  "purchase_url" VARCHAR(2000) NOT NULL,
  "active" BOOLEAN NOT NULL DEFAULT false,
  "version" INTEGER NOT NULL DEFAULT 1,
  "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

  CONSTRAINT "partner_gifts_pkey" PRIMARY KEY ("id")
);

CREATE INDEX "partner_gifts_active_created_at_idx"
ON "partner_gifts"("active", "created_at");
