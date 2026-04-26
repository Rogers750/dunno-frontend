import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface LogoProps {
  size?: "sm" | "md" | "lg" | "xl";
  href?: string;
  className?: string;
  showWordmark?: boolean;
}

const sizes = {
  sm: 28,
  md: 36,
  lg: 48,
  xl: 80,
};

export function Logo({ size = "md", href = "/", className, showWordmark = true }: LogoProps) {
  const px = sizes[size];
  const textSize = size === "sm" ? "text-base" : size === "md" ? "text-xl" : size === "lg" ? "text-2xl" : "text-3xl";

  const content = (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <Image
        src="/dunnoai_mark_v2.svg"
        alt="Dunno logo"
        width={px}
        height={px}
        className="shrink-0"
        priority
      />
      {showWordmark && (
        <span
          className={cn("font-[700] tracking-[-0.02em] text-[#1c0f00]", textSize)}
          style={{ fontFamily: "'Manrope', sans-serif" }}
        >
          dunno
        </span>
      )}
    </span>
  );

  if (href) {
    return <Link href={href} className="inline-flex items-center">{content}</Link>;
  }
  return content;
}
