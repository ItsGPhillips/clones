"use client";

import { useButton } from "@react-aria/button";
import { useRef } from "react";
import { BsCaretRightFill } from "react-icons/bs";
import { useBoolean } from "usehooks-ts";
import { Comment } from "./Comment";
import useSWR from "swr";
import { useSupabase } from "../Supabase";

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

   const { supabase } = useSupabase();
   const { data } = useSWR(`comment/${props.commendId}`, async () => {
      const { data, error } = await supabase.rpc("get_comment_info", {
         param_video_id: props.videoId,
         param_parent_id: props.commendId,
      });
      if (error) throw error;
      return data ?? [];
   });

   return (
      <>
         {data && data.length > 0 && (
            <button
               ref={ref}
               className="flex cursor-pointer items-center rounded-full p-3 decoration-blue-400 outline-none hover:bg-blue-500/20"
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
