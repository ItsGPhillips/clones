"use client"

import { AriaButtonProps, useButton } from "@react-aria/button";
import { PropsWithChildren, useRef } from "react";

export const Button: React.FC<PropsWithChildren<AriaButtonProps>> = (props) => {
   const ref = useRef<HTMLButtonElement>(null);
   const { buttonProps } = useButton(props, ref);
   return (
      <button
         ref={ref}
         className="flex aspect-square w-10 items-center justify-center text-white outline-none"
         {...buttonProps}
      >
         {props.children}
      </button>
   );
};