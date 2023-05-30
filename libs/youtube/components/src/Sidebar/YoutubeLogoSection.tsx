"use client";

import { YoutubeLogo } from "@youtube/icons/YoutubeLogo";
import Link from "next/link";
import { SideBarTrigger } from "./SidebarTrigger";
import { cn } from "@shared/utils/cn";
import { usePathname } from "next/navigation";

export const YoutubeLogoWithSidebarTrigger: React.FC<{
   contryCode: string;
   className?: string;
}> = (props) => {
   const path = usePathname();
   return (
      <div
         className={cn("isolate flex flex-row items-center", props.className)}
      >
         <SideBarTrigger />
         <Link href={"/"} className="ml-3 md:ml-6">
            <YoutubeLogo contryCode={props.contryCode} />
         </Link>
      </div>
   );
};
