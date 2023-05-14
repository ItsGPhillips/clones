import { ComponentPropsWithRef, forwardRef } from 'react';

export type FashionAndBeautyIconProps = Omit<
   ComponentPropsWithRef<'svg'>,
   'viewBox'
>;

export const FashionAndBeautyIcon = forwardRef<
   SVGSVGElement,
   FashionAndBeautyIconProps
>((props, ref) => {
   return (
      <svg ref={ref} viewBox="0 0 24 24" {...props}>
         <g>
            <path
               d="M12.5 6.44v-.5C13.36 5.71 14 4.93 14 4c0-1.1-.9-2-2-2s-2 .9-2 2h1c0-.55.45-1 1-1s1 .45 1 1-.45 1-1 1h-.5v1.44L4 13h2v6h1v2h1v-2h2v3h1v-3h2v2h1v-2h1v-3h3v-3h2l-7.5-6.56zM6.66 12L12 7.33 17.34 12H6.66zM14 18H7v-5h7v5zm1-3v-2h2v2h-2z"
            />
         </g>
      </svg>
   );
});
