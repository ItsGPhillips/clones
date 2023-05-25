"use client";

import { HoverButton } from "../HoverButton";
import { AiOutlineMenu } from "react-icons/ai";

import { useButton } from "@react-aria/button";
import { useRef } from "react";
import { SIDEBAR_TOGGLE_EVENT } from ".";

export const SideBarTrigger: React.FC<{}> = () => {
   const ref = useRef<HTMLButtonElement>(null);
   const { buttonProps } = useButton(
      {
         onPress() {
            document.dispatchEvent(SIDEBAR_TOGGLE_EVENT);
         },
      },
      ref
   );
   return (
      <HoverButton ref={ref} className="h-10 w-10 p-2" {...buttonProps}>
         <AiOutlineMenu />
      </HoverButton>
   );
};
