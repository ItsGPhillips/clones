"use client";

import { AriaButtonProps, useButton } from "@react-aria/button";
import { cn } from "@shared/utils/cn";
import { ForwardedRef, PropsWithChildren, forwardRef, useRef } from "react";
import { mergeRefs } from "@react-aria/utils";

export const PillButton = forwardRef(
   (
      {
         children,
         className,
         ...props
      }: PropsWithChildren<AriaButtonProps<"button">> & { className?: string },
      forwardedRef: ForwardedRef<HTMLButtonElement>
   ) => {
      const ref = useRef<HTMLButtonElement | null>(null);
      const { buttonProps } = useButton(props, ref);
      return (
         <button
            ref={mergeRefs(ref, forwardedRef)}
            {...buttonProps}
            className={cn(
               "flex items-center justify-center gap-2 rounded-full bg-white/10 py-2 px-4 transition-all duration-75 hover:bg-white/20 outline-none",
               className
            )}
         >
            {children}
         </button>
      );
   }
);
