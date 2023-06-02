import dotenv from "dotenv";
import { createClient } from "@supabase/supabase-js";
import {
   Channel,
   Comment,
   CommentVoteAction,
   Database,
   Video,
   VideoVoteAction,
} from "@youtube/supabase";
import { faker } from "@faker-js/faker";
import { subDays } from "date-fns";
import { v4 as uuidv4 } from "uuid";
import pino from "pino";

const Log = pino({
   transport: {
      target: "pino-pretty",
   },
});

namespace Utils {
   export const randomDate = (start: Date, end: Date): Date => {
      return new Date(
         start.getTime() + Math.random() * (end.getTime() - start.getTime())
      );
   };
}

/** Setup */
Log.info("loading .env");
const { parsed: env, error } = dotenv.config({ path: ".env" });
if (error) {
   throw error;
}
if (!env) {
   throw new Error("dotenv env was undefined");
}

Log.info("creating supabase client");
const db = createClient<Database>(
   env["SUPABASE_URL"]!,
   env["SUPABASE_SECRET_KEY"]!
);

/** Main */
function generate() {
   // Create all the channels
   Log.info("creating channels");
   const channels: Array<Channel> = Array(99)
      .fill(null)
      .map(() => {
         return {
            id: uuidv4(),
            is_verified: false,
            created_at: subDays(new Date(), Math.random() * 1000).toISOString(),
            name:
               Math.random() > 0.2
                  ? faker.person.fullName()
                  : faker.company.name(),
         };
      });

   // Randomly select 200 o
   const contentCreators: Array<Channel> = [];
   while (contentCreators.length < Math.floor(channels.length * 0.2)) {
      const channel = channels[Math.floor(Math.random() * channels.length)];
      if (
         channel &&
         // duplicate protection
         !contentCreators.find((e) => {
            e.id === channel.id;
         })
      ) {
         channel.is_verified = Boolean(Math.random() > 0.5);
         contentCreators.push(channel);
      }
   }

   Log.info("finished creating channels");

   const videoData = [
      {
         videoId: "e190e9a1-b3f9-4840-8c57-8c7312595e68",
         thumbnailId: "fbb43656-a27d-46e2-82d7-e43053c4229a",
      },
      {
         videoId: "c7de5239-853f-4f40-8a83-6f2dec753453",
         thumbnailId: "26d41dae-46d9-4c9c-969a-8506bede25e6",
      },
   ];

   Log.info("creating videos");
   const videos: Array<Video> = contentCreators
      .map((channel) => {
         return Array(Math.round(Math.random() * 10) + 1)
            .fill(null)
            .map(() => {
               const video =
                  videoData[Math.floor(Math.random() * videoData.length)];
               if (!video) {
                  throw new Error("video was undefined");
               }
               return {
                  id: uuidv4(),
                  video_id: video.videoId,
                  channel_id: channel.id,
                  thumbnail_id: video.thumbnailId,
                  description: faker.lorem.paragraphs({
                     min: 0,
                     max: 5,
                  }),
                  title: faker.lorem.sentence(),
                  upload_date: Utils.randomDate(
                     new Date(channel.created_at),
                     new Date()
                  ).toISOString(),
               };
            });
      })
      .flat();
   Log.info("finished creating videos");

   Log.info("creating comments");
   const comments: Array<Comment> = videos
      .map((video) => {
         const top = Array(Math.round(Math.random() * 20) + 1)
            .fill(null)
            .map(() => {
               return {
                  id: uuidv4(),
                  channel_id:
                     channels[Math.floor(Math.random() * channels.length)]!.id,
                  video_id:
                     videos[Math.floor(Math.random() * videos.length)]!.id,
                  created_at: Utils.randomDate(
                     new Date(video.upload_date),
                     new Date()
                  ).toISOString(),
                  parent: null,
                  body: faker.lorem.sentences({ min: 1, max: 10 }),
               } satisfies Comment;
            });
         const replies = top
            .filter(() => {
               // select 20% of the comments
               return Math.random() > 0.8;
            })
            .map((comment) => {
               return {
                  id: uuidv4(),
                  channel_id:
                     channels[Math.floor(Math.random() * channels.length)]!.id,
                  video_id: comment.video_id,
                  created_at: Utils.randomDate(
                     new Date(comment.created_at),
                     new Date()
                  ).toISOString(),
                  parent: comment.id,
                  body: faker.lorem.sentences({ min: 1, max: 10 }),
               } satisfies Comment;
            });

         // super ineffiecient i know ¯\_(ツ)_/¯
         return [...top, ...replies];
      })
      .flat();
   Log.info("finished creating comments");

   Log.info("creating video votes");
   const videoVoteActions = videos
      .map((video) => {
         const voters = new Set<string>();
         const numVoters = Math.round(Math.random() * channels.length);
         while (voters.size < numVoters) {
            const id =
               channels[Math.floor(Math.random() * channels.length)]?.id;
            if (id) {
               voters.add(id);
            }
         }
         return Array.from(voters.values()).map((channelId) => {
            return {
               id: uuidv4(),
               action: Math.random() > 0.2 ? "upvote" : "downvote",
               channel_id: channelId,
               video_id: video.id,
               created_at: new Date().toISOString(),
            } satisfies VideoVoteAction;
         });
      })
      .flat();
   Log.info("finished creating video votes");

   Log.info("creating comment votes");
   const commentVoteActions = comments
      .map((comment) => {
         const voters = new Set<string>();
         const numVoters = Math.round(Math.random() * channels.length);
         while (voters.size < numVoters) {
            const id =
               channels[Math.floor(Math.random() * channels.length)]?.id;
            if (id) {
               voters.add(id);
            }
         }
         return Array.from(voters.values()).map((channelId) => {
            return {
               id: uuidv4(),
               action: Math.random() > 0.2 ? "upvote" : "downvote",
               channel_id: channelId,
               comment_id: comment.id,
            } satisfies CommentVoteAction;
         });
      })
      .flat();
   Log.info("finished creating comment votes");

   return {
      channels,
      videos,
      comments,
      videoVoteActions,
      commentVoteActions,
   };
}

