import { forwardRef } from 'react';
import { IconProps } from '..';

export const LearningIcon = forwardRef<
   SVGSVGElement,
   IconProps
>((props, ref) => {
   return (
      <svg ref={ref} viewBox="0 0 24 24" {...props}>
         <path
            d="M16 21h-2.28a1.98 1.98 0 01-3.44 0H8v-1h8v1zm4-11a7.98 7.98 0 01-4 6.92V19H8v-2.08A7.98 7.98 0 014 10c0-4.42 3.58-8 8-8s8 3.58 8 8zm-5 8v-1.66l.5-.29A7.017 7.017 0 0019 10c0-3.86-3.14-7-7-7s-7 3.14-7 7c0 2.48 1.34 4.8 3.5 6.06l.5.28V18h6z"
         />
      </svg>
   );
});
