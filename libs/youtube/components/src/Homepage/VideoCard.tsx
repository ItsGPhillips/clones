import { Avatar } from "@youtube/components/Avatar";
import { VideoCardThumbnail } from "./VideoCardThumbnail";
import { useSupabase } from "../Supabase";
import Link from "next/link";
import { useVideoInfo } from "@youtube/shared/hooks/useVideoInfo";
import { ComponentProps, Suspense } from "react";

const PREFIX =
   "https://boydmgzwehvxxvydovbv.supabase.co/storage/v1/object/public/youtube";

export const revalidate = 0;

export const VideoCard: React.FC<{ videoId: string }> = (props) => {
   const { supabase } = useSupabase();
   const { data, error } = useVideoInfo(supabase, props.videoId);

   if (error) {
      return <>Error</>;
   }

   return (
      <Link
         href={`/watch?v=${props.videoId}`}
         className="pointer-cursor flex max-w-sm flex-1 flex-col items-center gap-2"
      >
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
      </Link>
   );
};

export const VideoCardWithSuspense = (
   props: ComponentProps<typeof VideoCard>
) => {
   return (
      <Suspense fallback={"loading..."}>
         <VideoCard {...props} />
      </Suspense>
   );
};
