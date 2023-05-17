"use client";

import { faker } from "@faker-js/faker";
import { cn } from "@shared/utils/cn";
import { useRef } from "react";
import { BsChevronRight } from "react-icons/bs";
import useMeasure from "react-use-measure";
import { HoverButton } from "../HoverButton";

const NavigateButton: React.FC<{ direction: "left" | "right" }> = (props) => {
   return (
      <div
         className={cn("gradiant-50 absolute  top-0 h-9 w-20", {
            "right-0": props.direction === "left",
            "left-0 rotate-180": props.direction === "right",
         })}
      >
         <HoverButton className={cn("float-right aspect-square h-full p-2")}>
            <BsChevronRight color="white" className="h-full w-full" />
         </HoverButton>
      </div>
   );
};

export const KeywordLinks: React.FC = () => {
   const words = useRef(
      Array(20)
         .fill(null)
         .map(() => faker.lorem.word({ length: { min: 5, max: 15 } }))
   );

   // position fixed elements are wierd and using JS measurements can make
   // things easier.
   const [ref, bounds] = useMeasure();

   return (
      <div ref={ref} className="grow-1 relative h-12 w-auto shrink-0 mb-2">
         <div
            className="bg-dark-800 fixed z-[100] flex items-start gap-2 overflow-hidden opacity-100"
            style={{
               width: bounds.width,
               height: bounds.height,
            }}
         >
            <NavigateButton direction="left" />
            {words.current.map((word) => (
               <div
                  key={word}
                  title={word}
                  className={cn(
                     "flex h-9 w-fit items-center justify-center rounded-lg bg-white/10 p-2 text-center text-sm",
                     "cursor-pointer transition-colors hover:bg-white/30"
                  )}
               >
                  {word}
               </div>
            ))}
            <NavigateButton direction="right" />
         </div>
      </div>
   );
};
