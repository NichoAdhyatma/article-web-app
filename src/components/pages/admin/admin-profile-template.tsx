"use client";

import AdminBoxWrapper from "@/components/pages/admin/admin-box-wraper";
import ProfileInformationBox from "@/components/pages/profile/profile-information-box";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import Box from "@/components/ui/box";
import { Button } from "@/components/ui/button";
import Typography from "@/components/ui/typography";
import { useAuth } from "@/context/auth-context";
import { useRouter } from "next/navigation";

const AdminProfileTemplate = () => {
  const router = useRouter();

  const handleNavigateToHome = () => {
    router.push("/admin/article");
  };

  const { user } = useAuth();

  return (
    <AdminBoxWrapper className="h-screen">
      <Box
        justify={"start"}
        className="flex-1 gap-9 py-12 px-4 rounded-[12px] max-w-[400px] mx-auto"
      >
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
              {user?.username?.charAt(0).toUpperCase() || "U"}
            </AvatarFallback>
          </Avatar>

          <Box className="gap-3">
            <ProfileInformationBox label="Username" value={user?.username} />
            <ProfileInformationBox label="Password" value={user?.password} />
            <ProfileInformationBox label="Role" value={user?.role} />
          </Box>
        </Box>

        <Button onClick={handleNavigateToHome}>Back to Dashboard</Button>
      </Box>
    </AdminBoxWrapper>
  );
};

export default AdminProfileTemplate;
