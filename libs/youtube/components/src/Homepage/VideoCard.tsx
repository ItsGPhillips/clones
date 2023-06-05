"use client";

import { Avatar } from "@youtube/components/Avatar";
import { VideoCardThumbnail } from "./VideoCardThumbnail";
import { useSupabase } from "../Supabase";
import Link from "next/link";
import { useVideoInfo } from "@youtube/shared/hooks/useVideoInfo";
import { ComponentProps, Suspense } from "react";

// const PREFIX =
//    "https://boydmgzwehvxxvydovbv.supabase.co/storage/v1/object/public/youtube";
const PREFIX = "/assets";

const Fallback = () => {
   return (
      <div className="pointer-cursor flex max-w-sm flex-1 animate-pulse flex-col items-center gap-2">
         <div className="!aspect-video w-full overflow-hidden rounded-2xl bg-white/30" />
         <div className="relative flex flex-row gap-2 self-start">
            <div className="h-10 w-10 rounded-full bg-white/30"></div>
            <div className="flex max-w-[15rem] flex-col gap-2">
               <span className="text-md line-clamp-2 mb-1 h-6 w-44 rounded bg-white/30 font-bold"></span>
               <span className="h-4 w-24 rounded bg-white/30 text-sm font-light text-white/60"></span>
               <span className="h-4 w-24 rounded bg-white/30 text-sm font-light text-white/60"></span>
            </div>
         </div>
      </div>
   );
};

export const VideoCard: React.FC<{ videoId?: string }> = (props) => {
   const { supabase } = useSupabase();
   const { data, error } = useVideoInfo(supabase, props.videoId);

   switch(data.thumbnail_path) {
      case "thumbnails/classic_antique_computers_and_machines": {
         break
      }
      case "thumbnails/text_video.jpg": {
         break
      }
   }

   if (error) {
      return <>{JSON.stringify(error, null, 2)}</>;
   }

   return (
      <Link
         href={`/watch?v=${props.videoId}`}
         className="pointer-cursor flex max-w-sm flex-1 flex-col items-center gap-2"
      >
         <VideoCardThumbnail
            duration={data.video_duration}
            thumbnailUrl={""}
            // thumbnailUrl={`${PREFIX}/${data.thumbnail_path}`}
            videoUrl={""}
            // videoUrl={`${PREFIX}/${data.video_path}`}
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
      </Link>
   );
};

export const VideoCardWithSuspense = (
   props: ComponentProps<typeof VideoCard>
) => {
   return (
      <Suspense fallback={<Fallback />}>
         <VideoCard {...props} />
      </Suspense>
   );
};
