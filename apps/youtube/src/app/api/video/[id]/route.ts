import { db } from "@youtube/drizzle/instance";
import { NextRequest, NextResponse } from "next/server";
import { UUID } from "@youtube/shared/zod/shared";

const getVideo = async (id: string) => {
   return await db.query.Videos.findFirst({
      where: (videos, { eq }) => eq(videos.id, id),
      with: {
         channel: true,
      },
   });
};

export const GET = async (
   req: NextRequest,
   { params }: { params: { id: string } }
) => {
   const searchParams = req.nextUrl.searchParams;
   const id = UUID.parse(params.id);
   return NextResponse.json(await getVideo(id));
};
