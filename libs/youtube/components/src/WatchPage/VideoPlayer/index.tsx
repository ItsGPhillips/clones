import { serverGetVideoData } from "@youtube/supabase";
import { Player } from "./Player";

export const VideoPlayer = async (props: { videoId: string }) => {
   const data = await serverGetVideoData(props.videoId);
   return <Player data={data} videoId={props.videoId} />;
};
