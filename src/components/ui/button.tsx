import * as React from "react";
import { cn } from "@/src/lib/utils.ts";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link" | "primary" | "amber";
  size?: "default" | "sm" | "lg" | "icon";
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", ...props }, ref) => {
    const variantClasses = {
      default: "bg-primary text-on-primary hover:bg-primary-container shadow-md active:scale-[0.99]",
      primary: "bg-primary-container hover:bg-primary text-on-primary shadow-md active:scale-[0.99]",
      destructive: "bg-error text-on-error hover:bg-on-error-container shadow-sm",
      outline: "border border-outline-variant bg-transparent hover:bg-surface-container text-on-surface",
      secondary: "bg-secondary text-on-secondary hover:bg-secondary-container hover:text-on-secondary-fixed shadow-sm",
      amber: "bg-secondary-container text-on-secondary-container hover:bg-secondary-fixed-dim shadow-sm",
      ghost: "hover:bg-surface-container text-on-surface",
      link: "text-primary underline-offset-4 hover:underline",
    };

    const sizeClasses = {
      default: "h-11 px-5 py-2.5 rounded-xl font-title-md text-title-md",
      sm: "h-9 rounded-lg px-3 text-label-sm",
      lg: "h-12 rounded-xl px-8 text-title-md font-semibold",
      icon: "h-9 w-9 rounded-full",
    };

    return (
      <button
        className={cn(
          "inline-flex items-center justify-center whitespace-nowrap font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:pointer-events-none disabled:opacity-50 cursor-pointer",
          variantClasses[variant],
          sizeClasses[size],
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button };
