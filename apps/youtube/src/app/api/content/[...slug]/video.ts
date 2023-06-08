import { db } from "@youtube/drizzle/instance";
import { NextResponse } from "next/server";
import { UUID } from "@youtube/shared/zod/shared";

export const handleVideoRequest = async (
   param0?: string,
   param1?: string
): Promise<NextResponse> => {
   switch (param0) {
      case "full": {
         return NextResponse.json(
               await db.query.Videos.findFirst({
                  where: (videos, { eq }) => eq(videos.id, UUID.parse(param1)),
                  with: {
                     channel: true,
                  },
               })
         );
      }
   }
   return NextResponse.json("hello world");
};
