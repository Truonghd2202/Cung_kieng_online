CREATE TABLE "payment_runtime_config" (
  "key" VARCHAR(80) NOT NULL,
  "value" VARCHAR(80) NOT NULL,
  CONSTRAINT "payment_runtime_config_pkey"
    PRIMARY KEY ("key")
);

INSERT INTO "payment_runtime_config" ("key", "value")
VALUES ('PAYMENT_ENVIRONMENT', 'sandbox');
