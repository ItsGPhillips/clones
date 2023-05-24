import { Avatar } from "@youtube/components/Avatar";
import { cn } from "@shared/utils/cn";
import { VideoCardThumbnail } from "./VideoCardThumbnail";
import { VideoData } from "./ContentRow";
import useSWR from "swr";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { Database } from "@youtube/supabase";
import { useSupabase } from "../Supabase";

const PREFIX =
   "https://boydmgzwehvxxvydovbv.supabase.co/storage/v1/object/public/youtube";

// if (props.videoData === undefined) {
//    return <>Loading...</>;
// }

// return (
//    <div className={cn("flex max-w-sm flex-1 flex-col items-center gap-2")}>
//       <VideoCardThumbnail
//          thumbnailUrl={`${prefix}/${props.videoData.thumbnail_path}`}
//          videoUrl={`${prefix}/${props.videoData.video_path}`}
//       />
//       <div className="relative flex flex-row gap-2 self-start">
//          <Avatar className="self-start" firstName="TEST" imageUrl={null} />
//          <div className="flex max-w-[15rem] flex-col">
//             <span className="text-md line-clamp-2 mb-1 font-bold">
//                {props.videoData.title}
//             </span>
//             <span className="text-sm font-light text-white/60">
//                {props.videoData.channel_name}
//             </span>
//             <span className="text-sm font-light text-white/60">
//                555k views • 3 months ago
//             </span>
//          </div>
//       </div>
//    </div>
// );

// props: { videoData?: VideoData }

export const revalidate = 0;

export const VideoCard: React.FC<{ videoId: string }> = (props) => {
   const { supabase } = useSupabase();
   const { data, isLoading } = useSWR(`video/${props.videoId}`, async () => {
      const { data, error } = await supabase.rpc("get_video_info", {
         param_video_id: "e55530a8-1499-4c59-bdc4-8795fb464f72",
      });
      if (error) throw error;
      return data[0];
   });

   if (isLoading) {
      return <>Loading...</>;
   }

   if (data === undefined ) {
      return <>Error</>;
   }

   return (
      <div className={cn("flex max-w-sm flex-1 flex-col items-center gap-2")}>
         <VideoCardThumbnail
            thumbnailUrl={`${PREFIX}/${data.thumbnail_path}`}
            videoUrl={`${PREFIX}/${data.video_path}`}
         />
         <div className="relative flex flex-row gap-2 self-start">
            <Avatar className="self-start" firstName="TEST" imageUrl={null} />
            <div className="flex max-w-[15rem] flex-col">
               <span className="text-md line-clamp-2 mb-1 font-bold">
                  {data.title}
               </span>
               <span className="text-sm font-light text-white/60">
                  {data.channel_name}
               </span>
               <span className="text-sm font-light text-white/60">
                  555k views • 3 months ago
               </span>
            </div>
         </div>
      </div>
   );
};
