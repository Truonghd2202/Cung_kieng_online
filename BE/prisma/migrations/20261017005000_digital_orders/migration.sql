CREATE TABLE "digital_orders" (
  "id" VARCHAR(32) NOT NULL,
  "user_id" UUID NOT NULL,
  "item_code" VARCHAR(80) NOT NULL,
  "quantity" INTEGER NOT NULL DEFAULT 1,
  "amount" INTEGER NOT NULL,
  "status" VARCHAR(16) NOT NULL DEFAULT 'PENDING',
  "transaction_no" VARCHAR(30),
  "expires_at" TIMESTAMPTZ(6) NOT NULL,
  "paid_at" TIMESTAMPTZ(6),
  "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

  CONSTRAINT "digital_orders_pkey" PRIMARY KEY ("id"),
  CONSTRAINT "digital_orders_user_id_fkey"
    FOREIGN KEY ("user_id") REFERENCES "users"("id")
    ON DELETE CASCADE,
  CONSTRAINT "digital_orders_amount_check"
    CHECK ("amount" > 0 AND "quantity" > 0),
  CONSTRAINT "digital_orders_status_check"
    CHECK ("status" IN ('PENDING', 'PAID', 'FAILED'))
);

CREATE UNIQUE INDEX "digital_orders_transaction_no_key"
ON "digital_orders"("transaction_no");

CREATE INDEX "digital_orders_user_id_created_at_idx"
ON "digital_orders"("user_id", "created_at");
