"use client";

import * as Dialog from "@shared/components/Dialog";
import { HoverButton } from "./HoverButton";
import { useRef, useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";

import { useButton } from "@react-aria/button";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@shared/utils/cn";
import { Sidebar } from "./Sidebar";

export const SideBarTrigger: React.FC = () => {
   const ref = useRef<HTMLButtonElement>(null);
   const [isOpen, setIsOpen] = useState(false);
   const { buttonProps } = useButton(
      {
         onPress() {
            console.log("test");
            setIsOpen(true);
         },
      },
      ref
   );

   return (
      <Dialog.Root
         open={!!isOpen}
         onOpenChange={(o) => {
            if (!o) setIsOpen(false);
         }}
      >
         <HoverButton ref={ref} className="h-10 w-10 p-2" {...buttonProps}>
            <AiOutlineMenu />
         </HoverButton>
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
                           className="w-full h-full bg-black/50"
                        />
                     </Dialog.Overlay>
                     <div className="absolute inset-0 flex items-center justify-center z-[500] ">
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
                                 "absolute w-60 h-full max-h-screen left-0 top-0 bg-dark-800",
                                 "focus:outline-none active:outline-none",
                                 "flex flex-col"
                              )}
                           >
                              <Sidebar />
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
