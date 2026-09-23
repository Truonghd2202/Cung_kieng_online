import * as React from "react";
import { cn } from "@/src/lib/utils.ts";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex w-full rounded-lg bg-surface-container-low px-4 py-2.5 text-body-md text-on-surface placeholder:text-outline transition-all focus:bg-surface-container focus:outline-none focus:ring-2 focus:ring-primary/40 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };
