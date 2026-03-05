import React from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "./ui/sheet";
import { Button } from "./ui/button";
import { X } from "lucide-react";

export interface IDialogBaseProps {
  children?: React.ReactNode;
  handleClose?: () => void;
  isOpen: boolean;
  title?: string | React.ReactElement;
  description?: string;
}

const DialogSheet = (props: IDialogBaseProps) => {
  const { children, handleClose, isOpen, title, description } = props;
  return (
    <Sheet open={isOpen} modal onOpenChange={handleClose}>
      <SheetContent className="overflow-y-scroll w-full sm:max-w-xl p-4">
        <SheetHeader className="flex flex-row justify-between items-center mb-5">
          <SheetTitle>{title}</SheetTitle>
          <SheetDescription>{description}</SheetDescription>
          <Button
            onClick={() => handleClose()}
            variant="secondary"
            size="icon"
            className="space-y-0"
          >
            <X className="h-5 w-5" />
          </Button>
        </SheetHeader>
        {children}
      </SheetContent>
    </Sheet>
  );
};

export default DialogSheet;
