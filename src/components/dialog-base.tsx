import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";

export interface IDialogBaseProps {
  children?: React.ReactNode;
  handleClose?: () => void;
  isOpen: boolean;
  title?: string | React.ReactElement;
  description?: string;
}

const DialogBase = (props: IDialogBaseProps) => {
  const { children, handleClose, isOpen, title, description } = props;

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="overflow-y-scroll max-h-screen p-4">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  );
};

export default DialogBase;
