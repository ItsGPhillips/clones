import { createRouteHandlerSupabaseClient } from '@supabase/auth-helpers-nextjs';
import {
  VIDEO_DATA_SCHEMA,
  VideoData,
} from '@youtube/components/Homepage/ContentRow';
import { env } from '@youtube/env';
import { Database } from '@youtube/supabase';
import { cookies, headers } from 'next/headers';
import { NextResponse } from 'next/server';
import { z } from 'zod';

export const GET = async () => {
  const supabase = createRouteHandlerSupabaseClient<Database>({
    headers,
    cookies,
    supabaseKey: env.SUPABASE_SECRET_KEY,
    supabaseUrl: env.NEXT_PUBLIC_SUPABASE_URL,
  });
  const { data } = await supabase.rpc('get_video_data', {
    param_video_id: 'e55530a8-1499-4c59-bdc4-8795fb464f72',
  });
  return NextResponse.json(data);
};

const POST_BODY_SCHEMA = z.object({
  role: z.enum(['recommended', 'breaking-news', 'subscriptions', 'movies']),
  count: z.number(),
});

export const POST = async (req: Request) => {
  // const body = POST_BODY_SCHEMA.parse(await req.json());
  // const res = await fetch(
  //   `https://boydmgzwehvxxvydovbv.supabase.co/rest/v1/rpc/get_video_data`,
  //   {
  //     method: 'POST',
  //     headers: {
  //       Accept: '*/*',
  //       apikey:
  //         'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJveWRtZ3p3ZWh2eHh2eWRvdmJ2Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY4NDMzMjc0OCwiZXhwIjoxOTk5OTA4NzQ4fQ.4USSmG9ojySaLtDt_Vn6g1011xBmLsZ8zp8a9kLVb5c',
  //       Authorization:
  //         'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJveWRtZ3p3ZWh2eHh2eWRvdmJ2Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY4NDMzMjc0OCwiZXhwIjoxOTk5OTA4NzQ4fQ.4USSmG9ojySaLtDt_Vn6g1011xBmLsZ8zp8a9kLVb5c',
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify({
  //       param_video_id: 'e55530a8-1499-4c59-bdc4-8795fb464f72',
  //     }),
  //   }
  // );

  // let videos: VideoData[] = await Promise.all(
  //   Array(body.count)
  //     .fill(null)
  //     .map(async () => VIDEO_DATA_SCHEMA.parse(await res.json()))
  // );

  // console.log(videos);
  return NextResponse.json([]);
};
