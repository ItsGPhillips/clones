import { env } from "@youtube/env";
import type { Database } from "./types";
export type { Database } from "./types";
import { headers, cookies } from "next/headers";
import { createServerComponentSupabaseClient } from "@supabase/auth-helpers-nextjs";

export const createServerComponentClient = () =>
   createServerComponentSupabaseClient<Database>({
      supabaseUrl: env.NEXT_PUBLIC_SUPABASE_URL,
      supabaseKey: env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      headers,
      cookies,
   });


export type Video = Database["public"]["Tables"]["yt_videos"]["Row"];