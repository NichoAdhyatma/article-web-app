import ListArticleCard from "@/components/global/list-article-card";
import { ResponsiveImage } from "@/components/global/responsive-image";
import NavbarFooterLayout from "@/components/global/layout/navbar-footer-layout";
import { Box } from "@/components/ui/box";
import Typography from "@/components/ui/typography";
import { dateFormat } from "@/lib/format/date-format";

const ArticleDetailTemplate = () => {
  return (
    <NavbarFooterLayout>
      <Box className="py-10 max-w-[1120px] mx-auto gap-7 px-5">
        <Box className="gap-4 max-w-[642px]">
          <Box direction={"row"} className="gap-2">
            <Typography
              size={"textSm"}
              weight={"medium"}
              className="text-slate-600"
            >
              {dateFormat.MMMMdyyyy(new Date())}
            </Typography>

            <Typography
              size={"textSm"}
              weight={"medium"}
              className="text-slate-600"
            >
              •
            </Typography>
            <Typography
              size={"textSm"}
              weight={"medium"}
              className="text-slate-600"
            >
              Created by Admin
            </Typography>
          </Box>

          <Typography size={"text3xl"} weight={"semibold"} align={"center"}>
            {"Figma's"} New Dev Mode: A Game-Changer for Designers & Developers
          </Typography>
        </Box>

        <ResponsiveImage
          src="https://placehold.co/600x400"
          alt="placeholder-img"
          aspectRatio="1120/480"
          objectFit="cover"
          rounded="rounded-[12px]"
          className="my-4"
          unoptimized
        />

        <Typography size={"textBase"} className="text-slate-700">
          In the ever-evolving world of digital product design, collaboration
          between designers and developers has always been a crucial—yet often
          challenging—part of the process. In April 2025, Figma introduced Dev
          Mode, a powerful new feature aimed at streamlining that collaboration
          more than ever before. 🔧 What Is Dev Mode? Dev Mode is a new
          interface within Figma that provides developer-focused tools and
          removes unnecessary UI clutter that designers typically use. Instead,
          developers can view ready-to-implement specs, such as spacing, color
          values, font styles, and asset exports—without disrupting the design
          file or asking the design team for clarifications. 🤝 Bridging the Gap
          Between Design & Development Traditionally, handing off designs
          involved back-and-forth communication, misunderstandings, and
          occasional delays. With Dev Mode, handoff becomes real-time and
          seamless: Live Design Specs: Developers can inspect the design without
          needing additional tools or extensions. Code Snippets: Automatically
          generated CSS, iOS (Swift), and Android (XML) code help speed up
          implementation. Version History Access: Stay aligned with design
          updates without asking for a new export every time. Integrated
          Comments: Developers can leave feedback directly in the design file.
        </Typography>
      </Box>

      <Box
        align={"start"}
        className="gap-3 max-w-[1080px] mx-auto pt-4 pb-25 px-5"
      >
        <Typography size={"textXl"} weight={"bold"}>
          Other articles
        </Typography>

        <ListArticleCard length={3} />
      </Box>
    </NavbarFooterLayout>
  );
};

export default ArticleDetailTemplate;
