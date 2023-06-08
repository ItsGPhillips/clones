import { db } from "@youtube/drizzle/instance";
import { sql } from "drizzle-orm";

export const getVideoData = async (videoId: string) => {
   const data = await db.query.Videos.findFirst({
      where: (videos, { eq }) => eq(videos.id, videoId),
      with: {
         channel: true,
         comments: {
            where: (comment, { sql }) =>
               sql`${comment.parent} IS NULL`,
            with: {
               channel: true,
            },
         },
      },
   })
   if (!data) {
      throw "error";
   }
   return data;
};

export type VideoData = Awaited<ReturnType<typeof getVideoData>>;
