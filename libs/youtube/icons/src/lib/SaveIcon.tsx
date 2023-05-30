import { forwardRef } from "react";
import { IconProps } from "..";

export const SaveIcon = forwardRef<SVGSVGElement, IconProps>((props, ref) => {
   return (
      <svg ref={ref} viewBox="0 0 24 24" {...props}>
         <path d="M22 13h-4v4h-2v-4h-4v-2h4V7h2v4h4v2zm-8-6H2v1h12V7zM2 12h8v-1H2v1zm0 4h8v-1H2v1z" />
      </svg>
   );
});
