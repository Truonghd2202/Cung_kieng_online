-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "public";

-- CreateEnum
CREATE TYPE "account_status" AS ENUM ('ACTIVE', 'INACTIVE', 'BANNED');

-- CreateEnum
CREATE TYPE "calendar_type" AS ENUM ('SOLAR', 'LUNAR');

-- CreateEnum
CREATE TYPE "favorite_target" AS ENUM ('SIGNAL', 'PROVERB', 'XIN_XAM', 'RITUAL', 'PRAYER', 'WISH');

-- CreateEnum
CREATE TYPE "file_asset_type" AS ENUM ('AVATAR', 'MEMORIAL', 'PHYSIOGNOMY', 'SANCTUARY', 'OTHER');

-- CreateEnum
CREATE TYPE "horoscope_period" AS ENUM ('DAILY', 'MONTHLY', 'YEARLY');

-- CreateEnum
CREATE TYPE "mood_type" AS ENUM ('PEACEFUL', 'LONELY', 'PRESSURED', 'UNSTABLE', 'HAPPY', 'WORRIED', 'IMPATIENT', 'GRATEFUL', 'NEED_SUPPORT', 'OTHER');

-- CreateEnum
CREATE TYPE "notification_type" AS ENUM ('SYSTEM', 'REMINDER', 'MEMORIAL', 'RITUAL', 'MOOD', 'ASTROLOGY', 'MEMBERSHIP');

-- CreateEnum
CREATE TYPE "relation_type" AS ENUM ('PARENT', 'CHILD', 'SPOUSE', 'SIBLING', 'OTHER');

-- CreateEnum
CREATE TYPE "reminder_repeat_type" AS ENUM ('NONE', 'DAILY', 'WEEKLY', 'MONTHLY', 'YEARLY');

-- CreateEnum
CREATE TYPE "subscription_status" AS ENUM ('ACTIVE', 'EXPIRED', 'CANCELLED');

-- CreateEnum
CREATE TYPE "user_role" AS ENUM ('USER', 'ADMIN');

-- CreateEnum
CREATE TYPE "vietnam_region" AS ENUM ('NORTH', 'CENTRAL', 'SOUTH', 'NATIONWIDE');

-- CreateEnum
CREATE TYPE "visibility_type" AS ENUM ('PRIVATE', 'PUBLIC', 'ANONYMOUS');

-- CreateEnum
CREATE TYPE "wish_delivery_type" AS ENUM ('LANTERN', 'SKY', 'VOID', 'LETTER');

-- CreateEnum
CREATE TYPE "xin_keo_result" AS ENUM ('YES', 'NO', 'UNCLEAR');

