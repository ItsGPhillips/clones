import { VIDEO_TABLE_SCHEMA, CHANNEL_TABLE_SCHEMA } from "@youtube/drizzle/index";
import { z } from "zod";


export const VIDEO_WITH_CHANNEL_SCHEMA = VIDEO_TABLE_SCHEMA.extend({
   channel: CHANNEL_TABLE_SCHEMA,
});

export type VideoWithChannel = z.infer<typeof VIDEO_WITH_CHANNEL_SCHEMA>;