CREATE TABLE "analytics_events" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "client_event_id" UUID NOT NULL,
    "user_id" UUID,
    "anonymous_id" UUID NOT NULL,
    "event_name" VARCHAR(64) NOT NULL,
    "campaign_source" VARCHAR(32),
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "analytics_events_pkey" PRIMARY KEY ("id"),
    CONSTRAINT "analytics_events_client_event_id_key" UNIQUE ("client_event_id"),
    CONSTRAINT "analytics_events_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE NO ACTION
);

CREATE INDEX "idx_analytics_events_name_created" ON "analytics_events"("event_name", "created_at");
CREATE INDEX "idx_analytics_events_user_created" ON "analytics_events"("user_id", "created_at");
CREATE INDEX "idx_analytics_events_anon_created" ON "analytics_events"("anonymous_id", "created_at");
