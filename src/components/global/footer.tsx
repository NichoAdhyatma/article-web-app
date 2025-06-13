import React from "react";
import { Box } from "../ui/box";
import Image from "next/image";
import Typography from "../ui/typography";

const Footer = () => {
  return (
    <Box direction={"row"} className="bg-primary gap-4 py-[37px] flex-wrap">
      <Image
        src={"/app-logo-white.svg"}
        alt="app-logo-footer"
        width={134}
        height={24}
      />

      <Typography size={"textBase"} weight={"regular"} className="text-white">
        © {new Date().getFullYear()} Blog genzet. All rights reserved.
      </Typography>
    </Box>
  );
};

export default Footer;
