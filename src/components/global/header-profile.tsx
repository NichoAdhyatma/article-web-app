import Box from "../ui/box";
import Typography from "../ui/typography";
import AvatarProfile from "./avatar-profile";

const HeaderProfile = () => {
  return (
    <Box
      justify={"between"}
      direction={"row"}
      align={"center"}
      className="w-full px-6 py-5 border-b-[1px] bg-gray-50 border-slate-200"
    >
      <Typography
        size={"textXl"}
        weight={"semibold"}
        className="text-slate-900"
      >
        Category
      </Typography>

      <AvatarProfile textProfileColor="text-slate-900" />
    </Box>
  );
};

export default HeaderProfile;
