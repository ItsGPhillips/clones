"use client";

import { motion } from "framer-motion";
import { RefObject, useRef, useState, useTransition } from "react";
import { useEventListener, useInterval } from "usehooks-ts";
import { useHover, usePress } from "@react-aria/interactions";
import { mergeProps } from "@react-aria/utils";
import * as Slider from "@shared/components/Slider";
import makeCancellablePromise from "make-cancellable-promise";

const MotionSliderThumb = motion(Slider.Thumb);

const makeCancellableTimeout = (timeout: number) => {
   return makeCancellablePromise(
      new Promise((res) => setTimeout(res, timeout))
   );
};

const makeIsAllowedToUpdate = (
   timeout: number,
   startOnInitalisation: boolean
) => {
   const setup = () => {
      cancelable?.cancel();
      let newCancellable = makeCancellableTimeout(timeout);
      newCancellable.promise.then(() => {
         isAllowed = true;
         isFinishedOrCanceled = true;
      });
      return newCancellable;
   };

   let cancelable = startOnInitalisation ? setup() : undefined;
   let isAllowed = false;
   let isFinishedOrCanceled = startOnInitalisation ? false : true;

   const restartFn = () => {
      cancelable?.cancel();
      cancelable = setup();
      isAllowed = false;
      isFinishedOrCanceled = false;
   };

   return {
      check: (restart?: "on-true" | "on-false" | "any"): boolean => {
         const prev = isAllowed;
         switch (restart) {
            case "on-true": {
               if (prev) {
                  restartFn();
               }
               break;
            }
            case "on-false": {
               if (!prev) {
                  restartFn();
               }
               break;
            }
            case "any": {
               restartFn();
               break;
            }
         }
         return prev;
      },
      cancel: () => {
         cancelable?.cancel();
         isFinishedOrCanceled = true;
      },
      isFinishedOrCancelled: isFinishedOrCanceled,
      restart: restartFn,
   };
};

export const PlaybackScrubber: React.FC<{
   videoRef: RefObject<HTMLVideoElement>;
}> = (props) => {
   const [bufferSegments, setBufferSegments] = useState<JSX.Element[]>([]);
   const [scrubberTime, setScrubberTime] = useState(
      props.videoRef.current?.currentTime ?? 0
   );

   const [_, defered] = useTransition();

   const calculateBufferSegments = () => {
      const duration = props.videoRef.current?.duration ?? 1;
      const segments = Array(props.videoRef.current?.buffered.length)
         .fill(null)
         .map((_, idx) => {
            const start = props.videoRef.current?.buffered.start(idx) ?? 0;
            const end = props.videoRef.current?.buffered.end(idx) ?? 0;
            const style = {
               right: `calc(${((duration - end) / duration) * 100}% + 1rem)`,
               left: `${(start / duration) * 100}%`,
            };
            return (
               <div
                  key={idx}
                  style={style}
                  className="absolute h-full !bg-neutral-400"
               />
            );
         });
      setBufferSegments(segments);
   };

   const isDragging = useRef<boolean>(false);

   useEventListener(
      "timeupdate",
      () => {
         const video = props.videoRef.current;
         if (!video) return;
         if(isDragging.current) return;
         setScrubberTime(video.currentTime);
      },
      props.videoRef
   );

   useInterval(() => {
      defered(calculateBufferSegments);
   }, 1000);

   const { hoverProps, isHovered } = useHover({});

   return (
      <Slider.Root
         dir="ltr"
         value={[scrubberTime]}
         onPointerDown={() => {
            isDragging.current = true;
         }}
         onPointerUp={() => {
            isDragging.current = false;
         }}
         onValueCommit={(n) => {
            const last = n[n.length - 1] ?? 0;
            setScrubberTime(last);
            if (props.videoRef.current) {
               props.videoRef.current.currentTime = last;
            }
         }}
         onValueChange={(n) => {
            const last = n[n.length - 1] ?? 0;
            setScrubberTime(last);
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
            {...(mergeProps(hoverProps) as any)}
         >
            <Slider.Track className="relative h-full w-full bg-black/50">
               <div className="absolute inset-0">{bufferSegments}</div>
               <Slider.Range className="absolute h-full bg-red-600"></Slider.Range>
            </Slider.Track>
            <MotionSliderThumb
               className="pointer-events-none rounded-full bg-red-800 shadow-sm shadow-black outline-none"
               animate={{
                  width: "0.8rem",
                  height: "0.8rem",
                  opacity: isHovered ? 1 : 0,
                  scale: isHovered ? 1.1 : 1,
               }}
            />
         </motion.div>
      </Slider.Root>
   );
};
