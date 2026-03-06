import { IProjectUser } from "@/@types/project-user-types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowRight, BadgeCheck, Pencil, Trash2 } from "lucide-react";

interface ProjectUserCardProps {
  projectUserInfo: IProjectUser;
  handleEdit: () => void;
  handleDelete: () => void;
}

const ProjectUserCard = ({
  projectUserInfo,
  handleEdit,
  handleDelete,
}: ProjectUserCardProps) => {
  return (
    <Card className="w-full md:max-w-full shadow-none">
      <CardHeader>
        <CardTitle className="flex flex-row items-center justify-between">
          {projectUserInfo?.user?.name}
          <div>
            <Badge variant="secondary">
              {projectUserInfo?.is_admin === "1" ? "Admin" : "User"}
            </Badge>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-0.5">
          <span className="text-xs text-muted-foreground">Number of Task</span>
          <span className="font-semibold">0</span>
        </div>
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <div className="flex w-full flex-row gap-2">
          <Button
            size="xs"
            onClick={handleEdit}
            variant="secondary"
            className="w-1/2"
          >
            <Pencil className="h-4 w-4" />
            Edit
          </Button>
          <Button
            size="xs"
            onClick={handleDelete}
            variant="destructive"
            className="w-1/2"
          >
            <Trash2 className="h-4 w-4" />
            Delete
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default ProjectUserCard;
