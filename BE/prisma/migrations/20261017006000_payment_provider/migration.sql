ALTER TABLE "payment_orders"
  ADD COLUMN "payment_provider" VARCHAR(16)
    NOT NULL DEFAULT 'VNPAY',
  ADD COLUMN "payment_environment" VARCHAR(16)
    NOT NULL DEFAULT 'LEGACY',
  ALTER COLUMN "transaction_no" TYPE VARCHAR(128);

ALTER TABLE "digital_orders"
  ADD COLUMN "payment_provider" VARCHAR(16)
    NOT NULL DEFAULT 'VNPAY',
  ADD COLUMN "payment_environment" VARCHAR(16)
    NOT NULL DEFAULT 'LEGACY',
  ALTER COLUMN "transaction_no" TYPE VARCHAR(128);
