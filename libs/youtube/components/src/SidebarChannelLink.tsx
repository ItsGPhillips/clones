import { Avatar } from "./Avatar";
import { SideBarButton } from "./SideBarButton";

type SidebarChannelLinkProps = {
   channel: string;
   href: string;
};

export const SidebarChannelLink = (props: SidebarChannelLinkProps) => {
   const channel = props.channel.split(" ");
   return (
      <SideBarButton href={""}>
         <Avatar
            className="aspect-square h-8 w-8 !text-xs"
            firstName={channel[0] ?? "ANON"}
            lastName={channel[1]}
            imageUrl={null}
         />
         <span className="flex flex-nowrap items-center gap-1 overflow-ellipsis">
            <span>{channel[0]}</span>
            <span>{channel[1] ?? null}</span>
         </span>
      </SideBarButton>
   );
};
