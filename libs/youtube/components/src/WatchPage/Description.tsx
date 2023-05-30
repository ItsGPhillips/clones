"use client";

import { useButton } from "@react-aria/button";
import { cn } from "@shared/utils/cn";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import { useRef } from "react";
import { useBoolean } from "usehooks-ts";

// https://stackoverflow.com/questions/9461621/format-a-number-as-2-5k-if-a-thousand-or-more-otherwise-900
const kFormatter = (num: number) => {
   return Math.abs(num) > 999
      ? (Math.sign(num) * (Math.abs(num) / 1000)).toFixed(1) + "k"
      : Math.sign(num) * Math.abs(num);
};

export const Description = (props: {
   views: number;
   uploadDate: Date;
   description: string;
   tags: Array<string>;
}) => {
   const ref = useRef<HTMLDivElement | null>(null);
   const showDescripton = useBoolean(false);
   const { buttonProps } = useButton(
      {
         onPress() {
            showDescripton.toggle();
         },
      },
      ref
   );

   return (
      <div
         ref={ref}
         className="flex cursor-pointer flex-col items-start gap-1 rounded-2xl bg-white/10 p-4 text-sm font-bold transition-colors hover:bg-white/20"
         {...buttonProps}
      >
         <div className="flex items-center gap-2">
            <span>{kFormatter(props.views)} views</span>
            <span>
               {formatDistanceToNow(props.uploadDate, {
                  addSuffix: true,
                  includeSeconds: true,
               })}
            </span>
            <span className="aspect-square w-1 rounded-full bg-white/20" />
            <span className="flex gap-1 font-normal text-white/60">
               {props.tags.map((tag) => (
                  <span>{`#${tag}`}</span>
               ))}
            </span>
         </div>
         <div
            className={cn("font-normal", {
               "line-clamp-2": !showDescripton.value,
            })}
         >
            {props.description}
         </div>
         <span className="outline-none">
            {showDescripton.value ? "Show Less" : "Show More"}
         </span>
      </div>
   );
};