import { cn } from "@/lib/utils";
import { InputHTMLAttributes, forwardRef } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, hint, id, ...props }, ref) => {
    const inputId = id ?? label?.toLowerCase().replace(/\s+/g, "-");

    return (
      <div className="flex flex-col gap-2">
        {label && (
          <label
            htmlFor={inputId}
            className="text-[11px] font-[700] tracking-[0.10em] uppercase text-[#6b4a28]"
          >
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          className={cn(
            "w-full bg-[#f9f2e8] text-[#1c0f00] text-sm rounded-md px-4 py-3",
            "placeholder:text-[#d4b896] outline-none",
            "transition-all duration-300",
            /* Ember focus: lift to white + amber glow */
            "focus:bg-white focus:shadow-[0_0_0_14px_rgba(245,168,74,0.18)]",
            error && "bg-[#fde8d8] focus:shadow-[0_0_0_14px_rgba(212,100,50,0.18)]",
            props.disabled && "opacity-40 cursor-not-allowed",
            className
          )}
          {...props}
        />
        {error && (
          <p className="text-[11px] font-[700] tracking-[0.08em] uppercase text-[#7a2a00]">
            {error}
          </p>
        )}
        {hint && !error && (
          <p className="text-[11px] text-[#d4b896] leading-relaxed">{hint}</p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
export { Input };
