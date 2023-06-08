import { db } from "@youtube/drizzle/instance";
import { NextRequest, NextResponse } from "next/server";

const getRandomVideos = async (limit?: number) => {
   return await db.query.Videos.findMany({
      limit: limit ?? 4,
      orderBy: (_videos, { sql }) => sql`RANDOM()`,
      with: {
         channel: true,
      },
   });
};
export const GET = async (req: NextRequest) => {
   const searchParams = req.nextUrl.searchParams;
   return NextResponse.json(await getRandomVideos());
};
