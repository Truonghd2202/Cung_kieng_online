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
      "bg-[#9e3b2e] text-white border-transparent shadow-2xs",
    terracotta:
      "bg-[#faece1] text-[#9e3b2e] border-transparent font-semibold",
    secondary:
      "bg-[#faede2] text-[#9e3b2e] border-transparent font-medium",
    gold:
      "bg-[#fcedd7] text-[#9b621e] border-transparent font-semibold",
    destructive:
      "bg-red-500 text-white border-transparent",
    outline:
      "border border-[#eddcd0] text-[#73635d] bg-transparent",
  };

  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
        variantStyles[variant] || variantStyles.default,
        className
      )}
      {...props}
    />
  );
}

export { Badge };
