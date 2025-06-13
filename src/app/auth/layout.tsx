import { Box } from "@/components/ui/box";
import React from "react";

const AuthLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <Box className="bg-gray-100 h-screen">
      <Box className="bg-white rounded-xl py-10 px-4 gap-6 max-w-[400px] w-full h-full sm:h-auto">
        
      {children}
      </Box>
    </Box>
  );
};

export default AuthLayout;