-- CreateTable
CREATE TABLE "ai_generation_logs" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "user_id" UUID,
    "feature" VARCHAR(100) NOT NULL,
    "model" VARCHAR(100),
    "prompt_version" VARCHAR(100),
    "input_snapshot" JSONB,
    "output_snapshot" JSONB,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ai_generation_logs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "astrology_analyses" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "chart_id" UUID NOT NULL,
    "analysis_type" VARCHAR(100) NOT NULL,
    "input_snapshot" JSONB,
    "content" TEXT NOT NULL,
    "model" VARCHAR(100),
    "prompt_version" VARCHAR(100),
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "astrology_analyses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "astrology_charts" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "profile_id" UUID NOT NULL,
    "year_stem" VARCHAR(50),
    "year_branch" VARCHAR(50),
    "element" VARCHAR(100),
    "destiny_palace" VARCHAR(100),
    "chart_data" JSONB NOT NULL DEFAULT '{}',
    "algorithm_version" VARCHAR(50),
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "astrology_charts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "astrology_profiles" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "user_id" UUID NOT NULL,
    "full_name" VARCHAR(255) NOT NULL,
    "birth_date" DATE NOT NULL,
    "birth_time" TIME(6),
    "gender" VARCHAR(30),
    "birth_place" VARCHAR(255),
    "lunar_date" DATE,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "astrology_profiles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "calendar_events" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "title" VARCHAR(255) NOT NULL,
    "description" TEXT,
    "calendar" "calendar_type" NOT NULL DEFAULT 'LUNAR',
    "day" SMALLINT,
    "month" SMALLINT,
    "region" "vietnam_region" DEFAULT 'NATIONWIDE',
    "category" VARCHAR(100),
    "source" TEXT,
    "verified" BOOLEAN NOT NULL DEFAULT false,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "calendar_events_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "calendar_notes" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "user_id" UUID NOT NULL,
    "event_id" UUID,
    "title" VARCHAR(255) NOT NULL,
    "note" TEXT,
    "event_date" DATE NOT NULL,
    "calendar" "calendar_type" NOT NULL DEFAULT 'SOLAR',
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "calendar_notes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "divination_results" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "divination_type_id" UUID NOT NULL,
    "result_code" VARCHAR(100) NOT NULL,
    "title" VARCHAR(255),
    "content" TEXT NOT NULL,
    "meaning" TEXT,
    "advice" TEXT,
    "source" TEXT,
    "verified" BOOLEAN NOT NULL DEFAULT false,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "divination_results_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "divination_types" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "code" VARCHAR(80) NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "description" TEXT,
    "region" "vietnam_region" DEFAULT 'NATIONWIDE',
    "active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "divination_types_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "family_members" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "family_tree_id" UUID NOT NULL,
    "linked_user_id" UUID,
    "full_name" VARCHAR(255) NOT NULL,
    "gender" VARCHAR(30),
    "birth_date" DATE,
    "death_date" DATE,
    "avatar_url" TEXT,
    "biography" TEXT,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "family_members_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "family_relationships" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "family_tree_id" UUID NOT NULL,
    "from_member_id" UUID NOT NULL,
    "to_member_id" UUID NOT NULL,
    "relation" "relation_type" NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "family_relationships_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "family_trees" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "owner_user_id" UUID NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "description" TEXT,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "family_trees_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "favorites" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "user_id" UUID NOT NULL,
    "target_type" "favorite_target" NOT NULL,
    "target_id" UUID NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "favorites_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "file_assets" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "user_id" UUID,
    "asset_type" "file_asset_type" NOT NULL DEFAULT 'OTHER',
    "file_name" VARCHAR(255) NOT NULL,
    "mime_type" VARCHAR(120),
    "file_size" BIGINT,
    "storage_bucket" VARCHAR(100),
    "storage_path" TEXT NOT NULL,
    "public_url" TEXT,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "file_assets_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "horoscope_readings" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "user_id" UUID NOT NULL,
    "astrology_profile_id" UUID,
    "period_type" "horoscope_period" NOT NULL,
    "target_date" DATE NOT NULL,
    "content" TEXT NOT NULL,
    "advice" TEXT,
    "model" VARCHAR(100),
    "prompt_version" VARCHAR(100),
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "horoscope_readings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "incense_sessions" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "user_id" UUID NOT NULL,
    "sanctuary_id" UUID,
    "memorial_id" UUID,
    "message" TEXT,
    "incense_count" SMALLINT NOT NULL DEFAULT 1,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "incense_sessions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "membership_interests" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "email" VARCHAR(255) NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "membership_interests_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "membership_plans" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "code" VARCHAR(80) NOT NULL,
    "name" VARCHAR(150) NOT NULL,
    "description" TEXT,
    "price_monthly" DECIMAL(12,2) NOT NULL DEFAULT 0,
    "price_yearly" DECIMAL(12,2) NOT NULL DEFAULT 0,
    "features" JSONB NOT NULL DEFAULT '[]',
    "active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "membership_plans_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "memorial_anniversaries" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "memorial_id" UUID NOT NULL,
    "calendar" "calendar_type" NOT NULL DEFAULT 'LUNAR',
    "day" SMALLINT NOT NULL,
    "month" SMALLINT NOT NULL,
    "year" INTEGER,
    "repeat_yearly" BOOLEAN NOT NULL DEFAULT true,
    "note" TEXT,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "memorial_anniversaries_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "memorials" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "user_id" UUID NOT NULL,
    "full_name" VARCHAR(255) NOT NULL,
    "relationship" VARCHAR(100),
    "birth_date" DATE,
    "death_date" DATE,
    "lunar_death_day" SMALLINT,
    "lunar_death_month" SMALLINT,
    "avatar_url" TEXT,
    "biography" TEXT,
    "note" TEXT,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "memorials_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "mood_checkins" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "user_id" UUID NOT NULL,
    "mood" "mood_type" NOT NULL,
    "note" TEXT,
    "intensity" SMALLINT,
    "signal_id" UUID,
    "action_done" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "mood_checkins_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "notifications" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "user_id" UUID NOT NULL,
    "type" "notification_type" NOT NULL DEFAULT 'SYSTEM',
    "title" VARCHAR(255) NOT NULL,
    "message" TEXT NOT NULL,
    "data" JSONB,
    "is_read" BOOLEAN NOT NULL DEFAULT false,
    "read_at" TIMESTAMPTZ(6),
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "notifications_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "offerings" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" VARCHAR(255) NOT NULL,
    "category" VARCHAR(100),
    "description" TEXT,
    "image_url" TEXT,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "offerings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "physiognomy_analyses" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "user_id" UUID NOT NULL,
    "image_url" TEXT NOT NULL,
    "analysis" TEXT NOT NULL,
    "disclaimer" TEXT,
    "model" VARCHAR(100),
    "prompt_version" VARCHAR(100),
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "physiognomy_analyses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "prayers" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "ritual_id" UUID,
    "title" VARCHAR(255) NOT NULL,
    "content" TEXT NOT NULL,
    "region" "vietnam_region" DEFAULT 'NATIONWIDE',
    "language_style" VARCHAR(100) DEFAULT 'NOM',
    "source" TEXT,
    "verified" BOOLEAN NOT NULL DEFAULT false,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "prayers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "proverbs" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "content" TEXT NOT NULL,
    "meaning" TEXT,
    "category" VARCHAR(100),
    "mood" "mood_type",
    "region" "vietnam_region" DEFAULT 'NATIONWIDE',
    "source" TEXT,
    "verified" BOOLEAN NOT NULL DEFAULT false,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "proverbs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "refresh_tokens" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "user_id" UUID NOT NULL,
    "token_hash" TEXT NOT NULL,
    "expires_at" TIMESTAMPTZ(6) NOT NULL,
    "revoked_at" TIMESTAMPTZ(6),
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "refresh_tokens_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "reminders" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "user_id" UUID NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "reminder_type" VARCHAR(100),
    "remind_at" TIMESTAMPTZ(6) NOT NULL,
    "repeat_type" "reminder_repeat_type" NOT NULL DEFAULT 'NONE',
    "reference_type" VARCHAR(100),
    "reference_id" UUID,
    "enabled" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "reminders_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ritual_offerings" (
    "ritual_id" UUID NOT NULL,
    "offering_id" UUID NOT NULL,
    "quantity" VARCHAR(100),
    "required" BOOLEAN NOT NULL DEFAULT false,
    "note" TEXT,

    CONSTRAINT "ritual_offerings_pkey" PRIMARY KEY ("ritual_id","offering_id")
);

