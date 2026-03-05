import * as React from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "./ui/alert-dialog";
import { Loader } from "lucide-react";
import { IDialogBaseProps } from "./dialog-base";

interface IConfirmDialogProps extends IDialogBaseProps {
  handleConfirm?: () => void;
  alertTitle?: string;
  alertDescription?: string;
  isDisabled?: boolean;
  isLoading?: boolean;
}

const ConfirmDialog = (props: IConfirmDialogProps) => {
  const {
    handleClose,
    handleConfirm,
    isOpen,
    alertTitle,
    alertDescription,
    isDisabled,
    isLoading,
  } = props;
  return (
    <React.Fragment>
      <AlertDialog open={isOpen} onOpenChange={handleClose}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {alertTitle ?? "Are you absolutely sure?"}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {alertDescription ??
                "This action cannot be undone. The data you want to delete will be permanently deleted."}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDisabled} onClick={handleClose}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction disabled={isDisabled} onClick={handleConfirm}>
              {isLoading && <Loader className="mr-2 h-4 w-4 animate-spin" />}
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </React.Fragment>
  );
};

export default ConfirmDialog;
