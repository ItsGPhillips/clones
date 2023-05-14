import { forwardRef } from 'react';
import { IconProps } from '..';

export const NewsIcon = forwardRef<
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
            d="M11 11v6H7v-6h4m1-1H6v8h6v-8zM3 3.03V21h14l4-4V3.03M20 4v11.99l-.01.01H16v3.99l-.01.01H4V4h16zm-2 4H6V6h12v2zm0 7h-5v-2h5v2zm0-3h-5v-2h5v2z"
         />
      </svg>
   );
});

