"use client";

import NavbarFooterLayout from "@/components/global/layout/navbar-footer-layout";
import ProfileInformationBox from "@/components/pages/profile/profile-information-box";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import Box from "@/components/ui/box";
import { Button } from "@/components/ui/button";
import Typography from "@/components/ui/typography";
import { useRouter } from "next/navigation";

const ProfileTemplate = () => {
  const router = useRouter();

  const handleNavigateToHome = () => {
    router.push("/");
  };

  return (
    <NavbarFooterLayout>
      <Box className="flex-1 gap-9 py-6 px-4 rounded-[12px] max-w-[400px] mx-auto">
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
            <ProfileInformationBox label="Role" value="User" />
          </Box>
        </Box>

        <Button onClick={handleNavigateToHome}>Back to home</Button>
      </Box>
    </NavbarFooterLayout>
  );
};

export default ProfileTemplate;
