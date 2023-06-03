import { serverGetVideoData } from "@youtube/supabase";

const PREFIX =
   "https://boydmgzwehvxxvydovbv.supabase.co/storage/v1/object/public/youtube";

export const VideoPlayer = async (props: { videoId: string }) => {
   const data = await serverGetVideoData(props.videoId);
   return (
      <div className="relative w-full overflow-hidden rounded-xl">
         <video
            key={props.videoId}
            controls
            className=" aspect-video max-h-[86vh] w-full bg-black"
         >
            <source src={`${PREFIX}/${data?.video_path}`} type="video/webm" />
         </video>
         <div className="absolute bottom-0 right-0 p-2">test</div>
      </div>
   );
};
