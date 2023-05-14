import { cn } from "@shared/utils/cn";
import { ComponentPropsWithRef, forwardRef } from "react";

export const HoverButton = forwardRef<
   HTMLButtonElement,
   ComponentPropsWithRef<"button">
>(({ className, ...props }, fRef) => {
   return (
      <button
         ref={fRef}
         {...props}
         className={cn(
            "flex aspect-square items-center justify-center rounded-full bg-transparent outline-none transition-opacity hover:bg-neutral-800 [&>*]:fill-white",
            className
         )}
      >
         {props.children}
      </button>
   );
});
