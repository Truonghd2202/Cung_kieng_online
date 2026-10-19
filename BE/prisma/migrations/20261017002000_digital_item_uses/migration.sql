CREATE TABLE "digital_item_uses" (
  "id" UUID NOT NULL,
  "user_id" UUID NOT NULL,
  "item_code" VARCHAR(80) NOT NULL,
  "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

  CONSTRAINT "digital_item_uses_pkey"
    PRIMARY KEY ("id"),

  CONSTRAINT "digital_item_uses_user_id_fkey"
    FOREIGN KEY ("user_id")
    REFERENCES "users"("id")
    ON DELETE CASCADE
);

CREATE INDEX "digital_item_uses_user_id_created_at_idx"
ON "digital_item_uses"("user_id", "created_at");
