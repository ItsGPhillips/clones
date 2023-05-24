"use client"

import * as RadixAvatar from "@radix-ui/react-avatar";
import { cn } from "@shared/utils/cn";

export const Avatar: React.FC<{
   imageUrl: string | null;
   firstName: string;
   lastName?: string;
   className?: string;
}> = (props) => {
   return (
      <RadixAvatar.Root className={cn("flex h-10 w-10 flex-shrink-0 flex-row items-center gap-4 self-center", props.className)}>
         <RadixAvatar.Image
            className="h-[inherit] w-[inherit] overflow-hidden rounded-full object-cover shadow-sm"
            src={props.imageUrl ?? undefined}
            alt="User Profile Image"
         />
         <RadixAvatar.Fallback className="flex h-[inherit] w-[inherit] items-center justify-center rounded-full bg-slate-800 text-white">
            {props.firstName[0]}
            {props.lastName?.[0] ?? null}
         </RadixAvatar.Fallback>
      </RadixAvatar.Root>
   );
};
