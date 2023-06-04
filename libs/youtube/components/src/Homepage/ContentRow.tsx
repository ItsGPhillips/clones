"use client";

import { cn } from "@shared/utils/cn";
import {
   PropsWithChildren,
   useMemo,
   useRef,
} from "react";
import { VideoCardWithSuspense } from "./VideoCard";
import useMeasure from "react-use-measure";
import { useButton } from "@react-aria/button";
import { DownChevronIcon } from "@youtube/icons/DownChevronIcon";
import { TooltipContainer } from "@shared/components/Tooltip";
import { useSupabase } from "../Supabase";
import { useQuery } from "@tanstack/react-query";

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
   const { supabase } = useSupabase();
   const [ref, bounds] = useMeasure();

   const { data } = useQuery(
      ["content", "random_videos", props.role],
      async () => {
         const { data, error } = await supabase.rpc("get_random_videos", {
            param_num_videos: 4,
         });
         if (error) throw error;
         return data;
      },
      {
         cacheTime: Infinity,
         staleTime: Infinity,
      }
   );

   const what = useMemo(() => {
      return (
         data?.map((id) => {
            return (
               <VideoCardWithSuspense key={id.video_id} videoId={id.video_id} />
            );
         }) ?? []
      );
   }, [data?.length ?? 0]);

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
            {what.slice(0, numVideos)}
         </div>
         <ShowMoreButton />
         <Seperator />
      </div>
   );
};
