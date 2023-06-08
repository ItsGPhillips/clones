import { NextRequest, NextResponse } from "next/server";
import { UUID } from "@youtube/shared/zod/shared";
import { db } from "@youtube/drizzle/instance";

const getCommentData = async (parent: string) => {
   try {
      return await db.query.Comments.findMany({
         where: (comments, { eq }) => eq(comments.parent, parent),
         with: {
            channel: true,
         },
      });
   } catch (e) {
      return e;
   }
};

export const GET = async (
   req: NextRequest,
) => {
   const searchParams = req.nextUrl.searchParams;
   const parentParam = searchParams.get("parent");
   const result = UUID.safeParse(parentParam);
   if(!result.success) {
      return NextResponse.error()
   }
   return NextResponse.json(await getCommentData(result.data));
};
