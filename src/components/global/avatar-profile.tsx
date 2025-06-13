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
import AlertDialogWrapper from "./alert-dialog-wrapper";
import { LogOut } from "lucide-react";
import { useState } from "react";

interface AvatarProfileProps {
  textProfileColor?: string;
}

const AvatarProfile = ({ textProfileColor }: AvatarProfileProps) => {
  const [open, setOpen] = useState(false);

  return (
    <>
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
    </>
  );
};

export default AvatarProfile;
