"use client";

import { usePathname, useRouter } from "next/navigation";
import Box from "../ui/box";
import Typography from "../ui/typography";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { cn } from "@/lib/utils";
import { useAuth } from "@/context/auth-context";
import { SidebarTrigger } from "../ui/sidebar";
import { useMediaQuery } from "react-responsive";

const HeaderProfile = () => {
  const pathName = usePathname();
  const headerName = pathName;

  const headerNamePath = {
    "/admin/article": "Articles",
    "/admin/article/create": "Articles",
    "/admin/article/edit": "Articles",
    "/admin/category": "Category",
    "/admin/profile": "Profile",
  };

  const { user } = useAuth();

  const handleNavigateToProfile = () => {
    router.push("/admin/profile");
  };

  const router = useRouter();

  const isSmallScreen = useMediaQuery({ maxWidth: 640 });

  return (
    <Box
      justify={"between"}
      direction={"row"}
      align={"center"}
      className="w-full px-6 py-5 border-b-[1px] bg-gray-50 border-slate-200 sticky top-0 z-50"
    >
      {isSmallScreen && <SidebarTrigger />}
      
      <Typography
        size={"textXl"}
        weight={"semibold"}
        className="text-slate-900"
      >
        {headerNamePath[headerName as keyof typeof headerNamePath] || "Profile"}
      </Typography>

      <Box
        direction={"row"}
        className="gap-[6px] hover:cursor-pointer"
        fullWidth={false}
        onClick={handleNavigateToProfile}
      >
        <Avatar className="justify-center items-center">
          <AvatarFallback className="text-blue-900 bg-blue-200 font-medium text-base">
            {user?.username?.charAt(0).toUpperCase() || "U"}
          </AvatarFallback>
        </Avatar>

        <Typography
          size={"textBase"}
          weight={"medium"}
          className={cn("underline hidden sm:block", "text-slate-900")}
        >
          {user?.username || "User"}
        </Typography>
      </Box>
    </Box>
  );
};

export default HeaderProfile;
