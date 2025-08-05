import { useState, useRef } from "react";
import type { ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";

type PopoverProps = {
  content: ReactNode;
  children: ReactNode;
  position?: "top" | "bottom" | "left" | "right";
};

export default function Popover({
  content,
  children,
  position = "top",
}: PopoverProps) {
  const [open, setOpen] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleEnter = () => {
    timeoutRef.current = setTimeout(() => setOpen(true), 100);
  };

  const handleLeave = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setOpen(false);
  };

  const getPositionClasses = () => {
    switch (position) {
      case "top":
        return "bottom-full mb-2 left-1/2 -translate-x-1/2";
      case "bottom":
        return "top-full mt-2 left-1/2 -translate-x-1/2";
      case "left":
        return "right-full mr-1 top-1/2 -translate-y-1/2";
      case "right":
        return "left-full ml-1 top-1/2 -translate-y-1/2";
    }
  };

  return (
    <div
      className="relative inline-block"
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      {children}

      <AnimatePresence>
        {open && (
          <motion.div
            className={`absolute z-50 ${getPositionClasses()}`}
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.15 }}
          >
            <div className="bg-white text-sm text-gray-800 dark:bg-gray-800 dark:text-white px-3 py-2 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
              {content}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
