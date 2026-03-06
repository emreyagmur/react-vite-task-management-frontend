import { IProjectUser } from "@/@types/project-user-types";
import ProjectUserCard from "@/components/main/project/project-user-card";
import { Button } from "@/components/ui/button";
import { useAppDispatch, useAppSelector } from "@/hooks/app-hooks";
import { projectUserActions } from "@/store/project/project-user";
import { Loader, Plus } from "lucide-react";
import React from "react";

const ProjectUserPage = () => {
  const dispatch = useAppDispatch();

  const { projectUsers, phase, error } = useAppSelector(
    (state) => state.projectUsers,
  );
  const { activeProject } = useAppSelector((state) => state.projects);

  React.useEffect(() => {
    if (activeProject) {
      dispatch(projectUserActions.pullProjectUsers(activeProject));
    }
  }, [activeProject]);

  if (phase === "project-users-pulling") {
    return (
      <div className="w-full h-full flex flex-col justify-center items-center space-y-3">
        <Loader className="h-4 w-4 animate-spin" />
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="mb-5 flex flex-row items-center justify-between gap-2">
        <div className="flex flex-col">
          <span className="text-xl font-semibold">Users</span>
          <span className="text-sm text-muted-foreground">
            Explore your teams and their activities
          </span>
        </div>
        <div>
          <Button size="sm" onClick={() => console.log("add")}>
            <Plus className="h-4 w-4" />
            Invite User
          </Button>
        </div>
      </div>
      <div className="grid auto-rows-min gap-4 md:grid-cols-3">
        {projectUsers &&
          projectUsers.map((row: IProjectUser) => (
            <ProjectUserCard
              key={row.id}
              projectUserInfo={row}
              handleEdit={() => console.log(row?.id)}
              handleDelete={() => console.log(row?.id)}
            />
          ))}
      </div>
    </div>
  );
};

export default ProjectUserPage;
