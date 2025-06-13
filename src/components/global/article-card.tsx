"use client";

import { Box } from "../ui/box";
import { dateFormat } from "@/lib/format/date-format";
import Typography from "../ui/typography";
import { Badge } from "../ui/badge";
import { ResponsiveImage } from "./responsive-image";
import { useRouter } from "next/navigation";

const ArticleCard = () => {
  const router = useRouter();

  const handleNavigateToDetail = () => {
    router.push("/article/1");
  };

  return (
    <Box className="gap-4 sm:max-w-[387px]" onClick={handleNavigateToDetail}>
      <ResponsiveImage
        src="https://placehold.co/387x240"
        alt="placeholder-img"
        aspectRatio="387/240"
        objectFit="cover"
        rounded="rounded-[12px]"
        unoptimized
      />

      <Box className="gap-2" align={"start"}>
        <Typography size={"textSm"} className="text-slate-600">
          {dateFormat.MMMMdyyyy(new Date())}
        </Typography>

        <Typography
          size={"textLg"}
          weight={"semibold"}
          className="text-slate-900"
        >
          Cybersecurity Essentials Every Developer Should Know
        </Typography>

        <Typography size={"textBase"} className="text-slate-600 line-clamp-2">
          Protect your apps and users with these fundamental cybersecurity
          practices for developers.
        </Typography>

        <Box justify={"start"} direction={"row"} className="gap-2">
          <Badge>Technology</Badge>
          <Badge>Design</Badge>
        </Box>
      </Box>
    </Box>
  );
};

export default ArticleCard;
