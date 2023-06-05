import { motion } from "framer-motion";
import { RefObject } from "react";
import { AiOutlineStepForward } from "react-icons/ai";
import { BiPause, BiPlay, BiCaptions, BiRectangle, BiFullscreen } from "react-icons/bi";
import { GrBackTen, GrForwardTen } from "react-icons/gr";
import { IoMdSettings } from "react-icons/io";
import { RiPictureInPictureFill } from "react-icons/ri";
import { Button } from "./Button";
import { VolumeControls } from "./Volume";
import { PlaybackScrubber } from "./Scrubber";
import { PlaybackMeter } from "./PlaybackMeter";

export const Controls: React.FC<{
   videoRef: RefObject<HTMLVideoElement>;
   isPlaying: boolean;
   controls: {
      setPlayPosition: (delta: number) => void;
      togglePlayback: () => void;
      toggleFullscreen: () => void;
   };
}> = (props) => {
   return (
      <motion.div
         className="bg-dark-800/80 absolute bottom-0 flex h-12 w-full flex-nowrap"
         initial={{ opacity: 0 }}
         animate={{ opacity: 1 }}
         exit={{ opacity: 0 }}
         transition={{
            duration: 0.1,
         }}
      >
         <div className="flex flex-nowrap gap-2">
            <Button
               onPress={() => {
                  props.controls.setPlayPosition(-10);
               }}
            >
               <GrBackTen
                  fill="white"
                  stroke="white"
                  className="h-6 w-6 scale-90 [&>*]:stroke-white"
               />
            </Button>
            <Button onPress={props.controls.togglePlayback}>
               {props.isPlaying ? (
                  <BiPause className="h-6 w-6 scale-150" />
               ) : (
                  <BiPlay className="h-6 w-6 scale-150" />
               )}
            </Button>
            <Button
               onPress={() => {
                  props.controls.setPlayPosition(10);
               }}
            >
               <GrForwardTen
                  fill="white"
                  className="h-6 w-6 scale-90 [&>*]:stroke-white"
               />
            </Button>
            <Button>
               <AiOutlineStepForward fill="white" className="h-6 w-6" />
            </Button>
            <VolumeControls videoRef={props.videoRef} />
            <PlaybackMeter videoRef={props.videoRef} />
         </div>
         <div className="ml-auto flex flex-nowrap gap-2">
            {/* <Button>Auto</Button> */}
            <Button>
               <BiCaptions fill="white" className="h-6 w-6" />
            </Button>
            <Button>
               <IoMdSettings fill="white" className="h-6 w-6" />
            </Button>
            <Button
               onPress={() => {
                  props.videoRef.current?.requestPictureInPicture();
               }}
            >
               <RiPictureInPictureFill fill="white" className="h-6 w-6" />
            </Button>
            <Button>
               <BiRectangle fill="white" className="h-6 w-6" />
            </Button>
            <Button
               onPress={() => {
                  props.controls.toggleFullscreen();
               }}
            >
               <BiFullscreen fill="white" className="h-6 w-6" />
            </Button>
         </div>
         <PlaybackScrubber videoRef={props.videoRef} />
      </motion.div>
   );
};
