ALTER TABLE "digital_orders"
  ADD COLUMN "payment_review_status" VARCHAR(16)
    NOT NULL DEFAULT 'NONE',
  ADD COLUMN "payment_review_note" VARCHAR(2000);
