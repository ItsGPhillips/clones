import { PropsWithChildren } from "react";
import { VideoCard } from "@youtube/components/Hompage/VideoCard";
import { Sidebar } from "@youtube/components/Sidebar";

import {faker} from "@faker-js/faker"

const ContentRow: React.FC<PropsWithChildren> = (props) => {
   return <div className="flex w-full">{props.children}</div>;
};

export default async function Index() {
   return (
      <div className="flex h-[var(--content-height)] grow-0 flex-row">
         {/* 
          "fixed" will take Sidebar out of the document flow.
          Wrapper around the Sidebar to keep its position in the document flow.
        */}
         <div className="top-[var(--header-height)] shrink-0 basis-60">
            <div className="fixed h-full w-60">
               <Sidebar />
            </div>
         </div>

         {/* --- */}

         <div className="relative mx-[5%]">
            <div className="h-10 w-full">
               <div className="bg-dark-800 fixed z-30 flex w-fit flex-row gap-2 py-2">
                  {Array(20)
                     .fill(null)
                     .map(() => (
                        <div className="w-fit rounded-lg bg-white/10 p-2 text-sm">
                           {faker.lorem.word({ length: { min: 5, max: 15 }})}
                        </div>
                     ))}
               </div>
            </div>
            <div className="mt-8">
               <ContentRow>
                  <VideoCard />
                  <VideoCard />
                  <VideoCard />
                  <VideoCard />
               </ContentRow>
               <ContentRow>
                  <VideoCard />
                  <VideoCard />
                  <VideoCard />
                  <VideoCard />
               </ContentRow>
               <ContentRow>
                  <VideoCard />
                  <VideoCard />
                  <VideoCard />
                  <VideoCard />
               </ContentRow>
               <ContentRow>
                  <VideoCard />
                  <VideoCard />
                  <VideoCard />
                  <VideoCard />
               </ContentRow>
               <ContentRow>
                  <VideoCard />
                  <VideoCard />
                  <VideoCard />
                  <VideoCard />
               </ContentRow>
               <ContentRow>
                  <VideoCard />
                  <VideoCard />
                  <VideoCard />
                  <VideoCard />
               </ContentRow>
               <ContentRow>
                  <VideoCard />
                  <VideoCard />
                  <VideoCard />
                  <VideoCard />
               </ContentRow>
            </div>
         </div>
      </div>
   );
}
