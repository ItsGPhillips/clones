"use client";

//--- icons
import { HomeIcon } from "@youtube/icons/HomeIcon";
import { SubscriptionsIcon } from "@youtube/icons/SubscriptionsIcon";
import { ShortsIcon } from "@youtube/icons/ShortsIcon";
import { LibraryIcon } from "@youtube/icons/LibraryIcon";
import { HistoryIcon } from "@youtube/icons/HistoryIcon";
import { YourVideosIcon } from "@youtube/icons/YourVideosIcon";
import { WatchLaterIcon } from "@youtube/icons/WatchLaterIcon";
import { LikeIcon } from "@youtube/icons/LikeIcon";
import { TrendingIcon } from "@youtube/icons/TrendingIcon";
import { MusicIcon } from "@youtube/icons/MusicIcon";
import { MoviesAndShowsIcon } from "@youtube/icons/MusicAndShowsIcon";
import { LiveIcon } from "@youtube/icons/LiveIcon";
import { GamingIcon } from "@youtube/icons/GamingIcon";
import { NewsIcon } from "@youtube/icons/NewsIcon";
import { SportsIcon } from "@youtube/icons/SportIcon";
import { LearningIcon } from "@youtube/icons/LearningIcon";
import { FashionAndBeautyIcon } from "@youtube/icons/FashionAndBeautyIcon";
import { YoutubePremiumIcon } from "@youtube/icons/YoutubePremiumIcon";
import { YoutubeStudioIcon } from "@youtube/icons/YoutubeStudioIcon";
import { YoutubeMusicIcon } from "@youtube/icons/YoutubeMusicIcon";
import { YoutubeKidsIcon } from "@youtube/icons/YoutubeKidsIcon";
import { SettingsIcon } from "@youtube/icons/SettingsIcon";
import { ReportIcon } from "@youtube/icons/ReportIcon";
import { HelpIcon } from "@youtube/icons/HelpIcon";
import { SendFeedbackIcon } from "@youtube/icons/SendFeedbackIcon";
//---

import { ComponentProps, forwardRef, PropsWithChildren } from "react";
import { SideBarButton } from "./SideBarButton";
import * as ScrollArea from "@shared/components/ScrollArea";
import Link from "next/link";
import { SidebarChannelLink } from "./SidebarChannelLink";

// @ts-ignore
import { useChannelSubscriptionsQuery } from "@youtube/shared/hooks/useChannelSubscriptionsQuery";

const Seperator = forwardRef<HTMLHRElement, ComponentProps<"hr">>(
   (props, ref) => {
      return (
         <hr ref={ref} {...props} className="border-white/20">
            {props.children}
         </hr>
      );
   }
);

const Group: React.FC<PropsWithChildren<{ title?: string }>> = (props) => {
   return (
      <div className="flex flex-col p-2 ">
         {!!props.title && (
            <h3 className="ml-4 mt-2 mb-1 w-full font-medium">{props.title}</h3>
         )}
         {props.children}
      </div>
   );
};

import { YoutubeLogoWithSidebarTrigger } from "./YoutubeLogoSection";

const FOOTER_LINKS = {
   info: [
      { label: "About", href: "#" },
      { label: "Press", href: "#" },
      { label: "Copyright", href: "#" },
      { label: "Contact us", href: "#" },
      { label: "Creator", href: "#" },
      { label: "Advertise", href: "#" },
      { label: "Developers", href: "#" },
   ],
   terms: [
      { label: "Terms", href: "#" },
      { label: "Privacy", href: "#" },
      { label: "Policy & Safety", href: "#" },
      { label: "How Youtube Works", href: "#" },
      { label: "Test new features", href: "#" },
   ],
} as const;

