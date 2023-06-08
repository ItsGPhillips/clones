// @ts-ignore
import { UseSuspenseQueryResult, useSuspenseQuery } from "@shared/ReactQuery";
import {
   SUBSCRIPTIONS_WITH_CHANNEL_SCHEMA,
   SubscriptionsWithChannel,
} from "../zod/channel";
import { z } from "zod";

export const useChannelSubscriptionsQuery = (
   channelId?: string
): UseSuspenseQueryResult<SubscriptionsWithChannel[], Error> => {
   return useSuspenseQuery(
      ["channel", channelId, "subscriptions"],
      async () => {
         const res = await fetch(
            `/api/channel/${channelId}?query=subscriptions&limit=14`,
            {
               method: "GET",
            }
         );
         return z
            .array(SUBSCRIPTIONS_WITH_CHANNEL_SCHEMA)
            .parse(await res.json());
      },
      {
         enabled: !!channelId,
         suspense: true,
      }
   );
};
