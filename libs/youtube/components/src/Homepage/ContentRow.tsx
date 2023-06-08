"use client";

import { cn } from "@shared/utils/cn";
import { PropsWithChildren, useRef } from "react";
import { VideoCard, VideoCardLoading } from "./VideoCard";
import useMeasure from "react-use-measure";
import { useButton } from "@react-aria/button";
import { DownChevronIcon } from "@youtube/icons/DownChevronIcon";
import { TooltipContainer } from "@shared/components/Tooltip";

// @ts-ignore
import { useGetRandomVideosQuery } from "@youtube/shared/hooks/useGetRandomVideosQuery";

type Role = "recommended" | "breaking-news" | "subscriptions" | "movies";

const mapRoleToLabel = (role: Role): JSX.Element => {
   let label = "";
   switch (role) {
      case "recommended":
         return <></>;
      case "movies":
         label = "Movies & Tv";
         break;
      case "breaking-news":
         label = "Breaking News";
         break;
      case "subscriptions":
         label = "Subscriptions";
         break;
   }
   return <h2 className="mb-6 mt-1 text-xl">{label}</h2>;
};

const ShowMoreButton: React.FC = () => {
   const ref = useRef<HTMLButtonElement>(null);
   const { buttonProps } = useButton(
      {
         onPress() {
            console.log("Show more");
         },
      },
      ref
   );
   return (
      <TooltipContainer tooltip="See more" closeDelay={50} className="h-10">
         <button
            ref={ref}
            className="flex h-full w-full items-center justify-center outline-none transition-colors duration-100 hover:bg-white/20"
            {...buttonProps}
         >
            <DownChevronIcon fill="white" className="h-6 w-6" />
         </button>
      </TooltipContainer>
   );
};

const Seperator: React.FC = () => {
   return <hr className="border-2 border-white/30" />;
};

export const ContentRow: React.FC<
   PropsWithChildren<{
      title?: string;
      role: Role;
   }>
> = (props) => {
   const [ref, bounds] = useMeasure();
   const { data } = useGetRandomVideosQuery(props.role);

   console.log(data);

   const elements = Array(4)
      .fill(null)
      .map((_, idx) => {
         const video = data?.[idx];
         if (video !== undefined) {
            return <VideoCard key={video.id} video={video} />;
         }
         return <VideoCardLoading key={idx}/>;
      });

   const numVideos = (() => {
      if (bounds.width > 1200) {
         return 4;
      }
      if (bounds.width > 900) {
         return 3;
      }
      if (bounds.width > 520) {
         return 2;
      }
      return 1;
   })();

   return (
      <div className="flex flex-1 flex-col" ref={ref}>
         {mapRoleToLabel(props.role)}
         <div className={cn("flex h-80 justify-center gap-4 text-white")}>
            {elements.slice(0, numVideos)}
         </div>
         <ShowMoreButton />
         <Seperator />
      </div>
   );
};
