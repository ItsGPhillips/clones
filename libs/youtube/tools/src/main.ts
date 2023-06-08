import { faker } from "@faker-js/faker";
import { subDays } from "date-fns";
import { v4 as uuidv4 } from "uuid";
import pino from "pino";
import type {
   Channel,
   Comment,
   Video,
   VideoVoteAction,
   CommentVoteAction,
   Subscription,
   View,
} from "../../drizzle/src/types";

import {
   Channels,
   CommentVotes,
   Comments,
   Subscriptions,
   VideoVotes,
   Videos,
   Views,
} from "../../drizzle/src/index";

import { Pool } from "pg";
import { drizzle } from "drizzle-orm/node-postgres";

const Log = pino({
   transport: {
      target: "pino-pretty",
   },
});

const pool = new Pool({
   connectionString: process.env["DATABASE_URL"],
});

export const db = drizzle(pool);

namespace Utils {
   export const randomDate = (start: Date, end: Date): Date => {
      return new Date(
         start.getTime() + Math.random() * (end.getTime() - start.getTime())
      );
   };
}
const genChannels = (count: number) => {
   Log.info("creating channels");
   const channels: Array<Channel> = Array(count)
      .fill(null)
      .map(() => {
         return {
            id: uuidv4(),
            isVerified: false,
            createdAt: subDays(new Date(), Math.random() * 1000).toISOString(),
            name:
               Math.random() > 0.2
                  ? faker.person.fullName()
                  : faker.company.name(),
         } satisfies Channel;
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
         channel.isVerified = Boolean(Math.random() > 0.5);
         contentCreators.push(channel);
      }
   }

   Log.info("finished creating channels");

   return {
      channels,
      contentCreators,
   };
};

const genVideos = (channels: Array<Channel>): Array<Video> => {
   const videoData = [
      {
         videoId: "e190e9a1-b3f9-4840-8c57-8c7312595e68",
         thumbnailId: "fbb43656-a27d-46e2-82d7-e43053c4229a",
         duration: 70,
      },
      {
         videoId: "c7de5239-853f-4f40-8a83-6f2dec753453",
         thumbnailId: "26d41dae-46d9-4c9c-969a-8506bede25e6",
         duration: 899,
      },
   ];
   Log.info("creating videos");
   const videos: Array<Video> = channels
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
                  channelId: channel.id,
                  description: faker.lorem.paragraphs({
                     min: 0,
                     max: 5,
                  }),
                  duration: video.duration,
                  thumbnailUrls: [`/assets/thumbnails/${video.thumbnailId}`],
                  title: faker.lorem.sentence(),
                  uploadDate: Utils.randomDate(
                     new Date(channel.createdAt),
                     new Date()
                  ).toISOString(),
                  url: `/assets/thumbnails/${video.videoId}`,
               } satisfies Video;
            });
      })
      .flat();
   Log.info("finished creating videos");
   return videos;
};

