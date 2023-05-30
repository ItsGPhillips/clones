"use client";
import * as Popover from "@shared/components/Popover";
import { EllipsisIcon } from "@youtube/icons/EllipsisIcon";
import { PillButton } from "./PillButton";
import { useRef } from "react";

export const EllipsisButton = () => {
   const ref = useRef<HTMLButtonElement>(null)
   return (
      <Popover.Root>
         <Popover.Trigger asChild>
            <PillButton ref={ref} className="p-2 outline-none">
               <EllipsisIcon className="h-6 w-6" fill="white" />
            </PillButton>
         </Popover.Trigger>
         <Popover.Portal container={ref.current}>
            <Popover.Content align="start" className="absolute top-0 z-[9999] h-32 w-32 bg-white text-black">
               TEST CONTENT
            </Popover.Content>
         </Popover.Portal>
      </Popover.Root>
   );
};
