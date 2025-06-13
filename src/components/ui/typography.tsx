import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { JSX } from "react";

const typographyVariants = cva("", {
  variants: {
    size: {
      displayMd: "text-[36px] leading-[44px] tracking-[-0.02em]",
      displaySm: "text-[30px] leading-[38px] tracking-[0]",
      textLg:
        "font-inter font-semibold text-[18px] leading-[28px] tracking-[0]",
      textMd: "text-[16px] leading-[24px] tracking-[0]",
      textSm: "text-sm",
      textBase: "text-base",
      textXs: "text-[12px] leading-[18px] tracking-[0]",
      textXl: "text-xl",
      text5xl: "text-5xl",
      text2xl: "text-2xl",
      text3xl: "text-3xl",
      text4xl: "text-4xl",
      text6xl: "text-6xl",
      text7xl: "text-7xl",
    },
    weight: {
      regular: "font-normal",
      medium: "font-medium",
      semibold: "font-semibold",
      bold: "font-bold",
    },
    align: {
      left: "text-left",
      center: "text-center",
      right: "text-right",
      justify: "text-justify",
    },
  },
  defaultVariants: {
    size: "textMd",
    weight: "regular",
    align: "left",
  },
});

export type TypographyVariantProps = VariantProps<typeof typographyVariants>;

type AsElement = keyof Pick<
  JSX.IntrinsicElements,
  | "p"
  | "span"
  | "div"
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6"
  | "label"
  | "strong"
  | "em"
  | "small"
>;

export interface TypographyProps
  extends Omit<React.HTMLAttributes<HTMLElement>, "as">,
    TypographyVariantProps {
  as?: AsElement;
}

const Typography: React.FC<TypographyProps> = ({
  className,
  size,
  weight,
  align,
  as = "p",
  ...props
}) => {
  const Component = as;
  return (
    <Component
      className={cn(typographyVariants({ size, weight, align }), className)}
      {...props}
    />
  );
};

export default Typography;
