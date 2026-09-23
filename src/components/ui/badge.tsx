import * as React from "react";
import { cn } from "@/src/lib/utils.ts";

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "secondary" | "destructive" | "outline" | "gold" | "crimson";
}

function Badge({
  className,
  variant = "default",
  ...props
}: BadgeProps) {
  const variantClasses = {
    default: "bg-surface-container text-on-surface-variant",
    secondary: "bg-secondary/15 text-secondary border border-secondary/20",
    destructive: "bg-error-container text-on-error-container",
    outline: "text-on-surface border border-outline-variant",
    gold: "bg-secondary-container text-on-secondary-container font-semibold",
    crimson: "bg-primary-container/20 text-primary font-semibold border border-primary/20",
  };

  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-label-xs font-semibold transition-colors focus:outline-none",
        variantClasses[variant],
        className
      )}
      {...props}
    />
  );
}

export { Badge };
