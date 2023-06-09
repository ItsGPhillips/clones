import { BiRectangle } from "react-icons/bi";
import { Button } from "./Button";
import { useWatchPageState } from "../../Layout";

export const TheaterModeButton = () => {
   const state = useWatchPageState();
   return (
      <Button
         onPress={() => {
            state.cinemaMode.toggle();
         }}
      >
         <BiRectangle fill="white" className="h-6 w-6" />
      </Button>
   );
};
