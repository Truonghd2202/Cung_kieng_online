CREATE TABLE "api_rate_limit_buckets" (
  "bucket_key" VARCHAR(64) NOT NULL,
  "window_id" BIGINT NOT NULL,
  "request_count" INTEGER NOT NULL DEFAULT 0,
  "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "api_rate_limit_buckets_pkey" PRIMARY KEY ("bucket_key", "window_id")
);

CREATE INDEX "idx_api_rate_limit_window" ON "api_rate_limit_buckets"("window_id");
