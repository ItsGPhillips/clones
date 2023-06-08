import { db } from "@youtube/drizzle/instance";
import { NextRequest, NextResponse } from "next/server";
import { UUID } from "@youtube/shared/zod/shared";
import { z } from "zod";

const getChannel = async (id: string) => {
   try {
      return await db.query.Channels.findFirst({
         where: (channel, { eq }) => eq(channel.id, id),
      });
   } catch (e) {
      return e;
   }
};

const getSubscriptions = async (id: string, limit?: number) => {
   try {
      return await db.query.Subscriptions.findMany({
         where: (subscriptions, { eq }) =>
            eq(subscriptions.subscriberChannelId, id),
         limit,
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
   { params }: { params: { id: string } }
) => {
   const searchParams = req.nextUrl.searchParams;
   const query = searchParams.get("query");
   const id = UUID.parse(params.id);

   switch (query) {
      case "subscriptions": {
         return NextResponse.json(
            await getSubscriptions(
               id,
               z
                  .number()
                  .nullable()
                  .parse(Number(searchParams.get("limit"))) ?? undefined
            )
         );
      }
      case null: {
         return NextResponse.json(await getChannel(id));
      }
   }
};
