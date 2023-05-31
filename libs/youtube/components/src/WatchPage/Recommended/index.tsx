import { KeywordLinks } from "@youtube/components/Homepage/KeywordLinks";
import { createServerComponentClient } from "@youtube/supabase";
import Image from "next/image";

const getData = async () => {
   const supabase = createServerComponentClient();
   const { data, error } = await supabase.rpc("get_video_info", {
      param_video_id: "e55530a8-1499-4c59-bdc4-8795fb464f72",
   });

   if (error) throw error;
   const [videoData] = data;
   if (!videoData) throw new Error("video data was undefined");
   return videoData;
};

const PREFIX =
   "https://boydmgzwehvxxvydovbv.supabase.co/storage/v1/object/public/youtube";

const ActualThing = async () => {
   const videoData = await getData();

   return (
      <div className="flex h-28 w-full">
         <div className="relative aspect-video flex-1 overflow-hidden rounded-2xl object-contain">
            <Image src={`${PREFIX}/${videoData.thumbnail_path}`} alt="" fill />
         </div>
         <div className="flex w-[55%] flex-col px-2">
            <span className="line-clamp-2 mb-1 font-bold">{videoData.title}</span>
            <span className="text-xs text-white/60">{videoData.channel_name}</span>
            <div className="flex gap-1 text-xs items-center text-white/60">
               <span className="">123K views</span>
               <span className="aspect-square w-1 rounded-full bg-white/20" />
               <span>10 hours ago</span>
            </div>
         </div>
      </div>
   );
};

export const Recomendations = () => {
   return (
      <div className="flex h-full w-full flex-col gap-3">
         <KeywordLinks />
         {Array(20)
            .fill(null)
            .map(() => {
               /* @ts-expect-error */
               return <ActualThing />;
            })}
      </div>
   );
};
