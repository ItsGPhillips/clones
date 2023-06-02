import { Sidebar } from "@youtube/components/Sidebar";
import { VideoPlayer } from "@youtube/components/WatchPage/VideoPlayer";
import { WatchPageLayout } from "@youtube/components/WatchPage/Layout";
import { VideoInfo } from "@youtube/components/WatchPage/VideoInfo";
import { Recomendations } from "@youtube/components/WatchPage/Recommended";
import { z } from "zod";

const SEARCH_PARAMS_SCHEMA = z.object({
   v: z.string().uuid(),
});

export default async function WatchPage(props: Record<string, unknown>) {
   const params = SEARCH_PARAMS_SCHEMA.parse(props["searchParams"]);

   return (
      <>
         <Sidebar />
         <WatchPageLayout
            videoPlayer={
               // @ts-expect-error
               <VideoPlayer videoId={params.v} />
            }
            recomendations={
               // @ts-expect-error
               <Recomendations videoId={params.v}/>
            }
            videoInfo={
               // @ts-expect-error
            <VideoInfo videoId={params.v}/>
         }
         />
      </>
   );
}
