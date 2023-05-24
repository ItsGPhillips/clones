"use client";

import { cn } from "@shared/utils/cn";
import { PropsWithChildren, useState } from "react";
import { VideoCard } from "./VideoCard";
import useMeasure from "react-use-measure";
import { useIsomorphicLayoutEffect } from "framer-motion";
import { z } from "zod";

type Role = "recommended" | "breaking-news" | "subscriptions" | "movies";

export const VIDEO_DATA_SCHEMA = z.object({
   title: z.string(),
   channel_id: z.string(),
   channel_name: z.string(),
   thumbnail_path: z.string(),
   video_path: z.string(),
});
const VIDEO_DATA_ARRAY_SCHEMA = z.array(VIDEO_DATA_SCHEMA);
export type VideoData = z.infer<typeof VIDEO_DATA_SCHEMA>;

export const ContentRow: React.FC<
   PropsWithChildren<{
      title?: string;
      role: Role;
   }>
> = (props) => {
   const [elements, setElements] = useState<React.ReactElement[]>([]);
   const [ref, bounds] = useMeasure();

   useIsomorphicLayoutEffect(() => {
      if (bounds.width > 1200) {
         setElements([
            <VideoCard key={1} />,
            <VideoCard key={2} />,
            <VideoCard key={3} />,
            <VideoCard key={4} />,
         ]);
         return;
      }
      if (bounds.width > 900) {
         setElements([
            <VideoCard key={1} />,
            <VideoCard key={2} />,
            <VideoCard key={3} />,
         ]);
         return;
      }
      if (bounds.width > 520) {
         setElements([
            <VideoCard key={1} />,
            <VideoCard key={2} />,
         ]);
         return;
      }
      setElements([
         <VideoCard key={1} />,
      ]);
   }, [bounds.width]);

   return (
      <div
         ref={ref}
         className={cn("flex h-80 justify-center gap-4 text-white")}
      >
         <>{elements}</>
      </div>
   );
};
