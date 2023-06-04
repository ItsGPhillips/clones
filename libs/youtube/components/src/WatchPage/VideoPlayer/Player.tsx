"use client";

import { serverGetVideoData } from "@youtube/supabase";
import {
   AnimatePresence,
   AnimationPlaybackControls,
   motion,
   useAnimate,
} from "framer-motion";
import {
   PropsWithChildren,
   useCallback,
   useEffect,
   useMemo,
   useRef,
   useState,
} from "react";
import { RefObject } from "react";

import makeCancellable from "make-cancellable-promise";
import { useHover, useMove, usePress } from "@react-aria/interactions";
import { mergeProps } from "@react-aria/utils";

import {
   BiFullscreen,
   BiCaptions,
   BiRectangle,
   BiPause,
   BiPlay,
   BiVolume,
   BiVolumeLow,
   BiVolumeFull,
   BiVolumeMute,
} from "react-icons/bi";
import { IoMdSettings } from "react-icons/io";
import { RiPictureInPictureFill } from "react-icons/ri";
import { GrForwardTen, GrBackTen } from "react-icons/gr";
import { AiOutlineStepForward } from "react-icons/ai";
import { AriaButtonProps, useButton } from "@react-aria/button";
import * as Slider from "@shared/components/Slider";
import { fmtMSS } from "@shared/utils/formatMSS";

const PREFIX =
   "https://boydmgzwehvxxvydovbv.supabase.co/storage/v1/object/public/youtube";

const makeCancelableTimeout = (timeout: number) => {
   return makeCancellable(
      new Promise((res) => {
         setTimeout(res, timeout);
      })
   );
};

export const Player: React.FC<{
   videoId: string;
   data: Awaited<ReturnType<typeof serverGetVideoData>>;
}> = (props) => {
   const ref = useRef<HTMLVideoElement>(null);
   const [showControls, setShowControls] = useState(false);
   const timeout = useRef<ReturnType<typeof makeCancelableTimeout>>();

   const [isPlaying, setIsPlaying] = useState(false);

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

   const controls = useMemo(
      () => (
         <Controls
            videoRef={ref}
            isPlaying={isPlaying}
            controls={{
               setPlayPosition,
               togglePlayback,
            }}
         />
      ),
      [isPlaying]
   );

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
      <div className="relative w-full overflow-hidden rounded-xl">
         <video
            ref={ref}
            key={props.videoId}
            className="aspect-video max-h-[86vh] w-full bg-black"
            {...mergedProps}
         >
            <source
               src={`${PREFIX}/${props.data?.video_path}`}
               type="video/webm"
            />
         </video>

         <AnimatePresence>{controls}</AnimatePresence>
         <PlayPauseMarker key={String(isPlaying)} isPlaying={isPlaying} />
      </div>
   );
};

const PlaybackMeter: React.FC<{
   videoRef: RefObject<HTMLVideoElement>;
}> = (props) => {
   const [duration, setDuration] = useState("");
   const [currentTime, setCurrentTime] = useState("");

   useEffect(() => {
      const interval = setInterval(() => {
         setCurrentTime(fmtMSS(props.videoRef.current?.currentTime ?? 0));
         setDuration(fmtMSS(props.videoRef.current?.duration ?? 0));
      }, 1000);
      return () => clearInterval(interval);
   }, []);

   return (
      <div className="flex shrink-0 items-center whitespace-nowrap text-sm">
         {currentTime} : {duration}
      </div>
   );
};

const PlayPauseMarker: React.FC<{ isPlaying: boolean }> = (props) => {
   return (
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
         <motion.span
            initial={{ opacity: 0, outlineWidth: "0px" }}
            animate={{ opacity: [0, 1, 0], outlineWidth: ["0px", "20px"] }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
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

const Button: React.FC<PropsWithChildren<AriaButtonProps>> = (props) => {
   const ref = useRef<HTMLButtonElement>(null);
   const { buttonProps } = useButton(props, ref);
   return (
      <button
         ref={ref}
         className="flex aspect-square w-10 items-center justify-center text-white outline-none"
         {...buttonProps}
      >
         {props.children}
      </button>
   );
};

const VolumeControls: React.FC<{
   videoRef: RefObject<HTMLVideoElement>;
}> = (props) => {
   const [ref, animate] = useAnimate();
   const currentAnimation = useRef<AnimationPlaybackControls>();
   const [isMuted, setIsMuted] = useState(false);

   const [volumeElement, setVolumeElement] = useState(
      <BiVolumeFull fill="white" className="h-6 w-6" />
   );

   const { hoverProps } = useHover({
      onHoverStart() {
         currentAnimation.current = animate(
            ref.current,
            { width: "5rem" },
            { ease: "linear", duration: 0.2 }
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
               onValueChange={(e) => {
                  const last = e[e.length - 1] ?? 0;
                  if (props.videoRef.current) {
                     props.videoRef.current.volume = last;
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

const Controls: React.FC<{
   videoRef: RefObject<HTMLVideoElement>;
   isPlaying: boolean;
   controls: {
      setPlayPosition: (delta: number) => void;
      togglePlayback: () => void;
   };
}> = (props) => {
   return (
      <motion.div
         className="bg-dark-800/80 absolute bottom-0 flex h-12 w-full flex-nowrap px-4"
         initial={{ opacity: 0 }}
         animate={{ opacity: 1 }}
         exit={{ opacity: 0 }}
         transition={{
            duration: 0.1,
         }}
      >
         <div className="flex flex-nowrap gap-2">
            <Button
               onPress={() => {
                  props.controls.setPlayPosition(-10);
               }}
            >
               <GrBackTen
                  fill="white"
                  stroke="white"
                  className="h-6 w-6 scale-90 [&>*]:stroke-white"
               />
            </Button>
            <Button onPress={props.controls.togglePlayback}>
               {props.isPlaying ? (
                  <BiPlay className="h-6 w-6 scale-150" />
               ) : (
                  <BiPause className="h-6 w-6 scale-150" />
               )}
            </Button>
            <Button
               onPress={() => {
                  props.controls.setPlayPosition(10);
               }}
            >
               <GrForwardTen
                  fill="white"
                  className="h-6 w-6 scale-90 [&>*]:stroke-white"
               />
            </Button>
            <Button>
               <AiOutlineStepForward fill="white" className="h-6 w-6" />
            </Button>
            <VolumeControls videoRef={props.videoRef} />
            <PlaybackMeter videoRef={props.videoRef} />
         </div>
         <div className="ml-auto flex flex-nowrap gap-2">
            <Button>Auto</Button>
            <Button>
               <BiCaptions fill="white" className="h-6 w-6" />
            </Button>
            <Button>
               <IoMdSettings fill="white" className="h-6 w-6" />
            </Button>
            <Button>
               <RiPictureInPictureFill fill="white" className="h-6 w-6" />
            </Button>
            <Button>
               <BiRectangle fill="white" className="h-6 w-6" />
            </Button>
            <Button>
               <BiFullscreen fill="white" className="h-6 w-6" />
            </Button>
         </div>
      </motion.div>
   );
};
