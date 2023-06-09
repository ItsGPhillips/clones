"use client";

import { EllipsisIcon } from "@youtube/icons/EllipsisIcon";
import { useCommentClientState } from "./ClientStateProvider";
import { cn } from "@shared/utils/cn";
import { motion, useAnimate } from "framer-motion";
import { usePress } from "@react-aria/interactions";
import * as Dialog from "@shared/components/Dialog";
import { ReportIcon } from "@youtube/icons/ReportIcon";
import { useBoolean } from "usehooks-ts";

export const CommentMenu = () => {
   const { isHovered } = useCommentClientState();
   const [ref, animate] = useAnimate<HTMLButtonElement>();

   const openMenu = useBoolean();

   const { pressProps } = usePress({
      onPressStart() {
         ref.animations.map((a) => a.stop());
         animate(
            ref.current,
            {
               backgroundColor: "rgba(255, 255, 255, 0.1)",
               outlineColor: "rgba(255, 255, 255, 0)",
            },
            { duration: 0.05 }
         );
      },
      onPressEnd() {
         animate(
            ref.current,
            { backgroundColor: "rgba(255, 255, 255, 0)" },
            { duration: 0.5 }
         );
         const c = animate(
            ref.current,
            {
               outline: "solid rgba(255,255,255,0.3) 1px",
               outlineOffset: ["-10px", "0px"],
            },
            { duration: 0.1 }
         );
         c.then(() => {
            animate(
               ref.current,
               { outline: "solid rgba(255,255,255,0) 0px" },
               { duration: 0.2 }
            ).complete();
         });
         openMenu.setTrue();
      },
   });

   return (
      <Dialog.Root onOpenChange={(o) => openMenu.setValue(o)}>
         <Dialog.Trigger asChild>
            <motion.button
               ref={ref}
               initial={{
                  outlineWidth: "0px",
                  opacity: isHovered || openMenu.value ? 1 : 0,
               }}
               animate={{
                  opacity: isHovered || openMenu.value ? 1 : 0,
                  transition: {
                     duration: 0.05,
                  },
               }}
               className={cn(
                  "absolute right-2 top-3 flex cursor-pointer items-center justify-center rounded-full p-2 z-[400]"
               )}
               {...(pressProps as any)}
            >
               <EllipsisIcon fill="white" className="h-6 w-6 rotate-90" />
            </motion.button>
         </Dialog.Trigger>
         <Dialog.Portal container={ref.current}>
            <Dialog.Content
               className={cn(
                  "bg-dark-400 animate-in slide-in-from-top-2 absolute top-[100%] h-fit",
                  "overflow-hidden rounded-xl text-black shadow-2xl shadow-black outline-none",
                  "py-2 text-sm font-normal"
               )}
            >
               <div className="hover:bg-dark-300 flex h-10 items-center text-white  transition-colors duration-75">
                  <ReportIcon fill="white" className="mx-4 h-6 w-6" />
                  <span className="mr-8">Report</span>
               </div>
            </Dialog.Content>
         </Dialog.Portal>
      </Dialog.Root>
   );
};
