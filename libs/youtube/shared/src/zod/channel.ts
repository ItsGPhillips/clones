import { SUBSCRIPTIONS_TABLE_SCHEMA, CHANNEL_TABLE_SCHEMA, COMMENT_TABLE_SCHEMA } from "@youtube/drizzle/index";
import { z } from "zod";


export const SUBSCRIPTIONS_WITH_CHANNEL_SCHEMA = SUBSCRIPTIONS_TABLE_SCHEMA.extend({
   channel: CHANNEL_TABLE_SCHEMA,
});

export type SubscriptionsWithChannel = z.infer<typeof SUBSCRIPTIONS_WITH_CHANNEL_SCHEMA>;

export const COMMENT_WITH_CHANNEL_SCHEMA = COMMENT_TABLE_SCHEMA.extend({
   channel: CHANNEL_TABLE_SCHEMA,
});

export type CommentWithChannel = z.infer<typeof COMMENT_WITH_CHANNEL_SCHEMA>;