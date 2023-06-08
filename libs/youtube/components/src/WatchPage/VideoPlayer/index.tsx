"use client";

import { AnimatePresence, motion, useAnimate } from "framer-motion";
import { useCallback, useRef, useState } from "react";
import makeCancellable from "make-cancellable-promise";
import { usePress } from "@react-aria/interactions";
import { mergeProps, mergeRefs } from "@react-aria/utils";
import { BiPause, BiPlay } from "react-icons/bi";
import { Controls } from "./Controls";

const makeCancelableTimeout = (timeout: number) => {
   return makeCancellable(
      new Promise((res) => {
         setTimeout(res, timeout);
      })
   );
};

export const VideoPlayer: React.FC<{
   videoSrcUrl?: string;
}> = (props) => {
   const containerRef = useRef<HTMLDivElement>(null);
   const ref = useRef<HTMLVideoElement>(null);
   const [showControls, setShowControls] = useState(false);
   const timeout = useRef<ReturnType<typeof makeCancelableTimeout>>();

   const [isPlaying, setIsPlaying] = useState(false);
   const isFullscreen = useRef(false);

   const togglePlayback = useCallback(() => {
      if (!ref.current) return;
      if (isPlaying) {
         ref.current.pause();
      } else {
         ref.current.play();
      }
      setIsPlaying(!isPlaying);
   }, [isPlaying]);

   const setPlayPosition = useCallback((delta: number) => {
      if (!ref.current) return;
      ref.current.currentTime += delta;
      console.log(ref.current.currentTime);
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
         console.log("clicked");
         togglePlayback();
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
            setShowControls(!isPlaying);
         },
      },
      pressProps
   );

   return (
      <motion.div
         animate={{ outlineWidth: 0 }}
         ref={mergeRefs(containerRef, animateRef)}
         className="relative w-full overflow-hidden rounded-xl outline outline-black/0"
      >
         <video
            ref={ref}
            key={props.videoSrcUrl}
            className="aspect-video w-full bg-black"
            {...mergedProps}
         >
            <source
               src={`${props.videoSrcUrl}.webm`}
               type="video/webm"
            />
         </video>

         <AnimatePresence>
            <Controls
               videoRef={ref}
               isPlaying={isPlaying}
               controls={{
                  setPlayPosition,
                  togglePlayback,
                  toggleFullscreen,
               }}
            />
         </AnimatePresence>
         <PlayPauseMarker key={String(isPlaying)} isPlaying={isPlaying} />
      </motion.div>
   );
};

const PlayPauseMarker: React.FC<{ isPlaying: boolean }> = (props) => {
   return (
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
         <motion.span
            initial={{ opacity: 0, outlineWidth: "0px" }}
            animate={{ opacity: [0, 1, 0], outlineWidth: ["0px", "16px"] }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="bg-dark-800/70 outline-dark-800/30 flex aspect-square w-20 items-center justify-center rounded-full outline"
         >
            {props.isPlaying ? (
               <BiPlay className="h-6 w-6 translate-x-1 scale-[2.2]" />
            ) : (
               <BiPause className="h-6 w-6 scale-[2.2]" scale={2} />
            )}
         </motion.span>
      </div>
   );
};