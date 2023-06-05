"use client"

import { motion } from "framer-motion";
import { RefObject, useState, useTransition } from "react";
import { useEventListener, useInterval } from "usehooks-ts";
import {useHover } from "@react-aria/interactions"
import * as Slider from "@shared/components/Slider"

export const PlaybackScrubber: React.FC<{ videoRef: RefObject<HTMLVideoElement> }> = (
   props
) => {
   const [playheadLength, setPlayheadLength] = useState(0);
   const [bufferSegments, setBufferSegments] = useState<JSX.Element[]>([]);

   const [_, defered] = useTransition();

   const calculateBufferSegments = () => {
      const duration = props.videoRef.current?.duration ?? 1;
      const segments = Array(props.videoRef.current?.buffered.length)
         .fill(null)
         .map((_, idx) => {
            const start = props.videoRef.current?.buffered.start(idx) ?? 0;
            const end = props.videoRef.current?.buffered.end(idx) ?? 0;
            const style = {
               right: `calc(${((duration - end) / duration) * 100}%) + 1rem`,
               left: `${(start / duration) * 100}%`,
            };
            return (
               <div style={style} className="absolute h-full !bg-neutral-400" />
            );
         });
      setBufferSegments(segments);
   };

   useEventListener(
      "timeupdate",
      () => {
         const video = props.videoRef.current;
         if (!video) return;
         setPlayheadLength((video.currentTime / video.duration) * 100);
      },
      props.videoRef
   );

   useInterval(() => {
      defered(calculateBufferSegments);
   }, 1000);

   const { hoverProps, isHovered } = useHover({});

   return (
      <Slider.Root
         value={[props.videoRef.current?.currentTime ?? 0]}
         onValueChange={(n) => {
            const last = n[n.length - 1] ?? 0;
            if (props.videoRef.current) {
               props.videoRef.current.currentTime = last;
            }
         }}
         defaultValue={[0]}
         min={0}
         max={props.videoRef.current?.duration ?? 0}
         step={1}
         asChild
      >
         <motion.div
            className="absolute bottom-[100%] flex w-full select-none items-center"
            animate={{ height: isHovered ? "0.6rem" : "0.3rem" }}
            transition={{ duration: 0.2 }}
            {...(hoverProps as any)}
         >
            <Slider.Track className="relative h-full w-full">
               <Slider.Range className="absolute h-full w-full grow bg-black/50">
                  <div className="relative h-[inherit] w-full">
                     {bufferSegments}
                     <motion.div
                        className="absolute left-0 h-full bg-red-600"
                        animate={{
                           width: `${playheadLength}%`,
                        }}
                     />
                  </div>
               </Slider.Range>
            </Slider.Track>
            <Slider.Thumb asChild>
               <motion.div
                  className="rounded-full bg-red-800 shadow-sm shadow-black outline-none"
                  animate={{
                     width: "0.8rem",
                     height: "0.8rem",
                     opacity: isHovered ? 1 : 0,
                     scale: isHovered ? 1.1 : 1,
                  }}
               />
            </Slider.Thumb>
         </motion.div>
      </Slider.Root>
   );
};

