import { Description } from "./Description";
import { PillButton } from "./PillButton";
import { LikeIcon } from "@youtube/icons/LikeIcon";
import { ShareIcon } from "@youtube/icons/ShareIcon";
import { ClipIcon } from "@youtube/icons/ClipIcon";
import { SaveIcon } from "@youtube/icons/SaveIcon";
import { cn } from "@shared/utils/cn";
import { EllipsisButton } from "./EllipsisButton";
import { Avatar } from "@youtube/components/Avatar";
import { Comment } from "./Comment";
import { db } from "@youtube/drizzle/instance";
import { and, eq, sql } from "drizzle-orm";
import { Subscriptions, VideoVotes, Views } from "@youtube/drizzle/index";

export const getVideoData = async (videoId: string) => {
   const data = await db.query.Videos.findFirst({
      where: (videos, { eq }) => eq(videos.id, videoId),
      with: {
         channel: true,
         comments: {
            where: (comment, { sql }) =>
               sql`${comment.parent.name}::text IS NULL`,
            with: {
               channel: true,
            },
         },
      },
   });
   if (!data) {
      throw "error";
   }
   return data;
};

const getSubscriptionCount = async (channelId: string) => {
   const [data] = await db
      .select({
         count: sql<number>`COUNT(*)`.mapWith(Number),
      })
      .from(Subscriptions)
      .where(eq(Subscriptions.channelId, channelId))
      .limit(1);

   if (!data) throw new Error();
   return data.count;
};

const getVideoLikeCount = async (videoId: string) => {
   const [downvotes, upvotes] = await Promise.all([
      db
         .select({
            count: sql<number>`COUNT(*)`.mapWith(Number),
         })
         .from(VideoVotes)
         .where(
            and(
               eq(VideoVotes.action, "downvote"),
               eq(VideoVotes.videoId, videoId)
            )
         )
         .limit(1)
         .then((data) => data[0]),
      db
         .select({
            count: sql<number>`COUNT(*)`.mapWith(Number),
         })
         .from(VideoVotes)
         .where(
            and(
               eq(VideoVotes.action, "upvote"),
               eq(VideoVotes.videoId, videoId)
            )
         )
         .limit(1)
         .then((data) => data[0]),
   ]);
   return (upvotes?.count ?? 0) - (downvotes?.count ?? 0);
};

const getViewCount = async (videoId: string) => {
   // select the count column where the video Id is this video.
   const views = await db
      .select({ count: Views.count })
      .from(Views)
      .where(eq(Views.videoId, videoId));

   // sum up the count values.
   const viewCount = views.reduce((out, current) => {
      return out + current.count;
   }, 0);
   return viewCount;
};

export const VideoInfo = async (props: { videoId: string }) => {
   const [video, videoLikeCount] = await Promise.all([
      getVideoData(props.videoId),
      getVideoLikeCount(props.videoId),
   ]);

   const [subscriptionCount, veiwCount] = await Promise.all([
      getSubscriptionCount(video.channelId),
      getViewCount(video.id),
   ])

   return (
      <div className="flex flex-col gap-2">
         <h2 className="mt-3 text-xl font-bold">{video.title}</h2>
         <div className="flex h-12">
            <div className="flex items-center gap-2">
               <Avatar firstName={video.channel.name} imageUrl={null} />
               <div className="flex flex-col">
                  <span className="whitespace-nowrap text-sm font-bold">
                     {video.channel.name}
                  </span>
                  <span className="whitespace-nowrap text-xs text-white/80">
                     {subscriptionCount} subscribers
                  </span>
               </div>
            </div>
            <button className="ml-6 flex h-10 items-center justify-center place-self-center rounded-full bg-white py-3 px-4 text-sm font-bold text-black">
               Subscribe
            </button>
            <div className="ml-auto flex items-center gap-2 text-sm font-bold">
               <div className="flex items-center">
                  <PillButton className="flex gap-1 rounded-r-none pl-4 pr-0">
                     <LikeIcon className="h-6 w-6" fill="white" />
                     <span
                        className={cn("border-r-[1px] border-white/20 pr-2")}
                     >
                        {videoLikeCount ?? "NULL"}
                     </span>
                  </PillButton>
                  <PillButton className="flex rounded-l-none pl-2">
                     <LikeIcon className="h-6 w-6 rotate-180" fill="white" />
                  </PillButton>
               </div>
               <PillButton>
                  <ShareIcon className="h-6 w-6" fill="white" />
                  <span>Share</span>
               </PillButton>
               <PillButton>
                  <ClipIcon className="h-6 w-6" fill="white" />
                  <span>Clip</span>
               </PillButton>
               <PillButton>
                  <SaveIcon className="h-6 w-6" fill="white" />
                  <span>Save</span>
               </PillButton>

               {/* extra links menu */}
               <EllipsisButton />
            </div>
         </div>
         <Description
            description={video.description}
            views={veiwCount}
            uploadDate={new Date(video.uploadDate)}
            tags={["tag1", "tag2", "tag3"]}
         />
         <a
            href="https://support.google.com/youtube/answer/2797468?hl=en-GB"
            className="mt-2 text-sm text-blue-400 hover:cursor-pointer hover:underline"
         >
            Licence - Creative Commons | Public Domain
         </a>
         <div>
            <h3 className="mb-6 mt-2">{video.comments.length ?? 0} Comments</h3>
            <div className="flex flex-col gap-2">
               {video.comments.map((comment) => {
                  if (comment.parent === null) {
                     return <Comment comment={comment} />;
                  }
               })}
            </div>
         </div>
      </div>
   );
};
