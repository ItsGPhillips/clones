import { forwardRef } from 'react';
import { IconProps } from '..';

export const YoutubeMusicIcon = forwardRef<
   SVGSVGElement,
   IconProps
>((props, ref) => {
   return (
      <svg ref={ref} viewBox="0 0 24 24" {...props}>
         <circle
            cx="12"
            cy="12"
            r="10"
            fill="red"
         />
         <path
            fill="#FFF"
            d="M10 14.65L10 9.35 15 12z"
         />        <path
            fill="#FFF"
            d="M12 7c2.76 0 5 2.24 5 5s-2.24 5-5 5-5-2.24-5-5 2.24-5 5-5m0-1c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6z"
         />
      </svg>
   );
});