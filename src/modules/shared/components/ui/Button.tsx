import React from "react";
import { cn } from "../../helpers";

type ButtonVariant = "default" | "ghost" | "outline" | "destructive";
type ButtonSize = "default" | "sm" | "lg" | "icon";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", ...props }, ref) => {
    const base =
      "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none";

    const variantClasses: Record<ButtonVariant, string> = {
      default: "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500",
      ghost: "bg-transparent hover:bg-gray-100 text-gray-800",
      outline: "border border-gray-300 hover:bg-gray-50",
      destructive: "bg-red-500 text-white hover:bg-red-600 focus:ring-red-400",
    };

    const sizeClasses: Record<ButtonSize, string> = {
      default: "h-10 px-4",
      sm: "h-8 px-3 text-xs",
      lg: "h-12 px-6 text-base",
      icon: "h-10 w-10 p-0",
    };

    return (
      <button
        ref={ref}
        className={cn(
          base,
          variantClasses[variant],
          sizeClasses[size],
          className
        )}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";
