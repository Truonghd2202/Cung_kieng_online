CREATE TABLE "partnership_requests" (
  "id" UUID NOT NULL,
  "user_id" UUID NOT NULL,
  "organization" VARCHAR(200) NOT NULL,
  "message" TEXT NOT NULL,
  "status" VARCHAR(30) NOT NULL DEFAULT 'NEW',
  "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

  CONSTRAINT "partnership_requests_pkey" PRIMARY KEY ("id"),
  CONSTRAINT "partnership_requests_user_id_fkey"
    FOREIGN KEY ("user_id") REFERENCES "users"("id")
    ON DELETE CASCADE,
  CONSTRAINT "partnership_requests_status_check"
    CHECK ("status" IN ('NEW', 'REVIEWING', 'CLOSED'))
);

CREATE INDEX "partnership_requests_user_id_created_at_idx"
ON "partnership_requests"("user_id", "created_at");
