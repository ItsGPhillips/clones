"use client";

import {
   AnimatePresence,
   motion,
   useAnimate,
   useIsomorphicLayoutEffect,
} from "framer-motion";
import { memo, useCallback, useMemo, useRef, useState } from "react";
import makeCancellable from "make-cancellable-promise";
import { usePress } from "@react-aria/interactions";
import { mergeProps, mergeRefs } from "@react-aria/utils";
import { BiPause, BiPlay } from "react-icons/bi";
import { Controls } from "./Controls";
import { useWatchPageState } from "../Layout";

const makeCancelableTimeout = (timeout: number) => {
   return makeCancellable(
      new Promise((res) => {
         setTimeout(res, timeout);
      })
   );
};

export const VideoPlayer: React.FC<{
   videoSrcUrl?: string;
}> = memo(
   (props) => {
      const state = useWatchPageState();
      const containerRef = useRef<HTMLDivElement>(null);
      const ref = useRef<HTMLVideoElement>(null);
      const [showControls, setShowControls] = useState(false);
      const timeout = useRef<ReturnType<typeof makeCancelableTimeout>>();
      const isFullscreen = useRef(false);

      const togglePlayback = useCallback(() => {
         state.isPaused.toggle();
      }, [state.isPaused.value]);

      const setPlayPosition = useCallback((delta: number) => {
         if (!ref.current) return;
         ref.current.currentTime += delta;
      }, []);

      const [animateRef, animate] = useAnimate();
      const toggleFullscreen = useCallback(async () => {
         if (!containerRef.current) return;
         if (isFullscreen.current) {
            isFullscreen.current = false;
            document.exitFullscreen();
         } else {
            await animate(animateRef.current, {
               outlineColor: ["rgba(80, 80, 80, 1)", "rgba(80, 80, 80, 0)"],
               outlineWidth: ["0px", "1rem"],
            });
            containerRef.current
               .requestFullscreen({ navigationUI: "hide" })
               .then(() => {
                  isFullscreen.current = true;
               });
         }
      }, []);

      const { pressProps } = usePress({
         onPress() {
            state.isPaused.toggle();
         },
      });

      const mergedProps = mergeProps(
         {
            onMouseMove: () => {
               timeout.current?.cancel();
               setShowControls(true);
               timeout.current = makeCancelableTimeout(2000);
               timeout.current.promise.then(() => {
                  setShowControls(false);
               });
            },
            onMouseLeave: () => {
               timeout.current?.cancel();
               if (!ref.current) return;
               setShowControls(state.isPaused.value);
            },
         },
         pressProps
      );

      /**
       * Runs on first mount. sets the current playback time to the
       * contexts playback position.
       */
      useIsomorphicLayoutEffect(() => {
         if (!ref.current) return;
         ref.current.currentTime = state.currentTime;
      }, []);

      const updateState = () => {
         if (!ref.current) return;
         state.setCurrentTime(ref.current.currentTime);
      };

      useIsomorphicLayoutEffect(() => {
         if (ref.current) {
            if (state.isPaused.value) {
               ref.current.pause();
            } else {
               ref.current.play();
            }
         }
      }, [state.isPaused.value, ref.current]);

      const videoElem = useMemo(() => {
         return (
            <motion.video
               layout
               layoutId="video-player"
               ref={ref}
               key={props.videoSrcUrl}
               className="!aspect-video w-full bg-black"
               {...(mergedProps as any)}
            >
               <source src={`${props.videoSrcUrl}.webm`} type="video/webm" />
            </motion.video>
         );
      }, [props.videoSrcUrl]);

      return (
         <motion.div
            layoutRoot
            animate={{ outlineWidth: 0 }}
            ref={mergeRefs(containerRef, animateRef)}
            className="relative h-full overflow-hidden rounded-xl outline outline-black/0"
         >
            {videoElem}
            <AnimatePresence>
               <Controls
                  videoRef={ref}
                  isPlaying={!state.isPaused.value}
                  controls={{
                     updateState,
                     setPlayPosition,
                     togglePlayback,
                     toggleFullscreen,
                  }}
               />
            </AnimatePresence>
            <PlayPauseMarker
               key={String(state.isPaused.value)}
               isPaused={state.isPaused.value}
            />
         </motion.div>
      );
   },
   (oldProps, newProps) => {
      return oldProps.videoSrcUrl === newProps.videoSrcUrl;
   }
);

const PlayPauseMarker: React.FC<{ isPaused: boolean }> = (props) => {
   return (
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
         <motion.span
            initial={{ opacity: 0, outlineWidth: "0px" }}
            animate={{ opacity: [0, 1, 0], outlineWidth: ["0px", "16px"] }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="bg-dark-800/70 outline-dark-800/30 flex aspect-square w-20 items-center justify-center rounded-full outline"
         >
            {props.isPaused ? (
               <BiPause className="h-6 w-6 scale-[2.2]" scale={2} />
            ) : (
               <BiPlay className="h-6 w-6 translate-x-1 scale-[2.2]" />
            )}
         </motion.span>
      </div>
   );
};
