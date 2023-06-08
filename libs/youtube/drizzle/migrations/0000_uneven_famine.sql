DO $$ BEGIN
 CREATE TYPE "yt_vote_action_enum" AS ENUM('upvote', 'downvote');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

CREATE TABLE IF NOT EXISTS "yt_channel" (
	"id" uuid PRIMARY KEY NOT NULL,
	"is_verified" boolean DEFAULT false NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"name" text NOT NULL
);

CREATE TABLE IF NOT EXISTS "yt_comment_vote_action" (
	"comment_id" uuid NOT NULL,
	"channel_id" uuid NOT NULL,
	"action" yt_vote_action_enum NOT NULL
);
--> statement-breakpoint
ALTER TABLE "yt_comment_vote_action" ADD CONSTRAINT "yt_comment_vote_action_comment_id_channel_id" PRIMARY KEY("comment_id","channel_id");

CREATE TABLE IF NOT EXISTS "yt_comments" (
	"id" uuid PRIMARY KEY NOT NULL,
	"channel_id" uuid NOT NULL,
	"video_id" uuid NOT NULL,
	"parent" uuid,
	"posted_at" timestamp DEFAULT now() NOT NULL,
	"body" text NOT NULL
);

CREATE TABLE IF NOT EXISTS "yt_subscriptions" (
	"subscriber_channel_id" uuid NOT NULL,
	"channel_id" uuid NOT NULL
);
--> statement-breakpoint
ALTER TABLE "yt_subscriptions" ADD CONSTRAINT "yt_subscriptions_subscriber_channel_id_channel_id" PRIMARY KEY("subscriber_channel_id","channel_id");

CREATE TABLE IF NOT EXISTS "yt_video_vote_action" (
	"video_id" uuid NOT NULL,
	"channel_id" uuid NOT NULL,
	"action" yt_vote_action_enum NOT NULL
);
--> statement-breakpoint
ALTER TABLE "yt_video_vote_action" ADD CONSTRAINT "yt_video_vote_action_video_id_channel_id" PRIMARY KEY("video_id","channel_id");

CREATE TABLE IF NOT EXISTS "yt_video" (
	"id" uuid PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"description" text NOT NULL,
	"uploade_date" timestamp with time zone DEFAULT now() NOT NULL,
	"channel_id" uuid NOT NULL,
	"duration" integer NOT NULL,
	"url" text NOT NULL,
	"thumbnail_urls" text[]
);

CREATE TABLE IF NOT EXISTS "yt_view" (
	"video_id" uuid NOT NULL,
	"channel_id" uuid NOT NULL,
	"count" integer DEFAULT 1 NOT NULL
);
--> statement-breakpoint
ALTER TABLE "yt_view" ADD CONSTRAINT "yt_view_video_id_channel_id" PRIMARY KEY("video_id","channel_id");

DO $$ BEGIN
 ALTER TABLE "yt_comment_vote_action" ADD CONSTRAINT "yt_comment_vote_action_comment_id_yt_comments_id_fk" FOREIGN KEY ("comment_id") REFERENCES "yt_comments"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "yt_comment_vote_action" ADD CONSTRAINT "yt_comment_vote_action_channel_id_yt_channel_id_fk" FOREIGN KEY ("channel_id") REFERENCES "yt_channel"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "yt_comments" ADD CONSTRAINT "yt_comments_channel_id_yt_channel_id_fk" FOREIGN KEY ("channel_id") REFERENCES "yt_channel"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "yt_comments" ADD CONSTRAINT "yt_comments_video_id_yt_video_id_fk" FOREIGN KEY ("video_id") REFERENCES "yt_video"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "yt_comments" ADD CONSTRAINT "yt_comments_parent_yt_channel_id_fk" FOREIGN KEY ("parent") REFERENCES "yt_channel"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "yt_subscriptions" ADD CONSTRAINT "yt_subscriptions_subscriber_channel_id_yt_channel_id_fk" FOREIGN KEY ("subscriber_channel_id") REFERENCES "yt_channel"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "yt_subscriptions" ADD CONSTRAINT "yt_subscriptions_channel_id_yt_channel_id_fk" FOREIGN KEY ("channel_id") REFERENCES "yt_channel"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "yt_video_vote_action" ADD CONSTRAINT "yt_video_vote_action_video_id_yt_video_id_fk" FOREIGN KEY ("video_id") REFERENCES "yt_video"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "yt_video_vote_action" ADD CONSTRAINT "yt_video_vote_action_channel_id_yt_channel_id_fk" FOREIGN KEY ("channel_id") REFERENCES "yt_channel"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "yt_video" ADD CONSTRAINT "yt_video_channel_id_yt_channel_id_fk" FOREIGN KEY ("channel_id") REFERENCES "yt_channel"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "yt_view" ADD CONSTRAINT "yt_view_video_id_yt_video_id_fk" FOREIGN KEY ("video_id") REFERENCES "yt_video"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "yt_view" ADD CONSTRAINT "yt_view_channel_id_yt_channel_id_fk" FOREIGN KEY ("channel_id") REFERENCES "yt_channel"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