-- CreateTable
CREATE TABLE "ritual_steps" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "ritual_id" UUID NOT NULL,
    "step_number" SMALLINT NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "description" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ritual_steps_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "rituals" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "title" VARCHAR(255) NOT NULL,
    "slug" VARCHAR(255) NOT NULL,
    "description" TEXT,
    "occasion" VARCHAR(150),
    "region" "vietnam_region" DEFAULT 'NATIONWIDE',
    "calendar" "calendar_type",
    "source" TEXT,
    "verified" BOOLEAN NOT NULL DEFAULT false,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "rituals_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sanctuary_items" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" VARCHAR(255) NOT NULL,
    "item_type" VARCHAR(100) NOT NULL,
    "asset_url" TEXT NOT NULL,
    "description" TEXT,
    "premium" BOOLEAN NOT NULL DEFAULT false,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "sanctuary_items_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "signals" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "title" VARCHAR(255),
    "content" TEXT NOT NULL,
    "advice" TEXT,
    "mood" "mood_type",
    "region" "vietnam_region" DEFAULT 'NATIONWIDE',
    "category" VARCHAR(100),
    "proverb_id" UUID,
    "source" TEXT,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "signals_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "subscriptions" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "user_id" UUID NOT NULL,
    "plan_id" UUID NOT NULL,
    "status" "subscription_status" NOT NULL DEFAULT 'ACTIVE',
    "started_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expires_at" TIMESTAMPTZ(6),
    "cancelled_at" TIMESTAMPTZ(6),
    "provider" VARCHAR(80),
    "provider_subscription_id" VARCHAR(255),
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "subscriptions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_divinations" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "user_id" UUID NOT NULL,
    "divination_type_id" UUID NOT NULL,
    "divination_result_id" UUID NOT NULL,
    "question" TEXT,
    "ai_explanation" TEXT,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "user_divinations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_sanctuary_items" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "sanctuary_id" UUID NOT NULL,
    "sanctuary_item_id" UUID NOT NULL,
    "position" JSONB,
    "rotation" JSONB,
    "scale" JSONB,
    "equipped" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "user_sanctuary_items_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_settings" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "user_id" UUID NOT NULL,
    "locale" VARCHAR(20) NOT NULL DEFAULT 'vi',
    "theme" VARCHAR(30) NOT NULL DEFAULT 'dark',
    "email_notifications" BOOLEAN NOT NULL DEFAULT true,
    "push_notifications" BOOLEAN NOT NULL DEFAULT true,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "user_settings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_topics" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "user_id" UUID NOT NULL,
    "topic" VARCHAR(100) NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "user_topics_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "full_name" VARCHAR(120) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "password_hash" TEXT NOT NULL,
    "avatar_url" TEXT,
    "role" "user_role" NOT NULL DEFAULT 'USER',
    "status" "account_status" NOT NULL DEFAULT 'ACTIVE',
    "date_of_birth" DATE,
    "gender" VARCHAR(30),
    "phone" VARCHAR(30),
    "bio" TEXT,
    "last_login_at" TIMESTAMPTZ(6),
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "virtual_sanctuaries" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "user_id" UUID NOT NULL,
    "name" VARCHAR(255) NOT NULL DEFAULT 'Góc tri ân',
    "theme" VARCHAR(100) DEFAULT 'MIEN_TAY',
    "region" "vietnam_region" DEFAULT 'SOUTH',
    "background_asset_url" TEXT,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "virtual_sanctuaries_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "wishes" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "user_id" UUID NOT NULL,
    "title" VARCHAR(255),
    "content" TEXT NOT NULL,
    "category" VARCHAR(100),
    "visibility" "visibility_type" NOT NULL DEFAULT 'PRIVATE',
    "delivery_type" "wish_delivery_type" NOT NULL DEFAULT 'VOID',
    "is_sealed" BOOLEAN NOT NULL DEFAULT true,
    "starred" BOOLEAN NOT NULL DEFAULT false,
    "released_at" TIMESTAMPTZ(6),
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "wishes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "xin_keo_sessions" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "user_id" UUID NOT NULL,
    "question" TEXT NOT NULL,
    "final_result" "xin_keo_result",
    "ai_explanation" TEXT,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "xin_keo_sessions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "xin_keo_throws" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "session_id" UUID NOT NULL,
    "throw_number" SMALLINT NOT NULL,
    "left_side" VARCHAR(20) NOT NULL,
    "right_side" VARCHAR(20) NOT NULL,
    "result" "xin_keo_result" NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "xin_keo_throws_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "xin_xam" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "stick_number" INTEGER NOT NULL,
    "name" VARCHAR(255),
    "xam_type" VARCHAR(100) NOT NULL,
    "region" "vietnam_region" NOT NULL DEFAULT 'NATIONWIDE',
    "category" VARCHAR(100),
    "fortune_level" VARCHAR(80),
    "poem" TEXT,
    "meaning" TEXT,
    "advice" TEXT,
    "source" TEXT,
    "verified" BOOLEAN NOT NULL DEFAULT false,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "xin_xam_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "xin_xam_draws" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "user_id" UUID NOT NULL,
    "xin_xam_id" UUID NOT NULL,
    "question" TEXT,
    "ai_explanation" TEXT,
    "starred" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "xin_xam_draws_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "divination_results_divination_type_id_result_code_key" ON "divination_results"("divination_type_id", "result_code");

