import { KeywordLinks } from "@youtube/components/Homepage/KeywordLinks";

import Image from "next/image";
import Link from "next/link";
import formatDistanceToNowStrict from "date-fns/formatDistanceToNowStrict";
import { db } from "@youtube/drizzle/instance";

export const Recomendations = async () => {
   const data = await db.query.Videos.findMany({
      limit: 10,
      orderBy: (_videos, { sql }) => sql`RANDOM()`,
      with: {
         channel: true,
      },
   });

   return (
      <div className="flex h-full w-full flex-col gap-3">
         {/* <KeywordLinks /> */}
         {data?.map((video) => {
            return (
               <Link key={video.id} href={`/watch?v=${video.id}`}>
                  <div className="flex h-28 w-full cursor-pointer">
                     <div className="relative aspect-video flex-1 overflow-hidden rounded-2xl object-contain">
                        <Image
                           src={`${video.thumbnailUrls[0]}.webp`}
                           alt=""
                           fill
                        />
                     </div>
                     <div className="flex w-[55%] flex-col px-2">
                        <span className="line-clamp-2 mb-1 font-bold">
                           {video.title}
                        </span>
                        <span className="text-xs text-white/60">
                           {video.channel.name}
                        </span>
                        <div className="flex items-center gap-1 text-xs text-white/60">
                           <span className="">0 views</span>
                           <span className="aspect-square w-1 rounded-full bg-white/20" />
                           <span>
                              {formatDistanceToNowStrict(
                                 new Date(video.uploadDate)
                              )}
                           </span>
                        </div>
                     </div>
                  </div>
               </Link>
            );
         })}
      </div>
   );
};
