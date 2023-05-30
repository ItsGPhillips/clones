import { forwardRef } from "react";
import { IconProps } from "..";

export const TranscriptIcon = forwardRef<SVGSVGElement, IconProps>((props, ref) => {
   return (
      <svg ref={ref} viewBox="0 0 24 24" {...props}>
         <path d="M5 11h2v2H5v-2zm10 4H5v2h10v-2zm4 0h-2v2h2v-2zm0-4H9v2h10v-2zm3-5H2v14h20V6zM3 7h18v12H3V7z" />
      </svg>
   );
});
