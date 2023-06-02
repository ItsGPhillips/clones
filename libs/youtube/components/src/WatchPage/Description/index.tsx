import formatDistanceToNow from "date-fns/formatDistanceToNow";
import { OpenCloseWrapper } from "./OpenCloseWrapper";

const kFormatter = (num: number) => {
   return Math.abs(num) > 999
      ? (Math.sign(num) * (Math.abs(num) / 1000)).toFixed(1) + "k"
      : Math.sign(num) * Math.abs(num);
};

export const Description = (props: {
   views: number;
   uploadDate: Date;
   description: string;
   tags: Array<string>;
}) => {
   return (
      <OpenCloseWrapper>
         <div className="flex items-center gap-2">
            <span>{kFormatter(props.views)} views</span>
            <span>
               {formatDistanceToNow(props.uploadDate, {
                  addSuffix: true,
                  includeSeconds: true,
               })}
            </span>
            <span className="aspect-square w-1 rounded-full bg-white/20" />
            <span className="flex gap-1 font-normal text-white/60">
               {props.tags.map((tag) => (
                  <span>{`#${tag}`}</span>
               ))}
            </span>
         </div>
         <div className="group-data-[show-description=false]:line-clamp-2 font-normal">
            {props.description}
         </div>
      </OpenCloseWrapper>
   );
};
