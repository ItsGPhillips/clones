"use client";

import { cn } from "@shared/utils/cn";
import {
   AnimatePresence,
   useMotionValueEvent,
   motion,
   useMotionTemplate,
   useTransform,
   useScroll,
} from "framer-motion";
import { PropsWithChildren, useState } from "react";
import { KeywordLinks } from "@youtube/components/Homepage/KeywordLinks";

export const Background: React.FC<PropsWithChildren> = (props) => {
   const { scrollY } = useScroll();
   const isSrolled = useTransform(scrollY, (latest) => {
      return latest > 0 ? 1 : 0;
   });

   const opacity = useMotionTemplate`rgba(14, 15, 14, ${isSrolled})`;

   return (
      <div className={cn("relative top-0 h-[var(--header-height)]")}>
         <motion.header
            className={cn(
               "fixed h-[var(--header-height)] w-full px-0 md:px-6",
               "z-[200] flex flex-row items-stretch md:justify-between",
               "bg-dark-800"
            )}
            style={{
               opacity,
            }}
         >
            {props.children}
         </motion.header>
      </div>
   );
};

export const SmallScreenBackground: React.FC<PropsWithChildren> = (props) => {
   const { scrollY } = useScroll();
   const [showHeader, setShowHeader] = useState<boolean>(true);

   useMotionValueEvent(scrollY, "change", async () => {
      setShowHeader(scrollY.get() <= scrollY.getPrevious());
   });

   return (
      <div className={cn("relative top-0 h-fit")}>
         <AnimatePresence initial={false}>
            {showHeader && (
               <motion.div
                  className="bg-dark-800 fixed top-0 z-[600] flex w-full flex-col"
                  initial={{ y: "-100%" }}
                  animate={{
                     y: 0,
                     transition: {
                        duration: 0.2,
                        ease: "easeIn",
                        bounce: 0,
                     },
                  }}
                  exit={{
                     y: "-100%",
                     transition: {
                        delay: 0.4,
                        duration: 0.2,
                        ease: "easeOut",
                        bounce: 0,
                     },
                  }}
               >
                  <header
                     className={cn(
                        "h-[var(--header-height)] w-full px-0 md:px-6",
                        "flex items-stretch md:justify-between"
                     )}
                  >
                     {props.children}
                  </header>
                  <div className="relative">
                     <KeywordLinks />
                  </div>
               </motion.div>
            )}
         </AnimatePresence>
      </div>
   );
};
