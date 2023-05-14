import { forwardRef } from 'react';
import { IconProps } from '..';

export const ReportHistoryIcon = forwardRef<
   SVGSVGElement,
   IconProps
>((props, ref) => {
   return (
      <svg ref={ref} viewBox="0 0 24 24" {...props}>
         <path
            d="M13.18 4l.24 1.2.16.8H19v7h-5.18l-.24-1.2-.16-.8H6V4h7.18M14 3H5v18h1v-9h6.6l.4 2h7V5h-5.6L14 3z"
         />
      </svg>
   );
});
