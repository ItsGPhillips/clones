"use client";

import { HoverButton } from "@youtube/components/HoverButton";
import { CreateIcon } from "@youtube/icons/CreateIcon";
import { HeaderSearchInput } from "./HeaderSearchInput";
import { AiOutlineBell } from "react-icons/ai";
import { Avatar } from "../Avatar";
import { Background, SmallScreenBackground } from "./Background";
import { YoutubeLogoWithSidebarTrigger } from "../Sidebar/YoutubeLogoSection";
import { useMediaQuery } from "usehooks-ts";
import { FiSearch } from "react-icons/fi";
import { useButton } from "@react-aria/button";
import { useRef } from "react";

import { TooltipContainer } from "@shared/components/Tooltip";

const SmallScreenSearchButton: React.FC<{ setSearchIsOpen: () => void }> = (
   props
) => {
   const ref = useRef<HTMLButtonElement | null>(null);
   const { buttonProps } = useButton(
      {
         onPress() {
            props.setSearchIsOpen();
         },
      },
      ref
   );
   return (
      <button
         ref={ref}
         {...buttonProps}
         className="ml-auto flex h-full w-14 items-center justify-center p-2"
      >
         <FiSearch stroke="white" className="h-5 w-5" />
      </button>
   );
};

const SmallScreenHeader = (props: { contryCode: string }) => {
   return (
      <SmallScreenBackground>
         {/* Left Side */}
         <YoutubeLogoWithSidebarTrigger contryCode={props.contryCode} />
         {/* Search */}
         <SmallScreenSearchButton setSearchIsOpen={() => {}} />
         {/* User Section */}
         <Avatar
            firstName="George"
            lastName="Phillips"
            imageUrl={null}
            className="mr-3 md:mr-0"
         />
      </SmallScreenBackground>
   );
};

export const Header = (props: { contryCode: string }) => {
   const small = useMediaQuery("(width < 768px)");

   if (small) {
      return <SmallScreenHeader contryCode={props.contryCode} />;
   }

   return (
      <Background>
         {/* Left Side */}
         <YoutubeLogoWithSidebarTrigger contryCode={props.contryCode} />
         {/* Search */}
         <div className="ml-auto flex w-[40%] max-w-[600px] items-center justify-start md:ml-0">
            <HeaderSearchInput />
         </div>
         {/* User Section */}
         <div className="isolate flex w-fit items-center gap-5">
            <TooltipContainer tooltip="Create">
               <HoverButton className="h-10 w-10 p-2">
                  <CreateIcon fill="white" className="" />
               </HoverButton>
            </TooltipContainer>
            <TooltipContainer tooltip="Notifications">
               <HoverButton className="h-10 w-10 p-2">
                  <AiOutlineBell
                     className="h-full w-full scale-90"
                     fill="white"
                  />
               </HoverButton>
            </TooltipContainer>
            <Avatar
               firstName="George"
               lastName="Phillips"
               imageUrl={null}
               className="mr-3 md:mr-0"
            />
         </div>
      </Background>
   );
};
