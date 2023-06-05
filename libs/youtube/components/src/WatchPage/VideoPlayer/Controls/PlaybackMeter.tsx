"use client"

import { fmtMSS } from "@shared/utils/formatMSS";
import { RefObject, useState } from "react";
import { useEventListener } from "usehooks-ts";

export const PlaybackMeter: React.FC<{
   videoRef: RefObject<HTMLVideoElement>;
}> = (props) => {
   const [duration, setDuration] = useState("");
   const [currentTime, setCurrentTime] = useState("");

   useEventListener(
      "timeupdate",
      () => {
         setCurrentTime(fmtMSS(props.videoRef.current?.currentTime ?? 0));
         setDuration(fmtMSS(props.videoRef.current?.duration ?? 0));
      },
      props.videoRef
   );

   return (
      <div className="flex shrink-0 items-center whitespace-nowrap text-sm">
         {currentTime} : {duration}
      </div>
   );
};