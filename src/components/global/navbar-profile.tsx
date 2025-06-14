"use client";

import { Box } from "@/components/ui/box";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useMediaQuery } from "react-responsive";
import AvatarProfile from "./avatar-profile";import { useRouter } from "next/navigation";
;

interface NavbarProfileProps {
  responsive?: boolean;
  className?: string;
}

const NavbarProfile = ({ responsive, className }: NavbarProfileProps) => {
  const isSmallScreen = useMediaQuery({ maxWidth: 640 });

  const router = useRouter()

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
      <Image src={imagePath} width={134} height={24} alt="app-logo-white" onClick={() => router.push("/article")} />

      <AvatarProfile textProfileColor={textProfileColor} />
    </Box>
  );
};

export default NavbarProfile;
