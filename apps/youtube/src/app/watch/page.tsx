import { Sidebar } from "@youtube/components/Sidebar";
import { VideoPlayer } from "@youtube/components/WatchPage/VideoPlayer";
import { WatchPageLayout } from "@youtube/components/WatchPage/Layout";
import { VideoInfo } from "@youtube/components/WatchPage/VideoInfo";
import { Recomendations } from "@youtube/components/WatchPage/Recommended";
import { z } from "zod";
import { getVideoData } from "@youtube/shared/server/getVideoData";

const SEARCH_PARAMS_SCHEMA = z.object({
   v: z.string().uuid(),
});

export default async function WatchPage(props: { searchParams: any }) {
   const params = SEARCH_PARAMS_SCHEMA.parse(props["searchParams"]);
   const video = await getVideoData(params.v);

   return (
      <>
         <Sidebar />
         <WatchPageLayout
            videoPlayer={<VideoPlayer videoSrcUrl={video.url} />}
            recomendations={
               // @ts-expect-error
               <Recomendations videoId={params.v} />
            }
            videoInfo={
               // @ts-expect-error
               <VideoInfo videoId={params.v} />
            }
         />
      </>
   );
}
