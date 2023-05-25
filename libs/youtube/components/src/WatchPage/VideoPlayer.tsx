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

   console.log(data);

   useEffect(() => {
      const params = new URLSearchParams(window.location.search);
      setVideoId(params.get("v") ?? undefined);
   }, []);

   return (
      <div className="w-full">
         {(!!videoId && !isLoading) && (
            <video controls className="w-full aspect-video max-h-[86vh] bg-black">
               <source
                  src={`${PREFIX}/${data?.video_path}`}
                  type="video/webm"
               />
            </video>
         )}
      </div>
   );
};