const genComments = (
   videos: Array<Video>,
   channels: Array<Channel>
): Array<Comment> => {
   Log.info("creating comments");
   const comments: Array<Comment> = videos
      .map((video) => {
         const top = Array(Math.round(Math.random() * 20) + 1)
            .fill(null)
            .map(() => {
               return {
                  id: uuidv4(),
                  channelId:
                     channels[Math.floor(Math.random() * channels.length)]!.id,
                  videoId:
                     videos[Math.floor(Math.random() * videos.length)]!.id,
                  postedAt: Utils.randomDate(
                     new Date(video.uploadDate),
                     new Date()
                  ).toISOString(),
                  parent: null,
                  body: faker.lorem.sentences({ min: 1, max: 10 }),
               } satisfies Comment;
            });
         const replies = top
            .filter(() => {
               // select 20% of the comments
               return Math.random() > 0.5;
            })
            .map((comment) => {
               return {
                  id: uuidv4(),
                  channelId:
                     channels[Math.floor(Math.random() * channels.length)]!.id,
                  videoId: comment.videoId,
                  postedAt: Utils.randomDate(
                     new Date(comment.postedAt),
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

   return comments;
};

const genVideoLikes = (
   videos: Array<Video>,
   channels: Array<Channel>
): Array<VideoVoteAction> => {
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
               action: Math.random() > 0.2 ? "upvote" : "downvote",
               channelId: channelId,
               videoId: video.id,
            } satisfies VideoVoteAction;
         });
      })
      .flat();
   Log.info("finished creating video votes");
   return videoVoteActions;
};

const genCommentLikes = (
   comments: Array<Comment>,
   channels: Array<Channel>
): Array<CommentVoteAction> => {
   Log.info("creating comment votes");
   const commentVoteActions = comments
      .map((comment) => {
         const voters = new Set<string>();
         const numVoters = Math.round(Math.random() * (channels.length / 2));
         while (voters.size < numVoters) {
            const id =
               channels[Math.floor(Math.random() * channels.length)]?.id;
            if (id) {
               voters.add(id);
            }
         }
         return Array.from(voters.values()).map((channelId) => {
            return {
               action: Math.random() > 0.2 ? "upvote" : "downvote",
               channelId: channelId,
               commentId: comment.id,
            } satisfies CommentVoteAction;
         });
      })
      .flat();
   Log.info("finished creating comment votes");
   return commentVoteActions;
};

const generateSubscriptions = (
   channels: Array<Channel>
): Array<Subscription> => {
   const subscriptions = channels
      .map((channel) => {
         const subscribers = new Set<string>();
         const numVoters = Math.round(Math.random() * channels.length);
         while (subscribers.size < numVoters) {
            const id =
               channels[Math.floor(Math.random() * channels.length)]?.id;
            if (id) {
               subscribers.add(id);
            }
         }

         return Array.from(subscribers.values()).map((subscriber) => {
            return {
               channelId: channel.id,
               subscriberChannelId: subscriber,
            } satisfies Subscription;
         });
      })
      .flat();
   return subscriptions;
};

const generateViews = (
   videos: Array<Video>,
   channels: Array<Channel>
): Array<View> => {
   const views = videos
      .map((video) => {
         const viewers = new Set<string>();
         const viewCount = Math.round(Math.random() * channels.length);
         while (viewers.size < viewCount) {
            const id =
               channels[Math.floor(Math.random() * channels.length)]?.id;
            if (id) {
               viewers.add(id);
            }
         }
         return Array.from(viewers.values()).map((channelId) => {
            return {
               channelId: channelId,
               videoId: video.id,
               count: Math.floor(Math.random() * 10),
            } satisfies View;
         });
      })
      .flat();
   return views;
};

const generationStage = () => {
   const { channels, contentCreators } = genChannels(100);
   const videos = genVideos(contentCreators);
   const comments = genComments(videos, channels);
   const videoLikes = genVideoLikes(videos, channels);
   const commentLikes = genCommentLikes(comments, channels);
   const subscriptions = generateSubscriptions(channels);
   const views = generateViews(videos, channels);

   Log.info({
      channels: {
         count: channels.length,
      },
      videos: {
         count: videos.length,
      },
      comments: {
         count: comments.length,
      },
      videoLikes: {
         count: videoLikes.length,
      },
      commentLikes: {
         count: commentLikes.length,
      },
      subscriptions: {
         count: subscriptions.length,
      },
      views: {
         count: views.length,
      },
   });

   return {
      channels,
      videos,
      subscriptions,
      comments,
      videoLikes,
      commentLikes,
      views,
   };
};

import chunk from "lodash.chunk";
import { eq } from "drizzle-orm";

const uploadData = async (data: ReturnType<typeof generationStage>) => {
   db.transaction(async (tx) => {
      try {
         await Promise.all(
            chunk(data.channels, 100).map((chunk) => {
               return tx.insert(Channels).values(chunk);
            })
         );
         await Promise.all(
            chunk(data.videos, 100).map((chunk) => {
               return tx.insert(Videos).values(chunk);
            })
         );
         await Promise.all(
            chunk(data.subscriptions, 100).map((chunk) => {
               return tx.insert(Subscriptions).values(chunk);
            })
         );
         await Promise.all(
            chunk(data.comments, 100).map((chunk) => {
               return tx.insert(Comments).values(chunk);
            })
         );
         await Promise.all(
            chunk(data.views, 100).map((chunk) => {
               return tx.insert(Views).values(chunk);
            })
         );
         await Promise.all(
            chunk(data.videoLikes, 100).map((chunk) => {
               return tx.insert(VideoVotes).values(chunk);
            })
         );
         await Promise.all(
            chunk(data.commentLikes, 100).map((chunk) => {
               return tx.insert(CommentVotes).values(chunk);
            })
         );
      } catch (e) {
         Log.error(e);
         tx.rollback();
      }
   });
};

const fixVideoUrlPaths = async () => {
   await Promise.all([
      db
         .update(Videos)
         .set({
            url: "/assets/videos/e190e9a1-b3f9-4840-8c57-8c7312595e68",
         })
         .where(
            eq(
               Videos.url,
               "/assets/thumbnails/e190e9a1-b3f9-4840-8c57-8c7312595e68"
            )
         ),
      db
         .update(Videos)
         .set({
            url: "/assets/videos/c7de5239-853f-4f40-8a83-6f2dec753453",
         })
         .where(
            eq(
               Videos.url,
               "/assets/thumbnails/c7de5239-853f-4f40-8a83-6f2dec753453"
            )
         ),
   ]);
};

async function main() {
   // const data = generationStage();
   // await uploadData(data);
   await fixVideoUrlPaths();
}

main();
