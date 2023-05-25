"use client"

import { cn } from "@shared/utils/cn";
import {
   motion,
   useMotionTemplate,
   useTransform,
   useScroll,
} from "framer-motion";
import { PropsWithChildren, useEffect, useRef } from "react";

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
               "fixed h-[var(--header-height)] w-full px-6",
               "z-[200] flex flex-row items-stretch justify-between",
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
