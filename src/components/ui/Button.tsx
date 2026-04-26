import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes, forwardRef } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", loading, children, disabled, ...props }, ref) => {
    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={cn(
          "inline-flex items-center justify-center font-[700] tracking-[0.08em] uppercase rounded-md transition-all duration-300",
          "focus-visible:outline-none ember-focus",
          "disabled:opacity-40 disabled:cursor-not-allowed",

          /* Primary: logo amber gradient */
          variant === "primary" && [
            "text-white",
            "bg-gradient-to-b from-[#D4834A] to-[#8B4E1A]",
            "hover:from-[#c07540] hover:to-[#7a4216]",
            "hover:shadow-[0_8px_32px_rgba(213,131,74,0.35)]",
            "active:scale-[0.98]",
          ],

          /* Secondary: warm tinted surface */
          variant === "secondary" && [
            "bg-[#f9f2e8] text-[#6b4a28]",
            "hover:bg-[#f3e8d8] hover:shadow-[0_4px_20px_rgba(139,78,26,0.08)]",
            "active:scale-[0.98]",
          ],

          /* Ghost */
          variant === "ghost" && [
            "bg-transparent text-[#6b4a28]",
            "hover:bg-[#f9f2e8] hover:text-[#1c0f00]",
          ],

          /* Danger: warm red-orange */
          variant === "danger" && [
            "bg-[#fde8d8] text-[#7a2a00]",
            "hover:bg-[#fbd8c0] hover:shadow-[0_4px_20px_rgba(122,42,0,0.10)]",
            "active:scale-[0.98]",
          ],

          {
            "text-[11px] px-4 py-2 gap-1.5": size === "sm",
            "text-[12px] px-5 py-2.5 gap-2": size === "md",
            "text-[13px] px-7 py-3.5 gap-2.5": size === "lg",
          },
          className
        )}
        {...props}
      >
        {loading && (
          <svg className="animate-spin h-4 w-4 shrink-0" viewBox="0 0 24 24" fill="none">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
        )}
        {!loading && children}
      </button>
    );
  }
);

Button.displayName = "Button";
export { Button };
