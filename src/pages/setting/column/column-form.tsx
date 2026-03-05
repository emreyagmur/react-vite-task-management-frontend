import React from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAppDispatch, useAppSelector } from "@/hooks/app-hooks";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader, Save } from "lucide-react";
import { toast } from "sonner";
import { projectColumnFormSchema } from "@/schemas/project-column-schema";
import { projectColumnActions } from "@/store/project/projetc-column";
import { useParams } from "react-router-dom";

interface IColumnFormProps {
  handleClose: () => void;
}

const ColumnForm = ({ handleClose }: IColumnFormProps) => {
  const dispatch = useAppDispatch();
  const { action, id } = useParams();

  const { user } = useAppSelector((state) => state.auth);
  const { activeProject } = useAppSelector((state) => state.projects);
  const { projectColumns, phase, error } = useAppSelector(
    (state) => state.projectColumns,
  );

  const projectColumnInfo = projectColumns.find((c) => c.id === parseInt(id));

  const form = useForm<z.infer<typeof projectColumnFormSchema>>({
    resolver: zodResolver(projectColumnFormSchema),
    defaultValues: {
      id: projectColumnInfo?.id || 0,
      user_id: user?.id || projectColumnInfo?.user_id || 0,
      project_id: activeProject?.id || projectColumnInfo?.project_id || 0,
      column_name: projectColumnInfo?.column_name || "",
    },
  });

  const onSubmit = (data: z.infer<typeof projectColumnFormSchema>) => {
    if (action === "add") {
      dispatch(projectColumnActions.addProjectColumn(data));
    } else if (action === "edit") {
      dispatch(projectColumnActions.updateProjectColumn(data));
    }
  };

  React.useEffect(() => {
    if (phase === "project-column-adding-success") {
      toast.success("Column added successfully!");
      dispatch(projectColumnActions.setPhase(null, null));
      handleClose();
    } else if (phase === "project-column-updating-success") {
      toast.success("Column updated successfully!");
      dispatch(projectColumnActions.setPhase(null, null));
      handleClose();
    } else if (phase === "project-column-updating-error") {
      toast.error(error);
      dispatch(projectColumnActions.setPhase(null, null));
    } else if (phase === "project-column-adding-error") {
      toast.error(error);
      dispatch(projectColumnActions.setPhase(null, null));
    }
  }, [phase]);

  return (
    <div className="w-full">
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FieldGroup>
          <Controller
            name="column_name"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel
                  htmlFor="form-column-name-input"
                  className="text-muted-foreground"
                >
                  Column Name
                </FieldLabel>
                <Input
                  {...field}
                  id="form-column-name-input"
                  aria-invalid={fieldState.invalid}
                  className="h-11"
                  disabled={phase === "project-column-adding" ? true : false}
                  placeholder="Enter column name"
                  autoComplete="off"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <div>
            <Button
              size="lg"
              disabled={
                phase === "project-column-adding" ||
                phase === "project-column-updating"
                  ? true
                  : false
              }
              className="w-full"
            >
              {phase === "project-column-adding" ||
              phase === "project-column-updating" ? (
                <Loader className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Save className="mr-2 h-4 w-4" />
              )}

              {phase === "project-column-adding" ||
              phase === "project-column-updating"
                ? "Processing..."
                : "Save"}
            </Button>
          </div>
        </FieldGroup>
      </form>
    </div>
  );
};

export default ColumnForm;
