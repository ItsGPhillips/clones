import { BiRectangle } from "react-icons/bi";
import { Button } from "./Button";
import { useWatchPageState } from "../../Layout";
import { RefObject } from "react";

export const TheaterModeButton: React.FC<{
   updateState: () => void;
}> = (props) => {
   const state = useWatchPageState();
   return (
      <Button
         onPress={() => {
            props.updateState();
            state.cinemaMode.toggle();
         }}
      >
         <BiRectangle fill="white" className="h-6 w-6" />
      </Button>
   );
};
