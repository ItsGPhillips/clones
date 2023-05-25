import { SupabaseClient } from "@supabase/supabase-js";
import { Database } from "@youtube/supabase";
import useSWR from "swr";

export const useVideoInfo = (
   supabase: SupabaseClient<Database>,
   videoId?: string
) => {
   return useSWR(
      `video/${videoId}`,
      async () => {
         const { data, error } = await supabase.rpc("get_video_info", {
            param_video_id: videoId!,
         });
         if (error) throw error;
         return data[0];
      },
      {
         isPaused() {
            return !videoId;
         },
      }
   );
};
