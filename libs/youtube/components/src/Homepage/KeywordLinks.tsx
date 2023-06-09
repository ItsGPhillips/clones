"use client";

import { cn } from "@shared/utils/cn";
import { BsChevronRight } from "react-icons/bs";
import useMeasure from "react-use-measure";
import { HoverButton } from "../HoverButton";
import { faker } from "@faker-js/faker";
import { CSSProperties, useEffect, useRef, useState } from "react";
import { useAnimate } from "framer-motion";

const NavigateButton: React.FC<{
   direction: "left" | "right";
   onClick: () => void;
}> = (props) => {
   return (
      <div
         className={cn(
            "gradiant-50 absolute top-0 z-[110] flex h-full w-20 items-center justify-end overflow-visible isolate",
            {
               "left-0 rotate-180": props.direction === "left",
               "right-0": props.direction === "right",
            }
         )}
      >
         <HoverButton
            className={cn("aspect-square h-9 p-2")}
            onClick={props.onClick}
         >
            <BsChevronRight color="white" className="h-full w-full" />
         </HoverButton>
      </div>
   );
};

export const KeywordLinks: React.FC<{fixed?: boolean }> = (props) => {
   const words = useRef<Array<string>>(
      Array(30)
         .fill(null)
         .map(() => faker.word.noun())
   );

   const [selectedIndex, setSelectedIndex] = useState(0);

   // position fixed elements are wierd and using JS measurements can make
   // things easier.
   const [ref, bounds] = useMeasure();

   const [animateRef, animate] = useAnimate();
   return (
      <div
         ref={ref}
         className="grow-1 relative mb-2 h-8 w-auto shrink-0 md:h-12 left-0"
         suppressHydrationWarning
      >
         <div
            className="bg-dark-800 flex flex-nowrap items-start gap-2 opacity-100 z-[400]"
            style={{
               position: props.fixed ? "fixed" : "relative",
               width: bounds.width,
               height: bounds.height,
            }}
            suppressHydrationWarning
         >
            <NavigateButton
               direction="left"
               onClick={() => {
                  animate(
                     animateRef.current,
                     {
                        left: "3.4rem",
                        right: "auto",
                     } satisfies CSSProperties,
                  );
               }}
            />
            <div className="relative h-full w-full overflow-hidden">
               <div
                  ref={animateRef}
                  className="absolute flex h-full items-center gap-2"
               >
                  {words.current.map((word, idx) => (
                     <div
                        key={word}
                        title={word}
                        onClick={() => {
                           setSelectedIndex(idx);
                        }}
                        className={cn(
                           "flex h-9 w-fit items-center justify-center rounded-lg bg-white/10 p-2 text-center text-sm",
                           "cursor-pointer whitespace-nowrap transition-colors hover:bg-white/30",
                           {
                              "bg-white text-black": selectedIndex === idx,
                           }
                        )}
                     >
                        {word}
                     </div>
                  ))}
               </div>
            </div>
            <NavigateButton
               direction="right"
               onClick={() => {
                  animate(
                     animateRef.current,
                     {
                        left: "auto",
                        right: "3.4rem",
                     } satisfies CSSProperties,
                  );
               }}
            />
         </div>
      </div>
   );
};
