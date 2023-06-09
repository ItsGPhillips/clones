"use client";

import { Portal } from "@shared/components/Portal";
import { useIsClient } from "usehooks-ts";
import { RefObject } from "react";

export const PortalHelper: React.FC<{
   container: RefObject<HTMLElement>;
   children?: JSX.Element;
}> = (props) => {
   const isClient = useIsClient();
   return (
      <>
         {isClient && (
            <Portal container={props.container.current} asChild>
               {props.children}
            </Portal>
         )}
      </>
   );
};
