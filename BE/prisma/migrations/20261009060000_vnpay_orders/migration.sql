CREATE TABLE "payment_orders" (
  "id" VARCHAR(32) PRIMARY KEY,
  "user_id" UUID NOT NULL REFERENCES "users"("id") ON DELETE CASCADE,
  "plan_id" UUID NOT NULL REFERENCES "membership_plans"("id"),
  "amount" INTEGER NOT NULL CHECK ("amount" > 0),
  "status" VARCHAR(16) NOT NULL DEFAULT 'PENDING' CHECK ("status" IN ('PENDING', 'PAID', 'FAILED')),
  "transaction_no" VARCHAR(30),
  "response_code" VARCHAR(10),
  "expires_at" TIMESTAMPTZ(6) NOT NULL,
  "paid_at" TIMESTAMPTZ(6),
  "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE UNIQUE INDEX "payment_orders_transaction_no_key" ON "payment_orders"("transaction_no");
CREATE INDEX "payment_orders_user_id_created_at_idx" ON "payment_orders"("user_id", "created_at");
