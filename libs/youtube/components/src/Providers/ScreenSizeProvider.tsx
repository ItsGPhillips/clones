"use client";

import { PropsWithChildren, createContext, useEffect } from "react";
import { useMediaQuery } from "usehooks-ts";

const SCREEN_SIZE_CTX = createContext<{} | null>(null);

const t = new EventTarget();

type ScreenSizeEvent = "";

class ScreenSizeListener extends EventTarget {
   override addEventListener(
      type: ScreenSizeEvent,
      callback: EventListenerOrEventListenerObject | null,
      options?: boolean | AddEventListenerOptions
   ): void {
      super.addEventListener(type, callback, options);
   }
}

export const ScreenSizeProvider: React.FC<PropsWithChildren> = (props) => {
   const isSmallScreen = useMediaQuery("(max-width: 768px)");
   const isMediumScreen = useMediaQuery("(min-width: 992px)");
   const isLargeScreen = useMediaQuery("(min-width: 1200px)");

   return (
      <SCREEN_SIZE_CTX.Provider value={null}>
         {props.children}
      </SCREEN_SIZE_CTX.Provider>
   );
};
