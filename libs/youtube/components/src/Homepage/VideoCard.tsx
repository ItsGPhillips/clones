"use client";

import { Avatar } from "@youtube/components/Avatar";
import { VideoCardThumbnail } from "./VideoCardThumbnail";
import Link from "next/link";

// @ts-ignore
import { VideoWithChannel } from "@youtube/shared/zod/video";

export const VideoCardLoading = () => {
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

export const VideoCard: React.FC<{ video: VideoWithChannel }> = (props) => {
   return (
      <Link
         href={`/watch?v=${props.video.id}`}
         className="pointer-cursor flex max-w-sm flex-1 flex-col items-center gap-2"
      >
         <VideoCardThumbnail
            duration={props.video.duration}
            thumbnailUrl={`${props.video.thumbnailUrls[0]!}.webp`}
            videoUrl={`${props.video.url}.webm`}
         />
         <div className="relative flex flex-row gap-2 self-start">
            <Avatar className="self-start" firstName="TEST" imageUrl={null} />
            <div className="flex max-w-[15rem] flex-col">
               <span className="text-md line-clamp-2 mb-1 font-bold">
                  {props.video.title}
               </span>
               <span className="text-sm font-light text-white/60">
                  {props.video.channel.name}
               </span>
               <span className="text-sm font-light text-white/60">
                  555k views • 3 months ago
               </span>
            </div>
         </div>
      </Link>
   );
};