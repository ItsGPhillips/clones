"use client";

import { useButton } from "@react-aria/button";
import { cn } from "@shared/utils/cn";
import { PropsWithChildren, useRef } from "react";
import { useBoolean } from "usehooks-ts";

export const OpenCloseWrapper = (props: PropsWithChildren) => {
   const ref = useRef<HTMLDivElement | null>(null);
   const showDescripton = useBoolean(false);
   const { buttonProps } = useButton(
      {
         onPress() {
            showDescripton.toggle();
         },
      },
      ref
   );

   return (
      <div
         ref={ref}
         data-show-description={String(showDescripton.value)}
         className={cn(
            "flex cursor-pointer flex-col items-start gap-1 rounded-2xl bg-white/10 p-4 text-sm font-bold transition-colors hover:bg-white/20",
            "group"
         )}
         {...buttonProps}
      >
         {props.children}

         <span className="font-sm font-bold text-white">
            {showDescripton.value ? "Show Less" : "Show More"}
         </span>
      </div>
   );
};
