import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
  useSidebar,
} from "@/components/ui/sidebar";
import { SidebarUser } from "./sidebar-user";
import { useAppSelector } from "@/hooks/app-hooks";
import ProjectSwitcher from "./project-switcher";
import { AudioWaveform, Command, GalleryVerticalEnd } from "lucide-react";
import { cn } from "@/lib/utils";
import SidebarMainMenus from "./sidebar-main-menus";

export const MainSidebar = () => {
  const data = {
    teams: [
      {
        name: "Acme Inc",
        logo: GalleryVerticalEnd,
        plan: "Enterprise",
      },
      {
        name: "Acme Corp.",
        logo: AudioWaveform,
        plan: "Startup",
      },
      {
        name: "Evil Corp.",
        logo: Command,
        plan: "Free",
      },
    ],
  };

  const { isMobile } = useSidebar();

  return (
    <Sidebar collapsible="offcanvas">
      <SidebarHeader className={cn(!isMobile && "mt-14")}>
        <ProjectSwitcher />
      </SidebarHeader>
      <SidebarContent>
        <SidebarMainMenus />
      </SidebarContent>
      <SidebarFooter>
        <SidebarUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
};
