import { forwardRef } from 'react';
import { IconProps } from '..';

export const CreateIcon = forwardRef<SVGSVGElement, IconProps>((props, ref) => {
   return (
      <svg
         ref={ref}
         viewBox="0 0 24 24"
         {...props}
      >
         <path d="M11 8H9v3H6v2h3v3h2v-3h3v-2h-3z"></path>
         <path d="M18 7c0-1.103-.897-2-2-2H4c-1.103 0-2 .897-2 2v10c0 1.103.897 2 2 2h12c1.103 0 2-.897 2-2v-3.333L22 17V7l-4 3.333zm-1.999 10H4V7h12v5z"></path>
      </svg>
   );
});
