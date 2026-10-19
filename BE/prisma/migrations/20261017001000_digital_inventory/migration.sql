CREATE TABLE "digital_inventory" (
  "user_id" UUID NOT NULL,
  "item_code" VARCHAR(80) NOT NULL,
  "quantity" INTEGER NOT NULL DEFAULT 0,
  "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

  CONSTRAINT "digital_inventory_pkey"
    PRIMARY KEY ("user_id", "item_code"),

  CONSTRAINT "digital_inventory_quantity_check"
    CHECK ("quantity" >= 0),

  CONSTRAINT "digital_inventory_user_id_fkey"
    FOREIGN KEY ("user_id")
    REFERENCES "users"("id")
    ON DELETE CASCADE
);
