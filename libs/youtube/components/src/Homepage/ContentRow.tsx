"use client";

import { cn } from "@shared/utils/cn";
import { PropsWithChildren, useState } from "react";
import { VideoThumbnailCard } from "./VideoThumbnailCard";
import useMeasure from "react-use-measure";
import { useIsomorphicLayoutEffect } from "framer-motion";

export const ContentRow: React.FC<PropsWithChildren> = (props) => {
   const [elements, setElements] = useState<React.ReactElement[]>();
   const [ref, bounds] = useMeasure();

   useIsomorphicLayoutEffect(() => {
      if (bounds.width > 1200) {
         setElements([
            <VideoThumbnailCard key={1} />,
            <VideoThumbnailCard key={2} />,
            <VideoThumbnailCard key={3} />,
            <VideoThumbnailCard key={4} />,
         ]);
         return;
      }
      if (bounds.width > 900) {
         setElements([
            <VideoThumbnailCard key={1} />,
            <VideoThumbnailCard key={2} />,
            <VideoThumbnailCard key={3} />,
         ]);
         return;
      }
      if (bounds.width > 520) {
         setElements([
            <VideoThumbnailCard key={1} />,
            <VideoThumbnailCard key={2} />,
         ]);
         return;
      }
      setElements([<VideoThumbnailCard key={1} />]);
   }, [bounds.width]);

   return (
      <div ref={ref} className={cn("flex h-80 justify-center gap-4")}>
         {elements}
      </div>
   );
};
