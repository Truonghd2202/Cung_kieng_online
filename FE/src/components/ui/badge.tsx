import * as React from "react";
import { cn } from "@/src/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?:
    | "default"
    | "secondary"
    | "destructive"
    | "outline"
    | "terracotta"
    | "gold";
}

function Badge({
  className,
  variant = "default",
  ...props
}: BadgeProps) {
  const variantStyles: Record<string, string> = {
    default:
      "bg-action text-on-action border-transparent",
    terracotta:
      "bg-accent-soft text-accent border-transparent font-semibold",
    secondary:
      "bg-accent-soft text-accent border-transparent font-medium",
    gold:
      "bg-surface-soft text-gold border-transparent font-semibold",
    destructive:
      "bg-danger-soft text-danger border-transparent",
    outline:
      "border border-line text-muted bg-transparent",
  };

  return (
    <div
      className={cn(
        "inline-flex items-center rounded-md border px-2.5 py-1 text-xs font-semibold tracking-wide transition-colors",
        variantStyles[variant] || variantStyles.default,
        className
      )}
      {...props}
    />
  );
}

export { Badge };
