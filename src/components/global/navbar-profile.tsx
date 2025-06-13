"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Box } from "@/components/ui/box";
import Typography from "@/components/ui/typography";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useMediaQuery } from "react-responsive";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { LogOut } from "lucide-react";
import AlertDialogWrapper from "./alert-dialog-wrapper";
import { useState } from "react";

interface NavbarProfileProps {
  responsive?: boolean;
  className?: string;
}

const NavbarProfile = ({ responsive, className }: NavbarProfileProps) => {
  const isSmallScreen = useMediaQuery({ maxWidth: 640 });

  const imagePath = responsive
    ? isSmallScreen
      ? "/app-logo.svg"
      : "/app-logo-white.svg"
    : "/app-logo.svg";

  const backgroundColor = responsive
    ? isSmallScreen
      ? "bg-white"
      : "bg-transparent"
    : "bg-white";

  const textProfileColor = responsive
    ? isSmallScreen
      ? "text-slate-900"
      : "text-white"
    : "text-slate-900";

  const border = responsive
    ? isSmallScreen
      ? "border-[1px] border-slate-200"
      : "border-none"
    : "border-b-[1px] border-slate-200";

  const [open, setOpen] = useState(false);

  return (
    <Box
      direction={"row"}
      justify={"between"}
      align={"center"}
      className={cn(
        "w-full px-5 py-4 sm:py-8 sm:px-15",
        backgroundColor,
        border,
        className
      )}
    >
      <Image src={imagePath} width={134} height={24} alt="app-logo-white" />

      <DropdownMenu>
        <DropdownMenuTrigger>
          <Box direction={"row"} className="gap-[6px]" fullWidth={false}>
            <Avatar className="justify-center items-center">
              <AvatarFallback className="text-blue-900 bg-blue-200 font-medium text-base">
                J
              </AvatarFallback>
            </Avatar>

            <Typography
              size={"textBase"}
              weight={"medium"}
              className={cn("underline hidden sm:block", textProfileColor)}
            >
              James Dean
            </Typography>
          </Box>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-[224px] mr-10" align="start">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem
              variant="destructive"
              onClick={() => setOpen(true)}
            >
              <LogOut fontWeight={500} />
              <Typography size={"textSm"} weight={"medium"}>
                Log out
              </Typography>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>

      <AlertDialogWrapper
        open={open}
        onOpenChange={setOpen}
        title="Logout"
        description="Are you sure want to logout?"
        actionText="Logout"
      />
    </Box>
  );
};

export default NavbarProfile;
