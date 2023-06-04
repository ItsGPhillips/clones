import { PostgrestError, SupabaseClient } from "@supabase/supabase-js";

// @ts-ignore
import { Database } from "@youtube/supabase";
// @ts-ignore
import { UseSuspenseQueryResult, useSuspenseQuery } from "@shared/ReactQuery";

type Data =
   Database["public"]["Functions"]["get_video_info"]["Returns"][number];

export const useVideoInfo = (
   supabase: SupabaseClient<Database>,
   videoId?: string
): UseSuspenseQueryResult<Data, PostgrestError> => {
   return useSuspenseQuery(
      ["content", "video", videoId],
      async () => {
         console.log("fetching");
         const { data, error } = await supabase
            .rpc("get_video_info", {
               param_video_id: videoId!,
            })
            .single();
         if (error) throw error;
         return data satisfies Data;
      },
      {
         enabled: !!videoId,
         suspense: true,
      }
   );
};