export const SidebarContent = (props: {
   includeLogo?: boolean;
   countryCode?: string;
}) => {
   const { data: subscriptions, error } = useChannelSubscriptionsQuery("02e39425-1a05-4dac-8b64-d93e552f7a0f");

   if (error) {
      throw error;
   }

   return (
      <>
         {props.includeLogo && (
            <YoutubeLogoWithSidebarTrigger
               className="ml-6 h-[var(--header-height)] shrink-0"
               contryCode={props.countryCode ?? "??"}
            />
         )}
         <ScrollArea.Root
            className="relative h-full w-full overflow-hidden pr-4"
            scrollHideDelay={0.1}
         >
            <ScrollArea.Viewport className="h-full w-full">
               <Group>
                  <SideBarButton href="/">
                     <HomeIcon fill="white" />
                     <span>Home</span>
                  </SideBarButton>
                  <SideBarButton href="/shorts">
                     <ShortsIcon fill="white" />
                     <span>Shorts</span>
                  </SideBarButton>
                  <SideBarButton href="/feed/subscriptions">
                     <SubscriptionsIcon fill="white" />
                     <span>Subscriptions</span>
                  </SideBarButton>
               </Group>
               <Seperator />
               <Group>
                  <SideBarButton href="/feed/library">
                     <LibraryIcon fill="white" />
                     <span>Library</span>
                  </SideBarButton>
                  <SideBarButton href="/feed/history">
                     <HistoryIcon fill="white" />
                     <span>History</span>
                  </SideBarButton>
                  <SideBarButton href="/feed/creator">
                     <YourVideosIcon fill="white" />
                     <span>Your Videos</span>
                  </SideBarButton>
                  <SideBarButton href="/playlist?list=WL">
                     <WatchLaterIcon fill="white" />
                     <span>Watch Later</span>
                  </SideBarButton>
                  <SideBarButton href="/playlist?list=LL">
                     <LikeIcon fill="white" />
                     <span>Liked Videos</span>
                  </SideBarButton>
               </Group>
               <Seperator />
               <Group title="Subscriptions">
                  {subscriptions?.slice(0, 14).map(({ channel }) => {
                     return (
                        <SidebarChannelLink
                           key={channel.id}
                           channelName={channel.name}
                           id={channel.id}
                        />
                     );
                  })}
               </Group>
               <Seperator />
               <Group title="Explore">
                  <SideBarButton href="#">
                     <TrendingIcon fill="white" />
                     <span>Trending</span>
                  </SideBarButton>
                  <SideBarButton href="#">
                     <MusicIcon fill="white" />
                     <span>Music</span>
                  </SideBarButton>
                  <SideBarButton href="#">
                     <MoviesAndShowsIcon fill="white" />
                     <span>Movies & Shows</span>
                  </SideBarButton>
                  <SideBarButton href="#">
                     <LiveIcon fill="white" />
                     <span>Live</span>
                  </SideBarButton>
                  <SideBarButton href="#">
                     <GamingIcon fill="white" />
                     <span>Gaming</span>
                  </SideBarButton>
                  <SideBarButton href="#">
                     <NewsIcon fill="white" />
                     <span>News</span>
                  </SideBarButton>
                  <SideBarButton href="#">
                     <SportsIcon fill="white" />
                     <span>Sport</span>
                  </SideBarButton>
                  <SideBarButton href="#">
                     <LearningIcon fill="white" />
                     <span>Learning</span>
                  </SideBarButton>
                  <SideBarButton href="#">
                     <FashionAndBeautyIcon fill="white" />
                     <span>Fashion & Beauty</span>
                  </SideBarButton>
               </Group>
               <Seperator />
               <Group title="More from Youtube">
                  <SideBarButton href="#">
                     <YoutubePremiumIcon />
                     <span>Youtube Premium</span>
                  </SideBarButton>
                  <SideBarButton href="#">
                     <YoutubeStudioIcon />
                     <span>Youtube Studio</span>
                  </SideBarButton>
                  <SideBarButton href="#">
                     <YoutubeMusicIcon />
                     <span>Youtube Music</span>
                  </SideBarButton>
                  <SideBarButton href="#">
                     <YoutubeKidsIcon />
                     <span>Youtube Kids</span>
                  </SideBarButton>
               </Group>
               <Seperator />
               <Group>
                  <SideBarButton href="#">
                     <SettingsIcon fill="white" />
                     <span>Settings</span>
                  </SideBarButton>
                  <SideBarButton href="#">
                     <ReportIcon fill="white" />
                     <span>Report History</span>
                  </SideBarButton>
                  <SideBarButton href="#">
                     <HelpIcon fill="white" />
                     <span>Help</span>
                  </SideBarButton>
                  <SideBarButton href="#">
                     <SendFeedbackIcon fill="white" />
                     <span>Send Feedback</span>
                  </SideBarButton>
               </Group>
               <Seperator />
               <Group>
                  <div className="mx-4 my-2 flex flex-wrap text-[0.79rem]">
                     {FOOTER_LINKS.info.map(({ label, href }) => {
                        return (
                           <Link
                              className="mr-1 text-white/70"
                              href={href}
                              key={label}
                           >
                              {label}
                           </Link>
                        );
                     })}
                  </div>
                  <div className="mx-4 my-2 flex flex-wrap text-[0.79rem]">
                     {FOOTER_LINKS.terms.map(({ label, href }) => {
                        return (
                           <Link
                              className="mr-1 text-white/70"
                              href={href}
                              key={label}
                           >
                              {label}
                           </Link>
                        );
                     })}
                  </div>
                  <div className="ml-4 py-4 text-xs text-white/50">
                     © 2023 Google LLC
                  </div>
               </Group>
            </ScrollArea.Viewport>
            <ScrollArea.Scrollbar
               className="mr-1 w-2 select-none bg-transparent"
               orientation="vertical"
            >
               <ScrollArea.Thumb className="w-full rounded-full bg-white/50" />
            </ScrollArea.Scrollbar>
         </ScrollArea.Root>
      </>
   );
};
