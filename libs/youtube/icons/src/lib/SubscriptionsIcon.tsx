import { ComponentPropsWithRef, forwardRef } from "react";

export type SubscriptionsIconProps = Omit<ComponentPropsWithRef<"svg">, "viewBox">;
export const SubscriptionsIcon = forwardRef<SVGSVGElement, SubscriptionsIconProps>((props, ref) => {
   return (
      <svg
         ref={ref}
         viewBox="0 0 24 24"
         {...props}
      >
         <path
            d="M10 18v-6l5 3-5 3zm7-15H7v1h10V3zm3 3H4v1h16V6zm2 3H2v12h20V9zM3 10h18v10H3V10z"
         />
      </svg>
   );
});