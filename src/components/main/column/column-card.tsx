import { IUser } from "@/@types/auth";
import { IProjectColumn } from "@/@types/column-types";
import { IProject } from "@/@types/project-types";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowRight, Pencil, Trash2 } from "lucide-react";

interface ColumnCardProps {
  projectColumnInfo: IProjectColumn;
  activeProject: IProject;
  user: IUser;
  handleEdit: () => void;
  handleDelete: () => void;
  handleSeeDetails: () => void;
}

const ColumnCard = ({
  projectColumnInfo,
  user,
  handleEdit,
  handleDelete,
  handleSeeDetails,
}: ColumnCardProps) => {
  return (
    <Card className="w-full md:max-w-full shadow-none">
      <CardHeader>
        <CardTitle className="flex flex-row items-center justify-between">
          {projectColumnInfo?.column_name}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-0.5">
          <span className="text-xs">Total Balance</span>
          <span className="font-semibold">asdasd</span>
        </div>
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <Button
          size="xs"
          onClick={handleSeeDetails}
          variant="outline"
          className="w-full"
        >
          See Details
          <ArrowRight className="h-4 w-4" />
        </Button>
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

export default ColumnCard;
