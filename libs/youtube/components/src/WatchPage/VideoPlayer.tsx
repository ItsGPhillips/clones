"use client";

import { useVideoInfo } from "@youtube/shared/hooks/useVideoInfo";
import { useEffect, useState } from "react";
import { useSupabase } from "../Supabase";

const PREFIX =
   "https://boydmgzwehvxxvydovbv.supabase.co/storage/v1/object/public/youtube";

export const VideoPlayer = () => {
   const [videoId, setVideoId] = useState<string | undefined>();
   const { supabase } = useSupabase();
   const { data, isLoading } = useVideoInfo(supabase, videoId);

   useEffect(() => {
      const params = new URLSearchParams(window.location.search);
      setVideoId(params.get("v") ?? undefined);
   }, []);

   return (
      <div className="relative w-full rounded-xl overflow-hidden">
         {!!videoId && !isLoading && (
            <video
               controls
               className=" aspect-video max-h-[86vh] w-full bg-black"
            >
               <source
                  src={`${PREFIX}/${data?.video_path}`}
                  type="video/webm"
               />
            </video>
         )}
         <div className="absolute bottom-0 right-0 p-2">test</div>
      </div>
   );
};
