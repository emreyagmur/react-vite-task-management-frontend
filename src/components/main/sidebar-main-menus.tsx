import { useLocation, useNavigate } from "react-router-dom";
import { LayoutDashboard, Columns, Users2 } from "lucide-react";

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";

const SidebarMainMenus = () => {
  const navigate = useNavigate();
  const location = useLocation();

  console.log(location.pathname);
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
        id: 2,
        title: "Tasks",
        url: "/task",
        isActive: false,
        icon: Columns,
      },
    ],
  };

  const settingMenus = {
    menus: [
      {
        id: 1,
        title: "Columns",
        url: "/column",
        isActive: true,
        icon: Columns,
      },
      {
        id: 2,
        title: "Users",
        url: "/user",
        isActive: false,
        icon: Users2,
      },
    ],
  };
  return (
    <>
      <SidebarGroup>
        <SidebarGroupLabel>Platform</SidebarGroupLabel>
        <SidebarMenu className="gap-1">
          {data.menus.map((item) => (
            <SidebarMenuItem>
              <SidebarMenuButton
                className={cn(
                  "cursor-pointer",
                  location.pathname === item.url &&
                    "bg-primary text-primary-foreground",
                )}
                onClick={() => navigate(item.url)}
              >
                {item.icon && <item.icon />}
                <span>{item.title}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroup>
      <SidebarGroup>
        <SidebarGroupLabel>Settings</SidebarGroupLabel>
        <SidebarMenu className="gap-1">
          {settingMenus.menus.map((item) => (
            <SidebarMenuItem>
              <SidebarMenuButton
                className={cn(
                  "cursor-pointer",
                  location.pathname === item.url &&
                    "bg-primary text-primary-foreground",
                )}
                onClick={() => navigate(item.url)}
              >
                {item.icon && <item.icon />}
                <span>{item.title}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroup>
    </>
  );
};

export default SidebarMainMenus;
