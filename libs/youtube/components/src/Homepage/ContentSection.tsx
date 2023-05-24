import { ContentRow } from "./ContentRow";

export const ContentSection = async () => {
   return (
      <div className="@container flex flex-col items-stretch justify-items-stretch gap-4">
         <ContentRow role="recommended" />
         <ContentRow role="breaking-news" title="Breaking News" />
         <ContentRow role="movies" title="Movies & TV shows" />
         <ContentRow role="subscriptions" />
      </div>
   );
};
