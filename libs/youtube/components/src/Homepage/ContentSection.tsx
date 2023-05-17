"use client";

import { ContentRow } from "./ContentRow";
import { VideoThumbnailCard } from "./VideoThumbnailCard";

export const ContentSection: React.FC = () => {
   return (
      <div className="@container flex flex-col items-stretch justify-items-stretch gap-4">
         <ContentRow>
            <VideoThumbnailCard />
            <VideoThumbnailCard />
            <VideoThumbnailCard />
            <VideoThumbnailCard />
         </ContentRow>
         <ContentRow>
            <VideoThumbnailCard />
            <VideoThumbnailCard />
            <VideoThumbnailCard />
            <VideoThumbnailCard />
         </ContentRow>
         <ContentRow>
            <VideoThumbnailCard />
            <VideoThumbnailCard />
            <VideoThumbnailCard />
            <VideoThumbnailCard />
         </ContentRow>
         <ContentRow>
            <VideoThumbnailCard />
            <VideoThumbnailCard />
            <VideoThumbnailCard />
            <VideoThumbnailCard />
         </ContentRow>
         <ContentRow>
            <VideoThumbnailCard />
            <VideoThumbnailCard />
            <VideoThumbnailCard />
            <VideoThumbnailCard />
         </ContentRow>
         <ContentRow>
            <VideoThumbnailCard />
            <VideoThumbnailCard />
            <VideoThumbnailCard />
            <VideoThumbnailCard />
         </ContentRow>
         <ContentRow>
            <VideoThumbnailCard />
            <VideoThumbnailCard />
            <VideoThumbnailCard />
            <VideoThumbnailCard />
         </ContentRow>
      </div>
   );
};
