"use client";

import { cn } from "@shared/utils/cn";
import { PropsWithChildren, createContext, useContext, useState } from "react";

export type WatchPageState = {
   cinemaMode: [
      Required<ReturnType<typeof useState<boolean>>[0]>,
      Required<ReturnType<typeof useState<boolean>>[1]>
   ];
};

const WATCH_PAGE_STATE_CTX = createContext<WatchPageState | null>(null);

export const useWatchPageState = (): WatchPageState => {
   const ctx = useContext(WATCH_PAGE_STATE_CTX);
   if (ctx === null) throw new Error("Context was null");
   return ctx;
};

export const WatchPageLayout: React.FC<
   PropsWithChildren<{
      videoPlayer: JSX.Element;
      recomendations: JSX.Element;
      videoInfo: JSX.Element;
   }>
> = (props) => {
   const cinemaMode = useState<boolean>(false);
   return (
      <WATCH_PAGE_STATE_CTX.Provider value={{ cinemaMode }}>
         <main
            className={cn("mx-[6%] flex w-full flex-1 gap-4 mt-4", {
               "flex-col": cinemaMode[0],
            })}
         >
            <div className="flex flex-1 flex-col">
               <div className="aspect-video">{props.videoPlayer}</div>
               <div className="flex-1 grow">{props.videoInfo}</div>
            </div>
            <div className="w-96 shrink-0">{props.recomendations}</div>
         </main>
      </WATCH_PAGE_STATE_CTX.Provider>
   );
};
