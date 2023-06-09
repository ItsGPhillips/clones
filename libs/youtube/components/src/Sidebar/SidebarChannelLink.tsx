import { Avatar } from "../Avatar";
import { SideBarButton } from "./SideBarButton";

type SidebarChannelLinkProps = {
   channelName: string;
   id: string;
};

export const SidebarChannelLink = (props: SidebarChannelLinkProps) => {
   const channel = props.channelName.split(" ");
   return (
      <SideBarButton href={""}>
         <Avatar
            className="aspect-square h-8 w-8 !text-xs"
            firstName={channel[0] ?? "ANON"}
            lastName={channel[1]}
            imageUrl={null}
         />
         <span className="flex flex-nowrap items-center gap-1 overflow-ellipsis">
            <span className="whitespace-nowrap">{channel[0]}</span>
            <span className="whitespace-nowrap">{channel[1] ?? null}</span>
         </span>
      </SideBarButton>
   );
};
