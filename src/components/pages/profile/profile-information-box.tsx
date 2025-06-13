import Box from "@/components/ui/box";
import Typography from "@/components/ui/typography";
import React from "react";

interface ProfileInformationBoxProps {
  label?: string;
  value?: string;
}

const ProfileInformationBox = ({
  label,
  value,
}: ProfileInformationBoxProps) => {
  return (
    <Box
      justify={"start"}
      direction={"row"}
      className="gap-2 bg-gray-100 border border-slate-200 rounded-md py-[10px] px-3"
    >
      <Box direction={"row"} className="max-w-[97px]">
        <Typography
          size={"textBase"}
          weight={"semibold"}
          className="text-gray-900 flex-1"
        >
          {label}
        </Typography>
        <Typography
          size={"textBase"}
          weight={"regular"}
          className="text-gray-900"
        >
          :
        </Typography>
      </Box>

      <Typography
        size={"textBase"}
        weight={"regular"}
        align={"center"}
        className="text-gray-900 flex-1"
      >
        {value}
      </Typography>
    </Box>
  );
};

export default ProfileInformationBox;
