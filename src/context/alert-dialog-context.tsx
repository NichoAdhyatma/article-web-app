"use client";

import AlertDialogWrapper from "@/components/global/alert-dialog-wrapper";
import React, { createContext, useContext, useState, ReactNode } from "react";

type AlertDialogOptions = {
  title?: string;
  description?: string;
  actionText?: string;
  cancelText?: string;
  variant?: "default" | "destructive";
  onAction?: () => void;
  onCancel?: () => void;
};

type AlertDialogContextType = {
  showDialog: (options: AlertDialogOptions) => void;
};

const AlertDialogContext = createContext<AlertDialogContextType | undefined>(
  undefined
);

export const useAlertDialog = (): AlertDialogContextType => {
  const context = useContext(AlertDialogContext);
  if (!context) {
    throw new Error(
      "useAlertDialog must be used within an AlertDialogProvider"
    );
  }
  return context;
};

export const AlertDialogProvider = ({ children }: { children: ReactNode }) => {
  const [open, setOpen] = useState(false);
  const [dialogOptions, setDialogOptions] = useState<AlertDialogOptions>({});

  const showDialog = (options: AlertDialogOptions) => {
    setDialogOptions(options);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAction = () => {
    dialogOptions.onAction?.();
    handleClose();
  };

  const handleCancel = () => {
    dialogOptions.onCancel?.();
    handleClose();
  };

  return (
    <AlertDialogContext.Provider value={{ showDialog }}>
      {children}
      <AlertDialogWrapper
        open={open}
        onOpenChange={setOpen}
        title={dialogOptions.title}
        description={dialogOptions.description}
        actionText={dialogOptions.actionText}
        cancelText={dialogOptions.cancelText}
        variant={dialogOptions.variant}
        onAction={handleAction}
        onCancel={handleCancel}
      />
    </AlertDialogContext.Provider>
  );
};
