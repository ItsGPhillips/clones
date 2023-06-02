import { KeywordLinks } from "@youtube/components/Homepage/KeywordLinks";
import {
   createServerComponentClient,
   serverGetVideoData,
} from "@youtube/supabase";
import Image from "next/image";
import Link from "next/link";
import formatDistanceToNowStrict from "date-fns/formatDistanceToNowStrict";

const PREFIX =
   "https://boydmgzwehvxxvydovbv.supabase.co/storage/v1/object/public/youtube";

const ActualThing = async (props: { videoId: string }) => {
   const videoData = await serverGetVideoData(props.videoId);

   return (
      <Link href={`/watch?v=${props.videoId}`}>
         <div className="flex h-28 w-full cursor-pointer">
            <div className="relative aspect-video flex-1 overflow-hidden rounded-2xl object-contain">
               <Image
                  src={`${PREFIX}/${videoData.thumbnail_path}`}
                  alt=""
                  fill
               />
            </div>
            <div className="flex w-[55%] flex-col px-2">
               <span className="line-clamp-2 mb-1 font-bold">
                  {videoData.title}
               </span>
               <span className="text-xs text-white/60">
                  {videoData.channel_name}
               </span>
               <div className="flex items-center gap-1 text-xs text-white/60">
                  <span className="">0 views</span>
                  <span className="aspect-square w-1 rounded-full bg-white/20" />
                  <span>
                     {formatDistanceToNowStrict(
                        new Date(videoData.upload_date)
                     )}
                  </span>
               </div>
            </div>
         </div>
      </Link>
   );
};

export const Recomendations = async () => {
   const supabase = createServerComponentClient();
   const { data } = await supabase.rpc("get_random_videos", {
      param_count: 10,
   });
   return (
      <div className="flex h-full w-full flex-col gap-3">
         {/* <KeywordLinks /> */}
         {data?.map(({ id }) => {
            /* @ts-expect-error */
            return <ActualThing videoId={id} />;
         })}
      </div>
   );
};
