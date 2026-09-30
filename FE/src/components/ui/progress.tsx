import * as React from "react";
import { cn } from "@/src/lib/utils";

const Progress = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { value?: number }
>(({ className, value = 0, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "relative h-2 w-full overflow-hidden rounded-full bg-surface-soft",
      className
    )}
    {...props}
  >
    <div
      className="h-full w-full flex-1 bg-action transition-all duration-500 ease-out"
      style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
    />
  </div>
));
Progress.displayName = "Progress";

export { Progress };
