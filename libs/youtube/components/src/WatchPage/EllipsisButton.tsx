"use client";
import * as Popover from "@shared/components/Popover";
import { EllipsisIcon } from "@youtube/icons/EllipsisIcon";
import { PillButton } from "./PillButton";
import { useRef } from "react";

import { TranscriptIcon } from "@youtube/icons/TranscriptIcon";
import { cn } from "@shared/utils/cn";
import { DownloadIcon } from "@youtube/icons/DownloadIcon";
import { ReportIcon } from "@youtube/icons/ReportIcon";

export const EllipsisButton: React.FC = () => {
   const ref = useRef<HTMLButtonElement>(null);
   return (
      <Popover.Root>
         <Popover.Trigger asChild>
            <PillButton ref={ref} className="p-2 outline-none">
               <EllipsisIcon className="h-6 w-6" fill="white" />
            </PillButton>
         </Popover.Trigger>
         <Popover.Portal container={ref.current}>
            <Popover.Content
               align="start"
               className={cn(
                  "bg-dark-400 animate-in slide-in-from-top-2 absolute top-2 h-fit",
                  "overflow-hidden rounded-xl text-black shadow-2xl shadow-black outline-none",
                  "py-2"
               )}
            >
               <div className="hover:bg-dark-300 flex h-10 items-center text-white transition-colors duration-75">
                  <DownloadIcon fill="white" className="mx-4 h-6 w-6" />
                  <span className="mr-8">Download</span>
               </div>
               <div className="hover:bg-dark-300 flex h-10 items-center text-white  transition-colors duration-75">
                  <ReportIcon fill="white" className="mx-4 h-6 w-6" />
                  <span className="mr-8">Report</span>
               </div>
               <div className="hover:bg-dark-300 flex h-10 items-center text-white  transition-colors duration-75">
                  <TranscriptIcon fill="white" className="mx-4 h-6 w-6" />
                  <span className="mr-8">Transcript</span>
               </div>
            </Popover.Content>
         </Popover.Portal>
      </Popover.Root>
   );
};
