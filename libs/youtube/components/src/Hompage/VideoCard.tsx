"use client"

import { motion } from "framer-motion";
import { Avatar } from "../Avatar";
import theme from "tailwindcss/defaultTheme"
import { cn } from "@shared/utils/cn";

export const VideoCard: React.FC = () => {
   return <div className="flex flex-col gap-2">
      <motion.div
         className={cn(
            "bg-red-400 overflow-hidden",
            "w-80 h-48"
         )}
         animate={{
            borderRadius: theme.borderRadius["xl"]
         }}
      >
      </motion.div>
      <div className="relative flex flex-row gap-2">
         <Avatar 
            className="self-start"
            firstName="TEST"
            imageUrl={null}
         />
         <div className="flex flex-col max-w-[15rem]">
            <span className="text-md font-bold mb-1">This is a test video!!! [EXTREME] 😂😂😂😂 CLICKBAIT</span>
            <span className="text-sm text-white/60 font-light">No One Watches</span>
            <span className="text-sm text-white/60 font-light">555k views • 3 months ago </span>
         </div>
      </div>
   </div>
}
