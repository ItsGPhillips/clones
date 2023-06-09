"use client";

import { cn } from "@shared/utils/cn";
import { PropsWithChildren, createContext, useContext, useState } from "react";
import { useBoolean } from "usehooks-ts";
import { VideoPlayer } from "./VideoPlayer";

export type WatchPageState = {
   cinemaMode: ReturnType<typeof useBoolean>;
   currentTime: number;
   setCurrentTime: (value: number) => void;
   isPaused: ReturnType<typeof useBoolean>;
};

const WATCH_PAGE_STATE_CTX = createContext<WatchPageState | null>(null);

export const useWatchPageState = (): WatchPageState => {
   const ctx = useContext(WATCH_PAGE_STATE_CTX);
   if (ctx === null) throw new Error("Context was null");
   return ctx;
};

export const WatchPageLayout: React.FC<
   PropsWithChildren<{
      recomendations: JSX.Element;
      videoInfo: JSX.Element;
      videoSrcUrl: string;
   }>
> = (props) => {
   const [currentTime, setCurrentTime] = useState<number>(0);
   const state = {
      cinemaMode: useBoolean(false),
      currentTime,
      setCurrentTime: setCurrentTime,
      isPaused: useBoolean(true),
   } satisfies WatchPageState;

   return (
      <WATCH_PAGE_STATE_CTX.Provider value={state}>
         {state.cinemaMode.value ? (
            <main className="flex w-full flex-1 flex-col gap-4">
               <div className="h-[var(--theater-screen-height)] w-full grow-0">
                  <VideoPlayer videoSrcUrl={props.videoSrcUrl} />
               </div>
               <div className="mx-[6%] flex flex-1 gap-4">
                  <div className="flex-1 grow">{props.videoInfo}</div>
                  <div className="w-96 shrink-0">{props.recomendations}</div>
               </div>
            </main>
         ) : (
            <main
               className={cn("mx-[6%] flex w-full flex-1 gap-4", {
                  "flex-col": state.cinemaMode.value,
               })}
            >
               <div className="flex flex-1 flex-col">
                  <div className="aspect-video">
                     <VideoPlayer videoSrcUrl={props.videoSrcUrl} />
                  </div>
                  <div className="flex-1 grow">{props.videoInfo}</div>
               </div>
               <div className="w-96 shrink-0">{props.recomendations}</div>
            </main>
         )}
      </WATCH_PAGE_STATE_CTX.Provider>
   );
};
