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
      "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#8a252c] dark:focus-visible:ring-[#a62734] disabled:pointer-events-none disabled:opacity-50 select-none cursor-pointer";

    const variantStyles: Record<string, string> = {
      default:
        "bg-gradient-to-b from-[#942931] to-[#7f1f26] dark:from-[#b52d3a] dark:to-[#92202c] text-white hover:from-[#842229] hover:to-[#6f171e] dark:hover:from-[#c23341] dark:hover:to-[#a02431] shadow-[0_3px_12px_rgba(138,37,44,0.25)] dark:shadow-[0_4px_16px_rgba(166,39,52,0.35)] active:scale-[0.98] border border-[#a8333c]/20",
      lacquer:
        "bg-gradient-to-b from-[#942931] to-[#7f1f26] dark:from-[#b52d3a] dark:to-[#92202c] text-white hover:from-[#842229] hover:to-[#6f171e] dark:hover:from-[#c23341] dark:hover:to-[#a02431] shadow-[0_3px_12px_rgba(138,37,44,0.25)] dark:shadow-[0_4px_16px_rgba(166,39,52,0.35)] active:scale-[0.98] border border-[#a8333c]/20",
      bronze:
        "bg-gradient-to-b from-[#7d5622] to-[#614115] text-white hover:from-[#6b491b] hover:to-[#523610] shadow-[0_3px_12px_rgba(111,75,27,0.25)] active:scale-[0.98]",
      destructive:
        "bg-red-600 text-white hover:bg-red-700 shadow-xs",
      outline:
        "border border-[#eadcce] dark:border-[#4d1b24] bg-white/80 dark:bg-[#2c0e14]/80 backdrop-blur-xs text-[#2a1815] dark:text-[#f7ede6] hover:bg-[#f6eadb] dark:hover:bg-[#38141c] hover:border-[#dfc3af] shadow-xs hover:shadow-sm active:scale-[0.98]",
      secondary:
        "bg-[#f6eadb] dark:bg-[#38141c] text-[#8a252c] dark:text-[#f2aab2] hover:bg-[#eddccb] dark:hover:bg-[#481824] shadow-xs font-semibold active:scale-[0.98]",
      ghost:
        "text-[#584640] dark:text-[#d4bfb7] hover:text-[#8a252c] dark:hover:text-[#f7ede6] hover:bg-[#f6eadb]/70 dark:hover:bg-[#38141c]/70",
      link:
        "text-[#8a252c] dark:text-[#f28d96] underline-offset-4 hover:underline p-0 h-auto font-medium",
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