async function main_01() {
   Log.info("starting generation");
   const data = generate();
   Log.info("completed generation");
   Log.info("starting database mutations");

   Log.info("inserting channels");
   const { error: channel_error } = await db
      .from("yt_channel")
      .insert(data.channels);
   if (channel_error) {
      Log.error(channel_error);
      throw channel_error;
   }
   Log.info("completed inserting channels");

   Log.info("inserting videos");
   const { error: video_error } = await db
      .from("yt_videos")
      .insert(data.videos);
   if (video_error) {
      Log.error(video_error);
      throw video_error;
   }
   Log.info("completed inserting videos");

   Log.info("inserting comments");
   const { error: comments_error } = await db
      .from("yt_comments")
      .insert(data.comments);
   if (comments_error) {
      Log.error(comments_error);
      throw comments_error;
   }
   Log.info("completed inserting comments");

   Log.info("inserting video vote actions");
   const { error: va_error } = await db
      .from("yt_video_likes")
      .insert(data.videoVoteActions);
   if (va_error) {
      Log.error(va_error);
      throw va_error;
   }
   Log.info("completed inserting video vote actions");

   Log.info("inserting comment vote actions");
   const { error: ca_error } = await db
      .from("yt_comment_vote_actions")
      .insert(data.commentVoteActions);
   if (ca_error) {
      Log.error(ca_error);
      throw ca_error;
   }
   Log.info("completed inserting comment vote actions");

   Log.info("finished database mutations");
}

async function main_02() {
   const { data, error } = await db.from("yt_videos").select("id");
   if (error) {
      Log.error(error);
      throw error;
   }
   for (const { id } of data ?? []) {
      const description = faker.lorem.paragraphs({
         min: 0,
         max: 5,
      });
      Log.info({
         id,
         description,
      });
      const { error } = await db
         .from("yt_videos")
         .update({
            description,
         })
         .eq("id", id);

      if (error) {
         Log.error(error);
         throw error;
      }
   }
}

async function main() {
   // await main_01()
   await main_02();
}

main();
