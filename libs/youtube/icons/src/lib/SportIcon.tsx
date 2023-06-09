import { forwardRef } from 'react';
import { IconProps } from '..';

export const SportsIcon = forwardRef<
   SVGSVGElement,
   IconProps
>((props, ref) => {
   return (
      <svg ref={ref} viewBox="0 0 24 24" {...props}>
         <path
            d="M17 3v7.51l-.01.46c-.05 2.13-1.33 3.97-3.25 4.7h-.02l-.06.02-.66.26V20h1v1h1-5v-1h1v-4.05l-.66-.24-.08-.03h-.01c-1.92-.73-3.2-2.57-3.25-4.7V3h10zm1-1H6v3H4v6h2.01c.06 2.53 1.62 4.78 3.96 5.64.01 0 .02 0 .03.01V19H9v1H8v2h8v-2h-1v-1h-1v-2.35c.01 0 .02 0 .03-.01 2.33-.86 3.9-3.1 3.96-5.64H20V5h-2V2zm0 8V6h1v4h-1zM5 10V6h1v4H5z"
         />
      </svg>
   );
});