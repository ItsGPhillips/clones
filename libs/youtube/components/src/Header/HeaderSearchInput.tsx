"use client";

import { cn } from "@shared/utils/cn";
import { HoverButton } from "../HoverButton";
import { BiMicrophone } from "react-icons/bi";
import { FiSearch } from "react-icons/fi";
import * as Tooltip from "@shared/components/Tooltip";
import useResizeObserver from "use-resize-observer";
import { SearchResultsPanel } from "./SearchResultsPanel";

export const HeaderSearchInput: React.FC = () => {
   const { ref, width = 1 } = useResizeObserver<HTMLElement>({
      box: "border-box",
   });
   return (
      <div className="isolate flex flex-1 grow flex-row items-stretch">
         <div className="relative flex w-fit grow items-stretch overflow-hidden focus-within:overflow-visible">
            <div className="absolute -left-9 flex h-full w-14 items-center justify-center p-2">
               <FiSearch className="" />
            </div>
            <input
               ref={ref}
               placeholder="Search..."
               className={cn(
                  "w-40 flex-1 bg-transparent py-1 pl-4 pr-2 text-white outline-none focus:-ml-8 focus:pl-12",
                  "border-[1px] border-neutral-700 focus:border-blue-500",
                  "rounded-l-full leading-3"
               )}
            />
            <SearchResultsPanel width={width} />
         </div>
         <div
            className={cn(
               "flex shrink-0 basis-14 items-center justify-center rounded-r-full bg-neutral-800",
               "border-[1px] border-l-0 border-neutral-700 bg-neutral-800"
            )}
         >
            <FiSearch className="" />
         </div>
         <Tooltip.Root tooltip="Search with your voice" defaultTooltip>
            <Tooltip.Trigger asChild>
               <HoverButton className="skrink-0 ml-2 h-10 w-10 p-2">
                  <BiMicrophone
                     className="h-full w-full scale-90"
                     fill="white"
                  />
               </HoverButton>
            </Tooltip.Trigger>
         </Tooltip.Root>
      </div>
   );
};
