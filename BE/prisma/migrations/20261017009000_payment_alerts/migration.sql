CREATE TABLE "payment_alerts" (
  "id" VARCHAR(64) NOT NULL,
  "order_id" VARCHAR(32) NOT NULL,
  "user_id" UUID NOT NULL,
  "environment" VARCHAR(16) NOT NULL,
  "event_type" VARCHAR(40) NOT NULL,
  "transaction_id" VARCHAR(80) NOT NULL,
  "status" VARCHAR(16) NOT NULL DEFAULT 'OPEN',
  "resolution_note" VARCHAR(2000),
  "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "resolved_at" TIMESTAMPTZ(6),
  CONSTRAINT "payment_alerts_pkey" PRIMARY KEY ("id")
);

CREATE INDEX "payment_alerts_status_created_at_idx" ON "payment_alerts" ("status", "created_at");