-- CreateIndex
CREATE UNIQUE INDEX "divination_types_code_key" ON "divination_types"("code");

-- CreateIndex
CREATE UNIQUE INDEX "family_relationships_from_member_id_to_member_id_relation_key" ON "family_relationships"("from_member_id", "to_member_id", "relation");

-- CreateIndex
CREATE UNIQUE INDEX "favorites_user_id_target_type_target_id_key" ON "favorites"("user_id", "target_type", "target_id");

-- CreateIndex
CREATE UNIQUE INDEX "membership_interests_email_key" ON "membership_interests"("email");

-- CreateIndex
CREATE UNIQUE INDEX "membership_plans_code_key" ON "membership_plans"("code");

-- CreateIndex
CREATE INDEX "idx_memorials_user_id" ON "memorials"("user_id");

-- CreateIndex
CREATE INDEX "idx_mood_checkins_created_at" ON "mood_checkins"("created_at" DESC);

-- CreateIndex
CREATE INDEX "idx_mood_checkins_user_id" ON "mood_checkins"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "refresh_tokens_token_hash_key" ON "refresh_tokens"("token_hash");

-- CreateIndex
CREATE INDEX "idx_refresh_tokens_user_id" ON "refresh_tokens"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "ritual_steps_ritual_id_step_number_key" ON "ritual_steps"("ritual_id", "step_number");

