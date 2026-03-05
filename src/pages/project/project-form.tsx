import React from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { projectFormSchema } from "@/schemas/project-schema";
import { useAppDispatch, useAppSelector } from "@/hooks/app-hooks";
import { projectActions } from "@/store/project/project";
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

interface IProjectFormProps {
  handleClose: () => void;
}

const ProjectForm = ({ handleClose }: IProjectFormProps) => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);

  const { phase, error } = useAppSelector((state) => state.projects);

  const form = useForm<z.infer<typeof projectFormSchema>>({
    resolver: zodResolver(projectFormSchema),
    defaultValues: {
      user_id: user?.id || 0,
      project_name: "",
      explanation: "",
    },
  });

  const onSubmit = (data: z.infer<typeof projectFormSchema>) => {
    dispatch(projectActions.addProject(data));
  };

  React.useEffect(() => {
    if (phase === "project-adding-success") {
      toast.success("Project added successfully!");
      handleClose();
    }
  }, [phase]);

  React.useEffect(() => {
    if (phase === "project-adding-error") {
      toast.error(error);
      dispatch(projectActions.setPhase(null, null));
    }
  }, [phase]);

  return (
    <div className="w-full">
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FieldGroup>
          <Controller
            name="project_name"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel
                  htmlFor="form-project-name-input"
                  className="text-muted-foreground"
                >
                  Project Name
                </FieldLabel>
                <Input
                  {...field}
                  id="form-project-name-input"
                  aria-invalid={fieldState.invalid}
                  className="h-11"
                  disabled={phase === "project-adding" ? true : false}
                  placeholder="Enter project name"
                  autoComplete="off"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Controller
            name="explanation"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel
                  htmlFor="form-project-explanation-input"
                  className="text-muted-foreground"
                >
                  Project Explanation
                </FieldLabel>
                <Input
                  {...field}
                  id="form-project-explanation-input"
                  aria-invalid={fieldState.invalid}
                  className="h-11"
                  disabled={phase === "project-adding" ? true : false}
                  placeholder="Enter project explanation"
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
              disabled={phase === "project-adding" ? true : false}
              className="w-full"
            >
              {phase === "project-adding" ? (
                <Loader className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Save className="mr-2 h-4 w-4" />
              )}

              {phase === "project-adding" ? "Adding Project..." : "Add Project"}
            </Button>
          </div>
        </FieldGroup>
      </form>
    </div>
  );
};

export default ProjectForm;
