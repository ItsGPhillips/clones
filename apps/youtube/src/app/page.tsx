import { Sidebar } from "@youtube/components/Sidebar";
import { ContentSection } from "@youtube/components/Homepage/ContentSection";
import { KeywordLinks } from "@youtube/components/Homepage/KeywordLinks";
import { createServerComponentClient } from "@youtube/supabase";

export default async function Index() {
   return (
      <div className="flex h-[var(--content-height)] max-w-full grow-0 flex-row">
         {/* 
          "fixed" will take Sidebar out of the document flow.
          Wrapper around the Sidebar to keep its position in the document flow.
        */}
         <div className="top-[var(--header-height)] shrink-0 basis-60 ">
            <div className="fixed h-[var(--content-height)] w-60">
               <Sidebar />
            </div>
         </div>

         {/* --- */}

         <div className="relative mx-[4%] flex flex-1 flex-col items-stretch justify-start">
            <KeywordLinks />
            {/* @ts-expect-error Server Component */}
            <ContentSection />
         </div>
      </div>
   );
}
