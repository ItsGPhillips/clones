"use client";

import { useButton } from "@react-aria/button";
import { useRef } from "react";
import { BsCaretRightFill } from "react-icons/bs";
import { useBoolean } from "usehooks-ts";
import { Comment } from "./Comment";

export const CommentReplies = () => {
   const showComments = useBoolean(false);
   const ref = useRef<HTMLButtonElement>(null);
   const { buttonProps } = useButton(
      {
         onPress() {
            showComments.toggle();
         },
      },
      ref
   );

   return (
      <>
         <button
            ref={ref}
            className="mt-2 flex cursor-pointer items-center rounded-full p-3 decoration-blue-400 outline-none hover:bg-blue-500/20"
            {...buttonProps}
         >
            <span
               className={
                  showComments.value ? "-translate-y-[2px] rotate-180" : ""
               }
            >
               <BsCaretRightFill className="rotate-90 fill-blue-500" />
            </span>
            <div className="text-sm font-bold text-blue-500">10 Replies</div>
         </button>
         {showComments.value && (
            <div className="flex flex-col w-full">
               <Comment />
               <Comment />
               <Comment />
            </div>
         )}
      </>
   );
};
