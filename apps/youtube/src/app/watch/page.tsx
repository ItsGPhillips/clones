import { Sidebar } from "@youtube/components/Sidebar";
import { VideoPlayer } from "@youtube/components/WatchPage/VideoPlayer";
import { WatchPageLayout } from "@youtube/components/WatchPage/Layout";
import { VideoInfo } from "@youtube/components/WatchPage/VideoInfo";

export default async function WatchPage() {
   return (
      <>
         <Sidebar />
         <WatchPageLayout
            videoPlayer={<VideoPlayer />}
            recomendations={<></>}
            // @ts-expect-error
            videoInfo={<VideoInfo />}
         />
      </>
   );
}
