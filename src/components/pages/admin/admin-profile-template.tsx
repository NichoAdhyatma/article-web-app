"use client";

import AdminBoxWrapper from "@/components/pages/admin/admin-box-wraper";
import ProfileInformationBox from "@/components/pages/profile/profile-information-box";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import Box from "@/components/ui/box";
import { Button } from "@/components/ui/button";
import Typography from "@/components/ui/typography";
import { useRouter } from "next/navigation";

const AdminProfileTemplate = () => {
  const router = useRouter();

  const handleNavigateToHome = () => {
    router.push("/admin/article");
  };
  return (
    <AdminBoxWrapper className="h-screen">
      <Box justify={'start'} className="flex-1 gap-9 py-12 px-4 rounded-[12px] max-w-[400px] mx-auto">
        <Typography
          size={"textXl"}
          weight={"semibold"}
          className="'text-slate-900"
        >
          User Profile
        </Typography>

        <Box className="gap-6">
          <Avatar className="justify-center items-center w-[68px] h-[68px]">
            <AvatarFallback className="text-blue-900 bg-blue-200 font-medium text-2xl">
              J
            </AvatarFallback>
          </Avatar>

          <Box className="gap-3">
            <ProfileInformationBox label="Username" value="James Dean" />
            <ProfileInformationBox label="Password" value="Admin123" />
            <ProfileInformationBox label="Role" value="Admin" />
          </Box>
        </Box>

        <Button onClick={handleNavigateToHome}>Back to Dashboard</Button>
      </Box>
    </AdminBoxWrapper>
  );
};

export default AdminProfileTemplate;
