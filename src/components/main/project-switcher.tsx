"use client";

import * as React from "react";
import {
  CheckCircle,
  ChevronsUpDown,
  CircleCheck,
  Command,
  Plus,
} from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { useAppDispatch, useAppSelector } from "@/hooks/app-hooks";
import { projectActions } from "@/store/project/project";
import { IProject } from "@/@types/project-types";
import DialogSheet from "@/components/dialog-sheet";
import ProjectForm from "@/pages/project/project-form";

const ProjectSwitcher = () => {
  const { isMobile } = useSidebar();
  const dispatch = useAppDispatch();

  const { user } = useAppSelector((state) => state.auth);
  const { activeProject, projects } = useAppSelector((state) => state.projects);

  const [isOpen, setIsOpen] = React.useState(false);

  const setActiveProject = (project: IProject) => {
    dispatch(projectActions.setActiveProject(project));
  };

  const handleCloseSheet = () => {
    setIsOpen(false);
  };

  React.useEffect(() => {
    dispatch(projectActions.pullProjects(user));
  }, []);

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                <Command className="size-4" />
              </div>
              {projects.length > 0 ? (
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">
                    {activeProject?.project_name}
                  </span>
                  <span className="truncate text-xs line-clamp-1 text-ellipsis text-muted-foreground">
                    {activeProject?.explanation}
                  </span>
                </div>
              ) : (
                <span className="text-sm">No project Created</span>
              )}
              <ChevronsUpDown className="ml-auto" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
            align="start"
            side={isMobile ? "bottom" : "right"}
            sideOffset={4}
          >
            <DropdownMenuLabel className="text-muted-foreground text-xs">
              Teams
            </DropdownMenuLabel>
            {projects.map((project, index) => (
              <DropdownMenuItem
                key={project.id}
                onClick={() => setActiveProject(project)}
                className="gap-2 p-2"
              >
                <div className="flex size-6 items-center justify-center rounded-md border">
                  <Command className="size-3.5 shrink-0" />
                </div>
                {project.project_name}
                <DropdownMenuShortcut>
                  {activeProject?.id === project.id && (
                    <CircleCheck className="size-3.5 text-green-600" />
                  )}
                </DropdownMenuShortcut>
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => setIsOpen(true)}
              className="gap-2 p-2"
            >
              <div className="flex size-6 items-center justify-center rounded-md border bg-transparent">
                <Plus className="size-4" />
              </div>
              <div className="text-muted-foreground font-medium">
                Create project
              </div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>

      <DialogSheet
        isOpen={isOpen}
        handleClose={() => handleCloseSheet()}
        title={"Create Project"}
      >
        <ProjectForm
          handleClose={handleCloseSheet}
          //actionType={action}
          //handleClose={handleCloseSheet}
          //transactionId={transactionId}
        />
      </DialogSheet>
    </SidebarMenu>
  );
};

export default ProjectSwitcher;
