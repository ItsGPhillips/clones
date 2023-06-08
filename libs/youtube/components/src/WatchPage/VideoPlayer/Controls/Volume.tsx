"use client";

import { useAnimate, AnimationPlaybackControls } from "framer-motion";
import { RefObject, useRef, useState } from "react";
import {
   BiVolumeFull,
   BiVolumeMute,
   BiVolumeLow,
   BiVolume,
} from "react-icons/bi";
import { useHover, useScrollWheel } from "@react-aria/interactions";
import { Button } from "./Button";
import * as Slider from "@shared/components/Slider";

export const VolumeControls: React.FC<{
   videoRef: RefObject<HTMLVideoElement>;
}> = (props) => {
   const [ref, animate] = useAnimate();
   const currentAnimation = useRef<AnimationPlaybackControls>();
   const [volumeElement, setVolumeElement] = useState(
      <BiVolumeFull fill="white" className="h-6 w-6" />
   );
   const [isMuted, setIsMuted] = useState(false);
   
   const [volume, setVolume] = useState<number>(
      props.videoRef.current?.volume ?? 0.5
   );

   useScrollWheel(
      {
         onScroll(e) {
            if (!props.videoRef.current) return;
            const delta = 1 / e.deltaY;
            const newVolume = Math.max(
               Math.min(props.videoRef.current.volume + delta, 1),
               0
            );
            props.videoRef.current.volume = newVolume;
            console.log(newVolume);
         },
      },
      ref
   );

   // useEffect(() => {
   //    if (!props.videoRef.current) return;
   //    while (props.videoRef.current.volume !== volume) {
   //       if (props.videoRef.current.volume > volume) {
   //          props.videoRef.current.volume -= 0.01;
   //       } else {
   //          props.videoRef.current.volume += 0.01;
   //       }
   //    }
   // }, [volume]);

   const { hoverProps } = useHover({
      onHoverStart() {
         currentAnimation.current = animate(
            ref.current,
            { width: "5rem" },
            { ease: [0, 1, 0, 1], duration: 0.2 }
         );
      },
      onHoverEnd() {
         animate(
            ref.current,
            { width: "0px" },
            { ease: "linear", duration: 0.2 }
         );
      },
   });

   return (
      <div
         className="flex h-10 items-center place-self-center overflow-hidden"
         {...hoverProps}
      >
         <Button
            onPress={() => {
               if (!props.videoRef.current) return;
               props.videoRef.current.muted = !props.videoRef.current.muted;
               setIsMuted(props.videoRef.current.muted);
            }}
         >
            {isMuted ? (
               <BiVolumeMute fill="white" className="h-6 w-6" />
            ) : (
               volumeElement
            )}
         </Button>
         <div ref={ref} className="h-full">
            <Slider.Root
               value={[props.videoRef.current?.volume ?? 0]}
               onValueChange={(e) => {
                  const last = e[e.length - 1] ?? 0;
                  if (props.videoRef.current) {
                     props.videoRef.current.volume = last;
                     // setVolume(last);
                  }

                  if (last > 0.5) {
                     setVolumeElement(
                        <BiVolumeFull fill="white" className="h-6 w-6" />
                     );
                     return;
                  }
                  if (last > 0) {
                     setVolumeElement(
                        <BiVolumeLow fill="white" className="h-6 w-6" />
                     );
                     return;
                  }
                  setVolumeElement(
                     <BiVolume fill="white" className="h-6 w-6" />
                  );
               }}
               defaultValue={[0.5]}
               max={1}
               step={0.01}
               className="justify-stretch relative flex h-full w-[5rem] select-none items-center"
            >
               <Slider.Track className="relative h-1 grow overflow-hidden rounded-full bg-white/20">
                  <Slider.Range className="absolute h-1 grow bg-white" />
               </Slider.Track>
               <Slider.Thumb className="block h-3 w-3 rounded-full bg-white outline-none" />
            </Slider.Root>
         </div>
      </div>
   );
};