-- CreateIndex
CREATE UNIQUE INDEX "rituals_slug_key" ON "rituals"("slug");

-- CreateIndex
CREATE INDEX "idx_signals_mood" ON "signals"("mood");

-- CreateIndex
CREATE INDEX "idx_user_divinations_user_id" ON "user_divinations"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "user_settings_user_id_key" ON "user_settings"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "user_topics_user_id_topic_key" ON "user_topics"("user_id", "topic");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE INDEX "idx_users_email" ON "users"("email");

-- CreateIndex
CREATE INDEX "idx_users_role" ON "users"("role");

-- CreateIndex
CREATE UNIQUE INDEX "virtual_sanctuaries_user_id_key" ON "virtual_sanctuaries"("user_id");

-- CreateIndex
CREATE INDEX "idx_wishes_user_id" ON "wishes"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "xin_keo_throws_session_id_throw_number_key" ON "xin_keo_throws"("session_id", "throw_number");

-- CreateIndex
CREATE INDEX "idx_xin_xam_type" ON "xin_xam"("xam_type");

-- CreateIndex
CREATE UNIQUE INDEX "xin_xam_xam_type_stick_number_key" ON "xin_xam"("xam_type", "stick_number");

-- CreateIndex
CREATE INDEX "idx_xin_xam_draws_user_id" ON "xin_xam_draws"("user_id");

