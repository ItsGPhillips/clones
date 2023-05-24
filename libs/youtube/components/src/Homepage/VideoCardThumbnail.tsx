"use client";

import { motion } from "framer-motion";
import theme from "tailwindcss/defaultTheme";
import { useHover } from "@react-aria/interactions";
import { useState, useRef } from "react";
import NextImage from "next/image";
import useMeasure from "react-use-measure";

export const VideoCardThumbnail: React.FC<{
   thumbnailUrl: string;
   videoUrl: string;
}> = (props) => {
   const videoRef = useRef<HTMLVideoElement | null>(null);
   const videoCurrentTime = useRef<number>(0);

   const [isHovered, setIsHovered] = useState(false);
   const cancelTimeout = useRef<(reason: any) => void | null>();
   const { hoverProps } = useHover({
      async onHoverStart() {
         try {
            await new Promise((res, rej) => {
               cancelTimeout.current = rej;
               setTimeout(() => {
                  res(null);
               }, 800);
            });
            setIsHovered(true);
         } catch {}
      },
      async onHoverEnd() {
         cancelTimeout.current?.({ onhoverEnd: true });
         setIsHovered(false);
         videoCurrentTime.current = videoRef.current?.currentTime ?? 0;
      },
   });

   const [ref, bounds] = useMeasure();

   return (
      <motion.div
         ref={ref}
         className="relative !aspect-video w-full overflow-hidden"
         initial={{ borderRadius: theme.borderRadius["2xl"] }}
         whileHover={{
            borderRadius: theme.borderRadius["none"],
            boxShadow: theme.boxShadow["lg"],
            scale: 1.04,
            transition: {
               delay: 0.8,
            },
         }}
         {...(hoverProps as any)}
      >
         {isHovered ? (
            <>
               <div className="flex h-full w-full items-center justify-center bg-black">
                  <video
                     ref={videoRef}
                     controls
                     autoPlay
                     onPause={(e) => {
                        videoCurrentTime.current = e.currentTarget.currentTime;
                     }}
                     onPlay={(e) => {
                        e.currentTarget.currentTime = videoCurrentTime.current;
                     }}
                     onEnded={() => {
                        videoCurrentTime.current = 0;
                     }}
                     className="h-full"
                  >
                     <source src={props.videoUrl} type="video/webm" />
                  </video>
               </div>
            </>
         ) : (
            <>
               <NextImage
                  src={props.thumbnailUrl}
                  alt=""
                  width={bounds.width}
                  height={bounds.height}
                  className="h-full w-full object-cover"
               />
               {/* <NextImage src={image.current} alt="" fill /> */}
               <span className="bg-dark-800/80 absolute right-0 bottom-0 m-2 rounded p-1 text-xs">
                  12:34
               </span>
            </>
         )}
      </motion.div>
   );
};
