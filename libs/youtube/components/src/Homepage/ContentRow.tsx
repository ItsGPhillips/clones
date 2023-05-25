"use client";

import { cn } from "@shared/utils/cn";
import { PropsWithChildren, useState } from "react";
import { VideoCard } from "./VideoCard";
import useMeasure from "react-use-measure";
import { useIsomorphicLayoutEffect } from "framer-motion";

type Role = "recommended" | "breaking-news" | "subscriptions" | "movies";

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
            <VideoCard
               key={1}
               videoId="e55530a8-1499-4c59-bdc4-8795fb464f72"
            />,
            <VideoCard
               key={2}
               videoId="e55530a8-1499-4c59-bdc4-8795fb464f72"
            />,
            <VideoCard
               key={3}
               videoId="e55530a8-1499-4c59-bdc4-8795fb464f72"
            />,
            <VideoCard
               key={4}
               videoId="e55530a8-1499-4c59-bdc4-8795fb464f72"
            />,
         ]);
         return;
      }
      if (bounds.width > 900) {
         setElements([
            <VideoCard
               key={1}
               videoId="e55530a8-1499-4c59-bdc4-8795fb464f72"
            />,
            <VideoCard
               key={2}
               videoId="e55530a8-1499-4c59-bdc4-8795fb464f72"
            />,
            <VideoCard
               key={3}
               videoId="e55530a8-1499-4c59-bdc4-8795fb464f72"
            />,
         ]);
         return;
      }
      if (bounds.width > 520) {
         setElements([
            <VideoCard
               key={1}
               videoId="e55530a8-1499-4c59-bdc4-8795fb464f72"
            />,
            <VideoCard
               key={2}
               videoId="e55530a8-1499-4c59-bdc4-8795fb464f72"
            />,
         ]);
         return;
      }
      setElements([
         <VideoCard key={1} videoId="e55530a8-1499-4c59-bdc4-8795fb464f72" />,
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
