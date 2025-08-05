import React from "react";
import { cn } from "../../helpers";

interface BadgeProps {
  children: React.ReactNode;
  content: React.ReactNode;
  color?: string; // کلاس رنگ مثل bg-red-500
  position?: "top-right" | "top-left" | "bottom-right" | "bottom-left";
  className?: string;
}

const positionMap: Record<string, string> = {
  "top-right": "top-0 right-0 translate-x-1/2 -translate-y-1/2",
  "top-left": "top-0 left-0 -translate-x-1/2 -translate-y-1/2",
  "bottom-right": "bottom-0 right-0 translate-x-1/2 translate-y-1/2",
  "bottom-left": "bottom-0 left-0 -translate-x-1/2 translate-y-1/2",
};

const Badge: React.FC<BadgeProps> = ({
  children,
  content,
  color = "bg-red-500",
  position = "top-right",
  className,
}) => {
  return (
    <div className="relative inline-block">
      {children}
      <span
        className={cn(
          "absolute min-w-[1.25rem] h-[1.25rem] text-[0.75rem] px-1 rounded-full flex items-center justify-center text-white font-medium",
          positionMap[position],
          color,
          className
        )}
      >
        {content}
      </span>
    </div>
  );
};

export default Badge;
