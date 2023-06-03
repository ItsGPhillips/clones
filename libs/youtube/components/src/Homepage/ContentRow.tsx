"use client";

import { cn } from "@shared/utils/cn";
import {
   ComponentPropsWithRef,
   ForwardedRef,
   PropsWithChildren,
   forwardRef,
   useRef,
   useState,
} from "react";
import { VideoCardWithSuspense } from "./VideoCard";
import useMeasure from "react-use-measure";
import { useIsomorphicLayoutEffect } from "framer-motion";
import { useButton } from "@react-aria/button";
import { DownChevronIcon } from "@youtube/icons/DownChevronIcon";
import { TooltipContainer } from "@shared/components/Tooltip";

type Role = "recommended" | "breaking-news" | "subscriptions" | "movies";

const mapRoleToLabel = (role: Role): JSX.Element => {
   let label = "";
   switch (role) {
      case "recommended":
         return <></>;
      case "movies":
         label = "Movies & Tv";
         break;
      case "breaking-news":
         label = "Breaking News";
         break;
      case "subscriptions":
         label = "Subscriptions";
         break;
   }
   return <h2 className="mb-6 mt-1 text-xl">{label}</h2>;
};

const Test = forwardRef(
   (props: ComponentPropsWithRef<"div">, ref: ForwardedRef<HTMLDivElement>) => {
      return (
         <div {...props} ref={ref}>
            <>TEST</>
         </div>
      );
   }
);

const ShowMoreButton: React.FC = () => {
   const portalRef = useRef<HTMLDivElement>(null);
   const ref = useRef<HTMLButtonElement>(null);
   const { buttonProps } = useButton(
      {
         onPress() {
            console.log("test");
         },
      },
      ref
   );
   return (
      <></>
      // <Tooltip.Root delayDuration={500}>
      //    <Tooltip.Trigger className="h-10 w-0 border-2">
      //       {/* <button
      //             ref={ref}
      //             className="flex  items-center justify-center border-2 outline-none transition-colors duration-100 hover:bg-white/20"
      //             {...buttonProps}
      //          >
      //             <DownChevronIcon fill="white" className="h-6 w-6" />
      //          </button> */}
      //    </Tooltip.Trigger>

      //    <PrimaryTooltip
      //       text="see more"
      //       className="border-2 border-purple-400"
      //    />
      // </Tooltip.Root>
   );
};

const Seperator: React.FC = () => {
   return <hr className="border-2 border-white/30" />;
};

export const ContentRow: React.FC<
   PropsWithChildren<{
      title?: string;
      role: Role;
   }>
> = (props) => {
   const [elements, setElements] = useState<React.ReactElement[]>([]);
   const [ref, bounds] = useMeasure();
   useIsomorphicLayoutEffect(() => {
      if (bounds.width > 1200) {
         setElements([
            <VideoCardWithSuspense
               key={1}
               videoId="ea634cf9-4143-4845-ad86-105dce412bf7"
            />,
            <VideoCardWithSuspense
               key={2}
               videoId="ea634cf9-4143-4845-ad86-105dce412bf7"
            />,
            <VideoCardWithSuspense
               key={3}
               videoId="ea634cf9-4143-4845-ad86-105dce412bf7"
            />,
            <VideoCardWithSuspense
               key={4}
               videoId="ea634cf9-4143-4845-ad86-105dce412bf7"
            />,
         ]);
         return;
      }
      if (bounds.width > 900) {
         setElements([
            <VideoCardWithSuspense
               key={1}
               videoId="ea634cf9-4143-4845-ad86-105dce412bf7"
            />,
            <VideoCardWithSuspense
               key={2}
               videoId="ea634cf9-4143-4845-ad86-105dce412bf7"
            />,
            <VideoCardWithSuspense
               key={3}
               videoId="ea634cf9-4143-4845-ad86-105dce412bf7"
            />,
         ]);
         return;
      }
      if (bounds.width > 520) {
         setElements([
            <VideoCardWithSuspense
               key={1}
               videoId="ea634cf9-4143-4845-ad86-105dce412bf7"
            />,
            <VideoCardWithSuspense
               key={2}
               videoId="ea634cf9-4143-4845-ad86-105dce412bf7"
            />,
         ]);
         return;
      }
      setElements([
         <VideoCardWithSuspense
            key={1}
            videoId="ea634cf9-4143-4845-ad86-105dce412bf7"
         />,
      ]);
   }, [bounds.width]);

   return (
      <div className="flex flex-1 flex-col border-2 border-green-400" ref={ref}>
         {mapRoleToLabel(props.role)}
         <div className={cn("flex h-80 justify-center gap-4 text-white")}>
            <>{elements}</>
         </div>
         <ShowMoreButton />
         <Seperator />
      </div>
   );
};
