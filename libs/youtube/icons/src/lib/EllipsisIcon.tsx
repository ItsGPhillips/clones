import { forwardRef } from "react";
import { IconProps } from "..";

export const EllipsisIcon = forwardRef<SVGSVGElement, IconProps>(
   (props, ref) => {
      return (
         <svg ref={ref} viewBox="0 0 24 24" {...props}>
            <path d="M7.5 12c0 .83-.67 1.5-1.5 1.5s-1.5-.67-1.5-1.5.67-1.5 1.5-1.5 1.5.67 1.5 1.5zm4.5-1.5c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5 1.5-.67 1.5-1.5-.67-1.5-1.5-1.5zm6 0c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5 1.5-.67 1.5-1.5-.67-1.5-1.5-1.5z" />
         </svg>
      );
   }
);
