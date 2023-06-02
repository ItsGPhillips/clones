import { Avatar } from "@youtube/components/Avatar";
import { LikeIcon } from "@youtube/icons/LikeIcon";
import { CommentReplies } from "../RepliesButton";
import { ClientStateProvider } from "./ClientStateProvider";
import { CommentMenu } from "./Menu";
import { CommentInfo } from "@youtube/supabase";

export const Comment = (props: { comment: CommentInfo }) => {
   return (
      <ClientStateProvider>
         <div className="h-fit w-fit">
            <Avatar firstName={props.comment.channel_name} imageUrl={null} />
         </div>
         <div className="flex flex-1 flex-col items-start gap-1 pr-16">
            <span className="text-xs font-bold">
               {props.comment.channel_name}
            </span>
            {props.comment.body.split("\n").map((p) => (
               <p key={p} className="max-w-5xl text-sm">
                  {p}
               </p>
            ))}
            <div className="flex items-center gap-2">
               <LikeIcon fill="white" className="h-6 w-6" />
               <span className="flex items-center justify-center text-sm">
                  123
               </span>
               <LikeIcon fill="white" className="h-6 w-6 rotate-180" />
               <span className="ml-4 text-xs font-bold">Reply</span>
            </div>
            <CommentReplies
               commendId={props.comment.id}
               videoId={props.comment.video_id}
            />
         </div>
         <CommentMenu />
      </ClientStateProvider>
   );
};
