import * as React from "react";
import { cn } from "../../helpers";

export function Avatar({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "relative flex shrink-0 overflow-hidden rounded-full",
        className
      )}
    >
      {children}
    </div>
  );
}

export function AvatarImage({
  src,
  alt,
  className,
}: {
  src?: string;
  alt?: string;
  className?: string;
}) {
  return (
    <img
      src={src}
      alt={alt}
      className={cn("object-cover w-full h-full", className)}
    />
  );
}

export function AvatarFallback({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex items-center justify-center bg-gray-200 text-gray-600 text-sm w-full h-full",
        className
      )}
    >
      {children}
    </div>
  );
}
