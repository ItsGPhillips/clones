import Link from "next/link";

import * as Tooltip from "@shared/components/Tooltip";
import { HoverButton } from "@youtube/components/HoverButton";
import { YoutubeLogo } from "@youtube/icons/YoutubeLogo";
import { CreateIcon } from "@youtube/icons/CreateIcon";
import { HeaderSearchInput } from "./HeaderSearchInput";
import { AiOutlineBell } from "react-icons/ai";
import { Avatar } from "./Avatar";
import { SideBarTrigger } from "./SidebarTrigger";

export const Header = (props: { contryCode: string; }) => {
   return (
      <header className="sticky top-0 isolate z-30 flex h-[3.4rem] flex-row items-stretch justify-between border-b-2 border-b-neutral-900 px-8">
         {/* Left Side */}
         <div className="isolate flex flex-row items-center">
            <SideBarTrigger />
            <Link href={"/"} className="ml-8">
               <YoutubeLogo contryCode={props.contryCode} />
            </Link>
         </div>
         {/* Search */}
         <div className="flex w-[40%] max-w-[600px] items-center justify-start">
            <HeaderSearchInput />
         </div>
         {/* User Section */}
         <div className="isolate flex w-fit items-center gap-5">
            <Tooltip.Root tooltip="Create" defaultTooltip>
               <Tooltip.Trigger asChild>
                  <HoverButton className="h-10 w-10 p-2">
                     <CreateIcon fill="white" className="" />
                  </HoverButton>
               </Tooltip.Trigger>
            </Tooltip.Root>
            {/* --- */}
            <Tooltip.Root tooltip="Notifications" defaultTooltip>
               <Tooltip.Trigger asChild>
                  <HoverButton className="h-10 w-10 p-2">
                     <AiOutlineBell
                        className="h-full w-full scale-90"
                        fill="white"
                     />
                  </HoverButton>
               </Tooltip.Trigger>
            </Tooltip.Root>
            <Avatar firstName="George" lastName="Phillips" imageUrl={null} />
         </div>
      </header>
   );
};
