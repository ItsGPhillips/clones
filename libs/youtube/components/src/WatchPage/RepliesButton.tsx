"use client";

import { useButton } from "@react-aria/button";
import { useRef } from "react";
import { BsCaretRightFill } from "react-icons/bs";
import { useBoolean } from "usehooks-ts";
import { Comment } from "./Comment";

// @ts-ignore
import { useCommentQuery } from "@youtube/shared/hooks/useCommentQuery";

export const CommentReplies = (props: {
   commendId: string;
   videoId: string;
}) => {
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

   const { data } = useCommentQuery(props.commendId);

   return (
      <>
         {data && data.length > 0 && (
            <button
               ref={ref}
               className="flex cursor-pointer items-center rounded-full px-3 py-1 my-2 decoration-blue-400 outline-none hover:bg-blue-500/20"
               {...buttonProps}
            >
               <span
                  className={
                     showComments.value ? "-translate-y-[2px] rotate-180" : ""
                  }
               >
                  <BsCaretRightFill className="rotate-90 fill-blue-500" />
               </span>
               <div className="text-sm font-bold text-blue-500">
                  {data.length} Replies
               </div>
            </button>
         )}
         {showComments.value && (
            <div className="flex w-full flex-col">
               {data?.map((comment) => {
                  return <Comment comment={comment} />;
               })}
            </div>
         )}
      </>
   );
};
