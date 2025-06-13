import { Box } from "@/components/ui/box";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Typography from "@/components/ui/typography";

const HeaderContent = () => {
  return (
    <Box className="max-w-[730px] gap-10 mt-10 mb-[90px] px-4 sm:px-0 pt-25">
      <Box className="gap-3">
        <Typography size={"textBase"} weight={"bold"} className="text-white">
          Blog genzet
        </Typography>

        <Typography
          size={"text5xl"}
          weight={"medium"}
          align={"center"}
          className="text-white"
        >
          The Journal : Design Resources, Interviews, and Industry News
        </Typography>

        <Typography size={"text2xl"} weight={"regular"} className="text-white">
          Your daily dose of design insights!
        </Typography>
      </Box>

      <Box className="p-[10px] rounded-[12px] gap-2 bg-blue-500 flex-col sm:flex-row max-w-[608px]">
        <Select defaultValue="system">
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Select Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="light">Light</SelectItem>
            <SelectItem value="dark">Dark</SelectItem>
            <SelectItem value="system">System</SelectItem>
          </SelectContent>
        </Select>
        <Input placeholder="Search articles" />
      </Box>
    </Box>
  );
};

export default HeaderContent;
