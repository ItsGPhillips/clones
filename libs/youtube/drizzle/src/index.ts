import { relations } from "drizzle-orm";
import {
   boolean,
   pgEnum,
   pgTable,
   text,
   timestamp,
   uuid,
   primaryKey,
   integer,
} from "drizzle-orm/pg-core";

import { createSelectSchema } from "drizzle-zod";
import { z } from "zod";

//----------------------------------------------------------------------------

export const Channels = pgTable("yt_channel", {
   id: uuid("id").primaryKey(),
   isVerified: boolean("is_verified").notNull().default(false),
   createdAt: timestamp("created_at", { withTimezone: true, mode: "string" })
      .notNull()
      .defaultNow(),
   name: text("name").notNull(),
});

export const CHANNEL_TABLE_SCHEMA = createSelectSchema(Channels);

export const channelsRelation = relations(Channels, ({ many }) => ({
   subscribers: many(Subscriptions),
}));

//----------------------------------------------------------------------------

export const Comments = pgTable("yt_comments", {
   id: uuid("id").primaryKey(),
   channelId: uuid("channel_id")
      .notNull()
      .references(() => Channels.id, { onDelete: "cascade" }),
   videoId: uuid("video_id")
      .notNull()
      .references(() => Videos.id, { onDelete: "cascade" }),
   postedAt: timestamp("posted_at", { mode: "string" }).notNull().defaultNow(),
   body: text("body").notNull(),
   parent: uuid("parent"),
});

export const COMMENT_TABLE_SCHEMA = createSelectSchema(Comments);

export const commentsRelation = relations(Comments, ({ one }) => ({
   video: one(Videos, {
      fields: [Comments.videoId],
      references: [Videos.id],
   }),
   channel: one(Channels, {
      fields: [Comments.channelId],
      references: [Channels.id],
   }),
}));

//----------------------------------------------------------------------------

export const Videos = pgTable("yt_video", {
   id: uuid("id").primaryKey(),
   title: text("title").notNull(),
   description: text("description").notNull(),
   uploadDate: timestamp("uploade_date", {
      mode: "string",
      withTimezone: true,
   })
      .notNull()
      .defaultNow(),
   channelId: uuid("channel_id")
      .notNull()
      .references(() => Channels.id, { onDelete: "cascade" }),
   duration: integer("duration").notNull(),
   url: text("url").notNull(),
   thumbnailUrls: text("thumbnail_urls").notNull().array(),
});

export const VIDEO_TABLE_SCHEMA = createSelectSchema(Videos, {
   duration: z.number().gt(0),
});

export const videosRelation = relations(Videos, ({ one, many }) => ({
   channel: one(Channels, {
      fields: [Videos.channelId],
      references: [Channels.id],
   }),
   comments: many(Comments),
   views: many(Views),
}));

//----------------------------------------------------------------------------

export const Subscriptions = pgTable(
   "yt_subscriptions",
   {
      subscriberChannelId: uuid("subscriber_channel_id")
         .notNull()
         .references(() => Channels.id, { onDelete: "cascade" }),
      channelId: uuid("channel_id")
         .notNull()
         .references(() => Channels.id, { onDelete: "cascade" }),
   },
   (table) => ({
      cpk: primaryKey(table.subscriberChannelId, table.channelId),
   })
);

export const SUBSCRIPTIONS_TABLE_SCHEMA = createSelectSchema(Subscriptions);

export const subscriptionsRelation = relations(Subscriptions, ({ one }) => ({
   subscriber: one(Channels, {
      fields: [Subscriptions.subscriberChannelId],
      references: [Channels.id],
   }),
   channel: one(Channels, {
      fields: [Subscriptions.channelId],
      references: [Channels.id],
   }),
}));

//----------------------------------------------------------------------------

export const VoteActionEnum = pgEnum("yt_vote_action_enum", [
   "upvote",
   "downvote",
]);

export const VideoVotes = pgTable(
   "yt_video_vote_action",
   {
      videoId: uuid("video_id")
         .notNull()
         .references(() => Videos.id, { onDelete: "cascade" }),
      channelId: uuid("channel_id")
         .notNull()
         .references(() => Channels.id, { onDelete: "cascade" }),
      action: VoteActionEnum("action").notNull(),
   },
   (table) => ({
      cpk: primaryKey(table.videoId, table.channelId),
   })
);

export const VIDEO_VOTE_TABLE_SCHEMA = createSelectSchema(VideoVotes);

export const videoVotesRelation = relations(VideoVotes, ({ one }) => ({
   video: one(Videos, {
      fields: [VideoVotes.videoId],
      references: [Videos.id],
   }),
   channel: one(Channels, {
      fields: [VideoVotes.channelId],
      references: [Channels.id],
   }),
}));

//----------------------------------------------------------------------------

export const CommentVotes = pgTable(
   "yt_comment_vote_action",
   {
      commentId: uuid("comment_id")
         .notNull()
         .references(() => Comments.id, { onDelete: "cascade" }),
      channelId: uuid("channel_id")
         .notNull()
         .references(() => Channels.id, { onDelete: "cascade" }),
      action: VoteActionEnum("action").notNull(),
   },
   (table) => ({
      cpk: primaryKey(table.commentId, table.channelId),
   })
);

export const COMMENT_VOTE_TABLE_SCHEMA = createSelectSchema(CommentVotes);

export const commentVotesRelation = relations(CommentVotes, ({ one }) => ({
   video: one(Comments, {
      fields: [CommentVotes.commentId],
      references: [Comments.id],
   }),
   channel: one(Channels, {
      fields: [CommentVotes.channelId],
      references: [Channels.id],
   }),
}));

//----------------------------------------------------------------------------

export const Views = pgTable(
   "yt_view",
   {
      videoId: uuid("video_id")
         .notNull()
         .references(() => Videos.id, { onDelete: "cascade" }),
      channelId: uuid("channel_id")
         .notNull()
         .references(() => Channels.id, { onDelete: "cascade" }),
      count: integer("count").notNull().default(1),
   },
   (table) => ({
      cpk: primaryKey(table.videoId, table.channelId),
   })
);

export const VIEW_TABLE_SCHEMA = createSelectSchema(Views);

export const viewsRelation = relations(Views, ({ one }) => ({
   video: one(Videos, {
      fields: [Views.videoId],
      references: [Videos.id],
   }),
   channel: one(Channels, {
      fields: [Views.channelId],
      references: [Channels.id],
   }),
}));
