import React from "react";

import { useAppDispatch, useAppSelector } from "@/hooks/app-hooks";
import { useNavigate, useParams } from "react-router-dom";
import { projectColumnActions } from "@/store/project/projetc-column";
import { toast } from "sonner";
import { Loader, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import ColumnCard from "@/components/main/column/column-card";
import { IProjectColumn } from "@/@types/column-types";
import DialogSheet from "@/components/dialog-sheet";
import ConfirmDialog from "@/components/comfirm-dialog";
import ColumnForm from "./column-form";

const ColumnPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { action, id } = useParams();

  const {
    projectColumns: data,
    phase,
    error,
  } = useAppSelector((state) => state.projectColumns);
  const { user } = useAppSelector((state) => state.auth);
  const { activeProject } = useAppSelector((state) => state.projects);

  const [showConfirmDialog, setShowConfirmDialog] = React.useState(false);
  const [isOpen, setIsOpen] = React.useState(false);

  const handleShowConfirm = (cId: number) => {
    navigate(`/column/delete/${cId}`);
    setShowConfirmDialog(true);
  };

  const handleCloseConfirm = () => {
    navigate("/column");
    setShowConfirmDialog(false);
  };

  const handleDeleteConfirm = () => {
    dispatch(projectColumnActions.deleteProjectColumn(parseInt(id)));
  };

  const handleAdd = () => {
    navigate("/column/add");
    setIsOpen(true);
  };

  const handleEdit = (cId: number) => {
    navigate(`/column/edit/${cId}`);
    setIsOpen(true);
  };

  const handleCloseSheet = () => {
    navigate("/column");
    setIsOpen(false);
  };

  React.useEffect(() => {
    dispatch(projectColumnActions.pullProjectColumns(user, activeProject));
  }, []);

  React.useEffect(() => {
    if (phase === "project-column-deleting-error") {
      toast.error(error);
      dispatch(projectColumnActions.setPhase(null, null));
    } else if (phase === "project-column-deleting-success") {
      toast.success("Deleted");
      dispatch(projectColumnActions.setPhase(null, null));
      handleCloseConfirm();
    }
  }, [phase]);

  if (phase === "project-columns-pulling") {
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
          <span className="text-xl font-semibold">Columns</span>
          <span className="text-sm text-muted-foreground">
            Explore your columns and their activities
          </span>
        </div>
        <div>
          <Button size="sm" onClick={() => handleAdd()}>
            <Plus className="h-4 w-4" />
            Add Column
          </Button>
        </div>
      </div>
      <div className="grid auto-rows-min gap-4 md:grid-cols-3">
        {data &&
          data.map((row: IProjectColumn) => (
            <ColumnCard
              key={row.id}
              projectColumnInfo={row}
              user={user}
              activeProject={activeProject}
              handleEdit={() => handleEdit(row?.id)}
              handleDelete={() => handleShowConfirm(row?.id)}
              handleSeeDetails={() => console.log("see details")}
            />
          ))}
      </div>
      <DialogSheet
        isOpen={isOpen}
        handleClose={handleCloseSheet}
        title={action === "add" ? "Add Column" : "Edit Column"}
      >
        <ColumnForm handleClose={handleCloseSheet} />
      </DialogSheet>

      <ConfirmDialog
        handleClose={handleCloseConfirm}
        handleConfirm={handleDeleteConfirm}
        isOpen={showConfirmDialog}
      />
    </div>
  );
};

export default ColumnPage;
