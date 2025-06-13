import Image from "next/image";
import { cn } from "@/lib/utils";

type ResponsiveImageProps = {
  src: string;
  alt: string;
  aspectRatio?: string;
  objectFit?: "cover" | "contain" | "fill" | "none" | "scale-down";
  rounded?: string;
  className?: string;
  unoptimized?: boolean;
};

export const ResponsiveImage = ({
  src,
  alt,
  aspectRatio = "16/9",
  objectFit = "cover",
  rounded = "rounded-[12px]",
  className = "p-0",
  unoptimized = false,
}: ResponsiveImageProps) => {
  return (
    <div
      className={cn("relative w-full", className)}
      style={{ aspectRatio: aspectRatio }}
    >
      <Image
        src={src}
        alt={alt}
        fill
        className={cn(rounded)}
        style={{ objectFit: objectFit }}
        unoptimized={unoptimized}
      />
    </div>
  );
};
