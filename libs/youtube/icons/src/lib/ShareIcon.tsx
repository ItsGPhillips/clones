import { forwardRef } from "react";
import { IconProps } from "..";

export const ShareIcon = forwardRef<SVGSVGElement, IconProps>((props, ref) => {
   return (
      <svg ref={ref} viewBox="0 0 24 24" {...props}>
         <path
            d="M15 5.63L20.66 12 15 18.37V14h-1c-3.96 0-7.14 1-9.75 3.09 1.84-4.07 5.11-6.4 9.89-7.1l.86-.13V5.63M14 3v6C6.22 10.13 3.11 15.33 2 21c2.78-3.97 6.44-6 12-6v6l8-9-8-9z"
         />
      </svg>
   );
});
