"use client";

import { cn } from "@shared/utils/cn";
import { usePathname } from "next/navigation";
import { ComponentProps, forwardRef, cloneElement } from "react";
import Link from "next/link";
import { usePress } from "@react-aria/interactions";

type SideBarButtonProps = Omit<
   ComponentProps<typeof Link>,
   "children" | "className"
> & {
   children: [React.ReactElement, React.ReactElement<ComponentProps<"span">>];
};

export const SideBarButton = forwardRef<HTMLAnchorElement, SideBarButtonProps>(
   ({ href, ...props }, ref) => {
      const [icon, name] = props.children;
      const pathname = usePathname();
      const { pressProps } = usePress({
         onPress(e) {
            const message = `
            "${e.target.children[1]?.innerHTML ?? "Unknown"}" link Clicked.
            As this is a demo site not all links are implimented.
         `;
            window.alert(message);
         },
      });
      return (
         <Link
            className={cn(
               "line transition-color flex h-10 flex-row items-center justify-start duration-75",
               "rounded-xl px-3 py-1 text-sm text-white outline-none",
               pathname === href
                  ? "bg-white/10 hover:bg-white/20"
                  : "bg-transparent hover:bg-white/10"
            )}
            href="#"
            {...props}
            {...pressProps}
         >
            {cloneElement(icon, {
               className: cn(
                  "w-6 h-6 ml-1 aspect-square",
                  icon.props["className"]
               ),
            })}
            {cloneElement(name, {
               className: cn("ml-6 font-medium", name.props["className"]),
            })}
         </Link>
      );
   }
);
