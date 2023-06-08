import { db } from "@youtube/drizzle/instance";
import { NextRequest, NextResponse } from "next/server";
import { UUID } from "@youtube/shared/zod/shared";


export const GET = async (
   req: NextRequest,
   { params }: { params: { id: string } }
) => {
   return NextResponse.json("test");
};
