import { Sidebar } from "@youtube/components/Sidebar";
import { VideoPlayer }from "@youtube/components/WatchPage/VideoPlayer"

export default async function WatchPage() {
   return (
      <>
         <Sidebar />
         <div className="relative mx-[4%] flex flex-1 flex-col items-stretch justify-start border-2">
            <VideoPlayer />
         </div>
      </>
   );
}
