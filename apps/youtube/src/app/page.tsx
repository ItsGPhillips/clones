import { Sidebar } from "@youtube/components/Sidebar";
import { ContentSection } from "@youtube/components/Homepage/ContentSection";
import { KeywordLinks } from "@youtube/components/Homepage/KeywordLinks";

export default async function Index() {
   return (
      <>
         <Sidebar />
         {/* --- */}
         <div className="relative mx-0 flex flex-1 flex-col items-stretch justify-start md:mx-[4%]">
               <KeywordLinks fixed/>
            {/* @ts-expect-error Server Component */}
            <ContentSection />
         </div>
      </>
   );
}
