import { NextRequest, NextResponse } from "next/server";
import { handleVideoRequest } from "./video"

export const GET = async (_req: NextRequest, context: { params: string[] }) => {
   const [param0, param1, param2] = context.params;
   switch (param0) {
      case "video": {
         return await handleVideoRequest(param1, param2);
      }
      case "thumbnail": {
         break;
      }
      default: {
         return NextResponse.error();
      }
   }

   return NextResponse.json("hello world");
};
