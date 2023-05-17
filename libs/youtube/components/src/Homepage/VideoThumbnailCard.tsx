"use client";

import { motion } from "framer-motion";
import { Avatar } from "../Avatar";
import theme from "tailwindcss/defaultTheme";
import { cn } from "@shared/utils/cn";
import { useHover } from "@react-aria/interactions";
import { useState, useRef } from "react";

const thumbnails = ["dUbDXp9YxPY", "tFdnCzfJPJ0", "ahCwqrYpIuM", "erEgovG9WBs"];

export const VideoPreview: React.FC = () => {
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
      },
   });

   const image = useRef(
      `https://img.youtube.com/vi/${
         thumbnails[Math.floor(Math.random() * 3)]
      }/0.jpg`
   );

   return (
      <motion.div
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
               <div className="flex h-full w-full items-center justify-center bg-white/20">
                  VIDEO
               </div>
            </>
         ) : (
            <>
               <div className="flex h-full w-full items-center justify-center bg-white/50">
                  THUMBNAIL
               </div>
               {/* <NextImage src={image.current} alt="" fill /> */}
               <span className="bg-dark-800/80 absolute right-0 bottom-0 m-2 rounded p-1 text-xs">
                  12:34
               </span>
            </>
         )}
      </motion.div>
   );
};

export const VideoThumbnailCard: React.FC = () => {
   return (
      <div className={cn("flex max-w-sm flex-1 flex-col items-center gap-2")}>
         <VideoPreview />
         <div className="relative flex flex-row gap-2 self-start">
            <Avatar className="self-start" firstName="TEST" imageUrl={null} />
            <div className="flex max-w-[15rem] flex-col">
               <span className="text-md line-clamp-2 mb-1 font-bold">
                  This is a test video!!! [EXTREME] 😂😂😂😂 CLICKBAIT
               </span>
               <span className="text-sm font-light text-white/60">
                  No One Watches
               </span>
               <span className="text-sm font-light text-white/60">
                  555k views • 3 months ago{" "}
               </span>
            </div>
         </div>
      </div>
   );
};

const VideoCard_1: React.FC = () => {
   return (
      <div className="flex flex-col gap-2">
         <motion.div
            className={cn("overflow-hidden bg-red-400", "h-48 w-[360px]")}
            animate={{
               borderRadius: theme.borderRadius["xl"],
            }}
         ></motion.div>
         <div className="relative flex flex-row gap-2">
            <Avatar className="self-start" firstName="TEST" imageUrl={null} />
            <div className="flex max-w-[15rem] flex-col">
               <span className="text-md mb-1 font-bold">
                  This is a test video!!! [EXTREME] 😂😂😂😂 CLICKBAIT
               </span>
               <span className="text-sm font-light text-white/60">
                  No One Watches
               </span>
               <span className="text-sm font-light text-white/60">
                  555k views • 3 months ago{" "}
               </span>
            </div>
         </div>
      </div>
   );
};
