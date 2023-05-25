"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { SidebarContent } from "./Content";
import { HomeIcon } from "@youtube/icons/HomeIcon";
import { ShortsIcon } from "@youtube/icons/ShortsIcon";
import { SubscriptionsIcon } from "@youtube/icons/SubscriptionsIcon";
import { LibraryIcon } from "@youtube/icons/LibraryIcon";
import * as Dialog from "@shared/components/Dialog";
import { cn } from "@shared/utils/cn";
import {
   AnimatePresence,
   motion,
   useIsomorphicLayoutEffect,
} from "framer-motion";

export const SIDEBAR_TOGGLE_EVENT_NAME = "clones-youtube__toggle-sidebar";
export const SIDEBAR_TOGGLE_EVENT = new Event(SIDEBAR_TOGGLE_EVENT_NAME);

export const Sidebar: React.FC = () => {
   const path = usePathname();
   const [isOpen, setIsOpen] = useState<boolean>(false);

   useIsomorphicLayoutEffect(() => {
      setIsOpen(path === "/");
   }, []);

   useEffect(() => {
      const toggle = () => setIsOpen((prev) => !prev);
      document.addEventListener(SIDEBAR_TOGGLE_EVENT_NAME, toggle);
      return () => {
         document.removeEventListener(SIDEBAR_TOGGLE_EVENT_NAME, toggle);
      };
   }, []);

   if (path === "/") {
      return isOpen ? (
         <div className="top-[var(--header-height)] shrink-0 basis-60 ">
            <div className="fixed h-[var(--content-height)] w-60">
               <SidebarContent />
            </div>
         </div>
      ) : (
         <div className="top-[var(--header-height)] shrink-0 basis-16">
            <div className="fixed h-[var(--content-height)] w-16">
               <div className="m-1 flex h-fit w-16 flex-col items-center gap-2 rounded-lg p-4 hover:bg-white/20 ">
                  <HomeIcon fill="white" className="h-6 w-6" />
                  <span className="text-[0.6rem]">Home</span>
               </div>
               <div className="m-1 flex h-fit w-16 flex-col items-center gap-2 rounded-lg p-4 hover:bg-white/20 ">
                  <ShortsIcon fill="white" className="h-6 w-6" />
                  <span className="text-[0.6rem]">Shorts</span>
               </div>
               <div className="m-1 flex h-fit w-16 flex-col items-center gap-2 rounded-lg p-4 hover:bg-white/20 ">
                  <SubscriptionsIcon fill="white" className="h-6 w-6" />
                  <span className="text-[0.6rem]">subscriptions</span>
               </div>
               <div className="m-1 flex h-fit w-16 flex-col items-center gap-2 rounded-lg p-4 hover:bg-white/20 ">
                  <LibraryIcon fill="white" className="h-6 w-6" />
                  <span className="text-[0.6rem]">Library</span>
               </div>
            </div>
         </div>
      );
   }

   return (
      <Dialog.Root
         open={!!isOpen}
         onOpenChange={(o) => {
            if (!o) setIsOpen(false);
         }}
      >
         <AnimatePresence>
            {isOpen && (
               <Dialog.Portal forceMount container={document.body}>
                  <div className="fixed inset-0 z-[499]">
                     <Dialog.Overlay asChild>
                        <motion.div
                           initial={{
                              opacity: 0,
                           }}
                           animate={{
                              opacity: 1,
                           }}
                           exit={{
                              opacity: 0,
                           }}
                           className="h-full w-full bg-black/50"
                        />
                     </Dialog.Overlay>
                     <div className="absolute inset-0 z-[500] flex items-center justify-center ">
                        <Dialog.Content asChild>
                           <motion.div
                              initial={{
                                 x: "-100%",
                                 opacity: 0.2,
                              }}
                              animate={{
                                 x: 0,
                                 opacity: 1,
                              }}
                              exit={{
                                 x: "-100%",
                                 opacity: 0,
                              }}
                              transition={{
                                 duration: 0.2,
                                 ease: "easeOut",
                              }}
                              className={cn(
                                 "bg-dark-800 absolute left-0 top-0 h-full max-h-screen w-60",
                                 "focus:outline-none active:outline-none",
                                 "flex flex-col"
                              )}
                           >
                              <SidebarContent includeLogo />
                           </motion.div>
                        </Dialog.Content>
                     </div>
                  </div>
               </Dialog.Portal>
            )}
         </AnimatePresence>
      </Dialog.Root>
   );
};
