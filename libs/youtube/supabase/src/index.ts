import { env } from "@youtube/env";
import type { Database } from "./types";
import { headers, cookies } from "next/headers";
import { createServerComponentSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { cache } from "react";

export { Database } from "./types";

export const createServerComponentClient = () =>
   createServerComponentSupabaseClient<Database>({
      supabaseUrl: env.NEXT_PUBLIC_SUPABASE_URL,
      supabaseKey: env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      headers,
      cookies,
   });

export type Video = Database["public"]["Tables"]["yt_videos"]["Row"];
export type InsertVideo = Database["public"]["Tables"]["yt_videos"]["Insert"];

export type Channel = Database["public"]["Tables"]["yt_channel"]["Row"];
export type InsertChannel =
   Database["public"]["Tables"]["yt_channel"]["Insert"];

export type Comment = Database["public"]["Tables"]["yt_comments"]["Row"];
export type CommentInfo = Database["public"]["Functions"]["get_comment_info"]["Returns"][number]

export type VideoVoteAction =
   Database["public"]["Tables"]["yt_video_likes"]["Row"];

export type CommentVoteAction =
   Database["public"]["Tables"]["yt_comment_vote_actions"]["Row"];

export type VoteAction = Database["public"]["Enums"]["vote_action"];

export const serverGetVideoData = async (videoId: string) => {
   const supabase = createServerComponentClient();
   const { data: info } = await supabase.rpc("get_video_info", {
      param_video_id: videoId,
   });
   const videoData = info?.[0];
   if (!videoData) throw new Error("video data was undefined");
   const { data: likes } = await supabase.rpc("yt_get_like_count_for_video", {
      param_video_id: videoId,
   });
   return { ...videoData, likes };
};
