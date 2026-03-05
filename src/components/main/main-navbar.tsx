import { Link } from "react-router-dom";
import { SidebarIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useSidebar } from "@/components/ui/sidebar";
import { ThemeToggle } from "@/components/theme-toggle";

export const MainNavbar = () => {
  const { toggleSidebar } = useSidebar();
  return (
    <header className="flex fixed top-0 z-50 w-full items-center border-b backdrop-blur bg-sidebar">
      <div className="flex h-14 w-full items-center gap-2 px-4">
        <Button
          className="h-8 w-8"
          variant="ghost"
          size="icon"
          onClick={toggleSidebar}
        >
          <SidebarIcon />
        </Button>

        <Link
          to="/dashboard"
          className="flex items-center gap-2 text-lg font-semibold md:text-base"
        >
          <img src="/vite.svg" alt="logo" className="w-6.25" />
          <span className="text-primary font-bold">Taskify</span>
        </Link>
        <div className="flex items-center gap-x-2 ms-auto md:col-span-3">
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
};

{
  /*
  <header className="flex fixed top-0 z-50 w-full h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 border-b">
  */
}
