import { forwardRef } from 'react';
import { IconProps } from '..';

export const YourVideosIcon = forwardRef<
   SVGSVGElement,
   IconProps
>((props, ref) => {
   return (
      <svg
         ref={ref}
         viewBox="0 0 24 24"
         {...props}
      >
         <path
            d="M10 8l6 4-6 4V8zm11-5v18H3V3h18zm-1 1H4v16h16V4z"
         />
      </svg>
   );
});
