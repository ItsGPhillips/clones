import { db } from "@youtube/drizzle/instance";
import { Player } from "./Player";

export const VideoPlayer = async (props: { videoId: string }) => {
   const video = await db.query.Videos.findFirst({
      columns: {
         url: true,
      },
      where: (videos, { eq }) => eq(videos.id, props.videoId),
   });
   return <Player videoSrcUrl={video?.url} />;
};
