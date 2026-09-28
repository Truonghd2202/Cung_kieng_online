import * as React from "react";
import { cn } from "@/src/lib/utils";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link"
    | "lacquer"
    | "bronze";
  size?: "default" | "sm" | "lg" | "icon" | "pill";
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", ...props }, ref) => {
    const baseStyles =
      "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#9e3b2e] disabled:pointer-events-none disabled:opacity-50 select-none cursor-pointer";

    const variantStyles: Record<string, string> = {
      default:
        "bg-[#9e3b2e] text-white hover:bg-[#882f23] shadow-xs active:scale-[0.98]",
      lacquer:
        "bg-[#9e3b2e] text-white hover:bg-[#882f23] shadow-xs active:scale-[0.98]",
      bronze:
        "bg-[#6f4b1b] text-white hover:bg-[#5e3e15] shadow-xs active:scale-[0.98]",
      destructive:
        "bg-red-600 text-white hover:bg-red-700 shadow-xs",
      outline:
        "border border-[#eddcd0] bg-[#fffdfa] text-[#4d403b] hover:bg-[#faf4ee] hover:border-[#dfc3af] shadow-2xs",
      secondary:
        "bg-[#faede2] text-[#9e3b2e] hover:bg-[#f6e1d2] shadow-2xs font-semibold",
      ghost:
        "text-[#5c4f4a] hover:text-[#9e3b2e] hover:bg-[#f8ede3]/60",
      link:
        "text-[#9e3b2e] underline-offset-4 hover:underline p-0 h-auto font-medium",
    };

    const sizeStyles: Record<string, string> = {
      default: "h-10 px-4 py-2",
      sm: "h-8 rounded-lg px-3 text-xs",
      lg: "h-12 rounded-2xl px-6 text-base",
      pill: "h-9 rounded-full px-5 text-sm",
      icon: "h-9 w-9 rounded-full p-0",
    };

    return (
      <button
        ref={ref}
        className={cn(
          baseStyles,
          variantStyles[variant] || variantStyles.default,
          sizeStyles[size] || sizeStyles.default,
          className
        )}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button };