-- AddForeignKey
ALTER TABLE "ai_generation_logs" ADD CONSTRAINT "ai_generation_logs_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "astrology_analyses" ADD CONSTRAINT "astrology_analyses_chart_id_fkey" FOREIGN KEY ("chart_id") REFERENCES "astrology_charts"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "astrology_charts" ADD CONSTRAINT "astrology_charts_profile_id_fkey" FOREIGN KEY ("profile_id") REFERENCES "astrology_profiles"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "astrology_profiles" ADD CONSTRAINT "astrology_profiles_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "calendar_notes" ADD CONSTRAINT "calendar_notes_event_id_fkey" FOREIGN KEY ("event_id") REFERENCES "calendar_events"("id") ON DELETE SET NULL ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "calendar_notes" ADD CONSTRAINT "calendar_notes_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "divination_results" ADD CONSTRAINT "divination_results_divination_type_id_fkey" FOREIGN KEY ("divination_type_id") REFERENCES "divination_types"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "family_members" ADD CONSTRAINT "family_members_family_tree_id_fkey" FOREIGN KEY ("family_tree_id") REFERENCES "family_trees"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "family_members" ADD CONSTRAINT "family_members_linked_user_id_fkey" FOREIGN KEY ("linked_user_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "family_relationships" ADD CONSTRAINT "family_relationships_family_tree_id_fkey" FOREIGN KEY ("family_tree_id") REFERENCES "family_trees"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "family_relationships" ADD CONSTRAINT "family_relationships_from_member_id_fkey" FOREIGN KEY ("from_member_id") REFERENCES "family_members"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "family_relationships" ADD CONSTRAINT "family_relationships_to_member_id_fkey" FOREIGN KEY ("to_member_id") REFERENCES "family_members"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "family_trees" ADD CONSTRAINT "family_trees_owner_user_id_fkey" FOREIGN KEY ("owner_user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "favorites" ADD CONSTRAINT "favorites_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "file_assets" ADD CONSTRAINT "file_assets_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "horoscope_readings" ADD CONSTRAINT "horoscope_readings_astrology_profile_id_fkey" FOREIGN KEY ("astrology_profile_id") REFERENCES "astrology_profiles"("id") ON DELETE SET NULL ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "horoscope_readings" ADD CONSTRAINT "horoscope_readings_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "incense_sessions" ADD CONSTRAINT "incense_sessions_memorial_id_fkey" FOREIGN KEY ("memorial_id") REFERENCES "memorials"("id") ON DELETE SET NULL ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "incense_sessions" ADD CONSTRAINT "incense_sessions_sanctuary_id_fkey" FOREIGN KEY ("sanctuary_id") REFERENCES "virtual_sanctuaries"("id") ON DELETE SET NULL ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "incense_sessions" ADD CONSTRAINT "incense_sessions_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "memorial_anniversaries" ADD CONSTRAINT "memorial_anniversaries_memorial_id_fkey" FOREIGN KEY ("memorial_id") REFERENCES "memorials"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "memorials" ADD CONSTRAINT "memorials_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "mood_checkins" ADD CONSTRAINT "mood_checkins_signal_id_fkey" FOREIGN KEY ("signal_id") REFERENCES "signals"("id") ON DELETE SET NULL ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "mood_checkins" ADD CONSTRAINT "mood_checkins_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "notifications" ADD CONSTRAINT "notifications_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "physiognomy_analyses" ADD CONSTRAINT "physiognomy_analyses_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "prayers" ADD CONSTRAINT "prayers_ritual_id_fkey" FOREIGN KEY ("ritual_id") REFERENCES "rituals"("id") ON DELETE SET NULL ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "refresh_tokens" ADD CONSTRAINT "refresh_tokens_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "reminders" ADD CONSTRAINT "reminders_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "ritual_offerings" ADD CONSTRAINT "ritual_offerings_offering_id_fkey" FOREIGN KEY ("offering_id") REFERENCES "offerings"("id") ON DELETE RESTRICT ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "ritual_offerings" ADD CONSTRAINT "ritual_offerings_ritual_id_fkey" FOREIGN KEY ("ritual_id") REFERENCES "rituals"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "ritual_steps" ADD CONSTRAINT "ritual_steps_ritual_id_fkey" FOREIGN KEY ("ritual_id") REFERENCES "rituals"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "signals" ADD CONSTRAINT "signals_proverb_id_fkey" FOREIGN KEY ("proverb_id") REFERENCES "proverbs"("id") ON DELETE SET NULL ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "subscriptions" ADD CONSTRAINT "subscriptions_plan_id_fkey" FOREIGN KEY ("plan_id") REFERENCES "membership_plans"("id") ON DELETE RESTRICT ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "subscriptions" ADD CONSTRAINT "subscriptions_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "user_divinations" ADD CONSTRAINT "user_divinations_divination_result_id_fkey" FOREIGN KEY ("divination_result_id") REFERENCES "divination_results"("id") ON DELETE RESTRICT ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "user_divinations" ADD CONSTRAINT "user_divinations_divination_type_id_fkey" FOREIGN KEY ("divination_type_id") REFERENCES "divination_types"("id") ON DELETE RESTRICT ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "user_divinations" ADD CONSTRAINT "user_divinations_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "user_sanctuary_items" ADD CONSTRAINT "user_sanctuary_items_sanctuary_id_fkey" FOREIGN KEY ("sanctuary_id") REFERENCES "virtual_sanctuaries"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "user_sanctuary_items" ADD CONSTRAINT "user_sanctuary_items_sanctuary_item_id_fkey" FOREIGN KEY ("sanctuary_item_id") REFERENCES "sanctuary_items"("id") ON DELETE RESTRICT ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "user_settings" ADD CONSTRAINT "user_settings_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "user_topics" ADD CONSTRAINT "user_topics_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "virtual_sanctuaries" ADD CONSTRAINT "virtual_sanctuaries_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "wishes" ADD CONSTRAINT "wishes_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "xin_keo_sessions" ADD CONSTRAINT "xin_keo_sessions_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "xin_keo_throws" ADD CONSTRAINT "xin_keo_throws_session_id_fkey" FOREIGN KEY ("session_id") REFERENCES "xin_keo_sessions"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "xin_xam_draws" ADD CONSTRAINT "xin_xam_draws_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "xin_xam_draws" ADD CONSTRAINT "xin_xam_draws_xin_xam_id_fkey" FOREIGN KEY ("xin_xam_id") REFERENCES "xin_xam"("id") ON DELETE RESTRICT ON UPDATE NO ACTION;
