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
      "bg-[#8a252c] dark:bg-[#a62734] text-white border-transparent shadow-2xs",
    terracotta:
      "bg-[#f6eadb] dark:bg-[#38141c] text-[#8a252c] dark:text-[#f2aab2] border-transparent font-semibold",
    secondary:
      "bg-[#f6eadb] dark:bg-[#38141c] text-[#8a252c] dark:text-[#f2aab2] border-transparent font-medium",
    gold:
      "bg-[#fcedd7] dark:bg-[#3d2415] text-[#9b621e] dark:text-[#e5b86a] border-transparent font-semibold",
    destructive:
      "bg-red-500 text-white border-transparent",
    outline:
      "border border-[#eadcce] dark:border-[#4d1b24] text-[#584640] dark:text-[#d4bfb7] bg-transparent",
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
