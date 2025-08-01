"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import Box from "../ui/box";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { cn } from "@/lib/utils";

import Typography from "../ui/typography";
import { LogOut } from "lucide-react";
import { useAlertDialog } from "@/context/alert-dialog-context";
import { useAuth } from "@/context/auth-context";
import { useRouter } from "next/navigation";

interface AvatarProfileProps {
  textProfileColor?: string;
}

const AvatarProfile = ({ textProfileColor }: AvatarProfileProps) => {
  const { showDialog } = useAlertDialog();

  const { user, logout } = useAuth();

  const { push } = useRouter();

  const handleShowDialog = () => {
    showDialog({
      title: "Logout",
      description: "Are you sure want to logout?",
      actionText: "Logout",
      variant: "destructive",
      onAction: () => {
        logout();
      },
    });
  };

  const handleNavigateToProfile = () => {
    if (user?.role === "Admin") {
      push("/admin/profile");
      return;
    }
    push("/profile");
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Box direction={"row"} className="gap-[6px]" fullWidth={false}>
            <Avatar className="justify-center items-center">
              <AvatarFallback className="text-blue-900 bg-blue-200 font-medium text-base">
                {user?.username?.charAt(0).toUpperCase() || "U"}
              </AvatarFallback>
            </Avatar>

            <Typography
              size={"textBase"}
              weight={"medium"}
              className={cn("underline hidden sm:block", textProfileColor)}
            >
              {user?.username}
            </Typography>
          </Box>
        </DropdownMenuTrigger>

        <DropdownMenuContent className="w-[224px] mr-10" align="start">
          <DropdownMenuLabel onClick={handleNavigateToProfile}>
            My Account
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem variant="destructive" onClick={handleShowDialog}>
              <LogOut fontWeight={500} />
              <Typography size={"textSm"} weight={"medium"}>
                Log out
              </Typography>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default AvatarProfile;
