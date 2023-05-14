
import { ComponentPropsWithRef, forwardRef } from 'react';

export type HomeIconProps = Omit<
   ComponentPropsWithRef<'svg'>,
   'viewBox'
>;

export const HomeIcon = forwardRef<
   SVGSVGElement,
   HomeIconProps
>((props, ref) => {
   return (
      <svg
         ref={ref}
         viewBox="0 0 24 24"
         {...props}
      >
         <path
            d="M4 10v11h6v-6h4v6h6V10l-8-7z"
         />
      </svg>
   );
});

