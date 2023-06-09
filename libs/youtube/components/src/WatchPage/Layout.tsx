"use client";

import { cn } from "@shared/utils/cn";
import {
   PropsWithChildren,
   createContext,
   useContext,
   useMemo,
   useState,
} from "react";
import { useBoolean } from "usehooks-ts";
import { VideoPlayer } from "./VideoPlayer";

export type WatchPageState = {
   cinemaMode: Required<ReturnType<typeof useBoolean>>;
};

const WATCH_PAGE_STATE_CTX = createContext<WatchPageState | null>(null);

export const useWatchPageState = (): WatchPageState => {
   const ctx = useContext(WATCH_PAGE_STATE_CTX);
   if (ctx === null) throw new Error("Context was null");
   return ctx;
};

export const WatchPageLayout: React.FC<
   PropsWithChildren<{
      videoSrcUrl: string;
      recomendations: JSX.Element;
      videoInfo: JSX.Element;
   }>
> = (props) => {
   const cinemaMode = useBoolean(true);

   const videoPlayer = useMemo(() => {
      console.log("called")
      return <VideoPlayer videoSrcUrl={props.videoSrcUrl} />;
   }, [props.videoSrcUrl]);

   return (
      <WATCH_PAGE_STATE_CTX.Provider value={{ cinemaMode }}>
         {cinemaMode.value ? (
            <main className="flex w-full flex-1 flex-col gap-4">
               <div className="h-[var(--theater-screen-height)] w-full grow-0">
                  {videoPlayer}
               </div>
               <div className="mx-[6%] flex flex-1 gap-4">
                  <div className="flex-1 grow">{props.videoInfo}</div>
                  <div className="w-96 shrink-0">{props.recomendations}</div>
               </div>
            </main>
         ) : (
            <main
               className={cn("mx-[6%] flex w-full flex-1 gap-4", {
                  "flex-col": cinemaMode.value,
               })}
            >
               <div className="flex flex-1 flex-col">
                  <div className="aspect-video">{videoPlayer}</div>
                  <div className="flex-1 grow">{props.videoInfo}</div>
               </div>
               <div className="w-96 shrink-0">{props.recomendations}</div>
            </main>
         )}
      </WATCH_PAGE_STATE_CTX.Provider>
   );
};
