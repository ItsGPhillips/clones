import { UseQueryResult, useQuery } from "@shared/ReactQuery";
import {
   COMMENT_WITH_CHANNEL_SCHEMA,
   CommentWithChannel,
} from "../zod/channel";
import { z } from "zod";
import { getBaseUrl } from "../getBaseUrl";

export const useCommentQuery = (
   commentId: string
): UseQueryResult<CommentWithChannel[], Error> => {
   return useQuery(
      ["comment", commentId],
      async () => {
         const res = await fetch(`${getBaseUrl()}/api/comments?parent=${commentId}`, {
            method: "GET",
         });
         return z.array(COMMENT_WITH_CHANNEL_SCHEMA).parse(await res.json());
      },
      {
         refetchOnWindowFocus: false,
      }
   );
};
