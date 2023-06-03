"use client";

import { cn } from "@shared/utils/cn";
import { HoverButton } from "../HoverButton";
import { BiMicrophone } from "react-icons/bi";
import { FiSearch } from "react-icons/fi";
import useResizeObserver from "use-resize-observer";
import { SearchResultsPanel } from "./SearchResultsPanel";
import { useFocusWithin } from "@react-aria/interactions";
import { useState } from "react";
import { TooltipContainer } from "@shared/components/Tooltip";

const useHeaderSearchInputState = () => {
   const [searchResultsOpen, setSearchResultsOpen] = useState<boolean>(false);
   const { ref, width = 1 } = useResizeObserver<HTMLElement>({
      box: "border-box",
   });
   const { focusWithinProps } = useFocusWithin({
      onFocusWithinChange(isFocusWithin) {
         setSearchResultsOpen(isFocusWithin);
      },
   });
   return {
      searchResultsOpen,
      setSearchResultsOpen,
      width,
      ref,
      focusWithinProps,
   };
};

export const SmallScreen: React.FC = () => {
   const { ref, searchResultsOpen } = useHeaderSearchInputState();

   return (
      <div className="absolute inset-0">
         <input
            ref={ref}
            placeholder="Search..."
            className={cn(
               "w-40 flex-1 bg-transparent py-1 pl-4 pr-2 text-white outline-none",
               "rounded-l-full border-[1px] border-neutral-700 leading-3",
               {
                  "-ml-8 border-blue-500 pl-12": searchResultsOpen,
               }
            )}
         />
      </div>
   );
};

export const HeaderSearchInput: React.FC = () => {
   const { focusWithinProps, ref, searchResultsOpen, width } =
      useHeaderSearchInputState();

   return (
      <div className="flex h-10 flex-1 grow flex-row items-stretch">
         <div
            className="relative flex w-fit grow items-stretch"
            {...focusWithinProps}
         >
            {searchResultsOpen && (
               <div className="absolute -left-9 flex h-full w-14 items-center justify-center p-2">
                  <FiSearch className="" />
               </div>
            )}
            <input
               ref={ref}
               placeholder="Search..."
               className={cn(
                  "w-40 flex-1 bg-transparent py-1 pl-4 pr-2 text-white outline-none",
                  "rounded-l-full border-[1px] border-neutral-700 leading-3",
                  {
                     "-ml-8 border-blue-500 pl-12": searchResultsOpen,
                  }
               )}
            />
            {searchResultsOpen && <SearchResultsPanel width={width} />}
         </div>
         <div
            className={cn(
               "flex shrink-0 basis-14 items-center justify-center rounded-r-full bg-neutral-800",
               "border-[1px] border-l-0 border-neutral-700 bg-neutral-800"
            )}
         >
            <FiSearch className="" />
         </div>
         <TooltipContainer tooltip="Search with your voice">
            <HoverButton className="skrink-0 ml-2 h-10 w-10 p-2">
               <BiMicrophone className="h-full w-full scale-90" fill="white" />
            </HoverButton>
         </TooltipContainer>
      </div>
   );
};
