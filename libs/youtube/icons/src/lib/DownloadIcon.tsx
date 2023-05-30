import { forwardRef } from "react";
import { IconProps } from "..";

export const DownloadIcon = forwardRef<SVGSVGElement, IconProps>(
   (props, ref) => {
      return (
         <svg ref={ref} viewBox="0 0 24 24" {...props}>
            <path d="M17 18v1H6v-1h11zm-.5-6.6l-.7-.7-3.8 3.7V4h-1v10.4l-3.8-3.8-.7.7 5 5 5-4.9z" />
         </svg>
      );
   }
);
