import { forwardRef } from "react";
import { IconProps } from "..";

export const DownChevronIcon = forwardRef<SVGSVGElement, IconProps>(
   (props, ref) => {
      return (
         <svg ref={ref} viewBox="0 0 24 24" {...props}>
            <path d="M12 15.7L5.6 9.4l.7-.7 5.6 5.6 5.6-5.6.7.7-6.2 6.3z" />
         </svg>
      );
   }
);
