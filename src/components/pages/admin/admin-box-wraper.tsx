import Box from "@/components/ui/box";
import { cn } from "@/lib/utils";
import React from "react";

interface AdminBoxWrapperProps {
  children?: React.ReactNode;
  className?: string;
}

const AdminBoxWrapper = ({ children, className }: AdminBoxWrapperProps) => {
  return (
    <Box
      className={cn(
        "bg-gray-50 border border-slate-200 rounded-[12px]",
        className
      )}
    >
      {children}
    </Box>
  );
};

export default AdminBoxWrapper;
