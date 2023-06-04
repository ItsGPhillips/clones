import {
   createServerComponentClient,
   serverGetVideoData,
} from "@youtube/supabase";
import { Description } from "./Description";
import { subWeeks } from "date-fns";
import { PillButton } from "./PillButton";
import { LikeIcon } from "@youtube/icons/LikeIcon";
import { ShareIcon } from "@youtube/icons/ShareIcon";
import { ClipIcon } from "@youtube/icons/ClipIcon";
import { SaveIcon } from "@youtube/icons/SaveIcon";
import { cn } from "@shared/utils/cn";
import { EllipsisButton } from "./EllipsisButton";
import { Avatar } from "@youtube/components/Avatar";
import { Comment } from "./Comment";

export const VideoInfo = async (props: { videoId: string }) => {
   const videoData = await serverGetVideoData(props.videoId);

   return (
      <div className="flex flex-col gap-2">
         <h2 className="mt-3 text-xl font-bold">{videoData.title}</h2>
         <div className="flex h-12">
            <div className="flex items-center gap-2">
               <Avatar firstName={videoData.channel_name} imageUrl={null} />
               <div className="flex flex-col">
                  <span className="whitespace-nowrap text-sm font-bold">
                     {videoData.channel_name}
                  </span>
                  <span className="whitespace-nowrap text-xs text-white/80">
                     {videoData.subscriber_count} subscribers
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
                        {videoData.likes ?? "NULL"}
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
            description={videoData.video_description}
            views={0}
            uploadDate={new Date(videoData.upload_date)}
            tags={["tag1", "tag2", "tag3"]}
         />
         <a
            href="https://support.google.com/youtube/answer/2797468?hl=en-GB"
            className="mt-2 text-sm text-blue-400 hover:cursor-pointer hover:underline"
         >
            Licence - Creative Commons | Public Domain
         </a>
         {/* @ts-expect-error */}
         <CommentSection videoId={props.videoId} />
      </div>
   );
};

const CommentSection = async (props: { videoId: string }) => {
   console.log(props);

   const supabase = createServerComponentClient();
   const { data } = await supabase.rpc("get_comment_info", {
      param_video_id: props.videoId,
      param_parent_id: "", // HACK: empty string to make Postgres happy
   });

   return (
      <div>
         <h3 className="mb-6 mt-2">{data?.length ?? 0} Comments</h3>
         <div className="flex flex-col gap-2">
            {data?.map((comment) => {
               if (comment.parent === null) {
                  return <Comment comment={comment} />;
               }
            })}
         </div>
      </div>
   );
};
