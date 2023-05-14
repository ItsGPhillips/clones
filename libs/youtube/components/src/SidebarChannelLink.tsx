import { Avatar } from "./Avatar";
import { SideBarButton } from "./SideBarButton";


type SidebarChannelLinkProps = {
   channel: string,
   href: string,
};
export const SidebarChannelLink = (props: SidebarChannelLinkProps) => {
   const channel = props.channel.split(" ");
   return <SideBarButton href={""}>
      <Avatar className="w-8 h-8 aspect-square !text-xs" firstName={channel[0] ?? "ANOM"} lastName={channel[1]} imageUrl={null} />
      <span className="flex items-center gap-1">
         <span>{channel[0]}</span>
         <span>{channel[1] ?? null}</span>
      </span>
   </SideBarButton>;
};