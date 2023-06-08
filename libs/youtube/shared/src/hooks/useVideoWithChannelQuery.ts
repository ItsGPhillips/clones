import {
   VIDEO_WITH_CHANNEL_SCHEMA,
   type VideoWithChannel,
} from "@youtube/shared/zod/video";

// @ts-ignore
import { UseSuspenseQueryResult, useSuspenseQuery } from "@shared/ReactQuery";
import { getBaseUrl } from "../getBaseUrl";

export const useVideoWithChannelQuery = (
   videoId?: string
): UseSuspenseQueryResult<VideoWithChannel, Error> => {
   return useSuspenseQuery(
      ["content", "video", videoId],
      async () => {
         // const res = await fetch(
         //    `${getBaseUrl()}/api/content/video/${videoId}`,
         //    {
         //       method: "GET",
         //    }
         // );

         // console.log(await res.json());
         // return VIDEO_WITH_CHANNEL_SCHEMA.parse();

         return {
            id: "91e3a1d3-b99e-4e92-841d-c8737d962d4d",
            title: "Et porro velit perferendis eos quos.",
            description:
               "Suscipit nihil sunt sequi laudantium perspiciatis. Totam doloribus dicta ipsam minima. Aperiam repellat minus quasi esse officiis.",
            uploadDate: "2022-09-05 11:04:44.439+00",
            channelId: "850de0cd-257d-4b45-a209-777ecbbf6c17",
            duration: 899,
            url: "/assets/videos/c7de5239-853f-4f40-8a83-6f2dec753453",
            thumbnailUrls: [
               "/assets/thumbnails/26d41dae-46d9-4c9c-969a-8506bede25e6.png",
            ],
            channel: {
               id: "850de0cd-257d-4b45-a209-777ecbbf6c17",
               isVerified: false,
               createdAt: "2022-02-25T22:22:39.091+00:00",
               name: "Faith Bechtelar I",
            },
         } satisfies VideoWithChannel;
      },
      {
         enabled: !!videoId,
         suspense: true,
      }
   );
};
