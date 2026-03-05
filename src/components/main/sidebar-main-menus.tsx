import {
  ChevronRight,
  LayoutDashboard,
  School2,
  SquareTerminal,
  Columns,
  type LucideIcon,
  Wallet2,
  CogIcon,
} from "lucide-react";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import { IMenuItem } from "@/@types/static";
import { useNavigate } from "react-router-dom";

const SidebarMainMenus = () => {
  const navigate = useNavigate();
  const data = {
    menus: [
      {
        id: 1,
        title: "Dashboard",
        url: "/dashboard",
        isActive: true,
        icon: LayoutDashboard,
      },
      {
        id: 3,
        title: "Tasks",
        url: "/task",
        isActive: false,
        icon: Columns,
      },
      {
        id: 4,
        title: "Settings",
        url: "#",
        icon: CogIcon,
        isActive: false,
        subMenus: [
          {
            title: "Columns",
            url: "column",
          },
          {
            title: "Starred",
            url: "#",
          },
          {
            title: "Settings",
            url: "#",
          },
        ],
      },
    ],
  };
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Platform</SidebarGroupLabel>
      <SidebarMenu>
        {data.menus.map((item) => (
          <Collapsible
            key={item.title}
            asChild
            defaultOpen={item.isActive}
            className="group/collapsible"
          >
            <SidebarMenuItem>
              {item?.subMenus?.length > 0 ? (
                <CollapsibleTrigger asChild>
                  <SidebarMenuButton className="cursor-pointer">
                    {item.icon && <item.icon />}
                    <span>{item.title}</span>
                    <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                  </SidebarMenuButton>
                </CollapsibleTrigger>
              ) : (
                <SidebarMenuButton
                  className="cursor-pointer"
                  onClick={() => navigate(item.url)}
                >
                  {item.icon && <item.icon />}
                  <span>{item.title}</span>
                </SidebarMenuButton>
              )}

              <CollapsibleContent>
                <SidebarMenuSub>
                  {item?.subMenus?.map((subItem) => (
                    <SidebarMenuSubItem key={subItem.title}>
                      <SidebarMenuSubButton asChild>
                        <a href={subItem.url}>
                          <span>{subItem.title}</span>
                        </a>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  ))}
                </SidebarMenuSub>
              </CollapsibleContent>
            </SidebarMenuItem>
          </Collapsible>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
};

export default SidebarMainMenus;
