// @ts-ignore
import { UseQueryResult, useQuery } from "@shared/ReactQuery";
import { z } from "zod";
import { getBaseUrl } from "../getBaseUrl";
import { VIDEO_WITH_CHANNEL_SCHEMA, VideoWithChannel } from "../zod/video";

export const useGetRandomVideosQuery = (
   role: string
): UseQueryResult<VideoWithChannel[], Error> => {
   return useQuery(
      ["content", "video", "random", role],
      async () => {
         const res = await fetch(`${getBaseUrl()}/api/video/random`, {
            method: "GET",
         });
         const data = await res.json();
         return data;
      },
      { refetchOnWindowFocus: false }
   );
};
