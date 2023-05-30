import { createServerComponentClient } from "@youtube/supabase";
import { Description } from "./Description";
import { subWeeks } from "date-fns";
import { faker } from "@faker-js/faker";
import { PillButton } from "./PillButton";
import { LikeIcon } from "@youtube/icons/LikeIcon";
import { ShareIcon } from "@youtube/icons/ShareIcon";
import { ClipIcon } from "@youtube/icons/ClipIcon";
import { SaveIcon } from "@youtube/icons/SaveIcon";
import { cn } from "@shared/utils/cn";
import { EllipsisButton } from "./EllipsisButton";
import { Avatar } from "@youtube/components/Avatar";
import { Comment } from "./Comment";

const getData = async () => {
   const supabase = createServerComponentClient();
   const { data, error } = await supabase.rpc("get_video_info", {
      param_video_id: "e55530a8-1499-4c59-bdc4-8795fb464f72",
   });

   if (error) throw error;
   const [videoData] = data;
   if (!videoData) throw new Error("video data was undefined");
   return videoData;
};

export const VideoInfo = async () => {
   const videoData = await getData();
   return (
      <div className="flex flex-col gap-2">
         <h2 className="mt-2 text-xl font-bold">{videoData.title}</h2>
         <div className="flex h-12">
            <div className="flex items-center gap-2">
               <Avatar firstName={videoData.channel_name} imageUrl={null} />
               <div className="flex flex-col gap-1">
                  <span className="text-bold text-sm">
                     {videoData.channel_name}
                  </span>
                  <span className="text-xs">0 subscribers</span>
               </div>
            </div>
            <button className="ml-6 flex h-10 items-center justify-center rounded-full bg-white p-3 text-sm font-bold text-black">
               Subscribe
            </button>
            <div className="ml-auto flex items-center gap-2 text-sm font-bold">
               <div className="flex items-center">
                  <PillButton className="flex gap-1 rounded-r-none pl-4 pr-0">
                     <LikeIcon className="h-6 w-6" fill="white" />
                     <span
                        className={cn("border-r-[1px] border-white/20 pr-2")}
                     >
                        123
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
            description={faker.lorem.paragraphs()}
            views={10200}
            uploadDate={subWeeks(new Date(), 2)}
            tags={["tag1", "computers", "test"]}
         />
         <div>
            <h3 className="my-6">1000 Comments</h3>
            <div className="flex flex-col gap-4">
               <Comment />
               <Comment />
               <Comment />
               <Comment />
               <Comment />
               <Comment />
               <Comment />
               <Comment />
               <Comment />
               <Comment />
               <Comment />
            </div>
         </div>
      </div>
   );
};
