import React from "react";
import { Outlet } from "react-router-dom";
import { SidebarInset, SidebarProvider } from "../ui/sidebar";
import { MainNavbar } from "./main-navbar";
import { MainSidebar } from "./main-sidebar";

export const MainLayout = () => {
  return (
    <div className="[--header-height:calc(--spacing(14))]">
      <SidebarProvider className="flex flex-col">
        <MainNavbar />
        <div className="flex flex-1">
          <MainSidebar />
          <SidebarInset>
            <div className="flex flex-1 flex-col gap-4 p-4 mt-14">
              <Outlet />
            </div>
          </SidebarInset>
        </div>
      </SidebarProvider>
    </div>
  );
};
