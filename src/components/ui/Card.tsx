import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: "surface" | "lifted" | "glass" | "amber";
}

export function Card({ className, variant = "surface", ...props }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-lg",
        variant === "surface" && "bg-[#f9f2e8]",
        variant === "lifted" && [
          "bg-white",
          "shadow-[0_8px_40px_rgba(139,78,26,0.06)]",
        ],
        variant === "glass" && [
          "bg-white/80 backdrop-blur-[24px]",
          "shadow-[0_8px_40px_rgba(139,78,26,0.08)]",
        ],
        variant === "amber" && [
          "bg-[#fde8cc]/40",
          "shadow-[0_8px_40px_rgba(212,131,74,0.10)]",
        ],
        className
      )}
      {...props}
    />
  );
}
