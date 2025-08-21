import * as React from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { useThemeSettings } from "@/modules/shared/hooks/useThemeSettings";
import { cn } from "@/modules/shared/helpers";

interface DialogProps {
  open: boolean;
  onOpenChange: (value: boolean) => void;
  children: React.ReactNode;
  maxWidthClass?: string;
}

export function Dialog({
  open,
  onOpenChange,
  children,
  maxWidthClass = "max-w-md",
}: DialogProps) {
  const { rtl, mode } = useThemeSettings();
  const isDark = mode === "dark";

  React.useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  return createPortal(
    <AnimatePresence>
      {open && (
        <>
          {/* Overlay */}
          <motion.div
            className="fixed inset-0 z-40 bg-black/50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => onOpenChange(false)}
          />

          {/* Content */}
          <motion.div
            className={cn(
              "fixed z-50 top-1/2 left-1/2 w-full -translate-x-1/2 -translate-y-1/2 rounded-xl shadow-lg p-6 max-h-[90vh] overflow-y-auto",
              maxWidthClass,
              rtl ? "rtl text-right" : "ltr text-left"
            )}
            style={{
              backgroundColor: isDark ? "#1f2937" : "#ffffff", // gray-900 : white
              color: isDark ? "#f3f4f6" : "#111827", // text-gray-100 : text-gray-900
            }}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
          >
            {children}
          </motion.div>
        </>
      )}
    </AnimatePresence>,
    document.body
  );
}

// Subcomponents
export function DialogContent({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={cn("space-y-4", className)}>{children}</div>;
}

export function DialogHeader({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={cn("mb-4", className)}>{children}</div>;
}

export function DialogTitle({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <h2 className={cn("text-lg font-semibold", className)}>{children}</h2>;
}

// Attach subcomponents
Dialog.Content = DialogContent;
Dialog.Header = DialogHeader;
Dialog.Title = DialogTitle;
