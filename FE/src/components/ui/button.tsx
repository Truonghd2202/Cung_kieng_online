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
        "bg-[#8a252c] dark:bg-[#a62734] text-white hover:bg-[#731a21] dark:hover:bg-[#b8323f] shadow-xs active:scale-[0.98]",
      lacquer:
        "bg-[#8a252c] dark:bg-[#a62734] text-white hover:bg-[#731a21] dark:hover:bg-[#b8323f] shadow-xs active:scale-[0.98]",
      bronze:
        "bg-[#6f4b1b] dark:bg-[#85531b] text-white hover:bg-[#5e3e15] shadow-xs active:scale-[0.98]",
      destructive:
        "bg-red-600 text-white hover:bg-red-700 shadow-xs",
      outline:
        "border border-[#eadcce] dark:border-[#4d1b24] bg-white dark:bg-[#2c0e14] text-[#2a1815] dark:text-[#f7ede6] hover:bg-[#f6eadb] dark:hover:bg-[#38141c] hover:border-[#dfc3af] shadow-2xs",
      secondary:
        "bg-[#f6eadb] dark:bg-[#38141c] text-[#8a252c] dark:text-[#f2aab2] hover:bg-[#eddccb] dark:hover:bg-[#481824] shadow-2xs font-semibold",
      ghost:
        "text-[#584640] dark:text-[#d4bfb7] hover:text-[#8a252c] dark:hover:text-[#f7ede6] hover:bg-[#f6eadb]/60 dark:hover:bg-[#38141c]/70",
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
