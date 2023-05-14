"use client";

import { cn } from "@shared/utils/cn";
import { usePathname } from "next/navigation";
import { ComponentProps, forwardRef, cloneElement } from "react";
import Link from "next/link";

type SideBarButtonProps = Omit<ComponentProps<typeof Link>, "children" | "className"> & {
   children: [React.ReactElement, React.ReactElement<ComponentProps<"span">>];
};

export const SideBarButton = forwardRef<HTMLAnchorElement, SideBarButtonProps>((props, ref) => {
   const [icon, name] = props.children;
   const pathname = usePathname();
   return (
      <Link
         className={cn(
            "flex flex-row items-center justify-start line h-10 transition-color duration-75",
            "text-white px-3 py-1 rounded-xl text-sm",
            pathname === props.href ? "bg-white/10 hover:bg-white/20" : "bg-transparent hover:bg-white/10"
         )}
         {...props}
      >
         {cloneElement(icon, { className: cn("w-6 h-6 ml-1 aspect-square", icon.props["className"]) })}
         {cloneElement(name, { className: cn("ml-6 font-medium", name.props["className"]) })}
      </Link>
   );
});